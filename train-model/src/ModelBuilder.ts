/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import {
  Array1D, Array4D,
  CostReduction,
  FeedEntry,
  Graph,
  InCPUMemoryShuffledInputProviderBuilder,
  InMemoryDataset,
  MetricReduction,
  NDArray,
  NDArrayInitializer,
  NDArrayMathGPU,
  Optimizer,
  Session,
  Scalar,
  SGDOptimizer,
  Tensor,
  util, VarianceScalingInitializer, ZerosInitializer,
} from 'deeplearn';
import {EventEmitter} from 'eventemitter3';
import {GraphWeights} from './GraphSaverLoader';

import SpeechCommandDataset from './SpeechCommandDataset';

// Values from model-builder.ts.
const BATCH_SIZE = 64;
const NUM_BATCHES = 10000;
const MIN_COST_VALUE = 0.1;
const TRAIN_TEST_RATIO = 0.9;
const LEARNING_RATE = 0.01;

export default class ModelBuilder {
  modelInitialized: boolean

  session: Session
  graph: Graph
  optimizer: Optimizer
  math: NDArrayMathGPU

  inputShape: number[]
  labelShape: number[]
  learningRate: number

  inputTensor: Tensor
  labelTensor: Tensor
  regularizationTensor: Tensor
  predictionTensor: Tensor
  costTensor: Tensor
  accuracyTensor: Tensor

  nodeIndex: number
  dataSet: SpeechCommandDataset

  totalTimeSec: number

  isTraining: boolean
  progress: EventEmitter

  constructor(inputShape, labelShape, dataSet=null) {
    this.nodeIndex = 0;

    this.dataSet = dataSet;

    // Dimensions of the Mel spectrogram we feed into this model.
    this.inputShape = inputShape;

    // Shape of the 1D one-hot encoded labels.
    this.labelShape = labelShape;

    this.isTraining = false;
    this.math = new NDArrayMathGPU();

    this.progress = new EventEmitter();
    this.learningRate = LEARNING_RATE;
  }

  createModel(loadedWeights: GraphWeights=null) {
    if (this.session != null) {
      this.session.dispose();
    }
    // Reset the node index.
    this.nodeIndex = 0;

    this.modelInitialized = false;

    this.graph = new Graph();
    const g = this.graph;
    this.inputTensor = g.placeholder('input', this.inputShape);
    this.labelTensor = g.placeholder('label', this.labelShape);

    // Construct the hidden layers.
    let network = this.inputTensor;
    network = this.addConv2d(g, network, 8, loadedWeights);
    const reg1 = this.addRegularization(g, network);
    network = this.addRelu(g, network);
    network = this.addMaxPool(g, network);
    network = this.addConv2d(g, network, 16, loadedWeights)
    const reg2 = this.addRegularization(g, network);
    network = this.addRelu(g, network);
    network = this.addMaxPool(g, network);
    network = this.addFlatten(g, network);
    network = this.addFullyConnected(g, network, loadedWeights);
    const reg3 = this.addRegularization(g, network);

    this.predictionTensor = network;

    // Add a regularization parameter.
    this.regularizationTensor = g.add(reg1, reg2, reg3);
    const softmaxCrossEntropyCostTensor =
      g.softmaxCrossEntropyCost(this.predictionTensor, this.labelTensor);

    //this.costTensor = g.add(softmaxCrossEntropyCostTensor, this.regularizationTensor);
    this.costTensor = softmaxCrossEntropyCostTensor;
    this.accuracyTensor =
        g.argmaxEquals(this.predictionTensor, this.labelTensor);

    this.session = new Session(g, this.math);

    this.modelInitialized = true;
  }

  setLearningRate(learningRate: number) {
    this.learningRate = learningRate;
  }

  async startTraining() {
    console.log('startTraining');
    const trainingData = this.getTrainingData();

    const trainingShuffledInputProviderGenerator =
      new InCPUMemoryShuffledInputProviderBuilder(trainingData);
    const [trainingInputProvider, trainingLabelProvider] =
      trainingShuffledInputProviderGenerator.getInputProviders();

    const trainingFeeds = [
      {tensor: this.inputTensor, data: trainingInputProvider},
      {tensor: this.labelTensor, data: trainingLabelProvider}
    ];

    this.isTraining = true;

    let minCost = Infinity;
    let maxAccuracy = -Infinity;
    // Training is broken up into batches.
    // Before we start training, we need to provide an optimizer. This is the
    // object that is responsible for updating weights. The learning rate param
    // is a value that represents how large of a step to make when updating
    // weights. If this is too big, you may overstep and oscillate. If it is too
    // small, the model may take a long time to train.
    const optimizer = new SGDOptimizer(this.learningRate);
    console.log(`Training ${NUM_BATCHES} batches of size ${BATCH_SIZE}` +
      ` at rate: ${this.learningRate}.`);
    for (let i = 0; i < NUM_BATCHES; i++) {
      // Train takes a cost tensor to minimize; this call trains one batch and
      // returns the average cost of the batch as a Scalar.
      const costValue = this.session.train(
        this.costTensor, trainingFeeds,
        BATCH_SIZE, optimizer, CostReduction.MEAN);

      const cost = parseFloat(await costValue.data());
      console.log(`#${i}: cost: ${cost.toFixed(3)}.`);
      if (cost < minCost) {
        minCost = cost;
      }
      if (!this.isTraining) {
        break;
      }

      if (i % 20 == 0) {
        const accuracy = await this.getTestAccuracy(50);
        if (accuracy > maxAccuracy) {
          maxAccuracy = accuracy;
        }
        console.log(`#${i}: accuracy: ${accuracy.toFixed(3)},`
            + ` maxAccuracy: ${maxAccuracy.toFixed(3)}.`);
        this.progress.emit('accuracy', {accuracy, maxAccuracy});
      }
      this.progress.emit('cost', {cost, minCost});
    }

    this.isTraining = false;
  }

