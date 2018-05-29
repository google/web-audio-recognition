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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
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
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
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
 * @public
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
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
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
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
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

/***/ "./node_modules/fft.js/lib/fft.js":
/*!****************************************!*\
  !*** ./node_modules/fft.js/lib/fft.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function FFT(size) {
  this.size = size | 0;
  if (this.size <= 1 || (this.size & (this.size - 1)) !== 0)
    throw new Error('FFT size must be a power of two and bigger than 1');

  this._csize = size << 1;

  // NOTE: Use of `var` is intentional for old V8 versions
  var table = new Array(this.size * 2);
  for (var i = 0; i < table.length; i += 2) {
    const angle = Math.PI * i / this.size;
    table[i] = Math.cos(angle);
    table[i + 1] = -Math.sin(angle);
  }
  this.table = table;

  // Find size's power of two
  var power = 0;
  for (var t = 1; this.size > t; t <<= 1)
    power++;

  // Calculate initial step's width:
  //   * If we are full radix-4 - it is 2x smaller to give inital len=8
  //   * Otherwise it is the same as `power` to give len=4
  this._width = power % 2 === 0 ? power - 1 : power;

  // Pre-compute bit-reversal patterns
  this._bitrev = new Array(1 << this._width);
  for (var j = 0; j < this._bitrev.length; j++) {
    this._bitrev[j] = 0;
    for (var shift = 0; shift < this._width; shift += 2) {
      var revShift = this._width - shift - 2;
      this._bitrev[j] |= ((j >>> shift) & 3) << revShift;
    }
  }

  this._out = null;
  this._data = null;
  this._inv = 0;
}
module.exports = FFT;

FFT.prototype.fromComplexArray = function fromComplexArray(complex, storage) {
  var res = storage || new Array(complex.length >>> 1);
  for (var i = 0; i < complex.length; i += 2)
    res[i >>> 1] = complex[i];
  return res;
};

FFT.prototype.createComplexArray = function createComplexArray() {
  const res = new Array(this._csize);
  for (var i = 0; i < res.length; i++)
    res[i] = 0;
  return res;
};

FFT.prototype.toComplexArray = function toComplexArray(input, storage) {
  var res = storage || this.createComplexArray();
  for (var i = 0; i < res.length; i += 2) {
    res[i] = input[i >>> 1];
    res[i + 1] = 0;
  }
  return res;
};

FFT.prototype.completeSpectrum = function completeSpectrum(spectrum) {
  var size = this._csize;
  var half = size >>> 1;
  for (var i = 2; i < half; i += 2) {
    spectrum[size - i] = spectrum[i];
    spectrum[size - i + 1] = -spectrum[i + 1];
  }
};

FFT.prototype.transform = function transform(out, data) {
  if (out === data)
    throw new Error('Input and output buffers must be different');

  this._out = out;
  this._data = data;
  this._inv = 0;
  this._transform4();
  this._out = null;
  this._data = null;
};

FFT.prototype.realTransform = function realTransform(out, data) {
  if (out === data)
    throw new Error('Input and output buffers must be different');

  this._out = out;
  this._data = data;
  this._inv = 0;
  this._realTransform4();
  this._out = null;
  this._data = null;
};

FFT.prototype.inverseTransform = function inverseTransform(out, data) {
  if (out === data)
    throw new Error('Input and output buffers must be different');

  this._out = out;
  this._data = data;
  this._inv = 1;
  this._transform4();
  for (var i = 0; i < out.length; i++)
    out[i] /= this.size;
  this._out = null;
  this._data = null;
};

// radix-4 implementation
//
// NOTE: Uses of `var` are intentional for older V8 version that do not
// support both `let compound assignments` and `const phi`
FFT.prototype._transform4 = function _transform4() {
  var out = this._out;
  var size = this._csize;

  // Initial step (permute and transform)
  var width = this._width;
  var step = 1 << width;
  var len = (size / step) << 1;

  var outOff;
  var t;
  var bitrev = this._bitrev;
  if (len === 4) {
    for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
      const off = bitrev[t];
      this._singleTransform2(outOff, off, step);
    }
  } else {
    // len === 8
    for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
      const off = bitrev[t];
      this._singleTransform4(outOff, off, step);
    }
  }

  // Loop through steps in decreasing order
  var inv = this._inv ? -1 : 1;
  var table = this.table;
  for (step >>= 2; step >= 2; step >>= 2) {
    len = (size / step) << 1;
    var quarterLen = len >>> 2;

    // Loop through offsets in the data
    for (outOff = 0; outOff < size; outOff += len) {
      // Full case
      var limit = outOff + quarterLen;
      for (var i = outOff, k = 0; i < limit; i += 2, k += step) {
        const A = i;
        const B = A + quarterLen;
        const C = B + quarterLen;
        const D = C + quarterLen;

        // Original values
        const Ar = out[A];
        const Ai = out[A + 1];
        const Br = out[B];
        const Bi = out[B + 1];
        const Cr = out[C];
        const Ci = out[C + 1];
        const Dr = out[D];
        const Di = out[D + 1];

        // Middle values
        const MAr = Ar;
        const MAi = Ai;

        const tableBr = table[k];
        const tableBi = inv * table[k + 1];
        const MBr = Br * tableBr - Bi * tableBi;
        const MBi = Br * tableBi + Bi * tableBr;

        const tableCr = table[2 * k];
        const tableCi = inv * table[2 * k + 1];
        const MCr = Cr * tableCr - Ci * tableCi;
        const MCi = Cr * tableCi + Ci * tableCr;

        const tableDr = table[3 * k];
        const tableDi = inv * table[3 * k + 1];
        const MDr = Dr * tableDr - Di * tableDi;
        const MDi = Dr * tableDi + Di * tableDr;

        // Pre-Final values
        const T0r = MAr + MCr;
        const T0i = MAi + MCi;
        const T1r = MAr - MCr;
        const T1i = MAi - MCi;
        const T2r = MBr + MDr;
        const T2i = MBi + MDi;
        const T3r = inv * (MBr - MDr);
        const T3i = inv * (MBi - MDi);

        // Final values
        const FAr = T0r + T2r;
        const FAi = T0i + T2i;

        const FCr = T0r - T2r;
        const FCi = T0i - T2i;

        const FBr = T1r + T3i;
        const FBi = T1i - T3r;

        const FDr = T1r - T3i;
        const FDi = T1i + T3r;

        out[A] = FAr;
        out[A + 1] = FAi;
        out[B] = FBr;
        out[B + 1] = FBi;
        out[C] = FCr;
        out[C + 1] = FCi;
        out[D] = FDr;
        out[D + 1] = FDi;
      }
    }
  }
};

// radix-2 implementation
//
// NOTE: Only called for len=4
FFT.prototype._singleTransform2 = function _singleTransform2(outOff, off,
                                                             step) {
  const out = this._out;
  const data = this._data;

  const evenR = data[off];
  const evenI = data[off + 1];
  const oddR = data[off + step];
  const oddI = data[off + step + 1];

  const leftR = evenR + oddR;
  const leftI = evenI + oddI;
  const rightR = evenR - oddR;
  const rightI = evenI - oddI;

  out[outOff] = leftR;
  out[outOff + 1] = leftI;
  out[outOff + 2] = rightR;
  out[outOff + 3] = rightI;
};

// radix-4
//
// NOTE: Only called for len=8
FFT.prototype._singleTransform4 = function _singleTransform4(outOff, off,
                                                             step) {
  const out = this._out;
  const data = this._data;
  const inv = this._inv ? -1 : 1;
  const step2 = step * 2;
  const step3 = step * 3;

  // Original values
  const Ar = data[off];
  const Ai = data[off + 1];
  const Br = data[off + step];
  const Bi = data[off + step + 1];
  const Cr = data[off + step2];
  const Ci = data[off + step2 + 1];
  const Dr = data[off + step3];
  const Di = data[off + step3 + 1];

  // Pre-Final values
  const T0r = Ar + Cr;
  const T0i = Ai + Ci;
  const T1r = Ar - Cr;
  const T1i = Ai - Ci;
  const T2r = Br + Dr;
  const T2i = Bi + Di;
  const T3r = inv * (Br - Dr);
  const T3i = inv * (Bi - Di);

  // Final values
  const FAr = T0r + T2r;
  const FAi = T0i + T2i;

  const FBr = T1r + T3i;
  const FBi = T1i - T3r;

  const FCr = T0r - T2r;
  const FCi = T0i - T2i;

  const FDr = T1r - T3i;
  const FDi = T1i + T3r;

  out[outOff] = FAr;
  out[outOff + 1] = FAi;
  out[outOff + 2] = FBr;
  out[outOff + 3] = FBi;
  out[outOff + 4] = FCr;
  out[outOff + 5] = FCi;
  out[outOff + 6] = FDr;
  out[outOff + 7] = FDi;
};

// Real input radix-4 implementation
FFT.prototype._realTransform4 = function _realTransform4() {
  var out = this._out;
  var size = this._csize;

  // Initial step (permute and transform)
  var width = this._width;
  var step = 1 << width;
  var len = (size / step) << 1;

  var outOff;
  var t;
  var bitrev = this._bitrev;
  if (len === 4) {
    for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
      const off = bitrev[t];
      this._singleRealTransform2(outOff, off >>> 1, step >>> 1);
    }
  } else {
    // len === 8
    for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
      const off = bitrev[t];
      this._singleRealTransform4(outOff, off >>> 1, step >>> 1);
    }
  }

  // Loop through steps in decreasing order
  var inv = this._inv ? -1 : 1;
  var table = this.table;
  for (step >>= 2; step >= 2; step >>= 2) {
    len = (size / step) << 1;
    var halfLen = len >>> 1;
    var quarterLen = halfLen >>> 1;
    var hquarterLen = quarterLen >>> 1;

    // Loop through offsets in the data
    for (outOff = 0; outOff < size; outOff += len) {
      for (var i = 0, k = 0; i <= hquarterLen; i += 2, k += step) {
        var A = outOff + i;
        var B = A + quarterLen;
        var C = B + quarterLen;
        var D = C + quarterLen;

        // Original values
        var Ar = out[A];
        var Ai = out[A + 1];
        var Br = out[B];
        var Bi = out[B + 1];
        var Cr = out[C];
        var Ci = out[C + 1];
        var Dr = out[D];
        var Di = out[D + 1];

        // Middle values
        var MAr = Ar;
        var MAi = Ai;

        var tableBr = table[k];
        var tableBi = inv * table[k + 1];
        var MBr = Br * tableBr - Bi * tableBi;
        var MBi = Br * tableBi + Bi * tableBr;

        var tableCr = table[2 * k];
        var tableCi = inv * table[2 * k + 1];
        var MCr = Cr * tableCr - Ci * tableCi;
        var MCi = Cr * tableCi + Ci * tableCr;

        var tableDr = table[3 * k];
        var tableDi = inv * table[3 * k + 1];
        var MDr = Dr * tableDr - Di * tableDi;
        var MDi = Dr * tableDi + Di * tableDr;

        // Pre-Final values
        var T0r = MAr + MCr;
        var T0i = MAi + MCi;
        var T1r = MAr - MCr;
        var T1i = MAi - MCi;
        var T2r = MBr + MDr;
        var T2i = MBi + MDi;
        var T3r = inv * (MBr - MDr);
        var T3i = inv * (MBi - MDi);

        // Final values
        var FAr = T0r + T2r;
        var FAi = T0i + T2i;

        var FBr = T1r + T3i;
        var FBi = T1i - T3r;

        out[A] = FAr;
        out[A + 1] = FAi;
        out[B] = FBr;
        out[B + 1] = FBi;

        // Output final middle point
        if (i === 0) {
          var FCr = T0r - T2r;
          var FCi = T0i - T2i;
          out[C] = FCr;
          out[C + 1] = FCi;
          continue;
        }

        // Do not overwrite ourselves
        if (i === hquarterLen)
          continue;

        // In the flipped case:
        // MAi = -MAi
        // MBr=-MBi, MBi=-MBr
        // MCr=-MCr
        // MDr=MDi, MDi=MDr
        var ST0r = T1r;
        var ST0i = -T1i;
        var ST1r = T0r;
        var ST1i = -T0i;
        var ST2r = -inv * T3i;
        var ST2i = -inv * T3r;
        var ST3r = -inv * T2i;
        var ST3i = -inv * T2r;

        var SFAr = ST0r + ST2r;
        var SFAi = ST0i + ST2i;

        var SFBr = ST1r + ST3i;
        var SFBi = ST1i - ST3r;

        var SA = outOff + quarterLen - i;
        var SB = outOff + halfLen - i;

        out[SA] = SFAr;
        out[SA + 1] = SFAi;
        out[SB] = SFBr;
        out[SB + 1] = SFBi;
      }
    }
  }
};

// radix-2 implementation
//
// NOTE: Only called for len=4
FFT.prototype._singleRealTransform2 = function _singleRealTransform2(outOff,
                                                                     off,
                                                                     step) {
  const out = this._out;
  const data = this._data;

  const evenR = data[off];
  const oddR = data[off + step];

  const leftR = evenR + oddR;
  const rightR = evenR - oddR;

  out[outOff] = leftR;
  out[outOff + 1] = 0;
  out[outOff + 2] = rightR;
  out[outOff + 3] = 0;
};

// radix-4
//
// NOTE: Only called for len=8
FFT.prototype._singleRealTransform4 = function _singleRealTransform4(outOff,
                                                                     off,
                                                                     step) {
  const out = this._out;
  const data = this._data;
  const inv = this._inv ? -1 : 1;
  const step2 = step * 2;
  const step3 = step * 3;

  // Original values
  const Ar = data[off];
  const Br = data[off + step];
  const Cr = data[off + step2];
  const Dr = data[off + step3];

  // Pre-Final values
  const T0r = Ar + Cr;
  const T1r = Ar - Cr;
  const T2r = Br + Dr;
  const T3r = inv * (Br - Dr);

  // Final values
  const FAr = T0r + T2r;

  const FBr = T1r;
  const FBi = -T3r;

  const FCr = T0r - T2r;

  const FDr = T1r;
  const FDi = T3r;

  out[outOff] = FAr;
  out[outOff + 1] = 0;
  out[outOff + 2] = FBr;
  out[outOff + 3] = FBi;
  out[outOff + 4] = FCr;
  out[outOff + 5] = 0;
  out[outOff + 6] = FDr;
  out[outOff + 7] = FDi;
};


/***/ }),

