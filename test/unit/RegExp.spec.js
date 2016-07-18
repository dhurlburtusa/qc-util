
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
}
else {
  QC = global.QC;
}

var RegX = QC.RegX;

describe('RegX', function () {

  describe('.escape', function () {

    it('called with `undefined` should return `undefined`', function () {
      var value = RegX.escape(undefined);
      expect(value).toBeUndefined();
    });

    it('called with `null` should return `null`', function () {
      var value = RegX.escape(null);
      expect(value).toBeNull();
    });

    it('called with empty string should return empty string', function () {
      var value = RegX.escape('');
      expect(value).toBe('');
    });

    it('called with `false` should return `false`', function () {
      var value = RegX.escape(false);
      expect(value).toBe(false);
    });

    it('called with `true` should return `true`', function () {
      var value = RegX.escape(true);
      expect(value).toBe(true);
    });

    it('called with `0` should return `0`', function () {
      var value = RegX.escape(0);
      expect(value).toBe(0);
    });

    it('called with `1` should return `1`', function () {
      var value = RegX.escape(1);
      expect(value).toBe(1);
    });

    it('called with string containing special characters should return string with special characters escaped', function () {
      var value;

      value = RegX.escape('[foo]');
      expect(value).toBe('\\[foo\\]');

      value = RegX.escape('([1-2 * foo.bar + ${0} ? 4 || 5 : 4 ^ 5])');
      expect(value).toBe('\\(\\[1\\-2 \\* foo\\.bar \\+ \\$\\{0\\} \\? 4 \\|\\| 5 : 4 \\^ 5\\]\\)');
    });

  });

  describe('.escapeRegX', function () {

    it('is an alias for .escape.', function () {
      expect(RegX.escape === RegX.escapeRegX).toBe(true);
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
