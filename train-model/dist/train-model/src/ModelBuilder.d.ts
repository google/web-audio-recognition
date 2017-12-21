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
import { Graph, NDArray, NDArrayMathGPU, Optimizer, Session, Tensor } from 'deeplearn';
import { EventEmitter } from 'eventemitter3';
import { GraphWeights } from './GraphSaverLoader';
import SpeechCommandDataset from './SpeechCommandDataset';
export default class ModelBuilder {
    modelInitialized: boolean;
    session: Session;
    graph: Graph;
    optimizer: Optimizer;
    math: NDArrayMathGPU;
    inputShape: number[];
    labelShape: number[];
    learningRate: number;
    inputTensor: Tensor;
    labelTensor: Tensor;
    regularizationTensor: Tensor;
    predictionTensor: Tensor;
    costTensor: Tensor;
    accuracyTensor: Tensor;
    nodeIndex: number;
    dataSet: SpeechCommandDataset;
    totalTimeSec: number;
    isTraining: boolean;
    progress: EventEmitter;
    constructor(inputShape: any, labelShape: any, dataSet?: any);
    createModel(loadedWeights?: GraphWeights): void;
    setLearningRate(learningRate: number): void;
    startTraining(): Promise<void>;
    getTestAccuracy(limit?: number): Promise<number>;
    stopTraining(): void;
    private addConv2d(g, network, outputDepth, init?);
    private addRelu(g, network);
    private addMaxPool(g, network);
    private addFlatten(g, network);
    private addFullyConnected(g, network, init?);
    private addRegularization(g, network);
    private getTestData();
    private getTrainingData();
    private getTrainingCount();
    startInference(): Promise<void>;
    predict(input: NDArray): NDArray<"float32" | "int32" | "bool">;
}
