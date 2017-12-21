export default class AudioUtils {
    static loadExampleBuffer(): Promise<{}>;
    static loadSineBuffer(): Promise<{}>;
    static loadBuffer(url: string): Promise<{}>;
    static loadBufferOffline(url: string): Promise<AudioBuffer>;
    /**
     * Calculates the FFT for an array buffer. Output is an array.
     */
    static fft(y: Float32Array): any;
    static dct(y: Float32Array): any;
    /**
     * Calculates the STFT, given a fft size, and a hop size. For example, if fft
     * size is 2048 and hop size is 1024, there will be 50% overlap. Given those
     * params, if the input sample has 4096 values, there would be 3 analysis
     * frames: [0, 2048], [1024, 3072], [2048, 4096].
     */
    static stft(y: Float32Array, fftSize?: number, hopSize?: number): Float32Array[];
    /**
     * Given STFT energies, calculates the mel spectrogram.
     */
    static melSpectrogram(stftEnergies: Float32Array[], melCount?: number, lowHz?: number, highHz?: number, sr?: number): any[];
    /**
     * Given STFT energies, calculates the MFCC spectrogram.
     */
    static mfccSpectrogram(stftEnergies: Float32Array[], melCount?: number): any[];
    static lazyCreateMelFilterbank(length: number, melCount?: number, lowHz?: number, highHz?: number, sr?: number): void;
    /**
     * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
     * calculates the magnitudes. Output is half the size.
     */
    static fftMags(y: Float32Array): Float32Array;
    /**
     * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
     * calculates the energies. Output is half the size.
     */
    static fftEnergies(y: Float32Array): Float32Array;
    /**
     * Generates a Hann window of a given length.
     */
    static hannWindow(length: number): Float32Array;
    /**
     * Applies a window to a buffer (point-wise multiplication).
     */
    static applyWindow(buffer: any, win: any): Float32Array;
    static pointWiseMultiply(out: Float32Array, array1: Float32Array, array2: Float32Array): Float32Array;
    static createMelFilterbank(fftSize: any, melCount?: number, lowHz?: number, highHz?: number, sr?: number): any[];
    /**
     * Given an array of FFT magnitudes, apply a filterbank. Output should be an
     * array with size |filterbank|.
     */
    static applyFilterbank(fftEnergies: Float32Array, filterbank: Float32Array[]): Float32Array;
    static hzToMel(hz: any): number;
    static melToHz(mel: any): number;
    static freqToBin(freq: any, fftSize: any, sr?: number): number;
    /**
     * Creates a triangular window.
     */
    static triangleWindow(length: any, startIndex: any, peakIndex: any, endIndex: any): Float32Array;
    static cepstrumFromEnergySpectrum(melEnergies: Float32Array): any;
    /**
     * Calculate MFC coefficients from FFT energies.
     */
    static mfcc(fftEnergies: Float32Array, melCount?: number, lowHz?: number, highHz?: number, sr?: number): any;
    static normalizeSpecInPlace(spec: any, normMin?: number, normMax?: number): void;
    static playbackArrayBuffer(buffer: Float32Array, sampleRate?: number): void;
}
