/* eslint no-magic-numbers: ["error", { ignore: [-1, 0, 1, 3, 10, 28, 30, 31, 100, 400], ignoreArrayIndexes: true }] */
/* eslint no-bitwise: "off" */

'use strict';

/**
 * A set of date related methods.
 *
 * The {@link module:Date.convert convert} method has `format` options.  The format consists of the symbols used by
 * the [PHP date() function](http://www.php.net/date) and character literals.  The current implementation does not
 * support all the symbols but all symbols are reserved.  Therefore, format symbols must be escaped with `\` to render
 * them as character literals even if the symbol is not currently supported.
 *
 * The currently supported symbols are listed below:
 * <pre>
 * Symbol  Description                                                   Example returned values
 * ------  -----------------------------------------------------------   -----------------------
 *   d     Day of the month, 2 digits with leading zeros                 01 to 31
 *   j     Day of the month without leading zeros                        1 to 31
 *   m     Numeric representation of a month, with leading zeros         01 to 12
 *   n     Numeric representation of a month, without leading zeros      1 to 12
 *   Y     A full numeric representation of a year, 4 digits             Examples: 1999 or 2003
 *   a     Lowercase Ante meridiem and Post meridiem                     am or pm
 *   A     Uppercase Ante meridiem and Post meridiem                     AM or PM
 *   g     12-hour format of an hour without leading zeros               1 to 12
 *   G     24-hour format of an hour without leading zeros               0 to 23
 *   h     12-hour format of an hour with leading zeros                  01 to 12
 *   H     24-hour format of an hour with leading zeros                  00 to 23
 *   i     Minutes, with leading zeros                                   00 to 59
 *   s     Seconds, with leading zeros                                   00 to 59
 *   u     Decimal fraction of a second                                  Examples:
 *         (minimum 1 digit, arbitrary number of digits allowed)           001 (i.e. 0.001s) or
 *                                                                         100 (i.e. 0.100s) or
 *                                                                         999 (i.e. 0.999s) or
 *                                                                         9876543210 (i.e. 0.9876543210s)
 *   U     Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)    1193432466 or -2138434463
 *   O     Difference to Greenwich time (GMT) in hours and minutes       Example: +1030
 *   P     Difference to Greenwich time (GMT) with colon between hours   Example: -08:00
 *         and minutes
 *   c     ISO 8601 date
 *         Notes:                                                        Examples:
 *         1) If unspecified, the month / day defaults to the first        1991 or
 *            month / day, the time defaults to midnight, while the        1992-10 or
 *            timezone defaults to the browser's timezone.  If a time      1993-09-20 or
 *            is specified, it must include both hours and minutes.        1994-08-19T16:20+01:00 or
 *            The "T" delimiter, seconds, milliseconds, and timezone       1995-07-18T17:21:28-02:00 or
 *            are optional.
 *         2) The decimal fraction of a second, if specified, must         1996-06-17T18:22:29.98765+03:00 or
 *            contain at least 1 digit (there is no limit to the           1997-05-16T19:23:30,12345-0400 or
 *            maximum number of digits allowed), and may be delimited      1998-04-15T20:24:31.2468Z or
 *            by either a '.' or a ','.
 *         Refer to the examples on the right for the various levels       1999-03-14T20:24:32Z or
 *         of date-time granularity which are supported, or see            2000-02-13T21:25:33
 *         http://www.w3.org/TR/NOTE-datetime for more info.               2001-01-12 22:26:34
 * </pre>
 *
 * The currently unsupported but reserved symbols are listed below:
 * <pre>
 * Symbol  Description                                                   Example returned values
 * ------  -----------------------------------------------------------   -----------------------
 *   D     A short textual representation of the day of the week         Mon to Sun
 *   l     A full textual representation of the day of the week          Sunday to Saturday
 *   N     ISO-8601 numeric representation of the day of the week        1 (for Monday) through 7 (for Sunday)
 *   S     English ordinal suffix for the day of the month, 2            st, nd, rd or th. Works well with j
 *         characters
 *   w     Numeric representation of the day of the week                 0 (for Sunday) to 6 (for Saturday)
 *   z     The day of the year (starting from 0)                         0 to 364 (365 in leap years)
 *   W     ISO-8601 week number of year, weeks starting on Monday        01 to 53
 *   F     A full textual representation of a month, such as January     January to December
 *         or March
 *   M     A short textual representation of a month                     Jan to Dec
 *   t     Number of days in the given month                             28 to 31
 *   L     Whether it's a leap year                                      1 if it is a leap year, 0 otherwise.
 *   o     ISO-8601 year number (identical to (Y), but if the ISO week   Examples: 1998 or 2004
 *         number (W) belongs to the previous or next year, that year
 *         is used instead)
 *   y     A two digit representation of a year                          Examples: 99 or 03
 *   B     Swatch Internet time.                                         000 to 999
 *   I     Whether or not the date is in daylight saving time.           1 is Daylight Saving Time,
 *                                                                       0 otherwise.
 *   e     Timezone identifier.                                          Examples: UTC, GMT, Atlantic/Azores
 *   T     Timezone abbreviation of the machine running the code         Examples: EST, MDT, PDT ...
 *   Z     Timezone offset in seconds (negative if west of UTC,          -43200 to 50400
 *         positive if east)
 *   r     RFC 2822 formatted date.                                      Ex: Thu, 21 Dec 2000 16:01:07 +0200
 * </pre>
 * @module Date
 */

// NOTE: See http://dygraphs.com/date-formats.html for browser support of various date formats.
// NOTE: Check out https://jsperf.com/date-formatting/8 for performance of date formatting.
// NOTE: See https://docs.google.com/spreadsheets/d/1lPzBlmJVAkN6HUw28wBJmY1SdbSInRIBY0JCmBUDUmk/edit?hl=en_US#gid=0
//   for a spreadsheet of various date formatting tokens.

let DTE;

const wrap = require('./Array').wrap;
const toInt = require('./Number').toInt;
const escapeRegX = require('./RegExp').escape;
const escapeStr = require('./String').escape;
const mergeStr = require('./String').merge;
const trim = require('./String').trim;
const typeOf = require('./TypeOf').typeOf;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_FEB_DURING_LEAP_YEAR = 29;

const LEAST_DAYS_IN_MONTH = 28;

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;
const MILLISECONDS_IN_SECOND = 1000;
const MINUTES_IN_HOUR = 60;
const MONTHS_IN_YEAR = 12;

