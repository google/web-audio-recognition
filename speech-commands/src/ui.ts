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

export function displayPrediction(labels: any, values: any) {
  let contents: string = "";
  let tableBody = <HTMLTableElement> 
      document.getElementById('results-table-body');
  let row: any;
  let cell: any;
  let newTableBody = document.createElement('tbody');
  newTableBody.setAttribute('id', 'results-table-body');

  for (let i=0; i < labels.length; i+= 1){
    row = newTableBody.insertRow(-1);
    cell = row.insertCell(0);
    cell.innerHTML = labels[i].toString();
    cell = row.insertCell(1);
    cell.innerHTML = values[i].toFixed(3).toString();
    console.log(contents);
  }
  tableBody.parentNode.replaceChild(newTableBody, tableBody);
}
