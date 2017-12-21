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
import StreamingFeatureExtractor from './StreamingFeatureExtractor';
import {
  plotAudio, plotCoeffs, plotFFT, plotFilterbank, plotSpectrogram,
  downloadSpectrogramImage,
  createLayout
} from './PlotGraphs';

const bufferLength = 1024;
const hopLength = 512;
const melCount = 40;

let arrayBuffer;
let mfccSpec;

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
  const fft = AudioUtils.fft(arrayBuffer);
  const fftEnergies = AudioUtils.fftEnergies(fft);
  const fftEl = plotFFT(fftEnergies,
    createLayout('Frequency domain', 'frequency (Hz)', 'power (dB)', {logX: false}));
  outEl.appendChild(fftEl);

  // Calculate a Mel filterbank.
  const melFilterbank = AudioUtils.createMelFilterbank(fftEnergies.length, melCount);
  const melEl = plotFilterbank(melFilterbank,
    createLayout('Mel filterbank', 'frequency (Hz)', 'percent'));
  outEl.appendChild(melEl);

  // Apply the Mel filterbank to that FFT output.
  const melEnergies = AudioUtils.applyFilterbank(fftEnergies, melFilterbank);
  const melCoeffEl = plotCoeffs(melEnergies,
    createLayout('Mel coefficients', 'mel filter number', 'energy'));
  outEl.appendChild(melCoeffEl);

  // Calculate the MFCC from the Mel coefficients.
  const mfcc = AudioUtils.cepstrumFromEnergySpectrum(melEnergies);
  const mfccEl = plotCoeffs(mfcc.slice(0, 13), createLayout('Mel Frequency Cepstral ' +
    'Coefficients (MFCC)', 'mel filter number', 'energy'));
  outEl.appendChild(mfccEl);

  // Calculate STFT from the ArrayBuffer.
  const stft = AudioUtils.stft(arrayBuffer, bufferLength, hopLength);

  // Each STFT column is an FFT array which is interleaved complex. For STFT
  // rendering, we want to show only the magnitudes.
  const stftEnergies = stft.map(fft => AudioUtils.fftEnergies(fft));

  const specEl = plotSpectrogram(stftEnergies, hopLength,
    createLayout('STFT energy spectrogram', 'time (s)', 'frequency (Hz)', {logY: true}));
  outEl.appendChild(specEl);

  // Calculate mel energy spectrogram from STFT.
  const melSpec = AudioUtils.melSpectrogram(stftEnergies, melCount);
  const melSpecEl = plotSpectrogram(melSpec, hopLength,
    createLayout('Mel energy spectrogram', 'time (s)', 'mel bin'));
  outEl.appendChild(melSpecEl);

  // Calculate the MFCC spectrogram from the STFT.
  mfccSpec = AudioUtils.mfccSpectrogram(stftEnergies, 13);
  const mfccSpecEl = plotSpectrogram(mfccSpec, hopLength,
    createLayout('MFCC spectrogram', 'time (s)', 'mfcc bin'));
  outEl.appendChild(mfccSpecEl);
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

const streamFeature = new StreamingFeatureExtractor({
  bufferLength: 1024,
  hopLength: 512,
  duration: 1,
  targetSr: 16000,
  melCount: melCount,
  isMfccEnabled: true,
});

streamEl.addEventListener('click', e => {
  if (streamFeature.isStreaming) {
    streamFeature.stop();
    const buffer = streamFeature.getLastPlaybackBuffer();
    console.log(`Got a stream buffer of length ${buffer.length}.`);
    analyzeArrayBuffer(buffer);
    streamEl.innerHTML = 'Stream';
  } else {
    streamFeature.start();
    streamEl.innerHTML = 'Stop streaming';
  }
});

downloadEl.addEventListener('click', e => {
  // Download the mel spectrogram.
  AudioUtils.normalizeSpecInPlace(mfccSpec);
  downloadSpectrogramImage(mfccSpec);
});

loadEl.addEventListener('change', function(e) {
  const files = this.files;
  const fileUrl = URL.createObjectURL(files[0]);
  AudioUtils.loadBuffer(fileUrl).then(analyzeAudioBuffer);
});

playEl.addEventListener('click', e => {
  AudioUtils.playbackArrayBuffer(arrayBuffer);
});
