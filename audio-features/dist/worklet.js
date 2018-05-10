/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Save Float32Array in arbitrarily sized chunks.
 * Load Float32Array in arbitrarily sized chunks.
 * Determine if there's enough data to grab a certain amount.
 */
class CircularAudioBuffer {
    constructor(maxLength) {
        this.buffer = new Float32Array(maxLength);
        this.currentIndex = 0;
    }
    /**
     * Add a new buffer of data. Called when we get new audio input samples.
     */
    addBuffer(newBuffer) {
        // Do we have enough data in this buffer?
        const remaining = this.buffer.length - this.currentIndex;
        if (this.currentIndex + newBuffer.length > this.buffer.length) {
            console.error(`Not enough space to write ${newBuffer.length}` +
                ` to this circular buffer with ${remaining} left.`);
            return;
        }
        this.buffer.set(newBuffer, this.currentIndex);
        //console.log(`Wrote ${newBuffer.length} entries to index ${this.currentIndex}.`);
        this.currentIndex += newBuffer.length;
    }
    /**
     * How many samples are stored currently?
     */
    getLength() {
        return this.currentIndex;
    }
    /**
     * How much space remains?
     */
    getRemainingLength() {
        return this.buffer.length - this.currentIndex;
    }
    /**
     * Return the first N samples of the buffer, and remove them. Called when we
     * want to get a buffer of audio data of a fixed size.
     */
    popBuffer(length) {
        // Do we have enough data to read back?
        if (this.currentIndex < length) {
            console.error(`This circular buffer doesn't have ${length} entries in it.`);
            return;
        }
        if (length == 0) {
            console.warn(`Calling popBuffer(0) does nothing.`);
            return;
        }
        const popped = this.buffer.slice(0, length);
        const remaining = this.buffer.slice(length, this.buffer.length);
        // Remove the popped entries from the buffer.
        this.buffer.fill(0);
        this.buffer.set(remaining, 0);
        // Send the currentIndex back.
        this.currentIndex -= length;
        return popped;
    }
    /**
     * Get the the first part of the buffer without mutating it.
     */
    getBuffer(length) {
        if (!length) {
            length = this.getLength();
        }
        // Do we have enough data to read back?
        if (this.currentIndex < length) {
            console.error(`This circular buffer doesn't have ${length} entries in it.`);
            return;
        }
        return this.buffer.slice(0, length);
    }
    clear() {
        this.currentIndex = 0;
        this.buffer.fill(0);
    }
}
exports.default = CircularAudioBuffer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FFT = __webpack_require__(4);
function magSpectrogram(stft, power) {
    //console.log(`magSpectrogram on ${stft.length} x ${stft[0].length} power=${power}`);
    const spec = stft.map(fft => pow(mag(fft), power));
    const nFft = stft[0].length - 1;
    return [spec, nFft];
}
exports.magSpectrogram = magSpectrogram;
function stft(y, params) {
    const nFft = params.nFft || 2048;
    const winLength = params.winLength || nFft;
    const hopLength = params.hopLength || Math.floor(winLength / 4);
    let fftWindow = hannWindow(winLength);
    // Pad the window to be the size of nFft.
    fftWindow = padCenterToLength(fftWindow, nFft);
    // Pad the time series so that the frames are centered.
    y = padReflect(y, Math.floor(nFft / 2));
    // Window the time series.
    const yFrames = frame(y, nFft, hopLength);
    //console.log(`Split audio into ${yFrames.length} frames of ${yFrames[0].length} each.`);
    // Pre-allocate the STFT matrix.
    const stftMatrix = [];
    const width = yFrames.length;
    const height = nFft + 2;
    //console.log(`Creating STFT matrix of size ${width} x ${height}.`);
    for (let i = 0; i < width; i++) {
        // Each column is a Float32Array of size height.
        const col = new Float32Array(height);
        stftMatrix[i] = col;
    }
    for (let i = 0; i < width; i++) {
        // Populate the STFT matrix.
        const winBuffer = applyWindow(yFrames[i], fftWindow);
        const col = fft(winBuffer);
        stftMatrix[i].set(col.slice(0, height));
    }
    return stftMatrix;
}
exports.stft = stft;
function spectrogram(y, params) {
    if (!params.power) {
        params.power = 1;
    }
    const stftMatrix = stft(y, params);
    const [spec, nFft] = magSpectrogram(stftMatrix, params.power);
    return spec;
}
exports.spectrogram = spectrogram;
function melSpectrogram(y, params) {
    if (!params.power) {
        params.power = 2.0;
    }
    const stftMatrix = stft(y, params);
    const [spec, nFft] = magSpectrogram(stftMatrix, params.power);
    params.nFft = nFft;
    const melBasis = createMelFilterbank(params);
    return applyWholeFilterbank(spec, melBasis);
}
exports.melSpectrogram = melSpectrogram;
function applyWholeFilterbank(spec, filterbank) {
    // Apply a point-wise dot product between the array of arrays.
    const out = [];
    for (let i = 0; i < spec.length; i++) {
        out[i] = applyFilterbank(spec[i], filterbank);
    }
    return out;
}
exports.applyWholeFilterbank = applyWholeFilterbank;
function applyFilterbank(mags, filterbank) {
    if (mags.length != filterbank[0].length) {
        throw new Error(`Each entry in filterbank should have dimensions ` +
            `matching FFT. |mags| = ${mags.length}, ` +
            `|filterbank[0]| = ${filterbank[0].length}.`);
    }
    // Apply each filter to the whole FFT signal to get one value.
    let out = new Float32Array(filterbank.length);
    for (let i = 0; i < filterbank.length; i++) {
        // To calculate filterbank energies we multiply each filterbank with the
        // power spectrum.
        const win = applyWindow(mags, filterbank[i]);
        // Then add up the coefficents.
        out[i] = sum(win);
    }
    return out;
}
exports.applyFilterbank = applyFilterbank;
function applyWindow(buffer, win) {
    if (buffer.length != win.length) {
        console.error(`Buffer length ${buffer.length} != window length ${win.length}.`);
        return;
    }
    let out = new Float32Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
        out[i] = win[i] * buffer[i];
    }
    return out;
}
exports.applyWindow = applyWindow;
function padCenterToLength(data, length) {
    // If data is longer than length, error!
    if (data.length > length) {
        throw new Error('Data is longer than length.');
    }
    const paddingLeft = Math.floor((length - data.length) / 2);
    const paddingRight = length - data.length - paddingLeft;
    return padConstant(data, [paddingLeft, paddingRight]);
}
exports.padCenterToLength = padCenterToLength;
function padConstant(data, padding) {
    let padLeft, padRight;
    if (typeof (padding) == 'object') {
        [padLeft, padRight] = padding;
    }
    else {
        padLeft = padRight = padding;
    }
    const out = new Float32Array(data.length + padLeft + padRight);
    out.set(data, padLeft);
    return out;
}
exports.padConstant = padConstant;
function padReflect(data, padding) {
    const out = padConstant(data, padding);
    for (let i = 0; i < padding; i++) {
        // Pad the beginning with reflected values.
        out[i] = out[2 * padding - i];
        // Pad the end with reflected values.
        out[out.length - i - 1] = out[out.length - 2 * padding + i - 1];
    }
    return out;
}
exports.padReflect = padReflect;
/**
 * Given a timeseries, returns an array of timeseries that are windowed
 * according to the params specified.
 */
