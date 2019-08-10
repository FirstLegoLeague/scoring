const express = require('express')
const path = require('path')
const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))

const challengeRouter = new express.Router()

challengeRouter.get('/:challenge', (req, res) => {
  fs.readFileAsync(path.resolve('challenges', 'js', `${req.params['challenge']}.js`))
    .then(challenge => {
      res.send(challenge)
    }).catch(err => {
      let status, message
      if (err.code === 'ENOENT') {
        message = `Could not find challenge ${req.params['challenge']}.`
        status = 404
      } else {
        message = `A problem occoured while trying to find challenge ${req.params['challenge']}.`
        status = 500
      }

      req.logger.error(message)
      res.status(status).send(message)
    })
})

exports.challengeRouter = challengeRouter