  async getTestAccuracy(limit?: number) {
    const testData = this.getTestData();

    const totalCount = testData[0].length;
    if (!limit) {
      limit = totalCount;
    }
    const count = Math.min(limit, totalCount);
    let accurateCount = 0;
    for (let i = 0; i < count; i++) {
      const ind = Math.floor(Math.random() * totalCount);
      const input = testData[0][ind];
      const label = testData[1][ind];
      const inferenceFeeds = [
        {tensor: this.inputTensor, data: input},
        {tensor: this.labelTensor, data: label},
      ];
      const result = this.session.eval(this.accuracyTensor, inferenceFeeds);
      /*
      // Output regularization value for debugging.
      const regularization = this.session.eval(this.regularizationTensor, inferenceFeeds);
      console.log('regularizationTensor', regularization.dataSync());
       */
      const accuracy = await result.data()
      if (accuracy[0]) {
        accurateCount += 1;
      }
    }
    return (accurateCount / count);
  }

  stopTraining() {
    console.log('Stopped training!');
    this.isTraining = false;
  }

  private addConv2d(g: Graph, network: Tensor, outputDepth: number,
    init: GraphWeights=null) {
    // 5x5 square filter.
    const fieldSize = 5;
    const stride = 1;
    const zeroPad = 2;
    const wShape =
        [fieldSize, fieldSize, network.shape[2], outputDepth];
    const wName = `save-conv2d-${this.nodeIndex}-w`;
    const bName = `save-conv2d-${this.nodeIndex}-b`;
    let w = NDArray.randTruncatedNormal(wShape, 0, 0.1);
    let b = Array1D.zeros([outputDepth]);
    if (init) {
      w = init[wName];
      b = init[bName];
    }
    const wTensor = g.variable(wName, w);
    const bTensor = g.variable(bName, b);
    this.nodeIndex += 1;
    return g.conv2d(
        network, wTensor, bTensor, fieldSize, outputDepth,
        stride, zeroPad);
  }

  private addRelu(g: Graph, network: Tensor) {
    return g.relu(network);
  }

  private addMaxPool(g: Graph, network: Tensor) {
    const fieldSize = 2;
    // Was previously stride=2 in the MNIST network. Changed this value because
    // of the input size.
    const stride = 1;
    const zeroPad = 0;
    return g.maxPool(network, fieldSize, stride, zeroPad);
  }

  private addFlatten(g: Graph, network: Tensor) {
    const size = util.sizeFromShape(network.shape);
    return g.reshape(network, [size]);
  }

  private addFullyConnected(g: Graph, network: Tensor, init: GraphWeights=null) {
    const inputSize = util.sizeFromShape(network.shape);
    const hiddenUnits = this.labelShape[0];

    let weightsInitializer, biasInitializer;
    if (init) {
      weightsInitializer = new NDArrayInitializer(init['save-fc1-weights']);
      biasInitializer = new NDArrayInitializer(init['save-fc1-bias']);
    } else {
      weightsInitializer = new VarianceScalingInitializer();
      biasInitializer = new ZerosInitializer();
    }

    const useBias = true;
    return g.layers.dense(
        'save-fc1', network, hiddenUnits, null, useBias, weightsInitializer,
        biasInitializer);
  }

  private addRegularization(g: Graph, network: Tensor) {
    const beta = 0.01;
    const betaTensor = g.variable('beta', Scalar.new(beta));
    return g.multiply(betaTensor, g.reduceSum(g.square(network)));
  }

  private getTestData(): NDArray[][] {
    const data = this.dataSet.getData();
    if (data == null) {
      return null;
    }
    const [images, labels] = this.dataSet.getData() as [NDArray[], NDArray[]];

    const start = Math.floor(TRAIN_TEST_RATIO * images.length);

    return [images.slice(start), labels.slice(start)];
  }

  private getTrainingData(): NDArray[][] {
    const [images, labels] = this.dataSet.getData() as [NDArray[], NDArray[]];

    const end = Math.floor(TRAIN_TEST_RATIO * images.length);

    return [images.slice(0, end), labels.slice(0, end)];
  }

  private getTrainingCount() {
    const [images, labels] = this.dataSet.getData() as [NDArray[], NDArray[]];
    return TRAIN_TEST_RATIO * images.length;
  }

  async startInference() {
    const testData = this.getTestData();
    console.log(`Running inference on ${testData.length} points.`);

    const inferenceShuffledInputProviderGenerator =
      new InCPUMemoryShuffledInputProviderBuilder(testData);
    const [inferenceInputProvider, inferenceLabelProvider] =
      inferenceShuffledInputProviderGenerator.getInputProviders();

    const inferenceFeeds = [
      {tensor: this.inputTensor, data: inferenceInputProvider},
      {tensor: this.labelTensor, data: inferenceLabelProvider}
    ];

    const result = this.session.eval(this.predictionTensor, inferenceFeeds);
    console.log(await result.data());
  }

  predict(input: NDArray) {
    const inferenceFeeds = [
      {tensor: this.inputTensor, data: input}
    ];
    return this.session.eval(this.predictionTensor, inferenceFeeds);
  }
}
