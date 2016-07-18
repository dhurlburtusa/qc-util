# qc-util

The utility module of the QC ecosystem.  This module is intended to be isomorphic.  That is, it is designed
to run on node or in a modern browser.


## Install

```bash
npm install qc-util
```

To avoid potential issues, update `npm` before installing:

```bash
npm install npm -g
```


## Node Usage

```js
import { Arr, Bool, Dte, Mth, Num, Obj, Str, typeOf } from 'qc-util';

Arr.wrap('item'); // ['item'].
Bool.toBool('no'); // `Boolean('no')` returns `true` instead of `false`.
Dte.toDate('7/12/2016', { formats: 'm/d/Y' }); // => new Date(2016, 6, 12).
Num.toInt('1e4'); // `parseInt('1e4')` returns `1` instead of `10000`.
Num.toInt('Infinity'); // `parseInt('Infinity')` returns `NaN` instead of `null`.
Str.toStr(null); // `'' + null` returns `'null'` instead of `null`.

Mth.round(1234.5678, -2); // `1234.57`

var obj = {};
Obj.put(obj, 'name.first', 'foo');
// obj now is: `{ name: { first: 'foo' } }`
Obj.put(obj, 'name.last', 'bar');
// obj now is: `{ name: { first: 'foo', last: 'bar' } }`
```


## `null` is Legitimate

In the QC ecosystem, `null` is considered a legitimate value.  This aligns with how `null` is treated in JSON which
is important because JavaScript objects/arrays are serialized to and from JSON.

As demonstrated in the below example, `null` is legitimate in JSON.  However, `undefined` is not.  A property assigned
the `undefined` value is treated the same as if the property wasn't defined at all.

```js
JSON.stringify({ foo: undefined }); // `'{}'`
JSON.stringify({ foo: null }); // `'{"foo":null}'`
```
