'use strict'
/* eslint node/no-unsupported-features: 0 */

const express = require('express')
const Promise = require('bluebird')
const { MongoClient, ObjectID } = require('mongodb')
const { authroizationMiddlware } = require('@first-lego-league/ms-auth')
const Configuration = require('@first-lego-league/ms-configuration')

const { publishMsg } = require('./mhub_connection')
const DEFAULTS = require('./defaults')

const mongoUrl = process.env.MONGO_URI || DEFAULTS.MONGO

const router = express.Router()

const SCORE_FIELDS = {
  missions: 'as-is',
  score: Number,
  challenge: String,
  teamNumber: Number,
  round: Number,
  stage: String,
  matchId: String,
  referee: String,
  tableId: String
}

const POSSIBLY_REQUIRED_FIELDS = {
  requireSignature: 'signature'
}

const REQUIRED_FIELDS = ['missions', 'score', 'challenge', 'teamNumber', 'round', 'stage', 'matchId']

class InvalidScore extends Error {
  constructor (message) {
    super()
    this.message = message
    Error.captureStackTrace(this, InvalidScore)
  }
}

const connectionPromise = MongoClient
  .connect(mongoUrl, { promiseLibrary: Promise, useNewUrlParser: true })
  .then(client => client.db().collection('scores'))

function validateScore (rawScore) {
  return Configuration.all().then(config => {
    const allowedFields = Object.keys(SCORE_FIELDS)
    const requiredFields = Array.from(REQUIRED_FIELDS)

    Object.entries(POSSIBLY_REQUIRED_FIELDS).forEach(([configField, field]) => {
      if (config[configField]) {
        allowedFields.push(field)
        requiredFields.push(field)
      }
    })

    const score = allowedFields.reduce((scoreObject, field) => {
      if (rawScore.hasOwnProperty(field)) {
        scoreObject[field] = rawScore[field]
      } else if (requiredFields.includes(field)) {
        throw new InvalidScore(`Missing field: ${field}`)
      }
      return scoreObject
    }, { public: config.autoPublish })
    return score
  })
}

function scoreFromQuery (query) {
  return Object.entries(query).reduce((result, [key, value]) => {
    const Type = SCORE_FIELDS[key]
    if (Type) {
      if (Type === 'as-is') {
        result[key] = value
      } else {
        result[key] = Type(value)
      }
    }
    return result
  }, {})
}

function shouldPublish () {
  return connectionPromise
    .then(scoringCollection => scoringCollection.find().toArray())
    .then(scores => scores.every(score => {
      return (typeof score.teamNumber === 'number') && (typeof score.matchId === 'string') &&
        scores.every(otherScore => score === otherScore ||
          otherScore.teamNumber !== score.teamNumber || otherScore.matchId !== score.matchId)
    }))
}

function publishReloadIfShould (logger) {
  return shouldPublish().then(shouldReload => {
    if (shouldReload) {
      publishMsg('scores:reload')
    } else {
      logger.info('Not publishing scores due to a scoring error')
    }
  })
}

const adminAction = authroizationMiddlware(['admin', 'scorekeeper', 'development'])

router.post('/create', (req, res) => {
  Promise.all([connectionPromise, validateScore(req.body)])
    .then(([scoringCollection, score]) => {
      req.logger.info(`Saving score for team ${score.teamNumber} on ${score.stage} stage with ${score.score} pts.`)
      return scoringCollection.save(score)
    })
    .then(() => res.status(201).send())
    .then(() => publishReloadIfShould(req.logger))
    .catch(err => {
      req.logger.error(err.message)
      if (err instanceof InvalidScore) {
        res.status(422).send(err.message)
      } else {
        res.status(500).send(`A problem occoured while trying to update score ${req.params.id}.`)
      }
    })
})

router.post('/:id/update', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => {
      return scoringCollection.update({ _id: new ObjectID(req.params.id) }, { $set: scoreFromQuery(req.body) })
    })
    .then(() => res.status(204).send())
    .then(() => publishReloadIfShould(req.logger))
    .catch(err => {
      req.logger.error(err.message)
      if (err instanceof InvalidScore) {
        res.status(422).send(err.message)
      } else {
        res.status(500).send(`A problem occoured while trying to update score ${req.params.id}.`)
      }
    })
})

router.delete('/all', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.deleteMany({}))
    .then(() => res.status(204).send())
    .then(() => publishReloadIfShould(req.logger))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send('A problem occoured while trying to delete scores.')
    })
})

router.delete('/:id/delete', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.deleteOne({ _id: new ObjectID(req.params.id) }))
    .then(() => res.status(204).send())
    .then(() => publishReloadIfShould(req.logger))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to delete score ${req.params.id}.`)
    })
})

router.get('/all', (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.find().toArray())
    .then(scores => res.status(200).send(scores))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send('A problem occoured while trying to get scores.')
    })
})

router.get('/search', (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.find(scoreFromQuery(req.query)))
    .then(score => res.status(200).json(score))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(err)
    })
})

router.get('/count', (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.count())
    .then(count => res.status(200).json({ count }))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(err)
    })
})

router.get('/:id', (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.findOne({ _id: new ObjectID(req.params.id) }))
    .then(score => res.status(200).json(score))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to get score ${req.params.id}.`)
    })
})

// eslint-disable-next-line node/exports-style
module.exports = router
