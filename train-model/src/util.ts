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

export function labelArrayToString(label: Float32Array, allLabels: string[]) {
  const [ind, _] = argmax(label);
  return allLabels[ind];
}

export function argmax(array: Float32Array) {
  let max = -Infinity;
  let argmax = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
      argmax = i;
    }
  }
  return [argmax, max];
}

export function getParameterByName(name: string, url?: string) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
