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
import {SpecParams} from '../MelSpectrogram';

const INPUT_BUFFER_LENGTH = 16384;

const audioCtx = new AudioContext();
/**
 * Opens an audio stream and extracts Mel spectrogram from it, suitable for
 * running inference in a TensorFlow.js environment.
 */
export default class StreamingFeatureExtractor extends EventEmitter {
  // Where to store the latest spectrogram.
  spectrogram: Float32Array[] = [];
  // Are we streaming right now?
  isStreaming = false;
  // The worklet node doing the feature extraction.
  melFeatureNode: MelFeatureNode;
  // The active stream.
  stream: MediaStream

  constructor(specParams: SpecParams) {
    super();
    this.specParams = specParams;
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

    // Create a MelFeatureNode (AudioWorklet).
    await audioCtx.audioWorklet.addModule('dist/worklet.js')
    this.melFeatureNode = new MelFeatureNode(audioCtx, this.specParams);
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(this.melFeatureNode);
    this.melFeatureNode.connect(audioCtx.destination);

    this.melFeatureNode.emitter.on('features', features => {
      this.spectrogram = features;
      this.emit('feature', this.spectrogram);
    });

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
}

