import EventEmitter from 'event-emitter-es6'
import Promise from 'bluebird'

class Rankings extends EventEmitter {
  constructor (independence, scores, tournament, messanger, configuration, logger) {
    super()
    Object.assign(this, { independence, scores, tournament, messanger, configuration, rankings: {}, logger })
    this._rankingsPromises = { }
  }

  init () {
    this.messanger.on('rankings:reload', () => this.initRankings())
    this.scores.on('scores updated', ({ id, score, action }) => {
      this.messanger.ignoreNext('rankings:reload')
      this._calc()
      this.emit('rankings updated', { id, score, action })
    })

    this.initRankings()
  }

  initRankings () {
    return this.tournament.loadCurrentStage()
      .then(stage => {
        this.loadRankingsForStage(stage)
        this.emit('rankings updated', { action: 'init' })
      })
      .catch(error => this.logger.error(error))
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
        rank.allScores = this.scores.scores
          .filter(score => score.teamNumber === rank.team.number && score.stage === stage)
        rank.scores = rank.allScores
          .reduce((arr, score) => {
            arr[score.round - 1].push(score)
            return arr
          }, Array.apply(null, { length: rank.scores.length }).map(() => ([])))
        if (rank.allScores.length > 0) {
          rank.highest = rank.allScores.reduce((highestScore, score) => (highestScore && (highestScore.score > score.score)) ? highestScore : score)
        }

        rank.team = this.tournament.teams.find(team => team.number === rank.team.number)
      })
    })
  }
}

Rankings.$$ngIsClass = true
Rankings.$inject = ['independence', 'scores', 'tournament', 'messanger', 'configuration', 'logger']

export default Rankings