function frame(data, frameLength, hopLength) {
    const bufferCount = Math.floor((data.length - frameLength) / hopLength) + 1;
    let buffers = range(bufferCount).map(x => new Float32Array(frameLength));
    for (let i = 0; i < bufferCount; i++) {
        const ind = i * hopLength;
        const buffer = data.slice(ind, ind + frameLength);
        buffers[i].set(buffer);
        // In the end, we will likely have an incomplete buffer, which we should
        // just ignore.
        if (buffer.length != frameLength) {
            continue;
        }
    }
    return buffers;
}
exports.frame = frame;
function createMelFilterbank(params) {
    const fMin = params.fMin || 0;
    const fMax = params.fMax || params.sampleRate / 2;
    const nMels = params.nMels || 128;
    const nFft = params.nFft || 2048;
    // Center freqs of each FFT band.
    const fftFreqs = calculateFftFreqs(params.sampleRate, nFft);
    // (Pseudo) center freqs of each Mel band.
    const melFreqs = calculateMelFreqs(nMels + 2, fMin, fMax);
    const melDiff = internalDiff(melFreqs);
    const ramps = outerSubtract(melFreqs, fftFreqs);
    const filterSize = ramps[0].length;
    const weights = [];
    for (let i = 0; i < nMels; i++) {
        weights[i] = new Float32Array(filterSize);
        for (let j = 0; j < ramps[i].length; j++) {
            const lower = -ramps[i][j] / melDiff[i];
            const upper = ramps[i + 2][j] / melDiff[i + 1];
            const weight = Math.max(0, Math.min(lower, upper));
            weights[i][j] = weight;
        }
    }
    // Slaney-style mel is scaled to be approx constant energy per channel.
    for (let i = 0; i < weights.length; i++) {
        // How much energy per channel.
        const enorm = 2.0 / (melFreqs[2 + i] - melFreqs[i]);
        // Normalize by that amount.
        weights[i] = weights[i].map(val => val * enorm);
    }
    return weights;
}
exports.createMelFilterbank = createMelFilterbank;
function fft(y) {
    const fft = new FFT(y.length);
    const out = fft.createComplexArray();
    const data = fft.toComplexArray(y);
    fft.transform(out, data);
    return out;
}
exports.fft = fft;
function hannWindow(length) {
    let win = new Float32Array(length);
    for (let i = 0; i < length; i++) {
        win[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
    }
    return win;
}
exports.hannWindow = hannWindow;
function array(arr) {
    const out = new Float32Array(arr.length);
    out.set(arr);
    return out;
}
exports.array = array;
const MIN_VAL = -10;
function logGtZero(val) {
    // Ensure that the log argument is nonnegative.
    const offset = Math.exp(MIN_VAL);
    return Math.log(val + offset);
}
exports.logGtZero = logGtZero;
function sum(array) {
    return array.reduce(function (a, b) { return a + b; });
}
exports.sum = sum;
function range(count) {
    let out = [];
    for (let i = 0; i < count; i++) {
        out.push(i);
    }
    return out;
}
exports.range = range;
function linearSpace(start, end, count) {
    // Include start and endpoints.
    const delta = (end - start) / (count - 1);
    let out = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        out[i] = start + delta * i;
    }
    return out;
}
exports.linearSpace = linearSpace;
/**
 * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
 * calculates the energies. Output is half the size.
 */
