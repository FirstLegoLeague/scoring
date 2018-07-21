'use strict'

const express = require('express')
const path = require('path')
const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))

const router = express.Router()

router.get('/:challenge', (req, res) => {
  fs.readFileAsync(path.resolve(__dirname, '..', 'challenges', 'js', `${req.params['challenge']}.js`))
    .then(challenge => {
      res.send(challenge)
    }).catch(err => {
      if (err.code === 'ENOENT') {
        res.status(404).send(`Could not find challenge ${req.params['challenge']}.`)
      } else {
        res.status(404).send(`A problem occoured while trying to find challenge ${req.params['challenge']}.`)
      }
    })
})

// eslint-disable-next-line node/exports-style
module.exports = router
