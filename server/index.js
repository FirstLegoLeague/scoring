'use strict'

const express = require('express')
const path = require('path')

const DEFAULTS = require('./defaults')

const app = express()

// TODO add authentication and authorization

app.use(express.static(path.resolve(__dirname, 'src')))

app.use('scores', require('./scores'))

app.listen(process.env.PORT || DEFAULTS.PORT, () => {
  // TODO Log
})