function mag(y) {
    let out = new Float32Array(y.length / 2);
    for (let i = 0; i < y.length / 2; i++) {
        out[i] = Math.sqrt(y[i * 2] * y[i * 2] + y[i * 2 + 1] * y[i * 2 + 1]);
    }
    return out;
}
exports.mag = mag;
function powerToDb(spec, amin = 1e-10, refValue = 1.0, topDb = 80.0) {
    const width = spec.length;
    const height = spec[0].length;
    const logSpec = [];
    for (let i = 0; i < width; i++) {
        logSpec[i] = new Float32Array(height);
    }
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const val = spec[i][j];
            let logVal = 10.0 * Math.log10(Math.max(amin, val));
            logVal -= 10.0 * Math.log10(Math.max(amin, refValue));
            logSpec[i][j] = logVal;
        }
    }
    if (topDb) {
        if (topDb < 0) {
            throw new Error(`topDb must be non-negative.`);
        }
        for (let i = 0; i < width; i++) {
            const maxVal = max(logSpec[i]);
            for (let j = 0; j < height; j++) {
                logSpec[i][j] = Math.max(logSpec[i][j], maxVal - topDb);
            }
        }
    }
    return logSpec;
}
exports.powerToDb = powerToDb;
function hzToMel(hz) {
    return 1125.0 * Math.log(1 + hz / 700.0);
}
exports.hzToMel = hzToMel;
function melToHz(mel) {
    return 700.0 * (Math.exp(mel / 1125.0) - 1);
}
exports.melToHz = melToHz;
function freqToBin(freq, nFft, sr) {
    return Math.floor((nFft + 1) * freq / (sr / 2));
}
function flatten2D(spec) {
    const length = spec[0].length * spec.length;
    const out = new Float32Array(length);
    const height = spec[0].length;
    const width = spec.length;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            out[j * width + i] = spec[i][j];
        }
    }
    return out;
}
exports.flatten2D = flatten2D;
function calculateFftFreqs(sampleRate, nFft) {
    return linearSpace(0, sampleRate / 2, Math.floor(1 + nFft / 2));
}
exports.calculateFftFreqs = calculateFftFreqs;
function calculateMelFreqs(nMels, fMin, fMax) {
    const melMin = hzToMel(fMin);
    const melMax = hzToMel(fMax);
    // Construct linearly spaced array of nMel intervals, between melMin and
    // melMax.
    const mels = linearSpace(melMin, melMax, nMels);
    const hzs = mels.map(mel => melToHz(mel));
    return hzs;
}
exports.calculateMelFreqs = calculateMelFreqs;
function internalDiff(arr) {
    const out = new Float32Array(arr.length - 1);
    for (let i = 0; i < arr.length; i++) {
        out[i] = arr[i + 1] - arr[i];
    }
    return out;
}
exports.internalDiff = internalDiff;
function outerSubtract(arr, arr2) {
    const out = [];
    for (let i = 0; i < arr.length; i++) {
        out[i] = new Float32Array(arr2.length);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            out[i][j] = arr[i] - arr2[j];
        }
    }
    return out;
}
exports.outerSubtract = outerSubtract;
function pow(arr, power) {
    return arr.map(v => Math.pow(v, power));
}
exports.pow = pow;
function max(arr) {
    return arr.reduce((a, b) => Math.max(a, b));
}
exports.max = max;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// From https://github.com/taisel/XAudioJS/blob/master/resampler.js.
// TODO: Maybe use one of these compiled to WASM: https://lastique.github.io/src_test/.

