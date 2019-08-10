const express = require('express')
const path = require('path')

const Configuration = require('@first-lego-league/ms-configuration')

const configRouter = new express.Router()

configRouter.get('/', (req, res) => {
  req.logger.info(path.resolve('module.yml'))
  req.logger.info(process.env.CWD)
  Configuration.all().then(config => {
    Object.assign(config, {
      mhub: process.env.MHUB_URI,
      tournamentUrl: process.env.MODULE_TOURNAMENT_URL,
      rankingsUrl: process.env.MODULE_RANKINGS_URL
    })
    res.json(config)
  }).catch(err => {
    req.logger.error(err.message)
    res.status(500).send('Could not load configuration')
  })
})

exports.configRouter = configRouter
