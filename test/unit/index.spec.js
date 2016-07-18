
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
}
else {
  QC = global.QC;
}

describe('QC', function () {

  describe('.Arr', function () {

    it('should be an object', function () {
      expect(typeof QC.Arr).toBe('object');
    });

  });

  describe('.Bool', function () {

    it('should be an object', function () {
      expect(typeof QC.Bool).toBe('object');
    });

  });

  describe('.Dte', function () {

    it('should be an object', function () {
      expect(typeof QC.Dte).toBe('object');
    });

  });

  describe('.Mth', function () {

    it('should be an object', function () {
      expect(typeof QC.Mth).toBe('object');
    });

  });

  describe('.Num', function () {

    it('should be an object', function () {
      expect(typeof QC.Num).toBe('object');
    });

  });

  describe('.Obj', function () {

    it('should be an object', function () {
      expect(typeof QC.Obj).toBe('object');
    });

  });

  describe('.RegX', function () {

    it('should be an object', function () {
      expect(typeof QC.RegX).toBe('object');
    });

  });

  describe('.Str', function () {

    it('should be an object', function () {
      expect(typeof QC.Str).toBe('object');
    });

  });

  describe('.printf', function () {

    it('should be a function', function () {
      expect(typeof QC.printf).toBe('function');
    });

  });

  describe('.typeOf', function () {

    it('should be a function', function () {
      expect(typeof QC.typeOf).toBe('function');
    });

  });

  describe('.wrap', function () {

    it('should be a function', function () {
      expect(typeof QC.wrap).toBe('function');
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