Object.defineProperty(exports, "__esModule", { value: true });
//JavaScript Audio Resampler
//Copyright (C) 2011-2015 Grant Galitz
//Released to Public Domain
function Resampler(fromSampleRate, toSampleRate, channels, inputBuffer) {
    //Input Sample Rate:
    this.fromSampleRate = +fromSampleRate;
    //Output Sample Rate:
    this.toSampleRate = +toSampleRate;
    //Number of channels:
    this.channels = channels | 0;
    //Type checking the input buffer:
    if (typeof inputBuffer != "object") {
        throw (new Error("inputBuffer is not an object."));
    }
    if (!(inputBuffer instanceof Array) && !(inputBuffer instanceof Float32Array) && !(inputBuffer instanceof Float64Array)) {
        throw (new Error("inputBuffer is not an array or a float32 or a float64 array."));
    }
    this.inputBuffer = inputBuffer;
    //Initialize the resampler:
    this.initialize();
}
exports.Resampler = Resampler;
Resampler.prototype.initialize = function () {
    //Perform some checks:
    if (this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0) {
        if (this.fromSampleRate == this.toSampleRate) {
            //Setup a resampler bypass:
            this.resampler = this.bypassResampler; //Resampler just returns what was passed through.
            this.ratioWeight = 1;
            this.outputBuffer = this.inputBuffer;
        }
        else {
            this.ratioWeight = this.fromSampleRate / this.toSampleRate;
            if (this.fromSampleRate < this.toSampleRate) {
                /*
                    Use generic linear interpolation if upsampling,
                    as linear interpolation produces a gradient that we want
                    and works fine with two input sample points per output in this case.
                */
                this.compileLinearInterpolationFunction();
                this.lastWeight = 1;
            }
            else {
                /*
                    Custom resampler I wrote that doesn't skip samples
                    like standard linear interpolation in high downsampling.
                    This is more accurate than linear interpolation on downsampling.
                */
                this.compileMultiTapFunction();
                this.tailExists = false;
                this.lastWeight = 0;
            }
            this.initializeBuffers();
        }
    }
    else {
        throw (new Error("Invalid settings specified for the resampler."));
    }
};
Resampler.prototype.compileLinearInterpolationFunction = function () {
    var toCompile = "var outputOffset = 0;\
    if (bufferLength > 0) {\
        var buffer = this.inputBuffer;\
        var weight = this.lastWeight;\
        var firstWeight = 0;\
        var secondWeight = 0;\
        var sourceOffset = 0;\
        var outputOffset = 0;\
        var outputBuffer = this.outputBuffer;\
        for (; weight < 1; weight += " + this.ratioWeight + ") {\
            secondWeight = weight % 1;\
            firstWeight = 1 - secondWeight;";
    for (var channel = 0; channel < this.channels; ++channel) {
        toCompile += "outputBuffer[outputOffset++] = (this.lastOutput[" + channel + "] * firstWeight) + (buffer[" + channel + "] * secondWeight);";
    }
    toCompile += "}\
        weight -= 1;\
        for (bufferLength -= " + this.channels + ", sourceOffset = Math.floor(weight) * " + this.channels + "; sourceOffset < bufferLength;) {\
            secondWeight = weight % 1;\
            firstWeight = 1 - secondWeight;";
    for (var channel = 0; channel < this.channels; ++channel) {
        toCompile += "outputBuffer[outputOffset++] = (buffer[sourceOffset" + ((channel > 0) ? (" + " + channel) : "") + "] * firstWeight) + (buffer[sourceOffset + " + (this.channels + channel) + "] * secondWeight);";
    }
    toCompile += "weight += " + this.ratioWeight + ";\
            sourceOffset = Math.floor(weight) * " + this.channels + ";\
        }";
    for (var channel = 0; channel < this.channels; ++channel) {
        toCompile += "this.lastOutput[" + channel + "] = buffer[sourceOffset++];";
    }
    toCompile += "this.lastWeight = weight % 1;\
    }\
    return outputOffset;";
    this.resampler = Function("bufferLength", toCompile);
};
Resampler.prototype.compileMultiTapFunction = function () {
    var toCompile = "var outputOffset = 0;\
    if (bufferLength > 0) {\
        var buffer = this.inputBuffer;\
        var weight = 0;";
    for (var channel = 0; channel < this.channels; ++channel) {
        toCompile += "var output" + channel + " = 0;";
    }
    toCompile += "var actualPosition = 0;\
        var amountToNext = 0;\
        var alreadyProcessedTail = !this.tailExists;\
        this.tailExists = false;\
        var outputBuffer = this.outputBuffer;\
        var currentPosition = 0;\
        do {\
            if (alreadyProcessedTail) {\
                weight = " + this.ratioWeight + ";";
    for (channel = 0; channel < this.channels; ++channel) {
        toCompile += "output" + channel + " = 0;";
    }
    toCompile += "}\
            else {\
                weight = this.lastWeight;";
    for (channel = 0; channel < this.channels; ++channel) {
        toCompile += "output" + channel + " = this.lastOutput[" + channel + "];";
    }
    toCompile += "alreadyProcessedTail = true;\
            }\
            while (weight > 0 && actualPosition < bufferLength) {\
                amountToNext = 1 + actualPosition - currentPosition;\
                if (weight >= amountToNext) {";
    for (channel = 0; channel < this.channels; ++channel) {
        toCompile += "output" + channel + " += buffer[actualPosition++] * amountToNext;";
    }
    toCompile += "currentPosition = actualPosition;\
                    weight -= amountToNext;\
                }\
                else {";
    for (channel = 0; channel < this.channels; ++channel) {
        toCompile += "output" + channel + " += buffer[actualPosition" + ((channel > 0) ? (" + " + channel) : "") + "] * weight;";
    }
    toCompile += "currentPosition += weight;\
                    weight = 0;\
                    break;\
                }\
            }\
            if (weight <= 0) {";
    for (channel = 0; channel < this.channels; ++channel) {
        toCompile += "outputBuffer[outputOffset++] = output" + channel + " / " + this.ratioWeight + ";";
    }
    toCompile += "}\
            else {\
                this.lastWeight = weight;";
    for (channel = 0; channel < this.channels; ++channel) {
        toCompile += "this.lastOutput[" + channel + "] = output" + channel + ";";
    }
    toCompile += "this.tailExists = true;\
                break;\
            }\
        } while (actualPosition < bufferLength);\
    }\
    return outputOffset;";
    this.resampler = Function("bufferLength", toCompile);
};
Resampler.prototype.bypassResampler = function (upTo) {
    return upTo;
};
Resampler.prototype.initializeBuffers = function () {
    //Initialize the internal buffer:
    var outputBufferSize = (Math.ceil(this.inputBuffer.length * this.toSampleRate / this.fromSampleRate / this.channels * 1.000000476837158203125) * this.channels) + this.channels;
    try {
        this.outputBuffer = new Float32Array(outputBufferSize);
        this.lastOutput = new Float32Array(this.channels);
    }
    catch (error) {
        this.outputBuffer = [];
        this.lastOutput = [];
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const melspec = __webpack_require__(1);
const CircularAudioBuffer_1 = __webpack_require__(0);
const Resampler_1 = __webpack_require__(2);
class MelFeatureProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        // How many samples per buffer (in processed sample rate).
        this.winLength = 2048;
        // How many samples between buffers.
        this.hopLength = 1024;
        // Processing sample rate that we use for feature extraction.
        this.processSampleRate = 16000.0;
        // How many samples have we processed in total?
        this.totalSamples = 0;
        this.timer = new Timer();
        this.lastUpdate = currentTime;
        this.port.onmessage = this.handleMessage.bind(this);
    }
    handleMessage(event) {
        if (event.data.config) {
            this.configure(event.data.config);
        }
    }
    process(inputs, outputs, parameters) {
        // Post a message to the node for every 1 second.
        if (currentTime - this.lastUpdate > 1.0) {
            this.port.postMessage({
                message: 'Process is called.',
                timeStamp: currentTime,
            });
            this.lastUpdate = currentTime;
        }
        const input = inputs[0];
        const channel = input[0];
        this.circularBuffer.addBuffer(channel);
        this.totalSamples += channel.length;
        //console.log(`Total samples: ${this.totalSamples}.`);
        // If there's enough in the circular buffer, we should run the processing.
        if (this.circularBuffer.getLength() > this.winLengthNative) {
            const bufferNative = this.circularBuffer.getBuffer(this.winLengthNative);
            this.processCompleteBuffer(bufferNative);
            // Remove a hop's worth of data from the buffer.
            this.circularBuffer.popBuffer(this.hopLengthNative);
        }
        return true;
    }
    configure(params) {
        console.log(`Received configuration params: ${JSON.stringify(params)}.`);
        this.winLength = params.winLength;
        this.hopLength = params.hopLength;
        this.nFft = params.nFft;
        // Leave some room for extra samples there.
        this.circularBuffer = new CircularAudioBuffer_1.default(this.winLengthNative * 2);
        console.log(`Created CircularAudioBuffer.`);
    }
    processCompleteBuffer(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.timer.start();
            //const bufferResampled = await resample(buffer, this.processSampleRate);
            const resampler = new Resampler_1.Resampler(sampleRate, this.processSampleRate, 1, buffer);
            resampler.resampler(this.winLengthNative);
            const bufferResampled = resampler.outputBuffer;
            //console.log(`Resampled ${buffer.length} into ${bufferResampled.length} in ${this.timer.elapsed()} s.`);
            this.timer.start();
            const spec = melspec.melSpectrogram(bufferResampled, {
                sampleRate: this.processSampleRate,
            });
            //console.log(`Calculated features in ${this.timer.elapsed()} s.`);
            this.port.postMessage({
                features: spec,
            });
        });
    }
    get winLengthNative() {
        // How many samples do we need in the native sample rate?
        return Math.floor(this.winLength * (sampleRate / this.processSampleRate));
    }
    get hopLengthNative() {
        // How many samples do we need in the native sample rate?
        return Math.floor(this.hopLength * (sampleRate / this.processSampleRate));
    }
}
exports.MelFeatureProcessor = MelFeatureProcessor;
class Timer {
    start() {
        this.startTime = this.now();
    }
    elapsed() {
        return this.now() - this.startTime;
    }
    now() {
        return new Date().valueOf() / 1000;
    }
}
registerProcessor('mel-feature-processor', MelFeatureProcessor);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function FFT(size) {
  this.size = size | 0;
  if (this.size <= 1 || (this.size & (this.size - 1)) !== 0)
    throw new Error('FFT size must be a power of two and bigger than 1');

  this._csize = size << 1;

  // NOTE: Use of `var` is intentional for old V8 versions
  var table = new Array(this.size * 2);
  for (var i = 0; i < table.length; i += 2) {
    const angle = Math.PI * i / this.size;
    table[i] = Math.cos(angle);
    table[i + 1] = -Math.sin(angle);
  }
  this.table = table;

  // Find size's power of two
  var power = 0;
  for (var t = 1; this.size > t; t <<= 1)
    power++;

  // Calculate initial step's width:
  //   * If we are full radix-4 - it is 2x smaller to give inital len=8
  //   * Otherwise it is the same as `power` to give len=4
  this._width = power % 2 === 0 ? power - 1 : power;

  // Pre-compute bit-reversal patterns
  this._bitrev = new Array(1 << this._width);
  for (var j = 0; j < this._bitrev.length; j++) {
    this._bitrev[j] = 0;
    for (var shift = 0; shift < this._width; shift += 2) {
      var revShift = this._width - shift - 2;
      this._bitrev[j] |= ((j >>> shift) & 3) << revShift;
    }
  }

  this._out = null;
  this._data = null;
  this._inv = 0;
}
module.exports = FFT;

