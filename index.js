'use strict'

const express = require('express')
const path = require('path')
// eslint-disable-next-line node/no-deprecated-api
const domain = require('domain')
// eslint-disable-next-line node/no-unsupported-features
const { correlationMiddleware, correlateSession } = require('@first-lego-league/ms-correlation')
// const auth = require('@first-lego-league/ms-authentication')
// eslint-disable-next-line node/no-unsupported-features
const { Logger, loggerMiddleware } = require('@first-lego-league/ms-logger')

const DEFAULTS = require('./server/defaults')

const port = process.env.PORT || DEFAULTS.PORT

const app = express()
const logger = new Logger()

app.use(correlationMiddleware)
app.use(loggerMiddleware)

// app.use('/index.html', auth)

app.use('/webfonts', express.static(path.resolve(__dirname, 'client/node_modules/@first-lego-league/user-interface/current/assets/fonts')))
app.use(express.static(path.resolve(__dirname, 'client')))

const apis = ['scores', 'challenge']

apis.forEach(api => {
  // eslint-disable-next-line import/no-dynamic-require
  app.use(api, require(`./server/${api}`))
})

app.listen(port, () => {
  domain.create().run(() => {
    correlateSession()
    logger.info(`Scoring service listening on port ${port}`)
  })
})
