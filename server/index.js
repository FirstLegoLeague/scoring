const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const { correlationMiddleware } = require('@first-lego-league/ms-correlation')
const { authenticationMiddleware, authenticationDevMiddleware } = require('@first-lego-league/ms-auth')
const { Logger, loggerMiddleware } = require('@first-lego-league/ms-logger')

const { scoresRouter } = require('./scores')
const { challengeRouter } = require('./challenge')
const { configRouter } = require('./config')

const { version } = require('../package.json')

const app = express()

const logger = new Logger()
logger.info(`-------------------- scoring version ${version} startup --------------------`)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(correlationMiddleware)
app.use(loggerMiddleware)
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(authenticationDevMiddleware())
} else {
  app.use(authenticationMiddleware)
}

// app.use('/scores', scoresRouter)
app.use('/challenge', challengeRouter)
app.use('/config', configRouter)

app.use(express.static(path.resolve(__dirname, '..', 'dist')))

app.listen(process.env.PORT, () => {
  logger.info(`Scoring service listening on port ${process.env.PORT}`)
})

process.on('SIGINT', () => {
  logger.info('Process received SIGINT: shutting down')
  process.exit(130)
})

process.on('uncaughtException', err => {
  logger.fatal(err.message)
  process.exit(1)
})

process.on('unhandledRejection', err => {
  logger.fatal(err.message)
  process.exit(1)
})
