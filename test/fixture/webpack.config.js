module.exports = {
  entry: [
    '../../client',
    './app.js',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
    ],
  },
};
