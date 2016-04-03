module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],

    reporters: ['mocha'],

    mochaReporter: {
      output: 'autowatch'
    },

    basePath: '../',
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'lib/jquery.css-mahoro.js',
      'test/template.html',
      'test/test.js'
    ],

    preprocessors: {
      'test/*.html': ['html2js'],
      'test/*.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },

    browsers: [
      // 'Chrome'
      // 'Firefox',
      'PhantomJS'
    ],
    autoWatch: false,
    singleRun: true,
    colors: true
  });
};
