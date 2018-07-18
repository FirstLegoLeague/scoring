'use strict'
// eslint-disable node/no-deprecated-api

const express = require('express')
const path = require('path')
const domain = require('domain')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const { correlationMiddleware, correlateSession } = require('@first-lego-league/ms-correlation')
const { authenticationMiddleware, authenticationDevMiddleware } = require('@first-lego-league/ms-auth')
const { Logger, loggerMiddleware } = require('@first-lego-league/ms-logger')

const DEFAULTS = require('./server/defaults')

const port = process.env.PORT || DEFAULTS.PORT

const app = express()
const logger = new Logger()

app.use(correlationMiddleware)
app.use(loggerMiddleware)
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.DEV) {
  app.use(authenticationDevMiddleware())
} else {
  app.use(authenticationMiddleware)
}

app.use('/webfonts', express.static(path.resolve(__dirname, 'client/node_modules/@first-lego-league/user-interface/current/assets/fonts')))
app.use(express.static(path.resolve(__dirname, 'client')))

const apis = ['/scores', '/challenge', '/config']

apis.forEach(api => {
  // eslint-disable-next-line import/no-dynamic-require
  app.use(api, require(`./server${api}`))
})

if (process.env.DEV) {
  app.use('', require('./server/dev_router'))
}

app.listen(port, () => {
  domain.create().run(() => {
    correlateSession()
    logger.info(`Scoring service listening on port ${port}`)
  })
})

process.on('SIGINT', () => {
  logger.info('Process received SIGINT: shutting down')
  process.exit(1)
})
