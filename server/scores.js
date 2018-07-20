'use strict'

const express = require('express')
const Promise = require('bluebird')
const mongo = require('mongodb-bluebird')

const { authroizationMiddlware } = require('@first-lego-league/ms-auth')

const DEFAULTS = require('./defaults')

const mongoUrl = process.env.MONGO_URI || DEFAULTS.MONGO

const router = express.Router()

function connect () {
  return new Promise((resolve, reject) => {
    mongo.connect(mongoUrl)
      .then(db => {
        resolve(db.collection('scores'))
        db.close()
      })
      .catch(reject)
  })
}

const adminAction = authroizationMiddlware(['admin', 'scorekeeper', 'development'])

router.post('/create', (req, res) => {
  connect().then(scores => {
    scores.save(req.body)
  }).then(() => {
    res.status(201).send()
  }).catch(() => {
    res.status(500).send('A problem occoured while trying to save score.')
  })
})

router.post('/:id/update', adminAction, (req, res) => {
  connect().then(scores => {
    scores.update({ _id: req.params.id }, { $set: req.body })
  }).then(() => {
    res.status(204).send()
  }).catch(() => {
    res.status(500).send(`A problem occoured while trying to update score ${req.params.id}.`)
  })
})

router.delete('/:id/delete', adminAction, (req, res) => {
  connect().then(scores => {
    scores.remove({ _id: req.params.id })
  }).then(() => {
    res.status(204).send()
  }).catch(() => {
    res.status(500).send(`A problem occoured while trying to delete score ${req.params.id}.`)
  })
})

router.get('/all', (req, res) => {
  connect().then(scores => {
    return scores.find()
  }).then(scores => {
    res.status(201).send(scores)
  }).catch(() => {
    res.status(500).send('A problem occoured while trying to get scores.')
  })
})

router.get('/:id', (req, res) => {
  connect().then(scores => {
    return scores.findOne({ _id: req.params.id })
  }).then(score => {
    res.status(200).json(score)
  }).catch(() => {
    res.status(500).send(`A problem occoured while trying to get score ${req.params.id}.`)
  })
})

router.get('/search', (req, res) => {
  connect().then(scores => {
    return scores.findOne(req.query)
  }).then(score => {
    res.status(200).json(score)
  }).catch(err => {
    res.status(500).send(err)
  })
})

// eslint-disable-next-line node/exports-style
module.exports = router
