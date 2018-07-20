'use strict'

const express = require('express')

const Configuration = require('@first-lego-league/ms-configuration')

const router = express.Router()

router.use('/', (req, res) => {
  Configuration.all().then(config => {
    Object.assign(config, {
      mhub: process.env.MHUB,
      logout: `${process.env.MODULE_IDENTITY_PROVIDER_URL}/logout`,
      tournament: process.env.MODULE_TOURNAMENT_URL
    })
    res.json(config)
  }).catch(err => {
    req.logger.error(err)
    res.status(500).send('Could not load configuration')
  })
})

// eslint-disable-next-line node/exports-style
module.exports = router
