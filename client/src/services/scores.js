class Scores {
  constructor ($http, Messanger, Independence, Notifications) {
    Object.assign(this, { $http, Messanger, Independence, Notifications })
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
    return this.Independence.send('POST', '/scores/create', this._sanitizedScore(score))
  }

  delete (id) {
    this.Messanger.ignoreNext('score:reload')
    return this.Independence.send('DELETE', `/scores/${id}/delete`)
      .then(() => { this.scores = this.scores.filter(score => score._id !== id) })
      .catch(() => this.Notifications.error('Unable to delete score: Possible network error.'))
  }

  deleteAll () {
    this.Messanger.ignoreNext('score:reload')
    return this.Independence.send('DELETE', `/scores/all`)
      .then(() => { this.scores = [] })
      .catch(() => this.Notifications.error('Unable to delete score: Possible network error.'))
  }

  update (id, attributes) {
    this.Messanger.ignoreNext('score:reload')
    return this.Independence.send('POST', `/scores/${id}/update`, this._sanitizedScore(attributes))
      .then(() => { Object.assign(this.scores.filter(score => score._id === id), attributes) })
      .catch(() => this.Notifications.error('Unable to delete score: Possible network error.'))
  }

  _sanitizedScore (score) {
    return {
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
      signature: score.signature,
      teamNumber: score.teamNumber,
      round: score.round,
      stage: score.stage,
      matchId: score.matchId,
      referee: score.referee,
      tableId: score.tableId
    }
  }
}

Scores.$$ngIsClass = true
Scores.$inject = ['$http', 'Messanger', 'Independence', 'Notifications']

export default Scores
