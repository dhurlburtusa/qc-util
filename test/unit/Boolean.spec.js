
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
}
else {
  QC = global.QC;
}

var Bool = QC.Bool;

describe('QC.Bool', function () {

  describe('.convert', function () {

    it('called with `arguments` should return default value', function () {
      expect(Bool.convert(arguments)).toBeNull();
      expect(Bool.convert(arguments, { def: false })).toBe(false);
      expect(Bool.convert(arguments, { def: undefined })).toBeUndefined();
    });

    it('called with an empty array should return default value', function () {
      expect(Bool.convert([])).toBeNull();
      expect(Bool.convert([], { def: false })).toBe(false);
      expect(Bool.convert([], { def: undefined })).toBeUndefined();
    });

    it('called with an array should return default value', function () {
      expect(Bool.convert(['not empty'])).toBeNull();
      expect(Bool.convert(['not empty'], { def: false })).toBe(false);
      expect(Bool.convert(['not empty'], { def: undefined })).toBeUndefined();
    });

    it('called with `false` should return `false`', function () {
      expect(Bool.convert(false)).toBe(false);
    });

    it('called with `true` should return `true`', function () {
      expect(Bool.convert(true)).toBe(true);
    });

    it('called with a `Date` object should return default value', function () {
      expect(Bool.convert(new Date())).toBeNull();
      expect(Bool.convert(new Date(), { def: false })).toBe(false);
      expect(Bool.convert(new Date(), { def: undefined })).toBeUndefined();
    });

    it('called with an `Error` object should return default value', function () {
      expect(Bool.convert(new Error('Help!'))).toBeNull();
      expect(Bool.convert(new Error('Help!'), { def: false })).toBe(false);
      expect(Bool.convert(new Error('Help!'), { def: undefined })).toBeUndefined();
    });

    it('called with a function should return default value', function () {
      expect(Bool.convert(function () {})).toBeNull();
      expect(Bool.convert(function () {}, { def: false })).toBe(false);
      expect(Bool.convert(function () {}, { def: undefined })).toBeUndefined();
    });

    it('called with an empty object should return default value', function () {
      expect(Bool.convert({})).toBeNull();
      expect(Bool.convert({}, { def: false })).toBe(false);
      expect(Bool.convert({}, { def: undefined })).toBeUndefined();
    });

    it('called with an object should return default value', function () {
      expect(Bool.convert({ prop: 'not empty' })).toBeNull();
      expect(Bool.convert({ prop: 'not empty' }, { def: false })).toBe(false);
      expect(Bool.convert({ prop: 'not empty' }, { def: undefined })).toBeUndefined();
    });

    it('called with `null` should return default value', function () {
      expect(Bool.convert(null)).toBeNull();
      expect(Bool.convert(null, { def: false })).toBe(false);
      expect(Bool.convert(null, { def: undefined })).toBeUndefined();
    });

    it('called with `Infinity` should return default value', function () {
      expect(Bool.convert(Infinity)).toBeNull();
      expect(Bool.convert(Infinity, { def: false })).toBe(false);
      expect(Bool.convert(Infinity, { def: undefined })).toBeUndefined();
    });

    it('called with `Number.NEGATIVE_INFINITY` should return default value', function () {
      expect(Bool.convert(Number.NEGATIVE_INFINITY)).toBeNull();
      expect(Bool.convert(Number.NEGATIVE_INFINITY, { def: false })).toBe(false);
      expect(Bool.convert(Number.NEGATIVE_INFINITY, { def: undefined })).toBeUndefined();
    });

    it('called with `Number.POSITIVE_INFINITY` should return default value', function () {
      expect(Bool.convert(Number.POSITIVE_INFINITY)).toBeNull();
      expect(Bool.convert(Number.POSITIVE_INFINITY, { def: false })).toBe(false);
      expect(Bool.convert(Number.POSITIVE_INFINITY, { def: undefined })).toBeUndefined();
    });

    it('called with `NaN` should return default value', function () {
      expect(Bool.convert(NaN)).toBeNull();
      expect(Bool.convert(NaN, { def: false })).toBe(false);
      expect(Bool.convert(NaN, { def: undefined })).toBeUndefined();
    });

    it('called with `Number.NaN` should return default value', function () {
      expect(Bool.convert(Number.NaN)).toBeNull();
      expect(Bool.convert(Number.NaN, { def: false })).toBe(false);
      expect(Bool.convert(Number.NaN, { def: undefined })).toBeUndefined();
    });

    it('called with `Number.MIN_VALUE` should return default value', function () {
      expect(Bool.convert(Number.MIN_VALUE)).toBeNull();
      expect(Bool.convert(Number.MIN_VALUE, { def: false })).toBe(false);
      expect(Bool.convert(Number.MIN_VALUE, { def: undefined })).toBeUndefined();
    });

    it('called with `-1` should return default value', function () {
      expect(Bool.convert(-1)).toBeNull();
      expect(Bool.convert(-1, { def: false })).toBe(false);
      expect(Bool.convert(-1, { def: undefined })).toBeUndefined();
    });

    it('called with `-0` should return `false`', function () {
      expect(Bool.convert(-0)).toBe(false);
    });

    it('called with `0` should return `false`', function () {
      expect(Bool.convert(0)).toBe(false);
    });

    it('called with `1` should return `true`', function () {
      expect(Bool.convert(1)).toBe(true);
    });

    it('called with `2` should return default value', function () {
      expect(Bool.convert(2)).toBeNull();
      expect(Bool.convert(2, { def: false })).toBe(false);
      expect(Bool.convert(2, { def: undefined })).toBeUndefined();
    });

    it('called with `Number.MAX_VALUE` should return default value', function () {
      expect(Bool.convert(Number.MAX_VALUE)).toBeNull();
      expect(Bool.convert(Number.MAX_VALUE, { def: false })).toBe(false);
      expect(Bool.convert(Number.MAX_VALUE, { def: undefined })).toBeUndefined();
    });

    it('called with a regexp should return default value', function () {
      expect(Bool.convert(/regexp/)).toBeNull();
      expect(Bool.convert(/regexp/, { def: false })).toBe(false);
      expect(Bool.convert(/regexp/, { def: undefined })).toBeUndefined();
    });

    it('called with an empty string should return default value', function () {
      expect(Bool.convert('')).toBeNull();
      expect(Bool.convert('', { def: false })).toBe(false);
      expect(Bool.convert('', { def: undefined })).toBeUndefined();
    });

    it('called with `"0"` should return `false`', function () {
      expect(Bool.convert('0')).toBe(false);
    });

    it('called with `"1"` should return `true`', function () {
      expect(Bool.convert('1')).toBe(true);
    });

    it('called with `"f"` should return `false`', function () {
      expect(Bool.convert('f')).toBe(false);
      expect(Bool.convert('F')).toBe(false);
    });

    it('called with `"false"` should return `false`', function () {
      expect(Bool.convert('false')).toBe(false);
      expect(Bool.convert('falsE')).toBe(false);
      expect(Bool.convert('falSe')).toBe(false);
      expect(Bool.convert('falSE')).toBe(false);
      expect(Bool.convert('faLse')).toBe(false);
      expect(Bool.convert('faLsE')).toBe(false);
      expect(Bool.convert('faLSe')).toBe(false);
      expect(Bool.convert('faLSE')).toBe(false);
      expect(Bool.convert('fAlse')).toBe(false);
      expect(Bool.convert('fAlsE')).toBe(false);
      expect(Bool.convert('fAlSe')).toBe(false);
      expect(Bool.convert('fAlSE')).toBe(false);
      expect(Bool.convert('fALse')).toBe(false);
      expect(Bool.convert('fALsE')).toBe(false);
      expect(Bool.convert('fALSe')).toBe(false);
      expect(Bool.convert('fALSE')).toBe(false);
      expect(Bool.convert('False')).toBe(false);
      expect(Bool.convert('FalsE')).toBe(false);
      expect(Bool.convert('FalSe')).toBe(false);
      expect(Bool.convert('FalSE')).toBe(false);
      expect(Bool.convert('FaLse')).toBe(false);
      expect(Bool.convert('FaLsE')).toBe(false);
      expect(Bool.convert('FaLSe')).toBe(false);
      expect(Bool.convert('FaLSE')).toBe(false);
      expect(Bool.convert('FAlse')).toBe(false);
      expect(Bool.convert('FAlsE')).toBe(false);
      expect(Bool.convert('FAlSe')).toBe(false);
      expect(Bool.convert('FAlSE')).toBe(false);
      expect(Bool.convert('FALse')).toBe(false);
      expect(Bool.convert('FALsE')).toBe(false);
      expect(Bool.convert('FALSe')).toBe(false);
      expect(Bool.convert('FALSE')).toBe(false);
    });

    it('called with `"no"` should return `false`', function () {
      expect(Bool.convert('no')).toBe(false);
      expect(Bool.convert('nO')).toBe(false);
      expect(Bool.convert('No')).toBe(false);
      expect(Bool.convert('NO')).toBe(false);
    });

    it('called with `"nope"` should return default value', function () {
      expect(Bool.convert('nope')).toBeNull();
      expect(Bool.convert('nope', { def: false })).toBe(false);
      expect(Bool.convert('nope', { def: undefined })).toBeUndefined();
    });

    it('called with `"null"` should return default value', function () {
      expect(Bool.convert('null')).toBeNull();
      expect(Bool.convert('null', { def: false })).toBe(false);
      expect(Bool.convert('null', { def: undefined })).toBeUndefined();
    });

    it('called with `"off"` should return `false`', function () {
      expect(Bool.convert('off')).toBe(false);
      expect(Bool.convert('ofF')).toBe(false);
      expect(Bool.convert('oFf')).toBe(false);
      expect(Bool.convert('oFF')).toBe(false);
      expect(Bool.convert('Off')).toBe(false);
      expect(Bool.convert('OfF')).toBe(false);
      expect(Bool.convert('OFf')).toBe(false);
      expect(Bool.convert('OFF')).toBe(false);
    });

    it('called with `"on"` should return `true`', function () {
      expect(Bool.convert('on')).toBe(true);
      expect(Bool.convert('oN')).toBe(true);
      expect(Bool.convert('On')).toBe(true);
      expect(Bool.convert('ON')).toBe(true);
    });

    it('called with `"t"` should return `true`', function () {
      expect(Bool.convert('t')).toBe(true);
      expect(Bool.convert('T')).toBe(true);
    });

    it('called with `"true"` should return `true`', function () {
      expect(Bool.convert('true')).toBe(true);
      expect(Bool.convert('truE')).toBe(true);
      expect(Bool.convert('trUe')).toBe(true);
      expect(Bool.convert('trUE')).toBe(true);
      expect(Bool.convert('tRue')).toBe(true);
      expect(Bool.convert('tRuE')).toBe(true);
      expect(Bool.convert('tRUe')).toBe(true);
      expect(Bool.convert('tRUE')).toBe(true);
      expect(Bool.convert('True')).toBe(true);
      expect(Bool.convert('TruE')).toBe(true);
      expect(Bool.convert('TrUe')).toBe(true);
      expect(Bool.convert('TrUE')).toBe(true);
      expect(Bool.convert('TRue')).toBe(true);
      expect(Bool.convert('TRuE')).toBe(true);
      expect(Bool.convert('TRUe')).toBe(true);
      expect(Bool.convert('TRUE')).toBe(true);
    });

    it('called with `"y"` should return `true`', function () {
      expect(Bool.convert('y')).toBe(true);
      expect(Bool.convert('Y')).toBe(true);
    });

    it('called with `"yes"` should return `true`', function () {
      expect(Bool.convert('yes')).toBe(true);
      expect(Bool.convert('yeS')).toBe(true);
      expect(Bool.convert('yEs')).toBe(true);
      expect(Bool.convert('yES')).toBe(true);
      expect(Bool.convert('Yes')).toBe(true);
      expect(Bool.convert('YeS')).toBe(true);
      expect(Bool.convert('YEs')).toBe(true);
      expect(Bool.convert('YES')).toBe(true);
    });

    it('called with `"undefined"` should return default value', function () {
      expect(Bool.convert('undefined')).toBeNull();
      expect(Bool.convert('undefined', { def: false })).toBe(false);
      expect(Bool.convert('undefined', { def: undefined })).toBeUndefined();
    });

    it('called with an input that has a `toString` method that returns a falsey value should return `false`', function () {
      var input;

      input = { toString: function () { return '0'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { toString: function () { return 'f'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { toString: function () { return 'false'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { toString: function () { return 'n'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { toString: function () { return 'no'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { toString: function () { return 'off'; } };
      expect(Bool.convert(input)).toBe(false);
    });

    it('called with an input that has a `toString` method that returns a truthy value should return `true`', function () {
      var input;

      input = { toString: function () { return '1'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { toString: function () { return 'on'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { toString: function () { return 't'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { toString: function () { return 'true'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { toString: function () { return 'y'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { toString: function () { return 'yes'; } };
      expect(Bool.convert(input)).toBe(true);
    });

    it('called with an input that has a `toString` method that returns neither a falsey value or a truthy value should return default value', function () {
      var input;

      input = { toString: function () { return ''; } };
      expect(Bool.convert(input)).toBeNull();

      input = { toString: function () { return 'asdf'; } };
      expect(Bool.convert(input)).toBeNull();
    });

    it('called with an input that has a `valueOf` method that returns a falsey value should return `false`', function () {
      var input;

      input = { valueOf: function () { return 0; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return false; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return '0'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return 'f'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return 'false'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return 'n'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return 'no'; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return 'off'; } };
      expect(Bool.convert(input)).toBe(false);

      // The following all pass -- well, at least with the current implementation.  If they ever start failing, then that is
      // okay.  The fact that they return a value that when converted to a string matches a truthy value is a happy
      // coincidence.
      input = { valueOf: function () { return [0]; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return [false]; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return ['0']; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return ['f']; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return ['false']; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return ['n']; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return ['no']; } };
      expect(Bool.convert(input)).toBe(false);

      input = { valueOf: function () { return ['off']; } };
      expect(Bool.convert(input)).toBe(false);
    });

    it('called with an input that has a `valueOf` method that returns a truthy value should return `true`', function () {
      var input;

      input = { valueOf: function () { return 1; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return true; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return '1'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return 'on'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return 't'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return 'true'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return 'y'; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return 'yes'; } };
      expect(Bool.convert(input)).toBe(true);

      // The following all pass -- well, at least with the current implementation.  If they ever start failing, then that is
      // okay.  The fact that they return a value that when converted to a string matches a truthy value is a happy
      // coincidence.
      input = { valueOf: function () { return [1]; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return [true]; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return ['1']; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return ['on']; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return ['t']; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return ['true']; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return ['y']; } };
      expect(Bool.convert(input)).toBe(true);

      input = { valueOf: function () { return ['yes']; } };
      expect(Bool.convert(input)).toBe(true);
    });

    it('called with an input that has a `valueOf` method that returns neither a falsey value or a truthy value should return default value', function () {
      var input;

      input = { valueOf: function () { return arguments; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return []; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return ['not empty']; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return new Date(); } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return new Error('Error'); } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return new Error('true'); } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return function () { return true; }; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return {}; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return{ prop: 'not empty', }; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return null; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return Infinity; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return Number.NEGATIVE_INFINITY; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return Number.POSITIVE_INFINITY; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return NaN; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return Number.NaN; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return Number.MIN_VALUE; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return Number.MAX_VALUE; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return /regexp/; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return ''; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return 'not empty'; } };
      expect(Bool.convert(input)).toBeNull();

      input = { valueOf: function () { return; } };
      expect(Bool.convert(input)).toBeNull();
    });

    it('called with `undefined` should return default value', function () {
      expect(Bool.convert(undefined)).toBeNull();
      expect(Bool.convert(undefined, { def: false })).toBe(false);
      expect(Bool.convert(undefined, { def: undefined })).toBeUndefined();
    });

  });

  describe('.not', function () {

    it('called with a falsey value and a falsey condition should return `false`', function () {
      var value;

      value = false;
      expect(Bool.not(value, false)).toBe(false);
      expect(Bool.not(value, '')).toBe(false);
      expect(Bool.not(value, 0)).toBe(false);
      expect(Bool.not(value, null)).toBe(false);
      expect(Bool.not(value, undefined)).toBe(false);

      value = '';
      expect(Bool.not(value, false)).toBe(false);
      expect(Bool.not(value, '')).toBe(false);
      expect(Bool.not(value, 0)).toBe(false);
      expect(Bool.not(value, null)).toBe(false);
      expect(Bool.not(value, undefined)).toBe(false);

      value = 0;
      expect(Bool.not(value, false)).toBe(false);
      expect(Bool.not(value, '')).toBe(false);
      expect(Bool.not(value, 0)).toBe(false);
      expect(Bool.not(value, null)).toBe(false);
      expect(Bool.not(value, undefined)).toBe(false);

      value = null;
      expect(Bool.not(value, false)).toBe(false);
      expect(Bool.not(value, '')).toBe(false);
      expect(Bool.not(value, 0)).toBe(false);
      expect(Bool.not(value, null)).toBe(false);
      expect(Bool.not(value, undefined)).toBe(false);

      value = undefined;
      expect(Bool.not(value, false)).toBe(false);
      expect(Bool.not(value, '')).toBe(false);
      expect(Bool.not(value, 0)).toBe(false);
      expect(Bool.not(value, null)).toBe(false);
      expect(Bool.not(value, undefined)).toBe(false);
    });

    it('called with a truthy value and a falsey condition should return `true`', function () {
      var value;

      value = [];
      expect(Bool.not(value, false)).toBe(true);
      expect(Bool.not(value, '')).toBe(true);
      expect(Bool.not(value, 0)).toBe(true);
      expect(Bool.not(value, null)).toBe(true);
      expect(Bool.not(value, undefined)).toBe(true);

      value = true;
      expect(Bool.not(value, false)).toBe(true);
      expect(Bool.not(value, '')).toBe(true);
      expect(Bool.not(value, 0)).toBe(true);
      expect(Bool.not(value, null)).toBe(true);
      expect(Bool.not(value, undefined)).toBe(true);

      value = new Date();
      expect(Bool.not(value, false)).toBe(true);
      expect(Bool.not(value, '')).toBe(true);
      expect(Bool.not(value, 0)).toBe(true);
      expect(Bool.not(value, null)).toBe(true);
      expect(Bool.not(value, undefined)).toBe(true);

      value = 1;
      expect(Bool.not(value, false)).toBe(true);
      expect(Bool.not(value, '')).toBe(true);
      expect(Bool.not(value, 0)).toBe(true);
      expect(Bool.not(value, null)).toBe(true);
      expect(Bool.not(value, undefined)).toBe(true);

      value = {};
      expect(Bool.not(value, false)).toBe(true);
      expect(Bool.not(value, '')).toBe(true);
      expect(Bool.not(value, 0)).toBe(true);
      expect(Bool.not(value, null)).toBe(true);
      expect(Bool.not(value, undefined)).toBe(true);

      value = /foo/;
      expect(Bool.not(value, false)).toBe(true);
      expect(Bool.not(value, '')).toBe(true);
      expect(Bool.not(value, 0)).toBe(true);
      expect(Bool.not(value, null)).toBe(true);
      expect(Bool.not(value, undefined)).toBe(true);

      value = 'foo';
      expect(Bool.not(value, false)).toBe(true);
      expect(Bool.not(value, '')).toBe(true);
      expect(Bool.not(value, 0)).toBe(true);
      expect(Bool.not(value, null)).toBe(true);
      expect(Bool.not(value, undefined)).toBe(true);
    });

    it('called with a falsey value and a truthy condition should return `true`', function () {
      var value;

      expect(Bool.not()).toBe(true);

      value = false;
      expect(Bool.not(value)).toBe(true);
      expect(Bool.not(value, [])).toBe(true);
      expect(Bool.not(value, new Date())).toBe(true);
      expect(Bool.not(value, 1)).toBe(true);
      expect(Bool.not(value, {})).toBe(true);
      expect(Bool.not(value, /foo/)).toBe(true);
      expect(Bool.not(value, 'foo')).toBe(true);

      value = '';
      expect(Bool.not(value)).toBe(true);
      expect(Bool.not(value, [])).toBe(true);
      expect(Bool.not(value, new Date())).toBe(true);
      expect(Bool.not(value, 1)).toBe(true);
      expect(Bool.not(value, {})).toBe(true);
      expect(Bool.not(value, /foo/)).toBe(true);
      expect(Bool.not(value, 'foo')).toBe(true);

      value = 0;
      expect(Bool.not(value)).toBe(true);
      expect(Bool.not(value, [])).toBe(true);
      expect(Bool.not(value, new Date())).toBe(true);
      expect(Bool.not(value, 1)).toBe(true);
      expect(Bool.not(value, {})).toBe(true);
      expect(Bool.not(value, /foo/)).toBe(true);
      expect(Bool.not(value, 'foo')).toBe(true);

      value = null;
      expect(Bool.not(value)).toBe(true);
      expect(Bool.not(value, [])).toBe(true);
      expect(Bool.not(value, new Date())).toBe(true);
      expect(Bool.not(value, 1)).toBe(true);
      expect(Bool.not(value, {})).toBe(true);
      expect(Bool.not(value, /foo/)).toBe(true);
      expect(Bool.not(value, 'foo')).toBe(true);

      value = undefined;
      expect(Bool.not(value)).toBe(true);
      expect(Bool.not(value, [])).toBe(true);
      expect(Bool.not(value, new Date())).toBe(true);
      expect(Bool.not(value, 1)).toBe(true);
      expect(Bool.not(value, {})).toBe(true);
      expect(Bool.not(value, /foo/)).toBe(true);
      expect(Bool.not(value, 'foo')).toBe(true);
    });

    it('called with a truthy value and a truthy condition should return `false`', function () {
      var value;

      value = [];
      expect(Bool.not(value)).toBe(false);
      expect(Bool.not(value, [])).toBe(false);
      expect(Bool.not(value, new Date())).toBe(false);
      expect(Bool.not(value, 1)).toBe(false);
      expect(Bool.not(value, {})).toBe(false);
      expect(Bool.not(value, /foo/)).toBe(false);
      expect(Bool.not(value, 'foo')).toBe(false);

      value = true;
      expect(Bool.not(value)).toBe(false);
      expect(Bool.not(value, [])).toBe(false);
      expect(Bool.not(value, new Date())).toBe(false);
      expect(Bool.not(value, 1)).toBe(false);
      expect(Bool.not(value, {})).toBe(false);
      expect(Bool.not(value, /foo/)).toBe(false);
      expect(Bool.not(value, 'foo')).toBe(false);

      value = new Date();
      expect(Bool.not(value)).toBe(false);
      expect(Bool.not(value, [])).toBe(false);
      expect(Bool.not(value, new Date())).toBe(false);
      expect(Bool.not(value, 1)).toBe(false);
      expect(Bool.not(value, {})).toBe(false);
      expect(Bool.not(value, /foo/)).toBe(false);
      expect(Bool.not(value, 'foo')).toBe(false);

      value = 1;
      expect(Bool.not(value)).toBe(false);
      expect(Bool.not(value, [])).toBe(false);
      expect(Bool.not(value, new Date())).toBe(false);
      expect(Bool.not(value, 1)).toBe(false);
      expect(Bool.not(value, {})).toBe(false);
      expect(Bool.not(value, /foo/)).toBe(false);
      expect(Bool.not(value, 'foo')).toBe(false);

      value = {};
      expect(Bool.not(value)).toBe(false);
      expect(Bool.not(value, [])).toBe(false);
      expect(Bool.not(value, new Date())).toBe(false);
      expect(Bool.not(value, 1)).toBe(false);
      expect(Bool.not(value, {})).toBe(false);
      expect(Bool.not(value, /foo/)).toBe(false);
      expect(Bool.not(value, 'foo')).toBe(false);

      value = /foo/;
      expect(Bool.not(value)).toBe(false);
      expect(Bool.not(value, [])).toBe(false);
      expect(Bool.not(value, new Date())).toBe(false);
      expect(Bool.not(value, 1)).toBe(false);
      expect(Bool.not(value, {})).toBe(false);
      expect(Bool.not(value, /foo/)).toBe(false);
      expect(Bool.not(value, 'foo')).toBe(false);

      value = 'foo';
      expect(Bool.not(value)).toBe(false);
      expect(Bool.not(value, [])).toBe(false);
      expect(Bool.not(value, new Date())).toBe(false);
      expect(Bool.not(value, 1)).toBe(false);
      expect(Bool.not(value, {})).toBe(false);
      expect(Bool.not(value, /foo/)).toBe(false);
      expect(Bool.not(value, 'foo')).toBe(false);
    });

  });

  describe('.toBool', function () {

    it('is an alias for .convert.', function () {
      expect(Bool.convert === Bool.toBool).toBe(true);
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
