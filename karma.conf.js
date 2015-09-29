module.exports = function(karma) {
  karma.set({
    plugins: ['karma-browserify', 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-coverage', 'karma-coveralls'],

    frameworks: ['browserify', 'jasmine'],

    files: [
      'tests/polyfills/*.js',
      'src/**/*.js',
      'tests/*Spec.js'
    ],

    preprocessors: {
      'src/**/*.js': ['browserify', 'coverage']
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    browserify: {
      debug: true,
      transform: ['babelify']
    },

    reporters: ['progress', 'coverage', 'coveralls'],

    browsers: ['PhantomJS'],

    singleRun: true
  })
};
