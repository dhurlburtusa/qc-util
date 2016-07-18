
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
}
else {
  QC = global.QC;
}

var Num = QC.Num;

describe('QC.Num', function () {

  describe('.convert', function () {

    it('called with `arguments` should return default value', function () {
      expect(Num.convert(arguments)).toBeNull();
    });

    it('called with `undefined` should return default value', function () {
      expect(Num.convert(undefined)).toBeNull();
    });

    it('called with `undefined` and default value should return default value', function () {
      var toValue;

      toValue = Num.convert(undefined, { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.convert(undefined, { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.convert(undefined, { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.convert(undefined, { def: '' });
      expect(toValue).toBe('');

      toValue = Num.convert(undefined, { def: false });
      expect(toValue).toBe(false);

      toValue = Num.convert(undefined, { def: null });
      expect(toValue).toBeNull();

      toValue = Num.convert(undefined, { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `null` should return default value', function () {
      expect(Num.convert(null)).toBeNull();
    });

    it('called with `null` and default value should return default value', function () {
      var toValue;

      toValue = Num.convert(null, { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.convert(null, { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.convert(null, { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.convert(null, { def: '' });
      expect(toValue).toBe('');

      toValue = Num.convert(null, { def: false });
      expect(toValue).toBe(false);

      toValue = Num.convert(null, { def: null });
      expect(toValue).toBeNull();

      toValue = Num.convert(null, { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `NaN` should return default value', function () {
      expect(Num.convert(NaN)).toBeNull();
    });

    it('called with `NaN` and default value should return default value', function () {
      var toValue;

      toValue = Num.convert(NaN, { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.convert(NaN, { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.convert(NaN, { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.convert(NaN, { def: '' });
      expect(toValue).toBe('');

      toValue = Num.convert(NaN, { def: false });
      expect(toValue).toBe(false);

      toValue = Num.convert(NaN, { def: null });
      expect(toValue).toBeNull();

      toValue = Num.convert(NaN, { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `"NaN"` and default value should return default value', function () {
      var toValue;

      toValue = Num.convert('NaN', { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.convert('NaN', { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.convert('NaN', { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.convert('NaN', { def: '' });
      expect(toValue).toBe('');

      toValue = Num.convert('NaN', { def: false });
      expect(toValue).toBe(false);

      toValue = Num.convert('NaN', { def: null });
      expect(toValue).toBeNull();

      toValue = Num.convert('NaN', { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `false` should return default value', function () {
      expect(Num.convert(false)).toBeNull();
    });

    it('called with `true` should return default value', function () {
      expect(Num.convert(true)).toBeNull();
    });

    it('called with `-Infinity` should return `-Infinity`', function () {
      var toValue = Num.convert(-Infinity);

      expect(toValue).toBe(-Infinity);
    });

    it('called with `"-Infinity"` should return `-Infinity`', function () {
      var toValue = Num.convert('-Infinity');

      expect(toValue).toBe(-Infinity);
    });

    it('called with `-Number.POSITIVE_INFINITY` should return `-Number.POSITIVE_INFINITY`', function () {
      var toValue = Num.convert(-Number.POSITIVE_INFINITY);

      expect(toValue).toBe(-Number.POSITIVE_INFINITY);
    });

    it('called with `Number.NEGATIVE_INFINITY` should return `Number.NEGATIVE_INFINITY`', function () {
      var toValue = Num.convert(Number.NEGATIVE_INFINITY);

      expect(toValue).toBe(Number.NEGATIVE_INFINITY);
    });

    it('called with `-Number.MAX_VALUE` should return `-Number.MAX_VALUE`', function () {
      var toValue = Num.convert(-Number.MAX_VALUE);

      expect(toValue).toBe(-Number.MAX_VALUE);
    });

    it('called with `-Number.MIN_VALUE` should return `-Number.MIN_VALUE`', function () {
      var toValue = Num.convert(-Number.MIN_VALUE);

      expect(toValue).toBe(-Number.MIN_VALUE);
    });

    it('called with `-0` should return `0`', function () {
      var toValue = Num.convert(-0);

      expect(toValue).toBe(0);
    });

    it('called with `0` should return `0`', function () {
      var toValue = Num.convert(0);

      expect(toValue).toBe(0);
    });

    it('called with `Number.MIN_VALUE` should return `Number.MIN_VALUE`', function () {
      var toValue = Num.convert(Number.MIN_VALUE);

      expect(toValue).toBe(Number.MIN_VALUE);
    });

    it('called with `Number.MAX_VALUE` should return `Number.MAX_VALUE`', function () {
      var toValue = Num.convert(Number.MAX_VALUE);

      expect(toValue).toBe(Number.MAX_VALUE);
    });

    it('called with `Infinity` should return `Infinity`', function () {
      var toValue = Num.convert(Infinity);

      expect(toValue).toBe(Infinity);
    });

    it('called with `"Infinity"` should return `Infinity`', function () {
      var toValue = Num.convert("Infinity");

      expect(toValue).toBe(Infinity);
    });

    it('called with `Number.POSITIVE_INFINITY` should return `Number.POSITIVE_INFINITY`', function () {
      var toValue = Num.convert(Number.POSITIVE_INFINITY);

      expect(toValue).toBe(Number.POSITIVE_INFINITY);
    });

    it('called with a number value should return number', function () {
      var toValue;

      toValue = Num.convert(-6.022e23);
      expect(toValue).toBe(-6.022e23);
      expect(toValue).toBe(-602200000000000000000000);

      toValue = Num.convert(-1e4);
      expect(toValue).toBe(-1e4);
      expect(toValue).toBe(-10000);

      toValue = Num.convert(-2.6);
      expect(toValue).toBe(-2.6);

      toValue = Num.convert(-1);
      expect(toValue).toBe(-1);

      toValue = Num.convert(1);
      expect(toValue).toBe(1);
      expect(toValue).toBe(1.0);

      toValue = Num.convert(1.2);
      expect(toValue).toBe(1.2);

      toValue = Num.convert(2.6);
      expect(toValue).toBe(2.6);

      toValue = Num.convert(1e4);
      expect(toValue).toBe(1e4);
      expect(toValue).toBe(10000);

      toValue = Num.convert(6.022e23);
      expect(toValue).toBe(6.022e23);
      expect(toValue).toBe(602200000000000000000000);
    });

    it('called with a `Number` instance should return number primitive', function () {
      var toValue;

      toValue = Num.convert(new Number(-2.6));
      expect(toValue).toBe(-2.6);

      toValue = Num.convert(new Number(-1));
      expect(toValue).toBe(-1);

      toValue = Num.convert(new Number(1));
      expect(toValue).toBe(1);
      expect(toValue).toBe(1.0);

      toValue = Num.convert(new Number(1.2));
      expect(toValue).toBe(1.2);

      toValue = Num.convert(new Number(2.6));
      expect(toValue).toBe(2.6);
    });

    it('called with a parsible string value should return number', function () {
      var toValue;

      toValue = Num.convert('-6.022e23');
      expect(toValue).toBe(-6.022e23);
      expect(toValue).toBe(-602200000000000000000000);

      toValue = Num.convert('-1e4');
      expect(toValue).toBe(-1e4);
      expect(toValue).toBe(-10000);

      toValue = Num.convert('-2.6');
      expect(toValue).toBe(-2.6);

      toValue = Num.convert('-2');
      expect(toValue).toBe(-2);
      expect(toValue).toBe(-2.0);

      toValue = Num.convert('2');
      expect(toValue).toBe(2);
      expect(toValue).toBe(2.0);

      toValue = Num.convert('2.6');
      expect(toValue).toBe(2.6);

      toValue = Num.convert('1e4');
      expect(toValue).toBe(1e4);
      expect(toValue).toBe(10000);

      toValue = Num.convert('6.022e23');
      expect(toValue).toBe(6.022e23);
      expect(toValue).toBe(602200000000000000000000);
    });

    it('called with an unparsible string value should return default value', function () {
      expect(Num.convert('foo')).toBeNull();
    });

    it('called with an unparsible string value and default value should return default value', function () {
      var toValue;

      toValue = Num.convert('foo', { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.convert('foo', { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.convert('foo', { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.convert('foo', { def: '' });
      expect(toValue).toBe('');

      toValue = Num.convert('foo', { def: false });
      expect(toValue).toBe(false);

      toValue = Num.convert('foo', { def: null });
      expect(toValue).toBeNull();

      toValue = Num.convert('foo', { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with an object implementing the `valueOf` method that returns a number value should return the number', function () {
      var input, toValue;

      input = { valueOf: function () { return -2.6; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(-2.6);

      input = { valueOf: function () { return -1; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(-1);

      input = { valueOf: function () { return 1; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(1);
      expect(toValue).toBe(1.0);

      input = { valueOf: function () { return 1.2; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(1.2);

      input = { valueOf: function () { return 2.6; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(2.6);
    });

    it('called with an object implementing the `valueOf` method that returns a parsible value should return the number', function () {
      var input, toValue;

      input = { valueOf: function () { return '-2.6'; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(-2.6);

      input = { valueOf: function () { return '-1'; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(-1);

      input = { valueOf: function () { return '1'; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(1);
      expect(toValue).toBe(1.0);

      input = { valueOf: function () { return '1.2'; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(1.2);

      input = { valueOf: function () { return '2.6'; } };
      toValue = Num.convert(input);
      expect(toValue).toBe(2.6);
    });

    it('called with a number value and non-`null` exp option should return rounded number', function () {
      var toValue;

      toValue = Num.convert(-1234.5678, { exp: 2 });
      expect(toValue).toBe(-1200);

      toValue = Num.convert(-1234.5678, { exp: 1 });
      expect(toValue).toBe(-1230);

      toValue = Num.convert(-1234.5678, { exp: 0 });
      expect(toValue).toBe(-1235);

      toValue = Num.convert(-1234.5678, { exp: -1 });
      expect(toValue).toBe(-1234.6);

      toValue = Num.convert(-1234.5678, { exp: -2 });
      expect(toValue).toBe(-1234.57);

    });

  });

  describe('.toNum', function () {

    it('is an alias for .convert.', function () {
      expect(Num.convert === Num.toNum).toBe(true);
    });

  });

  describe('.toInt', function () {

    it('called with `undefined` should return default value', function () {
      expect(Num.toInt(undefined)).toBeNull();
    });

    it('called with `undefined` and default value should return default value', function () {
      var toValue;

      toValue = Num.toInt(undefined, { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.toInt(undefined, { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.toInt(undefined, { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.toInt(undefined, { def: '' });
      expect(toValue).toBe('');

      toValue = Num.toInt(undefined, { def: false });
      expect(toValue).toBe(false);

      toValue = Num.toInt(undefined, { def: null });
      expect(toValue).toBeNull();

      toValue = Num.toInt(undefined, { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `null` should return default value', function () {
      expect(Num.toInt(null)).toBeNull();
    });

    it('called with `null` and default value should return default value', function () {
      var toValue;

      toValue = Num.toInt(null, { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.toInt(null, { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.toInt(null, { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.toInt(null, { def: '' });
      expect(toValue).toBe('');

      toValue = Num.toInt(null, { def: false });
      expect(toValue).toBe(false);

      toValue = Num.toInt(null, { def: null });
      expect(toValue).toBeNull();

      toValue = Num.toInt(null, { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `Infinity` should return default value', function () {
      expect(Num.toInt(Infinity)).toBeNull();
    });

    it('called with `Infinity` and default value should return default value', function () {
      var toValue;

      toValue = Num.toInt(Infinity, { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.toInt(Infinity, { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.toInt(Infinity, { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.toInt(Infinity, { def: '' });
      expect(toValue).toBe('');

      toValue = Num.toInt(Infinity, { def: false });
      expect(toValue).toBe(false);

      toValue = Num.toInt(Infinity, { def: null });
      expect(toValue).toBeNull();

      toValue = Num.toInt(Infinity, { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `"Infinity"` should return default value', function () {
      expect(Num.toInt('Infinity')).toBeNull();
    });

    it('called with `"Infinity"` and default value should return default value', function () {
      var toValue;

      toValue = Num.toInt('Infinity', { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.toInt('Infinity', { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.toInt('Infinity', { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.toInt('Infinity', { def: '' });
      expect(toValue).toBe('');

      toValue = Num.toInt('Infinity', { def: false });
      expect(toValue).toBe(false);

      toValue = Num.toInt('Infinity', { def: null });
      expect(toValue).toBeNull();

      toValue = Num.toInt('Infinity', { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `Number.NEGATIVE_INFINITY` should return default value', function () {
      expect(Num.toInt(Number.NEGATIVE_INFINITY)).toBeNull();
    });

    it('called with `Number.NEGATIVE_INFINITY` and default value should return default value', function () {
      var toValue;

      toValue = Num.toInt(Number.NEGATIVE_INFINITY, { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.toInt(Number.NEGATIVE_INFINITY, { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.toInt(Number.NEGATIVE_INFINITY, { def: 123456.7 });
      expect(toValue).toBe(123456.7); // Ensures default is _not_ rounded to 0 decimal places or converted to an integer.

      toValue = Num.toInt(Number.NEGATIVE_INFINITY, { def: '' });
      expect(toValue).toBe('');

      toValue = Num.toInt(Number.NEGATIVE_INFINITY, { def: false });
      expect(toValue).toBe(false);

      toValue = Num.toInt(Number.NEGATIVE_INFINITY, { def: null });
      expect(toValue).toBeNull();

      toValue = Num.toInt(Number.NEGATIVE_INFINITY, { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `"-Infinity"` should return default value', function () {
      expect(Num.toInt('-Infinity')).toBeNull();
    });

    it('called with `"-Infinity"` and default value should return default value', function () {
      var toValue;

      toValue = Num.toInt('-Infinity', { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.toInt('-Infinity', { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.toInt('-Infinity', { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.toInt('-Infinity', { def: '' });
      expect(toValue).toBe('');

      toValue = Num.toInt('-Infinity', { def: false });
      expect(toValue).toBe(false);

      toValue = Num.toInt('-Infinity', { def: null });
      expect(toValue).toBeNull();

      toValue = Num.toInt('-Infinity', { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `Number.POSITIVE_INFINITY` should return default value', function () {
      expect(Num.toInt(Number.POSITIVE_INFINITY)).toBeNull();
    });

    it('called with `Number.POSITIVE_INFINITY` and default value should return default value', function () {
      var toValue;

      toValue = Num.toInt(Number.POSITIVE_INFINITY, { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.toInt(Number.POSITIVE_INFINITY, { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.toInt(Number.POSITIVE_INFINITY, { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.toInt(Number.POSITIVE_INFINITY, { def: '' });
      expect(toValue).toBe('');

      toValue = Num.toInt(Number.POSITIVE_INFINITY, { def: false });
      expect(toValue).toBe(false);
    });

    it('called with `NaN` should return default value', function () {
      expect(Num.toInt(NaN)).toBeNull();
    });

    it('called with `NaN` and default value should return default value', function () {
      var toValue;

      toValue = Num.toInt(NaN, { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.toInt(NaN, { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.toInt(NaN, { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.toInt(NaN, { def: '' });
      expect(toValue).toBe('');

      toValue = Num.toInt(NaN, { def: false });
      expect(toValue).toBe(false);

      toValue = Num.toInt(NaN, { def: null });
      expect(toValue).toBeNull();

      toValue = Num.toInt(NaN, { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with `false` should return default value', function () {
      expect(Num.toInt(false)).toBeNull();
    });

    it('called with `true` should return default value', function () {
      expect(Num.toInt(true)).toBeNull();
    });

    it('called with `Number.MAX_VALUE` should return `Number.MAX_VALUE`', function () {
      var toValue = Num.toInt(Number.MAX_VALUE);

      expect(toValue).toBe(Number.MAX_VALUE);
    });

    it('called with `Number.MIN_VALUE` should return `0`', function () {
      var toValue = Num.toInt(Number.MIN_VALUE);

      expect(toValue).toBe(0);
    });

    it('called with `-Number.MAX_VALUE` should return `-Number.MAX_VALUE`', function () {
      var toValue = Num.toInt(-Number.MAX_VALUE);

      expect(toValue).toBe(-Number.MAX_VALUE);
    });

    it('called with `-Number.MIN_VALUE` should return `0`', function () {
      var toValue = Num.toInt(-Number.MIN_VALUE);

      expect(toValue).toBe(0);
    });

    it('called with `0` should return `0`', function () {
      var toValue = Num.toInt(0);

      expect(toValue).toBe(0);
    });

    it('called with `-0` should return `0`', function () {
      var toValue = Num.toInt(-0);

      expect(toValue).toBe(0);
    });

    it('called with number value should return number', function () {
      var toValue;

      toValue = Num.toInt(-6.022e23);
      expect(toValue).toBe(-602200000000000000000000);

      toValue = Num.toInt(-1e4);
      expect(toValue).toBe(-10000);

      toValue = Num.toInt(-2.6);
      expect(toValue).toBe(-3);

      toValue = Num.toInt(-2.5);
      expect(toValue).toBe(-2);

      toValue = Num.toInt(-1.2);
      expect(toValue).toBe(-1);

      toValue = Num.toInt(-1);
      expect(toValue).toBe(-1);

      toValue = Num.toInt(-0);
      expect(toValue).toBe(0);

      toValue = Num.toInt(0);
      expect(toValue).toBe(0);

      toValue = Num.toInt(1);
      expect(toValue).toBe(1);

      toValue = Num.toInt(1.2);
      expect(toValue).toBe(1);

      toValue = Num.toInt(2.5);
      expect(toValue).toBe(3);

      toValue = Num.toInt(2.6);
      expect(toValue).toBe(3);

      toValue = Num.toInt(1e4);
      expect(toValue).toBe(10000);

      toValue = Num.toInt(6.022e23);
      expect(toValue).toBe(602200000000000000000000);
    });

    it('called with parsible string value should return number', function () {
      var toValue;

      toValue = Num.toInt('-6.022e23');
      expect(toValue).toBe(-602200000000000000000000);

      toValue = Num.toInt('-1e4');
      expect(toValue).toBe(-10000);

      toValue = Num.toInt('-2.6');
      expect(toValue).toBe(-3);

      toValue = Num.toInt('-2.5');
      expect(toValue).toBe(-2);

      toValue = Num.toInt('-1.2');
      expect(toValue).toBe(-1);

      toValue = Num.toInt('-1');
      expect(toValue).toBe(-1);

      toValue = Num.toInt('-1e-4');
      expect(toValue).toBe(0);

      toValue = Num.toInt('-0');
      expect(toValue).toBe(0);

      toValue = Num.toInt('0');
      expect(toValue).toBe(0);

      toValue = Num.toInt('1e-4');
      expect(toValue).toBe(0);

      toValue = Num.toInt('1');
      expect(toValue).toBe(1);

      toValue = Num.toInt('1.2');
      expect(toValue).toBe(1);

      toValue = Num.toInt('2.5');
      expect(toValue).toBe(3);

      toValue = Num.toInt('2.6');
      expect(toValue).toBe(3);

      toValue = Num.toInt('1e4');
      expect(toValue).toBe(10000);

      toValue = Num.toInt('6.022e23');
      expect(toValue).toBe(602200000000000000000000);
    });

    it('called with unparsible string value should return default value', function () {
      expect(Num.toInt('foo')).toBeNull();
    });

    it('called with unparsible string value and default value should return default value', function () {
      var toValue;

      toValue = Num.toInt('foo', { def: NaN });
      expect(toValue).toBeNaN();

      toValue = Num.toInt('foo', { def: 0 });
      expect(toValue).toBe(0);

      toValue = Num.toInt('foo', { def: 123456.7 });
      expect(toValue).toBe(123456.7);

      toValue = Num.toInt('foo', { def: '' });
      expect(toValue).toBe('');

      toValue = Num.toInt('foo', { def: false });
      expect(toValue).toBe(false);

      toValue = Num.toInt('foo', { def: null });
      expect(toValue).toBeNull();

      toValue = Num.toInt('foo', { def: undefined });
      expect(toValue).toBeUndefined();
    });

    it('called with an object implementing the `valueOf` method that returns a number value should return the number', function () {
      var input, toValue;

      input = { valueOf: function () { return -2.6; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(-3);

      input = { valueOf: function () { return -2.5; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(-2);

      input = { valueOf: function () { return -1.2; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(-1);

      input = { valueOf: function () { return -1; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(-1);

      input = { valueOf: function () { return -0; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(0);

      input = { valueOf: function () { return 0; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(0);

      input = { valueOf: function () { return 1; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(1);
      expect(toValue).toBe(1.0);

      input = { valueOf: function () { return 1.2; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(1);

      input = { valueOf: function () { return 2.5; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(3);

      input = { valueOf: function () { return 2.6; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(3);
    });

    it('called with an object implementing the `valueOf` method that returns a parsible value should return the number', function () {
      var input, toValue;

      input = { valueOf: function () { return '-2.6'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(-3);

      input = { valueOf: function () { return '-2.5'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(-2);

      input = { valueOf: function () { return '-1.2'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(-1);

      input = { valueOf: function () { return '-1'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(-1);

      input = { valueOf: function () { return '-0'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(0);

      input = { valueOf: function () { return '0'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(0);

      input = { valueOf: function () { return '1'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(1);

      input = { valueOf: function () { return '1.2'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(1);

      input = { valueOf: function () { return '2.5'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(3);

      input = { valueOf: function () { return '2.6'; } };
      toValue = Num.toInt(input);
      expect(toValue).toBe(3);
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
