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

import {spectrogram, melSpectrogram, powerToDb} from '../src/MelSpectrogram';
import * as argparse from 'argparse';
import * as fs from 'fs';
import * as wav from 'node-wav';

const parser = new argparse.ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Spectrogram generator'
});
parser.addArgument(['-i', '--input'], {
  action: 'store', help: 'Input path', required: true});
parser.addArgument('--hop_length', {
  action: 'store', help: 'Hop length in samples', defaultValue: 1024});
parser.addArgument('--n_mels', {
  action: 'store', help: 'Number of mels', defaultValue: 20});
parser.addArgument('--f_min', {
  action: 'store', help: 'Minimum frequency (Hz)', defaultValue: 30});
parser.addArgument('--sample_rate', {
  action: 'store', help: 'Target sample rate (will resample if needed)',
  defaultValue: 16000});

const args = parser.parseArgs();

const file = fs.readFileSync(args.input);
console.log(`Loaded file of ${file.length} bytes.`);
const result = wav.decode(file);
const buffer = result.channelData[0];

console.log(`Decoded audio buffer.
Length: ${buffer.length} samples.
Sample rate: ${result.sampleRate} Hz.
Duration: ${buffer.length / result.sampleRate}.`);

const startTime = new Date().valueOf();
const melSpec = melSpectrogram(buffer, {
  sampleRate: Number(args.sample_rate),
  hopLength: Number(args.hop_length),
  nMels: Number(args.n_mels),
  fMin: Number(args.f_min),
});

const logMel = powerToDb(melSpec);

const endTime = new Date().valueOf();
const elapsed = (endTime - startTime) / 1000;
console.log(`Calculated mel spectrogram in ${elapsed} seconds.`);
const shape = [logMel.length, logMel[0].length];
//console.log(`Generated log-mel spectrogram of shape ${logMel.length} x ${logMel[0].length}.`);

// Output data and values as strings on separate lines. This will be processed
// by another script.
console.log(logMel.toString());
console.log(shape.toString());
