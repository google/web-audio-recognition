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
import {Array1D} from 'deeplearn';
import AudioUtils from '../../audio-features/src/AudioUtils';
import FeatureExtractor, {BUFFER_LENGTH, EXAMPLE_SR, HOP_LENGTH,
    MEL_COUNT, IS_MFCC_ENABLED} from './FeatureExtractor';
import {saveGraphWeights, loadGraphWeights} from './GraphSaverLoader';
import {saveGraphWeightsJSON, loadGraphWeightsJSON} from './GraphSaverLoader';
import LinePlot from './LinePlot';
import ModelBuilder from './ModelBuilder';
import {plotSpectrogram, downloadSpectrogramImage, createLayout} from '../../audio-features/src/PlotGraphs';
import SpeechCommandDataset from './SpeechCommandDataset';
import StreamingFeatureExtractor
    from '../../audio-features/src/StreamingFeatureExtractor';
import {labelArrayToString, argmax, getParameterByName} from './util';

const SILENCE_LABEL = 'silence';
const SILENCE_PERCENTAGE = 0.3;

const modelParam = getParameterByName('model');
const dataUrlParam = getParameterByName('data_url') || 'data';
const dataExtensionParam = getParameterByName('data_extension') || 'wav';

let ALL_LABELS = ['yes', 'no', 'other', SILENCE_LABEL];

if (modelParam == 'number') {
  ALL_LABELS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
    'eight', 'nine', 'other', SILENCE_LABEL];
} else if (modelParam == 'all') {
  ALL_LABELS = ['bed', 'bird', 'cat', 'dog', 'down', 'eight', 'five',
    'four', 'go', 'happy', 'house', 'left', 'marvin', 'nine', 'no', 'off', 'on',
    'one', 'right', 'seven', 'sheila', 'six', 'stop', 'three', 'tree', 'two',
    'up', 'wow', 'yes', 'zero', SILENCE_LABEL];
  dataUrlParam = 'data_all';
}

const labelShape = [ALL_LABELS.length];
const inputShape = FeatureExtractor.getFeatureShape();
const IS_TRAINING_MODE = true;

// Load some part of the speech command training set.
const config = {
  labelNames: ALL_LABELS,
  isMfccEnabled: IS_MFCC_ENABLED,
  dataUrl: dataUrlParam,
  dataExtension: dataExtensionParam,
}

const dataSet = new SpeechCommandDataset(inputShape, labelShape, config);
dataSet.progress.on('update', onDataLoadUpdate);

// Load the model.
const model = new ModelBuilder(inputShape, labelShape, dataSet);
model.createModel();
model.progress.on('accuracy', onTrainAccuracyUpdate);
model.progress.on('cost', onTrainCostUpdate);

if (IS_TRAINING_MODE) {
  dataSet.fetchAll().then(() => {
    // Add some silence, at some percentage.
    const total = dataSet.getCount();
    const silenceCount = Math.floor(total * SILENCE_PERCENTAGE);
    dataSet.addSilence(silenceCount, SILENCE_LABEL);

    //model.startTraining();
  });
}

const progressEl = document.querySelector('#progress-bar') as HTMLElement;
const progressLabelEl = document.querySelector('#progress-label') as HTMLElement;
const trainEl = document.querySelector('#train') as HTMLElement;
const predictEl = document.querySelector('#predict') as HTMLElement;
const streamEl = document.querySelector('#stream') as HTMLElement;
const plotEl = document.querySelector('#plot') as HTMLElement;
const saveEl = document.querySelector('#save') as HTMLElement;
const saveFileEl = document.querySelector('#save-file') as HTMLElement;
const loadEl = document.querySelector('#load') as HTMLElement;
const loadFileEl = document.querySelector('#load-file') as HTMLElement;
const outEl = document.querySelector('#out') as HTMLElement;

let trainPlot = null;
function onTrain() {
  if (model.isTraining) {
    model.stopTraining();
    trainEl.innerHTML = 'Train';
  } else {
    model.startTraining();
    trainEl.innerHTML = 'Stop training';

    trainPlot = new LinePlot({
      title: 'Training score',
      axisTitles: ['Cost', 'Accuracy'],
    });
    const parentEl = document.querySelector('#out');
    parentEl.innerHTML = '';
    parentEl.appendChild(trainPlot.getElement());
  }
}

function onPredict(e) {
  const files = this.files;
  const fileUrl = URL.createObjectURL(files[0]);
  AudioUtils.loadBuffer(fileUrl).then((audioBuffer: AudioBuffer) => {
    const buffer = audioBuffer.getChannelData(0);
    const feature = FeatureExtractor.bufferToFeature(buffer, IS_MFCC_ENABLED);

    const spec = FeatureExtractor.featureToSpectrogram(feature);

    const pred = model.predict(feature);
    const labelArray = pred.dataSync() as Float32Array;
    const predLabel = labelArrayToString(labelArray, ALL_LABELS);
    console.log(`File predicted: ${predLabel}.`);

    const plotEl = plotSpectrogram(spec, HOP_LENGTH,
      createLayout(`MFCC spectrogram (prediction: ${predLabel})`, 'time (s)', 'mel bin'));
    outEl.insertBefore(plotEl, outEl.firstChild);
  });
}

