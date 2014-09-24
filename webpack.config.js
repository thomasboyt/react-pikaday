module.exports = {
  entry: {
    example: "./example/app.js",
  },

  output: {
    path: 'build/',
    filename: "example.bundle.js"
  },

  resolve: {
    modulesDirectories: ['node_modules'],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  }
};
