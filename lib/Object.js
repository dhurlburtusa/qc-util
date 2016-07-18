// jshint -W097
'use strict';

/**
 * A set of object related methods.
 *
 * @module Object
 */

const wrap = require('./Array').wrap;
const toBool = require('./Boolean').toBool;
const toDate = require('./Date').toDate;
const NumberMod = require('./Number');
const toInt = NumberMod.toInt;
const toNum = NumberMod.toNum;
const toStr = require('./String').toStr;


// ==========================================================================
/**
 * Coerses a value to align with the specified schema.  This can be useful to post-process an object created from a
 * JSON response when a property should represent a date (since `Date`s can only be represented in a serialized form
 * in JSON).  Consider the following:
 *
 * ```js
 * // JSON Response from Server:
 * // { "dob": 946684800000, "name": "foo bar", ... }
 * // is converted to the following equivalent object using `JSON.parse`.
 * var person = { dob: 946684800000, name: "foo bar", ... };
 * // Notice that person.dob is an integer but we want it as a JavaScript date object.
 * // The following schema describes a person as an object with a `dob` property that
 * // should be a `Date`, a `name` property that should be a string, and so forth.
 * var schema = {
 *   type: 'object',
 *   keys: {
 *     dob: { type: 'date' },
 *     name: { type: 'string' },
 *     ...
 *   }
 * };
 * person = coerse(person, schema);
 * // `person` is now equivalent to: { dob: new Date(946684800000), name: 'foo bar', ...}.
 * ```
 *
 * This function can also be useful to post-process HTML form data since all values are strings.
 *
 * @function module:Object.coerse
 *
 * @param {*} val - The value to be coersed to align with the specified schema.
 * @param {Object} valSchema - The value schema.  This declares what the value's schema should look like.
 *
 * @returns {*} The value coersed to align with the specified schema.
 */
function coerse(val, valSchema) {
  var coersedVal, opts, type;

  if (val === undefined) {
    return;
  }

  type = valSchema.type;
  opts = valSchema.opts;

  switch (type) {
  case 'array':
    val = val === null ? [] : val;
    coersedVal = wrap(val);
    _coerseArr(coersedVal, valSchema);
    break;
  case 'boolean':
    coersedVal = toBool(val, opts);
    break;
  case 'date':
    coersedVal = toDate(val, opts);
    break;
  case 'integer':
    coersedVal = toInt(val, opts);
    break;
  case 'number':
    coersedVal = toNum(val, opts);
    break;
  case 'object':
    val = val || {};
    _coerseObj(val, valSchema);
    coersedVal = val;
    break;
  case 'string':
    coersedVal = toStr(val, opts);
    break;
  default:
    throw new TypeError(`Type of schema unrecognized: '${type}'.`);
  }
  return coersedVal;
}

function _coerseArr(arr, arrSchema) {
  arr.forEach(function (val, idx, arr) {
    if (val !== undefined) {
      arr[idx] = coerse(val, arrSchema.items);
    }
  });
}

function _coerseObj(obj, objSchema) {
  var key, keys, val, valSchema;

  keys = objSchema.keys;
  for (key in keys) {
    valSchema = keys[key];

    val = obj[key];

    if (val !== undefined) {
      obj[key] = coerse(val, valSchema);
    }
  }
}


// ==========================================================================
/*
 * NOTE: DIGIT_RE = /\d+/g does not work correctly with `'0'`.  The boolean it returns flops between `true` and
 * `false` on each successive call to `test.
 *
 * DIGIT_RE.test('0') => true
 * DIGIT_RE.test('0') => false
 * DIGIT_RE.test('0') => true
 */
const DIGIT_RE = /^\d+$/;

