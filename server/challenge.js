'use strict'

const express = require('express')
const path = require('path')
const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))

const router = express.Router()

router.use((req, res) => {
  fs.readFile(path.resolve(__dirname, 'challenges', 'challenge' /* TODO configurable challenge */))
    .then(challenge => {
      res.json(challenge)
    }).catch(err => {
      // TODO log
      res.status(500).send(err)
    })
})

// eslint-disable-next-line node/exports-style
module.exports = router
