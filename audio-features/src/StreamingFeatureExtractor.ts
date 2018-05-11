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
import {MelSpectrogramNode} from './worklet/MelSpectrogramNode';
import {SpecParams} from './MelSpectrogram';

interface StreamParams {
  // How long (in seconds) each spectrogram chunk needs to be.
  duration: number;
  // How often (in seconds) to emit a new spectrogram.
  delay: number;
};


const audioCtx = new AudioContext();
/**
 * Opens an audio stream and extracts Mel spectrogram from it, suitable for
 * running inference in a TensorFlow.js environment.
 */
export default class StreamingFeatureExtractor extends EventEmitter {
  // Where to store the latest spectrogram.
  spectrogram: Float32Array[] = [];
  // Number of spectrogram columns to store in total.
  columnLength: number;
  // Are we streaming right now?
  isStreaming = false;
  // The worklet node doing the feature extraction.
  melSpecNode: MelSpectrogramNode;
  // The active stream.
  stream: MediaStream;
  // Configuration for the spectrogram.
  specParams: SpecParams;
  // Configuration for the streaming.
  streamParams: StreamParams;
  // When was the last time we sent out features.
  lastEmitTime = new Date().valueOf();

  constructor(specParams: SpecParams, streamParams: StreamParams) {
    super();
    this.specParams = specParams;
    this.streamParams = streamParams;

    // Calculate how many columns to store in the spectrogram. Each column
    // is spaced hopLength samples apart, and represents an FFT of winLength.
    const specSamples = streamParams.duration * specParams.sampleRate;
    this.columnLength = Math.floor((specSamples - specParams.hopLength) /
      specParams.winLength);
    console.log(`Created StreamingFeatureExtractor with columnLength ${this.columnLength}.`);
  }

  getSpectrogram() {
    return this.spectrogram;
  }

  async start() {
    // Open an audio input stream.
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

    // Create a MelSpectrogramNode (AudioWorklet).
    await audioCtx.audioWorklet.addModule('dist/worklet.js')
    this.melSpecNode = new MelSpectrogramNode(audioCtx, this.specParams);
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(this.melSpecNode);
    this.melSpecNode.connect(audioCtx.destination);

    this.melSpecNode.emitter.on('spectrogram', spec => {
      for (let column of spec) {
        this.spectrogram.push(column);
      }
      let overLimit = this.spectrogram.length - this.columnLength;
      if (overLimit > 0) {
        // Remove the excess elements in the array.
        this.spectrogram.splice(0, overLimit);

        // The buffer is full, see if we should emit.
        const now = new Date().valueOf();
        const elapsed = (now - this.lastEmitTime) / 1000;
        if (elapsed > this.streamParams.delay) {
          this.emit('feature', this.spectrogram);
          this.lastEmitTime = now;
        }
      }
    });

    this.isStreaming = true;
  }

  stop() {
    for (let track of this.stream.getTracks()) {
      track.stop();
    }
    this.melSpecNode.disconnect(audioCtx.destination);
    this.stream = null;
    this.isStreaming = false;
  }
}

