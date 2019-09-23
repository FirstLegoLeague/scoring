import Promise from 'bluebird'

function getPaddedNumber (number, digits = 2, padding = '0') {
  const string = String(number)
  if (string.length >= digits) {
    return string
  } else {
    return new Array(digits - string.length + 1).join(padding) + string
  }
}

function Score (tournament, challenge, logger) {
  const DEFAULT_FILEDS = { score: 0 }
  challenge.init()
    .then(() => Object.assign(DEFAULT_FILEDS, challenge.challenge))
    .catch(error => logger.error(error))

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
              .catch(error => logger.error(error))
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

          if (score.creation !== undefined) {
            score.creationTime = new Date(score.creation)
            score.creationText = `${getPaddedNumber(score.creationTime.getHours())}:${getPaddedNumber(score.creationTime.getMinutes())}`
            score.dateText = score.creationText
          }
          if (score.lastUpdate !== undefined) {
            score.lastUpdateTime = new Date(score.lastUpdate)

            if (score.creationTime.getTime() !== score.lastUpdateTime.getTime()) {
              score.updateText = `${getPaddedNumber(score.lastUpdateTime.getHours())}:${getPaddedNumber(score.lastUpdateTime.getMinutes())}`
              score.dateText += ` (${score.updateText})`
            }
          }

          score.scoreText = score.score || 0
          score.teamText = score.teamError ? 'Missing team' : score.team.displayText
          score.matchText = score.matchError ? 'Missing round' : score.match.displayText
          score.refereeText = score.referee || 'Ref ?'
          score.tableText = score.noTable ? 'Table ?' : score.table.tableName

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
        noShow: !!score.noShow
      }

      // Don't add the `public` field if it isn't there already, as to not overrun to autoPublish in the server.
      if (score.public) {
        sanitizedScore.public = true
      }

      Object.entries(Score.POSSIBLY_REQUIRED_FIELDS).forEach(([configField, field]) => {
        if (config[configField]) {
          sanitizedScore[field.name] = field.type && score[field.name] !== undefined ? field.type(score[field.name]) : score[field.name]
        }
      })

      return sanitizedScore
    }

    score.fakeSignature = () => {
      score.signature = {
        isEmpty: false,
        dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACACAYAAACx1FRUAAAEXklEQVR4Xu3UMU0FQBRE0aEioaDCAiVGSOixhRo80IILEgRQERT83+7NWQVvzmzmZh4BAgQOEbg55E5nEiBAYAbLJyBA4BgBg3VMVQ4lQMBg+QMECBwjYLCOqcqhBAgYLH+AAIFjBK4ZrJdtr9vetn0ck8yhBAjkBC4N1t22n2232762PeUEBCJA4BiBS4P1H+R728O2923PxyRzKAECOYFrBut+2+O2z22/OQGBCBA4RuCawTomjEMJEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoC/wBXA4IgXIiU60AAAAASUVORK5CYII='
      }
    }

    score.fillDefaults = () => {
      score.missions.forEach(mission => {
        mission.objectives.forEach(objective => {
          if (objective.default !== undefined) {
            objective.value = objective.default
          }
        })
      })
    }

    score.valid = () => {
      return typeof score.teamNumber !== 'undefined' &&
        typeof score.matchId !== 'undefined' && score.matchId !== 0 &&
        typeof score.stage !== 'undefined' && typeof score.round !== 'undefined' &&
        (!tournament.teams || tournament.teams.some(team => team.number === score.teamNumber))
    }

    return score
  }
}

Score.POSSIBLY_REQUIRED_FIELDS = {
  requireRef: { name: 'referee', type: String },
  requireTable: { name: 'tableId', type: Number },
  requireSignature: { name: 'signature' }
}

Score.$inject = ['tournament', 'challenge', 'logger']

export default Score
