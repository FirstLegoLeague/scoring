'use strict'

const express = require('express')
const mongo = require('mongodb-bluebird')

const { authroizationMiddlware } = require('@first-lego-league/ms-auth')

const DEFAULTS = require('./defaults')

const mongoUrl = process.env.MONGO || DEFAULTS.MONGO

const router = express.Router()

function connect() {
  return mongo.connect(mongoUrl)
    .then(db => db.collection('scores'))
}

function _validateScore(score) {
  var retError = ["ok", ""]
  if (typeof score.teamNumber != "number")
  {
    retError[0] = "loud-fail";
    retError[1] += "team number "
  }

  if (score.score == null)
  {
    retError[0] = "loud-fail"
    retError[1] += "score "
  }

  if (score.signature.isEmpty)
  {
    retError[1] += "signature "
    retError[0] = retError[0] === "loud-fail" ? "loud-fail" : "silent-fail"
  }

  return retError
}

const adminAction = authroizationMiddlware(['admin', 'scorekeeper', 'development'])

router.post('/create', (req, res) => {
  var scoreValidation = []
  connect().then(scores => {
    scoreValidation = _validateScore(req.body)
    if (scoreValidation[0] != "loud-fail")
    {
      scores.save(req.body)
    }
  }).then(() => {
    if (scoreValidation[0] != "loud-fail")
    {
      res.status(201).send()
    } else
    {
      throw "Invalid score"
    }

    if (scoreValidation[0] != "ok")
    {
      console.log("Invalid score, missing " + scoreValidation[1] + ". " + scoreValidation[0] + ".")
    }

  }).catch(() => {
    if (scoreValidation[0] === "loud-fail")
    {
      res.status(422).send("Invalid score, missing " + scoreValidation[1])
    } else
    {
      res.status(500).send('A problem occoured while trying to save score.')
    }
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
    res.status(500).send('A problem occoured while trying to save score.')
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
