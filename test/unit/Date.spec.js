
/*
DST Transition Dates in most Timezones in the US for Select Years:

Starts:               Ends:
2000-04-02T02:00:00   2000-10-29T02:00:00
2001-04-01T02:00:00   2001-10-28T02:00:00
2002-04-07T02:00:00   2002-10-27T02:00:00
2003-04-06T02:00:00   2003-10-26T02:00:00
2004-04-04T02:00:00   2004-10-31T02:00:00
2005-04-03T02:00:00   2005-10-30T02:00:00
2006-04-02T02:00:00   2006-10-29T02:00:00
2007-03-11T02:00:00   2007-11-04T02:00:00
2008-03-09T02:00:00   2008-11-02T02:00:00
2009-03-08T02:00:00   2009-11-01T02:00:00
2010-03-14T02:00:00   2010-11-07T02:00:00
2011-03-13T02:00:00   2011-11-06T02:00:00
2012-03-11T02:00:00   2012-11-04T02:00:00
2013-03-10T02:00:00   2013-11-03T02:00:00
2014-03-09T02:00:00   2014-11-02T02:00:00
2015-03-08T02:00:00   2015-11-01T02:00:00
2016-03-13T02:00:00   2016-11-06T02:00:00
2017-03-12T02:00:00   2017-11-05T02:00:00

*/

