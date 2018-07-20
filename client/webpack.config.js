'use strict'

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebPackPlugin = require('copy-webpack-plugin')

// eslint-disable-next-line node/exports-style
module.exports = {
  entry: './src/main.js',
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
      template: './src/index.html',
      filename: './index.html',
      favicon: './node_modules/@first-lego-league/user-interface/current/assets/img/first-favicon.ico'
    }),
    new CopyWebPackPlugin([{
      from: './node_modules/@first-lego-league/user-interface/current/assets/fonts',
      to: './webfonts'
    }])
  ]
}
