'use strict';

/** @module RegExp */


// ==========================================================================
const ESCAPE_RE = /([\-.*+?\^${}()|\[\]\/\\])/g;

/**
 * Escapes the characters in the pattern that have special meaning in regular expressions.  That way, the special
 * characters will just be treated as literals when used where regular expression patterns are expected.
 *
 * ```js
 * escape(...);
 * ```
 *
 * @function module:RegExp.escape
 *
 * @param {?string} pattern - The string that may contain characters that have special meaning in regular expressions.
 *
 * @returns {string} The escaped pattern.
 */
function escape(pattern) {
  /* eslint no-shadow: ["error", { allow: ["escape"] }] */
  if (typeof pattern == 'string') {
    pattern = pattern.replace(ESCAPE_RE, '\\$1');
  }
  return pattern;
}


// ==========================================================================
/**
 * An alias for {@link module:RegExp.escape escape}.  This useful when importing this module, especially when
 * importing an `escape` function from multiple modules.
 *
 * Use the following
 * ```js
 * import { escapeRegX } from './RegExp';
 * ```
 * instead of
 * ```js
 * import { escape as escapeRegX } from './RegExp';
 * ```
 *
 * @function module:RegExp.escapeRegX
 */
const escapeRegX = escape;


// ==========================================================================
module.exports = {
  escape,
  escapeRegX,
};
