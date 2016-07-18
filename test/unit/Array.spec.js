
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
}
else {
  QC = global.QC;
}

var Arr = QC.Arr;

describe('QC.Arr', function () {

  describe('.wrap', function () {

    it('should return empty array if called with no arguments', function () {
      expect(Arr.wrap()).toEqual([]);
    });

    it('should return empty array if value is `undefined`', function () {
      expect(Arr.wrap(undefined)).toEqual([]);
    });

    it('should return the array if value is an array', function () {
      var arr;

      arr = [];
      expect(Arr.wrap(arr)).toBe(arr);

      arr = [null, 'some other values'];
      expect(Arr.wrap(arr)).toBe(arr);

      arr = [{}];
      expect(Arr.wrap(arr)).toBe(arr);

      arr = [undefined];
      expect(Arr.wrap(arr)).toBe(arr);
    });

    it('should return an array with single `null` item if value is `null`', function () {
      expect(Arr.wrap(null)).toEqual([null]);
    });

    it('should return the value wrapped in an array', function () {
      var value;

      expect(Arr.wrap(false)).toEqual([false]);
      expect(Arr.wrap(true)).toEqual([true]);

      value = new Date();
      expect(Arr.wrap(value)).toEqual([value]);

      value = new Error('Help!');
      expect(Arr.wrap(value)).toEqual([value]);

      value = function () {};
      expect(Arr.wrap(value)).toEqual([value]);

      value = {};
      expect(Arr.wrap(value)).toEqual([value]);

      value = { prop: 'not empty' };
      expect(Arr.wrap(value)).toEqual([value]);

      value = null;
      expect(Arr.wrap(value)).toEqual([value]);

      value = Infinity;
      expect(Arr.wrap(value)).toEqual([value]);

      value = Number.NEGATIVE_INFINITY;
      expect(Arr.wrap(value)).toEqual([value]);

      value = Number.POSITIVE_INFINITY;
      expect(Arr.wrap(value)).toEqual([value]);

      value = NaN;
      expect(Arr.wrap(value)).toEqual([value]);

      value = Number.NaN;
      expect(Arr.wrap(value)).toEqual([value]);

      value = Number.MIN_VALUE;
      expect(Arr.wrap(value)).toEqual([value]);

      expect(Arr.wrap(-1)).toEqual([-1]);
      expect(Arr.wrap(0)).toEqual([0]);
      expect(Arr.wrap(1)).toEqual([1]);

      value = Number.MAX_VALUE;
      expect(Arr.wrap(value)).toEqual([value]);

      value = /regexp/;
      expect(Arr.wrap(value)).toEqual([value]);

      value = '';
      expect(Arr.wrap(value)).toEqual([value]);

      value = 'not empty';
      expect(Arr.wrap(value)).toEqual([value]);
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
