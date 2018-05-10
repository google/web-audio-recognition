import * as chai from 'chai';
import * as chaiAlmost from 'chai-almost';
import * as melspec from '../src/MelSpectrogram';
import * as fs from 'fs';
import * as wav from 'node-wav';

chai.use(chaiAlmost(0.001));

const assert = chai.assert;
const expect = chai.expect;

describe('padding', () => {

  it('reflects properly', () => {
    const arr = melspec.array([1, 2, 3, 4, 5]);
    const padded = melspec.padReflect(arr, 2);
    assert.equal(padded.length, 9);
    assert.deepEqual(padded,
      melspec.array([3, 2, 1, 2, 3, 4, 5, 4, 3]));
  });

  it('centers properly', () => {
    const arr = melspec.array([1,2,3,4,5]);
    const padded = melspec.padCenterToLength(arr, 10);
    assert.equal(padded.length, 10);
    assert.deepEqual(padded,
      melspec.array([0, 0, 1, 2, 3, 4, 5, 0, 0, 0]));
  });

});

describe('timeseries framing', () => {
  it('should produce the right number of buffers', () => {
    const arr = melspec.array(melspec.range(100));
    const frames = melspec.frame(arr, 20, 10);
    // Expect there to be total / hop - win frames.
    assert.equal(9, frames.length)
    assert.deepEqual(frames[0], melspec.array(melspec.range(20)));
  });

  it('should drop any incomplete buffers', () => {
    const arr = melspec.array(melspec.range(17));
    const frames = melspec.frame(arr, 10, 5);
    assert.equal(2, frames.length);
  });
});

describe('fft', () => {
  it('produces librosa compatible results in a simple case', () => {
    const arr = melspec.array([0, 1, 0, 0]);
    // Expected output from librosa: ___.
    const fft = melspec.fft(arr);
    const fftMags = melspec.mag(fft);
    assert.equal(fftMags.length, arr.length);
    assert.deepEqual(fft, [1, 0, 0, -1, -1, 0, 0, 1]);
  });

  it('produces results for a more complex case', () => {
    const data = loadWavData('./assets/spoken_command_example.wav');
    const y = data.slice(0, 2048);
    const fft = melspec.fft(y);
    const fftMags = melspec.mag(fft);
    const expected = [0.00540161,0.10528189,0.31593332,
      0.2739471,0.09277216,0.32729456,0.54242885,0.8040787,2.0745807,
      0.48930702];

    expect(fftMags.slice(0, 10)).to.be.almost.eql(melspec.array(expected));
    assert.equal(fft.length, 4096);
    assert.equal(fftMags.length, 2048);
  });

  it('produces consistent values through the end of the fft', () => {
    const data = loadWavData('./assets/spoken_command_example.wav');
    const y = data.slice(data.length - 2048, data.length);
    const fft = melspec.fft(y);
    const fftMags = melspec.mag(fft);
    const expectedLastMags =
      [0.37909225,0.39151394,2.0663054,0.86155003,0.7584111,0.6130846,0.5864627,0.37788,0.23760916,0.6239957];

    const actualLastMags = fftMags.slice(fftMags.length - 10, fftMags.length);
    expect(actualLastMags).to.be.almost.eql(
      melspec.array(expectedLastMags));
  });

  it('produces librosa compatible fft for a full file', () => {
    const expected = loadArrayFromText('test/fft_mags_2048.txt');
    let y = loadWavData('test/test.wav');
    y = y.slice(0, 2048);
    const fft = melspec.fft(y);
    const fftMags = melspec.mag(fft);
    expectArraysClose(fftMags.slice(1), expected.slice(1), 0.01);
  });
});

describe('stft spectrogram', () => {
  it('uses the same fft window (256)', () => {
    const expected = loadArrayFromText('test/fft_window_256.txt');
    const win = melspec.hannWindow(256);
    //console.log(win, expected);
    expectArraysClose(win, expected, 0.1);
  });

  it('uses the same fft window (2048)', () => {
    const expected = loadArrayFromText('test/fft_window_2048.txt');
    const win = melspec.hannWindow(2048);
    expectArraysClose(win, expected, 0.1);
  });

  it('produces librosa compatible stft', () => {
    const expected = loadArrayFromText('test/stft_mags.txt');
    const y = loadWavData('test/test.wav');
    const spec = melspec.spectrogram(y, {sampleRate: 16000});
    const flatSpec = melspec.flatten2D(spec);
    expectArraysClose(flatSpec, expected, 0.1);
  });
});


