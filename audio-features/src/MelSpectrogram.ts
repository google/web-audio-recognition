import * as FFT from 'fft.js';

interface SpecParams {
  sampleRate: number;
  hopLength?: number;
  winLength?: number;
  nFft?: number;
  nMels?: number;
  power?: number;
  fMin?: number;
  fMax?: number;
}

interface MelParams {
  sampleRate: number;
  nFft?: number;
  nMels?: number;
  fMin?: number;
  fMax?: number;
}


export function magSpectrogram(stft: Float32Array[], power?: number) : [Float32Array[], number] {
  if (!power) {
    power = 2.0;
  }
  const spec = stft.map(fft => mag(fft, power));
  const nFft = spec[0].length;
  return [spec, nFft];
}

export function stft(y: Float32Array, params: SpecParams) : Float32Array[] {
  const nFft = params.nFft || 2048;
  const winLength = params.winLength || nFft;
  const hopLength = params.hopLength || Math.floor(winLength / 4);

  let fftWindow = hannWindow(winLength);

  // Pad the window to be the size of nFft.
  fftWindow = padCenterToLength(fftWindow, nFft);

  // Pad the time series so that the frames are centered.
  y = padReflect(y, Math.floor(nFft / 2));

  // Window the time series.
  const yFrames = frame(y, nFft, hopLength);
  //console.log(`Split audio into ${yFrames.length} frames of ${yFrames[0].length} each.`);

  // Pre-allocate the STFT matrix.
  const stftMatrix = [];

  // How many columns can we fit within MAX_MEM_BLOCK?
  const width = yFrames.length;
  const height = nFft + 2;
  //console.log(`Creating STFT matrix of size ${width} x ${height}.`);

  for (let i = 0; i < width; i++) {
    // Each column is a Float32Array of size height.
    const col = new Float32Array(height);
    stftMatrix[i] = col;
  }

  for (let i = 0; i < width; i++) {
    // Populate the STFT matrix.
    const winBuffer = applyWindow(yFrames[i], fftWindow);
    const col = fft(winBuffer);
    stftMatrix[i].set(col.slice(0, height));
  }

  return stftMatrix;
}

export function spectrogram(y: Float32Array, params: SpecParams) : Float32Array[] {
  const stftMatrix = stft(y, params);
  const [spec, nFft] = magSpectrogram(stftMatrix, params.power);
  return spec;
}

export function melSpectrogram(y: Float32Array, params: SpecParams) : Float32Array[] {
  const stftMatrix = stft(y, params);
  const [spec, nFft] = magSpectrogram(stftMatrix, params.power);

  params.nFft = nFft;
  const melBasis = createMelFilterbank(params);
  return applyWholeFilterbank(spec, melBasis);
}

export function applyWholeFilterbank(spec: Float32Array[], filterbank: Float32Array[]) : Float32Array[]  {

  // Apply a point-wise dot product between the array of arrays.
  const out : Float32Array[] = [];
  for (let i = 0; i < spec.length; i++) {
    out[i] = applyFilterbank(spec[i], filterbank);
  }
  return out;
}

export function applyFilterbank(mags: Float32Array, filterbank: Float32Array[]) : Float32Array {
  if (mags.length != filterbank[0].length) {
    throw new Error(`Each entry in filterbank should have dimensions ` +
      `matching FFT. |mags| = ${mags.length}, ` +
      `|filterbank[0]| = ${filterbank[0].length}.`);
  }

  // Apply each filter to the whole FFT signal to get one value.
  let out = new Float32Array(filterbank.length);
  for (let i = 0; i < filterbank.length; i++) {
    // To calculate filterbank energies we multiply each filterbank with the
    // power spectrum.
    const win = applyWindow(mags, filterbank[i]);
    // Then add up the coefficents.
    out[i] = sum(win);
  }
  return out;
}

export function applyWindow(buffer, win) {
  if (buffer.length != win.length) {
    console.error(`Buffer length ${buffer.length} != window length ${win.length}.`);
    return;
  }

  let out = new Float32Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    out[i] = win[i] * buffer[i];
  }
  return out;
}

export function padCenterToLength(data: Float32Array, length: number) {
  // If data is longer than length, error!
  if (data.length > length) {
    throw new Error('Data is longer than length.');
  }

  const paddingLeft = Math.floor((length - data.length) / 2);
  const paddingRight = length - data.length - paddingLeft;
  return padConstant(data, [paddingLeft, paddingRight]);
}

export function padConstant(data: Float32Array, padding: number | number[]) {
  let padLeft, padRight;
  if (typeof(padding) == 'object') {
    [padLeft, padRight] = padding;
  } else {
    padLeft = padRight = padding;
  }
  const out = new Float32Array(data.length + padLeft + padRight);
  out.set(data, padLeft);
  return out;
}

export function padReflect(data: Float32Array, padding: number) {
  const out = padConstant(data, padding);
  for (let i = 0; i < padding; i++) {
    // Pad the beginning with reflected values.
    out[i] = out[2*padding - i];
    // Pad the end with reflected values.
    out[out.length - i - 1] = out[out.length - 2*padding + i - 1];
  }
  return out;
}

