import EventEmitter from 'event-emitter-es6'
import Promise from 'bluebird'

class Rankings extends EventEmitter {
  constructor (independence, scores, tournament, messanger, configuration, logger) {
    super()
    Object.assign(this, { independence, scores, tournament, messanger, configuration, logger })
    this.rankings = { }
    this._rankingsPromises = { }
  }

  init () {
    this.messanger.on('rankings:reload', () => this.loadRankingsForAllStages())
    return this.loadRankingsForCurrentStage()
  }

  loadRankingsForCurrentStage () {
    return Promise.all([
      this.tournament.loadCurrentStage(),
      this.tournament.loadStages()
        .then(stages => Promise.all(stages.map(stage => this.tournament.loadRoundsForStage(stage))))
    ])
      .then(([stage]) => this.loadRankingsForStage(stage))
      .catch(error => this.logger.error(error))
  }

  loadRankingsForAllStages () {
    return this.tournament.loadStages()
      .then(stages => Promise.all(stages.map(stage => this.loadRankingsForStage(stage))))
      .catch(error => this.logger.error(error))
  }

  loadRankingsForStage (stage) {
    return Promise.all([
      this.configuration.load()
        .then(() => this.independence.send('GET', `${this.configuration.rankingsUrl}/rankings.json?stage=${stage}`)),
      this.tournament.loadTeams(),
      this.scores.init()
    ]).then(([response]) => {
      this.rankings[stage] = response.data
      this._calcStage(stage)
    })
      .then(() => this.emit('rankings updated', { action: 'load', stage }))
      .catch(error => this.logger.error(error))
  }

  _calcStage (stage) {
    this.rankings[stage].forEach(rank => this._calcRank(rank, stage))
  }

  _calcRank (rank, stage) {
    rank.allScores = this.scores.scores
      .filter(score => score.teamNumber === rank.team.number && score.stage === stage)
    rank.scores = rank.allScores
      .reduce((arr, score) => {
        arr[score.round - 1].push(score)
        return arr
      }, Array.apply(null, { length: this.tournament.stageRounds[stage] }).map(() => ([])))
    if (rank.allScores.length > 0) {
      rank.highest = rank.allScores.reduce((highestScore, score) => (highestScore && (highestScore.score > score.score)) ? highestScore : score)
    }

    rank.team = this.tournament.teams.find(team => team.number === rank.team.number)
  }
}

Rankings.$$ngIsClass = true
Rankings.$inject = ['independence', 'scores', 'tournament', 'messanger', 'configuration', 'logger']

export default Rankings
