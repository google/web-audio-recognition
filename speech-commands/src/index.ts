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

import {loadFrozenModel, FrozenModel} from '@tensorflow/tfjs-converter';
import {forwardPassWav} from './model';

const HOSTNAME = 'http://localhost:8000/';
const MODEL_NAME = 'model2';
const MODEL_URL = HOSTNAME + 'models/' + MODEL_NAME + '/tensorflowjs_model.pb';
const WEIGHTS_URL = HOSTNAME + 'models/' + MODEL_NAME + 
    '/weights_manifest.json';
const ASSET_PATH = HOSTNAME + 'assets/left0.wav';

/**
 * Run the selected .wav file through the neural network
 */
function forwardPassSelectedFile(e: any, promisedModel: Promise<FrozenModel>) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var fileReader = new FileReader();
  fileReader.onload = function(e: any) {
    const arrayBuffer = e.target.result;
    forwardPassWav(arrayBuffer, promisedModel);
  };

  fileReader.readAsArrayBuffer(file);
}

const fileInput: HTMLElement = document.getElementById('file-input');
const model = loadFrozenModel(MODEL_URL, WEIGHTS_URL);
window.onload = () => {
  document.getElementById('file-input').addEventListener(
    'change', 
    (e) => forwardPassSelectedFile(e, model), 
    false);
};