/***/ "./src/AudioUtils.ts":
/*!***************************!*\
  !*** ./src/AudioUtils.ts ***!
  \***************************/
/*! no static exports found */
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
Object.defineProperty(exports, "__esModule", { value: true });
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
        const fftr = null;
        const transform = fftr.forward(y);
        fftr.dispose();
        return transform;
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
exports.default = AudioUtils;
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
function resample(audioBuffer, targetSr) {
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
exports.resample = resample;
/**
 * Pads or cuts audio samples to a length
 * @param samples audio samples to pad or cut
 * @param length desired length
 */
function samplesToLength(samples, length) {
    if (samples.length > length) {
        samples = samples.slice(0, length);
    }
    else if (samples.length < length) {
        let padded = new Float32Array(length);
        padded.set(samples);
        padded.set(new Float32Array(length - samples.length).fill(0), samples.length);
        samples = padded;
    }
    return samples;
}
exports.samplesToLength = samplesToLength;


/***/ }),

/***/ "./src/MelSpectrogram.ts":
/*!*******************************!*\
  !*** ./src/MelSpectrogram.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FFT = __webpack_require__(/*! fft.js */ "./node_modules/fft.js/lib/fft.js");
function magSpectrogram(stft, power) {
    //console.log(`magSpectrogram on ${stft.length} x ${stft[0].length} power=${power}`);
    const spec = stft.map(fft => pow(mag(fft), power));
    const nFft = stft[0].length - 1;
    return [spec, nFft];
}
exports.magSpectrogram = magSpectrogram;
function stft(y, params) {
    const nFft = params.nFft || 2048;
    const winLength = params.winLength || nFft;
    const hopLength = params.hopLength || Math.floor(winLength / 4);
    let fftWindow = hannWindow(winLength);
    // Pad the window to be the size of nFft.
    fftWindow = padCenterToLength(fftWindow, nFft);
    // Pad the time series so that the frames are centered.
    y = padReflect(y, Math.floor(nFft / 2));
    // Window the time series.
    const yFrames = frame(y, nFft, hopLength);
    //console.log(`Split audio into ${yFrames.length} frames of ${yFrames[0].length} each.`);
    // Pre-allocate the STFT matrix.
    const stftMatrix = [];
    const width = yFrames.length;
    const height = nFft + 2;
    //console.log(`Creating STFT matrix of size ${width} x ${height}.`);
    for (let i = 0; i < width; i++) {
        // Each column is a Float32Array of size height.
        const col = new Float32Array(height);
        stftMatrix[i] = col;
    }
    for (let i = 0; i < width; i++) {
        // Populate the STFT matrix.
        const winBuffer = applyWindow(yFrames[i], fftWindow);
        const col = fft(winBuffer);
        stftMatrix[i].set(col.slice(0, height));
    }
    return stftMatrix;
}
exports.stft = stft;
function spectrogram(y, params) {
    if (!params.power) {
        params.power = 1;
    }
    const stftMatrix = stft(y, params);
    const [spec, nFft] = magSpectrogram(stftMatrix, params.power);
    return spec;
}
exports.spectrogram = spectrogram;
function melSpectrogram(y, params) {
    if (!params.power) {
        params.power = 2.0;
    }
    const stftMatrix = stft(y, params);
    const [spec, nFft] = magSpectrogram(stftMatrix, params.power);
    params.nFft = nFft;
    const melBasis = createMelFilterbank(params);
    return applyWholeFilterbank(spec, melBasis);
}
exports.melSpectrogram = melSpectrogram;
function applyWholeFilterbank(spec, filterbank) {
    // Apply a point-wise dot product between the array of arrays.
    const out = [];
    for (let i = 0; i < spec.length; i++) {
        out[i] = applyFilterbank(spec[i], filterbank);
    }
    return out;
}
exports.applyWholeFilterbank = applyWholeFilterbank;
function applyFilterbank(mags, filterbank) {
    if (mags.length != filterbank[0].length) {
        throw new Error(`Each entry in filterbank should have dimensions ` +
            `matching FFT. |mags| = ${mags.length}, ` +
            `|filterbank[0]| = ${filterbank[0].length}.`);
    }
    // Apply each filter to the whole FFT signal to get one value.
    let out = new Float32Array(filterbank.length);
    for (let i = 0; i < filterbank.length; i++) {
        // To calculate filterbank energies we multiply each filterbank with the
        // power spectrum.
        const win = applyWindow(mags, filterbank[i]);
        // Then add up the coefficents.
        out[i] = sum(win);
    }
    return out;
}
exports.applyFilterbank = applyFilterbank;
function applyWindow(buffer, win) {
    if (buffer.length != win.length) {
        console.error(`Buffer length ${buffer.length} != window length ${win.length}.`);
        return;
    }
    let out = new Float32Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
        out[i] = win[i] * buffer[i];
    }
    return out;
}
exports.applyWindow = applyWindow;
function padCenterToLength(data, length) {
    // If data is longer than length, error!
    if (data.length > length) {
        throw new Error('Data is longer than length.');
    }
    const paddingLeft = Math.floor((length - data.length) / 2);
    const paddingRight = length - data.length - paddingLeft;
    return padConstant(data, [paddingLeft, paddingRight]);
}
exports.padCenterToLength = padCenterToLength;
function padConstant(data, padding) {
    let padLeft, padRight;
    if (typeof (padding) == 'object') {
        [padLeft, padRight] = padding;
    }
    else {
        padLeft = padRight = padding;
    }
    const out = new Float32Array(data.length + padLeft + padRight);
    out.set(data, padLeft);
    return out;
}
exports.padConstant = padConstant;
function padReflect(data, padding) {
    const out = padConstant(data, padding);
    for (let i = 0; i < padding; i++) {
        // Pad the beginning with reflected values.
        out[i] = out[2 * padding - i];
        // Pad the end with reflected values.
        out[out.length - i - 1] = out[out.length - 2 * padding + i - 1];
    }
    return out;
}
exports.padReflect = padReflect;
/**
 * Given a timeseries, returns an array of timeseries that are windowed
 * according to the params specified.
 */
