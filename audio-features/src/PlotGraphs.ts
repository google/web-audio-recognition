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

const sr = 44100;
const nyquist = sr / 2;

interface LayoutParams {
  logX?: boolean
  logY?: boolean
}

export function plotAudio(y, layout) {
  let t = y.map((value, index) => (index / sr));
  return plotXY(t, y, layout);
}

export function plotCoeffs(y, layout) {
  let ind = y.map((value, index) => index);
  return plotXY(ind, y, layout);
}

export function plotFFT(fftMags, layout) {
  // Convert magnitudes to dB.
  const dbs = fftMags.map(val => 20 * Math.log10(val))
  const times = fftMags.map((value, index) => index / fftMags.length * nyquist);
  return plotXY(times, fftMags, layout);
}

export function plotFilterbank(filterbank: Float32Array[], layout) {
  let filter = filterbank[0];
  const inds = filter.map((value, index) => index);
  return plotXYs(inds, filterbank, layout, 8000);
}

export function plotSpectrogram(spec, samplesPerSlice, layout) {
  // The STFT as given is an Float32Array[]. We need to render that matrix as an
  // image.
  return plotImage(spec, samplesPerSlice, layout);
}

/**
 * Download the spectrogram as an image.
 */
interface SpecParams {
  samplesPerSlice: number
}

export function downloadSpectrogramImage(spec: Float32Array[]) {
  // Render the spectrogram into a 2D canvas.
  const canvas = document.createElement('canvas');
  const times = spec.length;
  const freqs = spec[0].length;
  canvas.width = times;
  canvas.height = freqs;
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < times; i++) {
    for (let j = 0; j < freqs; j++) {
      const val = Math.floor(spec[i][j] * 255);
      ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
      ctx.strokeStyle = null;
      ctx.fillRect(i, j, 1, 1);
    }
  }

  // Download the canvas.
  var link = document.createElement('a');
  link.setAttribute('download', 'spec.png');
  link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
  link.click();
}

function plotImage(stft, samplesPerSlice, layout) {
  let out = document.createElement('div');
  out.className = 'plot';
  // Transpose the spectrogram we pass in.
  let zArr = [];
  for (let i = 0; i < stft.length; i++) {
    for (let j = 0; j < stft[0].length; j++) {
      if (zArr[j] == undefined) {
        zArr[j] = [];
      }
      zArr[j][i] = stft[i][j];
    }
  }
  // Calculate the X values (times) from the stft params.
  const xArr = stft.map((value, index) => index * samplesPerSlice / sr);
  // Calculate Y values (frequencies) from stft.
  const fft = Array.prototype.slice.call(stft[0]);
  const yArr = fft.map((value, index) => (index / fft.length) * nyquist);

  const data = [
    {
      x: xArr,
      y: yArr,
      z: zArr,
      type: 'heatmap' as 'heatmap'
    }
  ];
  Plotly.newPlot(out, data, layout);
  return out;
}

function plotXY(x: Float32Array, y: Float32Array, layout) {
  const out = document.createElement('div');
  out.className = 'plot';
  const xArr = Array.prototype.slice.call(x);
  const yArr = Array.prototype.slice.call(y);
  const data = [{
    x: xArr,
    y: yArr,
  }]
  Plotly.plot(out, data, layout);
  return out;
}

function plotXYs(x: Float32Array, y: Float32Array[], layout, maxFreq: number) {
  const out = document.createElement('div');
  out.className = 'plot';
  const xArr = Array.prototype.slice.call(x);

  const data = y.map(y_i => {
    const yArr = Array.prototype.slice.call(y_i);
    return {
      x: xArr.slice(0, maxFreq),
      y: yArr.slice(0, maxFreq),
    }
  });
  Plotly.plot(out, data, layout);
  return out;
}

export function createLayout(title, xTitle, yTitle, params: LayoutParams={}) {
  const logY = (params.logY == true);
  const logX = (params.logX == true);
  return {
    title: title,
    xaxis: {
      title: xTitle,
      type: logX ? 'log' : null,
    },
    yaxis: {
      title: yTitle,
      type: logY ? 'log' : null,
    }
  };
}

