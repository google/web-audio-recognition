import * as tf from '@tensorflow/tfjs';
import * as wav from 'node-wav'
import {FrozenModel} from '@tensorflow/tfjs-converter';
import {spectrogram, melSpectrogram, powerToDb} from '../../audio-features/src/MelSpectrogram';
import {samplesToLength} from '../../audio-features/src/AudioUtils';
import {displayPrediction} from './ui';

const OUTPUT_LABELS = ["silence", "unknown", "yes", "no", "up", "down", "left", "right", "on", "off", "stop", "go"];
const NUM_SAMPLES: number = 16000;

export function forwardPassWav(wavBuffer: ArrayBuffer, promisedModel: Promise<FrozenModel>){
    /**
     * Decodes a selected .wav file, computes its spectrogram and
     * passes it through the speech command network
     */

    const decodedWav = wav.decode(wavBuffer);
    const samples = samplesToLength(decodedWav.channelData[0], NUM_SAMPLES);

    const melSpec = melSpectrogram(samples, {
        sampleRate: 16000,
        hopLength: 192,
        winLength: 512,
        nFft: 512, // This increments when these params are stored as a const 
        nMels: 128,
        power: 2.0,
        fMin: 30.0,}
    );

    // Convert Float32Array[] to number[][] and swap dims and transpose
    // TODO: return appropriate number[][] in MelSpectrogram.ts code intead of processing here
    const mels = melSpec[0].length;
    const times = melSpec.length;
    let arrMelSpec: number[][] = [];
    for (let i=0; i<mels; i++){
        arrMelSpec.push(new Array(times));
    }
    for (let i=0; i<mels; i++){
        for (let j=0; j<times; j++) {
            arrMelSpec[i][j] = melSpec[j][i];
        }
    }

    // Forward pass input through neural network
    const inputTensor = tf.tensor(arrMelSpec, );
    console.log(inputTensor);
    promisedModel.then(function(m) {
        let startTime: any = new Date();
        let prediction: any = m.execute({fingerprint_input: inputTensor});
        prediction = prediction as tf.Tensor;
        prediction = prediction.dataSync();
        let endTime: any = new Date();
        console.log(`Time to predict: ${endTime - startTime}ms`);

        displayPrediction(OUTPUT_LABELS, prediction);
    });
}