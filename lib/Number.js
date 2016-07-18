// jshint -W097
'use strict';

/**
 * A set of number related methods.
 *
 * @module Number
 */

const round = require('./Math').round;
const typeOf = require('./TypeOf').typeOf;


// ==========================================================================
/**
 * Attempts to convert a number-like value to a JavaScript number.  `undefined`, `null`, and `NaN` return the default
 * value (`null`).
 *
 * ```js
 * convert('2'); // 2
 * convert(2.6); // 2.6
 * convert(1.2); // 1.2
 * convert(1); // 1
 * convert(-1); // -1
 * convert(-2.6); // -2.6
 * convert('1234.5678', { exp: -2 }); // 1234.57
 * ```
 *
 * See the Jasmine Specs for example uses.
 *
 * @function module:Number.convert
 *
 * @param {*} input - The number like value to be converted to a JavaScript number.  This may also be an object with
 *   a custom `valueOf` method that returns a number or parsible string.
 * @param {Object} [options] - The options to use when doing the conversion.
 * @param {*} [options.def=null] - The default value to return if unable to convert.  This is allowed to be of any
 *   data type.
 * @param {*} [options.exp=null] - The exponent (the 10 logarithm of the adjustment base).
 *
 * @returns {number|*} The input converted to a number (float or integer) or the default value if unable to
 *   convert.  Note: a value of type number is not always returned when the default value is returned.
 */
function convert(input, options) {
  /*
   * Dependencies:
   * - Math.round
   *   + Math._decimalAdjust
   *     - TypeOf.typeOf
   * - TypeOf.typeOf
   */
  var def, exp, output, skipCheckForInf, skipRounding, typeOfExp, typeOfInput, typeOfOutput;

  options = options || {};
  def = options.hasOwnProperty('def') ? options.def : null;
  exp = options.hasOwnProperty('exp') ? options.exp : null;
  if (input) {
    typeOfInput = typeOf(input);
    if (typeOfInput == 'number') {
      output = input.valueOf();
      skipCheckForInf = true;
    }
    else if (typeOfInput == 'infinity') {
      output = input;
    }
    else {
      input = input.valueOf();
      output = parseFloat(input);
      if (isNaN(output)) {
        skipRounding = true;
        output = def;
      }
    }
  }
  else if (input === 0) {
    return 0;
  }
  else {
    return def;
  }
  if (!skipCheckForInf) {
    typeOfExp = typeOf(exp);
    if (typeOfExp == 'number') {
      typeOfOutput = typeOf(output);
      if (typeOfOutput == 'infinity') {
        return def;
      }
    }
  }
  if (!skipRounding) {
    output = round(output, exp);
  }

  return output;
}


// ==========================================================================
/**
 * An alias for {@link module:Number.convert convert}.  This is useful when importing this module, especially when
 * importing a `convert` function from multiple modules.
 *
 * Use the following
 * ```js
 * import { toNum } from 'Number';
 * import { toStr } from 'String';
 * ```
 * instead of
 * ```js
 * import { convert as toNum } from 'Number';
 * import { convert as toStr } from 'String';
 * ```
 *
 * @function module:Number.toNum
 */
const toNum = convert;


// ==========================================================================
/**
 * Attempts to convert an integer-like value to a JavaScript number.  `undefined`, `null`, and `NaN` return the default
 * value (`null` by default).
 *
 * ```js
 * toInt(-1e4); // -10000
 * toInt('-1e4'); // -10000
 * toInt("2"); // 2
 * toInt(2.6); // 3
 * toInt(1.2); // 1
 * toInt(1); // 1
 * toInt(-1); // -1
 * toInt(-2.6); // -3
 * toInt(6.022e23); // 602200000000000000000000
 * toInt('6.022e23'); // 602200000000000000000000
 * ```
 *
 * NOTE: This behaves differently than `parseInt` with the same input for certain input especially strings and large
 * numbers.
 *
 * ```js
 * toInt('-1e4'); // -10000
 * parseInt('-1e4'); // -1
 * toInt(6.022e23); // 602200000000000000000000
 * parseInt(6.022e23); // 6
 * ```
 *
 * See the Jasmine Specs for example uses.
 *
 * @function module:Number.toInt
 *
 * @param {*} input - The integer-like value to be converted to a JavaScript number.  This may also be an object
 *   with a custom `valueOf` method that returns a number or parsible string.
 * @param {Object} [options] - The options to use when doing the conversion.
 * @param {*} [options.def=null] - The default value to return if unable to convert.  This is allowed to be of any
 *   data type.
 *
 * @returns {number|*} The input converted to an integer or the default value if unable to convert.  Note: a value
 *   of type number is not always returned when the default value is returned.
 */
function toInt(input, options) {
  /*
   * Dependencies:
   * - Number.convert
   *   + Math.round
   *     - Math._decimalAdjust
   *       + TypeOf.typeOf
   *   + TypeOf.typeOf
   */
  var output;

  options = options || {};
  options.exp = 0;
  output = convert(input, options);
  return output;
}


// ==========================================================================
module.exports = {
  convert,
  toInt,
  toNum,
};
