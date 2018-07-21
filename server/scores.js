'use strict'

const express = require('express')
const Promise = require('bluebird')
const MongoClient = require('mongodb').MongoClient

const { authroizationMiddlware } = require('@first-lego-league/ms-auth')

const DEFAULTS = require('./defaults')

const mongoUrl = process.env.MONGO_URI || DEFAULTS.MONGO

const router = express.Router()

const connectionPromise = MongoClient
  .connect(mongoUrl, { promiseLibrary: Promise, useNewUrlParser: true })
  .then(client => client.db().collection('scores'))

function _validateScore (score) {
  let retError = ['ok', '']
  if (typeof score.teamNumber !== 'number') {
    retError[0] = 'loud-fail'
    retError[1] += 'team number '
  }

  if (score.score == null) {
    retError[0] = 'loud-fail'
    retError[1] += 'score '
  }

  if (score.signature.isEmpty) {
    retError[1] += 'signature '
    retError[0] = retError[0] === 'loud-fail' ? 'loud-fail' : 'silent-fail'
  }

  return retError
}

const adminAction = authroizationMiddlware(['admin', 'scorekeeper', 'development'])

router.post('/create', (req, res) => {
  let scoreValidation = []
  connect().then(scores => {
    scoreValidation = _validateScore(req.body)
    if (scoreValidation[0] !== 'loud-fail') {
      scores.save(req.body)
    }
  }).then(() => {
    if (scoreValidation[0] !== 'loud-fail') {
      res.status(201).send()
    } else {
      throw 'Invalid score'
    }

    if (scoreValidation[0] !== 'ok') {
      console.log('Invalid score, missing ' + scoreValidation[1] + '. ' + scoreValidation[0] + '.')
    }
  }).catch(() => {
    if (scoreValidation[0] === 'loud-fail') {
      res.status(422).send('Invalid score, missing ' + scoreValidation[1])
    } else {
      res.status(500).send('A problem occoured while trying to save score.')
    }
  })
  connectionPromise
    .then(scoringCollection => scoringCollection.save(req.body))
    .then(() => res.status(201).send())
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send('A problem occoured while trying to save score.')
    })
})

router.post('/:id/update', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.update({ _id: req.params.id }, { $set: req.body }))
    .then(() => res.status(204).send())
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to update score ${req.params.id}.`)
    })
})

router.delete('/:id/delete', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.remove({ _id: req.params.id }))
    .then(() => res.status(204).send())
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to delete score ${req.params.id}.`)
    })
})

router.get('/all', (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.find().toArray())
    .then(scores => res.status(201).send(scores))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send('A problem occoured while trying to get scores.')
    })
})

router.get('/:id', (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.findOne({ _id: req.params.id }))
    .then(score => res.status(200).json(score))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to get score ${req.params.id}.`)
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

// eslint-disable-next-line node/exports-style
module.exports = router
