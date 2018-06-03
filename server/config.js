'use strict'

const express = require('express')
const path = require('path')

const Configuration = require('@first-lego-league/ms-configuration')

const router = express.Router()

router.use('/', (req, res) => {
	Configuration.all().then(config => {
		Object.assign(config, {
			mhub: process.env.MHUB
		})
		res.json(config)
	})
})

// eslint-disable-next-line node/exports-style
module.exports = router