describe('mel spectrogram', () => {
  const SAMPLE_RATE = 16000
  const HOP_LENGTH = 512
  const F_MIN = 30
  const N_MELS = 229

  it('produces the right mel filterbank (1 filter)', () => {
    const expected = loadArrayFromText('test/mel_filter_1.txt');
    const filter = melspec.createMelFilterbank({
      sampleRate: SAMPLE_RATE,
      fMin: F_MIN,
      nMels: 1,
    });
    const flatFilter = melspec.flatten2D(filter);
    expectArraysClose(flatFilter, expected, 0.03);
  });

  it('produces the right mel filterbank (2 filters)', () => {
    const expected = loadArrayFromText('test/mel_filter_2.txt');
    const filter = melspec.createMelFilterbank({
      sampleRate: SAMPLE_RATE,
      fMin: F_MIN,
      nMels: 2,
    });
    const flatFilter = melspec.flatten2D(filter);
    expectArraysClose(flatFilter, expected, 0.03);
  });

  it('produces the right mel filterbank (full filter)', () => {
    const expected = loadArrayFromText('test/mel_filter.txt');
    const filter = melspec.createMelFilterbank({
      sampleRate: SAMPLE_RATE,
      fMin: F_MIN,
      nMels: N_MELS,
    });
    const flatFilter = melspec.flatten2D(filter);
    expectArraysClose(flatFilter, expected, 0.03);
  });

  it('produces librosa compatible mel spec', () => {
    const expected = loadArrayFromText('test/mel_mags.txt');
    const y = loadWavData('test/test.wav');
    const spec = melspec.melSpectrogram(y, {
      sampleRate: SAMPLE_RATE,
      hopLength: HOP_LENGTH,
      fMin: F_MIN,
      nMels: N_MELS,
    });
    const flatSpec = melspec.flatten2D(spec);
    expectArraysClose(flatSpec, expected, 0.03);
  });

  it('produces librosa compatible log mel spec', () => {
    const expected = loadArrayFromText('test/log_mel_mags.txt');
    const y = loadWavData('test/test.wav');
    const spec = melspec.melSpectrogram(y, {
      sampleRate: SAMPLE_RATE,
      hopLength: HOP_LENGTH,
      fMin: F_MIN,
      nMels: N_MELS,
    });
    const logMel = melspec.powerToDb(spec);
    const flatSpec = melspec.flatten2D(logMel);
    expectArraysClose(flatSpec, expected, 0.1);
  });
});

describe('resampling', () => {
  it('produces librosa compatible results', () => {
    expect([4, 2, 5]).to.be.deep.almost([3, 4, 7], 3)
    return assert(false);
  });
});

describe('utils', () => {
  it('hzToMel works', () => {
    // Expected values from librosa.hz_to_mel(440, htk=True).
    expect(Math.round(melspec.hzToMel(440))).to.equal(549);
  });

  it('melToHz works', () => {
    expect(melspec.melToHz(3)).to.almost.equal(1.869);
  });

  it('creates the right mel coeffs', () => {
    const freqs = Array.from(melspec.calculateMelFreqs(3, 30, 8000));
    expect(freqs.map(v => Math.floor(v))).to.deep.equal(
      [30, 1820, 8000]);
  });

  it('outersubtracts properly', () => {
    const a = melspec.array([1,2]);
    const b = melspec.array([3,4,5]);
    const res = melspec.outerSubtract(a, b);
    expect(res.length == 2);
    expect(res[0].length == 3);
    const flatRes = Array.from(melspec.flatten2D(res));
    expect(flatRes).to.deep.equal([-2, -1, -3, -2, -4, -3]);
  });

});

function loadWavData(path: string) {
  const file = fs.readFileSync(path);
  //console.log(`Loaded file of ${file.length} bytes.`);
  const result = wav.decode(file);
  const buffer = result.channelData[0];
  //console.log(`Decoded audio buffer of ${buffer.length} samples at ${result.sampleRate} Hz.`);
  return buffer;
}

function loadArrayFromText(path: string) {
  const file = fs.readFileSync(path, 'utf8');
  const array = file.split(/\s+/g).map(item => Number(item));
  return melspec.array(array.slice(0, array.length - 1));
}

function sub(arr, arr2) {
  const out = new Float32Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    out[i] = arr[i] - arr2[i];
  }
  return out;
}

function abs(arr) {
  return arr.map(val => Math.abs(val));
}

function expectArraysClose(arr, arr2, maxRelativeError=0.0001) {
  if (arr.length != arr2.length) {
    assert(false, `Array lengths are not equal: ${arr.length} != ${arr2.length}.`);
  }

  const errors = new Float32Array(arr.length);
  const errorsAbs = new Float32Array(arr.length);
  const errorsRel = new Float32Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const groundTruth = arr2[i];
    const abs = Math.abs(groundTruth - value);
    const rel = Math.abs(1 - arr[i] / arr2[i]);
    // If the value is too small, use absolute error.
    errorsAbs[i] = abs;
    errorsRel[i] = rel;
    if (Math.abs(groundTruth) < 1e-3) {
      errors[i] = abs;
    } else {
      errors[i] = rel;
    }
  }
  let averageErrorAbs = 0;
  let averageErrorRel = 0;
  const badInds = [];
  for (let i = 0; i < errors.length; i++) {
    averageErrorAbs += errorsAbs[i];
    averageErrorRel += errorsRel[i];
    const val = errors[i];
    if (val > maxRelativeError) {
      //console.log(`[${i}] = ${arr[i]}, expected ${arr2[i]}. err: ${val}.`);
      badInds.push(i);
    }
  }
  averageErrorAbs /= errors.length;
  averageErrorRel /= errors.length;

  if (badInds.length > 0) {
    console.log(`FYI: average absolute error: ${averageErrorAbs}, relative error: ${averageErrorRel}.`);
    assert(false, `Indices ${badInds} exceed relative error T ${maxRelativeError}.`);
  }
}
