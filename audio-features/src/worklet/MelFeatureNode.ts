/**
 * MelFeatureNode
 */
export class MelFeatureNode extends AudioWorkletNode {
  counter: number;

  constructor(context, params) {
    super(context, 'mel-feature-processor');
    this.counter = 0;
    this.port.onmessage = this.handleMessage.bind(this);
    this.port.postMessage({params});
    this.port.postMessage({
      message: 'Are you ready?',
      timeStamp: this.context.currentTime
    });
  }
  handleMessage(event) {
    this.counter++;
    console.log('[Node:Received] "' + event.data.message +
      '" (' + event.data.timeStamp + ')');

    // Notify the processor when the node gets 10 messages. Then reset the
    // counter.
    if (this.counter > 10) {
      this.port.postMessage({
        message: '10 messages!',
        timeStamp: this.context.currentTime
      });
      this.counter = 0;
    }
  }
}