FFT.prototype.fromComplexArray = function fromComplexArray(complex, storage) {
  var res = storage || new Array(complex.length >>> 1);
  for (var i = 0; i < complex.length; i += 2)
    res[i >>> 1] = complex[i];
  return res;
};

FFT.prototype.createComplexArray = function createComplexArray() {
  const res = new Array(this._csize);
  for (var i = 0; i < res.length; i++)
    res[i] = 0;
  return res;
};

FFT.prototype.toComplexArray = function toComplexArray(input, storage) {
  var res = storage || this.createComplexArray();
  for (var i = 0; i < res.length; i += 2) {
    res[i] = input[i >>> 1];
    res[i + 1] = 0;
  }
  return res;
};

FFT.prototype.completeSpectrum = function completeSpectrum(spectrum) {
  var size = this._csize;
  var half = size >>> 1;
  for (var i = 2; i < half; i += 2) {
    spectrum[size - i] = spectrum[i];
    spectrum[size - i + 1] = -spectrum[i + 1];
  }
};

FFT.prototype.transform = function transform(out, data) {
  if (out === data)
    throw new Error('Input and output buffers must be different');

  this._out = out;
  this._data = data;
  this._inv = 0;
  this._transform4();
  this._out = null;
  this._data = null;
};

FFT.prototype.realTransform = function realTransform(out, data) {
  if (out === data)
    throw new Error('Input and output buffers must be different');

  this._out = out;
  this._data = data;
  this._inv = 0;
  this._realTransform4();
  this._out = null;
  this._data = null;
};

