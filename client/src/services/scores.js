class Scores {
  constructor ($http, score, tournament, messanger, configuration, independence, notifications) {
    Object.assign(this, { $http, score, tournament, messanger, configuration, independence, notifications })
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
      .then(config => this.independence.send('POST', '/scores/create', score.sanitize(config)))
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
}

Scores.$$ngIsClass = true
Scores.$inject = ['$http', 'Score', 'Tournament', 'Messanger', 'Configuration', 'Independence', 'Notifications']

export default Scores