function frame(data, frameLength, hopLength) {
    const bufferCount = Math.floor((data.length - frameLength) / hopLength) + 1;
    let buffers = range(bufferCount).map(x => new Float32Array(frameLength));
    for (let i = 0; i < bufferCount; i++) {
        const ind = i * hopLength;
        const buffer = data.slice(ind, ind + frameLength);
        buffers[i].set(buffer);
        // In the end, we will likely have an incomplete buffer, which we should
        // just ignore.
        if (buffer.length != frameLength) {
            continue;
        }
    }
    return buffers;
}
exports.frame = frame;
function createMelFilterbank(params) {
    const fMin = params.fMin || 0;
    const fMax = params.fMax || params.sampleRate / 2;
    const nMels = params.nMels || 128;
    const nFft = params.nFft || 2048;
    // Center freqs of each FFT band.
    const fftFreqs = calculateFftFreqs(params.sampleRate, nFft);
    // (Pseudo) center freqs of each Mel band.
    const melFreqs = calculateMelFreqs(nMels + 2, fMin, fMax);
    const melDiff = internalDiff(melFreqs);
    const ramps = outerSubtract(melFreqs, fftFreqs);
    const filterSize = ramps[0].length;
    const weights = [];
    for (let i = 0; i < nMels; i++) {
        weights[i] = new Float32Array(filterSize);
        for (let j = 0; j < ramps[i].length; j++) {
            const lower = -ramps[i][j] / melDiff[i];
            const upper = ramps[i + 2][j] / melDiff[i + 1];
            const weight = Math.max(0, Math.min(lower, upper));
            weights[i][j] = weight;
        }
    }
    // Slaney-style mel is scaled to be approx constant energy per channel.
    for (let i = 0; i < weights.length; i++) {
        // How much energy per channel.
        const enorm = 2.0 / (melFreqs[2 + i] - melFreqs[i]);
        // Normalize by that amount.
        weights[i] = weights[i].map(val => val * enorm);
    }
    return weights;
}
exports.createMelFilterbank = createMelFilterbank;
function fft(y) {
    const fft = new FFT(y.length);
    const out = fft.createComplexArray();
    const data = fft.toComplexArray(y);
    fft.transform(out, data);
    return out;
}
exports.fft = fft;
function hannWindow(length) {
    let win = new Float32Array(length);
    for (let i = 0; i < length; i++) {
        win[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
    }
    return win;
}
exports.hannWindow = hannWindow;
function array(arr) {
    const out = new Float32Array(arr.length);
    out.set(arr);
    return out;
}
exports.array = array;
const MIN_VAL = -10;
function logGtZero(val) {
    // Ensure that the log argument is nonnegative.
    const offset = Math.exp(MIN_VAL);
    return Math.log(val + offset);
}
exports.logGtZero = logGtZero;
function sum(array) {
    return array.reduce(function (a, b) { return a + b; });
}
exports.sum = sum;
function range(count) {
    let out = [];
    for (let i = 0; i < count; i++) {
        out.push(i);
    }
    return out;
}
exports.range = range;
function linearSpace(start, end, count) {
    // Include start and endpoints.
    const delta = (end - start) / (count - 1);
    let out = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        out[i] = start + delta * i;
    }
    return out;
}
exports.linearSpace = linearSpace;
/**
 * Given an interlaced complex array (y_i is real, y_(i+1) is imaginary),
 * calculates the energies. Output is half the size.
 */