FFT.prototype.inverseTransform = function inverseTransform(out, data) {
  if (out === data)
    throw new Error('Input and output buffers must be different');

  this._out = out;
  this._data = data;
  this._inv = 1;
  this._transform4();
  for (var i = 0; i < out.length; i++)
    out[i] /= this.size;
  this._out = null;
  this._data = null;
};

// radix-4 implementation
//
// NOTE: Uses of `var` are intentional for older V8 version that do not
// support both `let compound assignments` and `const phi`
FFT.prototype._transform4 = function _transform4() {
  var out = this._out;
  var size = this._csize;

  // Initial step (permute and transform)
  var width = this._width;
  var step = 1 << width;
  var len = (size / step) << 1;

  var outOff;
  var t;
  var bitrev = this._bitrev;
  if (len === 4) {
    for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
      const off = bitrev[t];
      this._singleTransform2(outOff, off, step);
    }
  } else {
    // len === 8
    for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
      const off = bitrev[t];
      this._singleTransform4(outOff, off, step);
    }
  }

  // Loop through steps in decreasing order
  var inv = this._inv ? -1 : 1;
  var table = this.table;
  for (step >>= 2; step >= 2; step >>= 2) {
    len = (size / step) << 1;
    var quarterLen = len >>> 2;

    // Loop through offsets in the data
    for (outOff = 0; outOff < size; outOff += len) {
      // Full case
      var limit = outOff + quarterLen;
      for (var i = outOff, k = 0; i < limit; i += 2, k += step) {
        const A = i;
        const B = A + quarterLen;
        const C = B + quarterLen;
        const D = C + quarterLen;

        // Original values
        const Ar = out[A];
        const Ai = out[A + 1];
        const Br = out[B];
        const Bi = out[B + 1];
        const Cr = out[C];
        const Ci = out[C + 1];
        const Dr = out[D];
        const Di = out[D + 1];

        // Middle values
        const MAr = Ar;
        const MAi = Ai;

        const tableBr = table[k];
        const tableBi = inv * table[k + 1];
        const MBr = Br * tableBr - Bi * tableBi;
        const MBi = Br * tableBi + Bi * tableBr;

        const tableCr = table[2 * k];
        const tableCi = inv * table[2 * k + 1];
        const MCr = Cr * tableCr - Ci * tableCi;
        const MCi = Cr * tableCi + Ci * tableCr;

        const tableDr = table[3 * k];
        const tableDi = inv * table[3 * k + 1];
        const MDr = Dr * tableDr - Di * tableDi;
        const MDi = Dr * tableDi + Di * tableDr;

        // Pre-Final values
        const T0r = MAr + MCr;
        const T0i = MAi + MCi;
        const T1r = MAr - MCr;
        const T1i = MAi - MCi;
        const T2r = MBr + MDr;
        const T2i = MBi + MDi;
        const T3r = inv * (MBr - MDr);
        const T3i = inv * (MBi - MDi);

        // Final values
        const FAr = T0r + T2r;
        const FAi = T0i + T2i;

        const FCr = T0r - T2r;
        const FCi = T0i - T2i;

        const FBr = T1r + T3i;
        const FBi = T1i - T3r;

        const FDr = T1r - T3i;
        const FDi = T1i + T3r;

        out[A] = FAr;
        out[A + 1] = FAi;
        out[B] = FBr;
        out[B + 1] = FBi;
        out[C] = FCr;
        out[C + 1] = FCi;
        out[D] = FDr;
        out[D + 1] = FDi;
      }
    }
  }
};

