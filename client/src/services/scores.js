const POSSIBLY_REQUIRED_FIELDS = {
  requireRef: 'referee',
  requireTable: 'tableId',
  requireSignature: 'signature'
}

class Scores {
  constructor ($http, messanger, configuration, independence, notifications) {
    Object.assign(this, { $http, messanger, configuration, independence, notifications })
    this.scores = []
  }

  all () {
    return (this.scores.length === 0) ? this.load() : Promise.resolve(this.scores)
  }

  load () {
    return this.$http.get('/scores/all')
      .then(response => response.data).then(scores => {
        this.scores = scores
        return this.scores
      })
  }

  create (score) {
    this.messanger.ignoreNext('scores:reload')
    return this.configuration.load()
      .then(config => this.independence.send('POST', '/scores/create', this._sanitizedScore(score, config)))
      .then(scoreFromDB => { this.scores.push(scoreFromDB) })
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
}

Scores.$$ngIsClass = true
Scores.$inject = ['$http', 'Messanger', 'Configuration', 'Independence', 'Notifications']

export default Scores
