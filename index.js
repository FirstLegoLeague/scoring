const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const projectVersion = require('project-version')

const { correlationMiddleware } = require('@first-lego-league/ms-correlation')
const { authenticationMiddleware, authenticationDevMiddleware } = require('@first-lego-league/ms-auth')
const { Logger, loggerMiddleware } = require('@first-lego-league/ms-logger')

const DEFAULTS = require('./server/defaults')

const port = process.env.PORT || DEFAULTS.PORT

const app = express()

const logger = new Logger()
logger.info(`-------------------- scoring version ${projectVersion} startup --------------------`)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(correlationMiddleware)
app.use(loggerMiddleware)
app.use(cors())

const authMiddleware = process.env.NODE_ENV === 'development' ? authenticationDevMiddleware() : authenticationMiddleware

app.use('/scores', require('./server/scores')(authMiddleware))
app.use('/challenge', require('./server/challenge'))
app.use('/config', require('./server/config'))

if (process.env.NODE_ENV === 'development') {
  app.use(require('./server/dev_router'))
}

app.use(authMiddleware)

app.use(express.static(path.resolve(__dirname, 'dist')))

app.listen(port, () => {
  logger.info(`Scoring service listening on port ${port}`)
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
