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
/**
 * Save Float32Array in arbitrarily sized chunks.
 * Load Float32Array in arbitrarily sized chunks.
 * Determine if there's enough data to grab a certain amount.
 */
export default class CircularAudioBuffer {
    buffer: Float32Array;
    currentIndex: number;
    constructor(maxLength: number);
    /**
     * Add a new buffer of data. Called when we get new audio input samples.
     */
    addBuffer(newBuffer: Float32Array): void;
    /**
     * How many samples are stored currently?
     */
    getLength(): number;
    /**
     * How much space remains?
     */
    getRemainingLength(): number;
    /**
     * Return the first N samples of the buffer, and remove them. Called when we
     * want to get a buffer of audio data of a fixed size.
     */
    popBuffer(length: number): Float32Array;
    /**
     * Get the the first part of the buffer without mutating it.
     */
    getBuffer(length?: number): Float32Array;
    clear(): void;
}
