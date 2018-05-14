const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    options: './src/js/options.js',
    popup: './src/js/popup.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/js',
  },
  mode: 'none',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/*.html',
        to: '..',
        flatten: true,
      },
    ]),
  ],
};
