import * as melspec from '../MelSpectrogram';
import CircularAudioBuffer from '../CircularAudioBuffer';
import {resample} from '../AudioUtils';
import {Resampler} from '../Resampler';

export class MelSpectrogramProcessor extends AudioWorkletProcessor {
  // How many samples per buffer (in processed sample rate).
  winLength = 2048;
  // How many samples between buffers.
  hopLength = 1024;
  // Processing sample rate that we use for feature extraction.
  processSampleRate = 16000.0;
  // For storing multiple buffers of audio samples.
  circularBuffer: CircularAudioBuffer;
  // How many samples have we processed in total?
  totalSamples = 0;

  lastUpdate: number;

  constructor() {
    super();

    this.timer = new Timer();
    this.lastUpdate = currentTime;
    this.port.onmessage = this.handleMessage.bind(this);
  }

  handleMessage(event) {
    if (event.data.config) {
      this.configure(event.data.config);
    }
  }

  process(inputs, outputs, parameters) {
    // Post a message to the node for every 1 second.
    if (currentTime - this.lastUpdate > 1.0) {
      this.port.postMessage({
        message: 'Process is called.',
        timeStamp: currentTime,
      });
      this.lastUpdate = currentTime;
    }
    const input = inputs[0];
    const channel = input[0];

    this.circularBuffer.addBuffer(channel);
    this.totalSamples += channel.length;
    //console.log(`Total samples: ${this.totalSamples}.`);

    // If there's enough in the circular buffer, we should run the processing.
    if (this.circularBuffer.getLength() > this.winLengthNative) {
      const bufferNative = this.circularBuffer.getBuffer(this.winLengthNative);
      this.processCompleteBuffer(bufferNative);

      // Remove a hop's worth of data from the buffer.
      this.circularBuffer.popBuffer(this.hopLengthNative);
    }

    return true;
  }

  private configure(params: melspec.SpecParams) {
    console.log(`Received configuration params: ${JSON.stringify(params)}.`);
    this.winLength = params.winLength;
    this.hopLength = params.hopLength;
    this.nFft = params.nFft;

    // Leave some room for extra samples there.
    this.circularBuffer = new CircularAudioBuffer(this.winLengthNative * 2);
    console.log(`Created CircularAudioBuffer.`);
  }

  private async processCompleteBuffer(buffer: Float32Array) {
    this.timer.start();
    //const bufferResampled = await resample(buffer, this.processSampleRate);
    const resampler = new Resampler(sampleRate, this.processSampleRate, 1, buffer);
    resampler.resampler(this.winLengthNative);
    const bufferResampled = resampler.outputBuffer;
    //console.log(`Resampled ${buffer.length} into ${bufferResampled.length} in ${this.timer.elapsed()} s.`);

    this.timer.start();
    const spec = melspec.melSpectrogram(bufferResampled, {
      sampleRate: this.processSampleRate,
    });
    //console.log(`Calculated features in ${this.timer.elapsed()} s.`);

    this.port.postMessage({
      features: spec,
    });
  }

  get winLengthNative() : number {
    // How many samples do we need in the native sample rate?
    return Math.floor(this.winLength * (sampleRate / this.processSampleRate));
  }

  get hopLengthNative() : number {
    // How many samples do we need in the native sample rate?
    return Math.floor(this.hopLength * (sampleRate / this.processSampleRate));
  }
}

class Timer {
  startTime: number;

  start() {
    this.startTime = this.now();
  }

  elapsed() {
    return this.now() - this.startTime;
  }

  private now() {
    return new Date().valueOf() / 1000;
  }
}

registerProcessor('mel-spectrogram-processor', MelSpectrogramProcessor);
