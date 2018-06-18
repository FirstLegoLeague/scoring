'use strict'

const express = require('express')

const router = express.Router()

const TEAMS = [
  { number: 1, name: 'The first team' },
  { number: 2, name: 'Two is always together' },
  { number: 8, name: 'Magic 8' },
  { number: 15, name: 'The RoboJars' },
  { number: 123, name: 'Genesis' },
  { number: 132, name: 'King of Hearts' },
  { number: 956, name: 'ElectroWreckers' },
  { number: 2212, name: 'The Spikes' }
]

const TABLES = [
  { tableId: 1, tableName: 'Rick' },
  { tableId: 2, tableName: 'Morty' },
  { tableId: 3, tableName: 'Forty Two' },
  { tableId: 4, tableName: 'Beware of the Leopard' }
]

router.use('/team/all', (req, res) => {
  res.json(TEAMS)
})

router.use('/table/all', (req, res) => {
  res.json(TABLES)
})

// eslint-disable-next-line node/exports-style
module.exports = router
