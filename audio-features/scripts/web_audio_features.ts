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

import AudioUtils from '../src/AudioUtils';
import * as fs from 'fs';
import * as wav from 'node-wav';

const args = process.argv;
if (args.length != 3) {
  console.error(`Usage: ts-node script.ts example.wav`);
  process.exit(1);
}
const path = args[args.length - 1];

const file = fs.readFileSync(path);
console.log(`Loaded file of ${file.length} bytes.`);
const result = wav.decode(file);
const buffer = result.channelData[0];
console.log(`Decoded audio buffer of ${buffer.length} samples at ${result.sampleRate} Hz.`);

const bufferLength = 1024;
const hopLength = 1024;
const melCount = 20;

const stft = AudioUtils.stft(buffer, bufferLength, hopLength);
const stftEnergies = stft.map(fft => AudioUtils.fftEnergies(fft));
const logMel = AudioUtils.melSpectrogram(stftEnergies, melCount)

const shape = [logMel.length, logMel[0].length];
//console.log(`Generated log-mel spectrogram of shape ${logMel.length} x ${logMel[0].length}.`);

// Output data and values as strings on separate lines. This will be processed
// by another script.
console.log(logMel.toString());
console.log(shape.toString());
