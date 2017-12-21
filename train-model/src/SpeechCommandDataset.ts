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

import AudioUtils from '../../audio-features/src/AudioUtils';
import {EventEmitter} from 'eventemitter3';
import FeatureExtractor from './FeatureExtractor';
import {Array1D, Array3D, NDArray, InMemoryDataset} from 'deeplearn';

const INPUT_INDEX = 0;
const LABEL_INDEX = 1;
// How much background noise to add to the spoken classes.
const SPEECH_BG_GAIN = 0.05;
// How much background noise gain to add to the silence class.
const SILENCE_BG_GAIN = 0.2;
// How long (in seconds) each example is in the batched audio training data.
const BATCH_EXAMPLE_DURATION = 1;
const EXAMPLE_SR = 16000;

const DATA_ROOT = 'speech_commands_v0.01'
const BACKGROUND_LIST = 'background.txt';

interface DataSetConfig {
  labelNames?: string[]
  dataUrl: string
  isMfccEnabled: boolean
  dataExtension: string
}

export default class SpeechCommandDataset extends InMemoryDataset {
  labelNames: string[]
  dataUrl: string
  dataExtension: string
  isMfccEnabled: boolean
  buffers: {[key: string]: Float32Array}

  inputs: Array3D[]
  labels: Array1D[]
  metadata: string[]
  dataset: any

  timestamp: number
  loadedSinceTimestamp: number

  // Where to store background noise arrays.
  backgroundBuffers: Float32Array[]

  // DEBUG ONLY.
  debugBuffers: Float32Array[]

  progress: EventEmitter

  constructor(inputShape, labelShape, params: DataSetConfig) {
    super([inputShape, labelShape]);

    const {labelNames, dataUrl, dataExtension, isMfccEnabled} = params;
    this.labelNames = labelNames;
    this.dataUrl = dataUrl;
    this.dataExtension = dataExtension;
    this.isMfccEnabled = isMfccEnabled;

    this.inputs = [];
    this.labels = [];
    this.metadata = [];
    this.debugBuffers = [];
    this.dataset = [this.inputs, this.labels, this.metadata, this.debugBuffers];

    this.timestamp = null;
    this.loadedSinceTimestamp = 0;
    this.backgroundBuffers = [];
    this.buffers = {};

    this.progress = new EventEmitter();
  }

  async fetchAll() {
    return this.fetchBackgroundNoise().then(e => {
      return this.fetchData();
    });
  }

  getCount() {
    return this.inputs.length;
  }

  /**
   * Loads big wav/mp3s that were created by concatenating all training examples
   * with the same label into one file. Examples are spaced every 1s.
   */
  async fetchData() {
    const chunkLength = BATCH_EXAMPLE_DURATION * EXAMPLE_SR;
    // Fetch data for all of the labels we care about.
    for (let [labelIndex, label] of this.labelNames.entries()) {
      // Ignore the "silence" label.
      if (label == 'silence') {
        continue;
      }
      const filename = `${label}.${this.dataExtension}`;
      const url = `${this.dataUrl}/${filename}`;
      const audioBuffer = await AudioUtils.loadBufferOffline(url);
      const buffer = audioBuffer.getChannelData(0);
      this.buffers[label] = buffer;
      const chunkCount = Math.floor(buffer.length / chunkLength);
      const message = `Downloaded ${filename}, containing ${chunkCount} examples.`;
      const percentProgress = (labelIndex + 1) / this.labelNames.length;
      this.emitProgressUpdate(percentProgress / 2, message);
    }

    this.emitProgressUpdate(0.5, 'Unpacking audio into examples...');

    let labelIndex = 0;
    for (let label in this.buffers) {
      // Split the buffer into chunks of 1s each, and use each chunk as an
      // training example.
      const buffer = this.buffers[label];
      const chunkCount = Math.floor(buffer.length / chunkLength);
      for (let i = 0; i < chunkCount; i++) {
        // Add this chunk to the training data.
        const chunk = buffer.slice(i * chunkLength, (i+1) * chunkLength);
        // First add random background noise to each sample.
        const bgNoise = this.randomBackgroundBuffer(chunk.length, SPEECH_BG_GAIN);
        pointwiseAddInPlace(chunk, bgNoise);

        const input = FeatureExtractor.bufferToFeature(chunk, this.isMfccEnabled);
        this.addExample(input, label, `batch-${label}`, chunk);

        if (i % 50 == 0) {
          const message = `Extracted ${i} of ${chunkCount} examples labeled ${label}.`;
          // Wait an instance to let the DOM update.
          await sleep(0.01);
          const totalChunks = chunkCount * this.labelNames.length;
          const chunksPerLabel = totalChunks / this.labelNames.length;
          const currentChunk = labelIndex * chunksPerLabel + i;
          const percentProgress = currentChunk / totalChunks;
          // Half is downloading, half is feature extraction.
          this.emitProgressUpdate((1 + percentProgress) / 2, message);
        }
      }
      labelIndex += 1;
    }
    this.emitProgressUpdate(1, 'Loading complete!');
  }

