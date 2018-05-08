import * as melspec from '../MelSpectrogram';

export class MelFeatureProcessor extends AudioWorkletProcessor {
  bufferLength = 2048;

  constructor() {
    super();
    this._lastUpdate = currentTime;
    this.port.onmessage = this.handleMessage.bind(this);
  }

  handleMessage(event) {
    if (event.data.params) {
      this.configure(event.data.params);
    }
    console.log('[Processor:Received] "' + event.data.message +
      '" (' + event.data.timeStamp + ')');
  }

  process(inputs, outputs, parameters) {
    // Post a message to the node for every 1 second.
    if (currentTime - this._lastUpdate > 1.0) {
      this.port.postMessage({
        message: 'Process is called.',
        timeStamp: currentTime,
      });
      this._lastUpdate = currentTime;
    }
    const input = inputs[0];
    const channel = input[0];
    const spec = melspec.melSpectrogram(channel, {
      sampleRate: 44100,
    });

    return true;
  }

  private configure(params) {
    console.log(`Received configuration params: ${params}.`);
    this.bufferLength = params.bufferLength;
  }
}

registerProcessor('mel-feature-processor', MelFeatureProcessor);