function mag(y) {
    let out = new Float32Array(y.length / 2);
    for (let i = 0; i < y.length / 2; i++) {
        out[i] = Math.sqrt(y[i * 2] * y[i * 2] + y[i * 2 + 1] * y[i * 2 + 1]);
    }
    return out;
}
exports.mag = mag;
function powerToDb(spec, amin = 1e-10, refValue = 1.0, topDb = 80.0) {
    const width = spec.length;
    const height = spec[0].length;
    const logSpec = [];
    for (let i = 0; i < width; i++) {
        logSpec[i] = new Float32Array(height);
    }
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const val = spec[i][j];
            let logVal = 10.0 * Math.log10(Math.max(amin, val));
            logVal -= 10.0 * Math.log10(Math.max(amin, refValue));
            logSpec[i][j] = logVal;
        }
    }
    if (topDb) {
        if (topDb < 0) {
            throw new Error(`topDb must be non-negative.`);
        }
        for (let i = 0; i < width; i++) {
            const maxVal = max(logSpec[i]);
            for (let j = 0; j < height; j++) {
                logSpec[i][j] = Math.max(logSpec[i][j], maxVal - topDb);
            }
        }
    }
    return logSpec;
}
exports.powerToDb = powerToDb;
function hzToMel(hz) {
    return 1125.0 * Math.log(1 + hz / 700.0);
}
exports.hzToMel = hzToMel;
function melToHz(mel) {
    return 700.0 * (Math.exp(mel / 1125.0) - 1);
}
exports.melToHz = melToHz;
function freqToBin(freq, nFft, sr) {
    return Math.floor((nFft + 1) * freq / (sr / 2));
}
function flatten2D(spec) {
    const length = spec[0].length * spec.length;
    const out = new Float32Array(length);
    const height = spec[0].length;
    const width = spec.length;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            out[j * width + i] = spec[i][j];
        }
    }
    return out;
}
exports.flatten2D = flatten2D;
function calculateFftFreqs(sampleRate, nFft) {
    return linearSpace(0, sampleRate / 2, Math.floor(1 + nFft / 2));
}
exports.calculateFftFreqs = calculateFftFreqs;
function calculateMelFreqs(nMels, fMin, fMax) {
    const melMin = hzToMel(fMin);
    const melMax = hzToMel(fMax);
    // Construct linearly spaced array of nMel intervals, between melMin and
    // melMax.
    const mels = linearSpace(melMin, melMax, nMels);
    const hzs = mels.map(mel => melToHz(mel));
    return hzs;
}
exports.calculateMelFreqs = calculateMelFreqs;
function internalDiff(arr) {
    const out = new Float32Array(arr.length - 1);
    for (let i = 0; i < arr.length; i++) {
        out[i] = arr[i + 1] - arr[i];
    }
    return out;
}
exports.internalDiff = internalDiff;
function outerSubtract(arr, arr2) {
    const out = [];
    for (let i = 0; i < arr.length; i++) {
        out[i] = new Float32Array(arr2.length);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            out[i][j] = arr[i] - arr2[j];
        }
    }
    return out;
}
exports.outerSubtract = outerSubtract;
function pow(arr, power) {
    return arr.map(v => Math.pow(v, power));
}
exports.pow = pow;
function max(arr) {
    return arr.reduce((a, b) => Math.max(a, b));
}
exports.max = max;