/**
 * Sets the value on an object at the specified path.
 *
 * This can be very helpful when incrementally building an object.
 *
 * ```js
 * var object = {};
 * put(object, 'name', 'foo');
 * // object now is: `{ name: 'foo' }`
 * put(object, 'iq', 100);
 * // object now is: `{ name: 'foo', iq: 100 }`
 *
 * var object = {};
 * put(object, 'name.first', 'foo');
 * // object now is: `{ name: { first: 'foo' } }`
 * put(object, 'name.last', 'bar');
 * // object now is: `{ name: { first: 'foo', last: 'bar' } }`
 *
 * var object = {};
 * put(object, 'employees.0.name.first', 'foo');
 * // object now is: `{ employees: [ { name: { first: 'foo' } } ] }`
 * put(object, 'employees.0name.last', 'bar');
 * // object now is: `{ employees: [ { name: { first: 'foo', last: 'bar' } } ] }`
 *
 * var object = { other: 'not affected' };
 * put(object, 'top', 'will be changed');
 * // object now is: `{ other: 'not affected', top: 'will be changed' }`
 * put(object, 'top', 'was changed');
 * // object now is: `{ other: 'not affected', top: 'was changed' }`
 * put(object, 'top.next', 'top changed from primative to object');
 * // object now is: `{ other: 'not affected', top: { next: 'top changed from primative to object' } }`
 *
 * var array = [];
 * put(object, 'top.next', 'was changed');
 * // object now is: `{ other: 'not affected', top: { next: 'was changed' } }`
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * NOTE: This function may be chained.  When called, it returns a reference to itself.  Also, this function has a
 * property named `put` which is also a reference to this function.
 *
 * ```js
 * var object = {};
 * // Immediately invoke the returned function:
 * put(object, 'name.first', 'foo')(object, 'name.last', 'foo')(object, 'age', 100);
 * // Immediately invoke the function through the `put` property:
 * put(object, 'name.first', 'foo').put(object, 'name.last', 'foo').put(object, 'age', 100);
 * // Or do a combination:
 * put(object, 'name.first', 'foo')(object, 'name.last', 'foo').put(object, 'age', 100);
 * ```
 *
 * @function module:Object.put
 *
 * @param {Object} object - The object to set the value on.  This includes arrays too.
 * @param {string} path - The path to the value.  A path is a special selector that should lead to a unique point in the
 *   object.  Currently, only dot notation is understood.  E.g., `'top.next.last'`.
 * @param {*} value - The value to set.
 * @param {Object} [options] - The options to use.
 * @param {boolean} [options.force=true] - Flag indicating whether to force the creation of missing contexts along the
 *   path.
 *
 * @returns {Function} A reference to this function to allow chaining.
 */
function put(object, path, value, options) {
  var context, keys;

  options = options || {};
  options.force = options.force === false ? false : true;

  keys = path.split('.');
  context = object;

  for (let i = 0, iLen = keys.length; i < iLen; ++i) {
    if (context === undefined || context === null) {
// @if DEBUG
      console.warn(`Current context was unexpectedly ${context}.`);
// @endif
      break;
    }

    let key = keys[i];

    if (i === 0) {
      if (DIGIT_RE.test(key)) {
        if (!(context instanceof Array)) {
// @if DEBUG
          console.warn(`Attempted to access '${key}' key of a non-array object.`);
// @endif
          break;
        }
      }
    }

    let nextI = i + 1;

    // If not at the end of the path, then ...
    if (nextI < iLen) {
      if (context.hasOwnProperty(key)) {
        let nextContext = context[key];
        // If next key is an array index, then make sure the next context is an array.
        if (DIGIT_RE.test(keys[nextI])) {
          if (!(nextContext instanceof Array)) {
            if (options.force === true) {
              context[key] = [];
            }
            else {
              break;
            }
          }
        }
        // else make sure the next context is an object.
        else {
          if (!(nextContext instanceof Object)) {
            if (options.force === true) {
              context[key] = {};
            }
            else {
              break;
            }
          }
        }
      }
      else {
        if (options.force === true) {
          if (DIGIT_RE.test(key)) {
            context[key] = [];
          }
          else {
            context[key] = {};
          }
        }
        else {
          break;
        }
      }
      context = context[key];
    }
    else {
      context[key] = value;
    }
  }
  // Return a reference to this function so it can immediately be called again when desired.
  // That is, allows put(...)(...)(...) and so forth.
  return put;
}


// ==========================================================================
/**
 * Allows put(...).put(...).put(...) and so forth.
 *
 * @function module:Object.put.put
 */
put.put = put;


// ==========================================================================
module.exports = {
  coerse,
  put,
};
