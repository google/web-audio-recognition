#!/usr/bin/env python
import librosa
import librosa.display
import mel_features_from_audioset as mel_features
import numpy as np
import os
import matplotlib.pyplot as plt
from subprocess import PIPE, Popen

TEST_WAVS = ['../assets/aff582a1_nohash_4_44100.wav',
    '../assets/ffd2ba2f_nohash_4_44100.wav', '../assets/sine_1s_example.wav']
TEST_WAVS = ['../assets/sine_1s_example.wav']
TEST_WAVS = ['../test/test.wav']

# Parameters for the onsets-and-frames model.
SAMPLE_RATE = 16000
HOP_LENGTH = 512
F_MIN = 30
N_MELS = 229

# Generate features from audioset/mel_features.py.
# Generate features from librosa.
# Genearte features from the web-based feature extractor.
# Compare them to one another.

def GenerateAudioSetFeatures(wav_path):
  y, sr = librosa.load(wav_path, sr=SAMPLE_RATE)
  spec = mel_features.log_mel_spectrogram(y,
      audio_sample_rate=SAMPLE_RATE,
      window_length_secs=BUFFER_LENGTH/SAMPLE_RATE,
      hop_length_secs=HOP_LENGTH/SAMPLE_RATE)
  return spec.T

def GenerateLibrosaFeatures(wav_path):
  y, sr = librosa.load(wav_path, sr=SAMPLE_RATE)
  #return np.abs(librosa.stft(y, hop_length=HOP_LENGTH))

  mel = librosa.feature.melspectrogram(
      y,
      SAMPLE_RATE,
      hop_length=HOP_LENGTH,
      fmin=F_MIN,
      n_mels=N_MELS,
      htk=True).astype(np.float32)

  mel = librosa.power_to_db(mel)
  return mel

def GenerateWebFeatures(wav_path):
  command = ['ts-node', 'web_audio_features.ts', '-i', wav_path,
      '--hop_length', str(HOP_LENGTH),
      '--n_mels', str(N_MELS), '--f_min', str(F_MIN)]
  print(command)
  p = Popen(command, stdin=PIPE, stdout=PIPE, stderr=PIPE)
  output, error = p.communicate()
  print(output)
  data_string, shape_string = output.strip().split('\n')[-2:]
  data = np.array(data_string.split(',')).astype(float)
  shape = np.array(shape_string.split(',')).astype(int)
  print shape_string, shape
  spec = data.reshape(shape)
  return spec.T


def PlotMelSpec(mel_spec, title):
  librosa.display.specshow(mel_spec)
  plt.colorbar(format='%+2.0f dB')
  plt.title('Mel spectrogram (%s)' % title)
  plt.tight_layout()

for wav_path in TEST_WAVS:
  name = os.path.basename(wav_path)
  mel_librosa = GenerateLibrosaFeatures(wav_path)
  mel_webaudio = GenerateWebFeatures(wav_path)
  print('mel_librosa shape: %s\nmel_webaudio: %s\n' %
      (mel_librosa.shape, mel_webaudio.shape))
  plt.subplot(2, 1, 1)
  PlotMelSpec(mel_librosa, 'librosa')
  plt.subplot(2, 1, 2)
  PlotMelSpec(mel_webaudio, 'web')
  plt.show()
