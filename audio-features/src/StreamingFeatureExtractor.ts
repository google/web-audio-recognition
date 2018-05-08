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
import CircularAudioBuffer from './CircularAudioBuffer';
import {EventEmitter} from 'eventemitter3';
import {MelFeatureNode} from './worklet/MelFeatureNode';

const INPUT_BUFFER_LENGTH = 16384;

interface Params {
  inputBufferLength?: number
  bufferLength: number
  hopLength: number
  duration: number
  nMels: number
  targetSr: number
}

const audioCtx = new AudioContext();
/**
 * Extracts various kinds of features from an input buffer. Designed for
 * extracting features from a live-running audio input stream.
 *
 * This class gets audio from an audio input stream, feeds it into a
 * ScriptProcessorNode, gets audio sampled at the input sample rate
 * (audioCtx.sampleRate).
 *
 * Once complete, we downsample it to EXAMPLE_SR, and then keep track of the
 * last hop index. Once we have enough data for a buffer of BUFFER_LENGTH,
 * process that buffer and add it to the spectrogram.
 */
export default class StreamingFeatureExtractor extends EventEmitter {
  // The length of the input buffer, used in ScriptProcessorNode.
  inputBufferLength: number
  // Target sample rate.
  targetSr: number
  // How long the buffer is.
  bufferLength: number
  // How many buffers to keep in the spectrogram.
  bufferCount: number
  // How many mel bins to use.
  nMels: number
  // Number of samples to hop over for every new column.
  hopLength: number
  // How long the total duration is.
  duration: number

  // Where to store the latest spectrogram.
  spectrogram: Float32Array[]
  // The mel filterbank (calculate it only once).
  melFilterbank: Float32Array[]

  // Are we streaming right now?
  isStreaming: boolean

  // The script node doing the Web Audio processing.
  scriptNode: ScriptProcessorNode;
  melFeatureNode: MelFeatureNode;
  // The active stream.
  stream: MediaStream

  // For dealing with a circular buffer of audio samples.
  circularBuffer: CircularAudioBuffer

  // For debugging/playback, keep track of everything we've recorded.
  playbackBuffer: CircularAudioBuffer

  // Time when the streaming began. This is used to check whether
  // ScriptProcessorNode has dropped samples.
  processStartTime: Date

  // Number of samples we've encountered in our ScriptProcessorNode
  // onAudioProcess.
  processSampleCount: number

  // A proxy for loudness.
  lastEnergyLevel: number

  constructor(params: Params) {
    super();

    const {bufferLength, duration, hopLength, nMels, targetSr,
      inputBufferLength} = params;
    this.bufferLength = bufferLength;
    this.inputBufferLength = inputBufferLength || INPUT_BUFFER_LENGTH;
    this.hopLength = hopLength;
    this.nMels = nMels;
    this.targetSr = targetSr;
    this.duration = duration;
    this.bufferCount = Math.floor(
      (duration * targetSr - bufferLength) / hopLength) + 1;

    if (hopLength > bufferLength) {
      console.error('Hop length must be smaller than buffer length.');
    }

    // The mel filterbank is actually half of the size of the number of samples,
    // since the FFT array is complex valued.
    this.melFilterbank = AudioUtils.createMelFilterbank(
      this.bufferLength/2 + 1, this.nMels);
    this.spectrogram = [];
    this.isStreaming = false;

    const nativeSr = audioCtx.sampleRate;

    // Allocate the size of the circular analysis buffer.
    const resampledBufferLength = Math.max(bufferLength, this.inputBufferLength) *
      (targetSr / nativeSr) * 4;
    this.circularBuffer = new CircularAudioBuffer(resampledBufferLength);

    // Calculate how many buffers will be enough to keep around to playback.
    const playbackLength = nativeSr * this.duration * 2;
    this.playbackBuffer = new CircularAudioBuffer(playbackLength);
  }

  getSpectrogram() {
    return this.spectrogram;
  }

  async start() {
    // Clear all buffers.
    this.circularBuffer.clear();
    this.playbackBuffer.clear();

    // Reset start time and sample count for ScriptProcessorNode watching.
    this.processStartTime = new Date();
    this.processSampleCount = 0;

    const constraints = {audio: {
      "mandatory": {
        "googEchoCancellation": "false",
        "googAutoGainControl": "false",
        "googNoiseSuppression": "false",
        "googHighpassFilter": "false"
      },
    } , video: false};
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.stream = stream;

    //this.scriptNode = audioCtx.createScriptProcessor(this.inputBufferLength, 1, 1);
    await audioCtx.audioWorklet.addModule('dist/worklet.js')
    this.melFeatureNode = new MelFeatureNode(audioCtx);
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(this.melFeatureNode);
    this.melFeatureNode.connect(audioCtx.destination);

    //this.scriptNode.onaudioprocess = this.onAudioProcess.bind(this);

    this.isStreaming = true;
  }

