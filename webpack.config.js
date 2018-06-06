const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
  devtool: 'inline-source-map',
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
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ["node_modules"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index.css',
    }),
  ],
  mode: 'none',
  stats: 'verbose'
//  watch: true,
};
