function getPaddedNumber (number, digits = 2, padding = '0') {
  const string = String(number)
  if (string.length >= digits) {
    return string
  } else {
    return new Array(digits - string.length + 1).join(padding) + string
  }
}

function Score (tournament, challenge) {
  const DEFAULT_FILEDS = { score: 0 }
  challenge.init()
    .then(() => Object.assign(DEFAULT_FILEDS, challenge.challenge))
    .catch(error => console.error(error))

  return function (attrs = {}) {
    const score = { }

    /* Properties */

    Object.defineProperties(score, {
      teamNumber: {
        get: () => score._teamNumber,
        set: teamNumber => {
          score._teamNumber = teamNumber
          if (score.teamNumber && (score.matchId || (score.stage && score.round))) {
            tournament.loadTeamMatches(score.teamNumber)
              .then(matches => {
                score.matches = matches
                if (score.round && score.stage) {
                  score.match = matches.find(match => match.round === score.round && match.stage === score.stage)
                  score.matchId = score.match._id
                } else if (score.matchId) {
                  score.match = score.matches.find(m => m._id === score.matchId)
                  score.stage = score.match.stage
                  score.round = score.match.round
                }
              })
              .catch(error => console.error(error))
          }
        }
      },
      matchId: {
        get: () => score._matchId,
        set: matchId => {
          score._matchId = matchId
          if (score.matches) {
            score.match = score.matches.find(m => m._id === score.matchId)
            score.stage = score.match.stage
            score.round = score.match.round
          }
        }
      }
    })

    Object.assign(score, DEFAULT_FILEDS, attrs)
    score.teamText = score.matchText = score.tableText = 'Loading...'
    score.teamError = score.matchError = score.ready = false

    score.init = () => {
      if (!score._initPromise) {
        score._initPromise = score.load()
      }
      return score._initPromise
    }

    score.load = () => {
      return Promise.all([tournament.loadTeamMatches(score.teamNumber), tournament.loadTeams(), tournament.loadTables()])
        .then(([matches, teams, tables]) => {
          score.matches = matches
          score.match = matches.find(match => match.round === score.round && match.stage === score.stage)
          score.team = teams.find(team => team.number === score.teamNumber)
          score.table = tables.find(table => table.tableId === score.tableId)

          score.matchError = Boolean(!score.match)
          score.teamError = Boolean(!score.team)
          score.noTable = Boolean(!score.table)

          score.creation = new Date(score.creation)
          score.lastUpdate = new Date(score.lastUpdate)

          score.scoreText = score.score || 0
          score.teamText = score.teamError ? 'Missing team' : score.team.displayText
          score.matchText = score.matchError ? 'Missing round' : score.match.displayText
          score.tableText = score.noTable ? 'No table' : score.table.tableName
          score.dateText = `${getPaddedNumber(score.creation.getHours())}:${getPaddedNumber(score.creation.getMinutes())}`

          if (score.creation.getTime() !== score.lastUpdate.getTime()) {
            score.dateText += ` (${getPaddedNumber(score.lastUpdate.getHours())}:${getPaddedNumber(score.lastUpdate.getMinutes())})`
          }

          score.ready = true
        })
    }

    score.sanitize = config => {
      const sanitizedScore = {
        missions: (score.missions || challenge.challenge.missions).map(mission => {
          return {
            id: mission.id,
            score: mission.score,
            objectives: mission.objectives.map(objective => {
              return {
                id: objective.id,
                value: objective.value
              }
            })
          }
        }),
        score: score.score,
        challenge: score.title || challenge.challenge.title,
        teamNumber: score.teamNumber,
        matchId: score.matchId,
        round: score.round,
        stage: score.stage,
        noShow: !!score.noShow,
        public: !!score.public
      }

      Object.entries(Score.POSSIBLY_REQUIRED_FIELDS).forEach(([configField, field]) => {
        if (config[configField]) {
          sanitizedScore[field.name] = field.type && score[field.name] !== undefined ? field.type(score[field.name]) : score[field.name]
        }
      })

      return sanitizedScore
    }

    return score
  }
}

Score.POSSIBLY_REQUIRED_FIELDS = {
  requireRef: { name: 'referee', type: String },
  requireTable: { name: 'tableId', type: Number },
  requireSignature: { name: 'signature' }
}

Score.$inject = ['Tournament', 'Challenge']

export default Score
