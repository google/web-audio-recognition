import librosa
import numpy as np
import tensorflow as tf
import scipy.io.wavfile as wavio
import sys

wavfile = sys.argv[1]

sample_rate = 16000.0
# A Tensor of [batch_size, num_samples] mono PCM samples in the range [-1, 1].
pcm = tf.placeholder(tf.float32, [None, None], name='input')

# A 1024-point STFT with frames of 64 ms and 75% overlap.
stfts = tf.contrib.signal.stft(pcm, frame_length=1024, frame_step=256,
                               fft_length=1024)
spectrograms = tf.abs(stfts)

# Warp the linear scale spectrograms into the mel-scale.
num_spectrogram_bins = stfts.shape[-1].value

lower_edge_hertz, upper_edge_hertz, num_mel_bins = 0.0, 7600.0, 128

linear_to_mel_weight_matrix = tf.contrib.signal.linear_to_mel_weight_matrix(
  num_mel_bins, num_spectrogram_bins, sample_rate, lower_edge_hertz,
  upper_edge_hertz)

mel_spectrograms = tf.tensordot(
  spectrograms, linear_to_mel_weight_matrix, 1)

mel_spectrograms.set_shape(spectrograms.shape[:-1].concatenate(
  linear_to_mel_weight_matrix.shape[-1:]))

y = wavio.read(wavfile)[1]
y = np.expand_dims(y,0)
y = y.astype(np.float32) / 255

with tf.Session() as sess:
  specstf = mel_spectrograms.eval({pcm: y})
  print(specstf)
  print(specstf.shape)

  specslib = librosa.feature.melspectrogram(y[0], sr=sample_rate, n_fft=1024, hop_length=256, power=1.0, n_mels=num_mel_bins)
  print(specslib)
  print(specslib.shape)
