// jshint -W097
'use strict';

/** @module TypeOf */


// ==========================================================================
/**
 * Returns the type of the specified value as a string.  The list of possible types are:
 *
 * - `'arguments'`: If the specified value is a function Arguments object.
 * - `'array'`: If the specified value is an array.
 * - `'boolean'`: If the specified value is a boolean value.
 * - `'date'`: If the specified value is a `Date` object.
 * - `'function'`: If the specified value is a function reference.  This includes generator functions.
 * - `'infinity'`: If the specified value is `Infinity`, `Number.NEGATIVE_INFINITY`, or `Number.POSITIVE_INFINITY`.
 * - `'nan'`: If the specified value is `NaN`.
 * - `'null'`: If the specified value is `null`.
 * - `'number'`: If the specified value is a number.
 * - `'object'`: If the specified value is an object.
 * - `'regexp'`: If the specified value is a regular expression.
 * - `'string'`: If the specified value is a string.
 * - `'symbol'`: If the specified value is a symbol (ES6).
 * - `'undefined'`: If the specified value is `undefined`.
 * - `'undetermined'`: If the specified value has an undetermined type.  If this ever happens, then update this function
 *   to appropriately handle the value.
 *
 * ```js
 * (function () {
 *   typeOf(arguments);  // 'arguments'
 * })();
 *
 * typeof [];  // 'object'
 * typeOf([]);  // 'array' instead of 'object'
 *
 * typeOf(true);  // 'boolean'
 *
 * typeof new Date();  // 'object'
 * typeOf(new Date());  // 'date' instead of 'object'
 *
 * typeOf(function () {});  // 'function'
 *
 * typeof Infinity;  // 'number'
 * typeOf(Infinity);  // 'infinity' instead of 'number'
 *
 * typeof NaN;  // 'number'
 * typeOf(NaN);  // 'nan' instead of 'number'
 *
 * typeof null;  // 'object'
 * typeOf(null);  // 'null'
 *
 * typeOf(1234);  // 'number'
 *
 * typeOf({});  // 'object'
 *
 * typeof /regexp/;  // 'object'
 * typeOf(/regexp/);  // 'regexp' instead of 'object'
 *
 * typeOf('');  // 'string'
 *
 * typeOf();  // 'undefined'
 * ```
 *
 * @function module:TypeOf.typeOf
 *
 * @param {?*} value - The value to determine the type of.
 *
 * @returns {string} The type of the specified value.
 */
function typeOf(value) {
  /*
   * Dependencies:
   * - Core JS API.
   */
  var typeOf, typeToString;

  if (value === null) {
    return 'null';
  }

  typeOf = typeof value;

  if (typeOf == 'undefined' || typeOf == 'string' || typeOf == 'boolean' || typeOf == 'function' || typeOf == 'symbol') {
    return typeOf;
  }

  typeToString = Object.prototype.toString.call(value);

  switch (typeToString) {
    case '[object Arguments]':
      return 'arguments';
    case '[object Array]':
      return 'array';
    case '[object Date]':
      return 'date';
    case '[object Boolean]':
      return 'boolean';
    case '[object Number]':
      if (value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY) {
        return 'infinity';
      }
      if (Number.isNaN(value)) {
        return 'nan';
      }
      return 'number';
    case '[object RegExp]':
      return 'regexp';
    case '[object String]':
      return 'string';
  }

  if (typeOf == 'object') {
    return 'object';
  }

// @if DEBUG
  console.warn(`Unable to determine type of "${value}".  Please update npm:qc-util:typeOf function to handle it.`);
// @endif
  return 'undetermined';
}


// ==========================================================================
exports.typeOf = typeOf;
