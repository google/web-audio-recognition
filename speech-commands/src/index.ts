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

import * as UI from './ui';
import {loadFrozenModel, FrozenModel} from '@tensorflow/tfjs-converter';
import {forwardPassWav, forwardPassFloatArr, specParams} from './model';
import StreamingFeatureExtractor
    from '../../audio-features/src/StreamingFeatureExtractor';

const HOSTNAME = 'http://localhost:8000/';
const MODEL_NAME = 'model2';
const MODEL_URL = HOSTNAME + 'models/' + MODEL_NAME + '/tensorflowjs_model.pb';
const WEIGHTS_URL = HOSTNAME + 'models/' + MODEL_NAME +
    '/weights_manifest.json';
const ASSET_PATH = HOSTNAME + 'assets/left0.wav';

const streamParams = {
  duration: 2.7096742,
  delay: 0.1,
}

/**
 * Run the selected .wav file through the neural network
 */
function forwardPassSelectedFile(e: any, model: FrozenModel) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var fileReader = new FileReader();
  fileReader.onload = e => {
    const arrayBuffer = e.target.result;
    forwardPassWav(arrayBuffer, model);
  };

  fileReader.readAsArrayBuffer(file);
}

const streamFeature = new StreamingFeatureExtractor(specParams(), streamParams);
window.onload = async () => {
  UI.hideInputs();
  const model: FrozenModel = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);
  UI.modelLoaded();

  const fileInput = document.getElementById('file-input');
  const streamButton = document.getElementById('stream-btn');

  fileInput.addEventListener(
    'change',
    e => forwardPassSelectedFile(e, model),
    false);

  streamButton.addEventListener('click', e => {
    if(streamFeature.isStreaming) {
      streamFeature.stop();
      streamButton.innerHTML = 'Stream';
    } else {
      streamFeature.start();
      streamFeature.on('feature', melSpec => {
        // Predict stream
        forwardPassFloatArr(melSpec, model);
      })
      streamButton.innerHTML = 'Stop Streaming';
    }
  })

};