const ISO8601_REGEXPS_LUT = [
      // YYYY-MM-DDThh:mm:ss.sssTZD
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})[.,](\d+)([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, d: 3, h: 4, i: 5, s: 6, ms: 7, tzo: 8
      },
      // YYYY-MM-DDThh:mm:ss.sss
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})[.,](\d+)$/i,
        y: 1, m: 2, d: 3, h: 4, i: 5, s: 6, ms: 7
      },
      // YYYY-MM-DDThh:mm:ssTZD
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, d: 3, h: 4, i: 5, s: 6, tzo: 7
      },
      // YYYY-MM-DDThh:mm:ss
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/i,
        y: 1, m: 2, d: 3, h: 4, i: 5, s: 6
      },
      // YYYY-MM-DDThh:mmTZD
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, d: 3, h: 4, i: 5, tzo: 6
      },
      // YYYY-MM-DDThh:mm
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/i,
        y: 1, m: 2, d: 3, h: 4, i: 5
      },
      // YYYY-MM-DDThhTZD
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2})([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, d: 3, h: 4, tzo: 5
      },
      // YYYY-MM-DDThh
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2})$/i,
        y: 1, m: 2, d: 3, h: 4
      },
      // YYYY-MM-DDTTZD
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})[ T]([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, d: 3, tzo: 4
      },
      // YYYY-MM-DD
      {
        regexp: /^(\d{4})-(\d{2})-(\d{2})T?$/i,
        y: 1, m: 2, d: 3
      },


      // YYYY-MMThh:mm:ss.sssTZD
      {
        regexp: /^(\d{4})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})[.,](\d+)([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, h: 3, i: 4, s: 5, ms: 6, tzo: 7
      },
      // YYYY-MMThh:mm:ss.sss
      {
        regexp: /^(\d{4})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})[.,](\d+)$/i,
        y: 1, m: 2, h: 3, i: 4, s: 5, ms: 6
      },
      // YYYY-MMThh:mm:ssTZD
      {
        regexp: /^(\d{4})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, h: 3, i: 4, s: 5, tzo: 6
      },
      // YYYY-MMThh:mm:ss
      {
        regexp: /^(\d{4})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/i,
        y: 1, m: 2, h: 3, i: 4, s: 5
      },
      // YYYY-MMThh:mmTZD
      {
        regexp: /^(\d{4})-(\d{2})[ T](\d{2}):(\d{2})([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, h: 3, i: 4, tzo: 5
      },
      // YYYY-MMThh:mm
      {
        regexp: /^(\d{4})-(\d{2})[ T](\d{2}):(\d{2})$/i,
        y: 1, m: 2, h: 3, i: 4
      },
      // YYYY-MMThhTZD
      {
        regexp: /^(\d{4})-(\d{2})[ T](\d{2})([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, h: 3, tzo: 4
      },
      // YYYY-MMThh
      {
        regexp: /^(\d{4})-(\d{2})[ T](\d{2})$/i,
        y: 1, m: 2, h: 3
      },
      // YYYY-MMTTZD
      {
        regexp: /^(\d{4})-(\d{2})[ T]([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, m: 2, tzo: 3
      },
      // YYYY-MM
      {
        regexp: /^(\d{4})-(\d{2})T?$/i,
        y: 1, m: 2
      },


      // YYYYThh:mm:ss.sssTZD
      {
        regexp: /^(\d{4})[ T](\d{2}):(\d{2}):(\d{2})[.,](\d+)([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, h: 2, i: 3, s: 4, ms: 5, tzo: 6
      },
      // YYYYThh:mm:ss.sss
      {
        regexp: /^(\d{4})[ T](\d{2}):(\d{2}):(\d{2})[.,](\d+)$/i,
        y: 1, h: 2, i: 3, s: 4, ms: 5
      },
      // YYYYThh:mm:ssTZD
      {
        regexp: /^(\d{4})[ T](\d{2}):(\d{2}):(\d{2})([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, h: 2, i: 3, s: 4, tzo: 5
      },
      // YYYYThh:mm:ss
      {
        regexp: /^(\d{4})[ T](\d{2}):(\d{2}):(\d{2})$/i,
        y: 1, h: 2, i: 3, s: 4
      },
      // YYYYThh:mmTZD
      {
        regexp: /^(\d{4})[ T](\d{2}):(\d{2})([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, h: 2, i: 3, tzo: 4
      },
      // YYYYThh:mm
      {
        regexp: /^(\d{4})[ T](\d{2}):(\d{2})$/i,
        y: 1, h: 2, i: 3
      },
      // YYYYThhTZD
      {
        regexp: /^(\d{4})[ T](\d{2})([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, h: 2, tzo: 3
      },
      // YYYYThh
      {
        regexp: /^(\d{4})[ T](\d{2})$/i,
        y: 1, h: 2
      },
      // YYYYTTZD
      {
        regexp: /^(\d{4})[ T]([+-]\d{2}:?\d{2}|Z|[+-]\d{2})$/i,
        y: 1, tzo: 2
      },
      // YYYY
      {
        regexp: /^(\d{4})T?$/i,
        y: 1
      }
    ];

const TIMEZONE_OFFSET = /^([+-]\d{2}):?(\d{2})$/;


// ==========================================================================
/**
 * The milliseconds unit constant used by the {@link module:Date.add add} and {@link module:Date.diff diff} functions.
 *
 * @private
 * @const {string} module:Date.MILLISECONDS
 */
const MILLISECONDS = 'milliseconds';

/**
 * The seconds unit constant used by the {@link module:Date.add add} and {@link module:Date.diff diff} functions.
 *
 * @private
 * @const {string} module:Date.SECONDS
 */
const SECONDS = 'seconds';


/**
 * The minutes unit constant used by the {@link module:Date.add add} and {@link module:Date.diff diff} functions.
 *
 * @private
 * @const {string} module:Date.MINUTES
 */
const MINUTES = 'minutes';


/**
 * The hours unit constant used by the {@link module:Date.add add} and {@link module:Date.diff diff} functions.
 *
 * @private
 * @const {string} module:Date.HOURS
 */
const HOURS = 'hours';


/**
 * The day unit constant used by the {@link module:Date.add add} and {@link module:Date.diff diff} functions.
 *
 * @private
 * @const {string} module:Date.DAY
 */
const DAY = 'day';


/**
 * The month unit constant used by the {@link module:Date.add add} and {@link module:Date.diff diff} functions.
 *
 * @private
 * @const {string} module:Date.MONTH
 */
const MONTH = 'month';


/**
 * The year unit constant used by the {@link module:Date.add add} and {@link module:Date.diff diff} functions.
 *
 * @private
 * @const {string} module:Date.YEAR
 */
const YEAR = 'year';


// ==========================================================================
/**
 * Adds/subtracts an interval from the specified date.  The specified date is not modified.  A new date is created
 * representing the results of the calculation.
 *
 * ```js
 * // Basic usage:
 * var stPattysDay = add(new Date(1976, 2, 12), DAY, 5);
 * var feb29th = add(new Date(2000, 0, 31), MONTH, 1);
 *
 * // Negative increment will be subtracted:
 * var christmas = add(new Date(2000, 11, 30), DAY, -5);
 * ```
 *
 * NOTE: Non-date input just falls through.  It is not converted to a date before adding.
 *
 * @private
 * @function module:Date.add
 *
 * @param {Date} date - The date to add/subtract the interval.
 * @param {string} unit - A valid date unit enum value.  Must be one of {@link module:Date.YEAR YEAR},
 *   {@link module:Date.MONTH MONTH}, {@link module:Date.DAY DAY}, {@link module:Date.HOURS HOURS},
 *   {@link module:Date.MINUTES MINUTES}, {@link module:Date.SECONDS SECONDS}, or
 *   {@link module:Date.MILLISECONDS MILLISECONDS}.
 * @param {number} increment - The amount to add to the specified date.  Negative values will substract from the date.
 *   Must be an integral number.
 *
 * @returns {Date} A new Date instance with the interval added/subtracted.
 */
function add(date, unit, increment) {
  /*
   * Dependencies:
   * - Date.__add
   *   + Date.clone
   *   + Date.getFirstDateOfMonth
   *   + Date.toLastDateOfMonth
   *     - Date.getDaysInMonth
   *       + Date.isLeapYear
   *   + TypeOf.typeOf
   */
  date = __add(date, unit, increment, true);
  return date;
}


/**
 * Adds/subtracts an interval from the specified date.  The specified date is mutated.
 *
 * ```js
 * // Basic usage:
 * var stPattysDay = add(new Date(1976, 2, 12), DAY, 5);
 * var feb29th = add(new Date(2000, 0, 31), MONTH, 1);
 *
 * // Negative increment will be subtracted:
 * var christmas = add(new Date(2000, 11, 30), DAY, -5);
 * ```
 *
 * NOTE: Non-date input just falls through.  It is not converted to a date before adding.
 *
 * @private
 * @function module:Date.addTo
 *
 * @param {Date} date - The date to add/subtract the interval.
 * @param {string} unit - A valid date unit enum value.  Must be one of {@link module:Date.YEAR YEAR},
 *   {@link module:Date.MONTH MONTH}, {@link module:Date.DAY DAY}, {@link module:Date.HOURS HOURS},
 *   {@link module:Date.MINUTES MINUTES}, {@link module:Date.SECONDS SECONDS}, or
 *   {@link module:Date.MILLISECONDS MILLISECONDS}.
 * @param {number} increment - The amount to add to the specified date.  Negative values will substract from the date.
 *   Must be an integral number.
 *
 * @returns {module:Date} A reference to the `Date` module.
 */
function addTo(date, unit, increment) {
  /*
   * Dependencies:
   * - Date.__add
   *   + Date.clone
   *   + Date.getFirstDateOfMonth
   *   + Date.toLastDateOfMonth
   *     - Date.getDaysInMonth
   *       + Date.isLeapYear
   *   + TypeOf.typeOf
   */
  __add(date, unit, increment, false);
  return DTE;
}


/* eslint require-jsdoc: "off" */
function __add(date, unit, increment, makeClone) {
  /*
   * Dependencies:
   * - Date.clone
   * - Date.getFirstDateOfMonth
   * - Date.toLastDateOfMonth
   *   + Date.getDaysInMonth
   *     - Date.isLeapYear
   * - TypeOf.typeOf
   */
  let day, firstDateOfMonth, firstDateOfNewMonth, lastDateOfNewMonth, month;

  if (makeClone) {
    date = clone(date);
  }
  if (date instanceof Date && typeOf(unit) == 'string' && increment !== 0) {
    switch (unit.toLowerCase()) {
    case MILLISECONDS:
      date.setTime(date.getTime() + increment);
      break;
    case SECONDS:
      date.setSeconds(date.getSeconds() + increment);
      break;
    case MINUTES:
      date.setMinutes(date.getMinutes() + increment);
      break;
    case HOURS:
      date.setHours(date.getHours() + increment);
      break;
    case DAY:
      date.setDate(date.getDate() + increment);
      break;
    case MONTH:
      day = date.getDate();
      month = date.getMonth();

      if (day > LEAST_DAYS_IN_MONTH) {
        firstDateOfMonth = getFirstDateOfMonth(date);
        firstDateOfNewMonth = __add(firstDateOfMonth, MONTH, increment, false);
        lastDateOfNewMonth = toLastDateOfMonth(firstDateOfNewMonth);
        day = Math.min(day, lastDateOfNewMonth.getDate());
      }

      date.setDate(day);
      date.setMonth(month + increment);
      break;
    case YEAR:
      date.setFullYear(date.getFullYear() + increment);
      break;
    }
  }

  return date;
}


// ==========================================================================
/**
 * Clears all time information from the specified date.  The specified date is mutated.  A clone is not created first.
 *
 * ```js
 * clearTime(new Date(2000, 4, 1, 13, 14, 7)); // Mon May 01 2000 00:00:00
 * ```
 *
 * NOTE: Non-date input just falls through.  It is not converted to a date before clearing.
 *
 * @private
 * @function module:Date.clearTime
 *
 * @param {Date} date - The date to clear time information from.
 *
 * @returns {Date} The date with its time information set to midnight in local time.
 */
function clearTime(date) {
  /*
   * Dependencies:
   * - Core JS API.
   */
  if (date instanceof Date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
  }
  return date;
}


// ==========================================================================
/**
 * Returns a new `Date` instance with the exact same date and time as the specified date.  Since JavaScript `Date`s are
 * mutable, this is useful to use when passing dates around that may change its value unexpectedly.
 *
 * ```js
 * var date2 = clone(date1);
 * date1 === date2; // false
 * ```
 *
 * NOTE: Non-date input just falls through.  It is not converted to a date before cloning.
 *
 * @private
 * @function module:Date.clone
 *
 * @param {Date} date - The date to clone.
 *
 * @returns {Date} The new `Date` instance.
 */
function clone(date) {
  /*
   * Dependencies:
   * - Core JS API.
   */
  if (date instanceof Date) {
    date = new Date(date.getTime());
  }
  return date;
}


// ==========================================================================
/**
 * Converts a date-like object to a date.  Seven date-like objects are recognized.
 *
 * 1. A `Date` instance.  It gets returned without modification.
 * 2. A number.  It will be interpreted as the number of milliseconds from the UNIX epoch.
 * 3. An object with a `year`, `month` (1-based), `day` (1-based), `hours`, `minutes`, `seconds`, and `milliseconds`
 *    properties.  The properties must all be number-like.  All properties are optional.  Missing year, month, or day
 *    information will default to their current value on the computer this function is being run.  Missing hours,
 *    minutes, seconds, or milliseconds will default to `0`.  The expected values are the same values as expected by the
 *    native `Date` constructor that accepts 2 to 7 arguments except for `month`.  `month` is 1-based where the native
 *    `Date` constructor expects a 0-based month.
 * 4. An array with year information at index 0, month information (1-based) at index 1, day information at index 2,
 *    hours information at index 3, minutes information at index 4, seconds information at index 5, and milliseconds
 *    information at index 6.  All date part information is optional.  Missing year, month, or day information will
 *    default to their current value on the computer this function is being run.  Missing hours, minutes, seconds, or
 *    milliseconds will default to `0`.  The expected values are the same values as expected by the native `Date`
 *    constructor that accepts 2 to 7 arguments except for `month`.  `month` is 1-based where the native `Date`
 *    constructor expects a 0-based month.
 * 5. A string in a parsible date format.  The format consists of the symbols expected by PHP's date() function.
 *    The supported and reserved symbols are listed in the module's documentation.  The format string may also be the
 *    pre-defined format strings.  `'now'` will return a `Date` with the current date and time.  `'today'` will return
 *    a `Date` with the current local date.  These can be especially useful when multiple formats are declared and
 *    `'now'` or `'today'` is the last.  This allows unresolvable input to default to a valid `Date`.
 * 6. A string in one of the most common ISO 8601 date formats.  The syntax of the supported formats are as follows:
 *    `YYYY-MM-DDThh:mm:ss.sssTZD` (same as the format used by the `Date#toISOString` method),
 *    `YYYY-MM-DDThh:mm:ss.sss`, `YYYY-MM-DDThh:mm:ssTZD`, `YYYY-MM-DDThh:mm:ss`, `YYYY-MM-DDThh:mmTZD`,
 *    `YYYY-MM-DDThh:mm`, `YYYY-MM-DDThhTZD`, `YYYY-MM-DDThh`, `YYYY-MM-DDTTZD`, `YYYY-MM-DD`,
 *    `YYYY-MMThh:mm:ss.sssTZD`, `YYYY-MMThh:mm:ss.sss`, `YYYY-MMThh:mm:ssTZD`, `YYYY-MMThh:mm:ss`, `YYYY-MMThh:mmTZD`,
 *    `YYYY-MMThh:mm`, `YYYY-MMThhTZD`, `YYYY-MMThh`, `YYYY-MMTTZD`, `YYYY-MM`, `YYYYThh:mm:ss.sssTZD`,
 *    `YYYYThh:mm:ss.sss`, `YYYYThh:mm:ssTZD`, `YYYYThh:mm:ss`, `YYYYThh:mmTZD`, `YYYYThh:mm`, `YYYYThhTZD`, `YYYYThh`,
 *    `YYYYTTZD`, and `YYYY`.
 * 7. A Moment-like instance from the Moment.js library.  A Moment-like object is an object which has a property named
 *    `toDate` that is a function which returns a `Date` instance when called with no arguments.
 *
 * Example Usage:
 *
 * ```js
 * var date = convert('2001-08-11T07:42:00', { formats: 'Y-m-d\\TH:i:s' });
 * date = convert('now'); // options don't matter.
 * date = convert('today'); // options don't matter.
 * date = convert(new Date()); // options don't matter.
 * date = convert(1234567890); // options don't matter.
 * date = convert({ year: 2000, month: 2, day: 29 });
 * date = convert([2000, 2, 29]);
 * date = convert('Possibly parsible string', { formats: ['Y-m-d\\TH:i:s', 'now'] });
 * date = convert('Possibly parsible string', { formats: ['m/d/Y', 'today'] });
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * NOTE: This function has many other features not found in some other third-party libraries.  Notably: 1) Accepts more
 * forms of date-like input. 2) Attempts parsing of several formats. 3) Can fallback to a declared default value.
 *
 * @function module:Date.convert
 *
 * @param {(Date|Object|number|number[]|string)} input - The value to convert to a `Date` instance.
 * @param {Object} [options] - The options to use when parsing.
 * @param {*} [options.def=null] - The default value to return if unable to convert.  May also be `'now'` or
 *   `'today'`.  `'now'` will return a `Date` with the current date and time.  `'today'` will return a `Date` with the
 *   current local date.
 * @param {(string|string[])} [options.formats] - The format(s) the string input may be in that should be tried when
 *   converting.  Each is tried in order until one succeeds or all are attempted.  May be or contain one or more of the
 *   pre-defined formats.
 * @param {boolean} [options.strict=false] - `true` to assert resultant dates are valid.  Invalid date strings will
 *   return `null`.
 *
 * @returns {(Date|*)} The input converted to a date or the default value if unable to convert.
 */
function convert(input, options) {
  /*
   * Dependencies:
   * - Array.wrap
   * - Date.__construct
   *   + Date.addTo
   *     - Date.__add
   *       + Date.clone
   *       + Date.getFirstDateOfMonth
   *       + Date.toLastDateOfMonth
   *         - Date.getDaysInMonth
   *           + Date.isLeapYear
   *       + TypeOf.typeOf
   *   + Date.isValid
   *     - Date.addTo
   *       + Date.__add
   *         - Date.clone
   *         - Date.getFirstDateOfMonth
   *         - Date.toLastDateOfMonth
   *           + Date.getDaysInMonth
   *             - Date.isLeapYear
   *         - TypeOf.typeOf
   *   + Number.toInt
   *     - Number.convert
   *       + Math.round
   *         - Math._decimalAdjust
   *           + TypeOf.typeOf
   *       + TypeOf.typeOf
   * - Date.__createParser
   *   + Date.__construct
   *     - ...
   *   + Date.__parse
   *     - ...
   *   + String.escape
   *   + String.merge
   * - Date.__parse
   *   + ...
   * - Date.now
   * - Date.today
   *   + Date.clearTime
   * - Number.toInt
   *   + Number.convert
   *     - Math.round
   *       + Math._decimalAdjust
   *         - TypeOf.typeOf
   *     - TypeOf.typeOf
   * - String.trim
   * - TypeOf.typeOf
   */
  let defValue, format, formats, output, parser, parserLut, scope, str, strict, typeOfInput;

  options = options || {};

  // If input is a moment instance or like a moment instance with a `toDate` function, then attempt to convert to a Date.
  if (input && typeof input.toDate == 'function') {
    input = input.toDate();
  }

  if (input instanceof Date) {
    return input;
  }

  strict = options.strict === true;
  typeOfInput = typeOf(input);
  if (typeOfInput == 'number') {
    input = toInt(input);
    output = new Date(input);
  }
  else if (typeOfInput == 'string') {
    str = trim(input).toLowerCase();
    parserLut = __parse.parserLut;

    if (str == 'now' || str == 'today') {
      parser = parserLut[str];
      output = parser(str, strict);
    }
    else {
      formats = options.formats || [];
      formats = wrap(formats);
      formats = __injectMissingIso8601Format(formats);

      scope = {
        __construct,
        __parse,
        __parseISO8601,
      };

      for (let i = 0, len = formats.length; i < len; ++i) {
        format = formats[i];
        parser = parserLut[format];
        if (!parser) {
          parser = __createParser(format);
        }
        output = parser.call(scope, input, strict);
        if (output instanceof Date) {
          break;
        }
      }
    }
  }
  else if (input && typeOfInput == 'array') {
    parser = __parse.parserLut.array;
    output = parser(input, strict);
  }
  else if (input && typeOfInput == 'object') {
    parser = __parse.parserLut.struct;
    output = parser(input, strict);
  }

  if (!(output instanceof Date)) {
    defValue = options.hasOwnProperty('def') ? options.def : null;
    if (defValue == 'now') {
      defValue = now();
    }
    else if (defValue == 'today') {
      defValue = today();
    }
    output = defValue;
  }
  return output;
}


// ==========================================================================
/**
 * An alias for {@link module:Boolean.convert convert}.  This is useful when importing this module, especially when
 * importing a `convert` function from multiple modules.
 *
 * Use the following
 * ```js
 * import { toDate } from 'Date';
 * import { toStr } from 'String';
 * ```
 * instead of
 * ```js
 * import { convert as toDate } from 'Date';
 * import { convert as toStr } from 'String';
 * ```
 *
 * @function module:Date.toDate
 */
const toDate = convert;


// ==========================================================================
/**
 * Determines the difference between two dates.
 *
 * Example Usage:
 *
 * ```js
 * var date1 = new Date(2010, 6, 4, 12, 0, 0);
 * var date2 = new Date(2010, 6, 4, 12, 31, 59);
 * diff(date1, date1, MINUTES); // 31 full minutes
 * ```
 *
 * See the Jasmine Specs for more example uses.
 *
 * @private
 * @function module:Date.diff
 *
 * @param {Date} date1 - The first date to check.
 * @param {Date} date2 - The second date to check.
 * @param {string} unit - A valid date unit enum value.  Must be one of {@link module:Date.YEAR YEAR},
 *   {@link module:Date.MONTH MONTH}, {@link module:Date.DAY DAY}, {@link module:Date.HOURS HOURS},
 *   {@link module:Date.MINUTES MINUTES}, {@link module:Date.SECONDS SECONDS}, or
 *   {@link module:Date.MILLISECONDS MILLISECONDS}.
 *
 * @returns {number} The difference between the two dates as an integer.  This value is not rounded.
 */
function diff(date1, date2, unit) {
  /*
   * Dependencies:
   * - Date.add
   *   + Date.__add
   *     - Date.clone
   *     - Date.getFirstDateOfMonth
   *     - Date.toLastDateOfMonth
   *       + Date.getDaysInMonth
   *         - Date.isLeapYear
   *     - TypeOf.typeOf
   * - TypeOf.typeOf
   */
  let difference, msec1, msec2;

  msec1 = date1.getTime();
  msec2 = date2.getTime();

  if (typeOf(date1) == 'date' && typeOf(date2) == 'date' && typeOf(unit) == 'string') {
    switch (unit.toLowerCase()) {
    case MILLISECONDS:
      difference = msec2 - msec1;
      break;
    case SECONDS:
      difference = (msec2 - msec1) / MILLISECONDS_IN_SECOND;
      break;
    case MINUTES:
      difference = (msec2 - msec1) / MILLISECONDS_IN_MINUTE;
      break;
    case HOURS:
      difference = (msec2 - msec1) / MILLISECONDS_IN_HOUR;
      break;
    case DAY:
      difference = (msec2 - msec1) / MILLISECONDS_IN_DAY;
      break;
    case MONTH:
      difference = ((date2.getFullYear() * MONTHS_IN_YEAR) + date2.getMonth()) - ((date1.getFullYear() * MONTHS_IN_YEAR) + date1.getMonth());
      if (add(date1, unit, difference) > date2) {
        difference -= 1;
      }
      break;
    case YEAR:
      difference = date2.getFullYear() - date1.getFullYear();
      if (add(date1, unit, difference) > date2) {
        difference -= 1;
      }
      break;
    default:
      throw new TypeError('`unit` must be a valid date/time unit.');
    }
  }
  else {
    throw new TypeError('`date1` and `date2` must be Date instances and `unit` must be a string of a valid date/time unit.');
  }

  if (difference < 0) {
    difference = Math.ceil(difference);
  }
  else if (difference > 0) {
    difference = Math.floor(difference);
  }
  return difference;
}


// ==========================================================================
/**
 * Get the number of days in the specified month, adjusted for leap year.
 *
 * ```js
 * getDaysInMonth(new Date(2000, 1)); // 29
 * ```
 *
 * @private
 * @function module:Date.getDaysInMonth
 *
 * @param {Date} date - The date to examine.  The local, as opposed to UTC, month of the date is used to determine which
 *   month is being specified.
 *
 * @returns {(number|NaN)} The number of days in the month.
 */
function getDaysInMonth(date) {
  /*
   * Dependencies:
   * - Date.isLeapYear
   */
  let days = NaN,
      month;

  if (date instanceof Date) {
    month = date.getMonth();

    days = month === 1 && isLeapYear(date) ? DAYS_IN_FEB_DURING_LEAP_YEAR : DAYS_IN_MONTH[month];
  }
  return days;
}


// ==========================================================================
/**
 * Get the date of the first day of the month in which the specified date resides.
 *
 * ```js
 * getFirstDateOfMonth(new Date(2000, 1, 29)); // 2000-02-01
 * ```
 *
 * NOTE: Any time information the specified date may have had will be cleared out.
 *
 * @private
 * @function module:Date.getFirstDateOfMonth
 *
 * @param {Date} date - The date to examine.
 *
 * @returns {Date|null} A new date reset to the beginning of the month.
 */
function getFirstDateOfMonth(date) {
  /*
   * Dependencies:
   * - Core JS API.
   */
  let firstDateOfMonth = null;

  if (date instanceof Date) {
    firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  }
  return firstDateOfMonth;
}


// ==========================================================================
/**
 * Get the date of the last day of the month in which the specified date resides.
 *
 * ```js
 * getLastDateOfMonth(new Date(2000, 1, 1)); // 2000-02-29
 * ```
 *
 * NOTE: Any time information the specified date may have had will be cleared out.
 *
 * @private
 * @function module:Date.getLastDateOfMonth
 *
 * @param {Date} date - The date to examine.
 *
 * @returns {Date|null} A new date reset to the end of the month.
 */
function getLastDateOfMonth(date) {
  /*
   * Dependencies:
   * - Date.getDaysInMonth
   *   + Date.isLeapYear
   */
  let lastDateOfMonth = null;

  if (date instanceof Date) {
    lastDateOfMonth = new Date(date.getFullYear(), date.getMonth(), getDaysInMonth(date));
  }
  return lastDateOfMonth;
}


function toLastDateOfMonth(date) {
  /*
   * Dependencies:
   * - Date.getDaysInMonth
   *   + Date.isLeapYear
   */
  if (date instanceof Date) {
    date.setDate(getDaysInMonth(date));
    clearTime(date);
  }
  return date;
}


// ==========================================================================
/**
 * Determines if the specified date falls within a leap year.  If `date` is a `Date` instance, then `true` or `false`
 * is returned.  Otherwise `null` is returned.  Either way, a falsy value is returned if date is not determined to
 * be a leap year.
 *
 * ```js
 * isLeapYear(true); // null
 * isLeapYear(new Date(2000, 0)); // true
 * isLeapYear(new Date(2200, 0)); // false
 * ```
 *
 * @private
 * @function module:Date.isLeapYear
 *
 * @param {Date} date - The date to check.
 *
 * @returns {boolean|null} `true`, `false`, or `null` depending on whether date falls within leap year.
 */
function isLeapYear(date) {
  /*
   * Dependencies:
   * - Core JS API.
   */
  let answer = null,
      year;

  if (date instanceof Date) {
    year = date.getFullYear();
    answer = !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
  }

  return answer;
}


// ==========================================================================
/**
 * Determines if the specified date information will cause a JavaScript Date "rollover".  The date information is
 * invalid if a Date "rollover" occurs.
 *
 * Note: Invalid date information does not mean the date constructor will fail if this information is used to create a
 * date instance. It does mean, however, that the input date part information will be different than some of the date
 * part information returned by some of the getter methods (e.g., getFullYear, getMonth, getDate, getHours, etc).
 *
 * ```js
 * // The following date information will cause a rollover into July.
 * isValid(2001, 6, 31); // False.  Only 30 days in June.
 * ```
 *
 * @private
 * @function module:Date.isValid
 *
 * @param {number} y - 4-digit year.
 * @param {number} m - 1-based month.
 * @param {number} [d=1] - Day of month.
 * @param {number} [h=0] - Hours.
 * @param {number} [i=0] - Minutes.
 * @param {number} [s=0] - Seconds.
 * @param {number} [ms=0] - Milliseconds.
 *
 * @returns {boolean} `true` if the specified date information does not cause a Date "rollover", `false` otherwise.
 */
function isValid(y, m, d, h, i, s, ms) {
  /*
   * Dependencies:
   * - Date.addTo
   *   - Date.__add
   *     + Date.clone
   *     + Date.getFirstDateOfMonth
   *     + Date.toLastDateOfMonth
   *       - Date.getDaysInMonth
   *         + Date.isLeapYear
   *     + TypeOf.typeOf
   */
  let dt, isDtValid;

  m = (m || 1) - 1;
  d = d || 1;
  h = h || 0;
  i = i || 0;
  s = s || 0;
  ms = ms || 0;

  // Special handling for year < 100
  const YR_THRESHOLD = 100;
  dt = new Date(y < YR_THRESHOLD ? YR_THRESHOLD : y, m, d, h, i, s, ms);
  if (y < YR_THRESHOLD) {
    addTo(dt, YEAR, y - YR_THRESHOLD);
  }

  isDtValid = (
     y == dt.getFullYear() &&
     m == dt.getMonth() &&
     d == dt.getDate() &&
     h == dt.getHours() &&
     i == dt.getMinutes() &&
     s == dt.getSeconds() &&
    ms == dt.getMilliseconds()
  );

  return isDtValid;
}


// ==========================================================================
/**
 * Returns a date representing the current date *and* time at the time of the function call.
 *
 * ```js
 * now(); // e.g., 2010-09-08 07:06:54
 * ```
 *
 * NOTE: This function returns a date object unlike the native `Date.now` function which returns a number.
 *
 * @private
 * @function module:Date.now
 *
 * @returns {Date} The current date and time.
 */
function now() {
  /*
   * Dependencies:
   * - Core JS API.
   */
  return new Date();
}


// ==========================================================================
/**
 * Returns a date representing the current local date at the time of the function call.
 *
 * ```js
 * today(); // e.g., 2010-09-08 00:00:00
 * ```
 *
 * @private
 * @function module:Date.today
 *
 * @returns {Date} The current date with its time information set to midnight in local time.
 */
function today() {
  /*
   * Dependencies:
   * - Date.clearTime
   */
  let todayDt = clearTime(new Date());

  return todayDt;
}


// ==========================================================================
function __construct(y, m, d, h, i, s, ms, tzo, strict) {
  /*
   * Dependencies:
   * - Date.addTo
   *   + Date.__add
   *     - Date.clone
   *     - Date.getFirstDateOfMonth
   *     - Date.toLastDateOfMonth
   *       + Date.getDaysInMonth
   *         - Date.isLeapYear
   *     - TypeOf.typeOf
   * - Date.isValid
   *   + Date.addTo
   *     - Date.__add
   *       + Date.clone
   *       + Date.getFirstDateOfMonth
   *       + Date.toLastDateOfMonth
   *         - Date.getDaysInMonth
   *           + Date.isLeapYear
   *       + TypeOf.typeOf
   * - Number.toInt
   *   + Number.convert
   *     - Math.round
   *       + Math._decimalAdjust
   *         - TypeOf.typeOf
   *     - TypeOf.typeOf
   */
  let commonOptions, dt;

  dt = new Date();

  y = toInt(y, { def: dt.getFullYear() });
  m = toInt(m, { def: dt.getMonth() + 1 }) - 1;
  d = toInt(d, { def: dt.getDate() });

  commonOptions = { def: 0 };
  h = toInt(h, commonOptions);
  i = toInt(i, commonOptions);
  s = toInt(s, commonOptions);
  ms = toInt(ms, commonOptions);

  tzo = __parseTimezoneOffset(tzo);

  if (strict === true && !isValid(y, m + 1, d, h, i, s, ms)) { // Check for Date "rollover"
    dt = void 0;
  }
  else {
    const YR_THRESHOLD = 100;
    // If year is < 100, then set year to 100 and then subtract y - 100 years from date.

    if (typeof tzo == 'number') {
      dt = new Date(Date.UTC(y < YR_THRESHOLD ? YR_THRESHOLD : y, m, d, h, i, s, ms));
      addTo(dt, MINUTES, -tzo);
    }
    else {
      dt = new Date(y < YR_THRESHOLD ? YR_THRESHOLD : y, m, d, h, i, s, ms);
    }

    if (y < YR_THRESHOLD) {
      addTo(dt, YEAR, y - YR_THRESHOLD);
    }
  }
  return dt;
}


// ==========================================================================
const NotImplementedButReserved = {
  groupCount: 0,
  pattern: '',
};


// ==========================================================================
const __parse = {
  /*
   * Parser Info Lookup Table:
   *
   * Keyed by parse symbol.
   *
   * - calculation: The calculation to perform when specified symbol is in format.  This is a string template
   *   that MUST have a single placeholder which will be replaced with the current results index.  See some of
   *   the calculation templates below to get an idea of what one should look like.
   * - groupCount: The number of regular expression group references in the regular expression's pattern.
   * - pattern: The regular expression pattern to use to extract out the information needed for the parser
   *   calculation.
   */
  infoLut: {
  /* Day: */
    // Day of the month with leading zeroes (01 - 31).
    d: {
      calculation: 'd = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{2})',
    },
    D: NotImplementedButReserved,
    // Day of the month without leading zeroes (1 - 31).
    j: {
      calculation: 'd = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{1,2})',
    },
    l: NotImplementedButReserved,
    N: NotImplementedButReserved,
    S: NotImplementedButReserved,
    w: NotImplementedButReserved,
    z: NotImplementedButReserved,

  /* Week: */
    W: NotImplementedButReserved,

  /* Month: */
    F: NotImplementedButReserved,
    // Month number with leading zeros (01 - 12).
    m: {
      calculation: 'm = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{2})',
    },
    M: NotImplementedButReserved,
    // Month number without leading zeros (1 - 12).
    n: {
      calculation: 'm = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{1,2})',
    },
    t: NotImplementedButReserved,

  /* Year: */
    L: NotImplementedButReserved,
    o: NotImplementedButReserved,
    // 4-digit year
    Y: {
      calculation: 'y = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{4})',
    },
    y: NotImplementedButReserved,

  /* Time: */
    // Lowercase Ante meridiem and Post meridiem (am or pm).
    a: {
      /*
       * NOTE: This calculation expects that the hours have already been determined.  All known date formats
       * using a meridiem symbol always come after the hours symbol.
       */
      calculation: [
        'if (/(am)/i.test(results[{0}])) {',
          'if (!h || h == 12) { h = 0; }',
        '}',
        'else {',
          'if (!h || h < 12) { h = (h || 0) + 12; }',
        '}',
      ].join('\n'),
      groupCount: 1,
      pattern: '(am|pm)',
    },
    // Uppercase Ante meridiem and Post meridiem (AM or PM).
    A: {
      /*
       * NOTE: This calculation expects that the hours have already been determined.  All known date formats
       * using a meridiem symbol always come after the hours symbol.
       */
      calculation: [
        'if (/(am)/i.test(results[{0}])) {',
          'if (!h || h == 12) { h = 0; }',
        '}',
        'else {',
          'if (!h || h < 12) { h = (h || 0) + 12; }',
        '}',
      ].join('\n'),
      groupCount: 1,
      pattern: '(AM|PM)',
    },
    B: NotImplementedButReserved,
    // 12-hr format of an hour without leading zeroes (1 - 12).
    g: {
      calculation: 'h = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{1,2})',
    },
    // 24-hr format of an hour without leading zeroes (0 - 23).
    G: {
      calculation: 'h = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{1,2})',
    },
    // 12-hr format of an hour with leading zeroes (01 - 12).
    h: {
      calculation: 'h = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{2})',
    },
    // 24-hr format of an hour with leading zeroes (00 - 23).
    H: {
      calculation: 'h = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{2})',
    },
    // Minutes with leading zeros (00 - 59).
    i: {
      calculation: 'i = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{2})',
    },
    // Seconds with leading zeros (00 - 59).
    s: {
      calculation: 's = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '(\\d{2})',
    },
    // Decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
    u: {
      calculation: 'ms = results[{0}]; ms = parseInt(ms, 10) / Math.pow(10, ms.length - 3);\n',
      groupCount: 1,
      pattern: '(\\d+)',
    },

  /* Timezone: */
    e: NotImplementedButReserved,
    I: NotImplementedButReserved,
    // Difference to Greenwich time (GMT) in hours and minutes.  Example: +1030
    O: {
      calculation: 'tzo = results[{0}];\n',
      groupCount: 1,
      pattern: '([-+]\\d{4}|[zZ]|[-+]\\d{2})',
    },
    // Difference to Greenwich time (GMT) with colon between hours and minutes.  Example: -08:00
    P: {
      calculation: 'tzo = results[{0}];\n',
      groupCount: 1,
      pattern: '([-+]\\d{2}:\\d{2}|[zZ]|[-+]\\d{2})',
    },
    T: NotImplementedButReserved,
    Z: NotImplementedButReserved,

  /* Full Date/Time: */
    c: {
      calculation: 'type = "iso";\nc = this.__parseISO8601(results[{0}], strict);\n',
      groupCount: 1,
      pattern: '\\s*(.+)\\s*',
    },
    r: NotImplementedButReserved,
    // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
    U: {
      calculation: 'type = "sec";\nu = parseInt(results[{0}], 10);\n',
      groupCount: 1,
      pattern: '([-+]?\\d+)',
    },
  },
  /*
   * Cache of parser functions.  It is keyed by the date format they handle.
   */
  parserLut: {
    array(input, strict) {
      let dt, y, m, d, h, i, s, ms, tzo;

      y = input[0];
      m = input[1];
      d = input[2];
      h = input[3];
      i = input[4];
      s = input[5];
      ms = input[6];
      tzo = input[7];

      dt = __construct(y, m, d, h, i, s, ms, tzo, strict);

      return dt;
    },
    now(/* input, strict */) {
      return now();
    },
    struct(input, strict) {
      let dt, y, m, d, h, i, s, ms, tzo;

      if (typeOf(input) == 'object') {
        y = input.year;
        m = input.month;
        d = input.day;
        h = input.hours;
        i = input.minutes;
        s = input.seconds;
        ms = input.milliseconds;
        tzo = input.tzo === 0 || input.tzo ? input.tzo : null;

        dt = __construct(y, m, d, h, i, s, ms, tzo, strict);
      }

      return dt;
    },
    today(/* input, strict */) {
      return today();
    },
  },
  /*
   * Cache of the regular expression used by the parser functions.  It is keyed by the date format they handle.
   */
  regExpLut: {},
};

const __createParser = (function () {
  /*
   * Dependencies:
   * - Date.__construct
   *   + ...
   * - Date.__parse
   *   + ...
   * - String.escape
   * - String.merge
   */
  // Make a closure for efficiency.  That is, don't redefine following code template each time function is called.
  /*
   * The parser function's code template.
   *
   * A parser function has 2 parameters.
   *
   * 1) input: The string input to parse.
   * 2) string: A flag indicating whether date parsing is strict.  That is, only valid dates are allowed and
   *    JavaScript Date "rollover" will not be allowed.
   *
   * The parser code template expects 2 values.
   *
   * 1) The date format the parser handles. (Used to lookup the regular expression used to extract date/time
   *    information.)
   * 2) The JavaScript code that performs the calculations for the date/time information.  These use the results from
   *    the regular expression match.
   */
  /* eslint indent: "off" */
  const codeTemplate = [
    // function (input, strict) {
    'var c = null,',
      'u = null,',
      'dt, y, m, d, h, i, s, ms, regExp, results, type, tzo;',

    'regExp = this.__parse.regExpLut[\'{0}\'];',
    'results = String(input).match(regExp);', // Either `null` or an array of matched strings
    'if (results) {',
      '{1}', // The set of calculations.  These populate the c, u, or the y, m, d, h, i, s, ms, and tzo variables.
      'switch (type) {',
      'case "iso":',
        'dt = c;',
        'break;',
      'case "sec":',
        'if (u !== null) {',
          'dt = new Date(u * 1000);',
        '}',
        'break;',
      'default:',
        'dt = this.__construct(y, m, d, h, i, s, ms, tzo, strict);',
      '}',
    '}',

    'return dt;',
    // };
  ].join('\n');

  /*
   * @param {string} format - The date format from which to create a parser function.
   *
   * @returns {Function} The parser function for the specified date format.
   */
  return function (format) {
    const BACK_SLASH = '\\';
    let calcs = [],
        literal = false,
        regExp = [],
        code, groupCount, parseInfo, parser, resultsIdx, symbol;

    resultsIdx = 1; // The results of String#match(regExp) returns group references starting at index 1.
    for (let i = 0, iLen = format.length; i < iLen; ++i) {
      symbol = format.charAt(i);
      if (literal) {
        literal = false;
        regExp.push(escapeRegX(symbol));
      }
      else if (symbol == BACK_SLASH) {
        literal = true;
      }
      else {
        parseInfo = __parse.infoLut[symbol];
        if (parseInfo) {
          regExp.push(parseInfo.pattern);
          groupCount = parseInfo.groupCount || 0;
          if (groupCount) {
            calcs.push(mergeStr(parseInfo.calculation, resultsIdx));
            resultsIdx += groupCount;
          }
        }
        else {
          regExp.push(escapeRegX(symbol));
        }
      }
    }

    calcs = calcs.join('');
    // Any single-quotes or backslashes in the date format needs to be escaped since it becomes a string literal
    // in the code template.
    code = mergeStr(codeTemplate, [escapeStr(format), calcs]);
    regExp = new RegExp(`^${regExp.join('')}$`, 'i');
    // JSLint complains when we use `new Function` so the following is used instead.
    parser = Function.prototype.constructor(...['input', 'strict', code]);
    __parse.regExpLut[format] = regExp;
    __parse.parserLut[format] = parser;
    return parser;
  };
})();


// ==========================================================================
function __injectMissingIso8601Format(formatsIn) {
  let containsIso8601Format = false,
      wasInjected = false,
      format, formatsOut, i, iLen;

  formatsOut = formatsIn;

  for (i = 0, iLen = formatsIn.length; i < iLen; ++i) {
    format = formatsIn[i];
    if (format == 'c') {
      containsIso8601Format = true;
      break;
    }
  }

  if (!containsIso8601Format) {
    formatsOut = [];
    for (i = 0, iLen = formatsIn.length; i < iLen; ++i) {
      format = formatsIn[i];
      if (format == 'now' || format == 'today') {
        if (!wasInjected) {
          formatsOut.push('c');
          wasInjected = true;
        }
      }
      formatsOut.push(format);
    }
    if (!wasInjected) {
      formatsOut.push('c');
    }
  }
  return formatsOut;
}


// ==========================================================================
function __parseTimezoneOffset(tzoIn) {
  let results, sign, typeOfTzoIn, tzh, tzi, tzoOut;

  typeOfTzoIn = typeOf(tzoIn);
  if (typeOfTzoIn == 'undefined' || typeOfTzoIn === 'null') {
    return null;
  }
  if (typeOfTzoIn == 'number') {
    return tzoIn;
  }
  if (typeOfTzoIn == 'string') {
    tzoIn = tzoIn.toLowerCase();
    if (tzoIn == 'z') {
      tzoIn = '+0000';
    }
    else {
      tzoIn = tzoIn.replace(':', '');
    }
    if (tzoIn.length === 3) {
      tzoIn += '00';
    }
    results = tzoIn.match(TIMEZONE_OFFSET);
    if (results) {
      tzh = parseInt(results[1], 10);
      tzi = parseInt(results[2], 10);
      sign = tzh > 0 ? 1 : -1;
      tzoOut = ((MINUTES_IN_HOUR * Math.abs(tzh)) + tzi) * sign;
    }
  }
  return tzoOut;
}


// ==========================================================================
/*
 * Parses the most common ISO 8601 formatted strings.  The supported formats are the same formats recognized in
 * [the ES6 spec](http://www.ecma-international.org/ecma-262/6.0/#sec-date-time-string-format).
 */
function __parseISO8601(iso8601, strict) {
  /*
   * This may be a naive implementation but it seems to be plenty performant.
   */
  let d, dt, h, i, m, matches, ms, r, regexp, regexpInfo, rLen, s, tzo, y;

  for (r = 0, rLen = ISO8601_REGEXPS_LUT.length; r < rLen; ++r) {
    regexpInfo = ISO8601_REGEXPS_LUT[r];
    regexp = regexpInfo.regexp;
    matches = iso8601.match(regexp);
    if (matches) {
      y = matches[regexpInfo.y];
      m = matches[regexpInfo.m] || 1;
      d = matches[regexpInfo.d] || 1;
      h = matches[regexpInfo.h];
      i = matches[regexpInfo.i];
      s = matches[regexpInfo.s];
      ms = matches[regexpInfo.ms];
      if (ms) {
        ms = parseInt(ms, 10) / Math.pow(10, ms.length - 3);
      }
      tzo = matches[regexpInfo.tzo];
      dt = __construct(y, m, d, h, i, s, ms, tzo, strict);
      break;
    }
  }
  return dt;
}


// ==========================================================================
module.exports = DTE = {
  convert,
  toDate,
  /*
   * Not ready to expose the following but they are needed by the test specs.
   */
  __test__: {
    DAY,
    HOURS,
    MILLISECONDS,
    MINUTES,
    MONTH,
    SECONDS,
    YEAR,
    add,
    addTo,
    clearTime,
    clone,
    diff,
    getDaysInMonth,
    getFirstDateOfMonth,
    getLastDateOfMonth,
    toLastDateOfMonth,
    isLeapYear,
    isValid,
    now,
    today,
  },
};
