module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      'spec/main.js'
    ],

    exclude: [],

    preprocessors: {
      'spec/main.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'jsx-loader?harmony'
          }
        ]
      }
    },

    webpackServer: {
      stats: {
        colors: true
      }
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 60000,

    singleRun: false,

    plugins: [
      require("karma-mocha"),
      require("karma-chrome-launcher"),
      require("karma-webpack")
    ]
  });
};
