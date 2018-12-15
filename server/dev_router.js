'use strict'

const express = require('express')
require('express-csv')

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

const TEAMS_MATCHES = []
const MATCHES = [
  { stage: 'pracitce' },
  { stage: 'scoring' },
  { stage: 'scoring' },
  { stage: 'scoring' }
]

let matchId = 0
TEAMS.forEach(team => {
  MATCHES.forEach(match => {
    TEAMS_MATCHES.push(Object.assign({ _id: String(matchId), teams: [team.number] }, match))
    matchId++
  })
})

const TABLES = [
  { tableId: 1, tableName: 'Rick' },
  { tableId: 2, tableName: 'Morty' },
  { tableId: 3, tableName: 'Forty Two' },
  { tableId: 4, tableName: 'Beware of the Leopard' }
]

router.get('/team/all', (req, res) => {
  res.json(TEAMS)
})

router.get('/table/all', (req, res) => {
  res.json(TABLES)
})

router.get(`/team/:teamNumber/matches`, (req, res) => {
  res.json(TEAMS_MATCHES.filter(teamMatch => teamMatch.teams[0] === parseInt(req.params.teamNumber)))
})

router.get(`/rankings.csv`, (req, res) => {
  const headers = ['rank', 'team', 'highest', '1', '2', '3']
  res.csv([headers].concat(TEAMS.map((team, index) => {
    const scores = [true, true, true].map(() => Math.floor(100 * Math.random()))
    const highest = Math.max(scores[0], scores[1], scores[2])
    return [index + 1, team.number, highest].concat(scores)
  })))
})

router.get('/match/upcoming/:count', (req, res) => {
  res.json([{
    matchTeams: [{
      teamNumber: 2212,
      tableId: 1
    }, {
      teamNumber: 173,
      tableId: 2
    }]
  }, {
    matchTeams: [{
      teamNumber: 8846,
      tableId: 3
    }, {
      teamNumber: 15,
      tableId: 4
    }]
  }])
})

// eslint-disable-next-line node/exports-style
module.exports = router
