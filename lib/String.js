'use strict';

/**
 * A set of string related methods.
 *
 * @module String
 */

const wrap = require('./Array').wrap;
const toInt = require('./Number').toInt;


// ==========================================================================
/**
 * Converts a value to a string.  If `null` or `undefined` is passed in, then `null` or `undefined` is returned as
 * opposed to returning the strings `'null'` or `'undefined'`.  This was done so that `null` doesn't get changed to
 * `'null'` and `undefined` doesn't get changed to `'undefined'` which may not be what you want when merging `null`able
 * data with a template.
 *
 * If you want to guarantee that a string is always returned, then call this function like so:
 *
 * ```js
 * // NOTE: false, '', and 0 as input will return default string.
 * convert(input || "Some default string value.  May be empty.");
 * // OR
 * // NOTE: false, '', and 0 as input will return 'false', default string, or '0' respectively.
 * convert(input) || "Some default string value.  May be empty.";
 * ```
 *
 * If you want `null` to become `'null'` and `'undefined'` to become `'undefined'`, then call this function like so:
 *
 * ```js
 * convert('' + input); // NOTE: Different than `'' + input` alone since input will get trimmed.
 * ```
 *
 * See the Jasmine Specs for example uses.
 *
 * @function module:String.convert
 *
 * @param {*} input - The value to convert to a string.
 * @param {Object} [options] - The options to use when doing the conversion.
 * @param {boolean} [options.trim=true] - `false` to not trim the string after conversion.
 *
 * @returns {string|null|undefined} The input converted to a string.
 */
function convert(input, options) {
  let doTrim, output;

  options = options || {};
  doTrim = options.trim !== false;

  if (typeof input == 'undefined' || input === null) {
    output = input;
  }
  else {
    output = `${input}`;
  }

  if (doTrim) {
    output = trim(output);
  }

  return output;
}


// ==========================================================================
/**
 * An alias for {@link module:String.convert convert}.  This is useful when importing this module, especially when
 * importing a `convert` function from multiple modules.
 *
 * Use the following
 * ```js
 * import { toBool } from './Boolean';
 * import { toStr } from './String';
 * ```
 * instead of
 * ```js
 * import { convert as toBool } from './Boolean';
 * import { convert as toStr } from './String';
 * ```
 *
 * @function module:String.toStr
 */
const toStr = convert;


