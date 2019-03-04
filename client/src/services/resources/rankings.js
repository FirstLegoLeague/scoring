import EventEmitter from 'event-emitter-es6'

class Rankings extends EventEmitter {
  constructor (independence, scores, tournament, messanger, configuration) {
    super()
    Object.assign(this, { independence, scores, tournament, messanger, configuration, rankings: {} })
    this._rankingsPromises = { }
  }

  init () {
    this.messanger.on('rankings:reload', () => {
      this.tournament.getCurrentStage()
        .then(stage => {
          this.loadRankingsForStage(stage)
          this.emit('rankings updated')
        })
        .catch(error => console.error(error))
    })
    this.scores.on('scores updated', ({ id, score, action }) => {
      this.messanger.ignoreNext('rankings:reload')
      this._calc()
      this.emit('rankings updated', { id, score, action })
    })
  }

  loadRankingsForStage (stage) {
    if (!this._rankingsPromises[stage]) {
      this._rankingsPromises[stage] = Promise.all([this.configuration.load(), this.tournament.loadTeams(), this.scores.init()])
        .then(() => this.independence.send('GET', `${this.configuration.rankingsUrl}/rankings.json?stage=${stage}`))
        .then(response => {
          this.rankings[stage] = response.data
          this._calc()
        })
    }
    return this._rankingsPromises[stage]
  }

  _calc () {
    Object.entries(this.rankings).forEach(([stage, rankings]) => {
      rankings.forEach(rank => {
        rank.scores = this.scores.scores
          .filter(score => score.teamNumber === rank.team.number && score.stage === stage)
          .reduce((arr, score) => {
            arr[score.round - 1].push(score)
            return arr
          }, Array.apply(null, { length: rank.scores.length }).map(() => ([])))

        rank.team = this.tournament.teams.find(team => team.number === rank.team.number)
      })
    })
  }
}

Rankings.$$ngIsClass = true
Rankings.$inject = ['Independence', 'Scores', 'Tournament', 'Messanger', 'Configuration', 'Notifications']

export default Rankings
