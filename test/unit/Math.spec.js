
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
}
else {
  QC = global.QC;
}

var Mth = QC.Mth;

describe('QC.Mth', function () {

  describe('.round', function () {

    it('called with various values should return expected value', function () {
      expect(Mth.round(-2.6)).toBe(-2.6);
      expect(Mth.round(-2.5)).toBe(-2.5);
      expect(Mth.round(-1.2)).toBe(-1.2);
      expect(Mth.round(1.2)).toBe(1.2);
      expect(Mth.round(2.5)).toBe(2.5);
      expect(Mth.round(2.6)).toBe(2.6);

      expect(Mth.round(0, 1)).toBe(0);
      expect(Mth.round(0, 0)).toBe(0);
      expect(Mth.round(0, -1)).toBe(0);

      // 1.005 is known to be a problematic number when it comes to rounding.
      expect(Mth.round(1.005, 2)).toBe(0);
      expect(Mth.round(1.005, 1)).toBe(0);
      expect(Mth.round(1.005, 0)).toBe(1);
      expect(Mth.round(1.005, -1)).toBe(1);
      expect(Mth.round(1.005, -2)).toBe(1.01);
      expect(Mth.round(1.005, -3)).toBe(1.005);
      expect(Mth.round(1.005)).toBe(1.005);

      expect(Mth.round(1234.5678, 5)).toBe(0);
      expect(Mth.round(1234.5678, 4)).toBe(0);
      expect(Mth.round(1234.5678, 3)).toBe(1000);
      expect(Mth.round(1234.5678, 2)).toBe(1200);
      expect(Mth.round(1234.5678, 1)).toBe(1230);
      expect(Mth.round(1234.5678, 0)).toBe(1235);
      expect(Mth.round(1234.5678, -1)).toBe(1234.6);
      expect(Mth.round(1234.5678, -2)).toBe(1234.57);
      expect(Mth.round(1234.5678, -3)).toBe(1234.568);
      expect(Mth.round(1234.5678, -4)).toBe(1234.5678);
      expect(Mth.round(1234.5678, -5)).toBe(1234.5678);
      expect(Mth.round(1234.5678)).toBe(1234.5678);
    });

    it('called with no arguments should return `undefined`', function () {
      expect(Mth.round()).toBeUndefined();
    });

    it('called with `undefined` should return `undefined`', function () {
      expect(Mth.round(undefined)).toBeUndefined();
    });

    it('called with a single number argument should return the first argument', function () {
      expect(Mth.round(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
      expect(Mth.round(-Number.MAX_VALUE)).toBe(-Number.MAX_VALUE);
      expect(Mth.round(-Number.MIN_VALUE)).toBe(-Number.MIN_VALUE);
      expect(Mth.round(0)).toBe(0);
      expect(Mth.round(0.0)).toBe(0);
      expect(Mth.round(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
      expect(Mth.round(1234.5678)).toBe(1234.5678);
      expect(Mth.round(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
      expect(Mth.round(Infinity)).toBe(Infinity);
      expect(Mth.round(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
    });

    it('called with an `undefined` second argument should return the first argument', function () {
      expect(Mth.round(Number.NEGATIVE_INFINITY, undefined)).toBe(Number.NEGATIVE_INFINITY);
      expect(Mth.round(-Number.MAX_VALUE, undefined)).toBe(-Number.MAX_VALUE);
      expect(Mth.round(-Number.MIN_VALUE, undefined)).toBe(-Number.MIN_VALUE);
      expect(Mth.round(0, undefined)).toBe(0);
      expect(Mth.round(0.0, undefined)).toBe(0);
      expect(Mth.round(Number.MIN_VALUE, undefined)).toBe(Number.MIN_VALUE);
      expect(Mth.round(1234.5678, undefined)).toBe(1234.5678);
      expect(Mth.round(Number.MAX_VALUE, undefined)).toBe(Number.MAX_VALUE);
      expect(Mth.round(Infinity, undefined)).toBe(Infinity);
      expect(Mth.round(Number.POSITIVE_INFINITY, undefined)).toBe(Number.POSITIVE_INFINITY);
    });

    it('called with a `null` second argument should return the first argument', function () {
      expect(Mth.round(Number.NEGATIVE_INFINITY, null)).toBe(Number.NEGATIVE_INFINITY);
      expect(Mth.round(-Number.MAX_VALUE, null)).toBe(-Number.MAX_VALUE);
      expect(Mth.round(-Number.MIN_VALUE, null)).toBe(-Number.MIN_VALUE);
      expect(Mth.round(0, null)).toBe(0);
      expect(Mth.round(0.0, null)).toBe(0);
      expect(Mth.round(Number.MIN_VALUE, null)).toBe(Number.MIN_VALUE);
      expect(Mth.round(1234.5678, null)).toBe(1234.5678);
      expect(Mth.round(Number.MAX_VALUE, null)).toBe(Number.MAX_VALUE);
      expect(Mth.round(Infinity, null)).toBe(Infinity);
      expect(Mth.round(Number.POSITIVE_INFINITY, null)).toBe(Number.POSITIVE_INFINITY);
    });

    it('called with `Number.NEGATIVE_INFINITY` and `-Infinity` should return `Number.NEGATIVE_INFINITY`', function () {
      expect(Mth.round(Number.NEGATIVE_INFINITY, -Infinity)).toBe(Number.NEGATIVE_INFINITY);
    });

    it('called with `Infinity` and `-Infinity` should return `Infinity`', function () {
      expect(Mth.round(Infinity, -Infinity)).toBe(Infinity);
    });

    it('called with `Number.POSITIVE_INFINITY` and `-Infinity` should return `Number.POSITIVE_INFINITY`', function () {
      expect(Mth.round(Number.POSITIVE_INFINITY, -Infinity)).toBe(Number.POSITIVE_INFINITY);
    });

    it('called with `Number.NEGATIVE_INFINITY` and `0` should return `Number.NEGATIVE_INFINITY`', function () {
      expect(Mth.round(Number.NEGATIVE_INFINITY, 0)).toBe(Number.NEGATIVE_INFINITY);
    });

    it('called with `Infinity` and `0` should return `Infinity`', function () {
      expect(Mth.round(Infinity, 0)).toBe(Infinity);
    });

    it('called with `Number.POSITIVE_INFINITY` and `0` should return `Number.POSITIVE_INFINITY`', function () {
      expect(Mth.round(Number.POSITIVE_INFINITY, 0)).toBe(Number.POSITIVE_INFINITY);
    });

    it('called with `Number.NEGATIVE_INFINITY` and `Infinity` should return `NaN`', function () {
      expect(Mth.round(Number.NEGATIVE_INFINITY, Infinity)).toBe(Number.NEGATIVE_INFINITY);
    });

    it('called with `Infinity` and `Infinity` should return `NaN`', function () {
      expect(Mth.round(Infinity, Infinity)).toBe(Infinity);
    });

    it('called with `Number.POSITIVE_INFINITY` and `Infinity` should return `NaN`', function () {
      expect(Mth.round(Number.POSITIVE_INFINITY, Infinity)).toBe(Number.POSITIVE_INFINITY);
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