// ==========================================================================
const ESCAPE_RE = /('|\\)/g;

/**
 * Escapes `'` (single-quote) and `\` (backslash) from the specified string.  This is useful to make a string properly
 * escaped for use in JavaScript string literals.
 *
 * NOTE: Non-string input just falls through.  It is not converted to a string before escaping.
 *
 * ```js
 * var str = escape("my string that may contain ' and \\.");
 * var code = merge("var str = '{0}';", str);
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * @function module:String.escape
 *
 * @param {string} input - The string to escape.
 *
 * @returns {string|*} The escaped string or the non-string input.
 */
function escape(input) {
  /* eslint no-shadow: ["error", { allow: ["escape"] }] */
  if (typeof input == 'string') {
    input = input.replace(ESCAPE_RE, '\\$1');
  }
  return input;
}


// ==========================================================================
/**
 * An alias for {@link module:String.escape escape}.  This useful when importing this module, especially when
 * importing an `escape` function from multiple modules.
 *
 * Use the following
 * ```js
 * import { escapeStr } from './String';
 * ```
 * instead of
 * ```js
 * import { escape as escapeStr } from './String';
 * ```
 *
 * @function module:String.escapeStr
 */
const escapeStr = escape;


// ==========================================================================
/**
 * Left pads a string with a padding character to a specific length.
 *
 * NOTE: Non-string input just falls through.  It is not converted to a string before padding.
 *
 * ```js
 * var str = leftPad("$654,321", 10, ' ');
 * console.log(str); // '  $654,321'
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * @function module:String.leftPad
 *
 * @param {string} input - The string to pad.
 * @param {number} length - The length of the string to pad to.  The returned value may have a longer length if the
 *   input already had a longer length.  That is, any characters beyond `length` is not truncated.
 * @param {string} padding - The character to pad with.  Must be a single character.
 *
 * @returns {string|*} A new padded string or the non-string input.
 */
function leftPad(input, length, padding) {
  let inputLen, output;

  output = input;
  if (typeof input == 'string') {
    inputLen = input.length;
    output = [];
    if (typeof padding == 'string' && padding.length === 1 && length > 0) {
      for (let i = 0, iLen = Math.max(length - inputLen, 0); i < iLen; ++i) {
        output.push(padding);
      }
    }
    output.push(input);
    output = output.join('');
  }

  return output;
}


// ==========================================================================
/**
 * Right pads a string with a padding character to a specific length.
 *
 * NOTE: Non-string input just falls through.  It is not converted to a string before padding.
 *
 * ```js
 * var str = rightPad("$654,321", 10, ' ');
 * console.log(str); // '$654,321  '
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * @function module:String.rightPad
 *
 * @param {string} input - The string to pad.
 * @param {number} length - The length of the string to pad to.  The returned value may have a longer length if the
 *   input already had a longer length.  That is, any characters beyond `length` is not truncated.
 * @param {string} padding - The character to pad with.  Must be a single character.
 *
 * @returns {string|*} A new padded string or the non-string input.
 */
function rightPad(input, length, padding) {
  let inputLen, output;

  output = input;
  if (typeof input == 'string') {
    inputLen = input.length;
    output = [input];
    if (typeof padding == 'string' && padding.length === 1 && length > 0) {
      for (let i = 0, iLen = Math.max(length - inputLen, 0); i < iLen; ++i) {
        output.push(padding);
      }
    }
    output = output.join('');
  }

  return output;
}


// ==========================================================================
const PLACEHOLDER_RE = /\{(\d+)\}/g;

/**
 * Merges data with a simple position-based template.
 *
 * NOTE: Non-string template just falls through.  It is not converted to a string before merging.
 *
 * ```js
 * merge("{1}, {0}!", ["World", "Hello"]); // "Hello, World!"
 * merge("{0} {1} {2}", ["First", "Middle"], { undef: "No Last" }); // "First Middle No Last"
 * merge(new Date(), ["World", "Hello"]); // Returns the new Date instance since the template is not a string.
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * @function module:String.merge
 *
 * @param {string|*} template - The simple position-based template.  Placeholders are of the form `{n}` where `n` is
 *   an integer greater than or equal to zero.
 * @param {Array.<*>} data - The position-based data to be merged with the template.
 * @param {Object} [options] - The options to use when parsing.
 * @param {*} [options.undef] - The value to use when a placeholder points outside of the data.  NOTE: This is not
 *   used when an item in the data array is `undefined` but when a placeholder refers to an index outside of the data
 *   array.
 *
 * @returns {string|*} A new merged string or the non-string value.
 */
function merge(template, data, options) {
  let undef;

  if (typeof template == 'string') {
    data = wrap(data);
    options = options || {};
    undef = options.hasOwnProperty('undef') ? options.undef : void 0;
    template = template.replace(PLACEHOLDER_RE, (match, idx) => {
      // In some browsers, if undefined is returned back to the `replace` method, it appears it is converted to
      // an empty string.  So we convert everything to a string before returning it back to the `replace`
      // function.
      let value = `${(idx < data.length ? data[idx] : undef)}`;

      return value;
    });
  }
  return template;
}


// ==========================================================================
/**
 * An alias for {@link module:String.merge merge}.  This useful when importing this module, especially when
 * importing a `merge` function from multiple modules.
 *
 * Use the following
 * ```js
 * import { mergeStr } from './String';
 * ```
 * instead of
 * ```js
 * import { merge as mergeStr } from './String';
 * ```
 *
 * @function module:String.mergeStr
 */
const mergeStr = merge;


// ==========================================================================
/**
 * A utility function that behaves similar to the C programming language's `printf` function.
 *
 * ```js
 * printf('Hello World!'); // "Hello World!"
 * printf('Hello', 'World!', 'What a beautiful day!'); // "Hello World! What a beautiful day!"
 * printf('%s %s', 'Hello', 'World!'); // "Hello World!"
 * // Extra placeholders pass through untouched
 * printf('%s %s', 'Hello'); // "Hello %s"
 * // Replacement values are coersed to placeholder's type
 * printf('%s must be between %i and %d.', 'It', 1.2, 3.14); // "It must be between 1 and 3.14."
 * // Extra replacement values are appended with a space delimiter.
 * printf('%s %s', 'Hello', 'World!', 'What a beautiful day!'); // "Hello World! What a beautiful day!"
 * var obj = { foo: 'bar' };
 * printf(obj); // "[object Object]"
 * printf('%s', obj); // "[object Object]"
 * printf('%j', obj); // '{"foo":"bar"}'
 * ```
 *
 * Four different placeholders are understood.
 *
 * - %d coerses the replacement value to a number before replacing.
 * - %i coerses the replacement value to an integer before replacing.
 * - %j coerses the replacement value to a JSON string before replacing.
 * - %s coerses the replacement value to a string before replacing.
 *
 * @function module:String.printf
 *
 * @param {string} template - The string template with the printf style placeholders.
 * @param {*} [varargs] - The replacement values.
 *
 * @returns {string} A new string with the placeholders replaced with the specified replacement values.
 */
function printf(template) {
  let args, argsLen, i, out;

  if (typeof template == 'undefined') {
    return void 0;
  }
  out = `${template}`;
  args = arguments;
  argsLen = args.length;
  i = 1;

  out = out.replace(/%[idjs%]/g, placeholder => {
    let replacement;

    replacement = placeholder;
    if (placeholder == '%%') {
      replacement = '%';
    }
    else {
      if (i < argsLen) {
        replacement = args[i];
        /*
        See https://developer.mozilla.org/en-US/docs/Web/API/Console#Using_string_substitutions.

        NOTE: Some browsers recognize some other placeholders:

        Chrome 50/FireFox 46/IE 11/Node 5:

        %s - Converts value to string

        Chrome 50/FireFox 46/IE 11:

        %d - Seems to truncate to integer
        %f - number but with decimals
        %i - Seems to truncate to integer

        Chrome 50/FireFox 46:

        %c - Seems to clear the value (turn it to empty string)
        %o - Makes objects inspectable.
        %O - Makes object inspectable.

        IE 11:

        %b - binary
        %e - number in scientific notation
        %x - number in a somewhat hex format
        %E - number in scientific notation
        %X - number in a somewhat hex format

        Node 5:

        %d - number but with decimals
        %j - Converts value to JSON

        */
        switch (placeholder) {
        case '%d':
          replacement = parseFloat(replacement);
          break;
        case '%i':
          replacement = toInt(replacement, { def: NaN });
          break;
        case '%j':
          replacement = JSON.stringify(replacement);
          break;
        }
      }
      i += 1;
    }
    return replacement;
  });

  if (i < argsLen) {
    out = [out];
    // Include extraneous replacement values delimited by a space.  This corresponds with Node's util.format's
    // behaviour.
    while (i < argsLen) {
      out.push(` ${args[i]}`);
      i += 1;
    }
    out = out.join('');
  }

  return out;
}


// ==========================================================================
const TRIM_RE = /(^\s*)|(\s*$)/g;

/**
 * Trims leading and trailing whitespace from a string.
 *
 * ```js
 * var str = trim("  \t$654,321\t\r\n  ");
 * console.log(str); // '$654,321'
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * NOTE: Non-string input just falls through.  It is not converted to a string before trimming.
 *
 * ```js
 * var str = trim(null);
 * console.log(str === null); // true
 * ```
 *
 * **Why do we need this function when JavaScript supplies the `String#trim` method?**
 *
 * `String#trim` requires that the string exists.  If it doesn't, then an error is thrown.  To prevent an error from
 * being thrown, checks in the code are required before calling `String#trim` which clutters up the code.  Consider the
 * following example.
 *
 * ```js
 * function transform(obj, key) {
 *   var val = obj[key];
 *   // At this point we don't know what type of object `val` is.  It could be `undefined`, `null`, etc.
 *   // Calling `val.trim()` will cause an error if `val` is not a string or an object with a `trim` method.
 *
 *   // So, instead of:
 *   if (typeof val == 'string' && typeof val.trim == 'function') {
 *     val = val.trim();
 *   }
 *   // use the cleaner:
 *   val = trim(val);
 *
 *   // Continue processing
 *   ...
 * }
 * ```
 *
 * Another reason is because very old browsers didn't have the `String#trim` method, but these old browsers are
 * virtually non-existant now-a-days.
 *
 * NOTE: This function will _not_ trim a string created with the `String` object.
 *
 * ```js
 * var str = new String(' surrounded by whitespace ');
 * str = trim(str);
 * console.log('(' + str + ')'); // ( surrounded by whitespace )
 * ```
 *
 * This was done to prevent changing the string object to a string primative.  The client may have a good reason to be
 * using string objects instead of string primatives.
 *
 * @function module:String.trim
 *
 * @param {string} input - The string to be trimmed.
 *
 * @returns {string|*} A new string with whitespace trimmed or the non-string input.
 */
function trim(input) {
  /*
   * Dependencies:
   * - Core JS API.
   */
  if (typeof input == 'string') {
    input = input.replace(TRIM_RE, '');
  }
  return input;
}


// ==========================================================================
/**
 * An alias for {@link module:String.trim trim}.  This useful when importing this module, especially when
 * importing a `trim` function from multiple modules.
 *
 * Use the following
 * ```js
 * import { trimStr } from './String';
 * ```
 * instead of
 * ```js
 * import { trim as trimStr } from './String';
 * ```
 *
 * @function module:String.trimStr
 */
const trimStr = trim;


// ==========================================================================
module.exports = {
  convert,
  escape,
  escapeStr,
  leftPad,
  merge,
  mergeStr,
  printf,
  rightPad,
  toStr,
  trim,
  trimStr,
};
