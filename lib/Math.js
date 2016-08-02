'use strict';

/** @module Math */

const typeOf = require('./TypeOf').typeOf;


// ==========================================================================
// The following is modified from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round.
/**
 * Decimal adjustment of a number.
 *
 * @private
 * @function module:Math._decimalAdjust
 *
 * @param {string} type - The type of adjustment.  Must be one of `'ceil'`, `'floor'`,  or `'round'`.
 * @param {number} value - The number.
 * @param {number} exp - The exponent (the 10 logarithm of the adjustment base).
 *
 * @returns {number} The adjusted value.
 */
function _decimalAdjust(type, value, exp) {
  /*
   * Dependencies:
   * - TypeOf.typeOf
   */
  let typeOfExp;

  if (typeof value !== 'number') {
    return value;
  }
  value = +value;
  typeOfExp = typeOf(exp);
  if (typeOfExp !== 'number') {
    return value;
  }
  exp = +exp;
  if (exp === 0) {
    return Math[type](value);
  }
  // If the exp is not an integer...
  if (exp % 1 !== 0) {
    return value;
  }
  // Shift
  value = value.toString();
  value = value.split('e');
  value = Math[type](+(`${value[0]}e${(value[1] ? +value[1] - exp : -exp)}`));
  // Shift back
  value = value.toString();
  value = value.split('e');
  return +(`${value[0]}e${(value[1] ? +value[1] + exp : exp)}`);
}


// ==========================================================================
/**
 * Similar to `Math.round` but is capable of rounding to different decimal places.  `Math.round` will only round a
 * number to the nearest integer which is effectively rounding to zero decimal places.
 *
 *     round(20.49); // 20
 *     round(20.5); // 21
 *     round(-20.5); // -20
 *     round(-20.51); // -21
 *     Math.round(1.005 * 100)/100; // 1.  Due to inaccurate floating point arithmetic, this rounds incorrectly.
 *     round(1.005, -2) // 1.01.  But this doesn't.
 *     round(1234.5678, -5) // 1234.5678
 *     round(1234.5678, -4) // 1234.5678
 *     round(1234.5678, -3) // 1234.568
 *     round(1234.5678, -2) // 1234.57
 *     round(1234.5678, -1) // 1234.6
 *     round(1234.5678, 0) // 1235
 *     round(1234.5678) // 1235
 *     round(1234.5678, 1) // 1230
 *     round(1234.5678, 2) // 1200
 *     round(1234.5678, 3) // 1000
 *     round(1234.5678, 4) // 0
 *
 * See the Jasmine Specs for more example uses.
 *
 * @function module:Math.round
 *
 * @param {number} value - The number.
 * @param {number} exp - The exponent (the 10 logarithm of the adjustment base).  May be positive or negative.
 *
 * @returns {number} The rounded value.
 */
function round(value, exp) {
  /*
   * Dependencies:
   * - Math._decimalAdjust
   *   + TypeOf.typeOf
   */
  return _decimalAdjust('round', value, exp);
}


// ==========================================================================
exports.round = round;
