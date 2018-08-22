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

class MissingFieldError extends Error {
  constructor (err) {
    super()
    this.error = err
    Error.captureStackTrace(this, MissingFieldError)
  }
}

const ERROR = {
  TEAM_NUMBER: 'team number ',
  SCORE: 'score ',
  MATCH: 'match ',
  NONE: ''
}

const connectionPromise = MongoClient
  .connect(mongoUrl, { promiseLibrary: Promise, useNewUrlParser: true })
  .then(client => client.db().collection('scores'))

function _validateScore (score) {
  const validatedScore = score

  const missingFieldError = new MissingFieldError(ERROR.NONE)

  return Configuration.get('autoPublish').then(autoPublishSetting => {
    validatedScore.public = autoPublishSetting

    if (typeof validatedScore.teamNumber !== 'number') { missingFieldError.error += ERROR.TEAM_NUMBER }
    if (validatedScore.score == null) { missingFieldError.error += ERROR.SCORE }
    if (typeof validatedScore.teamNumber !== 'number') { missingFieldError.error += ERROR.MATCH }

    if (missingFieldError.error !== ERROR.NONE) { throw missingFieldError }

    return validatedScore
  })
}

function shouldPublish () {
  return connectionPromise
    .then(scoringCollection => scoringCollection.find().toArray())
    .then(scores => scores.every(score => {
      return (typeof score.teamNumber === 'number') && (typeof score.mathcId === 'string') &&
        scores.every(otherScore => score === otherScore ||
          otherScore.teamNumber !== score.teamNumber || otherScore.matchId !== score.matchId)
    }))
}

function publishReloadIfShould () {
  return shouldPublish().then(shouldReload => {
    if (shouldReload) {
      publishMsg('scores:reload')
    }
  })
}

const adminAction = authroizationMiddlware(['admin', 'scorekeeper', 'development'])

router.post('/create', (req, res) => {
  _validateScore(req.body).then(validatedScore => {
    return connectionPromise
      .then(scoringCollection => {
        return scoringCollection.save(validatedScore)
      })
      .then(() => {
        res.status(201).send()
      })
  })
    .then(() => publishReloadIfShould())
    .catch(err => {
      if (err instanceof MissingFieldError) {
        req.logger.error('Invalid score, missing ' + err.error + '. ')
        res.status(422).send('Invalid score, missing ' + err.error)
      } else {
        req.logger.error(err.message)
        res.status(500).send(`A problem occoured while trying to update score ${req.params.id}.`)
      }
    })
})

router.post('/:id/update', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.update({ _id: new ObjectID(req.params.id) }, { $set: req.body }))
    .then(() => res.status(204).send())
    .then(() => publishReloadIfShould())
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to update score ${req.params.id}.`)
    })
})

router.delete('/all', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.deleteMany({}))
    .then(() => res.status(204).send())
    .then(() => publishReloadIfShould())
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send('A problem occoured while trying to delete scores.')
    })
})

router.delete('/:id/delete', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.deleteOne({ _id: new ObjectID(req.params.id) }))
    .then(() => res.status(204).send())
    .then(() => publishReloadIfShould())
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
    .then(scoringCollection => scoringCollection.findOne(req.query))
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