(function (global) {

'use strict';

var moment, QC;

if (typeof require == 'function') {
  QC = require('../../');
  moment = require('moment');
}
else {
  QC = global.QC;
  moment = global.moment;
}

var Dte = QC.Dte;

Dte.DAY = Dte.__test__.DAY;
Dte.HOURS = Dte.__test__.HOURS;
Dte.MILLISECONDS = Dte.__test__.MILLISECONDS;
Dte.MINUTES = Dte.__test__.MINUTES;
Dte.MONTH = Dte.__test__.MONTH;
Dte.SECONDS = Dte.__test__.SECONDS;
Dte.YEAR = Dte.__test__.YEAR;
Dte.add = Dte.__test__.add;
Dte.clearTime = Dte.__test__.clearTime;
Dte.clone = Dte.__test__.clone;
Dte.diff = Dte.__test__.diff;
Dte.getDaysInMonth = Dte.__test__.getDaysInMonth;
Dte.getFirstDateOfMonth = Dte.__test__.getFirstDateOfMonth;
Dte.getLastDateOfMonth = Dte.__test__.getLastDateOfMonth;
Dte.isLeapYear = Dte.__test__.isLeapYear;
Dte.isValid = Dte.__test__.isValid;
Dte.now = Dte.__test__.now;
Dte.today = Dte.__test__.today;
Dte.toLastDateOfMonth = Dte.__test__.toLastDateOfMonth;


var americaAnchorageTz, americaChicagoTz, americaDenverTz, americaDetroitTz, americaJuneauTz, americaLosAngelesTz,
    americaNewYorkTz, americaNomeTz, americaPhoenixTz, pacificHonoluluTz, tzOffsetLut;

americaAnchorageTz = {
  name: "America/Anchorage",
  offset: 540
};

americaChicagoTz = {
  dst: true,
  name: "America/Chicago",
  offset: 360
};

americaDenverTz = {
  dst: true,
  name: "America/Denver",
  offset: 420
};

americaDetroitTz = {
  dst: true,
  name: "America/Detroit",
  offset: 300
};

americaJuneauTz = {
  name: "America/Juneau",
  offset: 540
};

americaNomeTz = {
  name: "America/Nome",
  offset: 540
};

americaLosAngelesTz = {
  dst: true,
  name: "America/Los_Angeles",
  offset: 480
};

americaNewYorkTz = {
  dst: true,
  name: "America/New_York",
  offset: 300
};

// TODO: Find out what the tz abbr is on linux and then add a mapping.  Watch out for ambiguities.
americaPhoenixTz = {
  name: "America/Phoenix",
  offset: 420
};

pacificHonoluluTz = {
  dst: false,
  name: "Pacific/Honolulu",
  offset: 600
};

tzOffsetLut = {
  240: {
    edt: [americaDetroitTz, americaNewYorkTz],
    "eastern daylight time": americaNewYorkTz,
    // "eastern standard time": americaNewYorkTz,
    // est: americaNewYorkTz,
  },
  300: {
    cdt: americaChicagoTz,
    "central daylight time": americaChicagoTz,
    "central standard time": americaChicagoTz, // This mapping is needed for FF 47 on Win 10 (other verions may be affected too.)
    // cst: americaChicagoTz,
    // edt: americaNewYorkTz,
    // "eastern daylight time": americaNewYorkTz,
    "eastern standard time": americaNewYorkTz,
    est: [americaDetroitTz, americaNewYorkTz],
  },
  360: {
    // cdt: americaChicagoTz,
    // "central daylight time": americaChicagoTz,
    "central standard time": americaChicagoTz,
    cst: americaChicagoTz,
    mdt: americaDenverTz,
    "mountain daylight time": americaDenverTz,
    "mountain standard time": americaDenverTz, // This mapping is needed for FF 47 on Win 8.1 (other verions may be affected too.)
    // mst: americaDenverTz,
  },
  420: {
    // mdt: americaDenverTz,
    // "mountain daylight time": americaDenverTz,
    "mountain standard time": americaDenverTz,
    mst: [americaDenverTz, americaPhoenixTz],
    "pacific daylight time": americaLosAngelesTz,
    "pacific standard time": americaLosAngelesTz, // This mapping is needed for FF 47 on Win 8.1 (other verions may be affected too.)
    pdt: americaLosAngelesTz,
    // pst: americaLosAngelesTz,
    "us mountain standard time": americaPhoenixTz,
  },
  480: {
    akdt: [americaAnchorageTz, americaJuneauTz, americaNomeTz],
    "alaskan daylight time": americaAnchorageTz,
    // "pacific daylight time": americaLosAngelesTz,
    "pacific standard time": americaLosAngelesTz,
    // pdt: americaLosAngelesTz,
    pst: americaLosAngelesTz,
  },
  540: {
    akst: [americaAnchorageTz, americaJuneauTz, americaNomeTz],
    "alaskan standard time": americaAnchorageTz,
  },
  600: {
    "hawaiian standard time": pacificHonoluluTz,
    hst: pacificHonoluluTz,
  },
};

function createDateFromArray(dateInfo, expectedTime, expectedTimezoneOffset) {
  var date, day, hours, milliseconds, minutes, month, seconds, year;

  year = dateInfo[0];
  month = dateInfo[1];
  day = dateInfo[2] || 1;
  hours = dateInfo[3] || 0;
  minutes = dateInfo[4] || 0;
  seconds = dateInfo[5] || 0;
  milliseconds = dateInfo[6] || 0;

  date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
  if (expectedTime || expectedTime === 0) {
    expect(date.getTime()).toBe(expectedTime);
  }
  if (expectedTimezoneOffset || expectedTimezoneOffset === 0) {
    expect(date.getTimezoneOffset()).toBe(expectedTimezoneOffset);
  }
  // Phantom JS (at least in v2.1.1) sometimes creates an unexpected date when created with the constructor using two
  // or more arguments.  It appears to happen in two different cases.  1) When the specified date is after the start of
  // DST up to the timezone offset minutes.  For example, in the America/Denver timezone, the timezone offset is 420
  // minutes from UTC.  In 2016, DST starts on March 13th at 02:00.  If you specify a time between the start of DST up
  // to 420 minutes later (09:00), then the created date will not be as expected.  It is known that the value returned
  // from date#getHours will be off by one.  2) When the specified date is after the end of DST up to the DST timezone
  // offset minutes.  For example, in the America/Denver timezone, the timezone offset during DST is 360 minutes from
  // UTC.  In 2016, DST ends on Nov 6th at 02:00.  If you specify a time between the end of DST up to 360 minutes later
  // (08:00), then the created date will not be as expected.  It is known that the value returned from date#getHours
  // will be off by one.
  //
  // The following expects that the date parts returned by the created date should have the same date part
  // values as specified.
  expect(date.getFullYear()).toBe(year);
  expect(date.getMonth()).toBe(month);
  expect(date.getDate()).toBe(day);
  expect(date.getHours()).toBe(hours);
  expect(date.getMinutes()).toBe(minutes);
  expect(date.getSeconds()).toBe(seconds);
  expect(date.getMilliseconds()).toBe(milliseconds);
  return date;
}

function guessCurrentTimezone(debug) {
  var now = new Date(),
      tz = null,
      tzAbbr, tzAbbrKey, tzAbbrLut, tzOffsetKey;

  tzOffsetKey = '' + now.getTimezoneOffset();
  if (debug) {
    console.log('tzOffsetKey: ' + tzOffsetKey);
  }
  if (tzOffsetKey in tzOffsetLut) {
    tzAbbrLut = tzOffsetLut[tzOffsetKey];
    tzAbbr = _extractTzAbbrFrom(now);
    if (debug) {
      console.log('tzAbbr: ' + tzAbbr);
    }
    if (tzAbbr) {
      tzAbbrKey = tzAbbr.toLowerCase();
      if (tzAbbrKey in tzAbbrLut) {
        tz = tzAbbrLut[tzAbbrKey];
      }
    }
  }
  return tz;
}

function _extractTzAbbrFrom(dt) {
  var dtAsStr = dt.toString(),
      tzAbbr = null,
      results;

  results = dtAsStr.match(/GMT[+-]\d{4} \(([a-zA-Z ()]+)\)/);

  if (results && results.length === 2) {
    tzAbbr = results[1];
  }
  return tzAbbr;
}


describe('QC.Dte', function () {
  var expectToBeNow, expectToBeToday;

  beforeEach(function () {
    expectToBeNow = function (date) {
      var now = new Date();
      expect(date.getFullYear()).toBeCloseTo(now.getFullYear(), 1);
      expect(date.getMonth()).toBeCloseTo(now.getMonth(), 1);
      expect(date.getDate()).toBeCloseTo(now.getDate(), 1);
      expect(date.getHours()).toBeCloseTo(now.getHours(), 1);
      expect(date.getMinutes()).toBeCloseTo(now.getMinutes(), 1);
      expect(date.getSeconds()).toBeCloseTo(now.getSeconds(), 1);
    };
    expectToBeToday = function (date) {
      var today = new Date();
      expect(date.getFullYear()).toBeCloseTo(today.getFullYear(), 1);
      expect(date.getMonth()).toBeCloseTo(today.getMonth(), 1);
      expect(date.getDate()).toBeCloseTo(today.getDate(), 1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    };
  });

  describe('.add', function () {

    it('called with anything but a Date instance should return input value', function () {
      var date;

      date = Dte.add(undefined);
      expect(date).toBeUndefined();

      date = Dte.add(null);
      expect(date).toBeNull();

      date = Dte.add(true);
      expect(date).toBe(true);

      date = Dte.add(false);
      expect(date).toBe(false);

      date = Dte.add(0);
      expect(date).toBe(0);

      date = Dte.add(1);
      expect(date).toBe(1);

      date = Dte.add('');
      expect(date).toBe('');

      date = Dte.add('foo');
      expect(date).toBe('foo');
    });

    it('should add/subtract years that cause a DST change while maintaining the same non-year date parts', function () {
      var guessedTz = guessCurrentTimezone(),
          date, startDate, timezoneOffset, yr;

      if (!guessedTz) {
        expect(true).toBe(false);
      }

      if (guessedTz.name == 'America/Los_Angeles') {
        // NOTE: DST Starts on March 9th at 02:00 in 2014

        // STD to DST
        date = createDateFromArray([2014, 2, 8, 14], 1394316000000, 480);
        date = Dte.add(date, Dte.YEAR, 1);
        expect(date.getTime()).toBe(1425848400000);
        expect(date.getTimezoneOffset()).toBe(420);
        expect(date.getFullYear()).toBe(2015);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(8);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // DST to STD
        date = createDateFromArray([2014, 2, 12, 14], 1394658000000, 420);
        date = Dte.add(date, Dte.YEAR, 2);
        expect(date.getTime()).toBe(1457820000000);
        expect(date.getTimezoneOffset()).toBe(480);
        expect(date.getFullYear()).toBe(2016);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Ends on Nov 2nd at 02:00 in 2014

        // DST to STD
        date = createDateFromArray([2014, 10, 1, 14], 1414875600000, 420);
        date = Dte.add(date, Dte.YEAR, 1);
        expect(date.getTime()).toBe(1446415200000);
        expect(date.getTimezoneOffset()).toBe(480);
        expect(date.getFullYear()).toBe(2015);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(1);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // STD to DST
        date = createDateFromArray([2014, 10, 2, 14], 1414965600000, 480);
        date = Dte.add(date, Dte.YEAR, -3);
        expect(date.getTime()).toBe(1320267600000);
        expect(date.getTimezoneOffset()).toBe(420);
        expect(date.getFullYear()).toBe(2011);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(2);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Starts on March 8th at 02:00 in 2015

        // DST to STD
        date = createDateFromArray([2015, 2, 8, 14], 1425848400000, 420);
        date = Dte.add(date, Dte.YEAR, -1);
        expect(date.getTime()).toBe(1394316000000);
        expect(date.getTimezoneOffset()).toBe(480);
        expect(date.getFullYear()).toBe(2014);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(8);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Ends on Nov 1st at 02:00 in 2015

        // STD to DST
        date = createDateFromArray([2015, 10, 1, 14], 1446415200000, 480);
        date = Dte.add(date, Dte.YEAR, -1);
        expect(date.getTime()).toBe(1414875600000);
        expect(date.getTimezoneOffset()).toBe(420);
        expect(date.getFullYear()).toBe(2014);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(1);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Starts on March 13th at 02:00 in 2016

        // STD to DST
        date = createDateFromArray([2016, 2, 12, 14], 1457820000000, 480);
        date = Dte.add(date, Dte.YEAR, 1);
        expect(date.getTime()).toBe(1489352400000);
        expect(date.getTimezoneOffset()).toBe(420);
        expect(date.getFullYear()).toBe(2017);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Ends on Nov 6th at 02:00 in 2016

        // STD to DST
        date = createDateFromArray([2016, 10, 6, 14], 1478469600000, 480);
        date = Dte.add(date, Dte.YEAR, -6);
        expect(date.getTime()).toBe(1289077200000);
        expect(date.getTimezoneOffset()).toBe(420);
        expect(date.getFullYear()).toBe(2010);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(6);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Starts on March 12th at 02:00 in 2017

        // DST to STD
        date = createDateFromArray([2017, 2, 12, 14], 1489352400000, 420);
        date = Dte.add(date, Dte.YEAR, -1);
        expect(date.getTime()).toBe(1457820000000);
        expect(date.getTimezoneOffset()).toBe(480);
        expect(date.getFullYear()).toBe(2016);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);
      }
      else if (guessedTz.name == 'America/Denver') {
        // NOTE: DST Starts on March 9th at 02:00 in 2014

        // STD to DST
        date = createDateFromArray([2014, 2, 8, 9], 1394294400000, 420);
        date = Dte.add(date, Dte.YEAR, 1);
        expect(date.getTime()).toBe(1425826800000);
        expect(date.getTimezoneOffset()).toBe(360);
        expect(date.getFullYear()).toBe(2015);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(8);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // DST to STD
        date = createDateFromArray([2014, 2, 12, 7], 1394629200000, 360);
        date = Dte.add(date, Dte.YEAR, 2);
        expect(date.getTime()).toBe(1457791200000);
        expect(date.getTimezoneOffset()).toBe(420);
        expect(date.getFullYear()).toBe(2016);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(7);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Ends on Nov 2nd at 02:00 in 2014

        // DST to STD
        date = createDateFromArray([2014, 10, 1, 8], 1414850400000, 360);
        date = Dte.add(date, Dte.YEAR, 1);
        expect(date.getTime()).toBe(1446390000000);
        expect(date.getTimezoneOffset()).toBe(420);
        expect(date.getFullYear()).toBe(2015);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(1);
        expect(date.getHours()).toBe(8);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // STD to DST
        date = createDateFromArray([2014, 10, 2, 9], 1414944000000, 420);
        date = Dte.add(date, Dte.YEAR, -3);
        expect(date.getTime()).toBe(1320246000000);
        expect(date.getTimezoneOffset()).toBe(360);
        expect(date.getFullYear()).toBe(2011);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(2);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Starts on March 8th at 02:00 in 2015

        // DST to STD
        date = createDateFromArray([2015, 2, 8, 9], 1425826800000, 360);
        date = Dte.add(date, Dte.YEAR, -1);
        expect(date.getTime()).toBe(1394294400000);
        expect(date.getTimezoneOffset()).toBe(420);
        expect(date.getFullYear()).toBe(2014);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(8);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Ends on Nov 1st at 02:00 in 2015

        // STD to DST
        date = createDateFromArray([2015, 10, 1, 9], 1446393600000, 420);
        date = Dte.add(date, Dte.YEAR, -1);
        expect(date.getTime()).toBe(1414854000000);
        expect(date.getTimezoneOffset()).toBe(360);
        expect(date.getFullYear()).toBe(2014);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(1);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Starts on March 13th at 02:00 in 2016

        // STD to DST
        date = createDateFromArray([2016, 2, 12, 9], 1457798400000, 420);
        date = Dte.add(date, Dte.YEAR, 1);
        expect(date.getTime()).toBe(1489330800000);
        expect(date.getTimezoneOffset()).toBe(360);
        expect(date.getFullYear()).toBe(2017);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Ends on Nov 6th at 02:00 in 2016

        // STD to DST
        date = createDateFromArray([2016, 10, 6, 9], 1478448000000, 420);
        date = Dte.add(date, Dte.YEAR, -6);
        expect(date.getTime()).toBe(1289055600000);
        expect(date.getTimezoneOffset()).toBe(360);
        expect(date.getFullYear()).toBe(2010);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(6);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Starts on March 12th at 02:00 in 2017

        // DST to STD
        date = createDateFromArray([2017, 2, 12, 9], 1489330800000, 360);
        date = Dte.add(date, Dte.YEAR, -1);
        expect(date.getTime()).toBe(1457798400000);
        expect(date.getTimezoneOffset()).toBe(420);
        expect(date.getFullYear()).toBe(2016);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);
      }
      else if (guessedTz.name == 'America/Chicago') {
        // NOTE: DST Starts on March 9th at 02:00 in 2014

        // STD to DST
        date = createDateFromArray([2014, 2, 8, 9], 1394290800000, 360);
        date = Dte.add(date, Dte.YEAR, 1);
        expect(date.getTime()).toBe(1425823200000);
        expect(date.getTimezoneOffset()).toBe(300);
        expect(date.getFullYear()).toBe(2015);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(8);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // DST to STD
        date = createDateFromArray([2014, 2, 12, 7], 1394625600000, 300);
        date = Dte.add(date, Dte.YEAR, 2);
        expect(date.getTime()).toBe(1457787600000);
        expect(date.getTimezoneOffset()).toBe(360);
        expect(date.getFullYear()).toBe(2016);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(7);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Ends on Nov 2nd at 02:00 in 2014

        // DST to STD
        date = createDateFromArray([2014, 10, 1, 7], 1414843200000, 300);
        date = Dte.add(date, Dte.YEAR, 1);
        expect(date.getTime()).toBe(1446382800000);
        expect(date.getTimezoneOffset()).toBe(360);
        expect(date.getFullYear()).toBe(2015);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(1);
        expect(date.getHours()).toBe(7);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // STD to DST
        date = createDateFromArray([2014, 10, 2, 9], 1414940400000, 360);
        date = Dte.add(date, Dte.YEAR, -3);
        expect(date.getTime()).toBe(1320242400000);
        expect(date.getTimezoneOffset()).toBe(300);
        expect(date.getFullYear()).toBe(2011);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(2);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Starts on March 8th at 02:00 in 2015

        // DST to STD
        date = createDateFromArray([2015, 2, 8, 9], 1425823200000, 300);
        date = Dte.add(date, Dte.YEAR, -1);
        expect(date.getTime()).toBe(1394290800000);
        expect(date.getTimezoneOffset()).toBe(360);
        expect(date.getFullYear()).toBe(2014);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(8);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Ends on Nov 1st at 02:00 in 2015

        // STD to DST
        date = createDateFromArray([2015, 10, 1, 9], 1446390000000, 360);
        date = Dte.add(date, Dte.YEAR, -1);
        expect(date.getTime()).toBe(1414850400000);
        expect(date.getTimezoneOffset()).toBe(300);
        expect(date.getFullYear()).toBe(2014);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(1);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Starts on March 13th at 02:00 in 2016

        // STD to DST
        date = createDateFromArray([2016, 2, 12, 9], 1457794800000, 360);
        date = Dte.add(date, Dte.YEAR, 1);
        expect(date.getTime()).toBe(1489327200000);
        expect(date.getTimezoneOffset()).toBe(300);
        expect(date.getFullYear()).toBe(2017);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Ends on Nov 6th at 02:00 in 2016

        // STD to DST
        date = createDateFromArray([2016, 10, 6, 9], 1478444400000, 360);
        date = Dte.add(date, Dte.YEAR, -6);
        expect(date.getTime()).toBe(1289052000000);
        expect(date.getTimezoneOffset()).toBe(300);
        expect(date.getFullYear()).toBe(2010);
        expect(date.getMonth()).toBe(10);
        expect(date.getDate()).toBe(6);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);

        // NOTE: DST Starts on March 12th at 02:00 in 2017

        // DST to STD
        date = createDateFromArray([2017, 2, 12, 9], 1489327200000, 300);
        date = Dte.add(date, Dte.YEAR, -1);
        expect(date.getTime()).toBe(1457794800000);
        expect(date.getTimezoneOffset()).toBe(360);
        expect(date.getFullYear()).toBe(2016);
        expect(date.getMonth()).toBe(2);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(9);
        expect(date.getMinutes()).toBe(0);
        expect(date.getSeconds()).toBe(0);
        expect(date.getMilliseconds()).toBe(0);
      }
      else {
        expect(true).toBe(false);
      }
    });

    it('should add/subtract years', function () {
      var date;

      date = Dte.add(createDateFromArray([2016, 6, 1, 12, 34, 56, 789]), Dte.YEAR, 0);
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);

      date = Dte.add(createDateFromArray([1976, 2, 12, 3]), Dte.YEAR, 1);
      expect(date.getFullYear()).toBe(1977);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 2, 12, 12]), Dte.YEAR, 30);
      expect(date.getFullYear()).toBe(2006);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 2, 12, 3]), Dte.YEAR, -30);
      expect(date.getFullYear()).toBe(1946);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 1, 2]), Dte.YEAR, 1);
      expect(date.getFullYear()).toBe(1977);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(2);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 1, 2]), Dte.YEAR, 2);
      expect(date.getFullYear()).toBe(1978);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(2);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 1, 2]), Dte.YEAR, 3);
      expect(date.getFullYear()).toBe(1979);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(2);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 1, 2]), Dte.YEAR, 4);
      expect(date.getFullYear()).toBe(1980);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(2);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('should add/subtract months', function () {
      var date;

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.MONTH, 0);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.MONTH, 15);
      expect(date.getFullYear()).toBe(2001); // Year rolls over.
      expect(date.getMonth()).toBe(3);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.MONTH, -15);
      expect(date.getFullYear()).toBe(1998); // Year rolls under.
      expect(date.getMonth()).toBe(9);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('should add/substract months and adjust days as necessary', function () {
      var date;

      date = Dte.add(createDateFromArray([1976, 0, 31]), Dte.MONTH, 1);
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(29); // February in 1976 only has 29 days -- not 31.
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 2, 29]), Dte.MONTH, -13);
      expect(date.getFullYear()).toBe(1975);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(28); // February in 1975 only has 28 days -- not 29.
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 0, 28]), Dte.MONTH, 25);
      expect(date.getFullYear()).toBe(1978);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(28); // February in 1978 only has 28 days.
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 0, 29]), Dte.MONTH, 25);
      expect(date.getFullYear()).toBe(1978);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(28); // February in 1978 only has 28 days -- not 29.
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 0, 30]), Dte.MONTH, 25);
      expect(date.getFullYear()).toBe(1978);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(28); // February in 1978 only has 28 days -- not 30.
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([1976, 0, 31]), Dte.MONTH, 25);
      expect(date.getFullYear()).toBe(1978);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(28); // February in 1978 only has 28 days -- not 31.
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('should add/subtract days', function () {
      var date;

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.DAY, 0);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.DAY, 15);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(16);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.DAY, -15);
      expect(date.getFullYear()).toBe(1999); // Year rolls under.
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(17);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 365 days on leap year before leap day should be 1 day shy of 1 year out.
      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.DAY, 365);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 366 days on leap year before leap day should be 1 year out.
      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.DAY, 366);
      expect(date.getFullYear()).toBe(2001);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 365 days on leap year after leap day should be 1 year out.
      date = Dte.add(createDateFromArray([2000, 2, 12]), Dte.DAY, 365);
      expect(date.getFullYear()).toBe(2001);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 365 days on year before leap year before 'leap day' should be 1 year out.
      date = Dte.add(createDateFromArray([1999, 0, 1]), Dte.DAY, 365);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 365 days on year before leap year after 'leap day' should be 1 day shy of 1 year out.
      date = Dte.add(createDateFromArray([1999, 2, 12]), Dte.DAY, 365);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(11); // 1 day shy.
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Subtract 365 days on leap year before leap day should be 1 year back.
      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.DAY, -365);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Subtract 365 days on leap year after leap day should be 1 day shy of 1 year back.
      date = Dte.add(createDateFromArray([2000, 3, 12]), Dte.DAY, -365);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(3);
      expect(date.getDate()).toBe(13); // 1 day shy.
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('should add/subtract hours', function () {
      var date;

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.HOURS, 0);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.HOURS, 15);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(15);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 24 hours should be 1 day out.
      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.HOURS, 24);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(2);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 24 hours to Feb 28th during leap year should be Feb 29th.
      date = Dte.add(createDateFromArray([2000, 1, 28, 13]), Dte.HOURS, 24);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(29);
      expect(date.getHours()).toBe(13);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 24 hours to Feb 28th during non-leap year should be March 1st.
      date = Dte.add(createDateFromArray([2001, 1, 28, 13]), Dte.HOURS, 24);
      expect(date.getFullYear()).toBe(2001);
      expect(date.getMonth()).toBe(2); // Month rolls over.
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(13);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 24 hours to Feb 29th during leap year should be March 1st.
      date = Dte.add(createDateFromArray([2000, 1, 29, 13]), Dte.HOURS, 24);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(2); // Month rolls over.
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(13);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 24 * 365 hours on leap year before leap day should be 1 day shy of 1 year out.
      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.HOURS, 24 * 365);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      // Add 24 * 366 hours on leap year before leap day should be 1 year out.
      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.HOURS, 24 * 366);
      expect(date.getFullYear()).toBe(2001);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.HOURS, -15);
      expect(date.getFullYear()).toBe(1999); // Year rolls under.
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(9);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('should add/subtract minutes', function () {
      var date;

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.MINUTES, 0);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(2);
      expect(date.getMinutes()).toBe(3);
      expect(date.getSeconds()).toBe(4);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.MINUTES, 59);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(2);
      expect(date.getSeconds()).toBe(4);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.MINUTES, 60);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(3);
      expect(date.getSeconds()).toBe(4);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.MINUTES, 61);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(4);
      expect(date.getSeconds()).toBe(4);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.MINUTES, -59);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(23);
      expect(date.getMinutes()).toBe(1);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.MINUTES, -60);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(23);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.MINUTES, -61);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(22);
      expect(date.getMinutes()).toBe(59);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('should add/subtract seconds', function () {
      var date;

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.SECONDS, 0);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(2);
      expect(date.getMinutes()).toBe(3);
      expect(date.getSeconds()).toBe(4);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.SECONDS, 59);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(2);
      expect(date.getMinutes()).toBe(4);
      expect(date.getSeconds()).toBe(3);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.SECONDS, 60);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(2);
      expect(date.getMinutes()).toBe(4);
      expect(date.getSeconds()).toBe(4);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.SECONDS, 61);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(2);
      expect(date.getMinutes()).toBe(4);
      expect(date.getSeconds()).toBe(5);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.SECONDS, -59);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(23);
      expect(date.getMinutes()).toBe(59);
      expect(date.getSeconds()).toBe(1);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.SECONDS, -60);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(23);
      expect(date.getMinutes()).toBe(59);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.SECONDS, -61);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(23);
      expect(date.getMinutes()).toBe(58);
      expect(date.getSeconds()).toBe(59);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('should add/subtract milliseconds', function () {
      var date;

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.MILLISECONDS, 0);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(2);
      expect(date.getMinutes()).toBe(3);
      expect(date.getSeconds()).toBe(4);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.MILLISECONDS, 100);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(2);
      expect(date.getMinutes()).toBe(3);
      expect(date.getSeconds()).toBe(4);
      expect(date.getMilliseconds()).toBe(105);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.MILLISECONDS, 1000);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(2);
      expect(date.getMinutes()).toBe(3);
      expect(date.getSeconds()).toBe(5);
      expect(date.getMilliseconds()).toBe(5);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.MILLISECONDS, 1100);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(2);
      expect(date.getMinutes()).toBe(3);
      expect(date.getSeconds()).toBe(5);
      expect(date.getMilliseconds()).toBe(105);

      date = Dte.add(createDateFromArray([2000, 0, 1, 2, 3, 4, 5]), Dte.MILLISECONDS, 111111111111);
      expect(date.getFullYear()).toBe(2003);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(10);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(14);
      expect(date.getSeconds()).toBe(55);
      expect(date.getMilliseconds()).toBe(116);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.MILLISECONDS, -100);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(23);
      expect(date.getMinutes()).toBe(59);
      expect(date.getSeconds()).toBe(59);
      expect(date.getMilliseconds()).toBe(900);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.MILLISECONDS, -1000);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(23);
      expect(date.getMinutes()).toBe(59);
      expect(date.getSeconds()).toBe(59);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.add(createDateFromArray([2000, 0, 1]), Dte.MILLISECONDS, -1100);
      expect(date.getFullYear()).toBe(1999);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(23);
      expect(date.getMinutes()).toBe(59);
      expect(date.getSeconds()).toBe(58);
      expect(date.getMilliseconds()).toBe(900);
    });

    it('should handle crossing day light savings correctly', function () {
      var ONE_HR_MS = 60 * 60 * 1000,
          HALF_HR_MS = 30 * 60 * 1000,
          guessedTz = guessCurrentTimezone(),
          dst, std;

      if (!guessedTz) {
        expect(true).toBe(false);
      }

      if (guessedTz.name == 'America/Chicago' || guessedTz.name == 'America/Denver' || guessedTz.name == 'America/Los_Angeles') {
        std = createDateFromArray([2015, 2, 8, 1, 30, 0]);
        // 'Native addition'
        dst = new Date(std.getTime() + ONE_HR_MS);

        expect(dst.getFullYear()).toBe(2015);
        expect(dst.getMonth()).toBe(2);
        expect(dst.getDate()).toBe(8);
        expect(dst.getHours()).toBe(3);
        expect(dst.getMinutes()).toBe(30);
        expect(dst.getSeconds()).toBe(0);
        expect(dst.getMilliseconds()).toBe(0);

        // Should give same result as 'native addition'.
        dst = Dte.add(std, Dte.MILLISECONDS, ONE_HR_MS);

        expect(dst.getFullYear()).toBe(2015);
        expect(dst.getMonth()).toBe(2);
        expect(dst.getDate()).toBe(8);
        expect(dst.getHours()).toBe(3);
        expect(dst.getMinutes()).toBe(30);
        expect(dst.getSeconds()).toBe(0);
        expect(dst.getMilliseconds()).toBe(0);


        dst = createDateFromArray([2015, 10, 1, 1, 30, 0]);
        // 'Native addition'
        std = new Date(dst.getTime() + ONE_HR_MS);

        expect(std.getFullYear()).toBe(2015);
        expect(std.getMonth()).toBe(10);
        expect(std.getDate()).toBe(1);
        expect(std.getHours()).toBe(1);
        expect(std.getMinutes()).toBe(30);
        expect(std.getSeconds()).toBe(0);
        expect(std.getMilliseconds()).toBe(0);

        // Should give same result as 'native addition'.
        std = Dte.add(dst, Dte.MILLISECONDS, ONE_HR_MS);

        expect(std.getFullYear()).toBe(2015);
        expect(std.getMonth()).toBe(10);
        expect(std.getDate()).toBe(1);
        expect(std.getHours()).toBe(1);
        expect(std.getMinutes()).toBe(30);
        expect(std.getSeconds()).toBe(0);
        expect(std.getMilliseconds()).toBe(0);


        dst = createDateFromArray([2015, 10, 1, 1, 30, 0]);
        // 'Native addition'
        std = new Date(dst.getTime() + HALF_HR_MS);

        expect(std.getFullYear()).toBe(2015);
        expect(std.getMonth()).toBe(10);
        expect(std.getDate()).toBe(1);
        expect(std.getHours()).toBe(1);
        expect(std.getMinutes()).toBe(0);
        expect(std.getSeconds()).toBe(0);
        expect(std.getMilliseconds()).toBe(0);

        // Should give same result as 'native addition'.
        std = Dte.add(dst, Dte.MILLISECONDS, HALF_HR_MS);

        expect(std.getFullYear()).toBe(2015);
        expect(std.getMonth()).toBe(10);
        expect(std.getDate()).toBe(1);
        expect(std.getHours()).toBe(1);
        expect(std.getMinutes()).toBe(0);
        expect(std.getSeconds()).toBe(0);
        expect(std.getMilliseconds()).toBe(0);
      }
      else {
        expect(true).toBe(false);
      }

    });

  });

  describe('.clearTime', function () {

    it('should clear the time', function () {
      var date, dt, y, m, d, h, i;

      date = createDateFromArray([2000, 4, 1, 13, 14, 7]);
      Dte.clearTime(date);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(4);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    // it('SHOULD', function () {
    //   var date, dt, y, m, d, h, i;
    //   // The following creates a date for every hour from the beginning of 2007 to the end of 2009.  In between this date range
    //   // exists a leap-year and several day-light savings changes.  It takes about 10 seconds to run (hence why it is commented
    //   // out) and none of these dates seems to necessitate DST corrections in clearTime.  Therefore, no DST correction is in the
    //   // code.
    //   for (y = 2007; y < 2010; ++y) {
    //     for (m = 0; m < 12; ++m) {
    //       for (d = 1; d < 32; ++d) {
    //         if (Dte.isValid(y, m, d)) {
    //           for (h = 0; h < 24; ++h) {
    //             date = Dte.clearTime(new Date(y, m, d, h, 2, 3));
    //             expect(date.getFullYear()).toBe(y);
    //             expect(date.getMonth()).toBe(m);
    //             expect(date.getDate()).toBe(d);
    //             expect(date.getHours()).toBe(0);
    //             expect(date.getMinutes()).toBe(0);
    //             expect(date.getSeconds()).toBe(0);
    //             expect(date.getMilliseconds()).toBe(0);
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

  });

  describe('.clone', function () {

    it('called with `undefined` should return `undefined`', function () {
      var clone = Dte.clone(undefined);

      expect(clone).toBeUndefined();
    });

    it('called with `null` should return `null`', function () {
      var clone = Dte.clone(null);

      expect(clone).toBeNull();
    });

    it('called with empty string should return empty string', function () {
      var clone = Dte.clone('');

      expect(clone).toBe('');
    });

    it('called with `0` should return `0`', function () {
      var clone = Dte.clone(0);

      expect(clone).toBe(0);
    });

    it('called with `true` should return `true`', function () {
      var clone = Dte.clone(true);

      expect(clone).toBe(true);
    });

    it('called with `false` should return `false`', function () {
      var clone = Dte.clone(false);

      expect(clone).toBe(false);
    });

    it('should return a new date representing the same date and time', function () {
      var clone, date;

      date = createDateFromArray([2001, 8, 11, 7, 45, 23, 729]);

      clone = Dte.clone(date);

      expect(clone instanceof Object).toBe(true);
      expect(clone instanceof Date).toBe(true);
      expect(date === clone).not.toBe(true); // Should not be same reference.
      expect(date).toEqual(clone);
      expect(clone).toEqual(date);
      expect(clone.getFullYear()).toEqual(2001);
      expect(clone.getMonth()).toEqual(8);
      expect(clone.getDate()).toEqual(11);
      expect(clone.getHours()).toEqual(7);
      expect(clone.getMinutes()).toEqual(45);
      expect(clone.getSeconds()).toEqual(23);
      expect(clone.getMilliseconds()).toEqual(729);
    });

  });

  describe('.convert', function () {

    it('called with `undefined` input should return default value', function () {
      expect(Dte.convert(undefined)).toBeNull();
      expect(Dte.convert(undefined, { def: null })).toBeNull();
      expect(Dte.convert(undefined, { def: undefined })).toBeUndefined();
      expectToBeNow(Dte.convert(undefined, { def: 'now' }));
      expectToBeToday(Dte.convert(undefined, { def: 'today' }));
    });

    it('called with `null` input should return default value', function () {
      expect(Dte.convert(null)).toBeNull();
      expect(Dte.convert(null, { def: null })).toBeNull();
      expect(Dte.convert(null, { def: undefined })).toBeUndefined();
      expectToBeNow(Dte.convert(null, { def: 'now' }));
      expectToBeToday(Dte.convert(null, { def: 'today' }));
    });

    it('called with `false` input should return default value', function () {
      expect(Dte.convert(false)).toBeNull();
      expect(Dte.convert(false, { def: null })).toBeNull();
      expect(Dte.convert(false, { def: undefined })).toBeUndefined();
      expectToBeNow(Dte.convert(false, { def: 'now' }));
      expectToBeToday(Dte.convert(false, { def: 'today' }));
    });

    it('called with `true` input should return default value', function () {
      expect(Dte.convert(true)).toBeNull();
      expect(Dte.convert(true, { def: null })).toBeNull();
      expect(Dte.convert(true, { def: undefined })).toBeUndefined();
      expectToBeNow(Dte.convert(true, { def: 'now' }));
      expectToBeToday(Dte.convert(true, { def: 'today' }));
    });

    it('called with empty string input should return default value', function () {
      expect(Dte.convert('')).toBeNull();
      expect(Dte.convert('', { def: null })).toBeNull();
      expect(Dte.convert('', { def: undefined })).toBeUndefined();
      expectToBeNow(Dte.convert('', { def: 'now' }));
      expectToBeToday(Dte.convert('', { def: 'today' }));
    });

    it('called with date input should return the date', function () {
      var date = new Date();

      date = Dte.convert(date, {});
      expect(date).toBe(date);
    });

    it('called with a number input should return the date', function () {
      var date, input;

      input = 946684800000;
      date = Dte.convert(input);
      expect(date).toBeDefined();
      expect(date.getUTCFullYear()).toBe(2000);
      expect(date.getUTCMonth()).toBe(0);
      expect(date.getUTCDate()).toBe(1);
      expect(date.getUTCHours()).toBe(0);
      expect(date.getUTCMinutes()).toBe(0);
      expect(date.getUTCSeconds()).toBe(0);
      expect(date.getUTCMilliseconds()).toBe(0);
    });

    it('called with a complete date-like array literal input should return the date', function () {
      var date;

      date = Dte.convert([1976, 3, 12, 3, 15, 45, 999], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(15);
      expect(date.getSeconds()).toBe(45);
      expect(date.getMilliseconds()).toBe(999);
    });

    it('called with a date-like array literal input missing the milliseconds should return the date with milliseconds set to 0', function () {
      var date;

      date = Dte.convert([2016, 7, 12, 12, 34, 56], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the seconds should return the date with seconds set to 0', function () {
      var date;

      date = Dte.convert([2016, 7, 12, 12, 34, undefined, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes should return the date with minutes set to 0', function () {
      var date;

      date = Dte.convert([2016, 7, 12, 12, undefined, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the hours should return the date with hours set to 0', function () {
      var date;

      date = Dte.convert([2016, 7, 12, undefined, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the day should return the date with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert([2016, 7, undefined, 12, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the month should return the date with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert([2016, undefined, 12, 12, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the year should return the date with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert([undefined, 7, 12, 12, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the milliseconds and seconds should return the date with milliseconds and seconds set to 0', function () {
      var date, input;

      input = [2016, 7, 12, 12, 34, undefined, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, 12, 34, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, 12, 34];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds and minutes should return the date with milliseconds and minutes set to 0', function () {
      var date, input;

      input = [2016, 7, 12, 12, undefined, 56, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, 12, undefined, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds and hours should return the date with milliseconds and hours set to 0', function () {
      var date, input;

      input = [2016, 7, 12, undefined, 34, 56, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, undefined, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds and day should return the date with milliseconds set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, 12, 34, 56, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, 12, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds and month should return the date with milliseconds set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, 12, 34, 56, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, 12, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds and year should return the date with milliseconds set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, 12, 34, 56, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, 12, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the seconds and minutes should return the date with seconds and minutes set to 0', function () {
      var date;

      date = Dte.convert([2016, 7, 12, 12, undefined, undefined, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds and hours should return the date with seconds and hours set to 0', function () {
      var date;

      date = Dte.convert([2016, 7, 12, undefined, 34, undefined, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds and day should return the date with seconds set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert([2016, 7, undefined, 12, 34, undefined, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds and month should return the date with seconds set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert([2016, undefined, 12, 12, 34, undefined, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds and year should return the date with seconds set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert([undefined, 7, 12, 12, 34, undefined, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes and hours should return the date with minutes and hours set to 0', function () {
      var date;

      date = Dte.convert([2016, 7, 12, undefined, undefined, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes and day should return the date with minutes set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert([2016, 7, undefined, 12, undefined, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes and month should return the date with minutes set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert([2016, undefined, 12, 12, undefined, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes and year should return the date with minutes set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert([undefined, 7, 12, 12, undefined, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the hours and day should return the date with hours set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert([2016, 7, undefined, undefined, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the hours and month should return the date with hours set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert([2016, undefined, 12, undefined, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the hours and year should return the date with hours set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert([undefined, 7, 12, undefined, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the day and month should return the date with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert([2016, undefined, undefined, 12, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the day and year should return the date with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert([undefined, 7, undefined, 12, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the month and year should return the date with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert([undefined, undefined, 12, 12, 34, 56, 789], {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the milliseconds, seconds, and minutes should return the date with milliseconds, seconds, and minutes set to 0', function () {
      var date, input;

      input = [2016, 7, 12, 12, undefined, undefined, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, 12, undefined, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, 12, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, 12];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, seconds, and hours should return the date with milliseconds, seconds, and hours set to 0', function () {
      var date, input;

      input = [2016, 7, 12, undefined, 34, undefined, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, undefined, 34, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, undefined, 34];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, seconds, and day should return the date with milliseconds and seconds set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, 12, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, 12, 34, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, 12, 34];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, seconds, and month should return the date with milliseconds and seconds set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, 12, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, 12, 34, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, 12, 34];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, seconds, and year should return the date with milliseconds and seconds set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, 12, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, 12, 34, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, 12, 34];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, minutes, and hours should return the date with milliseconds, minutes, and hours set to 0', function () {
      var date, input;

      input = [2016, 7, 12, undefined, undefined, 56, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, undefined, undefined, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, minutes, and day should return the date with milliseconds and minutes set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, 12, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, 12, undefined, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, minutes, and month should return the date with milliseconds and minutes set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, 12, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, 12, undefined, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, minutes, and year should return the date with milliseconds and minutes set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, 12, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, 12, undefined, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, hours, and day should return the date with milliseconds and hours set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, undefined, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, undefined, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, hours, and month should return the date with milliseconds and hours set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, undefined, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, undefined, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, hours, and year should return the date with milliseconds and hours set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, undefined, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, undefined, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, day, and month should return the date with milliseconds set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, 12, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, 12, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, day, and year should return the date with milliseconds set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, 12, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, 12, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the milliseconds, month, and year should return the date with milliseconds set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, 12, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, 12, 34, 56];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the seconds, minutes, and hours should return the date with seconds, minutes, and hours set to 0', function () {
      var date = [2016, 7, 12, undefined, undefined, undefined, 789];

      date = Dte.convert(date, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds, minutes, and day should return the date with seconds and minutes set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, 12, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds, minutes, and month should return the date with seconds and minutes set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, 12, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds, minutes, and year should return the date with seconds and minutes set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, 12, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds, hours, and day should return the date with seconds and hours set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, undefined, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds, hours, and month should return the date with seconds and hours set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, undefined, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds, hours, and year should return the date with seconds and hours set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, undefined, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds, day, and month should return the date with seconds set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, 12, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds, day, and year should return the date with seconds set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, 12, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the seconds, month, and year should return the date with seconds set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, 12, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes, hours, and day should return the date with minutes and hours set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, undefined, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes, hours, and month should return the date with minutes and hours set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, undefined, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes, hours, and year should return the date with minutes and hours set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, undefined, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes, day, and month should return the date with minutes set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, 12, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes, day, and year should return the date with minutes set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, 12, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the minutes, month, and year should return the date with minutes set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, 12, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the hours, day, and month should return the date with hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, undefined, 34, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the hours, day, and year should return the date with hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, undefined, 34, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the hours, month, and year should return the date with hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, undefined, 34, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input missing the day, month, and year should return the date with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, 12, 34, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the day, month, and year set should return the date with milliseconds, seconds, minutes, and hours set to 0', function () {
      var date, input;

      input = [2016, 7, 12, undefined, undefined, undefined, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, undefined, undefined, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, undefined, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12, undefined];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, 12];
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the hours, month, and year set should return the date with milliseconds, seconds, and minutes set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, 12, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, 12, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, 12, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, 12],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the hours, day, and year set should return the date with milliseconds, seconds, and minutes set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, 12, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, 12, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, 12, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, 12],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the hours, day, and month set should return the date with milliseconds, seconds, and minutes set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, 12, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, 12, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, 12, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, 12],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes, month, and year set should return the date with milliseconds, seconds, and hours set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, undefined, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, undefined, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, undefined, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes, day, and year set should return the date with milliseconds, seconds, and hours set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, undefined, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, undefined, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, undefined, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes, day, and month set should return the date with milliseconds, seconds, and hours set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, undefined, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, undefined, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, undefined, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes, hours, and year set should return the date with milliseconds and seconds set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, 12, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, 12, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, 12, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes, hours, and month set should return the date with milliseconds and seconds set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, 12, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, 12, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, 12, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes, hours, and day set should return the date with milliseconds and seconds set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, 12, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, 12, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, 12, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, month, and year set should return the date with milliseconds, minutes, and hours set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, undefined, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, undefined, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, day, and year set should return the date with milliseconds, minutes, and hours set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, undefined, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, undefined, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, day, and month set should return the date with milliseconds, minutes, and hours set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, undefined, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, 12, undefined, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, hours, and year set should return the date with milliseconds and minutes set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, 12, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, 12, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, hours, and month set should return the date with milliseconds and minutes set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, 12, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, 12, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, hours, and day set should return the date with milliseconds and minutes set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, 12, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, 12, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, minutes, and year set should return the date with milliseconds and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, undefined, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, undefined, 34, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, minutes, and month set should return the date with milliseconds and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, undefined, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, undefined, 34, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, minutes, and day set should return the date with milliseconds and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, undefined, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, undefined, 34, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds, minutes, and hours set should return the date with milliseconds set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, 12, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, 12, 34, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the milliseconds, month, and year set should return the date with seconds, minutes, and hours set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, undefined, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, day, and year set should return the date with seconds, minutes, and hours set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, undefined, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, day, and month set should return the date with seconds, minutes, and hours set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, undefined, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, hours, and year set should return the date with seconds and minutes set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, 12, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, hours, and month set should return the date with seconds and minutes set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, 12, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, hours, and day set should return the date with seconds and minutes set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, 12, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, minutes, and year set should return the date with seconds and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, undefined, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, minutes, and month set should return the date with seconds and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, undefined, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, minutes, and day set should return the date with seconds and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, undefined, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, minutes, and hours set should return the date with seconds set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, 12, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, seconds, and year set should return the date with minutes and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, undefined, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, seconds, and month set should return the date with minutes and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, undefined, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, seconds, and day set should return the date with minutes and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, undefined, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, seconds, and hours set should return the date with minutes set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, 12, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds, seconds, and minutes set should return the date with hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, undefined, 34, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the month and year set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current day', function () {
      var currDay, date, input, now;

      now = new Date();
      currDay = now.getDate();

      input = [2016, 7, undefined, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, 7],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the day and year set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current month', function () {
      var currMonth, date, input, now;

      now = new Date();
      currMonth = now.getMonth();

      input = [2016, undefined, 12, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, 12],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the milliseconds, day, and month set should return the date with seconds, minutes, and hours set to 0 and with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 7, 12, undefined, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the hours and year set should return the date with milliseconds, seconds, and minutes set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, 12, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, 12, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, 12, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, 12],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the hours and month set should return the date with milliseconds, seconds, and minutes set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, 12, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, 12, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, 12, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, 12],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the hours and day set should return the date with milliseconds, seconds, and minutes set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, 12, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, 12, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, 12, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, 12],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes and year set should return the date with milliseconds, seconds, and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, undefined, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, undefined, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, undefined, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes and month set should return the date with milliseconds, seconds, and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, undefined, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, undefined, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, undefined, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes and day set should return the date with milliseconds, seconds, and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, undefined, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, undefined, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, undefined, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes and hours set should return the date with milliseconds, seconds, set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, 12, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, 12, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, 12, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds and year set should return the date with milliseconds, minutes, and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, undefined, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, undefined, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds and month set should return the date with milliseconds, minutes, and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, undefined, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, undefined, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds and day set should return the date with milliseconds, minutes, and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, undefined, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, undefined, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds and hours set should return the date with milliseconds, minutes, set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, 12, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, 12, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds and minutes set should return the date with milliseconds, hours, set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, undefined, 34, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, undefined, 34, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the milliseconds and year set should return the date with seconds, minutes, and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, undefined, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds and month set should return the date with seconds, minutes, and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, undefined, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds and day set should return the date with seconds, minutes, and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, undefined, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds and hours set should return the date with seconds and minutes set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, 12, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds and minutes set should return the date with seconds and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, undefined, 34, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the milliseconds and seconds set should return the date with minutes and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, undefined, undefined, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like array literal input with only the year set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      input = [2016, undefined, undefined, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [2016],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the month set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      input = [undefined, 7, undefined, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, 7],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the day set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, input, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, 12, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, 12],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the hours set should return the date with milliseconds, seconds, and minutes set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, 12, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, 12, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, 12, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, 12],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the minutes set should return the date with milliseconds, seconds, and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, undefined, 34, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, undefined, 34, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, undefined, 34],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the seconds set should return the date with milliseconds, minutes, and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, undefined, undefined, 56, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, undefined, undefined, 56],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input with only the milliseconds set should return the date with seconds, minutes, and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, undefined, undefined, undefined, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with an object literal input with no date information set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, input, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      input = [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined, undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [undefined],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      input = [],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like array literal input missing the year should return the date with the current year', function () {
      var currYear, date, input, now;

      now = new Date();
      currYear = now.getFullYear();

      input = [undefined, 3, 12, 12, 34, 56, 789],
      date = Dte.convert(input, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a complete date-like object literal input should return the date', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the milliseconds should return the date with milliseconds set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, hours: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the seconds should return the date with seconds set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, hours: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes should return the date with minutes set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, hours: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the hours should return the date with hours set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the day should return the date with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the month should return the date with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the year should return the date with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the milliseconds and seconds should return the date with milliseconds and seconds set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, hours: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds and minutes should return the date with milliseconds and minutes set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, hours: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds and hours should return the date with milliseconds and hours set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds and day should return the date with milliseconds set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, hours: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds and month should return the date with milliseconds set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, hours: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds and year should return the date with milliseconds set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, hours: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the seconds and minutes should return the date with seconds and minutes set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, hours: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds and hours should return the date with seconds and hours set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds and day should return the date with seconds set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, hours: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds and month should return the date with seconds set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, hours: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds and year should return the date with seconds set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, hours: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes and hours should return the date with minutes and hours set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes and day should return the date with minutes set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, hours: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes and month should return the date with minutes set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, hours: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes and year should return the date with minutes set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, hours: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the hours and day should return the date with hours set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the hours and month should return the date with hours set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the hours and year should return the date with hours set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the day and month should return the date with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the day and year should return the date with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the month and year should return the date with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the milliseconds, seconds, and minutes should return the date with milliseconds, seconds, and minutes set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, hours: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, seconds, and hours should return the date with milliseconds, seconds, and hours set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, seconds, and day should return the date with milliseconds and seconds set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, hours: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, seconds, and month should return the date with milliseconds and seconds set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, hours: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, seconds, and year should return the date with milliseconds and seconds set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, hours: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, minutes, and hours should return the date with milliseconds, minutes, and hours set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, minutes, and day should return the date with milliseconds and minutes set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, hours: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, minutes, and month should return the date with milliseconds and minutes set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, hours: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, minutes, and year should return the date with milliseconds and minutes set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, hours: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, hours, and day should return the date with milliseconds and hours set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, hours, and month should return the date with milliseconds and hours set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, hours, and year should return the date with milliseconds and hours set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, day, and month should return the date with milliseconds set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, hours: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, day, and year should return the date with milliseconds set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, hours: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the milliseconds, month, and year should return the date with milliseconds set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, hours: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input missing the seconds, minutes, and hours should return the date with seconds, minutes, and hours set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds, minutes, and day should return the date with seconds and minutes set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, hours: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds, minutes, and month should return the date with seconds and minutes set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, hours: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds, minutes, and year should return the date with seconds and minutes set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, hours: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds, hours, and day should return the date with seconds and hours set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds, hours, and month should return the date with seconds and hours set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds, hours, and year should return the date with seconds and hours set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds, day, and month should return the date with seconds set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, hours: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds, day, and year should return the date with seconds set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, hours: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the seconds, month, and year should return the date with seconds set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, hours: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes, hours, and day should return the date with minutes and hours set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes, hours, and month should return the date with minutes and hours set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes, hours, and year should return the date with minutes and hours set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes, day, and month should return the date with minutes set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, hours: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes, day, and year should return the date with minutes set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, hours: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the minutes, month, and year should return the date with minutes set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, hours: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the hours, day, and month should return the date with hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the hours, day, and year should return the date with hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the hours, month, and year should return the date with hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input missing the day, month, and year should return the date with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ hours: 12, minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the day, month, and year set should return the date with milliseconds, seconds, minutes, and hours set to 0', function () {
      var date;

      date = Dte.convert({ year: 2016, month: 7, day: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the hours, month, and year set should return the date with milliseconds, seconds, and minutes set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, hours: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the hours, day, and year set should return the date with milliseconds, seconds, and minutes set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, hours: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the hours, day, and month set should return the date with milliseconds, seconds, and minutes set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, hours: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes, month, and year set should return the date with milliseconds, seconds, and hours set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes, day, and year set should return the date with milliseconds, seconds, and hours set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes, day, and month set should return the date with milliseconds, seconds, and hours set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes, hours, and year set should return the date with milliseconds and seconds set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, hours: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes, hours, and month set should return the date with milliseconds and seconds set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, hours: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes, hours, and day set should return the date with milliseconds and seconds set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, hours: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, month, and year set should return the date with milliseconds, minutes, and hours set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, day, and year set should return the date with milliseconds, minutes, and hours set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, day, and month set should return the date with milliseconds, minutes, and hours set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, hours, and year set should return the date with milliseconds and minutes set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, hours: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, hours, and month set should return the date with milliseconds and minutes set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, hours: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, hours, and day set should return the date with milliseconds and minutes set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, hours: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, minutes, and year set should return the date with milliseconds and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, minutes, and month set should return the date with milliseconds and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, minutes, and day set should return the date with milliseconds and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds, minutes, and hours set should return the date with milliseconds set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ hours: 12, minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the milliseconds, month, and year set should return the date with seconds, minutes, and hours set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, day, and year set should return the date with seconds, minutes, and hours set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, day, and month set should return the date with seconds, minutes, and hours set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, hours, and year set should return the date with seconds and minutes set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, hours: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, hours, and month set should return the date with seconds and minutes set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, hours: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, hours, and day set should return the date with seconds and minutes set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, hours: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, minutes, and year set should return the date with seconds and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, minutes, and month set should return the date with seconds and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, minutes, and day set should return the date with seconds and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, minutes, and hours set should return the date with seconds set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ hours: 12, minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, seconds, and year set should return the date with minutes and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, seconds, and month set should return the date with minutes and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, seconds, and day set should return the date with minutes and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, seconds, and hours set should return the date with minutes set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ hours: 12, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds, seconds, and minutes set should return the date with hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ minutes: 34, seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the month and year set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current day', function () {
      var currDay, date, now;

      now = new Date();
      currDay = now.getDate();

      date = Dte.convert({ year: 2016, month: 7 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the day and year set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current month', function () {
      var currMonth, date, now;

      now = new Date();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, day: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the milliseconds, day, and month set should return the date with seconds, minutes, and hours set to 0 and with the current year', function () {
      var currYear, date, now;

      now = new Date();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, day: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the hours and year set should return the date with milliseconds, seconds, and minutes set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, hours: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the hours and month set should return the date with milliseconds, seconds, and minutes set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, hours: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the hours and day set should return the date with milliseconds, seconds, and minutes set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, hours: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes and year set should return the date with milliseconds, seconds, and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes and month set should return the date with milliseconds, seconds, and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes and day set should return the date with milliseconds, seconds, and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes and hours set should return the date with milliseconds, seconds, set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ hours: 12, minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds and year set should return the date with milliseconds, minutes, and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds and month set should return the date with milliseconds, minutes, and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds and day set should return the date with milliseconds, minutes, and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds and hours set should return the date with milliseconds, minutes, set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ hours: 12, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds and minutes set should return the date with milliseconds, hours, set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ minutes: 34, seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the milliseconds and year set should return the date with seconds, minutes, and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds and month set should return the date with seconds, minutes, and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds and day set should return the date with seconds, minutes, and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds and hours set should return the date with seconds and minutes set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ hours: 12, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds and minutes set should return the date with seconds and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ minutes: 34, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the milliseconds and seconds set should return the date with minutes and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ seconds: 56, milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with a date-like object literal input with only the year set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current day and month', function () {
      var currDay, currMonth, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();

      date = Dte.convert({ year: 2016 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the month set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current day and year', function () {
      var currDay, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currYear = now.getFullYear();

      date = Dte.convert({ month: 7 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the day set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current month and year', function () {
      var currMonth, currYear, date, now;

      now = new Date();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ day: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the hours set should return the date with milliseconds, seconds, and minutes set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ hours: 12 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the minutes set should return the date with milliseconds, seconds, and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ minutes: 34 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the seconds set should return the date with milliseconds, minutes, and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ seconds: 56 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input with only the milliseconds set should return the date with seconds, minutes, and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({ milliseconds: 789 }, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with an object literal input with no date information set should return the date with milliseconds, seconds, minutes, and hours set to 0 and with the current day, month, and year', function () {
      var currDay, currMonth, currYear, date, now;

      now = new Date();
      currDay = now.getDate();
      currMonth = now.getMonth();
      currYear = now.getFullYear();

      date = Dte.convert({}, {});
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(currYear);
      expect(date.getMonth()).toBe(currMonth);
      expect(date.getDate()).toBe(currDay);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with a date-like object literal input representing invalid date with strict option set to true should return default value', function () {
      var date, input;

      input = { year: 1976, month: 6, day: 31, hours: 16, minutes: 20, seconds: 0, milliseconds: 0 };
      expect(Dte.convert(input, { strict: true })).toBeNull();
      expect(Dte.convert(input, { def: null, strict: true })).toBeNull();
      expect(Dte.convert(input, { def: undefined, strict: true })).toBeUndefined();
      expectToBeNow(Dte.convert(input, { def: 'now', strict: true }));
      expectToBeToday(Dte.convert(input, { def: 'today', strict: true }));
    });

    it('called with a moment instance input should return a date representing the same date/time as the moment instance', function () {
      var date, input;

      input = moment([2016, 6, 12, 12, 34, 56, 789]);
      date = Dte.convert(input);
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(2016);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with `"now"` input should return current date and time', function () {
      var date, i, input, inputs, len;

      inputs = ['now', 'NOW', 'Now', 'nOw']; // Case-insensitive.
      for (i = 0, len = inputs.length; i < len; ++i) {
        input = inputs[i];

        date = Dte.convert(input);
        expect(date instanceof Object).toBe(true);
        expect(date instanceof Date).toBe(true);
        expectToBeNow(date);
      }
    });

    it('called with `"today"` input should return current date', function () {
      var date, i, input, inputs, len;

      inputs = ['today', 'TODAY', 'Today', 'tOdAy']; // Case-insensitive.
      for (i = 0, len = inputs.length; i < len; ++i) {
        input = inputs[i];

        date = Dte.convert(input);
        expect(date instanceof Object).toBe(true);
        expect(date instanceof Date).toBe(true);
        expectToBeToday(date);
      }
    });

    it('called with unparsible string input and `"now"` format should return current date and time', function () {
      var date, i, input, inputs, len;

      inputs = ['', 'unparsible'];
      for (i = 0, len = inputs.length; i < len; ++i) {
        input = inputs[i];

        date = Dte.convert(input, { formats: ['m/d/Y', 'now'] });
        expect(date instanceof Object).toBe(true);
        expect(date instanceof Date).toBe(true);
        expectToBeNow(date);
      }
    });

    it('called with unparsible string input and `"today"` format should return current date', function () {
      var date, i, input, inputs, len;

      inputs = ['', 'unparsible', '3/12/76'];
      for (i = 0, len = inputs.length; i < len; ++i) {
        input = inputs[i];

        date = Dte.convert(input, { formats: ['m/d/Y', 'today'] });
        expect(date instanceof Object).toBe(true);
        expect(date instanceof Date).toBe(true);
        expectToBeToday(date);
      }
    });

    it('called with string input and `"m/d/Y"` format should return expected date', function () {
      var date;

      date = Dte.convert('03/12/1976', { formats: 'm/d/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with string input and 12-hr format should return expected date', function () {
      var date;

      date = Dte.convert('03/12/1976 12:00 am', { formats: 'm/d/Y g:i a' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/12/1976 12:00 pm', { formats: 'm/d/Y g:i a' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/12/1976 12:00:01 am', { formats: 'm/d/Y g:i:s a' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(1);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/12/1976 12:00:01 pm', { formats: 'm/d/Y g:i:s a' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(1);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/12/1976 3:15 am', { formats: 'm/d/Y g:i a' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(15);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/12/1976 3:15 pm', { formats: 'm/d/Y g:i a' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(15);
      expect(date.getMinutes()).toBe(15);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/12/1976 15:15 pm', { formats: 'm/d/Y g:i a' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(15);
      expect(date.getMinutes()).toBe(15);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/12/1976 3:15', { formats: 'm/d/Y g:i' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(15);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/12/1976 15:15', { formats: 'm/d/Y g:i' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(15);
      expect(date.getMinutes()).toBe(15);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with string input and multiple formats should return expected date', function () {
      var date;

      date = Dte.convert('03/12/1976', { formats: ['Y-m-d', 'm/d/Y', 'Y-n-j', 'n/j/Y'] });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with string input with single digit days and/or months with `"n/j/Y"` format should return expected date', function () {
      var date;
      date = Dte.convert('3/4/1976', { formats: 'n/j/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(4);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);


      date = Dte.convert('03/4/1976', { formats: 'n/j/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(4);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('3/04/1976', { formats: 'n/j/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(4);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/04/1976', { formats: 'n/j/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(4);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('3/12/1976', { formats: 'n/j/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('03/12/1976', { formats: 'n/j/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('12/3/1976', { formats: 'n/j/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(3);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('12/03/1976', { formats: 'n/j/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(3);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with string input and format containing escaped symbols should return expected date', function () {
      var date;

      date = Dte.convert('B-day 1976/3/12', { formats: '\\B-\\d\\a\\y Y/n/d' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with string input and format with no year info should return expected date', function () {
      var date, now;

      now = new Date();

      date = Dte.convert('03-12', { formats: 'm-d' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(now.getFullYear());
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with string input and format with no month info should return expected date', function () {
      var date, now;

      now = new Date();

      date = Dte.convert('1976-12', { formats: 'Y-d' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(now.getMonth());
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with string input and format with no year or month info should return expected date', function () {
      var date, now;

      now = new Date();

      date = Dte.convert('12', { formats: 'd' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(now.getFullYear());
      expect(date.getMonth()).toBe(now.getMonth());
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);

      date = Dte.convert('12 14:59', { formats: 'd h:i' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(now.getFullYear());
      expect(date.getMonth()).toBe(now.getMonth());
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(14);
      expect(date.getMinutes()).toBe(59);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with string input and format with no year, month, or day info should return expected date', function () {
      var date, now;

      now = new Date();

      date = Dte.convert('12:34:56.789', { formats: 'h:i:s.u' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(now.getFullYear());
      expect(date.getMonth()).toBe(now.getMonth());
      expect(date.getDate()).toBe(now.getDate());
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(34);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);
    });

    it('called with string input, format, a strict set to true should return default value for invalid date', function () {
      var date;

      // Confirm strict works with valid date/times.
      date = Dte.convert('1976-03-12T03:15:56.789', { formats: 'Y-m-d\\Th:i:s.u', strict: true });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(3);
      expect(date.getMinutes()).toBe(15);
      expect(date.getSeconds()).toBe(56);
      expect(date.getMilliseconds()).toBe(789);

      expect(Dte.convert('1976-06-31T16:20:00.0', { formats: 'Y-m-d\\Th:i:s.u', strict: true })).toBeNull();
      expect(Dte.convert('', { def: null, formats: 'Y-m-d\\Th:i:s.u', strict: true })).toBeNull();
      expect(Dte.convert('', { def: undefined, formats: 'Y-m-d\\Th:i:s.u', strict: true })).toBeUndefined();
      expectToBeNow(Dte.convert('', { def: 'now', formats: 'Y-m-d\\Th:i:s.u', strict: true }));
      expectToBeToday(Dte.convert('', { def: 'today', formats: 'Y-m-d\\Th:i:s.u', strict: true }));

      // But same date without strict does JavaScript Date 'rollover'.
      date = Dte.convert('1976-06-31T16:20:00.0', { formats: 'Y-m-d\\Th:i:s.u' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(6);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(16);
      expect(date.getMinutes()).toBe(20);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    // This test is necessary due to dynamic parser implementation.
    it('called with string input and format containing double quote should return expected date', function () {
      var date;

      date = Dte.convert('"03/12/1976', { formats: '"m/d/Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    // This test is necessary due to dynamic parser implementation.
    it('called with string input and format containing single quote should return expected date', function () {
      var date;

      date = Dte.convert("'03/12/1976", { formats: "'m/d/Y" });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    // This test is necessary due to dynamic parser implementation.
    it('called with string input and format containing backslash should return expected date', function () {
      var date;

      date = Dte.convert('03\\12\\1976', { formats: 'm\\\\d\\\\Y' });
      expect(date).toBeDefined();
      expect(date.getFullYear()).toBe(1976);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(12);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with string input and `"U"` format should return expected date', function () {
      var date;

      date = Dte.convert('0', { formats: 'U' });
      expect(date).toBeDefined();
      expect(date.getUTCFullYear()).toBe(1970);
      expect(date.getUTCMonth()).toBe(0);
      expect(date.getUTCDate()).toBe(1);
      expect(date.getUTCHours()).toBe(0);
      expect(date.getUTCMinutes()).toBe(0);
      expect(date.getUTCSeconds()).toBe(0);
      expect(date.getUTCMilliseconds()).toBe(0);

      date = Dte.convert('1', { formats: 'U' });
      expect(date).toBeDefined();
      expect(date.getUTCFullYear()).toBe(1970);
      expect(date.getUTCMonth()).toBe(0);
      expect(date.getUTCDate()).toBe(1);
      expect(date.getUTCHours()).toBe(0);
      expect(date.getUTCMinutes()).toBe(0);
      expect(date.getUTCSeconds()).toBe(1);
      expect(date.getUTCMilliseconds()).toBe(0);

      date = Dte.convert('-1', { formats: 'U' });
      expect(date).toBeDefined();
      expect(date.getUTCFullYear()).toBe(1969);
      expect(date.getUTCMonth()).toBe(11);
      expect(date.getUTCDate()).toBe(31);
      expect(date.getUTCHours()).toBe(23);
      expect(date.getUTCMinutes()).toBe(59);
      expect(date.getUTCSeconds()).toBe(59);
      expect(date.getUTCMilliseconds()).toBe(0);

      date = Dte.convert('3661001', { formats: 'U' });
      expect(date).toBeDefined();
      expect(date.getUTCFullYear()).toBe(1970);
      expect(date.getUTCMonth()).toBe(1);
      expect(date.getUTCDate()).toBe(12);
      expect(date.getUTCHours()).toBe(8);
      expect(date.getUTCMinutes()).toBe(56);
      expect(date.getUTCSeconds()).toBe(41);
      expect(date.getUTCMilliseconds()).toBe(0);

      date = Dte.convert('86400', { formats: 'U' });
      expect(date).toBeDefined();
      expect(date.getUTCFullYear()).toBe(1970);
      expect(date.getUTCMonth()).toBe(0);
      expect(date.getUTCDate()).toBe(2);
      expect(date.getUTCHours()).toBe(0);
      expect(date.getUTCMinutes()).toBe(0);
      expect(date.getUTCSeconds()).toBe(0);
      expect(date.getUTCMilliseconds()).toBe(0);

      date = Dte.convert('+86400', { formats: 'U' });
      expect(date).toBeDefined();
      expect(date.getUTCFullYear()).toBe(1970);
      expect(date.getUTCMonth()).toBe(0);
      expect(date.getUTCDate()).toBe(2);
      expect(date.getUTCHours()).toBe(0);
      expect(date.getUTCMinutes()).toBe(0);
      expect(date.getUTCSeconds()).toBe(0);
      expect(date.getUTCMilliseconds()).toBe(0);

      date = Dte.convert('-86400', { formats: 'U' });
      expect(date).toBeDefined();
      expect(date.getUTCFullYear()).toBe(1969);
      expect(date.getUTCMonth()).toBe(11);
      expect(date.getUTCDate()).toBe(31);
      expect(date.getUTCHours()).toBe(0);
      expect(date.getUTCMinutes()).toBe(0);
      expect(date.getUTCSeconds()).toBe(0);
      expect(date.getUTCMilliseconds()).toBe(0);
    });

  });

  describe('.diff', function () {

    it('should calculate the difference of minutes between 2 dates', function () {
      var guessedTz = guessCurrentTimezone(),
          date1, date2;

      if (!guessedTz) {
        expect(true).toBe(false);
      }

      if (guessedTz.name == 'America/Los_Angeles') {
        date1 = createDateFromArray([2000, 0, 1, 12, 0, 1], 946756801000, 480);
        date2 = createDateFromArray([2001, 0, 1, 12, 0, 1], 978379201000, 480);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(60 * 24 * 366);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(60 * 24 * 366));

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959886001000, 420); // During daylight savings.
        date2 = createDateFromArray([2000, 11, 1, 12, 0, 1], 975700801000, 480); // After daylight savings.
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe((60 * 24 * 183) + 60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-((60 * 24 * 183) + 60));

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959886001000, 420); // During daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962478001000, 420); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(60 * 24 * 30);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(60 * 24 * 30));

        date1 = createDateFromArray([2000, 1, 1, 12, 0, 1], 949435201000, 480); // Before daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962478001000, 420); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe((60 * 24 * 151) + -60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-((60 * 24 * 151) + -60));

        // Due to daylight savings, one hour should be missing.
        // Daylight savings starts on March 14th in 2010.
        date1 = createDateFromArray([2010, 2, 14, 0, 0, 1], 1268553601000, 480);
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        date2 = createDateFromArray([2010, 2, 14, 14, 0, 1], 1268600401000, 420);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(840 + -60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(840 + -60));

        // Due to daylight savings, one more hour should have transpired.
        // Daylight savings ends on Nov 7th in 2010.
        date1 = createDateFromArray([2010, 10, 7, 0, 0, 0, 0], 1289113200000, 420);
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        date2 = createDateFromArray([2010, 10, 7, 14, 0, 0, 0], 1289167200000, 480);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(840 + 60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(840 + 60));

        date1 = createDateFromArray([2000, 0, 1, 12, 0, 0], 946756800000, 480);
        date2 = createDateFromArray([2000, 0, 1, 12, 1, 59], 946756919000, 480);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(1);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-1);
      }
      else if (guessedTz.name == 'America/Denver') {
        date1 = createDateFromArray([2000, 0, 1, 12, 0, 1], 946753201000, 420);
        date2 = createDateFromArray([2001, 0, 1, 12, 0, 1], 978375601000, 420);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(60 * 24 * 366);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(60 * 24 * 366));

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959882401000, 360); // During daylight savings.
        date2 = createDateFromArray([2000, 11, 1, 12, 0, 1], 975697201000, 420); // After daylight savings.
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe((60 * 24 * 183) + 60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-((60 * 24 * 183) + 60));

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959882401000, 360); // During daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962474401000, 360); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(60 * 24 * 30);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(60 * 24 * 30));

        date1 = createDateFromArray([2000, 1, 1, 12, 0, 1], 949431601000, 420); // Before daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962474401000, 360); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe((60 * 24 * 151) + -60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-((60 * 24 * 151) + -60));

        // Due to daylight savings, one hour should be missing.
        // Daylight savings starts on March 14th in 2010.
        date1 = createDateFromArray([2010, 2, 14, 0, 0, 1], 1268550001000, 420);
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        date2 = createDateFromArray([2010, 2, 14, 9, 0, 1], 1268578801000, 360);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(540 + -60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(540 + -60));

        // Due to daylight savings, one more hour should have transpired.
        // Daylight savings ends on Nov 7th in 2010.
        date1 = createDateFromArray([2010, 10, 7, 0, 0, 0, 0], 1289109600000, 360);
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        date2 = createDateFromArray([2010, 10, 7, 8, 0, 0, 0], 1289142000000, 420);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(480 + 60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(480 + 60));

        date1 = createDateFromArray([2000, 0, 1, 12, 0, 0], 946753200000, 420);
        date2 = createDateFromArray([2000, 0, 1, 12, 1, 59], 946753319000, 420);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(1);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-1);
      }
      else if (guessedTz.name == 'America/Chicago') {
        date1 = createDateFromArray([2000, 0, 1, 12, 0, 1], 946749601000, 360);
        date2 = createDateFromArray([2001, 0, 1, 12, 0, 1], 978372001000, 360);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(60 * 24 * 366);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(60 * 24 * 366));

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959878801000, 300); // During daylight savings.
        date2 = createDateFromArray([2000, 11, 1, 12, 0, 1], 975693601000, 360); // After daylight savings.
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe((60 * 24 * 183) + 60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-((60 * 24 * 183) + 60));

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959878801000, 300); // During daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962470801000, 300); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(60 * 24 * 30);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(60 * 24 * 30));

        date1 = createDateFromArray([2000, 1, 1, 12, 0, 1], 949428001000, 360); // Before daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962470801000, 300); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe((60 * 24 * 151) + -60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-((60 * 24 * 151) + -60));

        // Due to daylight savings, one hour should be missing.
        // Daylight savings starts on March 14th in 2010.
        date1 = createDateFromArray([2010, 2, 14, 0, 0, 1], 1268546401000, 360);
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        date2 = createDateFromArray([2010, 2, 14, 9, 0, 1], 1268575201000, 300);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(540 + -60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(540 + -60));

        // Due to daylight savings, one more hour should have transpired.
        // Daylight savings ends on Nov 7th in 2010.
        date1 = createDateFromArray([2010, 10, 7, 0, 0, 0, 0], 1289106000000, 300);
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        date2 = createDateFromArray([2010, 10, 7, 8, 0, 0, 0], 1289138400000, 360);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(480 + 60);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-(480 + 60));

        date1 = createDateFromArray([2000, 0, 1, 12, 0, 0], 946749600000, 360);
        date2 = createDateFromArray([2000, 0, 1, 12, 1, 59], 946749719000, 360);
        expect(Dte.diff(date1, date1, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.MINUTES)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.MINUTES)).toBe(1);
        expect(Dte.diff(date2, date1, Dte.MINUTES)).toBe(-1);
      }
      // TODO: Add tests for other timezones.
      else {
        expect(true).toBe(false);
      }
    });

    it('should calculate the difference of hours between two dates', function () {
      var guessedTz = guessCurrentTimezone(),
          date1, date2;

      if (!guessedTz) {
        expect(true).toBe(false);
      }

      if (guessedTz.name == 'America/Los_Angeles') {
        date1 = createDateFromArray([2000, 0, 1, 12, 0, 1], 946756801000, 480); // Before daylight savings.
        date2 = createDateFromArray([2001, 0, 1, 12, 0, 1], 978379201000, 480); // Before daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(24 * 366);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-24 * 366);

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959886001000, 420); // During daylight savings.
        date2 = createDateFromArray([2000, 11, 1, 12, 0, 1], 975700801000, 480); // After daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe((24 * 183) + 1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-((24 * 183) + 1));

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959886001000, 420); // During daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962478001000, 420); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(24 * 30);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-24 * 30);

        date1 = createDateFromArray([2000, 1, 1, 12, 0, 1], 949435201000, 480); // Before daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962478001000, 420); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe((24 * 151) + -1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-((24 * 151) + -1));

        // Due to daylight savings, one hour should be missing.
        // Daylight savings starts on March 14th in 2010.
        date1 = createDateFromArray([2010, 2, 14, 0, 0, 1], 1268553601000, 480); // Before daylight savings.
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        date2 = createDateFromArray([2010, 2, 14, 14, 0, 1], 1268600401000, 420); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(14 + -1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-(14 + -1));

        // Due to daylight savings, one more hour should have transpired.
        // Daylight savings ends on Nov 7th in 2010.
        date1 = createDateFromArray([2010, 10, 7, 0, 0, 1], 1289113201000, 420); // During daylight savings.
        date2 = createDateFromArray([2010, 10, 7, 14, 0, 1], 1289167201000, 480); // After daylight savings.
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(14 + 1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-(14 + 1));
      }
      else if (guessedTz.name == 'America/Denver') {
        date1 = createDateFromArray([2000, 0, 1, 12, 0, 1], 946753201000, 420); // Before daylight savings.
        date2 = createDateFromArray([2001, 0, 1, 12, 0, 1], 978375601000, 420); // Before daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(24 * 366);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-24 * 366);

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959882401000, 360); // During daylight savings.
        date2 = createDateFromArray([2000, 11, 1, 12, 0, 1], 975697201000, 420); // After daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe((24 * 183) + 1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-((24 * 183) + 1));

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959882401000, 360); // During daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962474401000, 360); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(24 * 30);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-24 * 30);

        date1 = createDateFromArray([2000, 1, 1, 12, 0, 1], 949431601000, 420); // Before daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962474401000, 360); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe((24 * 151) + -1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-((24 * 151) + -1));

        // Due to daylight savings, one hour should be missing.
        // Daylight savings starts on March 14th in 2010.
        date1 = createDateFromArray([2010, 2, 14, 0, 0, 1], 1268550001000, 420); // Before daylight savings.
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        date2 = createDateFromArray([2010, 2, 14, 9, 0, 1], 1268578801000, 360); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(9 + -1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-(9 + -1));

        // Due to daylight savings, one more hour should have transpired.
        // Daylight savings ends on Nov 7th in 2010.
        date1 = createDateFromArray([2010, 10, 7, 0, 0, 1], 1289109601000, 360); // During daylight savings.
        date2 = createDateFromArray([2010, 10, 7, 8, 0, 1], 1289142001000, 420); // After daylight savings.
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(8 + 1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-(8 + 1));
      }
      else if (guessedTz.name == 'America/Chicago') {
        date1 = createDateFromArray([2000, 0, 1, 12, 0, 1], 946749601000, 360); // Before daylight savings.
        date2 = createDateFromArray([2001, 0, 1, 12, 0, 1], 978372001000, 360); // Before daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(24 * 366);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-24 * 366);

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959878801000, 300); // During daylight savings.
        date2 = createDateFromArray([2000, 11, 1, 12, 0, 1], 975693601000, 360); // After daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe((24 * 183) + 1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-((24 * 183) + 1));

        date1 = createDateFromArray([2000, 5, 1, 12, 0, 1], 959878801000, 300); // During daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962470801000, 300); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(24 * 30);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-24 * 30);

        date1 = createDateFromArray([2000, 1, 1, 12, 0, 1], 949428001000, 360); // Before daylight savings.
        date2 = createDateFromArray([2000, 6, 1, 12, 0, 1], 962470801000, 300); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe((24 * 151) + -1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-((24 * 151) + -1));

        // Due to daylight savings, one hour should be missing.
        // Daylight savings starts on March 14th in 2010.
        date1 = createDateFromArray([2010, 2, 14, 0, 0, 1], 1268546401000, 360); // Before daylight savings.
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        date2 = createDateFromArray([2010, 2, 14, 9, 0, 1], 1268575201000, 300); // During daylight savings.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(9 + -1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-(9 + -1));

        // Due to daylight savings, one more hour should have transpired.
        // Daylight savings ends on Nov 7th in 2010.
        date1 = createDateFromArray([2010, 10, 7, 0, 0, 1], 1289106001000, 300); // During daylight savings.
        date2 = createDateFromArray([2010, 10, 7, 8, 0, 1], 1289138401000, 360); // After daylight savings.
        // NOTE: The following date was choosen such that Phantom JS will create it correctly.
        expect(Dte.diff(date1, date1, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date2, date2, Dte.HOURS)).toBe(0);
        expect(Dte.diff(date1, date2, Dte.HOURS)).toBe(8 + 1);
        expect(Dte.diff(date2, date1, Dte.HOURS)).toBe(-(8 + 1));
      }
      // TODO: Add tests for other timezones.
      else {
        expect(true).toBe(false);
      }
    });

    it('should calculate the difference of days between 2 dates', function () {
      var date1, date2;

      date1 = createDateFromArray([2000, 0, 1, 12, 0, 1]);
      date2 = createDateFromArray([2001, 0, 1, 12, 0, 1]);
      expect(Dte.diff(date1, date1, Dte.DAY)).toBe(0);
      expect(Dte.diff(date2, date2, Dte.DAY)).toBe(0);
      expect(Dte.diff(date1, date2, Dte.DAY)).toBe(366);
      expect(Dte.diff(date2, date1, Dte.DAY)).toBe(-366);
    });

    it('should calculate the difference of months between 2 dates', function () {
      var date1, date2;

      date1 = createDateFromArray([2000, 0, 1, 12, 0, 1]);
      date2 = createDateFromArray([2001, 0, 1, 12, 0, 1]);
      expect(Dte.diff(date1, date1, Dte.MONTH)).toBe(0);
      expect(Dte.diff(date2, date2, Dte.MONTH)).toBe(0);
      expect(Dte.diff(date1, date2, Dte.MONTH)).toBe(12);
      expect(Dte.diff(date2, date1, Dte.MONTH)).toBe(-12);
    });

    it('should calculate the difference of years between 2 dates', function () {
      var date1, date2;

      date1 = createDateFromArray([2000, 0, 1, 12, 0, 1]);
      date2 = createDateFromArray([2020, 0, 1, 12, 0, 1]);
      expect(Dte.diff(date1, date1, Dte.YEAR)).toBe(0);
      expect(Dte.diff(date2, date2, Dte.YEAR)).toBe(0);
      expect(Dte.diff(date1, date2, Dte.YEAR)).toBe(20);
      expect(Dte.diff(date2, date1, Dte.YEAR)).toBe(-20);
    });

  });

  describe('.getDaysInMonth', function () {

    it('called with anything but a Date instance should return `NaN`', function () {
      var daysInMonth;

      daysInMonth = Dte.getDaysInMonth(undefined);
      expect(daysInMonth).toBeNaN();

      daysInMonth = Dte.getDaysInMonth(null);
      expect(daysInMonth).toBeNaN();

      daysInMonth = Dte.getDaysInMonth(true);
      expect(daysInMonth).toBeNaN();

      daysInMonth = Dte.getDaysInMonth(false);
      expect(daysInMonth).toBeNaN();

      daysInMonth = Dte.getDaysInMonth(0);
      expect(daysInMonth).toBeNaN();

      daysInMonth = Dte.getDaysInMonth(1);
      expect(daysInMonth).toBeNaN();

      daysInMonth = Dte.getDaysInMonth('');
      expect(daysInMonth).toBeNaN();

      daysInMonth = Dte.getDaysInMonth('foo');
      expect(daysInMonth).toBeNaN();
    });

    it('called with January should return 31', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 0]));
      expect(daysInMonth).toBe(31);
    });

    it('called with February on a leap year should return 29', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 1]));
      expect(daysInMonth).toBe(29);
    });

    it('called with February on a non-leap year should return 28', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2001, 1]));
      expect(daysInMonth).toBe(28);
    });

    it('called with March should return 31', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 2]));
      expect(daysInMonth).toBe(31);
    });

    it('called with April should return 30', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 3]));
      expect(daysInMonth).toBe(30);
    });

    it('called with May should return 31', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 4]));
      expect(daysInMonth).toBe(31);
    });

    it('called with June should return 30', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 5]));
      expect(daysInMonth).toBe(30);
    });

    it('called with July should return 31', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 6]));
      expect(daysInMonth).toBe(31);
    });

    it('called with August should return 31', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 7]));
      expect(daysInMonth).toBe(31);
    });

    it('called with September should return 30', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 8]));
      expect(daysInMonth).toBe(30);
    });

    it('called with October should return 31', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 9]));
      expect(daysInMonth).toBe(31);
    });

    it('called with November should return 30', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 10]));
      expect(daysInMonth).toBe(30);
    });

    it('called with December should return 31', function () {
      var daysInMonth = Dte.getDaysInMonth(createDateFromArray([2000, 11]));
      expect(daysInMonth).toBe(31);
    });

  });

  describe('.getFirstDateOfMonth', function () {

    it('called with anything but a Date instance should return `null`', function () {
      var firstDateOfMonth;

      firstDateOfMonth = Dte.getFirstDateOfMonth(undefined);
      expect(firstDateOfMonth).toBeNull();

      firstDateOfMonth = Dte.getFirstDateOfMonth(null);
      expect(firstDateOfMonth).toBeNull();

      firstDateOfMonth = Dte.getFirstDateOfMonth(true);
      expect(firstDateOfMonth).toBeNull();

      firstDateOfMonth = Dte.getFirstDateOfMonth(false);
      expect(firstDateOfMonth).toBeNull();

      firstDateOfMonth = Dte.getFirstDateOfMonth(0);
      expect(firstDateOfMonth).toBeNull();

      firstDateOfMonth = Dte.getFirstDateOfMonth(1);
      expect(firstDateOfMonth).toBeNull();

      firstDateOfMonth = Dte.getFirstDateOfMonth('');
      expect(firstDateOfMonth).toBeNull();

      firstDateOfMonth = Dte.getFirstDateOfMonth('foo');
      expect(firstDateOfMonth).toBeNull();
    });

    it('called with January 31st, 2000 should return January 1st, 2000 with no time info', function () {
      var date = Dte.getFirstDateOfMonth(createDateFromArray([2000, 0, 31, 15, 45]));
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with February 29th, 2000 should return February 1st, 2000 with no time info', function () {
      var date = Dte.getFirstDateOfMonth(createDateFromArray([2000, 1, 29, 12, 34, 56, 789]));
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with February 31st, 2000 should return March 1st, 2000 with no time info', function () {
      // JavaScript rolls over 2000-02-31 to 2000-03-02.
      var date = Dte.getFirstDateOfMonth(new Date(2000, 1, 31, 12, 34, 56, 789));
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

  });

  describe('.getLastDateOfMonth', function () {

    it('called with anything but a Date instance should return `null`', function () {
      var lastDateOfMonth;

      lastDateOfMonth = Dte.getLastDateOfMonth(undefined);
      expect(lastDateOfMonth).toBeNull();

      lastDateOfMonth = Dte.getLastDateOfMonth(null);
      expect(lastDateOfMonth).toBeNull();

      lastDateOfMonth = Dte.getLastDateOfMonth(true);
      expect(lastDateOfMonth).toBeNull();

      lastDateOfMonth = Dte.getLastDateOfMonth(false);
      expect(lastDateOfMonth).toBeNull();

      lastDateOfMonth = Dte.getLastDateOfMonth(0);
      expect(lastDateOfMonth).toBeNull();

      lastDateOfMonth = Dte.getLastDateOfMonth(1);
      expect(lastDateOfMonth).toBeNull();

      lastDateOfMonth = Dte.getLastDateOfMonth('');
      expect(lastDateOfMonth).toBeNull();

      lastDateOfMonth = Dte.getLastDateOfMonth('foo');
      expect(lastDateOfMonth).toBeNull();
    });

    it('called with January 1st, 2000 should return January 31st, 2000 with no time info', function () {
      var date = Dte.getLastDateOfMonth(createDateFromArray([2000, 0, 1, 15, 45]));
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with February 29th, 2000 should return February 29st, 2000 with no time info', function () {
      var date = Dte.getLastDateOfMonth(createDateFromArray([2000, 1, 29, 12, 34, 56, 789]));
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(29);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with February 31st, 2000 should return March 31st, 2000 with no time info', function () {
      // JavaScript rolls over 2000-02-31 to 2000-03-02.
      var date = Dte.getLastDateOfMonth(new Date(2000, 1, 31, 12, 34, 56, 789));
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

  });

  describe('.isLeapYear', function () {

    it('called with anything but a Date instance should return `null`', function () {
      var answer;

      answer = Dte.isLeapYear(undefined);
      expect(answer).toBeNull();

      answer = Dte.isLeapYear(null);
      expect(answer).toBeNull();

      answer = Dte.isLeapYear(true);
      expect(answer).toBeNull();

      answer = Dte.isLeapYear(false);
      expect(answer).toBeNull();

      answer = Dte.isLeapYear(0);
      expect(answer).toBeNull();

      answer = Dte.isLeapYear(1);
      expect(answer).toBeNull();

      answer = Dte.isLeapYear('');
      expect(answer).toBeNull();

      answer = Dte.isLeapYear('foo');
      expect(answer).toBeNull();
    });

    it('called with leap year date should return `true`', function () {
      var answer;

      answer = Dte.isLeapYear(createDateFromArray([2400, 0]));
      expect(answer).toBe(true);

      answer = Dte.isLeapYear(createDateFromArray([2008, 0]));
      expect(answer).toBe(true);

      answer = Dte.isLeapYear(createDateFromArray([2004, 0]));
      expect(answer).toBe(true);

      answer = Dte.isLeapYear(createDateFromArray([2000, 0]));
      expect(answer).toBe(true);

      answer = Dte.isLeapYear(createDateFromArray([1996, 0]));
      expect(answer).toBe(true);

      answer = Dte.isLeapYear(createDateFromArray([800, 0]));
      expect(answer).toBe(true);
    });

    it('called with non-leap year date should return `false`', function () {
      var answer;

      answer = Dte.isLeapYear(createDateFromArray([2300, 0]));
      expect(answer).toBe(false);

      answer = Dte.isLeapYear(createDateFromArray([2200, 0]));
      expect(answer).toBe(false);

      answer = Dte.isLeapYear(createDateFromArray([2100, 0]));
      expect(answer).toBe(false);

      answer = Dte.isLeapYear(createDateFromArray([2001, 0]));
      expect(answer).toBe(false);

      answer = Dte.isLeapYear(createDateFromArray([2002, 0]));
      expect(answer).toBe(false);

      answer = Dte.isLeapYear(createDateFromArray([2003, 0]));
      expect(answer).toBe(false);

      answer = Dte.isLeapYear(createDateFromArray([2005, 0]));
      expect(answer).toBe(false);
    });

  });

  describe('.isValid', function () {

    it('called with valid date info should return `true`', function () {
      var isValid;

      isValid = Dte.isValid(2000);
      expect(isValid).toBe(true);

      isValid = Dte.isValid(2000, 1);
      expect(isValid).toBe(true);

      isValid = Dte.isValid(2000, 2, 29);
      expect(isValid).toBe(true);

      isValid = Dte.isValid(2001, 2, 28);
      expect(isValid).toBe(true);
    });

    it('called with invalid date info should return `false`', function () {
      var isValid;

      isValid = Dte.isValid(undefined);
      expect(isValid).toBe(false);

      isValid = Dte.isValid(undefined, undefined);
      expect(isValid).toBe(false);

      isValid = Dte.isValid(undefined, undefined, undefined);
      expect(isValid).toBe(false);

      isValid = Dte.isValid(2000, 2, 30);
      expect(isValid).toBe(false);

      isValid = Dte.isValid(2001, 2, 29);
      expect(isValid).toBe(false);

      isValid = Dte.isValid(2001, 4, 31);
      expect(isValid).toBe(false);

      isValid = Dte.isValid(2001, 6, 31);
      expect(isValid).toBe(false);

      isValid = Dte.isValid(2001, 9, 31);
      expect(isValid).toBe(false);

      isValid = Dte.isValid(2001, 11, 31);
      expect(isValid).toBe(false);

      isValid = Dte.isValid(2000, 3, 12, 2, 75, 0);
      expect(isValid).toBe(false);
    });

  });

  describe('.now', function () {

    it('should return a number representing the current time', function () {
      var now = Dte.now();
      expect(now instanceof Object).toBe(true);
      expect(now instanceof Date).toBe(true);
      expectToBeNow(now);
    });

  });

  describe('.toDate', function () {

    it('is an alias for .convert.', function () {
      expect(Dte.convert === Dte.toDate).toBe(true);
    });

  });

  describe('.today', function () {

    it('should return a new date representing the current date and time', function () {
      var today = Dte.today();
      expect(today instanceof Object).toBe(true);
      expect(today instanceof Date).toBe(true);
      expectToBeToday(today);
    });

  });

  describe('.toLastDateOfMonth', function () {

    it('called with anything but a Date instance should return input', function () {
      var lastDateOfMonth;

      lastDateOfMonth = Dte.toLastDateOfMonth(undefined);
      expect(lastDateOfMonth).toBeUndefined();

      lastDateOfMonth = Dte.toLastDateOfMonth(null);
      expect(lastDateOfMonth).toBeNull();

      lastDateOfMonth = Dte.toLastDateOfMonth(true);
      expect(lastDateOfMonth).toBe(true);

      lastDateOfMonth = Dte.toLastDateOfMonth(false);
      expect(lastDateOfMonth).toBe(false);

      lastDateOfMonth = Dte.toLastDateOfMonth(0);
      expect(lastDateOfMonth).toBe(0);

      lastDateOfMonth = Dte.toLastDateOfMonth(1);
      expect(lastDateOfMonth).toBe(1);

      lastDateOfMonth = Dte.toLastDateOfMonth('');
      expect(lastDateOfMonth).toBe('');

      lastDateOfMonth = Dte.toLastDateOfMonth('foo');
      expect(lastDateOfMonth).toBe('foo');
    });

    it('called with January 1st, 2000 should return January 31st, 2000 with no time info', function () {
      var date = Dte.toLastDateOfMonth(createDateFromArray([2000, 0, 1, 15, 45]));
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with February 29th, 2000 should return February 29st, 2000 with no time info', function () {
      var date = Dte.toLastDateOfMonth(createDateFromArray([2000, 1, 29, 12, 34, 56, 789]));
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(29);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('called with February 31st, 2000 should return March 31st, 2000 with no time info', function () {
      // JavaScript rolls over 2000-02-31 to 2000-03-02.
      var date = Dte.toLastDateOfMonth(new Date(2000, 1, 31, 12, 34, 56, 789));
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(31);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

  });

});

}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {})
