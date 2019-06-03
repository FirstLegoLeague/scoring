'use strict'

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

// eslint-disable-next-line node/exports-style
module.exports = {
  entry: './client/main.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpeg|jpg|tif|gif|ico)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './client/index.html',
      filename: './index.html'
    })
  ]
}
