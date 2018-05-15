const path = require('path');

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    options: './options/index.js',
    popup: './popup/index.js',
  },
  output: {
    filename: '[name]/index.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]/index.html'
            }
          },
          'extract-loader',
          'html-loader',
        ],
      },
    ],
  },
  mode: 'none',
  stats: 'verbose'
//  watch: true,
};
