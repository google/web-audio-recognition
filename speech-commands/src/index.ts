import {loadFrozenModel, FrozenModel} from '@tensorflow/tfjs-converter';
import {forwardPassWav} from './model';

const HOSTNAME = 'http://localhost:8000/';
const MODEL_NAME = 'model2';
const MODEL_URL = HOSTNAME + 'models/' + MODEL_NAME + '/tensorflowjs_model.pb';
const WEIGHTS_URL = HOSTNAME + 'models/' + MODEL_NAME + '/weights_manifest.json';
const ASSET_PATH = HOSTNAME + 'assets/left0.wav';

function forwardPassSelectedFile(e: any, promisedModel: Promise<FrozenModel>) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }

    var fileReader = new FileReader();
    fileReader.onload = function(e: any) {
        const arrayBuffer = e.target.result;
        forwardPassWav(arrayBuffer, promisedModel);
    };

    fileReader.readAsArrayBuffer(file);
}

const fileInput: HTMLElement = document.getElementById('file-input');
const model = loadFrozenModel(MODEL_URL, WEIGHTS_URL);
window.onload = function (){
    document.getElementById('file-input').addEventListener(
        'change', 
        function(e){forwardPassSelectedFile(e, model)}, 
        false);
};
