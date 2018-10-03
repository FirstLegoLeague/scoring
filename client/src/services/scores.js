const POSSIBLY_REQUIRED_FIELDS = {
  requireRef: 'referee',
  requireTable: 'tableId',
  requireSignature: 'signature'
}

class Scores {
  constructor ($http, tournament, messanger, configuration, independence, notifications) {
    Object.assign(this, { $http, tournament, messanger, configuration, independence, notifications })
    this.scores = []
  }

  init () {
    if (!this._initPromise) {
      this._initPromise = this.load()
    }
    return this._initPromise
  }

  load () {
    return this.$http.get('/scores/all')
      .then(response => response.data).then(scores => {
        this.scores = scores.map(attrs => this.score(attrs))
        return this.scores
      })
  }

  create (score) {
    this.messanger.ignoreNext('scores:reload')
    return this.configuration.load()
      .then(config => this.independence.send('POST', '/scores/create', this._sanitizedScore(score, config)))
      .then(scoreFromDB => { this.scores.push(this.score(scoreFromDB)) })
  }

  delete (id) {
    this.messanger.ignoreNext('scores:reload')
    return this.independence.send('DELETE', `/scores/${id}/delete`)
      .then(() => { this.scores = this.scores.filter(score => score._id !== id) })
      .catch(() => this.notifications.error('Unable to delete score: Possible network error.'))
  }

  deleteAll () {
    this.messanger.ignoreNext('scores:reload')
    return this.independence.send('DELETE', `/scores/all`)
      .then(() => { this.scores = [] })
      .catch(() => this.notifications.error('Unable to delete scores: Possible network error.'))
  }

  update (id, attributes) {
    this.messanger.ignoreNext('scores:reload')
    return this.independence.send('POST', `/scores/${id}/update`, attributes)
      .then(() => { Object.assign(this.scores.find(score => score._id === id), attributes) })
      .catch(() => this.notifications.error('Unable to change score: Possible network error.'))
  }

  _sanitizedScore (score, config) {
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

    Object.entries(POSSIBLY_REQUIRED_FIELDS).forEach(([configField, field]) => {
      if (config[configField]) {
        sanitizedScore[field] = score[field]
      }
    })

    return sanitizedScore
  }

  score (attrs) {
    const score = attrs

    score.init = () => {
      if (!score._initPromise) {
        score._initPromise = score.load()
      }
      return score._initPromise
    }

    score.load = () => {
      return Promise.all([this.tournament.loadTeamMatches(score.teamNumber), this.tournament.loadTeams(), this.tournament.loadTables()])
        .then(([matches, teams, tables]) => {
          score.matches = matches
          score.match = matches.find(match => match.round === score.round && match.stage === score.stage)
          score.team = teams.find(team => team.number === score.teamNumber)
          score.table = matches.find(table => table.tableId === score.tableId)

          score.matchError = Boolean(!score.match)
          score.teamError = Boolean(!score.team)
          score.noTable = Boolean(!score.table)

          score.teamText = score.teamError ? 'Missing team' : score.team.displayText
          score.matchText = score.matchError ? 'Missing round' : score.match.displayText
          score.tableText = score.noTable ? 'No table' : score.table.tableName

          score.ready = true
        })
    }

    score.updateMatch = () => {
      return this.tournament.loadTeamMatches(score.teamNumber)
        .then(matches => {
          score.matches = matches
          score.matchId = matches.find(match => match.stage === score.stage && match.round === score.round)._id
        })
        .then(() => this.save())
    }

    score.teamText = score.matchText = score.tableText = 'Loading...'
    score.teamError = score.matchError = score.ready = false

    return score
  }
}

Scores.$$ngIsClass = true
Scores.$inject = ['$http', 'Tournament', 'Messanger', 'Configuration', 'Independence', 'Notifications']

export default Scores