/***/ }),

/***/ "./src/PlotGraphs.ts":
/*!***************************!*\
  !*** ./src/PlotGraphs.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
const sr = 44100;
const nyquist = sr / 2;
function plotAudio(y, layout) {
    let t = y.map((value, index) => (index / sr));
    return plotXY(t, y, layout);
}
exports.plotAudio = plotAudio;
function plotCoeffs(y, layout) {
    let ind = y.map((value, index) => index);
    return plotXY(ind, y, layout);
}
exports.plotCoeffs = plotCoeffs;
function plotFFT(fftMags, layout) {
    // Convert magnitudes to dB.
    const dbs = fftMags.map(val => 20 * Math.log10(val));
    const times = fftMags.map((value, index) => index / fftMags.length * nyquist);
    return plotXY(times, fftMags, layout);
}
exports.plotFFT = plotFFT;
function plotFilterbank(filterbank, layout) {
    let filter = filterbank[0];
    const inds = filter.map((value, index) => index);
    return plotXYs(inds, filterbank, layout, 8000);
}
exports.plotFilterbank = plotFilterbank;
function plotSpectrogram(spec, samplesPerSlice, layout) {
    // The STFT as given is an Float32Array[]. We need to render that matrix as an
    // image.
    return plotImage(spec, samplesPerSlice, layout);
}
exports.plotSpectrogram = plotSpectrogram;
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
exports.downloadSpectrogramImage = downloadSpectrogramImage;
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
exports.createLayout = createLayout;


/***/ }),

