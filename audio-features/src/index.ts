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

import AudioUtils from './AudioUtils';
import * as melspec from './MelSpectrogram';
import StreamingFeatureExtractor from './StreamingFeatureExtractor';
import {
  plotAudio, plotCoeffs, plotFFT, plotFilterbank, plotSpectrogram,
  downloadSpectrogramImage,
  createLayout
} from './PlotGraphs';

const nFft = 2048;
const hopLength = 1024;
const nMels = 30;

let arrayBuffer;
let melSpec;

const outEl = document.querySelector('#out');
const streamEl = document.querySelector('#stream');
const loadEl = document.querySelector('#load');
const downloadEl = document.querySelector('#download');
const playEl = document.querySelector('#play');

function analyzeAudioBuffer(audioBuffer: AudioBuffer) {
  analyzeArrayBuffer(audioBuffer.getChannelData(0));
}

function analyzeArrayBuffer(buffer: Float32Array) {
  //const start = 0.2 * 44100;
  //arrayBuffer = buffer.slice(start, start + 1024);
  arrayBuffer = buffer;
  // Clear the output element.
  outEl.innerHTML = '';

  const audioEl = plotAudio(arrayBuffer,
    createLayout('Time domain', 'time (s)', 'pressure'));
  outEl.appendChild(audioEl);

  // Calculate FFT from ArrayBuffer.
  const bufferPow2 = arrayBuffer.slice(0, pow2LessThan(arrayBuffer.length));
  const fft = melspec.fft(bufferPow2);
  const fftEnergies = melspec.mag(fft);
  const fftEl = plotFFT(fftEnergies,
    createLayout('Frequency domain', 'frequency (Hz)', 'power (dB)', {logX: false}));
  outEl.appendChild(fftEl);

  // Calculate a Mel filterbank.
  const melFilterbank = melspec.createMelFilterbank({
    sampleRate: 44100,
    nFft: bufferPow2.length,
    nMels: 32,
  });
  const melEl = plotFilterbank(melFilterbank,
    createLayout('Mel filterbank', 'frequency (Hz)', 'percent'));
  outEl.appendChild(melEl);

  // Calculate STFT from the ArrayBuffer.
  const stftEnergies = melspec.spectrogram(arrayBuffer, {sampleRate: 44100});
  const specEl = plotSpectrogram(stftEnergies, hopLength,
    createLayout('STFT energy spectrogram', 'time (s)', 'frequency (Hz)', {logY: true}));
  outEl.appendChild(specEl);

  // Calculate mel energy spectrogram from STFT.
  melSpec = melspec.melSpectrogram(arrayBuffer, {sampleRate: 44100, nMels, hopLength, nFft});
  const melSpecEl = plotSpectrogram(melSpec, hopLength,
    createLayout('Mel energy spectrogram', 'time (s)', 'mel bin'));
  outEl.appendChild(melSpecEl);
}

function main() {
  // Load a short sine buffer.
  AudioUtils.loadExampleBuffer().then(analyzeAudioBuffer);
}

function min(arr: any[]) {
  return arr.reduce((a, b) => Math.min(a, b));
}
function max(arr: any[]) {
  return arr.reduce((a, b) => Math.max(a, b));
}

window.addEventListener('load', main);

const specParams = {
  sampleRate: 16000,
  winLength: 2048,
  hopLength: 512,
  fMin: 30,
  nMels: 229
};
const streamFeature = new StreamingFeatureExtractor(specParams);

streamEl.addEventListener('click', e => {
  if (streamFeature.isStreaming) {
    streamFeature.stop();
    streamEl.innerHTML = 'Stream';
  } else {
    streamFeature.start();
    streamFeature.on('feature', melSpec => {
      const melSpecEl = plotSpectrogram(melSpec, hopLength,
        createLayout('Mel energy spectrogram', 'time (s)', 'mel bin'));
      outEl.innerHTML = '';
      outEl.appendChild(melSpecEl);
    });
    streamEl.innerHTML = 'Stop streaming';
  }
});

downloadEl.addEventListener('click', e => {
  // Download the mel spectrogram.
  downloadSpectrogramImage(melSpec);
});

loadEl.addEventListener('change', function(e) {
  const files = this.files;
  const fileUrl = URL.createObjectURL(files[0]);
  AudioUtils.loadBuffer(fileUrl).then(analyzeAudioBuffer);
});

playEl.addEventListener('click', e => {
  AudioUtils.playbackArrayBuffer(arrayBuffer);
});

function pow2LessThan(value: number) {
  const exp = Math.log2(value);
  return Math.pow(2, Math.floor(exp));
}