  async fetchBackgroundNoise() {
    const url = `${this.dataUrl}/_background_noise_.${this.dataExtension}`;
    return AudioUtils.loadBuffer(url).then((audioBuffer: AudioBuffer) => {
      const buffer = audioBuffer.getChannelData(0);
      this.backgroundBuffers.push(buffer);
    });
  }

  normalize() {
    this.normalizeWithinBounds(INPUT_INDEX, 0, 1);
  }

  addSilence(exampleCount: number, label: string) {
    // Use a random background noise array for silence, with no utterance.
    for (let i = 0; i < exampleCount; i++) {
      // TODO: Fix this hard coded crap.
      const silenceBuffer = this.randomBackgroundBuffer(EXAMPLE_SR,
        Math.random() * SILENCE_BG_GAIN);
      const input = FeatureExtractor.bufferToFeature(silenceBuffer);
      this.addExample(input, label, 'silence', silenceBuffer);
    }
    console.log(`Adding ${exampleCount} examples of ${label}.`);
  }

  private addExample(input, labelName, metadata, buffer: Float32Array) {
    const label = this.labelToOneHot(labelName)

    // Insert the example at a random index, so we end up with a shuffled array.
    const ind = Math.floor(Math.random() * this.inputs.length);
    this.inputs.splice(ind, 0, input);
    this.labels.splice(ind, 0, label);
    this.metadata.splice(ind, 0, metadata);
    // Save the buffer for later investigation.
    this.debugBuffers.splice(ind, 0, buffer);
  }

  private labelToOneHot(label: string) {
    const shape = [this.dataShapes[LABEL_INDEX][0]];
    const oneHot = Array1D.zeros(shape, 'float32');
    const index = this.labelNames.indexOf(label);
    oneHot.set(1, index);
    return oneHot;
  }

  private randomBackgroundBuffer(length: number, gain: number) {
    const out = new Float32Array(length);
    // Pick a random buffer.
    const buffer = randomChoice(this.backgroundBuffers);
    // Pick a random part of that buffer to match our length.
    const ind = Math.floor((buffer.length - length) * Math.random());
    out.set(buffer.slice(ind, ind + length));
    pointwiseMultiplyInPlace(out, gain);
    return out;
  }

  private emitProgressUpdate(percent: number, message: string) {
    this.progress.emit('update', percent, message);
  }
}

function randomChoice(arr) {
  const ind = Math.floor(Math.random() * arr.length);
  return arr[ind];
}

function pointwiseAddInPlace(target: Float32Array, arr: Float32Array) {
  if (target.length != arr.length) {
    console.error(`Arrays aren't the same size (${target.length} !=
      ${arr.length}).`);
    return;
  }
  for (let i = 0; i < target.length; i++) {
    target[i] += arr[i];
  }
}

function pointwiseMultiplyInPlace(target: Float32Array, gain: number) {
  for (let i = 0; i < target.length; i++) {
    target[i] *= gain;
  }
}

async function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time * 1000);
  });
}
