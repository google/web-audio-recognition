/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function shuffle(array) {
    var counter = array.length;
    var temp = 0;
    var index = 0;
    while (counter > 0) {
        index = (Math.random() * counter) | 0;
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
}
exports.shuffle = shuffle;
function clamp(min, x, max) {
    return Math.max(min, Math.min(x, max));
}
exports.clamp = clamp;
function randUniform(a, b) {
    return Math.random() * (b - a) + a;
}
exports.randUniform = randUniform;
function randGauss(mean, stdDev, truncated) {
    if (mean === void 0) { mean = 0; }
    if (stdDev === void 0) { stdDev = 1; }
    if (truncated === void 0) { truncated = false; }
    var v1, v2, s;
    do {
        v1 = 2 * Math.random() - 1;
        v2 = 2 * Math.random() - 1;
        s = v1 * v1 + v2 * v2;
    } while (s > 1);
    var result = Math.sqrt(-2 * Math.log(s) / s) * v1;
    if (truncated && Math.abs(result) > 2) {
        return randGauss(mean, stdDev, true);
    }
    return mean + stdDev * result;
}
exports.randGauss = randGauss;
function distSquared(a, b) {
    var result = 0;
    for (var i = 0; i < a.length; i++) {
        var diff = Number(a[i]) - Number(b[i]);
        result += diff * diff;
    }
    return result;
}
exports.distSquared = distSquared;
function assert(expr, msg) {
    if (!expr) {
        throw new Error(msg);
    }
}
exports.assert = assert;
function assertShapesMatch(shapeA, shapeB, errorMessagePrefix) {
    if (errorMessagePrefix === void 0) { errorMessagePrefix = ''; }
    assert(arraysEqual(shapeA, shapeB), errorMessagePrefix + ("Shapes " + shapeA + " and " + shapeB + " must match"));
}
exports.assertShapesMatch = assertShapesMatch;
function flatten(arr, ret) {
    if (ret === void 0) { ret = []; }
    if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; ++i) {
            flatten(arr[i], ret);
        }
    }
    else {
        ret.push(arr);
    }
    return ret;
}
exports.flatten = flatten;
function inferShape(arr) {
    var shape = [];
    while (arr instanceof Array) {
        shape.push(arr.length);
        arr = arr[0];
    }
    return shape;
}
exports.inferShape = inferShape;
function sizeFromShape(shape) {
    if (shape.length === 0) {
        return 1;
    }
    var size = shape[0];
    for (var i = 1; i < shape.length; i++) {
        size *= shape[i];
    }
    return size;
}
exports.sizeFromShape = sizeFromShape;
function isScalarShape(shape) {
    return shape.length === 0;
}
exports.isScalarShape = isScalarShape;
function arraysEqual(n1, n2) {
    if (n1.length !== n2.length) {
        return false;
    }
    for (var i = 0; i < n1.length; i++) {
        if (n1[i] !== n2[i]) {
            return false;
        }
    }
    return true;
}
exports.arraysEqual = arraysEqual;
function isInt(a) {
    return a % 1 === 0;
}
exports.isInt = isInt;
function tanh(x) {
    if (Math.tanh != null) {
        return Math.tanh(x);
    }
    if (x === Infinity) {
        return 1;
    }
    else if (x === -Infinity) {
        return -1;
    }
    else {
        var e2x = Math.exp(2 * x);
        return (e2x - 1) / (e2x + 1);
    }
}
exports.tanh = tanh;
function sizeToSquarishShape(size) {
    for (var a = Math.floor(Math.sqrt(size)); a > 1; --a) {
        if (size % a === 0) {
            return [a, size / a];
        }
    }
    return [1, size];
}
exports.sizeToSquarishShape = sizeToSquarishShape;
function createShuffledIndices(n) {
    var shuffledIndices = new Uint32Array(n);
    for (var i = 0; i < n; ++i) {
        shuffledIndices[i] = i;
    }
    shuffle(shuffledIndices);
    return shuffledIndices;
}
exports.createShuffledIndices = createShuffledIndices;
function rightPad(a, size) {
    if (size <= a.length) {
        return a;
    }
    return a + ' '.repeat(size - a.length);
}
exports.rightPad = rightPad;
function repeatedTry(checkFn, delayFn, maxCounter) {
    if (delayFn === void 0) { delayFn = function (counter) { return 0; }; }
    return new Promise(function (resolve, reject) {
        var tryCount = 0;
        var tryFn = function () {
            if (checkFn()) {
                resolve();
                return;
            }
            tryCount++;
            var nextBackoff = delayFn(tryCount);
            if (maxCounter != null && tryCount >= maxCounter) {
                reject();
                return;
            }
            setTimeout(tryFn, nextBackoff);
        };
        setTimeout(tryFn, 0);
    });
}
exports.repeatedTry = repeatedTry;
function getQueryParams(queryString) {
    var params = {};
    queryString.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g, function (s) {
        var t = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            t[_i - 1] = arguments[_i];
        }
        decodeParam(params, t[0], t[1]);
        return t.join('=');
    });
    return params;
}
exports.getQueryParams = getQueryParams;
function decodeParam(params, name, value) {
    params[decodeURIComponent(name)] = decodeURIComponent(value || '');
}
function inferFromImplicitShape(shape, size) {
    var shapeProd = 1;
    var implicitIdx = -1;
    for (var i = 0; i < shape.length; ++i) {
        if (shape[i] > 0) {
            shapeProd *= shape[i];
        }
        else if (shape[i] === -1) {
            if (implicitIdx !== -1) {
                throw Error("Shapes can only have 1 implicit size. " +
                    ("Found -1 at dim " + implicitIdx + " and dim " + i));
            }
            implicitIdx = i;
        }
        else if (shape[i] <= 0) {
            throw Error("Shapes can not be <= 0. Found " + shape[i] + " at dim " + i);
        }
    }
    if (implicitIdx === -1) {
        if (size > 0 && size !== shapeProd) {
            throw Error("Size (" + size + ") must match the product of shape " + shape);
        }
        return shape;
    }
    if (size % shapeProd !== 0) {
        throw Error("The implicit shape can't be a fractional number. " +
            ("Got " + size + " / " + shapeProd));
    }
    var newShape = shape.slice();
    newShape[implicitIdx] = size / shapeProd;
    return newShape;
}
exports.inferFromImplicitShape = inferFromImplicitShape;
exports.NAN_INT32 = 1 << 31;
exports.NAN_BOOL = 255;
exports.NAN_FLOAT32 = NaN;
function getNaN(dtype) {
    if (dtype === 'float32') {
        return exports.NAN_FLOAT32;
    }
    else if (dtype === 'int32') {
        return exports.NAN_INT32;
    }
    else if (dtype === 'bool') {
        return exports.NAN_BOOL;
    }
    else {
        throw new Error("Unknown dtype " + dtype);
    }
}
exports.getNaN = getNaN;
function isValNaN(val, dtype) {
    if (dtype === 'float32') {
        return isNaN(val);
    }
    else if (dtype === 'int32') {
        return val === exports.NAN_INT32;
    }
    else if (dtype === 'bool') {
        return val === exports.NAN_BOOL;
    }
    else {
        throw new Error("Unknown dtype " + dtype);
    }
}
exports.isValNaN = isValNaN;
function squeezeShape(shape) {
    var newShape = [];
    var keptDims = [];
    for (var i = 0; i < shape.length; ++i) {
        if (shape[i] > 1) {
            newShape.push(shape[i]);
            keptDims.push(i);
        }
    }
    return { newShape: newShape, keptDims: keptDims };
}
exports.squeezeShape = squeezeShape;
//# sourceMappingURL=util.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(5);
var util = __webpack_require__(0);
var tex_util_1 = __webpack_require__(17);
var webgl_util = __webpack_require__(10);
exports.GPGPU = null;
exports.TEXTURE_MANAGER = null;
var DType;
(function (DType) {
    DType["float32"] = "float32";
    DType["int32"] = "int32";
    DType["bool"] = "bool";
})(DType = exports.DType || (exports.DType = {}));
function initializeGPU(gpgpu, textureManager) {
    exports.GPGPU = gpgpu;
    exports.TEXTURE_MANAGER = textureManager;
}
exports.initializeGPU = initializeGPU;
function throwIfGPUNotInitialized() {
    if (exports.GPGPU == null || exports.TEXTURE_MANAGER == null) {
        throw new Error('GPU not intialized.');
    }
}
var NDArray = (function () {
    function NDArray(shape, data, dtype) {
        util.assert(data.values != null || data.texture != null, 'Either `values` or `texture` must be defined');
        util.assert(data.texture == null || (data.textureShapeRC != null), '`textureShape` must be defined when `texture` is defined');
        this.size = util.sizeFromShape(shape);
        if (data.values != null) {
            util.assert(this.size === data.values.length, "Constructing ndarray of shape (" + this.size + ") should match the " +
                ("length of values (" + data.values.length + ")"));
        }
        this.shape = shape;
        if (data.textureType == null) {
            data.textureType = tex_util_1.TextureType.DEFAULT;
        }
        this.ndarrayData = data;
        this.dtype = dtype || 'float32';
        var dim = this.shape.length;
        if (dim < 2) {
            this.strides = [];
        }
        else {
            this.strides = new Array(dim - 1);
            this.strides[dim - 2] = this.shape[dim - 1];
            for (var i = dim - 3; i >= 0; --i) {
                this.strides[i] = this.strides[i + 1] * this.shape[i + 1];
            }
        }
    }
    NDArray.zeros = function (shape, dtype) {
        var values = makeZerosTypedArray(util.sizeFromShape(shape), dtype);
        return NDArray.make(shape, { values: values }, dtype);
    };
    NDArray.zerosLike = function (another) {
        return NDArray.zeros(another.shape, another.dtype);
    };
    NDArray.like = function (another) {
        var newValues = copyTypedArray(another.getValues(), another.dtype);
        return NDArray.make(another.shape, { values: newValues }, another.dtype);
    };
    NDArray.make = function (shape, data, dtype) {
        if (data.isDisposed) {
            throw new Error("Cannot make new NDArray from disposed NDArrayData.");
        }
        switch (shape.length) {
            case 0:
                return new Scalar(data, dtype);
            case 1:
                return new Array1D(data, dtype);
            case 2:
                return new Array2D(shape, data, dtype);
            case 3:
                return new Array3D(shape, data, dtype);
            case 4:
                return new Array4D(shape, data, dtype);
            default:
                return new NDArray(shape, data, dtype);
        }
    };
    NDArray.fromPixels = function (pixels, numChannels) {
        if (numChannels === void 0) { numChannels = 3; }
        if (numChannels > 4) {
            throw new Error('Cannot construct NDArray with more than 4 channels from pixels.');
        }
        var shape = [pixels.height, pixels.width, numChannels];
        var textureShapeRC = [shape[0], shape[1]];
        var texture = exports.TEXTURE_MANAGER.acquireTexture(textureShapeRC);
        var textureType = tex_util_1.TextureType.RGBA_COLOR;
        exports.GPGPU.uploadPixelDataToTexture(texture, pixels);
        return Array3D.make(shape, { texture: texture, textureShapeRC: textureShapeRC, textureType: textureType });
    };
    NDArray.prototype.reshape = function (newShape) {
        this.throwIfDisposed();
        newShape = util.inferFromImplicitShape(newShape, this.size);
        if (util.arraysEqual(this.shape, newShape)) {
            return this;
        }
        util.assert(this.size === util.sizeFromShape(newShape), 'new shape and old shape must have the same number of elements.');
        return NDArray.make(newShape, this.ndarrayData, this.dtype);
    };
    NDArray.prototype.flatten = function () {
        if (this instanceof Array1D) {
            return this;
        }
        return this.as1D();
    };
    NDArray.prototype.asScalar = function () {
        util.assert(this.size === 1, 'The array must have only 1 element.');
        return this.reshape([]);
    };
    NDArray.prototype.as1D = function () {
        return this.reshape([this.size]);
    };
    NDArray.prototype.as2D = function (rows, columns) {
        return this.reshape([rows, columns]);
    };
    NDArray.prototype.as3D = function (rows, columns, depth) {
        return this.reshape([rows, columns, depth]);
    };
    NDArray.prototype.as4D = function (rows, columns, depth, depth2) {
        return this.reshape([rows, columns, depth, depth2]);
    };
    NDArray.prototype.asType = function (dtype) {
        this.throwIfDisposed();
        var newData = this.getData();
        if (newData.values != null) {
            newData = { values: toTypedArray(newData.values, dtype) };
        }
        return NDArray.make(this.shape, newData, dtype);
    };
    Object.defineProperty(NDArray.prototype, "rank", {
        get: function () {
            this.throwIfDisposed();
            return this.shape.length;
        },
        enumerable: true,
        configurable: true
    });
    NDArray.prototype.get = function () {
        var locs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            locs[_i] = arguments[_i];
        }
        this.throwIfDisposed();
        var index = locs[locs.length - 1];
        for (var i = 0; i < locs.length - 1; ++i) {
            index += this.strides[i] * locs[i];
        }
        return this.getValues()[index];
    };
    NDArray.prototype.add = function (value) {
        var locs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            locs[_i - 1] = arguments[_i];
        }
        this.throwIfDisposed();
        this.set.apply(this, [this.get.apply(this, locs) + value].concat(locs));
    };
    NDArray.prototype.set = function (value) {
        var locs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            locs[_i - 1] = arguments[_i];
        }
        this.throwIfDisposed();
        var index = locs[locs.length - 1];
        for (var i = 0; i < locs.length - 1; ++i) {
            index += this.strides[i] * locs[i];
        }
        this.getValues()[index] = value;
    };
    NDArray.prototype.val = function () {
        var locs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            locs[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfDisposed();
                        return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get.apply(this, locs)];
                }
            });
        });
    };
    NDArray.prototype.locToIndex = function (locs) {
        var index = locs[locs.length - 1];
        for (var i = 0; i < locs.length - 1; ++i) {
            index += this.strides[i] * locs[i];
        }
        return index;
    };
    NDArray.prototype.indexToLoc = function (index) {
        var locs = new Array(this.shape.length);
        for (var i = 0; i < locs.length - 1; ++i) {
            locs[i] = Math.floor(index / this.strides[i]);
            index -= locs[i] * this.strides[i];
        }
        locs[locs.length - 1] = index;
        return locs;
    };
    NDArray.prototype.fill = function (value) {
        this.throwIfDisposed();
        this.getValues().fill(value);
    };
    NDArray.prototype.getData = function () {
        return this.ndarrayData;
    };
    NDArray.prototype.getValues = function () {
        return this.dataSync();
    };
    NDArray.prototype.getValuesAsync = function () {
        return this.data();
    };
    NDArray.prototype.data = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, queryFn;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.throwIfDisposed();
                        if (this.ndarrayData.values != null) {
                            return [2, this.ndarrayData.values];
                        }
                        if (!(environment_1.ENV.get('WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED') &&
                            this.ndarrayData.textureType === tex_util_1.TextureType.DEFAULT)) return [3, 2];
                        _a = this.ndarrayData;
                        return [4, exports.GPGPU.downloadMatrixFromTextureAsync(this.ndarrayData.texture, this.ndarrayData.textureShapeRC[0], this.ndarrayData.textureShapeRC[1])];
                    case 1:
                        _a.values = _b.sent();
                        return [2, this.ndarrayData.values];
                    case 2:
                        if (!!environment_1.ENV.get('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED')) return [3, 4];
                        return [4, this.dataSync()];
                    case 3: return [2, _b.sent()];
                    case 4:
                        queryFn = function () { };
                        return [4, exports.GPGPU.runQuery(queryFn)];
                    case 5:
                        _b.sent();
                        return [2, this.dataSync()];
                }
            });
        });
    };
    NDArray.prototype.dataSync = function () {
        this.throwIfDisposed();
        if (this.ndarrayData.values == null) {
            throwIfGPUNotInitialized();
            var values = void 0;
            if (this.ndarrayData.textureType === tex_util_1.TextureType.DEFAULT) {
                values = exports.GPGPU.downloadMatrixFromTexture(this.ndarrayData.texture, this.ndarrayData.textureShapeRC[0], this.ndarrayData.textureShapeRC[1]);
            }
            else {
                values = exports.GPGPU.downloadMatrixFromRGBAColorTexture(this.ndarrayData.texture, this.ndarrayData.textureShapeRC[0], this.ndarrayData.textureShapeRC[1], this.shape[2]);
            }
            this.ndarrayData.values = float32ToTypedArray(values, this.dtype);
            this.disposeTexture();
        }
        return this.ndarrayData.values;
    };
    NDArray.prototype.uploadToGPU = function () {
        throwIfGPUNotInitialized();
        this.throwIfDisposed();
        this.ndarrayData.textureShapeRC =
            webgl_util.getTextureShapeFromLogicalShape(exports.GPGPU.gl, this.shape);
        this.ndarrayData.texture =
            exports.TEXTURE_MANAGER.acquireTexture(this.ndarrayData.textureShapeRC);
        this.ndarrayData.textureType = tex_util_1.TextureType.DEFAULT;
        exports.GPGPU.uploadMatrixToTexture(this.ndarrayData.texture, this.ndarrayData.textureShapeRC[0], this.ndarrayData.textureShapeRC[1], typedArrayToFloat32(this.ndarrayData.values, this.dtype));
        this.ndarrayData.values = null;
    };
    NDArray.prototype.getTexture = function () {
        this.throwIfDisposed();
        if (this.ndarrayData.texture == null) {
            this.uploadToGPU();
        }
        return this.ndarrayData.texture;
    };
    NDArray.prototype.getTextureShapeRC = function () {
        this.throwIfDisposed();
        if (this.ndarrayData.textureShapeRC == null) {
            this.uploadToGPU();
        }
        return this.ndarrayData.textureShapeRC;
    };
    NDArray.prototype.throwIfDisposed = function () {
        if (this.ndarrayData.isDisposed) {
            throw new Error("NDArray is disposed.");
        }
    };
    NDArray.prototype.dispose = function () {
        this.ndarrayData.values = null;
        this.shape = null;
        this.ndarrayData.isDisposed = true;
        if (this.ndarrayData.texture != null) {
            this.disposeTexture();
        }
    };
    NDArray.prototype.disposeTexture = function () {
        throwIfGPUNotInitialized();
        exports.TEXTURE_MANAGER.releaseTexture(this.ndarrayData.texture, this.ndarrayData.textureShapeRC);
        this.ndarrayData.texture = null;
        this.ndarrayData.textureShapeRC = null;
        this.ndarrayData.textureType = null;
    };
    NDArray.prototype.inGPU = function () {
        this.throwIfDisposed();
        return this.ndarrayData.texture != null;
    };
    NDArray.prototype.equals = function (t) {
        this.throwIfDisposed();
        return this.dtype === t.dtype && util.arraysEqual(this.shape, t.shape) &&
            util.arraysEqual(this.getValues(), t.getValues());
    };
    NDArray.rand = function (shape, randFunction) {
        var size = util.sizeFromShape(shape);
        var values = new Float32Array(size);
        for (var i = 0; i < size; i++) {
            values[i] = randFunction();
        }
        return NDArray.make(shape, { values: values });
    };
    NDArray.randNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev); });
    };
    NDArray.randTruncatedNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev, true); });
    };
    NDArray.randUniform = function (shape, a, b) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); });
    };
    return NDArray;
}());
exports.NDArray = NDArray;
var Scalar = (function (_super) {
    __extends(Scalar, _super);
    function Scalar(data, dtype) {
        var _this = this;
        if (data.texture != null) {
            data.textureShapeRC = [1, 1];
        }
        _this = _super.call(this, [], data, dtype) || this;
        return _this;
    }
    Scalar.new = function (value, dtype) {
        var values = [value];
        return new Scalar({ values: toTypedArray(values, dtype) }, dtype);
    };
    Scalar.prototype.get = function () {
        return this.getValues()[0];
    };
    Scalar.prototype.val = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get()];
                }
            });
        });
    };
    Scalar.prototype.set = function (value) {
        this.getValues()[0] = value;
    };
    Scalar.prototype.add = function (value) {
        this.getValues()[0] += value;
    };
    Scalar.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Scalar.prototype.locToIndex = function (loc) {
        return 0;
    };
    Scalar.prototype.indexToLoc = function (index) {
        return [];
    };
    Scalar.ZERO = Scalar.new(0);
    Scalar.ONE = Scalar.new(1);
    Scalar.TWO = Scalar.new(2);
    Scalar.NEG_ONE = Scalar.new(-1);
    return Scalar;
}(NDArray));
exports.Scalar = Scalar;
var Array1D = (function (_super) {
    __extends(Array1D, _super);
    function Array1D(data, dtype) {
        var _this = this;
        var shape = (data.values != null) ?
            [data.values.length] :
            [util.sizeFromShape(data.textureShapeRC)];
        _this = _super.call(this, shape, data, dtype) || this;
        return _this;
    }
    Array1D.new = function (values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            util.assert(inferredShape.length === 1, "Error constructing Array1D. Shape of values " + inferredShape + " is " +
                "not 1 dimensional.");
        }
        return new Array1D({ values: toTypedArray(values, dtype) }, dtype);
    };
    Array1D.prototype.get = function (i) {
        return this.getValues()[i];
    };
    Array1D.prototype.set = function (value, i) {
        this.getValues()[i] = value;
    };
    Array1D.prototype.val = function (i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i)];
                }
            });
        });
    };
    Array1D.prototype.add = function (value, i) {
        this.getValues()[i] += value;
    };
    Array1D.prototype.locToIndex = function (loc) {
        return loc[0];
    };
    Array1D.prototype.indexToLoc = function (index) {
        return [index];
    };
    Array1D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array1D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array1D.randNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev); });
    };
    Array1D.randTruncatedNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev, true); });
    };
    Array1D.randUniform = function (shape, a, b) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); });
    };
    return Array1D;
}(NDArray));
exports.Array1D = Array1D;
var Array2D = (function (_super) {
    __extends(Array2D, _super);
    function Array2D(shape, data, dtype) {
        var _this = this;
        util.assert(shape.length === 2, 'Shape should be of length 2');
        _this = _super.call(this, shape, data, dtype) || this;
        _this.stride0 = _this.strides[0];
        return _this;
    }
    Array2D.new = function (shape, values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            if (inferredShape.length > 1) {
                util.assertShapesMatch(shape, inferredShape, "Error when constructing Array2D. Shape of values " +
                    (inferredShape + " does not match the provided shape ") +
                    (shape + ". "));
            }
        }
        return new Array2D(shape, { values: toTypedArray(values, dtype) }, dtype);
    };
    Array2D.prototype.get = function (i, j) {
        return this.getValues()[this.stride0 * i + j];
    };
    Array2D.prototype.set = function (value, i, j) {
        this.getValues()[this.stride0 * i + j] = value;
    };
    Array2D.prototype.add = function (value, i, j) {
        this.getValues()[this.stride0 * i + j] += value;
    };
    Array2D.prototype.val = function (i, j) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i, j)];
                }
            });
        });
    };
    Array2D.prototype.locToIndex = function (locs) {
        return this.stride0 * locs[0] + locs[1];
    };
    Array2D.prototype.indexToLoc = function (index) {
        return [Math.floor(index / this.stride0), index % this.stride0];
    };
    Array2D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array2D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array2D.randNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev); });
    };
    Array2D.randTruncatedNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev, true); });
    };
    Array2D.randUniform = function (shape, a, b) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); });
    };
    return Array2D;
}(NDArray));
exports.Array2D = Array2D;
var Array3D = (function (_super) {
    __extends(Array3D, _super);
    function Array3D(shape, data, dtype) {
        var _this = this;
        util.assert(shape.length === 3, 'Shape should be of length 3');
        _this = _super.call(this, shape, data, dtype) || this;
        _this.stride0 = _this.strides[0];
        _this.stride1 = _this.strides[1];
        return _this;
    }
    Array3D.new = function (shape, values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            if (inferredShape.length > 1) {
                util.assertShapesMatch(shape, inferredShape, "Error when constructing Array3D. Shape of values " +
                    (inferredShape + " does not match the provided shape ") +
                    (shape + ". "));
            }
        }
        return new Array3D(shape, { values: toTypedArray(values, dtype) }, dtype);
    };
    Array3D.prototype.get = function (i, j, k) {
        return this.getValues()[this.stride0 * i + this.stride1 * j + k];
    };
    Array3D.prototype.set = function (value, i, j, k) {
        this.getValues()[this.stride0 * i + this.stride1 * j + k] = value;
    };
    Array3D.prototype.val = function (i, j, k) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i, j, k)];
                }
            });
        });
    };
    Array3D.prototype.add = function (value, i, j, k) {
        this.getValues()[this.stride0 * i + this.stride1 * j + k] += value;
    };
    Array3D.prototype.locToIndex = function (locs) {
        return this.stride0 * locs[0] + this.stride1 * locs[1] + locs[2];
    };
    Array3D.prototype.indexToLoc = function (index) {
        var i = Math.floor(index / this.stride0);
        index -= i * this.stride0;
        return [i, Math.floor(index / this.stride1), index % this.stride1];
    };
    Array3D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array3D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array3D.randNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev); });
    };
    Array3D.randTruncatedNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev, true); });
    };
    Array3D.randUniform = function (shape, a, b) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); });
    };
    return Array3D;
}(NDArray));
exports.Array3D = Array3D;
var Array4D = (function (_super) {
    __extends(Array4D, _super);
    function Array4D(shape, data, dtype) {
        var _this = this;
        util.assert(shape.length === 4, 'Shape should be of length 4');
        _this = _super.call(this, shape, data, dtype) || this;
        _this.stride0 = _this.strides[0];
        _this.stride1 = _this.strides[1];
        _this.stride2 = _this.strides[2];
        return _this;
    }
    Array4D.new = function (shape, values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            if (inferredShape.length > 1) {
                util.assertShapesMatch(shape, inferredShape, "Error when constructing Array4D. Shape of values " +
                    (inferredShape + " does not match the provided shape ") +
                    (shape + ". "));
            }
        }
        return new Array4D(shape, { values: toTypedArray(values, dtype) }, dtype);
    };
    Array4D.prototype.get = function (i, j, k, l) {
        return this.getValues()[this.stride0 * i + this.stride1 * j + this.stride2 * k + l];
    };
    Array4D.prototype.set = function (value, i, j, k, l) {
        this.getValues()[this.stride0 * i + this.stride1 * j + this.stride2 * k + l] = value;
    };
    Array4D.prototype.val = function (i, j, k, l) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i, j, k, l)];
                }
            });
        });
    };
    Array4D.prototype.add = function (value, i, j, k, l) {
        this.getValues()[this.stride0 * i + this.stride1 * j + this.stride2 * k + l] += value;
    };
    Array4D.prototype.locToIndex = function (locs) {
        return this.stride0 * locs[0] + this.stride1 * locs[1] +
            this.stride2 * locs[2] + locs[3];
    };
    Array4D.prototype.indexToLoc = function (index) {
        var i = Math.floor(index / this.stride0);
        index -= i * this.stride0;
        var j = Math.floor(index / this.stride1);
        index -= j * this.stride1;
        return [i, j, Math.floor(index / this.stride2), index % this.stride2];
    };
    Array4D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array4D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array4D.randNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev); });
    };
    Array4D.randTruncatedNormal = function (shape, mean, stdDev) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        return NDArray.rand(shape, function () { return util.randGauss(mean, stdDev, true); });
    };
    Array4D.randUniform = function (shape, a, b) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); });
    };
    return Array4D;
}(NDArray));
exports.Array4D = Array4D;
function copyTypedArray(array, dtype) {
    if (dtype == null || dtype === 'float32') {
        return new Float32Array(array);
    }
    else if (dtype === 'int32') {
        return new Int32Array(array);
    }
    else if (dtype === 'bool') {
        var bool = new Uint8Array(array.length);
        for (var i = 0; i < bool.length; ++i) {
            var val = array[i];
            if (util.isValNaN(val, 'bool')) {
                bool[i] = util.getNaN('bool');
            }
            else if (val) {
                bool[i] = 1;
            }
        }
        return bool;
    }
    else {
        throw new Error("Unknown data type " + dtype);
    }
}
function instanceofTypedArray(a) {
    return a instanceof Float32Array || a instanceof Int32Array ||
        a instanceof Uint8Array;
}
function noConversionNeeded(a, dtype) {
    return (a instanceof Float32Array && dtype === 'float32') ||
        (a instanceof Int32Array && dtype === 'int32') ||
        (a instanceof Uint8Array && dtype === 'bool');
}
function toTypedArray(a, dtype) {
    if (noConversionNeeded(a, dtype)) {
        return a;
    }
    if (Array.isArray(a)) {
        a = util.flatten(a);
    }
    return copyTypedArray(a, dtype);
}
function makeZerosTypedArray(size, dtype) {
    if (dtype == null || dtype === 'float32') {
        return new Float32Array(size);
    }
    else if (dtype === 'int32') {
        return new Int32Array(size);
    }
    else if (dtype === 'bool') {
        return new Uint8Array(size);
    }
    else {
        throw new Error("Unknown data type " + dtype);
    }
}
function typedArrayToFloat32(a, dtype) {
    if (a instanceof Float32Array) {
        return a;
    }
    else {
        var res = new Float32Array(a.length);
        for (var i = 0; i < res.length; i++) {
            var val = a[i];
            res[i] = util.isValNaN(val, dtype) ? NaN : val;
        }
        return res;
    }
}
function float32ToTypedArray(a, dtype) {
    if (dtype === 'float32') {
        return a;
    }
    else if (dtype === 'int32' || dtype === 'bool') {
        var result = (dtype === 'int32') ? new Int32Array(a.length) :
            new Uint8Array(a.length);
        for (var i = 0; i < result.length; ++i) {
            var val = a[i];
            val = isNaN(val) ? util.getNaN(dtype) : Math.round(val);
            result[i] = val;
        }
        return result;
    }
    else {
        throw new Error("Unknown dtype " + dtype);
    }
}
//# sourceMappingURL=ndarray.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Operation = (function () {
    function Operation() {
    }
    Operation.prototype.disposeTransientArrays = function (inferenceArrays, gradientArrays) { };
    Operation.prototype.dispose = function () { };
    return Operation;
}());
exports.Operation = Operation;
//# sourceMappingURL=op.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = __webpack_require__(13);
var priority_queue = __webpack_require__(27);
var priority_queue_1 = __webpack_require__(27);
function getUnorderedEvaluationSet(nodes, terminatingNodes) {
    var terminatingNodeMap = {};
    var seen = {};
    var set = [];
    var visit = nodes.slice();
    terminatingNodes.forEach(function (node) { return terminatingNodeMap[node.id] = node; });
    var _loop_1 = function () {
        var cur = visit.pop();
        if (seen[cur.id] == null) {
            if (terminatingNodeMap[cur.id] == null) {
                Object.keys(cur.inputs)
                    .map(function (inputName) { return cur.inputs[inputName]; })
                    .forEach(function (input) { return visit.push(input.node); });
            }
            set.push(cur);
            seen[cur.id] = cur;
        }
    };
    while (visit.length !== 0) {
        _loop_1();
    }
    return set;
}
exports.getUnorderedEvaluationSet = getUnorderedEvaluationSet;
function getOrderedEvaluationSet(unorderedEvaluationSet) {
    var set = [];
    var nodeIndices = {};
    var pendingDependencies = {};
    var nodeQueue = new priority_queue_1.PriorityQueue(function (a, b) { return priority_queue.defaultCompare(pendingDependencies[a.id], pendingDependencies[b.id]); }, function (node, newIndex) { return nodeIndices[node.id] = newIndex; });
    unorderedEvaluationSet.forEach(function (node) { return pendingDependencies[node.id] = 0; });
    unorderedEvaluationSet.forEach(function (node) { return Object.keys(node.inputs)
        .map(function (key) { return node.inputs[key]; })
        .forEach(function (input) {
        if (unorderedEvaluationSet.indexOf(input.node) !== -1) {
            pendingDependencies[input.node.id]++;
        }
    }); });
    unorderedEvaluationSet.forEach(function (node) { return nodeQueue.enqueue(node); });
    while (!nodeQueue.empty()) {
        set.unshift(nodeQueue.dequeue());
        Object.keys(set[0].inputs).map(function (key) { return set[0].inputs[key]; }).forEach(function (input) {
            if (unorderedEvaluationSet.indexOf(input.node) === -1) {
                return;
            }
            pendingDependencies[input.node.id]--;
            nodeQueue.update(input.node, nodeIndices[input.node.id]);
        });
    }
    return set;
}
exports.getOrderedEvaluationSet = getOrderedEvaluationSet;
function isInputNode(node) {
    return Object.keys(node.inputs).length === 0;
}
exports.isInputNode = isInputNode;
function shouldBackProp(t) {
    return !(t.node instanceof graph_1.ConstantNode);
}
exports.shouldBackProp = shouldBackProp;
function isPassthroughNode(node, map) {
    var keys = Object.keys(node.inputs);
    for (var i = 0; i < keys.length; i++) {
        var input = node.inputs[keys[i]];
        if (map.get(input, true) === map.get(node.output, true)) {
            return true;
        }
    }
    return false;
}
exports.isPassthroughNode = isPassthroughNode;
//# sourceMappingURL=graph_util.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var device_util = __webpack_require__(54);
var util = __webpack_require__(0);
var Type;
(function (Type) {
    Type[Type["NUMBER"] = 0] = "NUMBER";
    Type[Type["BOOLEAN"] = 1] = "BOOLEAN";
})(Type = exports.Type || (exports.Type = {}));
exports.URL_PROPERTIES = [
    { name: 'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED', type: Type.BOOLEAN },
    { name: 'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE', type: Type.BOOLEAN },
    { name: 'WEBGL_VERSION', type: Type.NUMBER },
    { name: 'WEBGL_FLOAT_TEXTURE_ENABLED', type: Type.BOOLEAN }, {
        name: 'WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED',
        type: Type.BOOLEAN
    }
];
function getWebGLRenderingContext(webGLVersion) {
    if (webGLVersion === 0) {
        throw new Error('Cannot get WebGL rendering context, WebGL is disabled.');
    }
    var tempCanvas = document.createElement('canvas');
    if (webGLVersion === 1) {
        return (tempCanvas.getContext('webgl') ||
            tempCanvas.getContext('experimental-webgl'));
    }
    return tempCanvas.getContext('webgl2');
}
function loseContext(gl) {
    if (gl != null) {
        var loseContextExtension = gl.getExtension('WEBGL_lose_context');
        if (loseContextExtension == null) {
            throw new Error('Extension WEBGL_lose_context not supported on this browser.');
        }
        loseContextExtension.loseContext();
    }
}
function isWebGLVersionEnabled(webGLVersion) {
    var gl = getWebGLRenderingContext(webGLVersion);
    if (gl != null) {
        loseContext(gl);
        return true;
    }
    return false;
}
function isWebGLDisjointQueryTimerEnabled(webGLVersion) {
    var gl = getWebGLRenderingContext(webGLVersion);
    var extensionName = webGLVersion === 1 ? 'EXT_disjoint_timer_query' :
        'EXT_disjoint_timer_query_webgl2';
    var ext = gl.getExtension(extensionName);
    var isExtEnabled = ext != null;
    if (gl != null) {
        loseContext(gl);
    }
    return isExtEnabled;
}
function isFloatTextureReadPixelsEnabled(webGLVersion) {
    if (webGLVersion === 0) {
        return false;
    }
    var gl = getWebGLRenderingContext(webGLVersion);
    if (webGLVersion === 1) {
        if (gl.getExtension('OES_texture_float') == null) {
            return false;
        }
    }
    else {
        if (gl.getExtension('EXT_color_buffer_float') == null) {
            return false;
        }
    }
    var frameBuffer = gl.createFramebuffer();
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var internalFormat = webGLVersion === 2 ? gl.RGBA32F : gl.RGBA;
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 1, 1, 0, gl.RGBA, gl.FLOAT, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    var frameBufferComplete = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE);
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.FLOAT, new Float32Array(4));
    var readPixelsNoError = gl.getError() === gl.NO_ERROR;
    loseContext(gl);
    return frameBufferComplete && readPixelsNoError;
}
function isWebGLGetBufferSubDataAsyncExtensionEnabled(webGLVersion) {
    if (webGLVersion !== 2) {
        return false;
    }
    var gl = getWebGLRenderingContext(webGLVersion);
    var ext = gl.getExtension('WEBGL_get_buffer_sub_data_async');
    var isEnabled = ext != null;
    loseContext(gl);
    return isEnabled;
}
var Environment = (function () {
    function Environment(features) {
        this.features = {};
        if (features != null) {
            this.features = features;
        }
    }
    Environment.prototype.get = function (feature) {
        if (feature in this.features) {
            return this.features[feature];
        }
        this.features[feature] = this.evaluateFeature(feature);
        return this.features[feature];
    };
    Environment.prototype.evaluateFeature = function (feature) {
        if (feature === 'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED') {
            var webGLVersion = this.get('WEBGL_VERSION');
            if (webGLVersion === 0) {
                return false;
            }
            return isWebGLDisjointQueryTimerEnabled(webGLVersion);
        }
        else if (feature === 'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE') {
            return this.get('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED') &&
                !device_util.isMobile();
        }
        else if (feature === 'WEBGL_VERSION') {
            if (isWebGLVersionEnabled(2)) {
                return 2;
            }
            else if (isWebGLVersionEnabled(1)) {
                return 1;
            }
            return 0;
        }
        else if (feature === 'WEBGL_FLOAT_TEXTURE_ENABLED') {
            return isFloatTextureReadPixelsEnabled(this.get('WEBGL_VERSION'));
        }
        else if (feature === 'WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED') {
            return isWebGLGetBufferSubDataAsyncExtensionEnabled(this.get('WEBGL_VERSION'));
        }
        throw new Error("Unknown feature " + feature + ".");
    };
    return Environment;
}());
exports.Environment = Environment;
var DEEPLEARNJS_FLAGS_PREFIX = 'dljsflags';
function getFeaturesFromURL() {
    var features = {};
    if (typeof window === 'undefined') {
        return features;
    }
    var urlParams = util.getQueryParams(window.location.search);
    if (DEEPLEARNJS_FLAGS_PREFIX in urlParams) {
        var urlFlags_1 = {};
        var keyValues = urlParams[DEEPLEARNJS_FLAGS_PREFIX].split(',');
        keyValues.forEach(function (keyValue) {
            var _a = keyValue.split(':'), key = _a[0], value = _a[1];
            urlFlags_1[key] = value;
        });
        exports.URL_PROPERTIES.forEach(function (urlProperty) {
            if (urlProperty.name in urlFlags_1) {
                console.log("Setting feature override from URL " + urlProperty.name + ": " +
                    ("" + urlFlags_1[urlProperty.name]));
                if (urlProperty.type === Type.NUMBER) {
                    features[urlProperty.name] = +urlFlags_1[urlProperty.name];
                }
                else if (urlProperty.type === Type.BOOLEAN) {
                    features[urlProperty.name] = urlFlags_1[urlProperty.name] === 'true';
                }
                else {
                    console.warn("Unknown URL param: " + urlProperty.name + ".");
                }
            }
        });
    }
    return features;
}
exports.ENV = new Environment(getFeaturesFromURL());
function setEnvironment(environment) {
    exports.ENV = environment;
}
exports.setEnvironment = setEnvironment;
//# sourceMappingURL=environment.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TensorArrayMapBase = (function () {
    function TensorArrayMapBase() {
        this.dict = {};
    }
    TensorArrayMapBase.prototype.get = function (tensor, skipChecks) {
        if (skipChecks === void 0) { skipChecks = false; }
        if (!skipChecks && this.dict[tensor.id] === undefined) {
            throw new Error("tensor " + tensor.id + " not in array map.");
        }
        var nda = this.dict[tensor.id];
        if (!skipChecks && nda === null) {
            throw new Error("tensor " + tensor.id + " has null array.");
        }
        return nda;
    };
    TensorArrayMapBase.prototype.delete = function (tensor) {
        delete this.dict[tensor.id];
    };
    TensorArrayMapBase.prototype.nullify = function (tensor) {
        this.dict[tensor.id] = null;
    };
    TensorArrayMapBase.prototype.disposeArray = function (tensor) {
        if (this.dict[tensor.id] === undefined) {
            return;
        }
        var nda = this.dict[tensor.id];
        if (nda === null) {
            return;
        }
        nda.dispose();
        this.dict[tensor.id] = null;
    };
    TensorArrayMapBase.prototype.size = function () {
        return Object.keys(this.dict).length;
    };
    TensorArrayMapBase.prototype.dispose = function () {
        var _this = this;
        Object.keys(this.dict).forEach(function (tensorID) {
            var nda = _this.dict[+tensorID];
            if (nda) {
                nda.dispose();
            }
        });
        this.dict = {};
    };
    TensorArrayMapBase.prototype.hasNullArray = function (tensor) {
        if (this.dict[tensor.id] === undefined) {
            throw new Error("tensor " + tensor.id + " not in array map.");
        }
        return this.dict[tensor.id] === null;
    };
    return TensorArrayMapBase;
}());
exports.TensorArrayMapBase = TensorArrayMapBase;
var TensorArrayMap = (function (_super) {
    __extends(TensorArrayMap, _super);
    function TensorArrayMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TensorArrayMap.prototype.set = function (tensor, array) {
        this.dict[tensor.id] = array;
    };
    return TensorArrayMap;
}(TensorArrayMapBase));
exports.TensorArrayMap = TensorArrayMap;
var SummedTensorArrayMap = (function (_super) {
    __extends(SummedTensorArrayMap, _super);
    function SummedTensorArrayMap(math) {
        var _this = _super.call(this) || this;
        _this.math = math;
        return _this;
    }
    SummedTensorArrayMap.prototype.add = function (tensor, array) {
        if (this.dict[tensor.id] == null) {
            this.dict[tensor.id] = this.math.keep(array);
        }
        else {
            var oldValue = this.get(tensor);
            var newValue = this.math.keep(this.math.addStrict(oldValue, array));
            this.dict[tensor.id] = newValue;
            oldValue.dispose();
        }
    };
    return SummedTensorArrayMap;
}(TensorArrayMapBase));
exports.SummedTensorArrayMap = SummedTensorArrayMap;
//# sourceMappingURL=tensor_array_map.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var session_util = __webpack_require__(29);
var tensor_array_map_1 = __webpack_require__(6);
var Optimizer = (function () {
    function Optimizer(learningRate, specifiedVariableList) {
        this.learningRate = learningRate;
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
        this.one = ndarray_1.Scalar.new(1);
        if (specifiedVariableList != null) {
            this.specifiedVariableNodes = specifiedVariableList;
        }
    }
    Optimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        this.variableNodes = this.specifiedVariableNodes == null ?
            session_util.getVariableNodesFromEvaluationSet(runtime.nodes) :
            this.specifiedVariableNodes;
        if (batchSize !== this.prevBatchSize) {
            if (this.c != null) {
                this.c.dispose();
            }
            this.prevBatchSize = batchSize;
            this.c = ndarray_1.Scalar.new(-this.learningRate / batchSize);
        }
        this.variableNodes.forEach(function (node) { return _this.variableGradients.set(node.output, ndarray_1.NDArray.zeros(node.output.shape)); });
    };
    Optimizer.prototype.afterExample = function (math, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var gradient = gradientArrayMap.get(node.output);
                var accumulatedGradient = _this.variableGradients.get(node.output);
                _this.variableGradients.set(node.output, keep(math.add(gradient, accumulatedGradient)));
                accumulatedGradient.dispose();
            });
        });
    };
    Optimizer.prototype.dispose = function () {
        if (this.c != null) {
            this.c.dispose();
        }
        this.one.dispose();
    };
    return Optimizer;
}());
exports.Optimizer = Optimizer;
//# sourceMappingURL=optimizer.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
function computeDepthwiseConv2DInfo(inShape, filterShape, strides, pad) {
    var filterHeight = filterShape[0], filterWidth = filterShape[1], inChannels = filterShape[2], channelMul = filterShape[3];
    var _a = parseTupleParam(strides), strideHeight = _a[0], strideWidth = _a[1];
    var inHeight = inShape[1];
    var inWidth = inShape[2];
    var batchSize = inShape[0];
    var _b = getPadAndOutInfo(pad, inHeight, inWidth, strideHeight, strideWidth, filterHeight, filterWidth), padInfo = _b.padInfo, outHeight = _b.outHeight, outWidth = _b.outWidth;
    var outChannels = inChannels * channelMul;
    var outShape = [batchSize, outHeight, outWidth, outChannels];
    return {
        inShape: inShape,
        outShape: outShape,
        channelMul: channelMul,
        strideHeight: strideHeight,
        strideWidth: strideWidth,
        filterHeight: filterHeight,
        filterWidth: filterWidth,
        padInfo: padInfo
    };
}
exports.computeDepthwiseConv2DInfo = computeDepthwiseConv2DInfo;
function computeConv2DInfo(inShape, filterHeight, filterWidth, outDepth, strideHeight, strideWidth, pad) {
    var inHeight = inShape[0];
    var inWidth = inShape[1];
    var _a = getPadAndOutInfo(pad, inHeight, inWidth, strideHeight, strideWidth, filterHeight, filterWidth), padInfo = _a.padInfo, outHeight = _a.outHeight, outWidth = _a.outWidth;
    var outShape = [outHeight, outWidth, outDepth];
    return {
        inShape: inShape,
        outShape: outShape,
        padInfo: padInfo,
        strideHeight: strideHeight,
        strideWidth: strideWidth,
        filterHeight: filterHeight,
        filterWidth: filterWidth
    };
}
exports.computeConv2DInfo = computeConv2DInfo;
function computeOutputShape3D(inShape, fieldSize, outDepth, stride, zeroPad) {
    if (zeroPad == null) {
        zeroPad = computeDefaultPad(inShape, fieldSize, stride);
    }
    var inputRows = inShape[0];
    var inputCols = inShape[1];
    var outputRows = (inputRows - fieldSize + 2 * zeroPad) / stride + 1;
    util.assert(util.isInt(outputRows), "The output # of rows (" + outputRows + ") must be an integer. Change the " +
        "stride and/or zero pad parameters");
    var outputCols = (inputCols - fieldSize + 2 * zeroPad) / stride + 1;
    util.assert(util.isInt(outputCols), "The output # of columns (" + outputCols + ") must be an integer. Change " +
        "the stride and/or zero pad parameters");
    return [outputRows, outputCols, outDepth];
}
exports.computeOutputShape3D = computeOutputShape3D;
function computeDefaultPad(inputShape, fieldSize, stride) {
    return Math.floor((inputShape[0] * (stride - 1) - stride + fieldSize) / 2);
}
exports.computeDefaultPad = computeDefaultPad;
function computeWeightsShape4D(inputDepth, outputDepth, filterHeight, filterWidth) {
    return [filterHeight, filterWidth, inputDepth, outputDepth];
}
exports.computeWeightsShape4D = computeWeightsShape4D;
function computeDilatedRC(rc, origStride) {
    var rowsDilated = (rc[0] - 1) * origStride + 1;
    var colsDilated = (rc[1] - 1) * origStride + 1;
    return [rowsDilated, colsDilated];
}
exports.computeDilatedRC = computeDilatedRC;
function parseTupleParam(param) {
    return typeof param === 'number' ? [param, param] : param;
}
function getPadAndOutInfo(pad, inHeight, inWidth, strideHeight, strideWidth, filterHeight, filterWidth) {
    var padInfo;
    var outHeight;
    var outWidth;
    if (typeof pad === 'number') {
        padInfo = { top: pad, bottom: pad, left: pad, right: pad };
        var outShape = computeOutputShape3D([inHeight, inWidth, 1], filterHeight, 1, strideHeight, pad);
        outHeight = outShape[0];
        outWidth = outShape[1];
    }
    else if (pad === 'same') {
        outHeight = Math.ceil(inHeight / strideHeight);
        outWidth = Math.ceil(inWidth / strideWidth);
        var padAlongHeight = (outHeight - 1) * strideHeight + filterHeight - inHeight;
        var padAlongWidth = (outWidth - 1) * strideWidth + filterWidth - inWidth;
        var top_1 = Math.floor(padAlongHeight / 2);
        var bottom = padAlongHeight - top_1;
        var left = Math.floor(padAlongWidth / 2);
        var right = padAlongWidth - left;
        padInfo = { top: top_1, bottom: bottom, left: left, right: right };
    }
    else if (pad === 'valid') {
        padInfo = { top: 0, bottom: 0, left: 0, right: 0 };
        outHeight = Math.ceil((inHeight - filterHeight + 1) / strideHeight);
        outWidth = Math.ceil((inWidth - filterWidth + 1) / strideWidth);
    }
    else {
        throw Error("Unknown padding parameter: " + pad);
    }
    return { padInfo: padInfo, outHeight: outHeight, outWidth: outWidth };
}
//# sourceMappingURL=conv_util.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getBroadcastDims(inShape, outShape) {
    var inRank = inShape.length;
    var dims = [];
    for (var i = 0; i < inRank; i++) {
        var dim = inRank - 1 - i;
        var a = inShape[dim] || 1;
        var b = outShape[outShape.length - 1 - i] || 1;
        if (b > 1 && a === 1) {
            dims.unshift(dim);
        }
    }
    return dims;
}
exports.getBroadcastDims = getBroadcastDims;
function broadcastDimsAreOuter(dims) {
    for (var i = 0; i < dims.length; i++) {
        if (dims[i] !== i) {
            return false;
        }
    }
    return true;
}
exports.broadcastDimsAreOuter = broadcastDimsAreOuter;
function assertAndGetBroadcastShape(shapeA, shapeB) {
    var result = [];
    var errMsg = "Operands could not be broadcast together with shapes " +
        (shapeA + " and " + shapeB + ".");
    var l = Math.max(shapeA.length, shapeB.length);
    for (var i = 0; i < l; i++) {
        var a = shapeA[shapeA.length - i - 1] || 1;
        var b = shapeB[shapeB.length - i - 1] || 1;
        if (a > 1 && b > 1 && a !== b) {
            throw Error(errMsg);
        }
        result.unshift(Math.max(a, b));
    }
    return result;
}
exports.assertAndGetBroadcastShape = assertAndGetBroadcastShape;
//# sourceMappingURL=broadcast_util.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MAX_TEXTURE_SIZE = null;
var util = __webpack_require__(0);
var environment_1 = __webpack_require__(5);
function createWebGLRenderingContext(attributes) {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return createWebGLRenderingContextFromCanvas(canvas, attributes);
}
exports.createWebGLRenderingContext = createWebGLRenderingContext;
function createWebGLRenderingContextFromCanvas(canvas, attributes) {
    var gl;
    var webglVersion = environment_1.ENV.get('WEBGL_VERSION');
    if (webglVersion === 2) {
        gl = canvas.getContext('webgl2', attributes);
    }
    else if (webglVersion === 1) {
        gl = (canvas.getContext('webgl', attributes) ||
            canvas.getContext('experimental-webgl', attributes));
    }
    if (webglVersion === 0 || gl == null) {
        throw new Error('This browser does not support WebGL.');
    }
    return gl;
}
exports.createWebGLRenderingContextFromCanvas = createWebGLRenderingContextFromCanvas;
function callAndCheck(gl, func) {
    var returnValue = func();
    checkWebGLError(gl);
    return returnValue;
}
exports.callAndCheck = callAndCheck;
var webGLDebugErrorCheckingEnabled = false;
function enableDebugWebGLErrorChecking(enabled) {
    webGLDebugErrorCheckingEnabled = enabled;
}
exports.enableDebugWebGLErrorChecking = enableDebugWebGLErrorChecking;
function checkWebGLError(gl) {
    if (webGLDebugErrorCheckingEnabled) {
        var error = gl.getError();
        if (error !== gl.NO_ERROR) {
            throw new Error('WebGL Error: ' + getWebGLErrorMessage(gl, error));
        }
    }
}
exports.checkWebGLError = checkWebGLError;
function getWebGLErrorMessage(gl, status) {
    switch (status) {
        case gl.NO_ERROR:
            return 'NO_ERROR';
        case gl.INVALID_ENUM:
            return 'INVALID_ENUM';
        case gl.INVALID_VALUE:
            return 'INVALID_VALUE';
        case gl.INVALID_OPERATION:
            return 'INVALID_OPERATION';
        case gl.INVALID_FRAMEBUFFER_OPERATION:
            return 'INVALID_FRAMEBUFFER_OPERATION';
        case gl.OUT_OF_MEMORY:
            return 'OUT_OF_MEMORY';
        case gl.CONTEXT_LOST_WEBGL:
            return 'CONTEXT_LOST_WEBGL';
        default:
            return "Unknown error code " + status;
    }
}
exports.getWebGLErrorMessage = getWebGLErrorMessage;
function getExtensionOrThrow(gl, extensionName) {
    return throwIfNull(gl, function () { return gl.getExtension(extensionName); }, 'Extension "' + extensionName + '" not supported on this browser.');
}
exports.getExtensionOrThrow = getExtensionOrThrow;
function createVertexShader(gl, vertexShaderSource) {
    var vertexShader = throwIfNull(gl, function () { return gl.createShader(gl.VERTEX_SHADER); }, 'Unable to create vertex WebGLShader.');
    callAndCheck(gl, function () { return gl.shaderSource(vertexShader, vertexShaderSource); });
    callAndCheck(gl, function () { return gl.compileShader(vertexShader); });
    if (gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) === false) {
        console.log(gl.getShaderInfoLog(vertexShader));
        throw new Error('Failed to compile vertex shader.');
    }
    return vertexShader;
}
exports.createVertexShader = createVertexShader;
function createFragmentShader(gl, fragmentShaderSource) {
    var fragmentShader = throwIfNull(gl, function () { return gl.createShader(gl.FRAGMENT_SHADER); }, 'Unable to create fragment WebGLShader.');
    callAndCheck(gl, function () { return gl.shaderSource(fragmentShader, fragmentShaderSource); });
    callAndCheck(gl, function () { return gl.compileShader(fragmentShader); });
    if (gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) === false) {
        logShaderSourceAndInfoLog(fragmentShaderSource, gl.getShaderInfoLog(fragmentShader));
        throw new Error('Failed to compile fragment shader.');
    }
    return fragmentShader;
}
exports.createFragmentShader = createFragmentShader;
var lineNumberRegex = /ERROR: [0-9]+:([0-9]+):/g;
function logShaderSourceAndInfoLog(shaderSource, shaderInfoLog) {
    var lineNumberRegexResult = lineNumberRegex.exec(shaderInfoLog);
    if (lineNumberRegexResult == null) {
        console.log("Couldn't parse line number in error: " + shaderInfoLog);
        console.log(shaderSource);
        return;
    }
    var lineNumber = +lineNumberRegexResult[1];
    var shaderLines = shaderSource.split('\n');
    var pad = shaderLines.length.toString().length + 2;
    var linesWithLineNumbers = shaderLines.map(function (line, lineNumber) {
        return util.rightPad((lineNumber + 1).toString(), pad) + line;
    });
    var maxLineLength = 0;
    for (var i = 0; i < linesWithLineNumbers.length; i++) {
        maxLineLength = Math.max(linesWithLineNumbers[i].length, maxLineLength);
    }
    var beforeErrorLines = linesWithLineNumbers.slice(0, lineNumber - 1);
    var errorLine = linesWithLineNumbers.slice(lineNumber - 1, lineNumber);
    var afterErrorLines = linesWithLineNumbers.slice(lineNumber);
    console.log(beforeErrorLines.join('\n'));
    console.log(shaderInfoLog.split('\n')[0]);
    console.log("%c " + util.rightPad(errorLine[0], maxLineLength), 'border:1px solid red; background-color:#e3d2d2; color:#a61717');
    console.log(afterErrorLines.join('\n'));
}
function createProgram(gl) {
    return throwIfNull(gl, function () { return gl.createProgram(); }, 'Unable to create WebGLProgram.');
}
exports.createProgram = createProgram;
function linkProgram(gl, program) {
    callAndCheck(gl, function () { return gl.linkProgram(program); });
    if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
        console.log(gl.getProgramInfoLog(program));
        throw new Error('Failed to link vertex and fragment shaders.');
    }
}
exports.linkProgram = linkProgram;
function validateProgram(gl, program) {
    callAndCheck(gl, function () { return gl.validateProgram(program); });
    if (gl.getProgramParameter(program, gl.VALIDATE_STATUS) === false) {
        console.log(gl.getProgramInfoLog(program));
        throw new Error('Shader program validation failed.');
    }
}
exports.validateProgram = validateProgram;
function createStaticVertexBuffer(gl, data) {
    var buffer = throwIfNull(gl, function () { return gl.createBuffer(); }, 'Unable to create WebGLBuffer');
    callAndCheck(gl, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, buffer); });
    callAndCheck(gl, function () { return gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); });
    return buffer;
}
exports.createStaticVertexBuffer = createStaticVertexBuffer;
function createStaticIndexBuffer(gl, data) {
    var buffer = throwIfNull(gl, function () { return gl.createBuffer(); }, 'Unable to create WebGLBuffer');
    callAndCheck(gl, function () { return gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer); });
    callAndCheck(gl, function () { return gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW); });
    return buffer;
}
exports.createStaticIndexBuffer = createStaticIndexBuffer;
function queryMaxTextureSize(gl) {
    if (MAX_TEXTURE_SIZE != null) {
        return MAX_TEXTURE_SIZE;
    }
    MAX_TEXTURE_SIZE =
        callAndCheck(gl, function () { return gl.getParameter(gl.MAX_TEXTURE_SIZE); });
    return MAX_TEXTURE_SIZE;
}
exports.queryMaxTextureSize = queryMaxTextureSize;
function getChannelsPerTexture() {
    if (!environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        return 4;
    }
    if (environment_1.ENV.get('WEBGL_VERSION') === 2) {
        return 1;
    }
    return 4;
}
exports.getChannelsPerTexture = getChannelsPerTexture;
function createTexture(gl) {
    return throwIfNull(gl, function () { return gl.createTexture(); }, 'Unable to create WebGLTexture.');
}
exports.createTexture = createTexture;
function validateTextureSize(gl, width, height) {
    var maxTextureSize = queryMaxTextureSize(gl);
    if ((width <= 0) || (height <= 0)) {
        var requested = "[" + width + "x" + height + "]";
        throw new Error('Requested texture size ' + requested + ' is invalid.');
    }
    if ((width > maxTextureSize) || (height > maxTextureSize)) {
        var requested = "[" + width + "x" + height + "]";
        var max = "[" + maxTextureSize + "x" + maxTextureSize + "]";
        throw new Error('Requested texture size ' + requested +
            ' greater than WebGL maximum on this browser / GPU ' + max + '.');
    }
}
exports.validateTextureSize = validateTextureSize;
function createFramebuffer(gl) {
    return throwIfNull(gl, function () { return gl.createFramebuffer(); }, 'Unable to create WebGLFramebuffer.');
}
exports.createFramebuffer = createFramebuffer;
function bindVertexBufferToProgramAttribute(gl, program, attribute, buffer, arrayEntriesPerItem, itemStrideInBytes, itemOffsetInBytes, attribLocations) {
    var loc = -1;
    if ((attribLocations != null) && (attribute in attribLocations)) {
        loc = attribLocations[attribute];
    }
    else {
        loc = gl.getAttribLocation(program, attribute);
    }
    if (loc === -1) {
        return;
    }
    callAndCheck(gl, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, buffer); });
    callAndCheck(gl, function () { return gl.vertexAttribPointer(loc, arrayEntriesPerItem, gl.FLOAT, false, itemStrideInBytes, itemOffsetInBytes); });
    callAndCheck(gl, function () { return gl.enableVertexAttribArray(loc); });
}
exports.bindVertexBufferToProgramAttribute = bindVertexBufferToProgramAttribute;
function bindTextureUnit(gl, texture, textureUnit) {
    validateTextureUnit(gl, textureUnit);
    callAndCheck(gl, function () { return gl.activeTexture(gl.TEXTURE0 + textureUnit); });
    callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, texture); });
}
exports.bindTextureUnit = bindTextureUnit;
function unbindTextureUnit(gl, textureUnit) {
    validateTextureUnit(gl, textureUnit);
    callAndCheck(gl, function () { return gl.activeTexture(gl.TEXTURE0 + textureUnit); });
    callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
}
exports.unbindTextureUnit = unbindTextureUnit;
function getProgramUniformLocationOrThrow(gl, program, uniformName) {
    return throwIfNull(gl, function () { return gl.getUniformLocation(program, uniformName); }, 'uniform "' + uniformName + '" not present in program.');
}
exports.getProgramUniformLocationOrThrow = getProgramUniformLocationOrThrow;
function bindTextureToProgramUniformSampler(gl, program, texture, uniformSamplerLocation, textureUnit) {
    callAndCheck(gl, function () { return bindTextureUnit(gl, texture, textureUnit); });
    callAndCheck(gl, function () { return gl.uniform1i(uniformSamplerLocation, textureUnit); });
}
exports.bindTextureToProgramUniformSampler = bindTextureToProgramUniformSampler;
function bindCanvasToFramebuffer(gl) {
    callAndCheck(gl, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, null); });
    callAndCheck(gl, function () { return gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); });
    callAndCheck(gl, function () { return gl.scissor(0, 0, gl.canvas.width, gl.canvas.height); });
}
exports.bindCanvasToFramebuffer = bindCanvasToFramebuffer;
function bindColorTextureToFramebuffer(gl, texture, framebuffer) {
    callAndCheck(gl, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); });
    callAndCheck(gl, function () { return gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0); });
}
exports.bindColorTextureToFramebuffer = bindColorTextureToFramebuffer;
function unbindColorTextureFromFramebuffer(gl, framebuffer) {
    callAndCheck(gl, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); });
    callAndCheck(gl, function () { return gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0); });
}
exports.unbindColorTextureFromFramebuffer = unbindColorTextureFromFramebuffer;
function validateFramebuffer(gl) {
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error('Error binding framebuffer: ' + getFramebufferErrorMessage(gl, status));
    }
}
exports.validateFramebuffer = validateFramebuffer;
function getFramebufferErrorMessage(gl, status) {
    switch (status) {
        case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            return 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT';
        case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            return 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT';
        case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            return 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS';
        case gl.FRAMEBUFFER_UNSUPPORTED:
            return 'FRAMEBUFFER_UNSUPPORTED';
        default:
            return "unknown error " + status;
    }
}
exports.getFramebufferErrorMessage = getFramebufferErrorMessage;
function throwIfNull(gl, returnTOrNull, failureMessage) {
    var tOrNull = callAndCheck(gl, function () { return returnTOrNull(); });
    if (tOrNull == null) {
        throw new Error(failureMessage);
    }
    return tOrNull;
}
function validateTextureUnit(gl, textureUnit) {
    var maxTextureUnit = gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1;
    var glTextureUnit = textureUnit + gl.TEXTURE0;
    if (glTextureUnit < gl.TEXTURE0 || glTextureUnit > maxTextureUnit) {
        var textureUnitRange = "[gl.TEXTURE0, gl.TEXTURE" + maxTextureUnit + "]";
        throw new Error("textureUnit must be in " + textureUnitRange + ".");
    }
}
function getTextureShapeFromLogicalShape(gl, logShape) {
    if (logShape.length !== 2) {
        var squeezeResult = util.squeezeShape(logShape);
        logShape = squeezeResult.newShape;
    }
    var maxTexSize = queryMaxTextureSize(gl);
    var size = util.sizeFromShape(logShape);
    if (logShape.length <= 1 && size <= maxTexSize) {
        return [size, 1];
    }
    else if (logShape.length === 2 && logShape[0] <= maxTexSize &&
        logShape[1] <= maxTexSize) {
        return logShape;
    }
    else if (logShape.length === 3 && logShape[0] <= maxTexSize &&
        logShape[1] * logShape[2] <= maxTexSize) {
        return [logShape[0], logShape[1] * logShape[2]];
    }
    else if (logShape.length === 4 && logShape[0] <= maxTexSize &&
        logShape[1] * logShape[2] * logShape[3] <= maxTexSize) {
        return [logShape[0], logShape[1] * logShape[2] * logShape[3]];
    }
    else {
        return util.sizeToSquarishShape(size);
    }
}
exports.getTextureShapeFromLogicalShape = getTextureShapeFromLogicalShape;
//# sourceMappingURL=webgl_util.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var initializers_1 = __webpack_require__(30);
var concat_util = __webpack_require__(14);
var conv_util = __webpack_require__(8);
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var GraphLayers = (function () {
    function GraphLayers(g) {
        this.g = g;
    }
    GraphLayers.prototype.dense = function (name, x, units, activation, useBias, kernelInitializer, biasInitializer) {
        if (activation === void 0) { activation = null; }
        if (useBias === void 0) { useBias = true; }
        if (kernelInitializer === void 0) { kernelInitializer = new initializers_1.VarianceScalingInitializer(); }
        if (biasInitializer === void 0) { biasInitializer = new initializers_1.ZerosInitializer(); }
        var weights = this.g.variable(name + '-weights', kernelInitializer.initialize([x.shape[0], units], x.shape[0], units));
        var out = this.g.matmul(x, weights);
        if (useBias) {
            var bias = this.g.variable(name + '-bias', biasInitializer.initialize([units], x.shape[0], units));
            out = this.g.add(out, bias);
        }
        if (activation != null) {
            out = activation(out);
        }
        return out;
    };
    return GraphLayers;
}());
exports.GraphLayers = GraphLayers;
var Graph = (function () {
    function Graph() {
        this.nodes = [];
        this.layers = new GraphLayers(this);
    }
    Graph.prototype.variable = function (name, data) {
        return this.addNodeAndReturnOutput(new VariableNode(this, name, data));
    };
    Graph.prototype.placeholder = function (name, shape) {
        return this.addNodeAndReturnOutput(new PlaceholderNode(this, name, shape));
    };
    Graph.prototype.constant = function (value) {
        var finalValue;
        if (typeof value === 'number') {
            finalValue = ndarray_1.Scalar.new(value);
        }
        else if (value instanceof ndarray_1.NDArray) {
            finalValue = value;
        }
        else if (value instanceof Array) {
            var flatValues = util.flatten(value);
            var vals = new Float32Array(flatValues);
            finalValue = ndarray_1.NDArray.make(util.inferShape(value), { values: vals });
        }
        else {
            throw new Error('unimplemented constant type.');
        }
        return this.addNodeAndReturnOutput(new ConstantNode(this, finalValue));
    };
    Graph.prototype.reshape = function (x, shape) {
        return this.addNodeAndReturnOutput(new ReshapeNode(this, 'Reshape', x, shape));
    };
    Graph.prototype.fusedLinearCombination = function (x1, x2, c1, c2) {
        return this.addNodeAndReturnOutput(new FusedLinearCombinationNode(this, x1, x2, c1, c2));
    };
    Graph.prototype.add = function (x1, x2) {
        return this.addNodeAndReturnOutput(new AddNode(this, x1, x2));
    };
    Graph.prototype.subtract = function (x1, x2) {
        return this.addNodeAndReturnOutput(new SubtractNode(this, x1, x2));
    };
    Graph.prototype.multiply = function (x1, x2) {
        return this.addNodeAndReturnOutput(new MultiplyNode(this, x1, x2));
    };
    Graph.prototype.divide = function (x1, x2) {
        return this.addNodeAndReturnOutput(new DivideNode(this, x1, x2));
    };
    Graph.prototype.reduceSum = function (x) {
        return this.addNodeAndReturnOutput(new ReduceSumNode(this, x));
    };
    Graph.prototype.concat3d = function (x1, x2, axis) {
        return this.addNodeAndReturnOutput(new Concat3DNode(this, x1, x2, axis));
    };
    Graph.prototype.matmul = function (x1, x2) {
        return this.addNodeAndReturnOutput(new MatMulNode(this, x1, x2));
    };
    Graph.prototype.conv2d = function (x, w, b, fieldSize, outputDepth, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        return this.addNodeAndReturnOutput(new Convolution2DNode(this, x, w, b, fieldSize, outputDepth, stride, zeroPad));
    };
    Graph.prototype.maxPool = function (x, fieldSize, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        return this.addNodeAndReturnOutput(new MaxPoolNode(this, x, fieldSize, stride, zeroPad));
    };
    Graph.prototype.exp = function (x) {
        return this.addNodeAndReturnOutput(new ExpNode(this, x));
    };
    Graph.prototype.log = function (x) {
        return this.addNodeAndReturnOutput(new LogNode(this, x));
    };
    Graph.prototype.relu = function (x) {
        return this.addNodeAndReturnOutput(new ReLUNode(this, x));
    };
    Graph.prototype.leakyRelu = function (x, alpha) {
        return this.addNodeAndReturnOutput(new LeakyReLUNode(this, x, alpha));
    };
    Graph.prototype.tanh = function (x) {
        return this.addNodeAndReturnOutput(new TanHNode(this, x));
    };
    Graph.prototype.sigmoid = function (x) {
        return this.addNodeAndReturnOutput(new SigmoidNode(this, x));
    };
    Graph.prototype.square = function (x) {
        return this.addNodeAndReturnOutput(new SquareNode(this, x));
    };
    Graph.prototype.softmax = function (x) {
        return this.addNodeAndReturnOutput(new SoftmaxNode(this, x));
    };
    Graph.prototype.softmaxCrossEntropyCost = function (x, target) {
        return this.addNodeAndReturnOutput(new SoftmaxCrossEntropyCostNode(this, x, target));
    };
    Graph.prototype.meanSquaredCost = function (label, prediction) {
        return this.addNodeAndReturnOutput(new MeanSquaredCostNode(this, label, prediction));
    };
    Graph.prototype.argmax = function (x) {
        return this.addNodeAndReturnOutput(new ArgMaxNode(this, x));
    };
    Graph.prototype.argmaxEquals = function (x1, x2) {
        return this.addNodeAndReturnOutput(new ArgMaxEqualsNode(this, x1, x2));
    };
    Graph.prototype.addNodeAndReturnOutput = function (node) {
        this.nodes.push(node);
        node.validate();
        return node.output;
    };
    Graph.prototype.getNodes = function () {
        return this.nodes;
    };
    return Graph;
}());
exports.Graph = Graph;
var Tensor = (function () {
    function Tensor(shape) {
        this.shape = shape;
        this.id = Tensor.nextID++;
    }
    Tensor.nextID = 0;
    return Tensor;
}());
exports.Tensor = Tensor;
var Node = (function () {
    function Node(graph, name, inputs, output) {
        this.graph = graph;
        this.name = name;
        this.inputs = inputs;
        this.output = output;
        this.id = Node.nextID++;
        output.node = this;
    }
    Node.nextID = 0;
    return Node;
}());
exports.Node = Node;
var VariableNode = (function (_super) {
    __extends(VariableNode, _super);
    function VariableNode(graph, name, data) {
        var _this = _super.call(this, graph, name, {}, new Tensor(data.shape)) || this;
        _this.data = data;
        return _this;
    }
    VariableNode.prototype.validate = function () {
        util.assert(this.data != null, 'Error adding variable op: Data for variable \'' + this.name +
            '\' is null or undefined');
    };
    return VariableNode;
}(Node));
exports.VariableNode = VariableNode;
var PlaceholderNode = (function (_super) {
    __extends(PlaceholderNode, _super);
    function PlaceholderNode(graph, name, shape) {
        return _super.call(this, graph, name, {}, new Tensor(shape)) || this;
    }
    PlaceholderNode.prototype.validate = function () { };
    return PlaceholderNode;
}(Node));
exports.PlaceholderNode = PlaceholderNode;
var ConstantNode = (function (_super) {
    __extends(ConstantNode, _super);
    function ConstantNode(graph, data) {
        var _this = _super.call(this, graph, 'Constant', {}, new Tensor(data.shape)) || this;
        _this.data = data;
        return _this;
    }
    ConstantNode.prototype.validate = function () {
        util.assert(this.data != null, 'Error adding constant: data for placeholder \'' + this.name +
            '\' is null or undefined');
    };
    return ConstantNode;
}(Node));
exports.ConstantNode = ConstantNode;
var ReshapeNode = (function (_super) {
    __extends(ReshapeNode, _super);
    function ReshapeNode(graph, name, x, shape) {
        var _this = _super.call(this, graph, name, { x: x }, new Tensor(shape)) || this;
        _this.name = name;
        _this.x = x;
        _this.shape = shape;
        return _this;
    }
    ReshapeNode.prototype.validate = function () {
        var xSize = util.sizeFromShape(this.x.shape);
        var shapeSize = util.sizeFromShape(this.shape);
        util.assert(xSize === shapeSize, "Error making reshape operation: input to reshape '" + this.name + "'" +
            (" of shape (" + this.x.shape + ") does not match size of ") +
            ("requested shape " + this.shape + "."));
    };
    ReshapeNode.X = 'x';
    return ReshapeNode;
}(Node));
exports.ReshapeNode = ReshapeNode;
var FusedLinearCombinationNode = (function (_super) {
    __extends(FusedLinearCombinationNode, _super);
    function FusedLinearCombinationNode(graph, t1, t2, c1, c2) {
        var _this = _super.call(this, graph, 'Linear Combination', { t1: t1, t2: t2, c1: c1, c2: c2 }, new Tensor(t1.shape)) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        _this.c1 = c1;
        _this.c2 = c2;
        return _this;
    }
    FusedLinearCombinationNode.prototype.validate = function () {
        util.assertShapesMatch(this.t1.shape, this.t2.shape);
        if (!util.isScalarShape(this.c1.shape)) {
            throw new Error('Error adding fusedLinearCombination: c1 is not a scalar, got ' +
                ("shape: " + this.c1.shape));
        }
        if (!util.isScalarShape(this.c2.shape)) {
            throw new Error('Error adding fusedLinearCombination: c2 is not a scalar, got ' +
                ("shape: " + this.c2.shape));
        }
    };
    FusedLinearCombinationNode.T1 = 't1';
    FusedLinearCombinationNode.T2 = 't2';
    FusedLinearCombinationNode.C1 = 'c1';
    FusedLinearCombinationNode.C2 = 'c2';
    return FusedLinearCombinationNode;
}(Node));
exports.FusedLinearCombinationNode = FusedLinearCombinationNode;
var AddNode = (function (_super) {
    __extends(AddNode, _super);
    function AddNode(graph, t1, t2) {
        var _this = _super.call(this, graph, 'Add', { t1: t1, t2: t2 }, new Tensor(util.sizeFromShape(t1.shape) === 1 ? t2.shape : t1.shape)) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        return _this;
    }
    AddNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.t1.shape) === 1 ||
            util.sizeFromShape(this.t2.shape) === 1 ||
            util.arraysEqual(this.t1.shape, this.t2.shape), 'Error adding add operation op: one of inputs must be scalar or the ' +
            ("shapes " + this.t1.shape + " and " + this.t2.shape + " must match."));
    };
    AddNode.T1 = 't1';
    AddNode.T2 = 't2';
    return AddNode;
}(Node));
exports.AddNode = AddNode;
var SubtractNode = (function (_super) {
    __extends(SubtractNode, _super);
    function SubtractNode(graph, t1, t2) {
        var _this = _super.call(this, graph, 'Subtract', { t1: t1, t2: t2 }, new Tensor(util.sizeFromShape(t1.shape) === 1 ? t2.shape : t1.shape)) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        return _this;
    }
    SubtractNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.t1.shape) === 1 ||
            util.sizeFromShape(this.t2.shape) === 1 ||
            util.arraysEqual(this.t1.shape, this.t2.shape), 'Error adding subtract op: one of inputs must be scalar or the ' +
            ("shapes " + this.t1.shape + " and " + this.t2.shape + " must match."));
    };
    SubtractNode.T1 = 't1';
    SubtractNode.T2 = 't2';
    return SubtractNode;
}(Node));
exports.SubtractNode = SubtractNode;
var MultiplyNode = (function (_super) {
    __extends(MultiplyNode, _super);
    function MultiplyNode(graph, t1, t2) {
        var _this = _super.call(this, graph, 'Multiply', { t1: t1, t2: t2 }, new Tensor(util.sizeFromShape(t1.shape) === 1 ? t2.shape : t1.shape)) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        return _this;
    }
    MultiplyNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.t1.shape) === 1 ||
            util.sizeFromShape(this.t2.shape) === 1 ||
            util.arraysEqual(this.t1.shape, this.t2.shape), 'Error adding multiply op: one of inputs must be scalar or the ' +
            ("shapes " + this.t1.shape + " and " + this.t2.shape + " must match."));
    };
    MultiplyNode.T1 = 't1';
    MultiplyNode.T2 = 't2';
    return MultiplyNode;
}(Node));
exports.MultiplyNode = MultiplyNode;
var DivideNode = (function (_super) {
    __extends(DivideNode, _super);
    function DivideNode(graph, t1, t2) {
        var _this = _super.call(this, graph, 'Divide', { t1: t1, t2: t2 }, new Tensor(util.sizeFromShape(t1.shape) === 1 ? t2.shape : t1.shape)) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        return _this;
    }
    DivideNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.t1.shape) === 1 ||
            util.sizeFromShape(this.t2.shape) === 1 ||
            util.arraysEqual(this.t1.shape, this.t2.shape), 'Error adding divide op: one of inputs must be scalar or the ' +
            ("shapes " + this.t1.shape + " and " + this.t2.shape + " must match."));
    };
    DivideNode.T1 = 't1';
    DivideNode.T2 = 't2';
    return DivideNode;
}(Node));
exports.DivideNode = DivideNode;
var ReduceSumNode = (function (_super) {
    __extends(ReduceSumNode, _super);
    function ReduceSumNode(graph, x) {
        return _super.call(this, graph, 'ReduceSum', { x: x }, new Tensor([])) || this;
    }
    ReduceSumNode.prototype.validate = function () { };
    ReduceSumNode.X = 'x';
    return ReduceSumNode;
}(Node));
exports.ReduceSumNode = ReduceSumNode;
var Concat3DNode = (function (_super) {
    __extends(Concat3DNode, _super);
    function Concat3DNode(graph, x1, x2, axis) {
        var _this = _super.call(this, graph, 'Concat3D', { x1: x1, x2: x2 }, new Tensor(concat_util.computeOutShape(x1.shape, x2.shape, axis))) || this;
        _this.x1 = x1;
        _this.x2 = x2;
        _this.axis = axis;
        return _this;
    }
    Concat3DNode.prototype.validate = function () {
        concat_util.assertParams(this.x1.shape, this.x2.shape, this.axis);
    };
    Concat3DNode.X1 = 'x1';
    Concat3DNode.X2 = 'x2';
    Concat3DNode.AXIS = 'axis';
    return Concat3DNode;
}(Node));
exports.Concat3DNode = Concat3DNode;
function getMatMulOutputShape(x1Shape, x2Shape) {
    if (x1Shape.length === 1 && x2Shape.length === 1) {
        return [1];
    }
    else if (x1Shape.length === 1 && x2Shape.length === 2) {
        return [x2Shape[1]];
    }
    else if (x1Shape.length === 2 && x2Shape.length === 1) {
        return [x1Shape[0]];
    }
    return [x1Shape[0], x2Shape[1]];
}
var MatMulNode = (function (_super) {
    __extends(MatMulNode, _super);
    function MatMulNode(graph, x1, x2) {
        var _this = _super.call(this, graph, 'MatMul', { x1: x1, x2: x2 }, new Tensor(getMatMulOutputShape(x1.shape, x2.shape))) || this;
        _this.x1 = x1;
        _this.x2 = x2;
        return _this;
    }
    MatMulNode.prototype.validate = function () {
        if (this.x1.shape.length === 2 && this.x2.shape.length === 2) {
            util.assert(this.x1.shape[1] === this.x2.shape[0], 'Error adding matmul op: inner shapes of matrices with shapes ' +
                (this.x1.shape + " and " + this.x2.shape + " must match."));
        }
        else if (this.x1.shape.length === 2 && this.x2.shape.length === 1) {
            util.assert(this.x1.shape[1] === this.x2.shape[0], 'Error adding matmul op: second dimension of matrix with shape ' +
                this.x1.shape.toString() +
                (" must match size of vector with shape " + this.x2.shape + "."));
        }
        else if (this.x1.shape.length === 1 && this.x2.shape.length === 2) {
            util.assert(this.x1.shape[0] === this.x2.shape[0], "Error adding matmul op: size of vector with shape " + this.x1.shape +
                " must match first dimension of matrix with " +
                ("shape " + this.x2.shape + "."));
        }
        else {
            throw new Error('Error adding matmul op: inputs must be vectors or matrices.');
        }
    };
    MatMulNode.X1 = 'x1';
    MatMulNode.X2 = 'x2';
    return MatMulNode;
}(Node));
exports.MatMulNode = MatMulNode;
var Convolution2DNode = (function (_super) {
    __extends(Convolution2DNode, _super);
    function Convolution2DNode(graph, x, w, b, fieldSize, outputDepth, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        var _this = _super.call(this, graph, 'Convolution 2D', { x: x, w: w, b: b }, new Tensor(conv_util.computeOutputShape3D(x.shape, fieldSize, outputDepth, stride, zeroPad))) || this;
        _this.x = x;
        _this.w = w;
        _this.b = b;
        _this.fieldSize = fieldSize;
        _this.outputDepth = outputDepth;
        _this.stride = stride;
        _this.zeroPad = zeroPad;
        return _this;
    }
    Convolution2DNode.prototype.validate = function () {
        util.assert(this.x.shape.length === 3, 'Error adding conv2d op: input must be of rank 3, but got shape: ' +
            (this.x.shape + "."));
        util.assert(this.w.shape.length === 4, 'Error adding conv2d op: weights must be of rank 4, but got shape: ' +
            (this.w.shape + "."));
        util.assert(this.b.shape.length === 1, 'Error adding conv2d op: biases must be of rank 1, but got shape: ' +
            (this.b.shape + "."));
        util.assert(this.x.shape[2] === this.w.shape[2], "Error adding conv2d op: depth of input (" + this.x.shape[2] + ") " +
            ("must match input depth for weights (" + this.w.shape[2] + ")."));
    };
    Convolution2DNode.X = 'x';
    Convolution2DNode.W = 'w';
    Convolution2DNode.B = 'b';
    return Convolution2DNode;
}(Node));
exports.Convolution2DNode = Convolution2DNode;
var MaxPoolNode = (function (_super) {
    __extends(MaxPoolNode, _super);
    function MaxPoolNode(graph, x, fieldSize, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        var _this = _super.call(this, graph, 'Max pool', { x: x }, new Tensor(conv_util.computeOutputShape3D(x.shape, fieldSize, x.shape[2], stride, zeroPad))) || this;
        _this.x = x;
        _this.fieldSize = fieldSize;
        _this.stride = stride;
        _this.zeroPad = zeroPad;
        return _this;
    }
    MaxPoolNode.prototype.validate = function () {
        util.assert(this.x.shape.length === 3, 'Error adding maxPool op: input must be of rank 3, but got shape: ' +
            (this.x.shape + "."));
    };
    MaxPoolNode.X = 'x';
    return MaxPoolNode;
}(Node));
exports.MaxPoolNode = MaxPoolNode;
var ReLUNode = (function (_super) {
    __extends(ReLUNode, _super);
    function ReLUNode(graph, x) {
        return _super.call(this, graph, 'ReLU', { x: x }, new Tensor(x.shape)) || this;
    }
    ReLUNode.prototype.validate = function () { };
    ReLUNode.X = 'x';
    return ReLUNode;
}(Node));
exports.ReLUNode = ReLUNode;
var LeakyReLUNode = (function (_super) {
    __extends(LeakyReLUNode, _super);
    function LeakyReLUNode(graph, x, alpha) {
        var _this = _super.call(this, graph, 'LeakyReLU', { x: x }, new Tensor(x.shape)) || this;
        _this.alpha = alpha;
        return _this;
    }
    LeakyReLUNode.prototype.validate = function () { };
    LeakyReLUNode.X = 'x';
    return LeakyReLUNode;
}(Node));
exports.LeakyReLUNode = LeakyReLUNode;
var ExpNode = (function (_super) {
    __extends(ExpNode, _super);
    function ExpNode(graph, x) {
        return _super.call(this, graph, 'Exp', { x: x }, new Tensor(x.shape)) || this;
    }
    ExpNode.prototype.validate = function () { };
    ExpNode.X = 'x';
    return ExpNode;
}(Node));
exports.ExpNode = ExpNode;
var LogNode = (function (_super) {
    __extends(LogNode, _super);
    function LogNode(graph, x) {
        return _super.call(this, graph, 'Log', { x: x }, new Tensor(x.shape)) || this;
    }
    LogNode.prototype.validate = function () { };
    LogNode.X = 'x';
    return LogNode;
}(Node));
exports.LogNode = LogNode;
var TanHNode = (function (_super) {
    __extends(TanHNode, _super);
    function TanHNode(graph, x) {
        return _super.call(this, graph, 'TanH', { x: x }, new Tensor(x.shape)) || this;
    }
    TanHNode.prototype.validate = function () { };
    TanHNode.X = 'x';
    return TanHNode;
}(Node));
exports.TanHNode = TanHNode;
var SigmoidNode = (function (_super) {
    __extends(SigmoidNode, _super);
    function SigmoidNode(graph, x) {
        return _super.call(this, graph, 'Sigmoid', { x: x }, new Tensor(x.shape)) || this;
    }
    SigmoidNode.prototype.validate = function () { };
    SigmoidNode.X = 'x';
    return SigmoidNode;
}(Node));
exports.SigmoidNode = SigmoidNode;
var SquareNode = (function (_super) {
    __extends(SquareNode, _super);
    function SquareNode(graph, x) {
        return _super.call(this, graph, 'Square', { x: x }, new Tensor(x.shape)) || this;
    }
    SquareNode.prototype.validate = function () { };
    SquareNode.X = 'x';
    return SquareNode;
}(Node));
exports.SquareNode = SquareNode;
var SoftmaxCrossEntropyCostNode = (function (_super) {
    __extends(SoftmaxCrossEntropyCostNode, _super);
    function SoftmaxCrossEntropyCostNode(graph, x, target) {
        var _this = _super.call(this, graph, 'SoftmaxCrossEntropyCost', { x: x, target: target }, new Tensor([])) || this;
        _this.x = x;
        _this.target = target;
        return _this;
    }
    SoftmaxCrossEntropyCostNode.prototype.validate = function () {
        util.assert(util.arraysEqual(this.x.shape, this.target.shape), "Error adding softmaxCrossEntropyCost op: x shape (" + this.x.shape + ") " +
            ("must match target shape (" + this.target.shape + ")."));
    };
    SoftmaxCrossEntropyCostNode.X = 'x';
    SoftmaxCrossEntropyCostNode.TARGET = 'target';
    return SoftmaxCrossEntropyCostNode;
}(Node));
exports.SoftmaxCrossEntropyCostNode = SoftmaxCrossEntropyCostNode;
var SoftmaxNode = (function (_super) {
    __extends(SoftmaxNode, _super);
    function SoftmaxNode(graph, x) {
        var _this = _super.call(this, graph, 'Softmax', { x: x }, new Tensor(x.shape)) || this;
        _this.x = x;
        return _this;
    }
    SoftmaxNode.prototype.validate = function () {
        util.assert(this.x.shape.length === 1, 'The input to a softmax must be a 1-D tensor');
        util.assert(this.x.shape[0] >= 2, 'The input to a softmax must have at least 2 values');
    };
    SoftmaxNode.X = 'x';
    return SoftmaxNode;
}(Node));
exports.SoftmaxNode = SoftmaxNode;
var MeanSquaredCostNode = (function (_super) {
    __extends(MeanSquaredCostNode, _super);
    function MeanSquaredCostNode(graph, label, prediction) {
        var _this = _super.call(this, graph, 'Mean Squared Cost', { label: label, prediction: prediction }, new Tensor([])) || this;
        _this.label = label;
        _this.prediction = prediction;
        return _this;
    }
    MeanSquaredCostNode.prototype.validate = function () {
        util.assert(util.arraysEqual(this.label.shape, this.prediction.shape), "Error adding meanSquaredCost op: label shape (" + this.label.shape + ") " +
            ("must match prediction shape (" + this.prediction.shape + ")."));
    };
    MeanSquaredCostNode.LABEL = 'label';
    MeanSquaredCostNode.PREDICTION = 'prediction';
    return MeanSquaredCostNode;
}(Node));
exports.MeanSquaredCostNode = MeanSquaredCostNode;
var ArgMaxNode = (function (_super) {
    __extends(ArgMaxNode, _super);
    function ArgMaxNode(graph, x) {
        var _this = _super.call(this, graph, 'ArgMax', { x: x }, new Tensor([1])) || this;
        _this.x = x;
        return _this;
    }
    ArgMaxNode.prototype.validate = function () {
        util.assert(util.sizeFromShape(this.x.shape) > 0, 'Error adding argmax op: input tensor must have at least one entry.');
    };
    ArgMaxNode.X = 'x';
    return ArgMaxNode;
}(Node));
exports.ArgMaxNode = ArgMaxNode;
var ArgMaxEqualsNode = (function (_super) {
    __extends(ArgMaxEqualsNode, _super);
    function ArgMaxEqualsNode(graph, x1, x2) {
        var _this = _super.call(this, graph, 'ArgMaxEquals', { x1: x1, x2: x2 }, new Tensor([1])) || this;
        _this.x1 = x1;
        _this.x2 = x2;
        return _this;
    }
    ArgMaxEqualsNode.prototype.validate = function () {
        util.assert(util.arraysEqual(this.x1.shape, this.x2.shape), "Error adding ArgMaxEquals op: x1 shape (" + this.x1.shape + ") " +
            ("must match x2 shape (" + this.x2.shape + ")."));
    };
    ArgMaxEqualsNode.X1 = 'x1';
    ArgMaxEqualsNode.X2 = 'x2';
    return ArgMaxEqualsNode;
}(Node));
exports.ArgMaxEqualsNode = ArgMaxEqualsNode;
//# sourceMappingURL=graph.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
function assertParams(aShape, bShape, axis) {
    var aRank = aShape.length;
    var bRank = bShape.length;
    util.assert(aShape.length === bShape.length, "Error in concat" + aRank + "D: rank of x1 (" + aRank + ") and x2 (" + bRank + ") " +
        "must be the same.");
    util.assert(axis >= 0 && axis < aRank, "Error in concat" + aRank + "D: axis must be " +
        ("between 0 and " + (aRank - 1) + "."));
    for (var i = 0; i < aRank; i++) {
        util.assert((i === axis) || (aShape[i] === bShape[i]), "Error in concat" + aRank + "D: Shape (" + aShape + ") does not match " +
            ("(" + bShape + ") along the non-concatenated axis " + i + "."));
    }
}
exports.assertParams = assertParams;
function computeOutShape(x1Shape, x2Shape, axis) {
    util.assert(x1Shape.length === x2Shape.length, 'x1 and x2 should have the same rank.');
    var outputShape = x1Shape.slice();
    outputShape[axis] += x2Shape[axis];
    return outputShape;
}
exports.computeOutShape = computeOutShape;
//# sourceMappingURL=concat_util.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
var axis_util = __webpack_require__(21);
var broadcast_util = __webpack_require__(9);
var concat_util = __webpack_require__(14);
var conv_util = __webpack_require__(8);
var copy2d_util = __webpack_require__(31);
var ndarray_1 = __webpack_require__(1);
var slice_util = __webpack_require__(84);
var SumTypesMap;
(function (SumTypesMap) {
    SumTypesMap["float32"] = "float32";
    SumTypesMap["int32"] = "int32";
    SumTypesMap["bool"] = "int32";
})(SumTypesMap = exports.SumTypesMap || (exports.SumTypesMap = {}));
var NDArrayMath = (function () {
    function NDArrayMath(safeMode) {
        this.safeMode = safeMode;
        this.ndarrayScopes = [];
        this.ndarraysToKeep = [];
        this.activeScopeNDArraysToKeep = [];
        this.debugMode = false;
    }
    NDArrayMath.prototype.scope = function (scopeFn) {
        var _this = this;
        this.startScope();
        var keepFn = function (ndarray) { return _this.keep(ndarray); };
        var trackFn = function (ndarray) { return _this.track(ndarray); };
        var result = scopeFn(keepFn, trackFn);
        if (result instanceof Promise) {
            result.then(function (r) { return _this.endScope(r); });
            return result;
        }
        else {
            this.endScope(result);
            return result;
        }
    };
    NDArrayMath.prototype.enableDebugMode = function () {
        this.debugMode = true;
        console.warn('Debugging mode is ON. The output of every math call will ' +
            'be downloaded to CPU and checked for NaNs. ' +
            'This significantly impacts performance.');
    };
    NDArrayMath.prototype.startScope = function () {
        var newScope = [];
        this.ndarrayScopes.push(newScope);
        this.activeScope = newScope;
        var newNDArraysToKeep = [];
        this.ndarraysToKeep.push(newNDArraysToKeep);
        this.activeScopeNDArraysToKeep = newNDArraysToKeep;
    };
    NDArrayMath.prototype.extractNDArraysFromScopeResult = function (result) {
        if (result == null) {
            return [];
        }
        if (result instanceof ndarray_1.NDArray) {
            return [result];
        }
        var list = [];
        var resultObj = result;
        for (var k in resultObj) {
            var val = resultObj[k];
            if (val instanceof ndarray_1.NDArray) {
                list.push(val);
            }
        }
        return list;
    };
    NDArrayMath.prototype.endScope = function (result) {
        var _this = this;
        var arraysToKeep = this.activeScopeNDArraysToKeep;
        var resultArrays = this.extractNDArraysFromScopeResult(result);
        arraysToKeep = arraysToKeep.concat(resultArrays);
        for (var i = 0; i < this.activeScope.length; i++) {
            var ndarray = this.activeScope[i];
            if (this.isNDArrayDataInList(ndarray, arraysToKeep)) {
                continue;
            }
            ndarray.dispose();
        }
        this.ndarrayScopes.pop();
        this.activeScope = this.ndarrayScopes.length === 0 ?
            null :
            this.ndarrayScopes[this.ndarrayScopes.length - 1];
        resultArrays.forEach(function (val) {
            if (!_this.isNDArrayDataInList(val, _this.activeScopeNDArraysToKeep)) {
                _this.track(val);
            }
        });
        this.ndarraysToKeep.pop();
        this.activeScopeNDArraysToKeep = this.ndarraysToKeep.length === 0 ?
            null :
            this.ndarraysToKeep[this.ndarraysToKeep.length - 1];
    };
    NDArrayMath.prototype.isNDArrayDataInList = function (ndarray, ndarrayList) {
        for (var i = 0; i < ndarrayList.length; i++) {
            if (ndarrayList[i].getData() === ndarray.getData()) {
                return true;
            }
        }
        return false;
    };
    NDArrayMath.prototype.keep = function (result) {
        if (this.activeScope == null) {
            if (this.safeMode) {
                throw new Error('You are using math in safe mode. Enclose all ' +
                    'math.method() calls inside a scope: ' +
                    'math.scope(() => {math.method();...}) to avoid memory ' +
                    'leaks.');
            }
            return result;
        }
        this.activeScopeNDArraysToKeep.push(result);
        return result;
    };
    NDArrayMath.prototype.checkForNaN = function (vals, dtype, name) {
        for (var i = 0; i < vals.length; i++) {
            if (util.isValNaN(vals[i], dtype)) {
                throw Error("The result of the last math." + name + " has NaNs.");
            }
        }
    };
    NDArrayMath.prototype.track = function (result) {
        if (this.activeScope == null) {
            if (this.safeMode) {
                throw new Error('You are using math in safe mode. Enclose all ' +
                    'math.method() calls inside a scope: ' +
                    'math.scope(() => {math.method();...}) to avoid memory ' +
                    'leaks.');
            }
            return result;
        }
        this.activeScope.push(result);
        return result;
    };
    NDArrayMath.prototype.dispose = function () { };
    NDArrayMath.prototype.matMul = function (a, b, aOrientation, bOrientation) {
        var _this = this;
        if (aOrientation === void 0) { aOrientation = MatrixOrientation.REGULAR; }
        if (bOrientation === void 0) { bOrientation = MatrixOrientation.REGULAR; }
        var innerShapeA = (aOrientation === MatrixOrientation.REGULAR) ? a.shape[1] : a.shape[0];
        var innerShapeB = (bOrientation === MatrixOrientation.REGULAR) ? b.shape[0] : b.shape[1];
        util.assert(a.rank === 2 && b.rank === 2, "Error in matMul: inputs must be rank 2, got ranks " + a.rank +
            (" and " + b.rank + "."));
        util.assert(innerShapeA === innerShapeB, "Error in matMul: inner shapes (" + innerShapeA + ") and (" +
            (innerShapeB + ") of NDArrays with shapes " + a.shape + " and ") +
            (b.shape + " and orientations " + MatrixOrientation[aOrientation]) +
            (" and " + MatrixOrientation[bOrientation] + " must match."));
        return this.executeOp('matMul', function () { return _this.matMulInternal(a, b, aOrientation, bOrientation); });
    };
    NDArrayMath.prototype.executeOp = function (name, f) {
        var start;
        if (this.debugMode) {
            start = performance.now();
        }
        var result = f();
        if (this.debugMode) {
            var vals = result.getValues();
            var time = util.rightPad(performance.now() - start + "ms", 9);
            var paddedName = util.rightPad(name, 25);
            var rank = result.rank;
            var size = result.size;
            var shape = util.rightPad(result.shape.toString(), 14);
            console.log("%c" + paddedName + "\t%c" + time + "\t%c" + rank + "D " + shape + "\t%c" + size, 'font-weight:bold', 'color:red', 'color:blue', 'color: orange');
            this.checkForNaN(vals, result.dtype, name);
        }
        return this.track(result);
    };
    NDArrayMath.prototype.vectorTimesMatrix = function (v, matrix) {
        util.assert(v.rank === 1, "Error in vectorTimesMatrix: first input must be rank 1, but got " +
            ("rank " + v.rank + "."));
        util.assert(matrix.rank === 2, "Error in vectorTimesMatrix: second input must be rank 2, but got " +
            ("rank " + matrix.rank + "."));
        util.assert(v.size === matrix.shape[0], "Error in vectorTimesMatrix: size of vector (" + v.size + ") " +
            ("must match first dimension of matrix (" + matrix.shape[0] + ")"));
        return this.matMul(v.as2D(1, -1), matrix).as1D();
    };
    NDArrayMath.prototype.matrixTimesVector = function (matrix, v) {
        util.assert(v.rank === 1, "Error in matrixTimesVector: second input must rank 1, but got " +
            ("rank " + v.rank + "."));
        util.assert(matrix.rank === 2, "Error in matrixTimesVector: first input must be a rank 2, but got " +
            ("rank " + matrix.rank + "."));
        util.assert(v.size === matrix.shape[1], "Error in matrixTimesVector: size of first rank 1 input " + v.size + " " +
            "must match inner dimension of second rank 2 input, but got " +
            ("shape " + matrix.shape + "."));
        return this.matMul(matrix, v.as2D(-1, 1)).as1D();
    };
    NDArrayMath.prototype.dotProduct = function (v1, v2) {
        util.assert(v1.rank === 1 && v2.rank === 1, "Error in dotProduct: inputs must be rank 1, but got ranks " +
            (v1.rank + " and " + v2.rank + "."));
        util.assert(v1.size === v2.size, "Error in dotProduct: size of inputs (" + v1.size + ") and (" +
            (v2.size + ") must match."));
        return this.matMul(v1.as2D(1, -1), v2.as2D(-1, 1)).asScalar();
    };
    NDArrayMath.prototype.outerProduct = function (v1, v2) {
        util.assert(v1.rank === 1 && v2.rank === 1, "Error in outerProduct: inputs must be rank 1, but got ranks " +
            (v1.rank + " and " + v2.rank + "."));
        return this.matMul(v1.as2D(-1, 1), v2.as2D(1, -1));
    };
    NDArrayMath.prototype.clone = function (ndarray) {
        var _this = this;
        return this.executeOp('clone', function () { return _this.cloneInternal(ndarray); });
    };
    NDArrayMath.prototype.reshape = function (ndarray, newShape) {
        console.warn('math.reshape() is deprecated. Please call reshape() ' +
            'directly on the ndarray object');
        return ndarray.reshape(newShape);
    };
    NDArrayMath.prototype.slice1D = function (input, begin, size) {
        var _this = this;
        slice_util.assertParamsValid(input, [begin], [size]);
        return this.executeOp('slice1D', function () { return _this.slice1DInternal(input, begin, size); });
    };
    NDArrayMath.prototype.slice2D = function (input, begin, size) {
        var _this = this;
        slice_util.assertParamsValid(input, begin, size);
        return this.executeOp('slice2D', function () { return _this.slice2DInternal(input, begin, size); });
    };
    NDArrayMath.prototype.slice3D = function (input, begin, size) {
        var _this = this;
        slice_util.assertParamsValid(input, begin, size);
        return this.executeOp('slice3D', function () { return _this.slice3DInternal(input, begin, size); });
    };
    NDArrayMath.prototype.slice4D = function (input, begin, size) {
        var _this = this;
        slice_util.assertParamsValid(input, begin, size);
        return this.executeOp('slice4D', function () { return _this.slice4DInternal(input, begin, size); });
    };
    NDArrayMath.prototype.copy2D = function (source, sourceBegin, sourceSize, dest, destBegin, destSize) {
        var _this = this;
        util.assert(sourceBegin[0] + sourceSize[0] <= source.shape[0] &&
            sourceBegin[1] + sourceSize[1] <= source.shape[1], "Error in copy2D: requested source start position " + sourceBegin + " " +
            ("and source size " + sourceSize + " would overflow source NDArray") +
            ("of shape " + source.shape + "."));
        util.assert(destBegin[0] + destSize[0] <= dest.shape[0] &&
            destBegin[1] + destSize[1] <= dest.shape[1], "Error in copy2D: requested dest start position " + destBegin + " " +
            ("and source size " + destSize + " would overflow dest NDArray of") +
            ("shape " + dest.shape + "."));
        copy2d_util.validateShapes(sourceSize, destSize);
        this.executeOp('copy2D', function () {
            _this.copy2DInternal(source, sourceBegin, sourceSize, dest, destBegin, destSize);
            return dest;
        });
    };
    NDArrayMath.prototype.concat1D = function (a, b) {
        var _this = this;
        concat_util.assertParams(a.shape, b.shape, 0);
        return this.executeOp('concat1D', function () { return _this.concat1DInternal(a, b); });
    };
    NDArrayMath.prototype.concat2D = function (a, b, axis) {
        var _this = this;
        concat_util.assertParams(a.shape, b.shape, axis);
        return this.executeOp('concat2D', function () { return _this.concat2DInternal(a, b, axis); });
    };
    NDArrayMath.prototype.concat3D = function (ndarray1, ndarray2, axis) {
        var _this = this;
        concat_util.assertParams(ndarray1.shape, ndarray2.shape, axis);
        return this.executeOp('concat3D', function () { return _this.concat3DInternal(ndarray1, ndarray2, axis); });
    };
    NDArrayMath.prototype.concat4D = function (ndarray1, ndarray2, axis) {
        var _this = this;
        concat_util.assertParams(ndarray1.shape, ndarray2.shape, axis);
        return this.executeOp('concat4D', function () { return _this.concat4DInternal(ndarray1, ndarray2, axis); });
    };
    NDArrayMath.prototype.logSumExp = function (input, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var axes = axis_util.parseAxisParam(axis, input.shape);
        return this.executeOp('logSumExp', function () {
            var xMax = _this.max(input, axes, true);
            var a = _this.subtract(input, xMax);
            var b = _this.exp(a);
            var c = _this.sum(b, axes);
            var d = _this.log(c);
            var res = _this.add(xMax.reshape(d.shape), d);
            if (keepDims) {
                var newShape = axis_util.expandShapeToKeepDim(res.shape, axes);
                return res.reshape(newShape);
            }
            return res;
        });
    };
    NDArrayMath.prototype.sum = function (input, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var origAxes = axis_util.parseAxisParam(axis, input.shape);
        var axes = origAxes;
        var permutedAxes = axis_util.getPermutedAxes(axes, input.rank);
        return this.executeOp('sum', function () {
            if (permutedAxes != null) {
                input = _this.transpose(input, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, input.rank);
            }
            var res = _this.sumInternal(input, axes);
            if (keepDims) {
                var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
                return res.reshape(newShape);
            }
            return res;
        });
    };
    NDArrayMath.prototype.mean = function (x, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var axes = axis_util.parseAxisParam(axis, x.shape);
        var shapes = axis_util.computeOutAndReduceShapes(x.shape, axes);
        var reduceShape = shapes[1];
        var reduceSize = util.sizeFromShape(reduceShape);
        return this.executeOp('mean', function () {
            return _this.scope(function (keep, track) {
                var res = _this.divide(x, track(ndarray_1.Scalar.new(reduceSize)));
                return _this.sum(res, axis, keepDims);
            });
        });
    };
    NDArrayMath.prototype.argMin = function (input, axis) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        var axes = axis_util.parseAxisParam(axis, input.shape);
        var permutedAxes = axis_util.getPermutedAxes(axes, input.rank);
        return this.executeOp('argMin', function () {
            if (permutedAxes != null) {
                input = _this.transpose(input, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, input.rank);
            }
            return _this.argMinInternal(input, axes);
        });
    };
    NDArrayMath.prototype.argMax = function (input, axis) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        var axes = axis_util.parseAxisParam(axis, input.shape);
        var permutedAxes = axis_util.getPermutedAxes(axes, input.rank);
        return this.executeOp('argMax', function () {
            if (permutedAxes != null) {
                input = _this.transpose(input, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, input.rank);
            }
            return _this.argMaxInternal(input, axes);
        });
    };
    NDArrayMath.prototype.argMaxEquals = function (x1, x2) {
        var _this = this;
        util.assertShapesMatch(x1.shape, x2.shape, 'Error in argMaxEquals: ');
        return this.executeOp('argMaxEquals', function () { return _this.scope(function () {
            return _this.equal(_this.argMax(x1), _this.argMax(x2));
        }); });
    };
    NDArrayMath.prototype.equal = function (x, y) {
        var _this = this;
        return this.executeOp('equal', function () { return _this.equalInternal(x, y); });
    };
    NDArrayMath.prototype.equalStrict = function (x, y) {
        util.assertShapesMatch(x.shape, y.shape, 'Error in equalStrict: ');
        return this.equal(x, y);
    };
    NDArrayMath.prototype.topK = function (ndarray, k) {
        var _this = this;
        util.assert(k <= ndarray.size, "Error in topK: k value (" + k + ") must be less than size of input " +
            ("ndarray, got shape " + ndarray.shape + "."));
        var result;
        this.executeOp('topK', function () {
            result = _this.topKInternal(ndarray, k);
            return result.values;
        });
        this.track(result.indices);
        return result;
    };
    NDArrayMath.prototype.min = function (input, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var origAxes = axis_util.parseAxisParam(axis, input.shape);
        var axes = origAxes;
        var permutedAxes = axis_util.getPermutedAxes(axes, input.rank);
        return this.executeOp('min', function () {
            if (permutedAxes != null) {
                input = _this.transpose(input, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, input.rank);
            }
            var res = _this.minInternal(input, axes);
            if (keepDims) {
                var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
                return res.reshape(newShape);
            }
            return res;
        });
    };
    NDArrayMath.prototype.max = function (input, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var origAxes = axis_util.parseAxisParam(axis, input.shape);
        var axes = origAxes;
        var permutedAxes = axis_util.getPermutedAxes(axes, input.rank);
        return this.executeOp('max', function () {
            if (permutedAxes != null) {
                input = _this.transpose(input, permutedAxes);
                axes = axis_util.getInnerMostAxes(axes.length, input.rank);
            }
            var res = _this.maxInternal(input, axes);
            if (keepDims) {
                var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
                return res.reshape(newShape);
            }
            return res;
        });
    };
    NDArrayMath.prototype.softmax = function (logits, dim) {
        var _this = this;
        if (dim === void 0) { dim = -1; }
        if (dim === -1) {
            dim = logits.rank - 1;
        }
        if (dim !== logits.rank - 1) {
            throw Error('Softmax along a non-last dimension is not yet supported. ' +
                ("Logits was rank " + logits.rank + " and dim was " + dim));
        }
        return this.executeOp('softmax', function () {
            return _this.scope(function () {
                var lse = _this.logSumExp(logits, [dim], true);
                var logResult = _this.subtract(logits, lse);
                return _this.exp(logResult);
            });
        });
    };
    NDArrayMath.prototype.switchDim = function (a, newDim) {
        return this.transpose(a, newDim);
    };
    NDArrayMath.prototype.tile = function (a, reps) {
        var _this = this;
        util.assert(a.rank === reps.length, "Error in transpose: rank of input " + a.rank + " " +
            ("must match length of reps " + reps + "."));
        return this.executeOp('tile', function () { return _this.tileInternal(a, reps); });
    };
    NDArrayMath.prototype.transpose = function (a, perm) {
        var _this = this;
        if (perm == null) {
            perm = a.shape.map(function (s, i) { return i; }).reverse();
        }
        util.assert(a.rank === perm.length, "Error in transpose: rank of input " + a.rank + " " +
            ("must match length of perm " + perm + "."));
        return this.executeOp('transpose', function () { return _this.transposeInternal(a, perm); });
    };
    NDArrayMath.prototype.scalarPlusArray = function (c, a) {
        util.assert(c.size === 1, "Error in scalarPlusArray: first argument must be rank 0, but got " +
            ("rank " + c.rank + "."));
        return this.add(c, a);
    };
    NDArrayMath.prototype.scalarMinusArray = function (c, a) {
        util.assert(c.size === 1, "Error in scalarMinusArray: first argument must be rank 0, but got " +
            ("rank " + c.rank + "."));
        return this.subtract(c, a);
    };
    NDArrayMath.prototype.arrayMinusScalar = function (a, c) {
        util.assert(c.size === 1, "Error in arrayMinusScalar: second argument must be rank 0, but " +
            ("got rank " + c.rank + "."));
        return this.subtract(a, c);
    };
    NDArrayMath.prototype.neg = function (a) {
        var _this = this;
        return this.executeOp('neg', function () { return _this.negInternal(a); });
    };
    NDArrayMath.prototype.add = function (a, b) {
        var _this = this;
        broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        return this.executeOp('add', function () { return _this.addInternal(a, b); });
    };
    NDArrayMath.prototype.addStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in addStrict: ');
        return this.add(a, b);
    };
    NDArrayMath.prototype.subtract = function (a, b) {
        var _this = this;
        broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        return this.executeOp('subtract', function () { return _this.subtractInternal(a, b); });
    };
    NDArrayMath.prototype.sub = function (a, b) {
        return this.subtract(a, b);
    };
    NDArrayMath.prototype.subStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in subStrict: ');
        return this.subtract(a, b);
    };
    NDArrayMath.prototype.multiply = function (a, b) {
        var _this = this;
        broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        return this.executeOp('multiply', function () { return _this.multiplyInternal(a, b); });
    };
    NDArrayMath.prototype.elementWiseMul = function (a, b) {
        return this.multiplyStrict(a, b);
    };
    NDArrayMath.prototype.multiplyStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in multiplyStrict: ');
        return this.multiply(a, b);
    };
    NDArrayMath.prototype.divide = function (a, b) {
        var _this = this;
        broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        return this.executeOp('divide', function () { return _this.divideInternal(a, b); });
    };
    NDArrayMath.prototype.divideStrict = function (a, b) {
        util.assertShapesMatch(a.shape, b.shape, 'Error in divideStrict: ');
        return this.divide(a, b);
    };
    NDArrayMath.prototype.scalarDividedByArray = function (c, a) {
        util.assert(c.size === 1, "Error in scalarDividedByArray: first argument must be rank 0, but " +
            ("got NDArray of rank " + c.rank + "."));
        return this.divide(c, a);
    };
    NDArrayMath.prototype.arrayDividedByScalar = function (a, c) {
        util.assert(c.size === 1, "Error in arrayDividedByScalar: second argument must be rank 0, " +
            ("but got NDArray of rank " + c.rank + "."));
        return this.divide(a, c);
    };
    NDArrayMath.prototype.ceil = function (ndarray) {
        var _this = this;
        return this.executeOp('ceil', function () { return _this.ceilInternal(ndarray); });
    };
    NDArrayMath.prototype.floor = function (ndarray) {
        var _this = this;
        return this.executeOp('floor', function () { return _this.floorInternal(ndarray); });
    };
    NDArrayMath.prototype.exp = function (ndarray) {
        var _this = this;
        return this.executeOp('exp', function () { return _this.expInternal(ndarray); });
    };
    NDArrayMath.prototype.log = function (ndarray) {
        var _this = this;
        return this.executeOp('log', function () { return _this.logInternal(ndarray); });
    };
    NDArrayMath.prototype.sqrt = function (ndarray) {
        var _this = this;
        return this.executeOp('sqrt', function () { return _this.sqrtInternal(ndarray); });
    };
    NDArrayMath.prototype.square = function (x) {
        var _this = this;
        return this.executeOp('square', function () { return _this.squareInternal(x); });
    };
    NDArrayMath.prototype.abs = function (ndarray) {
        var _this = this;
        return this.executeOp('abs', function () { return _this.absInternal(ndarray); });
    };
    NDArrayMath.prototype.clip = function (ndarray, min, max) {
        var _this = this;
        util.assert((min <= max), "Error in clip: min (" + min + ") must be" +
            ("less than or equal to max (" + max + ")."));
        return this.executeOp('clip', function () { return _this.clipInternal(ndarray, min, max); });
    };
    NDArrayMath.prototype.relu = function (ndarray) {
        var _this = this;
        return this.executeOp('relu', function () { return _this.reluInternal(ndarray); });
    };
    NDArrayMath.prototype.elu = function (ndarray) {
        var _this = this;
        return this.executeOp('elu', function () { return _this.eluInternal(ndarray); });
    };
    NDArrayMath.prototype.leakyRelu = function (ndarray, alpha) {
        var _this = this;
        if (alpha === void 0) { alpha = 0.2; }
        return this.executeOp('leakyRelu', function () { return _this.leakyReluInternal(ndarray, alpha); });
    };
    NDArrayMath.prototype.sigmoid = function (ndarray) {
        var _this = this;
        return this.executeOp('sigmoid', function () { return _this.sigmoidInternal(ndarray); });
    };
    NDArrayMath.prototype.sin = function (ndarray) {
        var _this = this;
        return this.executeOp('sin', function () { return _this.sinInternal(ndarray); });
    };
    NDArrayMath.prototype.cos = function (ndarray) {
        var _this = this;
        return this.executeOp('cos', function () { return _this.cosInternal(ndarray); });
    };
    NDArrayMath.prototype.tan = function (ndarray) {
        var _this = this;
        return this.executeOp('tan', function () { return _this.tanInternal(ndarray); });
    };
    NDArrayMath.prototype.asin = function (ndarray) {
        var _this = this;
        return this.executeOp('asin', function () { return _this.asinInternal(ndarray); });
    };
    NDArrayMath.prototype.acos = function (ndarray) {
        var _this = this;
        return this.executeOp('acos', function () { return _this.acosInternal(ndarray); });
    };
    NDArrayMath.prototype.atan = function (ndarray) {
        var _this = this;
        return this.executeOp('atan', function () { return _this.atanInternal(ndarray); });
    };
    NDArrayMath.prototype.sinh = function (ndarray) {
        var _this = this;
        return this.executeOp('sinh', function () { return _this.sinhInternal(ndarray); });
    };
    NDArrayMath.prototype.cosh = function (ndarray) {
        var _this = this;
        return this.executeOp('cosh', function () { return _this.coshInternal(ndarray); });
    };
    NDArrayMath.prototype.tanh = function (ndarray) {
        var _this = this;
        return this.executeOp('tanh', function () { return _this.tanhInternal(ndarray); });
    };
    NDArrayMath.prototype.step = function (ndarray, alpha) {
        var _this = this;
        if (alpha === void 0) { alpha = 0.0; }
        return this.executeOp('step', function () { return _this.stepInternal(ndarray, alpha); });
    };
    NDArrayMath.prototype.scaledArrayAdd = function (c1, a, c2, b) {
        var _this = this;
        util.assert(c1.size === 1, "Error in scaledArrayAdd: first argument must rank 0, but got " +
            (" rank " + c1.rank + "."));
        util.assert(c2.size === 1, "Error in scaledArrayAdd: third argument must be rank 0, but got " +
            ("NDArray of rank " + c2.rank + "."));
        util.assertShapesMatch(a.shape, b.shape, 'Error in scaledArrayAdd: ');
        return this.executeOp('scaledArrayAdd', function () { return _this.scaledArrayAddInternal(c1, a, c2, b); });
    };
    NDArrayMath.prototype.scalarTimesArray = function (c, a) {
        util.assert(c.size === 1, "Error in arrayDividedByScalar: first argument must be rank 0, but " +
            ("got rank " + c.rank + "."));
        return this.multiply(c, a);
    };
    NDArrayMath.prototype.elementWiseMulBroadcast = function (a, b) {
        util.assert(a.rank === 2, "Error in elementWiseMulBroadcast: first argument must be " +
            ("rank 2, but got rank " + a.rank + "."));
        util.assert(b.rank === 2, "Error in elementWiseMulBroadcast: second argument must be " +
            ("rank 2, but got rank " + b.rank + "."));
        return this.multiply(a, b);
    };
    NDArrayMath.prototype.conv2d = function (x, filter, bias, strides, pad) {
        var _this = this;
        util.assert(x.rank === 3, "Error in conv2d: x must be rank 3, but got rank " + x.rank + ".");
        util.assert(filter.rank === 4, "Error in conv2d: filter must be rank 4, but got rank " +
            (filter.rank + "."));
        if (bias != null) {
            util.assert(bias.rank === 1, "Error in conv2d: bias must be rank 1, but got rank " +
                (bias.rank + "."));
        }
        util.assert(x.shape[2] === filter.shape[2], "Error in conv2d: depth of input (" + x.shape[2] + ") must match  " +
            ("input depth for filter " + filter.shape[2] + "."));
        var filterHeight = filter.shape[0];
        var filterWidth = filter.shape[1];
        var outDepth = filter.shape[3];
        var _a = parseTupleParam(strides), strideHeight = _a[0], strideWidth = _a[1];
        var convInfo = conv_util.computeConv2DInfo(x.shape, filterHeight, filterWidth, outDepth, strideHeight, strideWidth, pad);
        return this.executeOp('conv2d', function () { return _this.conv2dInternal(x, filter, bias, convInfo); });
    };
    NDArrayMath.prototype.conv2dBackProp = function (x, dy, filter, strides, pad) {
        var dw = this.conv2dDerFilter(x, dy, filter.shape, strides, pad);
        var db = this.conv2dDerBias(dy);
        var dx = this.conv2dDerInput(x.shape, dy, filter, strides, pad);
        return { db: db, dw: dw, dx: dx };
    };
    NDArrayMath.prototype.conv2dDerInput = function (inShape, dy, filter, strides, pad) {
        var _this = this;
        var inDepth = inShape[2];
        var outDepth = dy.shape[2];
        util.assert(inShape.length === 3, "Error in conv2dDerInput: x must be rank 3, but got rank " +
            (inShape.length + "."));
        util.assert(dy.rank === 3, "Error in conv2dDerInput: dy must be rank 3, but got " +
            ("rank " + dy.rank));
        util.assert(filter.rank === 4, "Error in conv2dDerInput: filter must be rank 4, but got " +
            ("rank " + filter.rank));
        util.assert(inDepth === filter.shape[2], "Error in conv2dDerInput: depth of input (" + inDepth + ") must " +
            ("match input depth for filter " + filter.shape[2] + "."));
        util.assert(outDepth === filter.shape[3], "Error in conv2dDerInput: depth of output (" + outDepth + ") must" +
            ("match output depth for filter " + filter.shape[3] + "."));
        var filterHeight = filter.shape[0];
        var filterWidth = filter.shape[1];
        var _a = parseTupleParam(strides), strideHeight = _a[0], strideWidth = _a[1];
        var convInfo = conv_util.computeConv2DInfo(inShape, filterHeight, filterWidth, outDepth, strideHeight, strideWidth, pad);
        return this.executeOp('conv2dDerInput', function () { return _this.conv2dDerInputInternal(dy, filter, convInfo); });
    };
    NDArrayMath.prototype.conv2dDerBias = function (dy) {
        return this.track(this.conv2dDerBiasInternal(dy));
    };
    NDArrayMath.prototype.conv2dDerFilter = function (x, dy, filterSize, strides, pad) {
        util.assert(x.rank === 3, "Error in conv2dDerFilter: x must be rank 3, but got shape " +
            (x.shape + "."));
        util.assert(dy.rank === 3, "Error in conv2dDerFilter: dy must be rank 3, but got shape " +
            (dy.shape + "."));
        util.assert(filterSize.length === 4, "Error in conv2dDerFilter: filterSize must be length 4, but got " +
            (filterSize + "."));
        util.assert(x.shape[2] === filterSize[2], "Error in conv2dDerFilter: depth of x " + x.shape[2] + ") must " +
            ("match input depth in filter (" + filterSize[2] + "."));
        util.assert(dy.shape[2] === filterSize[3], "Error in conv2dDerFilter: depth of dy (" + dy.shape[2] + ") must " +
            ("match output depth for filter (" + filterSize[3] + ")."));
        var filterHeight = filterSize[0];
        var filterWidth = filterSize[1];
        var outDepth = filterSize[3];
        var _a = parseTupleParam(strides), strideHeight = _a[0], strideWidth = _a[1];
        var convInfo = conv_util.computeConv2DInfo(x.shape, filterHeight, filterWidth, outDepth, strideHeight, strideWidth, pad);
        return this.track(this.conv2dDerFilterInternal(x, dy, convInfo));
    };
    NDArrayMath.prototype.conv2dTranspose = function (x, filter, outputShape, strides, pad) {
        return this.conv2dDerInput(outputShape, x, filter, strides, pad);
    };
    NDArrayMath.prototype.depthwiseConv2D = function (input, filter, strides, pad, rates) {
        var _this = this;
        if (rates === void 0) { rates = [1, 1]; }
        var input4D = input;
        var reshapedTo4D = false;
        if (input.rank === 3) {
            reshapedTo4D = true;
            input4D = input.as4D(1, input.shape[0], input.shape[1], input.shape[2]);
        }
        util.assert(input4D.rank === 4, "Error in depthwiseConv2D: input must be rank 4, but got " +
            ("rank " + input4D.rank + "."));
        util.assert(filter.rank === 4, "Error in depthwiseConv2D: filter must be rank 4, but got rank " +
            (filter.rank + "."));
        util.assert(input4D.shape[3] === filter.shape[2], "Error in depthwiseConv2D: number of input channels " +
            ("(" + input4D.shape[3] + ") must match the inChannels dimension in ") +
            ("filter " + filter.shape[2] + "."));
        rates = rates || [1, 1];
        var _a = parseTupleParam(rates), rateHeight = _a[0], rateWidth = _a[1];
        util.assert(rateHeight === 1 && rateWidth === 1, 'Error in depthwiseConv2D: rates greater than 1 are not yet ' +
            ("supported. Got rates '" + rates + "'"));
        var convInfo = conv_util.computeDepthwiseConv2DInfo(input4D.shape, filter.shape, strides, pad);
        return this.executeOp('depthwiseConv2D', function () {
            var res = _this.depthwiseConv2DInternal(input4D, filter, convInfo);
            if (reshapedTo4D) {
                return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
            }
            return res;
        });
    };
    NDArrayMath.prototype.maxPool = function (x, filterSize, strides, pad) {
        var _this = this;
        util.assert(x.rank === 3, "Error in maxPool: x must be rank 3 but got rank " + x.rank + ".");
        var _a = parseTupleParam(filterSize), filterHeight = _a[0], filterWidth = _a[1];
        var outDepth = x.shape[2];
        var _b = parseTupleParam(strides), strideHeight = _b[0], strideWidth = _b[1];
        var convInfo = conv_util.computeConv2DInfo(x.shape, filterHeight, filterWidth, outDepth, strideHeight, strideWidth, pad);
        return this.executeOp('maxPool', function () { return _this.maxPoolInternal(x, convInfo); });
    };
    NDArrayMath.prototype.maxPoolBackprop = function (dy, x, filterSize, strides, pad) {
        var _this = this;
        util.assert(dy.rank === 3, "Error in maxPoolBackprop: dy must be rank 3 but got rank " +
            (dy.rank + "."));
        util.assert(x.rank === 3, "Error in maxPoolBackprop: x must be rank 3 but got rank " +
            (x.rank + "."));
        var _a = parseTupleParam(filterSize), filterHeight = _a[0], filterWidth = _a[1];
        var outDepth = x.shape[2];
        var _b = parseTupleParam(strides), strideHeight = _b[0], strideWidth = _b[1];
        var convInfo = conv_util.computeConv2DInfo(x.shape, filterHeight, filterWidth, outDepth, strideHeight, strideWidth, pad);
        return this.executeOp('maxPoolBackprop', function () { return _this.maxPoolBackpropInternal(dy, x, convInfo); });
    };
    NDArrayMath.prototype.minPool = function (x, filterSize, strides, pad) {
        var _this = this;
        util.assert(x.rank === 3, "Error in minPool: x must be rank 3 but got rank " + x.rank + ".");
        var _a = parseTupleParam(filterSize), filterHeight = _a[0], filterWidth = _a[1];
        var outDepth = x.shape[2];
        var _b = parseTupleParam(strides), strideHeight = _b[0], strideWidth = _b[1];
        var convInfo = conv_util.computeConv2DInfo(x.shape, filterHeight, filterWidth, outDepth, strideHeight, strideWidth, pad);
        return this.executeOp('minPool', function () { return _this.minPoolInternal(x, convInfo); });
    };
    NDArrayMath.prototype.avgPool = function (x, filterSize, strides, pad) {
        var _this = this;
        util.assert(x.rank === 3, "Error in avgPool: x must be rank 3 but got rank " + x.rank + ".");
        var _a = parseTupleParam(filterSize), filterHeight = _a[0], filterWidth = _a[1];
        var outDepth = x.shape[2];
        var _b = parseTupleParam(strides), strideHeight = _b[0], strideWidth = _b[1];
        var convInfo = conv_util.computeConv2DInfo(x.shape, filterHeight, filterWidth, outDepth, strideHeight, strideWidth, pad);
        return this.executeOp('avgPool', function () { return _this.avgPoolInternal(x, convInfo); });
    };
    NDArrayMath.prototype.resizeBilinear3D = function (x, newShape2D, alignCorners) {
        var _this = this;
        if (alignCorners === void 0) { alignCorners = false; }
        util.assert(x.rank === 3, "Error in resizeBilinear3D: x must be rank 3 but got rank " + x.rank + ".");
        util.assert(newShape2D.length === 2, "Error in resizeBilinear3D: new shape must 2D, but got shape " +
            (newShape2D + "."));
        return this.executeOp('resizeBilinear3D', function () { return _this.resizeBilinear3DInternal(x, newShape2D, alignCorners); });
    };
    NDArrayMath.prototype.batchNormalization2D = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var _this = this;
        if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
        util.assert(x.rank === 2, "Error in batchNormalization3D: x must be rank 3 but got rank " +
            (x.rank + "."));
        util.assert(mean.rank === 2 || mean.rank === 1, "Error in batchNormalization2D: mean must be rank 2 or rank 1 but " +
            ("got rank " + mean.rank + "."));
        util.assert(variance.rank === 2 || variance.rank === 1, "Error in batchNormalization2D: variance must be rank 2 or rank 1 " +
            ("but got rank " + variance.rank + "."));
        if (scale != null) {
            util.assert(scale.rank === 2 || scale.rank === 1, "Error in batchNormalization2D: scale must be rank 2 or rank 1 " +
                ("but got rank " + scale.rank + "."));
        }
        if (offset != null) {
            util.assert(offset.rank === 2 || offset.rank === 1, "Error in batchNormalization2D: offset must be rank 2 or rank 1 " +
                ("but got rank " + offset.rank + "."));
        }
        return this.executeOp('batchNorm2D', function () { return _this.batchNormalization2DInternal(x, mean, variance, varianceEpsilon, scale, offset); });
    };
    NDArrayMath.prototype.batchNormalization3D = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var _this = this;
        if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
        util.assert(x.rank === 3, "Error in batchNormalization3D: x must be rank 3 but got rank " +
            (x.rank + "."));
        util.assert(mean.rank === 3 || mean.rank === 1, "Error in batchNormalization3D: mean must be rank 3 or rank 1 but " +
            ("got rank " + mean.rank + "."));
        util.assert(variance.rank === 3 || variance.rank === 1, "Error in batchNormalization3D: variance must be rank 3 or rank 1 " +
            ("but got rank " + variance.rank + "."));
        if (scale != null) {
            util.assert(scale.rank === 3 || scale.rank === 1, "Error in batchNormalization3D: scale must be rank 3 or rank 1 " +
                ("but got rank " + scale.rank + "."));
        }
        if (offset != null) {
            util.assert(offset.rank === 3 || offset.rank === 1, "Error in batchNormalization3D: offset must be rank 3 or rank 1 " +
                ("but got rank " + offset.rank + "."));
        }
        return this.executeOp('batchNorm3D', function () { return _this.batchNormalization3DInternal(x, mean, variance, varianceEpsilon, scale, offset); });
    };
    NDArrayMath.prototype.multiRNNCell = function (lstmCells, data, c, h) {
        var res = this.scope(function () {
            var input = data;
            var newStates = [];
            for (var i = 0; i < lstmCells.length; i++) {
                var output = lstmCells[i](input, c[i], h[i]);
                newStates.push(output[0]);
                newStates.push(output[1]);
                input = output[1];
            }
            return newStates;
        });
        var newC = [];
        var newH = [];
        for (var i = 0; i < res.length; i += 2) {
            newC.push(res[i]);
            newH.push(res[i + 1]);
        }
        return [newC, newH];
    };
    NDArrayMath.prototype.basicLSTMCell = function (forgetBias, lstmKernel, lstmBias, data, c, h) {
        var _this = this;
        var res = this.scope(function () {
            var combined = _this.concat2D(data, h, 1);
            var weighted = _this.matMul(combined, lstmKernel);
            var res = _this.add(weighted, lstmBias);
            var batchSize = res.shape[0];
            var sliceCols = res.shape[1] / 4;
            var sliceSize = [batchSize, sliceCols];
            var i = _this.slice2D(res, [0, 0], sliceSize);
            var j = _this.slice2D(res, [0, sliceCols], sliceSize);
            var f = _this.slice2D(res, [0, sliceCols * 2], sliceSize);
            var o = _this.slice2D(res, [0, sliceCols * 3], sliceSize);
            var newC = _this.addStrict(_this.multiplyStrict(c, _this.sigmoid(_this.scalarPlusArray(forgetBias, f))), _this.multiplyStrict(_this.sigmoid(i), _this.tanh(j)));
            var newH = _this.multiplyStrict(_this.tanh(newC), _this.sigmoid(o));
            return [newC, newH];
        });
        return [res[0], res[1]];
    };
    NDArrayMath.prototype.multinomial = function (probabilities, numSamples, seed) {
        var _this = this;
        var numOutcomes = probabilities.size;
        if (numOutcomes < 2) {
            throw new Error("Error in multinomial: you need at least 2 outcomes, but got " +
                (numOutcomes + "."));
        }
        if (probabilities.rank > 2) {
            throw new Error("Rank of probabilities must be 1 or 2, but is " + probabilities.rank);
        }
        seed = seed || Math.random();
        var origRank = probabilities.rank;
        if (probabilities.rank === 1) {
            probabilities = probabilities.as2D(1, -1);
        }
        return this.executeOp('multinomial', function () {
            var res = _this.multinomialInternal(probabilities, numSamples, seed);
            if (origRank === 1) {
                return res.as1D();
            }
            return res;
        });
    };
    NDArrayMath.prototype.oneHot = function (indices, depth, onValue, offValue) {
        var _this = this;
        if (onValue === void 0) { onValue = 1; }
        if (offValue === void 0) { offValue = 0; }
        if (depth < 2) {
            throw new Error("Error in oneHot: depth must be >=2, but it is " + depth);
        }
        return this.executeOp('oneHot', function () { return _this.oneHotInternal(indices, depth, onValue, offValue); });
    };
    NDArrayMath.prototype.moments = function (x, axis, keepDims) {
        var _this = this;
        if (axis === void 0) { axis = null; }
        if (keepDims === void 0) { keepDims = false; }
        var axes = axis_util.parseAxisParam(axis, x.shape);
        var result = this.scope(function () {
            var mean = _this.mean(x, axes, keepDims);
            var keepDimsShape = mean.shape;
            if (!keepDims) {
                keepDimsShape = axis_util.expandShapeToKeepDim(mean.shape, axes);
            }
            var devSquared = _this.square(_this.subtract(x, mean.reshape(keepDimsShape)));
            var variance = _this.mean(devSquared, axes, keepDims);
            return { mean: mean, variance: variance };
        });
        return result;
    };
    return NDArrayMath;
}());
exports.NDArrayMath = NDArrayMath;
var MatrixOrientation;
(function (MatrixOrientation) {
    MatrixOrientation[MatrixOrientation["REGULAR"] = 0] = "REGULAR";
    MatrixOrientation[MatrixOrientation["TRANSPOSED"] = 1] = "TRANSPOSED";
})(MatrixOrientation = exports.MatrixOrientation || (exports.MatrixOrientation = {}));
function parseTupleParam(param) {
    return typeof param === 'number' ? [param, param] : param;
}
//# sourceMappingURL=math.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(5);
var util = __webpack_require__(0);
var broadcast_util = __webpack_require__(9);
var tex_util = __webpack_require__(17);
var tex_util_1 = __webpack_require__(17);
function makeShader(inputsInfo, outputShape, userCode, broadcast) {
    var sampleSnippet = getSampleSnippet();
    var setOutputSnippet = getSetOutputSnippet();
    var inputPrefixSnippet = inputsInfo.map(function (x) { return "uniform sampler2D " + x.name + ";"; }).join('\n');
    var inputSamplingSnippet = inputsInfo.map(function (x) { return getInputSamplingSnippet(x, outputShape, broadcast); })
        .join('\n');
    var outTexShape = outputShape.texShape;
    var outputSamplingSnippet = getOutputSamplingSnippet(outputShape.logicalShape, outTexShape);
    var source = [
        SHADER_PREFIX, sampleSnippet, setOutputSnippet, inputPrefixSnippet,
        outputSamplingSnippet, inputSamplingSnippet, userCode
    ].join('\n');
    return source;
}
exports.makeShader = makeShader;
function getSampleSnippet() {
    return environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED') ?
        FLOAT_TEXTURE_SAMPLE_SNIPPET :
        UNSIGNED_BYTE_TEXTURE_SAMPLE_SNIPPET;
}
function getSetOutputSnippet() {
    return environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED') ?
        FLOAT_TEXTURE_SETOUTPUT_SNIPPET :
        UNSIGNED_BYTE_TEXTURE_SETOUTPUT_SNIPPET;
}
function getSamplerFromInInfo(inInfo) {
    var shape = inInfo.shapeInfo.logicalShape;
    switch (shape.length) {
        case 0:
            return getSamplerScalar(inInfo);
        case 1:
            return getSampler1D(inInfo);
        case 2:
            return getSampler2D(inInfo);
        case 3:
            return getSampler3D(inInfo);
        case 4:
            return getSampler4D(inInfo);
        default:
            throw new Error(shape.length + "-D input sampling" +
                " is not yet supported");
    }
}
function getInputSamplingSnippet(inInfo, outShapeInfo, broadcast) {
    var res = getSamplerFlat(inInfo);
    res += getSamplerFromInInfo(inInfo);
    if (broadcast ||
        util.arraysEqual(inInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape)) {
        res += getSamplerAtOutputCoords(inInfo, outShapeInfo, broadcast);
    }
    return res;
}
function getOutputSamplingSnippet(outShape, outTexShape) {
    switch (outShape.length) {
        case 0:
            return getOutputScalarCoords();
        case 1:
            return getOutput1DCoords(outShape, outTexShape);
        case 2:
            return getOutput2DCoords(outShape, outTexShape);
        case 3:
            return getOutput3DCoords(outShape, outTexShape);
        case 4:
            return getOutput4DCoords(outShape, outTexShape);
        default:
            throw new Error(outShape.length + "-D output sampling is not yet supported");
    }
}
var SAMPLE_1D_SNIPPET = "\nvec2 UVfrom1D(int texNumR, int texNumC, int index) {\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var SAMPLE_2D_SNIPPET = "\nvec2 UVfrom2D(int texNumR, int texNumC, int numC, int row, int col) {\n  int index = row * numC + col;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var SAMPLE_3D_SNIPPET = "\nvec2 UVfrom3D(int texNumR, int texNumC, int stride0,\n    int stride1, int row, int col, int depth) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + depth;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var SAMPLE_4D_SNIPPET = "\nvec2 UVfrom4D(int texNumR, int texNumC, int stride0,\n    int stride1, int stride2, int row, int col, int depth,\n    int depth2) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + depth * stride2 + depth2;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var UNSIGNED_BYTE_TEXTURE_SAMPLE_SNIPPET = "\n  uniform float NaN;\n\n  const vec4 floatDeltas = vec4(\n      1.0,\n      1.0 / 255.0,\n      1.0 / (255.0 * 255.0),\n      1.0 / (255.0 * 255.0 * 255.0)\n  );\n  const float minValue = " + tex_util.FLOAT_MIN + ".0;\n  const float maxValue = " + tex_util.FLOAT_MAX + ".0;\n  const float range = (maxValue - minValue) / 255.0;\n  const vec2 dotRange = vec2(1.0, range);\n\n  float sample(sampler2D texture, vec2 uv) {\n    vec4 sampleValue = texture2D(texture, uv);\n    if (all(equal(sampleValue, vec4(" + tex_util.BYTE_NAN_VALUE + ")))) {\n      return NaN;\n    }\n\n    vec4 encValue = floor(sampleValue * 255.0 + 0.5);\n    float decodedValue = dot(encValue, floatDeltas);\n    return dot(vec2(minValue, decodedValue), dotRange);\n  }\n";
var UNSIGNED_BYTE_TEXTURE_SETOUTPUT_SNIPPET = "\n  const vec4 floatPowers = vec4(\n    1.0,\n    255.0,\n    255.0 * 255.0,\n    255.0 * 255.0 * 255.0\n  );\n  const vec2 recipRange = vec2(1.0/range);\n  const vec2 recipRange255 = vec2(1.0/(maxValue - minValue));\n\n  void setOutput(float decodedValue) {\n    if (isNaN(decodedValue)) {\n      gl_FragColor = vec4(" + tex_util.BYTE_NAN_VALUE + ");\n      return;\n    }\n\n    float a = dot(vec2(decodedValue, -minValue), recipRange);\n    float b = fract(a) * 255.0;\n    float c = fract(b) * 255.0;\n    float d = fract(c) * 255.0;\n    gl_FragColor = floor(vec4(a, b, c, d)) / 255.0;\n\n    // TODO(dsmilkov): Version above gets better accuracy but probably slower\n    // than the version below. Benchmark to determine if the accuracy is worth\n    // the cost.\n\n    // float normValue = dot(vec2(decodedValue, -minValue), recipRange255);\n    // vec4 f = normValue * floatPowers;\n    // gl_FragColor = floor(fract(f) * 255.0) / 255.0;\n  }\n";
var FLOAT_TEXTURE_SAMPLE_SNIPPET = "\n  float sample(sampler2D texture, vec2 uv) {\n    return texture2D(texture, uv).r;\n  }\n";
var FLOAT_TEXTURE_SETOUTPUT_SNIPPET = "\n  void setOutput(float val) {\n    gl_FragColor = vec4(val, 0, 0, 0);\n  }\n";
var SHADER_PREFIX = "\n  precision highp float;\n  precision highp int;\n  varying vec2 resultUV;\n  const vec2 halfCR = vec2(0.5, 0.5);\n\n  bool isNaN(float val) {\n    return val == val ? false : true;\n  }\n\n  bool hasNaN(vec4 values) {\n    return any(notEqual(values, values));\n  }\n\n  float getNaN(vec4 values) {\n    return dot(vec4(1), values);\n  }\n\n  int round(float value) {\n    return int(floor(value + 0.5));\n  }\n\n  int imod(int x, int y) {\n    return x - y * (x / y);\n  }\n\n  const vec2 randomConst = vec2(\n    23.14069263277926, // e^pi (Gelfond's constant)\n     2.665144142690225 // 2^sqrt(2) (Gelfond\u2013Schneider constant)\n  );\n\n  float random(float seed) {\n      return fract(cos(dot(resultUV * seed, randomConst)) * 12345.6789);\n  }\n\n  float sampleUVAndDepth(sampler2D texture, vec2 uv, int depth) {\n    float value;\n    if (depth == 0) {\n      value = texture2D(texture, uv).r;\n    } else if (depth == 1) {\n      value = texture2D(texture, uv).g;\n    } else if (depth == 2) {\n      value = texture2D(texture, uv).b;\n    } else if (depth == 3) {\n      value = texture2D(texture, uv).a;\n    }\n    return floor(value * 255.0 + 0.5);\n  }\n\n  " + SAMPLE_1D_SNIPPET + "\n  " + SAMPLE_2D_SNIPPET + "\n  " + SAMPLE_3D_SNIPPET + "\n  " + SAMPLE_4D_SNIPPET + "\n";
function getOutputScalarCoords() {
    return "\n    int getOutputCoords() {\n      return 0;\n    }\n  ";
}
function getOutput1DCoords(shape, texShape) {
    if (texShape[0] === 1) {
        return "\n      int getOutputCoords() {\n        return int(resultUV.x * " + texShape[1] + ".0);\n      }\n    ";
    }
    if (texShape[1] === 1) {
        return "\n      int getOutputCoords() {\n        return int(resultUV.y * " + texShape[0] + ".0);\n      }\n    ";
    }
    return "\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      return resTexRC.x * " + texShape[1] + " + resTexRC.y;\n    }\n  ";
}
function getOutput3DCoords(shape, texShape) {
    var stride0 = shape[1] * shape[2];
    var stride1 = shape[2];
    return "\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n      int r = index / " + stride0 + ";\n      index -= r * " + stride0 + ";\n      int c = index / " + stride1 + ";\n      int d = index - c * " + stride1 + ";\n      return ivec3(r, c, d);\n    }\n  ";
}
function getOutput4DCoords(shape, texShape) {
    var stride2 = shape[3];
    var stride1 = shape[2] * stride2;
    var stride0 = shape[1] * stride1;
    return "\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n\n      int r = index / " + stride0 + ";\n      index -= r * " + stride0 + ";\n\n      int c = index / " + stride1 + ";\n      index -= c * " + stride1 + ";\n\n      int d = index / " + stride2 + ";\n      int d2 = index - d * " + stride2 + ";\n\n      return ivec4(r, c, d, d2);\n    }\n  ";
}
function getOutput2DCoords(shape, texShape) {
    if (util.arraysEqual(shape, texShape)) {
        return "\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2(" + texShape[0] + ", " + texShape[1] + "));\n      }\n    ";
    }
    if (shape[1] === 1) {
        return "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + texShape[0] + ", " + texShape[1] + "));\n        int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    ";
    }
    if (shape[0] === 1) {
        return "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + texShape[0] + ", " + texShape[1] + "));\n        int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n        return ivec2(0, index);\n      }\n    ";
    }
    return "\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n      int r = index / " + shape[1] + ";\n      int c = index - r * " + shape[1] + ";\n      return ivec2(r, c);\n    }\n  ";
}
function getSamplerScalar(inputInfo) {
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    return "\n    float " + funcName + "() {\n      return sample(" + texName + ", halfCR);\n    }\n  ";
}
function getSampler1D(inputInfo) {
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    return "\n    float " + funcName + "(int index) {\n      return " + funcName + "Flat(index);\n    }\n  ";
}
function getSampler2D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texShape = inputInfo.shapeInfo.texShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    if (util.arraysEqual(shape, texShape)) {
        return "\n    float " + funcName + "(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2(" + texNumC + ".0, " + texNumR + ".0);\n      return sample(" + texName + ", uv);\n    }\n  ";
    }
    var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
    var squeezedShape = newShape;
    if (squeezedShape.length < shape.length) {
        var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
        var params = ['row', 'col'];
        return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
    }
    if (texNumC === 1) {
        return "\n    float " + funcName + "(int row, int col) {\n      int index = row * " + shape[1] + " + col;\n      vec2 uv = vec2(0.5, (float(index) + 0.5) / " + texNumR + ".0);\n      return sample(" + texName + ", uv);\n    }\n  ";
    }
    if (texNumR === 1) {
        return "\n    float " + funcName + "(int row, int col) {\n      int index = row * " + shape[1] + " + col;\n      vec2 uv = vec2((float(index) + 0.5) / " + texNumC + ".0, 0.5);\n      return sample(" + texName + ", uv);\n    }\n  ";
    }
    return "\n  float " + funcName + "(int row, int col) {\n    vec2 uv = UVfrom2D(" + texNumR + ", " + texNumC + ", " + shape[1] + ", row, col);\n    return sample(" + texName + ", uv);\n  }\n";
}
function getSampler3D(inputInfo) {
    var texShape = inputInfo.shapeInfo.texShape;
    var shape = inputInfo.shapeInfo.logicalShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    var stride0 = shape[1] * shape[2];
    var stride1 = shape[2];
    var texType = inputInfo.shapeInfo.textureType;
    if (texType === tex_util_1.TextureType.DEFAULT) {
        var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
        var squeezedShape = newShape;
        if (squeezedShape.length < shape.length) {
            var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
            var params = ['row', 'col', 'depth'];
            return "\n        " + getSamplerFromInInfo(newInputInfo) + "\n        float " + funcName + "(int row, int col, int depth) {\n          return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n        }\n      ";
        }
    }
    if (texNumC === stride0) {
        if (texType === tex_util_1.TextureType.DEFAULT) {
            return "\n        float " + funcName + "(int row, int col, int depth) {\n          int texR = row;\n          int texC = col * " + stride1 + " + depth;\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2(" + texNumC + ".0, " + texNumR + ".0);\n          return sample(" + texName + ", uv);\n        }\n      ";
        }
        else if (texType === tex_util_1.TextureType.RGBA_COLOR) {
            return "\n        float " + funcName + "(int row, int col, int depth) {\n          vec2 uv = (vec2(col, row) + halfCR) /\n                     vec2(" + texNumC + ".0, " + texNumR + ".0);\n          return sampleUVAndDepth(" + texName + ", uv, depth);\n        }\n      ";
        }
        else {
            throw new Error("Unknown TextureType " + texType + ".");
        }
    }
    if (texNumC === stride1 && texType === tex_util_1.TextureType.DEFAULT) {
        return "\n    float " + funcName + "(int row, int col, int depth) {\n      int texR = row * " + shape[1] + " + col;\n      int texC = depth;\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + texNumC + ".0, " + texNumR + ".0);\n      return sample(" + texName + ", uv);\n    }\n  ";
    }
    if (texType === tex_util_1.TextureType.DEFAULT) {
        return "\n      float " + funcName + "(int row, int col, int depth) {\n        vec2 uv = UVfrom3D(\n            " + texNumR + ", " + texNumC + ", " + stride0 + ", " + stride1 + ", row, col, depth);\n        return sample(" + texName + ", uv);\n      }\n  ";
    }
    else if (texType === tex_util_1.TextureType.RGBA_COLOR) {
        return "\n      float " + funcName + "(int row, int col, int depth) {\n        vec2 uv = UVfrom2D(" + texNumR + ", " + texNumC + ", " + shape[1] + ", row, col);\n        return sampleUVAndDepth(" + texName + ", uv, depth);\n      }\n    ";
    }
    else {
        throw new Error("Unknown TextureType " + texType + ".");
    }
}
function getSampler4D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texShape = inputInfo.shapeInfo.texShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    var stride2 = shape[3];
    var stride1 = shape[2] * stride2;
    var stride0 = shape[1] * stride1;
    var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
    if (newShape.length < shape.length) {
        var newInputInfo = squeezeInputInfo(inputInfo, newShape);
        var params = ['row', 'col', 'depth', 'depth2'];
        return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
    }
    if (texNumC === stride0) {
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        int texR = row;\n        int texC = col * " + stride1 + " + depth * " + stride2 + " + depth2;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sample(" + texName + ", uv);\n      }\n    ";
    }
    if (texNumC === stride2) {
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        int texR = row * " + shape[1] * shape[2] + " + col * " + shape[2] + " + depth;\n        int texC = depth2;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sample(" + texName + ", uv);\n      }\n    ";
    }
    return "\n    float " + funcName + "(int row, int col, int depth, int depth2) {\n      vec2 uv = UVfrom4D(" + texNumR + ", " + texNumC + ", " + stride0 + ", " + stride1 + ",\n          " + stride2 + ", row, col, depth, depth2);\n      return sample(" + texName + ", uv);\n    }\n  ";
}
function getSamplerFlat(inputInfo) {
    var texName = inputInfo.name;
    var texShape = inputInfo.shapeInfo.texShape;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1) + 'Flat';
    var tNumR = texShape[0];
    var tNumC = texShape[1];
    if (tNumC === 1 && tNumR === 1) {
        return "\n      float " + funcName + "(int index) {\n        return sample(" + texName + ", halfCR);\n      }\n    ";
    }
    if (tNumC === 1) {
        return "\n      float " + funcName + "(int index) {\n        vec2 uv = vec2(0.5, (float(index) + 0.5) / " + tNumR + ".0);\n        return sample(" + texName + ", uv);\n      }\n    ";
    }
    if (tNumR === 1) {
        return "\n      float " + funcName + "(int index) {\n        vec2 uv = vec2((float(index) + 0.5) / " + tNumC + ".0, 0.5);\n        return sample(" + texName + ", uv);\n      }\n    ";
    }
    return "\n    float " + funcName + "(int index) {\n      vec2 uv = UVfrom1D(" + tNumR + ", " + tNumC + ", index);\n      return sample(" + texName + ", uv);\n    }\n  ";
}
function getBroadcastOutputCoordsSampler(inputInfo, outShapeInfo, texFuncSnippet, funcName) {
    var inRank = inputInfo.shapeInfo.logicalShape.length;
    var outRank = outShapeInfo.logicalShape.length;
    var type = 'int';
    if (outRank === 2) {
        type = 'ivec2';
    }
    else if (outRank === 3) {
        type = 'ivec3';
    }
    else if (outRank === 4) {
        type = 'ivec4';
    }
    var broadcastDims = broadcast_util.getBroadcastDims(inputInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape);
    var rankDiff = outRank - inRank;
    var coordsSnippet;
    if (inRank === 0) {
        coordsSnippet = '';
    }
    else if (outRank < 2 && broadcastDims.length >= 1) {
        coordsSnippet = 'coords = 0;';
    }
    else {
        coordsSnippet =
            broadcastDims.map(function (d) { return "coords[" + (d + rankDiff) + "] = 0;"; }).join('\n');
    }
    var unpackedCoordsSnippet = '';
    if (outRank < 2 && inRank > 0) {
        unpackedCoordsSnippet = 'coords';
    }
    else {
        unpackedCoordsSnippet = inputInfo.shapeInfo.logicalShape
            .map(function (s, i) { return "coords[" + (i + rankDiff) + "]"; })
            .join(', ');
    }
    return "\n    float " + funcName + "() {\n      " + type + " coords = getOutputCoords();\n      " + coordsSnippet + "\n      return get" + texFuncSnippet + "(" + unpackedCoordsSnippet + ");\n    }\n  ";
}
function getSamplerAtOutputCoords(inputInfo, outShapeInfo, supportsBroadcasting) {
    var inTexShape = inputInfo.shapeInfo.texShape;
    var texName = inputInfo.name;
    var isRGBAColorTexture = inputInfo.shapeInfo.textureType === tex_util_1.TextureType.RGBA_COLOR;
    var texFuncSnippet = texName.charAt(0).toUpperCase() + texName.slice(1);
    var funcName = 'get' + texFuncSnippet + 'AtOutCoords';
    var broadcastDims = broadcast_util.getBroadcastDims(inputInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape);
    var inRank = inputInfo.shapeInfo.logicalShape.length;
    var outRank = outShapeInfo.logicalShape.length;
    var doBroadcast = supportsBroadcasting && ((outRank > inRank) || broadcastDims.length > 0);
    var broadcastOverOuter = broadcast_util.broadcastDimsAreOuter(broadcastDims);
    if (doBroadcast && !broadcastOverOuter) {
        return getBroadcastOutputCoordsSampler(inputInfo, outShapeInfo, texFuncSnippet, funcName);
    }
    var outTexShape = outShapeInfo.texShape;
    if (util.arraysEqual(inTexShape, outTexShape) && !isRGBAColorTexture) {
        return "\n      float " + funcName + "() {\n        return sample(" + texName + ", resultUV);\n      }\n    ";
    }
    var inTexExpandedShape = isRGBAColorTexture ?
        [inTexShape[0], inTexShape[1] * inputInfo.shapeInfo.logicalShape[2]] :
        inTexShape;
    var sampleSnippet = "return sample(" + texName + ", uv);";
    var rgbaColorSnippet = '';
    if (isRGBAColorTexture) {
        rgbaColorSnippet = "\n      int col = texC / " + inputInfo.shapeInfo.logicalShape[2] + ";\n      int texD = texC - col * " + inputInfo.shapeInfo.logicalShape[2] + ";\n      texC = col;\n    ";
        sampleSnippet = "return sampleUVAndDepth(" + texName + ", uv, texD);";
    }
    var inSize = util.sizeFromShape(inTexExpandedShape);
    var broadcastSnippet = '';
    if (doBroadcast && broadcastOverOuter) {
        broadcastSnippet = "\n        int mainPart = index / " + inSize + ";\n        index -= mainPart * " + inSize + ";\n      ";
    }
    return "\n    float " + funcName + "() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + outTexShape[0] + ", " + outTexShape[1] + "));\n      int index = resTexRC.x * " + outTexShape[1] + " + resTexRC.y;\n      " + broadcastSnippet + "\n      int texR = index / " + inTexExpandedShape[1] + ";\n      int texC = index - texR * " + inTexExpandedShape[1] + ";\n\n      " + rgbaColorSnippet + "\n\n      vec2 uv = (vec2(texC, texR) + halfCR) /\n                 vec2(" + inTexShape[1] + ".0, " + inTexShape[0] + ".0);\n\n      " + sampleSnippet + "\n    }\n  ";
}
function getCoordsDataType(rank) {
    if (rank === 1) {
        return 'int';
    }
    else if (rank === 2) {
        return 'ivec2';
    }
    else if (rank === 3) {
        return 'ivec3';
    }
    else if (rank === 4) {
        return 'ivec4';
    }
    else {
        throw Error("GPU for rank " + rank + " is not yet supported");
    }
}
exports.getCoordsDataType = getCoordsDataType;
function squeezeInputInfo(inInfo, squeezedShape) {
    var newInputInfo = JSON.parse(JSON.stringify(inInfo));
    newInputInfo.shapeInfo.logicalShape = squeezedShape;
    return newInputInfo;
}
function getSqueezedParams(params, keptDims) {
    return keptDims.map(function (d) { return params[d]; }).join(', ');
}
//# sourceMappingURL=shader_compiler.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TextureType;
(function (TextureType) {
    TextureType[TextureType["DEFAULT"] = 0] = "DEFAULT";
    TextureType[TextureType["RGBA_COLOR"] = 1] = "RGBA_COLOR";
})(TextureType = exports.TextureType || (exports.TextureType = {}));
function getUnpackedMatrixTextureShapeWidthHeight(rows, columns) {
    return [columns, rows];
}
exports.getUnpackedMatrixTextureShapeWidthHeight = getUnpackedMatrixTextureShapeWidthHeight;
function getUnpackedArraySizeFromMatrixSize(matrixSize, channelsPerTexture) {
    return matrixSize * channelsPerTexture;
}
exports.getUnpackedArraySizeFromMatrixSize = getUnpackedArraySizeFromMatrixSize;
function getColorMatrixTextureShapeWidthHeight(rows, columns) {
    return [columns * 4, rows];
}
exports.getColorMatrixTextureShapeWidthHeight = getColorMatrixTextureShapeWidthHeight;
function getMatrixSizeFromUnpackedArraySize(unpackedSize, channelsPerTexture) {
    if (unpackedSize % channelsPerTexture !== 0) {
        throw new Error("unpackedSize (" + unpackedSize + ") must be a multiple of " +
            ("" + channelsPerTexture));
    }
    return unpackedSize / channelsPerTexture;
}
exports.getMatrixSizeFromUnpackedArraySize = getMatrixSizeFromUnpackedArraySize;
function encodeMatrixToUnpackedArray(matrix, unpackedArray, channelsPerTexture) {
    var requiredSize = getUnpackedArraySizeFromMatrixSize(matrix.length, channelsPerTexture);
    if (unpackedArray.length < requiredSize) {
        throw new Error("unpackedArray length (" + unpackedArray.length + ") must be >= " +
            ("" + requiredSize));
    }
    var dst = 0;
    for (var src = 0; src < matrix.length; ++src) {
        unpackedArray[dst] = matrix[src];
        dst += channelsPerTexture;
    }
}
exports.encodeMatrixToUnpackedArray = encodeMatrixToUnpackedArray;
exports.FLOAT_MAX = 20000;
exports.FLOAT_MIN = -exports.FLOAT_MAX;
var FLOAT_RANGE = (exports.FLOAT_MAX - exports.FLOAT_MIN) / 255;
var FLOAT_DELTAS = [1, 1 / 255, 1 / (255 * 255), 1 / (255 * 255 * 255)];
var FLOAT_POWERS = [1, 255, 255 * 255];
exports.BYTE_NAN_VALUE = 0;
function encodeFloatArray(floatArray) {
    var uintArray = new Uint8Array(floatArray.length * 4);
    var _loop_1 = function (i) {
        var value = floatArray[i / 4];
        if (isNaN(value)) {
            uintArray[i] = exports.BYTE_NAN_VALUE;
            uintArray[i + 1] = exports.BYTE_NAN_VALUE;
            uintArray[i + 2] = exports.BYTE_NAN_VALUE;
            uintArray[i + 3] = exports.BYTE_NAN_VALUE;
            return "continue";
        }
        var normalizedValue = (value - exports.FLOAT_MIN) / FLOAT_RANGE;
        var enc = FLOAT_POWERS.map(function (pow) { return pow * normalizedValue; });
        var buckets = enc.map(function (value) { return Math.floor((value % 1) * 255); });
        uintArray[i] = Math.floor(normalizedValue);
        uintArray[i + 1] = buckets[0];
        uintArray[i + 2] = buckets[1];
        uintArray[i + 3] = buckets[2];
    };
    for (var i = 0; i < uintArray.length; i += 4) {
        _loop_1(i);
    }
    return uintArray;
}
exports.encodeFloatArray = encodeFloatArray;
function decodeToFloatArray(uintArray) {
    var floatArray = new Float32Array(uintArray.length / 4);
    var _loop_2 = function (i) {
        if (uintArray[i] === exports.BYTE_NAN_VALUE &&
            uintArray[i + 1] === exports.BYTE_NAN_VALUE &&
            uintArray[i + 2] === exports.BYTE_NAN_VALUE &&
            uintArray[i + 3] === exports.BYTE_NAN_VALUE) {
            floatArray[i / 4] = NaN;
            return "continue";
        }
        var dot = 0;
        FLOAT_DELTAS.forEach(function (delta, j) {
            dot += delta * uintArray[i + j];
        });
        var value = dot * FLOAT_RANGE + exports.FLOAT_MIN;
        floatArray[i / 4] = value;
    };
    for (var i = 0; i < uintArray.length; i += 4) {
        _loop_2(i);
    }
    return floatArray;
}
exports.decodeToFloatArray = decodeToFloatArray;
function decodeMatrixFromUnpackedArray(unpackedArray, matrix, channelsPerTexture) {
    var requiredSize = getMatrixSizeFromUnpackedArraySize(unpackedArray.length, channelsPerTexture);
    if (matrix.length < requiredSize) {
        throw new Error("matrix length (" + matrix.length + ") must be >= " + requiredSize);
    }
    var dst = 0;
    for (var src = 0; src < unpackedArray.length; src += channelsPerTexture) {
        matrix[dst++] = unpackedArray[src];
    }
}
exports.decodeMatrixFromUnpackedArray = decodeMatrixFromUnpackedArray;
function decodeMatrixFromUnpackedColorRGBAArray(unpackedArray, matrix, channels) {
    var requiredSize = unpackedArray.length * channels / 4;
    if (matrix.length < requiredSize) {
        throw new Error("matrix length (" + matrix.length + ") must be >= " + requiredSize);
    }
    var dst = 0;
    for (var src = 0; src < unpackedArray.length; src += 4) {
        for (var c = 0; c < channels; c++) {
            matrix[dst++] = unpackedArray[src + c];
        }
    }
}
exports.decodeMatrixFromUnpackedColorRGBAArray = decodeMatrixFromUnpackedColorRGBAArray;
function getPackedMatrixTextureShapeWidthHeight(rows, columns) {
    return [Math.ceil(columns / 2), Math.ceil(rows / 2)];
}
exports.getPackedMatrixTextureShapeWidthHeight = getPackedMatrixTextureShapeWidthHeight;
function getPackedRGBAArraySizeFromMatrixShape(rows, columns) {
    var _a = getPackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    return w * h * 4;
}
exports.getPackedRGBAArraySizeFromMatrixShape = getPackedRGBAArraySizeFromMatrixShape;
function encodeMatrixToPackedRGBA(matrix, rows, columns, packedRGBA) {
    var requiredSize = getPackedRGBAArraySizeFromMatrixShape(rows, columns);
    if (packedRGBA.length < requiredSize) {
        throw new Error("packedRGBA length (" + packedRGBA.length + ") must be >= " + requiredSize);
    }
    var _a = getPackedMatrixTextureShapeWidthHeight(rows, columns), textureWidth = _a[0], textureHeight = _a[1];
    var oddWidth = (columns % 2) === 1;
    var oddHeight = (rows % 2) === 1;
    var widthInFullBlocks = Math.floor(columns / 2);
    var heightInFullBlocks = Math.floor(rows / 2);
    {
        var dstStride = (oddWidth ? 4 : 0);
        var oneRow = columns;
        var dst = 0;
        for (var blockY = 0; blockY < heightInFullBlocks; ++blockY) {
            var matrixSrcRow = (blockY * 2 * columns);
            for (var blockX = 0; blockX < widthInFullBlocks; ++blockX) {
                var matrixSrcCol = blockX * 2;
                var src = matrixSrcRow + matrixSrcCol;
                packedRGBA[dst] = matrix[src];
                packedRGBA[dst + 1] = matrix[src + 1];
                packedRGBA[dst + 2] = matrix[src + oneRow];
                packedRGBA[dst + 3] = matrix[src + oneRow + 1];
                dst += 4;
            }
            dst += dstStride;
        }
    }
    if (oddWidth) {
        var src = columns - 1;
        var dst = (textureWidth - 1) * 4;
        var srcStride = 2 * columns;
        var dstStride = textureWidth * 4;
        for (var blockY = 0; blockY < heightInFullBlocks; ++blockY) {
            packedRGBA[dst] = matrix[src];
            packedRGBA[dst + 2] = matrix[src + columns];
            src += srcStride;
            dst += dstStride;
        }
    }
    if (oddHeight) {
        var src = (rows - 1) * columns;
        var dst = (textureHeight - 1) * textureWidth * 4;
        for (var blockX = 0; blockX < widthInFullBlocks; ++blockX) {
            packedRGBA[dst++] = matrix[src++];
            packedRGBA[dst++] = matrix[src++];
            dst += 2;
        }
    }
    if (oddWidth && oddHeight) {
        packedRGBA[packedRGBA.length - 4] = matrix[matrix.length - 1];
    }
    return packedRGBA;
}
exports.encodeMatrixToPackedRGBA = encodeMatrixToPackedRGBA;
function decodeMatrixFromPackedRGBA(packedRGBA, rows, columns, matrix) {
    var requiredSize = rows * columns;
    if (requiredSize < matrix.length) {
        throw new Error("matrix length (" + matrix.length + ") must be >= " + requiredSize);
    }
    var oddWidth = (columns % 2) === 1;
    var oddHeight = (rows % 2) === 1;
    var widthInFullBlocks = Math.floor(columns / 2);
    var heightInFullBlocks = Math.floor(rows / 2);
    var _a = getPackedMatrixTextureShapeWidthHeight(rows, columns), textureWidth = _a[0], textureHeight = _a[1];
    {
        var srcStride = oddWidth ? 4 : 0;
        var dstStride = columns + (oddWidth ? 1 : 0);
        var src = 0;
        var dstRow1 = 0;
        var dstRow2 = columns;
        for (var blockY = 0; blockY < heightInFullBlocks; ++blockY) {
            for (var blockX = 0; blockX < widthInFullBlocks; ++blockX) {
                matrix[dstRow1++] = packedRGBA[src++];
                matrix[dstRow1++] = packedRGBA[src++];
                matrix[dstRow2++] = packedRGBA[src++];
                matrix[dstRow2++] = packedRGBA[src++];
            }
            src += srcStride;
            dstRow1 += dstStride;
            dstRow2 += dstStride;
        }
    }
    if (oddWidth) {
        var src = (textureWidth - 1) * 4;
        var dst = columns - 1;
        var srcStride = textureWidth * 4;
        var dstStride = 2 * columns;
        for (var blockY = 0; blockY < heightInFullBlocks; ++blockY) {
            matrix[dst] = packedRGBA[src];
            matrix[dst + columns] = packedRGBA[src + 2];
            src += srcStride;
            dst += dstStride;
        }
    }
    if (oddHeight) {
        var src = (textureHeight - 1) * textureWidth * 4;
        var dst = (rows - 1) * columns;
        for (var blockX = 0; blockX < widthInFullBlocks; ++blockX) {
            matrix[dst++] = packedRGBA[src++];
            matrix[dst++] = packedRGBA[src++];
            src += 2;
        }
    }
    if (oddWidth && oddHeight) {
        matrix[matrix.length - 1] = packedRGBA[packedRGBA.length - 4];
    }
    return matrix;
}
exports.decodeMatrixFromPackedRGBA = decodeMatrixFromPackedRGBA;
//# sourceMappingURL=tex_util.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kissfft_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kissfft_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kissfft_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dct__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dct___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dct__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


const SR = 44100;
let melFilterbank = null;
let context = null;
class AudioUtils {
    static loadExampleBuffer() {
        return AudioUtils.loadBuffer('assets/spoken_command_example.wav');
    }
    static loadSineBuffer() {
        return AudioUtils.loadBuffer('assets/sine_100ms_example.wav');
    }
    static loadBuffer(url) {
        if (!context) {
            context = new AudioContext();
        }
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            // Load an example of speech being spoken.
            xhr.open('GET', url);
            xhr.onload = () => {
                context.decodeAudioData(xhr.response, buffer => {
                    resolve(buffer);
                });
            };
            xhr.responseType = 'arraybuffer';
            xhr.onerror = (err) => reject(err);
            xhr.send();
        });
    }
    static loadBufferOffline(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const offlineCtx = new OfflineAudioContext(1, 16000, 16000);
            return fetch(url).then(body => body.arrayBuffer())
                .then(buffer => offlineCtx.decodeAudioData(buffer));
        });
    }
    /**
     * Calculates the FFT for an array buffer. Output is an array.
     */
    static fft(y) {
        const fftr = new __WEBPACK_IMPORTED_MODULE_0_kissfft_js__["FFTR"](y.length);
        const transform = fftr.forward(y);
        fftr.dispose();
        return transform;
    }
    static dct(y) {
        return __WEBPACK_IMPORTED_MODULE_1_dct__(y);
    }
    /**
     * Calculates the STFT, given a fft size, and a hop size. For example, if fft
     * size is 2048 and hop size is 1024, there will be 50% overlap. Given those
     * params, if the input sample has 4096 values, there would be 3 analysis
     * frames: [0, 2048], [1024, 3072], [2048, 4096].
     */
    static stft(y, fftSize = 2048, hopSize = fftSize) {
        // Split the input buffer into sub-buffers of size fftSize.
        const bufferCount = Math.floor((y.length - fftSize) / hopSize) + 1;
        let matrix = range(bufferCount).map(x => new Float32Array(fftSize));
        for (let i = 0; i < bufferCount; i++) {
            const ind = i * hopSize;
            const buffer = y.slice(ind, ind + fftSize);
            // In the end, we will likely have an incomplete buffer, which we should
            // just ignore.
            if (buffer.length != fftSize) {
                continue;
            }
            const win = AudioUtils.hannWindow(buffer.length);
            const winBuffer = AudioUtils.applyWindow(buffer, win);
            const fft = AudioUtils.fft(winBuffer);
            // TODO: Understand why fft output is 2 larger than expected (eg. 1026
            // rather than 1024).
            matrix[i].set(fft.slice(0, fftSize));
        }
        return matrix;
    }
    /**
     * Given STFT energies, calculates the mel spectrogram.
     */
    static melSpectrogram(stftEnergies, melCount = 20, lowHz = 300, highHz = 8000, sr = SR) {
        this.lazyCreateMelFilterbank(stftEnergies[0].length, melCount, lowHz, highHz, sr);
        // For each fft slice, calculate the corresponding mel values.
        const out = [];
        for (let i = 0; i < stftEnergies.length; i++) {
            out[i] = AudioUtils.applyFilterbank(stftEnergies[i], melFilterbank);
        }
        return out;
    }
    /**
     * Given STFT energies, calculates the MFCC spectrogram.
     */
    static mfccSpectrogram(stftEnergies, melCount = 20) {
        // For each fft slice, calculate the corresponding MFCC values.
        const out = [];
        for (let i = 0; i < stftEnergies.length; i++) {
            out[i] = this.mfcc(stftEnergies[i], melCount);
        }
        return out;
    }
    static lazyCreateMelFilterbank(length, melCount = 20, lowHz = 300, highHz = 8000, sr = SR) {
        // Lazy-create a Mel filterbank.
        if (!melFilterbank || melFilterbank.length != length) {
            melFilterbank = this.createMelFilterbank(length, melCount, lowHz, highHz, sr);
        }
    }
    /**
     * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
     * calculates the magnitudes. Output is half the size.
     */
    static fftMags(y) {
        let out = new Float32Array(y.length / 2);
        for (let i = 0; i < y.length / 2; i++) {
            out[i] = Math.hypot(y[i * 2], y[i * 2 + 1]);
        }
        return out;
    }
    /**
     * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
     * calculates the energies. Output is half the size.
     */
    static fftEnergies(y) {
        let out = new Float32Array(y.length / 2);
        for (let i = 0; i < y.length / 2; i++) {
            out[i] = y[i * 2] * y[i * 2] + y[i * 2 + 1] * y[i * 2 + 1];
        }
        return out;
    }
    /**
     * Generates a Hann window of a given length.
     */
    static hannWindow(length) {
        let win = new Float32Array(length);
        for (let i = 0; i < length; i++) {
            win[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
        }
        return win;
    }
    /**
     * Applies a window to a buffer (point-wise multiplication).
     */
    static applyWindow(buffer, win) {
        if (buffer.length != win.length) {
            console.error(`Buffer length ${buffer.length} != window length
        ${win.length}.`);
            return;
        }
        let out = new Float32Array(buffer.length);
        for (let i = 0; i < buffer.length; i++) {
            out[i] = win[i] * buffer[i];
        }
        return out;
    }
    static pointWiseMultiply(out, array1, array2) {
        if (out.length != array1.length || array1.length != array2.length) {
            console.error(`Output length ${out.length} != array1 length
        ${array1.length} != array2 length ${array2.length}.`);
            return;
        }
        for (let i = 0; i < out.length; i++) {
            out[i] = array1[i] * array2[i];
        }
        return out;
    }
    static createMelFilterbank(fftSize, melCount = 20, lowHz = 300, highHz = 8000, sr = SR) {
        const lowMel = this.hzToMel(lowHz);
        const highMel = this.hzToMel(highHz);
        // Construct linearly spaced array of melCount intervals, between lowMel and
        // highMel.
        const mels = linearSpace(lowMel, highMel, melCount + 2);
        // Convert from mels to hz.
        const hzs = mels.map(mel => this.melToHz(mel));
        // Go from hz to the corresponding bin in the FFT.
        const bins = hzs.map(hz => this.freqToBin(hz, fftSize));
        // Now that we have the start and end frequencies, create each triangular
        // window (each value in [0, 1]) that we will apply to an FFT later. These
        // are mostly sparse, except for the values of the triangle
        const length = bins.length - 2;
        const filters = [];
        for (let i = 0; i < length; i++) {
            // Now generate the triangles themselves.
            filters[i] = this.triangleWindow(fftSize, bins[i], bins[i + 1], bins[i + 2]);
        }
        return filters;
    }
    /**
     * Given an array of FFT magnitudes, apply a filterbank. Output should be an
     * array with size |filterbank|.
     */
    static applyFilterbank(fftEnergies, filterbank) {
        if (fftEnergies.length != filterbank[0].length) {
            console.error(`Each entry in filterbank should have dimensions matching
        FFT. |FFT| = ${fftEnergies.length}, |filterbank[0]| = ${filterbank[0].length}.`);
            return;
        }
        // Apply each filter to the whole FFT signal to get one value.
        let out = new Float32Array(filterbank.length);
        for (let i = 0; i < filterbank.length; i++) {
            // To calculate filterbank energies we multiply each filterbank with the
            // power spectrum.
            const win = AudioUtils.applyWindow(fftEnergies, filterbank[i]);
            // Then add up the coefficents, and take the log.
            out[i] = logGtZero(sum(win));
        }
        return out;
    }
    static hzToMel(hz) {
        return 1125 * Math.log(1 + hz / 700);
    }
    static melToHz(mel) {
        return 700 * (Math.exp(mel / 1125) - 1);
    }
    static freqToBin(freq, fftSize, sr = SR) {
        return Math.floor((fftSize + 1) * freq / (sr / 2));
    }
    /**
     * Creates a triangular window.
     */
    static triangleWindow(length, startIndex, peakIndex, endIndex) {
        const win = new Float32Array(length);
        const deltaUp = 1.0 / (peakIndex - startIndex);
        for (let i = startIndex; i < peakIndex; i++) {
            // Linear ramp up between start and peak index (values from 0 to 1).
            win[i] = (i - startIndex) * deltaUp;
        }
        const deltaDown = 1.0 / (endIndex - peakIndex);
        for (let i = peakIndex; i < endIndex; i++) {
            // Linear ramp down between peak and end index (values from 1 to 0).
            win[i] = 1 - (i - peakIndex) * deltaDown;
        }
        return win;
    }
    static cepstrumFromEnergySpectrum(melEnergies) {
        return this.dct(melEnergies);
    }
    /**
     * Calculate MFC coefficients from FFT energies.
     */
    static mfcc(fftEnergies, melCount = 20, lowHz = 300, highHz = 8000, sr = SR) {
        this.lazyCreateMelFilterbank(fftEnergies.length, melCount, lowHz, highHz, sr);
        // Apply the mel filterbank to the FFT magnitudes.
        const melEnergies = this.applyFilterbank(fftEnergies, melFilterbank);
        // Go from mel coefficients to MFCC.
        return this.cepstrumFromEnergySpectrum(melEnergies);
    }
    static normalizeSpecInPlace(spec, normMin = 0, normMax = 1) {
        let min = Infinity;
        let max = -Infinity;
        const times = spec.length;
        const freqs = spec[0].length;
        for (let i = 0; i < times; i++) {
            for (let j = 0; j < freqs; j++) {
                const val = spec[i][j];
                if (val < min) {
                    min = val;
                }
                if (val > max) {
                    max = val;
                }
            }
        }
        const scale = (normMax - normMin) / (max - min);
        const offset = normMin - min;
        for (let i = 0; i < times; i++) {
            for (let j = 0; j < freqs; j++) {
                // Get a normalized value in [0, 1].
                const norm = (spec[i][j] - min) / (max - min);
                // Then convert it to the desired range.
                spec[i][j] = normMin + norm * (normMax - normMin);
            }
        }
    }
    static playbackArrayBuffer(buffer, sampleRate) {
        if (!context) {
            context = new AudioContext();
        }
        if (!sampleRate) {
            sampleRate = context.sampleRate;
        }
        const audioBuffer = context.createBuffer(1, buffer.length, sampleRate);
        const audioBufferData = audioBuffer.getChannelData(0);
        audioBufferData.set(buffer);
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.start();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AudioUtils;

function linearSpace(start, end, count) {
    const delta = (end - start) / (count + 1);
    let out = [];
    for (let i = 0; i < count; i++) {
        out[i] = start + delta * i;
    }
    return out;
}
function sum(array) {
    return array.reduce(function (a, b) { return a + b; });
}
function range(count) {
    let out = [];
    for (let i = 0; i < count; i++) {
        out.push(i);
    }
    return out;
}
// Use a lower minimum value for energy.
const MIN_VAL = -10;
function logGtZero(val) {
    // Ensure that the log argument is nonnegative.
    const offset = Math.exp(MIN_VAL);
    return Math.log(val + offset);
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xhr_dataset = __webpack_require__(25);
exports.xhr_dataset = xhr_dataset;
var environment = __webpack_require__(5);
exports.environment = environment;
var conv_util = __webpack_require__(8);
exports.conv_util = conv_util;
var gpgpu_util = __webpack_require__(22);
exports.gpgpu_util = gpgpu_util;
var render_ndarray_gpu_util = __webpack_require__(101);
exports.render_ndarray_gpu_util = render_ndarray_gpu_util;
var webgl_util = __webpack_require__(10);
exports.webgl_util = webgl_util;
var test_util = __webpack_require__(107);
exports.test_util = test_util;
var util = __webpack_require__(0);
exports.util = util;
var version_1 = __webpack_require__(108);
exports.version = version_1.version;
var checkpoint_loader_1 = __webpack_require__(52);
exports.CheckpointLoader = checkpoint_loader_1.CheckpointLoader;
var dataset_1 = __webpack_require__(24);
exports.InMemoryDataset = dataset_1.InMemoryDataset;
var input_provider_1 = __webpack_require__(53);
exports.InCPUMemoryShuffledInputProviderBuilder = input_provider_1.InCPUMemoryShuffledInputProviderBuilder;
exports.InGPUMemoryShuffledInputProviderBuilder = input_provider_1.InGPUMemoryShuffledInputProviderBuilder;
var xhr_dataset_1 = __webpack_require__(25);
exports.XhrDataset = xhr_dataset_1.XhrDataset;
var environment_1 = __webpack_require__(5);
exports.ENV = environment_1.ENV;
exports.Environment = environment_1.Environment;
var graph_1 = __webpack_require__(13);
exports.Graph = graph_1.Graph;
exports.Tensor = graph_1.Tensor;
var adadelta_optimizer_1 = __webpack_require__(74);
exports.AdadeltaOptimizer = adadelta_optimizer_1.AdadeltaOptimizer;
var adagrad_optimizer_1 = __webpack_require__(75);
exports.AdagradOptimizer = adagrad_optimizer_1.AdagradOptimizer;
var adam_optimizer_1 = __webpack_require__(76);
exports.AdamOptimizer = adam_optimizer_1.AdamOptimizer;
var adamax_optimizer_1 = __webpack_require__(77);
exports.AdamaxOptimizer = adamax_optimizer_1.AdamaxOptimizer;
var momentum_optimizer_1 = __webpack_require__(78);
exports.MomentumOptimizer = momentum_optimizer_1.MomentumOptimizer;
var optimizer_1 = __webpack_require__(7);
exports.Optimizer = optimizer_1.Optimizer;
var rmsprop_optimizer_1 = __webpack_require__(79);
exports.RMSPropOptimizer = rmsprop_optimizer_1.RMSPropOptimizer;
var sgd_optimizer_1 = __webpack_require__(26);
exports.SGDOptimizer = sgd_optimizer_1.SGDOptimizer;
var session_1 = __webpack_require__(28);
exports.CostReduction = session_1.CostReduction;
exports.Session = session_1.Session;
var graph_runner_1 = __webpack_require__(80);
exports.GraphRunner = graph_runner_1.GraphRunner;
exports.MetricReduction = graph_runner_1.MetricReduction;
var initializers_1 = __webpack_require__(30);
exports.ConstantInitializer = initializers_1.ConstantInitializer;
exports.NDArrayInitializer = initializers_1.NDArrayInitializer;
exports.OnesInitializer = initializers_1.OnesInitializer;
exports.RandomNormalInitializer = initializers_1.RandomNormalInitializer;
exports.RandomTruncatedNormalInitializer = initializers_1.RandomTruncatedNormalInitializer;
exports.RandomUniformInitializer = initializers_1.RandomUniformInitializer;
exports.VarianceScalingInitializer = initializers_1.VarianceScalingInitializer;
exports.ZerosInitializer = initializers_1.ZerosInitializer;
var math_1 = __webpack_require__(15);
exports.MatrixOrientation = math_1.MatrixOrientation;
exports.NDArrayMath = math_1.NDArrayMath;
var math_cpu_1 = __webpack_require__(32);
exports.NDArrayMathCPU = math_cpu_1.NDArrayMathCPU;
var math_gpu_1 = __webpack_require__(33);
exports.NDArrayMathGPU = math_gpu_1.NDArrayMathGPU;
var ndarray_1 = __webpack_require__(1);
exports.initializeGPU = ndarray_1.initializeGPU;
var ndarray_2 = __webpack_require__(1);
exports.Array1D = ndarray_2.Array1D;
exports.Array2D = ndarray_2.Array2D;
exports.Array3D = ndarray_2.Array3D;
exports.Array4D = ndarray_2.Array4D;
exports.NDArray = ndarray_2.NDArray;
exports.Scalar = ndarray_2.Scalar;
var gpgpu_context_1 = __webpack_require__(35);
exports.GPGPUContext = gpgpu_context_1.GPGPUContext;
//# sourceMappingURL=index.js.map

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = saveGraphWeights;
/* harmony export (immutable) */ __webpack_exports__["c"] = loadGraphWeights;
/* harmony export (immutable) */ __webpack_exports__["b"] = saveGraphWeightsJSON;
/* harmony export (immutable) */ __webpack_exports__["d"] = loadGraphWeightsJSON;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_deeplearn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_deeplearn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_deeplearn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tab64__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tab64___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tab64__);
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const DB_NAME = 'weightDb';
const DB_VERSION = 5;
const WEIGHT_STORE = 'weightStore';
function saveGraphWeights(graph, session) {
    if (session.activationArrayMap.size() === 0) {
        console.error('No activationArrayMap found. Please train first.');
        return;
    }
    // Get the nodes that we want to save.
    const saveNodes = graph.getNodes().filter(v => {
        return v.name.slice(0, 4) === 'save';
    });
    const saveWeights = saveNodes.map(node => {
        return { key: node.name, value: session.activationArrayMap.get(node.output) };
    });
    const dbResult = indexedDB.open(DB_NAME, DB_VERSION);
    dbResult.onerror = function (e) {
        console.log('IDB: error.');
    };
    dbResult.onupgradeneeded = function (e) {
        console.log('IDB: onupgradeneeded.');
        const db = this.result;
        if (!db.objectStoreNames.contains(WEIGHT_STORE)) {
            db.createObjectStore(WEIGHT_STORE);
        }
    };
    dbResult.onsuccess = function (e) {
        console.log('IDB: onsuccess.');
        const db = this.result;
        // Iterate through all of the weights in the graph, save each weight
        // vector to indexedDB.
        for (let { key, value } of saveWeights) {
            saveNDArray(db, WEIGHT_STORE, key, value);
            console.log(`Saved NDArray of shape [${value.shape}] for node ${key}.`);
        }
    };
}
function loadGraphWeights(graph) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const saveNodes = graph.getNodes().filter(v => {
                return v.name.slice(0, 4) === 'save';
            });
            const dbResult = indexedDB.open(DB_NAME, DB_VERSION);
            dbResult.onsuccess = function (e) {
                const namedWeights = {};
                const promises = [];
                const db = this.result;
                for (let node of saveNodes) {
                    // Get the saved value for this node.
                    const promise = loadNDArray(db, WEIGHT_STORE, node.name).then(value => {
                        namedWeights[node.name] = value;
                        console.log(`Loaded NDArray of shape [${value.shape}]` +
                            ` for node ${node.name}.`);
                    });
                    promises.push(promise);
                }
                return Promise.all(promises).then(e => resolve(namedWeights));
            };
            dbResult.onerror = reject;
            dbResult.onupgradeneeded = function (e) {
                console.log('IDB: onupgradeneeded.');
            };
        });
    });
}
function saveNDArray(db, storeName, keyName, ndArray) {
    return __awaiter(this, void 0, void 0, function* () {
        // Save both shape and data.
        yield saveValue(db, storeName, keyName + '-shape', ndArray.shape);
        yield saveValue(db, storeName, keyName + '-data', ndArray.dataSync());
    });
}
function loadNDArray(db, storeName, keyName) {
    return __awaiter(this, void 0, void 0, function* () {
        const shapeKey = keyName + '-shape';
        const dataKey = keyName + '-data';
        const shape = yield loadValue(db, storeName, shapeKey);
        const data = yield loadValue(db, storeName, dataKey);
        return __WEBPACK_IMPORTED_MODULE_0_deeplearn__["NDArray"].make(shape, { values: data });
    });
}
function saveValue(db, storeName, keyName, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const trans = db.transaction(storeName, 'readwrite');
        const store = trans.objectStore(storeName);
        return store.put(value, keyName);
    });
}
function loadValue(db, storeName, keyName) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const trans = db.transaction(storeName, 'readonly');
            const store = trans.objectStore(storeName);
            const request = store.get(keyName);
            request.onsuccess = function (e) {
                // Do something with the request.result!
                const weight = request.result;
                resolve(weight);
            };
            request.onerror = reject;
        });
    });
}
/**
 * Saving and loading from JSON.
 */
function saveGraphWeightsJSON(graph, session) {
    if (session.activationArrayMap.size() === 0) {
        console.error('No activationArrayMap found. Please train first.');
        return;
    }
    // Get the nodes that we want to save.
    const saveNodes = graph.getNodes().filter(v => {
        return v.name.slice(0, 4) === 'save';
    });
    // Format: {"node-name": {"shape": [3, 2, 4], "data": "BASE64STRING"}, ...}
    const saveWeights = saveNodes.map(node => {
        return { key: node.name, value: session.activationArrayMap.get(node.output) };
    });
    let json = {};
    for (let node of saveNodes) {
        const key = node.name;
        const ndarray = session.activationArrayMap.get(node.output);
        const base64 = __WEBPACK_IMPORTED_MODULE_1_tab64__["encode"](ndarray.dataSync());
        const value = {
            shape: ndarray.shape,
            data: base64,
        };
        json[key] = value;
    }
    // Stringify the JSON and download it.
    return JSON.stringify(json, null, 2);
}
function loadGraphWeightsJSON(graph, json) {
    const saveNodes = graph.getNodes().filter(v => {
        return v.name.slice(0, 4) === 'save';
    });
    const namedWeights = {};
    for (let node of saveNodes) {
        const key = node.name;
        const item = json[key];
        const data = __WEBPACK_IMPORTED_MODULE_1_tab64__["decode"](item.data, 'float32');
        const array = __WEBPACK_IMPORTED_MODULE_0_deeplearn__["NDArray"].make(item.shape, { values: data });
        namedWeights[node.name] = array;
    }
    return namedWeights;
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function axesAreInnerMostDims(axes, rank) {
    for (var i = 0; i < axes.length; ++i) {
        if (axes[axes.length - i - 1] !== rank - 1 - i) {
            return false;
        }
    }
    return true;
}
exports.axesAreInnerMostDims = axesAreInnerMostDims;
function combineLocations(outputLoc, reduceLoc, axes) {
    var rank = outputLoc.length + reduceLoc.length;
    var loc = [];
    var outIdx = 0;
    var reduceIdx = 0;
    for (var dim = 0; dim < rank; dim++) {
        if (axes.indexOf(dim) === -1) {
            loc.push(outputLoc[outIdx++]);
        }
        else {
            loc.push(reduceLoc[reduceIdx++]);
        }
    }
    return loc;
}
exports.combineLocations = combineLocations;
function computeOutAndReduceShapes(aShape, axes) {
    var outShape = [];
    var rank = aShape.length;
    for (var dim = 0; dim < rank; dim++) {
        if (axes.indexOf(dim) === -1) {
            outShape.push(aShape[dim]);
        }
    }
    var reduceShape = axes.map(function (dim) { return aShape[dim]; });
    return [outShape, reduceShape];
}
exports.computeOutAndReduceShapes = computeOutAndReduceShapes;
function expandShapeToKeepDim(shape, axes) {
    var reduceSubShape = axes.map(function (x) { return 1; });
    return combineLocations(shape, reduceSubShape, axes);
}
exports.expandShapeToKeepDim = expandShapeToKeepDim;
function parseAxisParam(axis, shape) {
    if (axis == null) {
        axis = shape.map(function (s, i) { return i; });
    }
    else if (typeof (axis) === 'number') {
        axis = [axis];
    }
    return axis;
}
exports.parseAxisParam = parseAxisParam;
function assertAxesAreInnerMostDims(msg, axes, rank) {
    if (!axesAreInnerMostDims(axes, rank)) {
        throw new Error(msg + " supports only inner-most axes for now. " +
            ("Got axes " + axes + " and rank-" + rank + " input."));
    }
}
exports.assertAxesAreInnerMostDims = assertAxesAreInnerMostDims;
function getPermutedAxes(axes, rank) {
    if (axesAreInnerMostDims(axes, rank)) {
        return null;
    }
    var result = [];
    for (var i = 0; i < rank; ++i) {
        if (axes.indexOf(i) === -1) {
            result.push(i);
        }
    }
    axes.forEach(function (axis) { return result.push(axis); });
    return result;
}
exports.getPermutedAxes = getPermutedAxes;
function getInnerMostAxes(numAxes, rank) {
    var res = [];
    for (var i = rank - numAxes; i < rank; ++i) {
        res.push(i);
    }
    return res;
}
exports.getInnerMostAxes = getInnerMostAxes;
//# sourceMappingURL=axis_util.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(5);
var tex_util = __webpack_require__(17);
var webgl_util = __webpack_require__(10);
function getWebGLContextAttributes() {
    return {
        alpha: false,
        antialias: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        depth: false,
        stencil: false,
        failIfMajorPerformanceCaveat: true
    };
}
exports.getWebGLContextAttributes = getWebGLContextAttributes;
function createWebGLContext(canvas) {
    var attributes = getWebGLContextAttributes();
    var gl;
    if (canvas != null) {
        gl = webgl_util.createWebGLRenderingContextFromCanvas(canvas, attributes);
    }
    else {
        gl = webgl_util.createWebGLRenderingContext(attributes);
    }
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.DEPTH_TEST); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.STENCIL_TEST); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.BLEND); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.DITHER); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.POLYGON_OFFSET_FILL); });
    webgl_util.callAndCheck(gl, function () { return gl.disable(gl.SAMPLE_COVERAGE); });
    webgl_util.callAndCheck(gl, function () { return gl.enable(gl.SCISSOR_TEST); });
    webgl_util.callAndCheck(gl, function () { return gl.enable(gl.CULL_FACE); });
    webgl_util.callAndCheck(gl, function () { return gl.cullFace(gl.BACK); });
    return gl;
}
exports.createWebGLContext = createWebGLContext;
function createVertexShader(gl) {
    var vertexShaderSource = "\n    precision highp float;\n    attribute vec3 clipSpacePos;\n    attribute vec2 uv;\n    varying vec2 resultUV;\n\n    void main() {\n      gl_Position = vec4(clipSpacePos, 1);\n      resultUV = uv;\n    }";
    return webgl_util.createVertexShader(gl, vertexShaderSource);
}
exports.createVertexShader = createVertexShader;
function createVertexBuffer(gl) {
    var vertexArray = new Float32Array([-1, 1, 0, 0, 1, -1, -1, 0, 0, 0, 1, 1, 0, 1, 1, 1, -1, 0, 1, 0]);
    return webgl_util.createStaticVertexBuffer(gl, vertexArray);
}
exports.createVertexBuffer = createVertexBuffer;
function createIndexBuffer(gl) {
    var triangleVertexIndices = new Uint16Array([0, 1, 2, 2, 1, 3]);
    return webgl_util.createStaticIndexBuffer(gl, triangleVertexIndices);
}
exports.createIndexBuffer = createIndexBuffer;
function getTextureInternalFormat(gl, numChannels) {
    if (!environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        return gl.RGBA;
    }
    if (environment_1.ENV.get('WEBGL_VERSION') === 2) {
        if (numChannels === 4) {
            return gl.RGBA32F;
        }
        return gl.R32F;
    }
    return gl.RGBA;
}
function getTextureFormat(gl, numChannels) {
    if (!environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        return gl.RGBA;
    }
    if (environment_1.ENV.get('WEBGL_VERSION') === 2) {
        if (numChannels === 4) {
            return gl.RGBA;
        }
        return gl.RED;
    }
    return gl.RGBA;
}
function getTextureType(gl) {
    if (!environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        return gl.UNSIGNED_BYTE;
    }
    return gl.FLOAT;
}
function createAndConfigureTexture(gl, width, height, numChannels) {
    webgl_util.validateTextureSize(gl, width, height);
    var texture = webgl_util.createTexture(gl);
    var tex2d = gl.TEXTURE_2D;
    var internalFormat = getTextureInternalFormat(gl, numChannels);
    var format = getTextureFormat(gl, numChannels);
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(tex2d, texture); });
    webgl_util.callAndCheck(gl, function () { return gl.texParameteri(tex2d, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); });
    webgl_util.callAndCheck(gl, function () { return gl.texParameteri(tex2d, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); });
    webgl_util.callAndCheck(gl, function () { return gl.texParameteri(tex2d, gl.TEXTURE_MIN_FILTER, gl.NEAREST); });
    webgl_util.callAndCheck(gl, function () { return gl.texParameteri(tex2d, gl.TEXTURE_MAG_FILTER, gl.NEAREST); });
    webgl_util.callAndCheck(gl, function () { return gl.texImage2D(tex2d, 0, internalFormat, width, height, 0, format, getTextureType(gl), null); });
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
    return texture;
}
function createMatrixTexture(gl, rows, columns) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    var numChannels = 1;
    return createAndConfigureTexture(gl, width, height, numChannels);
}
exports.createMatrixTexture = createMatrixTexture;
function createColorMatrixTexture(gl, rows, columns) {
    var _a = tex_util.getColorMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    var numChannels = 4;
    return createAndConfigureTexture(gl, width, height, numChannels);
}
exports.createColorMatrixTexture = createColorMatrixTexture;
function createPackedMatrixTexture(gl, rows, columns) {
    var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    var numChannels = 4;
    return createAndConfigureTexture(gl, width, height, numChannels);
}
exports.createPackedMatrixTexture = createPackedMatrixTexture;
function bindVertexProgramAttributeStreams(gl, program, vertexBuffer, attribLocations) {
    var posOffset = 0;
    var uvOffset = 3 * 4;
    var stride = (3 * 4) + (2 * 4);
    webgl_util.callAndCheck(gl, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); });
    webgl_util.bindVertexBufferToProgramAttribute(gl, program, 'clipSpacePos', vertexBuffer, 3, stride, posOffset, attribLocations);
    webgl_util.bindVertexBufferToProgramAttribute(gl, program, 'uv', vertexBuffer, 2, stride, uvOffset, attribLocations);
}
exports.bindVertexProgramAttributeStreams = bindVertexProgramAttributeStreams;
function uploadPixelDataToTexture(gl, texture, pixels) {
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, texture); });
    webgl_util.callAndCheck(gl, function () { return gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels); });
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
}
exports.uploadPixelDataToTexture = uploadPixelDataToTexture;
function uploadDataToTexture(gl, texture, width, height, data, numChannels) {
    var textureFormat = getTextureFormat(gl, numChannels);
    webgl_util.validateTextureSize(gl, width, height);
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, texture); });
    webgl_util.callAndCheck(gl, function () { return gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, textureFormat, getTextureType(gl), data); });
    webgl_util.callAndCheck(gl, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
}
function uploadMatrixToTexture(gl, texture, rows, columns, matrix, numChannels) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    var unpackedArray;
    if (environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED')) {
        var channelsPerTexture = numChannels === 1 ? webgl_util.getChannelsPerTexture() : numChannels;
        if (channelsPerTexture === 1) {
            unpackedArray = matrix;
        }
        else {
            unpackedArray =
                new Float32Array(tex_util.getUnpackedArraySizeFromMatrixSize(matrix.length, channelsPerTexture));
            tex_util.encodeMatrixToUnpackedArray(matrix, unpackedArray, channelsPerTexture);
        }
    }
    else {
        unpackedArray = tex_util.encodeFloatArray(matrix);
    }
    uploadDataToTexture(gl, texture, w, h, unpackedArray, numChannels);
}
exports.uploadMatrixToTexture = uploadMatrixToTexture;
function uploadMatrixToPackedTexture(gl, texture, rows, columns, matrix) {
    var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    var packedRGBA = new Float32Array(tex_util.getPackedRGBAArraySizeFromMatrixShape(rows, columns));
    tex_util.encodeMatrixToPackedRGBA(matrix, rows, columns, packedRGBA);
    var numChannels = 4;
    uploadDataToTexture(gl, texture, w, h, packedRGBA, numChannels);
}
exports.uploadMatrixToPackedTexture = uploadMatrixToPackedTexture;
function getDownloadTargetArrayBuffer(rows, columns, channelsPerTexture) {
    var isFloatTexture = environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED');
    var downloadTarget;
    if (isFloatTexture) {
        downloadTarget =
            new Float32Array(tex_util.getUnpackedArraySizeFromMatrixSize(rows * columns, channelsPerTexture));
    }
    else {
        downloadTarget = new Uint8Array(rows * columns * channelsPerTexture);
    }
    return downloadTarget;
}
function decodeDownloadTargetArrayBuffer(downloadTarget, rows, columns, channelsPerPixel) {
    var isFloatTexture = environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED');
    if (isFloatTexture) {
        var matrix = new Float32Array(rows * columns);
        tex_util.decodeMatrixFromUnpackedArray(downloadTarget, matrix, channelsPerPixel);
        return matrix;
    }
    else {
        return tex_util.decodeToFloatArray(downloadTarget);
    }
}
function downloadMatrixFromOutputTextureAsync(gl, getBufferSubDataAsyncExtension, rows, columns) {
    return __awaiter(this, void 0, void 0, function () {
        var gl2, channelsPerPixel, downloadTarget, bufferSizeBytes, buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gl2 = gl;
                    channelsPerPixel = 4;
                    downloadTarget = getDownloadTargetArrayBuffer(rows, columns, channelsPerPixel);
                    bufferSizeBytes = downloadTarget instanceof Float32Array ?
                        downloadTarget.length * 4 :
                        downloadTarget;
                    buffer = gl.createBuffer();
                    webgl_util.callAndCheck(gl, function () { return gl.bindBuffer(gl2.PIXEL_PACK_BUFFER, buffer); });
                    webgl_util.callAndCheck(gl, function () { return gl.bufferData(gl2.PIXEL_PACK_BUFFER, bufferSizeBytes, gl.STATIC_DRAW); });
                    webgl_util.callAndCheck(gl, function () {
                        return gl2.readPixels(0, 0, columns, rows, gl.RGBA, getTextureType(gl), 0);
                    });
                    return [4, getBufferSubDataAsyncExtension.getBufferSubDataAsync(gl2.PIXEL_PACK_BUFFER, 0, downloadTarget)];
                case 1:
                    _a.sent();
                    return [2, decodeDownloadTargetArrayBuffer(downloadTarget, rows, columns, channelsPerPixel)];
            }
        });
    });
}
exports.downloadMatrixFromOutputTextureAsync = downloadMatrixFromOutputTextureAsync;
function downloadMatrixFromOutputTexture(gl, rows, columns) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    var channelsPerPixel = 4;
    var downloadTarget = getDownloadTargetArrayBuffer(rows, columns, channelsPerPixel);
    webgl_util.callAndCheck(gl, function () { return gl.readPixels(0, 0, w, h, gl.RGBA, getTextureType(gl), downloadTarget); });
    return decodeDownloadTargetArrayBuffer(downloadTarget, rows, columns, channelsPerPixel);
}
exports.downloadMatrixFromOutputTexture = downloadMatrixFromOutputTexture;
function downloadMatrixFromRGBAColorTexture(gl, rows, columns, channels) {
    var size = rows * columns * 4;
    var downloadTarget = new Uint8Array(size);
    webgl_util.callAndCheck(gl, function () { return gl.readPixels(0, 0, columns, rows, gl.RGBA, gl.UNSIGNED_BYTE, downloadTarget); });
    var packedRGBA = new Float32Array(size);
    for (var i = 0; i < downloadTarget.length; i++) {
        packedRGBA[i] = downloadTarget[i];
    }
    var matrix = new Float32Array(rows * columns * channels);
    tex_util.decodeMatrixFromUnpackedColorRGBAArray(packedRGBA, matrix, channels);
    return matrix;
}
exports.downloadMatrixFromRGBAColorTexture = downloadMatrixFromRGBAColorTexture;
function downloadMatrixFromPackedOutputTexture(gl, rows, columns) {
    var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    var packedRGBA = new Float32Array(tex_util.getPackedRGBAArraySizeFromMatrixShape(rows, columns));
    webgl_util.callAndCheck(gl, function () { return gl.readPixels(0, 0, w, h, gl.RGBA, getTextureType(gl), packedRGBA); });
    var matrix = new Float32Array(rows * columns);
    return tex_util.decodeMatrixFromPackedRGBA(packedRGBA, rows, columns, matrix);
}
exports.downloadMatrixFromPackedOutputTexture = downloadMatrixFromPackedOutputTexture;
//# sourceMappingURL=gpgpu_util.js.map

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_deeplearn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_deeplearn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_deeplearn__);
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


const BUFFER_LENGTH = 1024;
/* harmony export (immutable) */ __webpack_exports__["d"] = BUFFER_LENGTH;

const HOP_LENGTH = 512;
/* harmony export (immutable) */ __webpack_exports__["c"] = HOP_LENGTH;

const MEL_COUNT = 20;
/* harmony export (immutable) */ __webpack_exports__["f"] = MEL_COUNT;

const EXAMPLE_SR = 16000;
/* harmony export (immutable) */ __webpack_exports__["e"] = EXAMPLE_SR;

const DURATION = 1.0;
/* unused harmony export DURATION */

const IS_MFCC_ENABLED = false;
/* harmony export (immutable) */ __webpack_exports__["b"] = IS_MFCC_ENABLED;

/**
 * Goes from filename or audio sample buffer to input features.
 */
class FeatureExtractor {
    static bufferToFeature(buffer, isMfccEnabled = false) {
        buffer = this.zeroPadIfNeeded(buffer, DURATION * EXAMPLE_SR);
        const spec = this.pcmToMelSpectrogram(buffer, isMfccEnabled);
        return this.melSpectrogramToInput(spec);
    }
    static featureToSpectrogram(feature) {
        const data = feature.dataSync();
        const out = [];
        const [times, freqs, _] = feature.shape;
        for (let i = 0; i < times; i++) {
            // Get the chunk between i*freqs and (i+1)*freqs and create a new
            // Float32Array out of it.
            const column = data.slice(i * freqs, (i + 1) * freqs);
            out.push(column);
        }
        return out;
    }
    static getFeatureShape() {
        const times = Math.floor((DURATION * EXAMPLE_SR - BUFFER_LENGTH) / HOP_LENGTH) + 1;
        return [times, MEL_COUNT, 1];
    }
    static pcmToMelSpectrogram(buffer, isMfccEnabled) {
        const stft = __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__["a" /* default */].stft(buffer, BUFFER_LENGTH, HOP_LENGTH);
        const spec = stft.map(fft => __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__["a" /* default */].fftEnergies(fft));
        if (isMfccEnabled) {
            return __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__["a" /* default */].mfccSpectrogram(spec, MEL_COUNT);
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__["a" /* default */].melSpectrogram(spec, MEL_COUNT);
        }
    }
    static melSpectrogramToInput(spec) {
        // Flatten this spectrogram into a 2D array.
        const times = spec.length;
        const freqs = spec[0].length;
        const data = new Float32Array(times * freqs);
        let i = 0;
        for (let i = 0; i < times; i++) {
            const mel = spec[i];
            const offset = i * freqs;
            data.set(mel, offset);
        }
        // Normalize the whole input to be in [0, 1].
        const shape = [times, freqs, 1];
        //this.normalizeInPlace(data, 0, 1);
        return __WEBPACK_IMPORTED_MODULE_1_deeplearn__["Array3D"].new(shape, Array.prototype.slice.call(data));
    }
    static zeroPadIfNeeded(buffer, targetLength) {
        if (buffer.length == targetLength) {
            return buffer;
        }
        else if (buffer.length > targetLength) {
            return buffer.slice(0, targetLength);
        }
        //console.log(`Padded buffer of length ${buffer.length}.`);
        const out = new Float32Array(targetLength);
        out.fill(0);
        out.set(buffer);
        return out;
    }
    static normalizeInPlace(buffer, normMin = 0, normMax = 1) {
        let min = Infinity;
        let max = -Infinity;
        for (let i = 0; i < buffer.length; i++) {
            const val = buffer[i];
            if (val < min) {
                min = val;
            }
            if (val > max) {
                max = val;
            }
        }
        // Now we've found min and max values, we know what to scale & offset by.
        const scale = (normMax - normMin) / (max - min);
        const offset = normMin - min;
        for (let i = 0; i < buffer.length; i++) {
            // Get a normalized value in [0, 1].
            const norm = (buffer[i] - min) / (max - min);
            // Then convert it to the desired range.
            buffer[i] = normMin + norm * (normMax - normMin);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FeatureExtractor;



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var STATS_SAMPLE_PERCENTAGE = 0.1;
var InMemoryDataset = (function () {
    function InMemoryDataset(dataShapes) {
        this.dataShapes = dataShapes;
        this.normalizationInfo = {};
    }
    InMemoryDataset.prototype.getDataShape = function (dataIndex) {
        return this.dataShapes[dataIndex];
    };
    InMemoryDataset.prototype.getData = function () {
        return this.dataset;
    };
    InMemoryDataset.prototype.getStats = function () {
        var _this = this;
        if (this.dataset == null) {
            throw new Error('Data is null.');
        }
        return this.dataset.map(function (d) { return _this.getStatsForData(d); });
    };
    InMemoryDataset.prototype.getStatsForData = function (data) {
        var inputMin = Number.POSITIVE_INFINITY;
        var inputMax = Number.NEGATIVE_INFINITY;
        var exampleIndices = data.map(function (example, i) { return i; });
        util.shuffle(exampleIndices);
        exampleIndices =
            exampleIndices.slice(exampleIndices.length * STATS_SAMPLE_PERCENTAGE);
        for (var i = 0; i < exampleIndices.length; i++) {
            var inputValues = data[exampleIndices[i]].getValues();
            for (var j = 0; j < inputValues.length; j++) {
                inputMin = Math.min(inputMin, inputValues[j]);
                inputMax = Math.max(inputMax, inputValues[j]);
            }
        }
        return {
            inputMin: inputMin,
            inputMax: inputMax,
            exampleCount: data.length,
            shape: data[0].shape,
        };
    };
    InMemoryDataset.prototype.normalizeExamplesToRange = function (examples, curLowerBounds, curUpperBounds, newLowerBounds, newUpperBounds) {
        var curBoundsIsPerDimension = (curUpperBounds instanceof Float32Array &&
            curLowerBounds instanceof Float32Array);
        var newBoundsIsPerDimension = (newLowerBounds instanceof Float32Array &&
            newUpperBounds instanceof Float32Array);
        var inputSize = util.sizeFromShape(examples[0].shape);
        var newExamples = [];
        examples.forEach(function (example) {
            var inputValues = example.getValues();
            var normalizedValues = new Float32Array(inputSize);
            for (var j = 0; j < inputSize; j++) {
                var curLowerBound = curBoundsIsPerDimension ?
                    curLowerBounds[j] :
                    curLowerBounds;
                var curUpperBound = curBoundsIsPerDimension ?
                    curUpperBounds[j] :
                    curUpperBounds;
                var curRange = curUpperBound - curLowerBound;
                var newLowerBound = newBoundsIsPerDimension ?
                    newLowerBounds[j] :
                    newLowerBounds;
                var newUpperBound = newBoundsIsPerDimension ?
                    newUpperBounds[j] :
                    newUpperBounds;
                var newRange = newUpperBound - newLowerBound;
                if (curRange === 0) {
                    normalizedValues[j] = newLowerBound;
                }
                else {
                    normalizedValues[j] = newLowerBound +
                        newRange * (inputValues[j] - curLowerBound) / curRange;
                }
            }
            newExamples.push(ndarray_1.NDArray.make(example.shape, { values: normalizedValues }));
        });
        return newExamples;
    };
    InMemoryDataset.prototype.computeBounds = function (dataIndex) {
        var _this = this;
        if (this.dataset == null) {
            throw new Error('Data is null.');
        }
        var size = util.sizeFromShape(this.dataset[dataIndex][0].shape);
        this.normalizationInfo[dataIndex] = {
            isNormalized: false,
            minValues: new Float32Array(size),
            maxValues: new Float32Array(size)
        };
        for (var i = 0; i < size; i++) {
            this.normalizationInfo[dataIndex].minValues[i] = Number.POSITIVE_INFINITY;
            this.normalizationInfo[dataIndex].maxValues[i] = Number.NEGATIVE_INFINITY;
        }
        this.dataset[dataIndex].forEach(function (example) {
            var inputValues = example.getValues();
            for (var k = 0; k < size; k++) {
                _this.normalizationInfo[dataIndex].minValues[k] = Math.min(_this.normalizationInfo[dataIndex].minValues[k], inputValues[k]);
                _this.normalizationInfo[dataIndex].maxValues[k] = Math.max(_this.normalizationInfo[dataIndex].maxValues[k], inputValues[k]);
            }
        });
    };
    InMemoryDataset.prototype.normalizeWithinBounds = function (dataIndex, lowerBound, upperBound) {
        if (this.dataset == null) {
            throw new Error('Data is null.');
        }
        if (dataIndex >= this.dataset.length) {
            throw new Error('dataIndex out of bounds.');
        }
        if (this.normalizationInfo[dataIndex] == null) {
            this.computeBounds(dataIndex);
        }
        var curLowerBounds;
        var curUpperBounds;
        if (this.normalizationInfo[dataIndex].isNormalized) {
            curLowerBounds = this.normalizationInfo[dataIndex].lowerBound;
            curUpperBounds = this.normalizationInfo[dataIndex].upperBound;
        }
        else {
            curLowerBounds = this.normalizationInfo[dataIndex].minValues;
            curUpperBounds = this.normalizationInfo[dataIndex].maxValues;
        }
        this.dataset[dataIndex] = this.normalizeExamplesToRange(this.dataset[dataIndex], curLowerBounds, curUpperBounds, lowerBound, upperBound);
        this.normalizationInfo[dataIndex].isNormalized = true;
        this.normalizationInfo[dataIndex].lowerBound = lowerBound;
        this.normalizationInfo[dataIndex].upperBound = upperBound;
    };
    InMemoryDataset.prototype.isNormalized = function (dataIndex) {
        return this.normalizationInfo != null &&
            this.normalizationInfo[dataIndex].isNormalized;
    };
    InMemoryDataset.prototype.removeNormalization = function (dataIndex) {
        if (this.dataset == null) {
            throw new Error('Training or test data is null.');
        }
        if (!this.isNormalized(dataIndex)) {
            return;
        }
        this.dataset[dataIndex] = this.normalizeExamplesToRange(this.dataset[dataIndex], this.normalizationInfo[dataIndex].lowerBound, this.normalizationInfo[dataIndex].upperBound, this.normalizationInfo[dataIndex].minValues, this.normalizationInfo[dataIndex].maxValues);
        this.normalizationInfo[dataIndex].isNormalized = false;
    };
    InMemoryDataset.prototype.unnormalizeExamples = function (examples, dataIndex) {
        if (!this.isNormalized(dataIndex)) {
            return examples;
        }
        return this.normalizeExamplesToRange(examples, this.normalizationInfo[dataIndex].lowerBound, this.normalizationInfo[dataIndex].upperBound, this.normalizationInfo[dataIndex].minValues, this.normalizationInfo[dataIndex].maxValues);
    };
    InMemoryDataset.prototype.dispose = function () {
        if (this.dataset == null) {
            return;
        }
        for (var i = 0; i < this.dataset.length; i++) {
            for (var j = 0; j < this.dataset[i].length; j++) {
                this.dataset[i][j].dispose();
            }
        }
        this.dataset = [];
    };
    return InMemoryDataset;
}());
exports.InMemoryDataset = InMemoryDataset;
//# sourceMappingURL=dataset.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var dataset_1 = __webpack_require__(24);
var PARSING_IMAGE_CANVAS_HEIGHT_PX = 1000;
function getXhrDatasetConfig(jsonConfigPath) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', jsonConfigPath);
        xhr.onload = function () {
            resolve(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function (error) {
            reject(error);
        };
        xhr.send();
    });
}
exports.getXhrDatasetConfig = getXhrDatasetConfig;
var XhrDataset = (function (_super) {
    __extends(XhrDataset, _super);
    function XhrDataset(xhrDatasetConfig) {
        var _this = _super.call(this, xhrDatasetConfig.data.map(function (x) { return x.shape; })) || this;
        _this.xhrDatasetConfig = xhrDatasetConfig;
        return _this;
    }
    XhrDataset.prototype.getNDArray = function (info) {
        var dataPromise = info.dataType === 'png' ?
            parseTypedArrayFromPng(info, info.shape) :
            parseTypedArrayFromBinary(info);
        return dataPromise.then(function (data) {
            var inputSize = util.sizeFromShape(info.shape);
            var ndarrays = [];
            for (var i = 0; i < data.length / inputSize; i++) {
                var values = data.subarray(i * inputSize, (i + 1) * inputSize);
                var ndarray = ndarray_1.NDArray.make(info.shape, { values: new Float32Array(values) });
                ndarrays.push(ndarray);
            }
            return ndarrays;
        });
    };
    XhrDataset.prototype.fetchData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promises = _this.xhrDatasetConfig.data.map(function (x) { return _this.getNDArray(x); });
            Promise.all(promises).then(function (data) {
                _this.dataset = data;
                resolve();
            });
        });
    };
    return XhrDataset;
}(dataset_1.InMemoryDataset));
exports.XhrDataset = XhrDataset;
function parseTypedArrayFromBinary(info) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', info.path);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (event) {
            var data = (info.dataType === 'float32') ?
                new Float32Array(xhr.response) :
                new Uint8Array(xhr.response);
            resolve(data);
        };
        xhr.onerror = function (err) { return reject(err); };
        xhr.send();
    });
}
function parseGrayscaleImageData(data, result, resultOffset) {
    var idx = resultOffset;
    for (var i = 0; i < data.length; i += 4) {
        result[idx++] = data[i];
    }
}
function parseRGBImageData(data, result, resultOffset) {
    var idx = resultOffset;
    for (var i = 0; i < data.length; i += 4) {
        result[idx] = data[i];
        result[idx + 1] = data[i + 1];
        result[idx + 2] = data[i + 2];
        idx += 3;
    }
}
function parseImage(img, shape) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var N = img.height;
    var inputSize = util.sizeFromShape(shape);
    var result = new Uint8Array(N * inputSize);
    if (img.width !== shape[0] * shape[1]) {
        throw new Error("Image width (" + img.width + ") must be multiple of " +
            ("rows*columns (" + shape[0] + "*" + shape[1] + ") of the ndarray"));
    }
    canvas.width = img.width;
    canvas.height = PARSING_IMAGE_CANVAS_HEIGHT_PX;
    var sx = 0;
    var sWidth = canvas.width;
    var sHeight = canvas.height;
    var dx = 0;
    var dy = 0;
    var dWidth = sWidth;
    var dHeight = sHeight;
    var depth = shape[2];
    var offset = 0;
    var numPasses = Math.ceil(N / canvas.height);
    for (var pass = 0; pass < numPasses; ++pass) {
        var sy = pass * canvas.height;
        if ((pass === numPasses - 1) && (N % canvas.height > 0)) {
            canvas.height = N % canvas.height;
            sHeight = canvas.height;
            dHeight = sHeight;
        }
        ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        (depth === 1) ? parseGrayscaleImageData(data, result, offset) :
            parseRGBImageData(data, result, offset);
        offset += canvas.height * inputSize;
    }
    return result;
}
function parseTypedArrayFromPng(info, shape) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.setAttribute('crossOrigin', '');
        img.onload = function () {
            var result = parseImage(img, shape);
            img.src = '';
            img = null;
            resolve(result);
        };
        img.src = info.path;
    });
}
//# sourceMappingURL=xhr-dataset.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_array_map_1 = __webpack_require__(6);
var optimizer_1 = __webpack_require__(7);
var SGDOptimizer = (function (_super) {
    __extends(SGDOptimizer, _super);
    function SGDOptimizer(learningRate, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        return _this;
    }
    SGDOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var variable = math.scaledArrayAdd(_this.c, gradient, _this.one, oldVariable);
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    SGDOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    SGDOptimizer.prototype.setLearningRate = function (learningRate) {
        this.learningRate = learningRate;
    };
    return SGDOptimizer;
}(optimizer_1.Optimizer));
exports.SGDOptimizer = SGDOptimizer;
//# sourceMappingURL=sgd_optimizer.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    else if (a < b) {
        return -1;
    }
    else {
        return 1;
    }
}
exports.defaultCompare = defaultCompare;
var PriorityQueue = (function () {
    function PriorityQueue(comparator, indexObserver) {
        this.comparator = comparator;
        this.indexObserver = indexObserver;
        this.heap = [];
    }
    PriorityQueue.prototype.enqueue = function (t) {
        this.heap.push(t);
        this.onIndexChanged(t, this.heap.length - 1);
        this.siftUp(this.heap.length - 1);
    };
    PriorityQueue.prototype.dequeue = function () {
        if (this.empty()) {
            throw new Error('dequeue called on empty priority queue.');
        }
        var t = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.siftDown(0);
        return t;
    };
    PriorityQueue.prototype.update = function (newT, index) {
        var last = (index === this.heap.length - 1);
        if (!last) {
            this.swap(index, this.heap.length - 1);
        }
        this.heap.pop();
        if (!last) {
            if (this.siftUpIndex(index) !== -1) {
                this.siftUp(index);
            }
            else if (this.siftDownIndex(index) !== -1) {
                this.siftDown(index);
            }
        }
        this.enqueue(newT);
    };
    PriorityQueue.prototype.empty = function () {
        return this.heap.length === 0;
    };
    PriorityQueue.prototype.onIndexChanged = function (t, newIndex) {
        if (this.indexObserver) {
            this.indexObserver(t, newIndex);
        }
    };
    PriorityQueue.prototype.getParentIndex = function (index) {
        if (index === 0) {
            return -1;
        }
        return Math.floor((index - 1) / 2);
    };
    PriorityQueue.prototype.getLeftChildIndex = function (index) {
        var candidate = index * 2 + 1;
        return candidate < this.heap.length ? candidate : -1;
    };
    PriorityQueue.prototype.getRightChildIndex = function (index) {
        var candidate = index * 2 + 2;
        return candidate < this.heap.length ? candidate : -1;
    };
    PriorityQueue.prototype.siftUpIndex = function (index) {
        var parentIndex = this.getParentIndex(index);
        if (parentIndex === -1) {
            return -1;
        }
        if (this.compare(parentIndex, index) > 0) {
            return parentIndex;
        }
        return -1;
    };
    PriorityQueue.prototype.siftUp = function (index) {
        var siftIndex = this.siftUpIndex(index);
        while (siftIndex !== -1) {
            this.swap(index, siftIndex);
            index = siftIndex;
            siftIndex = this.siftUpIndex(index);
        }
    };
    PriorityQueue.prototype.siftDownIndex = function (index) {
        if (index >= this.heap.length) {
            return -1;
        }
        var largestChildIndex = index;
        var leftChildIndex = this.getLeftChildIndex(index);
        if ((leftChildIndex !== -1) &&
            (this.compare(leftChildIndex, largestChildIndex) < 0)) {
            largestChildIndex = leftChildIndex;
        }
        var rightChildIndex = this.getRightChildIndex(index);
        if ((rightChildIndex !== -1) &&
            (this.compare(rightChildIndex, largestChildIndex) < 0)) {
            largestChildIndex = rightChildIndex;
        }
        return (largestChildIndex === index) ? -1 : largestChildIndex;
    };
    PriorityQueue.prototype.siftDown = function (index) {
        var siftIndex = this.siftDownIndex(index);
        while (siftIndex !== -1) {
            this.swap(index, siftIndex);
            index = siftIndex;
            siftIndex = this.siftDownIndex(index);
        }
    };
    PriorityQueue.prototype.compare = function (aIndex, bIndex) {
        return this.comparator(this.heap[aIndex], this.heap[bIndex]);
    };
    PriorityQueue.prototype.swap = function (a, b) {
        var temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
        this.onIndexChanged(this.heap[a], a);
        this.onIndexChanged(this.heap[b], b);
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=priority_queue.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var operation_emitter = __webpack_require__(55);
var session_util = __webpack_require__(29);
var tensor_array_map_1 = __webpack_require__(6);
var FeedDictionary = (function () {
    function FeedDictionary(feedEntries) {
        var _this = this;
        this.dict = {};
        if (feedEntries) {
            feedEntries.forEach(function (entry) { return _this.dict[entry.tensor.id] = entry; });
        }
    }
    return FeedDictionary;
}());
exports.FeedDictionary = FeedDictionary;
var CostReduction;
(function (CostReduction) {
    CostReduction[CostReduction["NONE"] = 0] = "NONE";
    CostReduction[CostReduction["SUM"] = 1] = "SUM";
    CostReduction[CostReduction["MEAN"] = 2] = "MEAN";
})(CostReduction = exports.CostReduction || (exports.CostReduction = {}));
var Session = (function () {
    function Session(graph, math) {
        this.math = math;
        this.activationArrayMap = new tensor_array_map_1.TensorArrayMap();
        this.runtimeCache = {};
        this.oneScalar = ndarray_1.Scalar.new(1);
        this.gradientArrayMap = new tensor_array_map_1.SummedTensorArrayMap(this.math);
    }
    Session.prototype.dispose = function () {
        var _this = this;
        this.activationArrayMap.dispose();
        Object.keys(this.runtimeCache).forEach(function (key) {
            var runtime = _this.runtimeCache[key];
            if (runtime.operations) {
                runtime.operations.forEach(function (op) { return op.dispose(); });
            }
        });
        this.runtimeCache = {};
        if (this.batchSizeScalar != null) {
            this.batchSizeScalar.dispose();
        }
        this.oneScalar.dispose();
    };
    Session.prototype.evalAll = function (tensors, feedEntries) {
        var _this = this;
        return this.math.scope(function () {
            var feed = new FeedDictionary(feedEntries);
            var runtime = _this.getOrCreateRuntime(tensors, feed);
            var activations = _this.activationArrayMap;
            session_util.disposeAndInitializeOperationOutputs(runtime.nodes, activations);
            session_util.disposeTransientOperationArrays(runtime.operations, _this.activationArrayMap, _this.gradientArrayMap);
            session_util.addPersistentArraysToTensorArrayMap(runtime.nodes, activations);
            session_util.loadInputsFromFeedDictionaryToTensorArrayMap(feed, activations, _this.math);
            runtime.operations.forEach(function (op) { return op.feedForward(_this.math, activations); });
            var results = tensors.map(function (x) { return activations.get(x); });
            tensors.forEach(function (x) { return activations.delete(x); });
            session_util.releaseFeedDictionaryInputsFromTensorArrayMap(feed, activations, _this.math);
            return results;
        });
    };
    Session.prototype.eval = function (tensor, feedEntries) {
        return this.evalAll([tensor], feedEntries)[0];
    };
    Session.prototype.train = function (costTensor, feedEntries, batchSize, optimizer, costReduction) {
        var _this = this;
        if (costReduction === void 0) { costReduction = CostReduction.NONE; }
        util.assert(util.isScalarShape(costTensor.shape), 'Cost tensor for training must be a scalar value.');
        if (this.prevBatchSize !== batchSize) {
            this.prevBatchSize = batchSize;
            this.batchSizeScalar = ndarray_1.Scalar.new(batchSize);
        }
        var feed = new FeedDictionary(feedEntries);
        session_util.throwIfFeedDictionaryContainsNDArrays(feed);
        var runtime = this.getOrCreateRuntime([costTensor], feed);
        var inferenceOperations = runtime.operations;
        var backPropOperations = runtime.operations.slice().reverse();
        var activations = this.activationArrayMap;
        var gradients = this.gradientArrayMap;
        gradients.nullify(costTensor);
        gradients.add(costTensor, this.oneScalar);
        session_util.addPersistentArraysToTensorArrayMap(runtime.nodes, activations);
        optimizer.beforeBatch(this.math, batchSize, runtime, activations, gradients);
        return this.math.scope(function (keep, track) {
            var cost = track(ndarray_1.Scalar.new(0));
            for (var i = 0; i < batchSize; ++i) {
                session_util.disposeAndInitializeOperationOutputs(runtime.nodes, activations);
                session_util.disposeAndInitializeOperationInputGradients(runtime.nodes, gradients);
                session_util.disposeTransientOperationArrays(runtime.operations, activations, gradients);
                session_util.loadInputsFromFeedDictionaryToTensorArrayMap(feed, activations, _this.math);
                inferenceOperations.forEach(function (op) { return op.feedForward(_this.math, activations); });
                backPropOperations.forEach(function (op) { return op.backProp(_this.math, activations, gradients); });
                optimizer.afterExample(_this.math, runtime, activations, gradients);
                session_util.releaseFeedDictionaryInputsFromTensorArrayMap(feed, activations, _this.math);
                cost = _this.updateCostForExample(cost, activations.get(costTensor), costReduction);
            }
            optimizer.afterBatch(_this.math, batchSize, runtime, activations, gradients);
            return _this.updateCostForBatch(cost, costReduction);
        });
    };
    Session.prototype.updateCostForExample = function (totalCost, currCost, costReduction) {
        if (costReduction === CostReduction.MEAN ||
            costReduction === CostReduction.SUM) {
            return this.math.add(totalCost, currCost);
        }
        return totalCost;
    };
    Session.prototype.updateCostForBatch = function (totalCost, costReduction) {
        if (costReduction === CostReduction.MEAN) {
            return this.math.divide(totalCost, this.batchSizeScalar);
        }
        return totalCost;
    };
    Session.prototype.getOrCreateRuntime = function (tensors, feed) {
        var key = this.makeRuntimeCacheKey(tensors, feed);
        var runtime = this.runtimeCache[key];
        if (runtime === undefined) {
            var nodes = session_util.getOrderedEvaluationSetFromEvalTensor(tensors, feed);
            session_util.removeFeedDictionaryNodesFromEvaluationSet(feed, nodes);
            session_util.throwErrorIfEvaluationSetContainsPlaceholderNodes(nodes);
            var operations = operation_emitter.emitFromGraphNodes(nodes);
            runtime = { nodes: nodes, operations: operations };
            this.runtimeCache[key] = runtime;
        }
        return runtime;
    };
    Session.prototype.makeRuntimeCacheKey = function (tensors, feed) {
        return tensors.map(function (x) { return x.id; }).sort().join('_') + '__' +
            Object.keys(feed.dict).sort().join('_');
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var graph_1 = __webpack_require__(13);
var graph_util = __webpack_require__(3);
function getTerminatingNodesFromFeedDictionary(feedDictionary) {
    return Object.keys(feedDictionary.dict)
        .map(function (tensorID) { return feedDictionary.dict[+tensorID].tensor.node; });
}
exports.getTerminatingNodesFromFeedDictionary = getTerminatingNodesFromFeedDictionary;
function getOrderedEvaluationSetFromEvalTensor(evalTensors, feedDictionary) {
    var terminatingNodes = getTerminatingNodesFromFeedDictionary(feedDictionary);
    var evalNodes = evalTensors.map(function (x) { return x.node; });
    var unorderedEvaluationSet = graph_util.getUnorderedEvaluationSet(evalNodes, terminatingNodes);
    var orderedEvaluationSet = graph_util.getOrderedEvaluationSet(unorderedEvaluationSet);
    return orderedEvaluationSet;
}
exports.getOrderedEvaluationSetFromEvalTensor = getOrderedEvaluationSetFromEvalTensor;
function addPersistentArraysToTensorArrayMap(evaluationSet, tensorArrayMap) {
    evaluationSet.forEach(function (node) {
        if (node instanceof graph_1.VariableNode || node instanceof graph_1.ConstantNode) {
            tensorArrayMap.set(node.output, node.data);
        }
    });
}
exports.addPersistentArraysToTensorArrayMap = addPersistentArraysToTensorArrayMap;
function getVariableNodesFromEvaluationSet(evaluationSet) {
    var nodes = [];
    evaluationSet.forEach(function (node) {
        if (node instanceof graph_1.VariableNode) {
            nodes.push(node);
        }
    });
    return nodes;
}
exports.getVariableNodesFromEvaluationSet = getVariableNodesFromEvaluationSet;
function throwIfFeedDictionaryContainsNDArrays(feedDictionary) {
    Object.keys(feedDictionary.dict).forEach(function (tensorID) {
        if (feedDictionary.dict[+tensorID].data instanceof ndarray_1.NDArray) {
            throw new Error('training requires FeedDictionary entries to be InputProviders' +
                'and not NDArrays.');
        }
    });
}
exports.throwIfFeedDictionaryContainsNDArrays = throwIfFeedDictionaryContainsNDArrays;
function loadInputsFromFeedDictionaryToTensorArrayMap(batchFeed, activations, math) {
    Object.keys(batchFeed.dict).forEach(function (tensorID) {
        var feedEntry = batchFeed.dict[+tensorID];
        var data;
        if (feedEntry.data instanceof ndarray_1.NDArray) {
            data = feedEntry.data;
        }
        else {
            var provider = feedEntry.data;
            data = provider.getNextCopy(math);
        }
        util.assert(util.arraysEqual(feedEntry.tensor.shape, data.shape), "Error loading FeedEntry: feeding NDArray of shape " + data.shape + " " +
            ("does not match Tensor (id: " + feedEntry.tensor.id + ") shape: ") +
            (feedEntry.tensor.shape + "."));
        activations.set(feedEntry.tensor, data);
    });
}
exports.loadInputsFromFeedDictionaryToTensorArrayMap = loadInputsFromFeedDictionaryToTensorArrayMap;
function releaseFeedDictionaryInputsFromTensorArrayMap(batchFeed, activations, math) {
    Object.keys(batchFeed.dict).forEach(function (tensorID) {
        var feedEntry = batchFeed.dict[+tensorID];
        if (!(feedEntry.data instanceof ndarray_1.NDArray)) {
            var provider = feedEntry.data;
            var feedEntryArray = activations.get(feedEntry.tensor);
            provider.disposeCopy(math, feedEntryArray);
        }
        activations.delete(feedEntry.tensor);
    });
}
exports.releaseFeedDictionaryInputsFromTensorArrayMap = releaseFeedDictionaryInputsFromTensorArrayMap;
function removeFeedDictionaryNodesFromEvaluationSet(feedDictionary, evaluationSet) {
    var i = 0;
    while (i < evaluationSet.length) {
        var node = evaluationSet[i];
        if (feedDictionary.dict[node.output.id] != null) {
            evaluationSet.splice(i, 1);
        }
        else {
            ++i;
        }
    }
}
exports.removeFeedDictionaryNodesFromEvaluationSet = removeFeedDictionaryNodesFromEvaluationSet;
function disposeAndInitializeOperationOutputs(evaluationSet, tensorArrayMap) {
    evaluationSet.forEach(function (node) {
        if (!graph_util.isInputNode(node)) {
            if (!graph_util.isPassthroughNode(node, tensorArrayMap)) {
                tensorArrayMap.disposeArray(node.output);
            }
            tensorArrayMap.set(node.output, null);
        }
    });
}
exports.disposeAndInitializeOperationOutputs = disposeAndInitializeOperationOutputs;
function disposeAndInitializeOperationInputGradients(evaluationSet, gradients) {
    evaluationSet.forEach(function (node) {
        Object.keys(node.inputs).forEach(function (inputName) {
            var input = node.inputs[inputName];
            if (gradients.get(input, true) !== gradients.get(node.output, true)) {
                gradients.disposeArray(input);
            }
            gradients.nullify(input);
        });
    });
}
exports.disposeAndInitializeOperationInputGradients = disposeAndInitializeOperationInputGradients;
function disposeTransientOperationArrays(operations, activations, gradients) {
    operations.forEach(function (op) { return op.disposeTransientArrays(activations, gradients); });
}
exports.disposeTransientOperationArrays = disposeTransientOperationArrays;
function throwErrorIfEvaluationSetContainsPlaceholderNodes(evaluationSet) {
    evaluationSet.forEach(function (node) {
        if (node instanceof graph_1.PlaceholderNode) {
            var shape = '[' + node.output.shape.join(', ') + ']';
            throw new Error('Placeholder node "' + node.name + '" ' + shape +
                ' not present in feed dictionary.');
        }
    });
}
exports.throwErrorIfEvaluationSetContainsPlaceholderNodes = throwErrorIfEvaluationSetContainsPlaceholderNodes;
//# sourceMappingURL=session_util.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var VarianceScalingInitializer = (function () {
    function VarianceScalingInitializer(scale, mode, distribution) {
        if (scale === void 0) { scale = 1.0; }
        if (mode === void 0) { mode = 'fan_in'; }
        if (distribution === void 0) { distribution = 'normal'; }
        this.scale = scale;
        this.mode = mode;
        this.distribution = distribution;
    }
    VarianceScalingInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        var n = 0;
        if (this.mode === 'fan_in') {
            n = inputUnits;
        }
        else if (this.mode === 'fan_out') {
            n = outputUnits;
        }
        else if (this.mode === 'fan_avg') {
            n = (inputUnits + outputUnits) / 2;
        }
        else {
            throw new Error("Unexpected mode for variance scaling initializer: " + this.mode);
        }
        if (this.distribution === 'normal') {
            return ndarray_1.NDArray.randTruncatedNormal(weightsShape, 0.0, Math.sqrt(this.scale / n));
        }
        else if (this.distribution === 'uniform') {
            return ndarray_1.NDArray.randUniform(weightsShape, 0.0, Math.sqrt(3 * this.scale / n));
        }
        else {
            throw new Error("Unexpected distribution for variance scaling initializer: " +
                ("" + this.distribution));
        }
    };
    return VarianceScalingInitializer;
}());
exports.VarianceScalingInitializer = VarianceScalingInitializer;
var ZerosInitializer = (function () {
    function ZerosInitializer() {
    }
    ZerosInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return ndarray_1.NDArray.zeros(weightsShape);
    };
    return ZerosInitializer;
}());
exports.ZerosInitializer = ZerosInitializer;
var OnesInitializer = (function () {
    function OnesInitializer() {
    }
    OnesInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        var values = ndarray_1.NDArray.zeros(weightsShape);
        values.fill(1);
        return values;
    };
    return OnesInitializer;
}());
exports.OnesInitializer = OnesInitializer;
var ConstantInitializer = (function () {
    function ConstantInitializer(value) {
        if (value === void 0) { value = 0; }
        this.value = value;
    }
    ConstantInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        var values = ndarray_1.NDArray.zeros(weightsShape);
        values.fill(this.value);
        return values;
    };
    return ConstantInitializer;
}());
exports.ConstantInitializer = ConstantInitializer;
var NDArrayInitializer = (function () {
    function NDArrayInitializer(ndarray) {
        this.ndarray = ndarray;
    }
    NDArrayInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return this.ndarray;
    };
    return NDArrayInitializer;
}());
exports.NDArrayInitializer = NDArrayInitializer;
var RandomNormalInitializer = (function () {
    function RandomNormalInitializer(mean, stdev) {
        if (mean === void 0) { mean = 0; }
        if (stdev === void 0) { stdev = .05; }
        this.mean = mean;
        this.stdev = stdev;
    }
    RandomNormalInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return ndarray_1.NDArray.randNormal(weightsShape, this.mean, this.stdev);
    };
    return RandomNormalInitializer;
}());
exports.RandomNormalInitializer = RandomNormalInitializer;
var RandomTruncatedNormalInitializer = (function () {
    function RandomTruncatedNormalInitializer(mean, stdev) {
        if (mean === void 0) { mean = 0; }
        if (stdev === void 0) { stdev = .05; }
        this.mean = mean;
        this.stdev = stdev;
    }
    RandomTruncatedNormalInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return ndarray_1.NDArray.randTruncatedNormal(weightsShape, this.mean, this.stdev);
    };
    return RandomTruncatedNormalInitializer;
}());
exports.RandomTruncatedNormalInitializer = RandomTruncatedNormalInitializer;
var RandomUniformInitializer = (function () {
    function RandomUniformInitializer(minval, maxval) {
        if (minval === void 0) { minval = -.05; }
        if (maxval === void 0) { maxval = .05; }
        this.minval = minval;
        this.maxval = maxval;
    }
    RandomUniformInitializer.prototype.initialize = function (weightsShape, inputUnits, outputUnits) {
        return ndarray_1.NDArray.randUniform(weightsShape, this.minval, this.maxval);
    };
    return RandomUniformInitializer;
}());
exports.RandomUniformInitializer = RandomUniformInitializer;
//# sourceMappingURL=initializers.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function validateShapes(sourceSize, destSize) {
    var srcArea = sourceSize[0] * sourceSize[1];
    var dstArea = destSize[0] * destSize[1];
    if (srcArea !== dstArea) {
        var srcStr = "[" + sourceSize[0] + ", " + sourceSize[1] + "]";
        var dstStr = "[" + destSize[0] + ", " + destSize[1] + "]";
        throw new Error("copy2D shapes have different areas:\n  sourceSize " + srcStr +
            (", area " + srcArea + "\n  destSize " + dstStr + ", area " + dstArea));
    }
}
exports.validateShapes = validateShapes;
//# sourceMappingURL=copy2d_util.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var seedrandom = __webpack_require__(110);
var util = __webpack_require__(0);
var axis_util = __webpack_require__(21);
var broadcast_util = __webpack_require__(9);
var concat_util = __webpack_require__(14);
var conv_util = __webpack_require__(8);
var copy2D_util = __webpack_require__(31);
var math_1 = __webpack_require__(15);
var ndarray_1 = __webpack_require__(1);
var NDArrayMathCPU = (function (_super) {
    __extends(NDArrayMathCPU, _super);
    function NDArrayMathCPU(safeMode) {
        if (safeMode === void 0) { safeMode = false; }
        return _super.call(this, safeMode) || this;
    }
    NDArrayMathCPU.prototype.cloneInternal = function (ndarray) {
        return ndarray_1.NDArray.make(ndarray.shape, { values: new Float32Array(ndarray.getValues()) });
    };
    NDArrayMathCPU.prototype.slice1DInternal = function (input, begin, size) {
        var newVals = input.getValues().slice(begin, begin + size);
        return ndarray_1.Array1D.new(newVals);
    };
    NDArrayMathCPU.prototype.slice2DInternal = function (input, begin, size) {
        var result = ndarray_1.Array2D.zeros(size);
        var startI = begin[0], startJ = begin[1];
        for (var i = 0; i < size[0]; ++i) {
            for (var j = 0; j < size[1]; ++j) {
                var val = input.get(i + startI, j + startJ);
                result.set(val, i, j);
            }
        }
        return result;
    };
    NDArrayMathCPU.prototype.slice3DInternal = function (input, begin, size) {
        var result = ndarray_1.Array3D.zeros(size);
        var startI = begin[0], startJ = begin[1], startK = begin[2];
        for (var i = 0; i < size[0]; ++i) {
            for (var j = 0; j < size[1]; ++j) {
                for (var k = 0; k < size[2]; ++k) {
                    var val = input.get(i + startI, j + startJ, k + startK);
                    result.set(val, i, j, k);
                }
            }
        }
        return result;
    };
    NDArrayMathCPU.prototype.slice4DInternal = function (input, begin, size) {
        var result = ndarray_1.Array4D.zeros(size);
        var startI = begin[0], startJ = begin[1], startK = begin[2], startL = begin[3];
        for (var i = 0; i < size[0]; ++i) {
            for (var j = 0; j < size[1]; ++j) {
                for (var k = 0; k < size[2]; ++k) {
                    for (var l = 0; l < size[3]; ++l) {
                        var val = input.get(i + startI, j + startJ, k + startK, l + startL);
                        result.set(val, i, j, k, l);
                    }
                }
            }
        }
        return result;
    };
    NDArrayMathCPU.prototype.copy2DInternal = function (source, sourceBeginRowCol, sourceSizeRowCol, dest, destBeginRowCol, destSizeRowCol) {
        copy2D_util.validateShapes(sourceSizeRowCol, destSizeRowCol);
        var srcValues = source.getValues();
        var dstValues = dest.getValues();
        var n = sourceSizeRowCol[0] * sourceSizeRowCol[1];
        for (var i = 0; i < n; ++i) {
            var srcRow = sourceBeginRowCol[0] + Math.floor(i / sourceSizeRowCol[1]);
            var srcCol = sourceBeginRowCol[1] + (i % sourceSizeRowCol[1]);
            var srcOff = srcRow * source.shape[1] + srcCol;
            var dstRow = destBeginRowCol[0] + Math.floor(i / destSizeRowCol[1]);
            var dstCol = destBeginRowCol[1] + (i % destSizeRowCol[1]);
            var dstOff = dstRow * dest.shape[1] + dstCol;
            dstValues[dstOff] = srcValues[srcOff];
        }
    };
    NDArrayMathCPU.prototype.concat1DInternal = function (a, b) {
        var outShape = concat_util.computeOutShape(a.shape, b.shape, 0);
        var result = ndarray_1.Array1D.zeros(outShape);
        var aVals = a.getValues();
        var bVals = b.getValues();
        var vals = result.getValues();
        vals.set(aVals, 0);
        vals.set(bVals, a.size);
        return result;
    };
    NDArrayMathCPU.prototype.concat2DInternal = function (a, b, axis) {
        var outShape = concat_util.computeOutShape(a.shape, b.shape, axis);
        var result = ndarray_1.Array2D.zeros(outShape);
        if (axis === 0) {
            var aVals = a.getValues();
            var bVals = b.getValues();
            var vals = result.getValues();
            vals.set(aVals, 0);
            vals.set(bVals, a.size);
            return result;
        }
        for (var i = 0; i < outShape[0]; ++i) {
            for (var j = 0; j < outShape[1]; ++j) {
                var index = [i, j];
                var value = void 0;
                if (index[axis] < a.shape[axis]) {
                    value = a.get(i, j);
                }
                else {
                    index[axis] -= a.shape[axis];
                    var i2 = index[0], j2 = index[1];
                    value = b.get(i2, j2);
                }
                result.set(value, i, j);
            }
        }
        return result;
    };
    NDArrayMathCPU.prototype.concat3DInternal = function (a, b, axis) {
        var outShape = concat_util.computeOutShape(a.shape, b.shape, axis);
        var result = ndarray_1.Array3D.zeros(outShape);
        if (axis === 0) {
            var aVals = a.getValues();
            var bVals = b.getValues();
            var vals = result.getValues();
            vals.set(aVals, 0);
            vals.set(bVals, a.size);
            return result;
        }
        for (var i = 0; i < outShape[0]; ++i) {
            for (var j = 0; j < outShape[1]; ++j) {
                for (var k = 0; k < outShape[2]; ++k) {
                    var index = [i, j, k];
                    var value = void 0;
                    if (index[axis] < a.shape[axis]) {
                        value = a.get(i, j, k);
                    }
                    else {
                        index[axis] -= a.shape[axis];
                        var i2 = index[0], j2 = index[1], k2 = index[2];
                        value = b.get(i2, j2, k2);
                    }
                    result.set(value, i, j, k);
                }
            }
        }
        return result;
    };
    NDArrayMathCPU.prototype.concat4DInternal = function (a, b, axis) {
        var outShape = concat_util.computeOutShape(a.shape, b.shape, axis);
        var result = ndarray_1.Array4D.zeros(outShape);
        if (axis === 0) {
            var aVals = a.getValues();
            var bVals = b.getValues();
            var vals = result.getValues();
            vals.set(aVals, 0);
            vals.set(bVals, a.size);
            return result;
        }
        for (var i = 0; i < outShape[0]; ++i) {
            for (var j = 0; j < outShape[1]; ++j) {
                for (var k = 0; k < outShape[2]; ++k) {
                    for (var l = 0; l < outShape[3]; ++l) {
                        var index = [i, j, k, l];
                        var value = void 0;
                        if (index[axis] < a.shape[axis]) {
                            value = a.get(i, j, k, l);
                        }
                        else {
                            index[axis] -= a.shape[axis];
                            var i2 = index[0], j2 = index[1], k2 = index[2], l2 = index[3];
                            value = b.get(i2, j2, k2, l2);
                        }
                        result.set(value, i, j, k, l);
                    }
                }
            }
        }
        return result;
    };
    NDArrayMathCPU.prototype.scaledArrayAddInternal = function (c1, a, c2, b) {
        var c1Val = c1.get();
        var c2Val = c2.get();
        return this.broadcastedBinaryOp(a, b, 'float32', function (aVal, bVal) {
            return c1Val * aVal + c2Val * bVal;
        });
    };
    NDArrayMathCPU.prototype.negInternal = function (a) {
        return this.scalarTimesArray(ndarray_1.Scalar.NEG_ONE, a);
    };
    NDArrayMathCPU.prototype.addInternal = function (a, b) {
        return this.scaledArrayAddInternal(ndarray_1.Scalar.ONE, a, ndarray_1.Scalar.ONE, b);
    };
    NDArrayMathCPU.prototype.subtractInternal = function (a, b) {
        return this.scaledArrayAddInternal(ndarray_1.Scalar.ONE, a, ndarray_1.Scalar.NEG_ONE, b);
    };
    NDArrayMathCPU.prototype.matMulInternal = function (a, b, aOrientation, bOrientation) {
        if (aOrientation === void 0) { aOrientation = math_1.MatrixOrientation.REGULAR; }
        if (bOrientation === void 0) { bOrientation = math_1.MatrixOrientation.REGULAR; }
        var sharedDim = (aOrientation === math_1.MatrixOrientation.REGULAR) ? a.shape[1] : a.shape[0];
        var leftDim = (aOrientation === math_1.MatrixOrientation.REGULAR) ? a.shape[0] : a.shape[1];
        var rightDim = (bOrientation === math_1.MatrixOrientation.REGULAR) ? b.shape[1] : b.shape[0];
        var normalGetter = function (matrix, i, j) {
            return matrix.get(i, j);
        };
        var transposedGetter = function (matrix, i, j) {
            return matrix.get(j, i);
        };
        var aGetter = (aOrientation === math_1.MatrixOrientation.REGULAR) ?
            normalGetter :
            transposedGetter;
        var bGetter = (bOrientation === math_1.MatrixOrientation.REGULAR) ?
            normalGetter :
            transposedGetter;
        var values = new Float32Array(leftDim * rightDim);
        var index = 0;
        for (var i = 0; i < leftDim; ++i) {
            for (var j = 0; j < rightDim; ++j) {
                var sum = 0;
                for (var k = 0; k < sharedDim; ++k) {
                    sum += aGetter(a, i, k) * bGetter(b, k, j);
                }
                values[index++] = sum;
            }
        }
        return ndarray_1.Array2D.new([leftDim, rightDim], values);
    };
    NDArrayMathCPU.prototype.multiplyInternal = function (a, b) {
        var newShape = broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        var newValues = new Float32Array(util.sizeFromShape(newShape));
        var aValues = a.getValues();
        var bValues = b.getValues();
        for (var i = 0; i < newValues.length; ++i) {
            newValues[i] = aValues[i % a.size] * bValues[i % b.size];
        }
        return ndarray_1.NDArray.make(newShape, { values: newValues });
    };
    NDArrayMathCPU.prototype.divideInternal = function (a, b) {
        var newShape = broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        var newValues = new Float32Array(util.sizeFromShape(newShape));
        var aValues = a.getValues();
        var bValues = b.getValues();
        for (var i = 0; i < newValues.length; ++i) {
            newValues[i] = aValues[i % a.size] / bValues[i % b.size];
        }
        return ndarray_1.NDArray.make(newShape, { values: newValues }, 'float32');
    };
    NDArrayMathCPU.prototype.sumInternal = function (input, axes) {
        axis_util.assertAxesAreInnerMostDims('sum', axes, input.rank);
        var _a = axis_util.computeOutAndReduceShapes(input.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var resultDtype = math_1.SumTypesMap[input.dtype];
        var result = ndarray_1.NDArray.zeros(outShape, resultDtype);
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = input.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var sum = 0;
            for (var j = 0; j < reduceSize; ++j) {
                sum += aVals[offset + j];
            }
            vals[i] = sum;
        }
        return result;
    };
    NDArrayMathCPU.prototype.argMinInternal = function (input, axes) {
        axis_util.assertAxesAreInnerMostDims('argMin', axes, input.rank);
        var _a = axis_util.computeOutAndReduceShapes(input.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var result = ndarray_1.NDArray.zeros(outShape, 'int32');
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = input.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var min = aVals[offset];
            var minIndex = 0;
            for (var j = 0; j < reduceSize; ++j) {
                var value = aVals[offset + j];
                if (isNaN(value)) {
                    minIndex = util.NAN_INT32;
                    break;
                }
                if (value < min) {
                    min = value;
                    minIndex = j;
                }
            }
            vals[i] = minIndex;
        }
        return result;
    };
    NDArrayMathCPU.prototype.argMaxInternal = function (input, axes) {
        axis_util.assertAxesAreInnerMostDims('argMax', axes, input.rank);
        var _a = axis_util.computeOutAndReduceShapes(input.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var result = ndarray_1.NDArray.zeros(outShape, 'int32');
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = input.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var max = aVals[offset];
            var maxIndex = 0;
            for (var j = 0; j < reduceSize; ++j) {
                var value = aVals[offset + j];
                if (isNaN(value)) {
                    maxIndex = util.NAN_INT32;
                    break;
                }
                if (value > max) {
                    max = value;
                    maxIndex = j;
                }
            }
            vals[i] = maxIndex;
        }
        return result;
    };
    NDArrayMathCPU.prototype.equalInternal = function (a, b) {
        return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
            if (util.isValNaN(aVal, a.dtype) || util.isValNaN(bVal, b.dtype)) {
                return util.getNaN('bool');
            }
            else {
                return (aVal === bVal) ? 1 : 0;
            }
        });
    };
    NDArrayMathCPU.prototype.topKInternal = function (ndarray, k) {
        var values = ndarray.getValues();
        var valuesAndIndices = [];
        for (var i = 0; i < values.length; i++) {
            valuesAndIndices.push({ value: values[i], index: i });
        }
        valuesAndIndices.sort(function (a, b) {
            return b.value - a.value;
        });
        var topkValues = new Float32Array(k);
        var topkIndices = new Float32Array(k);
        for (var i = 0; i < k; i++) {
            topkValues[i] = valuesAndIndices[i].value;
            topkIndices[i] = valuesAndIndices[i].index;
        }
        return { values: ndarray_1.Array1D.new(topkValues), indices: ndarray_1.Array1D.new(topkIndices) };
    };
    NDArrayMathCPU.prototype.minInternal = function (input, axes) {
        axis_util.assertAxesAreInnerMostDims('min', axes, input.rank);
        var _a = axis_util.computeOutAndReduceShapes(input.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var result = ndarray_1.NDArray.zeros(outShape, input.dtype);
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = input.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var min = aVals[0];
            for (var j = 0; j < reduceSize; ++j) {
                var value = aVals[offset + j];
                if (isNaN(value)) {
                    min = Number.NaN;
                    break;
                }
                if (value < min) {
                    min = value;
                }
            }
            vals[i] = min;
        }
        return result;
    };
    NDArrayMathCPU.prototype.maxInternal = function (input, axes) {
        axis_util.assertAxesAreInnerMostDims('max', axes, input.rank);
        var _a = axis_util.computeOutAndReduceShapes(input.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var result = ndarray_1.NDArray.zeros(outShape, input.dtype);
        var reduceSize = util.sizeFromShape(reduceShape);
        var vals = result.getValues();
        var aVals = input.getValues();
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var max = aVals[offset];
            for (var j = 0; j < reduceSize; ++j) {
                var value = aVals[offset + j];
                if (isNaN(value)) {
                    max = Number.NaN;
                    break;
                }
                if (value > max) {
                    max = value;
                }
            }
            vals[i] = max;
        }
        return result;
    };
    NDArrayMathCPU.prototype.ceilInternal = function (ndarray) {
        var values = ndarray.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            newValues[i] = Math.ceil(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: newValues });
    };
    NDArrayMathCPU.prototype.floorInternal = function (ndarray) {
        var values = ndarray.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            newValues[i] = Math.floor(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: newValues });
    };
    NDArrayMathCPU.prototype.expInternal = function (ndarray) {
        var values = ndarray.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            newValues[i] = Math.exp(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: newValues });
    };
    NDArrayMathCPU.prototype.logInternal = function (ndarray) {
        var values = ndarray.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            var value = values[i];
            newValues[i] = Math.log(value);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: newValues });
    };
    NDArrayMathCPU.prototype.sqrtInternal = function (ndarray) {
        var values = ndarray.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            var value = values[i];
            newValues[i] = Math.sqrt(value);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: newValues });
    };
    NDArrayMathCPU.prototype.squareInternal = function (x) {
        var values = x.getValues();
        var newValues = new Float32Array(values.length);
        for (var i = 0; i < values.length; ++i) {
            var value = values[i];
            newValues[i] = value * value;
        }
        return ndarray_1.NDArray.make(x.shape, { values: newValues });
    };
    NDArrayMathCPU.prototype.reluInternal = function (input) {
        var res = ndarray_1.NDArray.zeros(input.shape, input.dtype);
        var resVals = res.getValues();
        var inVals = input.getValues();
        for (var i = 0; i < inVals.length; ++i) {
            var val = inVals[i];
            if (util.isValNaN(val, input.dtype)) {
                resVals[i] = util.getNaN(res.dtype);
            }
            else {
                resVals[i] = Math.max(0, inVals[i]);
            }
        }
        return res;
    };
    NDArrayMathCPU.prototype.eluInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.dataSync();
        for (var i = 0; i < values.length; ++i) {
            var v = values[i];
            if (v >= 0) {
                resultValues[i] = v;
            }
            else {
                resultValues[i] = (Math.exp(v) - 1);
            }
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.leakyReluInternal = function (ndarray, alpha) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.dataSync();
        for (var i = 0; i < values.length; i++) {
            var v = values[i];
            if (v >= 0) {
                resultValues[i] = v;
            }
            else {
                resultValues[i] = alpha * v;
            }
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.clipInternal = function (ndarray, min, max) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.min(max, Math.max(min, values[i]));
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.absInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.abs(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.sigmoidInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = 1 / (1 + Math.exp(-values[i]));
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.sinInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.sin(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.cosInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.cos(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.tanInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.tan(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.asinInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.asin(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.acosInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.acos(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.atanInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.atan(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.sinhInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.sinh(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.coshInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = Math.cosh(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.tanhInternal = function (ndarray) {
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            resultValues[i] = util.tanh(values[i]);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.stepInternal = function (ndarray, alpha) {
        if (alpha === void 0) { alpha = 0; }
        var resultValues = new Float32Array(ndarray.size);
        var values = ndarray.getValues();
        for (var i = 0; i < values.length; ++i) {
            var value = values[i];
            resultValues[i] = value > 0 ? 1 : (value < 0 ? alpha : value);
        }
        return ndarray_1.NDArray.make(ndarray.shape, { values: resultValues });
    };
    NDArrayMathCPU.prototype.conv2dInternal = function (x, filter, bias, convInfo) {
        var _a = x.shape, xRows = _a[0], xCols = _a[1], inputDepth = _a[2];
        var filterHeight = filter.shape[0];
        var filterWidth = filter.shape[1];
        var outDepth = filter.shape[3];
        var padLeft = convInfo.padInfo.left;
        var padTop = convInfo.padInfo.top;
        var y = ndarray_1.Array3D.zeros(convInfo.outShape);
        for (var d2 = 0; d2 < outDepth; ++d2) {
            for (var yR = 0; yR < y.shape[0]; ++yR) {
                var xRCorner = yR * convInfo.strideHeight - padLeft;
                var xRMin = Math.max(0, xRCorner);
                var xRMax = Math.min(xRows, filterHeight + xRCorner);
                for (var yC = 0; yC < y.shape[1]; ++yC) {
                    var xCCorner = yC * convInfo.strideWidth - padTop;
                    var xCMin = Math.max(0, xCCorner);
                    var xCMax = Math.min(xCols, filterWidth + xCCorner);
                    var dotProd = 0;
                    for (var xR = xRMin; xR < xRMax; ++xR) {
                        var wR = xR - xRCorner;
                        for (var xC = xCMin; xC < xCMax; ++xC) {
                            var wC = xC - xCCorner;
                            for (var d1 = 0; d1 < inputDepth; ++d1) {
                                var pixel = x.get(xR, xC, d1);
                                var weight = filter.get(wR, wC, d1, d2);
                                dotProd += pixel * weight;
                            }
                        }
                    }
                    var biasVal = (bias != null) ? bias.get(d2) : 0;
                    y.set(dotProd + biasVal, yR, yC, d2);
                }
            }
        }
        return y;
    };
    NDArrayMathCPU.prototype.conv2dDerInputInternal = function (dy, filter, convInfo) {
        var inDepth = filter.shape[2];
        var outDepth = filter.shape[3];
        var yRows = dy.shape[0];
        var yCols = dy.shape[1];
        var filterHeight = filter.shape[0];
        var filterWidth = filter.shape[1];
        var topPad = filterHeight - 1 - convInfo.padInfo.top;
        var leftPad = filterWidth - 1 - convInfo.padInfo.left;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var dx = ndarray_1.Array3D.zeros(convInfo.inShape);
        for (var d1 = 0; d1 < inDepth; ++d1) {
            for (var xR = 0; xR < dx.shape[0]; ++xR) {
                var xRCorner = xR - leftPad;
                var xRMin = Math.max(0, Math.ceil(xRCorner / strideHeight));
                var yRMax = Math.min(yRows, (filterHeight + xRCorner) / strideHeight);
                for (var xC = 0; xC < dx.shape[1]; ++xC) {
                    var xCCorner = xC - topPad;
                    var xCMin = Math.max(0, Math.ceil(xCCorner / strideWidth));
                    var yCMax = Math.min(yCols, (filterWidth + xCCorner) / strideWidth);
                    var dotProd = 0;
                    for (var yR = xRMin; yR < yRMax; ++yR) {
                        var wR = yR * strideHeight - xRCorner;
                        for (var yC = xCMin; yC < yCMax; ++yC) {
                            var wC = yC * strideWidth - xCCorner;
                            for (var d2 = 0; d2 < outDepth; ++d2) {
                                var pixel = dy.get(yR, yC, d2);
                                var weight = filter.get(filterHeight - 1 - wR, filterWidth - 1 - wC, d1, d2);
                                dotProd += pixel * weight;
                            }
                        }
                    }
                    dx.set(dotProd, xR, xC, d1);
                }
            }
        }
        return dx;
    };
    NDArrayMathCPU.prototype.conv2dDerFilterInternal = function (x, dY, convInfo) {
        var inputDepth = x.shape[2];
        var outputDepth = dY.shape[2];
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var weightsShape = conv_util.computeWeightsShape4D(inputDepth, outputDepth, filterHeight, filterWidth);
        var dW = ndarray_1.Array4D.zeros(weightsShape);
        var yNumRows = dY.shape[0];
        var yNumCols = dY.shape[1];
        var xNumRows = x.shape[0];
        var xNumCols = x.shape[1];
        var leftPad = convInfo.padInfo.left;
        var topPad = convInfo.padInfo.top;
        for (var wR = 0; wR < filterHeight; ++wR) {
            var yRMin = Math.max(0, Math.ceil((topPad - wR) / strideHeight));
            var yRMax = Math.min(yNumRows, (xNumRows + topPad - wR) / strideHeight);
            for (var wC = 0; wC < filterWidth; ++wC) {
                var yCMin = Math.max(0, Math.ceil((leftPad - wC) / strideWidth));
                var yCMax = Math.min(yNumCols, (xNumCols + leftPad - wC) / strideWidth);
                for (var d1 = 0; d1 < inputDepth; ++d1) {
                    for (var d2 = 0; d2 < outputDepth; ++d2) {
                        var dotProd = 0;
                        for (var yR = yRMin; yR < yRMax; ++yR) {
                            var xR = wR + yR * strideHeight - topPad;
                            for (var yC = yCMin; yC < yCMax; ++yC) {
                                var xC = wC + yC * strideWidth - leftPad;
                                dotProd += x.get(xR, xC, d1) * dY.get(yR, yC, d2);
                            }
                        }
                        dW.set(dotProd, wR, wC, d1, d2);
                    }
                }
            }
        }
        return dW;
    };
    NDArrayMathCPU.prototype.conv2dDerBiasInternal = function (dY) {
        var outputDepth = dY.shape[2];
        var numRows = dY.shape[0];
        var numCols = dY.shape[1];
        var values = new Float32Array(outputDepth);
        for (var d2 = 0; d2 < outputDepth; ++d2) {
            var sum = 0;
            for (var r = 0; r < numRows; ++r) {
                for (var c = 0; c < numCols; ++c) {
                    sum += dY.get(r, c, d2);
                }
            }
            values[d2] = sum;
        }
        return ndarray_1.Array1D.new(values);
    };
    NDArrayMathCPU.prototype.depthwiseConv2DInternal = function (input, filter, convInfo) {
        var _a = convInfo.inShape, numBatches = _a[0], xRows = _a[1], xCols = _a[2], inChannels = _a[3];
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var padLeft = convInfo.padInfo.left;
        var padTop = convInfo.padInfo.top;
        var yRows = convInfo.outShape[1];
        var yCols = convInfo.outShape[2];
        var chMul = convInfo.channelMul;
        var y = ndarray_1.Array4D.zeros(convInfo.outShape);
        for (var b = 0; b < numBatches; ++b) {
            for (var d1 = 0; d1 < inChannels; ++d1) {
                for (var yR = 0; yR < yRows; ++yR) {
                    var xRCorner = yR * convInfo.strideHeight - padLeft;
                    var xRMin = Math.max(0, xRCorner);
                    var xRMax = Math.min(xRows, filterHeight + xRCorner);
                    for (var yC = 0; yC < yCols; ++yC) {
                        var xCCorner = yC * convInfo.strideWidth - padTop;
                        var xCMin = Math.max(0, xCCorner);
                        var xCMax = Math.min(xCols, filterWidth + xCCorner);
                        for (var q = 0; q < chMul; ++q) {
                            var dotProd = 0;
                            for (var xR = xRMin; xR < xRMax; ++xR) {
                                var wR = xR - xRCorner;
                                for (var xC = xCMin; xC < xCMax; ++xC) {
                                    var wC = xC - xCCorner;
                                    var pixel = input.get(b, xR, xC, d1);
                                    var weight = filter.get(wR, wC, d1, q);
                                    dotProd += pixel * weight;
                                }
                            }
                            y.set(dotProd, b, yR, yC, d1 * chMul + q);
                        }
                    }
                }
            }
        }
        return y;
    };
    NDArrayMathCPU.prototype.tileInternal = function (a, reps) {
        var newShape = new Array(a.rank);
        for (var i = 0; i < newShape.length; i++) {
            newShape[i] = a.shape[i] * reps[i];
        }
        var dtype;
        if (a.dtype === 'float32') {
            dtype = Float32Array;
        }
        else if (a.dtype === 'int32') {
            dtype = Int32Array;
        }
        else if (a.dtype === 'bool') {
            dtype = Uint8Array;
        }
        else {
            throw new Error("Dtype " + a.dtype + " not supported for tile");
        }
        var resultValues = new dtype(util.sizeFromShape(newShape));
        var result = ndarray_1.NDArray.make(newShape, { values: resultValues }, a.dtype);
        var values = a.getValues();
        for (var i = 0; i < result.size; ++i) {
            var newLoc = result.indexToLoc(i);
            var originalLoc = new Array(a.rank);
            for (var i_1 = 0; i_1 < originalLoc.length; i_1++) {
                originalLoc[i_1] = newLoc[i_1] % a.shape[i_1];
            }
            var originalIndex = a.locToIndex(originalLoc);
            resultValues[i] = values[originalIndex];
        }
        return result;
    };
    NDArrayMathCPU.prototype.transposeInternal = function (a, perm) {
        var newShape = new Array(a.rank);
        for (var i = 0; i < newShape.length; i++) {
            newShape[i] = a.shape[perm[i]];
        }
        var resultValues = new Float32Array(a.size);
        var values = a.getValues();
        var result = ndarray_1.NDArray.make(newShape, { values: resultValues });
        for (var i = 0; i < a.size; ++i) {
            var loc = a.indexToLoc(i);
            var newLoc = new Array(loc.length);
            for (var i_2 = 0; i_2 < newLoc.length; i_2++) {
                newLoc[i_2] = loc[perm[i_2]];
            }
            var newIndex = result.locToIndex(newLoc);
            resultValues[newIndex] = values[i];
        }
        return result;
    };
    NDArrayMathCPU.prototype.pool = function (x, convInfo, poolType) {
        var _a = x.shape, xRows = _a[0], xCols = _a[1], depth = _a[2];
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var y = ndarray_1.Array3D.zeros(convInfo.outShape);
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        for (var d = 0; d < depth; ++d) {
            for (var yR = 0; yR < y.shape[0]; ++yR) {
                var xRCorner = yR * strideHeight - padTop;
                var xRMin = Math.max(0, xRCorner);
                var xRMax = Math.min(xRows, filterHeight + xRCorner);
                for (var yC = 0; yC < y.shape[1]; ++yC) {
                    var xCCorner = yC * strideWidth - padLeft;
                    var xCMin = Math.max(0, xCCorner);
                    var xCMax = Math.min(xCols, filterWidth + xCCorner);
                    var minMaxValue = (poolType === 'max' ? Number.NEGATIVE_INFINITY :
                        Number.POSITIVE_INFINITY);
                    var avgValue = 0;
                    for (var xR = xRMin; xR < xRMax; ++xR) {
                        for (var xC = xCMin; xC < xCMax; ++xC) {
                            var pixel = x.get(xR, xC, d);
                            if (isNaN(pixel)) {
                                minMaxValue = NaN;
                                avgValue = NaN;
                                break;
                            }
                            if ((poolType === 'max' && pixel > minMaxValue) ||
                                (poolType === 'min' && pixel < minMaxValue)) {
                                minMaxValue = pixel;
                            }
                            else if (poolType === 'avg') {
                                avgValue += pixel / (filterHeight * filterWidth);
                            }
                        }
                        if (isNaN(minMaxValue)) {
                            break;
                        }
                    }
                    y.set(poolType === 'avg' ? avgValue : minMaxValue, yR, yC, d);
                }
            }
        }
        return y;
    };
    NDArrayMathCPU.prototype.maxPoolInternal = function (x, convInfo) {
        return this.pool(x, convInfo, 'max');
    };
    NDArrayMathCPU.prototype.maxPoolPositions = function (x, convInfo) {
        var _a = x.shape, xRows = _a[0], xCols = _a[1], depth = _a[2];
        var outputShape = convInfo.outShape;
        var maxPositions = ndarray_1.Array3D.zeros(outputShape);
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        for (var d = 0; d < depth; ++d) {
            for (var yR = 0; yR < outputShape[0]; ++yR) {
                var xRCorner = yR * strideHeight - padTop;
                var xRMin = Math.max(0, xRCorner);
                var xRMax = Math.min(xRows, filterHeight + xRCorner);
                for (var yC = 0; yC < outputShape[1]; ++yC) {
                    var xCCorner = yC * strideWidth - padLeft;
                    var xCMin = Math.max(0, xCCorner);
                    var xCMax = Math.min(xCols, filterWidth + xCCorner);
                    var maxValue = Number.NEGATIVE_INFINITY;
                    var maxPosition = -1;
                    for (var xR = xRMin; xR < xRMax; ++xR) {
                        var wR = xR - xRCorner;
                        for (var xC = xCMin; xC < xCMax; ++xC) {
                            var wC = xC - xCCorner;
                            var pixel = x.get(xR, xC, d);
                            if (pixel > maxValue) {
                                maxValue = pixel;
                                maxPosition = wR * filterWidth + wC;
                            }
                        }
                    }
                    maxPositions.set(maxPosition, yR, yC, d);
                }
            }
        }
        return maxPositions;
    };
    NDArrayMathCPU.prototype.maxPoolBackpropInternal = function (dy, x, convInfo) {
        var maxPositions = this.maxPoolPositions(x, convInfo);
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var padLeft = filterWidth - 1 - convInfo.padInfo.left;
        var padTop = filterHeight - 1 - convInfo.padInfo.top;
        var _a = dy.shape, dyRows = _a[0], dyCols = _a[1], depth = _a[2];
        var dx = ndarray_1.Array3D.zeros(x.shape);
        for (var d = 0; d < depth; ++d) {
            for (var dxR = 0; dxR < dx.shape[0]; ++dxR) {
                for (var dxC = 0; dxC < dx.shape[1]; ++dxC) {
                    var dyRCorner = dxR - padTop;
                    var dyCCorner = dxC - padLeft;
                    var dotProd = 0;
                    for (var wR = 0; wR < filterHeight; ++wR) {
                        var dyR = (dyRCorner + wR) / strideHeight;
                        if (dyR < 0 || dyR >= dyRows || Math.floor(dyR) !== dyR) {
                            continue;
                        }
                        for (var wC = 0; wC < filterWidth; ++wC) {
                            var dyC = (dyCCorner + wC) / strideWidth;
                            if (dyC < 0 || dyC >= dyCols || Math.floor(dyC) !== dyC) {
                                continue;
                            }
                            var maxPos = filterHeight * filterWidth - 1 -
                                maxPositions.get(dyR, dyC, d);
                            var curPos = wR * filterWidth + wC;
                            var mask = maxPos === curPos ? 1 : 0;
                            if (mask === 0) {
                                continue;
                            }
                            var pixel = dy.get(dyR, dyC, d);
                            dotProd += pixel * mask;
                        }
                    }
                    dx.set(dotProd, dxR, dxC, d);
                }
            }
        }
        return dx;
    };
    NDArrayMathCPU.prototype.minPoolInternal = function (x, convInfo) {
        return this.pool(x, convInfo, 'min');
    };
    NDArrayMathCPU.prototype.avgPoolInternal = function (x, convInfo) {
        return this.pool(x, convInfo, 'avg');
    };
    NDArrayMathCPU.prototype.resizeBilinear3DInternal = function (x, newShape2D, alignCorners) {
        var output = ndarray_1.Array3D.zeros([newShape2D[0], newShape2D[1], x.shape[2]]);
        var effectiveInputSize = alignCorners ? [x.shape[0] - 1, x.shape[1] - 1, x.shape[2]] : x.shape;
        var effectiveOutputSize = alignCorners ?
            [output.shape[0] - 1, output.shape[1] - 1, output.shape[2]] :
            output.shape;
        for (var r = 0; r < output.shape[0]; r++) {
            for (var c = 0; c < output.shape[1]; c++) {
                for (var d = 0; d < output.shape[2]; d++) {
                    var sourceFracRow = (effectiveInputSize[0]) * r / (effectiveOutputSize[0]);
                    var sourceFracCol = (effectiveInputSize[1]) * c / (effectiveOutputSize[1]);
                    var sourceRowFloor = Math.floor(sourceFracRow);
                    var sourceRowCeil = Math.min(x.shape[0] - 1, Math.ceil(sourceFracRow));
                    var sourceColFloor = Math.floor(sourceFracCol);
                    var sourceColCeil = Math.min(x.shape[1] - 1, Math.ceil(sourceFracCol));
                    var topLeft = x.get(sourceRowFloor, sourceColFloor, d);
                    var bottomLeft = x.get(sourceRowCeil, sourceColFloor, d);
                    var topRight = x.get(sourceRowFloor, sourceColCeil, d);
                    var bottomRight = x.get(sourceRowCeil, sourceColCeil, d);
                    var rowFrac = sourceFracRow - sourceRowFloor;
                    var colFrac = sourceFracCol - sourceColFloor;
                    var top_1 = topLeft + (topRight - topLeft) * colFrac;
                    var bottom = bottomLeft + (bottomRight - bottomLeft) * colFrac;
                    var newValue = top_1 + (bottom - top_1) * rowFrac;
                    output.set(newValue, r, c, d);
                }
            }
        }
        return output;
    };
    NDArrayMathCPU.prototype.batchNormalization2DInternal = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var xValues = x.getValues();
        var meanValues = mean.getValues();
        var varianceValues = variance.getValues();
        var scaleValues = scale ? scale.getValues() : new Float32Array([1]);
        var offsetValues = offset ? offset.getValues() : new Float32Array([0]);
        var outValues = new Float32Array(xValues.length);
        for (var i = 0; i < xValues.length; i++) {
            outValues[i] = offsetValues[i % offsetValues.length] +
                (xValues[i] - meanValues[i % meanValues.length]) *
                    scaleValues[i % scaleValues.length] /
                    Math.sqrt(varianceValues[i % varianceValues.length] + varianceEpsilon);
        }
        return ndarray_1.Array2D.new(x.shape, outValues);
    };
    NDArrayMathCPU.prototype.batchNormalization3DInternal = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var xValues = x.getValues();
        var meanValues = mean.getValues();
        var varianceValues = variance.getValues();
        var scaleValues = scale ? scale.getValues() : new Float32Array([1]);
        var offsetValues = offset ? offset.getValues() : new Float32Array([0]);
        var outValues = new Float32Array(xValues.length);
        for (var i = 0; i < xValues.length; i++) {
            outValues[i] = offsetValues[i % offsetValues.length] +
                (xValues[i] - meanValues[i % meanValues.length]) *
                    scaleValues[i % scaleValues.length] /
                    Math.sqrt(varianceValues[i % varianceValues.length] + varianceEpsilon);
        }
        return ndarray_1.Array3D.new(x.shape, outValues);
    };
    NDArrayMathCPU.prototype.multinomialInternal = function (probabilities, numSamples, seed) {
        var batchSize = probabilities.shape[0];
        var numEvents = probabilities.shape[1];
        var res = ndarray_1.Array2D.zeros([batchSize, numSamples], 'int32');
        var resVals = res.getValues();
        var probVals = probabilities.getValues();
        for (var b = 0; b < batchSize; ++b) {
            var offset = b * numEvents;
            var cdf = new Float32Array(numEvents - 1);
            cdf[0] = probVals[offset];
            for (var event_1 = 1; event_1 < cdf.length; ++event_1) {
                cdf[event_1] = cdf[event_1 - 1] + probVals[offset + event_1];
            }
            var random = seedrandom.alea(seed.toString());
            var outOffset = b * numSamples;
            for (var sampleId = 0; sampleId < numSamples; ++sampleId) {
                var r = random();
                resVals[outOffset + sampleId] = cdf.length;
                for (var event_2 = 0; event_2 < cdf.length; event_2++) {
                    if (r < cdf[event_2]) {
                        resVals[outOffset + sampleId] = event_2;
                        break;
                    }
                }
            }
        }
        return res;
    };
    NDArrayMathCPU.prototype.oneHotInternal = function (indices, depth, onValue, offValue) {
        var res = new Float32Array(indices.size * depth);
        res.fill(offValue);
        for (var event_3 = 0; event_3 < indices.size; ++event_3) {
            res[event_3 * depth + indices.get(event_3)] = onValue;
        }
        return ndarray_1.Array2D.new([indices.size, depth], res);
    };
    NDArrayMathCPU.prototype.broadcastedBinaryOp = function (a, b, dtype, op) {
        var newShape = broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
        var result = ndarray_1.NDArray.zeros(newShape, dtype);
        var newValues = result.getValues();
        var aValues = a.getValues();
        var bValues = b.getValues();
        var aBroadcastDims = broadcast_util.getBroadcastDims(a.shape, newShape);
        var bBroadcastDims = broadcast_util.getBroadcastDims(b.shape, newShape);
        var _loop_1 = function (i) {
            var loc = result.indexToLoc(i);
            var aLoc = loc.slice(-a.rank);
            aBroadcastDims.forEach(function (d) { return aLoc[d] = 0; });
            var aIndex = a.locToIndex(aLoc);
            var bLoc = loc.slice(-b.rank);
            bBroadcastDims.forEach(function (d) { return bLoc[d] = 0; });
            var bIndex = b.locToIndex(bLoc);
            newValues[i] = op(aValues[aIndex], bValues[bIndex]);
        };
        for (var i = 0; i < newValues.length; ++i) {
            _loop_1(i);
        }
        return result;
    };
    return NDArrayMathCPU;
}(math_1.NDArrayMath));
exports.NDArrayMathCPU = NDArrayMathCPU;
//# sourceMappingURL=math_cpu.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
var axis_util = __webpack_require__(21);
var math_1 = __webpack_require__(15);
var ndarray = __webpack_require__(1);
var ndarray_1 = __webpack_require__(1);
var reduce_util = __webpack_require__(83);
var addscaledmat_gpu_1 = __webpack_require__(85);
var argminmax_gpu_1 = __webpack_require__(86);
var batchnorm_gpu_1 = __webpack_require__(87);
var binaryop_gpu = __webpack_require__(34);
var binaryop_gpu_1 = __webpack_require__(34);
var clip_gpu_1 = __webpack_require__(88);
var concat_gpu_1 = __webpack_require__(89);
var conv_backprop_gpu_1 = __webpack_require__(90);
var conv_gpu_1 = __webpack_require__(91);
var conv_gpu_depthwise_1 = __webpack_require__(92);
var copy_gpu_1 = __webpack_require__(93);
var gpgpu_context_1 = __webpack_require__(35);
var gpgpu_math = __webpack_require__(94);
var gpgpu_util = __webpack_require__(22);
var max_pool_backprop_gpu_1 = __webpack_require__(95);
var mulmat_gpu_1 = __webpack_require__(96);
var multinomial_gpu_1 = __webpack_require__(97);
var onehot_gpu_1 = __webpack_require__(98);
var pool_gpu_1 = __webpack_require__(99);
var reduce_gpu_1 = __webpack_require__(100);
var resize_bilinear_gpu_1 = __webpack_require__(102);
var slice_gpu_1 = __webpack_require__(103);
var texture_manager_1 = __webpack_require__(104);
var tile_gpu_1 = __webpack_require__(105);
var transpose_gpu_1 = __webpack_require__(106);
var unary_op = __webpack_require__(36);
var unaryop_gpu_1 = __webpack_require__(36);
var webgl_util = __webpack_require__(10);
var NDArrayMathGPU = (function (_super) {
    __extends(NDArrayMathGPU, _super);
    function NDArrayMathGPU(gpgpu, safeMode) {
        if (safeMode === void 0) { safeMode = false; }
        var _this = _super.call(this, safeMode) || this;
        _this.binaryCache = {};
        if (gpgpu == null) {
            var gl = gpgpu_util.createWebGLContext();
            _this.gpgpu = new gpgpu_context_1.GPGPUContext(gl);
            _this.gpgpuCreatedLocally = true;
        }
        else {
            _this.gpgpu = gpgpu;
            _this.gpgpuCreatedLocally = false;
        }
        _this.textureManager = new texture_manager_1.TextureManager(_this.gpgpu);
        ndarray.initializeGPU(_this.gpgpu, _this.textureManager);
        return _this;
    }
    NDArrayMathGPU.prototype.getGPGPUContext = function () {
        return this.gpgpu;
    };
    NDArrayMathGPU.prototype.cloneInternal = function (a) {
        var texShape = a.getTextureShapeRC();
        var source = a.as2D(texShape[0], texShape[1]);
        var output = this.makeOutputArray(texShape, a.dtype);
        this.copy2D(source, [0, 0], texShape, output, [0, 0], texShape);
        return output.reshape(a.shape);
    };
    NDArrayMathGPU.prototype.slice1DInternal = function (input, begin, size) {
        var program = new slice_gpu_1.SliceProgram([size]);
        var customSetup = program.getCustomSetupFunc([begin]);
        return this.compileAndRun(program, [input], null, customSetup);
    };
    NDArrayMathGPU.prototype.slice2DInternal = function (input, begin, size) {
        var program = new slice_gpu_1.SliceProgram(size);
        var customSetup = program.getCustomSetupFunc(begin);
        return this.compileAndRun(program, [input], null, customSetup);
    };
    NDArrayMathGPU.prototype.slice3DInternal = function (input, begin, size) {
        var program = new slice_gpu_1.SliceProgram(size);
        var customSetup = program.getCustomSetupFunc(begin);
        return this.compileAndRun(program, [input], null, customSetup);
    };
    NDArrayMathGPU.prototype.slice4DInternal = function (input, begin, size) {
        var program = new slice_gpu_1.SliceProgram(size);
        var customSetup = program.getCustomSetupFunc(begin);
        return this.compileAndRun(program, [input], null, customSetup);
    };
    NDArrayMathGPU.prototype.copy2DInternal = function (source, sourceBeginRowCol, sourceSizeRowCol, dest, destBeginRowCol, destSizeRowCol) {
        var program = new copy_gpu_1.Copy2DProgram(sourceSizeRowCol[1], destSizeRowCol[1]);
        var customSetup = program.getCustomSetupFunc(sourceBeginRowCol, destBeginRowCol, destSizeRowCol);
        this.compileAndRun(program, [source], dest, customSetup);
    };
    NDArrayMathGPU.prototype.concat1DInternal = function (a, b) {
        var program = new concat_gpu_1.ConcatProgram(a.shape, b.shape, 0);
        return this.compileAndRun(program, [a, b]);
    };
    NDArrayMathGPU.prototype.concat2DInternal = function (a, b, axis) {
        var program = new concat_gpu_1.ConcatProgram(a.shape, b.shape, axis);
        return this.compileAndRun(program, [a, b]);
    };
    NDArrayMathGPU.prototype.concat3DInternal = function (x1, x2, axis) {
        var program = new concat_gpu_1.ConcatProgram(x1.shape, x2.shape, axis);
        return this.compileAndRun(program, [x1, x2]);
    };
    NDArrayMathGPU.prototype.concat4DInternal = function (x1, x2, axis) {
        var program = new concat_gpu_1.ConcatProgram(x1.shape, x2.shape, axis);
        return this.compileAndRun(program, [x1, x2]);
    };
    NDArrayMathGPU.prototype.scaledArrayAddInternal = function (c1, a, c2, b) {
        var program = new addscaledmat_gpu_1.AddScaledMatProgram(a.shape, b.shape);
        return this.compileAndRun(program, [a, b, c1, c2]);
    };
    NDArrayMathGPU.prototype.negInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.NEG);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.makeOutputArray = function (shape, dtype) {
        var textureShapeRC = webgl_util.getTextureShapeFromLogicalShape(this.gpgpu.gl, shape);
        var texture = this.textureManager.acquireTexture(textureShapeRC);
        return ndarray_1.NDArray.make(shape, { texture: texture, textureShapeRC: textureShapeRC }, dtype);
    };
    NDArrayMathGPU.prototype.compileAndRun = function (program, inputs, output, customSetup) {
        var _this = this;
        if (output == null) {
            output = this.makeOutputArray(program.outputShape, inputs[0].dtype);
        }
        var key = gpgpu_math.makeShaderKey(program, inputs, output);
        var binary = this.getAndSaveBinary(key, function () {
            return gpgpu_math.compileProgram(_this.gpgpu, program, inputs, output);
        });
        gpgpu_math.runProgram(binary, inputs, output, customSetup);
        return output;
    };
    NDArrayMathGPU.prototype.matMulInternal = function (a, b, aOrientation, bOrientation) {
        var program = new mulmat_gpu_1.MatMulProgram(a.shape, b.shape, aOrientation, bOrientation);
        return this.compileAndRun(program, [a, b]);
    };
    NDArrayMathGPU.prototype.multiplyInternal = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.MUL, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    NDArrayMathGPU.prototype.batchNormalization2DInternal = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var inputs = [x, mean, variance];
        var offsetShape = null;
        if (offset != null) {
            offsetShape = offset.shape;
            inputs.push(offset);
        }
        var scaleShape = null;
        if (scale != null) {
            scaleShape = scale.shape;
            inputs.push(scale);
        }
        var program = new batchnorm_gpu_1.BatchNormProgram(x.shape, mean.shape, variance.shape, offsetShape, scaleShape, varianceEpsilon);
        return this.compileAndRun(program, inputs);
    };
    NDArrayMathGPU.prototype.batchNormalization3DInternal = function (x, mean, variance, varianceEpsilon, scale, offset) {
        var inputs = [x, mean, variance];
        var offsetShape = null;
        if (offset != null) {
            offsetShape = offset.shape;
            inputs.push(offset);
        }
        var scaleShape = null;
        if (scale != null) {
            scaleShape = scale.shape;
            inputs.push(scale);
        }
        var program = new batchnorm_gpu_1.BatchNormProgram(x.shape, mean.shape, variance.shape, offsetShape, scaleShape, varianceEpsilon);
        return this.compileAndRun(program, inputs);
    };
    NDArrayMathGPU.prototype.tileInternal = function (a, reps) {
        var program = new tile_gpu_1.TileProgram(a.shape, reps);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.transposeInternal = function (a, perm) {
        var program = new transpose_gpu_1.TransposeProgram(a.shape, perm);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.reduce = function (a, reduceType, dtype) {
        var batchSize = a.shape[0];
        var inSize = a.shape[1];
        var windowSize = reduce_util.computeOptimalWindowSize(inSize);
        var reduceInfo = { windowSize: windowSize, inSize: inSize, batchSize: batchSize };
        var program = new reduce_gpu_1.ReduceProgram(reduceInfo, reduceType);
        var _a = program.outputShape, rows = _a[0], cols = _a[1];
        var output = this.makeOutputArray(program.outputShape, dtype).as2D(rows, cols);
        this.compileAndRun(program, [a], output);
        if (output.shape[1] === 1) {
            return output;
        }
        return this.reduce(output, reduceType, dtype);
    };
    NDArrayMathGPU.prototype.argReduce = function (a, reduceType, bestIndicesA) {
        if (bestIndicesA === void 0) { bestIndicesA = null; }
        var batchSize = a.shape[0];
        var inSize = a.shape[1];
        if (bestIndicesA != null) {
            batchSize = bestIndicesA.shape[0];
            inSize = bestIndicesA.shape[1];
        }
        var windowSize = reduce_util.computeOptimalWindowSize(inSize);
        var reduceInfo = { windowSize: windowSize, inSize: inSize, batchSize: batchSize };
        var program = new argminmax_gpu_1.ArgMinMaxProgram(reduceInfo, reduceType, bestIndicesA == null);
        var _a = program.outputShape, rows = _a[0], cols = _a[1];
        var output = this.makeOutputArray(program.outputShape, 'int32').as2D(rows, cols);
        var inputs = [a];
        if (bestIndicesA != null) {
            inputs.push(bestIndicesA);
        }
        this.compileAndRun(program, inputs, output);
        if (output.shape[1] === 1) {
            return output;
        }
        return this.argReduce(a, reduceType, output);
    };
    NDArrayMathGPU.prototype.sumInternal = function (a, axes) {
        axis_util.assertAxesAreInnerMostDims('sum', axes, a.rank);
        var _a = axis_util.computeOutAndReduceShapes(a.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = a.as2D(-1, inSize);
        var outputDType = math_1.SumTypesMap[a.dtype];
        return this.reduce(a2D, 'sum', outputDType).reshape(outShape);
    };
    NDArrayMathGPU.prototype.argMinInternal = function (a, axes) {
        axis_util.assertAxesAreInnerMostDims('argMin', axes, a.rank);
        var _a = axis_util.computeOutAndReduceShapes(a.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = a.as2D(-1, inSize);
        return this.argReduce(a2D, 'min').reshape(outShape);
    };
    NDArrayMathGPU.prototype.argMaxInternal = function (a, axes) {
        axis_util.assertAxesAreInnerMostDims('argMax', axes, a.rank);
        var _a = axis_util.computeOutAndReduceShapes(a.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = a.as2D(-1, inSize);
        return this.argReduce(a2D, 'max').reshape(outShape);
    };
    NDArrayMathGPU.prototype.equalInternal = function (x, y) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.EQUAL, x.shape, y.shape);
        var output = this.makeOutputArray(program.outputShape, 'bool');
        return this.compileAndRun(program, [x, y], output);
    };
    NDArrayMathGPU.prototype.topKInternal = function (ndarray, k) {
        throw new Error('topK GPU not yet implemented!');
    };
    NDArrayMathGPU.prototype.minInternal = function (a, axes) {
        axis_util.assertAxesAreInnerMostDims('min', axes, a.rank);
        var _a = axis_util.computeOutAndReduceShapes(a.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = a.as2D(-1, inSize);
        return this.reduce(a2D, 'min', a2D.dtype).reshape(outShape);
    };
    NDArrayMathGPU.prototype.maxInternal = function (a, axes) {
        axis_util.assertAxesAreInnerMostDims('max', axes, a.rank);
        var _a = axis_util.computeOutAndReduceShapes(a.shape, axes), outShape = _a[0], reduceShape = _a[1];
        var inSize = util.sizeFromShape(reduceShape);
        var a2D = a.as2D(-1, inSize);
        return this.reduce(a2D, 'max', a2D.dtype).reshape(outShape);
    };
    NDArrayMathGPU.prototype.divideInternal = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.DIV, a.shape, b.shape);
        var output = this.makeOutputArray(program.outputShape, 'float32');
        return this.compileAndRun(program, [a, b], output);
    };
    NDArrayMathGPU.prototype.addInternal = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.ADD, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    NDArrayMathGPU.prototype.subtractInternal = function (a, b) {
        var program = new binaryop_gpu_1.BinaryOpProgram(binaryop_gpu.SUB, a.shape, b.shape);
        return this.compileAndRun(program, [a, b]);
    };
    NDArrayMathGPU.prototype.ceilInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.CEIL);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.floorInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.FLOOR);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.expInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.EXP);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.logInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.LOG);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.sqrtInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.SQRT);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.squareInternal = function (x) {
        var program = new unaryop_gpu_1.UnaryOpProgram(x.shape, unary_op.SQUARE);
        return this.compileAndRun(program, [x]);
    };
    NDArrayMathGPU.prototype.reluInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.RELU);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.eluInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.ELU);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.leakyReluInternal = function (a, alpha) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.LEAKY_RELU(alpha));
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.clipInternal = function (a, min, max) {
        var program = new clip_gpu_1.ClipProgram(a.shape, min, max);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.absInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.ABS);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.sigmoidInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.SIGMOID);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.sinInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.SIN);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.cosInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.COS);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.tanInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.TAN);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.asinInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.ASIN);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.acosInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.ACOS);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.atanInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.ATAN);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.sinhInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.SINH);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.coshInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.COSH);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.tanhInternal = function (a) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.TANH);
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.stepInternal = function (a, alpha) {
        var program = new unaryop_gpu_1.UnaryOpProgram(a.shape, unary_op.STEP(alpha));
        return this.compileAndRun(program, [a]);
    };
    NDArrayMathGPU.prototype.conv2dInternal = function (x, filter, bias, convInfo) {
        var program = new conv_gpu_1.Conv2DProgram(convInfo, bias != null);
        var inputs = bias != null ? [x, filter, bias] : [x, filter];
        return this.compileAndRun(program, inputs);
    };
    NDArrayMathGPU.prototype.conv2dDerInputInternal = function (dy, filter, convInfo) {
        var program = new conv_backprop_gpu_1.Conv2DDerInputProgram(convInfo);
        return this.compileAndRun(program, [dy, filter]);
    };
    NDArrayMathGPU.prototype.conv2dDerFilterInternal = function (x, dY, convInfo) {
        var program = new conv_backprop_gpu_1.Conv2DDerWeightsProgram(convInfo);
        return this.compileAndRun(program, [x, dY]);
    };
    NDArrayMathGPU.prototype.conv2dDerBiasInternal = function (dY) {
        var program = new conv_backprop_gpu_1.Conv2DDerBiasProgram(dY.shape);
        return this.compileAndRun(program, [dY]);
    };
    NDArrayMathGPU.prototype.depthwiseConv2DInternal = function (input, filter, convInfo) {
        var program = new conv_gpu_depthwise_1.DepthwiseConv2DProgram(convInfo);
        return this.compileAndRun(program, [input, filter]);
    };
    NDArrayMathGPU.prototype.maxPoolInternal = function (x, convInfo) {
        var program = new pool_gpu_1.Pool2DProgram(convInfo, 'max', false);
        return this.compileAndRun(program, [x]);
    };
    NDArrayMathGPU.prototype.minPoolInternal = function (x, convInfo) {
        var program = new pool_gpu_1.Pool2DProgram(convInfo, 'min', false);
        return this.compileAndRun(program, [x]);
    };
    NDArrayMathGPU.prototype.avgPoolInternal = function (x, convInfo) {
        var program = new pool_gpu_1.Pool2DProgram(convInfo, 'avg', false);
        return this.compileAndRun(program, [x]);
    };
    NDArrayMathGPU.prototype.maxPoolBackpropInternal = function (dy, x, convInfo) {
        var getPositions = true;
        var maxPoolPositionsProgram = new pool_gpu_1.Pool2DProgram(convInfo, 'max', getPositions);
        var maxPoolPositions = this.compileAndRun(maxPoolPositionsProgram, [x]);
        var maxPoolBackPropProgram = new max_pool_backprop_gpu_1.MaxPool2DBackpropProgram(convInfo);
        var result = this.compileAndRun(maxPoolBackPropProgram, [dy, maxPoolPositions]);
        maxPoolPositions.dispose();
        return result;
    };
    NDArrayMathGPU.prototype.resizeBilinear3DInternal = function (x, newShape2D, alignCorners) {
        var program = new resize_bilinear_gpu_1.ResizeBilinear3DProgram(x.shape, newShape2D, alignCorners);
        return this.compileAndRun(program, [x]);
    };
    NDArrayMathGPU.prototype.multinomialInternal = function (probs, numSamples, seed) {
        var batchSize = probs.shape[0];
        var numOutcomes = probs.shape[1];
        var program = new multinomial_gpu_1.MultinomialProgram(batchSize, numOutcomes, numSamples);
        var output = this.makeOutputArray(program.outputShape, 'int32');
        var customSetup = program.getCustomSetupFunc(seed);
        return this.compileAndRun(program, [probs], output, customSetup);
    };
    NDArrayMathGPU.prototype.oneHotInternal = function (indices, depth, onValue, offValue) {
        var program = new onehot_gpu_1.OneHotProgram(indices.size, depth, onValue, offValue);
        return this.compileAndRun(program, [indices]);
    };
    NDArrayMathGPU.prototype.getAndSaveBinary = function (key, getBinary) {
        if (!(key in this.binaryCache)) {
            this.binaryCache[key] = getBinary();
        }
        return this.binaryCache[key];
    };
    NDArrayMathGPU.prototype.getTextureManager = function () {
        return this.textureManager;
    };
    NDArrayMathGPU.prototype.dispose = function () {
        for (var key in this.binaryCache) {
            this.gpgpu.deleteProgram(this.binaryCache[key].webGLProgram);
        }
        this.textureManager.dispose();
        if (this.gpgpuCreatedLocally) {
            this.gpgpu.dispose();
        }
    };
    return NDArrayMathGPU;
}(math_1.NDArrayMath));
exports.NDArrayMathGPU = NDArrayMathGPU;
//# sourceMappingURL=math_gpu.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var broadcast_util = __webpack_require__(9);
exports.ADD = 'return a + b;';
exports.SUB = 'return a - b;';
exports.MUL = 'return a * b;';
exports.DIV = 'return a / b;';
exports.EQUAL = "\n  if (isNaN(a)) return a;\n  if (isNaN(b)) return b;\n  return float(a == b);\n";
var BinaryOpProgram = (function () {
    function BinaryOpProgram(op, aShape, bShape) {
        this.variableNames = ['A', 'B'];
        this.supportsBroadcasting = true;
        this.outputShape =
            broadcast_util.assertAndGetBroadcastShape(aShape, bShape);
        this.userCode = "\n      float binaryOperation(float a, float b) {\n        " + op + "\n      }\n\n      void main() {\n        float a = getAAtOutCoords();\n        float b = getBAtOutCoords();\n        setOutput(binaryOperation(a, b));\n      }\n    ";
    }
    return BinaryOpProgram;
}());
exports.BinaryOpProgram = BinaryOpProgram;
//# sourceMappingURL=binaryop_gpu.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(5);
var util = __webpack_require__(0);
var gpgpu_util = __webpack_require__(22);
var tex_util = __webpack_require__(17);
var webgl_util = __webpack_require__(10);
var GPGPUContext = (function () {
    function GPGPUContext(gl) {
        this.outputTexture = null;
        this.program = null;
        this.disposed = false;
        this.autoDebugValidate = false;
        if (gl != null) {
            this.gl = gl;
        }
        else {
            this.gl = gpgpu_util.createWebGLContext();
        }
        if (environment_1.ENV.get('WEBGL_VERSION') === 1) {
            this.textureFloatExtension =
                webgl_util.getExtensionOrThrow(this.gl, 'OES_texture_float');
            this.colorBufferFloatExtension =
                this.gl.getExtension('WEBGL_color_buffer_float');
        }
        else {
            this.colorBufferFloatExtension =
                webgl_util.getExtensionOrThrow(this.gl, 'EXT_color_buffer_float');
        }
        this.loseContextExtension =
            webgl_util.getExtensionOrThrow(this.gl, 'WEBGL_lose_context');
        if (environment_1.ENV.get('WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED')) {
            this.getBufferSubDataAsyncExtension =
                this.gl.getExtension('WEBGL_get_buffer_sub_data_async');
        }
        this.vertexBuffer = gpgpu_util.createVertexBuffer(this.gl);
        this.indexBuffer = gpgpu_util.createIndexBuffer(this.gl);
        this.framebuffer = webgl_util.createFramebuffer(this.gl);
    }
    GPGPUContext.prototype.dispose = function () {
        var _this = this;
        this.throwIfDisposed();
        if (this.program != null) {
            console.warn('Disposing a GPGPUContext that still has a bound WebGLProgram.' +
                ' This is probably a resource leak, delete the program with ' +
                'GPGPUContext.deleteProgram before disposing.');
        }
        if (this.outputTexture != null) {
            console.warn('Disposing a GPGPUContext that still has a bound output matrix ' +
                'texture.  This is probably a resource leak, delete the output ' +
                'matrix texture with GPGPUContext.deleteMatrixTexture before ' +
                'disposing.');
        }
        var gl = this.gl;
        webgl_util.callAndCheck(gl, function () { return gl.finish(); });
        webgl_util.callAndCheck(gl, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, null); });
        webgl_util.callAndCheck(gl, function () { return gl.deleteFramebuffer(_this.framebuffer); });
        webgl_util.callAndCheck(gl, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, null); });
        webgl_util.callAndCheck(gl, function () { return gl.deleteBuffer(_this.vertexBuffer); });
        webgl_util.callAndCheck(gl, function () { return gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); });
        webgl_util.callAndCheck(gl, function () { return gl.deleteBuffer(_this.indexBuffer); });
        this.loseContextExtension.loseContext();
        this.disposed = true;
    };
    GPGPUContext.prototype.enableAutomaticDebugValidation = function (enabled) {
        this.autoDebugValidate = enabled;
        webgl_util.enableDebugWebGLErrorChecking(enabled);
    };
    GPGPUContext.prototype.createMatrixTexture = function (rows, columns) {
        this.throwIfDisposed();
        return gpgpu_util.createMatrixTexture(this.gl, rows, columns);
    };
    GPGPUContext.prototype.uploadPixelDataToTexture = function (texture, pixels) {
        this.throwIfDisposed();
        gpgpu_util.uploadPixelDataToTexture(this.gl, texture, pixels);
    };
    GPGPUContext.prototype.createPackedMatrixTexture = function (rows, columns) {
        this.throwIfDisposed();
        return gpgpu_util.createPackedMatrixTexture(this.gl, rows, columns);
    };
    GPGPUContext.prototype.deleteMatrixTexture = function (texture) {
        var _this = this;
        this.throwIfDisposed();
        if (this.outputTexture === texture) {
            webgl_util.unbindColorTextureFromFramebuffer(this.gl, this.framebuffer);
            this.outputTexture = null;
        }
        webgl_util.callAndCheck(this.gl, function () { return _this.gl.deleteTexture(texture); });
    };
    GPGPUContext.prototype.uploadMatrixToTexture = function (texture, rows, columns, matrix) {
        this.throwIfDisposed();
        var numChannels = 1;
        return gpgpu_util.uploadMatrixToTexture(this.gl, texture, rows, columns, matrix, numChannels);
    };
    GPGPUContext.prototype.uploadMatrixToPackedTexture = function (texture, rows, columns, matrix) {
        this.throwIfDisposed();
        return gpgpu_util.uploadMatrixToPackedTexture(this.gl, texture, rows, columns, matrix);
    };
    GPGPUContext.prototype.downloadMatrixFromTexture = function (texture, rows, columns) {
        var _this = this;
        return this.downloadMatrixDriver(texture, function () {
            return gpgpu_util.downloadMatrixFromOutputTexture(_this.gl, rows, columns);
        });
    };
    GPGPUContext.prototype.downloadMatrixFromTextureAsync = function (texture, rows, columns) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.getBufferSubDataAsyncExtension == null) {
                    throw new Error("Cannot download matrix from output texture asynchronously, " +
                        "WEBGL_get_buffer_sub_data_async is not enabled.");
                }
                return [2, this.downloadMatrixDriverAsync(texture, function () { return gpgpu_util.downloadMatrixFromOutputTextureAsync(_this.gl, _this.getBufferSubDataAsyncExtension, rows, columns); })];
            });
        });
    };
    GPGPUContext.prototype.downloadMatrixFromRGBAColorTexture = function (texture, rows, columns, channels) {
        var _this = this;
        return this.downloadMatrixDriver(texture, function () { return gpgpu_util.downloadMatrixFromRGBAColorTexture(_this.gl, rows, columns, channels); });
    };
    GPGPUContext.prototype.downloadMatrixFromPackedTexture = function (texture, rows, columns) {
        var _this = this;
        return this.downloadMatrixDriver(texture, function () { return gpgpu_util.downloadMatrixFromPackedOutputTexture(_this.gl, rows, columns); });
    };
    GPGPUContext.prototype.createProgram = function (fragmentShaderSource) {
        this.throwIfDisposed();
        var gl = this.gl;
        var fragmentShader = webgl_util.createFragmentShader(gl, fragmentShaderSource);
        var vertexShader = gpgpu_util.createVertexShader(gl);
        var program = webgl_util.createProgram(gl);
        webgl_util.callAndCheck(gl, function () { return gl.attachShader(program, vertexShader); });
        webgl_util.callAndCheck(gl, function () { return gl.attachShader(program, fragmentShader); });
        webgl_util.linkProgram(gl, program);
        if (this.autoDebugValidate) {
            webgl_util.validateProgram(gl, program);
        }
        return program;
    };
    GPGPUContext.prototype.deleteProgram = function (program) {
        var _this = this;
        this.throwIfDisposed();
        if (program === this.program) {
            this.program = null;
        }
        if (program != null) {
            webgl_util.callAndCheck(this.gl, function () { return _this.gl.deleteProgram(program); });
        }
    };
    GPGPUContext.prototype.setProgram = function (program) {
        var _this = this;
        this.throwIfDisposed();
        this.program = program;
        if ((this.program != null) && this.autoDebugValidate) {
            webgl_util.validateProgram(this.gl, this.program);
        }
        webgl_util.callAndCheck(this.gl, function () { return _this.gl.useProgram(program); });
    };
    GPGPUContext.prototype.getUniformLocation = function (program, uniformName) {
        this.throwIfDisposed();
        return webgl_util.getProgramUniformLocationOrThrow(this.gl, program, uniformName);
    };
    GPGPUContext.prototype.getAttributeLocation = function (program, attribute) {
        var _this = this;
        this.throwIfDisposed();
        return webgl_util.callAndCheck(this.gl, function () { return _this.gl.getAttribLocation(program, attribute); });
    };
    GPGPUContext.prototype.getUniformLocationNoThrow = function (program, uniformName) {
        this.throwIfDisposed();
        return this.gl.getUniformLocation(program, uniformName);
    };
    GPGPUContext.prototype.setInputMatrixTexture = function (inputMatrixTexture, uniformLocation, textureUnit) {
        this.throwIfDisposed();
        this.throwIfNoProgram();
        webgl_util.bindTextureToProgramUniformSampler(this.gl, this.program, inputMatrixTexture, uniformLocation, textureUnit);
    };
    GPGPUContext.prototype.setOutputMatrixTexture = function (outputMatrixTexture, rows, columns) {
        this.setOutputMatrixTextureDriver(outputMatrixTexture, columns, rows);
    };
    GPGPUContext.prototype.setOutputPackedMatrixTexture = function (outputPackedMatrixTexture, rows, columns) {
        this.throwIfDisposed();
        var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
        this.setOutputMatrixTextureDriver(outputPackedMatrixTexture, width, height);
    };
    GPGPUContext.prototype.setOutputMatrixWriteRegion = function (startRow, numRows, startColumn, numColumns) {
        this.setOutputMatrixWriteRegionDriver(startColumn, startRow, numColumns, numRows);
    };
    GPGPUContext.prototype.setOutputPackedMatrixWriteRegion = function (startRow, numRows, startColumn, numColumns) {
        throw new Error('setOutputPackedMatrixWriteRegion not implemented.');
    };
    GPGPUContext.prototype.debugValidate = function () {
        if (this.program != null) {
            webgl_util.validateProgram(this.gl, this.program);
        }
        webgl_util.validateFramebuffer(this.gl);
    };
    GPGPUContext.prototype.executeProgram = function (attribLocations) {
        this.throwIfDisposed();
        this.throwIfNoProgram();
        var gl = this.gl;
        gpgpu_util.bindVertexProgramAttributeStreams(gl, this.program, this.vertexBuffer, attribLocations);
        if (this.autoDebugValidate) {
            this.debugValidate();
        }
        webgl_util.callAndCheck(gl, function () { return gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0); });
    };
    GPGPUContext.prototype.blockUntilAllProgramsCompleted = function () {
        var _this = this;
        this.throwIfDisposed();
        webgl_util.callAndCheck(this.gl, function () { return _this.gl.finish(); });
    };
    GPGPUContext.prototype.runQuery = function (queryFn) {
        if (environment_1.ENV.get('WEBGL_VERSION') === 2) {
            return this.runQueryWebGL2(queryFn);
        }
        return this.runQueryWebGL1(queryFn);
    };
    GPGPUContext.prototype.runQueryWebGL2 = function (benchmark) {
        var _this = this;
        var ext = webgl_util.getExtensionOrThrow(this.gl, 'EXT_disjoint_timer_query_webgl2');
        var query = this.gl.createQuery();
        this.gl.beginQuery(ext.TIME_ELAPSED_EXT, query);
        benchmark();
        this.gl.endQuery(ext.TIME_ELAPSED_EXT);
        return new Promise(function (resolve, reject) {
            var queryGPU = function () {
                var available = _this.gl
                    .getQueryParameter(query, _this.gl.QUERY_RESULT_AVAILABLE);
                var disjoint = _this.gl.getParameter(ext.GPU_DISJOINT_EXT);
                return available && !disjoint;
            };
            var getTimeElapsed = function () {
                var timeElapsedNanos = _this.gl
                    .getQueryParameter(query, _this.gl.QUERY_RESULT);
                resolve(timeElapsedNanos / 1000000);
            };
            var resolveWithWarning = function () {
                console.warn('Disjoint query timer never available.');
                resolve(-1);
            };
            util.repeatedTry(queryGPU).then(getTimeElapsed).catch(resolveWithWarning);
        });
    };
    GPGPUContext.prototype.runQueryWebGL1 = function (benchmark) {
        var _this = this;
        var ext = webgl_util.getExtensionOrThrow(this.gl, 'EXT_disjoint_timer_query');
        var query = ext.createQueryEXT();
        ext.beginQueryEXT(ext.TIME_ELAPSED_EXT, query);
        benchmark();
        ext.endQueryEXT(ext.TIME_ELAPSED_EXT);
        return new Promise(function (resolve, reject) {
            var queryGPU = function () {
                var available = ext.getQueryObjectEXT(query, ext.QUERY_RESULT_AVAILABLE_EXT);
                var disjoint = _this.gl.getParameter(ext.GPU_DISJOINT_EXT);
                return available && !disjoint;
            };
            var getTimeElapsed = function () {
                var timeElapsedNanos = ext.getQueryObjectEXT(query, ext.QUERY_RESULT_EXT);
                resolve(timeElapsedNanos / 1000000);
            };
            var resolveWithWarning = function () {
                console.warn('Disjoint query timer never available.');
                resolve(-1);
            };
            util.repeatedTry(queryGPU).then(getTimeElapsed).catch(resolveWithWarning);
        });
    };
    GPGPUContext.prototype.downloadMatrixDriverSetup = function (texture) {
        this.throwIfDisposed();
        webgl_util.bindColorTextureToFramebuffer(this.gl, texture, this.framebuffer);
        if (this.autoDebugValidate) {
            webgl_util.validateFramebuffer(this.gl);
        }
    };
    GPGPUContext.prototype.downloadMatrixDriverTeardown = function () {
        if (this.outputTexture != null) {
            webgl_util.bindColorTextureToFramebuffer(this.gl, this.outputTexture, this.framebuffer);
            if (this.autoDebugValidate) {
                webgl_util.validateFramebuffer(this.gl);
            }
        }
        else {
            webgl_util.unbindColorTextureFromFramebuffer(this.gl, this.framebuffer);
        }
    };
    GPGPUContext.prototype.downloadMatrixDriver = function (texture, downloadAndDecode) {
        this.downloadMatrixDriverSetup(texture);
        var result = downloadAndDecode();
        this.downloadMatrixDriverTeardown();
        return result;
    };
    GPGPUContext.prototype.downloadMatrixDriverAsync = function (texture, downloadAndDecode) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.downloadMatrixDriverSetup(texture);
                        return [4, downloadAndDecode()];
                    case 1:
                        result = _a.sent();
                        this.downloadMatrixDriverTeardown();
                        return [2, result];
                }
            });
        });
    };
    GPGPUContext.prototype.setOutputMatrixTextureDriver = function (outputMatrixTextureMaybePacked, width, height) {
        this.throwIfDisposed();
        var gl = this.gl;
        webgl_util.bindColorTextureToFramebuffer(gl, outputMatrixTextureMaybePacked, this.framebuffer);
        if (this.autoDebugValidate) {
            webgl_util.validateFramebuffer(gl);
        }
        this.outputTexture = outputMatrixTextureMaybePacked;
        webgl_util.callAndCheck(gl, function () { return gl.viewport(0, 0, width, height); });
        webgl_util.callAndCheck(gl, function () { return gl.scissor(0, 0, width, height); });
    };
    GPGPUContext.prototype.setOutputMatrixWriteRegionDriver = function (x, y, width, height) {
        var _this = this;
        this.throwIfDisposed();
        webgl_util.callAndCheck(this.gl, function () { return _this.gl.scissor(x, y, width, height); });
    };
    GPGPUContext.prototype.throwIfDisposed = function () {
        if (this.disposed) {
            throw new Error('Attempted to use disposed GPGPUContext.');
        }
    };
    GPGPUContext.prototype.throwIfNoProgram = function () {
        if (this.program == null) {
            throw new Error('No GPU program is currently set.');
        }
    };
    return GPGPUContext;
}());
exports.GPGPUContext = GPGPUContext;
//# sourceMappingURL=gpgpu_context.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UnaryOpProgram = (function () {
    function UnaryOpProgram(aShape, opSnippet) {
        this.variableNames = ['A'];
        this.outputShape = aShape;
        this.userCode = "\n      float unaryOperation(float x) {\n        " + opSnippet + "\n      }\n\n      void main() {\n        float x = getAAtOutCoords();\n        float y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    ";
    }
    return UnaryOpProgram;
}());
exports.UnaryOpProgram = UnaryOpProgram;
exports.CHECK_NAN_SNIPPET = "\n  if (isNaN(x)) {\n    return x;\n  }\n";
exports.ABS = "\n  return abs(x);\n";
exports.RELU = "\n  return (x < 0.0) ? 0.0 : x;\n";
exports.ELU = "\n  return (x >= 0.0) ? x : (exp(x) - 1.0);\n";
function LEAKY_RELU(alpha) {
    return "\n    return (x >= 0.0) ? x : " + alpha + " * x;\n  ";
}
exports.LEAKY_RELU = LEAKY_RELU;
function STEP(alpha) {
    if (alpha === void 0) { alpha = 0.0; }
    return "\n    return (x == x) ? (x > 0.0 ? 1.0 : float(" + alpha + ")) : x;\n  ";
}
exports.STEP = STEP;
exports.NEG = "\n  return -x;\n";
exports.CEIL = "\n  return ceil(x);\n";
exports.FLOOR = "\n  return floor(x);\n";
exports.EXP = "\n  return exp(x);\n";
exports.LOG = "\n  return log(x);\n";
exports.SQRT = exports.CHECK_NAN_SNIPPET + "\n  return sqrt(x);\n";
exports.SIGMOID = "\n  return 1.0 / (1.0 + exp(-1.0 * x));\n";
exports.SIN = exports.CHECK_NAN_SNIPPET + "\n  return sin(x);\n";
exports.COS = exports.CHECK_NAN_SNIPPET + "\n  return cos(x);\n";
exports.TAN = "\n  return tan(x);\n";
exports.ASIN = exports.CHECK_NAN_SNIPPET + "\n  return asin(x);\n";
exports.ACOS = exports.CHECK_NAN_SNIPPET + "\n  return acos(x);\n";
exports.ATAN = exports.CHECK_NAN_SNIPPET + "\n  return atan(x);\n";
exports.SINH = "\n  float e2x = exp(x);\n  return (e2x - 1.0 / e2x) / 2.0;\n";
exports.COSH = "\n  float e2x = exp(-x);\n  return (e2x + 1.0 / e2x) / 2.0;\n";
exports.TANH = "\n  float e2x = exp(-2.0 * abs(x));\n  return sign(x) * (1.0 - e2x) / (1.0 + e2x);\n";
exports.SQUARE = "\n  return x * x;\n";
//# sourceMappingURL=unaryop_gpu.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export plotAudio */
/* unused harmony export plotCoeffs */
/* unused harmony export plotFFT */
/* unused harmony export plotFilterbank */
/* harmony export (immutable) */ __webpack_exports__["a"] = plotSpectrogram;
/* unused harmony export downloadSpectrogramImage */
/* harmony export (immutable) */ __webpack_exports__["b"] = createLayout;
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
const sr = 44100;
const nyquist = sr / 2;
function plotAudio(y, layout) {
    let t = y.map((value, index) => (index / sr));
    return plotXY(t, y, layout);
}
function plotCoeffs(y, layout) {
    let ind = y.map((value, index) => index);
    return plotXY(ind, y, layout);
}
function plotFFT(fftMags, layout) {
    // Convert magnitudes to dB.
    const dbs = fftMags.map(val => 20 * Math.log10(val));
    const times = fftMags.map((value, index) => index / fftMags.length * nyquist);
    return plotXY(times, fftMags, layout);
}
function plotFilterbank(filterbank, layout) {
    let filter = filterbank[0];
    const inds = filter.map((value, index) => index);
    return plotXYs(inds, filterbank, layout, 8000);
}
function plotSpectrogram(spec, samplesPerSlice, layout) {
    // The STFT as given is an Float32Array[]. We need to render that matrix as an
    // image.
    return plotImage(spec, samplesPerSlice, layout);
}
function downloadSpectrogramImage(spec) {
    // Render the spectrogram into a 2D canvas.
    const canvas = document.createElement('canvas');
    const times = spec.length;
    const freqs = spec[0].length;
    canvas.width = times;
    canvas.height = freqs;
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < times; i++) {
        for (let j = 0; j < freqs; j++) {
            const val = Math.floor(spec[i][j] * 255);
            ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
            ctx.strokeStyle = null;
            ctx.fillRect(i, j, 1, 1);
        }
    }
    // Download the canvas.
    var link = document.createElement('a');
    link.setAttribute('download', 'spec.png');
    link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
    link.click();
}
function plotImage(stft, samplesPerSlice, layout) {
    let out = document.createElement('div');
    out.className = 'plot';
    // Transpose the spectrogram we pass in.
    let zArr = [];
    for (let i = 0; i < stft.length; i++) {
        for (let j = 0; j < stft[0].length; j++) {
            if (zArr[j] == undefined) {
                zArr[j] = [];
            }
            zArr[j][i] = stft[i][j];
        }
    }
    // Calculate the X values (times) from the stft params.
    const xArr = stft.map((value, index) => index * samplesPerSlice / sr);
    // Calculate Y values (frequencies) from stft.
    const fft = Array.prototype.slice.call(stft[0]);
    const yArr = fft.map((value, index) => (index / fft.length) * nyquist);
    const data = [
        {
            x: xArr,
            y: yArr,
            z: zArr,
            type: 'heatmap'
        }
    ];
    Plotly.newPlot(out, data, layout);
    return out;
}
function plotXY(x, y, layout) {
    const out = document.createElement('div');
    out.className = 'plot';
    const xArr = Array.prototype.slice.call(x);
    const yArr = Array.prototype.slice.call(y);
    const data = [{
            x: xArr,
            y: yArr,
        }];
    Plotly.plot(out, data, layout);
    return out;
}
function plotXYs(x, y, layout, maxFreq) {
    const out = document.createElement('div');
    out.className = 'plot';
    const xArr = Array.prototype.slice.call(x);
    const data = y.map(y_i => {
        const yArr = Array.prototype.slice.call(y_i);
        return {
            x: xArr.slice(0, maxFreq),
            y: yArr.slice(0, maxFreq),
        };
    });
    Plotly.plot(out, data, layout);
    return out;
}
function createLayout(title, xTitle, yTitle, params = {}) {
    const logY = (params.logY == true);
    const logX = (params.logX == true);
    return {
        title: title,
        xaxis: {
            title: xTitle,
            type: logX ? 'log' : null,
        },
        yaxis: {
            title: yTitle,
            type: logY ? 'log' : null,
        }
    };
}


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AudioUtils__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CircularAudioBuffer__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_eventemitter3__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_eventemitter3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_eventemitter3__);
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */



const INPUT_BUFFER_LENGTH = 16384;
const audioCtx = new AudioContext();
/**
 * Extracts various kinds of features from an input buffer. Designed for
 * extracting features from a live-running audio input stream.
 *
 * This class gets audio from an audio input stream, feeds it into a
 * ScriptProcessorNode, gets audio sampled at the input sample rate
 * (audioCtx.sampleRate).
 *
 * Once complete, we downsample it to EXAMPLE_SR, and then keep track of the
 * last hop index. Once we have enough data for a buffer of BUFFER_LENGTH,
 * process that buffer and add it to the spectrogram.
 */
class StreamingFeatureExtractor extends __WEBPACK_IMPORTED_MODULE_2_eventemitter3__["EventEmitter"] {
    constructor(params) {
        super();
        const { bufferLength, duration, hopLength, isMfccEnabled, melCount, targetSr, inputBufferLength } = params;
        this.bufferLength = bufferLength;
        this.inputBufferLength = inputBufferLength || INPUT_BUFFER_LENGTH;
        this.hopLength = hopLength;
        this.melCount = melCount;
        this.isMfccEnabled = isMfccEnabled;
        this.targetSr = targetSr;
        this.duration = duration;
        this.bufferCount = Math.floor((duration * targetSr - bufferLength) / hopLength) + 1;
        if (hopLength > bufferLength) {
            console.error('Hop length must be smaller than buffer length.');
        }
        // The mel filterbank is actually half of the size of the number of samples,
        // since the FFT array is complex valued.
        this.melFilterbank = __WEBPACK_IMPORTED_MODULE_0__AudioUtils__["a" /* default */].createMelFilterbank(this.bufferLength / 2 + 1, this.melCount);
        this.spectrogram = [];
        this.isStreaming = false;
        const nativeSr = audioCtx.sampleRate;
        // Allocate the size of the circular analysis buffer.
        const resampledBufferLength = Math.max(bufferLength, this.inputBufferLength) *
            (targetSr / nativeSr) * 4;
        this.circularBuffer = new __WEBPACK_IMPORTED_MODULE_1__CircularAudioBuffer__["a" /* default */](resampledBufferLength);
        // Calculate how many buffers will be enough to keep around to playback.
        const playbackLength = nativeSr * this.duration * 2;
        this.playbackBuffer = new __WEBPACK_IMPORTED_MODULE_1__CircularAudioBuffer__["a" /* default */](playbackLength);
    }
    getSpectrogram() {
        return this.spectrogram;
    }
    start() {
        // Clear all buffers.
        this.circularBuffer.clear();
        this.playbackBuffer.clear();
        // Reset start time and sample count for ScriptProcessorNode watching.
        this.processStartTime = new Date();
        this.processSampleCount = 0;
        const constraints = { audio: {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
            }, video: false };
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            this.stream = stream;
            this.scriptNode = audioCtx.createScriptProcessor(this.inputBufferLength, 1, 1);
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(this.scriptNode);
            this.scriptNode.connect(audioCtx.destination);
            this.scriptNode.onaudioprocess = this.onAudioProcess.bind(this);
            this.isStreaming = true;
        });
    }
    stop() {
        for (let track of this.stream.getTracks()) {
            track.stop();
        }
        this.scriptNode.disconnect(audioCtx.destination);
        this.stream = null;
        this.isStreaming = false;
    }
    getEnergyLevel() {
        return this.lastEnergyLevel;
    }
    /**
     * Debug only: for listening to what was most recently recorded.
     */
    getLastPlaybackBuffer() {
        return this.playbackBuffer.getBuffer();
    }
    onAudioProcess(audioProcessingEvent) {
        const audioBuffer = audioProcessingEvent.inputBuffer;
        // Add to the playback buffers, but make sure we have enough room.
        const remaining = this.playbackBuffer.getRemainingLength();
        const arrayBuffer = audioBuffer.getChannelData(0);
        this.processSampleCount += arrayBuffer.length;
        if (remaining < arrayBuffer.length) {
            this.playbackBuffer.popBuffer(arrayBuffer.length);
            //console.log(`Freed up ${arrayBuffer.length} in the playback buffer.`);
        }
        this.playbackBuffer.addBuffer(arrayBuffer);
        // Resample the buffer into targetSr.
        //console.log(`Resampling from ${audioCtx.sampleRate} to ${this.targetSr}.`);
        resampleWebAudio(audioBuffer, this.targetSr).then((audioBufferRes) => {
            const bufferRes = audioBufferRes.getChannelData(0);
            // Write in a buffer of ~700 samples.
            this.circularBuffer.addBuffer(bufferRes);
        });
        // Get buffer(s) out of the circular buffer. Note that there may be multiple
        // available, and if there are, we should get them all.
        const buffers = this.getFullBuffers();
        if (buffers.length > 0) {
            //console.log(`Got ${buffers.length} buffers of audio input data.`);
        }
        for (let buffer of buffers) {
            //console.log(`Got buffer of length ${buffer.length}.`);
            // Extract the mel values for this new frame of audio data.
            const fft = __WEBPACK_IMPORTED_MODULE_0__AudioUtils__["a" /* default */].fft(buffer);
            const fftEnergies = __WEBPACK_IMPORTED_MODULE_0__AudioUtils__["a" /* default */].fftEnergies(fft);
            const melEnergies = __WEBPACK_IMPORTED_MODULE_0__AudioUtils__["a" /* default */].applyFilterbank(fftEnergies, this.melFilterbank);
            const mfccs = __WEBPACK_IMPORTED_MODULE_0__AudioUtils__["a" /* default */].cepstrumFromEnergySpectrum(melEnergies);
            if (this.isMfccEnabled) {
                this.spectrogram.push(mfccs);
            }
            else {
                this.spectrogram.push(melEnergies);
            }
            if (this.spectrogram.length > this.bufferCount) {
                // Remove the first element in the array.
                this.spectrogram.splice(0, 1);
            }
            if (this.spectrogram.length == this.bufferCount) {
                // Notify that we have an updated spectrogram.
                this.emit('update');
            }
            const totalEnergy = melEnergies.reduce((total, num) => total + num);
            this.lastEnergyLevel = totalEnergy / melEnergies.length;
        }
        const elapsed = (new Date().valueOf() - this.processStartTime.valueOf()) / 1000;
        const expectedSampleCount = (audioCtx.sampleRate * elapsed);
        const percentError = Math.abs(expectedSampleCount - this.processSampleCount) /
            this.processSampleCount;
        if (percentError > 0.1) {
            console.warn(`ScriptProcessorNode may be dropping samples. Percent error is ${percentError}.`);
        }
    }
    /**
     * Get as many full buffers as are available in the circular buffer.
     */
    getFullBuffers() {
        const out = [];
        // While we have enough data in the buffer.
        while (this.circularBuffer.getLength() > this.bufferLength) {
            // Get a buffer of desired size.
            const buffer = this.circularBuffer.getBuffer(this.bufferLength);
            // Remove a hop's worth of data from the buffer.
            this.circularBuffer.popBuffer(this.hopLength);
            out.push(buffer);
        }
        return out;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StreamingFeatureExtractor;

function resampleWebAudio(audioBuffer, targetSr) {
    const sourceSr = audioBuffer.sampleRate;
    const lengthRes = audioBuffer.length * targetSr / sourceSr;
    const offlineCtx = new OfflineAudioContext(1, lengthRes, targetSr);
    return new Promise((resolve, reject) => {
        const bufferSource = offlineCtx.createBufferSource();
        bufferSource.buffer = audioBuffer;
        offlineCtx.oncomplete = function (event) {
            const bufferRes = event.renderedBuffer;
            const len = bufferRes.length;
            //console.log(`Resampled buffer from ${audioBuffer.length} to ${len}.`);
            resolve(bufferRes);
        };
        bufferSource.connect(offlineCtx.destination);
        bufferSource.start();
        offlineCtx.startRendering();
    });
}


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
class LinePlot {
    constructor(params) {
        const { title, axisTitles } = params;
        this.title = title;
        this.axisTitles = axisTitles;
        this.el = this.createPlotElement();
        this.initDate = new Date();
    }
    add(t, data) {
        if (!data.length) {
            data = [data];
        }
        const indices = data.map((val, ind) => val ? ind : null)
            .filter(ind => ind != null);
        const x = indices.map(val => [t]);
        const y = indices.map(ind => [data[ind]]);
        const update = { x, y };
        Plotly.extendTraces(this.el, update, indices);
    }
    elapsed() {
        return (new Date() - this.initDate) / 1000;
    }
    getElement() {
        return this.el;
    }
    createPlotElement() {
        // Render a new Plotly plot.
        const out = document.createElement('div');
        out.className = 'plot';
        const data = [
            { x: [], y: [], type: 'line' },
            { x: [], y: [], type: 'line', yaxis: 'y2' },
        ];
        const layout = {
            title: this.title,
            showlegend: false,
            yaxis: {
                title: this.axisTitles[0],
            },
            yaxis2: {
                title: this.axisTitles[1],
                overlaying: 'y',
                side: 'right',
            }
        };
        Plotly.newPlot(out, data, layout);
        return out;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LinePlot;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_deeplearn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_deeplearn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_deeplearn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_eventemitter3__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_eventemitter3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_eventemitter3__);
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


// Values from model-builder.ts.
const BATCH_SIZE = 64;
const NUM_BATCHES = 10000;
const MIN_COST_VALUE = 0.1;
const TRAIN_TEST_RATIO = 0.9;
const LEARNING_RATE = 0.01;
class ModelBuilder {
    constructor(inputShape, labelShape, dataSet = null) {
        this.nodeIndex = 0;
        this.dataSet = dataSet;
        // Dimensions of the Mel spectrogram we feed into this model.
        this.inputShape = inputShape;
        // Shape of the 1D one-hot encoded labels.
        this.labelShape = labelShape;
        this.isTraining = false;
        this.math = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["NDArrayMathGPU"]();
        this.progress = new __WEBPACK_IMPORTED_MODULE_1_eventemitter3__["EventEmitter"]();
        this.learningRate = LEARNING_RATE;
    }
    createModel(loadedWeights = null) {
        if (this.session != null) {
            this.session.dispose();
        }
        // Reset the node index.
        this.nodeIndex = 0;
        this.modelInitialized = false;
        this.graph = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["Graph"]();
        const g = this.graph;
        this.inputTensor = g.placeholder('input', this.inputShape);
        this.labelTensor = g.placeholder('label', this.labelShape);
        // Construct the hidden layers.
        let network = this.inputTensor;
        network = this.addConv2d(g, network, 8, loadedWeights);
        const reg1 = this.addRegularization(g, network);
        network = this.addRelu(g, network);
        network = this.addMaxPool(g, network);
        network = this.addConv2d(g, network, 16, loadedWeights);
        const reg2 = this.addRegularization(g, network);
        network = this.addRelu(g, network);
        network = this.addMaxPool(g, network);
        network = this.addFlatten(g, network);
        network = this.addFullyConnected(g, network, loadedWeights);
        const reg3 = this.addRegularization(g, network);
        this.predictionTensor = network;
        // Add a regularization parameter.
        this.regularizationTensor = g.add(reg1, reg2, reg3);
        const softmaxCrossEntropyCostTensor = g.softmaxCrossEntropyCost(this.predictionTensor, this.labelTensor);
        //this.costTensor = g.add(softmaxCrossEntropyCostTensor, this.regularizationTensor);
        this.costTensor = softmaxCrossEntropyCostTensor;
        this.accuracyTensor =
            g.argmaxEquals(this.predictionTensor, this.labelTensor);
        this.session = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["Session"](g, this.math);
        this.modelInitialized = true;
    }
    setLearningRate(learningRate) {
        this.learningRate = learningRate;
    }
    startTraining() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('startTraining');
            const trainingData = this.getTrainingData();
            const trainingShuffledInputProviderGenerator = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["InCPUMemoryShuffledInputProviderBuilder"](trainingData);
            const [trainingInputProvider, trainingLabelProvider] = trainingShuffledInputProviderGenerator.getInputProviders();
            const trainingFeeds = [
                { tensor: this.inputTensor, data: trainingInputProvider },
                { tensor: this.labelTensor, data: trainingLabelProvider }
            ];
            this.isTraining = true;
            let minCost = Infinity;
            let maxAccuracy = -Infinity;
            // Training is broken up into batches.
            // Before we start training, we need to provide an optimizer. This is the
            // object that is responsible for updating weights. The learning rate param
            // is a value that represents how large of a step to make when updating
            // weights. If this is too big, you may overstep and oscillate. If it is too
            // small, the model may take a long time to train.
            const optimizer = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["SGDOptimizer"](this.learningRate);
            console.log(`Training ${NUM_BATCHES} batches of size ${BATCH_SIZE}` +
                ` at rate: ${this.learningRate}.`);
            for (let i = 0; i < NUM_BATCHES; i++) {
                // Train takes a cost tensor to minimize; this call trains one batch and
                // returns the average cost of the batch as a Scalar.
                const costValue = this.session.train(this.costTensor, trainingFeeds, BATCH_SIZE, optimizer, __WEBPACK_IMPORTED_MODULE_0_deeplearn__["CostReduction"].MEAN);
                const cost = parseFloat(yield costValue.data());
                console.log(`#${i}: cost: ${cost.toFixed(3)}.`);
                if (cost < minCost) {
                    minCost = cost;
                }
                if (!this.isTraining) {
                    break;
                }
                if (i % 20 == 0) {
                    const accuracy = yield this.getTestAccuracy(50);
                    if (accuracy > maxAccuracy) {
                        maxAccuracy = accuracy;
                    }
                    console.log(`#${i}: accuracy: ${accuracy.toFixed(3)},`
                        + ` maxAccuracy: ${maxAccuracy.toFixed(3)}.`);
                    this.progress.emit('accuracy', { accuracy, maxAccuracy });
                }
                this.progress.emit('cost', { cost, minCost });
            }
            this.isTraining = false;
        });
    }
    getTestAccuracy(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const testData = this.getTestData();
            const totalCount = testData[0].length;
            if (!limit) {
                limit = totalCount;
            }
            const count = Math.min(limit, totalCount);
            let accurateCount = 0;
            for (let i = 0; i < count; i++) {
                const ind = Math.floor(Math.random() * totalCount);
                const input = testData[0][ind];
                const label = testData[1][ind];
                const inferenceFeeds = [
                    { tensor: this.inputTensor, data: input },
                    { tensor: this.labelTensor, data: label },
                ];
                const result = this.session.eval(this.accuracyTensor, inferenceFeeds);
                /*
                // Output regularization value for debugging.
                const regularization = this.session.eval(this.regularizationTensor, inferenceFeeds);
                console.log('regularizationTensor', regularization.dataSync());
                 */
                const accuracy = yield result.data();
                if (accuracy[0]) {
                    accurateCount += 1;
                }
            }
            return (accurateCount / count);
        });
    }
    stopTraining() {
        console.log('Stopped training!');
        this.isTraining = false;
    }
    addConv2d(g, network, outputDepth, init = null) {
        // 5x5 square filter.
        const fieldSize = 5;
        const stride = 1;
        const zeroPad = 2;
        const wShape = [fieldSize, fieldSize, network.shape[2], outputDepth];
        const wName = `save-conv2d-${this.nodeIndex}-w`;
        const bName = `save-conv2d-${this.nodeIndex}-b`;
        let w = __WEBPACK_IMPORTED_MODULE_0_deeplearn__["NDArray"].randTruncatedNormal(wShape, 0, 0.1);
        let b = __WEBPACK_IMPORTED_MODULE_0_deeplearn__["Array1D"].zeros([outputDepth]);
        if (init) {
            w = init[wName];
            b = init[bName];
        }
        const wTensor = g.variable(wName, w);
        const bTensor = g.variable(bName, b);
        this.nodeIndex += 1;
        return g.conv2d(network, wTensor, bTensor, fieldSize, outputDepth, stride, zeroPad);
    }
    addRelu(g, network) {
        return g.relu(network);
    }
    addMaxPool(g, network) {
        const fieldSize = 2;
        // Was previously stride=2 in the MNIST network. Changed this value because
        // of the input size.
        const stride = 1;
        const zeroPad = 0;
        return g.maxPool(network, fieldSize, stride, zeroPad);
    }
    addFlatten(g, network) {
        const size = __WEBPACK_IMPORTED_MODULE_0_deeplearn__["util"].sizeFromShape(network.shape);
        return g.reshape(network, [size]);
    }
    addFullyConnected(g, network, init = null) {
        const inputSize = __WEBPACK_IMPORTED_MODULE_0_deeplearn__["util"].sizeFromShape(network.shape);
        const hiddenUnits = this.labelShape[0];
        let weightsInitializer, biasInitializer;
        if (init) {
            weightsInitializer = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["NDArrayInitializer"](init['save-fc1-weights']);
            biasInitializer = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["NDArrayInitializer"](init['save-fc1-bias']);
        }
        else {
            weightsInitializer = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["VarianceScalingInitializer"]();
            biasInitializer = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["ZerosInitializer"]();
        }
        const useBias = true;
        return g.layers.dense('save-fc1', network, hiddenUnits, null, useBias, weightsInitializer, biasInitializer);
    }
    addRegularization(g, network) {
        const beta = 0.01;
        const betaTensor = g.variable('beta', __WEBPACK_IMPORTED_MODULE_0_deeplearn__["Scalar"].new(beta));
        return g.multiply(betaTensor, g.reduceSum(g.square(network)));
    }
    getTestData() {
        const data = this.dataSet.getData();
        if (data == null) {
            return null;
        }
        const [images, labels] = this.dataSet.getData();
        const start = Math.floor(TRAIN_TEST_RATIO * images.length);
        return [images.slice(start), labels.slice(start)];
    }
    getTrainingData() {
        const [images, labels] = this.dataSet.getData();
        const end = Math.floor(TRAIN_TEST_RATIO * images.length);
        return [images.slice(0, end), labels.slice(0, end)];
    }
    getTrainingCount() {
        const [images, labels] = this.dataSet.getData();
        return TRAIN_TEST_RATIO * images.length;
    }
    startInference() {
        return __awaiter(this, void 0, void 0, function* () {
            const testData = this.getTestData();
            console.log(`Running inference on ${testData.length} points.`);
            const inferenceShuffledInputProviderGenerator = new __WEBPACK_IMPORTED_MODULE_0_deeplearn__["InCPUMemoryShuffledInputProviderBuilder"](testData);
            const [inferenceInputProvider, inferenceLabelProvider] = inferenceShuffledInputProviderGenerator.getInputProviders();
            const inferenceFeeds = [
                { tensor: this.inputTensor, data: inferenceInputProvider },
                { tensor: this.labelTensor, data: inferenceLabelProvider }
            ];
            const result = this.session.eval(this.predictionTensor, inferenceFeeds);
            console.log(yield result.data());
        });
    }
    predict(input) {
        const inferenceFeeds = [
            { tensor: this.inputTensor, data: input }
        ];
        return this.session.eval(this.predictionTensor, inferenceFeeds);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelBuilder;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_eventemitter3__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_eventemitter3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_eventemitter3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FeatureExtractor__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_deeplearn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_deeplearn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_deeplearn__);
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const INPUT_INDEX = 0;
const LABEL_INDEX = 1;
// How much background noise to add to the spoken classes.
const SPEECH_BG_GAIN = 0.05;
// How much background noise gain to add to the silence class.
const SILENCE_BG_GAIN = 0.2;
// How long (in seconds) each example is in the batched audio training data.
const BATCH_EXAMPLE_DURATION = 1;
const EXAMPLE_SR = 16000;
const DATA_ROOT = 'speech_commands_v0.01';
const BACKGROUND_LIST = 'background.txt';
class SpeechCommandDataset extends __WEBPACK_IMPORTED_MODULE_3_deeplearn__["InMemoryDataset"] {
    constructor(inputShape, labelShape, params) {
        super([inputShape, labelShape]);
        const { labelNames, dataUrl, dataExtension, isMfccEnabled } = params;
        this.labelNames = labelNames;
        this.dataUrl = dataUrl;
        this.dataExtension = dataExtension;
        this.isMfccEnabled = isMfccEnabled;
        this.inputs = [];
        this.labels = [];
        this.metadata = [];
        this.debugBuffers = [];
        this.dataset = [this.inputs, this.labels, this.metadata, this.debugBuffers];
        this.timestamp = null;
        this.loadedSinceTimestamp = 0;
        this.backgroundBuffers = [];
        this.buffers = {};
        this.progress = new __WEBPACK_IMPORTED_MODULE_1_eventemitter3__["EventEmitter"]();
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchBackgroundNoise().then(e => {
                return this.fetchData();
            });
        });
    }
    getCount() {
        return this.inputs.length;
    }
    /**
     * Loads big wav/mp3s that were created by concatenating all training examples
     * with the same label into one file. Examples are spaced every 1s.
     */
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const chunkLength = BATCH_EXAMPLE_DURATION * EXAMPLE_SR;
            // Fetch data for all of the labels we care about.
            for (let [labelIndex, label] of this.labelNames.entries()) {
                // Ignore the "silence" label.
                if (label == 'silence') {
                    continue;
                }
                const filename = `${label}.${this.dataExtension}`;
                const url = `${this.dataUrl}/${filename}`;
                const audioBuffer = yield __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__["a" /* default */].loadBufferOffline(url);
                const buffer = audioBuffer.getChannelData(0);
                this.buffers[label] = buffer;
                const chunkCount = Math.floor(buffer.length / chunkLength);
                const message = `Downloaded ${filename}, containing ${chunkCount} examples.`;
                const percentProgress = (labelIndex + 1) / this.labelNames.length;
                this.emitProgressUpdate(percentProgress / 2, message);
            }
            this.emitProgressUpdate(0.5, 'Unpacking audio into examples...');
            let labelIndex = 0;
            for (let label in this.buffers) {
                // Split the buffer into chunks of 1s each, and use each chunk as an
                // training example.
                const buffer = this.buffers[label];
                const chunkCount = Math.floor(buffer.length / chunkLength);
                for (let i = 0; i < chunkCount; i++) {
                    // Add this chunk to the training data.
                    const chunk = buffer.slice(i * chunkLength, (i + 1) * chunkLength);
                    // First add random background noise to each sample.
                    const bgNoise = this.randomBackgroundBuffer(chunk.length, SPEECH_BG_GAIN);
                    pointwiseAddInPlace(chunk, bgNoise);
                    const input = __WEBPACK_IMPORTED_MODULE_2__FeatureExtractor__["a" /* default */].bufferToFeature(chunk, this.isMfccEnabled);
                    this.addExample(input, label, `batch-${label}`, chunk);
                    if (i % 50 == 0) {
                        const message = `Extracted ${i} of ${chunkCount} examples labeled ${label}.`;
                        // Wait an instance to let the DOM update.
                        yield sleep(0.01);
                        const totalChunks = chunkCount * this.labelNames.length;
                        const chunksPerLabel = totalChunks / this.labelNames.length;
                        const currentChunk = labelIndex * chunksPerLabel + i;
                        const percentProgress = currentChunk / totalChunks;
                        // Half is downloading, half is feature extraction.
                        this.emitProgressUpdate((1 + percentProgress) / 2, message);
                    }
                }
                labelIndex += 1;
            }
            this.emitProgressUpdate(1, 'Loading complete!');
        });
    }
    fetchBackgroundNoise() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.dataUrl}/_background_noise_.${this.dataExtension}`;
            return __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__["a" /* default */].loadBuffer(url).then((audioBuffer) => {
                const buffer = audioBuffer.getChannelData(0);
                this.backgroundBuffers.push(buffer);
            });
        });
    }
    normalize() {
        this.normalizeWithinBounds(INPUT_INDEX, 0, 1);
    }
    addSilence(exampleCount, label) {
        // Use a random background noise array for silence, with no utterance.
        for (let i = 0; i < exampleCount; i++) {
            // TODO: Fix this hard coded crap.
            const silenceBuffer = this.randomBackgroundBuffer(EXAMPLE_SR, Math.random() * SILENCE_BG_GAIN);
            const input = __WEBPACK_IMPORTED_MODULE_2__FeatureExtractor__["a" /* default */].bufferToFeature(silenceBuffer);
            this.addExample(input, label, 'silence', silenceBuffer);
        }
        console.log(`Adding ${exampleCount} examples of ${label}.`);
    }
    addExample(input, labelName, metadata, buffer) {
        const label = this.labelToOneHot(labelName);
        // Insert the example at a random index, so we end up with a shuffled array.
        const ind = Math.floor(Math.random() * this.inputs.length);
        this.inputs.splice(ind, 0, input);
        this.labels.splice(ind, 0, label);
        this.metadata.splice(ind, 0, metadata);
        // Save the buffer for later investigation.
        this.debugBuffers.splice(ind, 0, buffer);
    }
    labelToOneHot(label) {
        const shape = [this.dataShapes[LABEL_INDEX][0]];
        const oneHot = __WEBPACK_IMPORTED_MODULE_3_deeplearn__["Array1D"].zeros(shape, 'float32');
        const index = this.labelNames.indexOf(label);
        oneHot.set(1, index);
        return oneHot;
    }
    randomBackgroundBuffer(length, gain) {
        const out = new Float32Array(length);
        // Pick a random buffer.
        const buffer = randomChoice(this.backgroundBuffers);
        // Pick a random part of that buffer to match our length.
        const ind = Math.floor((buffer.length - length) * Math.random());
        out.set(buffer.slice(ind, ind + length));
        pointwiseMultiplyInPlace(out, gain);
        return out;
    }
    emitProgressUpdate(percent, message) {
        this.progress.emit('update', percent, message);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpeechCommandDataset;

function randomChoice(arr) {
    const ind = Math.floor(Math.random() * arr.length);
    return arr[ind];
}
function pointwiseAddInPlace(target, arr) {
    if (target.length != arr.length) {
        console.error(`Arrays aren't the same size (${target.length} !=
      ${arr.length}).`);
        return;
    }
    for (let i = 0; i < target.length; i++) {
        target[i] += arr[i];
    }
}
function pointwiseMultiplyInPlace(target, gain) {
    for (let i = 0; i < target.length; i++) {
        target[i] *= gain;
    }
}
function sleep(time) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, time * 1000);
        });
    });
}


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = labelArrayToString;
/* harmony export (immutable) */ __webpack_exports__["c"] = argmax;
/* harmony export (immutable) */ __webpack_exports__["a"] = getParameterByName;
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
function labelArrayToString(label, allLabels) {
    const [ind, _] = argmax(label);
    return allLabels[ind];
}
function argmax(array) {
    let max = -Infinity;
    let argmax = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
            argmax = i;
        }
    }
    return [argmax, max];
}
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
/**
 * Save Float32Array in arbitrarily sized chunks.
 * Load Float32Array in arbitrarily sized chunks.
 * Determine if there's enough data to grab a certain amount.
 */
class CircularAudioBuffer {
    constructor(maxLength) {
        this.buffer = new Float32Array(maxLength);
        this.currentIndex = 0;
    }
    /**
     * Add a new buffer of data. Called when we get new audio input samples.
     */
    addBuffer(newBuffer) {
        // Do we have enough data in this buffer?
        const remaining = this.buffer.length - this.currentIndex;
        if (this.currentIndex + newBuffer.length > this.buffer.length) {
            console.error(`Not enough space to write ${newBuffer.length}` +
                ` to this circular buffer with ${remaining} left.`);
            return;
        }
        this.buffer.set(newBuffer, this.currentIndex);
        //console.log(`Wrote ${newBuffer.length} entries to index ${this.currentIndex}.`);
        this.currentIndex += newBuffer.length;
    }
    /**
     * How many samples are stored currently?
     */
    getLength() {
        return this.currentIndex;
    }
    /**
     * How much space remains?
     */
    getRemainingLength() {
        return this.buffer.length - this.currentIndex;
    }
    /**
     * Return the first N samples of the buffer, and remove them. Called when we
     * want to get a buffer of audio data of a fixed size.
     */
    popBuffer(length) {
        // Do we have enough data to read back?
        if (this.currentIndex < length) {
            console.error(`This circular buffer doesn't have ${length} entries in it.`);
            return;
        }
        if (length == 0) {
            console.warn(`Calling popBuffer(0) does nothing.`);
            return;
        }
        const popped = this.buffer.slice(0, length);
        const remaining = this.buffer.slice(length, this.buffer.length);
        // Remove the popped entries from the buffer.
        this.buffer.fill(0);
        this.buffer.set(remaining, 0);
        // Send the currentIndex back.
        this.currentIndex -= length;
        return popped;
    }
    /**
     * Get the the first part of the buffer without mutating it.
     */
    getBuffer(length) {
        if (!length) {
            length = this.getLength();
        }
        // Do we have enough data to read back?
        if (this.currentIndex < length) {
            console.error(`This circular buffer doesn't have ${length} entries in it.`);
            return;
        }
        return this.buffer.slice(0, length);
    }
    clear() {
        this.currentIndex = 0;
        this.buffer.fill(0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CircularAudioBuffer;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GraphSaverLoader__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinePlot__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ModelBuilder__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__audio_features_src_PlotGraphs__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__SpeechCommandDataset__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__audio_features_src_StreamingFeatureExtractor__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util__ = __webpack_require__(44);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










const SILENCE_LABEL = 'silence';
const SILENCE_PERCENTAGE = 0.3;
const modelParam = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util__["a" /* getParameterByName */])('model');
const dataUrlParam = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util__["a" /* getParameterByName */])('data_url') || 'data';
const dataExtensionParam = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util__["a" /* getParameterByName */])('data_extension') || 'wav';
let ALL_LABELS = ['yes', 'no', 'other', SILENCE_LABEL];
if (modelParam == 'number') {
    ALL_LABELS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
        'eight', 'nine', 'other', SILENCE_LABEL];
}
else if (modelParam == 'all') {
    ALL_LABELS = ['bed', 'bird', 'cat', 'dog', 'down', 'eight', 'five',
        'four', 'go', 'happy', 'house', 'left', 'marvin', 'nine', 'no', 'off', 'on',
        'one', 'right', 'seven', 'sheila', 'six', 'stop', 'three', 'tree', 'two',
        'up', 'wow', 'yes', 'zero', SILENCE_LABEL];
    dataUrlParam = 'data_all';
}
const labelShape = [ALL_LABELS.length];
const inputShape = __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["a" /* default */].getFeatureShape();
const IS_TRAINING_MODE = true;
// Load some part of the speech command training set.
const config = {
    labelNames: ALL_LABELS,
    isMfccEnabled: __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["b" /* IS_MFCC_ENABLED */],
    dataUrl: dataUrlParam,
    dataExtension: dataExtensionParam,
};
const dataSet = new __WEBPACK_IMPORTED_MODULE_6__SpeechCommandDataset__["a" /* default */](inputShape, labelShape, config);
dataSet.progress.on('update', onDataLoadUpdate);
// Load the model.
const model = new __WEBPACK_IMPORTED_MODULE_4__ModelBuilder__["a" /* default */](inputShape, labelShape, dataSet);
model.createModel();
model.progress.on('accuracy', onTrainAccuracyUpdate);
model.progress.on('cost', onTrainCostUpdate);
if (IS_TRAINING_MODE) {
    dataSet.fetchAll().then(() => {
        // Add some silence, at some percentage.
        const total = dataSet.getCount();
        const silenceCount = Math.floor(total * SILENCE_PERCENTAGE);
        dataSet.addSilence(silenceCount, SILENCE_LABEL);
        //model.startTraining();
    });
}
const progressEl = document.querySelector('#progress-bar');
const progressLabelEl = document.querySelector('#progress-label');
const trainEl = document.querySelector('#train');
const predictEl = document.querySelector('#predict');
const streamEl = document.querySelector('#stream');
const plotEl = document.querySelector('#plot');
const saveEl = document.querySelector('#save');
const saveFileEl = document.querySelector('#save-file');
const loadEl = document.querySelector('#load');
const loadFileEl = document.querySelector('#load-file');
const outEl = document.querySelector('#out');
let trainPlot = null;
function onTrain() {
    if (model.isTraining) {
        model.stopTraining();
        trainEl.innerHTML = 'Train';
    }
    else {
        model.startTraining();
        trainEl.innerHTML = 'Stop training';
        trainPlot = new __WEBPACK_IMPORTED_MODULE_3__LinePlot__["a" /* default */]({
            title: 'Training score',
            axisTitles: ['Cost', 'Accuracy'],
        });
        const parentEl = document.querySelector('#out');
        parentEl.innerHTML = '';
        parentEl.appendChild(trainPlot.getElement());
    }
}
function onPredict(e) {
    const files = this.files;
    const fileUrl = URL.createObjectURL(files[0]);
    __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__["a" /* default */].loadBuffer(fileUrl).then((audioBuffer) => {
        const buffer = audioBuffer.getChannelData(0);
        const feature = __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["a" /* default */].bufferToFeature(buffer, __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["b" /* IS_MFCC_ENABLED */]);
        const spec = __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["a" /* default */].featureToSpectrogram(feature);
        const pred = model.predict(feature);
        const labelArray = pred.dataSync();
        const predLabel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util__["b" /* labelArrayToString */])(labelArray, ALL_LABELS);
        console.log(`File predicted: ${predLabel}.`);
        const plotEl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__audio_features_src_PlotGraphs__["a" /* plotSpectrogram */])(spec, __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["c" /* HOP_LENGTH */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__audio_features_src_PlotGraphs__["b" /* createLayout */])(`MFCC spectrogram (prediction: ${predLabel})`, 'time (s)', 'mel bin'));
        outEl.insertBefore(plotEl, outEl.firstChild);
    });
}
let streamPlot = null;
let start = new Date().valueOf();
const streamFeature = new __WEBPACK_IMPORTED_MODULE_7__audio_features_src_StreamingFeatureExtractor__["a" /* default */]({
    bufferLength: __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["d" /* BUFFER_LENGTH */],
    hopLength: __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["c" /* HOP_LENGTH */],
    isMfccEnabled: __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["b" /* IS_MFCC_ENABLED */],
    targetSr: __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["e" /* EXAMPLE_SR */],
    melCount: __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["f" /* MEL_COUNT */],
    duration: 1,
});
streamFeature.on('update', e => {
    const spec = streamFeature.getSpectrogram();
    const input = __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["a" /* default */].melSpectrogramToInput(spec);
    const pred = model.predict(input).dataSync();
    const predLabel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util__["b" /* labelArrayToString */])(pred, ALL_LABELS);
    const [ind, val] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util__["c" /* argmax */])(pred);
    const elapsed = new Date().valueOf() - start;
    streamPlot.add(elapsed, [val, ind]);
    console.log(`Got prediction: ${predLabel}, value: ${val}.`);
});
function onStream() {
    if (streamFeature.isStreaming) {
        streamFeature.stop();
        streamEl.innerHTML = 'Stream';
    }
    else {
        streamFeature.start();
        streamEl.innerHTML = 'Stop streaming';
        streamPlot = new __WEBPACK_IMPORTED_MODULE_3__LinePlot__["a" /* default */]({
            title: 'Streaming score',
            axisTitles: ['Score', 'Label Index'],
        });
        const parentEl = document.querySelector('#out');
        parentEl.innerHTML = '';
        parentEl.appendChild(streamPlot.getElement());
    }
}
function onPlot() {
    if (streamFeature.isStreaming) {
        const spec = streamFeature.getSpectrogram();
        const input = __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["a" /* default */].melSpectrogramToInput(spec);
        const spec2 = __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["a" /* default */].featureToSpectrogram(input);
        const plotEl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__audio_features_src_PlotGraphs__["a" /* plotSpectrogram */])(spec2, streamFeature.hopLength, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__audio_features_src_PlotGraphs__["b" /* createLayout */])(`MFCC spectrogram snapshot`, 'time (s)', 'mel bin'));
        outEl.insertBefore(plotEl, outEl.firstChild);
        return;
    }
    // Render a random input vector.
    const [images, labels, metas, buffers] = dataSet.getData();
    const ind = Math.floor(Math.random() * images.length);
    const feature = images[ind];
    const labelArray = labels[ind].dataSync();
    const label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__util__["b" /* labelArrayToString */])(labelArray, ALL_LABELS);
    const spec = __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["a" /* default */].featureToSpectrogram(feature);
    const plotEl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__audio_features_src_PlotGraphs__["a" /* plotSpectrogram */])(spec, __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["c" /* HOP_LENGTH */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__audio_features_src_PlotGraphs__["b" /* createLayout */])(`MFCC spectrogram (label: ${label})`, 'time (s)', 'mel bin'));
    outEl.insertBefore(plotEl, outEl.firstChild);
    // Playback the audio.
    const buffer = buffers[ind];
    __WEBPACK_IMPORTED_MODULE_0__audio_features_src_AudioUtils__["a" /* default */].playbackArrayBuffer(buffer, __WEBPACK_IMPORTED_MODULE_1__FeatureExtractor__["e" /* EXAMPLE_SR */]);
}
function onSave() {
    if (!model.graph) {
        console.error('Attempt to save model without graph.');
        return;
    }
    // Save the weights of the current model to IDB storage.
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__GraphSaverLoader__["a" /* saveGraphWeights */])(model.graph, model.session);
}
function onSaveFile() {
    if (!model.graph) {
        console.error('Attempt to save model without graph.');
        return;
    }
    // Save the weights to a file.
    const json = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__GraphSaverLoader__["b" /* saveGraphWeightsJSON */])(model.graph, model.session);
    downloadStringAsFile(json, 'weights.json', 'application/json');
}
function onLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!model.graph) {
            console.error('Attempt to load model without graph.');
            return;
        }
        const weights = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__GraphSaverLoader__["c" /* loadGraphWeights */])(model.graph);
        model.createModel(weights);
    });
}
function downloadStringAsFile(str, filename, mimeType) {
    const link = document.createElement('a');
    link.setAttribute('download', filename);
    const blob = new Blob([str], { type: mimeType });
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.click();
}
function onLoadFile(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = this.files;
        const fileUrl = URL.createObjectURL(files[0]);
        const response = yield fetch(fileUrl);
        const json = yield response.json();
        const weights = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__GraphSaverLoader__["d" /* loadGraphWeightsJSON */])(model.graph, json);
        model.createModel(weights);
    });
}
function onDataLoadUpdate(percentProgress, message) {
    console.log(message);
    const barEl = progressEl.querySelector('.mdc-linear-progress__bar');
    const bufferEl = progressEl.querySelector('.mdc-linear-progress__buffer');
    barEl.style.transform = `scaleX(${percentProgress})`;
    bufferEl.style.transform = `scaleX(${percentProgress})`;
    progressLabelEl.innerHTML = message;
    if (percentProgress == 1) {
        progressEl.style.display = 'none';
        progressLabelEl.style.display = 'none';
    }
}
function onTrainAccuracyUpdate(e) {
    trainPlot.add(trainPlot.elapsed(), [null, e.accuracy]);
}
function onTrainCostUpdate(e) {
    trainPlot.add(trainPlot.elapsed(), [e.cost, null]);
}
trainEl.addEventListener('click', onTrain);
predictEl.addEventListener('change', onPredict);
streamEl.addEventListener('click', onStream);
plotEl.addEventListener('click', onPlot);
saveEl.addEventListener('click', onSave);
saveFileEl.addEventListener('click', onSaveFile);
loadEl.addEventListener('click', onLoad);
loadFileEl.addEventListener('change', onLoadFile);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48);


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/*===========================================================================*\
 * Discrete Cosine Transform
 *
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
 *
 * This code is not designed to be highly optimized but as an educational
 * tool to understand the Mel-scale and its related coefficients used in
 * human speech analysis.
\*===========================================================================*/
cosMap = null;

// Builds a cosine map for the given input size. This allows multiple input sizes to be memoized automagically
// if you want to run the DCT over and over.
var memoizeCosines = function(N) {
  cosMap = cosMap || {};
  cosMap[N] = new Array(N*N);

  var PI_N = Math.PI / N;

  for (var k = 0; k < N; k++) {
    for (var n = 0; n < N; n++) {
      cosMap[N][n + (k * N)] = Math.cos(PI_N * (n + 0.5) * k);
    }
  }
};

function dct(signal, scale) {
  var L = signal.length;
  scale = scale || 2;

  if (!cosMap || !cosMap[L]) memoizeCosines(L);

  var coefficients = signal.map(function () {return 0;});

  return coefficients.map(function (__, ix) {
    return scale * signal.reduce(function (prev, cur, ix_, arr) {
      return prev + (cur * cosMap[L][ix_ + (ix * L)]);
    }, 0);
  });
};

module.exports = dct;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, __dirname) {var KissFFTModule = function(Module) {
  Module = Module || {};

var Module;if(!Module)Module=(typeof KissFFTModule!=="undefined"?KissFFTModule:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=typeof window==="object";var ENVIRONMENT_IS_WORKER=typeof importScripts==="function";var ENVIRONMENT_IS_NODE=typeof process==="object"&&"function"==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;var ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=function print(x){process["stdout"].write(x+"\n")};if(!Module["printErr"])Module["printErr"]=function printErr(x){process["stderr"].write(x+"\n")};var nodeFS=__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));var nodePath=__webpack_require__(119);Module["read"]=function read(filename,binary){filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);if(!ret&&filename!=nodePath["resolve"](filename)){filename=path.join(__dirname,"..","src",filename);ret=nodeFS["readFileSync"](filename)}if(ret&&!binary)ret=ret.toString();return ret};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);if(true){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function read(){throw"no read() available (jsc?)"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function printErr(x){console.log(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){eval.call(null,x)}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}var Runtime={setTempRet0:(function(value){tempRet0=value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){if(!args.splice)args=Array.prototype.slice.call(args);args.splice(0,0,ptr);return Module["dynCall_"+sig].apply(null,args)}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 2*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-2)/2]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,arguments)}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=DYNAMICTOP;DYNAMICTOP=DYNAMICTOP+size|0;DYNAMICTOP=DYNAMICTOP+15&-16;if(DYNAMICTOP>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){DYNAMICTOP=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var __THREW__=0;var ABORT=false;var EXITSTATUS=0;var undef=0;var tempValue,tempInt,tempBigInt,tempInt2,tempBigInt2,tempPair,tempBigIntI,tempBigIntR,tempBigIntS,tempBigIntP,tempBigIntD,tempDouble,tempFloat;var tempI64,tempI64b;var tempRet0,tempRet1,tempRet2,tempRet3,tempRet4,tempRet5,tempRet6,tempRet7,tempRet8,tempRet9;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var globalScope=this;function getCFunc(ident){var func=Module["_"+ident];if(!func){try{func=eval("_"+ident)}catch(e){}}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=Runtime.stackAlloc((str.length<<2)+1);writeStringToMemory(str,ret)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};var sourceRegex=/^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(jsfunc){var parsed=jsfunc.toString().match(sourceRegex).slice(1);return{arguments:parsed[0],body:parsed[1],returnValue:parsed[2]}}var JSsource={};for(var fun in JSfuncs){if(JSfuncs.hasOwnProperty(fun)){JSsource[fun]=parseJSFunc(JSfuncs[fun])}}cwrap=function cwrap(ident,returnType,argTypes){argTypes=argTypes||[];var cfunc=getCFunc(ident);var numericArgs=argTypes.every((function(type){return type==="number"}));var numericRet=returnType!=="string";if(numericRet&&numericArgs){return cfunc}var argNames=argTypes.map((function(x,i){return"$"+i}));var funcstr="(function("+argNames.join(",")+") {";var nargs=argTypes.length;if(!numericArgs){funcstr+="var stack = "+JSsource["stackSave"].body+";";for(var i=0;i<nargs;i++){var arg=argNames[i],type=argTypes[i];if(type==="number")continue;var convertCode=JSsource[type+"ToC"];funcstr+="var "+convertCode.arguments+" = "+arg+";";funcstr+=convertCode.body+";";funcstr+=arg+"="+convertCode.returnValue+";"}}var cfuncname=parseJSFunc((function(){return cfunc})).returnValue;funcstr+="var ret = "+cfuncname+"("+argNames.join(",")+");";if(!numericRet){var strgfy=parseJSFunc((function(){return Pointer_stringify})).returnValue;funcstr+="ret = "+strgfy+"(ret);"}if(!numericArgs){funcstr+=JSsource["stackRestore"].body.replace("()","(stack)")+";"}funcstr+="return ret})";return eval(funcstr)}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[_malloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(typeof _sbrk!=="undefined"&&!_sbrk.called||!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;function UTF8ArrayToString(u8Array,idx){var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;function UTF16ToString(ptr){var i=0;var str="";while(1){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)return str;++i;str+=String.fromCharCode(codeUnit)}}Module["UTF16ToString"]=UTF16ToString;function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2}HEAP16[outPtr>>1]=0;return outPtr-startPtr}Module["stringToUTF16"]=stringToUTF16;function lengthBytesUTF16(str){return str.length*2}Module["lengthBytesUTF16"]=lengthBytesUTF16;function UTF32ToString(ptr){var i=0;var str="";while(1){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)return str;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}}Module["UTF32ToString"]=UTF32ToString;function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr}Module["stringToUTF32"]=stringToUTF32;function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4}return len}Module["lengthBytesUTF32"]=lengthBytesUTF32;function demangle(func){var hasLibcxxabi=!!Module["___cxa_demangle"];if(hasLibcxxabi){try{var buf=_malloc(func.length);writeStringToMemory(func.substr(1),buf);var status=_malloc(4);var ret=Module["___cxa_demangle"](buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}}var i=3;var basicTypes={"v":"void","b":"bool","c":"char","s":"short","i":"int","l":"long","f":"float","d":"double","w":"wchar_t","a":"signed char","h":"unsigned char","t":"unsigned short","j":"unsigned int","m":"unsigned long","x":"long long","y":"unsigned long long","z":"..."};var subs=[];var first=true;function dump(x){if(x)Module.print(x);Module.print(func);var pre="";for(var a=0;a<i;a++)pre+=" ";Module.print(pre+"^")}function parseNested(){i++;if(func[i]==="K")i++;var parts=[];while(func[i]!=="E"){if(func[i]==="S"){i++;var next=func.indexOf("_",i);var num=func.substring(i,next)||0;parts.push(subs[num]||"?");i=next+1;continue}if(func[i]==="C"){parts.push(parts[parts.length-1]);i+=2;continue}var size=parseInt(func.substr(i));var pre=size.toString().length;if(!size||!pre){i--;break}var curr=func.substr(i+pre,size);parts.push(curr);subs.push(curr);i+=pre+size}i++;return parts}function parse(rawList,limit,allowVoid){limit=limit||Infinity;var ret="",list=[];function flushList(){return"("+list.join(", ")+")"}var name;if(func[i]==="N"){name=parseNested().join("::");limit--;if(limit===0)return rawList?[name]:name}else{if(func[i]==="K"||first&&func[i]==="L")i++;var size=parseInt(func.substr(i));if(size){var pre=size.toString().length;name=func.substr(i+pre,size);i+=pre+size}}first=false;if(func[i]==="I"){i++;var iList=parse(true);var iRet=parse(true,1,true);ret+=iRet[0]+" "+name+"<"+iList.join(", ")+">"}else{ret=name}paramLoop:while(i<func.length&&limit-->0){var c=func[i++];if(c in basicTypes){list.push(basicTypes[c])}else{switch(c){case"P":list.push(parse(true,1,true)[0]+"*");break;case"R":list.push(parse(true,1,true)[0]+"&");break;case"L":{i++;var end=func.indexOf("E",i);var size=end-i;list.push(func.substr(i,size));i+=size+2;break};case"A":{var size=parseInt(func.substr(i));i+=size.toString().length;if(func[i]!=="_")throw"?";i++;list.push(parse(true,1,true)[0]+" ["+size+"]");break};case"E":break paramLoop;default:ret+="?"+c;break paramLoop}}}if(!allowVoid&&list.length===1&&list[0]==="void")list=[];if(rawList){if(ret){list.push(ret+"?")}return list}else{return ret+flushList()}}var parsed=func;try{if(func=="Object._main"||func=="_main"){return"main()"}if(typeof func==="number")func=Pointer_stringify(func);if(func[0]!=="_")return func;if(func[1]!=="_")return func;if(func[2]!=="Z")return func;switch(func[3]){case"n":return"operator new()";case"d":return"operator delete()"}parsed=parse()}catch(e){parsed+="?"}if(parsed.indexOf("?")>=0&&!hasLibcxxabi){Runtime.warnOnce("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling")}return parsed}function demangleAll(text){return text.replace(/__Z[\w\d_]+/g,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){return demangleAll(jsStackTrace())}Module["stackTrace"]=stackTrace;var PAGE_SIZE=4096;function alignMemoryPage(x){if(x%4096>0){x+=4096-x%4096}return x}var HEAP;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;var STATIC_BASE=0,STATICTOP=0,staticSealed=false;var STACK_BASE=0,STACKTOP=0,STACK_MAX=0;var DYNAMIC_BASE=0,DYNAMICTOP=0;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;var totalMemory=64*1024;while(totalMemory<TOTAL_MEMORY||totalMemory<2*TOTAL_STACK){if(totalMemory<16*1024*1024){totalMemory*=2}else{totalMemory+=16*1024*1024}}if(totalMemory!==TOTAL_MEMORY){TOTAL_MEMORY=totalMemory}assert(typeof Int32Array!=="undefined"&&typeof Float64Array!=="undefined"&&!!(new Int32Array(1))["subarray"]&&!!(new Int32Array(1))["set"],"JS engine does not provide full typed array support");var buffer;buffer=new ArrayBuffer(TOTAL_MEMORY);HEAP8=new Int8Array(buffer);HEAP16=new Int16Array(buffer);HEAP32=new Int32Array(buffer);HEAPU8=new Uint8Array(buffer);HEAPU16=new Uint16Array(buffer);HEAPU32=new Uint32Array(buffer);HEAPF32=new Float32Array(buffer);HEAPF64=new Float64Array(buffer);HEAP32[0]=255;assert(HEAPU8[0]===255&&HEAPU8[3]===0,"Typed arrays 2 must be run on a little-endian system");Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Runtime.dynCall("v",func)}else{Runtime.dynCall("vi",func,[callback.arg])}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){var array=intArrayFromString(string,dontAddNull);var i=0;while(i<array.length){var chr=array[i];HEAP8[buffer+i>>0]=chr;i=i+1}}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){for(var i=0;i<array.length;i++){HEAP8[buffer++>>0]=array[i]}}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;function unSign(value,bits,ignore){if(value>=0){return value}return bits<=32?2*Math.abs(1<<bits-1)+value:Math.pow(2,bits)+value}function reSign(value,bits,ignore){if(value<=0){return value}var half=bits<=32?Math.abs(1<<bits-1):Math.pow(2,bits-1);if(value>=half&&(bits<=32||value>half)){value=-2*half+value}return value}if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_min=Math.min;var Math_clz32=Math.clz32;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var memoryInitializer=null;var ASM_CONSTS=[];STATIC_BASE=8;STATICTOP=STATIC_BASE+752;__ATINIT__.push();allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,239,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,82,101,97,108,32,70,70,84,32,111,112,116,105,109,105,122,97,116,105,111,110,32,109,117,115,116,32,98,101,32,101,118,101,110,46,10,0,107,105,115,115,32,102,102,116,32,117,115,97,103,101,32,101,114,114,111,114,58,32,105,109,112,114,111,112,101,114,32,97,108,108,111,99,10,0,0,0,0,0,0,0,0,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);var tempDoublePtr=Runtime.alignMemory(allocate(12,"i8",ALLOC_STATIC),8);assert(tempDoublePtr%8==0);function copyTempFloat(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3]}function copyTempDouble(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3];HEAP8[tempDoublePtr+4]=HEAP8[ptr+4];HEAP8[tempDoublePtr+5]=HEAP8[ptr+5];HEAP8[tempDoublePtr+6]=HEAP8[ptr+6];HEAP8[tempDoublePtr+7]=HEAP8[ptr+7]}function __exit(status){Module["exit"](status)}function _exit(status){__exit(status)}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 85:return totalMemory/PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}___setErrNo(ERRNO_CODES.EINVAL);return-1}Module["_memset"]=_memset;function _pthread_cleanup_push(routine,arg){__ATEXIT__.push((function(){Runtime.dynCall("vi",routine,[arg])}));_pthread_cleanup_push.level=__ATEXIT__.length}function _pthread_cleanup_pop(){assert(_pthread_cleanup_push.level==__ATEXIT__.length,"cannot pop if something else added meanwhile!");__ATEXIT__.pop();_pthread_cleanup_push.level=__ATEXIT__.length}function _abort(){Module["abort"]()}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}Module["_memcpy"]=_memcpy;var SYSCALLS={varargs:0,get:(function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret}),getStr:(function(){var ret=Pointer_stringify(SYSCALLS.get());return ret}),get64:(function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low}),getZero:(function(){assert(SYSCALLS.get()===0)})};function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}var _cos=Math_cos;function _sbrk(bytes){var self=_sbrk;if(!self.called){DYNAMICTOP=alignMemoryPage(DYNAMICTOP);self.called=true;assert(Runtime.dynamicAlloc);self.alloc=Runtime.dynamicAlloc;Runtime.dynamicAlloc=(function(){abort("cannot dynamically allocate, sbrk now has control")})}var ret=DYNAMICTOP;if(bytes!=0){var success=self.alloc(bytes);if(!success)return-1>>>0}return ret}var _floor=Math_floor;var _sqrt=Math_sqrt;function _time(ptr){var ret=Date.now()/1e3|0;if(ptr){HEAP32[ptr>>2]=ret}return ret}function _pthread_self(){return 0}function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;assert(offset_high===0);FS.llseek(stream,offset,whence);HEAP32[result>>2]=stream.position;if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;if(!___syscall146.buffer)___syscall146.buffer=[];var buffer=___syscall146.buffer;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){var curr=HEAPU8[ptr+j];if(curr===0||curr===10){Module["print"](UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}ret+=len}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}var _sin=Math_sin;STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);staticSealed=true;STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=DYNAMICTOP=Runtime.alignMemory(STACK_MAX);assert(DYNAMIC_BASE<TOTAL_MEMORY,"TOTAL_MEMORY not big enough for stack");function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_vi(index,a1){try{Module["dynCall_vi"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"invoke_ii":invoke_ii,"invoke_iiii":invoke_iiii,"invoke_vi":invoke_vi,"_pthread_cleanup_pop":_pthread_cleanup_pop,"_floor":_floor,"_sin":_sin,"_cos":_cos,"_sysconf":_sysconf,"_pthread_self":_pthread_self,"___syscall6":___syscall6,"___setErrNo":___setErrNo,"_abort":_abort,"_sbrk":_sbrk,"_time":_time,"_pthread_cleanup_push":_pthread_cleanup_push,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_sqrt":_sqrt,"___syscall140":___syscall140,"_exit":_exit,"__exit":__exit,"___syscall146":___syscall146,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=0;var n=0;var o=0;var p=0;var q=global.NaN,r=global.Infinity;var s=0,t=0,u=0,v=0,w=0.0,x=0,y=0,z=0,A=0.0;var B=0;var C=0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=global.Math.floor;var M=global.Math.abs;var N=global.Math.sqrt;var O=global.Math.pow;var P=global.Math.cos;var Q=global.Math.sin;var R=global.Math.tan;var S=global.Math.acos;var T=global.Math.asin;var U=global.Math.atan;var V=global.Math.atan2;var W=global.Math.exp;var X=global.Math.log;var Y=global.Math.ceil;var Z=global.Math.imul;var _=global.Math.min;var $=global.Math.clz32;var aa=env.abort;var ba=env.assert;var ca=env.invoke_ii;var da=env.invoke_iiii;var ea=env.invoke_vi;var fa=env._pthread_cleanup_pop;var ga=env._floor;var ha=env._sin;var ia=env._cos;var ja=env._sysconf;var ka=env._pthread_self;var la=env.___syscall6;var ma=env.___setErrNo;var na=env._abort;var oa=env._sbrk;var pa=env._time;var qa=env._pthread_cleanup_push;var ra=env._emscripten_memcpy_big;var sa=env._sqrt;var ta=env.___syscall140;var ua=env._exit;var va=env.__exit;var wa=env.___syscall146;var xa=0.0;
// EMSCRIPTEN_START_FUNCS
function Ba(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+15&-16;return b|0}function Ca(){return i|0}function Da(a){a=a|0;i=a}function Ea(a,b){a=a|0;b=b|0;i=a;j=b}function Fa(a,b){a=a|0;b=b|0;if(!m){m=a;n=b}}function Ga(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0]}function Ha(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0];a[k+4>>0]=a[b+4>>0];a[k+5>>0]=a[b+5>>0];a[k+6>>0]=a[b+6>>0];a[k+7>>0]=a[b+7>>0]}function Ia(a){a=a|0;B=a}function Ja(){return B|0}function Ka(a){a=a|0;cb(a);return}function La(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0.0,i=0,j=0.0;f=(a<<3)+264|0;if(!e)i=bb(f)|0;else{if(!d)d=0;else d=(c[e>>2]|0)>>>0<f>>>0?0:d;c[e>>2]=f;i=d}if(!i)return i|0;c[i>>2]=a;e=i+4|0;c[e>>2]=b;h=+(a|0);a:do if((a|0)>0){f=b;d=0;while(1){j=+(d|0)*-6.283185307179586/h;j=(f|0)==0?j:-j;g[i+264+(d<<3)>>2]=+P(+j);g[i+264+(d<<3)+4>>2]=+Q(+j);d=d+1|0;if((d|0)==(a|0))break a;f=c[e>>2]|0}}while(0);h=+L(+(+N(+h)));f=a;e=i+8|0;d=4;while(1){b:do if((f|0)%(d|0)|0)while(1){switch(d|0){case 4:{d=2;break}case 2:{d=3;break}default:d=d+2|0}d=+(d|0)>h?f:d;if(!((f|0)%(d|0)|0))break b}while(0);f=(f|0)/(d|0)|0;c[e>>2]=d;c[e+4>>2]=f;if((f|0)<=1)break;else e=e+8|0}return i|0}function Ma(a,b,d,e,f,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;var i=0,j=0,l=0,m=0,n=0.0,o=0.0,p=0.0,q=0.0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0.0,z=0.0,A=0.0,B=0.0,C=0,D=0.0,E=0.0,F=0.0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0,M=0.0;w=c[f>>2]|0;m=f+8|0;x=c[f+4>>2]|0;r=a+((Z(x,w)|0)<<3)|0;if((x|0)==1){j=Z(e,d)|0;i=a;f=b;while(1){t=f;u=c[t+4>>2]|0;v=i;c[v>>2]=c[t>>2];c[v+4>>2]=u;i=i+8|0;if((i|0)==(r|0))break;else f=f+(j<<3)|0}}else{j=Z(w,d)|0;l=Z(e,d)|0;i=a;f=b;while(1){Ma(i,f,j,e,m,h);i=i+(x<<3)|0;if((i|0)==(r|0))break;else f=f+(l<<3)|0}}switch(w|0){case 2:{j=a;l=x;i=a+(x<<3)|0;f=h+264|0;while(1){o=+g[i>>2];y=+g[f>>2];a=i+4|0;n=+g[a>>2];q=+g[f+4>>2];p=o*y-n*q;q=y*n+o*q;g[i>>2]=+g[j>>2]-p;x=j+4|0;g[a>>2]=+g[x>>2]-q;g[j>>2]=p+ +g[j>>2];g[x>>2]=q+ +g[x>>2];l=l+-1|0;if(!l)break;else{j=j+8|0;i=i+8|0;f=f+(d<<3)|0}}return}case 3:{e=x<<1;n=+g[h+264+((Z(x,d)|0)<<3)+4>>2];l=h+264|0;m=d<<1;f=a;i=x;j=l;while(1){h=f+(x<<3)|0;o=+g[h>>2];p=+g[j>>2];a=f+(x<<3)+4|0;B=+g[a>>2];z=+g[j+4>>2];A=o*p-B*z;z=p*B+o*z;v=f+(e<<3)|0;o=+g[v>>2];B=+g[l>>2];w=f+(e<<3)+4|0;p=+g[w>>2];q=+g[l+4>>2];y=o*B-p*q;q=B*p+o*q;o=A+y;p=z+q;g[h>>2]=+g[f>>2]-o*.5;u=f+4|0;g[a>>2]=+g[u>>2]-p*.5;y=n*(A-y);q=n*(z-q);g[f>>2]=+g[f>>2]+o;g[u>>2]=p+ +g[u>>2];g[v>>2]=q+ +g[h>>2];g[w>>2]=+g[a>>2]-y;g[h>>2]=+g[h>>2]-q;g[a>>2]=y+ +g[a>>2];i=i+-1|0;if(!i)break;else{f=f+8|0;j=j+(d<<3)|0;l=l+(m<<3)|0}}return}case 4:{e=x<<1;b=x*3|0;f=h+264|0;r=d<<1;s=d*3|0;if(!(c[h+4>>2]|0)){i=a;j=x;l=f;m=f;while(1){v=i+(x<<3)|0;n=+g[v>>2];o=+g[l>>2];w=i+(x<<3)+4|0;y=+g[w>>2];D=+g[l+4>>2];E=n*o-y*D;D=o*y+n*D;C=i+(e<<3)|0;n=+g[C>>2];y=+g[m>>2];t=i+(e<<3)+4|0;o=+g[t>>2];p=+g[m+4>>2];q=n*y-o*p;p=y*o+n*p;h=i+(b<<3)|0;n=+g[h>>2];o=+g[f>>2];a=i+(b<<3)+4|0;y=+g[a>>2];z=+g[f+4>>2];B=n*o-y*z;z=o*y+n*z;n=+g[i>>2];y=n-q;u=i+4|0;o=+g[u>>2];A=o-p;n=q+n;g[i>>2]=n;o=p+o;g[u>>2]=o;p=E+B;q=D+z;B=E-B;z=D-z;g[C>>2]=n-p;g[t>>2]=o-q;g[i>>2]=p+ +g[i>>2];g[u>>2]=q+ +g[u>>2];g[v>>2]=y+z;g[w>>2]=A-B;g[h>>2]=y-z;g[a>>2]=A+B;j=j+-1|0;if(!j)break;else{i=i+8|0;l=l+(d<<3)|0;m=m+(r<<3)|0;f=f+(s<<3)|0}}return}else{i=a;j=x;l=f;m=f;while(1){w=i+(x<<3)|0;p=+g[w>>2];q=+g[l>>2];h=i+(x<<3)+4|0;A=+g[h>>2];o=+g[l+4>>2];n=p*q-A*o;o=q*A+p*o;t=i+(e<<3)|0;p=+g[t>>2];A=+g[m>>2];u=i+(e<<3)+4|0;q=+g[u>>2];y=+g[m+4>>2];z=p*A-q*y;y=A*q+p*y;a=i+(b<<3)|0;p=+g[a>>2];q=+g[f>>2];C=i+(b<<3)+4|0;A=+g[C>>2];B=+g[f+4>>2];E=p*q-A*B;B=q*A+p*B;p=+g[i>>2];A=p-z;v=i+4|0;q=+g[v>>2];D=q-y;p=z+p;g[i>>2]=p;q=y+q;g[v>>2]=q;y=n+E;z=o+B;E=n-E;B=o-B;g[t>>2]=p-y;g[u>>2]=q-z;g[i>>2]=y+ +g[i>>2];g[v>>2]=z+ +g[v>>2];g[w>>2]=A-B;g[h>>2]=D+E;g[a>>2]=A+B;g[C>>2]=D-E;j=j+-1|0;if(!j)break;else{i=i+8|0;l=l+(d<<3)|0;m=m+(r<<3)|0;f=f+(s<<3)|0}}return}}case 5:{C=Z(x,d)|0;n=+g[h+264+(C<<3)>>2];o=+g[h+264+(C<<3)+4>>2];C=Z(x,d<<1)|0;p=+g[h+264+(C<<3)>>2];q=+g[h+264+(C<<3)+4>>2];if((x|0)<=0)return;j=d*3|0;l=a;m=a+(x<<3)|0;e=a+(x<<1<<3)|0;b=a+(x*3<<3)|0;f=a+(x<<2<<3)|0;i=0;while(1){H=+g[l>>2];u=l+4|0;F=+g[u>>2];A=+g[m>>2];t=Z(i,d)|0;D=+g[h+264+(t<<3)>>2];v=m+4|0;M=+g[v>>2];I=+g[h+264+(t<<3)+4>>2];G=A*D-M*I;I=D*M+A*I;A=+g[e>>2];t=Z(i<<1,d)|0;M=+g[h+264+(t<<3)>>2];a=e+4|0;D=+g[a>>2];L=+g[h+264+(t<<3)+4>>2];J=A*M-D*L;L=M*D+A*L;A=+g[b>>2];t=Z(j,i)|0;D=+g[h+264+(t<<3)>>2];C=b+4|0;M=+g[C>>2];y=+g[h+264+(t<<3)+4>>2];E=A*D-M*y;y=D*M+A*y;A=+g[f>>2];t=Z(i<<2,d)|0;M=+g[h+264+(t<<3)>>2];w=f+4|0;D=+g[w>>2];B=+g[h+264+(t<<3)+4>>2];z=A*M-D*B;B=M*D+A*B;A=G+z;D=I+B;z=G-z;B=I-B;I=J+E;G=L+y;E=J-E;y=L-y;g[l>>2]=H+(I+A);g[u>>2]=F+(G+D);L=p*I+(H+n*A);J=p*G+(F+n*D);M=q*y+o*B;K=-(o*z)-q*E;g[m>>2]=L-M;g[v>>2]=J-K;g[f>>2]=M+L;g[w>>2]=K+J;A=n*I+(H+p*A);D=n*G+(F+p*D);B=o*y-q*B;E=q*z-o*E;g[e>>2]=B+A;g[a>>2]=E+D;g[b>>2]=A-B;g[C>>2]=D-E;i=i+1|0;if((i|0)==(x|0))break;else{l=l+8|0;m=m+8|0;e=e+8|0;b=b+8|0;f=f+8|0}}return}default:{t=c[h>>2]|0;v=bb(w<<3)|0;a:do if((x|0)>0?(w|0)>0:0){if((w|0)>1)u=0;else{m=0;while(1){f=m;i=0;while(1){h=a+(f<<3)|0;d=c[h+4>>2]|0;C=v+(i<<3)|0;c[C>>2]=c[h>>2];c[C+4>>2]=d;i=i+1|0;if((i|0)==(w|0))break;else f=f+x|0}i=v;f=c[i>>2]|0;i=c[i+4>>2]|0;j=m;l=0;while(1){C=a+(j<<3)|0;c[C>>2]=f;c[C+4>>2]=i;l=l+1|0;if((l|0)==(w|0))break;else j=j+x|0}m=m+1|0;if((m|0)==(x|0))break a}}do{f=u;i=0;while(1){r=a+(f<<3)|0;s=c[r+4>>2]|0;C=v+(i<<3)|0;c[C>>2]=c[r>>2];c[C+4>>2]=s;i=i+1|0;if((i|0)==(w|0))break;else f=f+x|0}i=v;f=c[i>>2]|0;i=c[i+4>>2]|0;n=(c[k>>2]=f,+g[k>>2]);e=u;r=0;while(1){j=a+(e<<3)|0;l=j;c[l>>2]=f;c[l+4>>2]=i;l=Z(e,d)|0;m=a+(e<<3)+4|0;o=n;p=+g[m>>2];b=1;s=0;do{C=s+l|0;s=C-((C|0)<(t|0)?0:t)|0;L=+g[v+(b<<3)>>2];J=+g[h+264+(s<<3)>>2];K=+g[v+(b<<3)+4>>2];M=+g[h+264+(s<<3)+4>>2];o=o+(L*J-K*M);g[j>>2]=o;p=p+(J*K+L*M);g[m>>2]=p;b=b+1|0}while((b|0)!=(w|0));r=r+1|0;if((r|0)==(w|0))break;else e=e+x|0}u=u+1|0}while((u|0)!=(x|0))}while(0);cb(v);return}}}function Na(a,b,d){a=a|0;b=b|0;d=d|0;if((b|0)==(d|0)){d=bb(c[a>>2]<<3)|0;Ma(d,b,1,1,a+8|0,a);fb(b|0,d|0,c[a>>2]<<3|0)|0;cb(d);return}else{Ma(d,b,1,1,a+8|0,a);return}}function Oa(a){a=a|0;cb(a);return}function Pa(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0.0,j=0,k=0,l=0,m=0,n=0.0;l=i;i=i+16|0;k=l;if(a&1){Za(668,36,1,c[13]|0)|0;b=0;i=l;return b|0}j=a>>1;La(j,b,0,k)|0;f=c[k>>2]|0;a=f+12+(((j*3|0)/2|0)<<3)|0;if(e){m=(c[e>>2]|0)>>>0<a>>>0;c[e>>2]=a;if(m){m=0;i=l;return m|0}}else d=bb(a)|0;if(!d){m=0;i=l;return m|0}e=d+12|0;c[d>>2]=e;m=e+f|0;c[d+4>>2]=m;a=d+8|0;c[a>>2]=m+(j<<3);La(j,b,e,k)|0;e=(j|0)/2|0;if((j|0)<=1){m=d;i=l;return m|0}h=+(j|0);f=c[a>>2]|0;if(!b){a=0;do{m=a;a=a+1|0;n=(+(a|0)/h+.5)*-3.141592653589793;g[f+(m<<3)>>2]=+P(+n);g[f+(m<<3)+4>>2]=+Q(+n)}while((a|0)<(e|0));i=l;return d|0}else{a=0;do{m=a;a=a+1|0;n=(+(a|0)/h+.5)*-3.141592653589793;g[f+(m<<3)>>2]=+P(+n);g[f+(m<<3)+4>>2]=+Q(+-n)}while((a|0)<(e|0));i=l;return d|0}return 0}function Qa(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0;e=c[a>>2]|0;if(c[e+4>>2]|0){Za(705,37,1,c[13]|0)|0;ua(1)}i=c[e>>2]|0;h=a+4|0;Na(e,b,c[h>>2]|0);h=c[h>>2]|0;k=+g[h>>2];j=+g[h+4>>2];g[d>>2]=k+j;g[d+(i<<3)>>2]=k-j;g[d+4>>2]=0.0;g[d+(i<<3)+4>>2]=0.0;f=(i|0)/2|0;if((i|0)<2)return;e=c[a+8>>2]|0;b=1;while(1){j=+g[h+(b<<3)>>2];o=+g[h+(b<<3)+4>>2];a=i-b|0;n=+g[h+(a<<3)>>2];p=+g[h+(a<<3)+4>>2];m=j+n;k=o-p;n=j-n;p=o+p;q=b+-1|0;o=+g[e+(q<<3)>>2];j=+g[e+(q<<3)+4>>2];l=n*o-p*j;j=p*o+n*j;g[d+(b<<3)>>2]=(m+l)*.5;g[d+(b<<3)+4>>2]=(k+j)*.5;g[d+(a<<3)>>2]=(m-l)*.5;g[d+(a<<3)+4>>2]=(j-k)*.5;if((b|0)<(f|0))b=b+1|0;else break}return}function Ra(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=0,k=0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0;f=c[a>>2]|0;if(!(c[f+4>>2]|0)){Za(705,37,1,c[13]|0)|0;ua(1)}j=c[f>>2]|0;i=b+(j<<3)|0;h=c[a+4>>2]|0;g[h>>2]=+g[b>>2]+ +g[i>>2];g[h+4>>2]=+g[b>>2]-+g[i>>2];i=(j|0)/2|0;if((j|0)<2){Na(f,h,d);return}a=c[a+8>>2]|0;e=1;while(1){l=+g[b+(e<<3)>>2];q=+g[b+(e<<3)+4>>2];k=j-e|0;p=+g[b+(k<<3)>>2];r=+g[b+(k<<3)+4>>2];o=l+p;m=q-r;p=l-p;r=q+r;s=e+-1|0;q=+g[a+(s<<3)>>2];l=+g[a+(s<<3)+4>>2];n=p*q-r*l;l=r*q+p*l;g[h+(e<<3)>>2]=o+n;g[h+(e<<3)+4>>2]=m+l;g[h+(k<<3)>>2]=o-n;g[h+(k<<3)+4>>2]=-(m-l);if((e|0)<(i|0))e=e+1|0;else break}Na(f,h,d);return}function Sa(){var a=0;if(!(c[2]|0))a=56;else a=c[(ka()|0)+60>>2]|0;return a|0}function Ta(a){a=a|0;if(a>>>0>4294963200){c[(Sa()|0)>>2]=0-a;a=-1}return a|0}function Ua(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=i;i=i+48|0;n=q+16|0;m=q;e=q+32|0;o=a+28|0;f=c[o>>2]|0;c[e>>2]=f;p=a+20|0;f=(c[p>>2]|0)-f|0;c[e+4>>2]=f;c[e+8>>2]=b;c[e+12>>2]=d;k=a+60|0;l=a+44|0;b=2;f=f+d|0;while(1){if(!(c[2]|0)){c[n>>2]=c[k>>2];c[n+4>>2]=e;c[n+8>>2]=b;h=Ta(wa(146,n|0)|0)|0}else{qa(1,a|0);c[m>>2]=c[k>>2];c[m+4>>2]=e;c[m+8>>2]=b;h=Ta(wa(146,m|0)|0)|0;fa(0)}if((f|0)==(h|0)){f=6;break}if((h|0)<0){f=8;break}f=f-h|0;g=c[e+4>>2]|0;if(h>>>0<=g>>>0)if((b|0)==2){c[o>>2]=(c[o>>2]|0)+h;j=g;b=2}else j=g;else{j=c[l>>2]|0;c[o>>2]=j;c[p>>2]=j;j=c[e+12>>2]|0;h=h-g|0;e=e+8|0;b=b+-1|0}c[e>>2]=(c[e>>2]|0)+h;c[e+4>>2]=j-h}if((f|0)==6){n=c[l>>2]|0;c[a+16>>2]=n+(c[a+48>>2]|0);a=n;c[o>>2]=a;c[p>>2]=a}else if((f|0)==8){c[a+16>>2]=0;c[o>>2]=0;c[p>>2]=0;c[a>>2]=c[a>>2]|32;if((b|0)==2)d=0;else d=d-(c[e+4>>2]|0)|0}i=q;return d|0}function Va(a){a=a|0;var b=0,d=0;b=i;i=i+16|0;d=b;c[d>>2]=c[a+60>>2];a=Ta(la(6,d|0)|0)|0;i=b;return a|0}function Wa(b){b=b|0;var d=0,e=0;d=b+74|0;e=a[d>>0]|0;a[d>>0]=e+255|e;d=c[b>>2]|0;if(!(d&8)){c[b+8>>2]=0;c[b+4>>2]=0;d=c[b+44>>2]|0;c[b+28>>2]=d;c[b+20>>2]=d;c[b+16>>2]=d+(c[b+48>>2]|0);d=0}else{c[b>>2]=d|32;d=-1}return d|0}function Xa(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;f=i;i=i+32|0;g=f;e=f+20|0;c[g>>2]=c[a+60>>2];c[g+4>>2]=0;c[g+8>>2]=b;c[g+12>>2]=e;c[g+16>>2]=d;if((Ta(ta(140,g|0)|0)|0)<0){c[e>>2]=-1;a=-1}else a=c[e>>2]|0;i=f;return a|0}function Ya(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=e+16|0;g=c[f>>2]|0;if(!g)if(!(Wa(e)|0)){g=c[f>>2]|0;h=5}else f=0;else h=5;a:do if((h|0)==5){i=e+20|0;f=c[i>>2]|0;h=f;if((g-f|0)>>>0<d>>>0){f=za[c[e+36>>2]&3](e,b,d)|0;break}b:do if((a[e+75>>0]|0)>-1){f=d;while(1){if(!f){g=h;f=0;break b}g=f+-1|0;if((a[b+g>>0]|0)==10)break;else f=g}if((za[c[e+36>>2]&3](e,b,f)|0)>>>0<f>>>0)break a;d=d-f|0;b=b+f|0;g=c[i>>2]|0}else{g=h;f=0}while(0);fb(g|0,b|0,d|0)|0;c[i>>2]=(c[i>>2]|0)+d;f=f+d|0}while(0);return f|0}function Za(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=Z(d,b)|0;if((c[e+76>>2]|0)>-1){g=(_a(e)|0)==0;a=Ya(a,f,e)|0;if(!g)$a(e)}else a=Ya(a,f,e)|0;if((a|0)!=(f|0))d=(a>>>0)/(b>>>0)|0;return d|0}function _a(a){a=a|0;return 0}function $a(a){a=a|0;return}function ab(a){a=a|0;if(!(c[a+68>>2]|0))$a(a);return}function bb(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;do if(a>>>0<245){o=a>>>0<11?16:a+11&-8;a=o>>>3;j=c[43]|0;b=j>>>a;if(b&3){b=(b&1^1)+a|0;d=212+(b<<1<<2)|0;e=d+8|0;f=c[e>>2]|0;g=f+8|0;h=c[g>>2]|0;do if((d|0)!=(h|0)){if(h>>>0<(c[47]|0)>>>0)na();a=h+12|0;if((c[a>>2]|0)==(f|0)){c[a>>2]=d;c[e>>2]=h;break}else na()}else c[43]=j&~(1<<b);while(0);L=b<<3;c[f+4>>2]=L|3;L=f+L+4|0;c[L>>2]=c[L>>2]|1;L=g;return L|0}h=c[45]|0;if(o>>>0>h>>>0){if(b){d=2<<a;d=b<<a&(d|0-d);d=(d&0-d)+-1|0;i=d>>>12&16;d=d>>>i;f=d>>>5&8;d=d>>>f;g=d>>>2&4;d=d>>>g;e=d>>>1&2;d=d>>>e;b=d>>>1&1;b=(f|i|g|e|b)+(d>>>b)|0;d=212+(b<<1<<2)|0;e=d+8|0;g=c[e>>2]|0;i=g+8|0;f=c[i>>2]|0;do if((d|0)!=(f|0)){if(f>>>0<(c[47]|0)>>>0)na();a=f+12|0;if((c[a>>2]|0)==(g|0)){c[a>>2]=d;c[e>>2]=f;k=c[45]|0;break}else na()}else{c[43]=j&~(1<<b);k=h}while(0);h=(b<<3)-o|0;c[g+4>>2]=o|3;e=g+o|0;c[e+4>>2]=h|1;c[e+h>>2]=h;if(k){f=c[48]|0;b=k>>>3;d=212+(b<<1<<2)|0;a=c[43]|0;b=1<<b;if(a&b){a=d+8|0;b=c[a>>2]|0;if(b>>>0<(c[47]|0)>>>0)na();else{l=a;m=b}}else{c[43]=a|b;l=d+8|0;m=d}c[l>>2]=f;c[m+12>>2]=f;c[f+8>>2]=m;c[f+12>>2]=d}c[45]=h;c[48]=e;L=i;return L|0}a=c[44]|0;if(a){d=(a&0-a)+-1|0;K=d>>>12&16;d=d>>>K;J=d>>>5&8;d=d>>>J;L=d>>>2&4;d=d>>>L;b=d>>>1&2;d=d>>>b;e=d>>>1&1;e=c[476+((J|K|L|b|e)+(d>>>e)<<2)>>2]|0;d=(c[e+4>>2]&-8)-o|0;b=e;while(1){a=c[b+16>>2]|0;if(!a){a=c[b+20>>2]|0;if(!a){j=e;break}}b=(c[a+4>>2]&-8)-o|0;L=b>>>0<d>>>0;d=L?b:d;b=a;e=L?a:e}g=c[47]|0;if(j>>>0<g>>>0)na();i=j+o|0;if(j>>>0>=i>>>0)na();h=c[j+24>>2]|0;e=c[j+12>>2]|0;do if((e|0)==(j|0)){b=j+20|0;a=c[b>>2]|0;if(!a){b=j+16|0;a=c[b>>2]|0;if(!a){n=0;break}}while(1){e=a+20|0;f=c[e>>2]|0;if(f){a=f;b=e;continue}e=a+16|0;f=c[e>>2]|0;if(!f)break;else{a=f;b=e}}if(b>>>0<g>>>0)na();else{c[b>>2]=0;n=a;break}}else{f=c[j+8>>2]|0;if(f>>>0<g>>>0)na();a=f+12|0;if((c[a>>2]|0)!=(j|0))na();b=e+8|0;if((c[b>>2]|0)==(j|0)){c[a>>2]=e;c[b>>2]=f;n=e;break}else na()}while(0);do if(h){a=c[j+28>>2]|0;b=476+(a<<2)|0;if((j|0)==(c[b>>2]|0)){c[b>>2]=n;if(!n){c[44]=c[44]&~(1<<a);break}}else{if(h>>>0<(c[47]|0)>>>0)na();a=h+16|0;if((c[a>>2]|0)==(j|0))c[a>>2]=n;else c[h+20>>2]=n;if(!n)break}b=c[47]|0;if(n>>>0<b>>>0)na();c[n+24>>2]=h;a=c[j+16>>2]|0;do if(a)if(a>>>0<b>>>0)na();else{c[n+16>>2]=a;c[a+24>>2]=n;break}while(0);a=c[j+20>>2]|0;if(a)if(a>>>0<(c[47]|0)>>>0)na();else{c[n+20>>2]=a;c[a+24>>2]=n;break}}while(0);if(d>>>0<16){L=d+o|0;c[j+4>>2]=L|3;L=j+L+4|0;c[L>>2]=c[L>>2]|1}else{c[j+4>>2]=o|3;c[i+4>>2]=d|1;c[i+d>>2]=d;a=c[45]|0;if(a){f=c[48]|0;b=a>>>3;e=212+(b<<1<<2)|0;a=c[43]|0;b=1<<b;if(a&b){a=e+8|0;b=c[a>>2]|0;if(b>>>0<(c[47]|0)>>>0)na();else{p=a;q=b}}else{c[43]=a|b;p=e+8|0;q=e}c[p>>2]=f;c[q+12>>2]=f;c[f+8>>2]=q;c[f+12>>2]=e}c[45]=d;c[48]=i}L=j+8|0;return L|0}}}else if(a>>>0<=4294967231){a=a+11|0;o=a&-8;j=c[44]|0;if(j){d=0-o|0;a=a>>>8;if(a)if(o>>>0>16777215)i=31;else{q=(a+1048320|0)>>>16&8;E=a<<q;p=(E+520192|0)>>>16&4;E=E<<p;i=(E+245760|0)>>>16&2;i=14-(p|q|i)+(E<<i>>>15)|0;i=o>>>(i+7|0)&1|i<<1}else i=0;b=c[476+(i<<2)>>2]|0;a:do if(!b){a=0;b=0;E=86}else{f=d;a=0;g=o<<((i|0)==31?0:25-(i>>>1)|0);h=b;b=0;while(1){e=c[h+4>>2]&-8;d=e-o|0;if(d>>>0<f>>>0)if((e|0)==(o|0)){a=h;b=h;E=90;break a}else b=h;else d=f;e=c[h+20>>2]|0;h=c[h+16+(g>>>31<<2)>>2]|0;a=(e|0)==0|(e|0)==(h|0)?a:e;e=(h|0)==0;if(e){E=86;break}else{f=d;g=g<<(e&1^1)}}}while(0);if((E|0)==86){if((a|0)==0&(b|0)==0){a=2<<i;a=j&(a|0-a);if(!a)break;q=(a&0-a)+-1|0;m=q>>>12&16;q=q>>>m;l=q>>>5&8;q=q>>>l;n=q>>>2&4;q=q>>>n;p=q>>>1&2;q=q>>>p;a=q>>>1&1;a=c[476+((l|m|n|p|a)+(q>>>a)<<2)>>2]|0}if(!a){i=d;j=b}else E=90}if((E|0)==90)while(1){E=0;q=(c[a+4>>2]&-8)-o|0;e=q>>>0<d>>>0;d=e?q:d;b=e?a:b;e=c[a+16>>2]|0;if(e){a=e;E=90;continue}a=c[a+20>>2]|0;if(!a){i=d;j=b;break}else E=90}if((j|0)!=0?i>>>0<((c[45]|0)-o|0)>>>0:0){f=c[47]|0;if(j>>>0<f>>>0)na();h=j+o|0;if(j>>>0>=h>>>0)na();g=c[j+24>>2]|0;d=c[j+12>>2]|0;do if((d|0)==(j|0)){b=j+20|0;a=c[b>>2]|0;if(!a){b=j+16|0;a=c[b>>2]|0;if(!a){s=0;break}}while(1){d=a+20|0;e=c[d>>2]|0;if(e){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}if(b>>>0<f>>>0)na();else{c[b>>2]=0;s=a;break}}else{e=c[j+8>>2]|0;if(e>>>0<f>>>0)na();a=e+12|0;if((c[a>>2]|0)!=(j|0))na();b=d+8|0;if((c[b>>2]|0)==(j|0)){c[a>>2]=d;c[b>>2]=e;s=d;break}else na()}while(0);do if(g){a=c[j+28>>2]|0;b=476+(a<<2)|0;if((j|0)==(c[b>>2]|0)){c[b>>2]=s;if(!s){c[44]=c[44]&~(1<<a);break}}else{if(g>>>0<(c[47]|0)>>>0)na();a=g+16|0;if((c[a>>2]|0)==(j|0))c[a>>2]=s;else c[g+20>>2]=s;if(!s)break}b=c[47]|0;if(s>>>0<b>>>0)na();c[s+24>>2]=g;a=c[j+16>>2]|0;do if(a)if(a>>>0<b>>>0)na();else{c[s+16>>2]=a;c[a+24>>2]=s;break}while(0);a=c[j+20>>2]|0;if(a)if(a>>>0<(c[47]|0)>>>0)na();else{c[s+20>>2]=a;c[a+24>>2]=s;break}}while(0);do if(i>>>0>=16){c[j+4>>2]=o|3;c[h+4>>2]=i|1;c[h+i>>2]=i;a=i>>>3;if(i>>>0<256){d=212+(a<<1<<2)|0;b=c[43]|0;a=1<<a;if(b&a){a=d+8|0;b=c[a>>2]|0;if(b>>>0<(c[47]|0)>>>0)na();else{u=a;v=b}}else{c[43]=b|a;u=d+8|0;v=d}c[u>>2]=h;c[v+12>>2]=h;c[h+8>>2]=v;c[h+12>>2]=d;break}a=i>>>8;if(a)if(i>>>0>16777215)d=31;else{K=(a+1048320|0)>>>16&8;L=a<<K;J=(L+520192|0)>>>16&4;L=L<<J;d=(L+245760|0)>>>16&2;d=14-(J|K|d)+(L<<d>>>15)|0;d=i>>>(d+7|0)&1|d<<1}else d=0;e=476+(d<<2)|0;c[h+28>>2]=d;a=h+16|0;c[a+4>>2]=0;c[a>>2]=0;a=c[44]|0;b=1<<d;if(!(a&b)){c[44]=a|b;c[e>>2]=h;c[h+24>>2]=e;c[h+12>>2]=h;c[h+8>>2]=h;break}f=i<<((d|0)==31?0:25-(d>>>1)|0);a=c[e>>2]|0;while(1){if((c[a+4>>2]&-8|0)==(i|0)){d=a;E=148;break}b=a+16+(f>>>31<<2)|0;d=c[b>>2]|0;if(!d){E=145;break}else{f=f<<1;a=d}}if((E|0)==145)if(b>>>0<(c[47]|0)>>>0)na();else{c[b>>2]=h;c[h+24>>2]=a;c[h+12>>2]=h;c[h+8>>2]=h;break}else if((E|0)==148){a=d+8|0;b=c[a>>2]|0;L=c[47]|0;if(b>>>0>=L>>>0&d>>>0>=L>>>0){c[b+12>>2]=h;c[a>>2]=h;c[h+8>>2]=b;c[h+12>>2]=d;c[h+24>>2]=0;break}else na()}}else{L=i+o|0;c[j+4>>2]=L|3;L=j+L+4|0;c[L>>2]=c[L>>2]|1}while(0);L=j+8|0;return L|0}}}else o=-1;while(0);d=c[45]|0;if(d>>>0>=o>>>0){a=d-o|0;b=c[48]|0;if(a>>>0>15){L=b+o|0;c[48]=L;c[45]=a;c[L+4>>2]=a|1;c[L+a>>2]=a;c[b+4>>2]=o|3}else{c[45]=0;c[48]=0;c[b+4>>2]=d|3;L=b+d+4|0;c[L>>2]=c[L>>2]|1}L=b+8|0;return L|0}a=c[46]|0;if(a>>>0>o>>>0){J=a-o|0;c[46]=J;L=c[49]|0;K=L+o|0;c[49]=K;c[K+4>>2]=J|1;c[L+4>>2]=o|3;L=L+8|0;return L|0}do if(!(c[161]|0)){a=ja(30)|0;if(!(a+-1&a)){c[163]=a;c[162]=a;c[164]=-1;c[165]=-1;c[166]=0;c[154]=0;c[161]=(pa(0)|0)&-16^1431655768;break}else na()}while(0);h=o+48|0;g=c[163]|0;i=o+47|0;f=g+i|0;g=0-g|0;j=f&g;if(j>>>0<=o>>>0){L=0;return L|0}a=c[153]|0;if((a|0)!=0?(u=c[151]|0,v=u+j|0,v>>>0<=u>>>0|v>>>0>a>>>0):0){L=0;return L|0}b:do if(!(c[154]&4)){a=c[49]|0;c:do if(a){d=620;while(1){b=c[d>>2]|0;if(b>>>0<=a>>>0?(r=d+4|0,(b+(c[r>>2]|0)|0)>>>0>a>>>0):0){e=d;d=r;break}d=c[d+8>>2]|0;if(!d){E=173;break c}}a=f-(c[46]|0)&g;if(a>>>0<2147483647){b=oa(a|0)|0;if((b|0)==((c[e>>2]|0)+(c[d>>2]|0)|0)){if((b|0)!=(-1|0)){h=b;f=a;E=193;break b}}else E=183}}else E=173;while(0);do if((E|0)==173?(t=oa(0)|0,(t|0)!=(-1|0)):0){a=t;b=c[162]|0;d=b+-1|0;if(!(d&a))a=j;else a=j-a+(d+a&0-b)|0;b=c[151]|0;d=b+a|0;if(a>>>0>o>>>0&a>>>0<2147483647){v=c[153]|0;if((v|0)!=0?d>>>0<=b>>>0|d>>>0>v>>>0:0)break;b=oa(a|0)|0;if((b|0)==(t|0)){h=t;f=a;E=193;break b}else E=183}}while(0);d:do if((E|0)==183){d=0-a|0;do if(h>>>0>a>>>0&(a>>>0<2147483647&(b|0)!=(-1|0))?(w=c[163]|0,w=i-a+w&0-w,w>>>0<2147483647):0)if((oa(w|0)|0)==(-1|0)){oa(d|0)|0;break d}else{a=w+a|0;break}while(0);if((b|0)!=(-1|0)){h=b;f=a;E=193;break b}}while(0);c[154]=c[154]|4;E=190}else E=190;while(0);if((((E|0)==190?j>>>0<2147483647:0)?(x=oa(j|0)|0,y=oa(0)|0,x>>>0<y>>>0&((x|0)!=(-1|0)&(y|0)!=(-1|0))):0)?(z=y-x|0,z>>>0>(o+40|0)>>>0):0){h=x;f=z;E=193}if((E|0)==193){a=(c[151]|0)+f|0;c[151]=a;if(a>>>0>(c[152]|0)>>>0)c[152]=a;i=c[49]|0;do if(i){e=620;do{a=c[e>>2]|0;b=e+4|0;d=c[b>>2]|0;if((h|0)==(a+d|0)){A=a;B=b;C=d;D=e;E=203;break}e=c[e+8>>2]|0}while((e|0)!=0);if(((E|0)==203?(c[D+12>>2]&8|0)==0:0)?i>>>0<h>>>0&i>>>0>=A>>>0:0){c[B>>2]=C+f;L=i+8|0;L=(L&7|0)==0?0:0-L&7;K=i+L|0;L=f-L+(c[46]|0)|0;c[49]=K;c[46]=L;c[K+4>>2]=L|1;c[K+L+4>>2]=40;c[50]=c[165];break}a=c[47]|0;if(h>>>0<a>>>0){c[47]=h;j=h}else j=a;d=h+f|0;a=620;while(1){if((c[a>>2]|0)==(d|0)){b=a;E=211;break}a=c[a+8>>2]|0;if(!a){b=620;break}}if((E|0)==211)if(!(c[a+12>>2]&8)){c[b>>2]=h;l=a+4|0;c[l>>2]=(c[l>>2]|0)+f;l=h+8|0;l=h+((l&7|0)==0?0:0-l&7)|0;a=d+8|0;a=d+((a&7|0)==0?0:0-a&7)|0;k=l+o|0;g=a-l-o|0;c[l+4>>2]=o|3;do if((a|0)!=(i|0)){if((a|0)==(c[48]|0)){L=(c[45]|0)+g|0;c[45]=L;c[48]=k;c[k+4>>2]=L|1;c[k+L>>2]=L;break}b=c[a+4>>2]|0;if((b&3|0)==1){i=b&-8;f=b>>>3;e:do if(b>>>0>=256){h=c[a+24>>2]|0;e=c[a+12>>2]|0;do if((e|0)==(a|0)){d=a+16|0;e=d+4|0;b=c[e>>2]|0;if(!b){b=c[d>>2]|0;if(!b){J=0;break}}else d=e;while(1){e=b+20|0;f=c[e>>2]|0;if(f){b=f;d=e;continue}e=b+16|0;f=c[e>>2]|0;if(!f)break;else{b=f;d=e}}if(d>>>0<j>>>0)na();else{c[d>>2]=0;J=b;break}}else{f=c[a+8>>2]|0;if(f>>>0<j>>>0)na();b=f+12|0;if((c[b>>2]|0)!=(a|0))na();d=e+8|0;if((c[d>>2]|0)==(a|0)){c[b>>2]=e;c[d>>2]=f;J=e;break}else na()}while(0);if(!h)break;b=c[a+28>>2]|0;d=476+(b<<2)|0;do if((a|0)!=(c[d>>2]|0)){if(h>>>0<(c[47]|0)>>>0)na();b=h+16|0;if((c[b>>2]|0)==(a|0))c[b>>2]=J;else c[h+20>>2]=J;if(!J)break e}else{c[d>>2]=J;if(J)break;c[44]=c[44]&~(1<<b);break e}while(0);e=c[47]|0;if(J>>>0<e>>>0)na();c[J+24>>2]=h;b=a+16|0;d=c[b>>2]|0;do if(d)if(d>>>0<e>>>0)na();else{c[J+16>>2]=d;c[d+24>>2]=J;break}while(0);b=c[b+4>>2]|0;if(!b)break;if(b>>>0<(c[47]|0)>>>0)na();else{c[J+20>>2]=b;c[b+24>>2]=J;break}}else{d=c[a+8>>2]|0;e=c[a+12>>2]|0;b=212+(f<<1<<2)|0;do if((d|0)!=(b|0)){if(d>>>0<j>>>0)na();if((c[d+12>>2]|0)==(a|0))break;na()}while(0);if((e|0)==(d|0)){c[43]=c[43]&~(1<<f);break}do if((e|0)==(b|0))G=e+8|0;else{if(e>>>0<j>>>0)na();b=e+8|0;if((c[b>>2]|0)==(a|0)){G=b;break}na()}while(0);c[d+12>>2]=e;c[G>>2]=d}while(0);a=a+i|0;g=i+g|0}a=a+4|0;c[a>>2]=c[a>>2]&-2;c[k+4>>2]=g|1;c[k+g>>2]=g;a=g>>>3;if(g>>>0<256){d=212+(a<<1<<2)|0;b=c[43]|0;a=1<<a;do if(!(b&a)){c[43]=b|a;K=d+8|0;L=d}else{a=d+8|0;b=c[a>>2]|0;if(b>>>0>=(c[47]|0)>>>0){K=a;L=b;break}na()}while(0);c[K>>2]=k;c[L+12>>2]=k;c[k+8>>2]=L;c[k+12>>2]=d;break}a=g>>>8;do if(!a)d=0;else{if(g>>>0>16777215){d=31;break}K=(a+1048320|0)>>>16&8;L=a<<K;J=(L+520192|0)>>>16&4;L=L<<J;d=(L+245760|0)>>>16&2;d=14-(J|K|d)+(L<<d>>>15)|0;d=g>>>(d+7|0)&1|d<<1}while(0);e=476+(d<<2)|0;c[k+28>>2]=d;a=k+16|0;c[a+4>>2]=0;c[a>>2]=0;a=c[44]|0;b=1<<d;if(!(a&b)){c[44]=a|b;c[e>>2]=k;c[k+24>>2]=e;c[k+12>>2]=k;c[k+8>>2]=k;break}f=g<<((d|0)==31?0:25-(d>>>1)|0);a=c[e>>2]|0;while(1){if((c[a+4>>2]&-8|0)==(g|0)){d=a;E=281;break}b=a+16+(f>>>31<<2)|0;d=c[b>>2]|0;if(!d){E=278;break}else{f=f<<1;a=d}}if((E|0)==278)if(b>>>0<(c[47]|0)>>>0)na();else{c[b>>2]=k;c[k+24>>2]=a;c[k+12>>2]=k;c[k+8>>2]=k;break}else if((E|0)==281){a=d+8|0;b=c[a>>2]|0;L=c[47]|0;if(b>>>0>=L>>>0&d>>>0>=L>>>0){c[b+12>>2]=k;c[a>>2]=k;c[k+8>>2]=b;c[k+12>>2]=d;c[k+24>>2]=0;break}else na()}}else{L=(c[46]|0)+g|0;c[46]=L;c[49]=k;c[k+4>>2]=L|1}while(0);L=l+8|0;return L|0}else b=620;while(1){a=c[b>>2]|0;if(a>>>0<=i>>>0?(F=a+(c[b+4>>2]|0)|0,F>>>0>i>>>0):0){b=F;break}b=c[b+8>>2]|0}g=b+-47|0;d=g+8|0;d=g+((d&7|0)==0?0:0-d&7)|0;g=i+16|0;d=d>>>0<g>>>0?i:d;a=d+8|0;e=h+8|0;e=(e&7|0)==0?0:0-e&7;L=h+e|0;e=f+-40-e|0;c[49]=L;c[46]=e;c[L+4>>2]=e|1;c[L+e+4>>2]=40;c[50]=c[165];e=d+4|0;c[e>>2]=27;c[a>>2]=c[155];c[a+4>>2]=c[156];c[a+8>>2]=c[157];c[a+12>>2]=c[158];c[155]=h;c[156]=f;c[158]=0;c[157]=a;a=d+24|0;do{a=a+4|0;c[a>>2]=7}while((a+4|0)>>>0<b>>>0);if((d|0)!=(i|0)){h=d-i|0;c[e>>2]=c[e>>2]&-2;c[i+4>>2]=h|1;c[d>>2]=h;a=h>>>3;if(h>>>0<256){d=212+(a<<1<<2)|0;b=c[43]|0;a=1<<a;if(b&a){a=d+8|0;b=c[a>>2]|0;if(b>>>0<(c[47]|0)>>>0)na();else{H=a;I=b}}else{c[43]=b|a;H=d+8|0;I=d}c[H>>2]=i;c[I+12>>2]=i;c[i+8>>2]=I;c[i+12>>2]=d;break}a=h>>>8;if(a)if(h>>>0>16777215)d=31;else{K=(a+1048320|0)>>>16&8;L=a<<K;J=(L+520192|0)>>>16&4;L=L<<J;d=(L+245760|0)>>>16&2;d=14-(J|K|d)+(L<<d>>>15)|0;d=h>>>(d+7|0)&1|d<<1}else d=0;f=476+(d<<2)|0;c[i+28>>2]=d;c[i+20>>2]=0;c[g>>2]=0;a=c[44]|0;b=1<<d;if(!(a&b)){c[44]=a|b;c[f>>2]=i;c[i+24>>2]=f;c[i+12>>2]=i;c[i+8>>2]=i;break}e=h<<((d|0)==31?0:25-(d>>>1)|0);a=c[f>>2]|0;while(1){if((c[a+4>>2]&-8|0)==(h|0)){d=a;E=307;break}b=a+16+(e>>>31<<2)|0;d=c[b>>2]|0;if(!d){E=304;break}else{e=e<<1;a=d}}if((E|0)==304)if(b>>>0<(c[47]|0)>>>0)na();else{c[b>>2]=i;c[i+24>>2]=a;c[i+12>>2]=i;c[i+8>>2]=i;break}else if((E|0)==307){a=d+8|0;b=c[a>>2]|0;L=c[47]|0;if(b>>>0>=L>>>0&d>>>0>=L>>>0){c[b+12>>2]=i;c[a>>2]=i;c[i+8>>2]=b;c[i+12>>2]=d;c[i+24>>2]=0;break}else na()}}}else{L=c[47]|0;if((L|0)==0|h>>>0<L>>>0)c[47]=h;c[155]=h;c[156]=f;c[158]=0;c[52]=c[161];c[51]=-1;a=0;do{L=212+(a<<1<<2)|0;c[L+12>>2]=L;c[L+8>>2]=L;a=a+1|0}while((a|0)!=32);L=h+8|0;L=(L&7|0)==0?0:0-L&7;K=h+L|0;L=f+-40-L|0;c[49]=K;c[46]=L;c[K+4>>2]=L|1;c[K+L+4>>2]=40;c[50]=c[165]}while(0);a=c[46]|0;if(a>>>0>o>>>0){J=a-o|0;c[46]=J;L=c[49]|0;K=L+o|0;c[49]=K;c[K+4>>2]=J|1;c[L+4>>2]=o|3;L=L+8|0;return L|0}}c[(Sa()|0)>>2]=12;L=0;return L|0}function cb(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if(!a)return;d=a+-8|0;h=c[47]|0;if(d>>>0<h>>>0)na();a=c[a+-4>>2]|0;b=a&3;if((b|0)==1)na();e=a&-8;m=d+e|0;do if(!(a&1)){a=c[d>>2]|0;if(!b)return;k=d+(0-a)|0;j=a+e|0;if(k>>>0<h>>>0)na();if((k|0)==(c[48]|0)){a=m+4|0;b=c[a>>2]|0;if((b&3|0)!=3){q=k;g=j;break}c[45]=j;c[a>>2]=b&-2;c[k+4>>2]=j|1;c[k+j>>2]=j;return}e=a>>>3;if(a>>>0<256){b=c[k+8>>2]|0;d=c[k+12>>2]|0;a=212+(e<<1<<2)|0;if((b|0)!=(a|0)){if(b>>>0<h>>>0)na();if((c[b+12>>2]|0)!=(k|0))na()}if((d|0)==(b|0)){c[43]=c[43]&~(1<<e);q=k;g=j;break}if((d|0)!=(a|0)){if(d>>>0<h>>>0)na();a=d+8|0;if((c[a>>2]|0)==(k|0))f=a;else na()}else f=d+8|0;c[b+12>>2]=d;c[f>>2]=b;q=k;g=j;break}f=c[k+24>>2]|0;d=c[k+12>>2]|0;do if((d|0)==(k|0)){b=k+16|0;d=b+4|0;a=c[d>>2]|0;if(!a){a=c[b>>2]|0;if(!a){i=0;break}}else b=d;while(1){d=a+20|0;e=c[d>>2]|0;if(e){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}if(b>>>0<h>>>0)na();else{c[b>>2]=0;i=a;break}}else{e=c[k+8>>2]|0;if(e>>>0<h>>>0)na();a=e+12|0;if((c[a>>2]|0)!=(k|0))na();b=d+8|0;if((c[b>>2]|0)==(k|0)){c[a>>2]=d;c[b>>2]=e;i=d;break}else na()}while(0);if(f){a=c[k+28>>2]|0;b=476+(a<<2)|0;if((k|0)==(c[b>>2]|0)){c[b>>2]=i;if(!i){c[44]=c[44]&~(1<<a);q=k;g=j;break}}else{if(f>>>0<(c[47]|0)>>>0)na();a=f+16|0;if((c[a>>2]|0)==(k|0))c[a>>2]=i;else c[f+20>>2]=i;if(!i){q=k;g=j;break}}d=c[47]|0;if(i>>>0<d>>>0)na();c[i+24>>2]=f;a=k+16|0;b=c[a>>2]|0;do if(b)if(b>>>0<d>>>0)na();else{c[i+16>>2]=b;c[b+24>>2]=i;break}while(0);a=c[a+4>>2]|0;if(a)if(a>>>0<(c[47]|0)>>>0)na();else{c[i+20>>2]=a;c[a+24>>2]=i;q=k;g=j;break}else{q=k;g=j}}else{q=k;g=j}}else{q=d;g=e}while(0);if(q>>>0>=m>>>0)na();a=m+4|0;b=c[a>>2]|0;if(!(b&1))na();if(!(b&2)){if((m|0)==(c[49]|0)){p=(c[46]|0)+g|0;c[46]=p;c[49]=q;c[q+4>>2]=p|1;if((q|0)!=(c[48]|0))return;c[48]=0;c[45]=0;return}if((m|0)==(c[48]|0)){p=(c[45]|0)+g|0;c[45]=p;c[48]=q;c[q+4>>2]=p|1;c[q+p>>2]=p;return}g=(b&-8)+g|0;e=b>>>3;do if(b>>>0>=256){f=c[m+24>>2]|0;a=c[m+12>>2]|0;do if((a|0)==(m|0)){b=m+16|0;d=b+4|0;a=c[d>>2]|0;if(!a){a=c[b>>2]|0;if(!a){n=0;break}}else b=d;while(1){d=a+20|0;e=c[d>>2]|0;if(e){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}if(b>>>0<(c[47]|0)>>>0)na();else{c[b>>2]=0;n=a;break}}else{b=c[m+8>>2]|0;if(b>>>0<(c[47]|0)>>>0)na();d=b+12|0;if((c[d>>2]|0)!=(m|0))na();e=a+8|0;if((c[e>>2]|0)==(m|0)){c[d>>2]=a;c[e>>2]=b;n=a;break}else na()}while(0);if(f){a=c[m+28>>2]|0;b=476+(a<<2)|0;if((m|0)==(c[b>>2]|0)){c[b>>2]=n;if(!n){c[44]=c[44]&~(1<<a);break}}else{if(f>>>0<(c[47]|0)>>>0)na();a=f+16|0;if((c[a>>2]|0)==(m|0))c[a>>2]=n;else c[f+20>>2]=n;if(!n)break}d=c[47]|0;if(n>>>0<d>>>0)na();c[n+24>>2]=f;a=m+16|0;b=c[a>>2]|0;do if(b)if(b>>>0<d>>>0)na();else{c[n+16>>2]=b;c[b+24>>2]=n;break}while(0);a=c[a+4>>2]|0;if(a)if(a>>>0<(c[47]|0)>>>0)na();else{c[n+20>>2]=a;c[a+24>>2]=n;break}}}else{b=c[m+8>>2]|0;d=c[m+12>>2]|0;a=212+(e<<1<<2)|0;if((b|0)!=(a|0)){if(b>>>0<(c[47]|0)>>>0)na();if((c[b+12>>2]|0)!=(m|0))na()}if((d|0)==(b|0)){c[43]=c[43]&~(1<<e);break}if((d|0)!=(a|0)){if(d>>>0<(c[47]|0)>>>0)na();a=d+8|0;if((c[a>>2]|0)==(m|0))l=a;else na()}else l=d+8|0;c[b+12>>2]=d;c[l>>2]=b}while(0);c[q+4>>2]=g|1;c[q+g>>2]=g;if((q|0)==(c[48]|0)){c[45]=g;return}}else{c[a>>2]=b&-2;c[q+4>>2]=g|1;c[q+g>>2]=g}a=g>>>3;if(g>>>0<256){d=212+(a<<1<<2)|0;b=c[43]|0;a=1<<a;if(b&a){a=d+8|0;b=c[a>>2]|0;if(b>>>0<(c[47]|0)>>>0)na();else{o=a;p=b}}else{c[43]=b|a;o=d+8|0;p=d}c[o>>2]=q;c[p+12>>2]=q;c[q+8>>2]=p;c[q+12>>2]=d;return}a=g>>>8;if(a)if(g>>>0>16777215)d=31;else{o=(a+1048320|0)>>>16&8;p=a<<o;n=(p+520192|0)>>>16&4;p=p<<n;d=(p+245760|0)>>>16&2;d=14-(n|o|d)+(p<<d>>>15)|0;d=g>>>(d+7|0)&1|d<<1}else d=0;e=476+(d<<2)|0;c[q+28>>2]=d;c[q+20>>2]=0;c[q+16>>2]=0;a=c[44]|0;b=1<<d;do if(a&b){f=g<<((d|0)==31?0:25-(d>>>1)|0);a=c[e>>2]|0;while(1){if((c[a+4>>2]&-8|0)==(g|0)){d=a;e=130;break}b=a+16+(f>>>31<<2)|0;d=c[b>>2]|0;if(!d){e=127;break}else{f=f<<1;a=d}}if((e|0)==127)if(b>>>0<(c[47]|0)>>>0)na();else{c[b>>2]=q;c[q+24>>2]=a;c[q+12>>2]=q;c[q+8>>2]=q;break}else if((e|0)==130){a=d+8|0;b=c[a>>2]|0;p=c[47]|0;if(b>>>0>=p>>>0&d>>>0>=p>>>0){c[b+12>>2]=q;c[a>>2]=q;c[q+8>>2]=b;c[q+12>>2]=d;c[q+24>>2]=0;break}else na()}}else{c[44]=a|b;c[e>>2]=q;c[q+24>>2]=e;c[q+12>>2]=q;c[q+8>>2]=q}while(0);q=(c[51]|0)+-1|0;c[51]=q;if(!q)a=628;else return;while(1){a=c[a>>2]|0;if(!a)break;else a=a+8|0}c[51]=-1;return}function db(){}function eb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;h=b&3;i=d|d<<8|d<<16|d<<24;g=f&~3;if(h){h=b+4-h|0;while((b|0)<(h|0)){a[b>>0]=d;b=b+1|0}}while((b|0)<(g|0)){c[b>>2]=i;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return b-e|0}function fb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return ra(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if(!e)return f|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function gb(a,b){a=a|0;b=b|0;return ya[a&1](b|0)|0}function hb(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return za[a&3](b|0,c|0,d|0)|0}function ib(a,b){a=a|0;b=b|0;Aa[a&1](b|0)}function jb(a){a=a|0;aa(0);return 0}function kb(a,b,c){a=a|0;b=b|0;c=c|0;aa(1);return 0}function lb(a){a=a|0;aa(2)}

// EMSCRIPTEN_END_FUNCS
var ya=[jb,Va];var za=[kb,Ua,Xa,kb];var Aa=[lb,ab];return{_malloc:bb,_free:cb,_kiss_fftr_alloc:Pa,_kiss_fftri:Ra,_kiss_fftr_free:Oa,_kiss_fft_alloc:La,_memset:eb,_kiss_fftr:Qa,_kiss_fft:Na,_memcpy:fb,_kiss_fft_free:Ka,runPostSets:db,stackAlloc:Ba,stackSave:Ca,stackRestore:Da,establishStackSpace:Ea,setThrew:Fa,setTempRet0:Ia,getTempRet0:Ja,dynCall_ii:gb,dynCall_iiii:hb,dynCall_vi:ib}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _kiss_fftr=Module["_kiss_fftr"]=asm["_kiss_fftr"];var _free=Module["_free"]=asm["_free"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var _kiss_fftr_alloc=Module["_kiss_fftr_alloc"]=asm["_kiss_fftr_alloc"];var _kiss_fftr_free=Module["_kiss_fftr_free"]=asm["_kiss_fftr_free"];var _kiss_fftri=Module["_kiss_fftri"]=asm["_kiss_fftri"];var _kiss_fft_alloc=Module["_kiss_fft_alloc"]=asm["_kiss_fft_alloc"];var _memset=Module["_memset"]=asm["_memset"];var _malloc=Module["_malloc"]=asm["_malloc"];var _kiss_fft=Module["_kiss_fft"]=asm["_kiss_fft"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var _kiss_fft_free=Module["_kiss_fft_free"]=asm["_kiss_fft_free"];var dynCall_ii=Module["dynCall_ii"]=asm["dynCall_ii"];var dynCall_iiii=Module["dynCall_iiii"]=asm["dynCall_iiii"];var dynCall_vi=Module["dynCall_vi"]=asm["dynCall_vi"];Runtime.stackAlloc=asm["stackAlloc"];Runtime.stackSave=asm["stackSave"];Runtime.stackRestore=asm["stackRestore"];Runtime.establishStackSpace=asm["establishStackSpace"];Runtime.setTempRet0=asm["setTempRet0"];Runtime.getTempRet0=asm["getTempRet0"];function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){assert(runDependencies==0,"cannot call main when async dependencies remain! (listen on __ATMAIN__)");assert(__ATPRERUN__.length==0,"cannot call main when preRun functions remain to be called");args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["stdout"]["once"]("drain",(function(){process["exit"](status)}));console.log(" ");setTimeout((function(){process["exit"](status)}),500)}else if(ENVIRONMENT_IS_SHELL&&typeof quit==="function"){quit(status)}throw new ExitStatus(status)}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()


  return Module;
};

module.exports = KissFFTModule;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38), "/"))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var KissFFTModule = __webpack_require__(50);


var kissFFTModule = KissFFTModule({});

var kiss_fftr_alloc = kissFFTModule.cwrap(
    'kiss_fftr_alloc', 'number', ['number', 'number', 'number', 'number' ]
);

var kiss_fftr = kissFFTModule.cwrap(
    'kiss_fftr', 'void', ['number', 'number', 'number' ]
);

var kiss_fftri = kissFFTModule.cwrap(
    'kiss_fftri', 'void', ['number', 'number', 'number' ]
);

var kiss_fftr_free = kissFFTModule.cwrap(
    'kiss_fftr_free', 'void', ['number']
);

var kiss_fft_alloc = kissFFTModule.cwrap(
    'kiss_fft_alloc', 'number', ['number', 'number', 'number', 'number' ]
);

var kiss_fft = kissFFTModule.cwrap(
    'kiss_fft', 'void', ['number', 'number', 'number' ]
);

var kiss_fft_free = kissFFTModule.cwrap(
    'kiss_fft_free', 'void', ['number']
);

var FFT = function (size) {

    this.size = size;
    this.fcfg = kiss_fft_alloc(size, false);
    this.icfg = kiss_fft_alloc(size, true);
    
    this.inptr = kissFFTModule._malloc(size*8 + size*8);
    this.outptr = this.inptr + size*8;
    
    this.cin = new Float32Array(kissFFTModule.HEAPU8.buffer, this.inptr, size*2);
    this.cout = new Float32Array(kissFFTModule.HEAPU8.buffer, this.outptr, size*2);
    
    this.forward = function(cin) {
	this.cin.set(cin);
	kiss_fft(this.fcfg, this.inptr, this.outptr);
	return new Float32Array(kissFFTModule.HEAPU8.buffer,
				this.outptr, this.size * 2);
    };
    
    this.inverse = function(cin) {
	this.cin.set(cpx);
	kiss_fft(this.icfg, this.inptr, this.outptr);
	return new Float32Array(kissFFTModule.HEAPU8.buffer,
				this.outptr, this.size * 2);
    };
    
    this.dispose = function() {
	kissFFTModule._free(this.inptr);
	kiss_fft_free(this.fcfg);
	kiss_fft_free(this.icfg);
    }
};

var FFTR = function (size) {

    this.size = size;
    this.fcfg = kiss_fftr_alloc(size, false);
    this.icfg = kiss_fftr_alloc(size, true);
    
    this.rptr = kissFFTModule._malloc(size*4 + (size+2)*4);
    this.cptr = this.rptr + size*4;
    
    this.ri = new Float32Array(kissFFTModule.HEAPU8.buffer, this.rptr, size);
    this.ci = new Float32Array(kissFFTModule.HEAPU8.buffer, this.cptr, size+2);
    
    this.forward = function(real) {
	this.ri.set(real);
	kiss_fftr(this.fcfg, this.rptr, this.cptr);
	return new Float32Array(kissFFTModule.HEAPU8.buffer,
				this.cptr, this.size + 2);
    };
    
    this.inverse = function(cpx) {
	this.ci.set(cpx);
	kiss_fftri(this.icfg, this.cptr, this.rptr);
	return new Float32Array(kissFFTModule.HEAPU8.buffer,
				this.rptr, this.size);
    };
    
    this.dispose = function() {
	kissFFTModule._free(this.rptr);
	kiss_fftr_free(this.fcfg);
	kiss_fftr_free(this.icfg);
    }
};

module.exports = {
    FFT: FFT,
    FFTR: FFTR
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var MANIFEST_FILE = 'manifest.json';
var CheckpointLoader = (function () {
    function CheckpointLoader(urlPath) {
        this.urlPath = urlPath;
        if (this.urlPath.charAt(this.urlPath.length - 1) !== '/') {
            this.urlPath += '/';
        }
    }
    CheckpointLoader.prototype.loadManifest = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', _this.urlPath + MANIFEST_FILE);
            xhr.onload = function () {
                _this.checkpointManifest = JSON.parse(xhr.responseText);
                resolve();
            };
            xhr.onerror = function (error) {
                throw new Error(MANIFEST_FILE + " not found at " + _this.urlPath + ". " + error);
            };
            xhr.send();
        });
    };
    CheckpointLoader.prototype.getCheckpointManifest = function () {
        var _this = this;
        if (this.checkpointManifest == null) {
            return new Promise(function (resolve, reject) {
                _this.loadManifest().then(function () {
                    resolve(_this.checkpointManifest);
                });
            });
        }
        return new Promise(function (resolve, reject) {
            resolve(_this.checkpointManifest);
        });
    };
    CheckpointLoader.prototype.getAllVariables = function () {
        var _this = this;
        if (this.variables != null) {
            return new Promise(function (resolve, reject) {
                resolve(_this.variables);
            });
        }
        return new Promise(function (resolve, reject) {
            _this.getCheckpointManifest().then(function (checkpointDefinition) {
                var variableNames = Object.keys(_this.checkpointManifest);
                var variablePromises = [];
                for (var i = 0; i < variableNames.length; i++) {
                    variablePromises.push(_this.getVariable(variableNames[i]));
                }
                Promise.all(variablePromises).then(function (variables) {
                    _this.variables = {};
                    for (var i = 0; i < variables.length; i++) {
                        _this.variables[variableNames[i]] = variables[i];
                    }
                    resolve(_this.variables);
                });
            });
        });
    };
    CheckpointLoader.prototype.getVariable = function (varName) {
        var _this = this;
        if (!(varName in this.checkpointManifest)) {
            throw new Error('Cannot load non-existant variable ' + varName);
        }
        var variableRequestPromiseMethod = function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            var fname = _this.checkpointManifest[varName].filename;
            xhr.open('GET', _this.urlPath + fname);
            xhr.onload = function () {
                var values = new Float32Array(xhr.response);
                var ndarray = ndarray_1.NDArray.make(_this.checkpointManifest[varName].shape, { values: values });
                resolve(ndarray);
            };
            xhr.onerror = function (error) {
                throw new Error("Could not fetch variable " + varName + ": " + error);
            };
            xhr.send();
        };
        if (this.checkpointManifest == null) {
            return new Promise(function (resolve, reject) {
                _this.loadManifest().then(function () {
                    new Promise(variableRequestPromiseMethod).then(resolve);
                });
            });
        }
        return new Promise(variableRequestPromiseMethod);
    };
    return CheckpointLoader;
}());
exports.CheckpointLoader = CheckpointLoader;
//# sourceMappingURL=checkpoint_loader.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var InMemoryShuffledInputProviderBuilder = (function () {
    function InMemoryShuffledInputProviderBuilder(inputs) {
        this.inputs = inputs;
        this.idx = 0;
        this.inputCounter = 0;
        this.epoch = 0;
        this.shuffledIndices = util.createShuffledIndices(inputs[0].length);
        this.numInputs = inputs.length;
        var numExamples = this.inputs[0].length;
        for (var i = 0; i < this.numInputs; i++) {
            util.assert(this.inputs[i].length === numExamples, 'Number of examples must match across different inputs.');
        }
        for (var i = 0; i < this.numInputs; i++) {
            var inputShape = this.inputs[i][0].shape;
            for (var j = 0; j < this.inputs[i].length; j++) {
                util.assertShapesMatch(inputShape, this.inputs[i][j].shape);
            }
        }
    }
    InMemoryShuffledInputProviderBuilder.prototype.getCurrentExampleIndex = function () {
        var returnIdx = this.idx;
        this.inputCounter++;
        if (this.inputCounter >= this.numInputs) {
            this.idx++;
            this.inputCounter = 0;
            if (this.idx >= this.inputs[0].length) {
                this.idx = 0;
                this.epoch++;
            }
        }
        return returnIdx;
    };
    InMemoryShuffledInputProviderBuilder.prototype.getNextInput = function (inputId) {
        var currentExampleIndex = this.getCurrentExampleIndex();
        return this.inputs[inputId][this.shuffledIndices[currentExampleIndex]];
    };
    InMemoryShuffledInputProviderBuilder.prototype.getEpoch = function () {
        return this.epoch;
    };
    InMemoryShuffledInputProviderBuilder.prototype.getInputProviders = function () {
        var inputProviders = [];
        for (var i = 0; i < this.numInputs; i++) {
            inputProviders.push(this.getInputProvider(i));
        }
        return inputProviders;
    };
    return InMemoryShuffledInputProviderBuilder;
}());
exports.InMemoryShuffledInputProviderBuilder = InMemoryShuffledInputProviderBuilder;
var InCPUMemoryShuffledInputProviderBuilder = (function (_super) {
    __extends(InCPUMemoryShuffledInputProviderBuilder, _super);
    function InCPUMemoryShuffledInputProviderBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InCPUMemoryShuffledInputProviderBuilder.prototype.getInputProvider = function (inputId) {
        var shuffledInputProvider = this;
        return {
            getNextCopy: function (math) {
                return ndarray_1.NDArray.like(shuffledInputProvider.getNextInput(inputId));
            },
            disposeCopy: function (math, copy) {
                copy.dispose();
            }
        };
    };
    return InCPUMemoryShuffledInputProviderBuilder;
}(InMemoryShuffledInputProviderBuilder));
exports.InCPUMemoryShuffledInputProviderBuilder = InCPUMemoryShuffledInputProviderBuilder;
var InGPUMemoryShuffledInputProviderBuilder = (function (_super) {
    __extends(InGPUMemoryShuffledInputProviderBuilder, _super);
    function InGPUMemoryShuffledInputProviderBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InGPUMemoryShuffledInputProviderBuilder.prototype.getInputProvider = function (inputId) {
        var shuffledInputProvider = this;
        return {
            getNextCopy: function (math) {
                return math.clone(shuffledInputProvider.getNextInput(inputId));
            },
            disposeCopy: function (math, copy) {
                copy.dispose();
            }
        };
    };
    return InGPUMemoryShuffledInputProviderBuilder;
}(InMemoryShuffledInputProviderBuilder));
exports.InGPUMemoryShuffledInputProviderBuilder = InGPUMemoryShuffledInputProviderBuilder;
//# sourceMappingURL=input_provider.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isMobile() {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
        .test(a) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
            .test(a.substr(0, 4));
}
exports.isMobile = isMobile;
//# sourceMappingURL=device_util.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = __webpack_require__(13);
var graph_util = __webpack_require__(3);
var add_1 = __webpack_require__(56);
var argmax_1 = __webpack_require__(57);
var argmaxequals_1 = __webpack_require__(58);
var concat3d_1 = __webpack_require__(59);
var convolution_1 = __webpack_require__(60);
var divide_1 = __webpack_require__(61);
var element_wise_activation_1 = __webpack_require__(62);
var element_wise_cost_1 = __webpack_require__(63);
var exp_1 = __webpack_require__(64);
var linear_combination_1 = __webpack_require__(65);
var log_1 = __webpack_require__(66);
var matmul_1 = __webpack_require__(67);
var max_pool_1 = __webpack_require__(68);
var multiply_1 = __webpack_require__(69);
var reduce_sum_1 = __webpack_require__(70);
var reshape_1 = __webpack_require__(71);
var softmax_1 = __webpack_require__(72);
var subtract_1 = __webpack_require__(73);
function emitFromGraphNodes(nodes) {
    var ops = [];
    nodes.forEach(function (node) { return Array.prototype.push.apply(ops, emitOpFromNode(node)); });
    return ops;
}
exports.emitFromGraphNodes = emitFromGraphNodes;
function emitOpFromNode(node) {
    if (node instanceof graph_1.ReshapeNode) {
        return [new reshape_1.Reshape(node.inputs[graph_1.ReshapeNode.X], node.output)];
    }
    else if (node instanceof graph_1.MatMulNode) {
        var x1 = node.inputs[graph_1.MatMulNode.X1];
        var x2 = node.inputs[graph_1.MatMulNode.X2];
        return [new matmul_1.MatMul(x1, x2, node.output)];
    }
    else if (node instanceof graph_1.Convolution2DNode) {
        var w = node.inputs[graph_1.Convolution2DNode.W];
        var x = node.inputs[graph_1.Convolution2DNode.X];
        var b = node.inputs[graph_1.Convolution2DNode.B];
        return [new convolution_1.Convolution2D(w, x, b, node.output, node.fieldSize, node.outputDepth, node.stride, node.zeroPad)];
    }
    else if (node instanceof graph_1.MaxPoolNode) {
        var x = node.inputs[graph_1.MaxPoolNode.X];
        return [new max_pool_1.MaxPool(x, node.output, node.fieldSize, node.stride, node.zeroPad)];
    }
    else if (node instanceof graph_1.ExpNode) {
        return [new exp_1.Exp(node.inputs[graph_1.ExpNode.X], node.output)];
    }
    else if (node instanceof graph_1.LogNode) {
        return [new log_1.Log(node.inputs[graph_1.LogNode.X], node.output)];
    }
    else if (node instanceof graph_1.ReLUNode) {
        return [new element_wise_activation_1.ReLU(node.inputs[graph_1.ReLUNode.X], node.output)];
    }
    else if (node instanceof graph_1.LeakyReLUNode) {
        return [new element_wise_activation_1.LeakyReLU(node.inputs[graph_1.LeakyReLUNode.X], node.output, node.alpha)];
    }
    else if (node instanceof graph_1.TanHNode) {
        return [new element_wise_activation_1.TanH(node.inputs[graph_1.TanHNode.X], node.output)];
    }
    else if (node instanceof graph_1.SigmoidNode) {
        return [new element_wise_activation_1.Sigmoid(node.inputs[graph_1.SigmoidNode.X], node.output)];
    }
    else if (node instanceof graph_1.SoftmaxCrossEntropyCostNode) {
        var x = node.inputs[graph_1.SoftmaxCrossEntropyCostNode.X];
        var target = node.inputs[graph_1.SoftmaxCrossEntropyCostNode.TARGET];
        return [new softmax_1.SoftmaxCrossEntropyCost(x, target, node.output)];
    }
    else if (node instanceof graph_1.SoftmaxNode) {
        return [new softmax_1.Softmax(node.inputs[graph_1.SoftmaxNode.X], node.output)];
    }
    else if (node instanceof graph_1.MeanSquaredCostNode) {
        var label = node.inputs[graph_1.MeanSquaredCostNode.LABEL];
        var prediction = node.inputs[graph_1.MeanSquaredCostNode.PREDICTION];
        return [new element_wise_cost_1.MeanSquaredCost(label, prediction, node.output)];
    }
    else if (node instanceof graph_1.ArgMaxEqualsNode) {
        return [new argmaxequals_1.ArgMaxEquals(node.inputs[graph_1.ArgMaxEqualsNode.X1], node.inputs[graph_1.ArgMaxEqualsNode.X2], node.output)];
    }
    else if (node instanceof graph_1.ArgMaxNode) {
        return [new argmax_1.ArgMax(node.x, node.output)];
    }
    else if (node instanceof graph_1.FusedLinearCombinationNode) {
        return [new linear_combination_1.LinearCombination(node.inputs[graph_1.FusedLinearCombinationNode.T1], node.inputs[graph_1.FusedLinearCombinationNode.T2], node.inputs[graph_1.FusedLinearCombinationNode.C1], node.inputs[graph_1.FusedLinearCombinationNode.C2], node.output)];
    }
    else if (node instanceof graph_1.Concat3DNode) {
        return [new concat3d_1.Concat3D(node.inputs[graph_1.Concat3DNode.X1], node.inputs[graph_1.Concat3DNode.X2], node.axis, node.output)];
    }
    else if (node instanceof graph_1.SquareNode) {
        return [new element_wise_activation_1.Square(node.inputs[graph_1.SquareNode.X], node.output)];
    }
    else if (node instanceof graph_1.AddNode) {
        return [new add_1.Add(node.inputs[graph_1.AddNode.T1], node.inputs[graph_1.AddNode.T2], node.output)];
    }
    else if (node instanceof graph_1.SubtractNode) {
        return [new subtract_1.Subtract(node.inputs[graph_1.SubtractNode.T1], node.inputs[graph_1.SubtractNode.T2], node.output)];
    }
    else if (node instanceof graph_1.MultiplyNode) {
        return [new multiply_1.Multiply(node.inputs[graph_1.MultiplyNode.T1], node.inputs[graph_1.MultiplyNode.T2], node.output)];
    }
    else if (node instanceof graph_1.DivideNode) {
        return [new divide_1.Divide(node.inputs[graph_1.DivideNode.T1], node.inputs[graph_1.DivideNode.T2], node.output)];
    }
    else if (node instanceof graph_1.ReduceSumNode) {
        return [new reduce_sum_1.ReduceSum(node.inputs[graph_1.ReduceSumNode.X], node.output)];
    }
    else if (graph_util.isInputNode(node)) {
        return [];
    }
    else {
        throw Error("Unsupported node type: " + node.constructor.name);
    }
}
//# sourceMappingURL=operation_emitter.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var Add = (function (_super) {
    __extends(Add, _super);
    function Add(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        util.assert(util.sizeFromShape(x1Tensor.shape) === 1 ||
            util.sizeFromShape(x2Tensor.shape) === 1 ||
            util.arraysEqual(x1Tensor.shape, x2Tensor.shape), 'One of t1 or t2 must be a scalar, or t1 and t2 must have ' +
            'the same shape');
        return _this;
    }
    Add.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var result;
            if (util.isScalarShape(x1.shape)) {
                result = math.scalarPlusArray(x1, x2);
            }
            else if (util.isScalarShape(x2.shape)) {
                result = math.scalarPlusArray(x2, x1);
            }
            else {
                result = math.add(x1, x2);
            }
            inferenceArrays.set(_this.yTensor, keep(result));
        });
    };
    Add.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                if (util.isScalarShape(_this.x1Tensor.shape)) {
                    var sum = math.sum(dy);
                    if (_this.dySizeScalar == null) {
                        _this.dySizeScalar = ndarray_1.Scalar.new(dy.size);
                    }
                    gradientArrays.add(_this.x1Tensor, math.divide(sum, _this.dySizeScalar));
                }
                else {
                    gradientArrays.add(_this.x1Tensor, math.clone(dy));
                }
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                if (util.isScalarShape(_this.x2Tensor.shape)) {
                    var sum = math.sum(dy);
                    if (_this.dySizeScalar == null) {
                        _this.dySizeScalar = ndarray_1.Scalar.new(dy.size);
                    }
                    gradientArrays.add(_this.x2Tensor, math.divide(sum, _this.dySizeScalar));
                }
                else {
                    gradientArrays.add(_this.x2Tensor, math.clone(dy));
                }
            }
        });
    };
    Add.prototype.dispose = function () {
        if (this.dySizeScalar != null) {
            this.dySizeScalar.dispose();
        }
    };
    return Add;
}(op_1.Operation));
exports.Add = Add;
//# sourceMappingURL=add.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var op_1 = __webpack_require__(2);
var ArgMax = (function (_super) {
    __extends(ArgMax, _super);
    function ArgMax(xTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        return _this;
    }
    ArgMax.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.argMax(x)));
        });
    };
    ArgMax.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        throw new Error('ArgMax backprop unimplemented');
    };
    return ArgMax;
}(op_1.Operation));
exports.ArgMax = ArgMax;
//# sourceMappingURL=argmax.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var op_1 = __webpack_require__(2);
var ArgMaxEquals = (function (_super) {
    __extends(ArgMaxEquals, _super);
    function ArgMaxEquals(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        return _this;
    }
    ArgMaxEquals.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.argMaxEquals(x1, x2)));
        });
    };
    ArgMaxEquals.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        throw new Error('ArgMaxEquals backprop unimplemented');
    };
    return ArgMaxEquals;
}(op_1.Operation));
exports.ArgMaxEquals = ArgMaxEquals;
//# sourceMappingURL=argmaxequals.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var concat_util = __webpack_require__(14);
var op_1 = __webpack_require__(2);
var Concat3D = (function (_super) {
    __extends(Concat3D, _super);
    function Concat3D(x1Tensor, x2Tensor, axis, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.axis = axis;
        _this.yTensor = yTensor;
        concat_util.assertParams(x1Tensor.shape, x2Tensor.shape, axis);
        return _this;
    }
    Concat3D.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var concatResult = math.concat3D(x1, x2, _this.axis);
            inferenceArrays.set(_this.yTensor, keep(concatResult));
        });
    };
    Concat3D.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        throw new Error('Concat3D backprop not implemented.');
    };
    return Concat3D;
}(op_1.Operation));
exports.Concat3D = Concat3D;
//# sourceMappingURL=concat3d.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var conv_util = __webpack_require__(8);
var util = __webpack_require__(0);
var op_1 = __webpack_require__(2);
var Convolution2D = (function (_super) {
    __extends(Convolution2D, _super);
    function Convolution2D(wTensor, xTensor, bTensor, yTensor, fieldSize, outputDepth, stride, zeroPad) {
        if (stride === void 0) { stride = 1; }
        var _this = _super.call(this) || this;
        _this.wTensor = wTensor;
        _this.xTensor = xTensor;
        _this.bTensor = bTensor;
        _this.yTensor = yTensor;
        _this.fieldSize = fieldSize;
        _this.outputDepth = outputDepth;
        _this.stride = stride;
        _this.assertWeightsShape(wTensor.shape);
        _this.zeroPad = zeroPad != null ?
            zeroPad :
            conv_util.computeDefaultPad(_this.xTensor.shape, _this.fieldSize, _this.stride);
        util.assert(util.isInt(_this.zeroPad), "The zero padding (" + _this.zeroPad + ") must be an integer. Change the " +
            "stride and/or zero pad parameters");
        return _this;
    }
    Convolution2D.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var weights = inferenceArrays.get(this.wTensor);
        var biases = inferenceArrays.get(this.bTensor);
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.conv2d(x, weights, biases, _this.stride, _this.zeroPad)));
        });
    };
    Convolution2D.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var weights = inferenceArrays.get(this.wTensor);
        var x = inferenceArrays.get(this.xTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            var _a = math.conv2dBackProp(x, dy, weights, _this.stride, _this.zeroPad), dw = _a.dw, db = _a.db, dx = _a.dx;
            gradientArrays.add(_this.wTensor, dw);
            gradientArrays.add(_this.bTensor, db);
            gradientArrays.add(_this.xTensor, dx);
        });
    };
    Convolution2D.prototype.assertWeightsShape = function (weightsShape) {
        util.assert(weightsShape[0] === this.fieldSize &&
            weightsShape[1] === this.fieldSize &&
            weightsShape[2] === this.xTensor.shape[2] &&
            weightsShape[3] === this.outputDepth, "weights must be of shape [" + this.fieldSize + "," + this.fieldSize + "," +
            (this.xTensor.shape[2] + "," + this.outputDepth + "] but they are of") +
            ("shape [" + weightsShape + "]"));
    };
    return Convolution2D;
}(op_1.Operation));
exports.Convolution2D = Convolution2D;
//# sourceMappingURL=convolution.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var Divide = (function (_super) {
    __extends(Divide, _super);
    function Divide(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        util.assert(util.sizeFromShape(x1Tensor.shape) === 1 ||
            util.sizeFromShape(x2Tensor.shape) === 1 ||
            util.arraysEqual(x1Tensor.shape, x2Tensor.shape), 'One of t1 or t2 must be a scalar, or t1 and t2 must have ' +
            'the same shape');
        return _this;
    }
    Divide.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var t1 = inferenceArrays.get(this.x1Tensor);
        var t2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var result;
            if (util.isScalarShape(t1.shape)) {
                result = math.scalarDividedByArray(t1, t2);
            }
            else if (util.isScalarShape(t2.shape)) {
                result = math.arrayDividedByScalar(t1, t2);
            }
            else {
                result = math.divide(t1, t2);
            }
            inferenceArrays.set(_this.yTensor, keep(result));
        });
    };
    Divide.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var dy = gradientArrays.get(this.yTensor);
        var x1IsScalar = util.isScalarShape(x1.shape);
        var x2IsScalar = util.isScalarShape(x2.shape);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                if (x1IsScalar) {
                    var div = math.divide(dy, x2);
                    gradientArrays.add(_this.x1Tensor, math.sum(div));
                    div.dispose();
                }
                else if (x2IsScalar) {
                    gradientArrays.add(_this.x1Tensor, math.arrayDividedByScalar(dy, x2));
                }
                else {
                    gradientArrays.add(_this.x1Tensor, math.divide(dy, x2));
                }
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                var x2Squared = math.elementWiseMul(x2, x2);
                var x1OverX2Squared = void 0;
                if (x2IsScalar) {
                    x1OverX2Squared = math.arrayDividedByScalar(x1, x2Squared);
                }
                else if (x1IsScalar) {
                    x1OverX2Squared = math.scalarDividedByArray(x1, x2Squared);
                }
                else {
                    x1OverX2Squared = math.divide(x1, x2Squared);
                }
                var dx2 = math.neg(x1OverX2Squared);
                var dyTimesDerivative = math.elementWiseMul(dy, dx2);
                if (x2IsScalar) {
                    gradientArrays.add(_this.x2Tensor, math.sum(dyTimesDerivative));
                }
                else {
                    gradientArrays.add(_this.x2Tensor, dyTimesDerivative);
                }
            }
        });
    };
    return Divide;
}(op_1.Operation));
exports.Divide = Divide;
//# sourceMappingURL=divide.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var activation_functions_1 = __webpack_require__(81);
var op_1 = __webpack_require__(2);
var ElementWiseActivation = (function (_super) {
    __extends(ElementWiseActivation, _super);
    function ElementWiseActivation(xTensor, yTensor, func) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        _this.func = func;
        return _this;
    }
    ElementWiseActivation.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(_this.func.output(math, x)));
        });
    };
    ElementWiseActivation.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var y = inferenceArrays.get(this.yTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            var dydx = _this.func.der(math, x, y);
            gradientArrays.add(_this.xTensor, math.elementWiseMul(dy, dydx));
            dydx.dispose();
        });
    };
    ElementWiseActivation.prototype.dispose = function () {
        this.func.dispose();
    };
    return ElementWiseActivation;
}(op_1.Operation));
exports.ElementWiseActivation = ElementWiseActivation;
var ReLU = (function (_super) {
    __extends(ReLU, _super);
    function ReLU(xTensor, yTensor) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.ReLUFunc()) || this;
    }
    return ReLU;
}(ElementWiseActivation));
exports.ReLU = ReLU;
var LeakyReLU = (function (_super) {
    __extends(LeakyReLU, _super);
    function LeakyReLU(xTensor, yTensor, alpha) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.LeakyReluFunc(alpha)) || this;
    }
    return LeakyReLU;
}(ElementWiseActivation));
exports.LeakyReLU = LeakyReLU;
var TanH = (function (_super) {
    __extends(TanH, _super);
    function TanH(xTensor, yTensor) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.TanHFunc()) || this;
    }
    return TanH;
}(ElementWiseActivation));
exports.TanH = TanH;
var Sigmoid = (function (_super) {
    __extends(Sigmoid, _super);
    function Sigmoid(xTensor, yTensor) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.SigmoidFunc()) || this;
    }
    return Sigmoid;
}(ElementWiseActivation));
exports.Sigmoid = Sigmoid;
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(xTensor, yTensor) {
        return _super.call(this, xTensor, yTensor, new activation_functions_1.SquareFunc()) || this;
    }
    return Square;
}(ElementWiseActivation));
exports.Square = Square;
//# sourceMappingURL=element_wise_activation.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var cost_functions_1 = __webpack_require__(82);
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var ElementWiseCost = (function (_super) {
    __extends(ElementWiseCost, _super);
    function ElementWiseCost(x1Tensor, x2Tensor, yTensor, func) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        _this.func = func;
        _this.oneOverNScalar = ndarray_1.Scalar.new(1 / util.sizeFromShape(x1Tensor.shape));
        return _this;
    }
    ElementWiseCost.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var elementWiseCost = _this.func.cost(math, x1, x2);
            var sum = math.sum(elementWiseCost);
            var result = math.scalarTimesArray(_this.oneOverNScalar, sum);
            inferenceArrays.set(_this.yTensor, keep(result));
        });
    };
    ElementWiseCost.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                gradientArrays.add(_this.x1Tensor, _this.func.der(math, x1, x2));
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                gradientArrays.add(_this.x2Tensor, _this.func.der(math, x2, x1));
            }
        });
    };
    ElementWiseCost.prototype.dispose = function () {
        this.func.dispose();
        this.oneOverNScalar.dispose();
    };
    return ElementWiseCost;
}(op_1.Operation));
exports.ElementWiseCost = ElementWiseCost;
var MeanSquaredCost = (function (_super) {
    __extends(MeanSquaredCost, _super);
    function MeanSquaredCost(x1Tensor, x2Tensor, yTensor) {
        return _super.call(this, x1Tensor, x2Tensor, yTensor, new cost_functions_1.SquareCostFunc()) || this;
    }
    return MeanSquaredCost;
}(ElementWiseCost));
exports.MeanSquaredCost = MeanSquaredCost;
//# sourceMappingURL=element_wise_cost.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var Exp = (function (_super) {
    __extends(Exp, _super);
    function Exp(xTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        return _this;
    }
    Exp.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.exp(x)));
        });
    };
    Exp.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var y = inferenceArrays.get(this.yTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.xTensor)) {
                gradientArrays.add(_this.xTensor, math.elementWiseMul(y, dy));
            }
        });
    };
    return Exp;
}(op_1.Operation));
exports.Exp = Exp;
//# sourceMappingURL=exp.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var LinearCombination = (function (_super) {
    __extends(LinearCombination, _super);
    function LinearCombination(x1Tensor, x2Tensor, c1Tensor, c2Tensor, outTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.c1Tensor = c1Tensor;
        _this.c2Tensor = c2Tensor;
        _this.outTensor = outTensor;
        return _this;
    }
    LinearCombination.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var c1 = inferenceArrays.get(this.c1Tensor).asScalar();
        var c2 = inferenceArrays.get(this.c2Tensor).asScalar();
        math.scope(function (keep) {
            inferenceArrays.set(_this.outTensor, keep(math.scaledArrayAdd(c1, x1, c2, x2)));
        });
    };
    LinearCombination.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var c1 = inferenceArrays.get(this.c1Tensor);
        var c2 = inferenceArrays.get(this.c2Tensor);
        var dy = gradientArrays.get(this.outTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                gradientArrays.add(_this.x1Tensor, math.scalarTimesArray(c1, dy));
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                gradientArrays.add(_this.x2Tensor, math.scalarTimesArray(c2, dy));
            }
            if (graph_util.shouldBackProp(_this.c1Tensor)) {
                var dotProduct1 = math.elementWiseMul(x1, dy);
                gradientArrays.add(_this.c1Tensor, math.sum(dotProduct1));
            }
            if (graph_util.shouldBackProp(_this.c2Tensor)) {
                var dotProduct2 = math.elementWiseMul(x2, dy);
                gradientArrays.add(_this.c2Tensor, math.sum(dotProduct2));
            }
        });
    };
    return LinearCombination;
}(op_1.Operation));
exports.LinearCombination = LinearCombination;
//# sourceMappingURL=linear_combination.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var Log = (function (_super) {
    __extends(Log, _super);
    function Log(xTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        return _this;
    }
    Log.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.log(x)));
        });
    };
    Log.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.xTensor)) {
                gradientArrays.add(_this.xTensor, math.divide(dy, x));
            }
        });
    };
    return Log;
}(op_1.Operation));
exports.Log = Log;
//# sourceMappingURL=log.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = __webpack_require__(15);
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var MatMul = (function (_super) {
    __extends(MatMul, _super);
    function MatMul(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        return _this;
    }
    MatMul.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            if (x1.shape.length === 2 && x2.shape.length === 2) {
                inferenceArrays.set(_this.yTensor, keep(math.matMul(x1, x2)));
            }
            else if (x1.shape.length === 2 && x2.shape.length === 1) {
                inferenceArrays.set(_this.yTensor, keep(math.matrixTimesVector(x1, x2)));
            }
            else if (x1.shape.length === 1 && x2.shape.length === 2) {
                inferenceArrays.set(_this.yTensor, keep(math.vectorTimesMatrix(x1, x2)));
            }
        });
    };
    MatMul.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var dy = gradientArrays.get(this.yTensor);
        if (x1.shape.length === 1) {
            x1 = x1.reshape([1, x1.size]);
            dy = dy.reshape([1, dy.size]);
        }
        if (x2.shape.length === 1) {
            x2 = x2.reshape([x2.size, 1]);
            dy = dy.reshape([dy.size, 1]);
        }
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                var dx1 = math.matMul(dy, x2, math_1.MatrixOrientation.REGULAR, math_1.MatrixOrientation.TRANSPOSED);
                gradientArrays.add(_this.x1Tensor, _this.x1Tensor.shape.length === 1 ? dx1.as1D() : dx1);
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                var dx2 = math.matMul(x1, dy, math_1.MatrixOrientation.TRANSPOSED, math_1.MatrixOrientation.REGULAR);
                gradientArrays.add(_this.x2Tensor, _this.x2Tensor.shape.length === 1 ? dx2.as1D() : dx2);
            }
        });
    };
    return MatMul;
}(op_1.Operation));
exports.MatMul = MatMul;
//# sourceMappingURL=matmul.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var conv_util = __webpack_require__(8);
var util = __webpack_require__(0);
var op_1 = __webpack_require__(2);
var MaxPool = (function (_super) {
    __extends(MaxPool, _super);
    function MaxPool(xTensor, yTensor, fieldSize, stride, pad) {
        if (stride === void 0) { stride = 1; }
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        _this.fieldSize = fieldSize;
        _this.stride = stride;
        if (pad != null) {
            _this.pad = pad;
        }
        else {
            _this.pad = conv_util.computeDefaultPad(xTensor.shape, _this.fieldSize, _this.stride);
        }
        util.assert(util.isInt(_this.pad), "The zero padding (" + _this.pad + ") must be an integer. Change the " +
            "stride and/or zero pad parameters");
        return _this;
    }
    MaxPool.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(math.maxPool(x, _this.fieldSize, _this.stride, _this.pad)));
        });
    };
    MaxPool.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            gradientArrays.add(_this.xTensor, math.maxPoolBackprop(dy, x, _this.fieldSize, _this.stride, _this.pad));
        });
    };
    return MaxPool;
}(op_1.Operation));
exports.MaxPool = MaxPool;
//# sourceMappingURL=max_pool.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var Multiply = (function (_super) {
    __extends(Multiply, _super);
    function Multiply(x1Tensor, x2Tensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.x1Tensor = x1Tensor;
        _this.x2Tensor = x2Tensor;
        _this.yTensor = yTensor;
        util.assert(util.sizeFromShape(x1Tensor.shape) === 1 ||
            util.sizeFromShape(x2Tensor.shape) === 1 ||
            util.arraysEqual(x1Tensor.shape, x2Tensor.shape), 'One of t1 or t2 must be a scalar, or t1 and t2 must have ' +
            'the same shape');
        return _this;
    }
    Multiply.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var t1 = inferenceArrays.get(this.x1Tensor);
        var t2 = inferenceArrays.get(this.x2Tensor);
        math.scope(function (keep) {
            var result;
            if (util.isScalarShape(t1.shape)) {
                result = math.scalarTimesArray(t1, t2);
            }
            else if (util.isScalarShape(t2.shape)) {
                result = math.scalarTimesArray(t2, t1);
            }
            else {
                result = math.elementWiseMul(t1, t2);
            }
            inferenceArrays.set(_this.yTensor, keep(result));
        });
    };
    Multiply.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var x1 = inferenceArrays.get(this.x1Tensor);
        var x2 = inferenceArrays.get(this.x2Tensor);
        var dy = gradientArrays.get(this.yTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.x1Tensor)) {
                if (util.isScalarShape(_this.x1Tensor.shape)) {
                    var mul = math.elementWiseMul(dy, x2);
                    gradientArrays.add(_this.x1Tensor, math.sum(mul));
                }
                else if (util.isScalarShape(x2.shape)) {
                    gradientArrays.add(_this.x1Tensor, math.scalarTimesArray(x2, dy));
                }
                else {
                    gradientArrays.add(_this.x1Tensor, math.elementWiseMul(x2, dy));
                }
            }
            if (graph_util.shouldBackProp(_this.x2Tensor)) {
                if (util.isScalarShape(_this.x2Tensor.shape)) {
                    var mul = math.elementWiseMul(dy, x1);
                    gradientArrays.add(_this.x2Tensor, math.sum(mul));
                }
                else if (util.isScalarShape(x1.shape)) {
                    gradientArrays.add(_this.x2Tensor, math.scalarTimesArray(x1, dy));
                }
                else {
                    gradientArrays.add(_this.x2Tensor, math.elementWiseMul(x1, dy));
                }
            }
        });
    };
    return Multiply;
}(op_1.Operation));
exports.Multiply = Multiply;
//# sourceMappingURL=multiply.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var ReduceSum = (function (_super) {
    __extends(ReduceSum, _super);
    function ReduceSum(x, outTensor) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.outTensor = outTensor;
        util.assertShapesMatch(outTensor.shape, []);
        return _this;
    }
    ReduceSum.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.x);
        math.scope(function (keep) {
            inferenceArrays.set(_this.outTensor, keep(math.sum(x)));
        });
    };
    ReduceSum.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        if (!graph_util.shouldBackProp(this.x)) {
            return;
        }
        math.scope(function () {
            var dy = gradientArrays.get(_this.outTensor);
            if (_this.ones == null) {
                var xArray = inferenceArrays.get(_this.x);
                _this.ones = ndarray_1.NDArray.zerosLike(xArray);
                _this.ones.fill(1);
            }
            gradientArrays.add(_this.x, math.scalarTimesArray(dy, _this.ones));
        });
    };
    return ReduceSum;
}(op_1.Operation));
exports.ReduceSum = ReduceSum;
//# sourceMappingURL=reduce_sum.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
var op_1 = __webpack_require__(2);
var Reshape = (function (_super) {
    __extends(Reshape, _super);
    function Reshape(xTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.xTensor = xTensor;
        _this.yTensor = yTensor;
        var xSize = util.sizeFromShape(xTensor.shape);
        var ySize = util.sizeFromShape(yTensor.shape);
        util.assert(xSize === ySize, "The input size (" + xSize + ") and output size (" + ySize + ") must match");
        return _this;
    }
    Reshape.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var x = inferenceArrays.get(this.xTensor);
        var clone = math.clone(x);
        math.scope(function (keep) {
            inferenceArrays.set(_this.yTensor, keep(clone.reshape(_this.yTensor.shape)));
        });
    };
    Reshape.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var dy = gradientArrays.get(this.yTensor);
        var clone = math.clone(dy);
        math.scope(function () {
            gradientArrays.add(_this.xTensor, clone.reshape(_this.xTensor.shape));
        });
    };
    return Reshape;
}(op_1.Operation));
exports.Reshape = Reshape;
//# sourceMappingURL=reshape.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var graph_1 = __webpack_require__(13);
var op_1 = __webpack_require__(2);
var Softmax = (function (_super) {
    __extends(Softmax, _super);
    function Softmax(logitsTensor, output) {
        var _this = _super.call(this) || this;
        _this.logitsTensor = logitsTensor;
        _this.output = output;
        return _this;
    }
    Softmax.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var logits = inferenceArrays.get(this.logitsTensor);
        return math.scope(function (keep) {
            inferenceArrays.set(_this.output, keep(math.softmax(logits)));
        });
    };
    Softmax.prototype.backProp = function () {
        throw Error('Softmax backprop is not yet implemented');
    };
    return Softmax;
}(op_1.Operation));
exports.Softmax = Softmax;
var SoftmaxCrossEntropyCost = (function (_super) {
    __extends(SoftmaxCrossEntropyCost, _super);
    function SoftmaxCrossEntropyCost(logitsTensor, labelTensor, yTensor) {
        var _this = _super.call(this) || this;
        _this.logitsTensor = logitsTensor;
        _this.labelTensor = labelTensor;
        _this.yTensor = yTensor;
        _this.epsilon = ndarray_1.Scalar.new(1e-5);
        _this.softmaxTensor = new graph_1.Tensor(logitsTensor.shape);
        return _this;
    }
    SoftmaxCrossEntropyCost.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var logits = inferenceArrays.get(this.logitsTensor);
        var label = inferenceArrays.get(this.labelTensor);
        math.scope(function (keep) {
            var softmaxResult = math.softmax(logits);
            inferenceArrays.set(_this.softmaxTensor, keep(softmaxResult));
            inferenceArrays.set(_this.yTensor, keep(crossEntropyCost(math, softmaxResult, label, _this.epsilon)));
        });
    };
    SoftmaxCrossEntropyCost.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var softmax = inferenceArrays.get(this.softmaxTensor);
        var label = inferenceArrays.get(this.labelTensor);
        math.scope(function () {
            gradientArrays.add(_this.logitsTensor, math.subtract(softmax, label));
        });
    };
    SoftmaxCrossEntropyCost.prototype.disposeTransientArrays = function (inferenceArrays, gradientArrays) {
        inferenceArrays.disposeArray(this.softmaxTensor);
    };
    SoftmaxCrossEntropyCost.prototype.dispose = function () {
        this.epsilon.dispose();
    };
    return SoftmaxCrossEntropyCost;
}(op_1.Operation));
exports.SoftmaxCrossEntropyCost = SoftmaxCrossEntropyCost;
function crossEntropyCost(math, y, target, epsilon) {
    util.assert(y.size === target.size, 'The output and target must be the same size');
    return math.scope(function () {
        var yPlusEps = math.scalarPlusArray(epsilon, y);
        var logOutput = math.log(yPlusEps);
        var tarLogOutput = math.elementWiseMul(target, logOutput);
        var costVector = math.neg(tarLogOutput);
        return math.sum(costVector);
    });
}
exports.crossEntropyCost = crossEntropyCost;
//# sourceMappingURL=softmax.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var util = __webpack_require__(0);
var graph_util = __webpack_require__(3);
var op_1 = __webpack_require__(2);
var Subtract = (function (_super) {
    __extends(Subtract, _super);
    function Subtract(t1, t2, outTensor) {
        var _this = _super.call(this) || this;
        _this.t1 = t1;
        _this.t2 = t2;
        _this.outTensor = outTensor;
        util.assert(util.sizeFromShape(t1.shape) === 1 ||
            util.sizeFromShape(t2.shape) === 1 ||
            util.arraysEqual(t1.shape, t2.shape), 'One of t1 or t2 must be a scalar, or t1 and t2 must have ' +
            'the same shape');
        return _this;
    }
    Subtract.prototype.feedForward = function (math, inferenceArrays) {
        var _this = this;
        var t1 = inferenceArrays.get(this.t1);
        var t2 = inferenceArrays.get(this.t2);
        math.scope(function (keep) {
            var result;
            if (util.isScalarShape(t1.shape)) {
                result = math.scalarMinusArray(t1, t2);
            }
            else if (util.isScalarShape(t2.shape)) {
                result = math.arrayMinusScalar(t1, t2);
            }
            else {
                result = math.subtract(t1, t2);
            }
            inferenceArrays.set(_this.outTensor, keep(result));
        });
    };
    Subtract.prototype.backProp = function (math, inferenceArrays, gradientArrays) {
        var _this = this;
        var dy = gradientArrays.get(this.outTensor);
        math.scope(function () {
            if (graph_util.shouldBackProp(_this.t1)) {
                if (util.isScalarShape(_this.t1.shape)) {
                    var sum = math.sum(dy);
                    if (_this.dySizeScalar == null) {
                        _this.dySizeScalar = ndarray_1.Scalar.new(dy.size);
                    }
                    gradientArrays.add(_this.t1, math.divide(sum, _this.dySizeScalar));
                }
                else {
                    gradientArrays.add(_this.t1, math.clone(dy));
                }
            }
            if (graph_util.shouldBackProp(_this.t2)) {
                if (util.isScalarShape(_this.t2.shape)) {
                    var sum = math.sum(dy);
                    var negSum = math.neg(sum);
                    if (_this.dySizeScalar == null) {
                        _this.dySizeScalar = ndarray_1.Scalar.new(dy.size);
                    }
                    gradientArrays.add(_this.t2, math.divide(negSum, _this.dySizeScalar));
                }
                else {
                    gradientArrays.add(_this.t2, math.neg(dy));
                }
            }
        });
    };
    Subtract.prototype.dispose = function () {
        if (this.dySizeScalar != null) {
            this.dySizeScalar.dispose();
        }
    };
    return Subtract;
}(op_1.Operation));
exports.Subtract = Subtract;
//# sourceMappingURL=subtract.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var tensor_array_map_1 = __webpack_require__(6);
var optimizer_1 = __webpack_require__(7);
var AdadeltaOptimizer = (function (_super) {
    __extends(AdadeltaOptimizer, _super);
    function AdadeltaOptimizer(learningRate, gamma, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.gamma = gamma;
        _this.accumulatedSquaredGradients = new tensor_array_map_1.TensorArrayMap();
        _this.accumulatedUpdates = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-6);
        _this.g = ndarray_1.Scalar.new(_this.gamma);
        return _this;
    }
    AdadeltaOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.accumulatedSquaredGradients.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.accumulatedSquaredGradients.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
                _this.accumulatedUpdates.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    AdadeltaOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldCache = _this.accumulatedSquaredGradients.get(node.output);
                var oldUpdates = _this.accumulatedUpdates.get(node.output);
                var gradientSquare = math.multiply(gradient, gradient);
                var cache = math.scaledArrayAdd(_this.g, oldCache, math.subtract(_this.one, _this.g), gradientSquare);
                var updates = math.multiply(math.divide(math.sqrt(math.add(oldUpdates, _this.eps)), math.sqrt(math.add(oldCache, _this.eps))), gradient);
                var variable = math.scaledArrayAdd(_this.c, updates, _this.one, oldVariable);
                var updateSquare = math.multiply(updates, updates);
                var newUpdates = math.scaledArrayAdd(_this.g, oldUpdates, math.subtract(_this.one, _this.g), updateSquare);
                _this.accumulatedSquaredGradients.set(node.output, keep(cache));
                _this.accumulatedUpdates.set(node.output, keep(newUpdates));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
                oldCache.dispose();
                oldUpdates.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    AdadeltaOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.eps.dispose();
        this.g.dispose();
        this.accumulatedSquaredGradients.dispose();
        this.accumulatedUpdates.dispose();
    };
    return AdadeltaOptimizer;
}(optimizer_1.Optimizer));
exports.AdadeltaOptimizer = AdadeltaOptimizer;
//# sourceMappingURL=adadelta_optimizer.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var tensor_array_map_1 = __webpack_require__(6);
var optimizer_1 = __webpack_require__(7);
var AdagradOptimizer = (function (_super) {
    __extends(AdagradOptimizer, _super);
    function AdagradOptimizer(learningRate, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.accumulatedSquaredGradients = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-6);
        return _this;
    }
    AdagradOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.accumulatedSquaredGradients.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.accumulatedSquaredGradients.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    AdagradOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldCache = _this.accumulatedSquaredGradients.get(node.output);
                var gradientSquare = math.multiply(gradient, gradient);
                var cache = math.add(oldCache, gradientSquare);
                var variable = math.scaledArrayAdd(_this.c, math.divide(gradient, math.add(math.sqrt(cache), _this.eps)), _this.one, oldVariable);
                _this.accumulatedSquaredGradients.set(node.output, keep(cache));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
                oldCache.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    AdagradOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.eps.dispose();
        this.accumulatedSquaredGradients.dispose();
    };
    return AdagradOptimizer;
}(optimizer_1.Optimizer));
exports.AdagradOptimizer = AdagradOptimizer;
//# sourceMappingURL=adagrad_optimizer.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var tensor_array_map_1 = __webpack_require__(6);
var optimizer_1 = __webpack_require__(7);
var AdamOptimizer = (function (_super) {
    __extends(AdamOptimizer, _super);
    function AdamOptimizer(learningRate, beta1, beta2, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.beta1 = beta1;
        _this.beta2 = beta2;
        _this.firstMoment = new tensor_array_map_1.TensorArrayMap();
        _this.secondMoment = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-8);
        _this.b1 = ndarray_1.Scalar.new(_this.beta1);
        _this.b2 = ndarray_1.Scalar.new(_this.beta2);
        _this.accB1 = ndarray_1.Scalar.new(_this.beta1);
        _this.accB2 = ndarray_1.Scalar.new(_this.beta2);
        return _this;
    }
    AdamOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.firstMoment.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.firstMoment.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
        if (this.secondMoment.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.secondMoment.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    AdamOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldFirstMoment = _this.firstMoment.get(node.output);
                var oldSecondMoment = _this.secondMoment.get(node.output);
                var newFirstMoment = math.scaledArrayAdd(_this.b1, oldFirstMoment, math.subtract(_this.one, _this.b1), gradient);
                var gradientSquare = math.multiply(gradient, gradient);
                var newSecondMoment = math.scaledArrayAdd(_this.b2, oldSecondMoment, math.subtract(_this.one, _this.b2), gradientSquare);
                var biasCorrectedFirstMoment = math.divide(newFirstMoment, math.subtract(_this.one, _this.accB1));
                var biasCorrectedSecondMoment = math.divide(newSecondMoment, math.subtract(_this.one, _this.accB2));
                var variable = math.scaledArrayAdd(_this.c, math.divide(biasCorrectedFirstMoment, math.add(math.sqrt(biasCorrectedSecondMoment), _this.eps)), _this.one, oldVariable);
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                _this.firstMoment.set(node.output, keep(newFirstMoment));
                _this.secondMoment.set(node.output, keep(newSecondMoment));
                oldVariable.dispose();
                gradient.dispose();
                oldFirstMoment.dispose();
                oldSecondMoment.dispose();
            });
            var oldAccB1 = _this.accB1;
            var oldAccB2 = _this.accB2;
            _this.accB1 = keep(math.multiply(_this.accB1, _this.b1));
            _this.accB2 = keep(math.multiply(_this.accB2, _this.b2));
            oldAccB1.dispose();
            oldAccB2.dispose();
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    AdamOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.firstMoment.dispose();
        this.secondMoment.dispose();
        this.eps.dispose();
        this.b1.dispose();
        this.b2.dispose();
        this.accB1.dispose();
        this.accB2.dispose();
    };
    return AdamOptimizer;
}(optimizer_1.Optimizer));
exports.AdamOptimizer = AdamOptimizer;
//# sourceMappingURL=adam_optimizer.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var tensor_array_map_1 = __webpack_require__(6);
var optimizer_1 = __webpack_require__(7);
var AdamaxOptimizer = (function (_super) {
    __extends(AdamaxOptimizer, _super);
    function AdamaxOptimizer(learningRate, beta1, beta2, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.beta1 = beta1;
        _this.beta2 = beta2;
        _this.firstMoment = new tensor_array_map_1.TensorArrayMap();
        _this.weightedInfNorm = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-8);
        _this.b1 = ndarray_1.Scalar.new(_this.beta1);
        _this.b2 = ndarray_1.Scalar.new(_this.beta2);
        _this.accB1 = ndarray_1.Scalar.new(_this.beta1);
        return _this;
    }
    AdamaxOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.firstMoment.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.firstMoment.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
        if (this.weightedInfNorm.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.weightedInfNorm.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    AdamaxOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldFirstMoment = _this.firstMoment.get(node.output);
                var oldWeightedInfNorm = _this.weightedInfNorm.get(node.output);
                var newFirstMoment = math.scaledArrayAdd(_this.b1, oldFirstMoment, math.subtract(_this.one, _this.b1), gradient);
                var ut0 = math.multiply(_this.b2, oldWeightedInfNorm);
                var ut1 = math.abs(gradient);
                var newWeightedInfNorm = math.add(math.relu(math.subtract(ut0, ut1)), ut1);
                var variable = math.scaledArrayAdd(_this.one, oldVariable, math.divide(_this.c, math.subtract(_this.one, _this.accB1)), math.divide(newFirstMoment, math.add(_this.eps, newWeightedInfNorm)));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                _this.firstMoment.set(node.output, keep(newFirstMoment));
                _this.weightedInfNorm.set(node.output, keep(newWeightedInfNorm));
                oldVariable.dispose();
                gradient.dispose();
                oldFirstMoment.dispose();
                oldWeightedInfNorm.dispose();
            });
            var oldAccB1 = _this.accB1;
            _this.accB1 = keep(math.multiply(_this.accB1, _this.b1));
            oldAccB1.dispose();
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    AdamaxOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.firstMoment.dispose();
        this.weightedInfNorm.dispose();
        this.eps.dispose();
        this.accB1.dispose();
        this.b1.dispose();
        this.b2.dispose();
    };
    return AdamaxOptimizer;
}(optimizer_1.Optimizer));
exports.AdamaxOptimizer = AdamaxOptimizer;
//# sourceMappingURL=adamax_optimizer.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var tensor_array_map_1 = __webpack_require__(6);
var sgd_optimizer_1 = __webpack_require__(26);
var MomentumOptimizer = (function (_super) {
    __extends(MomentumOptimizer, _super);
    function MomentumOptimizer(learningRate, momentum, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.momentum = momentum;
        _this.variableVelocities = new tensor_array_map_1.TensorArrayMap();
        _this.m = ndarray_1.Scalar.new(_this.momentum);
        return _this;
    }
    MomentumOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.variableVelocities.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.variableVelocities.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    MomentumOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldVelocity = _this.variableVelocities.get(node.output);
                var velocity = math.scaledArrayAdd(_this.m, oldVelocity, _this.one, gradient);
                var variable = math.scaledArrayAdd(_this.c, velocity, _this.one, oldVariable);
                _this.variableVelocities.set(node.output, keep(velocity));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
                oldVelocity.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    MomentumOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.m.dispose();
        this.variableVelocities.dispose();
    };
    MomentumOptimizer.prototype.setMomentum = function (momentum) {
        this.momentum = momentum;
    };
    return MomentumOptimizer;
}(sgd_optimizer_1.SGDOptimizer));
exports.MomentumOptimizer = MomentumOptimizer;
//# sourceMappingURL=momentum_optimizer.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var tensor_array_map_1 = __webpack_require__(6);
var optimizer_1 = __webpack_require__(7);
var RMSPropOptimizer = (function (_super) {
    __extends(RMSPropOptimizer, _super);
    function RMSPropOptimizer(learningRate, gamma, specifiedVariableList) {
        var _this = _super.call(this, learningRate, specifiedVariableList) || this;
        _this.learningRate = learningRate;
        _this.gamma = gamma;
        _this.accumulatedSquaredGradients = new tensor_array_map_1.TensorArrayMap();
        _this.eps = ndarray_1.Scalar.new(1e-6);
        _this.g = ndarray_1.Scalar.new(_this.gamma);
        return _this;
    }
    RMSPropOptimizer.prototype.beforeBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        _super.prototype.beforeBatch.call(this, math, batchSize, runtime, activationArrayMap, gradientArrayMap);
        if (this.accumulatedSquaredGradients.size() === 0) {
            this.variableNodes.forEach(function (node) {
                _this.accumulatedSquaredGradients.set(node.output, ndarray_1.NDArray.zeros(node.output.shape));
            });
        }
    };
    RMSPropOptimizer.prototype.afterBatch = function (math, batchSize, runtime, activationArrayMap, gradientArrayMap) {
        var _this = this;
        math.scope(function (keep) {
            _this.variableNodes.forEach(function (node) {
                var oldVariable = activationArrayMap.get(node.output);
                var gradient = _this.variableGradients.get(node.output);
                var oldCache = _this.accumulatedSquaredGradients.get(node.output);
                var gradientSquare = math.multiply(gradient, gradient);
                var cache = math.scaledArrayAdd(_this.g, oldCache, math.subtract(_this.one, _this.g), gradientSquare);
                var variable = math.scaledArrayAdd(_this.c, math.divide(gradient, math.add(math.sqrt(cache), _this.eps)), _this.one, oldVariable);
                _this.accumulatedSquaredGradients.set(node.output, keep(cache));
                activationArrayMap.set(node.output, keep(variable));
                node.data = variable;
                oldVariable.dispose();
                oldCache.dispose();
            });
        });
        this.variableGradients.dispose();
        this.variableGradients = new tensor_array_map_1.TensorArrayMap();
    };
    RMSPropOptimizer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.eps.dispose();
        this.g.dispose();
        this.accumulatedSquaredGradients.dispose();
    };
    return RMSPropOptimizer;
}(optimizer_1.Optimizer));
exports.RMSPropOptimizer = RMSPropOptimizer;
//# sourceMappingURL=rmsprop_optimizer.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var session_1 = __webpack_require__(28);
var ndarray_1 = __webpack_require__(1);
var DEFAULT_EVAL_INTERVAL_MS = 1500;
var DEFAULT_COST_INTERVAL_MS = 500;
var DEFAULT_INFERENCE_EXAMPLE_INTERVAL_MS = 3000;
var MetricReduction;
(function (MetricReduction) {
    MetricReduction[MetricReduction["SUM"] = 0] = "SUM";
    MetricReduction[MetricReduction["MEAN"] = 1] = "MEAN";
})(MetricReduction = exports.MetricReduction || (exports.MetricReduction = {}));
var GraphRunner = (function () {
    function GraphRunner(math, session, eventObserver) {
        this.math = math;
        this.session = session;
        this.eventObserver = eventObserver;
        this.lastCostTimestamp = 0;
        this.lastEvalTimestamp = 0;
        this.totalIdleTimeMs = 0;
        this.resetStatistics();
        this.zeroScalar = ndarray_1.Scalar.new(0);
    }
    GraphRunner.prototype.resetStatistics = function () {
        this.totalBatchesTrained = 0;
        this.totalIdleTimeMs = 0;
        this.lastStopTimestamp = null;
    };
    GraphRunner.prototype.train = function (costTensor, trainFeedEntries, batchSize, optimizer, numBatches, metricTensor, metricFeedEntries, metricBatchSize, metricReduction, evalIntervalMs, costIntervalMs) {
        if (metricReduction === void 0) { metricReduction = MetricReduction.MEAN; }
        if (evalIntervalMs === void 0) { evalIntervalMs = DEFAULT_EVAL_INTERVAL_MS; }
        if (costIntervalMs === void 0) { costIntervalMs = DEFAULT_COST_INTERVAL_MS; }
        this.costTensor = costTensor;
        this.trainFeedEntries = trainFeedEntries;
        this.metricTensor = metricTensor;
        this.metricFeedEntries = metricFeedEntries;
        if (metricBatchSize != null && this.metricBatchSize !== metricBatchSize) {
            if (this.metricBatchSizeScalar != null) {
                this.metricBatchSizeScalar.dispose();
            }
            this.metricBatchSizeScalar = ndarray_1.Scalar.new(metricBatchSize);
        }
        this.metricBatchSize = metricBatchSize;
        this.metricReduction = metricReduction;
        this.batchSize = batchSize;
        this.optimizer = optimizer;
        this.metricIntervalMs = evalIntervalMs;
        this.costIntervalMs = costIntervalMs;
        this.currentTrainLoopNumBatches = numBatches;
        this.batchesTrainedThisRun = 0;
        this.isTraining = true;
        this.trainStartTimestamp = performance.now();
        this.trainNetwork();
    };
    GraphRunner.prototype.stopTraining = function () {
        this.isTraining = false;
        this.lastStopTimestamp = performance.now();
    };
    GraphRunner.prototype.resumeTraining = function () {
        this.isTraining = true;
        if (this.lastStopTimestamp != null) {
            this.totalIdleTimeMs += performance.now() - this.lastStopTimestamp;
        }
        this.trainNetwork();
    };
    GraphRunner.prototype.trainNetwork = function () {
        var _this = this;
        if (this.batchesTrainedThisRun === this.currentTrainLoopNumBatches) {
            this.stopTraining();
        }
        if (!this.isTraining) {
            if (this.eventObserver.doneTrainingCallback != null) {
                this.eventObserver.doneTrainingCallback();
            }
            return;
        }
        var start = performance.now();
        var shouldComputeCost = this.eventObserver.avgCostCallback != null &&
            (start - this.lastCostTimestamp > this.costIntervalMs);
        if (shouldComputeCost) {
            this.lastCostTimestamp = start;
        }
        var costReduction = shouldComputeCost ? session_1.CostReduction.MEAN : session_1.CostReduction.NONE;
        this.math.scope(function (keep) {
            var avgCost = _this.session.train(_this.costTensor, _this.trainFeedEntries, _this.batchSize, _this.optimizer, costReduction);
            if (shouldComputeCost) {
                var trainTime = performance.now() - start;
                _this.eventObserver.avgCostCallback(avgCost);
                if (_this.eventObserver.trainExamplesPerSecCallback != null) {
                    var examplesPerSec = (_this.batchSize * 1000 / trainTime);
                    _this.eventObserver.trainExamplesPerSecCallback(examplesPerSec);
                }
            }
            if (_this.eventObserver.metricCallback != null &&
                _this.metricFeedEntries != null &&
                start - _this.lastEvalTimestamp > _this.metricIntervalMs) {
                _this.lastEvalTimestamp = start;
                if (_this.lastComputedMetric != null) {
                    _this.lastComputedMetric.dispose();
                }
                _this.lastComputedMetric = _this.computeMetric();
                _this.eventObserver.metricCallback(_this.lastComputedMetric);
            }
            if (_this.eventObserver.totalTimeCallback != null) {
                _this.eventObserver.totalTimeCallback((start - _this.trainStartTimestamp) / 1000);
            }
            _this.batchesTrainedThisRun++;
            _this.totalBatchesTrained++;
            if (_this.eventObserver.batchesTrainedCallback != null) {
                _this.eventObserver.batchesTrainedCallback(_this.totalBatchesTrained);
            }
        });
        requestAnimationFrame(function () { return _this.trainNetwork(); });
    };
    GraphRunner.prototype.infer = function (inferenceTensor, inferenceFeedEntries, inferenceExampleIntervalMs, inferenceExampleCount, numPasses) {
        var _this = this;
        if (inferenceExampleIntervalMs === void 0) { inferenceExampleIntervalMs = DEFAULT_INFERENCE_EXAMPLE_INTERVAL_MS; }
        if (inferenceExampleCount === void 0) { inferenceExampleCount = 5; }
        if (this.eventObserver.inferenceExamplesCallback == null &&
            this.eventObserver.inferenceExamplesPerSecCallback == null) {
            throw new Error('Cannot start inference loop, no inference example or ' +
                'examples/sec observer provided.');
        }
        for (var i = 0; i < inferenceFeedEntries.length; i++) {
            var feedEntry = inferenceFeedEntries[i];
            if (feedEntry.data instanceof ndarray_1.NDArray) {
                throw new Error('Cannot start inference on the model runner with feed entries of ' +
                    'type NDArray. Please use InputProviders.');
            }
        }
        this.inferenceExampleIntervalMs = inferenceExampleIntervalMs;
        this.inferenceTensor = inferenceTensor;
        this.inferenceFeedEntries = inferenceFeedEntries;
        this.inferenceExampleCount = inferenceExampleCount;
        this.currentInferenceLoopNumPasses = numPasses;
        if (!this.isInferring) {
            this.inferencePassesThisRun = 0;
            requestAnimationFrame(function () { return _this.inferNetwork(); });
        }
        this.isInferring = true;
    };
    GraphRunner.prototype.inferNetwork = function () {
        var _this = this;
        if (!this.isInferring ||
            this.inferencePassesThisRun === this.currentInferenceLoopNumPasses) {
            return;
        }
        this.math.scope(function (keep, track) {
            var feeds = [];
            var inferenceValues = [];
            var start = performance.now();
            for (var i = 0; i < _this.inferenceExampleCount; i++) {
                var ndarrayFeedEntries = [];
                for (var j = 0; j < _this.inferenceFeedEntries.length; j++) {
                    var feedEntry = _this.inferenceFeedEntries[j];
                    var nextCopy = feedEntry.data.getNextCopy(_this.math);
                    ndarrayFeedEntries.push({ tensor: feedEntry.tensor, data: track(nextCopy) });
                }
                feeds.push(ndarrayFeedEntries);
                inferenceValues.push(_this.session.eval(_this.inferenceTensor, ndarrayFeedEntries));
            }
            if (_this.eventObserver.inferenceExamplesPerSecCallback != null) {
                inferenceValues[inferenceValues.length - 1].getValues();
                var inferenceExamplesPerSecTime = performance.now() - start;
                var examplesPerSec = (_this.inferenceExampleCount * 1000 / inferenceExamplesPerSecTime);
                _this.eventObserver.inferenceExamplesPerSecCallback(examplesPerSec);
            }
            if (_this.eventObserver.inferenceExamplesCallback != null) {
                _this.eventObserver.inferenceExamplesCallback(feeds, inferenceValues);
            }
            _this.inferencePassesThisRun++;
        });
        this.lastInferTimeoutID = window.setTimeout(function () { return _this.inferNetwork(); }, this.inferenceExampleIntervalMs);
    };
    GraphRunner.prototype.stopInferring = function () {
        this.isInferring = false;
        window.clearTimeout(this.lastInferTimeoutID);
    };
    GraphRunner.prototype.isInferenceRunning = function () {
        return this.isInferring;
    };
    GraphRunner.prototype.computeMetric = function () {
        var _this = this;
        if (this.metricFeedEntries == null) {
            throw new Error('Cannot compute metric, no metric FeedEntries provided.');
        }
        var metric = this.zeroScalar;
        return this.math.scope(function (keep) {
            for (var i = 0; i < _this.metricBatchSize; i++) {
                var metricValue = _this.session.eval(_this.metricTensor, _this.metricFeedEntries);
                metric = _this.math.add(metric, metricValue);
            }
            if (_this.metricReduction === MetricReduction.MEAN) {
                metric = _this.math.divide(metric, _this.metricBatchSizeScalar);
            }
            return metric;
        });
    };
    GraphRunner.prototype.getTotalBatchesTrained = function () {
        return this.totalBatchesTrained;
    };
    GraphRunner.prototype.getLastComputedMetric = function () {
        return this.lastComputedMetric;
    };
    GraphRunner.prototype.setMath = function (math) {
        this.math = math;
    };
    GraphRunner.prototype.setSession = function (session) {
        this.session = session;
    };
    GraphRunner.prototype.setInferenceTensor = function (inferenceTensor) {
        this.inferenceTensor = inferenceTensor;
    };
    GraphRunner.prototype.setInferenceExampleCount = function (inferenceExampleCount) {
        this.inferenceExampleCount = inferenceExampleCount;
    };
    return GraphRunner;
}());
exports.GraphRunner = GraphRunner;
//# sourceMappingURL=graph_runner.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var TanHFunc = (function () {
    function TanHFunc() {
    }
    TanHFunc.prototype.output = function (math, x) {
        return math.scope(function () {
            return math.tanh(x);
        });
    };
    TanHFunc.prototype.der = function (math, x, y) {
        return math.scope(function () {
            var ySquared = math.elementWiseMul(y, y);
            return math.scalarMinusArray(ndarray_1.Scalar.ONE, ySquared);
        });
    };
    TanHFunc.prototype.dispose = function () { };
    return TanHFunc;
}());
exports.TanHFunc = TanHFunc;
var ReLUFunc = (function () {
    function ReLUFunc() {
    }
    ReLUFunc.prototype.output = function (math, x) {
        return math.scope(function () {
            return math.relu(x);
        });
    };
    ReLUFunc.prototype.der = function (math, x, y) {
        return math.scope(function () {
            return math.step(x);
        });
    };
    ReLUFunc.prototype.dispose = function () { };
    return ReLUFunc;
}());
exports.ReLUFunc = ReLUFunc;
var LeakyReluFunc = (function () {
    function LeakyReluFunc(alpha) {
        this.alpha = alpha;
    }
    LeakyReluFunc.prototype.output = function (math, x) {
        return math.leakyRelu(x, this.alpha);
    };
    LeakyReluFunc.prototype.der = function (math, x, y) {
        return math.step(x, this.alpha);
    };
    LeakyReluFunc.prototype.dispose = function () { };
    return LeakyReluFunc;
}());
exports.LeakyReluFunc = LeakyReluFunc;
var SigmoidFunc = (function () {
    function SigmoidFunc() {
    }
    SigmoidFunc.prototype.output = function (math, x) {
        return math.scope(function () {
            return math.sigmoid(x);
        });
    };
    SigmoidFunc.prototype.der = function (math, x, y) {
        return math.scope(function () {
            var ySquared = math.elementWiseMul(y, y);
            return math.subStrict(y, ySquared);
        });
    };
    SigmoidFunc.prototype.dispose = function () { };
    return SigmoidFunc;
}());
exports.SigmoidFunc = SigmoidFunc;
var SquareFunc = (function () {
    function SquareFunc() {
    }
    SquareFunc.prototype.output = function (math, x) {
        return math.scope(function () {
            return math.elementWiseMul(x, x);
        });
    };
    SquareFunc.prototype.der = function (math, x, y) {
        return math.scope(function () {
            return math.scalarTimesArray(ndarray_1.Scalar.TWO, x);
        });
    };
    SquareFunc.prototype.dispose = function () { };
    return SquareFunc;
}());
exports.SquareFunc = SquareFunc;
//# sourceMappingURL=activation_functions.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(1);
var SquareCostFunc = (function () {
    function SquareCostFunc() {
        this.halfOne = ndarray_1.Scalar.new(0.5);
    }
    SquareCostFunc.prototype.cost = function (math, x1, x2) {
        var diff = math.subStrict(x1, x2);
        var diffSquared = math.elementWiseMul(diff, diff);
        var result = math.scalarTimesArray(this.halfOne, diffSquared);
        diff.dispose();
        diffSquared.dispose();
        return result;
    };
    SquareCostFunc.prototype.der = function (math, x1, x2) {
        return math.subStrict(x1, x2);
    };
    SquareCostFunc.prototype.dispose = function () {
        this.halfOne.dispose();
    };
    return SquareCostFunc;
}());
exports.SquareCostFunc = SquareCostFunc;
//# sourceMappingURL=cost_functions.js.map

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PARALLELIZE_THRESHOLD = 30;
function computeOptimalWindowSize(inSize) {
    if (inSize <= exports.PARALLELIZE_THRESHOLD) {
        return inSize;
    }
    return nearestDivisor(inSize, Math.floor(Math.sqrt(inSize)));
}
exports.computeOptimalWindowSize = computeOptimalWindowSize;
function nearestDivisor(size, start) {
    for (var i = start; i < size; ++i) {
        if (size % i === 0) {
            return i;
        }
    }
    return size;
}
//# sourceMappingURL=reduce_util.js.map

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(0);
function assertParamsValid(input, begin, size) {
    util.assert(input.rank === begin.length, "Error in slice" + input.rank + "D: Length of begin " + begin + " must " +
        ("match the rank of the array (" + input.rank + ")."));
    util.assert(input.rank === size.length, "Error in slice" + input.rank + "D: Length of size " + size + " must " +
        ("match the rank of the array (" + input.rank + ")."));
    for (var i = 0; i < input.rank; ++i) {
        util.assert(begin[i] + size[i] <= input.shape[i], "Error in slice" + input.rank + "D: begin[" + i + "] + size[" + i + "] " +
            ("(" + (begin[i] + size[i]) + ") would overflow input.shape[" + i + "] (" + input.shape[i] + ")"));
    }
}
exports.assertParamsValid = assertParamsValid;
//# sourceMappingURL=slice_util.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var broadcast_util = __webpack_require__(9);
var AddScaledMatProgram = (function () {
    function AddScaledMatProgram(aShape, bShape) {
        this.variableNames = ['A', 'B', 'c1', 'c2'];
        this.supportsBroadcasting = true;
        this.outputShape =
            broadcast_util.assertAndGetBroadcastShape(aShape, bShape);
        this.userCode = "\n      void main() {\n        float a = getAAtOutCoords();\n        float b = getBAtOutCoords();\n        float c1 = getC1();\n        float c2 = getC2();\n        setOutput(dot(vec2(c1, c2), vec2(a, b)));\n      }\n    ";
    }
    return AddScaledMatProgram;
}());
exports.AddScaledMatProgram = AddScaledMatProgram;
//# sourceMappingURL=addscaledmat_gpu.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ArgMinMaxProgram = (function () {
    function ArgMinMaxProgram(reduceInfo, op, firstPass) {
        this.variableNames = ['A'];
        var windowSize = reduceInfo.windowSize;
        var batchSize = reduceInfo.batchSize;
        var inSize = reduceInfo.inSize;
        var outSize = Math.ceil(inSize / windowSize);
        if (!firstPass) {
            this.variableNames.push('bestIndicesA');
        }
        this.outputShape = [batchSize, outSize];
        var compOp = (op === 'max') ? '>' : '<';
        var indexSnippet = firstPass ?
            'inOffset + i;' :
            'round(getBestIndicesA(batch, inOffset + i));';
        this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * " + windowSize + ";\n\n        int bestIndex = 0;\n        float bestValue = getA(batch, inOffset);\n\n        for (int i = 0; i < " + windowSize + "; i++) {\n          int inIdx = " + indexSnippet + ";\n          float candidate = getA(batch, inIdx);\n          if (isNaN(candidate)) {\n            setOutput(candidate);\n            return;\n          }\n          if (candidate " + compOp + " bestValue) {\n            bestValue = candidate;\n            bestIndex = inIdx;\n          }\n        }\n        setOutput(float(bestIndex));\n      }\n    ";
    }
    return ArgMinMaxProgram;
}());
exports.ArgMinMaxProgram = ArgMinMaxProgram;
//# sourceMappingURL=argminmax_gpu.js.map

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var broadcast_util = __webpack_require__(9);
var BatchNormProgram = (function () {
    function BatchNormProgram(xShape, meanShape, varianceShape, offsetShape, scaleShape, varianceEpsilon) {
        this.outputShape = [];
        this.supportsBroadcasting = true;
        this.variableNames = ['x', 'mean', 'variance'];
        broadcast_util.assertAndGetBroadcastShape(xShape, meanShape);
        broadcast_util.assertAndGetBroadcastShape(xShape, varianceShape);
        var offsetSnippet = '0.0';
        if (offsetShape != null) {
            broadcast_util.assertAndGetBroadcastShape(xShape, offsetShape);
            this.variableNames.push('offset');
            offsetSnippet = 'getOffsetAtOutCoords()';
        }
        var scaleSnippet = '1.0';
        if (scaleShape != null) {
            broadcast_util.assertAndGetBroadcastShape(xShape, scaleShape);
            this.variableNames.push('scale');
            scaleSnippet = 'getScaleAtOutCoords()';
        }
        this.outputShape = xShape;
        this.userCode = "\n      void main() {\n        float x = getXAtOutCoords();\n        float mean = getMeanAtOutCoords();\n        float variance = getVarianceAtOutCoords();\n        float offset = " + offsetSnippet + ";\n        float scale = " + scaleSnippet + ";\n        float inv = scale / sqrt(variance + float(" + varianceEpsilon + "));\n        setOutput((x - mean) * inv + offset);\n      }\n    ";
    }
    return BatchNormProgram;
}());
exports.BatchNormProgram = BatchNormProgram;
//# sourceMappingURL=batchnorm_gpu.js.map

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClipProgram = (function () {
    function ClipProgram(aShape, min, max) {
        this.variableNames = ['A'];
        this.outputShape = aShape;
        var minFixed = min.toFixed(20);
        var maxFixed = max.toFixed(20);
        this.userCode = "\n      void main() {\n        float value = getAAtOutCoords();\n        if (isNaN(value)) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, " + minFixed + ", " + maxFixed + "));\n      }\n    ";
    }
    return ClipProgram;
}());
exports.ClipProgram = ClipProgram;
//# sourceMappingURL=clip_gpu.js.map

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var concat_util = __webpack_require__(14);
var shader_compiler_1 = __webpack_require__(16);
var ConcatProgram = (function () {
    function ConcatProgram(aShape, bShape, axis) {
        this.variableNames = ['A', 'B'];
        this.outputShape = [];
        var yAxes = ['yR', 'yC', 'yD', 'yW'];
        var concatAxis = yAxes[axis];
        this.outputShape = concat_util.computeOutShape(aShape, bShape, axis);
        var dType = shader_compiler_1.getCoordsDataType(aShape.length);
        var unpackSnippet = getUnpack(aShape.length);
        var sampleCoords = getSampleCoords(aShape.length);
        this.userCode = "\n      void main() {\n        " + dType + " coords = getOutputCoords();\n        " + unpackSnippet + "\n\n        float value = 0.0;\n        if (" + concatAxis + " < " + aShape[axis] + ") {\n          value = getA(" + sampleCoords + ");\n        } else {\n          " + concatAxis + " -= " + aShape[axis] + ";\n          value = getB(" + sampleCoords + ");\n        }\n\n        setOutput(value);\n      }\n    ";
    }
    return ConcatProgram;
}());
exports.ConcatProgram = ConcatProgram;
function getSampleCoords(rank) {
    if (rank === 1) {
        return 'yR';
    }
    else if (rank === 2) {
        return 'yR, yC';
    }
    else if (rank === 3) {
        return 'yR, yC, yD';
    }
    else if (rank === 4) {
        return 'yR, yC, yD, yW';
    }
    else {
        throw Error("Concat for rank " + rank + " is not yet supported");
    }
}
function getUnpack(rank) {
    var res = rank === 1 ? 'int yR = coords;' : 'int yR = coords.x;';
    if (rank > 1) {
        res += '\nint yC = coords.y;';
    }
    if (rank > 2) {
        res += '\nint yD = coords.z;';
    }
    if (rank > 3) {
        res += '\nint yW = coords.w;';
    }
    if (rank > 4) {
        throw Error("Concat for rank " + rank + " is not yet supported");
    }
    return res;
}
//# sourceMappingURL=concat_gpu.js.map

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var conv_util = __webpack_require__(8);
var Conv2DDerWeightsProgram = (function () {
    function Conv2DDerWeightsProgram(convInfo) {
        this.variableNames = ['x', 'dy'];
        var _a = convInfo.outShape, yNumRows = _a[0], yNumCols = _a[1], outDepth = _a[2];
        var _b = convInfo.inShape, xNumRows = _b[0], xNumCols = _b[1], inDepth = _b[2];
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        this.outputShape = conv_util.computeWeightsShape4D(inDepth, outDepth, convInfo.filterHeight, convInfo.filterWidth);
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int d2 = coords.w;\n\n        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int yR = 0; yR < " + yNumRows + "; yR++) {\n          int xR = wR + yR * " + strideHeight + " - " + padTop + ";\n\n          if (xR < 0 || xR >= " + xNumRows + ") {\n            continue;\n          }\n\n          for (int yC = 0; yC < " + yNumCols + "; yC++) {\n            int xC = wC + yC * " + strideWidth + " - " + padLeft + ";\n\n            if (xC < 0 || xC >= " + xNumCols + ") {\n              continue;\n            }\n\n            float dyValue = getDy(yR, yC, d2);\n            float xValue = getX(xR, xC, d1);\n            dotProd += (xValue * dyValue);\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv2DDerWeightsProgram;
}());
exports.Conv2DDerWeightsProgram = Conv2DDerWeightsProgram;
var Conv2DDerInputProgram = (function () {
    function Conv2DDerInputProgram(convInfo) {
        this.variableNames = ['dy', 'W'];
        var _a = convInfo.outShape, yRows = _a[0], yCols = _a[1], outDepth = _a[2];
        this.outputShape = convInfo.inShape;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padTop = filterHeight - 1 - convInfo.padInfo.top;
        var padLeft = filterWidth - 1 - convInfo.padInfo.left;
        this.userCode = "\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int d1 = coords.z;\n\n        ivec2 dyCorner = coords.xy - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + strideHeight + ".0;\n\n          if (dyR < 0.0 || dyR >= " + yRows + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = " + filterHeight + " - 1 - wR;\n\n          for (int wC = 0; wC < " + filterWidth + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + strideWidth + ".0;\n\n            if (dyC < 0.0 || dyC >= " + yCols + ".0 || fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = " + filterWidth + " - 1 - wC;\n\n            for (int d2 = 0; d2 < " + outDepth + "; d2++) {\n              float xValue = getDy(idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, d2);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv2DDerInputProgram;
}());
exports.Conv2DDerInputProgram = Conv2DDerInputProgram;
var Conv2DDerBiasProgram = (function () {
    function Conv2DDerBiasProgram(yShape) {
        this.variableNames = ['dy'];
        var yNumRows = yShape[0], yNumCols = yShape[1], outputDepth = yShape[2];
        this.outputShape = [outputDepth];
        this.userCode = "\n      void main() {\n        int d2 = getOutputCoords();\n\n        float derBias = 0.0;\n        for (int yR = 0; yR < " + yNumRows + "; yR++) {\n          for (int yC = 0; yC < " + yNumCols + "; yC++) {\n            derBias += getDy(yR, yC, d2);\n          }\n        }\n        setOutput(derBias);\n      }\n    ";
    }
    return Conv2DDerBiasProgram;
}());
exports.Conv2DDerBiasProgram = Conv2DDerBiasProgram;
//# sourceMappingURL=conv_backprop_gpu.js.map

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Conv2DProgram = (function () {
    function Conv2DProgram(convInfo, hasBias) {
        this.variableNames = ['x', 'W'];
        if (hasBias) {
            this.variableNames.push('bias');
        }
        this.outputShape = convInfo.outShape;
        var biasSnippet = hasBias ? 'dotProd += getBias(d2);' : '';
        var _a = convInfo.inShape, xNumRows = _a[0], xNumCols = _a[1], inputDepth = _a[2];
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var inputDepthNearestVec4 = Math.floor(inputDepth / 4) * 4;
        var inputDepthVec4Remainder = inputDepth % 4;
        this.userCode = "\n      const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int d2 = coords.z;\n\n        ivec2 xRCCorner = coords.xy * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= " + xNumRows + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + filterWidth + "; wC++) {\n            int xC = xCCorner + wC;\n\n            if (xC < 0 || xC >= " + xNumCols + ") {\n              continue;\n            }\n\n            for (int d1 = 0; d1 < " + inputDepthNearestVec4 + "; d1 += 4) {\n              vec4 xValues = vec4(\n                getX(xR, xC, d1),\n                getX(xR, xC, d1 + 1),\n                getX(xR, xC, d1 + 2),\n                getX(xR, xC, d1 + 3)\n              );\n              vec4 wValues = vec4(\n                getW(wR, wC, d1, d2),\n                getW(wR, wC, d1 + 1, d2),\n                getW(wR, wC, d1 + 2, d2),\n                getW(wR, wC, d1 + 3, d2)\n              );\n\n              dotProd += dot(xValues, wValues);\n            }\n\n            if (" + (inputDepthVec4Remainder === 1) + ") {\n              dotProd +=\n                getX(xR, xC, " + inputDepthNearestVec4 + ") *\n                getW(wR, wC, " + inputDepthNearestVec4 + ", d2);\n            } else if (" + (inputDepthVec4Remainder === 2) + ") {\n              vec2 xValues = vec2(\n                getX(xR, xC, " + inputDepthNearestVec4 + "),\n                getX(xR, xC, " + inputDepthNearestVec4 + " + 1)\n              );\n              vec2 wValues = vec2(\n                getW(wR, wC, " + inputDepthNearestVec4 + ", d2),\n                getW(wR, wC, " + inputDepthNearestVec4 + " + 1, d2)\n              );\n              dotProd += dot(xValues, wValues);\n            } else if (" + (inputDepthVec4Remainder === 3) + ") {\n              vec3 xValues = vec3(\n                getX(xR, xC, " + inputDepthNearestVec4 + "),\n                getX(xR, xC, " + inputDepthNearestVec4 + " + 1),\n                getX(xR, xC, " + inputDepthNearestVec4 + " + 2)\n              );\n              vec3 wValues = vec3(\n                getW(wR, wC, " + inputDepthNearestVec4 + ", d2),\n                getW(wR, wC, " + inputDepthNearestVec4 + " + 1, d2),\n                getW(wR, wC, " + inputDepthNearestVec4 + " + 2, d2)\n              );\n              dotProd += dot(xValues, wValues);\n            }\n          }\n        }\n        " + biasSnippet + "\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv2DProgram;
}());
exports.Conv2DProgram = Conv2DProgram;
//# sourceMappingURL=conv_gpu.js.map

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DepthwiseConv2DProgram = (function () {
    function DepthwiseConv2DProgram(convInfo) {
        this.variableNames = ['x', 'W'];
        this.outputShape = convInfo.outShape;
        var xNumRows = convInfo.inShape[1];
        var xNumCols = convInfo.inShape[2];
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var channelMul = convInfo.channelMul;
        this.userCode = "\n      const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2 / " + channelMul + ";\n        int q = d2 - d1 * " + channelMul + ";\n\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        // TODO(dsmilkov): Flatten the two for loops and vec4 the operations.\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= " + xNumRows + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + filterWidth + "; wC++) {\n            int xC = xCCorner + wC;\n\n            if (xC < 0 || xC >= " + xNumCols + ") {\n              continue;\n            }\n\n            float xVal = getX(batch, xR, xC, d1);\n            float wVal = getW(wR, wC, d1, q);\n            dotProd += xVal * wVal;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return DepthwiseConv2DProgram;
}());
exports.DepthwiseConv2DProgram = DepthwiseConv2DProgram;
//# sourceMappingURL=conv_gpu_depthwise.js.map

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Copy2DProgram = (function () {
    function Copy2DProgram(srcNumCols, destNumCols) {
        this.variableNames = ['source'];
        this.outputShape = null;
        this.userCode = "\n      uniform ivec2 sourceStart;\n      uniform ivec2 destStart;\n\n      void main() {\n        ivec2 destCoords = getOutputCoords() - destStart;\n        int index = destCoords.x * " + destNumCols + " + destCoords.y;\n        int r = index / " + srcNumCols + ";\n        ivec2 sourceCoords = sourceStart + ivec2(r, index - r * " + srcNumCols + ");\n        setOutput(getSource(sourceCoords.x, sourceCoords.y));\n      }\n    ";
    }
    Copy2DProgram.prototype.getCustomSetupFunc = function (sourceStart, destStart, destSize) {
        return function (gpgpu, webGLProgram) {
            gpgpu.setOutputMatrixWriteRegion(destStart[0], destSize[0], destStart[1], destSize[1]);
            var sourceStartCRLoc = gpgpu.getUniformLocation(webGLProgram, 'sourceStart');
            gpgpu.gl.uniform2i(sourceStartCRLoc, sourceStart[0], sourceStart[1]);
            var destStartCRLoc = gpgpu.getUniformLocation(webGLProgram, 'destStart');
            gpgpu.gl.uniform2i(destStartCRLoc, destStart[0], destStart[1]);
        };
    };
    return Copy2DProgram;
}());
exports.Copy2DProgram = Copy2DProgram;
//# sourceMappingURL=copy_gpu.js.map

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = __webpack_require__(5);
var util = __webpack_require__(0);
var shader_compiler = __webpack_require__(16);
var ATTRIBUTE_NAMES = ['uv', 'clipSpacePos'];
var NAN_UNIFORM_NAME = 'NaN';
function shouldUploadNaNUniform() {
    return !environment_1.ENV.get('WEBGL_FLOAT_TEXTURE_ENABLED');
}
function compileProgram(gpgpu, program, inputs, output) {
    var userCode = program.userCode;
    var inputInfos = inputs.map(function (input, i) {
        var shapeInfo = {
            logicalShape: input.shape,
            texShape: input.getTextureShapeRC(),
            textureType: input.getData().textureType
        };
        return { name: program.variableNames[i], shapeInfo: shapeInfo };
    });
    var inShapeInfos = inputInfos.map(function (x) { return x.shapeInfo; });
    var outShapeInfo = {
        logicalShape: output.shape,
        texShape: output.getTextureShapeRC(),
        textureType: output.getData().textureType
    };
    var source = shader_compiler.makeShader(inputInfos, outShapeInfo, userCode, program.supportsBroadcasting === true);
    var webGLProgram = gpgpu.createProgram(source);
    var uniformLocations = {};
    for (var i = 0; i < program.variableNames.length; i++) {
        var uniformName = program.variableNames[i];
        uniformLocations[uniformName] =
            gpgpu.getUniformLocation(webGLProgram, uniformName);
    }
    var attributeLocations = {};
    ATTRIBUTE_NAMES.forEach(function (attribute) {
        attributeLocations[attribute] =
            gpgpu.getAttributeLocation(webGLProgram, attribute);
    });
    if (shouldUploadNaNUniform()) {
        uniformLocations[NAN_UNIFORM_NAME] =
            gpgpu.getUniformLocation(webGLProgram, NAN_UNIFORM_NAME);
    }
    return {
        program: program,
        source: source,
        webGLProgram: webGLProgram,
        uniformLocations: uniformLocations,
        attributeLocations: attributeLocations,
        gpgpu: gpgpu,
        inShapeInfos: inShapeInfos,
        outShapeInfo: outShapeInfo
    };
}
exports.compileProgram = compileProgram;
function validateBinaryAndProgram(shapeInfos, inputs) {
    if (shapeInfos.length !== inputs.length) {
        throw Error("Binary was compiled with " + shapeInfos.length + " inputs, but " +
            ("was executed with " + inputs.length + " inputs"));
    }
    shapeInfos.forEach(function (s, i) {
        var shapeA = s.logicalShape;
        var texShapeA = s.texShape;
        var shapeB = inputs[i].shape;
        var texShapeB = inputs[i].getTextureShapeRC();
        if (!util.arraysEqual(shapeA, shapeB)) {
            throw Error("Binary was compiled with different shapes than " +
                ("the current args. Shapes " + shapeA + " and " + shapeB + " must match"));
        }
        if (!util.arraysEqual(texShapeA, texShapeB)) {
            throw Error("Binary was compiled with different texture shapes than the" +
                (" current args. Shape " + texShapeA + " and " + texShapeB + " must match"));
        }
    });
}
function runProgram(binary, inputs, output, customSetup) {
    validateBinaryAndProgram(binary.inShapeInfos, inputs);
    validateBinaryAndProgram([binary.outShapeInfo], [output]);
    var outTex = output.getTexture();
    var outTexShape = output.getTextureShapeRC();
    var gpgpu = binary.gpgpu;
    gpgpu.setOutputMatrixTexture(outTex, outTexShape[0], outTexShape[1]);
    gpgpu.setProgram(binary.webGLProgram);
    inputs.forEach(function (input, i) {
        var tex = input.getTexture();
        var variableName = binary.program.variableNames[i];
        var variableUniformLocation = binary.uniformLocations[variableName];
        gpgpu.setInputMatrixTexture(tex, variableUniformLocation, i);
    });
    if (shouldUploadNaNUniform()) {
        gpgpu.gl.uniform1f(binary.uniformLocations[NAN_UNIFORM_NAME], NaN);
    }
    if (customSetup != null) {
        customSetup(gpgpu, binary.webGLProgram);
    }
    gpgpu.executeProgram(binary.attributeLocations);
}
exports.runProgram = runProgram;
function makeShaderKey(program, inputs, output) {
    var keyInputs = '';
    inputs.concat(output).forEach(function (x) {
        keyInputs += x.shape + "_" + x.getTextureShapeRC();
    });
    var keyUserCode = program.userCode;
    var keyBroadcast = (program.supportsBroadcasting === true).toString();
    var key = program.constructor.name;
    key += '_' + keyBroadcast + '_' + keyInputs + '_' + keyUserCode;
    return key;
}
exports.makeShaderKey = makeShaderKey;
//# sourceMappingURL=gpgpu_math.js.map

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MaxPool2DBackpropProgram = (function () {
    function MaxPool2DBackpropProgram(convInfo) {
        this.variableNames = ['dy', 'maxPos'];
        this.outputShape = convInfo.inShape;
        var dyRows = convInfo.outShape[0];
        var dyCols = convInfo.outShape[1];
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padTop = filterHeight - 1 - convInfo.padInfo.top;
        var padLeft = filterWidth - 1 - convInfo.padInfo.left;
        var lastIndex = filterHeight * filterWidth - 1;
        this.userCode = "\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int d = coords.z;\n\n        ivec2 dyRCCorner = coords.xy - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + strideHeight + ".0;\n\n          if (dyR < 0.0 || dyR >= " + dyRows + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < " + filterWidth + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + strideWidth + ".0;\n\n            if (dyC < 0.0 || dyC >= " + dyCols + ".0 || fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(idyR, idyC, d);\n            int maxPosValue = " + lastIndex + " - int(getMaxPos(idyR, idyC, d));\n\n            // Get the current value, check it against the value from the\n            // position matrix.\n            int curPosValue = wR * " + filterWidth + " + wC;\n            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n            dotProd += dyValue * mask;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return MaxPool2DBackpropProgram;
}());
exports.MaxPool2DBackpropProgram = MaxPool2DBackpropProgram;
//# sourceMappingURL=max_pool_backprop_gpu.js.map

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = __webpack_require__(15);
var MatMulProgram = (function () {
    function MatMulProgram(aShape, bShape, aOrient, bOrient) {
        if (aOrient === void 0) { aOrient = math_1.MatrixOrientation.REGULAR; }
        if (bOrient === void 0) { bOrient = math_1.MatrixOrientation.REGULAR; }
        this.variableNames = ['matrixA', 'matrixB'];
        var outerShapeA = (aOrient === math_1.MatrixOrientation.REGULAR) ? aShape[0] : aShape[1];
        var outerShapeB = (bOrient === math_1.MatrixOrientation.REGULAR) ? bShape[1] : bShape[0];
        this.outputShape = [outerShapeA, outerShapeB];
        var sharedDim = (aOrient === math_1.MatrixOrientation.REGULAR ? aShape[1] : aShape[0]);
        var aSnippetFromOffset = function (vec4Offset, indexVar) {
            return (aOrient === math_1.MatrixOrientation.REGULAR) ?
                "aRow, " + indexVar + " + " + vec4Offset :
                indexVar + " + " + vec4Offset + ", aRow";
        };
        var bSnippetFromOffset = function (vec4Offset, indexVar) {
            return (bOrient === math_1.MatrixOrientation.REGULAR) ?
                indexVar + " + " + vec4Offset + ", bCol" :
                "bCol, " + indexVar + " + " + vec4Offset;
        };
        var sharedDimNearestVec4 = Math.floor(sharedDim / 4) * 4;
        var sharedDimVec4Remainder = sharedDim % 4;
        this.userCode = " float dotARowBCol(int aRow, int bCol) {\n      float result = 0.0;\n      for (int i = 0; i < " + sharedDimNearestVec4 + "; i += 4) {\n        vec4 a = vec4(\n          getMatrixA(" + aSnippetFromOffset(0, 'i') + "),\n          getMatrixA(" + aSnippetFromOffset(1, 'i') + "),\n          getMatrixA(" + aSnippetFromOffset(2, 'i') + "),\n          getMatrixA(" + aSnippetFromOffset(3, 'i') + ")\n        );\n        vec4 b = vec4(\n          getMatrixB(" + bSnippetFromOffset(0, 'i') + "),\n          getMatrixB(" + bSnippetFromOffset(1, 'i') + "),\n          getMatrixB(" + bSnippetFromOffset(2, 'i') + "),\n          getMatrixB(" + bSnippetFromOffset(3, 'i') + ")\n        );\n\n        result += dot(a, b);\n      }\n\n      if (" + (sharedDimVec4Remainder === 1) + ") {\n        result += getMatrixA(" + aSnippetFromOffset(0, sharedDimNearestVec4) + ") *\n          getMatrixB(" + bSnippetFromOffset(0, sharedDimNearestVec4) + ");\n      } else if (" + (sharedDimVec4Remainder === 2) + ") {\n        vec2 a = vec2(\n          getMatrixA(" + aSnippetFromOffset(0, sharedDimNearestVec4) + "),\n          getMatrixA(" + aSnippetFromOffset(1, sharedDimNearestVec4) + ")\n        );\n        vec2 b = vec2(\n          getMatrixB(" + bSnippetFromOffset(0, sharedDimNearestVec4) + "),\n          getMatrixB(" + bSnippetFromOffset(1, sharedDimNearestVec4) + ")\n        );\n        result += dot(a, b);\n      } else if (" + (sharedDimVec4Remainder === 3) + ") {\n        vec3 a = vec3(\n          getMatrixA(" + aSnippetFromOffset(0, sharedDimNearestVec4) + "),\n          getMatrixA(" + aSnippetFromOffset(1, sharedDimNearestVec4) + "),\n          getMatrixA(" + aSnippetFromOffset(2, sharedDimNearestVec4) + ")\n        );\n        vec3 b = vec3(\n          getMatrixB(" + bSnippetFromOffset(0, sharedDimNearestVec4) + "),\n          getMatrixB(" + bSnippetFromOffset(1, sharedDimNearestVec4) + "),\n          getMatrixB(" + bSnippetFromOffset(2, sharedDimNearestVec4) + ")\n        );\n        result += dot(a, b);\n      }\n\n      return result;\n    }\n\n    void main() {\n      ivec2 resRC = getOutputCoords();\n      setOutput(dotARowBCol(resRC.x, resRC.y));\n    }\n    ";
    }
    return MatMulProgram;
}());
exports.MatMulProgram = MatMulProgram;
//# sourceMappingURL=mulmat_gpu.js.map

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MultinomialProgram = (function () {
    function MultinomialProgram(batchSize, numOutcomes, numSamples) {
        this.variableNames = ['probs'];
        this.outputShape = [batchSize, numSamples];
        this.userCode = "\n      uniform float seed;\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n\n        float r = random(seed);\n        float cdf = 0.0;\n\n        for (int i = 0; i < " + (numOutcomes - 1) + "; i++) {\n          cdf += getProbs(batch, i);\n\n          if (r < cdf) {\n            setOutput(float(i));\n            return;\n          }\n        }\n\n        // If no other event happened, last event happened.\n        setOutput(float(" + (numOutcomes - 1) + "));\n      }\n    ";
    }
    MultinomialProgram.prototype.getCustomSetupFunc = function (seed) {
        var _this = this;
        return function (gpgpu, webGLProgram) {
            if (_this.seedLoc == null) {
                _this.seedLoc = gpgpu.getUniformLocation(webGLProgram, 'seed');
            }
            gpgpu.gl.uniform1f(_this.seedLoc, seed);
        };
    };
    return MultinomialProgram;
}());
exports.MultinomialProgram = MultinomialProgram;
//# sourceMappingURL=multinomial_gpu.js.map

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OneHotProgram = (function () {
    function OneHotProgram(numIndices, depth, onValue, offValue) {
        this.variableNames = ['indices'];
        this.outputShape = [numIndices, depth];
        this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int index = round(getIndices(coords.x));\n        setOutput(mix(float(" + offValue + "), float(" + onValue + "),\n                      float(index == coords.y)));\n      }\n    ";
    }
    OneHotProgram.prototype.getCustomSetupFunc = function (seed) {
        var _this = this;
        return function (gpgpu, webGLProgram) {
            if (_this.seedLoc == null) {
                _this.seedLoc = gpgpu.getUniformLocation(webGLProgram, 'seed');
            }
            gpgpu.gl.uniform1f(_this.seedLoc, seed);
        };
    };
    return OneHotProgram;
}());
exports.OneHotProgram = OneHotProgram;
//# sourceMappingURL=onehot_gpu.js.map

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pool2DProgram = (function () {
    function Pool2DProgram(convInfo, poolType, computePositions) {
        this.variableNames = ['x'];
        if (poolType === 'avg' && computePositions) {
            throw new Error('Cannot compute positions for average pool.');
        }
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var xNumRows = convInfo.inShape[0];
        var xNumCols = convInfo.inShape[1];
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        this.outputShape = convInfo.outShape;
        var isAvgPool = poolType === 'avg';
        var initializationValue = '0.0';
        if (!isAvgPool) {
            if (poolType === 'min') {
                initializationValue = '1.0 / 0.0';
            }
            else {
                initializationValue = '-1.0 / 0.0';
            }
        }
        if (computePositions) {
            var compareOp_1 = poolType === 'min' ? '<=' : '>=';
            this.userCode = "\n        const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n        const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n        void main() {\n          ivec3 coords = getOutputCoords();\n          int d = coords.z;\n\n          ivec2 xRCCorner = coords.xy * strides - pads;\n          int xRCorner = xRCCorner.x;\n          int xCCorner = xRCCorner.y;\n\n          // max/min x(?, ?, d) to get y(yR, yC, d).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n          float avgValue = 0.0;\n\n          for (int wR = 0; wR < " + filterHeight + "; wR++) {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= " + xNumRows + ") {\n              continue;\n            }\n\n            for (int wC = 0; wC < " + filterWidth + "; wC++) {\n              int xC = xCCorner + wC;\n\n              if (xC < 0 || xC >= " + xNumCols + ") {\n                continue;\n              }\n\n              float value = getX(xR, xC, d);\n\n              if (isNaN(value)) {\n                setOutput(value);\n                return;\n              }\n\n              // If a min / max value has already been found, use it. If not,\n              // use the current value.\n              float currMinMaxValue = mix(\n                  value, minMaxValue, minMaxValueFound);\n              if (value " + compareOp_1 + " currMinMaxValue) {\n                minMaxValue = value;\n                minMaxValueFound = 1.0;\n                minMaxPosition = wR * " + filterWidth + " + wC;\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      ";
            return;
        }
        var compareOp = poolType === 'min' ? 'min' : 'max';
        var returnValue = poolType + "(" + poolType + "(" + poolType + "(" +
            'minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])';
        if (poolType === 'avg') {
            returnValue = "avgValue / " + filterHeight * filterWidth + ".0";
        }
        var filterWidthNearestVec4 = Math.floor(filterWidth / 4) * 4;
        var filterWidthVec4Remainder = filterWidth % 4;
        var updateSnippet = "\n      if (hasNaN(values)) {\n        setOutput(getNaN(values));\n        return;\n      }\n      if (" + isAvgPool + ") {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = " + compareOp + "(values, minMaxValue);\n      }\n    ";
        this.userCode = "\n      const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n      const float initializationValue = " + initializationValue + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int xR, int xC, int d) {\n        if (xC < 0 || xC >= " + xNumCols + ") {\n          return initializationValue;\n        }\n        return getX(xR, xC, d);\n      }\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int d = coords.z;\n\n        ivec2 xRCCorner = coords.xy * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // max/min x(?, ?, d) to get y(yR, yC, d).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(" + initializationValue + ");\n        float avgValue = 0.0;\n\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= " + xNumRows + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + filterWidthNearestVec4 + "; wC += 4) {\n            int xC = xCCorner + wC;\n\n            vec4 values = vec4(\n              getValue(xR, xC, d),\n              getValue(xR, xC + 1, d),\n              getValue(xR, xC + 2, d),\n              getValue(xR, xC + 3, d)\n            );\n\n            " + updateSnippet + "\n          }\n\n          int xC = xCCorner + " + filterWidthNearestVec4 + ";\n          if (" + (filterWidthVec4Remainder === 1) + ") {\n            vec4 values = vec4(\n              getValue(xR, xC, d),\n              initializationValue,\n              initializationValue,\n              initializationValue\n            );\n            " + updateSnippet + "\n          } else if (" + (filterWidthVec4Remainder === 2) + ") {\n            vec4 values = vec4(\n              getValue(xR, xC, d),\n              getValue(xR, xC + 1, d),\n              initializationValue,\n              initializationValue\n            );\n\n            " + updateSnippet + "\n          } else if (" + (filterWidthVec4Remainder === 3) + ") {\n            vec4 values = vec4(\n              getValue(xR, xC, d),\n              getValue(xR, xC + 1, d),\n              getValue(xR, xC + 2, d),\n              initializationValue\n            );\n\n            " + updateSnippet + "\n          }\n        }\n        setOutput(" + returnValue + ");\n      }\n    ";
    }
    return Pool2DProgram;
}());
exports.Pool2DProgram = Pool2DProgram;
//# sourceMappingURL=pool_gpu.js.map

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReduceProgram = (function () {
    function ReduceProgram(reduceInfo, reduceType) {
        this.variableNames = ['x'];
        var windowSize = reduceInfo.windowSize;
        var batchSize = reduceInfo.batchSize;
        var inSize = reduceInfo.inSize;
        var outSize = Math.ceil(inSize / windowSize);
        this.outputShape = [batchSize, outSize];
        var isReduceSum = reduceType === 'sum';
        var initializationValue = '0.0';
        if (!isReduceSum) {
            if (reduceType === 'min') {
                initializationValue = '1.0 / 0.0';
            }
            else {
                initializationValue = '-1.0 / 0.0';
            }
        }
        var compareOp = reduceType === 'min' ? 'min' : 'max';
        var returnValue = reduceType + "(" + reduceType + "(" + reduceType + "(" +
            'minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])';
        if (reduceType === 'sum') {
            returnValue = "sumValue";
        }
        var windowSizeNearestVec4 = Math.floor(windowSize / 4) * 4;
        var windowSizeVec4Remainder = windowSize % 4;
        var updateSnippet = "\n      if (" + isReduceSum + ") {\n        sumValue += dot(values, ones);\n      } else {\n        if (hasNaN(values)) {\n          setOutput(getNaN(values));\n          return;\n        }\n        minMaxValue = " + compareOp + "(values, minMaxValue);\n      }\n    ";
        var checkOutOfBounds = '';
        if (inSize % windowSize > 0) {
            checkOutOfBounds = "\n        if (inIdx < 0 || inIdx >= " + inSize + ") {\n          return initializationValue;\n        }\n      ";
        }
        this.userCode = "\n      const float initializationValue = " + initializationValue + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int inIdx) {\n        " + checkOutOfBounds + "\n        return getX(batch, inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * " + windowSize + ";\n\n        vec4 minMaxValue = vec4(" + initializationValue + ");\n        float sumValue = 0.0;\n\n        for (int i = 0; i < " + windowSizeNearestVec4 + "; i += 4) {\n          int inIdx = inOffset + i;\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          " + updateSnippet + "\n        }\n\n        int inIdx = inOffset + " + windowSizeNearestVec4 + ";\n        if (" + (windowSizeVec4Remainder === 1) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n          " + updateSnippet + "\n        } else if (" + (windowSizeVec4Remainder === 2) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n          " + updateSnippet + "\n        } else if (" + (windowSizeVec4Remainder === 3) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n          " + updateSnippet + "\n        }\n        setOutput(" + returnValue + ");\n      }\n    ";
    }
    return ReduceProgram;
}());
exports.ReduceProgram = ReduceProgram;
//# sourceMappingURL=reduce_gpu.js.map

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var webgl_util = __webpack_require__(10);
function getRenderRGBShader(gpgpu, destinationWidth) {
    var fragmentShaderSource = "\n    precision highp float;\n    uniform sampler2D source;\n    varying vec2 resultUV;\n\n    const float destinationWidth = " + destinationWidth + ".0;\n    const float a = 1.0;\n\n    void main() {\n      float xr = floor(resultUV.s * destinationWidth) * 3.0;\n      vec3 x = xr + vec3(0, 1, 2);\n\n      float sourceWidth = destinationWidth * 3.0;\n      vec3 u = (x + 0.5) / sourceWidth;\n      float v = 1.0 - resultUV.t;\n\n      float r = texture2D(source, vec2(u[0], v)).r;\n      float g = texture2D(source, vec2(u[1], v)).r;\n      float b = texture2D(source, vec2(u[2], v)).r;\n\n      gl_FragColor = vec4(r, g, b, a);\n    }";
    return gpgpu.createProgram(fragmentShaderSource);
}
exports.getRenderRGBShader = getRenderRGBShader;
function renderToCanvas(gpgpu, renderShader, sourceTex) {
    webgl_util.bindCanvasToFramebuffer(gpgpu.gl);
    renderToFramebuffer(gpgpu, renderShader, sourceTex);
}
exports.renderToCanvas = renderToCanvas;
function renderToFramebuffer(gpgpu, renderShader, sourceTex) {
    gpgpu.setProgram(renderShader);
    var sourceSamplerLocation = webgl_util.getProgramUniformLocationOrThrow(gpgpu.gl, renderShader, 'source');
    gpgpu.setInputMatrixTexture(sourceTex, sourceSamplerLocation, 0);
    gpgpu.executeProgram();
}
exports.renderToFramebuffer = renderToFramebuffer;
//# sourceMappingURL=render_ndarray_gpu_util.js.map

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResizeBilinear3DProgram = (function () {
    function ResizeBilinear3DProgram(inputShape, outputDimensionsRowCol, alignCorners) {
        this.variableNames = ['A'];
        this.outputShape = [];
        var depth = inputShape[2];
        this.outputShape =
            [outputDimensionsRowCol[0], outputDimensionsRowCol[1], depth];
        var effectiveInputShape = alignCorners ?
            [inputShape[0] - 1, inputShape[1] - 1, depth] :
            inputShape;
        var effectiveOutputShape = alignCorners ?
            [this.outputShape[0] - 1, this.outputShape[1] - 1, depth] :
            this.outputShape;
        this.userCode = "\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          " + effectiveInputShape[0] / effectiveOutputShape[0] + ",\n          " + effectiveInputShape[1] / effectiveOutputShape[1] + ");\n      const vec2 inputShapeRC = vec2(" + inputShape[0] + ".0, " + inputShape[1] + ".0);\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        ivec2 yRC = coords.xy;\n        int d = coords.z;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the four integer indices.\n        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);\n        ivec2 sourceCeilRC = ivec2(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        float topLeft = getA(sourceFloorRC.x, sourceFloorRC.y, d);\n        float bottomLeft = getA(sourceCeilRC.x, sourceFloorRC.y, d);\n        float topRight = getA(sourceFloorRC.x, sourceCeilRC.y, d);\n        float bottomRight = getA(sourceCeilRC.x, sourceCeilRC.y, d);\n\n        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);\n\n        float top = topLeft + (topRight - topLeft) * fracRC.y;\n        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;\n        float newValue = top + (bottom - top) * fracRC.x;\n\n        setOutput(newValue);\n      }\n    ";
    }
    return ResizeBilinear3DProgram;
}());
exports.ResizeBilinear3DProgram = ResizeBilinear3DProgram;
//# sourceMappingURL=resize_bilinear_gpu.js.map

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var shader_compiler_1 = __webpack_require__(16);
var SliceProgram = (function () {
    function SliceProgram(destSize) {
        this.variableNames = ['source'];
        this.outputShape = destSize;
        this.rank = destSize.length;
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var sourceCoords = getCoords(this.rank);
        this.userCode = "\n      uniform " + dtype + " start;\n\n      void main() {\n        " + dtype + " sourceLoc = start + getOutputCoords();\n        setOutput(getSource(" + sourceCoords + "));\n      }\n    ";
    }
    SliceProgram.prototype.getCustomSetupFunc = function (start) {
        var _this = this;
        if (start.length !== this.rank) {
            throw Error("The rank (" + this.rank + ") of the program must match the " +
                ("length of start (" + start.length + ")"));
        }
        return function (gpgpu, webGLProgram) {
            if (_this.startLoc == null) {
                _this.startLoc = gpgpu.getUniformLocationNoThrow(webGLProgram, 'start');
                if (_this.startLoc == null) {
                    return;
                }
            }
            if (_this.rank === 1) {
                gpgpu.gl.uniform1i(_this.startLoc, start[0]);
            }
            else if (_this.rank === 2) {
                gpgpu.gl.uniform2i(_this.startLoc, start[0], start[1]);
            }
            else if (_this.rank === 3) {
                gpgpu.gl.uniform3i(_this.startLoc, start[0], start[1], start[2]);
            }
            else if (_this.rank === 4) {
                gpgpu.gl.uniform4i(_this.startLoc, start[0], start[1], start[2], start[3]);
            }
            else {
                throw Error("Slicing for rank " + _this.rank + " is not yet supported");
            }
        };
    };
    return SliceProgram;
}());
exports.SliceProgram = SliceProgram;
function getCoords(rank) {
    if (rank === 1) {
        return 'sourceLoc';
    }
    else if (rank === 2) {
        return 'sourceLoc.x, sourceLoc.y';
    }
    else if (rank === 3) {
        return 'sourceLoc.x, sourceLoc.y, sourceLoc.z';
    }
    else if (rank === 4) {
        return 'sourceLoc.x, sourceLoc.y, sourceLoc.z, sourceLoc.w';
    }
    else {
        throw Error("Slicing for rank " + rank + " is not yet supported");
    }
}
//# sourceMappingURL=slice_gpu.js.map

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TextureManager = (function () {
    function TextureManager(gpgpu) {
        this.gpgpu = gpgpu;
        this.numUsedTextures = 0;
        this.numFreeTextures = 0;
        this.freeTextures = {};
        this.logEnabled = false;
        this.usedTextureCount = {};
    }
    TextureManager.prototype.acquireTexture = function (shapeRC) {
        var shapeKey = getKeyFromTextureShape(shapeRC);
        if (!(shapeKey in this.freeTextures)) {
            this.freeTextures[shapeKey] = [];
        }
        if (!(shapeKey in this.usedTextureCount)) {
            this.usedTextureCount[shapeKey] = 0;
        }
        this.usedTextureCount[shapeKey]++;
        if (this.freeTextures[shapeKey].length > 0) {
            this.numFreeTextures--;
            this.numUsedTextures++;
            this.log();
            return this.freeTextures[shapeKey].shift();
        }
        this.numUsedTextures++;
        this.log();
        return this.gpgpu.createMatrixTexture(shapeRC[0], shapeRC[1]);
    };
    TextureManager.prototype.releaseTexture = function (texture, shape) {
        var shapeKey = getKeyFromTextureShape(shape);
        if (!(shapeKey in this.freeTextures)) {
            this.freeTextures[shapeKey] = [];
        }
        this.freeTextures[shapeKey].push(texture);
        this.numFreeTextures++;
        this.numUsedTextures--;
        this.usedTextureCount[shapeKey]--;
        this.log();
    };
    TextureManager.prototype.log = function () {
        if (!this.logEnabled) {
            return;
        }
        var total = this.numFreeTextures + this.numUsedTextures;
        console.log('Free/Used', this.numFreeTextures + " / " + this.numUsedTextures, "(" + total + ")");
    };
    TextureManager.prototype.getNumUsedTextures = function () {
        return this.numUsedTextures;
    };
    TextureManager.prototype.getNumFreeTextures = function () {
        return this.numFreeTextures;
    };
    TextureManager.prototype.dispose = function () {
        for (var shape in this.freeTextures) {
            if (this.freeTextures.hasOwnProperty(shape)) {
                for (var i = 0; i < this.freeTextures[shape].length; i++) {
                    this.gpgpu.deleteMatrixTexture(this.freeTextures[shape][i]);
                }
            }
        }
    };
    return TextureManager;
}());
exports.TextureManager = TextureManager;
function getKeyFromTextureShape(shapeRowsCol) {
    return shapeRowsCol[0] + "_" + shapeRowsCol[1];
}
//# sourceMappingURL=texture_manager.js.map

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var shader_compiler_1 = __webpack_require__(16);
var TileProgram = (function () {
    function TileProgram(aShape, reps) {
        this.variableNames = ['A'];
        var outputShape = new Array(aShape.length);
        for (var i = 0; i < outputShape.length; i++) {
            outputShape[i] = aShape[i] * reps[i];
        }
        this.outputShape = outputShape;
        this.rank = outputShape.length;
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var sourceCoords = getSourceCoords(aShape);
        this.userCode = "\n      void main() {\n        " + dtype + " resRC = getOutputCoords();\n        setOutput(getA(" + sourceCoords + "));\n      }\n    ";
    }
    return TileProgram;
}());
exports.TileProgram = TileProgram;
function getSourceCoords(aShape) {
    var rank = aShape.length;
    if (rank > 4) {
        throw Error("Tile for rank " + rank + " is not yet supported");
    }
    if (rank === 1) {
        return "imod(resRC, " + aShape[0] + ")";
    }
    var currentCoords = ['resRC.x', 'resRC.y', 'resRC.z', 'resRC.w'];
    var sourceCoords = [];
    for (var i = 0; i < aShape.length; i++) {
        sourceCoords.push("imod(" + currentCoords[i] + ", " + aShape[i] + ")");
    }
    return sourceCoords.join();
}
//# sourceMappingURL=tile_gpu.js.map

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var shader_compiler_1 = __webpack_require__(16);
var TransposeProgram = (function () {
    function TransposeProgram(aShape, newDim) {
        this.variableNames = ['A'];
        var outputShape = new Array(aShape.length);
        for (var i = 0; i < outputShape.length; i++) {
            outputShape[i] = aShape[newDim[i]];
        }
        this.outputShape = outputShape;
        this.rank = outputShape.length;
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var switched = getSwitchedCoords(newDim);
        this.userCode = "\n    void main() {\n      " + dtype + " resRC = getOutputCoords();\n      setOutput(getA(" + switched + "));\n    }\n    ";
    }
    return TransposeProgram;
}());
exports.TransposeProgram = TransposeProgram;
function getSwitchedCoords(newDim) {
    var rank = newDim.length;
    if (rank > 4) {
        throw Error("Transpose for rank " + rank + " is not yet supported");
    }
    var originalOrder = ['resRC.x', 'resRC.y', 'resRC.z', 'resRC.w'];
    var switchedCoords = new Array(rank);
    for (var i = 0; i < newDim.length; i++) {
        switchedCoords[newDim[i]] = originalOrder[i];
    }
    return switchedCoords.join();
}
//# sourceMappingURL=transpose_gpu.js.map

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var environment = __webpack_require__(5);
var environment_1 = __webpack_require__(5);
var math_cpu_1 = __webpack_require__(32);
var math_gpu_1 = __webpack_require__(33);
var util = __webpack_require__(0);
exports.TEST_EPSILON = 1e-2;
function mean(values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
        sum += values[i];
    }
    return sum / values.length;
}
exports.mean = mean;
function standardDeviation(values, mean) {
    var squareDiffSum = 0;
    for (var i = 0; i < values.length; i++) {
        var diff = values[i] - mean;
        squareDiffSum += diff * diff;
    }
    return Math.sqrt(squareDiffSum / values.length);
}
exports.standardDeviation = standardDeviation;
function kurtosis(values) {
    var valuesMean = mean(values);
    var n = values.length;
    var sum2 = 0;
    var sum4 = 0;
    for (var i = 0; i < n; i++) {
        var v = values[i] - valuesMean;
        sum2 += Math.pow(v, 2);
        sum4 += Math.pow(v, 4);
    }
    return (1 / n) * sum4 / Math.pow((1 / n) * sum2, 2) - 3;
}
exports.kurtosis = kurtosis;
function skewness(values) {
    var valuesMean = mean(values);
    var n = values.length;
    var sum2 = 0;
    var sum3 = 0;
    var i = -1;
    while (++i < n) {
        var v = values[i] - valuesMean;
        sum2 += Math.pow(v, 2);
        sum3 += Math.pow(v, 3);
    }
    return (1 / n) * sum3 / Math.pow((1 / (n - 1)) * sum2, 3 / 2);
}
exports.skewness = skewness;
function jarqueBeraNormalityTest(values) {
    var s = skewness(values);
    var k = kurtosis(values);
    var jb = values.length * ((Math.pow(s, 2) / 6) + (Math.pow(k, 2) / 24));
    var CHI_SQUARE_2DEG = 5.991;
    if (jb > CHI_SQUARE_2DEG) {
        throw new Error("Invalid p-value for JB: " + jb);
    }
}
exports.jarqueBeraNormalityTest = jarqueBeraNormalityTest;
function expectArrayInMeanStdRange(actual, expectedMean, expectedStdDev, epsilon) {
    if (epsilon === void 0) { epsilon = exports.TEST_EPSILON; }
    var actualMean = mean(actual);
    expectNumbersClose(actualMean, expectedMean, epsilon);
    expectNumbersClose(standardDeviation(actual, actualMean), expectedStdDev, epsilon);
}
exports.expectArrayInMeanStdRange = expectArrayInMeanStdRange;
function expectArraysClose(actual, expected, epsilon) {
    if (epsilon === void 0) { epsilon = exports.TEST_EPSILON; }
    var aType = actual.constructor.name;
    var bType = expected.constructor.name;
    if (aType !== bType) {
        throw new Error("Arrays are of different type " + aType + " vs " + bType);
    }
    if (actual.length !== expected.length) {
        throw new Error("Matrices have different lengths (" + actual.length + " vs " +
            (expected.length + ")."));
    }
    for (var i = 0; i < expected.length; ++i) {
        var a = actual[i];
        var e = expected[i];
        if (!areClose(a, e, epsilon)) {
            var actualStr = "actual[" + i + "] === " + a;
            var expectedStr = "expected[" + i + "] === " + e;
            throw new Error('Arrays differ: ' + actualStr + ', ' + expectedStr);
        }
    }
}
exports.expectArraysClose = expectArraysClose;
function expectNumbersClose(a, e, epsilon) {
    if (epsilon === void 0) { epsilon = exports.TEST_EPSILON; }
    if (!areClose(a, e, epsilon)) {
        throw new Error("Numbers differ: actual === " + a + ", expected === " + e);
    }
}
exports.expectNumbersClose = expectNumbersClose;
function areClose(a, e, epsilon) {
    if (isNaN(a) && isNaN(e)) {
        return true;
    }
    if (isNaN(a) || isNaN(e) || Math.abs(a - e) > epsilon) {
        return false;
    }
    return true;
}
function expectValuesInRange(actual, low, high) {
    for (var i = 0; i < actual.length; i++) {
        if (actual[i] < low || actual[i] > high) {
            throw new Error("Value out of range:" + actual[i] + " low: " + low + ", high: " + high);
        }
    }
}
exports.expectValuesInRange = expectValuesInRange;
function randomArrayInRange(n, minValue, maxValue) {
    var v = new Float32Array(n);
    var range = maxValue - minValue;
    for (var i = 0; i < n; ++i) {
        v[i] = (Math.random() * range) + minValue;
    }
    return v;
}
exports.randomArrayInRange = randomArrayInRange;
function makeIdentity(n) {
    var i = new Float32Array(n * n);
    for (var j = 0; j < n; ++j) {
        i[(j * n) + j] = 1;
    }
    return i;
}
exports.makeIdentity = makeIdentity;
function cpuMultiplyMatrix(a, aRow, aCol, b, bRow, bCol) {
    var result = new Float32Array(aRow * bCol);
    for (var r = 0; r < aRow; ++r) {
        var aOffset = (r * aCol);
        var cOffset = (r * bCol);
        for (var c = 0; c < bCol; ++c) {
            var d = 0;
            for (var k = 0; k < aCol; ++k) {
                d += a[aOffset + k] * b[(k * bCol) + c];
            }
            result[cOffset + c] = d;
        }
    }
    return result;
}
exports.cpuMultiplyMatrix = cpuMultiplyMatrix;
function cpuDotProduct(a, b) {
    if (a.length !== b.length) {
        throw new Error('cpuDotProduct: incompatible vectors.');
    }
    var d = 0;
    for (var i = 0; i < a.length; ++i) {
        d += a[i] * b[i];
    }
    return d;
}
exports.cpuDotProduct = cpuDotProduct;
function describeMathCPU(name, tests, featuresList) {
    var testNameBase = 'math_cpu.' + name;
    describeWithFeaturesAndExecutor(testNameBase, tests, function (testName, tests, features) { return executeMathTests(testName, tests, function () { return new math_cpu_1.NDArrayMathCPU(); }, features); }, featuresList);
}
exports.describeMathCPU = describeMathCPU;
function describeMathGPU(name, tests, featuresList) {
    var testNameBase = 'math_gpu.' + name;
    describeWithFeaturesAndExecutor(testNameBase, tests, function (testName, tests, features) { return executeMathTests(testName, tests, function () { return new math_gpu_1.NDArrayMathGPU(); }, features); }, featuresList);
}
exports.describeMathGPU = describeMathGPU;
function describeCustom(name, tests, featuresList, customBeforeEach, customAfterEach) {
    describeWithFeaturesAndExecutor(name, [tests], function (testName, tests, features) { return executeTests(testName, tests, features, customBeforeEach, customAfterEach); }, featuresList);
}
exports.describeCustom = describeCustom;
function describeWithFeaturesAndExecutor(testNameBase, tests, executor, featuresList) {
    if (featuresList != null) {
        featuresList.forEach(function (features) {
            var testName = testNameBase + ' ' + JSON.stringify(features);
            executor(testName, tests, features);
        });
    }
    else {
        executor(testNameBase, tests);
    }
}
var PROMISE_IT = function (name, testFunc) {
    it(name, function (done) {
        var result = testFunc();
        if (result instanceof Promise) {
            result.then(done, function (e) {
                fail(e);
                done();
            });
        }
        else {
            done();
        }
    });
};
function executeMathTests(testName, tests, mathFactory, features) {
    var math;
    var customBeforeEach = function () {
        math = mathFactory();
        math.startScope();
    };
    var customAfterEach = function () {
        math.endScope(null);
        math.dispose();
    };
    var customIt = function (name, testFunc) {
        PROMISE_IT(name, function () { return testFunc(math); });
    };
    executeTests(testName, tests, features, customBeforeEach, customAfterEach, customIt);
}
exports.executeMathTests = executeMathTests;
function executeTests(testName, tests, features, customBeforeEach, customAfterEach, customIt) {
    if (customIt === void 0) { customIt = PROMISE_IT; }
    describe(testName, function () {
        beforeEach(function () {
            if (features != null) {
                environment.setEnvironment(new environment_1.Environment(features));
            }
            if (customBeforeEach != null) {
                customBeforeEach();
            }
        });
        afterEach(function () {
            if (customAfterEach != null) {
                customAfterEach();
            }
            if (features != null) {
                environment.setEnvironment(new environment_1.Environment());
            }
        });
        tests.forEach(function (test) { return test(customIt); });
    });
}
exports.executeTests = executeTests;
function assertIsNan(val, dtype) {
    if (!util.isValNaN(val, dtype)) {
        throw new Error("Value " + val + " does not represent NaN for dtype " + dtype);
    }
}
exports.assertIsNan = assertIsNan;
//# sourceMappingURL=test_util.js.map

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var version = '0.3.11';
exports.version = version;
//# sourceMappingURL=version.js.map

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function(dtype) {
  switch (dtype) {
    case 'int8':
      return Int8Array
    case 'int16':
      return Int16Array
    case 'int32':
      return Int32Array
    case 'uint8':
      return Uint8Array
    case 'uint16':
      return Uint16Array
    case 'uint32':
      return Uint32Array
    case 'float32':
      return Float32Array
    case 'float64':
      return Float64Array
    case 'array':
      return Array
  }
}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(111);

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(113);

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(116);

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(115);

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(114);

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(112);

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(117);

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(12)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(12)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(12)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(12)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(12)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(4) && __webpack_require__(12)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return impl; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  __webpack_require__(4)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
var global = this,
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(120);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return seedrandom; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// Original implementation sourced via:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding#Appendix.3A_Decode_a_Base64_string_to_Uint8Array_or_ArrayBuffer

var dtype = __webpack_require__(109)
var ceil = Math.ceil

module.exports.encode = encode
module.exports.decode = decode

function b64int(n) {
  return n < 26 ? n + 65
    : n < 52 ? n + 71
    : n < 62 ? n - 4
    : n === 62 ? 43
    : n === 63 ? 47
    : 65
}

function intb64(chr) {
  return chr > 64 && chr < 91 ? chr - 65
    : chr > 96 && chr < 123 ? chr - 71
    : chr > 47 && chr < 58 ? chr + 4
    : chr === 43 ? 62
    : chr === 47 ? 63
    : 0
}

function encode(input) {
  if (!(input instanceof Uint8Array)) {
    input = new Uint8Array(input.buffer)
  }

  var length = input.length
  var output = ""

  for (var value = 0, idx = 0; idx < length; idx++) {
    var bit = idx % 3

    value |= input[idx] << (16 >>> bit & 24)
    if (idx > 0 && !((idx * 4 / 3) % 76)) {
      output += "\r\n"
    }

    if (bit === 2 || input.length - idx === 1) {
      output += String.fromCharCode(
          b64int(value >>> 18 & 63)
        , b64int(value >>> 12 & 63)
        , b64int(value >>> 6 & 63)
        , b64int(value & 63)
      )
      value = 0
    }
  }

  return output.replace(/A(?=A$|$)/g, "=")
}

function decode(input, output) {
  input = input.replace(/[^A-Za-z0-9\+\/]/g, "")

  var inputLength = input.length
  var outputLength = inputLength * 3 + 1 >> 2
  var outidx = 0
  var inidx = 0
  var rvalue

  if (!output) output = new Uint8Array(outputLength)
  if (typeof output === 'string') {
    var type = output
    var bytes = parseInt(type.match(/[0-9]+/g), 10) / 8
    var offset = ceil(outputLength / bytes) * bytes - outputLength
    if (bytes) outputLength += offset
    output = new Uint8Array(outputLength)
    rvalue = new (dtype(type))(output.buffer)
  } else {
    rvalue = output
  }

  for (var value = 0; inidx < inputLength; inidx++) {
    var bit = inidx & 3

    value |= intb64(
      input.charCodeAt(inidx)
    ) << (18 - 6 * bit)

    if (bit === 3 || inputLength - inidx === 1) {
      for (var sbit = 0; sbit < 3 && outidx < outputLength; sbit++) {
        output[outidx++] = value >>> (16 >>> sbit & 24) & 255
      }
      value = 0
    }
  }

  return rvalue
}


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)))

/***/ }),
/* 120 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map