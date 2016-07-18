
/*
 * This script does a simple test to confirm that the main package entry point is structured as expected.
 */

'use strict';

console.log('Starting node test...');

const QC = require('../../');

console.assert(typeof QC == 'object', '`QC` should be an object');

console.assert(typeof QC.Arr == 'object', '`QC.Arr` should be an object');
console.assert(typeof QC.Bool == 'object', '`QC.Bool` should be an object');
console.assert(typeof QC.Dte == 'object', '`QC.Dte` should be an object');
console.assert(typeof QC.Mth == 'object', '`QC.Mth` should be an object');
console.assert(typeof QC.Num == 'object', '`QC.Num` should be an object');
console.assert(typeof QC.Obj == 'object', '`QC.Obj` should be an object');
console.assert(typeof QC.RegX == 'object', '`QC.RegX` should be an object');
console.assert(typeof QC.Str == 'object', '`QC.Str` should be an object');

console.assert(typeof QC.printf == 'function', '`QC.printf` should be a function');
console.assert(typeof QC.typeOf == 'function', '`QC.typeOf` should be a function');
console.assert(typeof QC.wrap == 'function', '`QC.wrap` should be a function');

console.log('Finished node test');
