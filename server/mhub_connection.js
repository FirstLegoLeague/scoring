'use strict'
/* eslint node/no-unsupported-features: 0 */

const { MClient } = require('mhub')
const logger = require('@first-lego-league/ms-logger').Logger()
const { getCorrelationId } = require('@first-lego-league/ms-correlation')

const MHUB_CLIENT_ID = 'cl-scoring'
const NODE = process.env.DEV ? 'default' : 'protected'

const mhubClient = new MClient(process.env.MHUB_URI)

mhubClient.on('error', msg => {
  logger.error('Unable to connect to mhub, other modules won\'t be notified changes \n ' + msg)
})

let connectionPromise = null

function connect () {
  if (!connectionPromise) {
    connectionPromise = mhubClient.connect()
    if (!process.env.DEV) {
      connectionPromise = connectionPromise
        .then(() => mhubClient.login('protected-client', process.env.PROTECTED_MHUB_PASSWORD))
    }
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