let streamPlot = null;
let start = new Date().valueOf();
const streamFeature = new StreamingFeatureExtractor({
  bufferLength: BUFFER_LENGTH,
  hopLength: HOP_LENGTH,
  isMfccEnabled: IS_MFCC_ENABLED,
  targetSr: EXAMPLE_SR,
  melCount: MEL_COUNT,
  duration: 1,
});
streamFeature.on('update', e => {
  const spec = streamFeature.getSpectrogram();
  const input = FeatureExtractor.melSpectrogramToInput(spec);
  const pred = model.predict(input).dataSync() as Float32Array;
  const predLabel = labelArrayToString(pred, ALL_LABELS);
  const [ind, val] = argmax(pred);
  const elapsed = new Date().valueOf() - start;
  streamPlot.add(elapsed, [val, ind]);

  console.log(`Got prediction: ${predLabel}, value: ${val}.`);
});

function onStream() {
  if (streamFeature.isStreaming) {
    streamFeature.stop();
    streamEl.innerHTML = 'Stream';
  } else {
    streamFeature.start();
    streamEl.innerHTML = 'Stop streaming';

    streamPlot = new LinePlot({
      title: 'Streaming score'
      axisTitles: ['Score', 'Label Index'],
    });
    const parentEl = document.querySelector('#out');
    parentEl.innerHTML = '';
    parentEl.appendChild(streamPlot.getElement());
  }
}

function onPlot() {
  if (streamFeature.isStreaming) {
    const spec = streamFeature.getSpectrogram();
    const input = FeatureExtractor.melSpectrogramToInput(spec);
    const spec2 = FeatureExtractor.featureToSpectrogram(input);
    const plotEl = plotSpectrogram(spec2,
      streamFeature.hopLength,
      createLayout(`MFCC spectrogram snapshot`, 'time (s)', 'mel bin'));
    outEl.insertBefore(plotEl, outEl.firstChild);
    return;
  }
  // Render a random input vector.
  const [images, labels, metas, buffers] = dataSet.getData();
  const ind = Math.floor(Math.random() * images.length);
  const feature = images[ind];
  const labelArray = labels[ind].dataSync() as Float32Array;
  const label = labelArrayToString(labelArray, ALL_LABELS);
  const spec = FeatureExtractor.featureToSpectrogram(feature);
  const plotEl = plotSpectrogram(spec, HOP_LENGTH,
    createLayout(`MFCC spectrogram (label: ${label})`, 'time (s)', 'mel bin'));
  outEl.insertBefore(plotEl, outEl.firstChild);

  // Playback the audio.
  const buffer = buffers[ind] as any;
  AudioUtils.playbackArrayBuffer(buffer, EXAMPLE_SR);
}

function onSave() {
  if (!model.graph) {
    console.error('Attempt to save model without graph.');
    return;
  }
  // Save the weights of the current model to IDB storage.
  saveGraphWeights(model.graph, model.session);
}

function onSaveFile() {
  if (!model.graph) {
    console.error('Attempt to save model without graph.');
    return;
  }

  // Save the weights to a file.
  const json = saveGraphWeightsJSON(model.graph, model.session);
  downloadStringAsFile(json, 'weights.json', 'application/json');
}

async function onLoad() {
  if (!model.graph) {
    console.error('Attempt to load model without graph.');
    return;
  }
  const weights = await loadGraphWeights(model.graph);
  model.createModel(weights);
}

function downloadStringAsFile(str: string, filename: string, mimeType: string) {
  const link = document.createElement('a');
  link.setAttribute('download', filename);
  const blob = new Blob([str], {type: mimeType});
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.click();
}

async function onLoadFile(e) {
  const files = this.files;
  const fileUrl = URL.createObjectURL(files[0]);
  const response = await fetch(fileUrl);
  const json = await response.json();
  const weights = loadGraphWeightsJSON(model.graph, json);
  model.createModel(weights);
}

function onDataLoadUpdate(percentProgress: number, message: string) {
  console.log(message);
  const barEl = progressEl.querySelector('.mdc-linear-progress__bar') as HTMLElement;
  const bufferEl = progressEl.querySelector('.mdc-linear-progress__buffer') as HTMLElement;
  barEl.style.transform = `scaleX(${percentProgress})`;
  bufferEl.style.transform = `scaleX(${percentProgress})`;
  progressLabelEl.innerHTML = message;

  if (percentProgress == 1) {
    progressEl.style.display = 'none';
    progressLabelEl.style.display = 'none';
  }
}

function onTrainAccuracyUpdate(e) {
  trainPlot.add(trainPlot.elapsed(), [null, e.accuracy]);
}

function onTrainCostUpdate(e) {
  trainPlot.add(trainPlot.elapsed(), [e.cost, null]);
}

trainEl.addEventListener('click', onTrain);
predictEl.addEventListener('change', onPredict);
streamEl.addEventListener('click', onStream);
plotEl.addEventListener('click', onPlot);
saveEl.addEventListener('click', onSave);
saveFileEl.addEventListener('click', onSaveFile);
loadEl.addEventListener('click', onLoad);
loadFileEl.addEventListener('change', onLoadFile);
