module.exports = {
  entry: {
    example: "./example/app.js",
  },

  output: {
    // path: 'example/',
    filename: "example/example.bundle.js"
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
