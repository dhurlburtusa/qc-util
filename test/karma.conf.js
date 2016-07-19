// This declares the default configuration.  Values can be overridden in gulpfile.js.
module.exports = function (config) {
  config.set({

    basePath: '..',

    files: [
      'etc/Number.isNaN.polyfill.js',
      'etc/moment-2.14.1.js',
      'tmp/webpack/bundle.js',
      'test/unit/**/*.spec.js',
    ],

    browsers: [
      'Chrome',
      'Firefox',
      'IE',
    ],

    frameworks: [
      'jasmine',
    ],

    // logLevel: 'DEBUG',

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true,
      // flags: ['--debug=true'],
      // debug: true,
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-phantomjs-launcher',
    ],

    // test results reporter to use
    // possible values: 'dots', 'kjhtml', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'kjhtml'],

    singleRun: true,
  });
};