  stop() {
    for (let track of this.stream.getTracks()) {
      track.stop();
    }
    this.melFeatureNode.disconnect(audioCtx.destination);
    this.stream = null;
    this.isStreaming = false;
  }

  getEnergyLevel() {
    return this.lastEnergyLevel;
  }

  /**
   * Debug only: for listening to what was most recently recorded.
   */
  getLastPlaybackBuffer() {
    return this.playbackBuffer.getBuffer();
  }

  private onAudioProcess(audioProcessingEvent) {
    const audioBuffer = audioProcessingEvent.inputBuffer;

    // Add to the playback buffers, but make sure we have enough room.
    const remaining = this.playbackBuffer.getRemainingLength();
    const arrayBuffer = audioBuffer.getChannelData(0);
    this.processSampleCount += arrayBuffer.length;
    if (remaining < arrayBuffer.length) {
      this.playbackBuffer.popBuffer(arrayBuffer.length);
      //console.log(`Freed up ${arrayBuffer.length} in the playback buffer.`);
    }
    this.playbackBuffer.addBuffer(arrayBuffer);

    // Resample the buffer into targetSr.
    //console.log(`Resampling from ${audioCtx.sampleRate} to ${this.targetSr}.`);
    resampleWebAudio(audioBuffer, this.targetSr).then((audioBufferRes: AudioBuffer) => {
      const bufferRes = audioBufferRes.getChannelData(0);
      // Write in a buffer of ~700 samples.
      this.circularBuffer.addBuffer(bufferRes);
    });

    // Get buffer(s) out of the circular buffer. Note that there may be multiple
    // available, and if there are, we should get them all.
    const buffers = this.getFullBuffers();
    if (buffers.length > 0) {
      //console.log(`Got ${buffers.length} buffers of audio input data.`);
    }

    for (let buffer of buffers) {
      //console.log(`Got buffer of length ${buffer.length}.`);
      // Extract the mel values for this new frame of audio data.
      const fft = AudioUtils.fft(buffer);
      const fftEnergies = AudioUtils.fftEnergies(fft);
      const melEnergies = AudioUtils.applyFilterbank(fftEnergies, this.melFilterbank);
      this.spectrogram.push(melEnergies);

      if (this.spectrogram.length > this.bufferCount) {
        // Remove the first element in the array.
        this.spectrogram.splice(0, 1);
      }

      if (this.spectrogram.length == this.bufferCount) {
        // Notify that we have an updated spectrogram.
        this.emit('update');
      }

      const totalEnergy = melEnergies.reduce((total, num) => total + num);
      this.lastEnergyLevel = totalEnergy / melEnergies.length;
    }

    const elapsed = (new Date().valueOf() - this.processStartTime.valueOf()) / 1000;
    const expectedSampleCount = (audioCtx.sampleRate * elapsed);
    const percentError = Math.abs(expectedSampleCount - this.processSampleCount) /
      this.processSampleCount;
    if (percentError > 0.1) {
      console.warn(`ScriptProcessorNode may be dropping samples. Percent error is ${percentError}.`);
    }
  }

  /**
   * Get as many full buffers as are available in the circular buffer.
   */
  private getFullBuffers() {
    const out = [];
    // While we have enough data in the buffer.
    while (this.circularBuffer.getLength() > this.bufferLength) {
      // Get a buffer of desired size.
      const buffer = this.circularBuffer.getBuffer(this.bufferLength);
      // Remove a hop's worth of data from the buffer.
      this.circularBuffer.popBuffer(this.hopLength);
      out.push(buffer);
    }
    return out;
  }
}

function resampleWebAudio(audioBuffer: AudioBuffer, targetSr: number) {
  const sourceSr = audioBuffer.sampleRate;
  const lengthRes = audioBuffer.length * targetSr/sourceSr;
  const offlineCtx = new OfflineAudioContext(1, lengthRes, targetSr);

  return new Promise((resolve, reject) => {
    const bufferSource = offlineCtx.createBufferSource();
    bufferSource.buffer = audioBuffer;
    offlineCtx.oncomplete = function(event) {
      const bufferRes = event.renderedBuffer;
      const len = bufferRes.length;
      //console.log(`Resampled buffer from ${audioBuffer.length} to ${len}.`);
      resolve(bufferRes);
    }
    bufferSource.connect(offlineCtx.destination);
    bufferSource.start();
    offlineCtx.startRendering();
  });
}
