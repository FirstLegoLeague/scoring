const { MClient } = require('mhub')
const logger = require('@first-lego-league/ms-logger').Logger()
const { getCorrelationId } = require('@first-lego-league/ms-correlation')

const MHUB_CLIENT_ID = 'cl-scoring'
const NODE = 'protected'

const mhubClient = new MClient(process.env.MHUB_URI)

let connectionPromise = null

mhubClient.on('error', msg => {
  logger.error('Unable to connect to mhub, other modules won\'t be notified changes \n ' + msg)
})

mhubClient.on('close', () => {
  connectionPromise = null
  logger.warn('Disconnected from mhub. Retrying upon next publish')
})

function connect () {
  if (!connectionPromise) {
    connectionPromise = mhubClient.connect()
      .then(() => logger.info('Connected to mhub'))
      .then(() => mhubClient.login('protected-client', process.env.PROTECTED_MHUB_PASSWORD))
  }
  return connectionPromise
}

exports.publishMsg = function (topic, data = {}) {
  return connect()
    .then(() => mhubClient.publish(NODE, topic, data, {
      'client-id': MHUB_CLIENT_ID,
      'correlation-id': getCorrelationId()
    }))
}
