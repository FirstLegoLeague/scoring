'use strict'

const express = require('express')

const router = express.Router()

const TEAMS = [
  { number: 1, name: 'The first team' },
  { number: 2, name: 'Two is always together' },
  { number: 8, name: 'Magic 8' },
  { number: 15, name: 'The RoboJars' },
  { number: 54, name: 'What will you get if you multiply six by nine?' },
  { number: 123, name: 'Genesis' },
  { number: 132, name: 'King of Hearts' },
  { number: 173, name: 'The Society of the Blind Eye' },
  { number: 182, name: 'The blue dot' },
  { number: 534, name: 'The Fellowship of the Ring' },
  { number: 856, name: 'The Order of the Phoenix' },
  { number: 956, name: 'ElectroWreckers' },
  { number: 981, name: 'The Green slime club' },
  { number: 2212, name: 'The Spikes' },
  { number: 8846, name: 'Syntax error' }
]

var TEAMS_MATCHES = []
const MATCH_LIST = [
  { complete: false, match: '1' },
  { complete: false, match: '2' },
  { complete: false, match: '3' }
]

for (let i = 0; i < TEAMS.length; i++) {
  TEAMS_MATCHES.push({ number: TEAMS[i], matches: MATCH_LIST })
}

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
