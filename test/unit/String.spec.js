
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
}
else {
  QC = global.QC;
}

var Str = QC.Str;

describe('QC.Str', function () {

  describe('.convert', function () {

    it('called with `NaN` should return "NaN"', function () {
      var value = Str.convert(NaN);
      expect(value).toBe('NaN');
    });

    it('called with `Number.NaN` should return "NaN"', function () {
      var value = Str.convert(Number.NaN);
      expect(value).toBe('NaN');
    });

    it('called with `Infinity` should return "Infinity"', function () {
      var value = Str.convert(Infinity);
      expect(value).toBe('Infinity');
    });

    it('called with `Number.NEGATIVE_INFINITY` should return "-Infinity"', function () {
      var value = Str.convert(Number.NEGATIVE_INFINITY);
      expect(value).toBe('-Infinity');
    });

    it('called with `Number.POSITIVE_INFINITY` should return "Infinity"', function () {
      var value = Str.convert(Number.POSITIVE_INFINITY);
      expect(value).toBe('Infinity');
    });

    it('called with `undefined` should return `undefined`', function () {
      var value = Str.convert(undefined);
      expect(value).toBeUndefined();
    });

    it('called with `null` should return `null`', function () {
      var value = Str.convert(null);
      expect(value).toBeNull();
    });

    it('called with `false` should return "false"', function () {
      var value = Str.convert(false);
      expect(value).toBe('false');
    });

    it('called with `true` should return "true"', function () {
      var value = Str.convert(true);
      expect(value).toBe('true');
    });

    it('called with `0` should return "0"', function () {
      var value = Str.convert(0);
      expect(value).toBe('0');
    });

    it('called with `1` should return "1"', function () {
      var value = Str.convert(1);
      expect(value).toBe('1');
    });

    it('called with empty string should return empty string', function () {
      var value = Str.convert('');
      expect(value).toEqual('');
    });

    it('called with untrimmed string and trim option should return trimmed string', function () {
      var value = Str.convert('  foo  \n');
      expect(value).toEqual('foo');

      value = Str.convert('  foo  \n', { trim: true });
      expect(value).toEqual('foo');
    });

    it('called with `"" + null` should return "null"', function () {
      var value = Str.convert('' + null);
      expect(value).toBe('null');
    });

    it('called with `"" + undefined` should return "undefined"', function () {
      var value = Str.convert('' + undefined);
      expect(value).toBe('undefined');
    });

  });

  describe('.escape', function () {

    it('called with `undefined` should return `undefined`', function () {
      var value = Str.escape(undefined);
      expect(value).toBeUndefined();
    });

    it('called with `null` should return `null`', function () {
      var value = Str.escape(null);
      expect(value).toBeNull();
    });

    it('called with empty string should return empty string', function () {
      var value = Str.escape('');
      expect(value).toEqual('');
    });

    it('called with `false` should return `false`', function () {
      var value = Str.escape(false);
      expect(value).toBe(false);
    });

    it('called with `true` should return `true`', function () {
      var value = Str.escape(true);
      expect(value).toBe(true);
    });

    it('called with string containing backslashes should return string with backslashes escaped', function () {
      var value;

      value = Str.escape('\\');
      expect(value).toEqual('\\\\');

      value = Str.escape('format C:\\Windows\\');
      expect(value).toEqual('format C:\\\\Windows\\\\');
    });

    it('called with string containing single-quotes should return string with single-quotes escaped', function () {
      var value;

      value = Str.escape("'");
      expect(value).toBe("\\'");

      value = Str.escape("\'");
      expect(value).toBe("\\'");

      value = Str.escape('\'');
      expect(value).toBe("\\'");

      value = Str.escape("'help'!");
      expect(value).toBe("\\'help\\'!");

      value = Str.escape("\'help\'!");
      expect(value).toBe("\\'help\\'!");

      value = Str.escape('\'help\'!');
      expect(value).toBe("\\'help\\'!");
    });

  });

  describe('.escapeStr', function () {

    it('is an alias for .escape.', function () {
      expect(Str.escape === Str.escapeStr).toBe(true);
    });

  });

  describe('.leftPad', function () {

    it('called with `undefined` input should return `undefined`', function () {
      var output = Str.leftPad(undefined);
      expect(output).toBeUndefined();
    });

    it('called with `null` input should return `null`', function () {
      var output = Str.leftPad(null);
      expect(output).toBeNull();
    });

    it('called with `false` input should return `false`', function () {
      var output = Str.leftPad(false);
      expect(output).toBe(false);
    });

    it('called with `true` input should return `true`', function () {
      var output = Str.leftPad(true);
      expect(output).toBe(true);
    });

    it('called with `0` input should return `0`', function () {
      var output = Str.leftPad(0);
      expect(output).toBe(0);
    });

    it('called with `1` input should return `1`', function () {
      var output = Str.leftPad(1);
      expect(output).toBe(1);
    });

    it('called with short input should return padded input', function () {
      var output = Str.leftPad('foo', 10, 'b');
      expect(output).toBe('bbbbbbbfoo');

      output = Str.leftPad('foo', 10, ' ');
      expect(output).toBe('       foo');
    });

    it('called with extremely short input should return padded input', function () {
      var output = Str.leftPad('foo', 100, 'b');
      expect(output).toBe('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfoo');
    });

    it('called with blank padder should return input', function () {
      var output = Str.leftPad('foo', 10, '');
      expect(output).toBe('foo');
    });

    it('called with multi-character padder should return input', function () {
      var output = Str.leftPad('foo', 10, 'bar');
      expect(output).toBe('foo');
    });

    it('called with short length should return input unchanged', function () {
      var output = Str.leftPad('foobar', 5, ' ');
      expect(output).toBe('foobar');
    });

  });

  describe('.rightPad', function () {

    it('called with `undefined` input should return `undefined`', function () {
      var output = Str.rightPad(undefined);
      expect(output).toBeUndefined();
    });

    it('called with `null` input should return `null`', function () {
      var output = Str.rightPad(null);
      expect(output).toBeNull();
    });

    it('called with `false` input should return `false`', function () {
      var output = Str.rightPad(false);
      expect(output).toBe(false);
    });

    it('called with `true` input should return `true`', function () {
      var output = Str.rightPad(true);
      expect(output).toBe(true);
    });

    it('called with `0` input should return `0`', function () {
      var output = Str.rightPad(0);
      expect(output).toBe(0);
    });

    it('called with `1` input should return `1`', function () {
      var output = Str.rightPad(1);
      expect(output).toBe(1);
    });

    it('called with short input should return padded input', function () {
      var output = Str.rightPad('foo', 10, 'b');
      expect(output).toBe('foobbbbbbb');

      output = Str.rightPad('foo', 10, ' ');
      expect(output).toBe('foo       ');
    });

    it('called with extremely short input should return padded input', function () {
      var output = Str.rightPad('foo', 100, 'b');
      expect(output).toBe('foobbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
    });

    it('called with blank padder should return input', function () {
      var output = Str.rightPad('foo', 10, '');
      expect(output).toBe('foo');
    });

    it('called with multi-character padder should return input', function () {
      var output = Str.rightPad('foo', 10, 'bar');
      expect(output).toBe('foo');
    });

    it('called with short length should return input unchanged', function () {
      var output = Str.rightPad('foobar', 5, ' ');
      expect(output).toBe('foobar');
    });

  });

  describe('.merge', function () {

    it('called with `undefined` should return `undefined`', function () {
      var value = Str.merge(undefined);
      expect(value).toBeUndefined();
    });

    it('called with `null` should return `null`', function () {
      var value = Str.merge(null);
      expect(value).toBeNull();
    });

    it('called with empty string should return empty string', function () {
      var value = Str.merge('');
      expect(value).toEqual('');
    });

    it('called with `false` should return `false`', function () {
      var value = Str.merge(false);
      expect(value).toBe(false);
    });

    it('called with `true` should return `true`', function () {
      var value = Str.merge(true);
      expect(value).toBe(true);
    });

    it('called with `0` should return `0`', function () {
      var value = Str.merge(0);
      expect(value).toBe(0);
    });

    it('called with `1` should return `1`', function () {
      var value = Str.merge(1);
      expect(value).toBe(1);
    });

    it('called with `new Date` should return `new Date`', function () {
      var value = Str.merge(new Date(), ['does', 'not', 'matter']);
      expect(typeof value).toBe('object');
      expect(value.constructor).toBe(Date);
    });

    it('called with template should return merged string', function () {
      var value = Str.merge('{0}, {1}!', ['Hello', 'World']);
      expect(value).toEqual('Hello, World!');
    });

    it('called with template containing negative placeholders should return merged string without negative placeholders being replaced', function () {
      var value;

      value = Str.merge('{0}, {-1}!', ['Hello', 'World']);
      expect(value).toEqual('Hello, {-1}!');
    });

    it('called with template containing sparse placeholders should return merged string', function () {
      // That is, extraneous data is okay.
      var value = Str.merge('{0}, {3}!', ['Hello', 'Goodbye', 'My', 'World']);
      expect(value).toEqual('Hello, World!');
    });

    it('called with template containing extraneous placeholders should return merged string with extraneous placeholders replaced by `undefined`', function () {
      var value = Str.merge('{0}, {1}! {2} {3} {4}', ['Hello', 'World', 'Good', 'Morning']);
      expect(value).toEqual('Hello, World! Good Morning undefined');
    });

    it('called with template containing extraneous placeholders and undef option should return merged string with extraneous placeholders replaced by undef value', function () {
      var value = Str.merge('{0}, {1}! {2} {3} {5}! {4}', ['Hello', 'World', 'Good', 'Morning', undefined], { undef: 'Vietnam' });
      expect(value).toEqual('Hello, World! Good Morning Vietnam! undefined');
    });

    it('called with template containing unordered placeholders should return merged string', function () {
      // That is, order of placeholders does not matter.
      var value = Str.merge('{1}, {0}!', ['World', 'Hello']);
      expect(value).toEqual('Hello, World!');
    });

    it('called with template and various data types should return merged string', function () {
      var value;

      value = Str.merge('{1} for the {0}, {2} for the {3}...', ['money', 1, 2, 'show']);
      expect(value).toEqual('1 for the money, 2 for the show...');

      value = Str.merge('Is it {0} that {0} == {1} is {2}?', [true, false, undefined]);
      expect(value).toEqual('Is it true that true == false is undefined?');

      value = Str.merge('Is {1} the same as {0}?', [undefined, null]);
      expect(value).toEqual('Is null the same as undefined?');
    });

  });

  describe('.mergeStr', function () {

    it('is an alias for .merge.', function () {
      expect(Str.merge === Str.mergeStr).toBe(true);
    });

  });

  describe('.printf', function () {

    describe('called with no arguments or undefined arguments', function () {

      it('should return `undefined`', function () {
        expect(Str.printf()).toBeUndefined();
        expect(Str.printf(undefined)).toBeUndefined();
        expect(Str.printf(undefined, undefined)).toBeUndefined();
      });

    });

    describe('called with a `null` template', function () {

      it('should return as if template was `"null"`', function () {
        expect(Str.printf(null)).toBe('null');
        expect(Str.printf(null, 'more')).toBe('null more');
      });

    });

    it('called with no replacement arguments should return the input template as a string', function () {
      expect(Str.printf(arguments)).toBe('[object Arguments]');
      expect(Str.printf([])).toBe('');
      expect(Str.printf(['not empty'])).toBe('not empty');
      expect(Str.printf([1, '*,*', 3])).toBe('1,*,*,3');
      expect(Str.printf(false)).toBe('false');
      expect(Str.printf(true)).toBe('true');
      // expect(Str.printf(new Date(0))).toBe('Depends on locale');
      expect(Str.printf(new Error('Help!'))).toBe('Error: Help!');
      expect(Str.printf({})).toBe('[object Object]');
      expect(Str.printf({ prop: 'not empty' })).toBe('[object Object]');
      expect(Str.printf('null')).toBe('null');
      expect(Str.printf(Infinity)).toBe('Infinity');
      expect(Str.printf(Number.NEGATIVE_INFINITY)).toBe('-Infinity');
      expect(Str.printf(Number.POSITIVE_INFINITY)).toBe('Infinity');
      expect(Str.printf(NaN)).toBe('NaN');
      expect(Str.printf(Number.NaN)).toBe('NaN');
      expect(Str.printf(-1)).toBe('-1');
      expect(Str.printf(0)).toBe('0');
      expect(Str.printf(1)).toBe('1');
      expect(Str.printf(3.14)).toBe('3.14');
      expect(Str.printf(1e4)).toBe('10000');
      expect(Str.printf('1e4')).toBe('1e4');
      expect(Str.printf(/regexp/)).toBe('/regexp/');
      expect(Str.printf(/regexp/g)).toBe('/regexp/g');
      expect(Str.printf(/regexp/i)).toBe('/regexp/i');
      expect(Str.printf(/regexp/gi)).toBe('/regexp/gi');
      expect(Str.printf(/regexp/ig)).toBe('/regexp/gi');
      expect(Str.printf('')).toBe('');
      expect(Str.printf(' ')).toBe(' '); // Not trimmed.
      expect(Str.printf('not empty')).toBe('not empty');
    });

    it('called with %d placeholders should return a string with placeholders coersed to a number', function () {
      expect(Str.printf('%d', -1)).toBe('-1');
      expect(Str.printf('%d', 0)).toBe('0');
      expect(Str.printf('%d', '0')).toBe('0');
      expect(Str.printf('%d', ' 0 ')).toBe('0');
      expect(Str.printf('%d', 1)).toBe('1');
      expect(Str.printf('%d', 3.14)).toBe('3.14');
      expect(Str.printf('%d', '3.14')).toBe('3.14');
      expect(Str.printf('%d', 1e4)).toBe('10000');
      expect(Str.printf('%d', '1e4')).toBe('10000');
      expect(Str.printf('%d', 6.022e23)).toBe('6.022e+23');
      expect(Str.printf('%d', '6.022e23')).toBe('6.022e+23');
      expect(Str.printf('%d', null)).toBe('NaN');
      expect(Str.printf('%d', 'null')).toBe('NaN');
      expect(Str.printf('%d', Infinity)).toBe('Infinity');
      expect(Str.printf('%d', 'Infinity')).toBe('Infinity');
      expect(Str.printf('%d', Number.NEGATIVE_INFINITY)).toBe('-Infinity');
      expect(Str.printf('%d', '-Infinity')).toBe('-Infinity');
      expect(Str.printf('%d', Number.POSITIVE_INFINITY)).toBe('Infinity');
      expect(Str.printf('%d', NaN)).toBe('NaN');
      expect(Str.printf('%d', 'NaN')).toBe('NaN');
      expect(Str.printf('%d', Number.NaN)).toBe('NaN');
    });

    it('called with %i placeholders should return a string with placeholders coersed to an integer', function () {
      expect(Str.printf('%i', -1)).toBe('-1');
      expect(Str.printf('%i', 0)).toBe('0');
      expect(Str.printf('%i', '0')).toBe('0');
      expect(Str.printf('%i', ' 0 ')).toBe('0');
      expect(Str.printf('%i', 1)).toBe('1');
      expect(Str.printf('%i', 3.14)).toBe('3');
      expect(Str.printf('%i', '3.14')).toBe('3');
      expect(Str.printf('%i', 1e4)).toBe('10000');
      expect(Str.printf('%i', '1e4')).toBe('10000');
      expect(Str.printf('%i', 6.022e23)).toBe('6.022e+23');
      expect(Str.printf('%i', '6.022e23')).toBe('6.022e+23');
      expect(Str.printf('%i', null)).toBe('NaN');
      expect(Str.printf('%i', 'null')).toBe('NaN');
      expect(Str.printf('%i', Infinity)).toBe('NaN');
      expect(Str.printf('%i', 'Infinity')).toBe('NaN');
      expect(Str.printf('%i', Number.NEGATIVE_INFINITY)).toBe('NaN');
      expect(Str.printf('%i', '-Infinity')).toBe('NaN');
      expect(Str.printf('%i', Number.POSITIVE_INFINITY)).toBe('NaN');
      expect(Str.printf('%i', NaN)).toBe('NaN');
      expect(Str.printf('%i', 'NaN')).toBe('NaN');
      expect(Str.printf('%i', Number.NaN)).toBe('NaN');
    });

    it('called with %j placeholders should return a string with placeholders coersed to JSON', function () {
      var actual, expected, expectedIe11;

      expect(Str.printf('%j', arguments)).toBe('{}');
      expect(Str.printf('%j', [])).toBe('[]');
      expect(Str.printf('%j', [ 'not empty' ])).toBe('["not empty"]');
      expect(Str.printf('%j', [ { } ])).toBe('[{}]');
      expect(Str.printf('%j', [ { foo: 'bar' } ])).toBe('[{"foo":"bar"}]');
      expect(Str.printf('%j', false)).toBe('false');
      expect(Str.printf('%j', true)).toBe('true');
      expect(Str.printf('%j', new Date(0))).toBe('"1970-01-01T00:00:00.000Z"');
      actual = Str.printf('%j', new Error('Help!'));
      expected = '{}';
      expectedIe11 = '{"description":"Help!"}';
      expect(actual == expected || actual == expectedIe11).toBe(true);
      expect(Str.printf('%j', (function () {}))).toBe('undefined');
      expect(Str.printf('%j', (function fn(arg1, arg2) { return arg1 + arg2; }))).toBe('undefined');
      expect(Str.printf('%j', { })).toBe('{}');
      expect(Str.printf('%j', { foo: 'bar' })).toBe('{"foo":"bar"}');
      expect(Str.printf('%j', null)).toBe('null');
      expect(Str.printf('%j', Infinity)).toBe('null');
      expect(Str.printf('%j', Number.NEGATIVE_INFINITY)).toBe('null');
      expect(Str.printf('%j', Number.POSITIVE_INFINITY)).toBe('null');
      expect(Str.printf('%j', NaN)).toBe('null');
      expect(Str.printf('%j', Number.NaN)).toBe('null');
      expect(Str.printf('%j', Number.MIN_VALUE)).toBe('5e-324');
      expect(Str.printf('%j', -1)).toBe('-1');
      expect(Str.printf('%j', 0)).toBe('0');
      expect(Str.printf('%j', 1)).toBe('1');
      expect(Str.printf('%j', 3.14)).toBe('3.14');
      expect(Str.printf('%j', 1e4)).toBe('10000');
      expect(Str.printf('%j', 6.022e23)).toBe('6.022e+23');
      expect(Str.printf('%j', Number.MAX_VALUE)).toBe('1.7976931348623157e+308');
      expect(Str.printf('%j', /regexp/)).toBe('{}');
      expect(Str.printf('%j', '')).toBe('""');
      expect(Str.printf('%j', ' ')).toBe('" "');
      expect(Str.printf('%j', 'not empty')).toBe('"not empty"');
      expect(Str.printf('%j', undefined)).toBe('undefined');
    });

    it('called with %s placeholders should return a string with placeholders coersed to strings', function () {
      var actual, expected, expectedFireFox;

      expect(Str.printf('%s', arguments)).toBe('[object Arguments]');
      expect(Str.printf('%s', [])).toBe('');
      expect(Str.printf('%s', [ 'not empty' ])).toBe('not empty');
      expect(Str.printf('%s', [ { } ])).toBe('[object Object]');
      expect(Str.printf('%s', [ { foo: 'bar' } ])).toBe('[object Object]');
      expect(Str.printf('%s', false)).toBe('false');
      expect(Str.printf('%s', true)).toBe('true');
      // expect(Str.printf('%s', new Date(0))).toBe('depends on locale');
      expect(Str.printf('%s', new Error('Help!'))).toBe('Error: Help!');
      actual = Str.printf('%s', function () {});
      expected = 'function () {}';
      expectedFireFox = 'function () {\n"use strict";\n}';
      expect(actual == expected || actual == expectedFireFox).toBe(true);
      expect(Str.printf('%s', { })).toBe('[object Object]');
      expect(Str.printf('%s', { foo: 'bar' })).toBe('[object Object]');
      expect(Str.printf('%s', null)).toBe('null');
      expect(Str.printf('%s', Infinity)).toBe('Infinity');
      expect(Str.printf('%s', Number.NEGATIVE_INFINITY)).toBe('-Infinity');
      expect(Str.printf('%s', Number.POSITIVE_INFINITY)).toBe('Infinity');
      expect(Str.printf('%s', NaN)).toBe('NaN');
      expect(Str.printf('%s', Number.NaN)).toBe('NaN');
      expect(Str.printf('%s', Number.MIN_VALUE)).toBe('5e-324');
      expect(Str.printf('%s', -1)).toBe('-1');
      expect(Str.printf('%s', 0)).toBe('0');
      expect(Str.printf('%s', 1)).toBe('1');
      expect(Str.printf('%s', 3.14)).toBe('3.14');
      expect(Str.printf('%s', 1e4)).toBe('10000');
      expect(Str.printf('%s', 6.022e23)).toBe('6.022e+23');
      expect(Str.printf('%s', Number.MAX_VALUE)).toBe('1.7976931348623157e+308');
      expect(Str.printf('%s', /regexp/)).toBe('/regexp/');
      expect(Str.printf('%s', /regexp/g)).toBe('/regexp/g');
      expect(Str.printf('%s', /regexp/i)).toBe('/regexp/i');
      expect(Str.printf('%s', /regexp/gi)).toBe('/regexp/gi');
      expect(Str.printf('%s', /regexp/ig)).toBe('/regexp/gi');
      expect(Str.printf('%s', '')).toBe('');
      expect(Str.printf('%s', ' ')).toBe(' '); // Asserts no trimming.
      expect(Str.printf('%s', 'not empty')).toBe('not empty');
      expect(Str.printf('%s', undefined)).toBe('undefined');
    });

    it('called with %% placeholder(s) should return a string with those placeholders converted to a single percent sign', function () {
      expect(Str.printf('%%')).toBe('%');
      expect(Str.printf('%%', '%%')).toBe('% %%');
      expect(Str.printf('%%', 'extraneous')).toBe('% extraneous');
      expect(Str.printf('%%', '%%', 'extraneous')).toBe('% %% extraneous');
      expect(Str.printf('%i%%', 99)).toBe('99%');
      expect(Str.printf('%i%%', 99, '100%')).toBe('99% 100%');
      expect(Str.printf('%i%% %d%%', 99, '100')).toBe('99% 100%');
    });

    it('called with various replacement arguments should return a string with placeholders replaced with associated replacement values', function () {
      // TODO: Add more test cases.  Especially using various data types.
      expect(Str.printf('%s %s', 'Hello', 'World!')).toBe('Hello World!');
      expect(Str.printf('%s must be between %i and %d.', 'It', 1.2, 3.14)).toBe('It must be between 1 and 3.14.');
    });

    it('called with missing replacement arguments should return a string with as many placeholders replaced as there are replacement values', function () {
      expect(Str.printf('%d')).toBe('%d');
      expect(Str.printf('%i')).toBe('%i');
      expect(Str.printf('%j')).toBe('%j');
      expect(Str.printf('%s')).toBe('%s');
      expect(Str.printf('%?')).toBe('%?');
      expect(Str.printf('%s %i %d %j')).toBe('%s %i %d %j');
      expect(Str.printf('%s %d', 'Hello')).toBe('Hello %d');
      expect(Str.printf('%s %i', 'Hello')).toBe('Hello %i');
      expect(Str.printf('%s %j', 'Hello')).toBe('Hello %j');
      expect(Str.printf('%s %s', 'Hello')).toBe('Hello %s');
      expect(Str.printf('%s %?', 'Hello')).toBe('Hello %?');
    });

    it('called with extraneous replacements should return a string with all placeholders replaced plus the remaining replacements appended to the end delimited by a space', function () {
      // TODO: Add more test cases.  Especially using various data types.
      expect(Str.printf(1, 2, 3)).toBe('1 2 3');
      expect(Str.printf('Hello', 'World!', 'Today is beautiful!')).toBe('Hello World! Today is beautiful!');
      expect(Str.printf('', 'Hello', 'World!', 'Today is beautiful!')).toBe(' Hello World! Today is beautiful!');
      expect(Str.printf('%s %s', 'Hello', 'World!', 'Today is beautiful!')).toBe('Hello World! Today is beautiful!');
    });

  });

  describe('.toStr', function () {

    it('is an alias for .convert.', function () {
      expect(Str.convert === Str.toStr).toBe(true);
    });

  });

  describe('.trim', function () {

    it('called with undefined should return undefined', function () {
      var value = Str.trim(undefined);
      expect(value).toBeUndefined();
    });

    it('called with null should return null', function () {
      var value = Str.trim(null);
      expect(value).toBeNull();
    });

    it('called with empty string should return empty string', function () {
      var value = Str.trim('');
      expect(value).toEqual('');
    });

    it('called with false should return false', function () {
      var value = Str.trim(false);
      expect(value).toBe(false);
    });

    it('called with true should return true', function () {
      var value = Str.trim(true);
      expect(value).toBe(true);
    });

    it('called with all whitespace string should return empty string', function () {
      var value;

      value = Str.trim(' ');
      expect(value).toEqual('');

      value = Str.trim('  ');
      expect(value).toEqual('');

      value = Str.trim('\n');
      expect(value).toEqual('');

      value = Str.trim('\t');
      expect(value).toEqual('');

      value = Str.trim('\t\n');
      expect(value).toEqual('');
    });

    it('called with some whitespace string should return trimmed string', function () {
      var value;

      value = Str.trim(' foo bar');
      expect(value).toEqual('foo bar');

      value = Str.trim(' foo bar ');
      expect(value).toEqual('foo bar');

      value = Str.trim('foo bar\n');
      expect(value).toEqual('foo bar');

      value = Str.trim('foo bar\t');
      expect(value).toEqual('foo bar');

      value = Str.trim('\tfoo bar\n');
      expect(value).toEqual('foo bar');
    });

  });

  describe('.trimStr', function () {

    it('is an alias for .trim.', function () {
      expect(Str.trim === Str.trimStr).toBe(true);
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
