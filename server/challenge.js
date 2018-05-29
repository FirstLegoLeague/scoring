'use strict'

const express = require('express')
const path = require('path')
const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))

const router = express.Router()

router.use('/:challenge', (req, res) => {
  fs.readFileAsync(path.resolve(__dirname, '..', 'challenges', 'js', `${req.params['challenge']}.js`))
    .then(challenge => {
      res.send(challenge)
    }).catch(err => {
      // TODO log
      res.status(500).send(err)
    })
})

// eslint-disable-next-line node/exports-style
module.exports = router
