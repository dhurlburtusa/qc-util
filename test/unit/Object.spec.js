
(function (global) {

'use strict';

var QC;

if (typeof require == 'function') {
  QC = require('../../');
}
else {
  QC = global.QC;
}

var Obj = QC.Obj;

describe('QC.Obj', function () {

  describe('.coerse', function () {

    it('called with `undefined` object should return `undefined`', function () {
      expect(Obj.coerse(undefined)).toBeUndefined();
      expect(Obj.coerse(undefined, undefined)).toBeUndefined();
      expect(Obj.coerse(undefined, {})).toBeUndefined();
    });

    it('called with "2.1" and int schema should return `2`', function () {
      expect(Obj.coerse('2.1', { type: 'integer' })).toBe(2);
    });

    it('called with unrecognized schema type should throw an error', function () {
      expect(function () {
        Obj.coerse({}, {});
      }).toThrow();
      expect(function () {
        Obj.coerse({}, { type: undefined });
      }).toThrow();
      expect(function () {
        Obj.coerse({}, { type: null });
      }).toThrow();
      expect(function () {
        Obj.coerse({}, { type: '????' });
      }).toThrow();
    });

    it('called with an object and a schema should return expect coersed object', function () {
      var inObj, outObj, personSchema;

      personSchema = {
        type: 'object',
        keys: {
          name: {
            type: 'object',
            keys: {
              first: { type: 'string' },
              last: { type: 'string' }
            }
          },
          age: { type: 'integer' },
          dob: { type: 'date', opts: { formats: ['Y-n-j'] } },
          gender: { type: 'string' },
          height: { type: 'number' },
          smart: { type: 'boolean' },
          // Array of objects:
          children: {
            type: 'array',
            items: null // To be set to personSchema.
          },
          // Array of strings:
          nicknames: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      };
      personSchema.keys.children.items = personSchema;

      inObj = {};
      outObj = Obj.coerse(inObj, personSchema);
      expect(outObj).toBe(inObj);
      expect(outObj).toEqual({});

      inObj = {
        name: {
          first: 'foo',
          last: 'bar'
        },
        age: '100.4',
        dob: '1916-01-01',
        gender: 'male',
        height: '5.9',
        smart: 'yes',
        children: {
          age: '3.14'
        },
        nicknames: [true, 'foobar']
      };
      outObj = Obj.coerse(inObj, personSchema);
      expect(outObj).toBe(inObj);
      expect(outObj).toEqual({
        name: {
          first: 'foo',
          last: 'bar'
        },
        age: 100,
        dob: new Date(1916, 0, 1),
        gender: 'male',
        height: 5.9,
        smart: true,
        children: [
          {
            age: 3
          }
        ],
        nicknames: ['true', 'foobar']
      });
    });

  });

  describe('.put', function () {

    it('called with `undefined` object should do nothing and not error', function () {
      var warn = console.warn;
      console.warn = function () {};
      try {
        expect(function () {
          Obj.put(undefined, 'should.not.matter', true);
        }).not.toThrow();
      } finally {
        console.warn = warn;
      }
    });

    it('called with `null` object should do nothing and not error', function () {
      var warn = console.warn;
      console.warn = function () {};
      try {
        expect(function () {
          Obj.put(null, 'should.not.matter', true);
        }).not.toThrow();
      } finally {
        console.warn = warn;
      }
    });

    it('called with an array should update or create missing values', function () {
      var array = [];

      Obj.put(array, 'length', 4);
      expect(array.length).toBe(4);
      expect(array[0]).toBeUndefined();
      expect(array[1]).toBeUndefined();
      expect(array[2]).toBeUndefined();
      expect(array[3]).toBeUndefined();

      Obj.put(array, '0', 'zero');
      expect(array[0]).toBe('zero');

      Obj.put(array, '3', 'three');
      expect(array[3]).toBe('three');

      Obj.put(array, '2', 'two');
      expect(array[2]).toBe('two');

      Obj.put(array, '4', { name: 'foo' });
      expect(array.length).toBe(5);
      expect(array[4]).toEqual({ name: 'foo' });

      Obj.put(array, '4.name', 'bar');
      expect(array[4]).toEqual({ name: 'bar' });

      Obj.put(array, '5.0', 'five.zero');
      expect(array.length).toBe(6);
      expect(array[5]).toEqual(['five.zero']);

      Obj.put(array, '2.0', 'two.zero');
      expect(array.length).toBe(6);
      expect(array[2]).toEqual(['two.zero']);

      expect(array.length).toBe(6);
      expect(array[0]).toBe('zero');
      expect(array[1]).toBeUndefined();
      expect(array[2]).toEqual(['two.zero']);
      expect(array[2][0]).toBe('two.zero');
      expect(array[3]).toBe('three');
      expect(array[4]).toEqual({ name: 'bar' });
      expect(array[4].name).toBe('bar');
      expect(array[5]).toEqual(['five.zero']);
      expect(array[5][0]).toBe('five.zero');
    });

    it('called with a non-array object and an initial indexing path should exit without making changes', function () {
      var obj = {},
          warn = console.warn;

      console.warn = function () {};
      try {
        Obj.put(obj, '0', 'I only belong on arrays');
        expect(obj).toEqual({});
      } finally {
        console.warn = warn;
      }
    });

    it('called with empty object and single path should create missing context', function () {
      var obj = {};

      Obj.put(obj, 'top', 'I am on top!');
      expect(obj).toEqual({ top: 'I am on top!' });
    });

    it('called with empty object and nested paths should create missing contexts', function () {
      var obj = {};

      Obj.put(obj, 'top.next.last', 'I am the last one alive!');
      expect(obj).toEqual({ top: { next: { last: 'I am the last one alive!' } } });
    });

    it('called with primatives along path should correct contexts', function () {
      var obj;

      obj = { top: 'primative' };
      Obj.put(obj, 'top.next', 'was changed');
      expect(obj).toEqual({ top: { next: 'was changed' } });

      obj = { top: 'primative' };
      Obj.put(obj, 'top.0', 'was changed');
      expect(obj).toEqual({ top: ['was changed'] });
    });

    it('called with empty path should update the object', function () {
      var obj;

      obj = {};
      Obj.put(obj, '', 'I am empty');
      expect(obj).toEqual({ '': 'I am empty' });

      obj = { '': 'will be changed' };
      Obj.put(obj, '', 'I am empty');
      expect(obj).toEqual({ '': 'I am empty' });
    });

    it('called with force set to `false` should not create missing contexts', function () {
      var obj = {};

      Obj.put(obj, 'top.next.last', 'I am the last one alive!', { force: false });
      expect(obj).toEqual({});
    });

    it('called with complete object and indexed based path should update indexed parts of object', function () {
      var obj = { name: 'ACME', employees: [{ name: 'Alice' }, { name: 'Bob' }] };

      Obj.put(obj, 'employees.0.name', 'Anthony');
      expect(obj).toEqual({ name: 'ACME', employees: [{ name: 'Anthony' }, { name: 'Bob' }] });
    });

    it('called with partial object and nested paths should create missing objects but not affect other parts of the object', function () {
      var obj = {
        tooth: { less: 'people' },
        are: { happy: false },
      };

      Obj.put(obj, 'tooth.filled.mouths', 'are better');
      expect(obj).toEqual({ tooth: { filled: { mouths: 'are better' }, less: 'people' }, are: { happy: false } });
    });

    it('called with deep object, nested paths should replace sub-objects', function () {
      var obj = { top: { next: { last: { more: true, samuri: { name: 'kikomon' } } } } };

      Obj.put(obj, 'top.next.last', 'new value');
      expect(obj).toEqual({ top: { next: { last: 'new value' } } });
    });

    it('is chainable', function () {
      var obj = {};
      Obj.put(obj, 'name.first', 'foo')
        .put(obj, 'name.last', 'bar')
        .put(obj, 'age', 100);
      expect(obj).toEqual({ name: { first: 'foo', last: 'bar' }, age: 100 });

      obj = {};
      var put = Obj.put;
      put(obj, 'name.first', 'foo')(obj, 'name.last', 'bar').put(obj, 'age', 100);
      expect(obj).toEqual({ name: { first: 'foo', last: 'bar' }, age: 100 });
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
