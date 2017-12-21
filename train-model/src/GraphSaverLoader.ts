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

import {
  Graph,
  NDArray,
  Session,
} from 'deeplearn';
import * as tab64 from 'tab64';

const DB_NAME = 'weightDb';
const DB_VERSION = 5;
const WEIGHT_STORE = 'weightStore';

export interface GraphWeights {
  [key: string]: NDArray
}

export function saveGraphWeights(graph: Graph, session: Session) {
  if (session.activationArrayMap.size() === 0) {
    console.error('No activationArrayMap found. Please train first.');
    return;
  }
  // Get the nodes that we want to save.
  const saveNodes = graph.getNodes().filter(v => {
    return v.name.slice(0, 4) === 'save';
  });
  const saveWeights = saveNodes.map(node => {
    return {key: node.name, value: session.activationArrayMap.get(node.output)};
  });

  const dbResult = indexedDB.open(DB_NAME, DB_VERSION);

  dbResult.onerror = function(e) {
    console.log('IDB: error.');
  };

  dbResult.onupgradeneeded = function(e) {
    console.log('IDB: onupgradeneeded.');
    const db = this.result;
    if (!db.objectStoreNames.contains(WEIGHT_STORE)) {
      db.createObjectStore(WEIGHT_STORE);
    }
  };

  dbResult.onsuccess = function(e) {
    console.log('IDB: onsuccess.');
    const db = this.result;
    // Iterate through all of the weights in the graph, save each weight
    // vector to indexedDB.
    for (let {key, value} of saveWeights) {
      saveNDArray(db, WEIGHT_STORE, key, value);
      console.log(`Saved NDArray of shape [${value.shape}] for node ${key}.`);
    }
  };
}

export async function loadGraphWeights(graph: Graph) {
  return new Promise((resolve, reject) => {
    const saveNodes = graph.getNodes().filter(v => {
      return v.name.slice(0, 4) === 'save';
    });
    const dbResult = indexedDB.open(DB_NAME, DB_VERSION);
    dbResult.onsuccess = function(e) {
      const namedWeights = {};
      const promises = [];
      const db = this.result;
      for (let node of saveNodes) {
        // Get the saved value for this node.
        const promise = loadNDArray(db, WEIGHT_STORE, node.name).then(value => {
          namedWeights[node.name] = value;
          console.log(`Loaded NDArray of shape [${value.shape}]` +
            ` for node ${node.name}.`);
        });
        promises.push(promise);
      }
      return Promise.all(promises).then(e => resolve(namedWeights));
    }

    dbResult.onerror = reject;

    dbResult.onupgradeneeded = function(e) {
      console.log('IDB: onupgradeneeded.');
    };
  });
}

async function saveNDArray(db, storeName, keyName, ndArray) {
  // Save both shape and data.
  await saveValue(db, storeName, keyName + '-shape', ndArray.shape);
  await saveValue(db, storeName, keyName + '-data', ndArray.dataSync());
}

async function loadNDArray(db, storeName, keyName) {
  const shapeKey = keyName + '-shape';
  const dataKey = keyName + '-data';
  const shape = await loadValue(db, storeName, shapeKey);
  const data = await loadValue(db, storeName, dataKey);
  return NDArray.make(shape, {values: data});
}

async function saveValue(db, storeName, keyName, value) {
  const trans = db.transaction(storeName, 'readwrite');
  const store = trans.objectStore(storeName);
  return store.put(value, keyName);
}

async function loadValue(db, storeName, keyName) {
  return new Promise((resolve, reject) => {
    const trans = db.transaction(storeName, 'readonly');
    const store = trans.objectStore(storeName);
    const request = store.get(keyName);
    request.onsuccess = function(e) {
      // Do something with the request.result!
      const weight = request.result;
      resolve(weight);
    };
    request.onerror = reject;
  });
}

/**
 * Saving and loading from JSON.
 */
export function saveGraphWeightsJSON(graph: Graph, session: Session) {
  if (session.activationArrayMap.size() === 0) {
    console.error('No activationArrayMap found. Please train first.');
    return;
  }
  // Get the nodes that we want to save.
  const saveNodes = graph.getNodes().filter(v => {
    return v.name.slice(0, 4) === 'save';
  });
  // Format: {"node-name": {"shape": [3, 2, 4], "data": "BASE64STRING"}, ...}
  const saveWeights = saveNodes.map(node => {
    return {key: node.name, value: session.activationArrayMap.get(node.output)};
  });
  let json = {};
  for (let node of saveNodes) {
    const key = node.name;
    const ndarray = session.activationArrayMap.get(node.output);
    const base64 = tab64.encode(ndarray.dataSync());
    const value = {
      shape: ndarray.shape,
      data: base64,
    };
    json[key] = value;
  }
  // Stringify the JSON and download it.
  return JSON.stringify(json, null, 2);
}

export function loadGraphWeightsJSON(graph: Graph, json: object) {
  const saveNodes = graph.getNodes().filter(v => {
    return v.name.slice(0, 4) === 'save';
  });

  const namedWeights: GraphWeights = {};
  for (let node of saveNodes) {
    const key = node.name;
    const item = json[key];
    const data = tab64.decode(item.data, 'float32')
    const array = NDArray.make(item.shape, {values: data});
    namedWeights[node.name] = array;
  }
  return namedWeights;
}