/***/ "./src/StreamingFeatureExtractor.ts":
/*!******************************************!*\
  !*** ./src/StreamingFeatureExtractor.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
const MelSpectrogramNode_1 = __webpack_require__(/*! ./worklet/MelSpectrogramNode */ "./src/worklet/MelSpectrogramNode.ts");
;
const audioCtx = new AudioContext();
/**
 * Opens an audio stream and extracts Mel spectrogram from it, suitable for
 * running inference in a TensorFlow.js environment.
 */
class StreamingFeatureExtractor extends eventemitter3_1.EventEmitter {
    constructor(specParams, streamParams) {
        super();
        // Where to store the latest spectrogram.
        this.spectrogram = [];
        // Are we streaming right now?
        this.isStreaming = false;
        // When was the last time we sent out features.
        this.lastEmitTime = new Date().valueOf();
        this.specParams = specParams;
        this.streamParams = streamParams;
        // Calculate how many columns to store in the spectrogram. Each column
        // is spaced hopLength samples apart, and represents an FFT of winLength.
        const specSamples = streamParams.duration * specParams.sampleRate;
        this.columnLength = Math.floor((specSamples - specParams.hopLength) /
            specParams.winLength);
        console.log(`Created StreamingFeatureExtractor with columnLength ${this.columnLength}.`);
    }
    getSpectrogram() {
        return this.spectrogram;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Open an audio input stream.
            const constraints = { audio: {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                }, video: false };
            const stream = yield navigator.mediaDevices.getUserMedia(constraints);
            this.stream = stream;
            // Create a MelSpectrogramNode (AudioWorklet).
            yield audioCtx.audioWorklet.addModule('dist/worklet.js');
            this.melSpecNode = new MelSpectrogramNode_1.MelSpectrogramNode(audioCtx, this.specParams);
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(this.melSpecNode);
            this.melSpecNode.connect(audioCtx.destination);
            this.melSpecNode.emitter.on('spectrogram', spec => {
                for (let column of spec) {
                    this.spectrogram.push(column);
                }
                let overLimit = this.spectrogram.length - this.columnLength;
                if (overLimit > 0) {
                    // Remove the excess elements in the array.
                    this.spectrogram.splice(0, overLimit);
                    // The buffer is full, see if we should emit.
                    const now = new Date().valueOf();
                    const elapsed = (now - this.lastEmitTime) / 1000;
                    if (elapsed > this.streamParams.delay) {
                        this.emit('feature', this.spectrogram);
                        this.lastEmitTime = now;
                    }
                }
            });
            this.isStreaming = true;
        });
    }
    stop() {
        for (let track of this.stream.getTracks()) {
            track.stop();
        }
        this.melSpecNode.disconnect(audioCtx.destination);
        this.stream = null;
        this.isStreaming = false;
    }
}
exports.default = StreamingFeatureExtractor;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
const AudioUtils_1 = __webpack_require__(/*! ./AudioUtils */ "./src/AudioUtils.ts");
const melspec = __webpack_require__(/*! ./MelSpectrogram */ "./src/MelSpectrogram.ts");
const StreamingFeatureExtractor_1 = __webpack_require__(/*! ./StreamingFeatureExtractor */ "./src/StreamingFeatureExtractor.ts");
const PlotGraphs_1 = __webpack_require__(/*! ./PlotGraphs */ "./src/PlotGraphs.ts");
const nFft = 2048;
const hopLength = 1024;
const nMels = 30;
let arrayBuffer;
let melSpec;
const outEl = document.querySelector('#out');
const streamEl = document.querySelector('#stream');
const loadEl = document.querySelector('#load');
const downloadEl = document.querySelector('#download');
const playEl = document.querySelector('#play');
function analyzeAudioBuffer(audioBuffer) {
    analyzeArrayBuffer(audioBuffer.getChannelData(0));
}
function analyzeArrayBuffer(buffer) {
    //const start = 0.2 * 44100;
    //arrayBuffer = buffer.slice(start, start + 1024);
    arrayBuffer = buffer;
    // Clear the output element.
    outEl.innerHTML = '';
    const audioEl = PlotGraphs_1.plotAudio(arrayBuffer, PlotGraphs_1.createLayout('Time domain', 'time (s)', 'pressure'));
    outEl.appendChild(audioEl);
    // Calculate FFT from ArrayBuffer.
    const bufferPow2 = arrayBuffer.slice(0, pow2LessThan(arrayBuffer.length));
    const fft = melspec.fft(bufferPow2);
    const fftEnergies = melspec.mag(fft);
    const fftEl = PlotGraphs_1.plotFFT(fftEnergies, PlotGraphs_1.createLayout('Frequency domain', 'frequency (Hz)', 'power (dB)', { logX: false }));
    outEl.appendChild(fftEl);
    // Calculate a Mel filterbank.
    const melFilterbank = melspec.createMelFilterbank({
        sampleRate: 44100,
        nFft: bufferPow2.length,
        nMels: 32,
    });
    const melEl = PlotGraphs_1.plotFilterbank(melFilterbank, PlotGraphs_1.createLayout('Mel filterbank', 'frequency (Hz)', 'percent'));
    outEl.appendChild(melEl);
    // Calculate STFT from the ArrayBuffer.
    const stftEnergies = melspec.spectrogram(arrayBuffer, { sampleRate: 44100 });
    const specEl = PlotGraphs_1.plotSpectrogram(stftEnergies, hopLength, PlotGraphs_1.createLayout('STFT energy spectrogram', 'time (s)', 'frequency (Hz)', { logY: true }));
    outEl.appendChild(specEl);
    // Calculate mel energy spectrogram from STFT.
    melSpec = melspec.melSpectrogram(arrayBuffer, { sampleRate: 44100, nMels, hopLength, nFft });
    const melSpecEl = PlotGraphs_1.plotSpectrogram(melSpec, hopLength, PlotGraphs_1.createLayout('Mel energy spectrogram', 'time (s)', 'mel bin'));
    outEl.appendChild(melSpecEl);
}
function main() {
    // Load a short sine buffer.
    AudioUtils_1.default.loadExampleBuffer().then(analyzeAudioBuffer);
}
function min(arr) {
    return arr.reduce((a, b) => Math.min(a, b));
}
function max(arr) {
    return arr.reduce((a, b) => Math.max(a, b));
}
window.addEventListener('load', main);
const specParams = {
    sampleRate: 16000,
    winLength: 2048,
    hopLength: 512,
    fMin: 30,
    nMels: 229
};
const streamParams = {
    duration: 2,
    delay: 1,
};
const streamFeature = new StreamingFeatureExtractor_1.default(specParams, streamParams);
streamEl.addEventListener('click', e => {
    if (streamFeature.isStreaming) {
        streamFeature.stop();
        streamEl.innerHTML = 'Stream';
    }
    else {
        streamFeature.start();
        streamFeature.on('feature', melSpec => {
            const nativeHopLength = hopLength * (44100.0 / 16000.0);
            const melSpecEl = PlotGraphs_1.plotSpectrogram(melSpec, nativeHopLength, PlotGraphs_1.createLayout('Mel energy spectrogram', 'time (s)', 'mel bin'));
            outEl.innerHTML = '';
            outEl.appendChild(melSpecEl);
        });
        streamEl.innerHTML = 'Stop streaming';
    }
});
downloadEl.addEventListener('click', e => {
    // Download the mel spectrogram.
    PlotGraphs_1.downloadSpectrogramImage(melSpec);
});
loadEl.addEventListener('change', function (e) {
    const files = this.files;
    const fileUrl = URL.createObjectURL(files[0]);
    AudioUtils_1.default.loadBuffer(fileUrl).then(analyzeAudioBuffer);
});
playEl.addEventListener('click', e => {
    AudioUtils_1.default.playbackArrayBuffer(arrayBuffer);
});
function pow2LessThan(value) {
    const exp = Math.log2(value);
    return Math.pow(2, Math.floor(exp));
}


/***/ }),

/***/ "./src/worklet/MelSpectrogramNode.ts":
/*!*******************************************!*\
  !*** ./src/worklet/MelSpectrogramNode.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
;
/**
 * MelSpectrogramNode.
 */
class MelSpectrogramNode extends AudioWorkletNode {
    constructor(context, config) {
        super(context, 'mel-spectrogram-processor');
        this.emitter = new eventemitter3_1.EventEmitter();
        // Listen to messages from the MelSpectrogramProcessor.
        this.port.onmessage = this.handleMessage.bind(this);
        // Send configuration parameters to the MelSpectrogramProcessor.
        this.port.postMessage({ config });
    }
    handleMessage(event) {
        if (event.data.features) {
            const spec = event.data.features;
            console.log(`Mel spec of size ${spec.length} x ${spec[0].length}.`);
            this.emitter.emit('spectrogram', spec);
        }
    }
}
exports.MelSpectrogramNode = MelSpectrogramNode;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map