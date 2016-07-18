
const Arr = require('./lib/Array');
const Bool = require('./lib/Boolean');
const Dte = require('./lib/Date');
const Mth = require('./lib/Math');
const Num = require('./lib/Number');
const Obj = require('./lib/Object');
const RegX = require('./lib/RegExp');
const Str = require('./lib/String');
const typeOf = require('./lib/TypeOf').typeOf;

const QC = {
  Arr,
  Bool,
  Dte,
  Mth,
  Num,
  Obj,
  RegX,
  Str,
  printf: Str.printf,
  typeOf,
  wrap: Arr.wrap,
};

// ==========================================================================
module.exports = QC;
