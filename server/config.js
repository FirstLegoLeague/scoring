'use strict'

const express = require('express')

const Configuration = require('@first-lego-league/ms-configuration')

const router = express.Router()

router.get('/', (req, res) => {
  Configuration.all().then(config => {
    Object.assign(config, {
      mhub: process.env.MHUB_URI,
      node: process.env.DEV ? 'default' : 'protected',
      logout: `${process.env.MODULE_IDENTITY_PROVIDER_URL}/logout`,
      tournament: process.env.MODULE_TOURNAMENT_URL,
      rankings: `${process.env.MODULE_RANKINGS_URL}/rankings.csv`
    })
    res.json(config)
  }).catch(err => {
    req.logger.error(err)
    res.status(500).send('Could not load configuration')
  })
})

// eslint-disable-next-line node/exports-style
module.exports = router
