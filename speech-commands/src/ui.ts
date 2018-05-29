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

import '../../inference-demo/src/components/ConfidenceIndicator';

let levelsEl;
let levelAnimationId;
export function initUi() {
  levelsEl = document.getElementById('levels') as HTMLElement;
  levelAnimationId = null;
};

function animateLevelLoop(labels: any, confidences: any) {
  for (let i=0; i < labels.length; i++) {
    let label = labels[i];
    let confidence = confidences[i];
    const indicatorEl = getOrCreateConfidenceIndicator(label, label.toUpperCase());
    indicatorEl.setAttribute('level', confidence);
  }

  levelAnimationId = requestAnimationFrame(
      () => animateLevelLoop(labels, confidences));
}

function getOrCreateConfidenceIndicator(command: string, title: string) {
  let outEl = document.querySelector(`.${command}`);
  if (!outEl) {
    outEl = document.createElement('confidence-indicator');
    outEl.setAttribute('title', title);
    outEl.setAttribute('level', '0.5');
    outEl.className = command;
    levelsEl.appendChild(outEl);
  }
  return outEl;
}

export function displayPrediction(labels: any, values: any) {
  levelsEl.style.display = 'block';
  levelAnimationId = requestAnimationFrame(
      () => animateLevelLoop(labels, values));
}

export function hidePrediction() {
  levelsEl.style.display = 'none';
  cancelAnimationFrame(levelAnimationId);
}

export function hideInputs() {
  let fileInput = document.getElementById('file-input');
  let streamBtn = document.getElementById('stream-btn');

  fileInput.style.display = "none";
  streamBtn.style.display = "none";
}

export function modelLoaded() {
  let fileInput = document.getElementById('file-input');
  let streamBtn = document.getElementById('stream-btn');
  let loadingText = document.getElementById('loading');

  fileInput.style.display = "block";
  streamBtn.style.display = "block";
  loadingText.style.display = "none";
}
