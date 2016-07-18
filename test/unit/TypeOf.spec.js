
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
}
else {
  QC = global.QC;
}

var typeOf = QC.typeOf;

describe('QC', function () {

  describe('.typeOf', function () {

    it('called with an Arguments object should return `"arguments"`', function () {
      var result = typeOf(arguments);
      expect(result).toBe('arguments');
    });

    it('called with an empty array should return `"array"`', function () {
      var result = typeOf([]);
      expect(result).toBe('array');
    });

    it('called with `Array` object should return `"array"`', function () {
      var result = typeOf(new Array('one', 'two', 'etc'));
      expect(result).toBe('array');
    });

    it('called with `false` should return `"boolean"`', function () {
      var result = typeOf(false);
      expect(result).toBe('boolean');
    });

    it('called with `true` should return `"boolean"`', function () {
      var result = typeOf(true);
      expect(result).toBe('boolean');
    });

    it('called with `Boolean` object should return `"boolean"`', function () {
      // Although it is bad practice to use the Boolean constructor, this confirms that 'object' is not returned.
      var result = typeOf(new Boolean(true));
      expect(result).toBe('boolean');
    });

    it('called with a date should return `"date"`', function () {
      var result = typeOf(new Date());
      expect(result).toBe('date');
    });

    it('called with an `Error` object should return `"object"`', function () {
      var result = typeOf(new Error('Help!'));
      expect(result).toBe('object');
    });

    it('called with a function should return `"function"`', function () {
      var result = typeOf(function () {});
      expect(result).toBe('function');

      result = typeOf(Array);
      expect(result).toBe('function');

      result = typeOf(Boolean);
      expect(result).toBe('function');

      result = typeOf(Date);
      expect(result).toBe('function');

      result = typeOf(Error);
      expect(result).toBe('function');

      result = typeOf(Function);
      expect(result).toBe('function');

      result = typeOf(Number);
      expect(result).toBe('function');

      result = typeOf(Object);
      expect(result).toBe('function');

      result = typeOf(RegExp);
      expect(result).toBe('function');

      result = typeOf(String);
      expect(result).toBe('function');
    });

    it('called with `Function` object should return `"function"`', function () {
      var result = typeOf(new Function('return;'));
      expect(result).toBe('function');
    });

    it('called with an empty object literal should return `"object"`', function () {
      var result = typeOf({});
      expect(result).toBe('object');
    });

    it('called with a non-empty object literal should return `"object"`', function () {
      var result = typeOf({ prop: 'not empty' });
      expect(result).toBe('object');
    });

    it('called with `null` should return `"null"`', function () {
      var result = typeOf(null);
      expect(result).toBe('null');
    });

    it('called with `Infinity` should return `"infinity"`', function () {
      var result = typeOf(Infinity);
      expect(result).toBe('infinity');
    });

    it('called with `Number.NEGATIVE_INFINITY` should return `"infinity"`', function () {
      var result = typeOf(Number.NEGATIVE_INFINITY);
      expect(result).toBe('infinity');
    });

    it('called with `Number.POSITIVE_INFINITY` should return `"infinity"`', function () {
      var result = typeOf(Number.POSITIVE_INFINITY);
      expect(result).toBe('infinity');
    });

    it('called with `NaN` should return `"nan"`', function () {
      var result = typeOf(NaN);
      expect(result).toBe('nan');
    });

    it('called with `Number.NaN` should return `"nan"`', function () {
      var result = typeOf(Number.NaN);
      expect(result).toBe('nan');
    });

    it('called with `Number.MIN_VALUE` should return `"number"`', function () {
      var result = typeOf(Number.MIN_VALUE);
      expect(result).toBe('number');
    });

    it('called with `-1` should return `"number"`', function () {
      var result = typeOf(-1);
      expect(result).toBe('number');
    });

    it('called with `0` should return `"number"`', function () {
      var result = typeOf(0);
      expect(result).toBe('number');
    });

    it('called with `1` should return `"number"`', function () {
      var result = typeOf(1);
      expect(result).toBe('number');
    });

    it('called with `Number.MAX_VALUE` should return `"number"`', function () {
      var result = typeOf(Number.MAX_VALUE);
      expect(result).toBe('number');
    });

    it('called with `Number` object should return `"number"`', function () {
      var result = typeOf(new Number(3.14));
      expect(result).toBe('number');
    });

    it('called with a regular expression should return `"regexp"`', function () {
      var result = typeOf(/typeof/);
      expect(result).toBe('regexp');
    });

    it('called with `RegExp` object should return `"regexp"`', function () {
      var result = typeOf(new RegExp('.*\\..*'));
      expect(result).toBe('regexp');
    });

    it('called with an empty string should return `"string"`', function () {
      var result = typeOf('');
      expect(result).toBe('string');
    });

    it('called with a non-empty string should return `"string"`', function () {
      var result = typeOf('not empty');
      expect(result).toBe('string');
    });

    it('called with `String` object should return `"string"`', function () {
      // Although it is bad practice to use the String constructor, this confirms that 'object' is not returned.
      var result = typeOf(new String('WTF'));
      expect(result).toBe('string');
    });

    it('called with a `Symbol` object should return `"symbol"`', function () {
      if (typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol') {
        var result = typeOf(Symbol.iterator);
        expect(result).toBe('symbol');
      }
    });

    it('called with `undefined` should return `"undefined"`', function () {
      var result = typeOf(undefined);
      expect(result).toBe('undefined');

      result = typeOf();
      expect(result).toBe('undefined');
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
