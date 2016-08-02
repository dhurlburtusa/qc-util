'use strict';

/**
 * A set of boolean related methods.
 *
 * @module Boolean
 */

const typeOf = require('./TypeOf').typeOf;


// ==========================================================================
/**
 * Attempts to convert given input to a boolean (primitive).
 *
 * The following values return `false`:
 *
 * - `0`
 * - `false`
 * - `'0'`
 * - `'f'`
 * - `'F'`
 * - `'false'` and any case variation like `'False'`.
 * - `'n'`
 * - `'N'`
 * - `'no'` and any case variation like `'No'`.
 * - `'off'` and any case variation like `'Off'`.
 *
 * The following values return `true`:
 *
 * - `1`
 * - `true`
 * - `'1'`
 * - `'on'` and any case variation like `'On'`.
 * - `'t'`
 * - `'T'`
 * - `'true'` and any case variation like `'True'`.
 * - `'y'`
 * - `'Y'`
 * - `'yes'` and any case variation like `'Yes'`.
 *
 * All other values return the default value (`null` by default).
 *
 * NOTE: This function behaves differently than the native `Boolean` constructor function which returns `true` or
 * `false` based on the JavaScript truthiness of the given value.
 *
 * ```js
 * convert(true);     // `true`
 * convert('Yes');    // `true`
 * convert('true');   // `true`
 * convert(false);    // `false`
 * convert('No');     // `false`
 * convert('false');  // `false`
 * convert('other');  // `null`
 * convert('other', { def: false });  // `false`
 * convert({});  // `false`
 * convert({ valueOf: function () { return 'yes'; } });  // `true`
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * @function module:Boolean.convert
 * @see {@link module:Boolean.toBool toBool}
 *
 * @param {?*} input - The value to be converted to a boolean.
 * @param {Object} [options] - The options to use when doing the conversion.
 * @param {*} [options.def=null] - The default value to return if unable to convert.
 *
 * @returns {(boolean|null|*)} The input converted to a boolean or the default value if unable to convert.
 */
function convert(input, options) {
  let defValue, output, typeOfInput;

  options = options || {};
  defValue = options.hasOwnProperty('def') ? options.def : null;
  output = defValue;
  typeOfInput = typeOf(input);

  if (typeOfInput == 'boolean') {
    output = input;
  }
  else if (typeOfInput != 'undefined' && typeOfInput != 'null' && typeof input.valueOf == 'function') {
    input = input.valueOf();
    if (input && typeof input.toString == 'function') {
      input = input.toString().toLowerCase();
    }
    // The following check ensures only a boolean is returned.
    if (convert.lut.hasOwnProperty(input)) {
      output = convert.lut[input];
    }
  }

  return output;
}

convert.lut = {
  0: false,
  1: true,
  f: false,
  t: true,
  n: false,
  y: true,
  on: true,
  off: false,
  no: false,
  yes: true,
  false: false,
  true: true,
};


// ==========================================================================
/**
 * An alias for {@link module:Boolean.convert convert}.  This is useful when importing this module, especially when
 * importing a `convert` function from multiple modules.
 *
 * Use the following
 * ```js
 * import { toBool } from 'Boolean';
 * import { toStr } from 'String';
 * ```
 * instead of
 * ```js
 * import { convert as toBool } from 'Boolean';
 * import { convert as toStr } from 'String';
 * ```
 *
 * @function module:Boolean.toBool
 */
const toBool = convert;


// ==========================================================================
/**
 * Conditionally applies the NOT operator to the specified boolean-like value.  Useful when the condition flag is not
 * known ahead of time.
 *
 * ```js
 * var condition = ...;
 * var param = ...;
 * param = not(param, condition);
 * ```
 *
 * It can also be used to convert a boolean-like value to an actual boolean value.
 *
 * ```js
 * var boolLike = ...;
 * var bool = not(boolLike);
 * typeof bool == 'boolean'; // true
 * ```
 *
 * If the condition flag is known ahead of time, then it is shorter to use the following.
 *
 * ```js
 * var boolLike = ...;
 * // Instead of
 * var bool = not(boolLike, false);
 * // use. (Notice the double `!`.)
 * var bool = !!boolLike;
 * // Instead of
 * var bool = not(boolLike, true);
 * // use. (Notice the single `!`.)
 * var bool = !boolLike;
 * ```
 *
 * @function module:Boolean.not
 *
 * @param {*} value - The boolean-like value to possibly have the NOT operator applied to it.
 * @param {boolean} [condition=true] - Flag indicating whether to apply the NOT operator to the value.
 *
 * @returns {boolean} The specified value with the `!` operator conditionally applied.
 */
function not(value, condition) {
  /* eslint prefer-rest-params: "off" */
  if (arguments.length <= 1) { condition = true; }

  if (condition) {
    value = !value;
  }

  return !!value;
}


// ==========================================================================
module.exports = {
  convert,
  not,
  toBool,
};