// radix-2 implementation
//
// NOTE: Only called for len=4
FFT.prototype._singleTransform2 = function _singleTransform2(outOff, off,
                                                             step) {
  const out = this._out;
  const data = this._data;

  const evenR = data[off];
  const evenI = data[off + 1];
  const oddR = data[off + step];
  const oddI = data[off + step + 1];

  const leftR = evenR + oddR;
  const leftI = evenI + oddI;
  const rightR = evenR - oddR;
  const rightI = evenI - oddI;

  out[outOff] = leftR;
  out[outOff + 1] = leftI;
  out[outOff + 2] = rightR;
  out[outOff + 3] = rightI;
};

// radix-4
//
// NOTE: Only called for len=8
FFT.prototype._singleTransform4 = function _singleTransform4(outOff, off,
                                                             step) {
  const out = this._out;
  const data = this._data;
  const inv = this._inv ? -1 : 1;
  const step2 = step * 2;
  const step3 = step * 3;

  // Original values
  const Ar = data[off];
  const Ai = data[off + 1];
  const Br = data[off + step];
  const Bi = data[off + step + 1];
  const Cr = data[off + step2];
  const Ci = data[off + step2 + 1];
  const Dr = data[off + step3];
  const Di = data[off + step3 + 1];

  // Pre-Final values
  const T0r = Ar + Cr;
  const T0i = Ai + Ci;
  const T1r = Ar - Cr;
  const T1i = Ai - Ci;
  const T2r = Br + Dr;
  const T2i = Bi + Di;
  const T3r = inv * (Br - Dr);
  const T3i = inv * (Bi - Di);

  // Final values
  const FAr = T0r + T2r;
  const FAi = T0i + T2i;

  const FBr = T1r + T3i;
  const FBi = T1i - T3r;

  const FCr = T0r - T2r;
  const FCi = T0i - T2i;

  const FDr = T1r - T3i;
  const FDi = T1i + T3r;

  out[outOff] = FAr;
  out[outOff + 1] = FAi;
  out[outOff + 2] = FBr;
  out[outOff + 3] = FBi;
  out[outOff + 4] = FCr;
  out[outOff + 5] = FCi;
  out[outOff + 6] = FDr;
  out[outOff + 7] = FDi;
};

