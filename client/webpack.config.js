'use strict'

const path = require('path')

// eslint-disable-next-line node/exports-style
module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