/**
 * Given a timeseries, returns an array of timeseries that are windowed
 * according to the params specified.
 */
export function frame(data: Float32Array, frameLength: number, hopLength: number) : Float32Array[] {
  const bufferCount = Math.floor((data.length - frameLength) / hopLength) + 1;
  let buffers = range(bufferCount).map(x => new Float32Array(frameLength));
  for (let i = 0; i < bufferCount; i++) {
    const ind = i * hopLength;
    const buffer = data.slice(ind, ind + frameLength);
    buffers[i].set(buffer);
    // In the end, we will likely have an incomplete buffer, which we should
    // just ignore.
    if (buffer.length != frameLength) {
      continue;
    }
  }
  return buffers;
}

export function createMelFilterbank(params: MelParams) : Float32Array[] {
  const fMin = params.fMin || 0;
  const fMax = params.fMax || params.sampleRate / 2;
  const nMels = params.nMels || 128;
  const nFft = params.nFft || 2048;

  const melMin = hzToMel(fMin);
  const melMax = hzToMel(fMax);

  // Construct linearly spaced array of nMel intervals, between melMin and
  // melMax.
  const mels = linearSpace(melMin, melMax, nMels + 2);
  // Convert from mels to hz.
  const hzs = mels.map(mel => melToHz(mel));
  // Go from hz to the corresponding bin in the FFT.
  const bins = hzs.map(hz => freqToBin(hz, nFft, params.sampleRate));

  // Now that we have the start and end frequencies, create each triangular
  // window (each value in [0, 1]) that we will apply to an FFT later. These
  // are mostly sparse, except for the values of the triangle
  const length = bins.length - 2;
  const filters = [];
  for (let i = 0; i < length; i++) {
    // Now generate the triangles themselves.
    filters[i] = triangleWindow(nFft, bins[i], bins[i+1], bins[i+2]);
  }

  return filters;
}

export function fft(y: Float32Array) {
  const fft = new FFT(y.length);
  const out = fft.createComplexArray();
  const data = fft.toComplexArray(y);
  fft.transform(out, data);
  return out;
}

export function triangleWindow(length, startIndex, peakIndex, endIndex) {
  const win = new Float32Array(length);
  const deltaUp = 1.0 / (peakIndex - startIndex);
  for (let i = startIndex; i < peakIndex; i++) {
    // Linear ramp up between start and peak index (values from 0 to 1).
    win[i] = (i - startIndex) * deltaUp;
  }
  const deltaDown = 1.0 / (endIndex - peakIndex);
  for (let i = peakIndex; i < endIndex; i++) {
    // Linear ramp down between peak and end index (values from 1 to 0).
    win[i] = 1 - (i - peakIndex) * deltaDown;
  }
  return win;
}

export function hannWindow(length: number) {
  let win = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    win[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
  }
  return win;
}

export function array(arr: number[]) {
  const out = new Float32Array(arr.length);
  out.set(arr);
  return out;
}

const MIN_VAL = -10;
export function logGtZero(val) {
  // Ensure that the log argument is nonnegative.
  const offset = Math.exp(MIN_VAL);
  return Math.log(val + offset);
}

export function sum(array) {
  return array.reduce(function(a, b) { return a + b; });
}

export function range(count) : number[] {
  let out = [];
  for (let i = 0; i < count; i++) {
    out.push(i);
  }
  return out;
}

export function linearSpace(start, end, count) {
  const delta = (end - start) / (count + 1);
  let out = [];
  for (let i = 0; i < count; i++) {
    out[i] = start + delta * i;
  }
  return out;
}

/**
 * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
 * calculates the energies. Output is half the size.
 */
export function mag(y: Float32Array, pow?: number) {
  if (!pow) {
    pow = 2.0;
  }
  let out = new Float32Array(y.length / 2);
  for (let i = 0; i < y.length / 2; i++) {
    out[i] = Math.pow(y[i*pow]*y[i*pow] + y[i*pow + 1]*y[i*pow + 1], 1/pow);
  }
  return out;
}

export function powerToDb(spec: Float32Array[]) {
  // TODO: Implement me.
  /*
  log_spec = 10.0 * np.log10(np.maximum(amin, magnitude))
  log_spec -= 10.0 * np.log10(np.maximum(amin, ref_value))

  top_db = 0 
        if (top_db < 0):
            raise ParameterError('top_db must be non-negative')
        log_spec = np.maximum(log_spec, log_spec.max() - top_db)

    return log_spec
   */
  return spec;
}

function hzToMel(hz) {
  return 1125 * Math.log(1 + hz/700);
}

function melToHz(mel) {
  return 700 * (Math.exp(mel/1125) - 1);
}

function freqToBin(freq, nFft, sr) {
  return Math.floor((nFft+1) * freq / (sr/2));
}

export function flatten2D(spec: Float32Array[]) {
  const length = spec[0].length * spec.length;
  const out = new Float32Array(length);
  const height = spec[0].length;
  const width = spec.length;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      out[j * width + i] = spec[i][j];
    }
  }
  return out;
}
