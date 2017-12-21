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
TEST_WAVS = ['../assets/spoken_command_example_44100.wav']
BUFFER_LENGTH = 1024
HOP_LENGTH = 512
SAMPLE_RATE = 44100.0
MEL_COUNT = 20

# Generate features from audioset/mel_features.py.
# Genearte features from the web-based feature extractor.
# Compare them to one another.

def GenerateAudioSetFeatures(wav_path):
  y, sr = librosa.load(wav_path)
  spec = mel_features.log_mel_spectrogram(y,
      audio_sample_rate=SAMPLE_RATE,
      window_length_secs=BUFFER_LENGTH/SAMPLE_RATE,
      hop_length_secs=HOP_LENGTH/SAMPLE_RATE)
  return spec.T

def GenerateLibrosaFeatures(wav_path):
  y, sr = librosa.load(wav_path)
  stft = librosa.stft(y, n_fft=BUFFER_LENGTH, hop_length=HOP_LENGTH)
  D = np.abs(stft) ** 2
  S = np.log(librosa.feature.melspectrogram(S=D, n_mels=MEL_COUNT))
  return S


def GenerateWebAudioFeatures(wav_path):
  p = Popen(['ts-node', 'web_audio_features.ts', wav_path],
      stdin=PIPE, stdout=PIPE, stderr=PIPE)
  output, error = p.communicate()
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
  plt.show()

for wav_path in TEST_WAVS:
  name = os.path.basename(wav_path)
  mel_librosa = GenerateLibrosaFeatures(wav_path)
  mel_audioset = GenerateAudioSetFeatures(wav_path)
  mel_webaudio = GenerateWebAudioFeatures(wav_path)
  print('mel_librosa shape: %s\nmel_audioset shape: %s\nmel_webaudio: %s\n' %
      (mel_librosa.shape, mel_audioset.shape, mel_webaudio.shape))
  PlotMelSpec(mel_librosa, 'librosa')
  PlotMelSpec(mel_audioset, 'audioset')
  PlotMelSpec(mel_webaudio, 'webaudio')
