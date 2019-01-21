function Score (tournament) {
  return function (attrs) {
    const score = attrs

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

          score.teamText = score.teamError ? 'Missing team' : score.team.displayText
          score.matchText = score.matchError ? 'Missing round' : score.match.displayText
          score.tableText = score.noTable ? 'No table' : score.table.tableName
          score.dateText = `${score.creation.getHours()}:${score.creation.getMinutes()}`

          if (score.creation.getTime() !== score.lastUpdate.getTime()) {
            score.dateText += ' (updated)'
          }

          score.ready = true
        })
    }

    score.sanitize = config => {
      const sanitizedScore = {
        missions: score.missions.map(mission => {
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
        challenge: score.title,
        teamNumber: score.teamNumber,
        round: score.round,
        stage: score.stage,
        matchId: score.matchId
      }

      Object.entries(Score.POSSIBLY_REQUIRED_FIELDS).forEach(([configField, field]) => {
        if (config[configField]) {
          sanitizedScore[field.name] = field.type && score[field.name] !== undefined ? field.type(score[field.name]) : score[field.name]
        }
      })

      return sanitizedScore
    }

    score.updateMatch = () => {
      return tournament.loadTeamMatches(score.teamNumber)
        .then(matches => {
          score.matches = matches
          score.matchId = matches.find(match => match.stage === score.stage && match.round === score.round).matchId
        })
    }

    score.teamText = score.matchText = score.tableText = 'Loading...'
    score.teamError = score.matchError = score.ready = false

    return score
  }
}

Score.POSSIBLY_REQUIRED_FIELDS = {
  requireRef: { name: 'referee', type: String },
  requireTable: { name: 'tableId', type: Number },
  requireSignature: { name: 'signature' }
}

Score.$inject = ['Tournament']

export default Score
