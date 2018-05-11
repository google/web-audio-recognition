import {SpecParams} from '../MelSpectrogram';
import {EventEmitter} from 'eventemitter3';

/**
 * MelSpectrogramNode.
 */
export class MelSpectrogramNode extends AudioWorkletNode {

  emitter = new EventEmitter();

  constructor(context, config: SpecParams) {
    super(context, 'mel-spectrogram-processor');
    // Listen to messages from the MelSpectrogramProcessor.
    this.port.onmessage = this.handleMessage.bind(this);

    // Send configuration parameters to the MelSpectrogramProcessor.
    this.port.postMessage({config});
  }

  handleMessage(event) {
    if (event.data.features) {
      const spec = event.data.features;
      console.log(`Mel spec of size ${spec.length} x ${spec[0].length}.`);

      this.emitter.emit('spectrogram', spec);
    }
  }
}

