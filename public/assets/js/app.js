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

    // holds all the shapes for this graph
    shapes: {},

    /**
     *
     */
    start: function start() {
        var self = this,
            width = 100;

        self.shapes.time = self.draw().rect(width, 100);

        setInterval(function () {
            width++;
            self.shapes.time.width(width);
        }, 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5RWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VDYXN0RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGb3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRm9yT3duLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUhhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlQmFzZUVhY2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jcmVhdGVCYXNlRm9yLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faW5kZXhLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzUHJvdG90eXBlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9mb3JFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5TGlrZU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3ZnLmpzL2Rpc3Qvc3ZnLmpzIiwic3JjL2dyYXBocy9CYXNlR3JhcGguanMiLCJzcmMvZ3JhcGhzL3RpbWUtc3BlbnQvaW5kZXguanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzk1SEE7O0FBRUE7Ozs7OztBQUVBLE9BQU8sT0FBUCxHQUFpQjs7Ozs7QUFLYixXQUFPLGlCQUFZO0FBQ2YsWUFBSSxPQUFPLElBQVA7OztBQURXLFlBSWYsQ0FBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWY7OztBQUplLFlBT2YsQ0FBSyxPQUFMLENBQWEsRUFBYixHQUFrQixLQUFLLEVBQUw7OztBQVBILGdCQVVmLENBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxPQUFMLENBQTFCOzs7QUFWZSxZQWFmLENBQUssR0FBTCxHQUFXLG1CQUFJLEtBQUssRUFBTCxDQUFmOzs7QUFiZSxZQWdCZixDQUFLLEtBQUwsR0FoQmU7S0FBWjs7Ozs7QUFzQlAsV0FBTyxpQkFBWTtBQUNmLGdCQUFRLEtBQVIsQ0FBYyx1Q0FBZCxFQURlO0tBQVo7Ozs7OztBQVFQLFVBQU0sZ0JBQVk7QUFDZCxlQUFPLEtBQUssR0FBTCxDQURPO0tBQVo7O0NBbkNWOzs7QUNKQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsaURBQXdCOzs7QUFHckMsUUFBSSxZQUFKOzs7QUFHQSxZQUFRLEVBQVI7Ozs7O0FBS0EsV0FBTyxpQkFBWTtBQUNmLFlBQUksT0FBTyxJQUFQO1lBQ0EsUUFBUSxHQUFSLENBRlc7O0FBSWYsYUFBSyxNQUFMLENBQVksSUFBWixHQUFtQixLQUFLLElBQUwsR0FBWSxJQUFaLENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLENBQW5CLENBSmU7O0FBTWYsb0JBQVksWUFBWTtBQUNwQixvQkFEb0I7QUFFcEIsaUJBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsS0FBakIsQ0FBdUIsS0FBdkIsRUFGb0I7U0FBWixFQUdULElBSEgsRUFOZTtLQUFaOztDQVhNLENBQWpCOzs7QUNMQTs7Ozs7Ozs7QUFJQSxJQUFJLFNBQVMsRUFBVDs7O0FBR0osT0FBTyxJQUFQLENBQVksUUFBUSxxQkFBUixDQUFaOzs7QUFHQSx1QkFBVSxNQUFWLEVBQWtCLFVBQUMsS0FBRCxFQUFXO0FBQ3pCLGVBQVcsWUFBWTtBQUNuQixjQUFNLEtBQU4sR0FEbUI7S0FBWixFQUVSLENBRkgsRUFEeUI7Q0FBWCxDQUFsQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2g7XG4iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBgaWRlbnRpdHlgIGlmIGl0J3Mgbm90IGEgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5LWxpa2Ugb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQ2FzdEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlIDogaWRlbnRpdHk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNhc3RGdW5jdGlvbjtcbiIsInZhciBiYXNlRm9yT3duID0gcmVxdWlyZSgnLi9fYmFzZUZvck93bicpLFxuICAgIGNyZWF0ZUJhc2VFYWNoID0gcmVxdWlyZSgnLi9fY3JlYXRlQmFzZUVhY2gnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqL1xudmFyIGJhc2VFYWNoID0gY3JlYXRlQmFzZUVhY2goYmFzZUZvck93bik7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUVhY2g7XG4iLCJ2YXIgY3JlYXRlQmFzZUZvciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcbiIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9fYmFzZUZvcicpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JPd247XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGtleSBUaGUga2V5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSGFzKG9iamVjdCwga2V5KSB7XG4gIC8vIEF2b2lkIGEgYnVnIGluIElFIDEwLTExIHdoZXJlIG9iamVjdHMgd2l0aCBhIFtbUHJvdG90eXBlXV0gb2YgYG51bGxgLFxuICAvLyB0aGF0IGFyZSBjb21wb3NlZCBlbnRpcmVseSBvZiBpbmRleCBwcm9wZXJ0aWVzLCByZXR1cm4gYGZhbHNlYCBmb3JcbiAgLy8gYGhhc093blByb3BlcnR5YCBjaGVja3Mgb2YgdGhlbS5cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpIHx8XG4gICAgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcgJiYga2V5IGluIG9iamVjdCAmJiBnZXRQcm90b3R5cGVPZihvYmplY3QpID09PSBudWxsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSGFzO1xuIiwiLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHNraXAgdGhlIGNvbnN0cnVjdG9yXG4gKiBwcm9wZXJ0eSBvZiBwcm90b3R5cGVzIG9yIHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICByZXR1cm4gbmF0aXZlS2V5cyhPYmplY3Qob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUtleXM7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQcm9wZXJ0eTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRpbWVzO1xuIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgYmFzZUVhY2hgIG9yIGBiYXNlRWFjaFJpZ2h0YCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VFYWNoKGVhY2hGdW5jLCBmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuICAgIGlmICghaXNBcnJheUxpa2UoY29sbGVjdGlvbikpIHtcbiAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VFYWNoO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQmFzZUZvcjtcbiIsInZhciBiYXNlUHJvcGVydHkgPSByZXF1aXJlKCcuL19iYXNlUHJvcGVydHknKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMZW5ndGg7XG4iLCJ2YXIgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzU3RyaW5nID0gcmVxdWlyZSgnLi9pc1N0cmluZycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgaW5kZXgga2V5cyBmb3IgYG9iamVjdGAgdmFsdWVzIG9mIGFycmF5cyxcbiAqIGBhcmd1bWVudHNgIG9iamVjdHMsIGFuZCBzdHJpbmdzLCBvdGhlcndpc2UgYG51bGxgIGlzIHJldHVybmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gUmV0dXJucyBpbmRleCBrZXlzLCBlbHNlIGBudWxsYC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhLZXlzKG9iamVjdCkge1xuICB2YXIgbGVuZ3RoID0gb2JqZWN0ID8gb2JqZWN0Lmxlbmd0aCA6IHVuZGVmaW5lZDtcbiAgaWYgKGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNTdHJpbmcob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSkge1xuICAgIHJldHVybiBiYXNlVGltZXMobGVuZ3RoLCBTdHJpbmcpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluZGV4S2V5cztcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpID8gK3ZhbHVlIDogLTE7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Byb3RvdHlwZTtcbiIsInZhciBhcnJheUVhY2ggPSByZXF1aXJlKCcuL19hcnJheUVhY2gnKSxcbiAgICBiYXNlQ2FzdEZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYmFzZUNhc3RGdW5jdGlvbicpLFxuICAgIGJhc2VFYWNoID0gcmVxdWlyZSgnLi9fYmFzZUVhY2gnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5Jyk7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogQXMgd2l0aCBvdGhlciBcIkNvbGxlY3Rpb25zXCIgbWV0aG9kcywgb2JqZWN0cyB3aXRoIGEgXCJsZW5ndGhcIiBwcm9wZXJ0eVxuICogYXJlIGl0ZXJhdGVkIGxpa2UgYXJyYXlzLiBUbyBhdm9pZCB0aGlzIGJlaGF2aW9yIHVzZSBgXy5mb3JJbmAgb3IgYF8uZm9yT3duYFxuICogZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBlYWNoXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXyhbMSwgMl0pLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAqICAgY29uc29sZS5sb2codmFsdWUpO1xuICogfSk7XG4gKiAvLyA9PiBsb2dzIGAxYCB0aGVuIGAyYFxuICpcbiAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gbG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICByZXR1cm4gKHR5cGVvZiBpdGVyYXRlZSA9PSAnZnVuY3Rpb24nICYmIGlzQXJyYXkoY29sbGVjdGlvbikpXG4gICAgPyBhcnJheUVhY2goY29sbGVjdGlvbiwgaXRlcmF0ZWUpXG4gICAgOiBiYXNlRWFjaChjb2xsZWN0aW9uLCBiYXNlQ2FzdEZ1bmN0aW9uKGl0ZXJhdGVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgZ2l2ZW4gdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcbiIsInZhciBpc0FycmF5TGlrZU9iamVjdCA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2VPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgaW5jb3JyZWN0bHkgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBnZXRMZW5ndGggPSByZXF1aXJlKCcuL19nZXRMZW5ndGgnKSxcbiAgICBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2U7XG4iLCJ2YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2VPYmplY3Q7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOCB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgd2VhayBtYXAgY29uc3RydWN0b3JzLFxuICAvLyBhbmQgUGhhbnRvbUpTIDEuOSB3aGljaCByZXR1cm5zICdmdW5jdGlvbicgZm9yIGBOb2RlTGlzdGAgaW5zdGFuY2VzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgbG9vc2VseSBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN0cmluZ2AgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N0cmluZygnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N0cmluZygxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHxcbiAgICAoIWlzQXJyYXkodmFsdWUpICYmIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3RyaW5nVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N0cmluZztcbiIsInZhciBiYXNlSGFzID0gcmVxdWlyZSgnLi9fYmFzZUhhcycpLFxuICAgIGJhc2VLZXlzID0gcmVxdWlyZSgnLi9fYmFzZUtleXMnKSxcbiAgICBpbmRleEtleXMgPSByZXF1aXJlKCcuL19pbmRleEtleXMnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzUHJvdG90eXBlID0gcmVxdWlyZSgnLi9faXNQcm90b3R5cGUnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpO1xuICBpZiAoIShpc1Byb3RvIHx8IGlzQXJyYXlMaWtlKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIGJhc2VLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIGluZGV4ZXMgPSBpbmRleEtleXMob2JqZWN0KSxcbiAgICAgIHNraXBJbmRleGVzID0gISFpbmRleGVzLFxuICAgICAgcmVzdWx0ID0gaW5kZXhlcyB8fCBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChiYXNlSGFzKG9iamVjdCwga2V5KSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSAmJlxuICAgICAgICAhKGlzUHJvdG8gJiYga2V5ID09ICdjb25zdHJ1Y3RvcicpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyogc3ZnLmpzIDEuMS4wLTUtZ2M2NmQyNGEgLSBzdmcgc2VsZWN0b3IgaW52ZW50b3IgcG9seWZpbGwgcmVnZXggZGVmYXVsdCBjb2xvciBhcnJheSBwb2ludGFycmF5IHBhdGhhcnJheSBudW1iZXIgdmlld2JveCBiYm94IHJib3ggZWxlbWVudCBwYXJlbnQgY29udGFpbmVyIGZ4IHJlbGF0aXZlIGV2ZW50IGRlZnMgZ3JvdXAgYXJyYW5nZSBtYXNrIGNsaXAgZ3JhZGllbnQgcGF0dGVybiBkb2Mgc2hhcGUgc3ltYm9sIHVzZSByZWN0IGVsbGlwc2UgbGluZSBwb2x5IHBhdGggaW1hZ2UgdGV4dCB0ZXh0cGF0aCBuZXN0ZWQgaHlwZXJsaW5rIG1hcmtlciBzdWdhciBzZXQgZGF0YSBtZW1vcnkgaGVscGVycyAtIHN2Z2pzLmNvbS9saWNlbnNlICovXHJcbjsoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xyXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgIGRlZmluZShmYWN0b3J5KTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJvb3QuU1ZHID0gZmFjdG9yeSgpO1xyXG4gIH1cclxufSh0aGlzLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgdmFyIFNWRyA9IHRoaXMuU1ZHID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgaWYgKFNWRy5zdXBwb3J0ZWQpIHtcclxuICAgICAgZWxlbWVudCA9IG5ldyBTVkcuRG9jKGVsZW1lbnQpXHJcbiAgXHJcbiAgICAgIGlmICghU1ZHLnBhcnNlcilcclxuICAgICAgICBTVkcucHJlcGFyZShlbGVtZW50KVxyXG4gIFxyXG4gICAgICByZXR1cm4gZWxlbWVudFxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyBEZWZhdWx0IG5hbWVzcGFjZXNcclxuICBTVkcubnMgICAgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXHJcbiAgU1ZHLnhtbG5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJ1xyXG4gIFNWRy54bGluayA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJ1xyXG4gIFxyXG4gIC8vIEVsZW1lbnQgaWQgc2VxdWVuY2VcclxuICBTVkcuZGlkICA9IDEwMDBcclxuICBcclxuICAvLyBHZXQgbmV4dCBuYW1lZCBlbGVtZW50IGlkXHJcbiAgU1ZHLmVpZCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIHJldHVybiAnU3ZnanMnICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSkgKyAoU1ZHLmRpZCsrKVxyXG4gIH1cclxuICBcclxuICAvLyBNZXRob2QgZm9yIGVsZW1lbnQgY3JlYXRpb25cclxuICBTVkcuY3JlYXRlID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgLyogY3JlYXRlIGVsZW1lbnQgKi9cclxuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHRoaXMubnMsIG5hbWUpXHJcbiAgICBcclxuICAgIC8qIGFwcGx5IHVuaXF1ZSBpZCAqL1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5laWQobmFtZSkpXHJcbiAgICBcclxuICAgIHJldHVybiBlbGVtZW50XHJcbiAgfVxyXG4gIFxyXG4gIC8vIE1ldGhvZCBmb3IgZXh0ZW5kaW5nIG9iamVjdHNcclxuICBTVkcuZXh0ZW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbW9kdWxlcywgbWV0aG9kcywga2V5LCBpXHJcbiAgICBcclxuICAgIC8qIGdldCBsaXN0IG9mIG1vZHVsZXMgKi9cclxuICAgIG1vZHVsZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcclxuICAgIFxyXG4gICAgLyogZ2V0IG9iamVjdCB3aXRoIGV4dGVuc2lvbnMgKi9cclxuICAgIG1ldGhvZHMgPSBtb2R1bGVzLnBvcCgpXHJcbiAgICBcclxuICAgIGZvciAoaSA9IG1vZHVsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgIGlmIChtb2R1bGVzW2ldKVxyXG4gICAgICAgIGZvciAoa2V5IGluIG1ldGhvZHMpXHJcbiAgICAgICAgICBtb2R1bGVzW2ldLnByb3RvdHlwZVtrZXldID0gbWV0aG9kc1trZXldXHJcbiAgXHJcbiAgICAvKiBtYWtlIHN1cmUgU1ZHLlNldCBpbmhlcml0cyBhbnkgbmV3bHkgYWRkZWQgbWV0aG9kcyAqL1xyXG4gICAgaWYgKFNWRy5TZXQgJiYgU1ZHLlNldC5pbmhlcml0KVxyXG4gICAgICBTVkcuU2V0LmluaGVyaXQoKVxyXG4gIH1cclxuICBcclxuICAvLyBJbml0aWFsaXplIHBhcnNpbmcgZWxlbWVudFxyXG4gIFNWRy5wcmVwYXJlID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgLyogc2VsZWN0IGRvY3VtZW50IGJvZHkgYW5kIGNyZWF0ZSBpbnZpc2libGUgc3ZnIGVsZW1lbnQgKi9cclxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxyXG4gICAgICAsIGRyYXcgPSAoYm9keSA/IG5ldyBTVkcuRG9jKGJvZHkpIDogZWxlbWVudC5uZXN0ZWQoKSkuc2l6ZSgyLCAwKVxyXG4gICAgICAsIHBhdGggPSBTVkcuY3JlYXRlKCdwYXRoJylcclxuICBcclxuICAgIC8qIGluc2VydCBwYXJzZXJzICovXHJcbiAgICBkcmF3Lm5vZGUuYXBwZW5kQ2hpbGQocGF0aClcclxuICBcclxuICAgIC8qIGNyZWF0ZSBwYXJzZXIgb2JqZWN0ICovXHJcbiAgICBTVkcucGFyc2VyID0ge1xyXG4gICAgICBib2R5OiBib2R5IHx8IGVsZW1lbnQucGFyZW50XHJcbiAgICAsIGRyYXc6IGRyYXcuc3R5bGUoJ29wYWNpdHk6MDtwb3NpdGlvbjpmaXhlZDtsZWZ0OjEwMCU7dG9wOjEwMCU7b3ZlcmZsb3c6aGlkZGVuJylcclxuICAgICwgcG9seTogZHJhdy5wb2x5bGluZSgpLm5vZGVcclxuICAgICwgcGF0aDogcGF0aFxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyBzdmcgc3VwcG9ydCB0ZXN0XHJcbiAgU1ZHLnN1cHBvcnRlZCA9IChmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAhISBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiZcclxuICAgICAgICAgICAhISBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHLm5zLCdzdmcnKS5jcmVhdGVTVkdSZWN0XHJcbiAgfSkoKVxyXG4gIFxyXG4gIGlmICghU1ZHLnN1cHBvcnRlZCkgcmV0dXJuIGZhbHNlXHJcblxyXG5cclxuICBTVkcuZ2V0ID0gZnVuY3Rpb24oaWQpIHtcclxuICAgIHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRGcm9tUmVmZXJlbmNlKGlkKSB8fCBpZClcclxuICAgIGlmIChub2RlKSByZXR1cm4gbm9kZS5pbnN0YW5jZVxyXG4gIH1cclxuXHJcbiAgU1ZHLmludmVudCA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gIFx0LyogY3JlYXRlIGVsZW1lbnQgaW5pdGlhbGl6ZXIgKi9cclxuICBcdHZhciBpbml0aWFsaXplciA9IHR5cGVvZiBjb25maWcuY3JlYXRlID09ICdmdW5jdGlvbicgP1xyXG4gIFx0XHRjb25maWcuY3JlYXRlIDpcclxuICBcdFx0ZnVuY3Rpb24oKSB7XHJcbiAgXHRcdFx0dGhpcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIFNWRy5jcmVhdGUoY29uZmlnLmNyZWF0ZSkpXHJcbiAgXHRcdH1cclxuICBcclxuICBcdC8qIGluaGVyaXQgcHJvdG90eXBlICovXHJcbiAgXHRpZiAoY29uZmlnLmluaGVyaXQpXHJcbiAgXHRcdGluaXRpYWxpemVyLnByb3RvdHlwZSA9IG5ldyBjb25maWcuaW5oZXJpdFxyXG4gIFxyXG4gIFx0LyogZXh0ZW5kIHdpdGggbWV0aG9kcyAqL1xyXG4gIFx0aWYgKGNvbmZpZy5leHRlbmQpXHJcbiAgXHRcdFNWRy5leHRlbmQoaW5pdGlhbGl6ZXIsIGNvbmZpZy5leHRlbmQpXHJcbiAgXHJcbiAgXHQvKiBhdHRhY2ggY29uc3RydWN0IG1ldGhvZCB0byBwYXJlbnQgKi9cclxuICBcdGlmIChjb25maWcuY29uc3RydWN0KVxyXG4gIFx0XHRTVkcuZXh0ZW5kKGNvbmZpZy5wYXJlbnQgfHwgU1ZHLkNvbnRhaW5lciwgY29uZmlnLmNvbnN0cnVjdClcclxuICBcclxuICBcdHJldHVybiBpbml0aWFsaXplclxyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgLy8gQ29kZSBmcm9tOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnRcclxuICAgIHZhciBDdXN0b21FdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBvcHRpb25zKSB7XHJcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9XHJcbiAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcclxuICAgICAgZS5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIG9wdGlvbnMuYnViYmxlcywgb3B0aW9ucy5jYW5jZWxhYmxlLCBvcHRpb25zLmRldGFpbClcclxuICAgICAgcmV0dXJuIGVcclxuICAgIH1cclxuICBcclxuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGVcclxuICBcclxuICAgIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50XHJcbiAgfVxyXG4gIFxyXG4gIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSAvIGNhbmNlbEFuaW1hdGlvbkZyYW1lIFBvbHlmaWxsIHdpdGggZmFsbGJhY2sgYmFzZWQgb24gUGF1bCBJcmlzaFxyXG4gIChmdW5jdGlvbih3KSB7XHJcbiAgICB2YXIgbGFzdFRpbWUgPSAwXHJcbiAgICB2YXIgdmVuZG9ycyA9IFsnbW96JywgJ3dlYmtpdCddXHJcbiAgICBcclxuICAgIGZvcih2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XHJcbiAgICAgIHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddXHJcbiAgICAgIHcuY2FuY2VsQW5pbWF0aW9uRnJhbWUgID0gd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ11cclxuICAgIH1cclxuICAgXHJcbiAgICB3LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IFxyXG4gICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSlcclxuICAgICAgICBcclxuICAgICAgICB2YXIgaWQgPSB3LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpXHJcbiAgICAgICAgfSwgdGltZVRvQ2FsbClcclxuICAgICAgICBcclxuICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbFxyXG4gICAgICAgIHJldHVybiBpZFxyXG4gICAgICB9XHJcbiAgIFxyXG4gICAgdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHcuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgdy5jbGVhclRpbWVvdXQ7XHJcbiAgXHJcbiAgfSh3aW5kb3cpKVxyXG5cclxuICBTVkcucmVnZXggPSB7XHJcbiAgICAvKiBwYXJzZSB1bml0IHZhbHVlICovXHJcbiAgICB1bml0OiAgICAgICAgIC9eKC0/W1xcZFxcLl0rKShbYS16JV17MCwyfSkkL1xyXG4gICAgXHJcbiAgICAvKiBwYXJzZSBoZXggdmFsdWUgKi9cclxuICAsIGhleDogICAgICAgICAgL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaVxyXG4gICAgXHJcbiAgICAvKiBwYXJzZSByZ2IgdmFsdWUgKi9cclxuICAsIHJnYjogICAgICAgICAgL3JnYlxcKChcXGQrKSwoXFxkKyksKFxcZCspXFwpL1xyXG4gICAgXHJcbiAgICAvKiBwYXJzZSByZWZlcmVuY2UgaWQgKi9cclxuICAsIHJlZmVyZW5jZTogICAgLyMoW2EtejAtOVxcLV9dKykvaVxyXG4gIFxyXG4gICAgLyogdGVzdCBoZXggdmFsdWUgKi9cclxuICAsIGlzSGV4OiAgICAgICAgL14jW2EtZjAtOV17Myw2fSQvaVxyXG4gICAgXHJcbiAgICAvKiB0ZXN0IHJnYiB2YWx1ZSAqL1xyXG4gICwgaXNSZ2I6ICAgICAgICAvXnJnYlxcKC9cclxuICAgIFxyXG4gICAgLyogdGVzdCBjc3MgZGVjbGFyYXRpb24gKi9cclxuICAsIGlzQ3NzOiAgICAgICAgL1teOl0rOlteO10rOz8vXHJcbiAgICBcclxuICAgIC8qIHRlc3QgZm9yIGJsYW5rIHN0cmluZyAqL1xyXG4gICwgaXNCbGFuazogICAgICAvXihcXHMrKT8kL1xyXG4gICAgXHJcbiAgICAvKiB0ZXN0IGZvciBudW1lcmljIHN0cmluZyAqL1xyXG4gICwgaXNOdW1iZXI6ICAgICAvXi0/W1xcZFxcLl0rJC9cclxuICBcclxuICAgIC8qIHRlc3QgZm9yIHBlcmNlbnQgdmFsdWUgKi9cclxuICAsIGlzUGVyY2VudDogICAgL14tP1tcXGRcXC5dKyUkL1xyXG4gIFxyXG4gICAgLyogdGVzdCBmb3IgaW1hZ2UgdXJsICovXHJcbiAgLCBpc0ltYWdlOiAgICAgIC9cXC4oanBnfGpwZWd8cG5nfGdpZikoXFw/W149XSsuKik/L2lcclxuICAgIFxyXG4gICAgLyogdGVzdCBmb3IgbmFtZXNwYWNlZCBldmVudCAqL1xyXG4gICwgaXNFdmVudDogICAgICAvXltcXHddKy5bXFx3XSskL1xyXG4gIFxyXG4gICAgLy8gVGhlIGZvbGxvd2luZyByZWdleCBhcmUgdXNlZCB0byBwYXJzZSB0aGUgZCBhdHRyaWJ1dGUgb2YgYSBwYXRoXHJcbiAgXHJcbiAgICAvLyBSZXBsYWNlcyBhbGwgbmVnYXRpdmUgZXhwb25lbnRzXHJcbiAgLCBuZWdFeHA6ICAgICAgICAgICAvZVxcLS9naVxyXG4gIFxyXG4gICAgLy8gUmVwbGFjZXMgYWxsIGNvbW1hXHJcbiAgLCBjb21tYTogICAgICAgICAgICAvLC9nXHJcbiAgXHJcbiAgICAvLyBSZXBsYWNlcyBhbGwgaHlwaGVuc1xyXG4gICwgaHlwaGVuOiAgICAgICAgICAgL1xcLS9nXHJcbiAgXHJcbiAgICAvLyBSZXBsYWNlcyBhbmQgdGVzdHMgZm9yIGFsbCBwYXRoIGxldHRlcnNcclxuICAsIHBhdGhMZXR0ZXJzOiAgICAgIC9bTUxIVkNTUVRBWl0vZ2lcclxuICBcclxuICAgIC8vIHllcyB3ZSBuZWVkIHRoaXMgb25lLCB0b29cclxuICAsIGlzUGF0aExldHRlcjogICAgIC9bTUxIVkNTUVRBWl0vaVxyXG4gIFxyXG4gICAgLy8gc3BsaXQgYXQgd2hpdGVzcGFjZXNcclxuICAsIHdoaXRlc3BhY2VzOiAgICAgIC9cXHMrL1xyXG4gIFxyXG4gICAgLy8gbWF0Y2hlcyBYXHJcbiAgLCBYOiAgICAgICAgICAgICAgICAvWC9nXHJcbiAgfVxyXG5cclxuICBTVkcuZGVmYXVsdHMgPSB7XHJcbiAgICAvLyBEZWZhdWx0IG1hdHJpeFxyXG4gICAgbWF0cml4OiAgICAgICAnMSAwIDAgMSAwIDAnXHJcbiAgICBcclxuICAgIC8vIERlZmF1bHQgYXR0cmlidXRlIHZhbHVlc1xyXG4gICwgYXR0cnM6IHtcclxuICAgICAgLyogZmlsbCBhbmQgc3Ryb2tlICovXHJcbiAgICAgICdmaWxsLW9wYWNpdHknOiAgICAgMVxyXG4gICAgLCAnc3Ryb2tlLW9wYWNpdHknOiAgIDFcclxuICAgICwgJ3N0cm9rZS13aWR0aCc6ICAgICAwXHJcbiAgICAsICdzdHJva2UtbGluZWpvaW4nOiAgJ21pdGVyJ1xyXG4gICAgLCAnc3Ryb2tlLWxpbmVjYXAnOiAgICdidXR0J1xyXG4gICAgLCBmaWxsOiAgICAgICAgICAgICAgICcjMDAwMDAwJ1xyXG4gICAgLCBzdHJva2U6ICAgICAgICAgICAgICcjMDAwMDAwJ1xyXG4gICAgLCBvcGFjaXR5OiAgICAgICAgICAgIDFcclxuICAgICAgLyogcG9zaXRpb24gKi9cclxuICAgICwgeDogICAgICAgICAgICAgICAgICAwXHJcbiAgICAsIHk6ICAgICAgICAgICAgICAgICAgMFxyXG4gICAgLCBjeDogICAgICAgICAgICAgICAgIDBcclxuICAgICwgY3k6ICAgICAgICAgICAgICAgICAwXHJcbiAgICAgIC8qIHNpemUgKi8gIFxyXG4gICAgLCB3aWR0aDogICAgICAgICAgICAgIDBcclxuICAgICwgaGVpZ2h0OiAgICAgICAgICAgICAwXHJcbiAgICAgIC8qIHJhZGl1cyAqLyAgXHJcbiAgICAsIHI6ICAgICAgICAgICAgICAgICAgMFxyXG4gICAgLCByeDogICAgICAgICAgICAgICAgIDBcclxuICAgICwgcnk6ICAgICAgICAgICAgICAgICAwXHJcbiAgICAgIC8qIGdyYWRpZW50ICovICBcclxuICAgICwgb2Zmc2V0OiAgICAgICAgICAgICAwXHJcbiAgICAsICdzdG9wLW9wYWNpdHknOiAgICAgMVxyXG4gICAgLCAnc3RvcC1jb2xvcic6ICAgICAgICcjMDAwMDAwJ1xyXG4gICAgICAvKiB0ZXh0ICovXHJcbiAgICAsICdmb250LXNpemUnOiAgICAgICAgMTZcclxuICAgICwgJ2ZvbnQtZmFtaWx5JzogICAgICAnSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZidcclxuICAgICwgJ3RleHQtYW5jaG9yJzogICAgICAnc3RhcnQnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIERlZmF1bHQgdHJhbnNmb3JtYXRpb24gdmFsdWVzXHJcbiAgLCB0cmFuczogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLyogdHJhbnNsYXRlICovXHJcbiAgICAgICAgeDogICAgICAgIDBcclxuICAgICAgLCB5OiAgICAgICAgMFxyXG4gICAgICAgIC8qIHNjYWxlICovXHJcbiAgICAgICwgc2NhbGVYOiAgIDFcclxuICAgICAgLCBzY2FsZVk6ICAgMVxyXG4gICAgICAgIC8qIHJvdGF0ZSAqL1xyXG4gICAgICAsIHJvdGF0aW9uOiAwXHJcbiAgICAgICAgLyogc2tldyAqL1xyXG4gICAgICAsIHNrZXdYOiAgICAwXHJcbiAgICAgICwgc2tld1k6ICAgIDBcclxuICAgICAgICAvKiBtYXRyaXggKi9cclxuICAgICAgLCBtYXRyaXg6ICAgdGhpcy5tYXRyaXhcclxuICAgICAgLCBhOiAgICAgICAgMVxyXG4gICAgICAsIGI6ICAgICAgICAwXHJcbiAgICAgICwgYzogICAgICAgIDBcclxuICAgICAgLCBkOiAgICAgICAgMVxyXG4gICAgICAsIGU6ICAgICAgICAwXHJcbiAgICAgICwgZjogICAgICAgIDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBTVkcuQ29sb3IgPSBmdW5jdGlvbihjb2xvcikge1xyXG4gICAgdmFyIG1hdGNoXHJcbiAgICBcclxuICAgIC8qIGluaXRpYWxpemUgZGVmYXVsdHMgKi9cclxuICAgIHRoaXMuciA9IDBcclxuICAgIHRoaXMuZyA9IDBcclxuICAgIHRoaXMuYiA9IDBcclxuICAgIFxyXG4gICAgLyogcGFyc2UgY29sb3IgKi9cclxuICAgIGlmICh0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGlmIChTVkcucmVnZXguaXNSZ2IudGVzdChjb2xvcikpIHtcclxuICAgICAgICAvKiBnZXQgcmdiIHZhbHVlcyAqL1xyXG4gICAgICAgIG1hdGNoID0gU1ZHLnJlZ2V4LnJnYi5leGVjKGNvbG9yLnJlcGxhY2UoL1xccy9nLCcnKSlcclxuICAgICAgICBcclxuICAgICAgICAvKiBwYXJzZSBudW1lcmljIHZhbHVlcyAqL1xyXG4gICAgICAgIHRoaXMuciA9IHBhcnNlSW50KG1hdGNoWzFdKVxyXG4gICAgICAgIHRoaXMuZyA9IHBhcnNlSW50KG1hdGNoWzJdKVxyXG4gICAgICAgIHRoaXMuYiA9IHBhcnNlSW50KG1hdGNoWzNdKVxyXG4gICAgICAgIFxyXG4gICAgICB9IGVsc2UgaWYgKFNWRy5yZWdleC5pc0hleC50ZXN0KGNvbG9yKSkge1xyXG4gICAgICAgIC8qIGdldCBoZXggdmFsdWVzICovXHJcbiAgICAgICAgbWF0Y2ggPSBTVkcucmVnZXguaGV4LmV4ZWMoZnVsbEhleChjb2xvcikpXHJcbiAgXHJcbiAgICAgICAgLyogcGFyc2UgbnVtZXJpYyB2YWx1ZXMgKi9cclxuICAgICAgICB0aGlzLnIgPSBwYXJzZUludChtYXRjaFsxXSwgMTYpXHJcbiAgICAgICAgdGhpcy5nID0gcGFyc2VJbnQobWF0Y2hbMl0sIDE2KVxyXG4gICAgICAgIHRoaXMuYiA9IHBhcnNlSW50KG1hdGNoWzNdLCAxNilcclxuICBcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbG9yID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLnIgPSBjb2xvci5yXHJcbiAgICAgIHRoaXMuZyA9IGNvbG9yLmdcclxuICAgICAgdGhpcy5iID0gY29sb3IuYlxyXG4gICAgICBcclxuICAgIH1cclxuICAgICAgXHJcbiAgfVxyXG4gIFxyXG4gIFNWRy5leHRlbmQoU1ZHLkNvbG9yLCB7XHJcbiAgICAvLyBEZWZhdWx0IHRvIGhleCBjb252ZXJzaW9uXHJcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRvSGV4KClcclxuICAgIH1cclxuICAgIC8vIEJ1aWxkIGhleCB2YWx1ZVxyXG4gICwgdG9IZXg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gJyMnXHJcbiAgICAgICAgKyBjb21wVG9IZXgodGhpcy5yKVxyXG4gICAgICAgICsgY29tcFRvSGV4KHRoaXMuZylcclxuICAgICAgICArIGNvbXBUb0hleCh0aGlzLmIpXHJcbiAgICB9XHJcbiAgICAvLyBCdWlsZCByZ2IgdmFsdWVcclxuICAsIHRvUmdiOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuICdyZ2IoJyArIFt0aGlzLnIsIHRoaXMuZywgdGhpcy5iXS5qb2luKCkgKyAnKSdcclxuICAgIH1cclxuICAgIC8vIENhbGN1bGF0ZSB0cnVlIGJyaWdodG5lc3NcclxuICAsIGJyaWdodG5lc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gKHRoaXMuciAvIDI1NSAqIDAuMzApXHJcbiAgICAgICAgICAgKyAodGhpcy5nIC8gMjU1ICogMC41OSlcclxuICAgICAgICAgICArICh0aGlzLmIgLyAyNTUgKiAwLjExKVxyXG4gICAgfVxyXG4gICAgLy8gTWFrZSBjb2xvciBtb3JwaGFibGVcclxuICAsIG1vcnBoOiBmdW5jdGlvbihjb2xvcikge1xyXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFNWRy5Db2xvcihjb2xvcilcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIEdldCBtb3JwaGVkIGNvbG9yIGF0IGdpdmVuIHBvc2l0aW9uXHJcbiAgLCBhdDogZnVuY3Rpb24ocG9zKSB7XHJcbiAgICAgIC8qIG1ha2Ugc3VyZSBhIGRlc3RpbmF0aW9uIGlzIGRlZmluZWQgKi9cclxuICAgICAgaWYgKCF0aGlzLmRlc3RpbmF0aW9uKSByZXR1cm4gdGhpc1xyXG4gIFxyXG4gICAgICAvKiBub3JtYWxpc2UgcG9zICovXHJcbiAgICAgIHBvcyA9IHBvcyA8IDAgPyAwIDogcG9zID4gMSA/IDEgOiBwb3NcclxuICBcclxuICAgICAgLyogZ2VuZXJhdGUgbW9ycGhlZCBjb2xvciAqL1xyXG4gICAgICByZXR1cm4gbmV3IFNWRy5Db2xvcih7XHJcbiAgICAgICAgcjogfn4odGhpcy5yICsgKHRoaXMuZGVzdGluYXRpb24uciAtIHRoaXMucikgKiBwb3MpXHJcbiAgICAgICwgZzogfn4odGhpcy5nICsgKHRoaXMuZGVzdGluYXRpb24uZyAtIHRoaXMuZykgKiBwb3MpXHJcbiAgICAgICwgYjogfn4odGhpcy5iICsgKHRoaXMuZGVzdGluYXRpb24uYiAtIHRoaXMuYikgKiBwb3MpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG4gIFxyXG4gIC8vIFRlc3RlcnNcclxuICBcclxuICAvLyBUZXN0IGlmIGdpdmVuIHZhbHVlIGlzIGEgY29sb3Igc3RyaW5nXHJcbiAgU1ZHLkNvbG9yLnRlc3QgPSBmdW5jdGlvbihjb2xvcikge1xyXG4gICAgY29sb3IgKz0gJydcclxuICAgIHJldHVybiBTVkcucmVnZXguaXNIZXgudGVzdChjb2xvcilcclxuICAgICAgICB8fCBTVkcucmVnZXguaXNSZ2IudGVzdChjb2xvcilcclxuICB9XHJcbiAgXHJcbiAgLy8gVGVzdCBpZiBnaXZlbiB2YWx1ZSBpcyBhIHJnYiBvYmplY3RcclxuICBTVkcuQ29sb3IuaXNSZ2IgPSBmdW5jdGlvbihjb2xvcikge1xyXG4gICAgcmV0dXJuIGNvbG9yICYmIHR5cGVvZiBjb2xvci5yID09ICdudW1iZXInXHJcbiAgICAgICAgICAgICAgICAgJiYgdHlwZW9mIGNvbG9yLmcgPT0gJ251bWJlcidcclxuICAgICAgICAgICAgICAgICAmJiB0eXBlb2YgY29sb3IuYiA9PSAnbnVtYmVyJ1xyXG4gIH1cclxuICBcclxuICAvLyBUZXN0IGlmIGdpdmVuIHZhbHVlIGlzIGEgY29sb3JcclxuICBTVkcuQ29sb3IuaXNDb2xvciA9IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICByZXR1cm4gU1ZHLkNvbG9yLmlzUmdiKGNvbG9yKSB8fCBTVkcuQ29sb3IudGVzdChjb2xvcilcclxuICB9XHJcblxyXG4gIFNWRy5BcnJheSA9IGZ1bmN0aW9uKGFycmF5LCBmYWxsYmFjaykge1xyXG4gICAgYXJyYXkgPSAoYXJyYXkgfHwgW10pLnZhbHVlT2YoKVxyXG4gIFxyXG4gICAgLyogaWYgYXJyYXkgaXMgZW1wdHkgYW5kIGZhbGxiYWNrIGlzIHByb3ZpZGVkLCB1c2UgZmFsbGJhY2sgKi9cclxuICAgIGlmIChhcnJheS5sZW5ndGggPT0gMCAmJiBmYWxsYmFjaylcclxuICAgICAgYXJyYXkgPSBmYWxsYmFjay52YWx1ZU9mKClcclxuICBcclxuICAgIC8qIHBhcnNlIGFycmF5ICovXHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5wYXJzZShhcnJheSlcclxuICB9XHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuQXJyYXksIHtcclxuICAgIC8vIE1ha2UgYXJyYXkgbW9ycGhhYmxlXHJcbiAgICBtb3JwaDogZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IHRoaXMucGFyc2UoYXJyYXkpXHJcbiAgXHJcbiAgICAgIC8qIG5vcm1hbGl6ZSBsZW5ndGggb2YgYXJyYXlzICovXHJcbiAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCAhPSB0aGlzLmRlc3RpbmF0aW9uLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBsYXN0VmFsdWUgICAgICAgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICwgbGFzdERlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvblt0aGlzLmRlc3RpbmF0aW9uLmxlbmd0aCAtIDFdXHJcbiAgXHJcbiAgICAgICAgd2hpbGUodGhpcy52YWx1ZS5sZW5ndGggPiB0aGlzLmRlc3RpbmF0aW9uLmxlbmd0aClcclxuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24ucHVzaChsYXN0RGVzdGluYXRpb24pXHJcbiAgICAgICAgd2hpbGUodGhpcy52YWx1ZS5sZW5ndGggPCB0aGlzLmRlc3RpbmF0aW9uLmxlbmd0aClcclxuICAgICAgICAgIHRoaXMudmFsdWUucHVzaChsYXN0VmFsdWUpXHJcbiAgICAgIH1cclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIENsZWFuIHVwIGFueSBkdXBsaWNhdGUgcG9pbnRzXHJcbiAgLCBzZXR0bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvKiBmaW5kIGFsbCB1bmlxdWUgdmFsdWVzICovXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHRoaXMudmFsdWUubGVuZ3RoLCBzZWVuID0gW107IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGlmIChzZWVuLmluZGV4T2YodGhpcy52YWx1ZVtpXSkgPT0gLTEpXHJcbiAgICAgICAgICBzZWVuLnB1c2godGhpcy52YWx1ZVtpXSlcclxuICBcclxuICAgICAgLyogc2V0IG5ldyB2YWx1ZSAqL1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZSA9IHNlZW5cclxuICAgIH1cclxuICAgIC8vIEdldCBtb3JwaGVkIGFycmF5IGF0IGdpdmVuIHBvc2l0aW9uXHJcbiAgLCBhdDogZnVuY3Rpb24ocG9zKSB7XHJcbiAgICAgIC8qIG1ha2Ugc3VyZSBhIGRlc3RpbmF0aW9uIGlzIGRlZmluZWQgKi9cclxuICAgICAgaWYgKCF0aGlzLmRlc3RpbmF0aW9uKSByZXR1cm4gdGhpc1xyXG4gIFxyXG4gICAgICAvKiBnZW5lcmF0ZSBtb3JwaGVkIGFycmF5ICovXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHRoaXMudmFsdWUubGVuZ3RoLCBhcnJheSA9IFtdOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBhcnJheS5wdXNoKHRoaXMudmFsdWVbaV0gKyAodGhpcy5kZXN0aW5hdGlvbltpXSAtIHRoaXMudmFsdWVbaV0pICogcG9zKVxyXG4gIFxyXG4gICAgICByZXR1cm4gbmV3IFNWRy5BcnJheShhcnJheSlcclxuICAgIH1cclxuICAgIC8vIENvbnZlcnQgYXJyYXkgdG8gc3RyaW5nXHJcbiAgLCB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlLmpvaW4oJyAnKVxyXG4gICAgfVxyXG4gICAgLy8gUmVhbCB2YWx1ZVxyXG4gICwgdmFsdWVPZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXHJcbiAgICB9XHJcbiAgICAvLyBQYXJzZSB3aGl0ZXNwYWNlIHNlcGFyYXRlZCBzdHJpbmdcclxuICAsIHBhcnNlOiBmdW5jdGlvbihhcnJheSkge1xyXG4gICAgICBhcnJheSA9IGFycmF5LnZhbHVlT2YoKVxyXG4gIFxyXG4gICAgICAvKiBpZiBhbHJlYWR5IGlzIGFuIGFycmF5LCBubyBuZWVkIHRvIHBhcnNlIGl0ICovXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFycmF5KSkgcmV0dXJuIGFycmF5XHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzLnNwbGl0KGFycmF5KVxyXG4gICAgfVxyXG4gICAgLy8gU3RyaXAgdW5uZWNlc3Nhcnkgd2hpdGVzcGFjZVxyXG4gICwgc3BsaXQ6IGZ1bmN0aW9uKHN0cmluZykge1xyXG4gICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1xccysvZywgJyAnKS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCcnKS5zcGxpdCgnICcpIFxyXG4gICAgfVxyXG4gICAgLy8gUmV2ZXJzZSBhcnJheVxyXG4gICwgcmV2ZXJzZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMudmFsdWUucmV2ZXJzZSgpXHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuICBcclxuXHJcblxyXG4gIFNWRy5Qb2ludEFycmF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcclxuICB9XHJcbiAgXHJcbiAgLy8gSW5oZXJpdCBmcm9tIFNWRy5BcnJheVxyXG4gIFNWRy5Qb2ludEFycmF5LnByb3RvdHlwZSA9IG5ldyBTVkcuQXJyYXlcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5Qb2ludEFycmF5LCB7XHJcbiAgICAvLyBDb252ZXJ0IGFycmF5IHRvIHN0cmluZ1xyXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvKiBjb252ZXJ0IHRvIGEgcG9seSBwb2ludCBzdHJpbmcgKi9cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdGhpcy52YWx1ZS5sZW5ndGgsIGFycmF5ID0gW107IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGFycmF5LnB1c2godGhpcy52YWx1ZVtpXS5qb2luKCcsJykpXHJcbiAgXHJcbiAgICAgIHJldHVybiBhcnJheS5qb2luKCcgJylcclxuICAgIH1cclxuICAgIC8vIEdldCBtb3JwaGVkIGFycmF5IGF0IGdpdmVuIHBvc2l0aW9uXHJcbiAgLCBhdDogZnVuY3Rpb24ocG9zKSB7XHJcbiAgICAgIC8qIG1ha2Ugc3VyZSBhIGRlc3RpbmF0aW9uIGlzIGRlZmluZWQgKi9cclxuICAgICAgaWYgKCF0aGlzLmRlc3RpbmF0aW9uKSByZXR1cm4gdGhpc1xyXG4gIFxyXG4gICAgICAvKiBnZW5lcmF0ZSBtb3JwaGVkIHBvaW50IHN0cmluZyAqL1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSB0aGlzLnZhbHVlLmxlbmd0aCwgYXJyYXkgPSBbXTsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgYXJyYXkucHVzaChbXHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzBdICsgKHRoaXMuZGVzdGluYXRpb25baV1bMF0gLSB0aGlzLnZhbHVlW2ldWzBdKSAqIHBvc1xyXG4gICAgICAgICwgdGhpcy52YWx1ZVtpXVsxXSArICh0aGlzLmRlc3RpbmF0aW9uW2ldWzFdIC0gdGhpcy52YWx1ZVtpXVsxXSkgKiBwb3NcclxuICAgICAgICBdKVxyXG4gIFxyXG4gICAgICByZXR1cm4gbmV3IFNWRy5Qb2ludEFycmF5KGFycmF5KVxyXG4gICAgfVxyXG4gICAgLy8gUGFyc2UgcG9pbnQgc3RyaW5nXHJcbiAgLCBwYXJzZTogZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgICAgYXJyYXkgPSBhcnJheS52YWx1ZU9mKClcclxuICBcclxuICAgICAgLyogaWYgYWxyZWFkeSBpcyBhbiBhcnJheSwgbm8gbmVlZCB0byBwYXJzZSBpdCAqL1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJheSkpIHJldHVybiBhcnJheVxyXG4gIFxyXG4gICAgICAvKiBzcGxpdCBwb2ludHMgKi9cclxuICAgICAgYXJyYXkgPSB0aGlzLnNwbGl0KGFycmF5KVxyXG4gIFxyXG4gICAgICAvKiBwYXJzZSBwb2ludHMgKi9cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gYXJyYXkubGVuZ3RoLCBwLCBwb2ludHMgPSBbXTsgaSA8IGlsOyBpKyspIHtcclxuICAgICAgICBwID0gYXJyYXlbaV0uc3BsaXQoJywnKVxyXG4gICAgICAgIHBvaW50cy5wdXNoKFtwYXJzZUZsb2F0KHBbMF0pLCBwYXJzZUZsb2F0KHBbMV0pXSlcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICByZXR1cm4gcG9pbnRzXHJcbiAgICB9XHJcbiAgICAvLyBNb3ZlIHBvaW50IHN0cmluZ1xyXG4gICwgbW92ZTogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICB2YXIgYm94ID0gdGhpcy5iYm94KClcclxuICBcclxuICAgICAgLyogZ2V0IHJlbGF0aXZlIG9mZnNldCAqL1xyXG4gICAgICB4IC09IGJveC54XHJcbiAgICAgIHkgLT0gYm94LnlcclxuICBcclxuICAgICAgLyogbW92ZSBldmVyeSBwb2ludCAqL1xyXG4gICAgICBpZiAoIWlzTmFOKHgpICYmICFpc05hTih5KSlcclxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy52YWx1ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV0gPSBbdGhpcy52YWx1ZVtpXVswXSArIHgsIHRoaXMudmFsdWVbaV1bMV0gKyB5XVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gUmVzaXplIHBvbHkgc3RyaW5nXHJcbiAgLCBzaXplOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgIHZhciBpLCBib3ggPSB0aGlzLmJib3goKVxyXG4gIFxyXG4gICAgICAvKiByZWNhbGN1bGF0ZSBwb3NpdGlvbiBvZiBhbGwgcG9pbnRzIGFjY29yZGluZyB0byBuZXcgc2l6ZSAqL1xyXG4gICAgICBmb3IgKGkgPSB0aGlzLnZhbHVlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZVtpXVswXSA9ICgodGhpcy52YWx1ZVtpXVswXSAtIGJveC54KSAqIHdpZHRoKSAgLyBib3gud2lkdGggICsgYm94LnhcclxuICAgICAgICB0aGlzLnZhbHVlW2ldWzFdID0gKCh0aGlzLnZhbHVlW2ldWzFdIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBHZXQgYm91bmRpbmcgYm94IG9mIHBvaW50c1xyXG4gICwgYmJveDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIFNWRy5wYXJzZXIucG9seS5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIHRoaXMudG9TdHJpbmcoKSlcclxuICBcclxuICAgICAgcmV0dXJuIFNWRy5wYXJzZXIucG9seS5nZXRCQm94KClcclxuICAgIH1cclxuICBcclxuICB9KVxyXG5cclxuICBTVkcuUGF0aEFycmF5ID0gZnVuY3Rpb24oYXJyYXksIGZhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgYXJyYXksIGZhbGxiYWNrKVxyXG4gIH1cclxuICBcclxuICAvLyBJbmhlcml0IGZyb20gU1ZHLkFycmF5XHJcbiAgU1ZHLlBhdGhBcnJheS5wcm90b3R5cGUgPSBuZXcgU1ZHLkFycmF5XHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuUGF0aEFycmF5LCB7XHJcbiAgICAvLyBDb252ZXJ0IGFycmF5IHRvIHN0cmluZ1xyXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gYXJyYXlUb1N0cmluZyh0aGlzLnZhbHVlKVxyXG4gICAgfVxyXG4gICAgLy8gTW92ZSBwYXRoIHN0cmluZ1xyXG4gICwgbW92ZTogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAvLyBnZXQgYm91bmRpbmcgYm94IG9mIGN1cnJlbnQgc2l0dWF0aW9uXHJcbiAgICAgIHZhciBib3ggPSB0aGlzLmJib3goKVxyXG4gIFx0XHRcclxuICAgICAgLyogZ2V0IHJlbGF0aXZlIG9mZnNldCAqL1xyXG4gICAgICB4IC09IGJveC54XHJcbiAgICAgIHkgLT0gYm94LnlcclxuICBcclxuICAgICAgLy8gZ2V0IHJlbGF0aXZlIG9mZnNldFxyXG4gICAgICBpZiAoIWlzTmFOKHgpICYmICFpc05hTih5KSkge1xyXG4gICAgICAgIC8vIG1vdmUgZXZlcnkgcG9pbnRcclxuICAgICAgICBmb3IgKHZhciBsLCBpID0gdGhpcy52YWx1ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgbCA9IHRoaXMudmFsdWVbaV1bMF1cclxuICBcclxuICAgICAgICAgIGlmIChsID09ICdNJyB8fCBsID09ICdMJyB8fCBsID09ICdUJykgIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVsxXSArPSB4XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVbaV1bMl0gKz0geVxyXG4gIFxyXG4gICAgICAgICAgfSBlbHNlIGlmIChsID09ICdIJykgIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVsxXSArPSB4XHJcbiAgXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGwgPT0gJ1YnKSAge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzFdICs9IHlcclxuICBcclxuICAgICAgICAgIH0gZWxzZSBpZiAobCA9PSAnQycgfHwgbCA9PSAnUycgfHwgbCA9PSAnUScpICB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVbaV1bMV0gKz0geFxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzJdICs9IHlcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVszXSArPSB4XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVbaV1bNF0gKz0geVxyXG4gIFxyXG4gICAgICAgICAgICBpZiAobCA9PSAnQycpICB7XHJcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVs1XSArPSB4XHJcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVs2XSArPSB5XHJcbiAgICAgICAgICAgIH1cclxuICBcclxuICAgICAgICAgIH0gZWxzZSBpZiAobCA9PSAnQScpICB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVbaV1bNl0gKz0geFxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2ldWzddICs9IHlcclxuICAgICAgICAgIH1cclxuICBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIFJlc2l6ZSBwYXRoIHN0cmluZ1xyXG4gICwgc2l6ZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAvLyBnZXQgYm91bmRpbmcgYm94IG9mIGN1cnJlbnQgc2l0dWF0aW9uXHJcbiAgICAgIHZhciBpLCBsLCBib3ggPSB0aGlzLmJib3goKVxyXG4gIFxyXG4gICAgICAvLyByZWNhbGN1bGF0ZSBwb3NpdGlvbiBvZiBhbGwgcG9pbnRzIGFjY29yZGluZyB0byBuZXcgc2l6ZVxyXG4gICAgICBmb3IgKGkgPSB0aGlzLnZhbHVlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgbCA9IHRoaXMudmFsdWVbaV1bMF1cclxuICBcclxuICAgICAgICBpZiAobCA9PSAnTScgfHwgbCA9PSAnTCcgfHwgbCA9PSAnVCcpICB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzFdID0gKCh0aGlzLnZhbHVlW2ldWzFdIC0gYm94LngpICogd2lkdGgpICAvIGJveC53aWR0aCAgKyBib3gueFxyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXVsyXSA9ICgodGhpcy52YWx1ZVtpXVsyXSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcclxuICBcclxuICAgICAgICB9IGVsc2UgaWYgKGwgPT0gJ0gnKSAge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXVsxXSA9ICgodGhpcy52YWx1ZVtpXVsxXSAtIGJveC54KSAqIHdpZHRoKSAgLyBib3gud2lkdGggICsgYm94LnhcclxuICBcclxuICAgICAgICB9IGVsc2UgaWYgKGwgPT0gJ1YnKSAge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXVsxXSA9ICgodGhpcy52YWx1ZVtpXVsxXSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcclxuICBcclxuICAgICAgICB9IGVsc2UgaWYgKGwgPT0gJ0MnIHx8IGwgPT0gJ1MnIHx8IGwgPT0gJ1EnKSAge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXVsxXSA9ICgodGhpcy52YWx1ZVtpXVsxXSAtIGJveC54KSAqIHdpZHRoKSAgLyBib3gud2lkdGggICsgYm94LnhcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV1bMl0gPSAoKHRoaXMudmFsdWVbaV1bMl0gLSBib3gueSkgKiBoZWlnaHQpIC8gYm94LmhlaWdodCArIGJveC55XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzNdID0gKCh0aGlzLnZhbHVlW2ldWzNdIC0gYm94LngpICogd2lkdGgpICAvIGJveC53aWR0aCAgKyBib3gueFxyXG4gICAgICAgICAgdGhpcy52YWx1ZVtpXVs0XSA9ICgodGhpcy52YWx1ZVtpXVs0XSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcclxuICBcclxuICAgICAgICAgIGlmIChsID09ICdDJykgIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVs1XSA9ICgodGhpcy52YWx1ZVtpXVs1XSAtIGJveC54KSAqIHdpZHRoKSAgLyBib3gud2lkdGggICsgYm94LnhcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtpXVs2XSA9ICgodGhpcy52YWx1ZVtpXVs2XSAtIGJveC55KSAqIGhlaWdodCkgLyBib3guaGVpZ2h0ICsgYm94LnlcclxuICAgICAgICAgIH1cclxuICBcclxuICAgICAgICB9IGVsc2UgaWYgKGwgPT0gJ0EnKSAge1xyXG4gICAgICAgICAgLy8gcmVzaXplIHJhZGlpXHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzFdID0gKHRoaXMudmFsdWVbaV1bMV0gKiB3aWR0aCkgIC8gYm94LndpZHRoXHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzJdID0gKHRoaXMudmFsdWVbaV1bMl0gKiBoZWlnaHQpIC8gYm94LmhlaWdodFxyXG4gIFxyXG4gICAgICAgICAgLy8gbW92ZSBwb3NpdGlvbiB2YWx1ZXNcclxuICAgICAgICAgIHRoaXMudmFsdWVbaV1bNl0gPSAoKHRoaXMudmFsdWVbaV1bNl0gLSBib3gueCkgKiB3aWR0aCkgIC8gYm94LndpZHRoICArIGJveC54XHJcbiAgICAgICAgICB0aGlzLnZhbHVlW2ldWzddID0gKCh0aGlzLnZhbHVlW2ldWzddIC0gYm94LnkpICogaGVpZ2h0KSAvIGJveC5oZWlnaHQgKyBib3gueVxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gQWJzb2x1dGl6ZSBhbmQgcGFyc2UgcGF0aCB0byBhcnJheVxyXG4gICwgcGFyc2U6IGZ1bmN0aW9uKGFycmF5KSB7XHJcbiAgICAgIC8vIGlmIGl0J3MgYWxyZWFkeSBhIHBhdGhhcnJheSwgbm8gbmVlZCB0byBwYXJzZSBpdFxyXG4gICAgICBpZiAoYXJyYXkgaW5zdGFuY2VvZiBTVkcuUGF0aEFycmF5KSByZXR1cm4gYXJyYXkudmFsdWVPZigpXHJcbiAgXHJcbiAgICAgIC8vIHByZXBhcmUgZm9yIHBhcnNpbmdcclxuICAgICAgdmFyIGksIHgwLCB5MCwgcywgc2VnLCBhcnJcclxuICAgICAgICAsIHggPSAwXHJcbiAgICAgICAgLCB5ID0gMFxyXG4gICAgICAgICwgcGFyYW1DbnQgPSB7ICdNJzoyLCAnTCc6MiwgJ0gnOjEsICdWJzoxLCAnQyc6NiwgJ1MnOjQsICdRJzo0LCAnVCc6MiwgJ0EnOjcgfVxyXG4gIFxyXG4gICAgICBpZih0eXBlb2YgYXJyYXkgPT0gJ3N0cmluZycpe1xyXG4gIFxyXG4gICAgICAgIGFycmF5ID0gYXJyYXlcclxuICAgICAgICAgIC5yZXBsYWNlKFNWRy5yZWdleC5uZWdFeHAsICdYJykgICAgICAgICAvLyByZXBsYWNlIGFsbCBuZWdhdGl2ZSBleHBvbmVudHMgd2l0aCBjZXJ0YWluIGNoYXJcclxuICAgICAgICAgIC5yZXBsYWNlKFNWRy5yZWdleC5wYXRoTGV0dGVycywgJyAkJiAnKSAvLyBwdXQgc29tZSByb29tIGJldHdlZW4gbGV0dGVycyBhbmQgbnVtYmVyc1xyXG4gICAgICAgICAgLnJlcGxhY2UoU1ZHLnJlZ2V4Lmh5cGhlbiwgJyAtJykgICAgICAgIC8vIGFkZCBzcGFjZSBiZWZvcmUgaHlwaGVuXHJcbiAgICAgICAgICAucmVwbGFjZShTVkcucmVnZXguY29tbWEsICcgJykgICAgICAgICAgLy8gdW5pZnkgYWxsIHNwYWNlc1xyXG4gICAgICAgICAgLnJlcGxhY2UoU1ZHLnJlZ2V4LlgsICdlLScpICAgICAgICAgICAgIC8vIGFkZCBiYWNrIHRoZSBleHBvZW50XHJcbiAgICAgICAgICAudHJpbSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJpbVxyXG4gICAgICAgICAgLnNwbGl0KFNWRy5yZWdleC53aGl0ZXNwYWNlcykgICAgICAgICAgIC8vIHNwbGl0IGludG8gYXJyYXlcclxuICBcclxuICAgICAgICAvLyBhdCB0aGlzIHBsYWNlIHRoZXJlIGNvdWxkIGJlIHBhcnRzIGxpa2UgWyczLjEyNC44NTQuMzInXSBiZWNhdXNlIHdlIGNvdWxkIG5vdCBkZXRlcm1pbmUgdGhlIHBvaW50IGFzIHNlcGVyYXRvciB0aWxsIG5vd1xyXG4gICAgICAgIC8vIHdlIGZpeCB0aGlzIGVsZW1lbnRzIGluIHRoZSBuZXh0IGxvb3BcclxuICAgICAgICBmb3IoaSA9IGFycmF5Lmxlbmd0aDsgLS1pOyl7XHJcbiAgICAgICAgICBpZihhcnJheVtpXS5pbmRleE9mKCcuJykgIT0gYXJyYXlbaV0ubGFzdEluZGV4T2YoJy4nKSl7XHJcbiAgICAgICAgICAgIHZhciBzcGxpdCA9IGFycmF5W2ldLnNwbGl0KCcuJykgLy8gc3BsaXQgYXQgdGhlIHBvaW50XHJcbiAgICAgICAgICAgIHZhciBmaXJzdCA9IFtzcGxpdC5zaGlmdCgpLCBzcGxpdC5zaGlmdCgpXS5qb2luKCcuJykgLy8gam9pbiB0aGUgZmlyc3QgbnVtYmVyIHRvZ2V0aGVyXHJcbiAgICAgICAgICAgIGFycmF5LnNwbGljZS5hcHBseShhcnJheSwgW2ksIDFdLmNvbmNhdChmaXJzdCwgc3BsaXQubWFwKGZ1bmN0aW9uKGVsKXsgcmV0dXJuICcuJytlbCB9KSkpIC8vIGFkZCBmaXJzdCBhbmQgYWxsIG90aGVyIGVudHJpZXMgYmFjayB0byBhcnJheVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBhcnJheSA9IGFycmF5LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXJyKXtcclxuICAgICAgICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkocHJldiwgY3VycilcclxuICAgICAgICB9LCBbXSlcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAvLyBhcnJheSBub3cgaXMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgcGFydHMgb2YgYSBwYXRoIGUuZy4gWydNJywgJzAnLCAnMCcsICdMJywgJzMwJywgJzMwJyAuLi5dXHJcbiAgXHJcbiAgICAgIHZhciBhcnIgPSBbXVxyXG4gIFxyXG4gICAgICBkb3tcclxuICBcclxuICAgICAgICAvLyBUZXN0IGlmIHdlIGhhdmUgYSBwYXRoIGxldHRlclxyXG4gICAgICAgIGlmKFNWRy5yZWdleC5pc1BhdGhMZXR0ZXIudGVzdChhcnJheVswXSkpe1xyXG4gICAgICAgICAgcyA9IGFycmF5WzBdXHJcbiAgICAgICAgICBhcnJheS5zaGlmdCgpXHJcbiAgICAgICAgICAvLyBJZiBsYXN0IGxldHRlciB3YXMgYSBtb3ZlIGNvbW1hbmQgYW5kIHdlIGdvdCBubyBuZXcsIGl0IGRlZmF1bHRzIHRvIFtMXWluZVxyXG4gICAgICAgIH1lbHNlIGlmKHMgPT0gJ00nKXtcclxuICAgICAgICAgIHMgPSAnTCdcclxuICAgICAgICB9ZWxzZSBpZihzID09ICdtJyl7XHJcbiAgICAgICAgICBzID0gJ2wnXHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIC8vIGFkZCBwYXRoIGxldHRlciBhcyBmaXJzdCBlbGVtZW50XHJcbiAgICAgICAgc2VnID0gW3MudG9VcHBlckNhc2UoKV1cclxuICBcclxuICAgICAgICAvLyBwdXNoIGFsbCBuZWNlc3NhcnkgcGFyYW1ldGVycyB0byBzZWdtZW50XHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgcGFyYW1DbnRbc2VnWzBdXTsgKytpKXtcclxuICAgICAgICAgIHNlZy5wdXNoKHBhcnNlRmxvYXQoYXJyYXkuc2hpZnQoKSkpXHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIC8vIHVwcGVyIGNhc2VcclxuICAgICAgICBpZihzID09IHNlZ1swXSl7XHJcbiAgXHJcbiAgICAgICAgICBpZihzID09ICdNJyB8fCBzID09ICdMJyB8fCBzID09ICdDJyB8fCBzID09ICdRJyl7XHJcbiAgICAgICAgICAgIHggPSBzZWdbcGFyYW1DbnRbc2VnWzBdXS0xXVxyXG4gICAgICAgICAgICB5ID0gc2VnW3BhcmFtQ250W3NlZ1swXV1dXHJcbiAgICAgICAgICB9ZWxzZSBpZihzID09ICdWJyl7XHJcbiAgICAgICAgICAgIHkgPSBzZWdbMV1cclxuICAgICAgICAgIH1lbHNlIGlmKHMgPT0gJ0gnKXtcclxuICAgICAgICAgICAgeCA9IHNlZ1sxXVxyXG4gICAgICAgICAgfWVsc2UgaWYocyA9PSAnQScpe1xyXG4gICAgICAgICAgICB4ID0gc2VnWzZdXHJcbiAgICAgICAgICAgIHkgPSBzZWdbN11cclxuICAgICAgICAgIH1cclxuICBcclxuICAgICAgICAgIC8vIGxvd2VyIGNhc2VcclxuICAgICAgICB9ZWxzZXtcclxuICBcclxuICAgICAgICAgIC8vIGNvbnZlcnQgcmVsYXRpdmUgdG8gYWJzb2x1dGUgdmFsdWVzXHJcbiAgICAgICAgICBpZihzID09ICdtJyB8fCBzID09ICdsJyB8fCBzID09ICdjJyB8fCBzID09ICdzJyB8fCBzID09ICdxJyB8fCBzID09ICd0Jyl7XHJcbiAgXHJcbiAgICAgICAgICAgIHNlZ1sxXSArPSB4XHJcbiAgICAgICAgICAgIHNlZ1syXSArPSB5XHJcbiAgXHJcbiAgICAgICAgICAgIGlmKHNlZ1szXSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICBzZWdbM10gKz0geFxyXG4gICAgICAgICAgICAgIHNlZ1s0XSArPSB5XHJcbiAgICAgICAgICAgIH1cclxuICBcclxuICAgICAgICAgICAgaWYoc2VnWzVdICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgIHNlZ1s1XSArPSB4XHJcbiAgICAgICAgICAgICAgc2VnWzZdICs9IHlcclxuICAgICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgICAvLyBtb3ZlIHBvaW50ZXJcclxuICAgICAgICAgICAgeCA9IHNlZ1twYXJhbUNudFtzZWdbMF1dLTFdXHJcbiAgICAgICAgICAgIHkgPSBzZWdbcGFyYW1DbnRbc2VnWzBdXV1cclxuICBcclxuICAgICAgICAgIH1lbHNlIGlmKHMgPT0gJ3YnKXtcclxuICAgICAgICAgICAgc2VnWzFdICs9IHlcclxuICAgICAgICAgICAgeSA9IHNlZ1sxXVxyXG4gICAgICAgICAgfWVsc2UgaWYocyA9PSAnaCcpe1xyXG4gICAgICAgICAgICBzZWdbMV0gKz0geFxyXG4gICAgICAgICAgICB4ID0gc2VnWzFdXHJcbiAgICAgICAgICB9ZWxzZSBpZihzID09ICdhJyl7XHJcbiAgICAgICAgICAgIHNlZ1s2XSArPSB4XHJcbiAgICAgICAgICAgIHNlZ1s3XSArPSB5XHJcbiAgICAgICAgICAgIHggPSBzZWdbNl1cclxuICAgICAgICAgICAgeSA9IHNlZ1s3XVxyXG4gICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICBpZihzZWdbMF0gPT0gJ00nKXtcclxuICAgICAgICAgIHgwID0geFxyXG4gICAgICAgICAgeTAgPSB5XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIGlmKHNlZ1swXSA9PSAnWicpe1xyXG4gICAgICAgICAgeCA9IHgwXHJcbiAgICAgICAgICB5ID0geTBcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgYXJyLnB1c2goc2VnKVxyXG4gIFxyXG4gICAgICB9d2hpbGUoYXJyYXkubGVuZ3RoKVxyXG4gIFxyXG4gICAgICByZXR1cm4gYXJyXHJcbiAgXHJcbiAgICB9XHJcbiAgICAvLyBHZXQgYm91bmRpbmcgYm94IG9mIHBhdGhcclxuICAsIGJib3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBTVkcucGFyc2VyLnBhdGguc2V0QXR0cmlidXRlKCdkJywgdGhpcy50b1N0cmluZygpKVxyXG4gIFxyXG4gICAgICByZXR1cm4gU1ZHLnBhcnNlci5wYXRoLmdldEJCb3goKVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG5cclxuICBTVkcuTnVtYmVyID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICBcclxuICAgIC8qIGluaXRpYWxpemUgZGVmYXVsdHMgKi9cclxuICAgIHRoaXMudmFsdWUgPSAwXHJcbiAgICB0aGlzLnVuaXQgPSAnJ1xyXG4gIFxyXG4gICAgLyogcGFyc2UgdmFsdWUgKi9cclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIC8qIGVuc3VyZSBhIHZhbGlkIG51bWVyaWMgdmFsdWUgKi9cclxuICAgICAgdGhpcy52YWx1ZSA9IGlzTmFOKHZhbHVlKSA/IDAgOiAhaXNGaW5pdGUodmFsdWUpID8gKHZhbHVlIDwgMCA/IC0zLjRlKzM4IDogKzMuNGUrMzgpIDogdmFsdWVcclxuICBcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICB2YXIgbWF0Y2ggPSB2YWx1ZS5tYXRjaChTVkcucmVnZXgudW5pdClcclxuICBcclxuICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgLyogbWFrZSB2YWx1ZSBudW1lcmljICovXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pXHJcbiAgICAgIFxyXG4gICAgICAgIC8qIG5vcm1hbGl6ZSBwZXJjZW50IHZhbHVlICovXHJcbiAgICAgICAgaWYgKG1hdGNoWzJdID09ICclJylcclxuICAgICAgICAgIHRoaXMudmFsdWUgLz0gMTAwXHJcbiAgICAgICAgZWxzZSBpZiAobWF0Y2hbMl0gPT0gJ3MnKVxyXG4gICAgICAgICAgdGhpcy52YWx1ZSAqPSAxMDAwXHJcbiAgICAgIFxyXG4gICAgICAgIC8qIHN0b3JlIHVuaXQgKi9cclxuICAgICAgICB0aGlzLnVuaXQgPSBtYXRjaFsyXVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTVkcuTnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlLnZhbHVlXHJcbiAgICAgICAgdGhpcy51bml0ICA9IHZhbHVlLnVuaXRcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gIH1cclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5OdW1iZXIsIHtcclxuICAgIC8vIFN0cmluZ2FsaXplXHJcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdGhpcy51bml0ID09ICclJyA/XHJcbiAgICAgICAgICB+fih0aGlzLnZhbHVlICogMWU4KSAvIDFlNjpcclxuICAgICAgICB0aGlzLnVuaXQgPT0gJ3MnID9cclxuICAgICAgICAgIHRoaXMudmFsdWUgLyAxZTMgOlxyXG4gICAgICAgICAgdGhpcy52YWx1ZVxyXG4gICAgICApICsgdGhpcy51bml0XHJcbiAgICB9XHJcbiAgLCAvLyBDb252ZXJ0IHRvIHByaW1pdGl2ZVxyXG4gICAgdmFsdWVPZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXHJcbiAgICB9XHJcbiAgICAvLyBBZGQgbnVtYmVyXHJcbiAgLCBwbHVzOiBmdW5jdGlvbihudW1iZXIpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMgKyBuZXcgU1ZHLk51bWJlcihudW1iZXIpXHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBTdWJ0cmFjdCBudW1iZXJcclxuICAsIG1pbnVzOiBmdW5jdGlvbihudW1iZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGx1cygtbmV3IFNWRy5OdW1iZXIobnVtYmVyKSlcclxuICAgIH1cclxuICAgIC8vIE11bHRpcGx5IG51bWJlclxyXG4gICwgdGltZXM6IGZ1bmN0aW9uKG51bWJlcikge1xyXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcyAqIG5ldyBTVkcuTnVtYmVyKG51bWJlcilcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIERpdmlkZSBudW1iZXJcclxuICAsIGRpdmlkZTogZnVuY3Rpb24obnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzIC8gbmV3IFNWRy5OdW1iZXIobnVtYmVyKVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gQ29udmVydCB0byBkaWZmZXJlbnQgdW5pdFxyXG4gICwgdG86IGZ1bmN0aW9uKHVuaXQpIHtcclxuICAgICAgaWYgKHR5cGVvZiB1bml0ID09PSAnc3RyaW5nJylcclxuICAgICAgICB0aGlzLnVuaXQgPSB1bml0XHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBNYWtlIG51bWJlciBtb3JwaGFibGVcclxuICAsIG1vcnBoOiBmdW5jdGlvbihudW1iZXIpIHtcclxuICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBTVkcuTnVtYmVyKG51bWJlcilcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIC8vIEdldCBtb3JwaGVkIG51bWJlciBhdCBnaXZlbiBwb3NpdGlvblxyXG4gICwgYXQ6IGZ1bmN0aW9uKHBvcykge1xyXG4gICAgICAvKiBtYWtlIHN1cmUgYSBkZXN0aW5hdGlvbiBpcyBkZWZpbmVkICovXHJcbiAgICAgIGlmICghdGhpcy5kZXN0aW5hdGlvbikgcmV0dXJuIHRoaXNcclxuICBcclxuICAgICAgLyogZ2VuZXJhdGUgbmV3IG1vcnBoZWQgbnVtYmVyICovXHJcbiAgICAgIHJldHVybiBuZXcgU1ZHLk51bWJlcih0aGlzLmRlc3RpbmF0aW9uKVxyXG4gICAgICAgICAgLm1pbnVzKHRoaXMpXHJcbiAgICAgICAgICAudGltZXMocG9zKVxyXG4gICAgICAgICAgLnBsdXModGhpcylcclxuICAgIH1cclxuICBcclxuICB9KVxyXG5cclxuICBTVkcuVmlld0JveCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIHZhciB4LCB5LCB3aWR0aCwgaGVpZ2h0XHJcbiAgICAgICwgd20gICA9IDEgLyogd2lkdGggbXVsdGlwbGllciAqL1xyXG4gICAgICAsIGhtICAgPSAxIC8qIGhlaWdodCBtdWx0aXBsaWVyICovXHJcbiAgICAgICwgYm94ICA9IGVsZW1lbnQuYmJveCgpXHJcbiAgICAgICwgdmlldyA9IChlbGVtZW50LmF0dHIoJ3ZpZXdCb3gnKSB8fCAnJykubWF0Y2goLy0/W1xcZFxcLl0rL2cpXHJcbiAgICAgICwgd2UgICA9IGVsZW1lbnRcclxuICAgICAgLCBoZSAgID0gZWxlbWVudFxyXG4gIFxyXG4gICAgLyogZ2V0IGRpbWVuc2lvbnMgb2YgY3VycmVudCBub2RlICovXHJcbiAgICB3aWR0aCAgPSBuZXcgU1ZHLk51bWJlcihlbGVtZW50LndpZHRoKCkpXHJcbiAgICBoZWlnaHQgPSBuZXcgU1ZHLk51bWJlcihlbGVtZW50LmhlaWdodCgpKVxyXG4gIFxyXG4gICAgLyogZmluZCBuZWFyZXN0IG5vbi1wZXJjZW50dWFsIGRpbWVuc2lvbnMgKi9cclxuICAgIHdoaWxlICh3aWR0aC51bml0ID09ICclJykge1xyXG4gICAgICB3bSAqPSB3aWR0aC52YWx1ZVxyXG4gICAgICB3aWR0aCA9IG5ldyBTVkcuTnVtYmVyKHdlIGluc3RhbmNlb2YgU1ZHLkRvYyA/IHdlLnBhcmVudC5vZmZzZXRXaWR0aCA6IHdlLnBhcmVudC53aWR0aCgpKVxyXG4gICAgICB3ZSA9IHdlLnBhcmVudFxyXG4gICAgfVxyXG4gICAgd2hpbGUgKGhlaWdodC51bml0ID09ICclJykge1xyXG4gICAgICBobSAqPSBoZWlnaHQudmFsdWVcclxuICAgICAgaGVpZ2h0ID0gbmV3IFNWRy5OdW1iZXIoaGUgaW5zdGFuY2VvZiBTVkcuRG9jID8gaGUucGFyZW50Lm9mZnNldEhlaWdodCA6IGhlLnBhcmVudC5oZWlnaHQoKSlcclxuICAgICAgaGUgPSBoZS5wYXJlbnRcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyogZW5zdXJlIGRlZmF1bHRzICovXHJcbiAgICB0aGlzLnggICAgICA9IGJveC54XHJcbiAgICB0aGlzLnkgICAgICA9IGJveC55XHJcbiAgICB0aGlzLndpZHRoICA9IHdpZHRoICAqIHdtXHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCAqIGhtXHJcbiAgICB0aGlzLnpvb20gICA9IDFcclxuICAgIFxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgLyogZ2V0IHdpZHRoIGFuZCBoZWlnaHQgZnJvbSB2aWV3Ym94ICovXHJcbiAgICAgIHggICAgICA9IHBhcnNlRmxvYXQodmlld1swXSlcclxuICAgICAgeSAgICAgID0gcGFyc2VGbG9hdCh2aWV3WzFdKVxyXG4gICAgICB3aWR0aCAgPSBwYXJzZUZsb2F0KHZpZXdbMl0pXHJcbiAgICAgIGhlaWdodCA9IHBhcnNlRmxvYXQodmlld1szXSlcclxuICAgICAgXHJcbiAgICAgIC8qIGNhbGN1bGF0ZSB6b29tIGFjY29yaW5nIHRvIHZpZXdib3ggKi9cclxuICAgICAgdGhpcy56b29tID0gKCh0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHQpID4gKHdpZHRoIC8gaGVpZ2h0KSkgP1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0IC8gaGVpZ2h0IDpcclxuICAgICAgICB0aGlzLndpZHRoICAvIHdpZHRoXHJcbiAgXHJcbiAgICAgIC8qIGNhbGN1bGF0ZSByZWFsIHBpeGVsIGRpbWVuc2lvbnMgb24gcGFyZW50IFNWRy5Eb2MgZWxlbWVudCAqL1xyXG4gICAgICB0aGlzLnggICAgICA9IHhcclxuICAgICAgdGhpcy55ICAgICAgPSB5XHJcbiAgICAgIHRoaXMud2lkdGggID0gd2lkdGhcclxuICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcbiAgXHJcbiAgLy9cclxuICBTVkcuZXh0ZW5kKFNWRy5WaWV3Qm94LCB7XHJcbiAgICAvLyBQYXJzZSB2aWV3Ym94IHRvIHN0cmluZ1xyXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy54ICsgJyAnICsgdGhpcy55ICsgJyAnICsgdGhpcy53aWR0aCArICcgJyArIHRoaXMuaGVpZ2h0XHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG5cclxuICBTVkcuQkJveCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIHZhciBib3hcclxuICBcclxuICAgIC8qIGluaXRpYWxpemUgemVybyBib3ggKi9cclxuICAgIHRoaXMueCAgICAgID0gMFxyXG4gICAgdGhpcy55ICAgICAgPSAwXHJcbiAgICB0aGlzLndpZHRoICA9IDBcclxuICAgIHRoaXMuaGVpZ2h0ID0gMFxyXG4gICAgXHJcbiAgICAvKiBnZXQgdmFsdWVzIGlmIGVsZW1lbnQgaXMgZ2l2ZW4gKi9cclxuICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLyogYWN0dWFsLCBuYXRpdmUgYm91bmRpbmcgYm94ICovXHJcbiAgICAgICAgYm94ID0gZWxlbWVudC5ub2RlLmdldEJCb3goKVxyXG4gICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAvKiBmYWxsYmFjayBmb3Igc29tZSBicm93c2VycyAqL1xyXG4gICAgICAgIGJveCA9IHtcclxuICAgICAgICAgIHg6ICAgICAgZWxlbWVudC5ub2RlLmNsaWVudExlZnRcclxuICAgICAgICAsIHk6ICAgICAgZWxlbWVudC5ub2RlLmNsaWVudFRvcFxyXG4gICAgICAgICwgd2lkdGg6ICBlbGVtZW50Lm5vZGUuY2xpZW50V2lkdGhcclxuICAgICAgICAsIGhlaWdodDogZWxlbWVudC5ub2RlLmNsaWVudEhlaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLyogaW5jbHVkZSB0cmFuc2xhdGlvbnMgb24geCBhbiB5ICovXHJcbiAgICAgIHRoaXMueCA9IGJveC54ICsgZWxlbWVudC50cmFucy54XHJcbiAgICAgIHRoaXMueSA9IGJveC55ICsgZWxlbWVudC50cmFucy55XHJcbiAgICAgIFxyXG4gICAgICAvKiBwbGFpbiB3aWR0aCBhbmQgaGVpZ2h0ICovXHJcbiAgICAgIHRoaXMud2lkdGggID0gYm94LndpZHRoICAqIGVsZW1lbnQudHJhbnMuc2NhbGVYXHJcbiAgICAgIHRoaXMuaGVpZ2h0ID0gYm94LmhlaWdodCAqIGVsZW1lbnQudHJhbnMuc2NhbGVZXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKiBhZGQgY2VudGVyLCByaWdodCBhbmQgYm90dG9tICovXHJcbiAgICBib3hQcm9wZXJ0aWVzKHRoaXMpXHJcbiAgICBcclxuICB9XHJcbiAgXHJcbiAgLy9cclxuICBTVkcuZXh0ZW5kKFNWRy5CQm94LCB7XHJcbiAgICAvLyBtZXJnZSBib3VuZGluZyBib3ggd2l0aCBhbm90aGVyLCByZXR1cm4gYSBuZXcgaW5zdGFuY2VcclxuICAgIG1lcmdlOiBmdW5jdGlvbihib3gpIHtcclxuICAgICAgdmFyIGIgPSBuZXcgU1ZHLkJCb3goKVxyXG4gIFxyXG4gICAgICAvKiBtZXJnZSBib3ggKi9cclxuICAgICAgYi54ICAgICAgPSBNYXRoLm1pbih0aGlzLngsIGJveC54KVxyXG4gICAgICBiLnkgICAgICA9IE1hdGgubWluKHRoaXMueSwgYm94LnkpXHJcbiAgICAgIGIud2lkdGggID0gTWF0aC5tYXgodGhpcy54ICsgdGhpcy53aWR0aCwgIGJveC54ICsgYm94LndpZHRoKSAgLSBiLnhcclxuICAgICAgYi5oZWlnaHQgPSBNYXRoLm1heCh0aGlzLnkgKyB0aGlzLmhlaWdodCwgYm94LnkgKyBib3guaGVpZ2h0KSAtIGIueVxyXG4gIFxyXG4gICAgICAvKiBhZGQgY2VudGVyLCByaWdodCBhbmQgYm90dG9tICovXHJcbiAgICAgIGJveFByb3BlcnRpZXMoYilcclxuICBcclxuICAgICAgcmV0dXJuIGJcclxuICAgIH1cclxuICBcclxuICB9KVxyXG5cclxuICBTVkcuUkJveCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIHZhciBlLCB6b29tXHJcbiAgICAgICwgYm94ID0ge31cclxuICBcclxuICAgIC8qIGluaXRpYWxpemUgemVybyBib3ggKi9cclxuICAgIHRoaXMueCAgICAgID0gMFxyXG4gICAgdGhpcy55ICAgICAgPSAwXHJcbiAgICB0aGlzLndpZHRoICA9IDBcclxuICAgIHRoaXMuaGVpZ2h0ID0gMFxyXG4gICAgXHJcbiAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICBlID0gZWxlbWVudC5kb2MoKS5wYXJlbnRcclxuICAgICAgem9vbSA9IGVsZW1lbnQuZG9jKCkudmlld2JveCgpLnpvb21cclxuICAgICAgXHJcbiAgICAgIC8qIGFjdHVhbCwgbmF0aXZlIGJvdW5kaW5nIGJveCAqL1xyXG4gICAgICBib3ggPSBlbGVtZW50Lm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgXHJcbiAgICAgIC8qIGdldCBzY3JlZW4gb2Zmc2V0ICovXHJcbiAgICAgIHRoaXMueCA9IGJveC5sZWZ0XHJcbiAgICAgIHRoaXMueSA9IGJveC50b3BcclxuICAgICAgXHJcbiAgICAgIC8qIHN1YnRyYWN0IHBhcmVudCBvZmZzZXQgKi9cclxuICAgICAgdGhpcy54IC09IGUub2Zmc2V0TGVmdFxyXG4gICAgICB0aGlzLnkgLT0gZS5vZmZzZXRUb3BcclxuICAgICAgXHJcbiAgICAgIHdoaWxlIChlID0gZS5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgICB0aGlzLnggLT0gZS5vZmZzZXRMZWZ0XHJcbiAgICAgICAgdGhpcy55IC09IGUub2Zmc2V0VG9wXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC8qIGNhbGN1bGF0ZSBjdW11bGF0aXZlIHpvb20gZnJvbSBzdmcgZG9jdW1lbnRzICovXHJcbiAgICAgIGUgPSBlbGVtZW50XHJcbiAgICAgIHdoaWxlIChlID0gZS5wYXJlbnQpIHtcclxuICAgICAgICBpZiAoZS50eXBlID09ICdzdmcnICYmIGUudmlld2JveCkge1xyXG4gICAgICAgICAgem9vbSAqPSBlLnZpZXdib3goKS56b29tXHJcbiAgICAgICAgICB0aGlzLnggLT0gZS54KCkgfHwgMFxyXG4gICAgICAgICAgdGhpcy55IC09IGUueSgpIHx8IDBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyogcmVjYWxjdWxhdGUgdmlld2JveCBkaXN0b3J0aW9uICovXHJcbiAgICB0aGlzLnggLz0gem9vbVxyXG4gICAgdGhpcy55IC89IHpvb21cclxuICAgIHRoaXMud2lkdGggID0gYm94LndpZHRoICAvPSB6b29tXHJcbiAgICB0aGlzLmhlaWdodCA9IGJveC5oZWlnaHQgLz0gem9vbVxyXG4gICAgXHJcbiAgICAvKiBvZmZzZXQgYnkgd2luZG93IHNjcm9sbCBwb3NpdGlvbiwgYmVjYXVzZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgY2hhbmdlcyB3aGVuIHdpbmRvdyBpcyBzY3JvbGxlZCAqL1xyXG4gICAgdGhpcy54ICs9IHR5cGVvZiB3aW5kb3cuc2Nyb2xsWCA9PT0gJ251bWJlcicgPyB3aW5kb3cuc2Nyb2xsWCA6IHdpbmRvdy5wYWdlWE9mZnNldFxyXG4gICAgdGhpcy55ICs9IHR5cGVvZiB3aW5kb3cuc2Nyb2xsWSA9PT0gJ251bWJlcicgPyB3aW5kb3cuc2Nyb2xsWSA6IHdpbmRvdy5wYWdlWU9mZnNldFxyXG4gIFxyXG4gICAgLyogYWRkIGNlbnRlciwgcmlnaHQgYW5kIGJvdHRvbSAqL1xyXG4gICAgYm94UHJvcGVydGllcyh0aGlzKVxyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gIC8vXHJcbiAgU1ZHLmV4dGVuZChTVkcuUkJveCwge1xyXG4gICAgLy8gbWVyZ2UgcmVjdCBib3ggd2l0aCBhbm90aGVyLCByZXR1cm4gYSBuZXcgaW5zdGFuY2VcclxuICAgIG1lcmdlOiBmdW5jdGlvbihib3gpIHtcclxuICAgICAgdmFyIGIgPSBuZXcgU1ZHLlJCb3goKVxyXG4gIFxyXG4gICAgICAvKiBtZXJnZSBib3ggKi9cclxuICAgICAgYi54ICAgICAgPSBNYXRoLm1pbih0aGlzLngsIGJveC54KVxyXG4gICAgICBiLnkgICAgICA9IE1hdGgubWluKHRoaXMueSwgYm94LnkpXHJcbiAgICAgIGIud2lkdGggID0gTWF0aC5tYXgodGhpcy54ICsgdGhpcy53aWR0aCwgIGJveC54ICsgYm94LndpZHRoKSAgLSBiLnhcclxuICAgICAgYi5oZWlnaHQgPSBNYXRoLm1heCh0aGlzLnkgKyB0aGlzLmhlaWdodCwgYm94LnkgKyBib3guaGVpZ2h0KSAtIGIueVxyXG4gIFxyXG4gICAgICAvKiBhZGQgY2VudGVyLCByaWdodCBhbmQgYm90dG9tICovXHJcbiAgICAgIGJveFByb3BlcnRpZXMoYilcclxuICBcclxuICAgICAgcmV0dXJuIGJcclxuICAgIH1cclxuICBcclxuICB9KVxyXG5cclxuXHJcbiAgU1ZHLkVsZW1lbnQgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgIC8qIG1ha2Ugc3Ryb2tlIHZhbHVlIGFjY2Vzc2libGUgZHluYW1pY2FsbHkgKi9cclxuICAgICAgdGhpcy5fc3Ryb2tlID0gU1ZHLmRlZmF1bHRzLmF0dHJzLnN0cm9rZVxyXG4gIFxyXG4gICAgICAvKiBpbml0aWFsaXplIHRyYW5zZm9ybWF0aW9uIHN0b3JlIHdpdGggZGVmYXVsdHMgKi9cclxuICAgICAgdGhpcy50cmFucyA9IFNWRy5kZWZhdWx0cy50cmFucygpXHJcbiAgICAgIFxyXG4gICAgICAvKiBjcmVhdGUgY2lyY3VsYXIgcmVmZXJlbmNlICovXHJcbiAgICAgIGlmICh0aGlzLm5vZGUgPSBub2RlKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gbm9kZS5ub2RlTmFtZVxyXG4gICAgICAgIHRoaXMubm9kZS5pbnN0YW5jZSA9IHRoaXNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBNb3ZlIG92ZXIgeC1heGlzXHJcbiAgICAgIHg6IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICBpZiAoeCAhPSBudWxsKSB7XHJcbiAgICAgICAgICB4ID0gbmV3IFNWRy5OdW1iZXIoeClcclxuICAgICAgICAgIHgudmFsdWUgLz0gdGhpcy50cmFucy5zY2FsZVhcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cigneCcsIHgpXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBvdmVyIHktYXhpc1xyXG4gICAgLCB5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgaWYgKHkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgeSA9IG5ldyBTVkcuTnVtYmVyKHkpXHJcbiAgICAgICAgICB5LnZhbHVlIC89IHRoaXMudHJhbnMuc2NhbGVZXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ3knLCB5KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeC1heGlzXHJcbiAgICAsIGN4OiBmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMueCgpICsgdGhpcy53aWR0aCgpIC8gMiA6IHRoaXMueCh4IC0gdGhpcy53aWR0aCgpIC8gMilcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHktYXhpc1xyXG4gICAgLCBjeTogZnVuY3Rpb24oeSkge1xyXG4gICAgICAgIHJldHVybiB5ID09IG51bGwgPyB0aGlzLnkoKSArIHRoaXMuaGVpZ2h0KCkgLyAyIDogdGhpcy55KHkgLSB0aGlzLmhlaWdodCgpIC8gMilcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGVsZW1lbnQgdG8gZ2l2ZW4geCBhbmQgeSB2YWx1ZXNcclxuICAgICwgbW92ZTogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLngoeCkueSh5KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgZWxlbWVudCBieSBpdHMgY2VudGVyXHJcbiAgICAsIGNlbnRlcjogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN4KHgpLmN5KHkpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IHdpZHRoIG9mIGVsZW1lbnRcclxuICAgICwgd2lkdGg6IGZ1bmN0aW9uKHdpZHRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignd2lkdGgnLCB3aWR0aClcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcclxuICAgICwgaGVpZ2h0OiBmdW5jdGlvbihoZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IGVsZW1lbnQgc2l6ZSB0byBnaXZlbiB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAsIHNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB2YXIgcCA9IHByb3BvcnRpb25hbFNpemUodGhpcy5iYm94KCksIHdpZHRoLCBoZWlnaHQpXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICAgIC53aWR0aChuZXcgU1ZHLk51bWJlcihwLndpZHRoKSlcclxuICAgICAgICAgIC5oZWlnaHQobmV3IFNWRy5OdW1iZXIocC5oZWlnaHQpKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENsb25lIGVsZW1lbnRcclxuICAgICwgY2xvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjbG9uZSAsIGF0dHJcclxuICAgICAgICAgICwgdHlwZSA9IHRoaXMudHlwZVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGludm9rZSBzaGFwZSBtZXRob2Qgd2l0aCBzaGFwZS1zcGVjaWZpYyBhcmd1bWVudHMgKi9cclxuICAgICAgICBjbG9uZSA9IHR5cGUgPT0gJ3JlY3QnIHx8IHR5cGUgPT0gJ2VsbGlwc2UnID9cclxuICAgICAgICAgIHRoaXMucGFyZW50W3R5cGVdKDAsMCkgOlxyXG4gICAgICAgIHR5cGUgPT0gJ2xpbmUnID9cclxuICAgICAgICAgIHRoaXMucGFyZW50W3R5cGVdKDAsMCwwLDApIDpcclxuICAgICAgICB0eXBlID09ICdpbWFnZScgP1xyXG4gICAgICAgICAgdGhpcy5wYXJlbnRbdHlwZV0odGhpcy5zcmMpIDpcclxuICAgICAgICB0eXBlID09ICd0ZXh0JyA/XHJcbiAgICAgICAgICB0aGlzLnBhcmVudFt0eXBlXSh0aGlzLmNvbnRlbnQpIDpcclxuICAgICAgICB0eXBlID09ICdwYXRoJyA/XHJcbiAgICAgICAgICB0aGlzLnBhcmVudFt0eXBlXSh0aGlzLmF0dHIoJ2QnKSkgOlxyXG4gICAgICAgIHR5cGUgPT0gJ3BvbHlsaW5lJyB8fCB0eXBlID09ICdwb2x5Z29uJyA/XHJcbiAgICAgICAgICB0aGlzLnBhcmVudFt0eXBlXSh0aGlzLmF0dHIoJ3BvaW50cycpKSA6XHJcbiAgICAgICAgdHlwZSA9PSAnZycgP1xyXG4gICAgICAgICAgdGhpcy5wYXJlbnQuZ3JvdXAoKSA6XHJcbiAgICAgICAgICB0aGlzLnBhcmVudFt0eXBlXSgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogYXBwbHkgYXR0cmlidXRlcyBhdHRyaWJ1dGVzICovXHJcbiAgICAgICAgYXR0ciA9IHRoaXMuYXR0cigpXHJcbiAgICAgICAgZGVsZXRlIGF0dHIuaWRcclxuICAgICAgICBjbG9uZS5hdHRyKGF0dHIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogY29weSB0cmFuc2Zvcm1hdGlvbnMgKi9cclxuICAgICAgICBjbG9uZS50cmFucyA9IHRoaXMudHJhbnNcclxuICAgICAgICBcclxuICAgICAgICAvKiBhcHBseSBhdHRyaWJ1dGVzIGFuZCB0cmFuc2xhdGlvbnMgKi9cclxuICAgICAgICByZXR1cm4gY2xvbmUudHJhbnNmb3JtKHt9KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFJlbW92ZSBlbGVtZW50XHJcbiAgICAsIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyZW50KVxyXG4gICAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlRWxlbWVudCh0aGlzKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gUmVwbGFjZSBlbGVtZW50XHJcbiAgICAsIHJlcGxhY2U6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmFmdGVyKGVsZW1lbnQpLnJlbW92ZSgpXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgZWxlbWVudCB0byBnaXZlbiBjb250YWluZXIgYW5kIHJldHVybiBzZWxmXHJcbiAgICAsIGFkZFRvOiBmdW5jdGlvbihwYXJlbnQpIHtcclxuICAgICAgICByZXR1cm4gcGFyZW50LnB1dCh0aGlzKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBlbGVtZW50IHRvIGdpdmVuIGNvbnRhaW5lciBhbmQgcmV0dXJuIGNvbnRhaW5lclxyXG4gICAgLCBwdXRJbjogZnVuY3Rpb24ocGFyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudC5hZGQodGhpcylcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgcGFyZW50IGRvY3VtZW50XHJcbiAgICAsIGRvYzogZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQodHlwZSB8fCBTVkcuRG9jKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBzdmcgZWxlbWVudCBhdHRyaWJ1dGVcclxuICAgICwgYXR0cjogZnVuY3Rpb24oYSwgdiwgbikge1xyXG4gICAgICAgIGlmIChhID09IG51bGwpIHtcclxuICAgICAgICAgIC8qIGdldCBhbiBvYmplY3Qgb2YgYXR0cmlidXRlcyAqL1xyXG4gICAgICAgICAgYSA9IHt9XHJcbiAgICAgICAgICB2ID0gdGhpcy5ub2RlLmF0dHJpYnV0ZXNcclxuICAgICAgICAgIGZvciAobiA9IHYubGVuZ3RoIC0gMTsgbiA+PSAwOyBuLS0pXHJcbiAgICAgICAgICAgIGFbdltuXS5ub2RlTmFtZV0gPSBTVkcucmVnZXguaXNOdW1iZXIudGVzdCh2W25dLm5vZGVWYWx1ZSkgPyBwYXJzZUZsb2F0KHZbbl0ubm9kZVZhbHVlKSA6IHZbbl0ubm9kZVZhbHVlXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHJldHVybiBhXHJcbiAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAvKiBhcHBseSBldmVyeSBhdHRyaWJ1dGUgaW5kaXZpZHVhbGx5IGlmIGFuIG9iamVjdCBpcyBwYXNzZWQgKi9cclxuICAgICAgICAgIGZvciAodiBpbiBhKSB0aGlzLmF0dHIodiwgYVt2XSlcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAodiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvKiByZW1vdmUgdmFsdWUgKi9cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUF0dHJpYnV0ZShhKVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICh2ID09IG51bGwpIHtcclxuICAgICAgICAgIC8qIGFjdCBhcyBhIGdldHRlciBpZiB0aGUgZmlyc3QgYW5kIG9ubHkgYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdCAqL1xyXG4gICAgICAgICAgdiA9IHRoaXMubm9kZS5hdHRyaWJ1dGVzW2FdXHJcbiAgICAgICAgICByZXR1cm4gdiA9PSBudWxsID8gXHJcbiAgICAgICAgICAgIFNWRy5kZWZhdWx0cy5hdHRyc1thXSA6XHJcbiAgICAgICAgICBTVkcucmVnZXguaXNOdW1iZXIudGVzdCh2Lm5vZGVWYWx1ZSkgP1xyXG4gICAgICAgICAgICBwYXJzZUZsb2F0KHYubm9kZVZhbHVlKSA6IHYubm9kZVZhbHVlXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmIChhID09ICdzdHlsZScpIHtcclxuICAgICAgICAgIC8qIHJlZGlyZWN0IHRvIHRoZSBzdHlsZSBtZXRob2QgKi9cclxuICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlKHYpXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8qIEJVRyBGSVg6IHNvbWUgYnJvd3NlcnMgd2lsbCByZW5kZXIgYSBzdHJva2UgaWYgYSBjb2xvciBpcyBnaXZlbiBldmVuIHRob3VnaCBzdHJva2Ugd2lkdGggaXMgMCAqL1xyXG4gICAgICAgICAgaWYgKGEgPT0gJ3N0cm9rZS13aWR0aCcpXHJcbiAgICAgICAgICAgIHRoaXMuYXR0cignc3Ryb2tlJywgcGFyc2VGbG9hdCh2KSA+IDAgPyB0aGlzLl9zdHJva2UgOiBudWxsKVxyXG4gICAgICAgICAgZWxzZSBpZiAoYSA9PSAnc3Ryb2tlJylcclxuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlID0gdlxyXG4gIFxyXG4gICAgICAgICAgLyogY29udmVydCBpbWFnZSBmaWxsIGFuZCBzdHJva2UgdG8gcGF0dGVybnMgKi9cclxuICAgICAgICAgIGlmIChhID09ICdmaWxsJyB8fCBhID09ICdzdHJva2UnKSB7XHJcbiAgICAgICAgICAgIGlmIChTVkcucmVnZXguaXNJbWFnZS50ZXN0KHYpKVxyXG4gICAgICAgICAgICAgIHYgPSB0aGlzLmRvYygpLmRlZnMoKS5pbWFnZSh2LCAwLCAwKVxyXG4gIFxyXG4gICAgICAgICAgICBpZiAodiBpbnN0YW5jZW9mIFNWRy5JbWFnZSlcclxuICAgICAgICAgICAgICB2ID0gdGhpcy5kb2MoKS5kZWZzKCkucGF0dGVybigwLCAwLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkKHYpXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogZW5zdXJlIGNvcnJlY3QgbnVtZXJpYyB2YWx1ZXMgKGFsc28gYWNjZXB0cyBOYU4gYW5kIEluZmluaXR5KSAqL1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgdiA9IG5ldyBTVkcuTnVtYmVyKHYpXHJcbiAgXHJcbiAgICAgICAgICAvKiBlbnN1cmUgZnVsbCBoZXggY29sb3IgKi9cclxuICAgICAgICAgIGVsc2UgaWYgKFNWRy5Db2xvci5pc0NvbG9yKHYpKVxyXG4gICAgICAgICAgICB2ID0gbmV3IFNWRy5Db2xvcih2KVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvKiBwYXJzZSBhcnJheSB2YWx1ZXMgKi9cclxuICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodikpXHJcbiAgICAgICAgICAgIHYgPSBuZXcgU1ZHLkFycmF5KHYpXHJcbiAgXHJcbiAgICAgICAgICAvKiBpZiB0aGUgcGFzc2VkIGF0dHJpYnV0ZSBpcyBsZWFkaW5nLi4uICovXHJcbiAgICAgICAgICBpZiAoYSA9PSAnbGVhZGluZycpIHtcclxuICAgICAgICAgICAgLyogLi4uIGNhbGwgdGhlIGxlYWRpbmcgbWV0aG9kIGluc3RlYWQgKi9cclxuICAgICAgICAgICAgaWYgKHRoaXMubGVhZGluZylcclxuICAgICAgICAgICAgICB0aGlzLmxlYWRpbmcodilcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8qIHNldCBnaXZlbiBhdHRyaWJ1dGUgb24gbm9kZSAqL1xyXG4gICAgICAgICAgICB0eXBlb2YgbiA9PT0gJ3N0cmluZycgP1xyXG4gICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGVOUyhuLCBhLCB2LnRvU3RyaW5nKCkpIDpcclxuICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKGEsIHYudG9TdHJpbmcoKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogcmVidWlsZCBpZiByZXF1aXJlZCAqL1xyXG4gICAgICAgICAgaWYgKHRoaXMucmVidWlsZCAmJiAoYSA9PSAnZm9udC1zaXplJyB8fCBhID09ICd4JykpXHJcbiAgICAgICAgICAgIHRoaXMucmVidWlsZChhLCB2KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIE1hbmFnZSB0cmFuc2Zvcm1hdGlvbnNcclxuICAgICwgdHJhbnNmb3JtOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgLyogYWN0IGFzIGEgZ2V0dGVyIGlmIG5vIGFyZ3VtZW50IGlzIGdpdmVuICovXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIC8qIGFjdCBhcyBhIGdldHRlciBpZiBvbmx5IG9uZSBzdHJpbmcgYXJndW1lbnQgaXMgZ2l2ZW4gKi9cclxuICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMilcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNbb11cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogYXBwbHkgdHJhbnNmb3JtYXRpb25zIGFzIG9iamVjdCBpZiBrZXkgdmFsdWUgYXJndW1lbnRzIGFyZSBnaXZlbiovXHJcbiAgICAgICAgICB2YXIgdHJhbnNmb3JtID0ge31cclxuICAgICAgICAgIHRyYW5zZm9ybVtvXSA9IHZcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHRyYW5zZm9ybSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogLi4uIG90aGVyd2lzZSBjb250aW51ZSBhcyBhIHNldHRlciAqL1xyXG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSBbXVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIHBhcnNlIG1hdHJpeCAqL1xyXG4gICAgICAgIG8gPSBwYXJzZU1hdHJpeChvKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIG1lcmdlIHZhbHVlcyAqL1xyXG4gICAgICAgIGZvciAodiBpbiBvKVxyXG4gICAgICAgICAgaWYgKG9bdl0gIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy50cmFuc1t2XSA9IG9bdl1cclxuICAgICAgICBcclxuICAgICAgICAvKiBjb21waWxlIG1hdHJpeCAqL1xyXG4gICAgICAgIHRoaXMudHJhbnMubWF0cml4ID0gdGhpcy50cmFucy5hXHJcbiAgICAgICAgICAgICAgICAgICAgKyAnICcgKyB0aGlzLnRyYW5zLmJcclxuICAgICAgICAgICAgICAgICAgICArICcgJyArIHRoaXMudHJhbnMuY1xyXG4gICAgICAgICAgICAgICAgICAgICsgJyAnICsgdGhpcy50cmFucy5kXHJcbiAgICAgICAgICAgICAgICAgICAgKyAnICcgKyB0aGlzLnRyYW5zLmVcclxuICAgICAgICAgICAgICAgICAgICArICcgJyArIHRoaXMudHJhbnMuZlxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGFsaWFzIGN1cnJlbnQgdHJhbnNmb3JtYXRpb25zICovXHJcbiAgICAgICAgbyA9IHRoaXMudHJhbnNcclxuICAgICAgICBcclxuICAgICAgICAvKiBhZGQgbWF0cml4ICovXHJcbiAgICAgICAgaWYgKG8ubWF0cml4ICE9IFNWRy5kZWZhdWx0cy5tYXRyaXgpXHJcbiAgICAgICAgICB0cmFuc2Zvcm0ucHVzaCgnbWF0cml4KCcgKyBvLm1hdHJpeCArICcpJylcclxuICAgICAgICBcclxuICAgICAgICAvKiBhZGQgcm90YXRpb24gKi9cclxuICAgICAgICBpZiAoby5yb3RhdGlvbiAhPSAwKVxyXG4gICAgICAgICAgdHJhbnNmb3JtLnB1c2goJ3JvdGF0ZSgnICsgby5yb3RhdGlvbiArICcgJyArIChvLmN4ID09IG51bGwgPyB0aGlzLmJib3goKS5jeCA6IG8uY3gpICsgJyAnICsgKG8uY3kgPT0gbnVsbCA/IHRoaXMuYmJveCgpLmN5IDogby5jeSkgKyAnKScpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogYWRkIHNjYWxlICovXHJcbiAgICAgICAgaWYgKG8uc2NhbGVYICE9IDEgfHwgby5zY2FsZVkgIT0gMSlcclxuICAgICAgICAgIHRyYW5zZm9ybS5wdXNoKCdzY2FsZSgnICsgby5zY2FsZVggKyAnICcgKyBvLnNjYWxlWSArICcpJylcclxuICAgICAgICBcclxuICAgICAgICAvKiBhZGQgc2tldyBvbiB4IGF4aXMgKi9cclxuICAgICAgICBpZiAoby5za2V3WCAhPSAwKVxyXG4gICAgICAgICAgdHJhbnNmb3JtLnB1c2goJ3NrZXdYKCcgKyBvLnNrZXdYICsgJyknKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGFkZCBza2V3IG9uIHkgYXhpcyAqL1xyXG4gICAgICAgIGlmIChvLnNrZXdZICE9IDApXHJcbiAgICAgICAgICB0cmFuc2Zvcm0ucHVzaCgnc2tld1koJyArIG8uc2tld1kgKyAnKScpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogYWRkIHRyYW5zbGF0aW9uICovXHJcbiAgICAgICAgaWYgKG8ueCAhPSAwIHx8IG8ueSAhPSAwKVxyXG4gICAgICAgICAgdHJhbnNmb3JtLnB1c2goJ3RyYW5zbGF0ZSgnICsgbmV3IFNWRy5OdW1iZXIoby54IC8gby5zY2FsZVgpICsgJyAnICsgbmV3IFNWRy5OdW1iZXIoby55IC8gby5zY2FsZVkpICsgJyknKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIHVwZGF0ZSB0cmFuc2Zvcm1hdGlvbnMsIGV2ZW4gaWYgdGhlcmUgYXJlIG5vbmUgKi9cclxuICAgICAgICBpZiAodHJhbnNmb3JtLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUF0dHJpYnV0ZSgndHJhbnNmb3JtJylcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0uam9pbignICcpKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gRHluYW1pYyBzdHlsZSBnZW5lcmF0b3JcclxuICAgICwgc3R5bGU6IGZ1bmN0aW9uKHMsIHYpIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAvKiBnZXQgZnVsbCBzdHlsZSAqL1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5zdHlsZS5jc3NUZXh0IHx8ICcnXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgLyogYXBwbHkgZXZlcnkgc3R5bGUgaW5kaXZpZHVhbGx5IGlmIGFuIG9iamVjdCBpcyBwYXNzZWQgKi9cclxuICAgICAgICAgIGlmICh0eXBlb2YgcyA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBmb3IgKHYgaW4gcykgdGhpcy5zdHlsZSh2LCBzW3ZdKVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKFNWRy5yZWdleC5pc0Nzcy50ZXN0KHMpKSB7XHJcbiAgICAgICAgICAgIC8qIHBhcnNlIGNzcyBzdHJpbmcgKi9cclxuICAgICAgICAgICAgcyA9IHMuc3BsaXQoJzsnKVxyXG4gIFxyXG4gICAgICAgICAgICAvKiBhcHBseSBldmVyeSBkZWZpbml0aW9uIGluZGl2aWR1YWxseSAqL1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2ID0gc1tpXS5zcGxpdCgnOicpXHJcbiAgICAgICAgICAgICAgdGhpcy5zdHlsZSh2WzBdLnJlcGxhY2UoL1xccysvZywgJycpLCB2WzFdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvKiBhY3QgYXMgYSBnZXR0ZXIgaWYgdGhlIGZpcnN0IGFuZCBvbmx5IGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QgKi9cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5zdHlsZVtjYW1lbENhc2UocyldXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVtjYW1lbENhc2UocyldID0gdiA9PT0gbnVsbCB8fCBTVkcucmVnZXguaXNCbGFuay50ZXN0KHYpID8gJycgOiB2XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gR2V0IC8gc2V0IGlkXHJcbiAgICAsIGlkOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2lkJywgaWQpXHJcbiAgICAgIH1cclxuICAgICAgLy8gR2V0IGJvdW5kaW5nIGJveFxyXG4gICAgLCBiYm94OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNWRy5CQm94KHRoaXMpXHJcbiAgICAgIH1cclxuICAgICAgLy8gR2V0IHJlY3QgYm94XHJcbiAgICAsIHJib3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU1ZHLlJCb3godGhpcylcclxuICAgICAgfVxyXG4gICAgICAvLyBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gcG9pbnQgaW5zaWRlIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGVsZW1lbnRcclxuICAgICwgaW5zaWRlOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdmFyIGJveCA9IHRoaXMuYmJveCgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHggPiBib3gueFxyXG4gICAgICAgICAgICAmJiB5ID4gYm94LnlcclxuICAgICAgICAgICAgJiYgeCA8IGJveC54ICsgYm94LndpZHRoXHJcbiAgICAgICAgICAgICYmIHkgPCBib3gueSArIGJveC5oZWlnaHRcclxuICAgICAgfVxyXG4gICAgICAvLyBTaG93IGVsZW1lbnRcclxuICAgICwgc2hvdzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGUoJ2Rpc3BsYXknLCAnJylcclxuICAgICAgfVxyXG4gICAgICAvLyBIaWRlIGVsZW1lbnRcclxuICAgICwgaGlkZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpXHJcbiAgICAgIH1cclxuICAgICAgLy8gSXMgZWxlbWVudCB2aXNpYmxlP1xyXG4gICAgLCB2aXNpYmxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdHlsZSgnZGlzcGxheScpICE9ICdub25lJ1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFJldHVybiBpZCBvbiBzdHJpbmcgY29udmVyc2lvblxyXG4gICAgLCB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignaWQnKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFJldHVybiBhcnJheSBvZiBjbGFzc2VzIG9uIHRoZSBub2RlXHJcbiAgICAsIGNsYXNzZXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjbGFzc0F0dHIgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdjbGFzcycpXHJcbiAgICAgICAgaWYgKGNsYXNzQXR0ciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIFtdXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBjbGFzc0F0dHIudHJpbSgpLnNwbGl0KC9cXHMrLylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gUmV0dXJuIHRydWUgaWYgY2xhc3MgZXhpc3RzIG9uIHRoZSBub2RlLCBmYWxzZSBvdGhlcndpc2VcclxuICAgICwgaGFzQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsYXNzZXMoKS5pbmRleE9mKGNsYXNzTmFtZSkgIT0gLTFcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgY2xhc3MgdG8gdGhlIG5vZGVcclxuICAgICwgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHZhciBjbGFzc0FycmF5XHJcbiAgICAgICAgaWYgKCEodGhpcy5oYXNDbGFzcyhjbGFzc05hbWUpKSkge1xyXG4gICAgICAgICAgY2xhc3NBcnJheSA9IHRoaXMuY2xhc3NlcygpXHJcbiAgICAgICAgICBjbGFzc0FycmF5LnB1c2goY2xhc3NOYW1lKVxyXG4gICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc0FycmF5LmpvaW4oJyAnKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBSZW1vdmUgY2xhc3MgZnJvbSB0aGUgbm9kZVxyXG4gICAgLCByZW1vdmVDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzQXJyYXlcclxuICAgICAgICBpZiAodGhpcy5oYXNDbGFzcyhjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICBjbGFzc0FycmF5ID0gdGhpcy5jbGFzc2VzKCkuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGMgIT0gY2xhc3NOYW1lXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc0FycmF5LmpvaW4oJyAnKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBUb2dnbGUgdGhlIHByZXNlbmNlIG9mIGEgY2xhc3Mgb24gdGhlIG5vZGVcclxuICAgICwgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0NsYXNzKGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFkZENsYXNzKGNsYXNzTmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgcmVmZXJlbmNlZCBlbGVtZW50IGZvcm0gYXR0cmlidXRlIHZhbHVlXHJcbiAgICAsIHJlZmVyZW5jZTogZnVuY3Rpb24oYXR0cikge1xyXG4gICAgICAgIHJldHVybiBTVkcuZ2V0KHRoaXMuYXR0cigpW2F0dHJdKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFByaXZhdGU6IGZpbmQgc3ZnIHBhcmVudCBieSBpbnN0YW5jZVxyXG4gICAgLCBfcGFyZW50OiBmdW5jdGlvbihwYXJlbnQpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXNcclxuICAgICAgICBcclxuICAgICAgICB3aGlsZSAoZWxlbWVudCAhPSBudWxsICYmICEoZWxlbWVudCBpbnN0YW5jZW9mIHBhcmVudCkpXHJcbiAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRcclxuICBcclxuICAgICAgICByZXR1cm4gZWxlbWVudFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcblxyXG4gIFNWRy5QYXJlbnQgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBlbGVtZW50KVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuRWxlbWVudFxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBSZXR1cm5zIGFsbCBjaGlsZCBlbGVtZW50c1xyXG4gICAgICBjaGlsZHJlbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuIHx8ICh0aGlzLl9jaGlsZHJlbiA9IFtdKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBnaXZlbiBlbGVtZW50IGF0IGEgcG9zaXRpb25cclxuICAgICwgYWRkOiBmdW5jdGlvbihlbGVtZW50LCBpKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhcyhlbGVtZW50KSkge1xyXG4gICAgICAgICAgLyogZGVmaW5lIGluc2VydGlvbiBpbmRleCBpZiBub25lIGdpdmVuICovXHJcbiAgICAgICAgICBpID0gaSA9PSBudWxsID8gdGhpcy5jaGlsZHJlbigpLmxlbmd0aCA6IGlcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLyogcmVtb3ZlIHJlZmVyZW5jZXMgZnJvbSBwcmV2aW91cyBwYXJlbnQgKi9cclxuICAgICAgICAgIGlmIChlbGVtZW50LnBhcmVudClcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnQuY2hpbGRyZW4oKS5zcGxpY2UoZWxlbWVudC5wYXJlbnQuaW5kZXgoZWxlbWVudCksIDEpXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8qIGFkZCBlbGVtZW50IHJlZmVyZW5jZXMgKi9cclxuICAgICAgICAgIHRoaXMuY2hpbGRyZW4oKS5zcGxpY2UoaSwgMCwgZWxlbWVudClcclxuICAgICAgICAgIHRoaXMubm9kZS5pbnNlcnRCZWZvcmUoZWxlbWVudC5ub2RlLCB0aGlzLm5vZGUuY2hpbGROb2Rlc1tpXSB8fCBudWxsKVxyXG4gICAgICAgICAgZWxlbWVudC5wYXJlbnQgPSB0aGlzXHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIC8qIHJlcG9zaXRpb24gZGVmcyAqL1xyXG4gICAgICAgIGlmICh0aGlzLl9kZWZzKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fZGVmcy5ub2RlKVxyXG4gICAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMuX2RlZnMubm9kZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBCYXNpY2FsbHkgZG9lcyB0aGUgc2FtZSBhcyBgYWRkKClgIGJ1dCByZXR1cm5zIHRoZSBhZGRlZCBlbGVtZW50IGluc3RlYWRcclxuICAgICwgcHV0OiBmdW5jdGlvbihlbGVtZW50LCBpKSB7XHJcbiAgICAgICAgdGhpcy5hZGQoZWxlbWVudCwgaSlcclxuICAgICAgICByZXR1cm4gZWxlbWVudFxyXG4gICAgICB9XHJcbiAgICAgIC8vIENoZWNrcyBpZiB0aGUgZ2l2ZW4gZWxlbWVudCBpcyBhIGNoaWxkXHJcbiAgICAsIGhhczogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4KGVsZW1lbnQpID49IDBcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXRzIGluZGV4IG9mIGdpdmVuIGVsZW1lbnRcclxuICAgICwgaW5kZXg6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLmluZGV4T2YoZWxlbWVudClcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgYSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleFxyXG4gICAgLCBnZXQ6IGZ1bmN0aW9uKGkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpW2ldXHJcbiAgICAgIH1cclxuICAgICAgLy8gR2V0IGZpcnN0IGNoaWxkLCBza2lwcGluZyB0aGUgZGVmcyBub2RlXHJcbiAgICAsIGZpcnN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpWzBdXHJcbiAgICAgIH1cclxuICAgICAgLy8gR2V0IHRoZSBsYXN0IGNoaWxkXHJcbiAgICAsIGxhc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKClbdGhpcy5jaGlsZHJlbigpLmxlbmd0aCAtIDFdXHJcbiAgICAgIH1cclxuICAgICAgLy8gSXRlcmF0ZXMgb3ZlciBhbGwgY2hpbGRyZW4gYW5kIGludm9rZXMgYSBnaXZlbiBibG9ja1xyXG4gICAgLCBlYWNoOiBmdW5jdGlvbihibG9jaywgZGVlcCkge1xyXG4gICAgICAgIHZhciBpLCBpbFxyXG4gICAgICAgICAgLCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4oKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAoaSA9IDAsIGlsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGNoaWxkcmVuW2ldIGluc3RhbmNlb2YgU1ZHLkVsZW1lbnQpXHJcbiAgICAgICAgICAgIGJsb2NrLmFwcGx5KGNoaWxkcmVuW2ldLCBbaSwgY2hpbGRyZW5dKVxyXG4gIFxyXG4gICAgICAgICAgaWYgKGRlZXAgJiYgKGNoaWxkcmVuW2ldIGluc3RhbmNlb2YgU1ZHLkNvbnRhaW5lcikpXHJcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLmVhY2goYmxvY2ssIGRlZXApXHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFJlbW92ZSBhIGNoaWxkIGVsZW1lbnQgYXQgYSBwb3NpdGlvblxyXG4gICAgLCByZW1vdmVFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbigpLnNwbGljZSh0aGlzLmluZGV4KGVsZW1lbnQpLCAxKVxyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZChlbGVtZW50Lm5vZGUpXHJcbiAgICAgICAgZWxlbWVudC5wYXJlbnQgPSBudWxsXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBSZW1vdmUgYWxsIGVsZW1lbnRzIGluIHRoaXMgY29udGFpbmVyXHJcbiAgICAsIGNsZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvKiByZW1vdmUgY2hpbGRyZW4gKi9cclxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jaGlsZHJlbigpLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgdGhpcy5yZW1vdmVFbGVtZW50KHRoaXMuY2hpbGRyZW4oKVtpXSlcclxuICBcclxuICAgICAgICAvKiByZW1vdmUgZGVmcyBub2RlICovXHJcbiAgICAgICAgaWYgKHRoaXMuX2RlZnMpXHJcbiAgICAgICAgICB0aGlzLl9kZWZzLmNsZWFyKClcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgLCAvLyBHZXQgZGVmc1xyXG4gICAgICBkZWZzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb2MoKS5kZWZzKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuXHJcblxyXG4gIFNWRy5Db250YWluZXIgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBlbGVtZW50KVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuUGFyZW50XHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIEdldCB0aGUgdmlld0JveCBhbmQgY2FsY3VsYXRlIHRoZSB6b29tIHZhbHVlXHJcbiAgICAgIHZpZXdib3g6IGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgLyogYWN0IGFzIGEgZ2V0dGVyIGlmIHRoZXJlIGFyZSBubyBhcmd1bWVudHMgKi9cclxuICAgICAgICAgIHJldHVybiBuZXcgU1ZHLlZpZXdCb3godGhpcylcclxuICAgICAgICBcclxuICAgICAgICAvKiBvdGhlcndpc2UgYWN0IGFzIGEgc2V0dGVyICovXHJcbiAgICAgICAgdiA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/XHJcbiAgICAgICAgICBbdi54LCB2LnksIHYud2lkdGgsIHYuaGVpZ2h0XSA6XHJcbiAgICAgICAgICBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCd2aWV3Qm94JywgdilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgU1ZHLkZYID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIEZYIG9iamVjdFxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIC8qIHN0b3JlIHRhcmdldCBlbGVtZW50ICovXHJcbiAgICAgIHRoaXMudGFyZ2V0ID0gZWxlbWVudFxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBBZGQgYW5pbWF0aW9uIHBhcmFtZXRlcnMgYW5kIHN0YXJ0IGFuaW1hdGlvblxyXG4gICAgICBhbmltYXRlOiBmdW5jdGlvbihkLCBlYXNlLCBkZWxheSkge1xyXG4gICAgICAgIHZhciBha2V5cywgdGtleXMsIHNrZXlzLCBrZXlcclxuICAgICAgICAgICwgZWxlbWVudCA9IHRoaXMudGFyZ2V0XHJcbiAgICAgICAgICAsIGZ4ID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGRpc3NlY3Qgb2JqZWN0IGlmIG9uZSBpcyBwYXNzZWQgKi9cclxuICAgICAgICBpZiAodHlwZW9mIGQgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIGRlbGF5ID0gZC5kZWxheVxyXG4gICAgICAgICAgZWFzZSA9IGQuZWFzZVxyXG4gICAgICAgICAgZCA9IGQuZHVyYXRpb25cclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgLyogZW5zdXJlIGRlZmF1bHQgZHVyYXRpb24gYW5kIGVhc2luZyAqL1xyXG4gICAgICAgIGQgPSBkID09ICc9JyA/IGQgOiBkID09IG51bGwgPyAxMDAwIDogbmV3IFNWRy5OdW1iZXIoZCkudmFsdWVPZigpXHJcbiAgICAgICAgZWFzZSA9IGVhc2UgfHwgJzw+J1xyXG4gIFxyXG4gICAgICAgIC8qIHByb2Nlc3MgdmFsdWVzICovXHJcbiAgICAgICAgZngudG8gPSBmdW5jdGlvbihwb3MpIHtcclxuICAgICAgICAgIHZhciBpXHJcbiAgXHJcbiAgICAgICAgICAvKiBub3JtYWxpc2UgcG9zICovXHJcbiAgICAgICAgICBwb3MgPSBwb3MgPCAwID8gMCA6IHBvcyA+IDEgPyAxIDogcG9zXHJcbiAgXHJcbiAgICAgICAgICAvKiBjb2xsZWN0IGF0dHJpYnV0ZSBrZXlzICovXHJcbiAgICAgICAgICBpZiAoYWtleXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBha2V5cyA9IFtdXHJcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGZ4LmF0dHJzKVxyXG4gICAgICAgICAgICAgIGFrZXlzLnB1c2goa2V5KVxyXG4gIFxyXG4gICAgICAgICAgICAvKiBtYWtlIHN1cmUgbW9ycGhhYmxlIGVsZW1lbnRzIGFyZSBzY2FsZWQsIHRyYW5zbGF0ZWQgYW5kIG1vcnBoZWQgYWxsIHRvZ2V0aGVyICovXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lm1vcnBoQXJyYXkgJiYgKGZ4Ll9wbG90IHx8IGFrZXlzLmluZGV4T2YoJ3BvaW50cycpID4gLTEpKSB7XHJcbiAgICAgICAgICAgICAgLyogZ2V0IGRlc3RpbmF0aW9uICovXHJcbiAgICAgICAgICAgICAgdmFyIGJveFxyXG4gICAgICAgICAgICAgICAgLCBwID0gbmV3IGVsZW1lbnQubW9ycGhBcnJheShmeC5fcGxvdCB8fCBmeC5hdHRycy5wb2ludHMgfHwgZWxlbWVudC5hcnJheSlcclxuICBcclxuICAgICAgICAgICAgICAvKiBhZGQgc2l6ZSAqL1xyXG4gICAgICAgICAgICAgIGlmIChmeC5fc2l6ZSkgcC5zaXplKGZ4Ll9zaXplLndpZHRoLnRvLCBmeC5fc2l6ZS5oZWlnaHQudG8pXHJcbiAgXHJcbiAgICAgICAgICAgICAgLyogYWRkIG1vdmVtZW50ICovXHJcbiAgICAgICAgICAgICAgYm94ID0gcC5iYm94KClcclxuICAgICAgICAgICAgICBpZiAoZnguX3gpIHAubW92ZShmeC5feC50bywgYm94LnkpXHJcbiAgICAgICAgICAgICAgZWxzZSBpZiAoZnguX2N4KSBwLm1vdmUoZnguX2N4LnRvIC0gYm94LndpZHRoIC8gMiwgYm94LnkpXHJcbiAgXHJcbiAgICAgICAgICAgICAgYm94ID0gcC5iYm94KClcclxuICAgICAgICAgICAgICBpZiAoZnguX3kpIHAubW92ZShib3gueCwgZnguX3kudG8pXHJcbiAgICAgICAgICAgICAgZWxzZSBpZiAoZnguX2N5KSBwLm1vdmUoYm94LngsIGZ4Ll9jeS50byAtIGJveC5oZWlnaHQgLyAyKVxyXG4gIFxyXG4gICAgICAgICAgICAgIC8qIGRlbGV0ZSBlbGVtZW50IG9yaWVudGVkIGNoYW5nZXMgKi9cclxuICAgICAgICAgICAgICBkZWxldGUgZnguX3hcclxuICAgICAgICAgICAgICBkZWxldGUgZnguX3lcclxuICAgICAgICAgICAgICBkZWxldGUgZnguX2N4XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGZ4Ll9jeVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBmeC5fc2l6ZVxyXG4gIFxyXG4gICAgICAgICAgICAgIGZ4Ll9wbG90ID0gZWxlbWVudC5hcnJheS5tb3JwaChwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgICAvKiBjb2xsZWN0IHRyYW5zZm9ybWF0aW9uIGtleXMgKi9cclxuICAgICAgICAgIGlmICh0a2V5cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRrZXlzID0gW11cclxuICAgICAgICAgICAgZm9yIChrZXkgaW4gZngudHJhbnMpXHJcbiAgICAgICAgICAgICAgdGtleXMucHVzaChrZXkpXHJcbiAgICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgICAvKiBjb2xsZWN0IHN0eWxlIGtleXMgKi9cclxuICAgICAgICAgIGlmIChza2V5cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNrZXlzID0gW11cclxuICAgICAgICAgICAgZm9yIChrZXkgaW4gZnguc3R5bGVzKVxyXG4gICAgICAgICAgICAgIHNrZXlzLnB1c2goa2V5KVxyXG4gICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgLyogYXBwbHkgZWFzaW5nICovXHJcbiAgICAgICAgICBwb3MgPSBlYXNlID09ICc8PicgP1xyXG4gICAgICAgICAgICAoLU1hdGguY29zKHBvcyAqIE1hdGguUEkpIC8gMikgKyAwLjUgOlxyXG4gICAgICAgICAgZWFzZSA9PSAnPicgP1xyXG4gICAgICAgICAgICBNYXRoLnNpbihwb3MgKiBNYXRoLlBJIC8gMikgOlxyXG4gICAgICAgICAgZWFzZSA9PSAnPCcgP1xyXG4gICAgICAgICAgICAtTWF0aC5jb3MocG9zICogTWF0aC5QSSAvIDIpICsgMSA6XHJcbiAgICAgICAgICBlYXNlID09ICctJyA/XHJcbiAgICAgICAgICAgIHBvcyA6XHJcbiAgICAgICAgICB0eXBlb2YgZWFzZSA9PSAnZnVuY3Rpb24nID9cclxuICAgICAgICAgICAgZWFzZShwb3MpIDpcclxuICAgICAgICAgICAgcG9zXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8qIHJ1biBwbG90IGZ1bmN0aW9uICovXHJcbiAgICAgICAgICBpZiAoZnguX3Bsb3QpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5wbG90KGZ4Ll9wbG90LmF0KHBvcykpXHJcbiAgXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvKiBydW4gYWxsIHgtcG9zaXRpb24gcHJvcGVydGllcyAqL1xyXG4gICAgICAgICAgICBpZiAoZnguX3gpXHJcbiAgICAgICAgICAgICAgZWxlbWVudC54KGZ4Ll94LmF0KHBvcykpXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZ4Ll9jeClcclxuICAgICAgICAgICAgICBlbGVtZW50LmN4KGZ4Ll9jeC5hdChwb3MpKVxyXG4gIFxyXG4gICAgICAgICAgICAvKiBydW4gYWxsIHktcG9zaXRpb24gcHJvcGVydGllcyAqL1xyXG4gICAgICAgICAgICBpZiAoZnguX3kpXHJcbiAgICAgICAgICAgICAgZWxlbWVudC55KGZ4Ll95LmF0KHBvcykpXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZ4Ll9jeSlcclxuICAgICAgICAgICAgICBlbGVtZW50LmN5KGZ4Ll9jeS5hdChwb3MpKVxyXG4gIFxyXG4gICAgICAgICAgICAvKiBydW4gYWxsIHNpemUgcHJvcGVydGllcyAqL1xyXG4gICAgICAgICAgICBpZiAoZnguX3NpemUpXHJcbiAgICAgICAgICAgICAgZWxlbWVudC5zaXplKGZ4Ll9zaXplLndpZHRoLmF0KHBvcyksIGZ4Ll9zaXplLmhlaWdodC5hdChwb3MpKVxyXG4gICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgLyogcnVuIGFsbCB2aWV3Ym94IHByb3BlcnRpZXMgKi9cclxuICAgICAgICAgIGlmIChmeC5fdmlld2JveClcclxuICAgICAgICAgICAgZWxlbWVudC52aWV3Ym94KFxyXG4gICAgICAgICAgICAgIGZ4Ll92aWV3Ym94LnguYXQocG9zKVxyXG4gICAgICAgICAgICAsIGZ4Ll92aWV3Ym94LnkuYXQocG9zKVxyXG4gICAgICAgICAgICAsIGZ4Ll92aWV3Ym94LndpZHRoLmF0KHBvcylcclxuICAgICAgICAgICAgLCBmeC5fdmlld2JveC5oZWlnaHQuYXQocG9zKVxyXG4gICAgICAgICAgICApXHJcbiAgXHJcbiAgICAgICAgICAvKiBydW4gbGVhZGluZyBwcm9wZXJ0eSAqL1xyXG4gICAgICAgICAgaWYgKGZ4Ll9sZWFkaW5nKVxyXG4gICAgICAgICAgICBlbGVtZW50LmxlYWRpbmcoZnguX2xlYWRpbmcuYXQocG9zKSlcclxuICBcclxuICAgICAgICAgIC8qIGFuaW1hdGUgYXR0cmlidXRlcyAqL1xyXG4gICAgICAgICAgZm9yIChpID0gYWtleXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYXR0cihha2V5c1tpXSwgYXQoZnguYXR0cnNbYWtleXNbaV1dLCBwb3MpKVxyXG4gIFxyXG4gICAgICAgICAgLyogYW5pbWF0ZSB0cmFuc2Zvcm1hdGlvbnMgKi9cclxuICAgICAgICAgIGZvciAoaSA9IHRrZXlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICBlbGVtZW50LnRyYW5zZm9ybSh0a2V5c1tpXSwgYXQoZngudHJhbnNbdGtleXNbaV1dLCBwb3MpKVxyXG4gIFxyXG4gICAgICAgICAgLyogYW5pbWF0ZSBzdHlsZXMgKi9cclxuICAgICAgICAgIGZvciAoaSA9IHNrZXlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlKHNrZXlzW2ldLCBhdChmeC5zdHlsZXNbc2tleXNbaV1dLCBwb3MpKVxyXG4gIFxyXG4gICAgICAgICAgLyogY2FsbGJhY2sgZm9yIGVhY2gga2V5ZnJhbWUgKi9cclxuICAgICAgICAgIGlmIChmeC5fZHVyaW5nKVxyXG4gICAgICAgICAgICBmeC5fZHVyaW5nLmNhbGwoZWxlbWVudCwgcG9zLCBmdW5jdGlvbihmcm9tLCB0bykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBhdCh7IGZyb206IGZyb20sIHRvOiB0byB9LCBwb3MpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2YgZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgIC8qIGRlbGF5IGFuaW1hdGlvbiAqL1xyXG4gICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICBcclxuICAgICAgICAgICAgLyogaW5pdGlhbGl6ZSBzaXR1YXRpb24gb2JqZWN0ICovXHJcbiAgICAgICAgICAgIGZ4LnNpdHVhdGlvbiA9IHtcclxuICAgICAgICAgICAgICBpbnRlcnZhbDogMTAwMCAvIDYwXHJcbiAgICAgICAgICAgICwgc3RhcnQ6ICAgIHN0YXJ0XHJcbiAgICAgICAgICAgICwgcGxheTogICAgIHRydWVcclxuICAgICAgICAgICAgLCBmaW5pc2g6ICAgc3RhcnQgKyBkXHJcbiAgICAgICAgICAgICwgZHVyYXRpb246IGRcclxuICAgICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgICAvKiByZW5kZXIgZnVuY3Rpb24gKi9cclxuICAgICAgICAgICAgZngucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgaWYgKGZ4LnNpdHVhdGlvbi5wbGF5ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGNvZGUgd2FzIGJvcnJvd2VkIGZyb20gdGhlIGVtaWxlLmpzIG1pY3JvIGZyYW1ld29yayBieSBUaG9tYXMgRnVjaHMsIGFrYSBNYWRSb2JieS5cclxuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICAgICAgICAgICAgLCBwb3MgPSB0aW1lID4gZnguc2l0dWF0aW9uLmZpbmlzaCA/IDEgOiAodGltZSAtIGZ4LnNpdHVhdGlvbi5zdGFydCkgLyBkXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8qIHByb2Nlc3MgdmFsdWVzICovXHJcbiAgICAgICAgICAgICAgICBmeC50byhwb3MpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8qIGZpbmlzaCBvZmYgYW5pbWF0aW9uICovXHJcbiAgICAgICAgICAgICAgICBpZiAodGltZSA+IGZ4LnNpdHVhdGlvbi5maW5pc2gpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKGZ4Ll9wbG90KVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGxvdChuZXcgU1ZHLlBvaW50QXJyYXkoZnguX3Bsb3QuZGVzdGluYXRpb24pLnNldHRsZSgpKVxyXG4gIFxyXG4gICAgICAgICAgICAgICAgICBpZiAoZnguX2xvb3AgPT09IHRydWUgfHwgKHR5cGVvZiBmeC5fbG9vcCA9PSAnbnVtYmVyJyAmJiBmeC5fbG9vcCA+IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmeC5fbG9vcCA9PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgICAgICAgICAgIC0tZnguX2xvb3BcclxuICAgICAgICAgICAgICAgICAgICBmeC5hbmltYXRlKGQsIGVhc2UsIGRlbGF5KVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ4Ll9hZnRlciA/IGZ4Ll9hZnRlci5hcHBseShlbGVtZW50LCBbZnhdKSA6IGZ4LnN0b3AoKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBmeC5hbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmeC5yZW5kZXIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZ4LmFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ4LnJlbmRlcilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICBcclxuICAgICAgICAgICAgLyogc3RhcnQgYW5pbWF0aW9uICovXHJcbiAgICAgICAgICAgIGZ4LnJlbmRlcigpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSwgbmV3IFNWRy5OdW1iZXIoZGVsYXkpLnZhbHVlT2YoKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgYm91bmRpbmcgYm94IG9mIHRhcmdldCBlbGVtZW50XHJcbiAgICAsIGJib3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldC5iYm94KClcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgYW5pbWF0YWJsZSBhdHRyaWJ1dGVzXHJcbiAgICAsIGF0dHI6IGZ1bmN0aW9uKGEsIHYpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGEgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBhKVxyXG4gICAgICAgICAgICB0aGlzLmF0dHIoa2V5LCBhW2tleV0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBmcm9tID0gdGhpcy50YXJnZXQuYXR0cihhKVxyXG4gIFxyXG4gICAgICAgICAgdGhpcy5hdHRyc1thXSA9IFNWRy5Db2xvci5pc0NvbG9yKGZyb20pID9cclxuICAgICAgICAgICAgbmV3IFNWRy5Db2xvcihmcm9tKS5tb3JwaCh2KSA6XHJcbiAgICAgICAgICBTVkcucmVnZXgudW5pdC50ZXN0KGZyb20pID9cclxuICAgICAgICAgICAgbmV3IFNWRy5OdW1iZXIoZnJvbSkubW9ycGgodikgOlxyXG4gICAgICAgICAgICB7IGZyb206IGZyb20sIHRvOiB2IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgYW5pbWF0YWJsZSB0cmFuc2Zvcm1hdGlvbnNcclxuICAgICwgdHJhbnNmb3JtOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgLyogcGFyc2UgbWF0cml4IHN0cmluZyAqL1xyXG4gICAgICAgICAgbyA9IHBhcnNlTWF0cml4KG8pXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8qIGRsZXRlIG1hdHJpeHN0cmluZyBmcm9tIG9iamVjdCAqL1xyXG4gICAgICAgICAgZGVsZXRlIG8ubWF0cml4XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8qIGFkZCByb3RhdGlvbi1jZW50ZXIgdG8gdHJhbnNmb3JtYXRpb25zICovXHJcbiAgICAgICAgICB0aGlzLnRhcmdldC50cmFucy5jeCA9IG8uY3ggfHwgbnVsbFxyXG4gICAgICAgICAgdGhpcy50YXJnZXQudHJhbnMuY3kgPSBvLmN5IHx8IG51bGxcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgZGVsZXRlIG8uY3hcclxuICAgICAgICAgIGRlbGV0ZSBvLmN5XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8qIHN0b3JlIG1hdHJpeCB2YWx1ZXMgKi9cclxuICAgICAgICAgIGZvciAodiBpbiBvKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zW3ZdID0geyBmcm9tOiB0aGlzLnRhcmdldC50cmFuc1t2XSwgdG86IG9bdl0gfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8qIGFwcGx5IHRyYW5zZm9ybWF0aW9ucyBhcyBvYmplY3QgaWYga2V5IHZhbHVlIGFyZ3VtZW50cyBhcmUgZ2l2ZW4qL1xyXG4gICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHt9XHJcbiAgICAgICAgICB0cmFuc2Zvcm1bb10gPSB2XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHRoaXMudHJhbnNmb3JtKHRyYW5zZm9ybSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgYW5pbWF0YWJsZSBzdHlsZXNcclxuICAgICwgc3R5bGU6IGZ1bmN0aW9uKHMsIHYpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHMgPT0gJ29iamVjdCcpXHJcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcylcclxuICAgICAgICAgICAgdGhpcy5zdHlsZShrZXksIHNba2V5XSlcclxuICAgICAgICBcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICB0aGlzLnN0eWxlc1tzXSA9IHsgZnJvbTogdGhpcy50YXJnZXQuc3R5bGUocyksIHRvOiB2IH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFuaW1hdGFibGUgeC1heGlzXHJcbiAgICAsIHg6IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICB0aGlzLl94ID0gbmV3IFNWRy5OdW1iZXIodGhpcy50YXJnZXQueCgpKS5tb3JwaCh4KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gQW5pbWF0YWJsZSB5LWF4aXNcclxuICAgICwgeTogZnVuY3Rpb24oeSkge1xyXG4gICAgICAgIHRoaXMuX3kgPSBuZXcgU1ZHLk51bWJlcih0aGlzLnRhcmdldC55KCkpLm1vcnBoKHkpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBbmltYXRhYmxlIGNlbnRlciB4LWF4aXNcclxuICAgICwgY3g6IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICB0aGlzLl9jeCA9IG5ldyBTVkcuTnVtYmVyKHRoaXMudGFyZ2V0LmN4KCkpLm1vcnBoKHgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBbmltYXRhYmxlIGNlbnRlciB5LWF4aXNcclxuICAgICwgY3k6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgICB0aGlzLl9jeSA9IG5ldyBTVkcuTnVtYmVyKHRoaXMudGFyZ2V0LmN5KCkpLm1vcnBoKHkpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgYW5pbWF0YWJsZSBtb3ZlXHJcbiAgICAsIG1vdmU6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54KHgpLnkoeSlcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgYW5pbWF0YWJsZSBjZW50ZXJcclxuICAgICwgY2VudGVyOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3goeCkuY3koeSlcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgYW5pbWF0YWJsZSBzaXplXHJcbiAgICAsIHNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQgaW5zdGFuY2VvZiBTVkcuVGV4dCkge1xyXG4gICAgICAgICAgLyogYW5pbWF0ZSBmb250IHNpemUgZm9yIFRleHQgZWxlbWVudHMgKi9cclxuICAgICAgICAgIHRoaXMuYXR0cignZm9udC1zaXplJywgd2lkdGgpXHJcbiAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLyogYW5pbWF0ZSBiYm94IGJhc2VkIHNpemUgZm9yIGFsbCBvdGhlciBlbGVtZW50cyAqL1xyXG4gICAgICAgICAgdmFyIGJveCA9IHRoaXMudGFyZ2V0LmJib3goKVxyXG4gIFxyXG4gICAgICAgICAgdGhpcy5fc2l6ZSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6ICBuZXcgU1ZHLk51bWJlcihib3gud2lkdGgpLm1vcnBoKHdpZHRoKVxyXG4gICAgICAgICAgLCBoZWlnaHQ6IG5ldyBTVkcuTnVtYmVyKGJveC5oZWlnaHQpLm1vcnBoKGhlaWdodClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgYW5pbWF0YWJsZSBwbG90XHJcbiAgICAsIHBsb3Q6IGZ1bmN0aW9uKHApIHtcclxuICAgICAgICB0aGlzLl9wbG90ID0gcFxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIGxlYWRpbmcgbWV0aG9kXHJcbiAgICAsIGxlYWRpbmc6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0Ll9sZWFkaW5nKVxyXG4gICAgICAgICAgdGhpcy5fbGVhZGluZyA9IG5ldyBTVkcuTnVtYmVyKHRoaXMudGFyZ2V0Ll9sZWFkaW5nKS5tb3JwaCh2YWx1ZSlcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBhbmltYXRhYmxlIHZpZXdib3hcclxuICAgICwgdmlld2JveDogZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCBpbnN0YW5jZW9mIFNWRy5Db250YWluZXIpIHtcclxuICAgICAgICAgIHZhciBib3ggPSB0aGlzLnRhcmdldC52aWV3Ym94KClcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgdGhpcy5fdmlld2JveCA9IHtcclxuICAgICAgICAgICAgeDogICAgICBuZXcgU1ZHLk51bWJlcihib3gueCkubW9ycGgoeClcclxuICAgICAgICAgICwgeTogICAgICBuZXcgU1ZHLk51bWJlcihib3gueSkubW9ycGgoeSlcclxuICAgICAgICAgICwgd2lkdGg6ICBuZXcgU1ZHLk51bWJlcihib3gud2lkdGgpLm1vcnBoKHdpZHRoKVxyXG4gICAgICAgICAgLCBoZWlnaHQ6IG5ldyBTVkcuTnVtYmVyKGJveC5oZWlnaHQpLm1vcnBoKGhlaWdodClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgYW5pbWF0ZWFibGUgZ3JhZGllbnQgdXBkYXRlXHJcbiAgICAsIHVwZGF0ZTogZnVuY3Rpb24obykge1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCBpbnN0YW5jZW9mIFNWRy5TdG9wKSB7XHJcbiAgICAgICAgICBpZiAoby5vcGFjaXR5ICE9IG51bGwpIHRoaXMuYXR0cignc3RvcC1vcGFjaXR5Jywgby5vcGFjaXR5KVxyXG4gICAgICAgICAgaWYgKG8uY29sb3IgICAhPSBudWxsKSB0aGlzLmF0dHIoJ3N0b3AtY29sb3InLCBvLmNvbG9yKVxyXG4gICAgICAgICAgaWYgKG8ub2Zmc2V0ICAhPSBudWxsKSB0aGlzLmF0dHIoJ29mZnNldCcsIG5ldyBTVkcuTnVtYmVyKG8ub2Zmc2V0KSlcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgY2FsbGJhY2sgZm9yIGVhY2gga2V5ZnJhbWVcclxuICAgICwgZHVyaW5nOiBmdW5jdGlvbihkdXJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kdXJpbmcgPSBkdXJpbmdcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIENhbGxiYWNrIGFmdGVyIGFuaW1hdGlvblxyXG4gICAgLCBhZnRlcjogZnVuY3Rpb24oYWZ0ZXIpIHtcclxuICAgICAgICB0aGlzLl9hZnRlciA9IGFmdGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBNYWtlIGxvb3BhYmxlXHJcbiAgICAsIGxvb3A6IGZ1bmN0aW9uKHRpbWVzKSB7XHJcbiAgICAgICAgdGhpcy5fbG9vcCA9IHRpbWVzIHx8IHRydWVcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFN0b3AgcnVubmluZyBhbmltYXRpb25cclxuICAgICwgc3RvcDogZnVuY3Rpb24oZnVsZmlsbCkge1xyXG4gICAgICAgIC8qIGZ1bGZpbGwgYW5pbWF0aW9uICovXHJcbiAgICAgICAgaWYgKGZ1bGZpbGwgPT09IHRydWUpIHtcclxuICBcclxuICAgICAgICAgIHRoaXMuYW5pbWF0ZSgwKVxyXG4gIFxyXG4gICAgICAgICAgaWYgKHRoaXMuX2FmdGVyKVxyXG4gICAgICAgICAgICB0aGlzLl9hZnRlci5hcHBseSh0aGlzLnRhcmdldCwgW3RoaXNdKVxyXG4gIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvKiBzdG9wIGN1cnJlbnQgYW5pbWF0aW9uICovXHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KVxyXG4gICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25GcmFtZSk7XHJcbiAgXHJcbiAgICAgICAgICAvKiByZXNldCBzdG9yYWdlIGZvciBwcm9wZXJ0aWVzIHRoYXQgbmVlZCBhbmltYXRpb24gKi9cclxuICAgICAgICAgIHRoaXMuYXR0cnMgICAgID0ge31cclxuICAgICAgICAgIHRoaXMudHJhbnMgICAgID0ge31cclxuICAgICAgICAgIHRoaXMuc3R5bGVzICAgID0ge31cclxuICAgICAgICAgIHRoaXMuc2l0dWF0aW9uID0ge31cclxuICBcclxuICAgICAgICAgIC8qIGRlbGV0ZSBkZXN0aW5hdGlvbnMgKi9cclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl94XHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5feVxyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2N4XHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5fY3lcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9zaXplXHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5fcGxvdFxyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2xvb3BcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9hZnRlclxyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2R1cmluZ1xyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2xlYWRpbmdcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl92aWV3Ym94XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gUGF1c2UgcnVubmluZyBhbmltYXRpb25cclxuICAgICwgcGF1c2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNpdHVhdGlvbi5wbGF5ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICB0aGlzLnNpdHVhdGlvbi5wbGF5ICA9IGZhbHNlXHJcbiAgICAgICAgICB0aGlzLnNpdHVhdGlvbi5wYXVzZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gUGxheSBydW5uaW5nIGFuaW1hdGlvblxyXG4gICAgLCBwbGF5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5zaXR1YXRpb24ucGxheSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHZhciBwYXVzZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5zaXR1YXRpb24ucGF1c2VcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgdGhpcy5zaXR1YXRpb24uZmluaXNoICs9IHBhdXNlXHJcbiAgICAgICAgICB0aGlzLnNpdHVhdGlvbi5zdGFydCAgKz0gcGF1c2VcclxuICAgICAgICAgIHRoaXMuc2l0dWF0aW9uLnBsYXkgICAgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBEZWZpbmUgcGFyZW50IGNsYXNzXHJcbiAgLCBwYXJlbnQ6IFNWRy5FbGVtZW50XHJcbiAgXHJcbiAgICAvLyBBZGQgbWV0aG9kIHRvIHBhcmVudCBlbGVtZW50c1xyXG4gICwgY29uc3RydWN0OiB7XHJcbiAgICAgIC8vIEdldCBmeCBtb2R1bGUgb3IgY3JlYXRlIGEgbmV3IG9uZSwgdGhlbiBhbmltYXRlIHdpdGggZ2l2ZW4gZHVyYXRpb24gYW5kIGVhc2VcclxuICAgICAgYW5pbWF0ZTogZnVuY3Rpb24oZCwgZWFzZSwgZGVsYXkpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZnggfHwgKHRoaXMuZnggPSBuZXcgU1ZHLkZYKHRoaXMpKSkuc3RvcCgpLmFuaW1hdGUoZCwgZWFzZSwgZGVsYXkpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU3RvcCBjdXJyZW50IGFuaW1hdGlvbjsgdGhpcyBpcyBhbiBhbGlhcyB0byB0aGUgZnggaW5zdGFuY2VcclxuICAgICwgc3RvcDogZnVuY3Rpb24oZnVsZmlsbCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZ4KVxyXG4gICAgICAgICAgdGhpcy5meC5zdG9wKGZ1bGZpbGwpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBQYXVzZSBjdXJyZW50IGFuaW1hdGlvblxyXG4gICAgLCBwYXVzZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZngpXHJcbiAgICAgICAgICB0aGlzLmZ4LnBhdXNlKClcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFBsYXkgcGF1c2VkIGN1cnJlbnQgYW5pbWF0aW9uXHJcbiAgICAsIHBsYXk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZ4KVxyXG4gICAgICAgICAgdGhpcy5meC5wbGF5KClcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG5cclxuICBTVkcuZXh0ZW5kKFNWRy5FbGVtZW50LCBTVkcuRlgsIHtcclxuICAgIC8vIFJlbGF0aXZlIG1vdmUgb3ZlciB4IGF4aXNcclxuICAgIGR4OiBmdW5jdGlvbih4KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLngoKHRoaXMudGFyZ2V0IHx8IHRoaXMpLngoKSArIHgpXHJcbiAgICB9XHJcbiAgICAvLyBSZWxhdGl2ZSBtb3ZlIG92ZXIgeSBheGlzXHJcbiAgLCBkeTogZnVuY3Rpb24oeSkge1xyXG4gICAgICByZXR1cm4gdGhpcy55KCh0aGlzLnRhcmdldCB8fCB0aGlzKS55KCkgKyB5KVxyXG4gICAgfVxyXG4gICAgLy8gUmVsYXRpdmUgbW92ZSBvdmVyIHggYW5kIHkgYXhlc1xyXG4gICwgZG1vdmU6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZHgoeCkuZHkoeSlcclxuICAgIH1cclxuICBcclxuICB9KVxyXG5cclxuICA7WyAgJ2NsaWNrJ1xyXG4gICAgLCAnZGJsY2xpY2snXHJcbiAgICAsICdtb3VzZWRvd24nXHJcbiAgICAsICdtb3VzZXVwJ1xyXG4gICAgLCAnbW91c2VvdmVyJ1xyXG4gICAgLCAnbW91c2VvdXQnXHJcbiAgICAsICdtb3VzZW1vdmUnXHJcbiAgICAvLyAsICdtb3VzZWVudGVyJyAtPiBub3Qgc3VwcG9ydGVkIGJ5IElFXHJcbiAgICAvLyAsICdtb3VzZWxlYXZlJyAtPiBub3Qgc3VwcG9ydGVkIGJ5IElFXHJcbiAgICAsICd0b3VjaHN0YXJ0J1xyXG4gICAgLCAndG91Y2htb3ZlJ1xyXG4gICAgLCAndG91Y2hsZWF2ZSdcclxuICAgICwgJ3RvdWNoZW5kJ1xyXG4gICAgLCAndG91Y2hjYW5jZWwnIF0uZm9yRWFjaChmdW5jdGlvbihldmVudCkge1xyXG4gICAgXHJcbiAgICAvKiBhZGQgZXZlbnQgdG8gU1ZHLkVsZW1lbnQgKi9cclxuICAgIFNWRy5FbGVtZW50LnByb3RvdHlwZVtldmVudF0gPSBmdW5jdGlvbihmKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICBcclxuICAgICAgLyogYmluZCBldmVudCB0byBlbGVtZW50IHJhdGhlciB0aGFuIGVsZW1lbnQgbm9kZSAqL1xyXG4gICAgICB0aGlzLm5vZGVbJ29uJyArIGV2ZW50XSA9IHR5cGVvZiBmID09ICdmdW5jdGlvbicgP1xyXG4gICAgICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gZi5hcHBseShzZWxmLCBhcmd1bWVudHMpIH0gOiBudWxsXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuICBcclxuICAvLyBJbml0aWFsaXplIGxpc3RlbmVycyBzdGFja1xyXG4gIFNWRy5saXN0ZW5lcnMgPSBbXVxyXG4gIFNWRy5oYW5kbGVyTWFwID0gW11cclxuICBcclxuICAvLyBPbmx5IGtlcHQgZm9yIGNvbnNpc3RlbmN5IG9mIEFQSVxyXG4gIFNWRy5yZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24oKXt9O1xyXG4gIFxyXG4gIC8vIEFkZCBldmVudCBiaW5kZXIgaW4gdGhlIFNWRyBuYW1lc3BhY2VcclxuICBTVkcub24gPSBmdW5jdGlvbihub2RlLCBldmVudCwgbGlzdGVuZXIpIHtcclxuICAgIC8vIGNyZWF0ZSBsaXN0ZW5lciwgZ2V0IG9iamVjdC1pbmRleFxyXG4gICAgdmFyIGwgICAgID0gbGlzdGVuZXIuYmluZChub2RlLmluc3RhbmNlIHx8IG5vZGUpXHJcbiAgICAgICwgaW5kZXggPSAoU1ZHLmhhbmRsZXJNYXAuaW5kZXhPZihub2RlKSArIDEgfHwgU1ZHLmhhbmRsZXJNYXAucHVzaChub2RlKSkgLSAxXHJcbiAgICAgICwgZXYgICAgPSBldmVudC5zcGxpdCgnLicpWzBdXHJcbiAgICAgICwgbnMgICAgPSBldmVudC5zcGxpdCgnLicpWzFdIHx8ICcqJ1xyXG4gICAgICBcclxuICAgIFxyXG4gICAgLy8gZW5zdXJlIHZhbGlkIG9iamVjdFxyXG4gICAgU1ZHLmxpc3RlbmVyc1tpbmRleF0gICAgICAgICA9IFNWRy5saXN0ZW5lcnNbaW5kZXhdICAgICAgICAgfHwge31cclxuICAgIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XSAgICAgPSBTVkcubGlzdGVuZXJzW2luZGV4XVtldl0gICAgIHx8IHt9XHJcbiAgICBTVkcubGlzdGVuZXJzW2luZGV4XVtldl1bbnNdID0gU1ZHLmxpc3RlbmVyc1tpbmRleF1bZXZdW25zXSB8fCB7fVxyXG4gIFxyXG4gICAgLy8gcmVmZXJlbmNlIGxpc3RlbmVyXHJcbiAgICBTVkcubGlzdGVuZXJzW2luZGV4XVtldl1bbnNdW2xpc3RlbmVyXSA9IGxcclxuICBcclxuICAgIC8vIGFkZCBsaXN0ZW5lclxyXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2LCBsLCBmYWxzZSlcclxuICB9XHJcbiAgXHJcbiAgLy8gQWRkIGV2ZW50IHVuYmluZGVyIGluIHRoZSBTVkcgbmFtZXNwYWNlXHJcbiAgU1ZHLm9mZiA9IGZ1bmN0aW9uKG5vZGUsIGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgdmFyIGluZGV4ID0gU1ZHLmhhbmRsZXJNYXAuaW5kZXhPZihub2RlKVxyXG4gICAgICAsIGV2ICAgID0gZXZlbnQgJiYgZXZlbnQuc3BsaXQoJy4nKVswXVxyXG4gICAgICAsIG5zICAgID0gZXZlbnQgJiYgZXZlbnQuc3BsaXQoJy4nKVsxXVxyXG4gIFxyXG4gICAgaWYoaW5kZXggPT0gLTEpIHJldHVyblxyXG4gICAgXHJcbiAgICBpZiAobGlzdGVuZXIpIHtcclxuICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIHJlZmVyZW5jZVxyXG4gICAgICBpZiAoU1ZHLmxpc3RlbmVyc1tpbmRleF1bZXZdICYmIFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XVtucyB8fCAnKiddKSB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyXHJcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2LCBTVkcubGlzdGVuZXJzW2luZGV4XVtldl1bbnMgfHwgJyonXVtsaXN0ZW5lcl0sIGZhbHNlKVxyXG4gIFxyXG4gICAgICAgIGRlbGV0ZSBTVkcubGlzdGVuZXJzW2luZGV4XVtldl1bbnMgfHwgJyonXVtsaXN0ZW5lcl1cclxuICAgICAgfVxyXG4gIFxyXG4gICAgfSBlbHNlIGlmIChucykge1xyXG4gICAgICAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdGhlIG5hbWVzcGFjZWQgZXZlbnRcclxuICAgICAgaWYgKFNWRy5saXN0ZW5lcnNbaW5kZXhdW2V2XSAmJiBTVkcubGlzdGVuZXJzW2luZGV4XVtldl1bbnNdKSB7XHJcbiAgICAgICAgZm9yIChsaXN0ZW5lciBpbiBTVkcubGlzdGVuZXJzW2luZGV4XVtldl1bbnNdKVxyXG4gICAgICAgICAgU1ZHLm9mZihub2RlLCBbZXYsIG5zXS5qb2luKCcuJyksIGxpc3RlbmVyKVxyXG4gIFxyXG4gICAgICAgIGRlbGV0ZSBTVkcubGlzdGVuZXJzW2luZGV4XVtldl1bbnNdXHJcbiAgICAgIH1cclxuICBcclxuICAgIH0gZWxzZSBpZiAoZXYpIHtcclxuICAgICAgLy8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBldmVudFxyXG4gICAgICBpZiAoU1ZHLmxpc3RlbmVyc1tpbmRleF1bZXZdKSB7XHJcbiAgICAgICAgZm9yIChuYW1lc3BhY2UgaW4gU1ZHLmxpc3RlbmVyc1tpbmRleF1bZXZdKVxyXG4gICAgICAgICAgU1ZHLm9mZihub2RlLCBbZXYsIG5hbWVzcGFjZV0uam9pbignLicpKVxyXG4gIFxyXG4gICAgICAgIGRlbGV0ZSBTVkcubGlzdGVuZXJzW2luZGV4XVtldl1cclxuICAgICAgfVxyXG4gIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb24gYSBnaXZlbiBub2RlXHJcbiAgICAgIGZvciAoZXZlbnQgaW4gU1ZHLmxpc3RlbmVyc1tpbmRleF0pXHJcbiAgICAgICAgU1ZHLm9mZihub2RlLCBldmVudClcclxuICBcclxuICAgICAgZGVsZXRlIFNWRy5saXN0ZW5lcnNbaW5kZXhdXHJcbiAgXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8vXHJcbiAgU1ZHLmV4dGVuZChTVkcuRWxlbWVudCwge1xyXG4gICAgLy8gQmluZCBnaXZlbiBldmVudCB0byBsaXN0ZW5lclxyXG4gICAgb246IGZ1bmN0aW9uKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICBTVkcub24odGhpcy5ub2RlLCBldmVudCwgbGlzdGVuZXIpXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gVW5iaW5kIGV2ZW50IGZyb20gbGlzdGVuZXJcclxuICAsIG9mZjogZnVuY3Rpb24oZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgIFNWRy5vZmYodGhpcy5ub2RlLCBldmVudCwgbGlzdGVuZXIpXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gRmlyZSBnaXZlbiBldmVudFxyXG4gICwgZmlyZTogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcclxuICAgICAgXHJcbiAgICAgIC8vIERpc3BhdGNoIGV2ZW50XHJcbiAgICAgIHRoaXMubm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldmVudCwge2RldGFpbDpkYXRhfSkpXHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgU1ZHLkRlZnMgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAnZGVmcydcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkNvbnRhaW5lclxyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgU1ZHLkcgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAnZydcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkNvbnRhaW5lclxyXG4gICAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIE1vdmUgb3ZlciB4LWF4aXNcclxuICAgICAgeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHJldHVybiB4ID09IG51bGwgPyB0aGlzLnRyYW5zLnggOiB0aGlzLnRyYW5zZm9ybSgneCcsIHgpXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBvdmVyIHktYXhpc1xyXG4gICAgLCB5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMudHJhbnMueSA6IHRoaXMudHJhbnNmb3JtKCd5JywgeSlcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHgtYXhpc1xyXG4gICAgLCBjeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHJldHVybiB4ID09IG51bGwgPyB0aGlzLmJib3goKS5jeCA6IHRoaXMueCh4IC0gdGhpcy5iYm94KCkud2lkdGggLyAyKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgYnkgY2VudGVyIG92ZXIgeS1heGlzXHJcbiAgICAsIGN5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMuYmJveCgpLmN5IDogdGhpcy55KHkgLSB0aGlzLmJib3goKS5oZWlnaHQgLyAyKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgZ3JvdXAgZWxlbWVudFxyXG4gICAgICBncm91cDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuRylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIFNWRy5leHRlbmQoU1ZHLkVsZW1lbnQsIHtcclxuICAgIC8vIEdldCBhbGwgc2libGluZ3MsIGluY2x1ZGluZyBteXNlbGZcclxuICAgIHNpYmxpbmdzOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmNoaWxkcmVuKClcclxuICAgIH1cclxuICAgIC8vIEdldCB0aGUgY3VyZW50IHBvc2l0aW9uIHNpYmxpbmdzXHJcbiAgLCBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudC5pbmRleCh0aGlzKVxyXG4gICAgfVxyXG4gICAgLy8gR2V0IHRoZSBuZXh0IGVsZW1lbnQgKHdpbGwgcmV0dXJuIG51bGwgaWYgdGhlcmUgaXMgbm9uZSlcclxuICAsIG5leHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zaWJsaW5ncygpW3RoaXMucG9zaXRpb24oKSArIDFdXHJcbiAgICB9XHJcbiAgICAvLyBHZXQgdGhlIG5leHQgZWxlbWVudCAod2lsbCByZXR1cm4gbnVsbCBpZiB0aGVyZSBpcyBub25lKVxyXG4gICwgcHJldmlvdXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zaWJsaW5ncygpW3RoaXMucG9zaXRpb24oKSAtIDFdXHJcbiAgICB9XHJcbiAgICAvLyBTZW5kIGdpdmVuIGVsZW1lbnQgb25lIHN0ZXAgZm9yd2FyZFxyXG4gICwgZm9yd2FyZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBpID0gdGhpcy5wb3NpdGlvbigpXHJcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudC5yZW1vdmVFbGVtZW50KHRoaXMpLnB1dCh0aGlzLCBpICsgMSlcclxuICAgIH1cclxuICAgIC8vIFNlbmQgZ2l2ZW4gZWxlbWVudCBvbmUgc3RlcCBiYWNrd2FyZFxyXG4gICwgYmFja3dhcmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaSA9IHRoaXMucG9zaXRpb24oKVxyXG4gICAgICBcclxuICAgICAgaWYgKGkgPiAwKVxyXG4gICAgICAgIHRoaXMucGFyZW50LnJlbW92ZUVsZW1lbnQodGhpcykuYWRkKHRoaXMsIGkgLSAxKVxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gU2VuZCBnaXZlbiBlbGVtZW50IGFsbCB0aGUgd2F5IHRvIHRoZSBmcm9udFxyXG4gICwgZnJvbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQucmVtb3ZlRWxlbWVudCh0aGlzKS5wdXQodGhpcylcclxuICAgIH1cclxuICAgIC8vIFNlbmQgZ2l2ZW4gZWxlbWVudCBhbGwgdGhlIHdheSB0byB0aGUgYmFja1xyXG4gICwgYmFjazogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uKCkgPiAwKVxyXG4gICAgICAgIHRoaXMucGFyZW50LnJlbW92ZUVsZW1lbnQodGhpcykuYWRkKHRoaXMsIDApXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gSW5zZXJ0cyBhIGdpdmVuIGVsZW1lbnQgYmVmb3JlIHRoZSB0YXJnZXRlZCBlbGVtZW50XHJcbiAgLCBiZWZvcmU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5yZW1vdmUoKVxyXG4gIFxyXG4gICAgICB2YXIgaSA9IHRoaXMucG9zaXRpb24oKVxyXG4gICAgICBcclxuICAgICAgdGhpcy5wYXJlbnQuYWRkKGVsZW1lbnQsIGkpXHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBJbnN0ZXJzIGEgZ2l2ZW4gZWxlbWVudCBhZnRlciB0aGUgdGFyZ2V0ZWQgZWxlbWVudFxyXG4gICwgYWZ0ZXI6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5yZW1vdmUoKVxyXG4gICAgICBcclxuICAgICAgdmFyIGkgPSB0aGlzLnBvc2l0aW9uKClcclxuICAgICAgXHJcbiAgICAgIHRoaXMucGFyZW50LmFkZChlbGVtZW50LCBpICsgMSlcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICBcclxuICB9KVxyXG5cclxuICBTVkcuTWFzayA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgU1ZHLmNyZWF0ZSgnbWFzaycpKVxyXG4gIFxyXG4gICAgICAvKiBrZWVwIHJlZmVyZW5jZXMgdG8gbWFza2VkIGVsZW1lbnRzICovXHJcbiAgICAgIHRoaXMudGFyZ2V0cyA9IFtdXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5Db250YWluZXJcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gVW5tYXNrIGFsbCBtYXNrZWQgZWxlbWVudHMgYW5kIHJlbW92ZSBpdHNlbGZcclxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvKiB1bm1hc2sgYWxsIHRhcmdldHMgKi9cclxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50YXJnZXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgaWYgKHRoaXMudGFyZ2V0c1tpXSlcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRzW2ldLnVubWFzaygpXHJcbiAgICAgICAgZGVsZXRlIHRoaXMudGFyZ2V0c1xyXG4gIFxyXG4gICAgICAgIC8qIHJlbW92ZSBtYXNrIGZyb20gcGFyZW50ICovXHJcbiAgICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlRWxlbWVudCh0aGlzKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgbWFza2luZyBlbGVtZW50XHJcbiAgICAgIG1hc2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZnMoKS5wdXQobmV3IFNWRy5NYXNrKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICBcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5FbGVtZW50LCB7XHJcbiAgICAvLyBEaXN0cmlidXRlIG1hc2sgdG8gc3ZnIGVsZW1lbnRcclxuICAgIG1hc2tXaXRoOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIC8qIHVzZSBnaXZlbiBtYXNrIG9yIGNyZWF0ZSBhIG5ldyBvbmUgKi9cclxuICAgICAgdGhpcy5tYXNrZXIgPSBlbGVtZW50IGluc3RhbmNlb2YgU1ZHLk1hc2sgPyBlbGVtZW50IDogdGhpcy5wYXJlbnQubWFzaygpLmFkZChlbGVtZW50KVxyXG4gIFxyXG4gICAgICAvKiBzdG9yZSByZXZlcmVuY2Ugb24gc2VsZiBpbiBtYXNrICovXHJcbiAgICAgIHRoaXMubWFza2VyLnRhcmdldHMucHVzaCh0aGlzKVxyXG4gICAgICBcclxuICAgICAgLyogYXBwbHkgbWFzayAqL1xyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdtYXNrJywgJ3VybChcIiMnICsgdGhpcy5tYXNrZXIuYXR0cignaWQnKSArICdcIiknKVxyXG4gICAgfVxyXG4gICAgLy8gVW5tYXNrIGVsZW1lbnRcclxuICAsIHVubWFzazogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLm1hc2tlclxyXG4gICAgICByZXR1cm4gdGhpcy5hdHRyKCdtYXNrJywgbnVsbClcclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcblxyXG5cclxuICBTVkcuQ2xpcCA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgU1ZHLmNyZWF0ZSgnY2xpcFBhdGgnKSlcclxuICBcclxuICAgICAgLyoga2VlcCByZWZlcmVuY2VzIHRvIGNsaXBwZWQgZWxlbWVudHMgKi9cclxuICAgICAgdGhpcy50YXJnZXRzID0gW11cclxuICAgIH1cclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkNvbnRhaW5lclxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBVbmNsaXAgYWxsIGNsaXBwZWQgZWxlbWVudHMgYW5kIHJlbW92ZSBpdHNlbGZcclxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvKiB1bmNsaXAgYWxsIHRhcmdldHMgKi9cclxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50YXJnZXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgaWYgKHRoaXMudGFyZ2V0c1tpXSlcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRzW2ldLnVuY2xpcCgpXHJcbiAgICAgICAgZGVsZXRlIHRoaXMudGFyZ2V0c1xyXG4gIFxyXG4gICAgICAgIC8qIHJlbW92ZSBjbGlwUGF0aCBmcm9tIHBhcmVudCAqL1xyXG4gICAgICAgIHRoaXMucGFyZW50LnJlbW92ZUVsZW1lbnQodGhpcylcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGNsaXBwaW5nIGVsZW1lbnRcclxuICAgICAgY2xpcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLnB1dChuZXcgU1ZHLkNsaXApXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG4gIFxyXG4gIC8vXHJcbiAgU1ZHLmV4dGVuZChTVkcuRWxlbWVudCwge1xyXG4gICAgLy8gRGlzdHJpYnV0ZSBjbGlwUGF0aCB0byBzdmcgZWxlbWVudFxyXG4gICAgY2xpcFdpdGg6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgLyogdXNlIGdpdmVuIGNsaXAgb3IgY3JlYXRlIGEgbmV3IG9uZSAqL1xyXG4gICAgICB0aGlzLmNsaXBwZXIgPSBlbGVtZW50IGluc3RhbmNlb2YgU1ZHLkNsaXAgPyBlbGVtZW50IDogdGhpcy5wYXJlbnQuY2xpcCgpLmFkZChlbGVtZW50KVxyXG4gIFxyXG4gICAgICAvKiBzdG9yZSByZXZlcmVuY2Ugb24gc2VsZiBpbiBtYXNrICovXHJcbiAgICAgIHRoaXMuY2xpcHBlci50YXJnZXRzLnB1c2godGhpcylcclxuICAgICAgXHJcbiAgICAgIC8qIGFwcGx5IG1hc2sgKi9cclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cignY2xpcC1wYXRoJywgJ3VybChcIiMnICsgdGhpcy5jbGlwcGVyLmF0dHIoJ2lkJykgKyAnXCIpJylcclxuICAgIH1cclxuICAgIC8vIFVuY2xpcCBlbGVtZW50XHJcbiAgLCB1bmNsaXA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBkZWxldGUgdGhpcy5jbGlwcGVyXHJcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2NsaXAtcGF0aCcsIG51bGwpXHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG5cclxuICBTVkcuR3JhZGllbnQgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBTVkcuY3JlYXRlKHR5cGUgKyAnR3JhZGllbnQnKSlcclxuICAgICAgXHJcbiAgICAgIC8qIHN0b3JlIHR5cGUgKi9cclxuICAgICAgdGhpcy50eXBlID0gdHlwZVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuQ29udGFpbmVyXHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIEZyb20gcG9zaXRpb25cclxuICAgICAgZnJvbTogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgPT0gJ3JhZGlhbCcgP1xyXG4gICAgICAgICAgdGhpcy5hdHRyKHsgZng6IG5ldyBTVkcuTnVtYmVyKHgpLCBmeTogbmV3IFNWRy5OdW1iZXIoeSkgfSkgOlxyXG4gICAgICAgICAgdGhpcy5hdHRyKHsgeDE6IG5ldyBTVkcuTnVtYmVyKHgpLCB5MTogbmV3IFNWRy5OdW1iZXIoeSkgfSlcclxuICAgICAgfVxyXG4gICAgICAvLyBUbyBwb3NpdGlvblxyXG4gICAgLCB0bzogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgPT0gJ3JhZGlhbCcgP1xyXG4gICAgICAgICAgdGhpcy5hdHRyKHsgY3g6IG5ldyBTVkcuTnVtYmVyKHgpLCBjeTogbmV3IFNWRy5OdW1iZXIoeSkgfSkgOlxyXG4gICAgICAgICAgdGhpcy5hdHRyKHsgeDI6IG5ldyBTVkcuTnVtYmVyKHgpLCB5MjogbmV3IFNWRy5OdW1iZXIoeSkgfSlcclxuICAgICAgfVxyXG4gICAgICAvLyBSYWRpdXMgZm9yIHJhZGlhbCBncmFkaWVudFxyXG4gICAgLCByYWRpdXM6IGZ1bmN0aW9uKHIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlID09ICdyYWRpYWwnID9cclxuICAgICAgICAgIHRoaXMuYXR0cih7IHI6IG5ldyBTVkcuTnVtYmVyKHIpIH0pIDpcclxuICAgICAgICAgIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgYSBjb2xvciBzdG9wXHJcbiAgICAsIGF0OiBmdW5jdGlvbihvZmZzZXQsIGNvbG9yLCBvcGFjaXR5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuU3RvcCkudXBkYXRlKG9mZnNldCwgY29sb3IsIG9wYWNpdHkpXHJcbiAgICAgIH1cclxuICAgICAgLy8gVXBkYXRlIGdyYWRpZW50XHJcbiAgICAsIHVwZGF0ZTogZnVuY3Rpb24oYmxvY2spIHtcclxuICAgICAgICAvKiByZW1vdmUgYWxsIHN0b3BzICovXHJcbiAgICAgICAgdGhpcy5jbGVhcigpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogaW52b2tlIHBhc3NlZCBibG9jayAqL1xyXG4gICAgICAgIGlmICh0eXBlb2YgYmxvY2sgPT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgIGJsb2NrLmNhbGwodGhpcywgdGhpcylcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFJldHVybiB0aGUgZmlsbCBpZFxyXG4gICAgLCBmaWxsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJ3VybCgjJyArIHRoaXMuaWQoKSArICcpJ1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFsaWFzIHN0cmluZyBjb252ZXJ0aW9uIHRvIGZpbGxcclxuICAgICwgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbGwoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGdyYWRpZW50IGVsZW1lbnQgaW4gZGVmc1xyXG4gICAgICBncmFkaWVudDogZnVuY3Rpb24odHlwZSwgYmxvY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWZzKCkuZ3JhZGllbnQodHlwZSwgYmxvY2spXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG4gIFxyXG4gIFNWRy5leHRlbmQoU1ZHLkRlZnMsIHtcclxuICAgIC8vIGRlZmluZSBncmFkaWVudFxyXG4gICAgZ3JhZGllbnQ6IGZ1bmN0aW9uKHR5cGUsIGJsb2NrKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLkdyYWRpZW50KHR5cGUpKS51cGRhdGUoYmxvY2spXHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG4gIFxyXG4gIFNWRy5TdG9wID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ3N0b3AnXHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5FbGVtZW50XHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIGFkZCBjb2xvciBzdG9wc1xyXG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uKG8pIHtcclxuICAgICAgICBpZiAodHlwZW9mIG8gPT0gJ251bWJlcicgfHwgbyBpbnN0YW5jZW9mIFNWRy5OdW1iZXIpIHtcclxuICAgICAgICAgIG8gPSB7XHJcbiAgICAgICAgICAgIG9mZnNldDogIGFyZ3VtZW50c1swXVxyXG4gICAgICAgICAgLCBjb2xvcjogICBhcmd1bWVudHNbMV1cclxuICAgICAgICAgICwgb3BhY2l0eTogYXJndW1lbnRzWzJdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIC8qIHNldCBhdHRyaWJ1dGVzICovXHJcbiAgICAgICAgaWYgKG8ub3BhY2l0eSAhPSBudWxsKSB0aGlzLmF0dHIoJ3N0b3Atb3BhY2l0eScsIG8ub3BhY2l0eSlcclxuICAgICAgICBpZiAoby5jb2xvciAgICE9IG51bGwpIHRoaXMuYXR0cignc3RvcC1jb2xvcicsIG8uY29sb3IpXHJcbiAgICAgICAgaWYgKG8ub2Zmc2V0ICAhPSBudWxsKSB0aGlzLmF0dHIoJ29mZnNldCcsIG5ldyBTVkcuTnVtYmVyKG8ub2Zmc2V0KSlcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgfSlcclxuXHJcblxyXG4gIFNWRy5QYXR0ZXJuID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ3BhdHRlcm4nXHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5Db250YWluZXJcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gUmV0dXJuIHRoZSBmaWxsIGlkXHJcbiAgXHQgIGZpbGw6IGZ1bmN0aW9uKCkge1xyXG4gIFx0ICAgIHJldHVybiAndXJsKCMnICsgdGhpcy5pZCgpICsgJyknXHJcbiAgXHQgIH1cclxuICBcdCAgLy8gVXBkYXRlIHBhdHRlcm4gYnkgcmVidWlsZGluZ1xyXG4gIFx0LCB1cGRhdGU6IGZ1bmN0aW9uKGJsb2NrKSB7XHJcbiAgXHRcdFx0LyogcmVtb3ZlIGNvbnRlbnQgKi9cclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgICBcclxuICAgICAgICAvKiBpbnZva2UgcGFzc2VkIGJsb2NrICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiBibG9jayA9PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgIFx0YmxvY2suY2FsbCh0aGlzLCB0aGlzKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgXHRcdH1cclxuICBcdCAgLy8gQWxpYXMgc3RyaW5nIGNvbnZlcnRpb24gdG8gZmlsbFxyXG4gIFx0LCB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgXHQgICAgcmV0dXJuIHRoaXMuZmlsbCgpXHJcbiAgXHQgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgICAvLyBDcmVhdGUgcGF0dGVybiBlbGVtZW50IGluIGRlZnNcclxuICBcdCAgcGF0dGVybjogZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgYmxvY2spIHtcclxuICBcdCAgICByZXR1cm4gdGhpcy5kZWZzKCkucGF0dGVybih3aWR0aCwgaGVpZ2h0LCBibG9jaylcclxuICBcdCAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuRGVmcywge1xyXG4gICAgLy8gRGVmaW5lIGdyYWRpZW50XHJcbiAgICBwYXR0ZXJuOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBibG9jaykge1xyXG4gICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFNWRy5QYXR0ZXJuKS51cGRhdGUoYmxvY2spLmF0dHIoe1xyXG4gICAgICAgIHg6ICAgICAgICAgICAgMFxyXG4gICAgICAsIHk6ICAgICAgICAgICAgMFxyXG4gICAgICAsIHdpZHRoOiAgICAgICAgd2lkdGhcclxuICAgICAgLCBoZWlnaHQ6ICAgICAgIGhlaWdodFxyXG4gICAgICAsIHBhdHRlcm5Vbml0czogJ3VzZXJTcGFjZU9uVXNlJ1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5Eb2MgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIC8qIGVuc3VyZSB0aGUgcHJlc2VuY2Ugb2YgYSBodG1sIGVsZW1lbnQgKi9cclxuICAgICAgdGhpcy5wYXJlbnQgPSB0eXBlb2YgZWxlbWVudCA9PSAnc3RyaW5nJyA/XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCkgOlxyXG4gICAgICAgIGVsZW1lbnRcclxuICAgICAgXHJcbiAgICAgIC8qIElmIHRoZSB0YXJnZXQgaXMgYW4gc3ZnIGVsZW1lbnQsIHVzZSB0aGF0IGVsZW1lbnQgYXMgdGhlIG1haW4gd3JhcHBlci5cclxuICAgICAgICAgVGhpcyBhbGxvd3Mgc3ZnLmpzIHRvIHdvcmsgd2l0aCBzdmcgZG9jdW1lbnRzIGFzIHdlbGwuICovXHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3JcclxuICAgICAgICAuY2FsbCh0aGlzLCB0aGlzLnBhcmVudC5ub2RlTmFtZSA9PSAnc3ZnJyA/IHRoaXMucGFyZW50IDogU1ZHLmNyZWF0ZSgnc3ZnJykpXHJcbiAgICAgIFxyXG4gICAgICAvKiBzZXQgc3ZnIGVsZW1lbnQgYXR0cmlidXRlcyAqL1xyXG4gICAgICB0aGlzXHJcbiAgICAgICAgLmF0dHIoeyB4bWxuczogU1ZHLm5zLCB2ZXJzaW9uOiAnMS4xJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfSlcclxuICAgICAgICAuYXR0cigneG1sbnM6eGxpbmsnLCBTVkcueGxpbmssIFNWRy54bWxucylcclxuICAgICAgXHJcbiAgICAgIC8qIGNyZWF0ZSB0aGUgPGRlZnM+IG5vZGUgKi9cclxuICAgICAgdGhpcy5fZGVmcyA9IG5ldyBTVkcuRGVmc1xyXG4gICAgICB0aGlzLl9kZWZzLnBhcmVudCA9IHRoaXNcclxuICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMuX2RlZnMubm9kZSlcclxuICBcclxuICAgICAgLyogdHVybiBvZmYgc3ViIHBpeGVsIG9mZnNldCBieSBkZWZhdWx0ICovXHJcbiAgICAgIHRoaXMuZG9TcG9mID0gZmFsc2VcclxuICAgICAgXHJcbiAgICAgIC8qIGVuc3VyZSBjb3JyZWN0IHJlbmRlcmluZyAqL1xyXG4gICAgICBpZiAodGhpcy5wYXJlbnQgIT0gdGhpcy5ub2RlKVxyXG4gICAgICAgIHRoaXMuc3RhZ2UoKVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuQ29udGFpbmVyXHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8qIGVuYWJsZSBkcmF3aW5nICovXHJcbiAgICAgIHN0YWdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXNcclxuICBcclxuICAgICAgICAvKiBpbnNlcnQgZWxlbWVudCAqL1xyXG4gICAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMubm9kZSlcclxuICBcclxuICAgICAgICAvKiBmaXggc3ViLXBpeGVsIG9mZnNldCAqL1xyXG4gICAgICAgIGVsZW1lbnQuc3BvZigpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogbWFrZSBzdXJlIHN1Yi1waXhlbCBvZmZzZXQgaXMgZml4ZWQgZXZlcnkgdGltZSB0aGUgd2luZG93IGlzIHJlc2l6ZWQgKi9cclxuICAgICAgICBTVkcub24od2luZG93LCAncmVzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBlbGVtZW50LnNwb2YoKVxyXG4gICAgICAgIH0pXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAvLyBDcmVhdGVzIGFuZCByZXR1cm5zIGRlZnMgZWxlbWVudFxyXG4gICAgLCBkZWZzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmc1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIEZpeCBmb3IgcG9zc2libGUgc3ViLXBpeGVsIG9mZnNldC4gU2VlOlxyXG4gICAgICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02MDg4MTJcclxuICAgICwgc3BvZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9TcG9mKSB7XHJcbiAgICAgICAgICB2YXIgcG9zID0gdGhpcy5ub2RlLmdldFNjcmVlbkNUTSgpXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmIChwb3MpXHJcbiAgICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCAoLXBvcy5lICUgMSkgKyAncHgnKVxyXG4gICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgICgtcG9zLmYgJSAxKSArICdweCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICBcclxuICAgICAgLy8gRW5hYmxlIHN1Yi1waXhlbCBvZmZzZXRcclxuICAgICwgZml4U3ViUGl4ZWxPZmZzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZG9TcG9mID0gdHJ1ZVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgLy8gUmVtb3ZlcyB0aGUgZG9jIGZyb20gdGhlIERPTVxyXG4gICAgLCByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKHRoaXMucGFyZW50KSB7XHJcbiAgICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuXHJcblxyXG4gIFNWRy5TaGFwZSA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICBcdCAgdGhpcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIGVsZW1lbnQpXHJcbiAgXHR9XHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5FbGVtZW50XHJcbiAgXHJcbiAgfSlcclxuXHJcbiAgU1ZHLlN5bWJvbCA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdzeW1ib2wnXHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5Db250YWluZXJcclxuICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgbmV3IHN5bWJvbFxyXG4gICAgICBzeW1ib2w6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZnMoKS5wdXQobmV3IFNWRy5TeW1ib2wpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5Vc2UgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAndXNlJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuU2hhcGVcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gVXNlIGVsZW1lbnQgYXMgYSByZWZlcmVuY2VcclxuICAgICAgZWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCwgZmlsZSkge1xyXG4gICAgICAgIC8qIHN0b3JlIHRhcmdldCBlbGVtZW50ICovXHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBlbGVtZW50XHJcbiAgXHJcbiAgICAgICAgLyogc2V0IGxpbmVkIGVsZW1lbnQgKi9cclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdocmVmJywgKGZpbGUgfHwgJycpICsgJyMnICsgZWxlbWVudCwgU1ZHLnhsaW5rKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgdXNlIGVsZW1lbnRcclxuICAgICAgdXNlOiBmdW5jdGlvbihlbGVtZW50LCBmaWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuVXNlKS5lbGVtZW50KGVsZW1lbnQsIGZpbGUpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICBTVkcuUmVjdCA9IFNWRy5pbnZlbnQoe1xyXG4gIFx0Ly8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdyZWN0J1xyXG4gIFxyXG4gIFx0Ly8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuU2hhcGVcclxuICBcdFxyXG4gIFx0Ly8gQWRkIHBhcmVudCBtZXRob2RcclxuICAsIGNvbnN0cnVjdDoge1xyXG4gICAgXHQvLyBDcmVhdGUgYSByZWN0IGVsZW1lbnRcclxuICAgIFx0cmVjdDogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG4gICAgXHQgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLlJlY3QoKS5zaXplKHdpZHRoLCBoZWlnaHQpKVxyXG4gICAgXHR9XHJcbiAgICBcdFxyXG4gIFx0fVxyXG4gIFx0XHJcbiAgfSlcclxuXHJcbiAgU1ZHLkVsbGlwc2UgPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAnZWxsaXBzZSdcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLlNoYXBlXHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIE1vdmUgb3ZlciB4LWF4aXNcclxuICAgICAgeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHJldHVybiB4ID09IG51bGwgPyB0aGlzLmN4KCkgLSB0aGlzLmF0dHIoJ3J4JykgOiB0aGlzLmN4KHggKyB0aGlzLmF0dHIoJ3J4JykpXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBvdmVyIHktYXhpc1xyXG4gICAgLCB5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMuY3koKSAtIHRoaXMuYXR0cigncnknKSA6IHRoaXMuY3koeSArIHRoaXMuYXR0cigncnknKSlcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHgtYXhpc1xyXG4gICAgLCBjeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHJldHVybiB4ID09IG51bGwgPyB0aGlzLmF0dHIoJ2N4JykgOiB0aGlzLmF0dHIoJ2N4JywgbmV3IFNWRy5OdW1iZXIoeCkuZGl2aWRlKHRoaXMudHJhbnMuc2NhbGVYKSlcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGJ5IGNlbnRlciBvdmVyIHktYXhpc1xyXG4gICAgLCBjeTogZnVuY3Rpb24oeSkge1xyXG4gICAgICAgIHJldHVybiB5ID09IG51bGwgPyB0aGlzLmF0dHIoJ2N5JykgOiB0aGlzLmF0dHIoJ2N5JywgbmV3IFNWRy5OdW1iZXIoeSkuZGl2aWRlKHRoaXMudHJhbnMuc2NhbGVZKSlcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgd2lkdGggb2YgZWxlbWVudFxyXG4gICAgLCB3aWR0aDogZnVuY3Rpb24od2lkdGgpIHtcclxuICAgICAgICByZXR1cm4gd2lkdGggPT0gbnVsbCA/IHRoaXMuYXR0cigncngnKSAqIDIgOiB0aGlzLmF0dHIoJ3J4JywgbmV3IFNWRy5OdW1iZXIod2lkdGgpLmRpdmlkZSgyKSlcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgaGVpZ2h0IG9mIGVsZW1lbnRcclxuICAgICwgaGVpZ2h0OiBmdW5jdGlvbihoZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0ID09IG51bGwgPyB0aGlzLmF0dHIoJ3J5JykgKiAyIDogdGhpcy5hdHRyKCdyeScsIG5ldyBTVkcuTnVtYmVyKGhlaWdodCkuZGl2aWRlKDIpKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEN1c3RvbSBzaXplIGZ1bmN0aW9uXHJcbiAgICAsIHNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB2YXIgcCA9IHByb3BvcnRpb25hbFNpemUodGhpcy5iYm94KCksIHdpZHRoLCBoZWlnaHQpXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cih7XHJcbiAgICAgICAgICByeDogbmV3IFNWRy5OdW1iZXIocC53aWR0aCkuZGl2aWRlKDIpXHJcbiAgICAgICAgLCByeTogbmV3IFNWRy5OdW1iZXIocC5oZWlnaHQpLmRpdmlkZSgyKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBBZGQgcGFyZW50IG1ldGhvZFxyXG4gICwgY29uc3RydWN0OiB7XHJcbiAgICAgIC8vIENyZWF0ZSBjaXJjbGUgZWxlbWVudCwgYmFzZWQgb24gZWxsaXBzZVxyXG4gICAgICBjaXJjbGU6IGZ1bmN0aW9uKHNpemUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGxpcHNlKHNpemUsIHNpemUpXHJcbiAgICAgIH1cclxuICAgICAgLy8gQ3JlYXRlIGFuIGVsbGlwc2VcclxuICAgICwgZWxsaXBzZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLkVsbGlwc2UpLnNpemUod2lkdGgsIGhlaWdodCkubW92ZSgwLCAwKVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5MaW5lID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ2xpbmUnXHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5TaGFwZVxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBNb3ZlIG92ZXIgeC1heGlzXHJcbiAgICAgIHg6IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICB2YXIgYiA9IHRoaXMuYmJveCgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IGIueCA6IHRoaXMuYXR0cih7XHJcbiAgICAgICAgICB4MTogdGhpcy5hdHRyKCd4MScpIC0gYi54ICsgeFxyXG4gICAgICAgICwgeDI6IHRoaXMuYXR0cigneDInKSAtIGIueCArIHhcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgb3ZlciB5LWF4aXNcclxuICAgICwgeTogZnVuY3Rpb24oeSkge1xyXG4gICAgICAgIHZhciBiID0gdGhpcy5iYm94KClcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4geSA9PSBudWxsID8gYi55IDogdGhpcy5hdHRyKHtcclxuICAgICAgICAgIHkxOiB0aGlzLmF0dHIoJ3kxJykgLSBiLnkgKyB5XHJcbiAgICAgICAgLCB5MjogdGhpcy5hdHRyKCd5MicpIC0gYi55ICsgeVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBieSBjZW50ZXIgb3ZlciB4LWF4aXNcclxuICAgICwgY3g6IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgICB2YXIgaGFsZiA9IHRoaXMuYmJveCgpLndpZHRoIC8gMlxyXG4gICAgICAgIHJldHVybiB4ID09IG51bGwgPyB0aGlzLngoKSArIGhhbGYgOiB0aGlzLngoeCAtIGhhbGYpXHJcbiAgICAgIH1cclxuICAgICAgLy8gTW92ZSBieSBjZW50ZXIgb3ZlciB5LWF4aXNcclxuICAgICwgY3k6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgICB2YXIgaGFsZiA9IHRoaXMuYmJveCgpLmhlaWdodCAvIDJcclxuICAgICAgICByZXR1cm4geSA9PSBudWxsID8gdGhpcy55KCkgKyBoYWxmIDogdGhpcy55KHkgLSBoYWxmKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCB3aWR0aCBvZiBlbGVtZW50XHJcbiAgICAsIHdpZHRoOiBmdW5jdGlvbih3aWR0aCkge1xyXG4gICAgICAgIHZhciBiID0gdGhpcy5iYm94KClcclxuICBcclxuICAgICAgICByZXR1cm4gd2lkdGggPT0gbnVsbCA/IGIud2lkdGggOiB0aGlzLmF0dHIodGhpcy5hdHRyKCd4MScpIDwgdGhpcy5hdHRyKCd4MicpID8gJ3gyJyA6ICd4MScsIGIueCArIHdpZHRoKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxyXG4gICAgLCBoZWlnaHQ6IGZ1bmN0aW9uKGhlaWdodCkge1xyXG4gICAgICAgIHZhciBiID0gdGhpcy5iYm94KClcclxuICBcclxuICAgICAgICByZXR1cm4gaGVpZ2h0ID09IG51bGwgPyBiLmhlaWdodCA6IHRoaXMuYXR0cih0aGlzLmF0dHIoJ3kxJykgPCB0aGlzLmF0dHIoJ3kyJykgPyAneTInIDogJ3kxJywgYi55ICsgaGVpZ2h0KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBsaW5lIHNpemUgYnkgd2lkdGggYW5kIGhlaWdodFxyXG4gICAgLCBzaXplOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIHAgPSBwcm9wb3J0aW9uYWxTaXplKHRoaXMuYmJveCgpLCB3aWR0aCwgaGVpZ2h0KVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoKHAud2lkdGgpLmhlaWdodChwLmhlaWdodClcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgcGF0aCBkYXRhXHJcbiAgICAsIHBsb3Q6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cih7XHJcbiAgICAgICAgICB4MTogeDFcclxuICAgICAgICAsIHkxOiB5MVxyXG4gICAgICAgICwgeDI6IHgyXHJcbiAgICAgICAgLCB5MjogeTJcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgbGluZSBlbGVtZW50XHJcbiAgICAgIGxpbmU6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuTGluZSgpLnBsb3QoeDEsIHkxLCB4MiwgeTIpKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcblxyXG4gIFNWRy5Qb2x5bGluZSA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdwb2x5bGluZSdcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLlNoYXBlXHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgd3JhcHBlZCBwb2x5bGluZSBlbGVtZW50XHJcbiAgICAgIHBvbHlsaW5lOiBmdW5jdGlvbihwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuUG9seWxpbmUpLnBsb3QocClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLlBvbHlnb24gPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAncG9seWdvbidcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLlNoYXBlXHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgd3JhcHBlZCBwb2x5Z29uIGVsZW1lbnRcclxuICAgICAgcG9seWdvbjogZnVuY3Rpb24ocCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLlBvbHlnb24pLnBsb3QocClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gQWRkIHBvbHlnb24tc3BlY2lmaWMgZnVuY3Rpb25zXHJcbiAgU1ZHLmV4dGVuZChTVkcuUG9seWxpbmUsIFNWRy5Qb2x5Z29uLCB7XHJcbiAgICAvLyBEZWZpbmUgbW9ycGhhYmxlIGFycmF5XHJcbiAgICBtb3JwaEFycmF5OiAgU1ZHLlBvaW50QXJyYXlcclxuICAgIC8vIFBsb3QgbmV3IHBhdGhcclxuICAsIHBsb3Q6IGZ1bmN0aW9uKHApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cigncG9pbnRzJywgKHRoaXMuYXJyYXkgPSBuZXcgU1ZHLlBvaW50QXJyYXkocCwgW1swLDBdXSkpKVxyXG4gICAgfVxyXG4gICAgLy8gTW92ZSBieSBsZWZ0IHRvcCBjb3JuZXJcclxuICAsIG1vdmU6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cigncG9pbnRzJywgdGhpcy5hcnJheS5tb3ZlKHgsIHkpKVxyXG4gICAgfVxyXG4gICAgLy8gTW92ZSBieSBsZWZ0IHRvcCBjb3JuZXIgb3ZlciB4LWF4aXNcclxuICAsIHg6IGZ1bmN0aW9uKHgpIHtcclxuICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMuYmJveCgpLnggOiB0aGlzLm1vdmUoeCwgdGhpcy5iYm94KCkueSlcclxuICAgIH1cclxuICAgIC8vIE1vdmUgYnkgbGVmdCB0b3AgY29ybmVyIG92ZXIgeS1heGlzXHJcbiAgLCB5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgIHJldHVybiB5ID09IG51bGwgPyB0aGlzLmJib3goKS55IDogdGhpcy5tb3ZlKHRoaXMuYmJveCgpLngsIHkpXHJcbiAgICB9XHJcbiAgICAvLyBTZXQgd2lkdGggb2YgZWxlbWVudFxyXG4gICwgd2lkdGg6IGZ1bmN0aW9uKHdpZHRoKSB7XHJcbiAgICAgIHZhciBiID0gdGhpcy5iYm94KClcclxuICBcclxuICAgICAgcmV0dXJuIHdpZHRoID09IG51bGwgPyBiLndpZHRoIDogdGhpcy5zaXplKHdpZHRoLCBiLmhlaWdodClcclxuICAgIH1cclxuICAgIC8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxyXG4gICwgaGVpZ2h0OiBmdW5jdGlvbihoZWlnaHQpIHtcclxuICAgICAgdmFyIGIgPSB0aGlzLmJib3goKVxyXG4gIFxyXG4gICAgICByZXR1cm4gaGVpZ2h0ID09IG51bGwgPyBiLmhlaWdodCA6IHRoaXMuc2l6ZShiLndpZHRoLCBoZWlnaHQpIFxyXG4gICAgfVxyXG4gICAgLy8gU2V0IGVsZW1lbnQgc2l6ZSB0byBnaXZlbiB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgLCBzaXplOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgIHZhciBwID0gcHJvcG9ydGlvbmFsU2l6ZSh0aGlzLmJib3goKSwgd2lkdGgsIGhlaWdodClcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXMuYXR0cigncG9pbnRzJywgdGhpcy5hcnJheS5zaXplKHAud2lkdGgsIHAuaGVpZ2h0KSlcclxuICAgIH1cclxuICBcclxuICB9KVxyXG5cclxuICBTVkcuUGF0aCA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdwYXRoJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuU2hhcGVcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gUGxvdCBuZXcgcG9seSBwb2ludHNcclxuICAgICAgcGxvdDogZnVuY3Rpb24ocCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2QnLCAodGhpcy5hcnJheSA9IG5ldyBTVkcuUGF0aEFycmF5KHAsIFtbJ00nLCAwLCAwXV0pKSlcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lclxyXG4gICAgLCBtb3ZlOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignZCcsIHRoaXMuYXJyYXkubW92ZSh4LCB5KSlcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lciBvdmVyIHgtYXhpc1xyXG4gICAgLCB4OiBmdW5jdGlvbih4KSB7XHJcbiAgICAgICAgcmV0dXJuIHggPT0gbnVsbCA/IHRoaXMuYmJveCgpLnggOiB0aGlzLm1vdmUoeCwgdGhpcy5iYm94KCkueSlcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGJ5IGxlZnQgdG9wIGNvcm5lciBvdmVyIHktYXhpc1xyXG4gICAgLCB5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMuYmJveCgpLnkgOiB0aGlzLm1vdmUodGhpcy5iYm94KCkueCwgeSlcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgZWxlbWVudCBzaXplIHRvIGdpdmVuIHdpZHRoIGFuZCBoZWlnaHRcclxuICAgICwgc2l6ZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHZhciBwID0gcHJvcG9ydGlvbmFsU2l6ZSh0aGlzLmJib3goKSwgd2lkdGgsIGhlaWdodClcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdkJywgdGhpcy5hcnJheS5zaXplKHAud2lkdGgsIHAuaGVpZ2h0KSlcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgd2lkdGggb2YgZWxlbWVudFxyXG4gICAgLCB3aWR0aDogZnVuY3Rpb24od2lkdGgpIHtcclxuICAgICAgICByZXR1cm4gd2lkdGggPT0gbnVsbCA/IHRoaXMuYmJveCgpLndpZHRoIDogdGhpcy5zaXplKHdpZHRoLCB0aGlzLmJib3goKS5oZWlnaHQpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IGhlaWdodCBvZiBlbGVtZW50XHJcbiAgICAsIGhlaWdodDogZnVuY3Rpb24oaGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodCA9PSBudWxsID8gdGhpcy5iYm94KCkuaGVpZ2h0IDogdGhpcy5zaXplKHRoaXMuYmJveCgpLndpZHRoLCBoZWlnaHQpXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgd3JhcHBlZCBwYXRoIGVsZW1lbnRcclxuICAgICAgcGF0aDogZnVuY3Rpb24oZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLlBhdGgpLnBsb3QoZClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIFNWRy5JbWFnZSA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdpbWFnZSdcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLlNoYXBlXHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIChyZSlsb2FkIGltYWdlXHJcbiAgICAgIGxvYWQ6IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIGlmICghdXJsKSByZXR1cm4gdGhpc1xyXG4gIFxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgLCBpbWcgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgICAgICBcclxuICAgICAgICAvKiBwcmVsb2FkIGltYWdlICovXHJcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHAgPSBzZWxmLmRvYyhTVkcuUGF0dGVybilcclxuICBcclxuICAgICAgICAgIC8qIGVuc3VyZSBpbWFnZSBzaXplICovXHJcbiAgICAgICAgICBpZiAoc2VsZi53aWR0aCgpID09IDAgJiYgc2VsZi5oZWlnaHQoKSA9PSAwKVxyXG4gICAgICAgICAgICBzZWxmLnNpemUoaW1nLndpZHRoLCBpbWcuaGVpZ2h0KVxyXG4gIFxyXG4gICAgICAgICAgLyogZW5zdXJlIHBhdHRlcm4gc2l6ZSBpZiBub3Qgc2V0ICovXHJcbiAgICAgICAgICBpZiAocCAmJiBwLndpZHRoKCkgPT0gMCAmJiBwLmhlaWdodCgpID09IDApXHJcbiAgICAgICAgICAgIHAuc2l6ZShzZWxmLndpZHRoKCksIHNlbGYuaGVpZ2h0KCkpXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8qIGNhbGxiYWNrICovXHJcbiAgICAgICAgICBpZiAodHlwZW9mIHNlbGYuX2xvYWRlZCA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgICAgc2VsZi5fbG9hZGVkLmNhbGwoc2VsZiwge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAgaW1nLndpZHRoXHJcbiAgICAgICAgICAgICwgaGVpZ2h0OiBpbWcuaGVpZ2h0XHJcbiAgICAgICAgICAgICwgcmF0aW86ICBpbWcud2lkdGggLyBpbWcuaGVpZ2h0XHJcbiAgICAgICAgICAgICwgdXJsOiAgICB1cmxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignaHJlZicsIChpbWcuc3JjID0gdGhpcy5zcmMgPSB1cmwpLCBTVkcueGxpbmspXHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIGxvYWRlIGNhbGxiYWNrXHJcbiAgICAsIGxvYWRlZDogZnVuY3Rpb24obG9hZGVkKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVkID0gbG9hZGVkXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBBZGQgcGFyZW50IG1ldGhvZFxyXG4gICwgY29uc3RydWN0OiB7XHJcbiAgICAgIC8vIENyZWF0ZSBpbWFnZSBlbGVtZW50LCBsb2FkIGltYWdlIGFuZCBzZXQgaXRzIHNpemVcclxuICAgICAgaW1hZ2U6IGZ1bmN0aW9uKHNvdXJjZSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLkltYWdlKS5sb2FkKHNvdXJjZSkuc2l6ZSh3aWR0aCB8fCAwLCBoZWlnaHQgfHwgd2lkdGggfHwgMClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcblxyXG4gIFNWRy5UZXh0ID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBTVkcuY3JlYXRlKCd0ZXh0JykpXHJcbiAgICAgIFxyXG4gICAgICB0aGlzLl9sZWFkaW5nID0gbmV3IFNWRy5OdW1iZXIoMS4zKSAgICAvKiBzdG9yZSBsZWFkaW5nIHZhbHVlIGZvciByZWJ1aWxkaW5nICovXHJcbiAgICAgIHRoaXMuX3JlYnVpbGQgPSB0cnVlICAgICAgICAgICAgICAgICAgIC8qIGVuYWJsZSBhdXRvbWF0aWMgdXBkYXRpbmcgb2YgZHkgdmFsdWVzICovXHJcbiAgICAgIHRoaXMuX2J1aWxkICAgPSBmYWxzZSAgICAgICAgICAgICAgICAgIC8qIGRpc2FibGUgYnVpbGQgbW9kZSBmb3IgYWRkaW5nIG11bHRpcGxlIGxpbmVzICovXHJcbiAgXHJcbiAgICAgIC8qIHNldCBkZWZhdWx0IGZvbnQgKi9cclxuICAgICAgdGhpcy5hdHRyKCdmb250LWZhbWlseScsIFNWRy5kZWZhdWx0cy5hdHRyc1snZm9udC1mYW1pbHknXSlcclxuICAgIH1cclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLlNoYXBlXHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIE1vdmUgb3ZlciB4LWF4aXNcclxuICAgICAgeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIC8qIGFjdCBhcyBnZXR0ZXIgKi9cclxuICAgICAgICBpZiAoeCA9PSBudWxsKVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuYXR0cigneCcpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogbW92ZSBsaW5lcyBhcyB3ZWxsIGlmIG5vIHRleHRQYXRoIGlzIHByZXNlbnQgKi9cclxuICAgICAgICBpZiAoIXRoaXMudGV4dFBhdGgpXHJcbiAgICAgICAgICB0aGlzLmxpbmVzLmVhY2goZnVuY3Rpb24oKSB7IGlmICh0aGlzLm5ld0xpbmVkKSB0aGlzLngoeCkgfSlcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCd4JywgeClcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIG92ZXIgeS1heGlzXHJcbiAgICAsIHk6IGZ1bmN0aW9uKHkpIHtcclxuICAgICAgICB2YXIgb3kgPSB0aGlzLmF0dHIoJ3knKVxyXG4gICAgICAgICAgLCBvICA9IHR5cGVvZiBveSA9PT0gJ251bWJlcicgPyBveSAtIHRoaXMuYmJveCgpLnkgOiAwXHJcbiAgXHJcbiAgICAgICAgLyogYWN0IGFzIGdldHRlciAqL1xyXG4gICAgICAgIGlmICh5ID09IG51bGwpXHJcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIG95ID09PSAnbnVtYmVyJyA/IG95IC0gbyA6IG95XHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cigneScsIHR5cGVvZiB5ID09PSAnbnVtYmVyJyA/IHkgKyBvIDogeSlcclxuICAgICAgfVxyXG4gICAgICAvLyBNb3ZlIGNlbnRlciBvdmVyIHgtYXhpc1xyXG4gICAgLCBjeDogZnVuY3Rpb24oeCkge1xyXG4gICAgICAgIHJldHVybiB4ID09IG51bGwgPyB0aGlzLmJib3goKS5jeCA6IHRoaXMueCh4IC0gdGhpcy5iYm94KCkud2lkdGggLyAyKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIE1vdmUgY2VudGVyIG92ZXIgeS1heGlzXHJcbiAgICAsIGN5OiBmdW5jdGlvbih5KSB7XHJcbiAgICAgICAgcmV0dXJuIHkgPT0gbnVsbCA/IHRoaXMuYmJveCgpLmN5IDogdGhpcy55KHkgLSB0aGlzLmJib3goKS5oZWlnaHQgLyAyKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCB0aGUgdGV4dCBjb250ZW50XHJcbiAgICAsIHRleHQ6IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgICAvKiBhY3QgYXMgZ2V0dGVyICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0ZXh0ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIHRoaXMuY29udGVudFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIHJlbW92ZSBleGlzdGluZyBjb250ZW50ICovXHJcbiAgICAgICAgdGhpcy5jbGVhcigpLmJ1aWxkKHRydWUpXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0ZXh0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAvKiBjYWxsIGJsb2NrICovXHJcbiAgICAgICAgICB0ZXh0LmNhbGwodGhpcywgdGhpcylcclxuICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLyogc3RvcmUgdGV4dCBhbmQgbWFrZSBzdXJlIHRleHQgaXMgbm90IGJsYW5rICovXHJcbiAgICAgICAgICB0ZXh0ID0gKHRoaXMuY29udGVudCA9IHRleHQpLnNwbGl0KCdcXG4nKVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvKiBidWlsZCBuZXcgbGluZXMgKi9cclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHRleHQubGVuZ3RoOyBpIDwgaWw7IGkrKylcclxuICAgICAgICAgICAgdGhpcy50c3Bhbih0ZXh0W2ldKS5uZXdMaW5lKClcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogZGlzYWJsZSBidWlsZCBtb2RlIGFuZCByZWJ1aWxkIGxpbmVzICovXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGQoZmFsc2UpLnJlYnVpbGQoKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBmb250IHNpemVcclxuICAgICwgc2l6ZTogZnVuY3Rpb24oc2l6ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2ZvbnQtc2l6ZScsIHNpemUpLnJlYnVpbGQoKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCAvIGdldCBsZWFkaW5nXHJcbiAgICAsIGxlYWRpbmc6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgLyogYWN0IGFzIGdldHRlciAqL1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWRpbmdcclxuICAgICAgICBcclxuICAgICAgICAvKiBhY3QgYXMgc2V0dGVyICovXHJcbiAgICAgICAgdGhpcy5fbGVhZGluZyA9IG5ldyBTVkcuTnVtYmVyKHZhbHVlKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlYnVpbGQoKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFJlYnVpbGQgYXBwZWFyYW5jZSB0eXBlXHJcbiAgICAsIHJlYnVpbGQ6IGZ1bmN0aW9uKHJlYnVpbGQpIHtcclxuICAgICAgICAvKiBzdG9yZSBuZXcgcmVidWlsZCBmbGFnIGlmIGdpdmVuICovXHJcbiAgICAgICAgaWYgKHR5cGVvZiByZWJ1aWxkID09ICdib29sZWFuJylcclxuICAgICAgICAgIHRoaXMuX3JlYnVpbGQgPSByZWJ1aWxkXHJcbiAgXHJcbiAgICAgICAgLyogZGVmaW5lIHBvc2l0aW9uIG9mIGFsbCBsaW5lcyAqL1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWJ1aWxkKSB7XHJcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgdGhpcy5saW5lcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uZXdMaW5lZCkge1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy50ZXh0UGF0aClcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cigneCcsIHNlbGYuYXR0cigneCcpKVxyXG4gICAgICAgICAgICAgIHRoaXMuYXR0cignZHknLCBzZWxmLl9sZWFkaW5nICogbmV3IFNWRy5OdW1iZXIoc2VsZi5hdHRyKCdmb250LXNpemUnKSkpIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gIFxyXG4gICAgICAgICAgdGhpcy5maXJlKCdyZWJ1aWxkJylcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBFbmFibGUgLyBkaXNhYmxlIGJ1aWxkIG1vZGVcclxuICAgICwgYnVpbGQ6IGZ1bmN0aW9uKGJ1aWxkKSB7XHJcbiAgICAgICAgdGhpcy5fYnVpbGQgPSAhIWJ1aWxkXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBBZGQgcGFyZW50IG1ldGhvZFxyXG4gICwgY29uc3RydWN0OiB7XHJcbiAgICAgIC8vIENyZWF0ZSB0ZXh0IGVsZW1lbnRcclxuICAgICAgdGV4dDogZnVuY3Rpb24odGV4dCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLlRleHQpLnRleHQodGV4dClcclxuICAgICAgfVxyXG4gICAgICAvLyBDcmVhdGUgcGxhaW4gdGV4dCBlbGVtZW50XHJcbiAgICAsIHBsYWluOiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuVGV4dCkucGxhaW4odGV4dClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLlRTcGFuID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ3RzcGFuJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuU2hhcGVcclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gU2V0IHRleHQgY29udGVudFxyXG4gICAgICB0ZXh0OiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgaWYodGV4dCA9PSBudWxsKSByZXR1cm4gdGhpcy5ub2RlLnRleHRDb250ZW50ICsgKHRoaXMuZG9tLm5ld0xpbmVkID8gJ1xcbicgOiAnJylcclxuICBcclxuICAgICAgICB0eXBlb2YgdGV4dCA9PT0gJ2Z1bmN0aW9uJyA/IHRleHQuY2FsbCh0aGlzLCB0aGlzKSA6IHRoaXMucGxhaW4odGV4dClcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFNob3J0Y3V0IGR4XHJcbiAgICAsIGR4OiBmdW5jdGlvbihkeCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2R4JywgZHgpXHJcbiAgICAgIH1cclxuICAgICAgLy8gU2hvcnRjdXQgZHlcclxuICAgICwgZHk6IGZ1bmN0aW9uKGR5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cignZHknLCBkeSlcclxuICAgICAgfVxyXG4gICAgICAvLyBDcmVhdGUgbmV3IGxpbmVcclxuICAgICwgbmV3TGluZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLyogZmV0Y2ggdGV4dCBwYXJlbnQgKi9cclxuICAgICAgICB2YXIgdCA9IHRoaXMuZG9jKFNWRy5UZXh0KVxyXG4gIFxyXG4gICAgICAgIC8qIG1hcmsgbmV3IGxpbmUgKi9cclxuICAgICAgICB0aGlzLm5ld0xpbmVkID0gdHJ1ZVxyXG4gIFxyXG4gICAgICAgIC8qIGFwcGx5IG5ldyBoecKhbiAqL1xyXG4gICAgICAgIHJldHVybiB0aGlzLmR5KHQuX2xlYWRpbmcgKiB0LmF0dHIoJ2ZvbnQtc2l6ZScpKS5hdHRyKCd4JywgdC54KCkpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuVGV4dCwgU1ZHLlRTcGFuLCB7XHJcbiAgICAvLyBDcmVhdGUgcGxhaW4gdGV4dCBub2RlXHJcbiAgICBwbGFpbjogZnVuY3Rpb24odGV4dCkge1xyXG4gICAgICAvKiBjbGVhciBpZiBidWlsZCBtb2RlIGlzIGRpc2FibGVkICovXHJcbiAgICAgIGlmICh0aGlzLl9idWlsZCA9PT0gZmFsc2UpXHJcbiAgICAgICAgdGhpcy5jbGVhcigpXHJcbiAgXHJcbiAgICAgIC8qIGNyZWF0ZSB0ZXh0IG5vZGUgKi9cclxuICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCh0aGlzLmNvbnRlbnQgPSB0ZXh0KSkpXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gICAgLy8gQ3JlYXRlIGEgdHNwYW5cclxuICAsIHRzcGFuOiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgIHZhciBub2RlICA9ICh0aGlzLnRleHRQYXRoIHx8IHRoaXMpLm5vZGVcclxuICAgICAgICAsIHRzcGFuID0gbmV3IFNWRy5UU3BhblxyXG4gIFxyXG4gICAgICAvKiBjbGVhciBpZiBidWlsZCBtb2RlIGlzIGRpc2FibGVkICovXHJcbiAgICAgIGlmICh0aGlzLl9idWlsZCA9PT0gZmFsc2UpXHJcbiAgICAgICAgdGhpcy5jbGVhcigpXHJcbiAgICAgIFxyXG4gICAgICAvKiBhZGQgbmV3IHRzcGFuIGFuZCByZWZlcmVuY2UgKi9cclxuICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0c3Bhbi5ub2RlKVxyXG4gICAgICB0c3Bhbi5wYXJlbnQgPSB0aGlzXHJcbiAgXHJcbiAgICAgIC8qIG9ubHkgZmlyc3QgbGV2ZWwgdHNwYW5zIGFyZSBjb25zaWRlcmVkIHRvIGJlIFwibGluZXNcIiAqL1xyXG4gICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFNWRy5UZXh0KVxyXG4gICAgICAgIHRoaXMubGluZXMuYWRkKHRzcGFuKVxyXG4gIFxyXG4gICAgICByZXR1cm4gdHNwYW4udGV4dCh0ZXh0KVxyXG4gICAgfVxyXG4gICAgLy8gQ2xlYXIgYWxsIGxpbmVzXHJcbiAgLCBjbGVhcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBub2RlID0gKHRoaXMudGV4dFBhdGggfHwgdGhpcykubm9kZVxyXG4gIFxyXG4gICAgICAvKiByZW1vdmUgZXhpc3RpbmcgY2hpbGQgbm9kZXMgKi9cclxuICAgICAgd2hpbGUgKG5vZGUuaGFzQ2hpbGROb2RlcygpKVxyXG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5sYXN0Q2hpbGQpXHJcbiAgICAgIFxyXG4gICAgICAvKiByZXNldCBjb250ZW50IHJlZmVyZW5jZXMgICovXHJcbiAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgU1ZHLlRleHQpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5saW5lc1xyXG4gICAgICAgIHRoaXMubGluZXMgPSBuZXcgU1ZHLlNldFxyXG4gICAgICAgIHRoaXMuY29udGVudCA9ICcnXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICAvLyBHZXQgbGVuZ3RoIG9mIHRleHQgZWxlbWVudFxyXG4gICwgbGVuZ3RoOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG5cclxuICBTVkcuVGV4dFBhdGggPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiAndGV4dFBhdGgnXHJcbiAgXHJcbiAgICAvLyBJbmhlcml0IGZyb21cclxuICAsIGluaGVyaXQ6IFNWRy5FbGVtZW50XHJcbiAgXHJcbiAgICAvLyBEZWZpbmUgcGFyZW50IGNsYXNzXHJcbiAgLCBwYXJlbnQ6IFNWRy5UZXh0XHJcbiAgXHJcbiAgICAvLyBBZGQgcGFyZW50IG1ldGhvZFxyXG4gICwgY29uc3RydWN0OiB7XHJcbiAgICAgIC8vIENyZWF0ZSBwYXRoIGZvciB0ZXh0IHRvIHJ1biBvblxyXG4gICAgICBwYXRoOiBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgLyogY3JlYXRlIHRleHRQYXRoIGVsZW1lbnQgKi9cclxuICAgICAgICB0aGlzLnRleHRQYXRoID0gbmV3IFNWRy5UZXh0UGF0aFxyXG4gIFxyXG4gICAgICAgIC8qIG1vdmUgbGluZXMgdG8gdGV4dHBhdGggKi9cclxuICAgICAgICB3aGlsZSh0aGlzLm5vZGUuaGFzQ2hpbGROb2RlcygpKVxyXG4gICAgICAgICAgdGhpcy50ZXh0UGF0aC5ub2RlLmFwcGVuZENoaWxkKHRoaXMubm9kZS5maXJzdENoaWxkKVxyXG4gIFxyXG4gICAgICAgIC8qIGFkZCB0ZXh0UGF0aCBlbGVtZW50IGFzIGNoaWxkIG5vZGUgKi9cclxuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy50ZXh0UGF0aC5ub2RlKVxyXG4gIFxyXG4gICAgICAgIC8qIGNyZWF0ZSBwYXRoIGluIGRlZnMgKi9cclxuICAgICAgICB0aGlzLnRyYWNrID0gdGhpcy5kb2MoKS5kZWZzKCkucGF0aChkKVxyXG4gIFxyXG4gICAgICAgIC8qIGNyZWF0ZSBjaXJjdWxhciByZWZlcmVuY2UgKi9cclxuICAgICAgICB0aGlzLnRleHRQYXRoLnBhcmVudCA9IHRoaXNcclxuICBcclxuICAgICAgICAvKiBsaW5rIHRleHRQYXRoIHRvIHBhdGggYW5kIGFkZCBjb250ZW50ICovXHJcbiAgICAgICAgdGhpcy50ZXh0UGF0aC5hdHRyKCdocmVmJywgJyMnICsgdGhpcy50cmFjaywgU1ZHLnhsaW5rKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gUGxvdCBwYXRoIGlmIGFueVxyXG4gICAgLCBwbG90OiBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhY2spIHRoaXMudHJhY2sucGxvdChkKVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICBTVkcuTmVzdGVkID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBTVkcuY3JlYXRlKCdzdmcnKSlcclxuICAgICAgXHJcbiAgICAgIHRoaXMuc3R5bGUoJ292ZXJmbG93JywgJ3Zpc2libGUnKVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuQ29udGFpbmVyXHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIG5lc3RlZCBzdmcgZG9jdW1lbnRcclxuICAgICAgbmVzdGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXQobmV3IFNWRy5OZXN0ZWQpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICBTVkcuQSA9IFNWRy5pbnZlbnQoe1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBub2RlXHJcbiAgICBjcmVhdGU6ICdhJ1xyXG4gIFxyXG4gICAgLy8gSW5oZXJpdCBmcm9tXHJcbiAgLCBpbmhlcml0OiBTVkcuQ29udGFpbmVyXHJcbiAgXHJcbiAgICAvLyBBZGQgY2xhc3MgbWV0aG9kc1xyXG4gICwgZXh0ZW5kOiB7XHJcbiAgICAgIC8vIExpbmsgdXJsXHJcbiAgICAgIHRvOiBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdocmVmJywgdXJsLCBTVkcueGxpbmspXHJcbiAgICAgIH1cclxuICAgICAgLy8gTGluayBzaG93IGF0dHJpYnV0ZVxyXG4gICAgLCBzaG93OiBmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdzaG93JywgdGFyZ2V0LCBTVkcueGxpbmspXHJcbiAgICAgIH1cclxuICAgICAgLy8gTGluayB0YXJnZXQgYXR0cmlidXRlXHJcbiAgICAsIHRhcmdldDogZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cigndGFyZ2V0JywgdGFyZ2V0KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgaHlwZXJsaW5rIGVsZW1lbnRcclxuICAgICAgbGluazogZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0KG5ldyBTVkcuQSkudG8odXJsKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5FbGVtZW50LCB7XHJcbiAgICAvLyBDcmVhdGUgYSBoeXBlcmxpbmsgZWxlbWVudFxyXG4gICAgbGlua1RvOiBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgdmFyIGxpbmsgPSBuZXcgU1ZHLkFcclxuICBcclxuICAgICAgaWYgKHR5cGVvZiB1cmwgPT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICB1cmwuY2FsbChsaW5rLCBsaW5rKVxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgbGluay50byh1cmwpXHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudC5wdXQobGluaykucHV0KHRoaXMpXHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG5cclxuICBTVkcuTWFya2VyID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplIG5vZGVcclxuICAgIGNyZWF0ZTogJ21hcmtlcidcclxuICBcclxuICAgIC8vIEluaGVyaXQgZnJvbVxyXG4gICwgaW5oZXJpdDogU1ZHLkNvbnRhaW5lclxyXG4gIFxyXG4gICAgLy8gQWRkIGNsYXNzIG1ldGhvZHNcclxuICAsIGV4dGVuZDoge1xyXG4gICAgICAvLyBTZXQgd2lkdGggb2YgZWxlbWVudFxyXG4gICAgICB3aWR0aDogZnVuY3Rpb24od2lkdGgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyKCdtYXJrZXJXaWR0aCcsIHdpZHRoKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBoZWlnaHQgb2YgZWxlbWVudFxyXG4gICAgLCBoZWlnaHQ6IGZ1bmN0aW9uKGhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ21hcmtlckhlaWdodCcsIGhlaWdodClcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgbWFya2VyIHJlZlggYW5kIHJlZllcclxuICAgICwgcmVmOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cigncmVmWCcsIHgpLmF0dHIoJ3JlZlknLCB5KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFVwZGF0ZSBtYXJrZXJcclxuICAgICwgdXBkYXRlOiBmdW5jdGlvbihibG9jaykge1xyXG4gICAgICAgIC8qIHJlbW92ZSBhbGwgY29udGVudCAqL1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIGludm9rZSBwYXNzZWQgYmxvY2sgKi9cclxuICAgICAgICBpZiAodHlwZW9mIGJsb2NrID09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgICBibG9jay5jYWxsKHRoaXMsIHRoaXMpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgfVxyXG4gICAgICAvLyBSZXR1cm4gdGhlIGZpbGwgaWRcclxuICAgICwgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAndXJsKCMnICsgdGhpcy5pZCgpICsgJyknXHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgbWFya2VyOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBibG9jaykge1xyXG4gICAgICAgIC8vIENyZWF0ZSBtYXJrZXIgZWxlbWVudCBpbiBkZWZzXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmcygpLm1hcmtlcih3aWR0aCwgaGVpZ2h0LCBibG9jaylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuRGVmcywge1xyXG4gICAgLy8gQ3JlYXRlIG1hcmtlclxyXG4gICAgbWFya2VyOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBibG9jaykge1xyXG4gICAgICAvLyBTZXQgZGVmYXVsdCB2aWV3Ym94IHRvIG1hdGNoIHRoZSB3aWR0aCBhbmQgaGVpZ2h0LCBzZXQgcmVmIHRvIGN4IGFuZCBjeSBhbmQgc2V0IG9yaWVudCB0byBhdXRvXHJcbiAgICAgIHJldHVybiB0aGlzLnB1dChuZXcgU1ZHLk1hcmtlcilcclxuICAgICAgICAuc2l6ZSh3aWR0aCwgaGVpZ2h0KVxyXG4gICAgICAgIC5yZWYod2lkdGggLyAyLCBoZWlnaHQgLyAyKVxyXG4gICAgICAgIC52aWV3Ym94KDAsIDAsIHdpZHRoLCBoZWlnaHQpXHJcbiAgICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcclxuICAgICAgICAudXBkYXRlKGJsb2NrKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuICBcclxuICBTVkcuZXh0ZW5kKFNWRy5MaW5lLCBTVkcuUG9seWxpbmUsIFNWRy5Qb2x5Z29uLCBTVkcuUGF0aCwge1xyXG4gICAgLy8gQ3JlYXRlIGFuZCBhdHRhY2ggbWFya2Vyc1xyXG4gICAgbWFya2VyOiBmdW5jdGlvbihtYXJrZXIsIHdpZHRoLCBoZWlnaHQsIGJsb2NrKSB7XHJcbiAgICAgIHZhciBhdHRyID0gWydtYXJrZXInXVxyXG4gIFxyXG4gICAgICAvLyBCdWlsZCBhdHRyaWJ1dGUgbmFtZVxyXG4gICAgICBpZiAobWFya2VyICE9ICdhbGwnKSBhdHRyLnB1c2gobWFya2VyKVxyXG4gICAgICBhdHRyID0gYXR0ci5qb2luKCctJylcclxuICBcclxuICAgICAgLy8gU2V0IG1hcmtlciBhdHRyaWJ1dGVcclxuICAgICAgbWFya2VyID0gYXJndW1lbnRzWzFdIGluc3RhbmNlb2YgU1ZHLk1hcmtlciA/XHJcbiAgICAgICAgYXJndW1lbnRzWzFdIDpcclxuICAgICAgICB0aGlzLmRvYygpLm1hcmtlcih3aWR0aCwgaGVpZ2h0LCBibG9jaylcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoYXR0ciwgbWFya2VyKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSlcclxuXHJcbiAgdmFyIHN1Z2FyID0ge1xyXG4gICAgc3Ryb2tlOiBbJ2NvbG9yJywgJ3dpZHRoJywgJ29wYWNpdHknLCAnbGluZWNhcCcsICdsaW5lam9pbicsICdtaXRlcmxpbWl0JywgJ2Rhc2hhcnJheScsICdkYXNob2Zmc2V0J11cclxuICAsIGZpbGw6ICAgWydjb2xvcicsICdvcGFjaXR5JywgJ3J1bGUnXVxyXG4gICwgcHJlZml4OiBmdW5jdGlvbih0LCBhKSB7XHJcbiAgICAgIHJldHVybiBhID09ICdjb2xvcicgPyB0IDogdCArICctJyArIGFcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLyogQWRkIHN1Z2FyIGZvciBmaWxsIGFuZCBzdHJva2UgKi9cclxuICA7WydmaWxsJywgJ3N0cm9rZSddLmZvckVhY2goZnVuY3Rpb24obSkge1xyXG4gICAgdmFyIGksIGV4dGVuc2lvbiA9IHt9XHJcbiAgICBcclxuICAgIGV4dGVuc2lvblttXSA9IGZ1bmN0aW9uKG8pIHtcclxuICAgICAgaWYgKHR5cGVvZiBvID09ICdzdHJpbmcnIHx8IFNWRy5Db2xvci5pc1JnYihvKSB8fCAobyAmJiB0eXBlb2Ygby5maWxsID09PSAnZnVuY3Rpb24nKSlcclxuICAgICAgICB0aGlzLmF0dHIobSwgbylcclxuICBcclxuICAgICAgZWxzZVxyXG4gICAgICAgIC8qIHNldCBhbGwgYXR0cmlidXRlcyBmcm9tIHN1Z2FyLmZpbGwgYW5kIHN1Z2FyLnN0cm9rZSBsaXN0ICovXHJcbiAgICAgICAgZm9yIChpID0gc3VnYXJbbV0ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICBpZiAob1tzdWdhclttXVtpXV0gIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5hdHRyKHN1Z2FyLnByZWZpeChtLCBzdWdhclttXVtpXSksIG9bc3VnYXJbbV1baV1dKVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIFxyXG4gICAgU1ZHLmV4dGVuZChTVkcuRWxlbWVudCwgU1ZHLkZYLCBleHRlbnNpb24pXHJcbiAgICBcclxuICB9KVxyXG4gIFxyXG4gIFNWRy5leHRlbmQoU1ZHLkVsZW1lbnQsIFNWRy5GWCwge1xyXG4gICAgLy8gUm90YXRpb25cclxuICAgIHJvdGF0ZTogZnVuY3Rpb24oZGVnLCB4LCB5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7XHJcbiAgICAgICAgcm90YXRpb246IGRlZyB8fCAwXHJcbiAgICAgICwgY3g6IHhcclxuICAgICAgLCBjeTogeVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8gU2tld1xyXG4gICwgc2tldzogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oe1xyXG4gICAgICAgIHNrZXdYOiB4IHx8IDBcclxuICAgICAgLCBza2V3WTogeSB8fCAwXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyBTY2FsZVxyXG4gICwgc2NhbGU6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHtcclxuICAgICAgICBzY2FsZVg6IHhcclxuICAgICAgLCBzY2FsZVk6IHkgPT0gbnVsbCA/IHggOiB5XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyBUcmFuc2xhdGVcclxuICAsIHRyYW5zbGF0ZTogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oe1xyXG4gICAgICAgIHg6IHhcclxuICAgICAgLCB5OiB5XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyBNYXRyaXhcclxuICAsIG1hdHJpeDogZnVuY3Rpb24obSkge1xyXG4gICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyBtYXRyaXg6IG0gfSlcclxuICAgIH1cclxuICAgIC8vIE9wYWNpdHlcclxuICAsIG9wYWNpdHk6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoJ29wYWNpdHknLCB2YWx1ZSlcclxuICAgIH1cclxuICBcclxuICB9KVxyXG4gIFxyXG4gIFNWRy5leHRlbmQoU1ZHLlJlY3QsIFNWRy5FbGxpcHNlLCBTVkcuRlgsIHtcclxuICAgIC8vIEFkZCB4IGFuZCB5IHJhZGl1c1xyXG4gICAgcmFkaXVzOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmF0dHIoeyByeDogeCwgcnk6IHkgfHwgeCB9KVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuUGF0aCwge1xyXG4gICAgLy8gR2V0IHBhdGggbGVuZ3RoXHJcbiAgICBsZW5ndGg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ub2RlLmdldFRvdGFsTGVuZ3RoKClcclxuICAgIH1cclxuICAgIC8vIEdldCBwb2ludCBhdCBsZW5ndGhcclxuICAsIHBvaW50QXQ6IGZ1bmN0aW9uKGxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ub2RlLmdldFBvaW50QXRMZW5ndGgobGVuZ3RoKVxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcbiAgXHJcbiAgU1ZHLmV4dGVuZChTVkcuUGFyZW50LCBTVkcuVGV4dCwgU1ZHLkZYLCB7XHJcbiAgICAvLyBTZXQgZm9udCBcclxuICAgIGZvbnQ6IGZ1bmN0aW9uKG8pIHtcclxuICAgICAgZm9yICh2YXIgayBpbiBvKVxyXG4gICAgICAgIGsgPT0gJ2xlYWRpbmcnID9cclxuICAgICAgICAgIHRoaXMubGVhZGluZyhvW2tdKSA6XHJcbiAgICAgICAgayA9PSAnYW5jaG9yJyA/XHJcbiAgICAgICAgICB0aGlzLmF0dHIoJ3RleHQtYW5jaG9yJywgb1trXSkgOlxyXG4gICAgICAgIGsgPT0gJ3NpemUnIHx8IGsgPT0gJ2ZhbWlseScgfHwgayA9PSAnd2VpZ2h0JyB8fCBrID09ICdzdHJldGNoJyB8fCBrID09ICd2YXJpYW50JyB8fCBrID09ICdzdHlsZScgP1xyXG4gICAgICAgICAgdGhpcy5hdHRyKCdmb250LScrIGssIG9ba10pIDpcclxuICAgICAgICAgIHRoaXMuYXR0cihrLCBvW2tdKVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcbiAgXHJcblxyXG5cclxuICBTVkcuU2V0ID0gU1ZHLmludmVudCh7XHJcbiAgICAvLyBJbml0aWFsaXplXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvKiBzZXQgaW5pdGlhbCBzdGF0ZSAqL1xyXG4gICAgICB0aGlzLmNsZWFyKClcclxuICAgIH1cclxuICBcclxuICAgIC8vIEFkZCBjbGFzcyBtZXRob2RzXHJcbiAgLCBleHRlbmQ6IHtcclxuICAgICAgLy8gQWRkIGVsZW1lbnQgdG8gc2V0XHJcbiAgICAgIGFkZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGksIGlsLCBlbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxyXG4gIFxyXG4gICAgICAgIGZvciAoaSA9IDAsIGlsID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKylcclxuICAgICAgICAgIHRoaXMubWVtYmVycy5wdXNoKGVsZW1lbnRzW2ldKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gUmVtb3ZlIGVsZW1lbnQgZnJvbSBzZXRcclxuICAgICwgcmVtb3ZlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLmluZGV4KGVsZW1lbnQpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogcmVtb3ZlIGdpdmVuIGNoaWxkICovXHJcbiAgICAgICAgaWYgKGkgPiAtMSlcclxuICAgICAgICAgIHRoaXMubWVtYmVycy5zcGxpY2UoaSwgMSlcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEl0ZXJhdGUgb3ZlciBhbGwgbWVtYmVyc1xyXG4gICAgLCBlYWNoOiBmdW5jdGlvbihibG9jaykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHRoaXMubWVtYmVycy5sZW5ndGg7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgICAgYmxvY2suYXBwbHkodGhpcy5tZW1iZXJzW2ldLCBbaSwgdGhpcy5tZW1iZXJzXSlcclxuICBcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFJlc3RvcmUgdG8gZGVmYXVsdHNcclxuICAgICwgY2xlYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8qIGluaXRpYWxpemUgc3RvcmUgKi9cclxuICAgICAgICB0aGlzLm1lbWJlcnMgPSBbXVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgICAgLy8gQ2hlY2tzIGlmIGEgZ2l2ZW4gZWxlbWVudCBpcyBwcmVzZW50IGluIHNldFxyXG4gICAgLCBoYXM6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleChlbGVtZW50KSA+PSAwXHJcbiAgICAgIH1cclxuICAgICAgLy8gcmV0dW5zIGluZGV4IG9mIGdpdmVuIGVsZW1lbnQgaW4gc2V0XHJcbiAgICAsIGluZGV4OiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVtYmVycy5pbmRleE9mKGVsZW1lbnQpXHJcbiAgICAgIH1cclxuICAgICAgLy8gR2V0IG1lbWJlciBhdCBnaXZlbiBpbmRleFxyXG4gICAgLCBnZXQ6IGZ1bmN0aW9uKGkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZW1iZXJzW2ldXHJcbiAgICAgIH1cclxuICAgICAgLy8gR2V0IGZpcnN0IG1lbWJlclxyXG4gICAgLCBmaXJzdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KDApXHJcbiAgICAgIH1cclxuICAgICAgLy8gR2V0IGxhc3QgbWVtYmVyXHJcbiAgICAsIGxhc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldCh0aGlzLm1lbWJlcnMubGVuZ3RoIC0gMSlcclxuICAgICAgfVxyXG4gICAgICAvLyBEZWZhdWx0IHZhbHVlXHJcbiAgICAsIHZhbHVlT2Y6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lbWJlcnNcclxuICAgICAgfVxyXG4gICAgICAvLyBHZXQgdGhlIGJvdW5kaW5nIGJveCBvZiBhbGwgbWVtYmVycyBpbmNsdWRlZCBvciBlbXB0eSBib3ggaWYgc2V0IGhhcyBubyBpdGVtc1xyXG4gICAgLCBiYm94OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBib3ggPSBuZXcgU1ZHLkJCb3goKVxyXG4gIFxyXG4gICAgICAgIC8qIHJldHVybiBhbiBlbXB0eSBib3ggb2YgdGhlcmUgYXJlIG5vIG1lbWJlcnMgKi9cclxuICAgICAgICBpZiAodGhpcy5tZW1iZXJzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgcmV0dXJuIGJveFxyXG4gIFxyXG4gICAgICAgIC8qIGdldCB0aGUgZmlyc3QgcmJveCBhbmQgdXBkYXRlIHRoZSB0YXJnZXQgYmJveCAqL1xyXG4gICAgICAgIHZhciByYm94ID0gdGhpcy5tZW1iZXJzWzBdLnJib3goKVxyXG4gICAgICAgIGJveC54ICAgICAgPSByYm94LnhcclxuICAgICAgICBib3gueSAgICAgID0gcmJveC55XHJcbiAgICAgICAgYm94LndpZHRoICA9IHJib3gud2lkdGhcclxuICAgICAgICBib3guaGVpZ2h0ID0gcmJveC5oZWlnaHRcclxuICBcclxuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAvKiB1c2VyIHJib3ggZm9yIGNvcnJlY3QgcG9zaXRpb24gYW5kIHZpc3VhbCByZXByZXNlbnRhdGlvbiAqL1xyXG4gICAgICAgICAgYm94ID0gYm94Lm1lcmdlKHRoaXMucmJveCgpKVxyXG4gICAgICAgIH0pXHJcbiAgXHJcbiAgICAgICAgcmV0dXJuIGJveFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFkZCBwYXJlbnQgbWV0aG9kXHJcbiAgLCBjb25zdHJ1Y3Q6IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgbmV3IHNldFxyXG4gICAgICBzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU1ZHLlNldFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICBcclxuICBTVkcuU2V0RlggPSBTVkcuaW52ZW50KHtcclxuICAgIC8vIEluaXRpYWxpemUgbm9kZVxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihzZXQpIHtcclxuICAgICAgLyogc3RvcmUgcmVmZXJlbmNlIHRvIHNldCAqL1xyXG4gICAgICB0aGlzLnNldCA9IHNldFxyXG4gICAgfVxyXG4gIFxyXG4gIH0pXHJcbiAgXHJcbiAgLy8gQWxpYXMgbWV0aG9kc1xyXG4gIFNWRy5TZXQuaW5oZXJpdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG1cclxuICAgICAgLCBtZXRob2RzID0gW11cclxuICAgIFxyXG4gICAgLyogZ2F0aGVyIHNoYXBlIG1ldGhvZHMgKi9cclxuICAgIGZvcih2YXIgbSBpbiBTVkcuU2hhcGUucHJvdG90eXBlKVxyXG4gICAgICBpZiAodHlwZW9mIFNWRy5TaGFwZS5wcm90b3R5cGVbbV0gPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU1ZHLlNldC5wcm90b3R5cGVbbV0gIT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICBtZXRob2RzLnB1c2gobSlcclxuICBcclxuICAgIC8qIGFwcGx5IHNoYXBlIGFsaWFzc2VzICovXHJcbiAgICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgIFNWRy5TZXQucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSB0aGlzLm1lbWJlcnMubGVuZ3RoOyBpIDwgaWw7IGkrKylcclxuICAgICAgICAgIGlmICh0aGlzLm1lbWJlcnNbaV0gJiYgdHlwZW9mIHRoaXMubWVtYmVyc1tpXVttZXRob2RdID09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgICAgIHRoaXMubWVtYmVyc1tpXVttZXRob2RdLmFwcGx5KHRoaXMubWVtYmVyc1tpXSwgYXJndW1lbnRzKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiBtZXRob2QgPT0gJ2FuaW1hdGUnID8gKHRoaXMuZnggfHwgKHRoaXMuZnggPSBuZXcgU1ZHLlNldEZYKHRoaXMpKSkgOiB0aGlzXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXHJcbiAgICAvKiBjbGVhciBtZXRob2RzIGZvciB0aGUgbmV4dCByb3VuZCAqL1xyXG4gICAgbWV0aG9kcyA9IFtdXHJcbiAgXHJcbiAgICAvKiBnYXRoZXIgZnggbWV0aG9kcyAqL1xyXG4gICAgZm9yKHZhciBtIGluIFNWRy5GWC5wcm90b3R5cGUpXHJcbiAgICAgIGlmICh0eXBlb2YgU1ZHLkZYLnByb3RvdHlwZVttXSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTVkcuU2V0RlgucHJvdG90eXBlW21dICE9ICdmdW5jdGlvbicpXHJcbiAgICAgICAgbWV0aG9kcy5wdXNoKG0pXHJcbiAgXHJcbiAgICAvKiBhcHBseSBmeCBhbGlhc3NlcyAqL1xyXG4gICAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICBTVkcuU2V0RlgucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSB0aGlzLnNldC5tZW1iZXJzLmxlbmd0aDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgICB0aGlzLnNldC5tZW1iZXJzW2ldLmZ4W21ldGhvZF0uYXBwbHkodGhpcy5zZXQubWVtYmVyc1tpXS5meCwgYXJndW1lbnRzKVxyXG4gIFxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIFxyXG4gIFxyXG5cclxuXHJcbiAgU1ZHLmV4dGVuZChTVkcuRWxlbWVudCwge1xyXG4gIFx0Ly8gU3RvcmUgZGF0YSB2YWx1ZXMgb24gc3ZnIG5vZGVzXHJcbiAgICBkYXRhOiBmdW5jdGlvbihhLCB2LCByKSB7XHJcbiAgICBcdGlmICh0eXBlb2YgYSA9PSAnb2JqZWN0Jykge1xyXG4gICAgXHRcdGZvciAodiBpbiBhKVxyXG4gICAgXHRcdFx0dGhpcy5kYXRhKHYsIGFbdl0pXHJcbiAgXHJcbiAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5hdHRyKCdkYXRhLScgKyBhKSlcclxuICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmF0dHIoJ2RhdGEtJyArIGEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXR0cihcclxuICAgICAgICAgICdkYXRhLScgKyBhXHJcbiAgICAgICAgLCB2ID09PSBudWxsID9cclxuICAgICAgICAgICAgbnVsbCA6XHJcbiAgICAgICAgICByID09PSB0cnVlIHx8IHR5cGVvZiB2ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdiA9PT0gJ251bWJlcicgP1xyXG4gICAgICAgICAgICB2IDpcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodilcclxuICAgICAgICApXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgU1ZHLmV4dGVuZChTVkcuRWxlbWVudCwge1xyXG4gICAgLy8gUmVtZW1iZXIgYXJiaXRyYXJ5IGRhdGFcclxuICAgIHJlbWVtYmVyOiBmdW5jdGlvbihrLCB2KSB7XHJcbiAgICAgIC8qIHJlbWVtYmVyIGV2ZXJ5IGl0ZW0gaW4gYW4gb2JqZWN0IGluZGl2aWR1YWxseSAqL1xyXG4gICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PSAnb2JqZWN0JylcclxuICAgICAgICBmb3IgKHZhciB2IGluIGspXHJcbiAgICAgICAgICB0aGlzLnJlbWVtYmVyKHYsIGtbdl0pXHJcbiAgXHJcbiAgICAgIC8qIHJldHJpZXZlIG1lbW9yeSAqL1xyXG4gICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVtb3J5KClba11cclxuICBcclxuICAgICAgLyogc3RvcmUgbWVtb3J5ICovXHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLm1lbW9yeSgpW2tdID0gdlxyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gRXJhc2UgYSBnaXZlbiBtZW1vcnlcclxuICAsIGZvcmdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgdGhpcy5fbWVtb3J5ID0ge31cclxuICAgICAgZWxzZVxyXG4gICAgICAgIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5tZW1vcnkoKVthcmd1bWVudHNbaV1dXHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBJbml0aWFsaXplIG9yIHJldHVybiBsb2NhbCBtZW1vcnkgb2JqZWN0XHJcbiAgLCBtZW1vcnk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbWVtb3J5IHx8ICh0aGlzLl9tZW1vcnkgPSB7fSlcclxuICAgIH1cclxuICBcclxuICB9KVxyXG5cclxuICBmdW5jdGlvbiBjYW1lbENhc2UocykgeyBcclxuICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLSguKS9nLCBmdW5jdGlvbihtLCBnKSB7XHJcbiAgICAgIHJldHVybiBnLnRvVXBwZXJDYXNlKClcclxuICAgIH0pXHJcbiAgfVxyXG4gIFxyXG4gIC8vIEVuc3VyZSB0byBzaXgtYmFzZWQgaGV4IFxyXG4gIGZ1bmN0aW9uIGZ1bGxIZXgoaGV4KSB7XHJcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSA0ID9cclxuICAgICAgWyAnIycsXHJcbiAgICAgICAgaGV4LnN1YnN0cmluZygxLCAyKSwgaGV4LnN1YnN0cmluZygxLCAyKVxyXG4gICAgICAsIGhleC5zdWJzdHJpbmcoMiwgMyksIGhleC5zdWJzdHJpbmcoMiwgMylcclxuICAgICAgLCBoZXguc3Vic3RyaW5nKDMsIDQpLCBoZXguc3Vic3RyaW5nKDMsIDQpXHJcbiAgICAgIF0uam9pbignJykgOiBoZXhcclxuICB9XHJcbiAgXHJcbiAgLy8gQ29tcG9uZW50IHRvIGhleCB2YWx1ZVxyXG4gIGZ1bmN0aW9uIGNvbXBUb0hleChjb21wKSB7XHJcbiAgICB2YXIgaGV4ID0gY29tcC50b1N0cmluZygxNilcclxuICAgIHJldHVybiBoZXgubGVuZ3RoID09IDEgPyAnMCcgKyBoZXggOiBoZXhcclxuICB9XHJcbiAgXHJcbiAgLy8gQ2FsY3VsYXRlIHByb3BvcnRpb25hbCB3aWR0aCBhbmQgaGVpZ2h0IHZhbHVlcyB3aGVuIG5lY2Vzc2FyeVxyXG4gIGZ1bmN0aW9uIHByb3BvcnRpb25hbFNpemUoYm94LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICBpZiAod2lkdGggPT0gbnVsbCB8fCBoZWlnaHQgPT0gbnVsbCkge1xyXG4gICAgICBpZiAoaGVpZ2h0ID09IG51bGwpXHJcbiAgICAgICAgaGVpZ2h0ID0gYm94LmhlaWdodCAvIGJveC53aWR0aCAqIHdpZHRoXHJcbiAgICAgIGVsc2UgaWYgKHdpZHRoID09IG51bGwpXHJcbiAgICAgICAgd2lkdGggPSBib3gud2lkdGggLyBib3guaGVpZ2h0ICogaGVpZ2h0XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHdpZHRoOiAgd2lkdGhcclxuICAgICwgaGVpZ2h0OiBoZWlnaHRcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLy8gQ2FsY3VsYXRlIHBvc2l0aW9uIGFjY29yZGluZyB0byBmcm9tIGFuZCB0b1xyXG4gIGZ1bmN0aW9uIGF0KG8sIHBvcykge1xyXG4gICAgLyogbnVtYmVyIHJlY2FsY3VsYXRpb24gKGRvbid0IGJvdGhlciBjb252ZXJ0aW5nIHRvIFNWRy5OdW1iZXIgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMpICovXHJcbiAgICByZXR1cm4gdHlwZW9mIG8uZnJvbSA9PSAnbnVtYmVyJyA/XHJcbiAgICAgIG8uZnJvbSArIChvLnRvIC0gby5mcm9tKSAqIHBvcyA6XHJcbiAgICBcclxuICAgIC8qIGluc3RhbmNlIHJlY2FsY3VsYXRpb24gKi9cclxuICAgIG8gaW5zdGFuY2VvZiBTVkcuQ29sb3IgfHwgbyBpbnN0YW5jZW9mIFNWRy5OdW1iZXIgPyBvLmF0KHBvcykgOlxyXG4gICAgXHJcbiAgICAvKiBmb3IgYWxsIG90aGVyIHZhbHVlcyB3YWl0IHVudGlsIHBvcyBoYXMgcmVhY2hlZCAxIHRvIHJldHVybiB0aGUgZmluYWwgdmFsdWUgKi9cclxuICAgIHBvcyA8IDEgPyBvLmZyb20gOiBvLnRvXHJcbiAgfVxyXG4gIFxyXG4gIC8vIFBhdGhBcnJheSBIZWxwZXJzXHJcbiAgZnVuY3Rpb24gYXJyYXlUb1N0cmluZyhhKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBhLmxlbmd0aCwgcyA9ICcnOyBpIDwgaWw7IGkrKykge1xyXG4gICAgICBzICs9IGFbaV1bMF1cclxuICBcclxuICAgICAgaWYgKGFbaV1bMV0gIT0gbnVsbCkge1xyXG4gICAgICAgIHMgKz0gYVtpXVsxXVxyXG4gIFxyXG4gICAgICAgIGlmIChhW2ldWzJdICE9IG51bGwpIHtcclxuICAgICAgICAgIHMgKz0gJyAnXHJcbiAgICAgICAgICBzICs9IGFbaV1bMl1cclxuICBcclxuICAgICAgICAgIGlmIChhW2ldWzNdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcyArPSAnICdcclxuICAgICAgICAgICAgcyArPSBhW2ldWzNdXHJcbiAgICAgICAgICAgIHMgKz0gJyAnXHJcbiAgICAgICAgICAgIHMgKz0gYVtpXVs0XVxyXG4gIFxyXG4gICAgICAgICAgICBpZiAoYVtpXVs1XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgcyArPSAnICdcclxuICAgICAgICAgICAgICBzICs9IGFbaV1bNV1cclxuICAgICAgICAgICAgICBzICs9ICcgJ1xyXG4gICAgICAgICAgICAgIHMgKz0gYVtpXVs2XVxyXG4gIFxyXG4gICAgICAgICAgICAgIGlmIChhW2ldWzddICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHMgKz0gJyAnXHJcbiAgICAgICAgICAgICAgICBzICs9IGFbaV1bN11cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHMgKyAnICdcclxuICB9XHJcbiAgXHJcbiAgLy8gQWRkIG1vcmUgYm91bmRpbmcgYm94IHByb3BlcnRpZXNcclxuICBmdW5jdGlvbiBib3hQcm9wZXJ0aWVzKGIpIHtcclxuICAgIGIueDIgPSBiLnggKyBiLndpZHRoXHJcbiAgICBiLnkyID0gYi55ICsgYi5oZWlnaHRcclxuICAgIGIuY3ggPSBiLnggKyBiLndpZHRoIC8gMlxyXG4gICAgYi5jeSA9IGIueSArIGIuaGVpZ2h0IC8gMlxyXG4gIH1cclxuICBcclxuICAvLyBQYXJzZSBhIG1hdHJpeCBzdHJpbmdcclxuICBmdW5jdGlvbiBwYXJzZU1hdHJpeChvKSB7XHJcbiAgICBpZiAoby5tYXRyaXgpIHtcclxuICAgICAgLyogc3BsaXQgbWF0cml4IHN0cmluZyAqL1xyXG4gICAgICB2YXIgbSA9IG8ubWF0cml4LnJlcGxhY2UoL1xccy9nLCAnJykuc3BsaXQoJywnKVxyXG4gICAgICBcclxuICAgICAgLyogcGFzcnNlIHZhbHVlcyAqL1xyXG4gICAgICBpZiAobS5sZW5ndGggPT0gNikge1xyXG4gICAgICAgIG8uYSA9IHBhcnNlRmxvYXQobVswXSlcclxuICAgICAgICBvLmIgPSBwYXJzZUZsb2F0KG1bMV0pXHJcbiAgICAgICAgby5jID0gcGFyc2VGbG9hdChtWzJdKVxyXG4gICAgICAgIG8uZCA9IHBhcnNlRmxvYXQobVszXSlcclxuICAgICAgICBvLmUgPSBwYXJzZUZsb2F0KG1bNF0pXHJcbiAgICAgICAgby5mID0gcGFyc2VGbG9hdChtWzVdKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBvXHJcbiAgfVxyXG4gIFxyXG4gIC8vIEdldCBpZCBmcm9tIHJlZmVyZW5jZSBzdHJpbmdcclxuICBmdW5jdGlvbiBpZEZyb21SZWZlcmVuY2UodXJsKSB7XHJcbiAgICB2YXIgbSA9IHVybC50b1N0cmluZygpLm1hdGNoKFNWRy5yZWdleC5yZWZlcmVuY2UpXHJcbiAgXHJcbiAgICBpZiAobSkgcmV0dXJuIG1bMV1cclxuICB9XHJcblxyXG5cclxuICByZXR1cm4gU1ZHXHJcbn0pKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgU1ZHIGZyb20gJ3N2Zy5qcyc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGVsZW1lbnQgZm9yIHRoaXMgZ3JhcGhcbiAgICAgICAgc2VsZi5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBlbGVtZW50cyBpZFxuICAgICAgICBzZWxmLmVsZW1lbnQuaWQgPSBzZWxmLmlkO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgZGl2IHRvIHRoZSBwYWdlXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcblxuICAgICAgICAvLyBzZXQgdGhlIGVsZW1lbnRcbiAgICAgICAgc2VsZi5zdmcgPSBTVkcoc2VsZi5pZCk7XG5cbiAgICAgICAgLy8gc3RhcnQgdGhlXG4gICAgICAgIHNlbGYuc3RhcnQoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdUaGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIG92ZXJ3cml0dGVuJyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge1NWR31cbiAgICAgKi9cbiAgICBkcmF3OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN2ZztcbiAgICB9XG5cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgb2JqZWN0QXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xuaW1wb3J0IEJhc2VHcmFwaCBmcm9tICcuLi9CYXNlR3JhcGgnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdEFzc2lnbihCYXNlR3JhcGgsIHtcblxuICAgIC8vIHRoaXMgaXMgdGhlIGlkXG4gICAgaWQ6ICd0aW1lLXNwZW50JyxcblxuICAgIC8vIGhvbGRzIGFsbCB0aGUgc2hhcGVzIGZvciB0aGlzIGdyYXBoXG4gICAgc2hhcGVzOiB7fSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgd2lkdGggPSAxMDA7XG5cbiAgICAgICAgc2VsZi5zaGFwZXMudGltZSA9IHNlbGYuZHJhdygpLnJlY3Qod2lkdGgsIDEwMCk7XG5cbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2lkdGgrKztcbiAgICAgICAgICAgIHNlbGYuc2hhcGVzLnRpbWUud2lkdGgod2lkdGgpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxudmFyIGdyYXBocyA9IFtdO1xuXG4vLyB0aGlzIGp1c3QgYm9vdHN0cmFwcyBhbGwgdGhlIGRpZmZlcmVudCBncmFwaHNcbmdyYXBocy5wdXNoKHJlcXVpcmUoJy4vZ3JhcGhzL3RpbWUtc3BlbnQnKSk7XG5cbi8vIGxvb3AgdGhyb3VnaCBlYWNoIGdyYXBoIGFuZCBidWlsZCB0aGVtXG5fLmZvckVhY2goZ3JhcGhzLCAoZ3JhcGgpID0+IHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ3JhcGguYnVpbGQoKTtcbiAgICB9LCAwKTtcbn0pOyJdfQ==
