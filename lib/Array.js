'use strict';

/** @module Array */


// ==========================================================================
/**
 * Wraps a value in an array if it's not already an array.  This is useful for APIs that accept either a single value
 * or an array of values.  Returns:
 *
 * - An empty array if given value is `undefined`.
 * - Itself if given value is already an array.
 * - An array with `null` as the single item if given value is `null`.
 * - Otherwise, an array with a single item which is the given value.
 *
 * Here are some example uses.
 *
 * ```js
 * function each(values) {
 *   values = wrap(values);
 *   values.forEach(function (...) { ... });
 *   ...
 * }
 * each();
 * each('single');
 * each(['one', 'two']);
 * wrap(); // [] (new empty array)
 * wrap(undefined); // [] (new empty array)
 * wrap([]); // A reference to the passed-in empty array ([]).
 * wrap([1, 2, 3]); // A reference to passed-in array ([1,2,3]).
 * wrap(NaN); // [NaN]
 * wrap(null); // [null]
 * wrap(0); // [0]
 * wrap(false); // [false]
 * wrap(""); // [""]
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * NOTE: This function does not return an empty array when `null` is passed in.  In that case, an array with `null` as
 * the single item is returned.  This was done because `null` is considered a legitimate value in the QC ecosystem.
 * Other than this, the function behaves the same as the NPM [arrify](https://www.npmjs.com/package/arrify) package.
 *
 * @function module:Array.wrap
 *
 * @param {*} input - The value to wrap in an array if it's not already an array.
 *
 * @returns {Array.<*>} The input as an array.
 */
function wrap(input) {
  /*
   * Dependencies:
   * - Core JS API.
   */
  if (typeof input == 'undefined') {
    return [];
  }

// @if DEBUG
  if (typeof Array.isArray !== 'function') {
    /* eslint no-console: "off" */
    console.error('Missing Dependency: Array.isArray().  Use a polyfill to rectify.');
  }
// @endif

  if (Array.isArray(input)) {
    return input;
  }

  return [input];
}


// ==========================================================================
exports.wrap = wrap;
