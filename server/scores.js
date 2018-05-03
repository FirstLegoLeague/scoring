'use strict'

const express = require('express')
const mongojs = require('mongojs')
const Promise = require('bluebird')

const db = Promise.promisifyAll(mongojs(process.env.MONGO, ['scores']))

const router = express.Router()

router.post('/create', (req, res) => {
  db.scores.save(req.body).then(() => {
    res.status(201).send()
  }).catch(err => {
    // TODO log
    res.status(500).send(err)
  })
})

router.put('/:id/update', (req, res) => {
  db.scores.findAndModify({
    query: { _id: mongojs.ObjectId(req.params.id) },
    update: req.body
  }).then(() => {
    res.status(204).send()
  }).catch(err => {
    // TODO log
    res.status(500).send(err)
  })
})

router.delete('/:id/delete', (req, res) => {
  db.scores.remove({ _id: mongojs.ObjectId(req.params.id) }).then(() => {
    res.status(204).send()
  }).catch(err => {
    // TODO log
    res.status(500).send(err)
  })
})

router.get('/:id', (req, res) => {
  db.scores.findOne({ _id: mongojs.ObjectId(req.params.id) }).then(score => {
    res.status(200).json(score)
  }).catch(err => {
    // TODO log
    res.status(500).send(err)
  })
})

// eslint-disable-next-line node/exports-style
module.exports = router
