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

import CommandRecognizer from './CommandRecognizer';
import './components/ConfidenceIndicator';
import {getParameterByName} from '../../train-model/src/util';

const model = getParameterByName('model');

let recognizer;
if (model == 'number') {
  recognizer = new CommandRecognizer({
    scoreT: 5,
    commands: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
      'eight', 'nine'],
    modelUrl: 'models/numbers-model.json',
  });
} else if (model == 'all') {
  const allLabels = ['bed', 'bird', 'cat', 'dog', 'down', 'eight', 'five',
    'four', 'go', 'happy', 'house', 'left', 'marvin', 'nine', 'no', 'off', 'on',
    'one', 'right', 'seven', 'sheila', 'six', 'stop', 'three', 'tree', 'two',
    'up', 'wow', 'yes', 'zero'];
  recognizer = new CommandRecognizer({
    scoreT: 5,
    commands: allLabels,
    noOther: true,
    modelUrl: 'models/all-model.json',
  });
} else {
  recognizer = new CommandRecognizer({
    scoreT: 5,
    commands: ['yes', 'no'],
    modelUrl: 'models/yesno-model.json',
  });
}


recognizer.on('command', onCommand);
recognizer.on('silence', onSilence);

const streamEl = document.querySelector('#stream');
const commandEl = document.querySelector('#command');
const scoreEl = document.querySelector('#score');
const resultsEl = document.querySelector('#results');
const loadFileEl = document.querySelector('#load-file');
const messageEl = document.querySelector('#message');
const levelsEl = document.querySelector('#levels') as HTMLElement;

function setInstructionVisibility(visible: boolean) {
  // Show which commands are supported.
  if (visible) {
    const commandsFmt = recognizer.getCommands().join(', ');
    const message = `Listening for ${commandsFmt}.`;
    messageEl.innerHTML = message;
  } else {
    messageEl.innerHTML = '';
  }
}

let levelAnimationId = null;
function setLevelVisibility(visible: boolean) {
  if (visible) {
    levelsEl.style.display = 'block';
    levelAnimationId = requestAnimationFrame(animateLevelLoop);
  } else {
    levelsEl.style.display = 'none';
    cancelAnimationFrame(levelAnimationId);
  }
}

function animateLevelLoop() {
  // Get the latest energy level, and animate as a result.
  const micEl = getOrCreateConfidenceIndicator('mic-input', 'Microphone level');
  micEl.setAttribute('color', 'blue');
  micEl.setAttribute('level', recognizer.getMicrophoneInputLevel());

  // For each class in the recognizer, get the confidence level.
  for (let command of recognizer.getAllLabels()) {
    const indicatorEl = getOrCreateConfidenceIndicator(command, command.toUpperCase());
    indicatorEl.setAttribute('level', recognizer.getConfidenceLevel(command));
  }

  levelAnimationId = requestAnimationFrame(animateLevelLoop);
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

function onStream() {
  if (recognizer.isRunning()) {
    recognizer.stop();
    setInstructionVisibility(false);
    setLevelVisibility(false);
  } else {
    recognizer.start();
    setInstructionVisibility(true);
    setLevelVisibility(true);
  }
}

function onCommand(command: string, score: number) {
  console.log(`Command ${command} with score ${score}.`);
  commandEl.innerHTML = command;
  scoreEl.innerHTML = score.toFixed(2);
  resultsEl.classList.remove('hide');
  resultsEl.classList.add('show');
}

function onSilence(score: number) {
  // Start fading!
  resultsEl.classList.add('hide');
  resultsEl.classList.remove('show');
}

async function onLoadFile(e) {
  const files = this.files;
  const fileUrl = URL.createObjectURL(files[0]);
  const response = await fetch(fileUrl);
  const json = await response.json();
  recognizer.loadWeightsJSON(json);
}

streamEl.addEventListener('click', onStream);
loadFileEl.addEventListener('change', onLoadFile);
