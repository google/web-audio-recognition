import * as melspec from '../MelSpectrogram';

export class MelFeatureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._lastUpdate = currentTime;
    this.port.onmessage = this.handleMessage.bind(this);
  }

  handleMessage(event) {
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
    console.log(inputs);
    const input = inputs[0];
    const channel = input[0];
    const spec = melspec.melSpectrogram(channel, {
      sampleRate: 44100,
    });
    console.log(spec[0][0]);

    return true;
  }
}

registerProcessor('mel-feature-processor', MelFeatureProcessor);
