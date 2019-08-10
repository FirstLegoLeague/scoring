import Promise from 'bluebird'

class RanksPageController {
  constructor (rankings, scores, $timeout, $location, $scope, tournament, logger, configuration, notifications) {
    Object.assign(this, { rankings, scores, $timeout, $location, $scope, tournament, logger, configuration, notifications })
    this.smallView = false
  }

  $onInit () {
    this.$scope.$watch(() => this.currentStage, () => {
      if (this.currentStage) {
        this.$location.search('stage', this.currentStage)
        this.load()
      }
    })

    this.rankings.on('rankings updated', ({ score }) => {
      if (this.rankings.rankings[this.currentStage]) {
        if (score) {
          const rank = this.rankings.rankings[this.currentStage].find(r => r.team.number === score.teamNumber)
          this._enrichRank(rank)
        } else {
          this._enrichRankings()
        }
      }
    })

    Promise.all([this.rankings.init(), this.tournament.loadStages(), this.configuration.load()])
      .then(() => {
        this.currentStage = this.$location.search().stage || this.tournament.stages[0]
      })
      .catch(error => this.logger.error(error))
  }

  rankingsUrl () {
    return `${this.configuration.rankingsUrl}/rankings.csv?hideNegatives=false&stage=${this.currentStage}`
  }

  load () {
    this.ready = false
    this.rankings.loadRankingsForStage(this.currentStage)
      .then(() => {
        if (this.rankings.rankings[this.currentStage].length > 0) {
          const roundsCount = this.rankings.rankings[this.currentStage][0].scores.length
          this.roundHeaders = Array.apply(null, { length: roundsCount }).map((x, i) => `${i + 1}`)
          this._enrichRankings()
        }
        this.ready = true
      })
      .catch(error => this.logger.error(error))
  }

  deleteRankScores (rank) {
    Promise.all(rank.allScores.map(score => this.scores.delete(score)))
      .then(() => {
        rank.scores = rank.scores.map(() => ([]))
        this._enrichRank(rank)
      })
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  toggleAllRankScoresPublic (rank) {
    Promise.all(rank.allScores.map(score => {
      score.public = rank.allScoresUnpublished
      return this.scores.update(score)
    }))
      .then(() => this._enrichRank(rank))
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  toggleAllRankScoresNoShow (rank) {
    Promise.all(rank.scores.map((roundScores, round) => {
      if (roundScores.length > 0) {
        return Promise.all(roundScores.map(score => {
          score.noShow = !rank.allScoresNoShow
          return this.scores.update(score)
        }))
      } else {
        return this.scores.create({ noShow: true, teamNumber: rank.team.number, stage: this.currentStage, round: (round + 1) })
          .then(score => roundScores.push(score))
      }
    }))
      .then(() => this._enrichRank(rank))
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  deleteAll () {
    this.scores.clear()
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  _enrichRankings () {
    this.rankings.rankings[this.currentStage].forEach(this._enrichRank)
  }

  _enrichRank (rank) {
    rank.allScoresUnpublished = rank.allScores.every(score => !score.public)
    rank.allScoresNoShow = rank.allScores.every(score => score.noShow)
  }
}

RanksPageController.$$ngIsClass = true
RanksPageController.$inject = ['rankings', 'scores', '$timeout', '$location', '$scope', 'tournament', 'logger', 'configuration', 'notifications']

export default RanksPageController
