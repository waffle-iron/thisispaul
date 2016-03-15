(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],2:[function(require,module,exports){
var identity = require('./identity');

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the array-like object.
 */
function baseCastFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = baseCastFunction;

},{"./identity":17}],3:[function(require,module,exports){
var baseForOwn = require('./_baseForOwn'),
    createBaseEach = require('./_createBaseEach');

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./_baseForOwn":5,"./_createBaseEach":10}],4:[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":11}],5:[function(require,module,exports){
var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"./_baseFor":4,"./keys":27}],6:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var getPrototypeOf = Object.getPrototypeOf;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return hasOwnProperty.call(object, key) ||
    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
}

module.exports = baseHas;

},{}],7:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

module.exports = baseKeys;

},{}],8:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],9:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],10:[function(require,module,exports){
var isArrayLike = require('./isArrayLike');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./isArrayLike":20}],11:[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],12:[function(require,module,exports){
var baseProperty = require('./_baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./_baseProperty":8}],13:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isLength = require('./isLength'),
    isString = require('./isString');

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

module.exports = indexKeys;

},{"./_baseTimes":9,"./isArguments":18,"./isArray":19,"./isLength":23,"./isString":26}],14:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],15:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],16:[function(require,module,exports){
var arrayEach = require('./_arrayEach'),
    baseCastFunction = require('./_baseCastFunction'),
    baseEach = require('./_baseEach'),
    isArray = require('./isArray');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
 * for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => logs `1` then `2`
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'a' then 'b' (iteration order is not guaranteed)
 */
function forEach(collection, iteratee) {
  return (typeof iteratee == 'function' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, baseCastFunction(iteratee));
}

module.exports = forEach;

},{"./_arrayEach":1,"./_baseCastFunction":2,"./_baseEach":3,"./isArray":19}],17:[function(require,module,exports){
/**
 * This method returns the first argument given to it.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],18:[function(require,module,exports){
var isArrayLikeObject = require('./isArrayLikeObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

module.exports = isArguments;

},{"./isArrayLikeObject":21}],19:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],20:[function(require,module,exports){
var getLength = require('./_getLength'),
    isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./_getLength":12,"./isFunction":22,"./isLength":23}],21:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":20,"./isObjectLike":25}],22:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;

},{"./isObject":24}],23:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],24:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],25:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],26:[function(require,module,exports){
var isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;

},{"./isArray":19,"./isObjectLike":25}],27:[function(require,module,exports){
var baseHas = require('./_baseHas'),
    baseKeys = require('./_baseKeys'),
    indexKeys = require('./_indexKeys'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isPrototype = require('./_isPrototype');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"./_baseHas":6,"./_baseKeys":7,"./_indexKeys":13,"./_isIndex":14,"./_isPrototype":15,"./isArrayLike":20}],28:[function(require,module,exports){
/* eslint-disable no-unused-vars */
'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],29:[function(require,module,exports){
/* svg.js 1.1.0-5-gc66d24a - svg selector inventor polyfill regex default color array pointarray patharray number viewbox bbox rbox element parent container fx relative event defs group arrange mask clip gradient pattern doc shape symbol use rect ellipse line poly path image text textpath nested hyperlink marker sugar set data memory helpers - svgjs.com/license */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.SVG = factory();
  }
}(this, function() {

  var SVG = this.SVG = function(element) {
    if (SVG.supported) {
      element = new SVG.Doc(element)
  
      if (!SVG.parser)
        SVG.prepare(element)
  
      return element
    }
  }
  
  // Default namespaces
  SVG.ns    = 'http://www.w3.org/2000/svg'
  SVG.xmlns = 'http://www.w3.org/2000/xmlns/'
  SVG.xlink = 'http://www.w3.org/1999/xlink'
  
  // Element id sequence
  SVG.did  = 1000
  
  // Get next named element id
  SVG.eid = function(name) {
    return 'Svgjs' + name.charAt(0).toUpperCase() + name.slice(1) + (SVG.did++)
  }
  
  // Method for element creation
  SVG.create = function(name) {
    /* create element */
    var element = document.createElementNS(this.ns, name)
    
    /* apply unique id */
    element.setAttribute('id', this.eid(name))
    
    return element
  }
  
  // Method for extending objects
  SVG.extend = function() {
    var modules, methods, key, i
    
    /* get list of modules */
    modules = [].slice.call(arguments)
    
    /* get object with extensions */
    methods = modules.pop()
    
    for (i = modules.length - 1; i >= 0; i--)
      if (modules[i])
        for (key in methods)
          modules[i].prototype[key] = methods[key]
  
    /* make sure SVG.Set inherits any newly added methods */
    if (SVG.Set && SVG.Set.inherit)
      SVG.Set.inherit()
  }
  
  // Initialize parsing element
  SVG.prepare = function(element) {
    /* select document body and create invisible svg element */
    var body = document.getElementsByTagName('body')[0]
      , draw = (body ? new SVG.Doc(body) : element.nested()).size(2, 0)
      , path = SVG.create('path')
  
    /* insert parsers */
    draw.node.appendChild(path)
  
    /* create parser object */
    SVG.parser = {
      body: body || element.parent
    , draw: draw.style('opacity:0;position:fixed;left:100%;top:100%;overflow:hidden')
    , poly: draw.polyline().node
    , path: path
    }
  }
  
  // svg support test
  SVG.supported = (function() {
    return !! document.createElementNS &&
           !! document.createElementNS(SVG.ns,'svg').createSVGRect
  })()
  
  if (!SVG.supported) return false


  SVG.get = function(id) {
    var node = document.getElementById(idFromReference(id) || id)
    if (node) return node.instance
  }

  SVG.invent = function(config) {
  	/* create element initializer */
  	var initializer = typeof config.create == 'function' ?
  		config.create :
  		function() {
  			this.constructor.call(this, SVG.create(config.create))
  		}
  
  	/* inherit prototype */
  	if (config.inherit)
  		initializer.prototype = new config.inherit
  
  	/* extend with methods */
  	if (config.extend)
  		SVG.extend(initializer, config.extend)
  
  	/* attach construct method to parent */
  	if (config.construct)
  		SVG.extend(config.parent || SVG.Container, config.construct)
  
  	return initializer
  }

  if (typeof CustomEvent !== 'function') {
    // Code from: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
    var CustomEvent = function(event, options) {
      options = options || { bubbles: false, cancelable: false, detail: undefined }
      var e = document.createEvent('CustomEvent')
      e.initCustomEvent(event, options.bubbles, options.cancelable, options.detail)
      return e
    }
  
    CustomEvent.prototype = window.Event.prototype
  
    window.CustomEvent = CustomEvent
  }
  
  // requestAnimationFrame / cancelAnimationFrame Polyfill with fallback based on Paul Irish
  (function(w) {
    var lastTime = 0
    var vendors = ['moz', 'webkit']
    
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      w.requestAnimationFrame = w[vendors[x] + 'RequestAnimationFrame']
      w.cancelAnimationFrame  = w[vendors[x] + 'CancelAnimationFrame'] ||
                                w[vendors[x] + 'CancelRequestAnimationFrame']
    }
   
    w.requestAnimationFrame = w.requestAnimationFrame || 
      function(callback) {
        var currTime = new Date().getTime()
        var timeToCall = Math.max(0, 16 - (currTime - lastTime))
        
        var id = w.setTimeout(function() {
          callback(currTime + timeToCall)
        }, timeToCall)
        
        lastTime = currTime + timeToCall
        return id
      }
   
    w.cancelAnimationFrame = w.cancelAnimationFrame || w.clearTimeout;
  
  }(window))

  SVG.regex = {
    /* parse unit value */
    unit:         /^(-?[\d\.]+)([a-z%]{0,2})$/
    
    /* parse hex value */
  , hex:          /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
    
    /* parse rgb value */
  , rgb:          /rgb\((\d+),(\d+),(\d+)\)/
    
    /* parse reference id */
  , reference:    /#([a-z0-9\-_]+)/i
  
    /* test hex value */
  , isHex:        /^#[a-f0-9]{3,6}$/i
    
    /* test rgb value */
  , isRgb:        /^rgb\(/
    
    /* test css declaration */
  , isCss:        /[^:]+:[^;]+;?/
    
    /* test for blank string */
  , isBlank:      /^(\s+)?$/
    
    /* test for numeric string */
  , isNumber:     /^-?[\d\.]+$/
  
    /* test for percent value */
  , isPercent:    /^-?[\d\.]+%$/
  
    /* test for image url */
  , isImage:      /\.(jpg|jpeg|png|gif)(\?[^=]+.*)?/i
    
    /* test for namespaced event */
  , isEvent:      /^[\w]+.[\w]+$/
  
    // The following regex are used to parse the d attribute of a path
  
    // Replaces all negative exponents
  , negExp:           /e\-/gi
  
    // Replaces all comma
  , comma:            /,/g
  
    // Replaces all hyphens
  , hyphen:           /\-/g
  
    // Replaces and tests for all path letters
  , pathLetters:      /[MLHVCSQTAZ]/gi
  
    // yes we need this one, too
  , isPathLetter:     /[MLHVCSQTAZ]/i
  
    // split at whitespaces
  , whitespaces:      /\s+/
  
    // matches X
  , X:                /X/g
  }

  SVG.defaults = {
    // Default matrix
    matrix:       '1 0 0 1 0 0'
    
    // Default attribute values
  , attrs: {
      /* fill and stroke */
      'fill-opacity':     1
    , 'stroke-opacity':   1
    , 'stroke-width':     0
    , 'stroke-linejoin':  'miter'
    , 'stroke-linecap':   'butt'
    , fill:               '#000000'
    , stroke:             '#000000'
    , opacity:            1
      /* position */
    , x:                  0
    , y:                  0
    , cx:                 0
    , cy:                 0
      /* size */  
    , width:              0
    , height:             0
      /* radius */  
    , r:                  0
    , rx:                 0
    , ry:                 0
      /* gradient */  
    , offset:             0
    , 'stop-opacity':     1
    , 'stop-color':       '#000000'
      /* text */
    , 'font-size':        16
    , 'font-family':      'Helvetica, Arial, sans-serif'
    , 'text-anchor':      'start'
    }
    
    // Default transformation values
  , trans: function() {
      return {
        /* translate */
        x:        0
      , y:        0
        /* scale */
      , scaleX:   1
      , scaleY:   1
        /* rotate */
      , rotation: 0
        /* skew */
      , skewX:    0
      , skewY:    0
        /* matrix */
      , matrix:   this.matrix
      , a:        1
      , b:        0
      , c:        0
      , d:        1
      , e:        0
      , f:        0
      }
    }
    
  }

  SVG.Color = function(color) {
    var match
    
    /* initialize defaults */
    this.r = 0
    this.g = 0
    this.b = 0
    
    /* parse color */
    if (typeof color === 'string') {
      if (SVG.regex.isRgb.test(color)) {
        /* get rgb values */
        match = SVG.regex.rgb.exec(color.replace(/\s/g,''))
        
        /* parse numeric values */
        this.r = parseInt(match[1])
        this.g = parseInt(match[2])
        this.b = parseInt(match[3])
        
      } else if (SVG.regex.isHex.test(color)) {
        /* get hex values */
        match = SVG.regex.hex.exec(fullHex(color))
  
        /* parse numeric values */
        this.r = parseInt(match[1], 16)
        this.g = parseInt(match[2], 16)
        this.b = parseInt(match[3], 16)
  
      }
      
    } else if (typeof color === 'object') {
      this.r = color.r
      this.g = color.g
      this.b = color.b
      
    }
      
  }
  
  SVG.extend(SVG.Color, {
    // Default to hex conversion
    toString: function() {
      return this.toHex()
    }
    // Build hex value
  , toHex: function() {
      return '#'
        + compToHex(this.r)
        + compToHex(this.g)
        + compToHex(this.b)
    }
    // Build rgb value
  , toRgb: function() {
      return 'rgb(' + [this.r, this.g, this.b].join() + ')'
    }
    // Calculate true brightness
  , brightness: function() {
      return (this.r / 255 * 0.30)
           + (this.g / 255 * 0.59)
           + (this.b / 255 * 0.11)
    }
    // Make color morphable
  , morph: function(color) {
      this.destination = new SVG.Color(color)
  
      return this
    }
    // Get morphed color at given position
  , at: function(pos) {
      /* make sure a destination is defined */
      if (!this.destination) return this
  
      /* normalise pos */
      pos = pos < 0 ? 0 : pos > 1 ? 1 : pos
  
      /* generate morphed color */
      return new SVG.Color({
        r: ~~(this.r + (this.destination.r - this.r) * pos)
      , g: ~~(this.g + (this.destination.g - this.g) * pos)
      , b: ~~(this.b + (this.destination.b - this.b) * pos)
      })
    }
    
  })
  
  // Testers
  
  // Test if given value is a color string
  SVG.Color.test = function(color) {
    color += ''
    return SVG.regex.isHex.test(color)
        || SVG.regex.isRgb.test(color)
  }
  
  // Test if given value is a rgb object
  SVG.Color.isRgb = function(color) {
    return color && typeof color.r == 'number'
                 && typeof color.g == 'number'
                 && typeof color.b == 'number'
  }
  
  // Test if given value is a color
  SVG.Color.isColor = function(color) {
    return SVG.Color.isRgb(color) || SVG.Color.test(color)
  }

  SVG.Array = function(array, fallback) {
    array = (array || []).valueOf()
  
    /* if array is empty and fallback is provided, use fallback */
    if (array.length == 0 && fallback)
      array = fallback.valueOf()
  
    /* parse array */
    this.value = this.parse(array)
  }
  
  SVG.extend(SVG.Array, {
    // Make array morphable
    morph: function(array) {
      this.destination = this.parse(array)
  
      /* normalize length of arrays */
      if (this.value.length != this.destination.length) {
        var lastValue       = this.value[this.value.length - 1]
          , lastDestination = this.destination[this.destination.length - 1]
  
        while(this.value.length > this.destination.length)
          this.destination.push(lastDestination)
        while(this.value.length < this.destination.length)
          this.value.push(lastValue)
      }
  
      return this
    }
    // Clean up any duplicate points
  , settle: function() {
      /* find all unique values */
      for (var i = 0, il = this.value.length, seen = []; i < il; i++)
        if (seen.indexOf(this.value[i]) == -1)
          seen.push(this.value[i])
  
      /* set new value */
      return this.value = seen
    }
    // Get morphed array at given position
  , at: function(pos) {
      /* make sure a destination is defined */
      if (!this.destination) return this
  
      /* generate morphed array */
      for (var i = 0, il = this.value.length, array = []; i < il; i++)
        array.push(this.value[i] + (this.destination[i] - this.value[i]) * pos)
  
      return new SVG.Array(array)
    }
    // Convert array to string
  , toString: function() {
      return this.value.join(' ')
    }
    // Real value
  , valueOf: function() {
      return this.value
    }
    // Parse whitespace separated string
  , parse: function(array) {
      array = array.valueOf()
  
      /* if already is an array, no need to parse it */
      if (Array.isArray(array)) return array
  
      return this.split(array)
    }
    // Strip unnecessary whitespace
  , split: function(string) {
      return string.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g,'').split(' ') 
    }
    // Reverse array
  , reverse: function() {
      this.value.reverse()
  
      return this
    }
  
  })
  


  SVG.PointArray = function() {
    this.constructor.apply(this, arguments)
  }
  
  // Inherit from SVG.Array
  SVG.PointArray.prototype = new SVG.Array
  
  SVG.extend(SVG.PointArray, {
    // Convert array to string
    toString: function() {
      /* convert to a poly point string */
      for (var i = 0, il = this.value.length, array = []; i < il; i++)
        array.push(this.value[i].join(','))
  
      return array.join(' ')
    }
    // Get morphed array at given position
  , at: function(pos) {
      /* make sure a destination is defined */
      if (!this.destination) return this
  
      /* generate morphed point string */
      for (var i = 0, il = this.value.length, array = []; i < il; i++)
        array.push([
          this.value[i][0] + (this.destination[i][0] - this.value[i][0]) * pos
        , this.value[i][1] + (this.destination[i][1] - this.value[i][1]) * pos
        ])
  
      return new SVG.PointArray(array)
    }
    // Parse point string
  , parse: function(array) {
      array = array.valueOf()
  
      /* if already is an array, no need to parse it */
      if (Array.isArray(array)) return array
  
      /* split points */
      array = this.split(array)
  
      /* parse points */
      for (var i = 0, il = array.length, p, points = []; i < il; i++) {
        p = array[i].split(',')
        points.push([parseFloat(p[0]), parseFloat(p[1])])
      }
  
      return points
    }
    // Move point string
  , move: function(x, y) {
      var box = this.bbox()
  
      /* get relative offset */
      x -= box.x
      y -= box.y
  
      /* move every point */
      if (!isNaN(x) && !isNaN(y))
        for (var i = this.value.length - 1; i >= 0; i--)
          this.value[i] = [this.value[i][0] + x, this.value[i][1] + y]
  
      return this
    }
    // Resize poly string
  , size: function(width, height) {
      var i, box = this.bbox()
  
      /* recalculate position of all points according to new size */
      for (i = this.value.length - 1; i >= 0; i--) {
        this.value[i][0] = ((this.value[i][0] - box.x) * width)  / box.width  + box.x
        this.value[i][1] = ((this.value[i][1] - box.y) * height) / box.height + box.y
      }
  
      return this
    }
    // Get bounding box of points
  , bbox: function() {
      SVG.parser.poly.setAttribute('points', this.toString())
  
      return SVG.parser.poly.getBBox()
    }
  
  })

  SVG.PathArray = function(array, fallback) {
    this.constructor.call(this, array, fallback)
  }
  
  // Inherit from SVG.Array
  SVG.PathArray.prototype = new SVG.Array
  
  SVG.extend(SVG.PathArray, {
    // Convert array to string
    toString: function() {
      return arrayToString(this.value)
    }
    // Move path string
  , move: function(x, y) {
      // get bounding box of current situation
      var box = this.bbox()
  		
      /* get relative offset */
      x -= box.x
      y -= box.y
  
      // get relative offset
      if (!isNaN(x) && !isNaN(y)) {
        // move every point
        for (var l, i = this.value.length - 1; i >= 0; i--) {
          l = this.value[i][0]
  
          if (l == 'M' || l == 'L' || l == 'T')  {
            this.value[i][1] += x
            this.value[i][2] += y
  
          } else if (l == 'H')  {
            this.value[i][1] += x
  
          } else if (l == 'V')  {
            this.value[i][1] += y
  
          } else if (l == 'C' || l == 'S' || l == 'Q')  {
            this.value[i][1] += x
            this.value[i][2] += y
            this.value[i][3] += x
            this.value[i][4] += y
  
            if (l == 'C')  {
              this.value[i][5] += x
              this.value[i][6] += y
            }
  
          } else if (l == 'A')  {
            this.value[i][6] += x
            this.value[i][7] += y
          }
  
        }
      }
  
      return this
    }
    // Resize path string
  , size: function(width, height) {
      // get bounding box of current situation
      var i, l, box = this.bbox()
  
      // recalculate position of all points according to new size
      for (i = this.value.length - 1; i >= 0; i--) {
        l = this.value[i][0]
  
        if (l == 'M' || l == 'L' || l == 'T')  {
          this.value[i][1] = ((this.value[i][1] - box.x) * width)  / box.width  + box.x
          this.value[i][2] = ((this.value[i][2] - box.y) * height) / box.height + box.y
  
        } else if (l == 'H')  {
          this.value[i][1] = ((this.value[i][1] - box.x) * width)  / box.width  + box.x
  
        } else if (l == 'V')  {
          this.value[i][1] = ((this.value[i][1] - box.y) * height) / box.height + box.y
  
        } else if (l == 'C' || l == 'S' || l == 'Q')  {
          this.value[i][1] = ((this.value[i][1] - box.x) * width)  / box.width  + box.x
          this.value[i][2] = ((this.value[i][2] - box.y) * height) / box.height + box.y
          this.value[i][3] = ((this.value[i][3] - box.x) * width)  / box.width  + box.x
          this.value[i][4] = ((this.value[i][4] - box.y) * height) / box.height + box.y
  
          if (l == 'C')  {
            this.value[i][5] = ((this.value[i][5] - box.x) * width)  / box.width  + box.x
            this.value[i][6] = ((this.value[i][6] - box.y) * height) / box.height + box.y
          }
  
        } else if (l == 'A')  {
          // resize radii
          this.value[i][1] = (this.value[i][1] * width)  / box.width
          this.value[i][2] = (this.value[i][2] * height) / box.height
  
          // move position values
          this.value[i][6] = ((this.value[i][6] - box.x) * width)  / box.width  + box.x
          this.value[i][7] = ((this.value[i][7] - box.y) * height) / box.height + box.y
        }
  
      }
  
      return this
    }
    // Absolutize and parse path to array
  , parse: function(array) {
      // if it's already a patharray, no need to parse it
      if (array instanceof SVG.PathArray) return array.valueOf()
  
      // prepare for parsing
      var i, x0, y0, s, seg, arr
        , x = 0
        , y = 0
        , paramCnt = { 'M':2, 'L':2, 'H':1, 'V':1, 'C':6, 'S':4, 'Q':4, 'T':2, 'A':7 }
  
      if(typeof array == 'string'){
  
        array = array
          .replace(SVG.regex.negExp, 'X')         // replace all negative exponents with certain char
          .replace(SVG.regex.pathLetters, ' $& ') // put some room between letters and numbers
          .replace(SVG.regex.hyphen, ' -')        // add space before hyphen
          .replace(SVG.regex.comma, ' ')          // unify all spaces
          .replace(SVG.regex.X, 'e-')             // add back the expoent
          .trim()                                 // trim
          .split(SVG.regex.whitespaces)           // split into array
  
        // at this place there could be parts like ['3.124.854.32'] because we could not determine the point as seperator till now
        // we fix this elements in the next loop
        for(i = array.length; --i;){
          if(array[i].indexOf('.') != array[i].lastIndexOf('.')){
            var split = array[i].split('.') // split at the point
            var first = [split.shift(), split.shift()].join('.') // join the first number together
            array.splice.apply(array, [i, 1].concat(first, split.map(function(el){ return '.'+el }))) // add first and all other entries back to array
          }
        }
          
      }else{
        array = array.reduce(function(prev, curr){
          return [].concat.apply(prev, curr)
        }, [])
      }
  
      // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]
  
      var arr = []
  
      do{
  
        // Test if we have a path letter
        if(SVG.regex.isPathLetter.test(array[0])){
          s = array[0]
          array.shift()
          // If last letter was a move command and we got no new, it defaults to [L]ine
        }else if(s == 'M'){
          s = 'L'
        }else if(s == 'm'){
          s = 'l'
        }
  
        // add path letter as first element
        seg = [s.toUpperCase()]
  
        // push all necessary parameters to segment
        for(i = 0; i < paramCnt[seg[0]]; ++i){
          seg.push(parseFloat(array.shift()))
        }
  
        // upper case
        if(s == seg[0]){
  
          if(s == 'M' || s == 'L' || s == 'C' || s == 'Q'){
            x = seg[paramCnt[seg[0]]-1]
            y = seg[paramCnt[seg[0]]]
          }else if(s == 'V'){
            y = seg[1]
          }else if(s == 'H'){
            x = seg[1]
          }else if(s == 'A'){
            x = seg[6]
            y = seg[7]
          }
  
          // lower case
        }else{
  
          // convert relative to absolute values
          if(s == 'm' || s == 'l' || s == 'c' || s == 's' || s == 'q' || s == 't'){
  
            seg[1] += x
            seg[2] += y
  
            if(seg[3] != null){
              seg[3] += x
              seg[4] += y
            }
  
            if(seg[5] != null){
              seg[5] += x
              seg[6] += y
            }
  
            // move pointer
            x = seg[paramCnt[seg[0]]-1]
            y = seg[paramCnt[seg[0]]]
  
          }else if(s == 'v'){
            seg[1] += y
            y = seg[1]
          }else if(s == 'h'){
            seg[1] += x
            x = seg[1]
          }else if(s == 'a'){
            seg[6] += x
            seg[7] += y
            x = seg[6]
            y = seg[7]
          }
  
        }
  
        if(seg[0] == 'M'){
          x0 = x
          y0 = y
        }
  
        if(seg[0] == 'Z'){
          x = x0
          y = y0
        }
  
        arr.push(seg)
  
      }while(array.length)
  
      return arr
  
    }
    // Get bounding box of path
  , bbox: function() {
      SVG.parser.path.setAttribute('d', this.toString())
  
      return SVG.parser.path.getBBox()
    }
  
  })


  SVG.Number = function(value) {
  
    /* initialize defaults */
    this.value = 0
    this.unit = ''
  
    /* parse value */
    if (typeof value === 'number') {
      /* ensure a valid numeric value */
      this.value = isNaN(value) ? 0 : !isFinite(value) ? (value < 0 ? -3.4e+38 : +3.4e+38) : value
  
    } else if (typeof value === 'string') {
      var match = value.match(SVG.regex.unit)
  
      if (match) {
        /* make value numeric */
        this.value = parseFloat(match[1])
      
        /* normalize percent value */
        if (match[2] == '%')
          this.value /= 100
        else if (match[2] == 's')
          this.value *= 1000
      
        /* store unit */
        this.unit = match[2]
      }
  
    } else {
      if (value instanceof SVG.Number) {
        this.value = value.value
        this.unit  = value.unit
      }
    }
  
  }
  
  SVG.extend(SVG.Number, {
    // Stringalize
    toString: function() {
      return (
        this.unit == '%' ?
          ~~(this.value * 1e8) / 1e6:
        this.unit == 's' ?
          this.value / 1e3 :
          this.value
      ) + this.unit
    }
  , // Convert to primitive
    valueOf: function() {
      return this.value
    }
    // Add number
  , plus: function(number) {
      this.value = this + new SVG.Number(number)
  
      return this
    }
    // Subtract number
  , minus: function(number) {
      return this.plus(-new SVG.Number(number))
    }
    // Multiply number
  , times: function(number) {
      this.value = this * new SVG.Number(number)
  
      return this
    }
    // Divide number
  , divide: function(number) {
      this.value = this / new SVG.Number(number)
  
      return this
    }
    // Convert to different unit
  , to: function(unit) {
      if (typeof unit === 'string')
        this.unit = unit
  
      return this
    }
    // Make number morphable
  , morph: function(number) {
      this.destination = new SVG.Number(number)
  
      return this
    }
    // Get morphed number at given position
  , at: function(pos) {
      /* make sure a destination is defined */
      if (!this.destination) return this
  
      /* generate new morphed number */
      return new SVG.Number(this.destination)
          .minus(this)
          .times(pos)
          .plus(this)
    }
  
  })

  SVG.ViewBox = function(element) {
    var x, y, width, height
      , wm   = 1 /* width multiplier */
      , hm   = 1 /* height multiplier */
      , box  = element.bbox()
      , view = (element.attr('viewBox') || '').match(/-?[\d\.]+/g)
      , we   = element
      , he   = element
  
    /* get dimensions of current node */
    width  = new SVG.Number(element.width())
    height = new SVG.Number(element.height())
  
    /* find nearest non-percentual dimensions */
    while (width.unit == '%') {
      wm *= width.value
      width = new SVG.Number(we instanceof SVG.Doc ? we.parent.offsetWidth : we.parent.width())
      we = we.parent
    }
    while (height.unit == '%') {
      hm *= height.value
      height = new SVG.Number(he instanceof SVG.Doc ? he.parent.offsetHeight : he.parent.height())
      he = he.parent
    }
    
    /* ensure defaults */
    this.x      = box.x
    this.y      = box.y
    this.width  = width  * wm
    this.height = height * hm
    this.zoom   = 1
    
    if (view) {
      /* get width and height from viewbox */
      x      = parseFloat(view[0])
      y      = parseFloat(view[1])
      width  = parseFloat(view[2])
      height = parseFloat(view[3])
      
      /* calculate zoom accoring to viewbox */
      this.zoom = ((this.width / this.height) > (width / height)) ?
        this.height / height :
        this.width  / width
  
      /* calculate real pixel dimensions on parent SVG.Doc element */
      this.x      = x
      this.y      = y
      this.width  = width
      this.height = height
      
    }
    
  }
  
  //
  SVG.extend(SVG.ViewBox, {
    // Parse viewbox to string
    toString: function() {
      return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height
    }
    
  })

  SVG.BBox = function(element) {
    var box
  
    /* initialize zero box */
    this.x      = 0
    this.y      = 0
    this.width  = 0
    this.height = 0
    
    /* get values if element is given */
    if (element) {
      try {
        /* actual, native bounding box */
        box = element.node.getBBox()
      } catch(e) {
        /* fallback for some browsers */
        box = {
          x:      element.node.clientLeft
        , y:      element.node.clientTop
        , width:  element.node.clientWidth
        , height: element.node.clientHeight
        }
      }
      
      /* include translations on x an y */
      this.x = box.x + element.trans.x
      this.y = box.y + element.trans.y
      
      /* plain width and height */
      this.width  = box.width  * element.trans.scaleX
      this.height = box.height * element.trans.scaleY
    }
  
    /* add center, right and bottom */
    boxProperties(this)
    
  }
  
  //
  SVG.extend(SVG.BBox, {
    // merge bounding box with another, return a new instance
    merge: function(box) {
      var b = new SVG.BBox()
  
      /* merge box */
      b.x      = Math.min(this.x, box.x)
      b.y      = Math.min(this.y, box.y)
      b.width  = Math.max(this.x + this.width,  box.x + box.width)  - b.x
      b.height = Math.max(this.y + this.height, box.y + box.height) - b.y
  
      /* add center, right and bottom */
      boxProperties(b)
  
      return b
    }
  
  })

  SVG.RBox = function(element) {
    var e, zoom
      , box = {}
  
    /* initialize zero box */
    this.x      = 0
    this.y      = 0
    this.width  = 0
    this.height = 0
    
    if (element) {
      e = element.doc().parent
      zoom = element.doc().viewbox().zoom
      
      /* actual, native bounding box */
      box = element.node.getBoundingClientRect()
      
      /* get screen offset */
      this.x = box.left
      this.y = box.top
      
      /* subtract parent offset */
      this.x -= e.offsetLeft
      this.y -= e.offsetTop
      
      while (e = e.offsetParent) {
        this.x -= e.offsetLeft
        this.y -= e.offsetTop
      }
      
      /* calculate cumulative zoom from svg documents */
      e = element
      while (e = e.parent) {
        if (e.type == 'svg' && e.viewbox) {
          zoom *= e.viewbox().zoom
          this.x -= e.x() || 0
          this.y -= e.y() || 0
        }
      }
    }
    
    /* recalculate viewbox distortion */
    this.x /= zoom
    this.y /= zoom
    this.width  = box.width  /= zoom
    this.height = box.height /= zoom
    
    /* offset by window scroll position, because getBoundingClientRect changes when window is scrolled */
    this.x += typeof window.scrollX === 'number' ? window.scrollX : window.pageXOffset
    this.y += typeof window.scrollY === 'number' ? window.scrollY : window.pageYOffset
  
    /* add center, right and bottom */
    boxProperties(this)
    
  }
  
  //
  SVG.extend(SVG.RBox, {
    // merge rect box with another, return a new instance
    merge: function(box) {
      var b = new SVG.RBox()
  
      /* merge box */
      b.x      = Math.min(this.x, box.x)
      b.y      = Math.min(this.y, box.y)
      b.width  = Math.max(this.x + this.width,  box.x + box.width)  - b.x
      b.height = Math.max(this.y + this.height, box.y + box.height) - b.y
  
      /* add center, right and bottom */
      boxProperties(b)
  
      return b
    }
  
  })


  SVG.Element = SVG.invent({
    // Initialize node
    create: function(node) {
      /* make stroke value accessible dynamically */
      this._stroke = SVG.defaults.attrs.stroke
  
      /* initialize transformation store with defaults */
      this.trans = SVG.defaults.trans()
      
      /* create circular reference */
      if (this.node = node) {
        this.type = node.nodeName
        this.node.instance = this
      }
    }
  
    // Add class methods
  , extend: {
      // Move over x-axis
      x: function(x) {
        if (x != null) {
          x = new SVG.Number(x)
          x.value /= this.trans.scaleX
        }
        return this.attr('x', x)
      }
      // Move over y-axis
    , y: function(y) {
        if (y != null) {
          y = new SVG.Number(y)
          y.value /= this.trans.scaleY
        }
        return this.attr('y', y)
      }
      // Move by center over x-axis
    , cx: function(x) {
        return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2)
      }
      // Move by center over y-axis
    , cy: function(y) {
        return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2)
      }
      // Move element to given x and y values
    , move: function(x, y) {
        return this.x(x).y(y)
      }
      // Move element by its center
    , center: function(x, y) {
        return this.cx(x).cy(y)
      }
      // Set width of element
    , width: function(width) {
        return this.attr('width', width)
      }
      // Set height of element
    , height: function(height) {
        return this.attr('height', height)
      }
      // Set element size to given width and height
    , size: function(width, height) {
        var p = proportionalSize(this.bbox(), width, height)
  
        return this
          .width(new SVG.Number(p.width))
          .height(new SVG.Number(p.height))
      }
      // Clone element
    , clone: function() {
        var clone , attr
          , type = this.type
        
        /* invoke shape method with shape-specific arguments */
        clone = type == 'rect' || type == 'ellipse' ?
          this.parent[type](0,0) :
        type == 'line' ?
          this.parent[type](0,0,0,0) :
        type == 'image' ?
          this.parent[type](this.src) :
        type == 'text' ?
          this.parent[type](this.content) :
        type == 'path' ?
          this.parent[type](this.attr('d')) :
        type == 'polyline' || type == 'polygon' ?
          this.parent[type](this.attr('points')) :
        type == 'g' ?
          this.parent.group() :
          this.parent[type]()
        
        /* apply attributes attributes */
        attr = this.attr()
        delete attr.id
        clone.attr(attr)
        
        /* copy transformations */
        clone.trans = this.trans
        
        /* apply attributes and translations */
        return clone.transform({})
      }
      // Remove element
    , remove: function() {
        if (this.parent)
          this.parent.removeElement(this)
        
        return this
      }
      // Replace element
    , replace: function(element) {
        this.after(element).remove()
  
        return element
      }
      // Add element to given container and return self
    , addTo: function(parent) {
        return parent.put(this)
      }
      // Add element to given container and return container
    , putIn: function(parent) {
        return parent.add(this)
      }
      // Get parent document
    , doc: function(type) {
        return this._parent(type || SVG.Doc)
      }
      // Set svg element attribute
    , attr: function(a, v, n) {
        if (a == null) {
          /* get an object of attributes */
          a = {}
          v = this.node.attributes
          for (n = v.length - 1; n >= 0; n--)
            a[v[n].nodeName] = SVG.regex.isNumber.test(v[n].nodeValue) ? parseFloat(v[n].nodeValue) : v[n].nodeValue
          
          return a
          
        } else if (typeof a == 'object') {
          /* apply every attribute individually if an object is passed */
          for (v in a) this.attr(v, a[v])
          
        } else if (v === null) {
            /* remove value */
            this.node.removeAttribute(a)
          
        } else if (v == null) {
          /* act as a getter if the first and only argument is not an object */
          v = this.node.attributes[a]
          return v == null ? 
            SVG.defaults.attrs[a] :
          SVG.regex.isNumber.test(v.nodeValue) ?
            parseFloat(v.nodeValue) : v.nodeValue
        
        } else if (a == 'style') {
          /* redirect to the style method */
          return this.style(v)
        
        } else {
          /* BUG FIX: some browsers will render a stroke if a color is given even though stroke width is 0 */
          if (a == 'stroke-width')
            this.attr('stroke', parseFloat(v) > 0 ? this._stroke : null)
          else if (a == 'stroke')
            this._stroke = v
  
          /* convert image fill and stroke to patterns */
          if (a == 'fill' || a == 'stroke') {
            if (SVG.regex.isImage.test(v))
              v = this.doc().defs().image(v, 0, 0)
  
            if (v instanceof SVG.Image)
              v = this.doc().defs().pattern(0, 0, function() {
                this.add(v)
              })
          }
          
          /* ensure correct numeric values (also accepts NaN and Infinity) */
          if (typeof v === 'number')
            v = new SVG.Number(v)
  
          /* ensure full hex color */
          else if (SVG.Color.isColor(v))
            v = new SVG.Color(v)
          
          /* parse array values */
          else if (Array.isArray(v))
            v = new SVG.Array(v)
  
          /* if the passed attribute is leading... */
          if (a == 'leading') {
            /* ... call the leading method instead */
            if (this.leading)
              this.leading(v)
          } else {
            /* set given attribute on node */
            typeof n === 'string' ?
              this.node.setAttributeNS(n, a, v.toString()) :
              this.node.setAttribute(a, v.toString())
          }
          
          /* rebuild if required */
          if (this.rebuild && (a == 'font-size' || a == 'x'))
            this.rebuild(a, v)
        }
        
        return this
      }
      // Manage transformations
    , transform: function(o, v) {
        
        if (arguments.length == 0) {
          /* act as a getter if no argument is given */
          return this.trans
          
        } else if (typeof o === 'string') {
          /* act as a getter if only one string argument is given */
          if (arguments.length < 2)
            return this.trans[o]
          
          /* apply transformations as object if key value arguments are given*/
          var transform = {}
          transform[o] = v
          
          return this.transform(transform)
        }
        
        /* ... otherwise continue as a setter */
        var transform = []
        
        /* parse matrix */
        o = parseMatrix(o)
        
        /* merge values */
        for (v in o)
          if (o[v] != null)
            this.trans[v] = o[v]
        
        /* compile matrix */
        this.trans.matrix = this.trans.a
                    + ' ' + this.trans.b
                    + ' ' + this.trans.c
                    + ' ' + this.trans.d
                    + ' ' + this.trans.e
                    + ' ' + this.trans.f
        
        /* alias current transformations */
        o = this.trans
        
        /* add matrix */
        if (o.matrix != SVG.defaults.matrix)
          transform.push('matrix(' + o.matrix + ')')
        
        /* add rotation */
        if (o.rotation != 0)
          transform.push('rotate(' + o.rotation + ' ' + (o.cx == null ? this.bbox().cx : o.cx) + ' ' + (o.cy == null ? this.bbox().cy : o.cy) + ')')
        
        /* add scale */
        if (o.scaleX != 1 || o.scaleY != 1)
          transform.push('scale(' + o.scaleX + ' ' + o.scaleY + ')')
        
        /* add skew on x axis */
        if (o.skewX != 0)
          transform.push('skewX(' + o.skewX + ')')
        
        /* add skew on y axis */
        if (o.skewY != 0)
          transform.push('skewY(' + o.skewY + ')')
        
        /* add translation */
        if (o.x != 0 || o.y != 0)
          transform.push('translate(' + new SVG.Number(o.x / o.scaleX) + ' ' + new SVG.Number(o.y / o.scaleY) + ')')
        
        /* update transformations, even if there are none */
        if (transform.length == 0)
          this.node.removeAttribute('transform')
        else
          this.node.setAttribute('transform', transform.join(' '))
        
        return this
      }
      // Dynamic style generator
    , style: function(s, v) {
        if (arguments.length == 0) {
          /* get full style */
          return this.node.style.cssText || ''
        
        } else if (arguments.length < 2) {
          /* apply every style individually if an object is passed */
          if (typeof s == 'object') {
            for (v in s) this.style(v, s[v])
          
          } else if (SVG.regex.isCss.test(s)) {
            /* parse css string */
            s = s.split(';')
  
            /* apply every definition individually */
            for (var i = 0; i < s.length; i++) {
              v = s[i].split(':')
              this.style(v[0].replace(/\s+/g, ''), v[1])
            }
          } else {
            /* act as a getter if the first and only argument is not an object */
            return this.node.style[camelCase(s)]
          }
        
        } else {
          this.node.style[camelCase(s)] = v === null || SVG.regex.isBlank.test(v) ? '' : v
        }
        
        return this
      }
      // Get / set id
    , id: function(id) {
        return this.attr('id', id)
      }
      // Get bounding box
    , bbox: function() {
        return new SVG.BBox(this)
      }
      // Get rect box
    , rbox: function() {
        return new SVG.RBox(this)
      }
      // Checks whether the given point inside the bounding box of the element
    , inside: function(x, y) {
        var box = this.bbox()
        
        return x > box.x
            && y > box.y
            && x < box.x + box.width
            && y < box.y + box.height
      }
      // Show element
    , show: function() {
        return this.style('display', '')
      }
      // Hide element
    , hide: function() {
        return this.style('display', 'none')
      }
      // Is element visible?
    , visible: function() {
        return this.style('display') != 'none'
      }
      // Return id on string conversion
    , toString: function() {
        return this.attr('id')
      }
      // Return array of classes on the node
    , classes: function() {
        var classAttr = this.node.getAttribute('class')
        if (classAttr === null) {
          return []
        } else {
          return classAttr.trim().split(/\s+/)
        }
      }
      // Return true if class exists on the node, false otherwise
    , hasClass: function(className) {
        return this.classes().indexOf(className) != -1
      }
      // Add class to the node
    , addClass: function(className) {
        var classArray
        if (!(this.hasClass(className))) {
          classArray = this.classes()
          classArray.push(className)
          this.node.setAttribute('class', classArray.join(' '))
        }
        return this
      }
      // Remove class from the node
    , removeClass: function(className) {
        var classArray
        if (this.hasClass(className)) {
          classArray = this.classes().filter(function(c) {
            return c != className
          })
          this.node.setAttribute('class', classArray.join(' '))
        }
        return this
      }
      // Toggle the presence of a class on the node
    , toggleClass: function(className) {
        if (this.hasClass(className)) {
          this.removeClass(className)
        } else {
          this.addClass(className)
        }
        return this
      }
      // Get referenced element form attribute value
    , reference: function(attr) {
        return SVG.get(this.attr()[attr])
      }
      // Private: find svg parent by instance
    , _parent: function(parent) {
        var element = this
        
        while (element != null && !(element instanceof parent))
          element = element.parent
  
        return element
      }
    }
  })


  SVG.Parent = SVG.invent({
    // Initialize node
    create: function(element) {
      this.constructor.call(this, element)
    }
  
    // Inherit from
  , inherit: SVG.Element
  
    // Add class methods
  , extend: {
      // Returns all child elements
      children: function() {
        return this._children || (this._children = [])
      }
      // Add given element at a position
    , add: function(element, i) {
        if (!this.has(element)) {
          /* define insertion index if none given */
          i = i == null ? this.children().length : i
          
          /* remove references from previous parent */
          if (element.parent)
            element.parent.children().splice(element.parent.index(element), 1)
          
          /* add element references */
          this.children().splice(i, 0, element)
          this.node.insertBefore(element.node, this.node.childNodes[i] || null)
          element.parent = this
        }
  
        /* reposition defs */
        if (this._defs) {
          this.node.removeChild(this._defs.node)
          this.node.appendChild(this._defs.node)
        }
        
        return this
      }
      // Basically does the same as `add()` but returns the added element instead
    , put: function(element, i) {
        this.add(element, i)
        return element
      }
      // Checks if the given element is a child
    , has: function(element) {
        return this.index(element) >= 0
      }
      // Gets index of given element
    , index: function(element) {
        return this.children().indexOf(element)
      }
      // Get a element at the given index
    , get: function(i) {
        return this.children()[i]
      }
      // Get first child, skipping the defs node
    , first: function() {
        return this.children()[0]
      }
      // Get the last child
    , last: function() {
        return this.children()[this.children().length - 1]
      }
      // Iterates over all children and invokes a given block
    , each: function(block, deep) {
        var i, il
          , children = this.children()
        
        for (i = 0, il = children.length; i < il; i++) {
          if (children[i] instanceof SVG.Element)
            block.apply(children[i], [i, children])
  
          if (deep && (children[i] instanceof SVG.Container))
            children[i].each(block, deep)
        }
      
        return this
      }
      // Remove a child element at a position
    , removeElement: function(element) {
        this.children().splice(this.index(element), 1)
        this.node.removeChild(element.node)
        element.parent = null
        
        return this
      }
      // Remove all elements in this container
    , clear: function() {
        /* remove children */
        for (var i = this.children().length - 1; i >= 0; i--)
          this.removeElement(this.children()[i])
  
        /* remove defs node */
        if (this._defs)
          this._defs.clear()
  
        return this
      }
     , // Get defs
      defs: function() {
        return this.doc().defs()
      }
    }
    
  })


  SVG.Container = SVG.invent({
    // Initialize node
    create: function(element) {
      this.constructor.call(this, element)
    }
  
    // Inherit from
  , inherit: SVG.Parent
  
    // Add class methods
  , extend: {
      // Get the viewBox and calculate the zoom value
      viewbox: function(v) {
        if (arguments.length == 0)
          /* act as a getter if there are no arguments */
          return new SVG.ViewBox(this)
        
        /* otherwise act as a setter */
        v = arguments.length == 1 ?
          [v.x, v.y, v.width, v.height] :
          [].slice.call(arguments)
        
        return this.attr('viewBox', v)
      }
    }
    
  })

  SVG.FX = SVG.invent({
    // Initialize FX object
    create: function(element) {
      /* store target element */
      this.target = element
    }
  
    // Add class methods
  , extend: {
      // Add animation parameters and start animation
      animate: function(d, ease, delay) {
        var akeys, tkeys, skeys, key
          , element = this.target
          , fx = this
        
        /* dissect object if one is passed */
        if (typeof d == 'object') {
          delay = d.delay
          ease = d.ease
          d = d.duration
        }
  
        /* ensure default duration and easing */
        d = d == '=' ? d : d == null ? 1000 : new SVG.Number(d).valueOf()
        ease = ease || '<>'
  
        /* process values */
        fx.to = function(pos) {
          var i
  
          /* normalise pos */
          pos = pos < 0 ? 0 : pos > 1 ? 1 : pos
  
          /* collect attribute keys */
          if (akeys == null) {
            akeys = []
            for (key in fx.attrs)
              akeys.push(key)
  
            /* make sure morphable elements are scaled, translated and morphed all together */
            if (element.morphArray && (fx._plot || akeys.indexOf('points') > -1)) {
              /* get destination */
              var box
                , p = new element.morphArray(fx._plot || fx.attrs.points || element.array)
  
              /* add size */
              if (fx._size) p.size(fx._size.width.to, fx._size.height.to)
  
              /* add movement */
              box = p.bbox()
              if (fx._x) p.move(fx._x.to, box.y)
              else if (fx._cx) p.move(fx._cx.to - box.width / 2, box.y)
  
              box = p.bbox()
              if (fx._y) p.move(box.x, fx._y.to)
              else if (fx._cy) p.move(box.x, fx._cy.to - box.height / 2)
  
              /* delete element oriented changes */
              delete fx._x
              delete fx._y
              delete fx._cx
              delete fx._cy
              delete fx._size
  
              fx._plot = element.array.morph(p)
            }
          }
  
          /* collect transformation keys */
          if (tkeys == null) {
            tkeys = []
            for (key in fx.trans)
              tkeys.push(key)
          }
  
          /* collect style keys */
          if (skeys == null) {
            skeys = []
            for (key in fx.styles)
              skeys.push(key)
          }
  
          /* apply easing */
          pos = ease == '<>' ?
            (-Math.cos(pos * Math.PI) / 2) + 0.5 :
          ease == '>' ?
            Math.sin(pos * Math.PI / 2) :
          ease == '<' ?
            -Math.cos(pos * Math.PI / 2) + 1 :
          ease == '-' ?
            pos :
          typeof ease == 'function' ?
            ease(pos) :
            pos
          
          /* run plot function */
          if (fx._plot) {
            element.plot(fx._plot.at(pos))
  
          } else {
            /* run all x-position properties */
            if (fx._x)
              element.x(fx._x.at(pos))
            else if (fx._cx)
              element.cx(fx._cx.at(pos))
  
            /* run all y-position properties */
            if (fx._y)
              element.y(fx._y.at(pos))
            else if (fx._cy)
              element.cy(fx._cy.at(pos))
  
            /* run all size properties */
            if (fx._size)
              element.size(fx._size.width.at(pos), fx._size.height.at(pos))
          }
  
          /* run all viewbox properties */
          if (fx._viewbox)
            element.viewbox(
              fx._viewbox.x.at(pos)
            , fx._viewbox.y.at(pos)
            , fx._viewbox.width.at(pos)
            , fx._viewbox.height.at(pos)
            )
  
          /* run leading property */
          if (fx._leading)
            element.leading(fx._leading.at(pos))
  
          /* animate attributes */
          for (i = akeys.length - 1; i >= 0; i--)
            element.attr(akeys[i], at(fx.attrs[akeys[i]], pos))
  
          /* animate transformations */
          for (i = tkeys.length - 1; i >= 0; i--)
            element.transform(tkeys[i], at(fx.trans[tkeys[i]], pos))
  
          /* animate styles */
          for (i = skeys.length - 1; i >= 0; i--)
            element.style(skeys[i], at(fx.styles[skeys[i]], pos))
  
          /* callback for each keyframe */
          if (fx._during)
            fx._during.call(element, pos, function(from, to) {
              return at({ from: from, to: to }, pos)
            })
        }
        
        if (typeof d === 'number') {
          /* delay animation */
          this.timeout = setTimeout(function() {
            var start = new Date().getTime()
  
            /* initialize situation object */
            fx.situation = {
              interval: 1000 / 60
            , start:    start
            , play:     true
            , finish:   start + d
            , duration: d
            }
  
            /* render function */
            fx.render = function() {
              
              if (fx.situation.play === true) {
                // This code was borrowed from the emile.js micro framework by Thomas Fuchs, aka MadRobby.
                var time = new Date().getTime()
                  , pos = time > fx.situation.finish ? 1 : (time - fx.situation.start) / d
                
                /* process values */
                fx.to(pos)
                
                /* finish off animation */
                if (time > fx.situation.finish) {
                  if (fx._plot)
                    element.plot(new SVG.PointArray(fx._plot.destination).settle())
  
                  if (fx._loop === true || (typeof fx._loop == 'number' && fx._loop > 1)) {
                    if (typeof fx._loop == 'number')
                      --fx._loop
                    fx.animate(d, ease, delay)
                  } else {
                    fx._after ? fx._after.apply(element, [fx]) : fx.stop()
                  }
  
                } else {
                  fx.animationFrame = requestAnimationFrame(fx.render)
                }
              } else {
                fx.animationFrame = requestAnimationFrame(fx.render)
              }
              
            }
  
            /* start animation */
            fx.render()
            
          }, new SVG.Number(delay).valueOf())
        }
        
        return this
      }
      // Get bounding box of target element
    , bbox: function() {
        return this.target.bbox()
      }
      // Add animatable attributes
    , attr: function(a, v) {
        if (typeof a == 'object') {
          for (var key in a)
            this.attr(key, a[key])
        
        } else {
          var from = this.target.attr(a)
  
          this.attrs[a] = SVG.Color.isColor(from) ?
            new SVG.Color(from).morph(v) :
          SVG.regex.unit.test(from) ?
            new SVG.Number(from).morph(v) :
            { from: from, to: v }
        }
        
        return this
      }
      // Add animatable transformations
    , transform: function(o, v) {
        if (arguments.length == 1) {
          /* parse matrix string */
          o = parseMatrix(o)
          
          /* dlete matrixstring from object */
          delete o.matrix
          
          /* add rotation-center to transformations */
          this.target.trans.cx = o.cx || null
          this.target.trans.cy = o.cy || null
          
          delete o.cx
          delete o.cy
          
          /* store matrix values */
          for (v in o)
            this.trans[v] = { from: this.target.trans[v], to: o[v] }
          
        } else {
          /* apply transformations as object if key value arguments are given*/
          var transform = {}
          transform[o] = v
          
          this.transform(transform)
        }
        
        return this
      }
      // Add animatable styles
    , style: function(s, v) {
        if (typeof s == 'object')
          for (var key in s)
            this.style(key, s[key])
        
        else
          this.styles[s] = { from: this.target.style(s), to: v }
        
        return this
      }
      // Animatable x-axis
    , x: function(x) {
        this._x = new SVG.Number(this.target.x()).morph(x)
        
        return this
      }
      // Animatable y-axis
    , y: function(y) {
        this._y = new SVG.Number(this.target.y()).morph(y)
        
        return this
      }
      // Animatable center x-axis
    , cx: function(x) {
        this._cx = new SVG.Number(this.target.cx()).morph(x)
        
        return this
      }
      // Animatable center y-axis
    , cy: function(y) {
        this._cy = new SVG.Number(this.target.cy()).morph(y)
        
        return this
      }
      // Add animatable move
    , move: function(x, y) {
        return this.x(x).y(y)
      }
      // Add animatable center
    , center: function(x, y) {
        return this.cx(x).cy(y)
      }
      // Add animatable size
    , size: function(width, height) {
        if (this.target instanceof SVG.Text) {
          /* animate font size for Text elements */
          this.attr('font-size', width)
          
        } else {
          /* animate bbox based size for all other elements */
          var box = this.target.bbox()
  
          this._size = {
            width:  new SVG.Number(box.width).morph(width)
          , height: new SVG.Number(box.height).morph(height)
          }
        }
        
        return this
      }
      // Add animatable plot
    , plot: function(p) {
        this._plot = p
  
        return this
      }
      // Add leading method
    , leading: function(value) {
        if (this.target._leading)
          this._leading = new SVG.Number(this.target._leading).morph(value)
  
        return this
      }
      // Add animatable viewbox
    , viewbox: function(x, y, width, height) {
        if (this.target instanceof SVG.Container) {
          var box = this.target.viewbox()
          
          this._viewbox = {
            x:      new SVG.Number(box.x).morph(x)
          , y:      new SVG.Number(box.y).morph(y)
          , width:  new SVG.Number(box.width).morph(width)
          , height: new SVG.Number(box.height).morph(height)
          }
        }
        
        return this
      }
      // Add animateable gradient update
    , update: function(o) {
        if (this.target instanceof SVG.Stop) {
          if (o.opacity != null) this.attr('stop-opacity', o.opacity)
          if (o.color   != null) this.attr('stop-color', o.color)
          if (o.offset  != null) this.attr('offset', new SVG.Number(o.offset))
        }
  
        return this
      }
      // Add callback for each keyframe
    , during: function(during) {
        this._during = during
        
        return this
      }
      // Callback after animation
    , after: function(after) {
        this._after = after
        
        return this
      }
      // Make loopable
    , loop: function(times) {
        this._loop = times || true
  
        return this
      }
      // Stop running animation
    , stop: function(fulfill) {
        /* fulfill animation */
        if (fulfill === true) {
  
          this.animate(0)
  
          if (this._after)
            this._after.apply(this.target, [this])
  
        } else {
          /* stop current animation */
          clearTimeout(this.timeout)
          cancelAnimationFrame(this.animationFrame);
  
          /* reset storage for properties that need animation */
          this.attrs     = {}
          this.trans     = {}
          this.styles    = {}
          this.situation = {}
  
          /* delete destinations */
          delete this._x
          delete this._y
          delete this._cx
          delete this._cy
          delete this._size
          delete this._plot
          delete this._loop
          delete this._after
          delete this._during
          delete this._leading
          delete this._viewbox
        }
        
        return this
      }
      // Pause running animation
    , pause: function() {
        if (this.situation.play === true) {
          this.situation.play  = false
          this.situation.pause = new Date().getTime()
        }
  
        return this
      }
      // Play running animation
    , play: function() {
        if (this.situation.play === false) {
          var pause = new Date().getTime() - this.situation.pause
          
          this.situation.finish += pause
          this.situation.start  += pause
          this.situation.play    = true
        }
  
        return this
      }
      
    }
  
    // Define parent class
  , parent: SVG.Element
  
    // Add method to parent elements
  , construct: {
      // Get fx module or create a new one, then animate with given duration and ease
      animate: function(d, ease, delay) {
        return (this.fx || (this.fx = new SVG.FX(this))).stop().animate(d, ease, delay)
      }
      // Stop current animation; this is an alias to the fx instance
    , stop: function(fulfill) {
        if (this.fx)
          this.fx.stop(fulfill)
        
        return this
      }
      // Pause current animation
    , pause: function() {
        if (this.fx)
          this.fx.pause()
  
        return this
      }
      // Play paused current animation
    , play: function() {
        if (this.fx)
          this.fx.play()
  
        return this
      }
      
    }
  })


  SVG.extend(SVG.Element, SVG.FX, {
    // Relative move over x axis
    dx: function(x) {
      return this.x((this.target || this).x() + x)
    }
    // Relative move over y axis
  , dy: function(y) {
      return this.y((this.target || this).y() + y)
    }
    // Relative move over x and y axes
  , dmove: function(x, y) {
      return this.dx(x).dy(y)
    }
  
  })

  ;[  'click'
    , 'dblclick'
    , 'mousedown'
    , 'mouseup'
    , 'mouseover'
    , 'mouseout'
    , 'mousemove'
    // , 'mouseenter' -> not supported by IE
    // , 'mouseleave' -> not supported by IE
    , 'touchstart'
    , 'touchmove'
    , 'touchleave'
    , 'touchend'
    , 'touchcancel' ].forEach(function(event) {
    
    /* add event to SVG.Element */
    SVG.Element.prototype[event] = function(f) {
      var self = this
      
      /* bind event to element rather than element node */
      this.node['on' + event] = typeof f == 'function' ?
        function() { return f.apply(self, arguments) } : null
      
      return this
    }
    
  })
  
  // Initialize listeners stack
  SVG.listeners = []
  SVG.handlerMap = []
  
  // Only kept for consistency of API
  SVG.registerEvent = function(){};
  
  // Add event binder in the SVG namespace
  SVG.on = function(node, event, listener) {
    // create listener, get object-index
    var l     = listener.bind(node.instance || node)
      , index = (SVG.handlerMap.indexOf(node) + 1 || SVG.handlerMap.push(node)) - 1
      , ev    = event.split('.')[0]
      , ns    = event.split('.')[1] || '*'
      
    
    // ensure valid object
    SVG.listeners[index]         = SVG.listeners[index]         || {}
    SVG.listeners[index][ev]     = SVG.listeners[index][ev]     || {}
    SVG.listeners[index][ev][ns] = SVG.listeners[index][ev][ns] || {}
  
    // reference listener
    SVG.listeners[index][ev][ns][listener] = l
  
    // add listener
    node.addEventListener(ev, l, false)
  }
  
  // Add event unbinder in the SVG namespace
  SVG.off = function(node, event, listener) {
    var index = SVG.handlerMap.indexOf(node)
      , ev    = event && event.split('.')[0]
      , ns    = event && event.split('.')[1]
  
    if(index == -1) return
    
    if (listener) {
      // remove listener reference
      if (SVG.listeners[index][ev] && SVG.listeners[index][ev][ns || '*']) {
        // remove listener
        node.removeEventListener(ev, SVG.listeners[index][ev][ns || '*'][listener], false)
  
        delete SVG.listeners[index][ev][ns || '*'][listener]
      }
  
    } else if (ns) {
      // remove all listeners for the namespaced event
      if (SVG.listeners[index][ev] && SVG.listeners[index][ev][ns]) {
        for (listener in SVG.listeners[index][ev][ns])
          SVG.off(node, [ev, ns].join('.'), listener)
  
        delete SVG.listeners[index][ev][ns]
      }
  
    } else if (ev) {
      // remove all listeners for the event
      if (SVG.listeners[index][ev]) {
        for (namespace in SVG.listeners[index][ev])
          SVG.off(node, [ev, namespace].join('.'))
  
        delete SVG.listeners[index][ev]
      }
  
    } else {
      // remove all listeners on a given node
      for (event in SVG.listeners[index])
        SVG.off(node, event)
  
      delete SVG.listeners[index]
  
    }
  }
  
  //
  SVG.extend(SVG.Element, {
    // Bind given event to listener
    on: function(event, listener) {
      SVG.on(this.node, event, listener)
      
      return this
    }
    // Unbind event from listener
  , off: function(event, listener) {
      SVG.off(this.node, event, listener)
      
      return this
    }
    // Fire given event
  , fire: function(event, data) {
      
      // Dispatch event
      this.node.dispatchEvent(new CustomEvent(event, {detail:data}))
  
      return this
    }
  })

  SVG.Defs = SVG.invent({
    // Initialize node
    create: 'defs'
  
    // Inherit from
  , inherit: SVG.Container
    
  })

  SVG.G = SVG.invent({
    // Initialize node
    create: 'g'
  
    // Inherit from
  , inherit: SVG.Container
    
    // Add class methods
  , extend: {
      // Move over x-axis
      x: function(x) {
        return x == null ? this.trans.x : this.transform('x', x)
      }
      // Move over y-axis
    , y: function(y) {
        return y == null ? this.trans.y : this.transform('y', y)
      }
      // Move by center over x-axis
    , cx: function(x) {
        return x == null ? this.bbox().cx : this.x(x - this.bbox().width / 2)
      }
      // Move by center over y-axis
    , cy: function(y) {
        return y == null ? this.bbox().cy : this.y(y - this.bbox().height / 2)
      }
    }
    
    // Add parent method
  , construct: {
      // Create a group element
      group: function() {
        return this.put(new SVG.G)
      }
    }
  })

  SVG.extend(SVG.Element, {
    // Get all siblings, including myself
    siblings: function() {
      return this.parent.children()
    }
    // Get the curent position siblings
  , position: function() {
      return this.parent.index(this)
    }
    // Get the next element (will return null if there is none)
  , next: function() {
      return this.siblings()[this.position() + 1]
    }
    // Get the next element (will return null if there is none)
  , previous: function() {
      return this.siblings()[this.position() - 1]
    }
    // Send given element one step forward
  , forward: function() {
      var i = this.position()
      return this.parent.removeElement(this).put(this, i + 1)
    }
    // Send given element one step backward
  , backward: function() {
      var i = this.position()
      
      if (i > 0)
        this.parent.removeElement(this).add(this, i - 1)
  
      return this
    }
    // Send given element all the way to the front
  , front: function() {
      return this.parent.removeElement(this).put(this)
    }
    // Send given element all the way to the back
  , back: function() {
      if (this.position() > 0)
        this.parent.removeElement(this).add(this, 0)
      
      return this
    }
    // Inserts a given element before the targeted element
  , before: function(element) {
      element.remove()
  
      var i = this.position()
      
      this.parent.add(element, i)
  
      return this
    }
    // Insters a given element after the targeted element
  , after: function(element) {
      element.remove()
      
      var i = this.position()
      
      this.parent.add(element, i + 1)
  
      return this
    }
  
  })

  SVG.Mask = SVG.invent({
    // Initialize node
    create: function() {
      this.constructor.call(this, SVG.create('mask'))
  
      /* keep references to masked elements */
      this.targets = []
    }
  
    // Inherit from
  , inherit: SVG.Container
  
    // Add class methods
  , extend: {
      // Unmask all masked elements and remove itself
      remove: function() {
        /* unmask all targets */
        for (var i = this.targets.length - 1; i >= 0; i--)
          if (this.targets[i])
            this.targets[i].unmask()
        delete this.targets
  
        /* remove mask from parent */
        this.parent.removeElement(this)
        
        return this
      }
    }
    
    // Add parent method
  , construct: {
      // Create masking element
      mask: function() {
        return this.defs().put(new SVG.Mask)
      }
    }
  })
  
  
  SVG.extend(SVG.Element, {
    // Distribute mask to svg element
    maskWith: function(element) {
      /* use given mask or create a new one */
      this.masker = element instanceof SVG.Mask ? element : this.parent.mask().add(element)
  
      /* store reverence on self in mask */
      this.masker.targets.push(this)
      
      /* apply mask */
      return this.attr('mask', 'url("#' + this.masker.attr('id') + '")')
    }
    // Unmask element
  , unmask: function() {
      delete this.masker
      return this.attr('mask', null)
    }
    
  })


  SVG.Clip = SVG.invent({
    // Initialize node
    create: function() {
      this.constructor.call(this, SVG.create('clipPath'))
  
      /* keep references to clipped elements */
      this.targets = []
    }
  
    // Inherit from
  , inherit: SVG.Container
  
    // Add class methods
  , extend: {
      // Unclip all clipped elements and remove itself
      remove: function() {
        /* unclip all targets */
        for (var i = this.targets.length - 1; i >= 0; i--)
          if (this.targets[i])
            this.targets[i].unclip()
        delete this.targets
  
        /* remove clipPath from parent */
        this.parent.removeElement(this)
        
        return this
      }
    }
    
    // Add parent method
  , construct: {
      // Create clipping element
      clip: function() {
        return this.defs().put(new SVG.Clip)
      }
    }
  })
  
  //
  SVG.extend(SVG.Element, {
    // Distribute clipPath to svg element
    clipWith: function(element) {
      /* use given clip or create a new one */
      this.clipper = element instanceof SVG.Clip ? element : this.parent.clip().add(element)
  
      /* store reverence on self in mask */
      this.clipper.targets.push(this)
      
      /* apply mask */
      return this.attr('clip-path', 'url("#' + this.clipper.attr('id') + '")')
    }
    // Unclip element
  , unclip: function() {
      delete this.clipper
      return this.attr('clip-path', null)
    }
    
  })

  SVG.Gradient = SVG.invent({
    // Initialize node
    create: function(type) {
      this.constructor.call(this, SVG.create(type + 'Gradient'))
      
      /* store type */
      this.type = type
    }
  
    // Inherit from
  , inherit: SVG.Container
  
    // Add class methods
  , extend: {
      // From position
      from: function(x, y) {
        return this.type == 'radial' ?
          this.attr({ fx: new SVG.Number(x), fy: new SVG.Number(y) }) :
          this.attr({ x1: new SVG.Number(x), y1: new SVG.Number(y) })
      }
      // To position
    , to: function(x, y) {
        return this.type == 'radial' ?
          this.attr({ cx: new SVG.Number(x), cy: new SVG.Number(y) }) :
          this.attr({ x2: new SVG.Number(x), y2: new SVG.Number(y) })
      }
      // Radius for radial gradient
    , radius: function(r) {
        return this.type == 'radial' ?
          this.attr({ r: new SVG.Number(r) }) :
          this
      }
      // Add a color stop
    , at: function(offset, color, opacity) {
        return this.put(new SVG.Stop).update(offset, color, opacity)
      }
      // Update gradient
    , update: function(block) {
        /* remove all stops */
        this.clear()
        
        /* invoke passed block */
        if (typeof block == 'function')
          block.call(this, this)
        
        return this
      }
      // Return the fill id
    , fill: function() {
        return 'url(#' + this.id() + ')'
      }
      // Alias string convertion to fill
    , toString: function() {
        return this.fill()
      }
    }
    
    // Add parent method
  , construct: {
      // Create gradient element in defs
      gradient: function(type, block) {
        return this.defs().gradient(type, block)
      }
    }
  })
  
  SVG.extend(SVG.Defs, {
    // define gradient
    gradient: function(type, block) {
      return this.put(new SVG.Gradient(type)).update(block)
    }
    
  })
  
  SVG.Stop = SVG.invent({
    // Initialize node
    create: 'stop'
  
    // Inherit from
  , inherit: SVG.Element
  
    // Add class methods
  , extend: {
      // add color stops
      update: function(o) {
        if (typeof o == 'number' || o instanceof SVG.Number) {
          o = {
            offset:  arguments[0]
          , color:   arguments[1]
          , opacity: arguments[2]
          }
        }
  
        /* set attributes */
        if (o.opacity != null) this.attr('stop-opacity', o.opacity)
        if (o.color   != null) this.attr('stop-color', o.color)
        if (o.offset  != null) this.attr('offset', new SVG.Number(o.offset))
  
        return this
      }
    }
  
  })


  SVG.Pattern = SVG.invent({
    // Initialize node
    create: 'pattern'
  
    // Inherit from
  , inherit: SVG.Container
  
    // Add class methods
  , extend: {
      // Return the fill id
  	  fill: function() {
  	    return 'url(#' + this.id() + ')'
  	  }
  	  // Update pattern by rebuilding
  	, update: function(block) {
  			/* remove content */
        this.clear()
        
        /* invoke passed block */
        if (typeof block == 'function')
        	block.call(this, this)
        
        return this
  		}
  	  // Alias string convertion to fill
  	, toString: function() {
  	    return this.fill()
  	  }
    }
    
    // Add parent method
  , construct: {
      // Create pattern element in defs
  	  pattern: function(width, height, block) {
  	    return this.defs().pattern(width, height, block)
  	  }
    }
  })
  
  SVG.extend(SVG.Defs, {
    // Define gradient
    pattern: function(width, height, block) {
      return this.put(new SVG.Pattern).update(block).attr({
        x:            0
      , y:            0
      , width:        width
      , height:       height
      , patternUnits: 'userSpaceOnUse'
      })
    }
  
  })

  SVG.Doc = SVG.invent({
    // Initialize node
    create: function(element) {
      /* ensure the presence of a html element */
      this.parent = typeof element == 'string' ?
        document.getElementById(element) :
        element
      
      /* If the target is an svg element, use that element as the main wrapper.
         This allows svg.js to work with svg documents as well. */
      this.constructor
        .call(this, this.parent.nodeName == 'svg' ? this.parent : SVG.create('svg'))
      
      /* set svg element attributes */
      this
        .attr({ xmlns: SVG.ns, version: '1.1', width: '100%', height: '100%' })
        .attr('xmlns:xlink', SVG.xlink, SVG.xmlns)
      
      /* create the <defs> node */
      this._defs = new SVG.Defs
      this._defs.parent = this
      this.node.appendChild(this._defs.node)
  
      /* turn off sub pixel offset by default */
      this.doSpof = false
      
      /* ensure correct rendering */
      if (this.parent != this.node)
        this.stage()
    }
  
    // Inherit from
  , inherit: SVG.Container
  
    // Add class methods
  , extend: {
      /* enable drawing */
      stage: function() {
        var element = this
  
        /* insert element */
        this.parent.appendChild(this.node)
  
        /* fix sub-pixel offset */
        element.spof()
        
        /* make sure sub-pixel offset is fixed every time the window is resized */
        SVG.on(window, 'resize', function() {
          element.spof()
        })
  
        return this
      }
  
      // Creates and returns defs element
    , defs: function() {
        return this._defs
      }
  
      // Fix for possible sub-pixel offset. See:
      // https://bugzilla.mozilla.org/show_bug.cgi?id=608812
    , spof: function() {
        if (this.doSpof) {
          var pos = this.node.getScreenCTM()
          
          if (pos)
            this
              .style('left', (-pos.e % 1) + 'px')
              .style('top',  (-pos.f % 1) + 'px')
        }
        
        return this
      }
  
      // Enable sub-pixel offset
    , fixSubPixelOffset: function() {
        this.doSpof = true
  
        return this
      }
      
        // Removes the doc from the DOM
    , remove: function() {
        if(this.parent) {
          this.parent.removeChild(this.node);
          this.parent = null;
        }
  
        return this;
      }
    }
    
  })


  SVG.Shape = SVG.invent({
    // Initialize node
    create: function(element) {
  	  this.constructor.call(this, element)
  	}
  
    // Inherit from
  , inherit: SVG.Element
  
  })

  SVG.Symbol = SVG.invent({
    // Initialize node
    create: 'symbol'
  
    // Inherit from
  , inherit: SVG.Container
  
    // Add parent method
  , construct: {
      // Create a new symbol
      symbol: function() {
        return this.defs().put(new SVG.Symbol)
      }
    }
    
  })

  SVG.Use = SVG.invent({
    // Initialize node
    create: 'use'
  
    // Inherit from
  , inherit: SVG.Shape
  
    // Add class methods
  , extend: {
      // Use element as a reference
      element: function(element, file) {
        /* store target element */
        this.target = element
  
        /* set lined element */
        return this.attr('href', (file || '') + '#' + element, SVG.xlink)
      }
    }
    
    // Add parent method
  , construct: {
      // Create a use element
      use: function(element, file) {
        return this.put(new SVG.Use).element(element, file)
      }
    }
  })

  SVG.Rect = SVG.invent({
  	// Initialize node
    create: 'rect'
  
  	// Inherit from
  , inherit: SVG.Shape
  	
  	// Add parent method
  , construct: {
    	// Create a rect element
    	rect: function(width, height) {
    	  return this.put(new SVG.Rect().size(width, height))
    	}
    	
  	}
  	
  })

  SVG.Ellipse = SVG.invent({
    // Initialize node
    create: 'ellipse'
  
    // Inherit from
  , inherit: SVG.Shape
  
    // Add class methods
  , extend: {
      // Move over x-axis
      x: function(x) {
        return x == null ? this.cx() - this.attr('rx') : this.cx(x + this.attr('rx'))
      }
      // Move over y-axis
    , y: function(y) {
        return y == null ? this.cy() - this.attr('ry') : this.cy(y + this.attr('ry'))
      }
      // Move by center over x-axis
    , cx: function(x) {
        return x == null ? this.attr('cx') : this.attr('cx', new SVG.Number(x).divide(this.trans.scaleX))
      }
      // Move by center over y-axis
    , cy: function(y) {
        return y == null ? this.attr('cy') : this.attr('cy', new SVG.Number(y).divide(this.trans.scaleY))
      }
      // Set width of element
    , width: function(width) {
        return width == null ? this.attr('rx') * 2 : this.attr('rx', new SVG.Number(width).divide(2))
      }
      // Set height of element
    , height: function(height) {
        return height == null ? this.attr('ry') * 2 : this.attr('ry', new SVG.Number(height).divide(2))
      }
      // Custom size function
    , size: function(width, height) {
        var p = proportionalSize(this.bbox(), width, height)
  
        return this.attr({
          rx: new SVG.Number(p.width).divide(2)
        , ry: new SVG.Number(p.height).divide(2)
        })
      }
      
    }
  
    // Add parent method
  , construct: {
      // Create circle element, based on ellipse
      circle: function(size) {
        return this.ellipse(size, size)
      }
      // Create an ellipse
    , ellipse: function(width, height) {
        return this.put(new SVG.Ellipse).size(width, height).move(0, 0)
      }
      
    }
  
  })

  SVG.Line = SVG.invent({
    // Initialize node
    create: 'line'
  
    // Inherit from
  , inherit: SVG.Shape
  
    // Add class methods
  , extend: {
      // Move over x-axis
      x: function(x) {
        var b = this.bbox()
        
        return x == null ? b.x : this.attr({
          x1: this.attr('x1') - b.x + x
        , x2: this.attr('x2') - b.x + x
        })
      }
      // Move over y-axis
    , y: function(y) {
        var b = this.bbox()
        
        return y == null ? b.y : this.attr({
          y1: this.attr('y1') - b.y + y
        , y2: this.attr('y2') - b.y + y
        })
      }
      // Move by center over x-axis
    , cx: function(x) {
        var half = this.bbox().width / 2
        return x == null ? this.x() + half : this.x(x - half)
      }
      // Move by center over y-axis
    , cy: function(y) {
        var half = this.bbox().height / 2
        return y == null ? this.y() + half : this.y(y - half)
      }
      // Set width of element
    , width: function(width) {
        var b = this.bbox()
  
        return width == null ? b.width : this.attr(this.attr('x1') < this.attr('x2') ? 'x2' : 'x1', b.x + width)
      }
      // Set height of element
    , height: function(height) {
        var b = this.bbox()
  
        return height == null ? b.height : this.attr(this.attr('y1') < this.attr('y2') ? 'y2' : 'y1', b.y + height)
      }
      // Set line size by width and height
    , size: function(width, height) {
        var p = proportionalSize(this.bbox(), width, height)
  
        return this.width(p.width).height(p.height)
      }
      // Set path data
    , plot: function(x1, y1, x2, y2) {
        return this.attr({
          x1: x1
        , y1: y1
        , x2: x2
        , y2: y2
        })
      }
    }
    
    // Add parent method
  , construct: {
      // Create a line element
      line: function(x1, y1, x2, y2) {
        return this.put(new SVG.Line().plot(x1, y1, x2, y2))
      }
    }
  })


  SVG.Polyline = SVG.invent({
    // Initialize node
    create: 'polyline'
  
    // Inherit from
  , inherit: SVG.Shape
    
    // Add parent method
  , construct: {
      // Create a wrapped polyline element
      polyline: function(p) {
        return this.put(new SVG.Polyline).plot(p)
      }
    }
  })
  
  SVG.Polygon = SVG.invent({
    // Initialize node
    create: 'polygon'
  
    // Inherit from
  , inherit: SVG.Shape
    
    // Add parent method
  , construct: {
      // Create a wrapped polygon element
      polygon: function(p) {
        return this.put(new SVG.Polygon).plot(p)
      }
    }
  })
  
  // Add polygon-specific functions
  SVG.extend(SVG.Polyline, SVG.Polygon, {
    // Define morphable array
    morphArray:  SVG.PointArray
    // Plot new path
  , plot: function(p) {
      return this.attr('points', (this.array = new SVG.PointArray(p, [[0,0]])))
    }
    // Move by left top corner
  , move: function(x, y) {
      return this.attr('points', this.array.move(x, y))
    }
    // Move by left top corner over x-axis
  , x: function(x) {
      return x == null ? this.bbox().x : this.move(x, this.bbox().y)
    }
    // Move by left top corner over y-axis
  , y: function(y) {
      return y == null ? this.bbox().y : this.move(this.bbox().x, y)
    }
    // Set width of element
  , width: function(width) {
      var b = this.bbox()
  
      return width == null ? b.width : this.size(width, b.height)
    }
    // Set height of element
  , height: function(height) {
      var b = this.bbox()
  
      return height == null ? b.height : this.size(b.width, height) 
    }
    // Set element size to given width and height
  , size: function(width, height) {
      var p = proportionalSize(this.bbox(), width, height)
  
      return this.attr('points', this.array.size(p.width, p.height))
    }
  
  })

  SVG.Path = SVG.invent({
    // Initialize node
    create: 'path'
  
    // Inherit from
  , inherit: SVG.Shape
  
    // Add class methods
  , extend: {
      // Plot new poly points
      plot: function(p) {
        return this.attr('d', (this.array = new SVG.PathArray(p, [['M', 0, 0]])))
      }
      // Move by left top corner
    , move: function(x, y) {
        return this.attr('d', this.array.move(x, y))
      }
      // Move by left top corner over x-axis
    , x: function(x) {
        return x == null ? this.bbox().x : this.move(x, this.bbox().y)
      }
      // Move by left top corner over y-axis
    , y: function(y) {
        return y == null ? this.bbox().y : this.move(this.bbox().x, y)
      }
      // Set element size to given width and height
    , size: function(width, height) {
        var p = proportionalSize(this.bbox(), width, height)
        
        return this.attr('d', this.array.size(p.width, p.height))
      }
      // Set width of element
    , width: function(width) {
        return width == null ? this.bbox().width : this.size(width, this.bbox().height)
      }
      // Set height of element
    , height: function(height) {
        return height == null ? this.bbox().height : this.size(this.bbox().width, height)
      }
      
    }
    
    // Add parent method
  , construct: {
      // Create a wrapped path element
      path: function(d) {
        return this.put(new SVG.Path).plot(d)
      }
    }
  })

  SVG.Image = SVG.invent({
    // Initialize node
    create: 'image'
  
    // Inherit from
  , inherit: SVG.Shape
  
    // Add class methods
  , extend: {
      // (re)load image
      load: function(url) {
        if (!url) return this
  
        var self = this
          , img  = document.createElement('img')
        
        /* preload image */
        img.onload = function() {
          var p = self.doc(SVG.Pattern)
  
          /* ensure image size */
          if (self.width() == 0 && self.height() == 0)
            self.size(img.width, img.height)
  
          /* ensure pattern size if not set */
          if (p && p.width() == 0 && p.height() == 0)
            p.size(self.width(), self.height())
          
          /* callback */
          if (typeof self._loaded === 'function')
            self._loaded.call(self, {
              width:  img.width
            , height: img.height
            , ratio:  img.width / img.height
            , url:    url
            })
        }
  
        return this.attr('href', (img.src = this.src = url), SVG.xlink)
      }
      // Add loade callback
    , loaded: function(loaded) {
        this._loaded = loaded
        return this
      }
    }
    
    // Add parent method
  , construct: {
      // Create image element, load image and set its size
      image: function(source, width, height) {
        return this.put(new SVG.Image).load(source).size(width || 0, height || width || 0)
      }
    }
  
  })

  SVG.Text = SVG.invent({
    // Initialize node
    create: function() {
      this.constructor.call(this, SVG.create('text'))
      
      this._leading = new SVG.Number(1.3)    /* store leading value for rebuilding */
      this._rebuild = true                   /* enable automatic updating of dy values */
      this._build   = false                  /* disable build mode for adding multiple lines */
  
      /* set default font */
      this.attr('font-family', SVG.defaults.attrs['font-family'])
    }
  
    // Inherit from
  , inherit: SVG.Shape
  
    // Add class methods
  , extend: {
      // Move over x-axis
      x: function(x) {
        /* act as getter */
        if (x == null)
          return this.attr('x')
        
        /* move lines as well if no textPath is present */
        if (!this.textPath)
          this.lines.each(function() { if (this.newLined) this.x(x) })
  
        return this.attr('x', x)
      }
      // Move over y-axis
    , y: function(y) {
        var oy = this.attr('y')
          , o  = typeof oy === 'number' ? oy - this.bbox().y : 0
  
        /* act as getter */
        if (y == null)
          return typeof oy === 'number' ? oy - o : oy
  
        return this.attr('y', typeof y === 'number' ? y + o : y)
      }
      // Move center over x-axis
    , cx: function(x) {
        return x == null ? this.bbox().cx : this.x(x - this.bbox().width / 2)
      }
      // Move center over y-axis
    , cy: function(y) {
        return y == null ? this.bbox().cy : this.y(y - this.bbox().height / 2)
      }
      // Set the text content
    , text: function(text) {
        /* act as getter */
        if (typeof text === 'undefined') return this.content
        
        /* remove existing content */
        this.clear().build(true)
        
        if (typeof text === 'function') {
          /* call block */
          text.call(this, this)
  
        } else {
          /* store text and make sure text is not blank */
          text = (this.content = text).split('\n')
          
          /* build new lines */
          for (var i = 0, il = text.length; i < il; i++)
            this.tspan(text[i]).newLine()
        }
        
        /* disable build mode and rebuild lines */
        return this.build(false).rebuild()
      }
      // Set font size
    , size: function(size) {
        return this.attr('font-size', size).rebuild()
      }
      // Set / get leading
    , leading: function(value) {
        /* act as getter */
        if (value == null)
          return this._leading
        
        /* act as setter */
        this._leading = new SVG.Number(value)
        
        return this.rebuild()
      }
      // Rebuild appearance type
    , rebuild: function(rebuild) {
        /* store new rebuild flag if given */
        if (typeof rebuild == 'boolean')
          this._rebuild = rebuild
  
        /* define position of all lines */
        if (this._rebuild) {
          var self = this
          
          this.lines.each(function() {
            if (this.newLined) {
              if (!this.textPath)
                this.attr('x', self.attr('x'))
              this.attr('dy', self._leading * new SVG.Number(self.attr('font-size'))) 
            }
          })
  
          this.fire('rebuild')
        }
  
        return this
      }
      // Enable / disable build mode
    , build: function(build) {
        this._build = !!build
        return this
      }
    }
    
    // Add parent method
  , construct: {
      // Create text element
      text: function(text) {
        return this.put(new SVG.Text).text(text)
      }
      // Create plain text element
    , plain: function(text) {
        return this.put(new SVG.Text).plain(text)
      }
    }
  
  })
  
  SVG.TSpan = SVG.invent({
    // Initialize node
    create: 'tspan'
  
    // Inherit from
  , inherit: SVG.Shape
  
    // Add class methods
  , extend: {
      // Set text content
      text: function(text) {
        if(text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '')
  
        typeof text === 'function' ? text.call(this, this) : this.plain(text)
  
        return this
      }
      // Shortcut dx
    , dx: function(dx) {
        return this.attr('dx', dx)
      }
      // Shortcut dy
    , dy: function(dy) {
        return this.attr('dy', dy)
      }
      // Create new line
    , newLine: function() {
        /* fetch text parent */
        var t = this.doc(SVG.Text)
  
        /* mark new line */
        this.newLined = true
  
        /* apply new hy¡n */
        return this.dy(t._leading * t.attr('font-size')).attr('x', t.x())
      }
    }
    
  })
  
  SVG.extend(SVG.Text, SVG.TSpan, {
    // Create plain text node
    plain: function(text) {
      /* clear if build mode is disabled */
      if (this._build === false)
        this.clear()
  
      /* create text node */
      this.node.appendChild(document.createTextNode((this.content = text)))
      
      return this
    }
    // Create a tspan
  , tspan: function(text) {
      var node  = (this.textPath || this).node
        , tspan = new SVG.TSpan
  
      /* clear if build mode is disabled */
      if (this._build === false)
        this.clear()
      
      /* add new tspan and reference */
      node.appendChild(tspan.node)
      tspan.parent = this
  
      /* only first level tspans are considered to be "lines" */
      if (this instanceof SVG.Text)
        this.lines.add(tspan)
  
      return tspan.text(text)
    }
    // Clear all lines
  , clear: function() {
      var node = (this.textPath || this).node
  
      /* remove existing child nodes */
      while (node.hasChildNodes())
        node.removeChild(node.lastChild)
      
      /* reset content references  */
      if (this instanceof SVG.Text) {
        delete this.lines
        this.lines = new SVG.Set
        this.content = ''
      }
      
      return this
    }
    // Get length of text element
  , length: function() {
      return this.node.getComputedTextLength()
    }
  })


  SVG.TextPath = SVG.invent({
    // Initialize node
    create: 'textPath'
  
    // Inherit from
  , inherit: SVG.Element
  
    // Define parent class
  , parent: SVG.Text
  
    // Add parent method
  , construct: {
      // Create path for text to run on
      path: function(d) {
        /* create textPath element */
        this.textPath = new SVG.TextPath
  
        /* move lines to textpath */
        while(this.node.hasChildNodes())
          this.textPath.node.appendChild(this.node.firstChild)
  
        /* add textPath element as child node */
        this.node.appendChild(this.textPath.node)
  
        /* create path in defs */
        this.track = this.doc().defs().path(d)
  
        /* create circular reference */
        this.textPath.parent = this
  
        /* link textPath to path and add content */
        this.textPath.attr('href', '#' + this.track, SVG.xlink)
  
        return this
      }
      // Plot path if any
    , plot: function(d) {
        if (this.track) this.track.plot(d)
        return this
      }
    }
  })

  SVG.Nested = SVG.invent({
    // Initialize node
    create: function() {
      this.constructor.call(this, SVG.create('svg'))
      
      this.style('overflow', 'visible')
    }
  
    // Inherit from
  , inherit: SVG.Container
    
    // Add parent method
  , construct: {
      // Create nested svg document
      nested: function() {
        return this.put(new SVG.Nested)
      }
    }
  })

  SVG.A = SVG.invent({
    // Initialize node
    create: 'a'
  
    // Inherit from
  , inherit: SVG.Container
  
    // Add class methods
  , extend: {
      // Link url
      to: function(url) {
        return this.attr('href', url, SVG.xlink)
      }
      // Link show attribute
    , show: function(target) {
        return this.attr('show', target, SVG.xlink)
      }
      // Link target attribute
    , target: function(target) {
        return this.attr('target', target)
      }
    }
    
    // Add parent method
  , construct: {
      // Create a hyperlink element
      link: function(url) {
        return this.put(new SVG.A).to(url)
      }
    }
  })
  
  SVG.extend(SVG.Element, {
    // Create a hyperlink element
    linkTo: function(url) {
      var link = new SVG.A
  
      if (typeof url == 'function')
        url.call(link, link)
      else
        link.to(url)
  
      return this.parent.put(link).put(this)
    }
    
  })

  SVG.Marker = SVG.invent({
    // Initialize node
    create: 'marker'
  
    // Inherit from
  , inherit: SVG.Container
  
    // Add class methods
  , extend: {
      // Set width of element
      width: function(width) {
        return this.attr('markerWidth', width)
      }
      // Set height of element
    , height: function(height) {
        return this.attr('markerHeight', height)
      }
      // Set marker refX and refY
    , ref: function(x, y) {
        return this.attr('refX', x).attr('refY', y)
      }
      // Update marker
    , update: function(block) {
        /* remove all content */
        this.clear()
        
        /* invoke passed block */
        if (typeof block == 'function')
          block.call(this, this)
        
        return this
      }
      // Return the fill id
    , toString: function() {
        return 'url(#' + this.id() + ')'
      }
    }
  
    // Add parent method
  , construct: {
      marker: function(width, height, block) {
        // Create marker element in defs
        return this.defs().marker(width, height, block)
      }
    }
  
  })
  
  SVG.extend(SVG.Defs, {
    // Create marker
    marker: function(width, height, block) {
      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
      return this.put(new SVG.Marker)
        .size(width, height)
        .ref(width / 2, height / 2)
        .viewbox(0, 0, width, height)
        .attr('orient', 'auto')
        .update(block)
    }
    
  })
  
  SVG.extend(SVG.Line, SVG.Polyline, SVG.Polygon, SVG.Path, {
    // Create and attach markers
    marker: function(marker, width, height, block) {
      var attr = ['marker']
  
      // Build attribute name
      if (marker != 'all') attr.push(marker)
      attr = attr.join('-')
  
      // Set marker attribute
      marker = arguments[1] instanceof SVG.Marker ?
        arguments[1] :
        this.doc().marker(width, height, block)
      
      return this.attr(attr, marker)
    }
    
  })

  var sugar = {
    stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset']
  , fill:   ['color', 'opacity', 'rule']
  , prefix: function(t, a) {
      return a == 'color' ? t : t + '-' + a
    }
  }
  
  /* Add sugar for fill and stroke */
  ;['fill', 'stroke'].forEach(function(m) {
    var i, extension = {}
    
    extension[m] = function(o) {
      if (typeof o == 'string' || SVG.Color.isRgb(o) || (o && typeof o.fill === 'function'))
        this.attr(m, o)
  
      else
        /* set all attributes from sugar.fill and sugar.stroke list */
        for (i = sugar[m].length - 1; i >= 0; i--)
          if (o[sugar[m][i]] != null)
            this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]])
      
      return this
    }
    
    SVG.extend(SVG.Element, SVG.FX, extension)
    
  })
  
  SVG.extend(SVG.Element, SVG.FX, {
    // Rotation
    rotate: function(deg, x, y) {
      return this.transform({
        rotation: deg || 0
      , cx: x
      , cy: y
      })
    }
    // Skew
  , skew: function(x, y) {
      return this.transform({
        skewX: x || 0
      , skewY: y || 0
      })
    }
    // Scale
  , scale: function(x, y) {
      return this.transform({
        scaleX: x
      , scaleY: y == null ? x : y
      })
    }
    // Translate
  , translate: function(x, y) {
      return this.transform({
        x: x
      , y: y
      })
    }
    // Matrix
  , matrix: function(m) {
      return this.transform({ matrix: m })
    }
    // Opacity
  , opacity: function(value) {
      return this.attr('opacity', value)
    }
  
  })
  
  SVG.extend(SVG.Rect, SVG.Ellipse, SVG.FX, {
    // Add x and y radius
    radius: function(x, y) {
      return this.attr({ rx: x, ry: y || x })
    }
  
  })
  
  SVG.extend(SVG.Path, {
    // Get path length
    length: function() {
      return this.node.getTotalLength()
    }
    // Get point at length
  , pointAt: function(length) {
      return this.node.getPointAtLength(length)
    }
  
  })
  
  SVG.extend(SVG.Parent, SVG.Text, SVG.FX, {
    // Set font 
    font: function(o) {
      for (var k in o)
        k == 'leading' ?
          this.leading(o[k]) :
        k == 'anchor' ?
          this.attr('text-anchor', o[k]) :
        k == 'size' || k == 'family' || k == 'weight' || k == 'stretch' || k == 'variant' || k == 'style' ?
          this.attr('font-'+ k, o[k]) :
          this.attr(k, o[k])
      
      return this
    }
    
  })
  


  SVG.Set = SVG.invent({
    // Initialize
    create: function() {
      /* set initial state */
      this.clear()
    }
  
    // Add class methods
  , extend: {
      // Add element to set
      add: function() {
        var i, il, elements = [].slice.call(arguments)
  
        for (i = 0, il = elements.length; i < il; i++)
          this.members.push(elements[i])
        
        return this
      }
      // Remove element from set
    , remove: function(element) {
        var i = this.index(element)
        
        /* remove given child */
        if (i > -1)
          this.members.splice(i, 1)
  
        return this
      }
      // Iterate over all members
    , each: function(block) {
        for (var i = 0, il = this.members.length; i < il; i++)
          block.apply(this.members[i], [i, this.members])
  
        return this
      }
      // Restore to defaults
    , clear: function() {
        /* initialize store */
        this.members = []
  
        return this
      }
      // Checks if a given element is present in set
    , has: function(element) {
        return this.index(element) >= 0
      }
      // retuns index of given element in set
    , index: function(element) {
        return this.members.indexOf(element)
      }
      // Get member at given index
    , get: function(i) {
        return this.members[i]
      }
      // Get first member
    , first: function() {
        return this.get(0)
      }
      // Get last member
    , last: function() {
        return this.get(this.members.length - 1)
      }
      // Default value
    , valueOf: function() {
        return this.members
      }
      // Get the bounding box of all members included or empty box if set has no items
    , bbox: function(){
        var box = new SVG.BBox()
  
        /* return an empty box of there are no members */
        if (this.members.length == 0)
          return box
  
        /* get the first rbox and update the target bbox */
        var rbox = this.members[0].rbox()
        box.x      = rbox.x
        box.y      = rbox.y
        box.width  = rbox.width
        box.height = rbox.height
  
        this.each(function() {
          /* user rbox for correct position and visual representation */
          box = box.merge(this.rbox())
        })
  
        return box
      }
    }
    
    // Add parent method
  , construct: {
      // Create a new set
      set: function() {
        return new SVG.Set
      }
    }
  })
  
  SVG.SetFX = SVG.invent({
    // Initialize node
    create: function(set) {
      /* store reference to set */
      this.set = set
    }
  
  })
  
  // Alias methods
  SVG.Set.inherit = function() {
    var m
      , methods = []
    
    /* gather shape methods */
    for(var m in SVG.Shape.prototype)
      if (typeof SVG.Shape.prototype[m] == 'function' && typeof SVG.Set.prototype[m] != 'function')
        methods.push(m)
  
    /* apply shape aliasses */
    methods.forEach(function(method) {
      SVG.Set.prototype[method] = function() {
        for (var i = 0, il = this.members.length; i < il; i++)
          if (this.members[i] && typeof this.members[i][method] == 'function')
            this.members[i][method].apply(this.members[i], arguments)
  
        return method == 'animate' ? (this.fx || (this.fx = new SVG.SetFX(this))) : this
      }
    })
  
    /* clear methods for the next round */
    methods = []
  
    /* gather fx methods */
    for(var m in SVG.FX.prototype)
      if (typeof SVG.FX.prototype[m] == 'function' && typeof SVG.SetFX.prototype[m] != 'function')
        methods.push(m)
  
    /* apply fx aliasses */
    methods.forEach(function(method) {
      SVG.SetFX.prototype[method] = function() {
        for (var i = 0, il = this.set.members.length; i < il; i++)
          this.set.members[i].fx[method].apply(this.set.members[i].fx, arguments)
  
        return this
      }
    })
  }
  
  


  SVG.extend(SVG.Element, {
  	// Store data values on svg nodes
    data: function(a, v, r) {
    	if (typeof a == 'object') {
    		for (v in a)
    			this.data(v, a[v])
  
      } else if (arguments.length < 2) {
        try {
          return JSON.parse(this.attr('data-' + a))
        } catch(e) {
          return this.attr('data-' + a)
        }
        
      } else {
        this.attr(
          'data-' + a
        , v === null ?
            null :
          r === true || typeof v === 'string' || typeof v === 'number' ?
            v :
            JSON.stringify(v)
        )
      }
      
      return this
    }
  })

  SVG.extend(SVG.Element, {
    // Remember arbitrary data
    remember: function(k, v) {
      /* remember every item in an object individually */
      if (typeof arguments[0] == 'object')
        for (var v in k)
          this.remember(v, k[v])
  
      /* retrieve memory */
      else if (arguments.length == 1)
        return this.memory()[k]
  
      /* store memory */
      else
        this.memory()[k] = v
  
      return this
    }
  
    // Erase a given memory
  , forget: function() {
      if (arguments.length == 0)
        this._memory = {}
      else
        for (var i = arguments.length - 1; i >= 0; i--)
          delete this.memory()[arguments[i]]
  
      return this
    }
  
    // Initialize or return local memory object
  , memory: function() {
      return this._memory || (this._memory = {})
    }
  
  })

  function camelCase(s) { 
    return s.toLowerCase().replace(/-(.)/g, function(m, g) {
      return g.toUpperCase()
    })
  }
  
  // Ensure to six-based hex 
  function fullHex(hex) {
    return hex.length == 4 ?
      [ '#',
        hex.substring(1, 2), hex.substring(1, 2)
      , hex.substring(2, 3), hex.substring(2, 3)
      , hex.substring(3, 4), hex.substring(3, 4)
      ].join('') : hex
  }
  
  // Component to hex value
  function compToHex(comp) {
    var hex = comp.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }
  
  // Calculate proportional width and height values when necessary
  function proportionalSize(box, width, height) {
    if (width == null || height == null) {
      if (height == null)
        height = box.height / box.width * width
      else if (width == null)
        width = box.width / box.height * height
    }
    
    return {
      width:  width
    , height: height
    }
  }
  
  // Calculate position according to from and to
  function at(o, pos) {
    /* number recalculation (don't bother converting to SVG.Number for performance reasons) */
    return typeof o.from == 'number' ?
      o.from + (o.to - o.from) * pos :
    
    /* instance recalculation */
    o instanceof SVG.Color || o instanceof SVG.Number ? o.at(pos) :
    
    /* for all other values wait until pos has reached 1 to return the final value */
    pos < 1 ? o.from : o.to
  }
  
  // PathArray Helpers
  function arrayToString(a) {
    for (var i = 0, il = a.length, s = ''; i < il; i++) {
      s += a[i][0]
  
      if (a[i][1] != null) {
        s += a[i][1]
  
        if (a[i][2] != null) {
          s += ' '
          s += a[i][2]
  
          if (a[i][3] != null) {
            s += ' '
            s += a[i][3]
            s += ' '
            s += a[i][4]
  
            if (a[i][5] != null) {
              s += ' '
              s += a[i][5]
              s += ' '
              s += a[i][6]
  
              if (a[i][7] != null) {
                s += ' '
                s += a[i][7]
              }
            }
          }
        }
      }
    }
    
    return s + ' '
  }
  
  // Add more bounding box properties
  function boxProperties(b) {
    b.x2 = b.x + b.width
    b.y2 = b.y + b.height
    b.cx = b.x + b.width / 2
    b.cy = b.y + b.height / 2
  }
  
  // Parse a matrix string
  function parseMatrix(o) {
    if (o.matrix) {
      /* split matrix string */
      var m = o.matrix.replace(/\s/g, '').split(',')
      
      /* pasrse values */
      if (m.length == 6) {
        o.a = parseFloat(m[0])
        o.b = parseFloat(m[1])
        o.c = parseFloat(m[2])
        o.d = parseFloat(m[3])
        o.e = parseFloat(m[4])
        o.f = parseFloat(m[5])
      }
    }
    
    return o
  }
  
  // Get id from reference string
  function idFromReference(url) {
    var m = url.toString().match(SVG.regex.reference)
  
    if (m) return m[1]
  }


  return SVG
}));

},{}],30:[function(require,module,exports){
'use strict';

var _svg = require('svg.js');

var _svg2 = _interopRequireDefault(_svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

    /**
     *
     */
    build: function build() {
        var self = this;

        // create an element for this graph
        self.element = document.createElement('div');

        // set the elements id
        self.element.id = self.id;

        // add the div to the page
        document.body.appendChild(self.element);

        // set the element
        self.svg = (0, _svg2.default)(self.id);

        // start the
        self.start();
    },

    /**
     *
     */
    start: function start() {
        console.error('This function needs to be overwritten');
    },

    /**
     *
     * @returns {SVG}
     */
    draw: function draw() {
        return this.svg;
    }

};

},{"svg.js":29}],31:[function(require,module,exports){
'use strict';

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _BaseGraph = require('../BaseGraph');

var _BaseGraph2 = _interopRequireDefault(_BaseGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _objectAssign2.default)(_BaseGraph2.default, {

    // this is the id
    id: 'time-spent',

    /**
     *
     */
    start: function start() {
        var self = this;
    }

});

},{"../BaseGraph":30,"object-assign":28}],32:[function(require,module,exports){
'use strict';

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphs = [];

// this just bootstraps all the different graphs
graphs.push(require('./graphs/time-spent'));

// loop through each graph and build them
(0, _forEach3.default)(graphs, function (graph) {
    setTimeout(function () {
        graph.build();
    }, 0);
});

},{"./graphs/time-spent":31,"lodash/forEach":16}]},{},[32])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5RWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VDYXN0RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGb3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRm9yT3duLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUhhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlQmFzZUVhY2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jcmVhdGVCYXNlRm9yLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faW5kZXhLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzUHJvdG90eXBlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9mb3JFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5TGlrZU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3ZnLmpzL2Rpc3Qvc3ZnLmpzIiwic3JjL2dyYXBocy9CYXNlR3JhcGguanMiLCJzcmMvZ3JhcGhzL3RpbWUtc3BlbnQvaW5kZXguanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzk1SEE7O0FBRUE7Ozs7OztBQUVBLE9BQU8sT0FBUCxHQUFpQjs7Ozs7QUFLYixXQUFPLGlCQUFZO0FBQ2YsWUFBSSxPQUFPLElBQVA7OztBQURXLFlBSWYsQ0FBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWY7OztBQUplLFlBT2YsQ0FBSyxPQUFMLENBQWEsRUFBYixHQUFrQixLQUFLLEVBQUw7OztBQVBILGdCQVVmLENBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxPQUFMLENBQTFCOzs7QUFWZSxZQWFmLENBQUssR0FBTCxHQUFXLG1CQUFJLEtBQUssRUFBTCxDQUFmOzs7QUFiZSxZQWdCZixDQUFLLEtBQUwsR0FoQmU7S0FBWjs7Ozs7QUFzQlAsV0FBTyxpQkFBWTtBQUNmLGdCQUFRLEtBQVIsQ0FBYyx1Q0FBZCxFQURlO0tBQVo7Ozs7OztBQVFQLFVBQU0sZ0JBQVk7QUFDZCxlQUFPLEtBQUssR0FBTCxDQURPO0tBQVo7O0NBbkNWOzs7QUNKQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsaURBQXdCOzs7QUFHckMsUUFBSSxZQUFKOzs7OztBQUtBLFdBQU8saUJBQVk7QUFDZixZQUFJLE9BQU8sSUFBUCxDQURXO0tBQVo7O0NBUk0sQ0FBakI7OztBQ0xBOzs7Ozs7OztBQUlBLElBQUksU0FBUyxFQUFUOzs7QUFHSixPQUFPLElBQVAsQ0FBWSxRQUFRLHFCQUFSLENBQVo7OztBQUdBLHVCQUFVLE1BQVYsRUFBa0IsVUFBQyxLQUFELEVBQVc7QUFDekIsZUFBVyxZQUFZO0FBQ25CLGNBQU0sS0FBTixHQURtQjtLQUFaLEVBRVIsQ0FGSCxFQUR5QjtDQUFYLENBQWxCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RWFjaDtcbiIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGBpZGVudGl0eWAgaWYgaXQncyBub3QgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXktbGlrZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDYXN0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nID8gdmFsdWUgOiBpZGVudGl0eTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ2FzdEZ1bmN0aW9uO1xuIiwidmFyIGJhc2VGb3JPd24gPSByZXF1aXJlKCcuL19iYXNlRm9yT3duJyksXG4gICAgY3JlYXRlQmFzZUVhY2ggPSByZXF1aXJlKCcuL19jcmVhdGVCYXNlRWFjaCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckVhY2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG52YXIgYmFzZUVhY2ggPSBjcmVhdGVCYXNlRWFjaChiYXNlRm9yT3duKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRWFjaDtcbiIsInZhciBjcmVhdGVCYXNlRm9yID0gcmVxdWlyZSgnLi9fY3JlYXRlQmFzZUZvcicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9ySW5gIGFuZCBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXNcbiAqIG92ZXIgYG9iamVjdGAgcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGludm9raW5nIGBpdGVyYXRlZWAgZm9yXG4gKiBlYWNoIHByb3BlcnR5LiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHlcbiAqIHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9yO1xuIiwidmFyIGJhc2VGb3IgPSByZXF1aXJlKCcuL19iYXNlRm9yJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvck93bjtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc2Agd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VIYXMob2JqZWN0LCBrZXkpIHtcbiAgLy8gQXZvaWQgYSBidWcgaW4gSUUgMTAtMTEgd2hlcmUgb2JqZWN0cyB3aXRoIGEgW1tQcm90b3R5cGVdXSBvZiBgbnVsbGAsXG4gIC8vIHRoYXQgYXJlIGNvbXBvc2VkIGVudGlyZWx5IG9mIGluZGV4IHByb3BlcnRpZXMsIHJldHVybiBgZmFsc2VgIGZvclxuICAvLyBgaGFzT3duUHJvcGVydHlgIGNoZWNrcyBvZiB0aGVtLlxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgfHxcbiAgICAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJiBrZXkgaW4gb2JqZWN0ICYmIGdldFByb3RvdHlwZU9mKG9iamVjdCkgPT09IG51bGwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VIYXM7XG4iLCIvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3Qgc2tpcCB0aGUgY29uc3RydWN0b3JcbiAqIHByb3BlcnR5IG9mIHByb3RvdHlwZXMgb3IgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIHJldHVybiBuYXRpdmVLZXlzKE9iamVjdChvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlS2V5cztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVGltZXM7XG4iLCJ2YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBiYXNlRWFjaGAgb3IgYGJhc2VFYWNoUmlnaHRgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGEgY29sbGVjdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUVhY2goZWFjaEZ1bmMsIGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9XG4gICAgaWYgKCFpc0FycmF5TGlrZShjb2xsZWN0aW9uKSkge1xuICAgICAgcmV0dXJuIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChjb2xsZWN0aW9uKTtcblxuICAgIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVbaW5kZXhdLCBpbmRleCwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQmFzZUVhY2g7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCYXNlRm9yO1xuIiwidmFyIGJhc2VQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2Jhc2VQcm9wZXJ0eScpO1xuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldExlbmd0aDtcbiIsInZhciBiYXNlVGltZXMgPSByZXF1aXJlKCcuL19iYXNlVGltZXMnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNTdHJpbmcgPSByZXF1aXJlKCcuL2lzU3RyaW5nJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBpbmRleCBrZXlzIGZvciBgb2JqZWN0YCB2YWx1ZXMgb2YgYXJyYXlzLFxuICogYGFyZ3VtZW50c2Agb2JqZWN0cywgYW5kIHN0cmluZ3MsIG90aGVyd2lzZSBgbnVsbGAgaXMgcmV0dXJuZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheXxudWxsfSBSZXR1cm5zIGluZGV4IGtleXMsIGVsc2UgYG51bGxgLlxuICovXG5mdW5jdGlvbiBpbmRleEtleXMob2JqZWN0KSB7XG4gIHZhciBsZW5ndGggPSBvYmplY3QgPyBvYmplY3QubGVuZ3RoIDogdW5kZWZpbmVkO1xuICBpZiAoaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc1N0cmluZyhvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIGJhc2VUaW1lcyhsZW5ndGgsIFN0cmluZyk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5kZXhLZXlzO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vX2FycmF5RWFjaCcpLFxuICAgIGJhc2VDYXN0RnVuY3Rpb24gPSByZXF1aXJlKCcuL19iYXNlQ2FzdEZ1bmN0aW9uJyksXG4gICAgYmFzZUVhY2ggPSByZXF1aXJlKCcuL19iYXNlRWFjaCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvciBlYWNoIGVsZW1lbnQuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiIHByb3BlcnR5XG4gKiBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYCBvciBgXy5mb3JPd25gXG4gKiBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGVhY2hcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfKFsxLCAyXSkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICogICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gKiB9KTtcbiAqIC8vID0+IGxvZ3MgYDFgIHRoZW4gYDJgXG4gKlxuICogXy5mb3JFYWNoKHsgJ2EnOiAxLCAnYic6IDIgfSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBsb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHJldHVybiAodHlwZW9mIGl0ZXJhdGVlID09ICdmdW5jdGlvbicgJiYgaXNBcnJheShjb2xsZWN0aW9uKSlcbiAgICA/IGFycmF5RWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSlcbiAgICA6IGJhc2VFYWNoKGNvbGxlY3Rpb24sIGJhc2VDYXN0RnVuY3Rpb24oaXRlcmF0ZWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBnaXZlbiB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwidmFyIGlzQXJyYXlMaWtlT2JqZWN0ID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZU9iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBpbmNvcnJlY3RseSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwidmFyIGdldExlbmd0aCA9IHJlcXVpcmUoJy4vX2dldExlbmd0aCcpLFxuICAgIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcbiIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZU9iamVjdDtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCB3ZWFrIG1hcCBjb25zdHJ1Y3RvcnMsXG4gIC8vIGFuZCBQaGFudG9tSlMgMS45IHdoaWNoIHJldHVybnMgJ2Z1bmN0aW9uJyBmb3IgYE5vZGVMaXN0YCBpbnN0YW5jZXMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBsb29zZWx5IGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3RyaW5nYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3RyaW5nKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3RyaW5nKDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fFxuICAgICghaXNBcnJheSh2YWx1ZSkgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzdHJpbmdUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3RyaW5nO1xuIiwidmFyIGJhc2VIYXMgPSByZXF1aXJlKCcuL19iYXNlSGFzJyksXG4gICAgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGluZGV4S2V5cyA9IHJlcXVpcmUoJy4vX2luZGV4S2V5cycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCk7XG4gIGlmICghKGlzUHJvdG8gfHwgaXNBcnJheUxpa2Uob2JqZWN0KSkpIHtcbiAgICByZXR1cm4gYmFzZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgaW5kZXhlcyA9IGluZGV4S2V5cyhvYmplY3QpLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWluZGV4ZXMsXG4gICAgICByZXN1bHQgPSBpbmRleGVzIHx8IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKGJhc2VIYXMob2JqZWN0LCBrZXkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpICYmXG4gICAgICAgICEoaXNQcm90byAmJiBrZXkgPT0gJ2NvbnN0cnVjdG9yJykpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4ndXNlIHN0cmljdCc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvKiBzdmcuanMgMS4xLjAtNS1nYzY2ZDI0YSAtIHN2ZyBzZWxlY3RvciBpbnZlbnRvciBwb2x5ZmlsbCByZWdleCBkZWZhdWx0IGNvbG9yIGFycmF5IHBvaW50YXJyYXkgcGF0aGFycmF5IG51bWJlciB2aWV3Ym94IGJib3ggcmJveCBlbGVtZW50IHBhcmVudCBjb250YWluZXIgZnggcmVsYXRpdmUgZXZlbnQgZGVmcyBncm91cCBhcnJhbmdlIG1hc2sgY2xpcCBncmFkaWVudCBwYXR0ZXJuIGRvYyBzaGFwZSBzeW1ib2wgdXNlIHJlY3QgZWxsaXBzZSBsaW5lIHBvbHkgcGF0aCBpbWFnZSB0ZXh0IHRleHRwYXRoIG5lc3RlZCBoeXBlcmxpbmsgbWFya2VyIHN1Z2FyIHNldCBkYXRhIG1lbW9yeSBoZWxwZXJzIC0gc3ZnanMuY29tL2xpY2Vuc2UgKi9cclxuOyhmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XHJcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgZGVmaW5lKGZhY3RvcnkpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcm9vdC5TVkcgPSBmYWN0b3J5KCk7XHJcbiAgfVxyXG59KHRoaXMsIGZ1bmN0aW9uKCkge1xyXG5cclxuICB2YXIgU1ZHID0gdGhpcy5TVkcgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICBpZiAoU1ZHLnN1cHBvcnRlZCkge1xyXG4gICAgICBlbGVtZW50ID0gbmV3IFNWRy5Eb2MoZWxlbWVudClcclxuICBcclxuICAgICAgaWYgKCFTVkcucGFyc2VyKVxyXG4gICAgICAgIFNWRy5wcmVwYXJlKGVsZW1lbnQpXHJcbiAgXHJcbiAgICAgIHJldHVybiBlbGVtZW50XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8vIERlZmF1bHQgbmFtZXNwYWNlc1xyXG4gIFNWRy5ucyAgICA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcclxuICBTVkcueG1sbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nXHJcbiAgU1ZHLnhsaW5rID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnXHJcbiAgXHJcbiAgLy8gRWxlbWVudCBpZCBzZXF1ZW5jZVxyXG4gIFNWRy5kaWQgID0gMTAwMFxyXG4gIFxyXG4gIC8vIEdldCBuZXh0IG5hbWVkIGVsZW1lbnQgaWRcclxuICBTVkcuZWlkID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgcmV0dXJuICdTdmdqcycgKyBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSArIChTVkcuZGlkKyspXHJcbiAgfVxyXG4gIFxyXG4gIC8vIE1ldGhvZCBmb3IgZWxlbWVudCBjcmVhdGlvblxyXG4gIFNWRy5jcmVhdGUgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAvKiBjcmVhdGUgZWxlbWVudCAqL1xyXG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModGhpcy5ucywgbmFtZSlcclxuICAgIFxyXG4gICAgLyogYXBwbHkgdW5pcXVlIGlkICovXHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmVpZChuYW1lKSlcclxuICAgIFxyXG4gICAgcmV0dXJuIGVsZW1lbnRcclxuICB9XHJcbiAgXHJcbiAgLy8gTWV0aG9kIGZvciBleHRlbmRpbmcgb2JqZWN0c1xyXG4gIFNWRy5leHRlbmQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBtb2R1bGVzLCBtZXRob2RzLCBrZXksIGlcclxuICAgIFxyXG4gICAgLyogZ2V0IGxpc3Qgb2YgbW9kdWxlcyAqL1xyXG4gICAgbW9kdWxlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxyXG4gICAgXHJcbiAgICAvKiBnZXQgb2JqZWN0IHdpdGggZXh0ZW5zaW9ucyAqL1xyXG4gICAgbWV0aG9kcyA9IG1vZHVsZXMucG9wKClcclxuICAgIFxyXG4gICAgZm9yIChpID0gbW9kdWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgaWYgKG1vZHVsZXNbaV0pXHJcbiAgICAgICAgZm9yIChrZXkgaW4gbWV0aG9kcylcclxuICAgICAgICAgIG1vZHVsZXNbaV0ucHJvdG90eXBlW2tleV0gPSBtZXRob2RzW2tleV1cclxuICBcclxuICAgIC8qIG1ha2Ugc3VyZSBTVkcuU2V0IGluaGVyaXRzIGFueSBuZXdseSBhZGRlZCBtZXRob2RzICovXHJcbiAgICBpZiAoU1ZHLlNldCAmJiBTVkcuU2V0LmluaGVyaXQpXHJcbiAgICAgIFNWRy5TZXQuaW5oZXJpdCgpXHJcbiAgfVxyXG4gIFxyXG4gIC8vIEluaXRpYWxpemUgcGFyc2luZyBlbGVtZW50XHJcbiAgU1ZHLnByZXBhcmUgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAvKiBzZWxlY3QgZG9jdW1lbnQgYm9keSBhbmQgY3JlYXRlIGludmlzaWJsZSBzdmcgZWxlbWVudCAqL1xyXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdXHJcbiAgICAgICwgZHJhdyA9IChib2R5ID8gbmV3IFNWRy5Eb2MoYm9keSkgOiBlbGVtZW50Lm5lc3RlZCgpKS5zaXplKDIsIDApXHJcbiAgICAgICwgcGF0aCA9IFNWRy5jcmVhdGUoJ3BhdGgnKVxyXG4gIFxyXG4gICAgLyogaW5zZXJ0IHBhcnNlcnMgKi9cclxuICAgIGRyYXcubm9kZS5hcHBlbmRDaGlsZChwYXRoKVxyXG4gIFxyXG4gICAgLyogY3JlYXRlIHBhcnNlciBvYmplY3QgKi9cclxuICAgIFNWRy5wYXJzZXIgPSB7XHJcbiAgICAgIGJvZHk6IGJvZHkgfHwgZWxlbWVudC5wYXJlbnRcclxuICAgICwgZHJhdzogZHJhdy5zdHlsZSgnb3BhY2l0eTowO3Bvc2l0aW9uOmZpeGVkO2xlZnQ6MTAwJTt0b3A6MTAwJTtvdmVyZmxvdzpoaWRkZW4nKVxyXG4gICAgLCBwb2x5OiBkcmF3LnBvbHlsaW5lKCkubm9kZVxyXG4gICAgLCBwYXRoOiBwYXRoXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8vIHN2ZyBzdXBwb3J0IHRlc3RcclxuICBTVkcuc3VwcG9ydGVkID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuICEhIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJlxyXG4gICAgICAgICAgICEhIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkcubnMsJ3N2ZycpLmNyZWF0ZVNWR1JlY3RcclxuICB9KSgpXHJcbiAgXHJcbiAgaWYgKCFTVkcuc3VwcG9ydGVkKSByZXR1cm4gZmFsc2VcclxuXHJcblxyXG4gIFNWRy5nZXQgPSBmdW5jdGlvbihpZCkge1xyXG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZEZyb21SZWZlcmVuY2UoaWQpIHx8IGlkKVxyXG4gICAgaWYgKG5vZGUpIHJldHVybiBub2RlLmluc3RhbmNlXHJcbiAgfVxyXG5cclxuICBTVkcuaW52ZW50ID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgXHQvKiBjcmVhdGUgZWxlbWVudCBpbml0aWFsaXplciAqL1xyXG4gIFx0dmFyIGluaXRpYWxpemVyID0gdHlwZW9mIGNvbmZpZy5jcmVhdGUgPT0gJ2Z1bmN0aW9uJyA/XHJcbiAgXHRcdGNvbmZpZy5jcmVhdGUgOlxyXG4gIFx0XHRmdW5jdGlvbigpIHtcclxuICBcdFx0XHR0aGlzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgU1ZHLmNyZWF0ZShjb25maWcuY3JlYXRlKSlcclxuICBcdFx0fVxyXG4gIFxyXG4gIFx0LyogaW5oZXJpdCBwcm90b3R5cGUgKi9cclxuICBcdGlmIChjb25maWcuaW5oZXJpdClcclxuICBcdFx0aW5pdGlhbGl6ZXIucHJvdG90eXBlID0gbmV3IGNvbmZpZy5pbmhlcml0XHJcbiAgXHJcbiAgXHQvKiBleHRlbmQgd2l0aCBtZXRob2RzICovXHJcbiAgXHRpZiAoY29uZmlnLmV4dGVuZClcclxuICBcdFx0U1ZHLmV4dGVuZChpbml0aWFsaXplciwgY29uZmlnLmV4dGVuZClcclxuICBcclxuICBcdC8qIGF0dGFjaCBjb25zdHJ1Y3QgbWV0aG9kIHRvIHBhcmVudCAqL1xyXG4gIFx0aWYgKGNvbmZpZy5jb25zdHJ1Y3QpXHJcbiAgXHRcdFNWRy5leHRlbmQoY29uZmlnLnBhcmVudCB8fCBTVkcuQ29udGFpbmVyLCBjb25maWcuY29uc3RydWN0KVxyXG4gIFxyXG4gIFx0cmV0dXJuIGluaXRpYWxpemVyXHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAvLyBDb2RlIGZyb206IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudFxyXG4gICAgdmFyIEN1c3RvbUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIG9wdGlvbnMpIHtcclxuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH1cclxuICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxyXG4gICAgICBlLmluaXRDdXN0b21FdmVudChldmVudCwgb3B0aW9ucy5idWJibGVzLCBvcHRpb25zLmNhbmNlbGFibGUsIG9wdGlvbnMuZGV0YWlsKVxyXG4gICAgICByZXR1cm4gZVxyXG4gICAgfVxyXG4gIFxyXG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZVxyXG4gIFxyXG4gICAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnRcclxuICB9XHJcbiAgXHJcbiAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIC8gY2FuY2VsQW5pbWF0aW9uRnJhbWUgUG9seWZpbGwgd2l0aCBmYWxsYmFjayBiYXNlZCBvbiBQYXVsIElyaXNoXHJcbiAgKGZ1bmN0aW9uKHcpIHtcclxuICAgIHZhciBsYXN0VGltZSA9IDBcclxuICAgIHZhciB2ZW5kb3JzID0gWydtb3onLCAnd2Via2l0J11cclxuICAgIFxyXG4gICAgZm9yKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcclxuICAgICAgdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3W3ZlbmRvcnNbeF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ11cclxuICAgICAgdy5jYW5jZWxBbmltYXRpb25GcmFtZSAgPSB3W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdbdmVuZG9yc1t4XSArICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXVxyXG4gICAgfVxyXG4gICBcclxuICAgIHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgXHJcbiAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBpZCA9IHcuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbClcclxuICAgICAgICB9LCB0aW1lVG9DYWxsKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsXHJcbiAgICAgICAgcmV0dXJuIGlkXHJcbiAgICAgIH1cclxuICAgXHJcbiAgICB3LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3LmNsZWFyVGltZW91dDtcclxuICBcclxuICB9KHdpbmRvdykpXHJcblxyXG4gIFNWRy5yZWdleCA9IHtcclxuICAgIC8qIHBhcnNlIHVuaXQgdmFsdWUgKi9cclxuICAgIHVuaXQ6ICAgICAgICAgL14oLT9bXFxkXFwuXSspKFthLXolXXswLDJ9KSQvXHJcbiAgICBcclxuICAgIC8qIHBhcnNlIGhleCB2YWx1ZSAqL1xyXG4gICwgaGV4OiAgICAgICAgICAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pXHJcbiAgICBcclxuICAgIC8qIHBhcnNlIHJnYiB2YWx1ZSAqL1xyXG4gICwgcmdiOiAgICAgICAgICAvcmdiXFwoKFxcZCspLChcXGQrKSwoXFxkKylcXCkvXHJcbiAgICBcclxuICAgIC8qIHBhcnNlIHJlZmVyZW5jZSBpZCAqL1xyXG4gICwgcmVmZXJlbmNlOiAgICAvIyhbYS16MC05XFwtX10rKS9pXHJcbiAgXHJcbiAgICAvKiB0ZXN0IGhleCB2YWx1ZSAqL1xyXG4gICwgaXNIZXg6ICAgICAgICAvXiNbYS1mMC05XXszLDZ9JC9pXHJcbiAgICBcclxuICAgIC8qIHRlc3QgcmdiIHZhbHVlICovXHJcbiAgLCBpc1JnYjogICAgICAgIC9ecmdiXFwoL1xyXG4gICAgXHJcbiAgICAvKiB0ZXN0IGNzcyBkZWNsYXJhdGlvbiAqL1xyXG4gICwgaXNDc3M6ICAgICAgICAvW146XSs6W147XSs7Py9cclxuICAgIFxyXG4gICAgLyogdGVzdCBmb3IgYmxhbmsgc3RyaW5nICovXHJcbiAgLCBpc0JsYW5rOiAgICAgIC9eKFxccyspPyQvXHJcbiAgICBcclxuICAgIC8qIHRlc3QgZm9yIG51bWVyaWMgc3RyaW5nICovXHJcbiAgLCBpc051bWJlcjogICAgIC9eLT9bXFxkXFwuXSskL1xyXG4gIFxyXG4gICAgLyogdGVzdCBmb3IgcGVyY2VudCB2YWx1ZSAqL1xyXG4gICwgaXNQZXJjZW50OiAgICAvXi0/W1xcZFxcLl0rJSQvXHJcbiAgXHJcbiAgICAvKiB0ZXN0IGZvciBpbWFnZSB1cmwgKi9cclxuICAsIGlzSW1hZ2U6ICAgICAgL1xcLihqcGd8anBlZ3xwbmd8Z2lmKShcXD9bXj1dKy4qKT8vaVxyXG4gICAgXHJcbiAgICAvKiB0ZXN0IGZvciBuYW1lc3BhY2VkIGV2ZW50ICovXHJcbiAgLCBpc0V2ZW50OiAgICAgIC9eW1xcd10rLltcXHddKyQvXHJcbiAgXHJcbiAgICAvLyBUaGUgZm9sbG93aW5nIHJlZ2V4IGFyZSB1c2VkIHRvIHBhcnNlIHRoZSBkIGF0dHJpYnV0ZSBvZiBhIHBhdGhcclxuICBcclxuICAgIC8vIFJlcGxhY2VzIGFsbCBuZWdhdGl2ZSBleHBvbmVudHNcclxuICAsIG5lZ0V4cDogICAgICAgICAgIC9lXFwtL2dpXHJcbiAgXHJcbiAgICAvLyBSZXBsYWNlcyBhbGwgY29tbWFcclxuICAsIGNvbW1hOiAgICAgICAgICAgIC8sL2dcclxuICBcclxuICAgIC8vIFJlcGxhY2VzIGFsbCBoeXBoZW5zXHJcbiAgLCBoeXBoZW46ICAgICAgICAgICAvXFwtL2dcclxuICBcclxuICAgIC8vIFJlcGxhY2VzIGFuZCB0ZXN0cyBmb3IgYWxsIHBhdGggbGV0dGVyc1xyXG4gICwgcGF0aExldHRlcnM6ICAgICAgL1tNTEhWQ1NRVEFaXS9naVxyXG4gIFxyXG4gICAgLy8geWVzIHdlIG5lZWQgdGhpcyBvbmUsIHRvb1xyXG4gICwgaXNQYXRoTGV0dGVyOiAgICAgL1tNTEhWQ1NRVEFaXS9pXHJcbiAgXHJcbiAgICAvLyBzcGxpdCBhdCB3aGl0ZXNwYWNlc1xyXG4gICwgd2hpdGVzcGFjZXM6ICAgICAgL1xccysvXHJcbiAgXHJcbiAgICAvLyBtYXRjaGVzIFhcclxuICAsIFg6ICAgICAgICAgICAgICAgIC9YL2dcclxuICB9XHJcblxyXG4gIFNWRy5kZWZhdWx0cyA9IHtcclxuICAgIC8vIERlZmF1bHQgbWF0cml4XHJcbiAgICBtYXRyaXg6ICAgICAgICcxIDAgMCAxIDAgMCdcclxuICAgIFxyXG4gICAgLy8gRGVmYXVsdCBhdHRyaWJ1dGUgdmFsdWVzXHJcbiAgLCBhdHRyczoge1xyXG4gICAgICAvKiBmaWxsIGFuZCBzdHJva2UgKi9cclxuICAgICAgJ2ZpbGwtb3BhY2l0eSc6ICAgICAxXHJcbiAgICAsICdzdHJva2Utb3BhY2l0eSc6ICAgMVxyXG4gICAgLCAnc3Ryb2tlLXdpZHRoJzogICAgIDBcclxuICAgICwgJ3N0cm9rZS1saW5lam9pbic6ICAnbWl0ZXInXHJcbiAgICAsICdzdHJva2UtbGluZWNhcCc6ICAgJ2J1dHQnXHJcbiAgICAsIGZpbGw6ICAgICAgICAgICAgICAgJyMwMDAwMDAnXHJcbiAgICAsIHN0cm9rZTogICAgICAgICAgICAgJyMwMDAwMDAnXHJcbiAgICAsIG9wYWNpdHk6ICAgICAgICAgICAgMVxyXG4gICAgICAvKiBwb3NpdGlvbiAqL1xyXG4gICAgLCB4OiAgICAgICAgICAgICAgICAgIDBcclxuICAgICwgeTogICAgICAgICAgICAgICAgICAwXHJcbiAgICAsIGN4OiAgICAgICAgICAgICAgICAgMFxyXG4gICAgLCBjeTogICAgICAgICAgICAgICAgIDBcclxuICAgICAgLyogc2l6ZSAqLyAgXHJcbiAgICAsIHdpZHRoOiAgICAgICAgICAgICAgMFxyXG4gICAgLCBoZWlnaHQ6ICAgICAgICAgICAgIDBcclxuICAgICAgLyogcmFkaXVzICovICBcclxuICAgICwgcjogICAgICAgICAgICAgICAgICAwXHJcbiAgICAsIHJ4OiAgICAgICAgICAgICAgICAgMFxyXG4gICAgLCByeTogICAgICAgICAgICAgICAgIDBcclxuICAgICAgLyogZ3JhZGllbnQgKi8gIFxyXG4gICAgLCBvZmZzZXQ6ICAgICAgICAgICAgIDBcclxuICAgICwgJ3N0b3Atb3BhY2l0eSc6ICAgICAxXHJcbiAgICAsICdzdG9wLWNvbG9yJzogICAgICAgJyMwMDAwMDAnXHJcbiAgICAgIC8qIHRleHQgKi9cclxuICAgICwgJ2ZvbnQtc2l6ZSc6ICAgICAgICAxNlxyXG4gICAgLCAnZm9udC1mYW1pbHknOiAgICAgICdIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJ1xyXG4gICAgLCAndGV4dC1hbmNob3InOiAgICAgICdzdGFydCdcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gRGVmYXVsdCB0cmFuc2Zvcm1hdGlvbiB2YWx1ZXNcclxuICAsIHRyYW5zOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAvKiB0cmFuc2xhdGUgKi9cclxuICAgICAgICB4OiAgICAgICAgMFxyXG4gICAgICAsIHk6ICAgICAgICAwXHJcbiAgICAgICAgLyogc2NhbGUgKi9cclxuICAgICAgLCBzY2FsZVg6ICAgMVxyXG4gICAgICAsIHNjYWxlWTogICAxXHJcbiAgICAgICAgLyogcm90YXRlICovXHJcbiAgICAgICwgcm90YXRpb246IDBcclxuICAgICAgICAvKiBza2V3ICovXHJcbiAgICAgICwgc2tld1g6ICAgIDBcclxuICAgICAgLCBza2V3WTogICAgMFxyXG4gICAgICAgIC8qIG1hdHJpeCAqL1xyXG4gICAgICAsIG1hdHJpeDogICB0aGlzLm1hdHJpeFxyXG4gICAgICAsIGE6ICAgICAgICAxXHJcbiAgICAgICwgYjogICAgICAgIDBcclxuICAgICAgLCBjOiAgICAgICAgMFxyXG4gICAgICAsIGQ6ICAgICAgICAxXHJcbiAgICAgICwgZTogICAgICAgIDBcclxuICAgICAgLCBmOiAgICAgICAgMFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIFNWRy5Db2xvciA9IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICB2YXIgbWF0Y2hcclxuICAgIFxyXG4gICAgLyogaW5pdGlhbGl6ZSBkZWZhdWx0cyAqL1xyXG4gICAgdGhpcy5yID0gMFxyXG4gICAgdGhpcy5nID0gMFxyXG4gICAgdGhpcy5iID0gMFxyXG4gICAgXHJcbiAgICAvKiBwYXJzZSBjb2xvciAqL1xyXG4gICAgaWYgKHR5cGVvZiBjb2xvciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgaWYgKFNWRy5yZWdleC5pc1JnYi50ZXN0KGNvbG9yKSkge1xyXG4gICAgICAgIC8qIGdldCByZ2IgdmFsdWVzICovXHJcbiAgICAgICAgbWF0Y2ggPSBTVkcucmVnZXgucmdiLmV4ZWMoY29sb3IucmVwbGFjZSgvXFxzL2csJycpKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIHBhcnNlIG51bWVyaWMgdmFsdWVzICovXHJcbiAgICAgICAgdGhpcy5yID0gcGFyc2VJbnQobWF0Y2hbMV0pXHJcbiAgICAgICAgdGhpcy5nID0gcGFyc2VJbnQobWF0Y2hbMl0pXHJcbiAgICAgICAgdGhpcy5iID0gcGFyc2VJbnQobWF0Y2hbM10pXHJcbiAgICAgICAgXHJcbiAgICAgIH0gZWxzZSBpZiAoU1ZHLnJlZ2V4LmlzSGV4LnRlc3QoY29sb3IpKSB7XHJcbiAgICAgICAgLyogZ2V0IGhleCB2YWx1ZXMgKi9cclxuICAgICAgICBtYXRjaCA9IFNWRy5yZWdleC5oZXguZXhlYyhmdWxsSGV4KGNvbG9yKSlcclxuICBcclxuICAgICAgICAvKiBwYXJzZSBudW1lcmljIHZhbHVlcyAqL1xyXG4gICAgICAgIHRoaXMuciA9IHBhcnNlSW50KG1hdGNoWzFdLCAxNilcclxuICAgICAgICB0aGlzLmcgPSBwYXJzZUludChtYXRjaFsyXSwgMTYpXHJcbiAgICAgICAgdGhpcy5iID0gcGFyc2VJbnQobWF0Y2hbM10sIDE2KVxyXG4gIFxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29sb3IgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMuciA9IGNvbG9yLnJcclxuICAgICAgdGhpcy5nID0gY29sb3IuZ1xyXG4gICAgICB0aGlzLmIgPSBjb2xvci5iXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgICBcclxuICB9XHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuQ29sb3IsIHtcclxuICAgIC8vIERlZmF1bHQgdG8gaGV4IGNvbnZlcnNpb25cclxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudG9IZXgoKVxyXG4gICAgfVxyXG4gICAgLy8gQnVpbGQgaGV4IHZhbHVlXHJcbiAgLCB0b0hleDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiAnIydcclxuICAgICAgICArIGNvbXBUb0hleCh0aGlzLnIpXHJcbiAgICAgICAgKyBjb21wVG9IZXgodGhpcy5nKVxyXG4gICAgICAgICsgY29tcFRvSGV4KHRoaXMuYilcclxuICAgIH1cclxuICAgIC8vIEJ1aWxkIHJnYiB2YWx1ZVxyXG4gICwgdG9SZ2I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gJ3JnYignICsgW3RoaXMuciwgdGhpcy5nLCB0aGlzLmJdLmpvaW4oKSArICcpJ1xyXG4gICAgfVxyXG4gICAgLy8gQ2FsY3VsYXRlIHRydWUgYnJpZ2h0bmVzc1xyXG4gICwgYnJpZ2h0bmVzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiAodGhpcy5yIC8gMjU1ICogMC4zMClcclxuICAgICAgICAgICArICh0aGlzLmcgLyAyNTUgKiAwLjU5KVxyXG4gICAgICAgICAgICsgKHRoaXMuYiAvIDI1NSAqIDAuMTEpXHJcbiAgICB9XHJcbiAgICAvLyBNYWtlIGNvbG9yIG1vcnBoYWJsZVxyXG4gICwgbW9ycGg6IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgU1ZHLkNvbG9yKGNvbG9yKVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gR2V0IG1vcnBoZWQgY29sb3IgYXQgZ2l2ZW4gcG9zaXRpb25cclxuICAsIGF0OiBmdW5jdGlvbihwb3MpIHtcclxuICAgICAgLyogbWFrZSBzdXJlIGEgZGVzdGluYXRpb24gaXMgZGVmaW5lZCAqL1xyXG4gICAgICBpZiAoIXRoaXMuZGVzdGluYXRpb24pIHJldHVybiB0aGlzXHJcbiAgXHJcbiAgICAgIC8qIG5vcm1hbGlzZSBwb3MgKi9cclxuICAgICAgcG9zID0gcG9zIDwgMCA/IDAgOiBwb3MgPiAxID8gMSA6IHBvc1xyXG4gIFxyXG4gICAgICAvKiBnZW5lcmF0ZSBtb3JwaGVkIGNvbG9yICovXHJcbiAgICAgIHJldHVybiBuZXcgU1ZHLkNvbG9yKHtcclxuICAgICAgICByOiB+fih0aGlzLnIgKyAodGhpcy5kZXN0aW5hdGlvbi5yIC0gdGhpcy5yKSAqIHBvcylcclxuICAgICAgLCBnOiB+fih0aGlzLmcgKyAodGhpcy5kZXN0aW5hdGlvbi5nIC0gdGhpcy5nKSAqIHBvcylcclxuICAgICAgLCBiOiB+fih0aGlzLmIgKyAodGhpcy5kZXN0aW5hdGlvbi5iIC0gdGhpcy5iKSAqIHBvcylcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gVGVzdGVyc1xyXG4gIFxyXG4gIC8vIFRlc3QgaWYgZ2l2ZW4gdmFsdWUgaXMgYSBjb2xvciBzdHJpbmdcclxuICBTVkcuQ29sb3IudGVzdCA9IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICBjb2xvciArPSAnJ1xyXG4gICAgcmV0dXJuIFNWRy5yZWdleC5pc0hleC50ZXN0KGNvbG9yKVxyXG4gICAgICAgIHx8IFNWRy5yZWdleC5pc1JnYi50ZXN0KGNvbG9yKVxyXG4gIH1cclxuICBcclxuICAvLyBUZXN0IGlmIGdpdmVuIHZhbHVlIGlzIGEgcmdiIG9iamVjdFxyXG4gIFNWRy5Db2xvci5pc1JnYiA9IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICByZXR1cm4gY29sb3IgJiYgdHlwZW9mIGNvbG9yLnIgPT0gJ251bWJlcidcclxuICAgICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sb3IuZyA9PSAnbnVtYmVyJ1xyXG4gICAgICAgICAgICAgICAgICYmIHR5cGVvZiBjb2xvci5iID09ICdudW1iZXInXHJcbiAgfVxyXG4gIFxyXG4gIC8vIFRlc3QgaWYgZ2l2ZW4gdmFsdWUgaXMgYSBjb2xvclxyXG4gIFNWRy5Db2xvci5pc0NvbG9yID0gZnVuY3Rpb24oY29sb3IpIHtcclxuICAgIHJldHVybiBTVkcuQ29sb3IuaXNSZ2IoY29sb3IpIHx8IFNWRy5Db2xvci50ZXN0KGNvbG9yKVxyXG4gIH1cclxuXHJcbiAgU1ZHLkFycmF5ID0gZnVuY3Rpb24oYXJyYXksIGZhbGxiYWNrKSB7XHJcbiAgICBhcnJheSA9IChhcnJheSB8fCBbXSkudmFsdWVPZigpXHJcbiAgXHJcbiAgICAvKiBpZiBhcnJheSBpcyBlbXB0eSBhbmQgZmFsbGJhY2sgaXMgcHJvdmlkZWQsIHVzZSBmYWxsYmFjayAqL1xyXG4gICAgaWYgKGFycmF5Lmxlbmd0aCA9PSAwICYmIGZhbGxiYWNrKVxyXG4gICAgICBhcnJheSA9IGZhbGxiYWNrLnZhbHVlT2YoKVxyXG4gIFxyXG4gICAgLyogcGFyc2UgYXJyYXkgKi9cclxuICAgIHRoaXMudmFsdWUgPSB0aGlzLnBhcnNlKGFycmF5KVxyXG4gIH1cclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5BcnJheSwge1xyXG4gICAgLy8gTWFrZSBhcnJheSBtb3JwaGFibGVcclxuICAgIG1vcnBoOiBmdW5jdGlvbihhcnJheSkge1xyXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gdGhpcy5wYXJzZShhcnJheSlcclxuICBcclxuICAgICAgLyogbm9ybWFsaXplIGxlbmd0aCBvZiBhcnJheXMgKi9cclxuICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoICE9IHRoaXMuZGVzdGluYXRpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIGxhc3RWYWx1ZSAgICAgICA9IHRoaXMudmFsdWVbdGhpcy52YWx1ZS5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgLCBsYXN0RGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uW3RoaXMuZGVzdGluYXRpb24ubGVuZ3RoIC0gMV1cclxuICBcclxuICAgICAgICB3aGlsZSh0aGlzLnZhbHVlLmxlbmd0aCA+IHRoaXMuZGVzdGluYXRpb24ubGVuZ3RoKVxyXG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5wdXNoKGxhc3REZXN0aW5hdGlvbilcclxuICAgICAgICB3aGlsZSh0aGlzLnZhbHVlLmxlbmd0aCA8IHRoaXMuZGVzdGluYXRpb24ubGVuZ3RoKVxyXG4gICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKGxhc3RWYWx1ZSlcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gQ2xlYW4gdXAgYW55IGR1cGxpY2F0ZSBwb2ludHNcclxuICAsIHNldHRsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8qIGZpbmQgYWxsIHVuaXF1ZSB2YWx1ZXMgKi9cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdGhpcy52YWx1ZS5sZW5ndGgsIHNlZW4gPSBbXTsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgaWYgKHNlZW4uaW5kZXhPZih0aGlzLnZhbHVlW2ldKSA9PSAtMSlcclxuICAgICAgICAgIHNlZW4ucHVzaCh0aGlzLnZhbHVlW2ldKVxyXG4gIFxyXG4gICAgICAvKiBzZXQgbmV3IHZhbHVlICovXHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlID0gc2VlblxyXG4gICAgfVxyXG4gICAgLy8gR2V0IG1vcnBoZWQgYXJyYXkgYXQgZ2l2ZW4gcG9zaXRpb25cclxuICAsIGF0OiBmdW5jdGlvbihwb3MpIHtcclxuICAgICAgLyogbWFrZSBzdXJlIGEgZGVzdGluYXRpb24gaXMgZGVmaW5lZCAqL1xyXG4gICAgICBpZiAoIXRoaXMuZGVzdGluYXRpb24pIHJldHVybiB0aGlzXHJcbiAgXHJcbiAgICAgIC8qIGdlbmVyYXRlIG1vcnBoZWQgYXJyYXkgKi9cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdGhpcy52YWx1ZS5sZW5ndGgsIGFycmF5ID0gW107IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGFycmF5LnB1c2godGhpcy52YWx1ZVtpXSArICh0aGlzLmRlc3RpbmF0aW9uW2ldIC0gdGhpcy52YWx1ZVtpXSkgKiBwb3MpXHJcbiAgXHJcbiAgICAgIHJldHVybiBuZXcgU1ZHLkFycmF5KGFycmF5KVxyXG4gICAgfVxyXG4gICAgLy8gQ29udmVydCBhcnJheSB0byBzdHJpbmdcclxuICAsIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWUuam9pbignICcpXHJcbiAgICB9XHJcbiAgICAvLyBSZWFsIHZhbHVlXHJcbiAgLCB2YWx1ZU9mOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVcclxuICAgIH1cclxuICAgIC8vIFBhcnNlIHdoaXRlc3BhY2Ugc2VwYXJhdGVkIHN0cmluZ1xyXG4gICwgcGFyc2U6IGZ1bmN0aW9uKGFycmF5KSB7XHJcbiAgICAgIGFycmF5ID0gYXJyYXkudmFsdWVPZigpXHJcbiAgXHJcbiAgICAgIC8qIGlmIGFscmVhZHkgaXMgYW4gYXJyYXksIG5vIG5lZWQgdG8gcGFyc2UgaXQgKi9cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyYXkpKSByZXR1cm4gYXJyYXlcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXMuc3BsaXQoYXJyYXkpXHJcbiAgICB9XHJcbiAgICAvLyBTdHJpcCB1bm5lY2Vzc2FyeSB3aGl0ZXNwYWNlXHJcbiAgLCBzcGxpdDogZnVuY3Rpb24oc3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXFxzKy9nLCAnICcpLnJlcGxhY2UoL15cXHMrfFxccyskL2csJycpLnNwbGl0KCcgJykgXHJcbiAgICB9XHJcbiAgICAvLyBSZXZlcnNlIGFycmF5XHJcbiAgLCByZXZlcnNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy52YWx1ZS5yZXZlcnNlKClcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICBcclxuICB9KVxyXG4gIFxyXG5cclxuXHJcbiAgU1ZHLlBvaW50QXJyYXkgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gIH1cclxuICBcclxuICAvLyBJbmhlcml0IGZyb20gU1ZHLkFycmF5XHJcbiAgU1ZHLlBvaW50QXJyYXkucHJvdG90eXBlID0gbmV3IFNWRy5BcnJheVxyXG4gIFxyXG4gIFNWRy5leHRlbmQoU1ZHLlBvaW50QXJyYXksIHtcclxuICAgIC8vIENvbnZlcnQgYXJyYXkgdG8gc3RyaW5nXHJcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8qIGNvbnZlcnQgdG8gYSBwb2x5IHBvaW50IHN0cmluZyAqL1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSB0aGlzLnZhbHVlLmxlbmd0aCwgYXJyYXkgPSBbXTsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgYXJyYXkucHVzaCh0aGlzLnZhbHVlW2ldLmpvaW4oJywnKSlcclxuICBcclxuICAgICAgcmV0dXJuIGFycmF5LmpvaW4oJyAnKVxyXG4gICAgfVxyXG4gICAgLy8gR2V0IG1vcnBoZWQgYXJyYXkgYXQgZ2l2ZW4gcG9zaXRpb25cclxuICAsIGF0OiBmdW5jdGlvbihwb3MpIHtcclxuICAgICAgLyogbWFrZSBzdXJlIGEgZGVzdGluYXRpb24gaXMgZGVmaW5lZCAqL1xyXG4gICAgICBpZiAoIXRoaXMuZGVzdGluYXRpb24pIHJldHVybiB0aGlzXHJcbiAgXHJcbiAgICAgIC8qIGdlbmVyYXRlIG1vcnBoZWQgcG9pbnQgc3RyaW5nICovXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHRoaXMudmFsdWUubGVuZ3RoLCBhcnJheSA9IFtdOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBhcnJheS5wdXNoKFtcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV1bMF0gKyAodGhpcy5kZXN0aW5hdGlvbltpXVswXSAtIHRoaXMudmFsdWVbaV1bMF0pICogcG9zXHJcbiAgICAgICAgLCB0aGlzLnZhbHVlW2ldWzFdICsgKHRoaXMuZGVzdGluYXRpb25baV1bMV0gLSB0aGlzLnZhbHVlW2ldWzFdKSAqIHBvc1xyXG4gICAgICAgIF0pXHJcbiAgXHJcbiAgICAgIHJldHVybiBuZXcgU1ZHLlBvaW50QXJyYXkoYXJyYXkpXHJcbiAgICB9XHJcbiAgICAvLyBQYXJzZSBwb2ludCBzdHJpbmdcclxuICAsIHBhcnNlOiBmdW5jdGlvbihhcnJheSkge1xyXG4gICAgICBhcnJheSA9IGFycmF5LnZhbHVlT2YoKVxyXG4gIFxyXG4gICAgICAvKiBpZiBhbHJlYWR5IGlzIGFuIGFycmF5LCBubyBuZWVkIHRvIHBhcnNlIGl0ICovXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFycmF5KSkgcmV0dXJuIGFycmF5XHJcbiAgXHJcbiAgICAgIC8qIHNwbGl0IHBvaW50cyAqL1xyXG4gICAgICBhcnJheSA9IHRoaXMuc3BsaXQoYXJyYXkpXHJcbiAgXHJcbiAgICAgIC8qIHBhcnNlIHBvaW50cyAqL1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBhcnJheS5sZW5ndGgsIHAsIHBvaW50cyA9IFtdOyBpIDwgaWw7IGkrKykge1xyXG4gICAgICAgIHAgPSBhcnJheVtpXS5zcGxpdCgnLCcpXHJcbiAgICAgICAgcG9pbnRzLnB1c2goW3BhcnNlRmxvYXQocFswXSksIHBhcnNlRmxvYXQocFsxXSldKVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIHJldHVybiBwb2ludHNcclxuICAgIH1cclxuICAgIC8vIE1vdmUgcG9pbnQgc3RyaW5nXHJcbiAgLCBtb3ZlOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgIHZhciBib3ggPSB0aGlzLmJib3goKVxyXG4gIFxyXG4gICAgICAvKiBnZXQgcmVsYXRpdmUgb2Zmc2V0ICovXHJcbiAgICAgIHggLT0gYm94LnhcclxuICAgICAgeSAtPSBib3gueVxyXG4gIFxyXG4gICAgICAvKiBtb3ZlIGV2ZXJ5IHBvaW50ICovXHJcbiAgICAgIGlmICghaXNOYU4oeCkgJiYgIWlzTmFOKHkpKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnZhbHVlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXSA9IFt0aGlzLnZhbHVlW2ldWzBdICsgeCwgdGhpcy52YWx1ZVtpXVsxXSArIHldXHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBSZXNpemUgcG9seSBzdHJpbmdcclxuICAsIHNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgdmFyIGksIGJveCA9IHRoaXMuYmJveCgpXHJcbiAgXHJcbiAgICAgIC8qIHJlY2FsY3VsYXRlIHBvc2l0aW9uIG9mIGFsbCBwb2ludHMgYWNjb3JkaW5nIHRvIG5ldyBzaXplICovXHJcbiAgICAgIGZvciAoaSA9IHRoaXMudmFsdWUubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB0aGlzLnZhbHVlW2ldWzBdID0gKCh0aGlzLnZhbHVlW2ldWzBdIC0gYm94LngpICogd2lkdGgpICAvIGJveC53aWR0aCAgKyBib3gueFxyXG4gICAgICAgIHRoaXMudmFsdWVbaV1bMV0gPSAoKHRoaXMudmFsdWVbaV1bMV0gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIEdldCBib3VuZGluZyBib3ggb2YgcG9pbnRzXHJcbiAgLCBiYm94OiBmdW5jdGlvbigpIHtcclxuICAgICAgU1ZHLnBhcnNlci5wb2x5LnNldEF0dHJpYnV0ZSgncG9pbnRzJywgdGhpcy50b1N0cmluZygpKVxyXG4gIFxyXG4gICAgICByZXR1cm4gU1ZHLnBhcnNlci5wb2x5LmdldEJCb3goKVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5QYXRoQXJyYXkgPSBmdW5jdGlvbihhcnJheSwgZmFsbGJhY2spIHtcclxuICAgIHRoaXMuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBhcnJheSwgZmFsbGJhY2spXHJcbiAgfVxyXG4gIFxyXG4gIC8vIEluaGVyaXQgZnJvbSBTVkcuQXJyYXlcclxuICBTVkcuUGF0aEFycmF5LnByb3RvdHlwZSA9IG5ldyBTVkcuQXJyYXlcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5QYXRoQXJyYXksIHtcclxuICAgIC8vIENvbnZlcnQgYXJyYXkgdG8gc3RyaW5nXHJcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBhcnJheVRvU3RyaW5nKHRoaXMudmFsdWUpXHJcbiAgICB9XHJcbiAgICAvLyBNb3ZlIHBhdGggc3RyaW5nXHJcbiAgLCBtb3ZlOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgIC8vIGdldCBib3VuZGluZyBib3ggb2YgY3VycmVudCBzaXR1YXRpb25cclxuICAgICAgdmFyIGJveCA9IHRoaXMuYmJveCgpXHJcbiAgXHRcdFxyXG4gICAgICAvKiBnZXQgcmVsYXRpdmUgb2Zmc2V0ICovXHJcbiAgICAgIHggLT0gYm94LnhcclxuICAgICAgeSAtPSBib3gueVxyXG4gIFxyXG4gICAgICAvLyBnZXQgcmVsYXRpdmUgb2Zmc2V0XHJcbiAgICAgIGlmICghaXNOYU4oeCkgJiYgIWlzTmFOKHkpKSB7XHJcbiAgICAgICAgLy8gbW92ZSBldmVyeSBwb2ludFxyXG4gICAgICAgIGZvciAodmFyIGwsIGkgPSB0aGlzLnZhbHVlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICBsID0gdGhpcy52YWx1ZVtpXVswXVxyXG4gIFxyXG4gICAgICAgICAgaWYgKGwgPT0gJ00nIHx8IGwgPT0gJ0wnIHx8IGwgPT0gJ1QnKSAge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzFdICs9IHhcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVsyXSArPSB5XHJcbiAgXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGwgPT0gJ0gnKSAge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzFdICs9IHhcclxuICBcclxuICAgICAgICAgIH0gZWxzZSBpZiAobCA9PSAnVicpICB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVbaV1bMV0gKz0geVxyXG4gIFxyXG4gICAgICAgICAgfSBlbHNlIGlmIChsID09ICdDJyB8fCBsID09ICdTJyB8fCBsID09ICdRJykgIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVsxXSArPSB4XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVbaV1bMl0gKz0geVxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzNdICs9IHhcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVs0XSArPSB5XHJcbiAgXHJcbiAgICAgICAgICAgIGlmIChsID09ICdDJykgIHtcclxuICAgICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzVdICs9IHhcclxuICAgICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzZdICs9IHlcclxuICAgICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgfSBlbHNlIGlmIChsID09ICdBJykgIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVs2XSArPSB4XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVbaV1bN10gKz0geVxyXG4gICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gUmVzaXplIHBhdGggc3RyaW5nXHJcbiAgLCBzaXplOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgIC8vIGdldCBib3VuZGluZyBib3ggb2YgY3VycmVudCBzaXR1YXRpb25cclxuICAgICAgdmFyIGksIGwsIGJveCA9IHRoaXMuYmJveCgpXHJcbiAgXHJcbiAgICAgIC8vIHJlY2FsY3VsYXRlIHBvc2l0aW9uIG9mIGFsbCBwb2ludHMgYWNjb3JkaW5nIHRvIG5ldyBzaXplXHJcbiAgICAgIGZvciAoaSA9IHRoaXMudmFsdWUubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBsID0gdGhpcy52YWx1ZVtpXVswXVxyXG4gIFxyXG4gICAgICAgIGlmIChsID09ICdNJyB8fCBsID09ICdMJyB8fCBsID09ICdUJykgIHtcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV1bMV0gPSAoKHRoaXMudmFsdWVbaV1bMV0gLSBib3gueCkgKiB3aWR0aCkgIC8gYm94LndpZHRoICArIGJveC54XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzJdID0gKCh0aGlzLnZhbHVlW2ldWzJdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxyXG4gIFxyXG4gICAgICAgIH0gZWxzZSBpZiAobCA9PSAnSCcpICB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzFdID0gKCh0aGlzLnZhbHVlW2ldWzFdIC0gYm94LngpICogd2lkdGgpICAvIGJveC53aWR0aCAgKyBib3gueFxyXG4gIFxyXG4gICAgICAgIH0gZWxzZSBpZiAobCA9PSAnVicpICB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzFdID0gKCh0aGlzLnZhbHVlW2ldWzFdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxyXG4gIFxyXG4gICAgICAgIH0gZWxzZSBpZiAobCA9PSAnQycgfHwgbCA9PSAnUycgfHwgbCA9PSAnUScpICB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzFdID0gKCh0aGlzLnZhbHVlW2ldWzFdIC0gYm94LngpICogd2lkdGgpICAvIGJveC53aWR0aCAgKyBib3gueFxyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXVsyXSA9ICgodGhpcy52YWx1ZVtpXVsyXSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV1bM10gPSAoKHRoaXMudmFsdWVbaV1bM10gLSBib3gueCkgKiB3aWR0aCkgIC8gYm94LndpZHRoICArIGJveC54XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzRdID0gKCh0aGlzLnZhbHVlW2ldWzRdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxyXG4gIFxyXG4gICAgICAgICAgaWYgKGwgPT0gJ0MnKSAge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzVdID0gKCh0aGlzLnZhbHVlW2ldWzVdIC0gYm94LngpICogd2lkdGgpICAvIGJveC53aWR0aCAgKyBib3gueFxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzZdID0gKCh0aGlzLnZhbHVlW2ldWzZdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxyXG4gICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIH0gZWxzZSBpZiAobCA9PSAnQScpICB7XHJcbiAgICAgICAgICAvLyByZXNpemUgcmFkaWlcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV1bMV0gPSAodGhpcy52YWx1ZVtpXVsxXSAqIHdpZHRoKSAgLyBib3gud2lkdGhcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV1bMl0gPSAodGhpcy52YWx1ZVtpXVsyXSAqIGhlaWdodCkgLyBib3guaGVpZ2h0XHJcbiAgXHJcbiAgICAgICAgICAvLyBtb3ZlIHBvc2l0aW9uIHZhbHVlc1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXVs2XSA9ICgodGhpcy52YWx1ZVtpXVs2XSAtIGJveC54KSAqIHdpZHRoKSAgLyBib3gud2lkdGggICsgYm94LnhcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV1bN10gPSAoKHRoaXMudmFsdWVbaV1bN10gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBBYnNvbHV0aXplIGFuZCBwYXJzZSBwYXRoIHRvIGFycmF5XHJcbiAgLCBwYXJzZTogZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgICAgLy8gaWYgaXQncyBhbHJlYWR5IGEgcGF0aGFycmF5LCBubyBuZWVkIHRvIHBhcnNlIGl0XHJcbiAgICAgIGlmIChhcnJheSBpbnN0YW5jZW9mIFNWRy5QYXRoQXJyYXkpIHJldHVybiBhcnJheS52YWx1ZU9mKClcclxuICBcclxuICAgICAgLy8gcHJlcGFyZSBmb3IgcGFyc2luZ1xyXG4gICAgICB2YXIgaSwgeDAsIHkwLCBzLCBzZWcsIGFyclxyXG4gICAgICAgICwgeCA9IDBcclxuICAgICAgICAsIHkgPSAwXHJcbiAgICAgICAgLCBwYXJhbUNudCA9IHsgJ00nOjIsICdMJzoyLCAnSCc6MSwgJ1YnOjEsICdDJzo2LCAnUyc6NCwgJ1EnOjQsICdUJzoyLCAnQSc6NyB9XHJcbiAgXHJcbiAgICAgIGlmKHR5cGVvZiBhcnJheSA9PSAnc3RyaW5nJyl7XHJcbiAgXHJcbiAgICAgICAgYXJyYXkgPSBhcnJheVxyXG4gICAgICAgICAgLnJlcGxhY2UoU1ZHLnJlZ2V4Lm5lZ0V4cCwgJ1gnKSAgICAgICAgIC8vIHJlcGxhY2UgYWxsIG5lZ2F0aXZlIGV4cG9uZW50cyB3aXRoIGNlcnRhaW4gY2hhclxyXG4gICAgICAgICAgLnJlcGxhY2UoU1ZHLnJlZ2V4LnBhdGhMZXR0ZXJzLCAnICQmICcpIC8vIHB1dCBzb21lIHJvb20gYmV0d2VlbiBsZXR0ZXJzIGFuZCBudW1iZXJzXHJcbiAgICAgICAgICAucmVwbGFjZShTVkcucmVnZXguaHlwaGVuLCAnIC0nKSAgICAgICAgLy8gYWRkIHNwYWNlIGJlZm9yZSBoeXBoZW5cclxuICAgICAgICAgIC5yZXBsYWNlKFNWRy5yZWdleC5jb21tYSwgJyAnKSAgICAgICAgICAvLyB1bmlmeSBhbGwgc3BhY2VzXHJcbiAgICAgICAgICAucmVwbGFjZShTVkcucmVnZXguWCwgJ2UtJykgICAgICAgICAgICAgLy8gYWRkIGJhY2sgdGhlIGV4cG9lbnRcclxuICAgICAgICAgIC50cmltKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0cmltXHJcbiAgICAgICAgICAuc3BsaXQoU1ZHLnJlZ2V4LndoaXRlc3BhY2VzKSAgICAgICAgICAgLy8gc3BsaXQgaW50byBhcnJheVxyXG4gIFxyXG4gICAgICAgIC8vIGF0IHRoaXMgcGxhY2UgdGhlcmUgY291bGQgYmUgcGFydHMgbGlrZSBbJzMuMTI0Ljg1NC4zMiddIGJlY2F1c2Ugd2UgY291bGQgbm90IGRldGVybWluZSB0aGUgcG9pbnQgYXMgc2VwZXJhdG9yIHRpbGwgbm93XHJcbiAgICAgICAgLy8gd2UgZml4IHRoaXMgZWxlbWVudHMgaW4gdGhlIG5leHQgbG9vcFxyXG4gICAgICAgIGZvcihpID0gYXJyYXkubGVuZ3RoOyAtLWk7KXtcclxuICAgICAgICAgIGlmKGFycmF5W2ldLmluZGV4T2YoJy4nKSAhPSBhcnJheVtpXS5sYXN0SW5kZXhPZignLicpKXtcclxuICAgICAgICAgICAgdmFyIHNwbGl0ID0gYXJyYXlbaV0uc3BsaXQoJy4nKSAvLyBzcGxpdCBhdCB0aGUgcG9pbnRcclxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gW3NwbGl0LnNoaWZ0KCksIHNwbGl0LnNoaWZ0KCldLmpvaW4oJy4nKSAvLyBqb2luIHRoZSBmaXJzdCBudW1iZXIgdG9nZXRoZXJcclxuICAgICAgICAgICAgYXJyYXkuc3BsaWNlLmFwcGx5KGFycmF5LCBbaSwgMV0uY29uY2F0KGZpcnN0LCBzcGxpdC5tYXAoZnVuY3Rpb24oZWwpeyByZXR1cm4gJy4nK2VsIH0pKSkgLy8gYWRkIGZpcnN0IGFuZCBhbGwgb3RoZXIgZW50cmllcyBiYWNrIHRvIGFycmF5XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGFycmF5ID0gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cnIpe1xyXG4gICAgICAgICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShwcmV2LCBjdXJyKVxyXG4gICAgICAgIH0sIFtdKVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIGFycmF5IG5vdyBpcyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBwYXJ0cyBvZiBhIHBhdGggZS5nLiBbJ00nLCAnMCcsICcwJywgJ0wnLCAnMzAnLCAnMzAnIC4uLl1cclxuICBcclxuICAgICAgdmFyIGFyciA9IFtdXHJcbiAgXHJcbiAgICAgIGRve1xyXG4gIFxyXG4gICAgICAgIC8vIFRlc3QgaWYgd2UgaGF2ZSBhIHBhdGggbGV0dGVyXHJcbiAgICAgICAgaWYoU1ZHLnJlZ2V4LmlzUGF0aExldHRlci50ZXN0KGFycmF5WzBdKSl7XHJcbiAgICAgICAgICBzID0gYXJyYXlbMF1cclxuICAgICAgICAgIGFycmF5LnNoaWZ0KClcclxuICAgICAgICAgIC8vIElmIGxhc3QgbGV0dGVyIHdhcyBhIG1vdmUgY29tbWFuZCBhbmQgd2UgZ290IG5vIG5ldywgaXQgZGVmYXVsdHMgdG8gW0xdaW5lXHJcbiAgICAgICAgfWVsc2UgaWYocyA9PSAnTScpe1xyXG4gICAgICAgICAgcyA9ICdMJ1xyXG4gICAgICAgIH1lbHNlIGlmKHMgPT0gJ20nKXtcclxuICAgICAgICAgIHMgPSAnbCdcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgLy8gYWRkIHBhdGggbGV0dGVyIGFzIGZpcnN0IGVsZW1lbnRcclxuICAgICAgICBzZWcgPSBbcy50b1VwcGVyQ2FzZSgpXVxyXG4gIFxyXG4gICAgICAgIC8vIHB1c2ggYWxsIG5lY2Vzc2FyeSBwYXJhbWV0ZXJzIHRvIHNlZ21lbnRcclxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBwYXJhbUNudFtzZWdbMF1dOyArK2kpe1xyXG4gICAgICAgICAgc2VnLnB1c2gocGFyc2VGbG9hdChhcnJheS5zaGlmdCgpKSlcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgLy8gdXBwZXIgY2FzZVxyXG4gICAgICAgIGlmKHMgPT0gc2VnWzBdKXtcclxuICBcclxuICAgICAgICAgIGlmKHMgPT0gJ00nIHx8IHMgPT0gJ0wnIHx8IHMgPT0gJ0MnIHx8IHMgPT0gJ1EnKXtcclxuICAgICAgICAgICAgeCA9IHNlZ1twYXJhbUNudFtzZWdbMF1dLTFdXHJcbiAgICAgICAgICAgIHkgPSBzZWdbcGFyYW1DbnRbc2VnWzBdXV1cclxuICAgICAgICAgIH1lbHNlIGlmKHMgPT0gJ1YnKXtcclxuICAgICAgICAgICAgeSA9IHNlZ1sxXVxyXG4gICAgICAgICAgfWVsc2UgaWYocyA9PSAnSCcpe1xyXG4gICAgICAgICAgICB4ID0gc2VnWzFdXHJcbiAgICAgICAgICB9ZWxzZSBpZihzID09ICdBJyl7XHJcbiAgICAgICAgICAgIHggPSBzZWdbNl1cclxuICAgICAgICAgICAgeSA9IHNlZ1s3XVxyXG4gICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgLy8gbG93ZXIgY2FzZVxyXG4gICAgICAgIH1lbHNle1xyXG4gIFxyXG4gICAgICAgICAgLy8gY29udmVydCByZWxhdGl2ZSB0byBhYnNvbHV0ZSB2YWx1ZXNcclxuICAgICAgICAgIGlmKHMgPT0gJ20nIHx8IHMgPT0gJ2wnIHx8IHMgPT0gJ2MnIHx8IHMgPT0gJ3MnIHx8IHMgPT0gJ3EnIHx8IHMgPT0gJ3QnKXtcclxuICBcclxuICAgICAgICAgICAgc2VnWzFdICs9IHhcclxuICAgICAgICAgICAgc2VnWzJdICs9IHlcclxuICBcclxuICAgICAgICAgICAgaWYoc2VnWzNdICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgIHNlZ1szXSArPSB4XHJcbiAgICAgICAgICAgICAgc2VnWzRdICs9IHlcclxuICAgICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgICBpZihzZWdbNV0gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgc2VnWzVdICs9IHhcclxuICAgICAgICAgICAgICBzZWdbNl0gKz0geVxyXG4gICAgICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgICAgIC8vIG1vdmUgcG9pbnRlclxyXG4gICAgICAgICAgICB4ID0gc2VnW3BhcmFtQ250W3NlZ1swXV0tMV1cclxuICAgICAgICAgICAgeSA9IHNlZ1twYXJhbUNudFtzZWdbMF1dXVxyXG4gIFxyXG4gICAgICAgICAgfWVsc2UgaWYocyA9PSAndicpe1xyXG4gICAgICAgICAgICBzZWdbMV0gKz0geVxyXG4gICAgICAgICAgICB5ID0gc2VnWzFdXHJcbiAgICAgICAgICB9ZWxzZSBpZihzID09ICdoJyl7XHJcbiAgICAgICAgICAgIHNlZ1sxXSArPSB4XHJcbiAgICAgICAgICAgIHggPSBzZWdbMV1cclxuICAgICAgICAgIH1lbHNlIGlmKHMgPT0gJ2EnKXtcclxuICAgICAgICAgICAgc2VnWzZdICs9IHhcclxuICAgICAgICAgICAgc2VnWzddICs9IHlcclxuICAgICAgICAgICAgeCA9IHNlZ1s2XVxyXG4gICAgICAgICAgICB5ID0gc2VnWzddXHJcbiAgICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIGlmKHNlZ1swXSA9PSAnTScpe1xyXG4gICAgICAgICAgeDAgPSB4XHJcbiAgICAgICAgICB5MCA9IHlcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgaWYoc2VnWzBdID09ICdaJyl7XHJcbiAgICAgICAgICB4ID0geDBcclxuICAgICAgICAgIHkgPSB5MFxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICBhcnIucHVzaChzZWcpXHJcbiAgXHJcbiAgICAgIH13aGlsZShhcnJheS5sZW5ndGgpXHJcbiAgXHJcbiAgICAgIHJldHVybiBhcnJcclxuICBcclxuICAgIH1cclxuICAgIC8vIEdldCBib3VuZGluZyBib3ggb2YgcGF0aFxyXG4gICwgYmJveDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIFNWRy5wYXJzZXIucGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLnRvU3RyaW5nKCkpXHJcbiAgXHJcbiAgICAgIHJldHVybiBTVkcucGFyc2VyLnBhdGguZ2V0QkJveCgpXHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuXHJcblxyXG4gIFNWRy5OdW1iZXIgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gIFxyXG4gICAgLyogaW5pdGlhbGl6ZSBkZWZhdWx0cyAqL1xyXG4gICAgdGhpcy52YWx1ZSA9IDBcclxuICAgIHRoaXMudW5pdCA9ICcnXHJcbiAgXHJcbiAgICAvKiBwYXJzZSB2YWx1ZSAqL1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgLyogZW5zdXJlIGEgdmFsaWQgbnVtZXJpYyB2YWx1ZSAqL1xyXG4gICAgICB0aGlzLnZhbHVlID0gaXNOYU4odmFsdWUpID8gMCA6ICFpc0Zpbml0ZSh2YWx1ZSkgPyAodmFsdWUgPCAwID8gLTMuNGUrMzggOiArMy40ZSszOCkgOiB2YWx1ZVxyXG4gIFxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHZhciBtYXRjaCA9IHZhbHVlLm1hdGNoKFNWRy5yZWdleC51bml0KVxyXG4gIFxyXG4gICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAvKiBtYWtlIHZhbHVlIG51bWVyaWMgKi9cclxuICAgICAgICB0aGlzLnZhbHVlID0gcGFyc2VGbG9hdChtYXRjaFsxXSlcclxuICAgICAgXHJcbiAgICAgICAgLyogbm9ybWFsaXplIHBlcmNlbnQgdmFsdWUgKi9cclxuICAgICAgICBpZiAobWF0Y2hbMl0gPT0gJyUnKVxyXG4gICAgICAgICAgdGhpcy52YWx1ZSAvPSAxMDBcclxuICAgICAgICBlbHNlIGlmIChtYXRjaFsyXSA9PSAncycpXHJcbiAgICAgICAgICB0aGlzLnZhbHVlICo9IDEwMDBcclxuICAgICAgXHJcbiAgICAgICAgLyogc3RvcmUgdW5pdCAqL1xyXG4gICAgICAgIHRoaXMudW5pdCA9IG1hdGNoWzJdXHJcbiAgICAgIH1cclxuICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNWRy5OdW1iZXIpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWUudmFsdWVcclxuICAgICAgICB0aGlzLnVuaXQgID0gdmFsdWUudW5pdFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgfVxyXG4gIFxyXG4gIFNWRy5leHRlbmQoU1ZHLk51bWJlciwge1xyXG4gICAgLy8gU3RyaW5nYWxpemVcclxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICB0aGlzLnVuaXQgPT0gJyUnID9cclxuICAgICAgICAgIH5+KHRoaXMudmFsdWUgKiAxZTgpIC8gMWU2OlxyXG4gICAgICAgIHRoaXMudW5pdCA9PSAncycgP1xyXG4gICAgICAgICAgdGhpcy52YWx1ZSAvIDFlMyA6XHJcbiAgICAgICAgICB0aGlzLnZhbHVlXHJcbiAgICAgICkgKyB0aGlzLnVuaXRcclxuICAgIH1cclxuICAsIC8vIENvbnZlcnQgdG8gcHJpbWl0aXZlXHJcbiAgICB2YWx1ZU9mOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVcclxuICAgIH1cclxuICAgIC8vIEFkZCBudW1iZXJcclxuICAsIHBsdXM6IGZ1bmN0aW9uKG51bWJlcikge1xyXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcyArIG5ldyBTVkcuTnVtYmVyKG51bWJlcilcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIFN1YnRyYWN0IG51bWJlclxyXG4gICwgbWludXM6IGZ1bmN0aW9uKG51bWJlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5wbHVzKC1uZXcgU1ZHLk51bWJlcihudW1iZXIpKVxyXG4gICAgfVxyXG4gICAgLy8gTXVsdGlwbHkgbnVtYmVyXHJcbiAgLCB0aW1lczogZnVuY3Rpb24obnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzICogbmV3IFNWRy5OdW1iZXIobnVtYmVyKVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gRGl2aWRlIG51bWJlclxyXG4gICwgZGl2aWRlOiBmdW5jdGlvbihudW1iZXIpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMgLyBuZXcgU1ZHLk51bWJlcihudW1iZXIpXHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBDb252ZXJ0IHRvIGRpZmZlcmVudCB1bml0XHJcbiAgLCB0bzogZnVuY3Rpb24odW5pdCkge1xyXG4gICAgICBpZiAodHlwZW9mIHVuaXQgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHRoaXMudW5pdCA9IHVuaXRcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIE1ha2UgbnVtYmVyIG1vcnBoYWJsZVxyXG4gICwgbW9ycGg6IGZ1bmN0aW9uKG51bWJlcikge1xyXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFNWRy5OdW1iZXIobnVtYmVyKVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gR2V0IG1vcnBoZWQgbnVtYmVyIGF0IGdpdmVuIHBvc2l0aW9uXHJcbiAgLCBhdDogZnVuY3Rpb24ocG9zKSB7XHJcbiAgICAgIC8qIG1ha2Ugc3VyZSBhIGRlc3RpbmF0aW9uIGlzIGRlZmluZWQgKi9cclxuICAgICAgaWYgKCF0aGlzLmRlc3RpbmF0aW9uKSByZXR1cm4gdGhpc1xyXG4gIFxyXG4gICAgICAvKiBnZW5lcmF0ZSBuZXcgbW9ycGhlZCBudW1iZXIgKi9cclxuICAgICAgcmV0dXJuIG5ldyBTVkcuTnVtYmVyKHRoaXMuZGVzdGluYXRpb24pXHJcbiAgICAgICAgICAubWludXModGhpcylcclxuICAgICAgICAgIC50aW1lcyhwb3MpXHJcbiAgICAgICAgICAucGx1cyh0aGlzKVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5WaWV3Qm94ID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgdmFyIHgsIHksIHdpZHRoLCBoZWlnaHRcclxuICAgICAgLCB3bSAgID0gMSAvKiB3aWR0aCBtdWx0aXBsaWVyICovXHJcbiAgICAgICwgaG0gICA9IDEgLyogaGVpZ2h0IG11bHRpcGxpZXIgKi9cclxuICAgICAgLCBib3ggID0gZWxlbWVudC5iYm94KClcclxuICAgICAgLCB2aWV3ID0gKGVsZW1lbnQuYXR0cigndmlld0JveCcpIHx8ICcnKS5tYXRjaCgvLT9bXFxkXFwuXSsvZylcclxuICAgICAgLCB3ZSAgID0gZWxlbWVudFxyXG4gICAgICAsIGhlICAgPSBlbGVtZW50XHJcbiAgXHJcbiAgICAvKiBnZXQgZGltZW5zaW9ucyBvZiBjdXJyZW50IG5vZGUgKi9cclxuICAgIHdpZHRoICA9IG5ldyBTVkcuTnVtYmVyKGVsZW1lbnQud2lkdGgoKSlcclxuICAgIGhlaWdodCA9IG5ldyBTVkcuTnVtYmVyKGVsZW1lbnQuaGVpZ2h0KCkpXHJcbiAgXHJcbiAgICAvKiBmaW5kIG5lYXJlc3Qgbm9uLXBlcmNlbnR1YWwgZGltZW5zaW9ucyAqL1xyXG4gICAgd2hpbGUgKHdpZHRoLnVuaXQgPT0gJyUnKSB7XHJcbiAgICAgIHdtICo9IHdpZHRoLnZhbHVlXHJcbiAgICAgIHdpZHRoID0gbmV3IFNWRy5OdW1iZXIod2UgaW5zdGFuY2VvZiBTVkcuRG9jID8gd2UucGFyZW50Lm9mZnNldFdpZHRoIDogd2UucGFyZW50LndpZHRoKCkpXHJcbiAgICAgIHdlID0gd2UucGFyZW50XHJcbiAgICB9XHJcbiAgICB3aGlsZSAoaGVpZ2h0LnVuaXQgPT0gJyUnKSB7XHJcbiAgICAgIGhtICo9IGhlaWdodC52YWx1ZVxyXG4gICAgICBoZWlnaHQgPSBuZXcgU1ZHLk51bWJlcihoZSBpbnN0YW5jZW9mIFNWRy5Eb2MgPyBoZS5wYXJlbnQub2Zmc2V0SGVpZ2h0IDogaGUucGFyZW50LmhlaWdodCgpKVxyXG4gICAgICBoZSA9IGhlLnBhcmVudFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiBlbnN1cmUgZGVmYXVsdHMgKi9cclxuICAgIHRoaXMueCAgICAgID0gYm94LnhcclxuICAgIHRoaXMueSAgICAgID0gYm94LnlcclxuICAgIHRoaXMud2lkdGggID0gd2lkdGggICogd21cclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0ICogaG1cclxuICAgIHRoaXMuem9vbSAgID0gMVxyXG4gICAgXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICAvKiBnZXQgd2lkdGggYW5kIGhlaWdodCBmcm9tIHZpZXdib3ggKi9cclxuICAgICAgeCAgICAgID0gcGFyc2VGbG9hdCh2aWV3WzBdKVxyXG4gICAgICB5ICAgICAgPSBwYXJzZUZsb2F0KHZpZXdbMV0pXHJcbiAgICAgIHdpZHRoICA9IHBhcnNlRmxvYXQodmlld1syXSlcclxuICAgICAgaGVpZ2h0ID0gcGFyc2VGbG9hdCh2aWV3WzNdKVxyXG4gICAgICBcclxuICAgICAgLyogY2FsY3VsYXRlIHpvb20gYWNjb3JpbmcgdG8gdmlld2JveCAqL1xyXG4gICAgICB0aGlzLnpvb20gPSAoKHRoaXMud2lkdGggLyB0aGlzLmhlaWdodCkgPiAod2lkdGggLyBoZWlnaHQpKSA/XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgLyBoZWlnaHQgOlxyXG4gICAgICAgIHRoaXMud2lkdGggIC8gd2lkdGhcclxuICBcclxuICAgICAgLyogY2FsY3VsYXRlIHJlYWwgcGl4ZWwgZGltZW5zaW9ucyBvbiBwYXJlbnQgU1ZHLkRvYyBlbGVtZW50ICovXHJcbiAgICAgIHRoaXMueCAgICAgID0geFxyXG4gICAgICB0aGlzLnkgICAgICA9IHlcclxuICAgICAgdGhpcy53aWR0aCAgPSB3aWR0aFxyXG4gICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxyXG4gICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuICBcclxuICAvL1xyXG4gIFNWRy5leHRlbmQoU1ZHLlZpZXdCb3gsIHtcclxuICAgIC8vIFBhcnNlIHZpZXdib3ggdG8gc3RyaW5nXHJcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnggKyAnICcgKyB0aGlzLnkgKyAnICcgKyB0aGlzLndpZHRoICsgJyAnICsgdGhpcy5oZWlnaHRcclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5CQm94ID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgdmFyIGJveFxyXG4gIFxyXG4gICAgLyogaW5pdGlhbGl6ZSB6ZXJvIGJveCAqL1xyXG4gICAgdGhpcy54ICAgICAgPSAwXHJcbiAgICB0aGlzLnkgICAgICA9IDBcclxuICAgIHRoaXMud2lkdGggID0gMFxyXG4gICAgdGhpcy5oZWlnaHQgPSAwXHJcbiAgICBcclxuICAgIC8qIGdldCB2YWx1ZXMgaWYgZWxlbWVudCBpcyBnaXZlbiAqL1xyXG4gICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvKiBhY3R1YWwsIG5hdGl2ZSBib3VuZGluZyBib3ggKi9cclxuICAgICAgICBib3ggPSBlbGVtZW50Lm5vZGUuZ2V0QkJveCgpXHJcbiAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgIC8qIGZhbGxiYWNrIGZvciBzb21lIGJyb3dzZXJzICovXHJcbiAgICAgICAgYm94ID0ge1xyXG4gICAgICAgICAgeDogICAgICBlbGVtZW50Lm5vZGUuY2xpZW50TGVmdFxyXG4gICAgICAgICwgeTogICAgICBlbGVtZW50Lm5vZGUuY2xpZW50VG9wXHJcbiAgICAgICAgLCB3aWR0aDogIGVsZW1lbnQubm9kZS5jbGllbnRXaWR0aFxyXG4gICAgICAgICwgaGVpZ2h0OiBlbGVtZW50Lm5vZGUuY2xpZW50SGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAvKiBpbmNsdWRlIHRyYW5zbGF0aW9ucyBvbiB4IGFuIHkgKi9cclxuICAgICAgdGhpcy54ID0gYm94LnggKyBlbGVtZW50LnRyYW5zLnhcclxuICAgICAgdGhpcy55ID0gYm94LnkgKyBlbGVtZW50LnRyYW5zLnlcclxuICAgICAgXHJcbiAgICAgIC8qIHBsYWluIHdpZHRoIGFuZCBoZWlnaHQgKi9cclxuICAgICAgdGhpcy53aWR0aCAgPSBib3gud2lkdGggICogZWxlbWVudC50cmFucy5zY2FsZVhcclxuICAgICAgdGhpcy5oZWlnaHQgPSBib3guaGVpZ2h0ICogZWxlbWVudC50cmFucy5zY2FsZVlcclxuICAgIH1cclxuICBcclxuICAgIC8qIGFkZCBjZW50ZXIsIHJpZ2h0IGFuZCBib3R0b20gKi9cclxuICAgIGJveFByb3BlcnRpZXModGhpcylcclxuICAgIFxyXG4gIH1cclxuICBcclxuICAvL1xyXG4gIFNWRy5leHRlbmQoU1ZHLkJCb3gsIHtcclxuICAgIC8vIG1lcmdlIGJvdW5kaW5nIGJveCB3aXRoIGFub3RoZXIsIHJldHVybiBhIG5ldyBpbnN0YW5jZVxyXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKGJveCkge1xyXG4gICAgICB2YXIgYiA9IG5ldyBTVkcuQkJveCgpXHJcbiAgXHJcbiAgICAgIC8qIG1lcmdlIGJveCAqL1xyXG4gICAgICBiLnggICAgICA9IE1hdGgubWluKHRoaXMueCwgYm94LngpXHJcbiAgICAgIGIueSAgICAgID0gTWF0aC5taW4odGhpcy55LCBib3gueSlcclxuICAgICAgYi53aWR0aCAgPSBNYXRoLm1heCh0aGlzLnggKyB0aGlzLndpZHRoLCAgYm94LnggKyBib3gud2lkdGgpICAtIGIueFxyXG4gICAgICBiLmhlaWdodCA9IE1hdGgubWF4KHRoaXMueSArIHRoaXMuaGVpZ2h0LCBib3gueSArIGJveC5oZWlnaHQpIC0gYi55XHJcbiAgXHJcbiAgICAgIC8qIGFkZCBjZW50ZXIsIHJpZ2h0IGFuZCBib3R0b20gKi9cclxuICAgICAgYm94UHJvcGVydGllcyhiKVxyXG4gIFxyXG4gICAgICByZXR1cm4gYlxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5SQm94ID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgdmFyIGUsIHpvb21cclxuICAgICAgLCBib3ggPSB7fVxyXG4gIFxyXG4gICAgLyogaW5pdGlhbGl6ZSB6ZXJvIGJveCAqL1xyXG4gICAgdGhpcy54ICAgICAgPSAwXHJcbiAgICB0aGlzLnkgICAgICA9IDBcclxuICAgIHRoaXMud2lkdGggID0gMFxyXG4gICAgdGhpcy5oZWlnaHQgPSAwXHJcbiAgICBcclxuICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgIGUgPSBlbGVtZW50LmRvYygpLnBhcmVudFxyXG4gICAgICB6b29tID0gZWxlbWVudC5kb2MoKS52aWV3Ym94KCkuem9vbVxyXG4gICAgICBcclxuICAgICAgLyogYWN0dWFsLCBuYXRpdmUgYm91bmRpbmcgYm94ICovXHJcbiAgICAgIGJveCA9IGVsZW1lbnQubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICBcclxuICAgICAgLyogZ2V0IHNjcmVlbiBvZmZzZXQgKi9cclxuICAgICAgdGhpcy54ID0gYm94LmxlZnRcclxuICAgICAgdGhpcy55ID0gYm94LnRvcFxyXG4gICAgICBcclxuICAgICAgLyogc3VidHJhY3QgcGFyZW50IG9mZnNldCAqL1xyXG4gICAgICB0aGlzLnggLT0gZS5vZmZzZXRMZWZ0XHJcbiAgICAgIHRoaXMueSAtPSBlLm9mZnNldFRvcFxyXG4gICAgICBcclxuICAgICAgd2hpbGUgKGUgPSBlLm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgIHRoaXMueCAtPSBlLm9mZnNldExlZnRcclxuICAgICAgICB0aGlzLnkgLT0gZS5vZmZzZXRUb3BcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLyogY2FsY3VsYXRlIGN1bXVsYXRpdmUgem9vbSBmcm9tIHN2ZyBkb2N1bWVudHMgKi9cclxuICAgICAgZSA9IGVsZW1lbnRcclxuICAgICAgd2hpbGUgKGUgPSBlLnBhcmVudCkge1xyXG4gICAgICAgIGlmIChlLnR5cGUgPT0gJ3N2ZycgJiYgZS52aWV3Ym94KSB7XHJcbiAgICAgICAgICB6b29tICo9IGUudmlld2JveCgpLnpvb21cclxuICAgICAgICAgIHRoaXMueCAtPSBlLngoKSB8fCAwXHJcbiAgICAgICAgICB0aGlzLnkgLT0gZS55KCkgfHwgMFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiByZWNhbGN1bGF0ZSB2aWV3Ym94IGRpc3RvcnRpb24gKi9cclxuICAgIHRoaXMueCAvPSB6b29tXHJcbiAgICB0aGlzLnkgLz0gem9vbVxyXG4gICAgdGhpcy53aWR0aCAgPSBib3gud2lkdGggIC89IHpvb21cclxuICAgIHRoaXMuaGVpZ2h0ID0gYm94LmhlaWdodCAvPSB6b29tXHJcbiAgICBcclxuICAgIC8qIG9mZnNldCBieSB3aW5kb3cgc2Nyb2xsIHBvc2l0aW9uLCBiZWNhdXNlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBjaGFuZ2VzIHdoZW4gd2luZG93IGlzIHNjcm9sbGVkICovXHJcbiAgICB0aGlzLnggKz0gdHlwZW9mIHdpbmRvdy5zY3JvbGxYID09PSAnbnVtYmVyJyA/IHdpbmRvdy5zY3JvbGxYIDogd2luZG93LnBhZ2VYT2Zmc2V0XHJcbiAgICB0aGlzLnkgKz0gdHlwZW9mIHdpbmRvdy5zY3JvbGxZID09PSAnbnVtYmVyJyA/IHdpbmRvdy5zY3JvbGxZIDogd2luZG93LnBhZ2VZT2Zmc2V0XHJcbiAgXHJcbiAgICAvKiBhZGQgY2VudGVyLCByaWdodCBhbmQgYm90dG9tICovXHJcbiAgICBib3hQcm9wZXJ0aWVzKHRoaXMpXHJcbiAgICBcclxuICB9XHJcbiAgXHJcbiAgLy9cclxuICBTVkcuZXh0ZW5kKFNWRy5SQm94LCB7XHJcbiAgICAvLyBtZXJnZSByZWN0IGJveCB3aXRoIGFub3RoZXIsIHJldHVybiBhIG5ldyBpbnN0YW5jZVxyXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKGJveCkge1xyXG4gICAgICB2YXIgYiA9IG5ldyBTVkcuUkJveCgpXHJcbiAgXHJcbiAgICAgIC8qIG1lcmdlIGJveCAqL1xyXG4gICAgICBiLnggICAgICA9IE1hdGgubWluKHRoaXMueCwgYm94LngpXHJcbiAgICAgIGIueSAgICAgID0gTWF0aC5taW4odGhpcy55LCBib3gueSlcclxuICAgICAgYi53aWR0aCAgPSBNYXRoLm1heCh0aGlzLnggKyB0aGlzLndpZHRoLCAgYm94LnggKyBib3gud2lkdGgpICAtIGIueFxyXG4gICAgICBiLmhlaWdodCA9IE1hdGgubWF4KHRoaXMueSArIHRoaXMuaGVpZ2h0LCBib3gueSArIGJveC5oZWlnaHQpIC0gYi55XHJcbiAgXHJcbiAgICAgIC8qIGFkZCBjZW50ZXIsIHJpZ2h0IGFuZCBib3R0b20gKi9cclxuICAgICAgYm94UHJvcGVydGllcyhiKVxyXG4gIFxyXG4gICAgICByZXR1cm4gYlxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG5cclxuICBTVkcuRWxlbWVudCA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgLyogbWFrZSBzdHJva2UgdmFsdWUgYWNjZXNzaWJsZSBkeW5hbWljYWxseSAqL1xyXG4gICAgICB0aGlzLl9zdHJva2UgPSBTVkcuZGVmYXVsdHMuYXR0cnMuc3Ryb2tlXHJcbiAgXHJcbiAgICAgIC8qIGluaXRpYWxpemUgdHJhbnNmb3JtYXRpb24gc3RvcmUgd2l0aCBkZWZhdWx0cyAqL1xyXG4gICAgICB0aGlzLnRyYW5zID0gU1ZHLmRlZmF1bHRzLnRyYW5zKClcclxuICAgICAgXHJcbiAgICAgIC8qIGNyZWF0ZSBjaXJjdWxhciByZWZlcmVuY2UgKi9cclxuICAgICAgaWYgKHRoaXMubm9kZSA9IG5vZGUpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSBub2RlLm5vZGVOYW1lXHJcbiAgICAgICAgdGhpcy5ub2RlLmluc3RhbmNlID0gdGhpc1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIE1vdmUgb3ZlciB4LWF4aXNcclxuICAgICAgeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIGlmICh4ICE9IG51bGwpIHtcclxuICAgICAgICAgIHggPSBuZXcgU1ZHLk51bWJlcih4KVxyXG4gICAgICAgICAgeC52YWx1ZSAvPSB0aGlzLnRyYW5zLnNjYWxlWFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCd4JywgeClcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIG92ZXIgeS1heGlzXHJcbiAgICAsIHk6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgICBpZiAoeSAhPSBudWxsKSB7XHJcbiAgICAgICAgICB5ID0gbmV3IFNWRy5OdW1iZXIoeSlcclxuICAgICAgICAgIHkudmFsdWUgLz0gdGhpcy50cmFucy5zY2FsZVlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cigneScsIHkpXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBieSBjZW50ZXIgb3ZlciB4LWF4aXNcclxuICAgICwgY3g6IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICByZXR1cm4geCA9PSBudWxsID8gdGhpcy54KCkgKyB0aGlzLndpZHRoKCkgLyAyIDogdGhpcy54KHggLSB0aGlzLndpZHRoKCkgLyAyKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeS1heGlzXHJcbiAgICAsIGN5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMueSgpICsgdGhpcy5oZWlnaHQoKSAvIDIgOiB0aGlzLnkoeSAtIHRoaXMuaGVpZ2h0KCkgLyAyKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgZWxlbWVudCB0byBnaXZlbiB4IGFuZCB5IHZhbHVlc1xyXG4gICAgLCBtb3ZlOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCh4KS55KHkpXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBlbGVtZW50IGJ5IGl0cyBjZW50ZXJcclxuICAgICwgY2VudGVyOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3goeCkuY3koeSlcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgd2lkdGggb2YgZWxlbWVudFxyXG4gICAgLCB3aWR0aDogZnVuY3Rpb24od2lkdGgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCd3aWR0aCcsIHdpZHRoKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxyXG4gICAgLCBoZWlnaHQ6IGZ1bmN0aW9uKGhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgZWxlbWVudCBzaXplIHRvIGdpdmVuIHdpZHRoIGFuZCBoZWlnaHRcclxuICAgICwgc2l6ZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHZhciBwID0gcHJvcG9ydGlvbmFsU2l6ZSh0aGlzLmJib3goKSwgd2lkdGgsIGhlaWdodClcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgICAgLndpZHRoKG5ldyBTVkcuTnVtYmVyKHAud2lkdGgpKVxyXG4gICAgICAgICAgLmhlaWdodChuZXcgU1ZHLk51bWJlcihwLmhlaWdodCkpXHJcbiAgICAgIH1cclxuICAgICAgLy8gQ2xvbmUgZWxlbWVudFxyXG4gICAgLCBjbG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNsb25lICwgYXR0clxyXG4gICAgICAgICAgLCB0eXBlID0gdGhpcy50eXBlXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogaW52b2tlIHNoYXBlIG1ldGhvZCB3aXRoIHNoYXBlLXNwZWNpZmljIGFyZ3VtZW50cyAqL1xyXG4gICAgICAgIGNsb25lID0gdHlwZSA9PSAncmVjdCcgfHwgdHlwZSA9PSAnZWxsaXBzZScgP1xyXG4gICAgICAgICAgdGhpcy5wYXJlbnRbdHlwZV0oMCwwKSA6XHJcbiAgICAgICAgdHlwZSA9PSAnbGluZScgP1xyXG4gICAgICAgICAgdGhpcy5wYXJlbnRbdHlwZV0oMCwwLDAsMCkgOlxyXG4gICAgICAgIHR5cGUgPT0gJ2ltYWdlJyA/XHJcbiAgICAgICAgICB0aGlzLnBhcmVudFt0eXBlXSh0aGlzLnNyYykgOlxyXG4gICAgICAgIHR5cGUgPT0gJ3RleHQnID9cclxuICAgICAgICAgIHRoaXMucGFyZW50W3R5cGVdKHRoaXMuY29udGVudCkgOlxyXG4gICAgICAgIHR5cGUgPT0gJ3BhdGgnID9cclxuICAgICAgICAgIHRoaXMucGFyZW50W3R5cGVdKHRoaXMuYXR0cignZCcpKSA6XHJcbiAgICAgICAgdHlwZSA9PSAncG9seWxpbmUnIHx8IHR5cGUgPT0gJ3BvbHlnb24nID9cclxuICAgICAgICAgIHRoaXMucGFyZW50W3R5cGVdKHRoaXMuYXR0cigncG9pbnRzJykpIDpcclxuICAgICAgICB0eXBlID09ICdnJyA/XHJcbiAgICAgICAgICB0aGlzLnBhcmVudC5ncm91cCgpIDpcclxuICAgICAgICAgIHRoaXMucGFyZW50W3R5cGVdKClcclxuICAgICAgICBcclxuICAgICAgICAvKiBhcHBseSBhdHRyaWJ1dGVzIGF0dHJpYnV0ZXMgKi9cclxuICAgICAgICBhdHRyID0gdGhpcy5hdHRyKClcclxuICAgICAgICBkZWxldGUgYXR0ci5pZFxyXG4gICAgICAgIGNsb25lLmF0dHIoYXR0cilcclxuICAgICAgICBcclxuICAgICAgICAvKiBjb3B5IHRyYW5zZm9ybWF0aW9ucyAqL1xyXG4gICAgICAgIGNsb25lLnRyYW5zID0gdGhpcy50cmFuc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGFwcGx5IGF0dHJpYnV0ZXMgYW5kIHRyYW5zbGF0aW9ucyAqL1xyXG4gICAgICAgIHJldHVybiBjbG9uZS50cmFuc2Zvcm0oe30pXHJcbiAgICAgIH1cclxuICAgICAgLy8gUmVtb3ZlIGVsZW1lbnRcclxuICAgICwgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpXHJcbiAgICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmVFbGVtZW50KHRoaXMpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBSZXBsYWNlIGVsZW1lbnRcclxuICAgICwgcmVwbGFjZTogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuYWZ0ZXIoZWxlbWVudCkucmVtb3ZlKClcclxuICBcclxuICAgICAgICByZXR1cm4gZWxlbWVudFxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBlbGVtZW50IHRvIGdpdmVuIGNvbnRhaW5lciBhbmQgcmV0dXJuIHNlbGZcclxuICAgICwgYWRkVG86IGZ1bmN0aW9uKHBhcmVudCkge1xyXG4gICAgICAgIHJldHVybiBwYXJlbnQucHV0KHRoaXMpXHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIGVsZW1lbnQgdG8gZ2l2ZW4gY29udGFpbmVyIGFuZCByZXR1cm4gY29udGFpbmVyXHJcbiAgICAsIHB1dEluOiBmdW5jdGlvbihwYXJlbnQpIHtcclxuICAgICAgICByZXR1cm4gcGFyZW50LmFkZCh0aGlzKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEdldCBwYXJlbnQgZG9jdW1lbnRcclxuICAgICwgZG9jOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudCh0eXBlIHx8IFNWRy5Eb2MpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IHN2ZyBlbGVtZW50IGF0dHJpYnV0ZVxyXG4gICAgLCBhdHRyOiBmdW5jdGlvbihhLCB2LCBuKSB7XHJcbiAgICAgICAgaWYgKGEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgLyogZ2V0IGFuIG9iamVjdCBvZiBhdHRyaWJ1dGVzICovXHJcbiAgICAgICAgICBhID0ge31cclxuICAgICAgICAgIHYgPSB0aGlzLm5vZGUuYXR0cmlidXRlc1xyXG4gICAgICAgICAgZm9yIChuID0gdi5sZW5ndGggLSAxOyBuID49IDA7IG4tLSlcclxuICAgICAgICAgICAgYVt2W25dLm5vZGVOYW1lXSA9IFNWRy5yZWdleC5pc051bWJlci50ZXN0KHZbbl0ubm9kZVZhbHVlKSA/IHBhcnNlRmxvYXQodltuXS5ub2RlVmFsdWUpIDogdltuXS5ub2RlVmFsdWVcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcmV0dXJuIGFcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGEgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIC8qIGFwcGx5IGV2ZXJ5IGF0dHJpYnV0ZSBpbmRpdmlkdWFsbHkgaWYgYW4gb2JqZWN0IGlzIHBhc3NlZCAqL1xyXG4gICAgICAgICAgZm9yICh2IGluIGEpIHRoaXMuYXR0cih2LCBhW3ZdKVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICh2ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8qIHJlbW92ZSB2YWx1ZSAqL1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQXR0cmlidXRlKGEpXHJcbiAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKHYgPT0gbnVsbCkge1xyXG4gICAgICAgICAgLyogYWN0IGFzIGEgZ2V0dGVyIGlmIHRoZSBmaXJzdCBhbmQgb25seSBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0ICovXHJcbiAgICAgICAgICB2ID0gdGhpcy5ub2RlLmF0dHJpYnV0ZXNbYV1cclxuICAgICAgICAgIHJldHVybiB2ID09IG51bGwgPyBcclxuICAgICAgICAgICAgU1ZHLmRlZmF1bHRzLmF0dHJzW2FdIDpcclxuICAgICAgICAgIFNWRy5yZWdleC5pc051bWJlci50ZXN0KHYubm9kZVZhbHVlKSA/XHJcbiAgICAgICAgICAgIHBhcnNlRmxvYXQodi5ub2RlVmFsdWUpIDogdi5ub2RlVmFsdWVcclxuICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGEgPT0gJ3N0eWxlJykge1xyXG4gICAgICAgICAgLyogcmVkaXJlY3QgdG8gdGhlIHN0eWxlIG1ldGhvZCAqL1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGUodilcclxuICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLyogQlVHIEZJWDogc29tZSBicm93c2VycyB3aWxsIHJlbmRlciBhIHN0cm9rZSBpZiBhIGNvbG9yIGlzIGdpdmVuIGV2ZW4gdGhvdWdoIHN0cm9rZSB3aWR0aCBpcyAwICovXHJcbiAgICAgICAgICBpZiAoYSA9PSAnc3Ryb2tlLXdpZHRoJylcclxuICAgICAgICAgICAgdGhpcy5hdHRyKCdzdHJva2UnLCBwYXJzZUZsb2F0KHYpID4gMCA/IHRoaXMuX3N0cm9rZSA6IG51bGwpXHJcbiAgICAgICAgICBlbHNlIGlmIChhID09ICdzdHJva2UnKVxyXG4gICAgICAgICAgICB0aGlzLl9zdHJva2UgPSB2XHJcbiAgXHJcbiAgICAgICAgICAvKiBjb252ZXJ0IGltYWdlIGZpbGwgYW5kIHN0cm9rZSB0byBwYXR0ZXJucyAqL1xyXG4gICAgICAgICAgaWYgKGEgPT0gJ2ZpbGwnIHx8IGEgPT0gJ3N0cm9rZScpIHtcclxuICAgICAgICAgICAgaWYgKFNWRy5yZWdleC5pc0ltYWdlLnRlc3QodikpXHJcbiAgICAgICAgICAgICAgdiA9IHRoaXMuZG9jKCkuZGVmcygpLmltYWdlKHYsIDAsIDApXHJcbiAgXHJcbiAgICAgICAgICAgIGlmICh2IGluc3RhbmNlb2YgU1ZHLkltYWdlKVxyXG4gICAgICAgICAgICAgIHYgPSB0aGlzLmRvYygpLmRlZnMoKS5wYXR0ZXJuKDAsIDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQodilcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvKiBlbnN1cmUgY29ycmVjdCBudW1lcmljIHZhbHVlcyAoYWxzbyBhY2NlcHRzIE5hTiBhbmQgSW5maW5pdHkpICovXHJcbiAgICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICB2ID0gbmV3IFNWRy5OdW1iZXIodilcclxuICBcclxuICAgICAgICAgIC8qIGVuc3VyZSBmdWxsIGhleCBjb2xvciAqL1xyXG4gICAgICAgICAgZWxzZSBpZiAoU1ZHLkNvbG9yLmlzQ29sb3IodikpXHJcbiAgICAgICAgICAgIHYgPSBuZXcgU1ZHLkNvbG9yKHYpXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8qIHBhcnNlIGFycmF5IHZhbHVlcyAqL1xyXG4gICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2KSlcclxuICAgICAgICAgICAgdiA9IG5ldyBTVkcuQXJyYXkodilcclxuICBcclxuICAgICAgICAgIC8qIGlmIHRoZSBwYXNzZWQgYXR0cmlidXRlIGlzIGxlYWRpbmcuLi4gKi9cclxuICAgICAgICAgIGlmIChhID09ICdsZWFkaW5nJykge1xyXG4gICAgICAgICAgICAvKiAuLi4gY2FsbCB0aGUgbGVhZGluZyBtZXRob2QgaW5zdGVhZCAqL1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sZWFkaW5nKVxyXG4gICAgICAgICAgICAgIHRoaXMubGVhZGluZyh2KVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLyogc2V0IGdpdmVuIGF0dHJpYnV0ZSBvbiBub2RlICovXHJcbiAgICAgICAgICAgIHR5cGVvZiBuID09PSAnc3RyaW5nJyA/XHJcbiAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZU5TKG4sIGEsIHYudG9TdHJpbmcoKSkgOlxyXG4gICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoYSwgdi50b1N0cmluZygpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvKiByZWJ1aWxkIGlmIHJlcXVpcmVkICovXHJcbiAgICAgICAgICBpZiAodGhpcy5yZWJ1aWxkICYmIChhID09ICdmb250LXNpemUnIHx8IGEgPT0gJ3gnKSlcclxuICAgICAgICAgICAgdGhpcy5yZWJ1aWxkKGEsIHYpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gTWFuYWdlIHRyYW5zZm9ybWF0aW9uc1xyXG4gICAgLCB0cmFuc2Zvcm06IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAvKiBhY3QgYXMgYSBnZXR0ZXIgaWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4gKi9cclxuICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zXHJcbiAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgLyogYWN0IGFzIGEgZ2V0dGVyIGlmIG9ubHkgb25lIHN0cmluZyBhcmd1bWVudCBpcyBnaXZlbiAqL1xyXG4gICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc1tvXVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvKiBhcHBseSB0cmFuc2Zvcm1hdGlvbnMgYXMgb2JqZWN0IGlmIGtleSB2YWx1ZSBhcmd1bWVudHMgYXJlIGdpdmVuKi9cclxuICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSB7fVxyXG4gICAgICAgICAgdHJhbnNmb3JtW29dID0gdlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0odHJhbnNmb3JtKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKiAuLi4gb3RoZXJ3aXNlIGNvbnRpbnVlIGFzIGEgc2V0dGVyICovXHJcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IFtdXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogcGFyc2UgbWF0cml4ICovXHJcbiAgICAgICAgbyA9IHBhcnNlTWF0cml4KG8pXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogbWVyZ2UgdmFsdWVzICovXHJcbiAgICAgICAgZm9yICh2IGluIG8pXHJcbiAgICAgICAgICBpZiAob1t2XSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zW3ZdID0gb1t2XVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGNvbXBpbGUgbWF0cml4ICovXHJcbiAgICAgICAgdGhpcy50cmFucy5tYXRyaXggPSB0aGlzLnRyYW5zLmFcclxuICAgICAgICAgICAgICAgICAgICArICcgJyArIHRoaXMudHJhbnMuYlxyXG4gICAgICAgICAgICAgICAgICAgICsgJyAnICsgdGhpcy50cmFucy5jXHJcbiAgICAgICAgICAgICAgICAgICAgKyAnICcgKyB0aGlzLnRyYW5zLmRcclxuICAgICAgICAgICAgICAgICAgICArICcgJyArIHRoaXMudHJhbnMuZVxyXG4gICAgICAgICAgICAgICAgICAgICsgJyAnICsgdGhpcy50cmFucy5mXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogYWxpYXMgY3VycmVudCB0cmFuc2Zvcm1hdGlvbnMgKi9cclxuICAgICAgICBvID0gdGhpcy50cmFuc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGFkZCBtYXRyaXggKi9cclxuICAgICAgICBpZiAoby5tYXRyaXggIT0gU1ZHLmRlZmF1bHRzLm1hdHJpeClcclxuICAgICAgICAgIHRyYW5zZm9ybS5wdXNoKCdtYXRyaXgoJyArIG8ubWF0cml4ICsgJyknKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGFkZCByb3RhdGlvbiAqL1xyXG4gICAgICAgIGlmIChvLnJvdGF0aW9uICE9IDApXHJcbiAgICAgICAgICB0cmFuc2Zvcm0ucHVzaCgncm90YXRlKCcgKyBvLnJvdGF0aW9uICsgJyAnICsgKG8uY3ggPT0gbnVsbCA/IHRoaXMuYmJveCgpLmN4IDogby5jeCkgKyAnICcgKyAoby5jeSA9PSBudWxsID8gdGhpcy5iYm94KCkuY3kgOiBvLmN5KSArICcpJylcclxuICAgICAgICBcclxuICAgICAgICAvKiBhZGQgc2NhbGUgKi9cclxuICAgICAgICBpZiAoby5zY2FsZVggIT0gMSB8fCBvLnNjYWxlWSAhPSAxKVxyXG4gICAgICAgICAgdHJhbnNmb3JtLnB1c2goJ3NjYWxlKCcgKyBvLnNjYWxlWCArICcgJyArIG8uc2NhbGVZICsgJyknKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGFkZCBza2V3IG9uIHggYXhpcyAqL1xyXG4gICAgICAgIGlmIChvLnNrZXdYICE9IDApXHJcbiAgICAgICAgICB0cmFuc2Zvcm0ucHVzaCgnc2tld1goJyArIG8uc2tld1ggKyAnKScpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogYWRkIHNrZXcgb24geSBheGlzICovXHJcbiAgICAgICAgaWYgKG8uc2tld1kgIT0gMClcclxuICAgICAgICAgIHRyYW5zZm9ybS5wdXNoKCdza2V3WSgnICsgby5za2V3WSArICcpJylcclxuICAgICAgICBcclxuICAgICAgICAvKiBhZGQgdHJhbnNsYXRpb24gKi9cclxuICAgICAgICBpZiAoby54ICE9IDAgfHwgby55ICE9IDApXHJcbiAgICAgICAgICB0cmFuc2Zvcm0ucHVzaCgndHJhbnNsYXRlKCcgKyBuZXcgU1ZHLk51bWJlcihvLnggLyBvLnNjYWxlWCkgKyAnICcgKyBuZXcgU1ZHLk51bWJlcihvLnkgLyBvLnNjYWxlWSkgKyAnKScpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogdXBkYXRlIHRyYW5zZm9ybWF0aW9ucywgZXZlbiBpZiB0aGVyZSBhcmUgbm9uZSAqL1xyXG4gICAgICAgIGlmICh0cmFuc2Zvcm0ubGVuZ3RoID09IDApXHJcbiAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQXR0cmlidXRlKCd0cmFuc2Zvcm0nKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybS5qb2luKCcgJykpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBEeW5hbWljIHN0eWxlIGdlbmVyYXRvclxyXG4gICAgLCBzdHlsZTogZnVuY3Rpb24ocywgdikge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIC8qIGdldCBmdWxsIHN0eWxlICovXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnN0eWxlLmNzc1RleHQgfHwgJydcclxuICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAvKiBhcHBseSBldmVyeSBzdHlsZSBpbmRpdmlkdWFsbHkgaWYgYW4gb2JqZWN0IGlzIHBhc3NlZCAqL1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBzID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGZvciAodiBpbiBzKSB0aGlzLnN0eWxlKHYsIHNbdl0pXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIH0gZWxzZSBpZiAoU1ZHLnJlZ2V4LmlzQ3NzLnRlc3QocykpIHtcclxuICAgICAgICAgICAgLyogcGFyc2UgY3NzIHN0cmluZyAqL1xyXG4gICAgICAgICAgICBzID0gcy5zcGxpdCgnOycpXHJcbiAgXHJcbiAgICAgICAgICAgIC8qIGFwcGx5IGV2ZXJ5IGRlZmluaXRpb24gaW5kaXZpZHVhbGx5ICovXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHYgPSBzW2ldLnNwbGl0KCc6JylcclxuICAgICAgICAgICAgICB0aGlzLnN0eWxlKHZbMF0ucmVwbGFjZSgvXFxzKy9nLCAnJyksIHZbMV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8qIGFjdCBhcyBhIGdldHRlciBpZiB0aGUgZmlyc3QgYW5kIG9ubHkgYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdCAqL1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnN0eWxlW2NhbWVsQ2FzZShzKV1cclxuICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLnN0eWxlW2NhbWVsQ2FzZShzKV0gPSB2ID09PSBudWxsIHx8IFNWRy5yZWdleC5pc0JsYW5rLnRlc3QodikgPyAnJyA6IHZcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgLyBzZXQgaWRcclxuICAgICwgaWQ6IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignaWQnLCBpZClcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgYm91bmRpbmcgYm94XHJcbiAgICAsIGJib3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU1ZHLkJCb3godGhpcylcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgcmVjdCBib3hcclxuICAgICwgcmJveDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTVkcuUkJveCh0aGlzKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBwb2ludCBpbnNpZGUgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgZWxlbWVudFxyXG4gICAgLCBpbnNpZGU6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICB2YXIgYm94ID0gdGhpcy5iYm94KClcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4geCA+IGJveC54XHJcbiAgICAgICAgICAgICYmIHkgPiBib3gueVxyXG4gICAgICAgICAgICAmJiB4IDwgYm94LnggKyBib3gud2lkdGhcclxuICAgICAgICAgICAgJiYgeSA8IGJveC55ICsgYm94LmhlaWdodFxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNob3cgZWxlbWVudFxyXG4gICAgLCBzaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdHlsZSgnZGlzcGxheScsICcnKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEhpZGUgZWxlbWVudFxyXG4gICAgLCBoaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdHlsZSgnZGlzcGxheScsICdub25lJylcclxuICAgICAgfVxyXG4gICAgICAvLyBJcyBlbGVtZW50IHZpc2libGU/XHJcbiAgICAsIHZpc2libGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0eWxlKCdkaXNwbGF5JykgIT0gJ25vbmUnXHJcbiAgICAgIH1cclxuICAgICAgLy8gUmV0dXJuIGlkIG9uIHN0cmluZyBjb252ZXJzaW9uXHJcbiAgICAsIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdpZCcpXHJcbiAgICAgIH1cclxuICAgICAgLy8gUmV0dXJuIGFycmF5IG9mIGNsYXNzZXMgb24gdGhlIG5vZGVcclxuICAgICwgY2xhc3NlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzQXR0ciA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJylcclxuICAgICAgICBpZiAoY2xhc3NBdHRyID09PSBudWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gW11cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGNsYXNzQXR0ci50cmltKCkuc3BsaXQoL1xccysvKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBSZXR1cm4gdHJ1ZSBpZiBjbGFzcyBleGlzdHMgb24gdGhlIG5vZGUsIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgLCBoYXNDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NlcygpLmluZGV4T2YoY2xhc3NOYW1lKSAhPSAtMVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBjbGFzcyB0byB0aGUgbm9kZVxyXG4gICAgLCBhZGRDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzQXJyYXlcclxuICAgICAgICBpZiAoISh0aGlzLmhhc0NsYXNzKGNsYXNzTmFtZSkpKSB7XHJcbiAgICAgICAgICBjbGFzc0FycmF5ID0gdGhpcy5jbGFzc2VzKClcclxuICAgICAgICAgIGNsYXNzQXJyYXkucHVzaChjbGFzc05hbWUpXHJcbiAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzQXJyYXkuam9pbignICcpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFJlbW92ZSBjbGFzcyBmcm9tIHRoZSBub2RlXHJcbiAgICAsIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcclxuICAgICAgICB2YXIgY2xhc3NBcnJheVxyXG4gICAgICAgIGlmICh0aGlzLmhhc0NsYXNzKGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgIGNsYXNzQXJyYXkgPSB0aGlzLmNsYXNzZXMoKS5maWx0ZXIoZnVuY3Rpb24oYykge1xyXG4gICAgICAgICAgICByZXR1cm4gYyAhPSBjbGFzc05hbWVcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzQXJyYXkuam9pbignICcpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFRvZ2dsZSB0aGUgcHJlc2VuY2Ugb2YgYSBjbGFzcyBvbiB0aGUgbm9kZVxyXG4gICAgLCB0b2dnbGVDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhjbGFzc05hbWUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoY2xhc3NOYW1lKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEdldCByZWZlcmVuY2VkIGVsZW1lbnQgZm9ybSBhdHRyaWJ1dGUgdmFsdWVcclxuICAgICwgcmVmZXJlbmNlOiBmdW5jdGlvbihhdHRyKSB7XHJcbiAgICAgICAgcmV0dXJuIFNWRy5nZXQodGhpcy5hdHRyKClbYXR0cl0pXHJcbiAgICAgIH1cclxuICAgICAgLy8gUHJpdmF0ZTogZmluZCBzdmcgcGFyZW50IGJ5IGluc3RhbmNlXHJcbiAgICAsIF9wYXJlbnQ6IGZ1bmN0aW9uKHBhcmVudCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdoaWxlIChlbGVtZW50ICE9IG51bGwgJiYgIShlbGVtZW50IGluc3RhbmNlb2YgcGFyZW50KSlcclxuICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudFxyXG4gIFxyXG4gICAgICAgIHJldHVybiBlbGVtZW50XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuXHJcbiAgU1ZHLlBhcmVudCA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIGVsZW1lbnQpXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5FbGVtZW50XHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIFJldHVybnMgYWxsIGNoaWxkIGVsZW1lbnRzXHJcbiAgICAgIGNoaWxkcmVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfHwgKHRoaXMuX2NoaWxkcmVuID0gW10pXHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIGdpdmVuIGVsZW1lbnQgYXQgYSBwb3NpdGlvblxyXG4gICAgLCBhZGQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaGFzKGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAvKiBkZWZpbmUgaW5zZXJ0aW9uIGluZGV4IGlmIG5vbmUgZ2l2ZW4gKi9cclxuICAgICAgICAgIGkgPSBpID09IG51bGwgPyB0aGlzLmNoaWxkcmVuKCkubGVuZ3RoIDogaVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvKiByZW1vdmUgcmVmZXJlbmNlcyBmcm9tIHByZXZpb3VzIHBhcmVudCAqL1xyXG4gICAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50KVxyXG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudC5jaGlsZHJlbigpLnNwbGljZShlbGVtZW50LnBhcmVudC5pbmRleChlbGVtZW50KSwgMSlcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogYWRkIGVsZW1lbnQgcmVmZXJlbmNlcyAqL1xyXG4gICAgICAgICAgdGhpcy5jaGlsZHJlbigpLnNwbGljZShpLCAwLCBlbGVtZW50KVxyXG4gICAgICAgICAgdGhpcy5ub2RlLmluc2VydEJlZm9yZShlbGVtZW50Lm5vZGUsIHRoaXMubm9kZS5jaGlsZE5vZGVzW2ldIHx8IG51bGwpXHJcbiAgICAgICAgICBlbGVtZW50LnBhcmVudCA9IHRoaXNcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgLyogcmVwb3NpdGlvbiBkZWZzICovXHJcbiAgICAgICAgaWYgKHRoaXMuX2RlZnMpIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9kZWZzLm5vZGUpXHJcbiAgICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5fZGVmcy5ub2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEJhc2ljYWxseSBkb2VzIHRoZSBzYW1lIGFzIGBhZGQoKWAgYnV0IHJldHVybnMgdGhlIGFkZGVkIGVsZW1lbnQgaW5zdGVhZFxyXG4gICAgLCBwdXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGkpIHtcclxuICAgICAgICB0aGlzLmFkZChlbGVtZW50LCBpKVxyXG4gICAgICAgIHJldHVybiBlbGVtZW50XHJcbiAgICAgIH1cclxuICAgICAgLy8gQ2hlY2tzIGlmIHRoZSBnaXZlbiBlbGVtZW50IGlzIGEgY2hpbGRcclxuICAgICwgaGFzOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXgoZWxlbWVudCkgPj0gMFxyXG4gICAgICB9XHJcbiAgICAgIC8vIEdldHMgaW5kZXggb2YgZ2l2ZW4gZWxlbWVudFxyXG4gICAgLCBpbmRleDogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkuaW5kZXhPZihlbGVtZW50KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEdldCBhIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4XHJcbiAgICAsIGdldDogZnVuY3Rpb24oaSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKClbaV1cclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgZmlyc3QgY2hpbGQsIHNraXBwaW5nIHRoZSBkZWZzIG5vZGVcclxuICAgICwgZmlyc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKClbMF1cclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgdGhlIGxhc3QgY2hpbGRcclxuICAgICwgbGFzdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4oKVt0aGlzLmNoaWxkcmVuKCkubGVuZ3RoIC0gMV1cclxuICAgICAgfVxyXG4gICAgICAvLyBJdGVyYXRlcyBvdmVyIGFsbCBjaGlsZHJlbiBhbmQgaW52b2tlcyBhIGdpdmVuIGJsb2NrXHJcbiAgICAsIGVhY2g6IGZ1bmN0aW9uKGJsb2NrLCBkZWVwKSB7XHJcbiAgICAgICAgdmFyIGksIGlsXHJcbiAgICAgICAgICAsIGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbigpXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChpID0gMCwgaWwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoY2hpbGRyZW5baV0gaW5zdGFuY2VvZiBTVkcuRWxlbWVudClcclxuICAgICAgICAgICAgYmxvY2suYXBwbHkoY2hpbGRyZW5baV0sIFtpLCBjaGlsZHJlbl0pXHJcbiAgXHJcbiAgICAgICAgICBpZiAoZGVlcCAmJiAoY2hpbGRyZW5baV0gaW5zdGFuY2VvZiBTVkcuQ29udGFpbmVyKSlcclxuICAgICAgICAgICAgY2hpbGRyZW5baV0uZWFjaChibG9jaywgZGVlcClcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gUmVtb3ZlIGEgY2hpbGQgZWxlbWVudCBhdCBhIHBvc2l0aW9uXHJcbiAgICAsIHJlbW92ZUVsZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuKCkuc3BsaWNlKHRoaXMuaW5kZXgoZWxlbWVudCksIDEpXHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQubm9kZSlcclxuICAgICAgICBlbGVtZW50LnBhcmVudCA9IG51bGxcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFJlbW92ZSBhbGwgZWxlbWVudHMgaW4gdGhpcyBjb250YWluZXJcclxuICAgICwgY2xlYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8qIHJlbW92ZSBjaGlsZHJlbiAqL1xyXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmNoaWxkcmVuKCkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUVsZW1lbnQodGhpcy5jaGlsZHJlbigpW2ldKVxyXG4gIFxyXG4gICAgICAgIC8qIHJlbW92ZSBkZWZzIG5vZGUgKi9cclxuICAgICAgICBpZiAodGhpcy5fZGVmcylcclxuICAgICAgICAgIHRoaXMuX2RlZnMuY2xlYXIoKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAsIC8vIEdldCBkZWZzXHJcbiAgICAgIGRlZnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvYygpLmRlZnMoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG5cclxuXHJcbiAgU1ZHLkNvbnRhaW5lciA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIGVsZW1lbnQpXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5QYXJlbnRcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gR2V0IHRoZSB2aWV3Qm94IGFuZCBjYWxjdWxhdGUgdGhlIHpvb20gdmFsdWVcclxuICAgICAgdmlld2JveDogZnVuY3Rpb24odikge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAvKiBhY3QgYXMgYSBnZXR0ZXIgaWYgdGhlcmUgYXJlIG5vIGFyZ3VtZW50cyAqL1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBTVkcuVmlld0JveCh0aGlzKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIG90aGVyd2lzZSBhY3QgYXMgYSBzZXR0ZXIgKi9cclxuICAgICAgICB2ID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID9cclxuICAgICAgICAgIFt2LngsIHYueSwgdi53aWR0aCwgdi5oZWlnaHRdIDpcclxuICAgICAgICAgIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ3ZpZXdCb3gnLCB2KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG5cclxuICBTVkcuRlggPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgRlggb2JqZWN0XHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgLyogc3RvcmUgdGFyZ2V0IGVsZW1lbnQgKi9cclxuICAgICAgdGhpcy50YXJnZXQgPSBlbGVtZW50XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIEFkZCBhbmltYXRpb24gcGFyYW1ldGVycyBhbmQgc3RhcnQgYW5pbWF0aW9uXHJcbiAgICAgIGFuaW1hdGU6IGZ1bmN0aW9uKGQsIGVhc2UsIGRlbGF5KSB7XHJcbiAgICAgICAgdmFyIGFrZXlzLCB0a2V5cywgc2tleXMsIGtleVxyXG4gICAgICAgICAgLCBlbGVtZW50ID0gdGhpcy50YXJnZXRcclxuICAgICAgICAgICwgZnggPSB0aGlzXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogZGlzc2VjdCBvYmplY3QgaWYgb25lIGlzIHBhc3NlZCAqL1xyXG4gICAgICAgIGlmICh0eXBlb2YgZCA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgZGVsYXkgPSBkLmRlbGF5XHJcbiAgICAgICAgICBlYXNlID0gZC5lYXNlXHJcbiAgICAgICAgICBkID0gZC5kdXJhdGlvblxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICAvKiBlbnN1cmUgZGVmYXVsdCBkdXJhdGlvbiBhbmQgZWFzaW5nICovXHJcbiAgICAgICAgZCA9IGQgPT0gJz0nID8gZCA6IGQgPT0gbnVsbCA/IDEwMDAgOiBuZXcgU1ZHLk51bWJlcihkKS52YWx1ZU9mKClcclxuICAgICAgICBlYXNlID0gZWFzZSB8fCAnPD4nXHJcbiAgXHJcbiAgICAgICAgLyogcHJvY2VzcyB2YWx1ZXMgKi9cclxuICAgICAgICBmeC50byA9IGZ1bmN0aW9uKHBvcykge1xyXG4gICAgICAgICAgdmFyIGlcclxuICBcclxuICAgICAgICAgIC8qIG5vcm1hbGlzZSBwb3MgKi9cclxuICAgICAgICAgIHBvcyA9IHBvcyA8IDAgPyAwIDogcG9zID4gMSA/IDEgOiBwb3NcclxuICBcclxuICAgICAgICAgIC8qIGNvbGxlY3QgYXR0cmlidXRlIGtleXMgKi9cclxuICAgICAgICAgIGlmIChha2V5cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFrZXlzID0gW11cclxuICAgICAgICAgICAgZm9yIChrZXkgaW4gZnguYXR0cnMpXHJcbiAgICAgICAgICAgICAgYWtleXMucHVzaChrZXkpXHJcbiAgXHJcbiAgICAgICAgICAgIC8qIG1ha2Ugc3VyZSBtb3JwaGFibGUgZWxlbWVudHMgYXJlIHNjYWxlZCwgdHJhbnNsYXRlZCBhbmQgbW9ycGhlZCBhbGwgdG9nZXRoZXIgKi9cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubW9ycGhBcnJheSAmJiAoZnguX3Bsb3QgfHwgYWtleXMuaW5kZXhPZigncG9pbnRzJykgPiAtMSkpIHtcclxuICAgICAgICAgICAgICAvKiBnZXQgZGVzdGluYXRpb24gKi9cclxuICAgICAgICAgICAgICB2YXIgYm94XHJcbiAgICAgICAgICAgICAgICAsIHAgPSBuZXcgZWxlbWVudC5tb3JwaEFycmF5KGZ4Ll9wbG90IHx8IGZ4LmF0dHJzLnBvaW50cyB8fCBlbGVtZW50LmFycmF5KVxyXG4gIFxyXG4gICAgICAgICAgICAgIC8qIGFkZCBzaXplICovXHJcbiAgICAgICAgICAgICAgaWYgKGZ4Ll9zaXplKSBwLnNpemUoZnguX3NpemUud2lkdGgudG8sIGZ4Ll9zaXplLmhlaWdodC50bylcclxuICBcclxuICAgICAgICAgICAgICAvKiBhZGQgbW92ZW1lbnQgKi9cclxuICAgICAgICAgICAgICBib3ggPSBwLmJib3goKVxyXG4gICAgICAgICAgICAgIGlmIChmeC5feCkgcC5tb3ZlKGZ4Ll94LnRvLCBib3gueSlcclxuICAgICAgICAgICAgICBlbHNlIGlmIChmeC5fY3gpIHAubW92ZShmeC5fY3gudG8gLSBib3gud2lkdGggLyAyLCBib3gueSlcclxuICBcclxuICAgICAgICAgICAgICBib3ggPSBwLmJib3goKVxyXG4gICAgICAgICAgICAgIGlmIChmeC5feSkgcC5tb3ZlKGJveC54LCBmeC5feS50bylcclxuICAgICAgICAgICAgICBlbHNlIGlmIChmeC5fY3kpIHAubW92ZShib3gueCwgZnguX2N5LnRvIC0gYm94LmhlaWdodCAvIDIpXHJcbiAgXHJcbiAgICAgICAgICAgICAgLyogZGVsZXRlIGVsZW1lbnQgb3JpZW50ZWQgY2hhbmdlcyAqL1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBmeC5feFxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBmeC5feVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBmeC5fY3hcclxuICAgICAgICAgICAgICBkZWxldGUgZnguX2N5XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGZ4Ll9zaXplXHJcbiAgXHJcbiAgICAgICAgICAgICAgZnguX3Bsb3QgPSBlbGVtZW50LmFycmF5Lm1vcnBoKHApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICBcclxuICAgICAgICAgIC8qIGNvbGxlY3QgdHJhbnNmb3JtYXRpb24ga2V5cyAqL1xyXG4gICAgICAgICAgaWYgKHRrZXlzID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGtleXMgPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBmeC50cmFucylcclxuICAgICAgICAgICAgICB0a2V5cy5wdXNoKGtleSlcclxuICAgICAgICAgIH1cclxuICBcclxuICAgICAgICAgIC8qIGNvbGxlY3Qgc3R5bGUga2V5cyAqL1xyXG4gICAgICAgICAgaWYgKHNrZXlzID09IG51bGwpIHtcclxuICAgICAgICAgICAgc2tleXMgPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBmeC5zdHlsZXMpXHJcbiAgICAgICAgICAgICAgc2tleXMucHVzaChrZXkpXHJcbiAgICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgICAvKiBhcHBseSBlYXNpbmcgKi9cclxuICAgICAgICAgIHBvcyA9IGVhc2UgPT0gJzw+JyA/XHJcbiAgICAgICAgICAgICgtTWF0aC5jb3MocG9zICogTWF0aC5QSSkgLyAyKSArIDAuNSA6XHJcbiAgICAgICAgICBlYXNlID09ICc+JyA/XHJcbiAgICAgICAgICAgIE1hdGguc2luKHBvcyAqIE1hdGguUEkgLyAyKSA6XHJcbiAgICAgICAgICBlYXNlID09ICc8JyA/XHJcbiAgICAgICAgICAgIC1NYXRoLmNvcyhwb3MgKiBNYXRoLlBJIC8gMikgKyAxIDpcclxuICAgICAgICAgIGVhc2UgPT0gJy0nID9cclxuICAgICAgICAgICAgcG9zIDpcclxuICAgICAgICAgIHR5cGVvZiBlYXNlID09ICdmdW5jdGlvbicgP1xyXG4gICAgICAgICAgICBlYXNlKHBvcykgOlxyXG4gICAgICAgICAgICBwb3NcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogcnVuIHBsb3QgZnVuY3Rpb24gKi9cclxuICAgICAgICAgIGlmIChmeC5fcGxvdCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnBsb3QoZnguX3Bsb3QuYXQocG9zKSlcclxuICBcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8qIHJ1biBhbGwgeC1wb3NpdGlvbiBwcm9wZXJ0aWVzICovXHJcbiAgICAgICAgICAgIGlmIChmeC5feClcclxuICAgICAgICAgICAgICBlbGVtZW50LngoZnguX3guYXQocG9zKSlcclxuICAgICAgICAgICAgZWxzZSBpZiAoZnguX2N4KVxyXG4gICAgICAgICAgICAgIGVsZW1lbnQuY3goZnguX2N4LmF0KHBvcykpXHJcbiAgXHJcbiAgICAgICAgICAgIC8qIHJ1biBhbGwgeS1wb3NpdGlvbiBwcm9wZXJ0aWVzICovXHJcbiAgICAgICAgICAgIGlmIChmeC5feSlcclxuICAgICAgICAgICAgICBlbGVtZW50LnkoZnguX3kuYXQocG9zKSlcclxuICAgICAgICAgICAgZWxzZSBpZiAoZnguX2N5KVxyXG4gICAgICAgICAgICAgIGVsZW1lbnQuY3koZnguX2N5LmF0KHBvcykpXHJcbiAgXHJcbiAgICAgICAgICAgIC8qIHJ1biBhbGwgc2l6ZSBwcm9wZXJ0aWVzICovXHJcbiAgICAgICAgICAgIGlmIChmeC5fc2l6ZSlcclxuICAgICAgICAgICAgICBlbGVtZW50LnNpemUoZnguX3NpemUud2lkdGguYXQocG9zKSwgZnguX3NpemUuaGVpZ2h0LmF0KHBvcykpXHJcbiAgICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgICAvKiBydW4gYWxsIHZpZXdib3ggcHJvcGVydGllcyAqL1xyXG4gICAgICAgICAgaWYgKGZ4Ll92aWV3Ym94KVxyXG4gICAgICAgICAgICBlbGVtZW50LnZpZXdib3goXHJcbiAgICAgICAgICAgICAgZnguX3ZpZXdib3gueC5hdChwb3MpXHJcbiAgICAgICAgICAgICwgZnguX3ZpZXdib3gueS5hdChwb3MpXHJcbiAgICAgICAgICAgICwgZnguX3ZpZXdib3gud2lkdGguYXQocG9zKVxyXG4gICAgICAgICAgICAsIGZ4Ll92aWV3Ym94LmhlaWdodC5hdChwb3MpXHJcbiAgICAgICAgICAgIClcclxuICBcclxuICAgICAgICAgIC8qIHJ1biBsZWFkaW5nIHByb3BlcnR5ICovXHJcbiAgICAgICAgICBpZiAoZnguX2xlYWRpbmcpXHJcbiAgICAgICAgICAgIGVsZW1lbnQubGVhZGluZyhmeC5fbGVhZGluZy5hdChwb3MpKVxyXG4gIFxyXG4gICAgICAgICAgLyogYW5pbWF0ZSBhdHRyaWJ1dGVzICovXHJcbiAgICAgICAgICBmb3IgKGkgPSBha2V5cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgICAgZWxlbWVudC5hdHRyKGFrZXlzW2ldLCBhdChmeC5hdHRyc1tha2V5c1tpXV0sIHBvcykpXHJcbiAgXHJcbiAgICAgICAgICAvKiBhbmltYXRlIHRyYW5zZm9ybWF0aW9ucyAqL1xyXG4gICAgICAgICAgZm9yIChpID0gdGtleXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgIGVsZW1lbnQudHJhbnNmb3JtKHRrZXlzW2ldLCBhdChmeC50cmFuc1t0a2V5c1tpXV0sIHBvcykpXHJcbiAgXHJcbiAgICAgICAgICAvKiBhbmltYXRlIHN0eWxlcyAqL1xyXG4gICAgICAgICAgZm9yIChpID0gc2tleXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUoc2tleXNbaV0sIGF0KGZ4LnN0eWxlc1tza2V5c1tpXV0sIHBvcykpXHJcbiAgXHJcbiAgICAgICAgICAvKiBjYWxsYmFjayBmb3IgZWFjaCBrZXlmcmFtZSAqL1xyXG4gICAgICAgICAgaWYgKGZ4Ll9kdXJpbmcpXHJcbiAgICAgICAgICAgIGZ4Ll9kdXJpbmcuY2FsbChlbGVtZW50LCBwb3MsIGZ1bmN0aW9uKGZyb20sIHRvKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGF0KHsgZnJvbTogZnJvbSwgdG86IHRvIH0sIHBvcylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgLyogZGVsYXkgYW5pbWF0aW9uICovXHJcbiAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gIFxyXG4gICAgICAgICAgICAvKiBpbml0aWFsaXplIHNpdHVhdGlvbiBvYmplY3QgKi9cclxuICAgICAgICAgICAgZnguc2l0dWF0aW9uID0ge1xyXG4gICAgICAgICAgICAgIGludGVydmFsOiAxMDAwIC8gNjBcclxuICAgICAgICAgICAgLCBzdGFydDogICAgc3RhcnRcclxuICAgICAgICAgICAgLCBwbGF5OiAgICAgdHJ1ZVxyXG4gICAgICAgICAgICAsIGZpbmlzaDogICBzdGFydCArIGRcclxuICAgICAgICAgICAgLCBkdXJhdGlvbjogZFxyXG4gICAgICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgICAgIC8qIHJlbmRlciBmdW5jdGlvbiAqL1xyXG4gICAgICAgICAgICBmeC5yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBpZiAoZnguc2l0dWF0aW9uLnBsYXkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgY29kZSB3YXMgYm9ycm93ZWQgZnJvbSB0aGUgZW1pbGUuanMgbWljcm8gZnJhbWV3b3JrIGJ5IFRob21hcyBGdWNocywgYWthIE1hZFJvYmJ5LlxyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAgICAgICAgICAgICAsIHBvcyA9IHRpbWUgPiBmeC5zaXR1YXRpb24uZmluaXNoID8gMSA6ICh0aW1lIC0gZnguc2l0dWF0aW9uLnN0YXJ0KSAvIGRcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLyogcHJvY2VzcyB2YWx1ZXMgKi9cclxuICAgICAgICAgICAgICAgIGZ4LnRvKHBvcylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLyogZmluaXNoIG9mZiBhbmltYXRpb24gKi9cclxuICAgICAgICAgICAgICAgIGlmICh0aW1lID4gZnguc2l0dWF0aW9uLmZpbmlzaCkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoZnguX3Bsb3QpXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wbG90KG5ldyBTVkcuUG9pbnRBcnJheShmeC5fcGxvdC5kZXN0aW5hdGlvbikuc2V0dGxlKCkpXHJcbiAgXHJcbiAgICAgICAgICAgICAgICAgIGlmIChmeC5fbG9vcCA9PT0gdHJ1ZSB8fCAodHlwZW9mIGZ4Ll9sb29wID09ICdudW1iZXInICYmIGZ4Ll9sb29wID4gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZ4Ll9sb29wID09ICdudW1iZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgLS1meC5fbG9vcFxyXG4gICAgICAgICAgICAgICAgICAgIGZ4LmFuaW1hdGUoZCwgZWFzZSwgZGVsYXkpXHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnguX2FmdGVyID8gZnguX2FmdGVyLmFwcGx5KGVsZW1lbnQsIFtmeF0pIDogZnguc3RvcCgpXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGZ4LmFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ4LnJlbmRlcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnguYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZngucmVuZGVyKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgICAvKiBzdGFydCBhbmltYXRpb24gKi9cclxuICAgICAgICAgICAgZngucmVuZGVyKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9LCBuZXcgU1ZHLk51bWJlcihkZWxheSkudmFsdWVPZigpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEdldCBib3VuZGluZyBib3ggb2YgdGFyZ2V0IGVsZW1lbnRcclxuICAgICwgYmJveDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmJib3goKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhbmltYXRhYmxlIGF0dHJpYnV0ZXNcclxuICAgICwgYXR0cjogZnVuY3Rpb24oYSwgdikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIGEpXHJcbiAgICAgICAgICAgIHRoaXMuYXR0cihrZXksIGFba2V5XSlcclxuICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIGZyb20gPSB0aGlzLnRhcmdldC5hdHRyKGEpXHJcbiAgXHJcbiAgICAgICAgICB0aGlzLmF0dHJzW2FdID0gU1ZHLkNvbG9yLmlzQ29sb3IoZnJvbSkgP1xyXG4gICAgICAgICAgICBuZXcgU1ZHLkNvbG9yKGZyb20pLm1vcnBoKHYpIDpcclxuICAgICAgICAgIFNWRy5yZWdleC51bml0LnRlc3QoZnJvbSkgP1xyXG4gICAgICAgICAgICBuZXcgU1ZHLk51bWJlcihmcm9tKS5tb3JwaCh2KSA6XHJcbiAgICAgICAgICAgIHsgZnJvbTogZnJvbSwgdG86IHYgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhbmltYXRhYmxlIHRyYW5zZm9ybWF0aW9uc1xyXG4gICAgLCB0cmFuc2Zvcm06IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAvKiBwYXJzZSBtYXRyaXggc3RyaW5nICovXHJcbiAgICAgICAgICBvID0gcGFyc2VNYXRyaXgobylcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogZGxldGUgbWF0cml4c3RyaW5nIGZyb20gb2JqZWN0ICovXHJcbiAgICAgICAgICBkZWxldGUgby5tYXRyaXhcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogYWRkIHJvdGF0aW9uLWNlbnRlciB0byB0cmFuc2Zvcm1hdGlvbnMgKi9cclxuICAgICAgICAgIHRoaXMudGFyZ2V0LnRyYW5zLmN4ID0gby5jeCB8fCBudWxsXHJcbiAgICAgICAgICB0aGlzLnRhcmdldC50cmFucy5jeSA9IG8uY3kgfHwgbnVsbFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBkZWxldGUgby5jeFxyXG4gICAgICAgICAgZGVsZXRlIG8uY3lcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogc3RvcmUgbWF0cml4IHZhbHVlcyAqL1xyXG4gICAgICAgICAgZm9yICh2IGluIG8pXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNbdl0gPSB7IGZyb206IHRoaXMudGFyZ2V0LnRyYW5zW3ZdLCB0bzogb1t2XSB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLyogYXBwbHkgdHJhbnNmb3JtYXRpb25zIGFzIG9iamVjdCBpZiBrZXkgdmFsdWUgYXJndW1lbnRzIGFyZSBnaXZlbiovXHJcbiAgICAgICAgICB2YXIgdHJhbnNmb3JtID0ge31cclxuICAgICAgICAgIHRyYW5zZm9ybVtvXSA9IHZcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgdGhpcy50cmFuc2Zvcm0odHJhbnNmb3JtKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhbmltYXRhYmxlIHN0eWxlc1xyXG4gICAgLCBzdHlsZTogZnVuY3Rpb24ocywgdikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcyA9PSAnb2JqZWN0JylcclxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzKVxyXG4gICAgICAgICAgICB0aGlzLnN0eWxlKGtleSwgc1trZXldKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHRoaXMuc3R5bGVzW3NdID0geyBmcm9tOiB0aGlzLnRhcmdldC5zdHlsZShzKSwgdG86IHYgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gQW5pbWF0YWJsZSB4LWF4aXNcclxuICAgICwgeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHRoaXMuX3ggPSBuZXcgU1ZHLk51bWJlcih0aGlzLnRhcmdldC54KCkpLm1vcnBoKHgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBbmltYXRhYmxlIHktYXhpc1xyXG4gICAgLCB5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgdGhpcy5feSA9IG5ldyBTVkcuTnVtYmVyKHRoaXMudGFyZ2V0LnkoKSkubW9ycGgoeSlcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFuaW1hdGFibGUgY2VudGVyIHgtYXhpc1xyXG4gICAgLCBjeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHRoaXMuX2N4ID0gbmV3IFNWRy5OdW1iZXIodGhpcy50YXJnZXQuY3goKSkubW9ycGgoeClcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFuaW1hdGFibGUgY2VudGVyIHktYXhpc1xyXG4gICAgLCBjeTogZnVuY3Rpb24oeSkge1xyXG4gICAgICAgIHRoaXMuX2N5ID0gbmV3IFNWRy5OdW1iZXIodGhpcy50YXJnZXQuY3koKSkubW9ycGgoeSlcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhbmltYXRhYmxlIG1vdmVcclxuICAgICwgbW92ZTogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLngoeCkueSh5KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhbmltYXRhYmxlIGNlbnRlclxyXG4gICAgLCBjZW50ZXI6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jeCh4KS5jeSh5KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhbmltYXRhYmxlIHNpemVcclxuICAgICwgc2l6ZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCBpbnN0YW5jZW9mIFNWRy5UZXh0KSB7XHJcbiAgICAgICAgICAvKiBhbmltYXRlIGZvbnQgc2l6ZSBmb3IgVGV4dCBlbGVtZW50cyAqL1xyXG4gICAgICAgICAgdGhpcy5hdHRyKCdmb250LXNpemUnLCB3aWR0aClcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvKiBhbmltYXRlIGJib3ggYmFzZWQgc2l6ZSBmb3IgYWxsIG90aGVyIGVsZW1lbnRzICovXHJcbiAgICAgICAgICB2YXIgYm94ID0gdGhpcy50YXJnZXQuYmJveCgpXHJcbiAgXHJcbiAgICAgICAgICB0aGlzLl9zaXplID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogIG5ldyBTVkcuTnVtYmVyKGJveC53aWR0aCkubW9ycGgod2lkdGgpXHJcbiAgICAgICAgICAsIGhlaWdodDogbmV3IFNWRy5OdW1iZXIoYm94LmhlaWdodCkubW9ycGgoaGVpZ2h0KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhbmltYXRhYmxlIHBsb3RcclxuICAgICwgcGxvdDogZnVuY3Rpb24ocCkge1xyXG4gICAgICAgIHRoaXMuX3Bsb3QgPSBwXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgbGVhZGluZyBtZXRob2RcclxuICAgICwgbGVhZGluZzogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQuX2xlYWRpbmcpXHJcbiAgICAgICAgICB0aGlzLl9sZWFkaW5nID0gbmV3IFNWRy5OdW1iZXIodGhpcy50YXJnZXQuX2xlYWRpbmcpLm1vcnBoKHZhbHVlKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIGFuaW1hdGFibGUgdmlld2JveFxyXG4gICAgLCB2aWV3Ym94OiBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgU1ZHLkNvbnRhaW5lcikge1xyXG4gICAgICAgICAgdmFyIGJveCA9IHRoaXMudGFyZ2V0LnZpZXdib3goKVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLl92aWV3Ym94ID0ge1xyXG4gICAgICAgICAgICB4OiAgICAgIG5ldyBTVkcuTnVtYmVyKGJveC54KS5tb3JwaCh4KVxyXG4gICAgICAgICAgLCB5OiAgICAgIG5ldyBTVkcuTnVtYmVyKGJveC55KS5tb3JwaCh5KVxyXG4gICAgICAgICAgLCB3aWR0aDogIG5ldyBTVkcuTnVtYmVyKGJveC53aWR0aCkubW9ycGgod2lkdGgpXHJcbiAgICAgICAgICAsIGhlaWdodDogbmV3IFNWRy5OdW1iZXIoYm94LmhlaWdodCkubW9ycGgoaGVpZ2h0KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhbmltYXRlYWJsZSBncmFkaWVudCB1cGRhdGVcclxuICAgICwgdXBkYXRlOiBmdW5jdGlvbihvKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgU1ZHLlN0b3ApIHtcclxuICAgICAgICAgIGlmIChvLm9wYWNpdHkgIT0gbnVsbCkgdGhpcy5hdHRyKCdzdG9wLW9wYWNpdHknLCBvLm9wYWNpdHkpXHJcbiAgICAgICAgICBpZiAoby5jb2xvciAgICE9IG51bGwpIHRoaXMuYXR0cignc3RvcC1jb2xvcicsIG8uY29sb3IpXHJcbiAgICAgICAgICBpZiAoby5vZmZzZXQgICE9IG51bGwpIHRoaXMuYXR0cignb2Zmc2V0JywgbmV3IFNWRy5OdW1iZXIoby5vZmZzZXQpKVxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBjYWxsYmFjayBmb3IgZWFjaCBrZXlmcmFtZVxyXG4gICAgLCBkdXJpbmc6IGZ1bmN0aW9uKGR1cmluZykge1xyXG4gICAgICAgIHRoaXMuX2R1cmluZyA9IGR1cmluZ1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gQ2FsbGJhY2sgYWZ0ZXIgYW5pbWF0aW9uXHJcbiAgICAsIGFmdGVyOiBmdW5jdGlvbihhZnRlcikge1xyXG4gICAgICAgIHRoaXMuX2FmdGVyID0gYWZ0ZXJcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIE1ha2UgbG9vcGFibGVcclxuICAgICwgbG9vcDogZnVuY3Rpb24odGltZXMpIHtcclxuICAgICAgICB0aGlzLl9sb29wID0gdGltZXMgfHwgdHJ1ZVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gU3RvcCBydW5uaW5nIGFuaW1hdGlvblxyXG4gICAgLCBzdG9wOiBmdW5jdGlvbihmdWxmaWxsKSB7XHJcbiAgICAgICAgLyogZnVsZmlsbCBhbmltYXRpb24gKi9cclxuICAgICAgICBpZiAoZnVsZmlsbCA9PT0gdHJ1ZSkge1xyXG4gIFxyXG4gICAgICAgICAgdGhpcy5hbmltYXRlKDApXHJcbiAgXHJcbiAgICAgICAgICBpZiAodGhpcy5fYWZ0ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX2FmdGVyLmFwcGx5KHRoaXMudGFyZ2V0LCBbdGhpc10pXHJcbiAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8qIHN0b3AgY3VycmVudCBhbmltYXRpb24gKi9cclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpXHJcbiAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbkZyYW1lKTtcclxuICBcclxuICAgICAgICAgIC8qIHJlc2V0IHN0b3JhZ2UgZm9yIHByb3BlcnRpZXMgdGhhdCBuZWVkIGFuaW1hdGlvbiAqL1xyXG4gICAgICAgICAgdGhpcy5hdHRycyAgICAgPSB7fVxyXG4gICAgICAgICAgdGhpcy50cmFucyAgICAgPSB7fVxyXG4gICAgICAgICAgdGhpcy5zdHlsZXMgICAgPSB7fVxyXG4gICAgICAgICAgdGhpcy5zaXR1YXRpb24gPSB7fVxyXG4gIFxyXG4gICAgICAgICAgLyogZGVsZXRlIGRlc3RpbmF0aW9ucyAqL1xyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX3hcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl95XHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5fY3hcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jeVxyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX3NpemVcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wbG90XHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5fbG9vcFxyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2FmdGVyXHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5fZHVyaW5nXHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5fbGVhZGluZ1xyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX3ZpZXdib3hcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBQYXVzZSBydW5uaW5nIGFuaW1hdGlvblxyXG4gICAgLCBwYXVzZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2l0dWF0aW9uLnBsYXkgPT09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuc2l0dWF0aW9uLnBsYXkgID0gZmFsc2VcclxuICAgICAgICAgIHRoaXMuc2l0dWF0aW9uLnBhdXNlID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBQbGF5IHJ1bm5pbmcgYW5pbWF0aW9uXHJcbiAgICAsIHBsYXk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNpdHVhdGlvbi5wbGF5ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgdmFyIHBhdXNlID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnNpdHVhdGlvbi5wYXVzZVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLnNpdHVhdGlvbi5maW5pc2ggKz0gcGF1c2VcclxuICAgICAgICAgIHRoaXMuc2l0dWF0aW9uLnN0YXJ0ICArPSBwYXVzZVxyXG4gICAgICAgICAgdGhpcy5zaXR1YXRpb24ucGxheSAgICA9IHRydWVcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuICBcclxuICAgIC8vIERlZmluZSBwYXJlbnQgY2xhc3NcclxuICAsIHBhcmVudDogU1ZHLkVsZW1lbnRcclxuICBcclxuICAgIC8vIEFkZCBtZXRob2QgdG8gcGFyZW50IGVsZW1lbnRzXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gR2V0IGZ4IG1vZHVsZSBvciBjcmVhdGUgYSBuZXcgb25lLCB0aGVuIGFuaW1hdGUgd2l0aCBnaXZlbiBkdXJhdGlvbiBhbmQgZWFzZVxyXG4gICAgICBhbmltYXRlOiBmdW5jdGlvbihkLCBlYXNlLCBkZWxheSkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5meCB8fCAodGhpcy5meCA9IG5ldyBTVkcuRlgodGhpcykpKS5zdG9wKCkuYW5pbWF0ZShkLCBlYXNlLCBkZWxheSlcclxuICAgICAgfVxyXG4gICAgICAvLyBTdG9wIGN1cnJlbnQgYW5pbWF0aW9uOyB0aGlzIGlzIGFuIGFsaWFzIHRvIHRoZSBmeCBpbnN0YW5jZVxyXG4gICAgLCBzdG9wOiBmdW5jdGlvbihmdWxmaWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZngpXHJcbiAgICAgICAgICB0aGlzLmZ4LnN0b3AoZnVsZmlsbClcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFBhdXNlIGN1cnJlbnQgYW5pbWF0aW9uXHJcbiAgICAsIHBhdXNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5meClcclxuICAgICAgICAgIHRoaXMuZngucGF1c2UoKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gUGxheSBwYXVzZWQgY3VycmVudCBhbmltYXRpb25cclxuICAgICwgcGxheTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZngpXHJcbiAgICAgICAgICB0aGlzLmZ4LnBsYXkoKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcblxyXG4gIFNWRy5leHRlbmQoU1ZHLkVsZW1lbnQsIFNWRy5GWCwge1xyXG4gICAgLy8gUmVsYXRpdmUgbW92ZSBvdmVyIHggYXhpc1xyXG4gICAgZHg6IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMueCgodGhpcy50YXJnZXQgfHwgdGhpcykueCgpICsgeClcclxuICAgIH1cclxuICAgIC8vIFJlbGF0aXZlIG1vdmUgb3ZlciB5IGF4aXNcclxuICAsIGR5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnkoKHRoaXMudGFyZ2V0IHx8IHRoaXMpLnkoKSArIHkpXHJcbiAgICB9XHJcbiAgICAvLyBSZWxhdGl2ZSBtb3ZlIG92ZXIgeCBhbmQgeSBheGVzXHJcbiAgLCBkbW92ZTogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5keCh4KS5keSh5KVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIDtbICAnY2xpY2snXHJcbiAgICAsICdkYmxjbGljaydcclxuICAgICwgJ21vdXNlZG93bidcclxuICAgICwgJ21vdXNldXAnXHJcbiAgICAsICdtb3VzZW92ZXInXHJcbiAgICAsICdtb3VzZW91dCdcclxuICAgICwgJ21vdXNlbW92ZSdcclxuICAgIC8vICwgJ21vdXNlZW50ZXInIC0+IG5vdCBzdXBwb3J0ZWQgYnkgSUVcclxuICAgIC8vICwgJ21vdXNlbGVhdmUnIC0+IG5vdCBzdXBwb3J0ZWQgYnkgSUVcclxuICAgICwgJ3RvdWNoc3RhcnQnXHJcbiAgICAsICd0b3VjaG1vdmUnXHJcbiAgICAsICd0b3VjaGxlYXZlJ1xyXG4gICAgLCAndG91Y2hlbmQnXHJcbiAgICAsICd0b3VjaGNhbmNlbCcgXS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBcclxuICAgIC8qIGFkZCBldmVudCB0byBTVkcuRWxlbWVudCAqL1xyXG4gICAgU1ZHLkVsZW1lbnQucHJvdG90eXBlW2V2ZW50XSA9IGZ1bmN0aW9uKGYpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIFxyXG4gICAgICAvKiBiaW5kIGV2ZW50IHRvIGVsZW1lbnQgcmF0aGVyIHRoYW4gZWxlbWVudCBub2RlICovXHJcbiAgICAgIHRoaXMubm9kZVsnb24nICsgZXZlbnRdID0gdHlwZW9mIGYgPT0gJ2Z1bmN0aW9uJyA/XHJcbiAgICAgICAgZnVuY3Rpb24oKSB7IHJldHVybiBmLmFwcGx5KHNlbGYsIGFyZ3VtZW50cykgfSA6IG51bGxcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG4gIFxyXG4gIC8vIEluaXRpYWxpemUgbGlzdGVuZXJzIHN0YWNrXHJcbiAgU1ZHLmxpc3RlbmVycyA9IFtdXHJcbiAgU1ZHLmhhbmRsZXJNYXAgPSBbXVxyXG4gIFxyXG4gIC8vIE9ubHkga2VwdCBmb3IgY29uc2lzdGVuY3kgb2YgQVBJXHJcbiAgU1ZHLnJlZ2lzdGVyRXZlbnQgPSBmdW5jdGlvbigpe307XHJcbiAgXHJcbiAgLy8gQWRkIGV2ZW50IGJpbmRlciBpbiB0aGUgU1ZHIG5hbWVzcGFjZVxyXG4gIFNWRy5vbiA9IGZ1bmN0aW9uKG5vZGUsIGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgLy8gY3JlYXRlIGxpc3RlbmVyLCBnZXQgb2JqZWN0LWluZGV4XHJcbiAgICB2YXIgbCAgICAgPSBsaXN0ZW5lci5iaW5kKG5vZGUuaW5zdGFuY2UgfHwgbm9kZSlcclxuICAgICAgLCBpbmRleCA9IChTVkcuaGFuZGxlck1hcC5pbmRleE9mKG5vZGUpICsgMSB8fCBTVkcuaGFuZGxlck1hcC5wdXNoKG5vZGUpKSAtIDFcclxuICAgICAgLCBldiAgICA9IGV2ZW50LnNwbGl0KCcuJylbMF1cclxuICAgICAgLCBucyAgICA9IGV2ZW50LnNwbGl0KCcuJylbMV0gfHwgJyonXHJcbiAgICAgIFxyXG4gICAgXHJcbiAgICAvLyBlbnN1cmUgdmFsaWQgb2JqZWN0XHJcbiAgICBTVkcubGlzdGVuZXJzW2luZGV4XSAgICAgICAgID0gU1ZHLmxpc3RlbmVyc1tpbmRleF0gICAgICAgICB8fCB7fVxyXG4gICAgU1ZHLmxpc3RlbmVyc1tpbmRleF1bZXZdICAgICA9IFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XSAgICAgfHwge31cclxuICAgIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XVtuc10gPSBTVkcubGlzdGVuZXJzW2luZGV4XVtldl1bbnNdIHx8IHt9XHJcbiAgXHJcbiAgICAvLyByZWZlcmVuY2UgbGlzdGVuZXJcclxuICAgIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XVtuc11bbGlzdGVuZXJdID0gbFxyXG4gIFxyXG4gICAgLy8gYWRkIGxpc3RlbmVyXHJcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGwsIGZhbHNlKVxyXG4gIH1cclxuICBcclxuICAvLyBBZGQgZXZlbnQgdW5iaW5kZXIgaW4gdGhlIFNWRyBuYW1lc3BhY2VcclxuICBTVkcub2ZmID0gZnVuY3Rpb24obm9kZSwgZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICB2YXIgaW5kZXggPSBTVkcuaGFuZGxlck1hcC5pbmRleE9mKG5vZGUpXHJcbiAgICAgICwgZXYgICAgPSBldmVudCAmJiBldmVudC5zcGxpdCgnLicpWzBdXHJcbiAgICAgICwgbnMgICAgPSBldmVudCAmJiBldmVudC5zcGxpdCgnLicpWzFdXHJcbiAgXHJcbiAgICBpZihpbmRleCA9PSAtMSkgcmV0dXJuXHJcbiAgICBcclxuICAgIGlmIChsaXN0ZW5lcikge1xyXG4gICAgICAvLyByZW1vdmUgbGlzdGVuZXIgcmVmZXJlbmNlXHJcbiAgICAgIGlmIChTVkcubGlzdGVuZXJzW2luZGV4XVtldl0gJiYgU1ZHLmxpc3RlbmVyc1tpbmRleF1bZXZdW25zIHx8ICcqJ10pIHtcclxuICAgICAgICAvLyByZW1vdmUgbGlzdGVuZXJcclxuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXYsIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XVtucyB8fCAnKiddW2xpc3RlbmVyXSwgZmFsc2UpXHJcbiAgXHJcbiAgICAgICAgZGVsZXRlIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XVtucyB8fCAnKiddW2xpc3RlbmVyXVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICB9IGVsc2UgaWYgKG5zKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0aGUgbmFtZXNwYWNlZCBldmVudFxyXG4gICAgICBpZiAoU1ZHLmxpc3RlbmVyc1tpbmRleF1bZXZdICYmIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XVtuc10pIHtcclxuICAgICAgICBmb3IgKGxpc3RlbmVyIGluIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XVtuc10pXHJcbiAgICAgICAgICBTVkcub2ZmKG5vZGUsIFtldiwgbnNdLmpvaW4oJy4nKSwgbGlzdGVuZXIpXHJcbiAgXHJcbiAgICAgICAgZGVsZXRlIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XVtuc11cclxuICAgICAgfVxyXG4gIFxyXG4gICAgfSBlbHNlIGlmIChldikge1xyXG4gICAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50XHJcbiAgICAgIGlmIChTVkcubGlzdGVuZXJzW2luZGV4XVtldl0pIHtcclxuICAgICAgICBmb3IgKG5hbWVzcGFjZSBpbiBTVkcubGlzdGVuZXJzW2luZGV4XVtldl0pXHJcbiAgICAgICAgICBTVkcub2ZmKG5vZGUsIFtldiwgbmFtZXNwYWNlXS5qb2luKCcuJykpXHJcbiAgXHJcbiAgICAgICAgZGVsZXRlIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBvbiBhIGdpdmVuIG5vZGVcclxuICAgICAgZm9yIChldmVudCBpbiBTVkcubGlzdGVuZXJzW2luZGV4XSlcclxuICAgICAgICBTVkcub2ZmKG5vZGUsIGV2ZW50KVxyXG4gIFxyXG4gICAgICBkZWxldGUgU1ZHLmxpc3RlbmVyc1tpbmRleF1cclxuICBcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLy9cclxuICBTVkcuZXh0ZW5kKFNWRy5FbGVtZW50LCB7XHJcbiAgICAvLyBCaW5kIGdpdmVuIGV2ZW50IHRvIGxpc3RlbmVyXHJcbiAgICBvbjogZnVuY3Rpb24oZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgIFNWRy5vbih0aGlzLm5vZGUsIGV2ZW50LCBsaXN0ZW5lcilcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBVbmJpbmQgZXZlbnQgZnJvbSBsaXN0ZW5lclxyXG4gICwgb2ZmOiBmdW5jdGlvbihldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgU1ZHLm9mZih0aGlzLm5vZGUsIGV2ZW50LCBsaXN0ZW5lcilcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBGaXJlIGdpdmVuIGV2ZW50XHJcbiAgLCBmaXJlOiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xyXG4gICAgICBcclxuICAgICAgLy8gRGlzcGF0Y2ggZXZlbnRcclxuICAgICAgdGhpcy5ub2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7ZGV0YWlsOmRhdGF9KSlcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICB9KVxyXG5cclxuICBTVkcuRGVmcyA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdkZWZzJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuQ29udGFpbmVyXHJcbiAgICBcclxuICB9KVxyXG5cclxuICBTVkcuRyA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdnJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuQ29udGFpbmVyXHJcbiAgICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gTW92ZSBvdmVyIHgtYXhpc1xyXG4gICAgICB4OiBmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMudHJhbnMueCA6IHRoaXMudHJhbnNmb3JtKCd4JywgeClcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIG92ZXIgeS1heGlzXHJcbiAgICAsIHk6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgICByZXR1cm4geSA9PSBudWxsID8gdGhpcy50cmFucy55IDogdGhpcy50cmFuc2Zvcm0oJ3knLCB5KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeC1heGlzXHJcbiAgICAsIGN4OiBmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMuYmJveCgpLmN4IDogdGhpcy54KHggLSB0aGlzLmJib3goKS53aWR0aCAvIDIpXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBieSBjZW50ZXIgb3ZlciB5LWF4aXNcclxuICAgICwgY3k6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgICByZXR1cm4geSA9PSBudWxsID8gdGhpcy5iYm94KCkuY3kgOiB0aGlzLnkoeSAtIHRoaXMuYmJveCgpLmhlaWdodCAvIDIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgYSBncm91cCBlbGVtZW50XHJcbiAgICAgIGdyb3VwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFNWRy5HKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgU1ZHLmV4dGVuZChTVkcuRWxlbWVudCwge1xyXG4gICAgLy8gR2V0IGFsbCBzaWJsaW5ncywgaW5jbHVkaW5nIG15c2VsZlxyXG4gICAgc2libGluZ3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQuY2hpbGRyZW4oKVxyXG4gICAgfVxyXG4gICAgLy8gR2V0IHRoZSBjdXJlbnQgcG9zaXRpb24gc2libGluZ3NcclxuICAsIHBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmluZGV4KHRoaXMpXHJcbiAgICB9XHJcbiAgICAvLyBHZXQgdGhlIG5leHQgZWxlbWVudCAod2lsbCByZXR1cm4gbnVsbCBpZiB0aGVyZSBpcyBub25lKVxyXG4gICwgbmV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNpYmxpbmdzKClbdGhpcy5wb3NpdGlvbigpICsgMV1cclxuICAgIH1cclxuICAgIC8vIEdldCB0aGUgbmV4dCBlbGVtZW50ICh3aWxsIHJldHVybiBudWxsIGlmIHRoZXJlIGlzIG5vbmUpXHJcbiAgLCBwcmV2aW91czogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNpYmxpbmdzKClbdGhpcy5wb3NpdGlvbigpIC0gMV1cclxuICAgIH1cclxuICAgIC8vIFNlbmQgZ2l2ZW4gZWxlbWVudCBvbmUgc3RlcCBmb3J3YXJkXHJcbiAgLCBmb3J3YXJkOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGkgPSB0aGlzLnBvc2l0aW9uKClcclxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LnJlbW92ZUVsZW1lbnQodGhpcykucHV0KHRoaXMsIGkgKyAxKVxyXG4gICAgfVxyXG4gICAgLy8gU2VuZCBnaXZlbiBlbGVtZW50IG9uZSBzdGVwIGJhY2t3YXJkXHJcbiAgLCBiYWNrd2FyZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBpID0gdGhpcy5wb3NpdGlvbigpXHJcbiAgICAgIFxyXG4gICAgICBpZiAoaSA+IDApXHJcbiAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlRWxlbWVudCh0aGlzKS5hZGQodGhpcywgaSAtIDEpXHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBTZW5kIGdpdmVuIGVsZW1lbnQgYWxsIHRoZSB3YXkgdG8gdGhlIGZyb250XHJcbiAgLCBmcm9udDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudC5yZW1vdmVFbGVtZW50KHRoaXMpLnB1dCh0aGlzKVxyXG4gICAgfVxyXG4gICAgLy8gU2VuZCBnaXZlbiBlbGVtZW50IGFsbCB0aGUgd2F5IHRvIHRoZSBiYWNrXHJcbiAgLCBiYWNrOiBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHRoaXMucG9zaXRpb24oKSA+IDApXHJcbiAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlRWxlbWVudCh0aGlzKS5hZGQodGhpcywgMClcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBJbnNlcnRzIGEgZ2l2ZW4gZWxlbWVudCBiZWZvcmUgdGhlIHRhcmdldGVkIGVsZW1lbnRcclxuICAsIGJlZm9yZTogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZSgpXHJcbiAgXHJcbiAgICAgIHZhciBpID0gdGhpcy5wb3NpdGlvbigpXHJcbiAgICAgIFxyXG4gICAgICB0aGlzLnBhcmVudC5hZGQoZWxlbWVudCwgaSlcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIEluc3RlcnMgYSBnaXZlbiBlbGVtZW50IGFmdGVyIHRoZSB0YXJnZXRlZCBlbGVtZW50XHJcbiAgLCBhZnRlcjogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZSgpXHJcbiAgICAgIFxyXG4gICAgICB2YXIgaSA9IHRoaXMucG9zaXRpb24oKVxyXG4gICAgICBcclxuICAgICAgdGhpcy5wYXJlbnQuYWRkKGVsZW1lbnQsIGkgKyAxKVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5NYXNrID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBTVkcuY3JlYXRlKCdtYXNrJykpXHJcbiAgXHJcbiAgICAgIC8qIGtlZXAgcmVmZXJlbmNlcyB0byBtYXNrZWQgZWxlbWVudHMgKi9cclxuICAgICAgdGhpcy50YXJnZXRzID0gW11cclxuICAgIH1cclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkNvbnRhaW5lclxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBVbm1hc2sgYWxsIG1hc2tlZCBlbGVtZW50cyBhbmQgcmVtb3ZlIGl0c2VsZlxyXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8qIHVubWFzayBhbGwgdGFyZ2V0cyAqL1xyXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRhcmdldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICBpZiAodGhpcy50YXJnZXRzW2ldKVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldHNbaV0udW5tYXNrKClcclxuICAgICAgICBkZWxldGUgdGhpcy50YXJnZXRzXHJcbiAgXHJcbiAgICAgICAgLyogcmVtb3ZlIG1hc2sgZnJvbSBwYXJlbnQgKi9cclxuICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmVFbGVtZW50KHRoaXMpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBBZGQgcGFyZW50IG1ldGhvZFxyXG4gICwgY29uc3RydWN0OiB7XHJcbiAgICAgIC8vIENyZWF0ZSBtYXNraW5nIGVsZW1lbnRcclxuICAgICAgbWFzazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLnB1dChuZXcgU1ZHLk1hc2spXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG4gIFxyXG4gIFxyXG4gIFNWRy5leHRlbmQoU1ZHLkVsZW1lbnQsIHtcclxuICAgIC8vIERpc3RyaWJ1dGUgbWFzayB0byBzdmcgZWxlbWVudFxyXG4gICAgbWFza1dpdGg6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgLyogdXNlIGdpdmVuIG1hc2sgb3IgY3JlYXRlIGEgbmV3IG9uZSAqL1xyXG4gICAgICB0aGlzLm1hc2tlciA9IGVsZW1lbnQgaW5zdGFuY2VvZiBTVkcuTWFzayA/IGVsZW1lbnQgOiB0aGlzLnBhcmVudC5tYXNrKCkuYWRkKGVsZW1lbnQpXHJcbiAgXHJcbiAgICAgIC8qIHN0b3JlIHJldmVyZW5jZSBvbiBzZWxmIGluIG1hc2sgKi9cclxuICAgICAgdGhpcy5tYXNrZXIudGFyZ2V0cy5wdXNoKHRoaXMpXHJcbiAgICAgIFxyXG4gICAgICAvKiBhcHBseSBtYXNrICovXHJcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoJ21hc2snLCAndXJsKFwiIycgKyB0aGlzLm1hc2tlci5hdHRyKCdpZCcpICsgJ1wiKScpXHJcbiAgICB9XHJcbiAgICAvLyBVbm1hc2sgZWxlbWVudFxyXG4gICwgdW5tYXNrOiBmdW5jdGlvbigpIHtcclxuICAgICAgZGVsZXRlIHRoaXMubWFza2VyXHJcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoJ21hc2snLCBudWxsKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuXHJcblxyXG4gIFNWRy5DbGlwID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBTVkcuY3JlYXRlKCdjbGlwUGF0aCcpKVxyXG4gIFxyXG4gICAgICAvKiBrZWVwIHJlZmVyZW5jZXMgdG8gY2xpcHBlZCBlbGVtZW50cyAqL1xyXG4gICAgICB0aGlzLnRhcmdldHMgPSBbXVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuQ29udGFpbmVyXHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIFVuY2xpcCBhbGwgY2xpcHBlZCBlbGVtZW50cyBhbmQgcmVtb3ZlIGl0c2VsZlxyXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8qIHVuY2xpcCBhbGwgdGFyZ2V0cyAqL1xyXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRhcmdldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICBpZiAodGhpcy50YXJnZXRzW2ldKVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldHNbaV0udW5jbGlwKClcclxuICAgICAgICBkZWxldGUgdGhpcy50YXJnZXRzXHJcbiAgXHJcbiAgICAgICAgLyogcmVtb3ZlIGNsaXBQYXRoIGZyb20gcGFyZW50ICovXHJcbiAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlRWxlbWVudCh0aGlzKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgY2xpcHBpbmcgZWxlbWVudFxyXG4gICAgICBjbGlwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWZzKCkucHV0KG5ldyBTVkcuQ2xpcClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgXHJcbiAgLy9cclxuICBTVkcuZXh0ZW5kKFNWRy5FbGVtZW50LCB7XHJcbiAgICAvLyBEaXN0cmlidXRlIGNsaXBQYXRoIHRvIHN2ZyBlbGVtZW50XHJcbiAgICBjbGlwV2l0aDogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAvKiB1c2UgZ2l2ZW4gY2xpcCBvciBjcmVhdGUgYSBuZXcgb25lICovXHJcbiAgICAgIHRoaXMuY2xpcHBlciA9IGVsZW1lbnQgaW5zdGFuY2VvZiBTVkcuQ2xpcCA/IGVsZW1lbnQgOiB0aGlzLnBhcmVudC5jbGlwKCkuYWRkKGVsZW1lbnQpXHJcbiAgXHJcbiAgICAgIC8qIHN0b3JlIHJldmVyZW5jZSBvbiBzZWxmIGluIG1hc2sgKi9cclxuICAgICAgdGhpcy5jbGlwcGVyLnRhcmdldHMucHVzaCh0aGlzKVxyXG4gICAgICBcclxuICAgICAgLyogYXBwbHkgbWFzayAqL1xyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKFwiIycgKyB0aGlzLmNsaXBwZXIuYXR0cignaWQnKSArICdcIiknKVxyXG4gICAgfVxyXG4gICAgLy8gVW5jbGlwIGVsZW1lbnRcclxuICAsIHVuY2xpcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLmNsaXBwZXJcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cignY2xpcC1wYXRoJywgbnVsbClcclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5HcmFkaWVudCA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIFNWRy5jcmVhdGUodHlwZSArICdHcmFkaWVudCcpKVxyXG4gICAgICBcclxuICAgICAgLyogc3RvcmUgdHlwZSAqL1xyXG4gICAgICB0aGlzLnR5cGUgPSB0eXBlXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5Db250YWluZXJcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gRnJvbSBwb3NpdGlvblxyXG4gICAgICBmcm9tOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PSAncmFkaWFsJyA/XHJcbiAgICAgICAgICB0aGlzLmF0dHIoeyBmeDogbmV3IFNWRy5OdW1iZXIoeCksIGZ5OiBuZXcgU1ZHLk51bWJlcih5KSB9KSA6XHJcbiAgICAgICAgICB0aGlzLmF0dHIoeyB4MTogbmV3IFNWRy5OdW1iZXIoeCksIHkxOiBuZXcgU1ZHLk51bWJlcih5KSB9KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFRvIHBvc2l0aW9uXHJcbiAgICAsIHRvOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PSAncmFkaWFsJyA/XHJcbiAgICAgICAgICB0aGlzLmF0dHIoeyBjeDogbmV3IFNWRy5OdW1iZXIoeCksIGN5OiBuZXcgU1ZHLk51bWJlcih5KSB9KSA6XHJcbiAgICAgICAgICB0aGlzLmF0dHIoeyB4MjogbmV3IFNWRy5OdW1iZXIoeCksIHkyOiBuZXcgU1ZHLk51bWJlcih5KSB9KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFJhZGl1cyBmb3IgcmFkaWFsIGdyYWRpZW50XHJcbiAgICAsIHJhZGl1czogZnVuY3Rpb24ocikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgPT0gJ3JhZGlhbCcgP1xyXG4gICAgICAgICAgdGhpcy5hdHRyKHsgcjogbmV3IFNWRy5OdW1iZXIocikgfSkgOlxyXG4gICAgICAgICAgdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhIGNvbG9yIHN0b3BcclxuICAgICwgYXQ6IGZ1bmN0aW9uKG9mZnNldCwgY29sb3IsIG9wYWNpdHkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFNWRy5TdG9wKS51cGRhdGUob2Zmc2V0LCBjb2xvciwgb3BhY2l0eSlcclxuICAgICAgfVxyXG4gICAgICAvLyBVcGRhdGUgZ3JhZGllbnRcclxuICAgICwgdXBkYXRlOiBmdW5jdGlvbihibG9jaykge1xyXG4gICAgICAgIC8qIHJlbW92ZSBhbGwgc3RvcHMgKi9cclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgICBcclxuICAgICAgICAvKiBpbnZva2UgcGFzc2VkIGJsb2NrICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiBibG9jayA9PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAgYmxvY2suY2FsbCh0aGlzLCB0aGlzKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gUmV0dXJuIHRoZSBmaWxsIGlkXHJcbiAgICAsIGZpbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAndXJsKCMnICsgdGhpcy5pZCgpICsgJyknXHJcbiAgICAgIH1cclxuICAgICAgLy8gQWxpYXMgc3RyaW5nIGNvbnZlcnRpb24gdG8gZmlsbFxyXG4gICAgLCB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsbCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgZ3JhZGllbnQgZWxlbWVudCBpbiBkZWZzXHJcbiAgICAgIGdyYWRpZW50OiBmdW5jdGlvbih0eXBlLCBibG9jaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZnMoKS5ncmFkaWVudCh0eXBlLCBibG9jaylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuRGVmcywge1xyXG4gICAgLy8gZGVmaW5lIGdyYWRpZW50XHJcbiAgICBncmFkaWVudDogZnVuY3Rpb24odHlwZSwgYmxvY2spIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuR3JhZGllbnQodHlwZSkpLnVwZGF0ZShibG9jaylcclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLlN0b3AgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAnc3RvcCdcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkVsZW1lbnRcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gYWRkIGNvbG9yIHN0b3BzXHJcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24obykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbyA9PSAnbnVtYmVyJyB8fCBvIGluc3RhbmNlb2YgU1ZHLk51bWJlcikge1xyXG4gICAgICAgICAgbyA9IHtcclxuICAgICAgICAgICAgb2Zmc2V0OiAgYXJndW1lbnRzWzBdXHJcbiAgICAgICAgICAsIGNvbG9yOiAgIGFyZ3VtZW50c1sxXVxyXG4gICAgICAgICAgLCBvcGFjaXR5OiBhcmd1bWVudHNbMl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgLyogc2V0IGF0dHJpYnV0ZXMgKi9cclxuICAgICAgICBpZiAoby5vcGFjaXR5ICE9IG51bGwpIHRoaXMuYXR0cignc3RvcC1vcGFjaXR5Jywgby5vcGFjaXR5KVxyXG4gICAgICAgIGlmIChvLmNvbG9yICAgIT0gbnVsbCkgdGhpcy5hdHRyKCdzdG9wLWNvbG9yJywgby5jb2xvcilcclxuICAgICAgICBpZiAoby5vZmZzZXQgICE9IG51bGwpIHRoaXMuYXR0cignb2Zmc2V0JywgbmV3IFNWRy5OdW1iZXIoby5vZmZzZXQpKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICB9KVxyXG5cclxuXHJcbiAgU1ZHLlBhdHRlcm4gPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAncGF0dGVybidcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkNvbnRhaW5lclxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBSZXR1cm4gdGhlIGZpbGwgaWRcclxuICBcdCAgZmlsbDogZnVuY3Rpb24oKSB7XHJcbiAgXHQgICAgcmV0dXJuICd1cmwoIycgKyB0aGlzLmlkKCkgKyAnKSdcclxuICBcdCAgfVxyXG4gIFx0ICAvLyBVcGRhdGUgcGF0dGVybiBieSByZWJ1aWxkaW5nXHJcbiAgXHQsIHVwZGF0ZTogZnVuY3Rpb24oYmxvY2spIHtcclxuICBcdFx0XHQvKiByZW1vdmUgY29udGVudCAqL1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGludm9rZSBwYXNzZWQgYmxvY2sgKi9cclxuICAgICAgICBpZiAodHlwZW9mIGJsb2NrID09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgXHRibG9jay5jYWxsKHRoaXMsIHRoaXMpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICBcdFx0fVxyXG4gIFx0ICAvLyBBbGlhcyBzdHJpbmcgY29udmVydGlvbiB0byBmaWxsXHJcbiAgXHQsIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcclxuICBcdCAgICByZXR1cm4gdGhpcy5maWxsKClcclxuICBcdCAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBBZGQgcGFyZW50IG1ldGhvZFxyXG4gICwgY29uc3RydWN0OiB7XHJcbiAgICAgIC8vIENyZWF0ZSBwYXR0ZXJuIGVsZW1lbnQgaW4gZGVmc1xyXG4gIFx0ICBwYXR0ZXJuOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBibG9jaykge1xyXG4gIFx0ICAgIHJldHVybiB0aGlzLmRlZnMoKS5wYXR0ZXJuKHdpZHRoLCBoZWlnaHQsIGJsb2NrKVxyXG4gIFx0ICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5EZWZzLCB7XHJcbiAgICAvLyBEZWZpbmUgZ3JhZGllbnRcclxuICAgIHBhdHRlcm46IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIGJsb2NrKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLlBhdHRlcm4pLnVwZGF0ZShibG9jaykuYXR0cih7XHJcbiAgICAgICAgeDogICAgICAgICAgICAwXHJcbiAgICAgICwgeTogICAgICAgICAgICAwXHJcbiAgICAgICwgd2lkdGg6ICAgICAgICB3aWR0aFxyXG4gICAgICAsIGhlaWdodDogICAgICAgaGVpZ2h0XHJcbiAgICAgICwgcGF0dGVyblVuaXRzOiAndXNlclNwYWNlT25Vc2UnXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuXHJcbiAgU1ZHLkRvYyA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgLyogZW5zdXJlIHRoZSBwcmVzZW5jZSBvZiBhIGh0bWwgZWxlbWVudCAqL1xyXG4gICAgICB0aGlzLnBhcmVudCA9IHR5cGVvZiBlbGVtZW50ID09ICdzdHJpbmcnID9cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KSA6XHJcbiAgICAgICAgZWxlbWVudFxyXG4gICAgICBcclxuICAgICAgLyogSWYgdGhlIHRhcmdldCBpcyBhbiBzdmcgZWxlbWVudCwgdXNlIHRoYXQgZWxlbWVudCBhcyB0aGUgbWFpbiB3cmFwcGVyLlxyXG4gICAgICAgICBUaGlzIGFsbG93cyBzdmcuanMgdG8gd29yayB3aXRoIHN2ZyBkb2N1bWVudHMgYXMgd2VsbC4gKi9cclxuICAgICAgdGhpcy5jb25zdHJ1Y3RvclxyXG4gICAgICAgIC5jYWxsKHRoaXMsIHRoaXMucGFyZW50Lm5vZGVOYW1lID09ICdzdmcnID8gdGhpcy5wYXJlbnQgOiBTVkcuY3JlYXRlKCdzdmcnKSlcclxuICAgICAgXHJcbiAgICAgIC8qIHNldCBzdmcgZWxlbWVudCBhdHRyaWJ1dGVzICovXHJcbiAgICAgIHRoaXNcclxuICAgICAgICAuYXR0cih7IHhtbG5zOiBTVkcubnMsIHZlcnNpb246ICcxLjEnLCB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJyB9KVxyXG4gICAgICAgIC5hdHRyKCd4bWxuczp4bGluaycsIFNWRy54bGluaywgU1ZHLnhtbG5zKVxyXG4gICAgICBcclxuICAgICAgLyogY3JlYXRlIHRoZSA8ZGVmcz4gbm9kZSAqL1xyXG4gICAgICB0aGlzLl9kZWZzID0gbmV3IFNWRy5EZWZzXHJcbiAgICAgIHRoaXMuX2RlZnMucGFyZW50ID0gdGhpc1xyXG4gICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5fZGVmcy5ub2RlKVxyXG4gIFxyXG4gICAgICAvKiB0dXJuIG9mZiBzdWIgcGl4ZWwgb2Zmc2V0IGJ5IGRlZmF1bHQgKi9cclxuICAgICAgdGhpcy5kb1Nwb2YgPSBmYWxzZVxyXG4gICAgICBcclxuICAgICAgLyogZW5zdXJlIGNvcnJlY3QgcmVuZGVyaW5nICovXHJcbiAgICAgIGlmICh0aGlzLnBhcmVudCAhPSB0aGlzLm5vZGUpXHJcbiAgICAgICAgdGhpcy5zdGFnZSgpXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5Db250YWluZXJcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLyogZW5hYmxlIGRyYXdpbmcgKi9cclxuICAgICAgc3RhZ2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpc1xyXG4gIFxyXG4gICAgICAgIC8qIGluc2VydCBlbGVtZW50ICovXHJcbiAgICAgICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5ub2RlKVxyXG4gIFxyXG4gICAgICAgIC8qIGZpeCBzdWItcGl4ZWwgb2Zmc2V0ICovXHJcbiAgICAgICAgZWxlbWVudC5zcG9mKClcclxuICAgICAgICBcclxuICAgICAgICAvKiBtYWtlIHN1cmUgc3ViLXBpeGVsIG9mZnNldCBpcyBmaXhlZCBldmVyeSB0aW1lIHRoZSB3aW5kb3cgaXMgcmVzaXplZCAqL1xyXG4gICAgICAgIFNWRy5vbih3aW5kb3csICdyZXNpemUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGVsZW1lbnQuc3BvZigpXHJcbiAgICAgICAgfSlcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIENyZWF0ZXMgYW5kIHJldHVybnMgZGVmcyBlbGVtZW50XHJcbiAgICAsIGRlZnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZzXHJcbiAgICAgIH1cclxuICBcclxuICAgICAgLy8gRml4IGZvciBwb3NzaWJsZSBzdWItcGl4ZWwgb2Zmc2V0LiBTZWU6XHJcbiAgICAgIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTYwODgxMlxyXG4gICAgLCBzcG9mOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb1Nwb2YpIHtcclxuICAgICAgICAgIHZhciBwb3MgPSB0aGlzLm5vZGUuZ2V0U2NyZWVuQ1RNKClcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKHBvcylcclxuICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsICgtcG9zLmUgJSAxKSArICdweCcpXHJcbiAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAgKC1wb3MuZiAlIDEpICsgJ3B4JylcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAvLyBFbmFibGUgc3ViLXBpeGVsIG9mZnNldFxyXG4gICAgLCBmaXhTdWJQaXhlbE9mZnNldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5kb1Nwb2YgPSB0cnVlXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICAvLyBSZW1vdmVzIHRoZSBkb2MgZnJvbSB0aGUgRE9NXHJcbiAgICAsIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYodGhpcy5wYXJlbnQpIHtcclxuICAgICAgICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG5cclxuXHJcbiAgU1ZHLlNoYXBlID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gIFx0ICB0aGlzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgZWxlbWVudClcclxuICBcdH1cclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkVsZW1lbnRcclxuICBcclxuICB9KVxyXG5cclxuICBTVkcuU3ltYm9sID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ3N5bWJvbCdcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkNvbnRhaW5lclxyXG4gIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgYSBuZXcgc3ltYm9sXHJcbiAgICAgIHN5bWJvbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLnB1dChuZXcgU1ZHLlN5bWJvbClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgU1ZHLlVzZSA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICd1c2UnXHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5TaGFwZVxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBVc2UgZWxlbWVudCBhcyBhIHJlZmVyZW5jZVxyXG4gICAgICBlbGVtZW50OiBmdW5jdGlvbihlbGVtZW50LCBmaWxlKSB7XHJcbiAgICAgICAgLyogc3RvcmUgdGFyZ2V0IGVsZW1lbnQgKi9cclxuICAgICAgICB0aGlzLnRhcmdldCA9IGVsZW1lbnRcclxuICBcclxuICAgICAgICAvKiBzZXQgbGluZWQgZWxlbWVudCAqL1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2hyZWYnLCAoZmlsZSB8fCAnJykgKyAnIycgKyBlbGVtZW50LCBTVkcueGxpbmspXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgYSB1c2UgZWxlbWVudFxyXG4gICAgICB1c2U6IGZ1bmN0aW9uKGVsZW1lbnQsIGZpbGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFNWRy5Vc2UpLmVsZW1lbnQoZWxlbWVudCwgZmlsZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIFNWRy5SZWN0ID0gU1ZHLmludmVudCh7XHJcbiAgXHQvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ3JlY3QnXHJcbiAgXHJcbiAgXHQvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5TaGFwZVxyXG4gIFx0XHJcbiAgXHQvLyBBZGQgcGFyZW50IG1ldGhvZFxyXG4gICwgY29uc3RydWN0OiB7XHJcbiAgICBcdC8vIENyZWF0ZSBhIHJlY3QgZWxlbWVudFxyXG4gICAgXHRyZWN0OiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICBcdCAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuUmVjdCgpLnNpemUod2lkdGgsIGhlaWdodCkpXHJcbiAgICBcdH1cclxuICAgIFx0XHJcbiAgXHR9XHJcbiAgXHRcclxuICB9KVxyXG5cclxuICBTVkcuRWxsaXBzZSA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdlbGxpcHNlJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuU2hhcGVcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gTW92ZSBvdmVyIHgtYXhpc1xyXG4gICAgICB4OiBmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMuY3goKSAtIHRoaXMuYXR0cigncngnKSA6IHRoaXMuY3goeCArIHRoaXMuYXR0cigncngnKSlcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIG92ZXIgeS1heGlzXHJcbiAgICAsIHk6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgICByZXR1cm4geSA9PSBudWxsID8gdGhpcy5jeSgpIC0gdGhpcy5hdHRyKCdyeScpIDogdGhpcy5jeSh5ICsgdGhpcy5hdHRyKCdyeScpKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeC1heGlzXHJcbiAgICAsIGN4OiBmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMuYXR0cignY3gnKSA6IHRoaXMuYXR0cignY3gnLCBuZXcgU1ZHLk51bWJlcih4KS5kaXZpZGUodGhpcy50cmFucy5zY2FsZVgpKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeS1heGlzXHJcbiAgICAsIGN5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMuYXR0cignY3knKSA6IHRoaXMuYXR0cignY3knLCBuZXcgU1ZHLk51bWJlcih5KS5kaXZpZGUodGhpcy50cmFucy5zY2FsZVkpKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XHJcbiAgICAsIHdpZHRoOiBmdW5jdGlvbih3aWR0aCkge1xyXG4gICAgICAgIHJldHVybiB3aWR0aCA9PSBudWxsID8gdGhpcy5hdHRyKCdyeCcpICogMiA6IHRoaXMuYXR0cigncngnLCBuZXcgU1ZHLk51bWJlcih3aWR0aCkuZGl2aWRlKDIpKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxyXG4gICAgLCBoZWlnaHQ6IGZ1bmN0aW9uKGhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiBoZWlnaHQgPT0gbnVsbCA/IHRoaXMuYXR0cigncnknKSAqIDIgOiB0aGlzLmF0dHIoJ3J5JywgbmV3IFNWRy5OdW1iZXIoaGVpZ2h0KS5kaXZpZGUoMikpXHJcbiAgICAgIH1cclxuICAgICAgLy8gQ3VzdG9tIHNpemUgZnVuY3Rpb25cclxuICAgICwgc2l6ZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHZhciBwID0gcHJvcG9ydGlvbmFsU2l6ZSh0aGlzLmJib3goKSwgd2lkdGgsIGhlaWdodClcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKHtcclxuICAgICAgICAgIHJ4OiBuZXcgU1ZHLk51bWJlcihwLndpZHRoKS5kaXZpZGUoMilcclxuICAgICAgICAsIHJ5OiBuZXcgU1ZHLk51bWJlcihwLmhlaWdodCkuZGl2aWRlKDIpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGNpcmNsZSBlbGVtZW50LCBiYXNlZCBvbiBlbGxpcHNlXHJcbiAgICAgIGNpcmNsZTogZnVuY3Rpb24oc2l6ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsbGlwc2Uoc2l6ZSwgc2l6ZSlcclxuICAgICAgfVxyXG4gICAgICAvLyBDcmVhdGUgYW4gZWxsaXBzZVxyXG4gICAgLCBlbGxpcHNlOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuRWxsaXBzZSkuc2l6ZSh3aWR0aCwgaGVpZ2h0KS5tb3ZlKDAsIDApXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuXHJcbiAgU1ZHLkxpbmUgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAnbGluZSdcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLlNoYXBlXHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIE1vdmUgb3ZlciB4LWF4aXNcclxuICAgICAgeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHZhciBiID0gdGhpcy5iYm94KClcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4geCA9PSBudWxsID8gYi54IDogdGhpcy5hdHRyKHtcclxuICAgICAgICAgIHgxOiB0aGlzLmF0dHIoJ3gxJykgLSBiLnggKyB4XHJcbiAgICAgICAgLCB4MjogdGhpcy5hdHRyKCd4MicpIC0gYi54ICsgeFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBvdmVyIHktYXhpc1xyXG4gICAgLCB5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgdmFyIGIgPSB0aGlzLmJib3goKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB5ID09IG51bGwgPyBiLnkgOiB0aGlzLmF0dHIoe1xyXG4gICAgICAgICAgeTE6IHRoaXMuYXR0cigneTEnKSAtIGIueSArIHlcclxuICAgICAgICAsIHkyOiB0aGlzLmF0dHIoJ3kyJykgLSBiLnkgKyB5XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHgtYXhpc1xyXG4gICAgLCBjeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHZhciBoYWxmID0gdGhpcy5iYm94KCkud2lkdGggLyAyXHJcbiAgICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMueCgpICsgaGFsZiA6IHRoaXMueCh4IC0gaGFsZilcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHktYXhpc1xyXG4gICAgLCBjeTogZnVuY3Rpb24oeSkge1xyXG4gICAgICAgIHZhciBoYWxmID0gdGhpcy5iYm94KCkuaGVpZ2h0IC8gMlxyXG4gICAgICAgIHJldHVybiB5ID09IG51bGwgPyB0aGlzLnkoKSArIGhhbGYgOiB0aGlzLnkoeSAtIGhhbGYpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IHdpZHRoIG9mIGVsZW1lbnRcclxuICAgICwgd2lkdGg6IGZ1bmN0aW9uKHdpZHRoKSB7XHJcbiAgICAgICAgdmFyIGIgPSB0aGlzLmJib3goKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB3aWR0aCA9PSBudWxsID8gYi53aWR0aCA6IHRoaXMuYXR0cih0aGlzLmF0dHIoJ3gxJykgPCB0aGlzLmF0dHIoJ3gyJykgPyAneDInIDogJ3gxJywgYi54ICsgd2lkdGgpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IGhlaWdodCBvZiBlbGVtZW50XHJcbiAgICAsIGhlaWdodDogZnVuY3Rpb24oaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIGIgPSB0aGlzLmJib3goKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiBoZWlnaHQgPT0gbnVsbCA/IGIuaGVpZ2h0IDogdGhpcy5hdHRyKHRoaXMuYXR0cigneTEnKSA8IHRoaXMuYXR0cigneTInKSA/ICd5MicgOiAneTEnLCBiLnkgKyBoZWlnaHQpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IGxpbmUgc2l6ZSBieSB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAsIHNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB2YXIgcCA9IHByb3BvcnRpb25hbFNpemUodGhpcy5iYm94KCksIHdpZHRoLCBoZWlnaHQpXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgocC53aWR0aCkuaGVpZ2h0KHAuaGVpZ2h0KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBwYXRoIGRhdGFcclxuICAgICwgcGxvdDogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKHtcclxuICAgICAgICAgIHgxOiB4MVxyXG4gICAgICAgICwgeTE6IHkxXHJcbiAgICAgICAgLCB4MjogeDJcclxuICAgICAgICAsIHkyOiB5MlxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgYSBsaW5lIGVsZW1lbnRcclxuICAgICAgbGluZTogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFNWRy5MaW5lKCkucGxvdCh4MSwgeTEsIHgyLCB5MikpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuXHJcbiAgU1ZHLlBvbHlsaW5lID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ3BvbHlsaW5lJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuU2hhcGVcclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgYSB3cmFwcGVkIHBvbHlsaW5lIGVsZW1lbnRcclxuICAgICAgcG9seWxpbmU6IGZ1bmN0aW9uKHApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFNWRy5Qb2x5bGluZSkucGxvdChwKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICBcclxuICBTVkcuUG9seWdvbiA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdwb2x5Z29uJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuU2hhcGVcclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgYSB3cmFwcGVkIHBvbHlnb24gZWxlbWVudFxyXG4gICAgICBwb2x5Z29uOiBmdW5jdGlvbihwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuUG9seWdvbikucGxvdChwKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICBcclxuICAvLyBBZGQgcG9seWdvbi1zcGVjaWZpYyBmdW5jdGlvbnNcclxuICBTVkcuZXh0ZW5kKFNWRy5Qb2x5bGluZSwgU1ZHLlBvbHlnb24sIHtcclxuICAgIC8vIERlZmluZSBtb3JwaGFibGUgYXJyYXlcclxuICAgIG1vcnBoQXJyYXk6ICBTVkcuUG9pbnRBcnJheVxyXG4gICAgLy8gUGxvdCBuZXcgcGF0aFxyXG4gICwgcGxvdDogZnVuY3Rpb24ocCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdwb2ludHMnLCAodGhpcy5hcnJheSA9IG5ldyBTVkcuUG9pbnRBcnJheShwLCBbWzAsMF1dKSkpXHJcbiAgICB9XHJcbiAgICAvLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lclxyXG4gICwgbW92ZTogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdwb2ludHMnLCB0aGlzLmFycmF5Lm1vdmUoeCwgeSkpXHJcbiAgICB9XHJcbiAgICAvLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lciBvdmVyIHgtYXhpc1xyXG4gICwgeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICByZXR1cm4geCA9PSBudWxsID8gdGhpcy5iYm94KCkueCA6IHRoaXMubW92ZSh4LCB0aGlzLmJib3goKS55KVxyXG4gICAgfVxyXG4gICAgLy8gTW92ZSBieSBsZWZ0IHRvcCBjb3JuZXIgb3ZlciB5LWF4aXNcclxuICAsIHk6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMuYmJveCgpLnkgOiB0aGlzLm1vdmUodGhpcy5iYm94KCkueCwgeSlcclxuICAgIH1cclxuICAgIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XHJcbiAgLCB3aWR0aDogZnVuY3Rpb24od2lkdGgpIHtcclxuICAgICAgdmFyIGIgPSB0aGlzLmJib3goKVxyXG4gIFxyXG4gICAgICByZXR1cm4gd2lkdGggPT0gbnVsbCA/IGIud2lkdGggOiB0aGlzLnNpemUod2lkdGgsIGIuaGVpZ2h0KVxyXG4gICAgfVxyXG4gICAgLy8gU2V0IGhlaWdodCBvZiBlbGVtZW50XHJcbiAgLCBoZWlnaHQ6IGZ1bmN0aW9uKGhlaWdodCkge1xyXG4gICAgICB2YXIgYiA9IHRoaXMuYmJveCgpXHJcbiAgXHJcbiAgICAgIHJldHVybiBoZWlnaHQgPT0gbnVsbCA/IGIuaGVpZ2h0IDogdGhpcy5zaXplKGIud2lkdGgsIGhlaWdodCkgXHJcbiAgICB9XHJcbiAgICAvLyBTZXQgZWxlbWVudCBzaXplIHRvIGdpdmVuIHdpZHRoIGFuZCBoZWlnaHRcclxuICAsIHNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgdmFyIHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMuYmJveCgpLCB3aWR0aCwgaGVpZ2h0KVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdwb2ludHMnLCB0aGlzLmFycmF5LnNpemUocC53aWR0aCwgcC5oZWlnaHQpKVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5QYXRoID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ3BhdGgnXHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5TaGFwZVxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBQbG90IG5ldyBwb2x5IHBvaW50c1xyXG4gICAgICBwbG90OiBmdW5jdGlvbihwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignZCcsICh0aGlzLmFycmF5ID0gbmV3IFNWRy5QYXRoQXJyYXkocCwgW1snTScsIDAsIDBdXSkpKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyXHJcbiAgICAsIG1vdmU6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdkJywgdGhpcy5hcnJheS5tb3ZlKHgsIHkpKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyIG92ZXIgeC1heGlzXHJcbiAgICAsIHg6IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICByZXR1cm4geCA9PSBudWxsID8gdGhpcy5iYm94KCkueCA6IHRoaXMubW92ZSh4LCB0aGlzLmJib3goKS55KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyIG92ZXIgeS1heGlzXHJcbiAgICAsIHk6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgICByZXR1cm4geSA9PSBudWxsID8gdGhpcy5iYm94KCkueSA6IHRoaXMubW92ZSh0aGlzLmJib3goKS54LCB5KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBlbGVtZW50IHNpemUgdG8gZ2l2ZW4gd2lkdGggYW5kIGhlaWdodFxyXG4gICAgLCBzaXplOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMuYmJveCgpLCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2QnLCB0aGlzLmFycmF5LnNpemUocC53aWR0aCwgcC5oZWlnaHQpKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XHJcbiAgICAsIHdpZHRoOiBmdW5jdGlvbih3aWR0aCkge1xyXG4gICAgICAgIHJldHVybiB3aWR0aCA9PSBudWxsID8gdGhpcy5iYm94KCkud2lkdGggOiB0aGlzLnNpemUod2lkdGgsIHRoaXMuYmJveCgpLmhlaWdodClcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcclxuICAgICwgaGVpZ2h0OiBmdW5jdGlvbihoZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0ID09IG51bGwgPyB0aGlzLmJib3goKS5oZWlnaHQgOiB0aGlzLnNpemUodGhpcy5iYm94KCkud2lkdGgsIGhlaWdodClcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgYSB3cmFwcGVkIHBhdGggZWxlbWVudFxyXG4gICAgICBwYXRoOiBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuUGF0aCkucGxvdChkKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgU1ZHLkltYWdlID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ2ltYWdlJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuU2hhcGVcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gKHJlKWxvYWQgaW1hZ2VcclxuICAgICAgbG9hZDogZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgICAgaWYgKCF1cmwpIHJldHVybiB0aGlzXHJcbiAgXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAsIGltZyAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIHByZWxvYWQgaW1hZ2UgKi9cclxuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgcCA9IHNlbGYuZG9jKFNWRy5QYXR0ZXJuKVxyXG4gIFxyXG4gICAgICAgICAgLyogZW5zdXJlIGltYWdlIHNpemUgKi9cclxuICAgICAgICAgIGlmIChzZWxmLndpZHRoKCkgPT0gMCAmJiBzZWxmLmhlaWdodCgpID09IDApXHJcbiAgICAgICAgICAgIHNlbGYuc2l6ZShpbWcud2lkdGgsIGltZy5oZWlnaHQpXHJcbiAgXHJcbiAgICAgICAgICAvKiBlbnN1cmUgcGF0dGVybiBzaXplIGlmIG5vdCBzZXQgKi9cclxuICAgICAgICAgIGlmIChwICYmIHAud2lkdGgoKSA9PSAwICYmIHAuaGVpZ2h0KCkgPT0gMClcclxuICAgICAgICAgICAgcC5zaXplKHNlbGYud2lkdGgoKSwgc2VsZi5oZWlnaHQoKSlcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogY2FsbGJhY2sgKi9cclxuICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5fbG9hZGVkID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAgICBzZWxmLl9sb2FkZWQuY2FsbChzZWxmLCB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6ICBpbWcud2lkdGhcclxuICAgICAgICAgICAgLCBoZWlnaHQ6IGltZy5oZWlnaHRcclxuICAgICAgICAgICAgLCByYXRpbzogIGltZy53aWR0aCAvIGltZy5oZWlnaHRcclxuICAgICAgICAgICAgLCB1cmw6ICAgIHVybFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdocmVmJywgKGltZy5zcmMgPSB0aGlzLnNyYyA9IHVybCksIFNWRy54bGluaylcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgbG9hZGUgY2FsbGJhY2tcclxuICAgICwgbG9hZGVkOiBmdW5jdGlvbihsb2FkZWQpIHtcclxuICAgICAgICB0aGlzLl9sb2FkZWQgPSBsb2FkZWRcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGltYWdlIGVsZW1lbnQsIGxvYWQgaW1hZ2UgYW5kIHNldCBpdHMgc2l6ZVxyXG4gICAgICBpbWFnZTogZnVuY3Rpb24oc291cmNlLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuSW1hZ2UpLmxvYWQoc291cmNlKS5zaXplKHdpZHRoIHx8IDAsIGhlaWdodCB8fCB3aWR0aCB8fCAwKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuXHJcbiAgU1ZHLlRleHQgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIFNWRy5jcmVhdGUoJ3RleHQnKSlcclxuICAgICAgXHJcbiAgICAgIHRoaXMuX2xlYWRpbmcgPSBuZXcgU1ZHLk51bWJlcigxLjMpICAgIC8qIHN0b3JlIGxlYWRpbmcgdmFsdWUgZm9yIHJlYnVpbGRpbmcgKi9cclxuICAgICAgdGhpcy5fcmVidWlsZCA9IHRydWUgICAgICAgICAgICAgICAgICAgLyogZW5hYmxlIGF1dG9tYXRpYyB1cGRhdGluZyBvZiBkeSB2YWx1ZXMgKi9cclxuICAgICAgdGhpcy5fYnVpbGQgICA9IGZhbHNlICAgICAgICAgICAgICAgICAgLyogZGlzYWJsZSBidWlsZCBtb2RlIGZvciBhZGRpbmcgbXVsdGlwbGUgbGluZXMgKi9cclxuICBcclxuICAgICAgLyogc2V0IGRlZmF1bHQgZm9udCAqL1xyXG4gICAgICB0aGlzLmF0dHIoJ2ZvbnQtZmFtaWx5JywgU1ZHLmRlZmF1bHRzLmF0dHJzWydmb250LWZhbWlseSddKVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuU2hhcGVcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gTW92ZSBvdmVyIHgtYXhpc1xyXG4gICAgICB4OiBmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgLyogYWN0IGFzIGdldHRlciAqL1xyXG4gICAgICAgIGlmICh4ID09IG51bGwpXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCd4JylcclxuICAgICAgICBcclxuICAgICAgICAvKiBtb3ZlIGxpbmVzIGFzIHdlbGwgaWYgbm8gdGV4dFBhdGggaXMgcHJlc2VudCAqL1xyXG4gICAgICAgIGlmICghdGhpcy50ZXh0UGF0aClcclxuICAgICAgICAgIHRoaXMubGluZXMuZWFjaChmdW5jdGlvbigpIHsgaWYgKHRoaXMubmV3TGluZWQpIHRoaXMueCh4KSB9KVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ3gnLCB4KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgb3ZlciB5LWF4aXNcclxuICAgICwgeTogZnVuY3Rpb24oeSkge1xyXG4gICAgICAgIHZhciBveSA9IHRoaXMuYXR0cigneScpXHJcbiAgICAgICAgICAsIG8gID0gdHlwZW9mIG95ID09PSAnbnVtYmVyJyA/IG95IC0gdGhpcy5iYm94KCkueSA6IDBcclxuICBcclxuICAgICAgICAvKiBhY3QgYXMgZ2V0dGVyICovXHJcbiAgICAgICAgaWYgKHkgPT0gbnVsbClcclxuICAgICAgICAgIHJldHVybiB0eXBlb2Ygb3kgPT09ICdudW1iZXInID8gb3kgLSBvIDogb3lcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCd5JywgdHlwZW9mIHkgPT09ICdudW1iZXInID8geSArIG8gOiB5KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgY2VudGVyIG92ZXIgeC1heGlzXHJcbiAgICAsIGN4OiBmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMuYmJveCgpLmN4IDogdGhpcy54KHggLSB0aGlzLmJib3goKS53aWR0aCAvIDIpXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBjZW50ZXIgb3ZlciB5LWF4aXNcclxuICAgICwgY3k6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgICByZXR1cm4geSA9PSBudWxsID8gdGhpcy5iYm94KCkuY3kgOiB0aGlzLnkoeSAtIHRoaXMuYmJveCgpLmhlaWdodCAvIDIpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IHRoZSB0ZXh0IGNvbnRlbnRcclxuICAgICwgdGV4dDogZnVuY3Rpb24odGV4dCkge1xyXG4gICAgICAgIC8qIGFjdCBhcyBnZXR0ZXIgKi9cclxuICAgICAgICBpZiAodHlwZW9mIHRleHQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gdGhpcy5jb250ZW50XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogcmVtb3ZlIGV4aXN0aW5nIGNvbnRlbnQgKi9cclxuICAgICAgICB0aGlzLmNsZWFyKCkuYnVpbGQodHJ1ZSlcclxuICAgICAgICBcclxuICAgICAgICBpZiAodHlwZW9mIHRleHQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIC8qIGNhbGwgYmxvY2sgKi9cclxuICAgICAgICAgIHRleHQuY2FsbCh0aGlzLCB0aGlzKVxyXG4gIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvKiBzdG9yZSB0ZXh0IGFuZCBtYWtlIHN1cmUgdGV4dCBpcyBub3QgYmxhbmsgKi9cclxuICAgICAgICAgIHRleHQgPSAodGhpcy5jb250ZW50ID0gdGV4dCkuc3BsaXQoJ1xcbicpXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8qIGJ1aWxkIG5ldyBsaW5lcyAqL1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdGV4dC5sZW5ndGg7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLnRzcGFuKHRleHRbaV0pLm5ld0xpbmUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKiBkaXNhYmxlIGJ1aWxkIG1vZGUgYW5kIHJlYnVpbGQgbGluZXMgKi9cclxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZChmYWxzZSkucmVidWlsZCgpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IGZvbnQgc2l6ZVxyXG4gICAgLCBzaXplOiBmdW5jdGlvbihzaXplKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignZm9udC1zaXplJywgc2l6ZSkucmVidWlsZCgpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IC8gZ2V0IGxlYWRpbmdcclxuICAgICwgbGVhZGluZzogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAvKiBhY3QgYXMgZ2V0dGVyICovXHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fbGVhZGluZ1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGFjdCBhcyBzZXR0ZXIgKi9cclxuICAgICAgICB0aGlzLl9sZWFkaW5nID0gbmV3IFNWRy5OdW1iZXIodmFsdWUpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVidWlsZCgpXHJcbiAgICAgIH1cclxuICAgICAgLy8gUmVidWlsZCBhcHBlYXJhbmNlIHR5cGVcclxuICAgICwgcmVidWlsZDogZnVuY3Rpb24ocmVidWlsZCkge1xyXG4gICAgICAgIC8qIHN0b3JlIG5ldyByZWJ1aWxkIGZsYWcgaWYgZ2l2ZW4gKi9cclxuICAgICAgICBpZiAodHlwZW9mIHJlYnVpbGQgPT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgdGhpcy5fcmVidWlsZCA9IHJlYnVpbGRcclxuICBcclxuICAgICAgICAvKiBkZWZpbmUgcG9zaXRpb24gb2YgYWxsIGxpbmVzICovXHJcbiAgICAgICAgaWYgKHRoaXMuX3JlYnVpbGQpIHtcclxuICAgICAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLmxpbmVzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5ld0xpbmVkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLnRleHRQYXRoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyKCd4Jywgc2VsZi5hdHRyKCd4JykpXHJcbiAgICAgICAgICAgICAgdGhpcy5hdHRyKCdkeScsIHNlbGYuX2xlYWRpbmcgKiBuZXcgU1ZHLk51bWJlcihzZWxmLmF0dHIoJ2ZvbnQtc2l6ZScpKSkgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgXHJcbiAgICAgICAgICB0aGlzLmZpcmUoJ3JlYnVpbGQnKVxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEVuYWJsZSAvIGRpc2FibGUgYnVpbGQgbW9kZVxyXG4gICAgLCBidWlsZDogZnVuY3Rpb24oYnVpbGQpIHtcclxuICAgICAgICB0aGlzLl9idWlsZCA9ICEhYnVpbGRcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIHRleHQgZWxlbWVudFxyXG4gICAgICB0ZXh0OiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuVGV4dCkudGV4dCh0ZXh0KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENyZWF0ZSBwbGFpbiB0ZXh0IGVsZW1lbnRcclxuICAgICwgcGxhaW46IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFNWRy5UZXh0KS5wbGFpbih0ZXh0KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuICBcclxuICBTVkcuVFNwYW4gPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAndHNwYW4nXHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5TaGFwZVxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBTZXQgdGV4dCBjb250ZW50XHJcbiAgICAgIHRleHQ6IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgICBpZih0ZXh0ID09IG51bGwpIHJldHVybiB0aGlzLm5vZGUudGV4dENvbnRlbnQgKyAodGhpcy5kb20ubmV3TGluZWQgPyAnXFxuJyA6ICcnKVxyXG4gIFxyXG4gICAgICAgIHR5cGVvZiB0ZXh0ID09PSAnZnVuY3Rpb24nID8gdGV4dC5jYWxsKHRoaXMsIHRoaXMpIDogdGhpcy5wbGFpbih0ZXh0KVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2hvcnRjdXQgZHhcclxuICAgICwgZHg6IGZ1bmN0aW9uKGR4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignZHgnLCBkeClcclxuICAgICAgfVxyXG4gICAgICAvLyBTaG9ydGN1dCBkeVxyXG4gICAgLCBkeTogZnVuY3Rpb24oZHkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdkeScsIGR5KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENyZWF0ZSBuZXcgbGluZVxyXG4gICAgLCBuZXdMaW5lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvKiBmZXRjaCB0ZXh0IHBhcmVudCAqL1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy5kb2MoU1ZHLlRleHQpXHJcbiAgXHJcbiAgICAgICAgLyogbWFyayBuZXcgbGluZSAqL1xyXG4gICAgICAgIHRoaXMubmV3TGluZWQgPSB0cnVlXHJcbiAgXHJcbiAgICAgICAgLyogYXBwbHkgbmV3IGh5wqFuICovXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZHkodC5fbGVhZGluZyAqIHQuYXR0cignZm9udC1zaXplJykpLmF0dHIoJ3gnLCB0LngoKSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5UZXh0LCBTVkcuVFNwYW4sIHtcclxuICAgIC8vIENyZWF0ZSBwbGFpbiB0ZXh0IG5vZGVcclxuICAgIHBsYWluOiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgIC8qIGNsZWFyIGlmIGJ1aWxkIG1vZGUgaXMgZGlzYWJsZWQgKi9cclxuICAgICAgaWYgKHRoaXMuX2J1aWxkID09PSBmYWxzZSlcclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICBcclxuICAgICAgLyogY3JlYXRlIHRleHQgbm9kZSAqL1xyXG4gICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoKHRoaXMuY29udGVudCA9IHRleHQpKSlcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBDcmVhdGUgYSB0c3BhblxyXG4gICwgdHNwYW46IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgdmFyIG5vZGUgID0gKHRoaXMudGV4dFBhdGggfHwgdGhpcykubm9kZVxyXG4gICAgICAgICwgdHNwYW4gPSBuZXcgU1ZHLlRTcGFuXHJcbiAgXHJcbiAgICAgIC8qIGNsZWFyIGlmIGJ1aWxkIG1vZGUgaXMgZGlzYWJsZWQgKi9cclxuICAgICAgaWYgKHRoaXMuX2J1aWxkID09PSBmYWxzZSlcclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgXHJcbiAgICAgIC8qIGFkZCBuZXcgdHNwYW4gYW5kIHJlZmVyZW5jZSAqL1xyXG4gICAgICBub2RlLmFwcGVuZENoaWxkKHRzcGFuLm5vZGUpXHJcbiAgICAgIHRzcGFuLnBhcmVudCA9IHRoaXNcclxuICBcclxuICAgICAgLyogb25seSBmaXJzdCBsZXZlbCB0c3BhbnMgYXJlIGNvbnNpZGVyZWQgdG8gYmUgXCJsaW5lc1wiICovXHJcbiAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgU1ZHLlRleHQpXHJcbiAgICAgICAgdGhpcy5saW5lcy5hZGQodHNwYW4pXHJcbiAgXHJcbiAgICAgIHJldHVybiB0c3Bhbi50ZXh0KHRleHQpXHJcbiAgICB9XHJcbiAgICAvLyBDbGVhciBhbGwgbGluZXNcclxuICAsIGNsZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIG5vZGUgPSAodGhpcy50ZXh0UGF0aCB8fCB0aGlzKS5ub2RlXHJcbiAgXHJcbiAgICAgIC8qIHJlbW92ZSBleGlzdGluZyBjaGlsZCBub2RlcyAqL1xyXG4gICAgICB3aGlsZSAobm9kZS5oYXNDaGlsZE5vZGVzKCkpXHJcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RDaGlsZClcclxuICAgICAgXHJcbiAgICAgIC8qIHJlc2V0IGNvbnRlbnQgcmVmZXJlbmNlcyAgKi9cclxuICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBTVkcuVGV4dCkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpbmVzXHJcbiAgICAgICAgdGhpcy5saW5lcyA9IG5ldyBTVkcuU2V0XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gJydcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIEdldCBsZW5ndGggb2YgdGV4dCBlbGVtZW50XHJcbiAgLCBsZW5ndGg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENvbXB1dGVkVGV4dExlbmd0aCgpXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcblxyXG4gIFNWRy5UZXh0UGF0aCA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICd0ZXh0UGF0aCdcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkVsZW1lbnRcclxuICBcclxuICAgIC8vIERlZmluZSBwYXJlbnQgY2xhc3NcclxuICAsIHBhcmVudDogU1ZHLlRleHRcclxuICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIHBhdGggZm9yIHRleHQgdG8gcnVuIG9uXHJcbiAgICAgIHBhdGg6IGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAvKiBjcmVhdGUgdGV4dFBhdGggZWxlbWVudCAqL1xyXG4gICAgICAgIHRoaXMudGV4dFBhdGggPSBuZXcgU1ZHLlRleHRQYXRoXHJcbiAgXHJcbiAgICAgICAgLyogbW92ZSBsaW5lcyB0byB0ZXh0cGF0aCAqL1xyXG4gICAgICAgIHdoaWxlKHRoaXMubm9kZS5oYXNDaGlsZE5vZGVzKCkpXHJcbiAgICAgICAgICB0aGlzLnRleHRQYXRoLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5ub2RlLmZpcnN0Q2hpbGQpXHJcbiAgXHJcbiAgICAgICAgLyogYWRkIHRleHRQYXRoIGVsZW1lbnQgYXMgY2hpbGQgbm9kZSAqL1xyXG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZCh0aGlzLnRleHRQYXRoLm5vZGUpXHJcbiAgXHJcbiAgICAgICAgLyogY3JlYXRlIHBhdGggaW4gZGVmcyAqL1xyXG4gICAgICAgIHRoaXMudHJhY2sgPSB0aGlzLmRvYygpLmRlZnMoKS5wYXRoKGQpXHJcbiAgXHJcbiAgICAgICAgLyogY3JlYXRlIGNpcmN1bGFyIHJlZmVyZW5jZSAqL1xyXG4gICAgICAgIHRoaXMudGV4dFBhdGgucGFyZW50ID0gdGhpc1xyXG4gIFxyXG4gICAgICAgIC8qIGxpbmsgdGV4dFBhdGggdG8gcGF0aCBhbmQgYWRkIGNvbnRlbnQgKi9cclxuICAgICAgICB0aGlzLnRleHRQYXRoLmF0dHIoJ2hyZWYnLCAnIycgKyB0aGlzLnRyYWNrLCBTVkcueGxpbmspXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBQbG90IHBhdGggaWYgYW55XHJcbiAgICAsIHBsb3Q6IGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICBpZiAodGhpcy50cmFjaykgdGhpcy50cmFjay5wbG90KGQpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIFNWRy5OZXN0ZWQgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIFNWRy5jcmVhdGUoJ3N2ZycpKVxyXG4gICAgICBcclxuICAgICAgdGhpcy5zdHlsZSgnb3ZlcmZsb3cnLCAndmlzaWJsZScpXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5Db250YWluZXJcclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgbmVzdGVkIHN2ZyBkb2N1bWVudFxyXG4gICAgICBuZXN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLk5lc3RlZClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIFNWRy5BID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ2EnXHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5Db250YWluZXJcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gTGluayB1cmxcclxuICAgICAgdG86IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2hyZWYnLCB1cmwsIFNWRy54bGluaylcclxuICAgICAgfVxyXG4gICAgICAvLyBMaW5rIHNob3cgYXR0cmlidXRlXHJcbiAgICAsIHNob3c6IGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ3Nob3cnLCB0YXJnZXQsIFNWRy54bGluaylcclxuICAgICAgfVxyXG4gICAgICAvLyBMaW5rIHRhcmdldCBhdHRyaWJ1dGVcclxuICAgICwgdGFyZ2V0OiBmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCd0YXJnZXQnLCB0YXJnZXQpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgYSBoeXBlcmxpbmsgZWxlbWVudFxyXG4gICAgICBsaW5rOiBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFNWRy5BKS50byh1cmwpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG4gIFxyXG4gIFNWRy5leHRlbmQoU1ZHLkVsZW1lbnQsIHtcclxuICAgIC8vIENyZWF0ZSBhIGh5cGVybGluayBlbGVtZW50XHJcbiAgICBsaW5rVG86IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICB2YXIgbGluayA9IG5ldyBTVkcuQVxyXG4gIFxyXG4gICAgICBpZiAodHlwZW9mIHVybCA9PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgIHVybC5jYWxsKGxpbmssIGxpbmspXHJcbiAgICAgIGVsc2VcclxuICAgICAgICBsaW5rLnRvKHVybClcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LnB1dChsaW5rKS5wdXQodGhpcylcclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5NYXJrZXIgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAnbWFya2VyJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuQ29udGFpbmVyXHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XHJcbiAgICAgIHdpZHRoOiBmdW5jdGlvbih3aWR0aCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ21hcmtlcldpZHRoJywgd2lkdGgpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IGhlaWdodCBvZiBlbGVtZW50XHJcbiAgICAsIGhlaWdodDogZnVuY3Rpb24oaGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignbWFya2VySGVpZ2h0JywgaGVpZ2h0KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBtYXJrZXIgcmVmWCBhbmQgcmVmWVxyXG4gICAgLCByZWY6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdyZWZYJywgeCkuYXR0cigncmVmWScsIHkpXHJcbiAgICAgIH1cclxuICAgICAgLy8gVXBkYXRlIG1hcmtlclxyXG4gICAgLCB1cGRhdGU6IGZ1bmN0aW9uKGJsb2NrKSB7XHJcbiAgICAgICAgLyogcmVtb3ZlIGFsbCBjb250ZW50ICovXHJcbiAgICAgICAgdGhpcy5jbGVhcigpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogaW52b2tlIHBhc3NlZCBibG9jayAqL1xyXG4gICAgICAgIGlmICh0eXBlb2YgYmxvY2sgPT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgIGJsb2NrLmNhbGwodGhpcywgdGhpcylcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFJldHVybiB0aGUgZmlsbCBpZFxyXG4gICAgLCB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICd1cmwoIycgKyB0aGlzLmlkKCkgKyAnKSdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICBtYXJrZXI6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIGJsb2NrKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIG1hcmtlciBlbGVtZW50IGluIGRlZnNcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWZzKCkubWFya2VyKHdpZHRoLCBoZWlnaHQsIGJsb2NrKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5EZWZzLCB7XHJcbiAgICAvLyBDcmVhdGUgbWFya2VyXHJcbiAgICBtYXJrZXI6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIGJsb2NrKSB7XHJcbiAgICAgIC8vIFNldCBkZWZhdWx0IHZpZXdib3ggdG8gbWF0Y2ggdGhlIHdpZHRoIGFuZCBoZWlnaHQsIHNldCByZWYgdG8gY3ggYW5kIGN5IGFuZCBzZXQgb3JpZW50IHRvIGF1dG9cclxuICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuTWFya2VyKVxyXG4gICAgICAgIC5zaXplKHdpZHRoLCBoZWlnaHQpXHJcbiAgICAgICAgLnJlZih3aWR0aCAvIDIsIGhlaWdodCAvIDIpXHJcbiAgICAgICAgLnZpZXdib3goMCwgMCwgd2lkdGgsIGhlaWdodClcclxuICAgICAgICAuYXR0cignb3JpZW50JywgJ2F1dG8nKVxyXG4gICAgICAgIC51cGRhdGUoYmxvY2spXHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG4gIFxyXG4gIFNWRy5leHRlbmQoU1ZHLkxpbmUsIFNWRy5Qb2x5bGluZSwgU1ZHLlBvbHlnb24sIFNWRy5QYXRoLCB7XHJcbiAgICAvLyBDcmVhdGUgYW5kIGF0dGFjaCBtYXJrZXJzXHJcbiAgICBtYXJrZXI6IGZ1bmN0aW9uKG1hcmtlciwgd2lkdGgsIGhlaWdodCwgYmxvY2spIHtcclxuICAgICAgdmFyIGF0dHIgPSBbJ21hcmtlciddXHJcbiAgXHJcbiAgICAgIC8vIEJ1aWxkIGF0dHJpYnV0ZSBuYW1lXHJcbiAgICAgIGlmIChtYXJrZXIgIT0gJ2FsbCcpIGF0dHIucHVzaChtYXJrZXIpXHJcbiAgICAgIGF0dHIgPSBhdHRyLmpvaW4oJy0nKVxyXG4gIFxyXG4gICAgICAvLyBTZXQgbWFya2VyIGF0dHJpYnV0ZVxyXG4gICAgICBtYXJrZXIgPSBhcmd1bWVudHNbMV0gaW5zdGFuY2VvZiBTVkcuTWFya2VyID9cclxuICAgICAgICBhcmd1bWVudHNbMV0gOlxyXG4gICAgICAgIHRoaXMuZG9jKCkubWFya2VyKHdpZHRoLCBoZWlnaHQsIGJsb2NrKVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cihhdHRyLCBtYXJrZXIpXHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG5cclxuICB2YXIgc3VnYXIgPSB7XHJcbiAgICBzdHJva2U6IFsnY29sb3InLCAnd2lkdGgnLCAnb3BhY2l0eScsICdsaW5lY2FwJywgJ2xpbmVqb2luJywgJ21pdGVybGltaXQnLCAnZGFzaGFycmF5JywgJ2Rhc2hvZmZzZXQnXVxyXG4gICwgZmlsbDogICBbJ2NvbG9yJywgJ29wYWNpdHknLCAncnVsZSddXHJcbiAgLCBwcmVmaXg6IGZ1bmN0aW9uKHQsIGEpIHtcclxuICAgICAgcmV0dXJuIGEgPT0gJ2NvbG9yJyA/IHQgOiB0ICsgJy0nICsgYVxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvKiBBZGQgc3VnYXIgZm9yIGZpbGwgYW5kIHN0cm9rZSAqL1xyXG4gIDtbJ2ZpbGwnLCAnc3Ryb2tlJ10uZm9yRWFjaChmdW5jdGlvbihtKSB7XHJcbiAgICB2YXIgaSwgZXh0ZW5zaW9uID0ge31cclxuICAgIFxyXG4gICAgZXh0ZW5zaW9uW21dID0gZnVuY3Rpb24obykge1xyXG4gICAgICBpZiAodHlwZW9mIG8gPT0gJ3N0cmluZycgfHwgU1ZHLkNvbG9yLmlzUmdiKG8pIHx8IChvICYmIHR5cGVvZiBvLmZpbGwgPT09ICdmdW5jdGlvbicpKVxyXG4gICAgICAgIHRoaXMuYXR0cihtLCBvKVxyXG4gIFxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgLyogc2V0IGFsbCBhdHRyaWJ1dGVzIGZyb20gc3VnYXIuZmlsbCBhbmQgc3VnYXIuc3Ryb2tlIGxpc3QgKi9cclxuICAgICAgICBmb3IgKGkgPSBzdWdhclttXS5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgIGlmIChvW3N1Z2FyW21dW2ldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLmF0dHIoc3VnYXIucHJlZml4KG0sIHN1Z2FyW21dW2ldKSwgb1tzdWdhclttXVtpXV0pXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTVkcuZXh0ZW5kKFNWRy5FbGVtZW50LCBTVkcuRlgsIGV4dGVuc2lvbilcclxuICAgIFxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuRWxlbWVudCwgU1ZHLkZYLCB7XHJcbiAgICAvLyBSb3RhdGlvblxyXG4gICAgcm90YXRlOiBmdW5jdGlvbihkZWcsIHgsIHkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHtcclxuICAgICAgICByb3RhdGlvbjogZGVnIHx8IDBcclxuICAgICAgLCBjeDogeFxyXG4gICAgICAsIGN5OiB5XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyBTa2V3XHJcbiAgLCBza2V3OiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7XHJcbiAgICAgICAgc2tld1g6IHggfHwgMFxyXG4gICAgICAsIHNrZXdZOiB5IHx8IDBcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIFNjYWxlXHJcbiAgLCBzY2FsZTogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oe1xyXG4gICAgICAgIHNjYWxlWDogeFxyXG4gICAgICAsIHNjYWxlWTogeSA9PSBudWxsID8geCA6IHlcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIFRyYW5zbGF0ZVxyXG4gICwgdHJhbnNsYXRlOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7XHJcbiAgICAgICAgeDogeFxyXG4gICAgICAsIHk6IHlcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIE1hdHJpeFxyXG4gICwgbWF0cml4OiBmdW5jdGlvbihtKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IG1hdHJpeDogbSB9KVxyXG4gICAgfVxyXG4gICAgLy8gT3BhY2l0eVxyXG4gICwgb3BhY2l0eTogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cignb3BhY2l0eScsIHZhbHVlKVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuUmVjdCwgU1ZHLkVsbGlwc2UsIFNWRy5GWCwge1xyXG4gICAgLy8gQWRkIHggYW5kIHkgcmFkaXVzXHJcbiAgICByYWRpdXM6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cih7IHJ4OiB4LCByeTogeSB8fCB4IH0pXHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5QYXRoLCB7XHJcbiAgICAvLyBHZXQgcGF0aCBsZW5ndGhcclxuICAgIGxlbmd0aDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0VG90YWxMZW5ndGgoKVxyXG4gICAgfVxyXG4gICAgLy8gR2V0IHBvaW50IGF0IGxlbmd0aFxyXG4gICwgcG9pbnRBdDogZnVuY3Rpb24obGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0UG9pbnRBdExlbmd0aChsZW5ndGgpXHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5QYXJlbnQsIFNWRy5UZXh0LCBTVkcuRlgsIHtcclxuICAgIC8vIFNldCBmb250IFxyXG4gICAgZm9udDogZnVuY3Rpb24obykge1xyXG4gICAgICBmb3IgKHZhciBrIGluIG8pXHJcbiAgICAgICAgayA9PSAnbGVhZGluZycgP1xyXG4gICAgICAgICAgdGhpcy5sZWFkaW5nKG9ba10pIDpcclxuICAgICAgICBrID09ICdhbmNob3InID9cclxuICAgICAgICAgIHRoaXMuYXR0cigndGV4dC1hbmNob3InLCBvW2tdKSA6XHJcbiAgICAgICAgayA9PSAnc2l6ZScgfHwgayA9PSAnZmFtaWx5JyB8fCBrID09ICd3ZWlnaHQnIHx8IGsgPT0gJ3N0cmV0Y2gnIHx8IGsgPT0gJ3ZhcmlhbnQnIHx8IGsgPT0gJ3N0eWxlJyA/XHJcbiAgICAgICAgICB0aGlzLmF0dHIoJ2ZvbnQtJysgaywgb1trXSkgOlxyXG4gICAgICAgICAgdGhpcy5hdHRyKGssIG9ba10pXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuICBcclxuXHJcblxyXG4gIFNWRy5TZXQgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemVcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8qIHNldCBpbml0aWFsIHN0YXRlICovXHJcbiAgICAgIHRoaXMuY2xlYXIoKVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBBZGQgZWxlbWVudCB0byBzZXRcclxuICAgICAgYWRkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaSwgaWwsIGVsZW1lbnRzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXHJcbiAgXHJcbiAgICAgICAgZm9yIChpID0gMCwgaWwgPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgICAgdGhpcy5tZW1iZXJzLnB1c2goZWxlbWVudHNbaV0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBSZW1vdmUgZWxlbWVudCBmcm9tIHNldFxyXG4gICAgLCByZW1vdmU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgaSA9IHRoaXMuaW5kZXgoZWxlbWVudClcclxuICAgICAgICBcclxuICAgICAgICAvKiByZW1vdmUgZ2l2ZW4gY2hpbGQgKi9cclxuICAgICAgICBpZiAoaSA+IC0xKVxyXG4gICAgICAgICAgdGhpcy5tZW1iZXJzLnNwbGljZShpLCAxKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBtZW1iZXJzXHJcbiAgICAsIGVhY2g6IGZ1bmN0aW9uKGJsb2NrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdGhpcy5tZW1iZXJzLmxlbmd0aDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgICBibG9jay5hcHBseSh0aGlzLm1lbWJlcnNbaV0sIFtpLCB0aGlzLm1lbWJlcnNdKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gUmVzdG9yZSB0byBkZWZhdWx0c1xyXG4gICAgLCBjbGVhcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLyogaW5pdGlhbGl6ZSBzdG9yZSAqL1xyXG4gICAgICAgIHRoaXMubWVtYmVycyA9IFtdXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBDaGVja3MgaWYgYSBnaXZlbiBlbGVtZW50IGlzIHByZXNlbnQgaW4gc2V0XHJcbiAgICAsIGhhczogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4KGVsZW1lbnQpID49IDBcclxuICAgICAgfVxyXG4gICAgICAvLyByZXR1bnMgaW5kZXggb2YgZ2l2ZW4gZWxlbWVudCBpbiBzZXRcclxuICAgICwgaW5kZXg6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZW1iZXJzLmluZGV4T2YoZWxlbWVudClcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgbWVtYmVyIGF0IGdpdmVuIGluZGV4XHJcbiAgICAsIGdldDogZnVuY3Rpb24oaSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lbWJlcnNbaV1cclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgZmlyc3QgbWVtYmVyXHJcbiAgICAsIGZpcnN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoMClcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgbGFzdCBtZW1iZXJcclxuICAgICwgbGFzdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMubWVtYmVycy5sZW5ndGggLSAxKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIERlZmF1bHQgdmFsdWVcclxuICAgICwgdmFsdWVPZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVtYmVyc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEdldCB0aGUgYm91bmRpbmcgYm94IG9mIGFsbCBtZW1iZXJzIGluY2x1ZGVkIG9yIGVtcHR5IGJveCBpZiBzZXQgaGFzIG5vIGl0ZW1zXHJcbiAgICAsIGJib3g6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGJveCA9IG5ldyBTVkcuQkJveCgpXHJcbiAgXHJcbiAgICAgICAgLyogcmV0dXJuIGFuIGVtcHR5IGJveCBvZiB0aGVyZSBhcmUgbm8gbWVtYmVycyAqL1xyXG4gICAgICAgIGlmICh0aGlzLm1lbWJlcnMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICByZXR1cm4gYm94XHJcbiAgXHJcbiAgICAgICAgLyogZ2V0IHRoZSBmaXJzdCByYm94IGFuZCB1cGRhdGUgdGhlIHRhcmdldCBiYm94ICovXHJcbiAgICAgICAgdmFyIHJib3ggPSB0aGlzLm1lbWJlcnNbMF0ucmJveCgpXHJcbiAgICAgICAgYm94LnggICAgICA9IHJib3gueFxyXG4gICAgICAgIGJveC55ICAgICAgPSByYm94LnlcclxuICAgICAgICBib3gud2lkdGggID0gcmJveC53aWR0aFxyXG4gICAgICAgIGJveC5oZWlnaHQgPSByYm94LmhlaWdodFxyXG4gIFxyXG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIC8qIHVzZXIgcmJveCBmb3IgY29ycmVjdCBwb3NpdGlvbiBhbmQgdmlzdWFsIHJlcHJlc2VudGF0aW9uICovXHJcbiAgICAgICAgICBib3ggPSBib3gubWVyZ2UodGhpcy5yYm94KCkpXHJcbiAgICAgICAgfSlcclxuICBcclxuICAgICAgICByZXR1cm4gYm94XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgYSBuZXcgc2V0XHJcbiAgICAgIHNldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTVkcuU2V0XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG4gIFxyXG4gIFNWRy5TZXRGWCA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKHNldCkge1xyXG4gICAgICAvKiBzdG9yZSByZWZlcmVuY2UgdG8gc2V0ICovXHJcbiAgICAgIHRoaXMuc2V0ID0gc2V0XHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuICBcclxuICAvLyBBbGlhcyBtZXRob2RzXHJcbiAgU1ZHLlNldC5pbmhlcml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbVxyXG4gICAgICAsIG1ldGhvZHMgPSBbXVxyXG4gICAgXHJcbiAgICAvKiBnYXRoZXIgc2hhcGUgbWV0aG9kcyAqL1xyXG4gICAgZm9yKHZhciBtIGluIFNWRy5TaGFwZS5wcm90b3R5cGUpXHJcbiAgICAgIGlmICh0eXBlb2YgU1ZHLlNoYXBlLnByb3RvdHlwZVttXSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTVkcuU2V0LnByb3RvdHlwZVttXSAhPSAnZnVuY3Rpb24nKVxyXG4gICAgICAgIG1ldGhvZHMucHVzaChtKVxyXG4gIFxyXG4gICAgLyogYXBwbHkgc2hhcGUgYWxpYXNzZXMgKi9cclxuICAgIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgICAgU1ZHLlNldC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHRoaXMubWVtYmVycy5sZW5ndGg7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgICAgaWYgKHRoaXMubWVtYmVyc1tpXSAmJiB0eXBlb2YgdGhpcy5tZW1iZXJzW2ldW21ldGhvZF0gPT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgICAgdGhpcy5tZW1iZXJzW2ldW21ldGhvZF0uYXBwbHkodGhpcy5tZW1iZXJzW2ldLCBhcmd1bWVudHMpXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZCA9PSAnYW5pbWF0ZScgPyAodGhpcy5meCB8fCAodGhpcy5meCA9IG5ldyBTVkcuU2V0RlgodGhpcykpKSA6IHRoaXNcclxuICAgICAgfVxyXG4gICAgfSlcclxuICBcclxuICAgIC8qIGNsZWFyIG1ldGhvZHMgZm9yIHRoZSBuZXh0IHJvdW5kICovXHJcbiAgICBtZXRob2RzID0gW11cclxuICBcclxuICAgIC8qIGdhdGhlciBmeCBtZXRob2RzICovXHJcbiAgICBmb3IodmFyIG0gaW4gU1ZHLkZYLnByb3RvdHlwZSlcclxuICAgICAgaWYgKHR5cGVvZiBTVkcuRlgucHJvdG90eXBlW21dID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFNWRy5TZXRGWC5wcm90b3R5cGVbbV0gIT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICBtZXRob2RzLnB1c2gobSlcclxuICBcclxuICAgIC8qIGFwcGx5IGZ4IGFsaWFzc2VzICovXHJcbiAgICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgIFNWRy5TZXRGWC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHRoaXMuc2V0Lm1lbWJlcnMubGVuZ3RoOyBpIDwgaWw7IGkrKylcclxuICAgICAgICAgIHRoaXMuc2V0Lm1lbWJlcnNbaV0uZnhbbWV0aG9kXS5hcHBseSh0aGlzLnNldC5tZW1iZXJzW2ldLmZ4LCBhcmd1bWVudHMpXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgXHJcbiAgXHJcblxyXG5cclxuICBTVkcuZXh0ZW5kKFNWRy5FbGVtZW50LCB7XHJcbiAgXHQvLyBTdG9yZSBkYXRhIHZhbHVlcyBvbiBzdmcgbm9kZXNcclxuICAgIGRhdGE6IGZ1bmN0aW9uKGEsIHYsIHIpIHtcclxuICAgIFx0aWYgKHR5cGVvZiBhID09ICdvYmplY3QnKSB7XHJcbiAgICBcdFx0Zm9yICh2IGluIGEpXHJcbiAgICBcdFx0XHR0aGlzLmRhdGEodiwgYVt2XSlcclxuICBcclxuICAgICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmF0dHIoJ2RhdGEtJyArIGEpKVxyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignZGF0YS0nICsgYSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hdHRyKFxyXG4gICAgICAgICAgJ2RhdGEtJyArIGFcclxuICAgICAgICAsIHYgPT09IG51bGwgP1xyXG4gICAgICAgICAgICBudWxsIDpcclxuICAgICAgICAgIHIgPT09IHRydWUgfHwgdHlwZW9mIHYgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2ID09PSAnbnVtYmVyJyA/XHJcbiAgICAgICAgICAgIHYgOlxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2KVxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICB9KVxyXG5cclxuICBTVkcuZXh0ZW5kKFNWRy5FbGVtZW50LCB7XHJcbiAgICAvLyBSZW1lbWJlciBhcmJpdHJhcnkgZGF0YVxyXG4gICAgcmVtZW1iZXI6IGZ1bmN0aW9uKGssIHYpIHtcclxuICAgICAgLyogcmVtZW1iZXIgZXZlcnkgaXRlbSBpbiBhbiBvYmplY3QgaW5kaXZpZHVhbGx5ICovXHJcbiAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09ICdvYmplY3QnKVxyXG4gICAgICAgIGZvciAodmFyIHYgaW4gaylcclxuICAgICAgICAgIHRoaXMucmVtZW1iZXIodiwga1t2XSlcclxuICBcclxuICAgICAgLyogcmV0cmlldmUgbWVtb3J5ICovXHJcbiAgICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuICAgICAgICByZXR1cm4gdGhpcy5tZW1vcnkoKVtrXVxyXG4gIFxyXG4gICAgICAvKiBzdG9yZSBtZW1vcnkgKi9cclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMubWVtb3J5KClba10gPSB2XHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBFcmFzZSBhIGdpdmVuIG1lbW9yeVxyXG4gICwgZm9yZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuICAgICAgICB0aGlzLl9tZW1vcnkgPSB7fVxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLm1lbW9yeSgpW2FyZ3VtZW50c1tpXV1cclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICBcclxuICAgIC8vIEluaXRpYWxpemUgb3IgcmV0dXJuIGxvY2FsIG1lbW9yeSBvYmplY3RcclxuICAsIG1lbW9yeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9tZW1vcnkgfHwgKHRoaXMuX21lbW9yeSA9IHt9KVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIGZ1bmN0aW9uIGNhbWVsQ2FzZShzKSB7IFxyXG4gICAgcmV0dXJuIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tKC4pL2csIGZ1bmN0aW9uKG0sIGcpIHtcclxuICAgICAgcmV0dXJuIGcudG9VcHBlckNhc2UoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgXHJcbiAgLy8gRW5zdXJlIHRvIHNpeC1iYXNlZCBoZXggXHJcbiAgZnVuY3Rpb24gZnVsbEhleChoZXgpIHtcclxuICAgIHJldHVybiBoZXgubGVuZ3RoID09IDQgP1xyXG4gICAgICBbICcjJyxcclxuICAgICAgICBoZXguc3Vic3RyaW5nKDEsIDIpLCBoZXguc3Vic3RyaW5nKDEsIDIpXHJcbiAgICAgICwgaGV4LnN1YnN0cmluZygyLCAzKSwgaGV4LnN1YnN0cmluZygyLCAzKVxyXG4gICAgICAsIGhleC5zdWJzdHJpbmcoMywgNCksIGhleC5zdWJzdHJpbmcoMywgNClcclxuICAgICAgXS5qb2luKCcnKSA6IGhleFxyXG4gIH1cclxuICBcclxuICAvLyBDb21wb25lbnQgdG8gaGV4IHZhbHVlXHJcbiAgZnVuY3Rpb24gY29tcFRvSGV4KGNvbXApIHtcclxuICAgIHZhciBoZXggPSBjb21wLnRvU3RyaW5nKDE2KVxyXG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/ICcwJyArIGhleCA6IGhleFxyXG4gIH1cclxuICBcclxuICAvLyBDYWxjdWxhdGUgcHJvcG9ydGlvbmFsIHdpZHRoIGFuZCBoZWlnaHQgdmFsdWVzIHdoZW4gbmVjZXNzYXJ5XHJcbiAgZnVuY3Rpb24gcHJvcG9ydGlvbmFsU2l6ZShib3gsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIGlmICh3aWR0aCA9PSBudWxsIHx8IGhlaWdodCA9PSBudWxsKSB7XHJcbiAgICAgIGlmIChoZWlnaHQgPT0gbnVsbClcclxuICAgICAgICBoZWlnaHQgPSBib3guaGVpZ2h0IC8gYm94LndpZHRoICogd2lkdGhcclxuICAgICAgZWxzZSBpZiAod2lkdGggPT0gbnVsbClcclxuICAgICAgICB3aWR0aCA9IGJveC53aWR0aCAvIGJveC5oZWlnaHQgKiBoZWlnaHRcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2lkdGg6ICB3aWR0aFxyXG4gICAgLCBoZWlnaHQ6IGhlaWdodFxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyBDYWxjdWxhdGUgcG9zaXRpb24gYWNjb3JkaW5nIHRvIGZyb20gYW5kIHRvXHJcbiAgZnVuY3Rpb24gYXQobywgcG9zKSB7XHJcbiAgICAvKiBudW1iZXIgcmVjYWxjdWxhdGlvbiAoZG9uJ3QgYm90aGVyIGNvbnZlcnRpbmcgdG8gU1ZHLk51bWJlciBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucykgKi9cclxuICAgIHJldHVybiB0eXBlb2Ygby5mcm9tID09ICdudW1iZXInID9cclxuICAgICAgby5mcm9tICsgKG8udG8gLSBvLmZyb20pICogcG9zIDpcclxuICAgIFxyXG4gICAgLyogaW5zdGFuY2UgcmVjYWxjdWxhdGlvbiAqL1xyXG4gICAgbyBpbnN0YW5jZW9mIFNWRy5Db2xvciB8fCBvIGluc3RhbmNlb2YgU1ZHLk51bWJlciA/IG8uYXQocG9zKSA6XHJcbiAgICBcclxuICAgIC8qIGZvciBhbGwgb3RoZXIgdmFsdWVzIHdhaXQgdW50aWwgcG9zIGhhcyByZWFjaGVkIDEgdG8gcmV0dXJuIHRoZSBmaW5hbCB2YWx1ZSAqL1xyXG4gICAgcG9zIDwgMSA/IG8uZnJvbSA6IG8udG9cclxuICB9XHJcbiAgXHJcbiAgLy8gUGF0aEFycmF5IEhlbHBlcnNcclxuICBmdW5jdGlvbiBhcnJheVRvU3RyaW5nKGEpIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGEubGVuZ3RoLCBzID0gJyc7IGkgPCBpbDsgaSsrKSB7XHJcbiAgICAgIHMgKz0gYVtpXVswXVxyXG4gIFxyXG4gICAgICBpZiAoYVtpXVsxXSAhPSBudWxsKSB7XHJcbiAgICAgICAgcyArPSBhW2ldWzFdXHJcbiAgXHJcbiAgICAgICAgaWYgKGFbaV1bMl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgcyArPSAnICdcclxuICAgICAgICAgIHMgKz0gYVtpXVsyXVxyXG4gIFxyXG4gICAgICAgICAgaWYgKGFbaV1bM10gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzICs9ICcgJ1xyXG4gICAgICAgICAgICBzICs9IGFbaV1bM11cclxuICAgICAgICAgICAgcyArPSAnICdcclxuICAgICAgICAgICAgcyArPSBhW2ldWzRdXHJcbiAgXHJcbiAgICAgICAgICAgIGlmIChhW2ldWzVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICBzICs9ICcgJ1xyXG4gICAgICAgICAgICAgIHMgKz0gYVtpXVs1XVxyXG4gICAgICAgICAgICAgIHMgKz0gJyAnXHJcbiAgICAgICAgICAgICAgcyArPSBhW2ldWzZdXHJcbiAgXHJcbiAgICAgICAgICAgICAgaWYgKGFbaV1bN10gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcyArPSAnICdcclxuICAgICAgICAgICAgICAgIHMgKz0gYVtpXVs3XVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gcyArICcgJ1xyXG4gIH1cclxuICBcclxuICAvLyBBZGQgbW9yZSBib3VuZGluZyBib3ggcHJvcGVydGllc1xyXG4gIGZ1bmN0aW9uIGJveFByb3BlcnRpZXMoYikge1xyXG4gICAgYi54MiA9IGIueCArIGIud2lkdGhcclxuICAgIGIueTIgPSBiLnkgKyBiLmhlaWdodFxyXG4gICAgYi5jeCA9IGIueCArIGIud2lkdGggLyAyXHJcbiAgICBiLmN5ID0gYi55ICsgYi5oZWlnaHQgLyAyXHJcbiAgfVxyXG4gIFxyXG4gIC8vIFBhcnNlIGEgbWF0cml4IHN0cmluZ1xyXG4gIGZ1bmN0aW9uIHBhcnNlTWF0cml4KG8pIHtcclxuICAgIGlmIChvLm1hdHJpeCkge1xyXG4gICAgICAvKiBzcGxpdCBtYXRyaXggc3RyaW5nICovXHJcbiAgICAgIHZhciBtID0gby5tYXRyaXgucmVwbGFjZSgvXFxzL2csICcnKS5zcGxpdCgnLCcpXHJcbiAgICAgIFxyXG4gICAgICAvKiBwYXNyc2UgdmFsdWVzICovXHJcbiAgICAgIGlmIChtLmxlbmd0aCA9PSA2KSB7XHJcbiAgICAgICAgby5hID0gcGFyc2VGbG9hdChtWzBdKVxyXG4gICAgICAgIG8uYiA9IHBhcnNlRmxvYXQobVsxXSlcclxuICAgICAgICBvLmMgPSBwYXJzZUZsb2F0KG1bMl0pXHJcbiAgICAgICAgby5kID0gcGFyc2VGbG9hdChtWzNdKVxyXG4gICAgICAgIG8uZSA9IHBhcnNlRmxvYXQobVs0XSlcclxuICAgICAgICBvLmYgPSBwYXJzZUZsb2F0KG1bNV0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIG9cclxuICB9XHJcbiAgXHJcbiAgLy8gR2V0IGlkIGZyb20gcmVmZXJlbmNlIHN0cmluZ1xyXG4gIGZ1bmN0aW9uIGlkRnJvbVJlZmVyZW5jZSh1cmwpIHtcclxuICAgIHZhciBtID0gdXJsLnRvU3RyaW5nKCkubWF0Y2goU1ZHLnJlZ2V4LnJlZmVyZW5jZSlcclxuICBcclxuICAgIGlmIChtKSByZXR1cm4gbVsxXVxyXG4gIH1cclxuXHJcblxyXG4gIHJldHVybiBTVkdcclxufSkpO1xyXG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBTVkcgZnJvbSAnc3ZnLmpzJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBjcmVhdGUgYW4gZWxlbWVudCBmb3IgdGhpcyBncmFwaFxuICAgICAgICBzZWxmLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAvLyBzZXQgdGhlIGVsZW1lbnRzIGlkXG4gICAgICAgIHNlbGYuZWxlbWVudC5pZCA9IHNlbGYuaWQ7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBkaXYgdG8gdGhlIHBhZ2VcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgZWxlbWVudFxuICAgICAgICBzZWxmLnN2ZyA9IFNWRyhzZWxmLmlkKTtcblxuICAgICAgICAvLyBzdGFydCB0aGVcbiAgICAgICAgc2VsZi5zdGFydCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgb3ZlcndyaXR0ZW4nKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U1ZHfVxuICAgICAqL1xuICAgIGRyYXc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnO1xuICAgIH1cblxufTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBvYmplY3RBc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XG5pbXBvcnQgQmFzZUdyYXBoIGZyb20gJy4uL0Jhc2VHcmFwaCc7XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0QXNzaWduKEJhc2VHcmFwaCwge1xuXG4gICAgLy8gdGhpcyBpcyB0aGUgaWRcbiAgICBpZDogJ3RpbWUtc3BlbnQnLFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuXG4gICAgfVxuXG59KTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbnZhciBncmFwaHMgPSBbXTtcblxuLy8gdGhpcyBqdXN0IGJvb3RzdHJhcHMgYWxsIHRoZSBkaWZmZXJlbnQgZ3JhcGhzXG5ncmFwaHMucHVzaChyZXF1aXJlKCcuL2dyYXBocy90aW1lLXNwZW50JykpO1xuXG4vLyBsb29wIHRocm91Z2ggZWFjaCBncmFwaCBhbmQgYnVpbGQgdGhlbVxuXy5mb3JFYWNoKGdyYXBocywgKGdyYXBoKSA9PiB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdyYXBoLmJ1aWxkKCk7XG4gICAgfSwgMCk7XG59KTsiXX0=
