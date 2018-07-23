'use strict'

const express = require('express')
const Promise = require('bluebird')
const { MongoClient, ObjectID } = require('mongodb')
const { authorizationMiddlware } = require('@first-lego-league/ms-auth')

const DEFAULTS = require('./defaults')

const mongoUrl = process.env.MONGO_URI || DEFAULTS.MONGO

const router = express.Router()

const connectionPromise = MongoClient
  .connect(mongoUrl, { promiseLibrary: Promise, useNewUrlParser: true })
  .then(client => client.db().collection('scores'))

function _validateScore (score) {
  let retError = { 'status': 'ok', 'errors': '' }

  if (typeof score.teamNumber !== 'number' || score.match == null || score.score == null) {
    retError.status = 'loud-fail'
    if (typeof score.teamNumber !== 'number') { retError.errors += 'team number ' }
    if (score.score == null) { retError.errors += 'score ' }
    if (score.match == null) { retError.errors += 'match ' }
  }

  if (score.signature.isEmpty) {
    retError.errors += 'signature '
    retError.status = retError.status === 'loud-fail' ? 'loud-fail' : 'silent-fail'
  }

  return retError
}

const adminAction = authorizationMiddlware(['admin', 'scorekeeper', 'development'])

router.post('/create', (req, res) => {
  const scoreValidation = _validateScore(req.body)

  if (scoreValidation.status !== 'ok') {
    req.logger.error('Invalid score, missing ' + scoreValidation.errors + '. ' + scoreValidation.status + '.')
  }

  if (scoreValidation.status !== 'loud-fail') {
    connectionPromise
      .then(scoringCollection => {
        scoringCollection.save(req.body)
      })
      .then(() => {
        res.status(201).send()
      })
      .catch(err => {
        req.logger.error(err.message)
        res.status(500).send('A problem occoured while trying to save score.')
      })
  } else {
    res.status(422).send('Invalid score, missing ' + scoreValidation.errors)
  }
})

router.post('/:id/update', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.update({ _id: new ObjectID(req.params.id) }, { $set: req.body }))
    .then(() => res.status(204).send())
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to update score ${req.params.id}.`)
    })
})

router.delete('/:id/delete', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.deleteOne({ _id: new ObjectID(req.params.id) }))
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
    .then(scoringCollection => scoringCollection.findOne({ _id: new ObjectID(req.params.id) }))
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
