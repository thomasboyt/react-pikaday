var webpack = require('webpack');

var webpackConfig = {
  devtool: 'inline-source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules\/)/,
        loader: 'babel-loader'
      },
    ],

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"test"'
        }
      })
    ]
  }
};

module.exports = function(config) {
  config.set({

    browsers: ['Chrome'],
    frameworks: ['mocha'],
    reporters: ['mocha'],

    files: [
      'src/__tests__/main.spec.js',
    ],

    preprocessors: {
      'src/__tests__/main.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true,
    },
  });
};