// Real input radix-4 implementation
FFT.prototype._realTransform4 = function _realTransform4() {
  var out = this._out;
  var size = this._csize;

  // Initial step (permute and transform)
  var width = this._width;
  var step = 1 << width;
  var len = (size / step) << 1;

  var outOff;
  var t;
  var bitrev = this._bitrev;
  if (len === 4) {
    for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
      const off = bitrev[t];
      this._singleRealTransform2(outOff, off >>> 1, step >>> 1);
    }
  } else {
    // len === 8
    for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
      const off = bitrev[t];
      this._singleRealTransform4(outOff, off >>> 1, step >>> 1);
    }
  }

  // Loop through steps in decreasing order
  var inv = this._inv ? -1 : 1;
  var table = this.table;
  for (step >>= 2; step >= 2; step >>= 2) {
    len = (size / step) << 1;
    var halfLen = len >>> 1;
    var quarterLen = halfLen >>> 1;
    var hquarterLen = quarterLen >>> 1;

    // Loop through offsets in the data
    for (outOff = 0; outOff < size; outOff += len) {
      for (var i = 0, k = 0; i <= hquarterLen; i += 2, k += step) {
        var A = outOff + i;
        var B = A + quarterLen;
        var C = B + quarterLen;
        var D = C + quarterLen;

        // Original values
        var Ar = out[A];
        var Ai = out[A + 1];
        var Br = out[B];
        var Bi = out[B + 1];
        var Cr = out[C];
        var Ci = out[C + 1];
        var Dr = out[D];
        var Di = out[D + 1];

        // Middle values
        var MAr = Ar;
        var MAi = Ai;

        var tableBr = table[k];
        var tableBi = inv * table[k + 1];
        var MBr = Br * tableBr - Bi * tableBi;
        var MBi = Br * tableBi + Bi * tableBr;

        var tableCr = table[2 * k];
        var tableCi = inv * table[2 * k + 1];
        var MCr = Cr * tableCr - Ci * tableCi;
        var MCi = Cr * tableCi + Ci * tableCr;

        var tableDr = table[3 * k];
        var tableDi = inv * table[3 * k + 1];
        var MDr = Dr * tableDr - Di * tableDi;
        var MDi = Dr * tableDi + Di * tableDr;

        // Pre-Final values
        var T0r = MAr + MCr;
        var T0i = MAi + MCi;
        var T1r = MAr - MCr;
        var T1i = MAi - MCi;
        var T2r = MBr + MDr;
        var T2i = MBi + MDi;
        var T3r = inv * (MBr - MDr);
        var T3i = inv * (MBi - MDi);

        // Final values
        var FAr = T0r + T2r;
        var FAi = T0i + T2i;

        var FBr = T1r + T3i;
        var FBi = T1i - T3r;

        out[A] = FAr;
        out[A + 1] = FAi;
        out[B] = FBr;
        out[B + 1] = FBi;

        // Output final middle point
        if (i === 0) {
          var FCr = T0r - T2r;
          var FCi = T0i - T2i;
          out[C] = FCr;
          out[C + 1] = FCi;
          continue;
        }

        // Do not overwrite ourselves
        if (i === hquarterLen)
          continue;

        // In the flipped case:
        // MAi = -MAi
        // MBr=-MBi, MBi=-MBr
        // MCr=-MCr
        // MDr=MDi, MDi=MDr
        var ST0r = T1r;
        var ST0i = -T1i;
        var ST1r = T0r;
        var ST1i = -T0i;
        var ST2r = -inv * T3i;
        var ST2i = -inv * T3r;
        var ST3r = -inv * T2i;
        var ST3i = -inv * T2r;

        var SFAr = ST0r + ST2r;
        var SFAi = ST0i + ST2i;

        var SFBr = ST1r + ST3i;
        var SFBi = ST1i - ST3r;

        var SA = outOff + quarterLen - i;
        var SB = outOff + halfLen - i;

        out[SA] = SFAr;
        out[SA + 1] = SFAi;
        out[SB] = SFBr;
        out[SB + 1] = SFBi;
      }
    }
  }
};

// radix-2 implementation
//
// NOTE: Only called for len=4
FFT.prototype._singleRealTransform2 = function _singleRealTransform2(outOff,
                                                                     off,
                                                                     step) {
  const out = this._out;
  const data = this._data;

  const evenR = data[off];
  const oddR = data[off + step];

  const leftR = evenR + oddR;
  const rightR = evenR - oddR;

  out[outOff] = leftR;
  out[outOff + 1] = 0;
  out[outOff + 2] = rightR;
  out[outOff + 3] = 0;
};

// radix-4
//
// NOTE: Only called for len=8
FFT.prototype._singleRealTransform4 = function _singleRealTransform4(outOff,
                                                                     off,
                                                                     step) {
  const out = this._out;
  const data = this._data;
  const inv = this._inv ? -1 : 1;
  const step2 = step * 2;
  const step3 = step * 3;

  // Original values
  const Ar = data[off];
  const Br = data[off + step];
  const Cr = data[off + step2];
  const Dr = data[off + step3];

  // Pre-Final values
  const T0r = Ar + Cr;
  const T1r = Ar - Cr;
  const T2r = Br + Dr;
  const T3r = inv * (Br - Dr);

  // Final values
  const FAr = T0r + T2r;

  const FBr = T1r;
  const FBi = -T3r;

  const FCr = T0r - T2r;

  const FDr = T1r;
  const FDi = T3r;

  out[outOff] = FAr;
  out[outOff + 1] = 0;
  out[outOff + 2] = FBr;
  out[outOff + 3] = FBi;
  out[outOff + 4] = FCr;
  out[outOff + 5] = 0;
  out[outOff + 6] = FDr;
  out[outOff + 7] = FDi;
};


/***/ })
/******/ ]);
//# sourceMappingURL=worklet.js.map