#!/usr/bin/env python

# Copyright 2017 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
# License for the specific language governing permissions and limitations under
# the License.


"""Concatenate all training examples into one large, conjoined wav file. This is
necessary to reduce the number of XHRs we need to make to load all of the data.
Ensure that each sample is exactly 44100 samples long."""
import argparse
import numpy as np
import os
import random
import scipy.io.wavfile

OUT_PATH = 'out'
DATA_PATH = '../speech_commands_v0.01/'
DURATION = 1
SAMPLE_RATE = 16000
EXAMPLES_PER_LABEL = 10000
BACKGROUND_LABEL = '_background_noise_'

parser = argparse.ArgumentParser(description='Combine labeled wavs into one.')
parser.add_argument('--labels', nargs='+', help='Which labels to process',
    default=[])
parser.add_argument('--examples_per_label', type=int, default=EXAMPLES_PER_LABEL,
    help='How many examples to take from each label')
parser.add_argument('--examples_per_other_label', type=int,
    default=EXAMPLES_PER_LABEL * 4,
    help='How many examples to take from each label')
parser.add_argument('--out', type=str, default=OUT_PATH,
    help='Directory to write the files to.')
parser.add_argument('--other', action='store_true', default=True)
parser.add_argument('--background', action='store_true', default=True)

args = parser.parse_args()


def GetAllLabels():
  subdirs = [x[0].split('/')[-1] for x in os.walk(DATA_PATH)]
  return subdirs[2:]

def GetAllExamplePaths(label):
  path = os.path.join(DATA_PATH, label)
  examples = [x[2] for x in os.walk(path)][0]
  return [os.path.join(label, eg) for eg in examples if eg.endswith('.wav')]

def GetAllExamplePathsForLabels(labels):
  out = []
  for label in labels:
    out += GetAllExamplePaths(label)
  return out


def ReadWav(path):
  sr, y = scipy.io.wavfile.read(path)
  return y

def PadBuffer(buf, length):
  if len(buf) > length:
    return buf[:length]
  elif len(buf) == length:
    return buf
  else:
    # Array is too short, zero-pad it.
    return buf + ([0] * (length - len(buf)))

def WriteWav(buf, path):
  # Ensure directory exists.
  dir = os.path.dirname(path)
  if not os.path.exists(dir):
    os.mkdir(dir)
  scipy.io.wavfile.write(path, SAMPLE_RATE, buf)

if __name__ == '__main__':
  labels = args.labels or GetAllLabels()
  if args.background:
    labels += [BACKGROUND_LABEL]
  print('Loading %d labels' % len(labels))
  for label in labels:
    example_paths = GetAllExamplePaths(label)
    bufs = example_paths[:args.examples_per_label]
    print('Writing %d examples for label %s.' % (len(bufs), label))
    combined_buf = []
    for path in bufs:
      buf = list(ReadWav(os.path.join(DATA_PATH, path)))
      if label != BACKGROUND_LABEL:
        buf = PadBuffer(buf, DURATION * SAMPLE_RATE)
      combined_buf += buf

    arr = np.array(combined_buf, dtype=np.int16)
    WriteWav(arr, os.path.join(args.out, '%s.wav' % label))

  if args.other:
    # Get a bunch of non-specified examples and put them all into other.wav.
    other_labels = set(GetAllLabels()).difference(labels)
    other_paths = GetAllExamplePathsForLabels(other_labels)[:args.examples_per_other_label]
    random.shuffle(other_paths)
    combined_buf = []
    for path in other_paths:
      buf = list(ReadWav(os.path.join(DATA_PATH, path)))
      buf = PadBuffer(buf, DURATION * SAMPLE_RATE)
      combined_buf += buf

    arr = np.array(combined_buf, dtype=np.int16)
    print('Writing %s examples to other.wav' % len(other_paths))
    WriteWav(arr, os.path.join(args.out, 'other.wav'))


