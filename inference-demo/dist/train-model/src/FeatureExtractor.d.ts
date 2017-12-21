import { Array3D, NDArray } from 'deeplearn';
export declare const BUFFER_LENGTH = 1024;
export declare const HOP_LENGTH = 512;
export declare const MEL_COUNT = 20;
export declare const EXAMPLE_SR = 16000;
export declare const DURATION = 1;
export declare const IS_MFCC_ENABLED: boolean;
/**
 * Goes from filename or audio sample buffer to input features.
 */
export default class FeatureExtractor {
    static bufferToFeature(buffer: Float32Array, isMfccEnabled?: boolean): Array3D<"float32" | "int32" | "bool">;
    static featureToSpectrogram(feature: NDArray): Float32Array[];
    static getFeatureShape(): number[];
    private static pcmToMelSpectrogram(buffer, isMfccEnabled);
    static melSpectrogramToInput(spec: Float32Array[]): Array3D;
    private static zeroPadIfNeeded(buffer, targetLength);
    private static normalizeInPlace(buffer, normMin?, normMax?);
}
