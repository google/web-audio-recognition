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
import {Array3D, NDArray} from 'deeplearn';

export const BUFFER_LENGTH = 1024;
export const HOP_LENGTH = 512;
export const MEL_COUNT = 20;
export const EXAMPLE_SR = 16000;
export const DURATION = 1.0;
export const IS_MFCC_ENABLED = false;

/**
 * Goes from filename or audio sample buffer to input features.
 */
export default class FeatureExtractor {

  static bufferToFeature(buffer: Float32Array, isMfccEnabled=false) {
    buffer = this.zeroPadIfNeeded(buffer, DURATION * EXAMPLE_SR);
    const spec = this.pcmToMelSpectrogram(buffer, isMfccEnabled);
    return this.melSpectrogramToInput(spec);
  }

  static featureToSpectrogram(feature: NDArray) : Float32Array[] {
    const data = feature.dataSync();
    const out = [];
    const [times, freqs, _] = feature.shape;
    for (let i = 0; i < times; i++) {
      // Get the chunk between i*freqs and (i+1)*freqs and create a new
      // Float32Array out of it.
      const column = data.slice(i*freqs, (i + 1)*freqs);
      out.push(column);
    }
    return out;
  }

  static getFeatureShape() {
    const times = Math.floor(
      (DURATION * EXAMPLE_SR - BUFFER_LENGTH) / HOP_LENGTH) + 1;

    return [times, MEL_COUNT, 1];
  }

  private static pcmToMelSpectrogram(buffer: Float32Array,
    isMfccEnabled: boolean) {
    const stft = AudioUtils.stft(buffer, BUFFER_LENGTH, HOP_LENGTH);
    const spec = stft.map(fft => AudioUtils.fftEnergies(fft));
    if (isMfccEnabled) {
      return AudioUtils.mfccSpectrogram(spec, MEL_COUNT);
    } else {
      return AudioUtils.melSpectrogram(spec, MEL_COUNT);
    }
  }

  static melSpectrogramToInput(spec: Float32Array[]) : Array3D {
    // Flatten this spectrogram into a 2D array.
    const times = spec.length;
    const freqs = spec[0].length;
    const data = new Float32Array(times * freqs);
    let i = 0;
    for (let i = 0; i < times; i++) {
      const mel = spec[i];
      const offset = i * freqs;
      data.set(mel, offset);
    }
    // Normalize the whole input to be in [0, 1].
    const shape:number[3] = [times, freqs, 1];
    //this.normalizeInPlace(data, 0, 1);
    return Array3D.new(shape, Array.prototype.slice.call(data));
  }

  private static zeroPadIfNeeded(buffer: Float32Array, targetLength: number) {
    if (buffer.length == targetLength) {
      return buffer;
    } else if (buffer.length > targetLength) {
      return buffer.slice(0, targetLength);
    }
    //console.log(`Padded buffer of length ${buffer.length}.`);
    const out = new Float32Array(targetLength);
    out.fill(0);
    out.set(buffer);
    return out;
  }

  private static normalizeInPlace(buffer: Float32Array, normMin=0, normMax=1) {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < buffer.length; i++) {
      const val = buffer[i];
      if (val < min) {
        min = val;
      }
      if (val > max) {
        max = val;
      }
    }

    // Now we've found min and max values, we know what to scale & offset by.
    const scale = (normMax - normMin) / (max - min);
    const offset = normMin - min;
    for (let i = 0; i < buffer.length; i++) {
      // Get a normalized value in [0, 1].
      const norm = (buffer[i] - min) / (max - min);
      // Then convert it to the desired range.
      buffer[i] = normMin + norm * (normMax - normMin);
    }
  }

}
