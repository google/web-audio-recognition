/**
 * Copyright 2018 Google LLC
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

import * as tf from '@tensorflow/tfjs';
import * as wav from 'node-wav'
import {FrozenModel} from '@tensorflow/tfjs-converter';
import {samplesToLength} from '../../audio-features/src/AudioUtils';
import {displayPrediction} from './ui';
import {spectrogram, melSpectrogram, powerToDb} 
    from '../../audio-features/src/MelSpectrogram';

const OUTPUT_LABELS = ["silence", "unknown", "yes", "no", "up", "down", "left", 
    "right", "on", "off", "stop", "go"];
const NUM_SAMPLES: number = 16000;

/**
 * Decodes a selected .wav file, computes its spectrogram and
 * passes it through the speech command network
 */
export function forwardPassWav(
    wavBuffer: ArrayBuffer, promisedModel: Promise<FrozenModel>) {

  const decodedWav = wav.decode(wavBuffer);
  const samples = samplesToLength(decodedWav.channelData[0], NUM_SAMPLES);

  const melSpec = melSpectrogram(samples, {
    sampleRate: 16000,
    hopLength: 192,
    winLength: 512,
    nFft: 512, // This increments when these params are stored as a const 
    nMels: 128,
    power: 2.0,
    fMin: 30.0,}
  );

  // Convert Float32Array[] to number[][] and swap dims and transpose
  // TODO: return appropriate number[][] in MelSpectrogram.ts code 
  // intead of processing here
  const mels = melSpec[0].length;
  const times = melSpec.length;
  let arrMelSpec: number[][] = [];
  for (let i=0; i<mels; i++){
    arrMelSpec.push(new Array(times));
  }
  for (let i=0; i<mels; i++) {
    for (let j=0; j<times; j++) {
      arrMelSpec[i][j] = melSpec[j][i];
    }
  }

  // Forward pass input through neural network
  const inputTensor = tf.tensor(arrMelSpec, );
  console.log(inputTensor);
  promisedModel.then(function(m) {
    let startTime: any = new Date();
    let prediction: any = m.execute({fingerprint_input: inputTensor});
    prediction = prediction as tf.Tensor;
    prediction = prediction.dataSync();
    let endTime: any = new Date();
    console.log(`Time to predict: ${endTime - startTime}ms`);

    displayPrediction(OUTPUT_LABELS, prediction);
  });
}
