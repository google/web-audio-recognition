# Speech Commands
`speech-commands` uses a tensorflow model to recognize vocal commands as seen in [this tensorflow example](https://www.tensorflow.org/tutorials/sequences/audio_recognition), except all computations are done entirely in the browser. The model is trained in Python, then converted for use with Tensorflow.js using the [tfjs-converter tool](https://github.com/tensorflow/tfjs-converter). The converter tool does not support conversion of audio processing tensors, so we use librosa spectrogram features to train the model in Python, then create equivalent features using our `../audio-features` library when using the converted model in javascript.

## Running
Run `./setup.sh` to build and install modules (there will be some errors), then spawn a server with `python2 -m SimpleHTTPServer` and open the browser to the server location (`localhost:8000`).

## Training and converting a model
### Train
In the `train/` directory, you can find a modified version of [the tensorflow speech commands example](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/examples/speech_commands), where the audio processing nodes are cut out of the graph and replaced with external (librosa) audio processing commands. Our best model was trained with

    python train.py --model_architecture=low_latency_conv --how_many_training_steps=26000,10000 --learning_rate=0.01,0.001 --dct_coefficient_count=128

where detailed information about the model and parameters could be found in [tensorflow's documentation](https://www.tensorflow.org/tutorials/sequences/audio_recognition) for this model.

### Freeze
Once the model is trained, it must be frozen which can be done with `freeze.py`. Watch out to supply the same command-line arguments to `freeze.py` as you do to `train.py`, as well as the appropriate sample rate.

    python freeze.py --start_checkpoint=trained_models/low_latency_conv.ckpt-35600 --output_file=frozen_models/model.pb

### Convert
Finally, to get the tfjs-compatible model, use the [tfjs-converter tool](https://github.com/tensorflow/tfjs-converter) on the frozen model

    tensorflowjs_converter --input_format=tf_frozen_model --output_node_names=labels_softmax frozen_models/model.pb ../models/models2

All the parameters here should be the same as above except for the input name (second last parameter), if it is different, and the output name (the last parameter), however, `speech-commands` reads `models/model2` by default.
