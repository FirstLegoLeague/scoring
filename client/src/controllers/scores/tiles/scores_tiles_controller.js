/* global Event */

const SHOW_PUBLIC = 1
const SHOW_UNPUBLIC = 2

class ScoresTilesController {
  constructor (scores, $scope, $timeout, $element, tournament, logger) {
    Object.assign(this, { scores, $scope, $timeout, $element, tournament, logger })
  }

  $onInit () {
    this.$scope.$watch(() => this.sort, () => this._calculateVisibleScores())
    this.$scope.$watch(() => this.filters, () => {
      this._calculateVisibleScores()
      this.$timeout(() => {
        this.$element.parent('[in-view-container]')[0]
          .dispatchEvent(new Event('scroll'))
      })
    }, true)
    this.$scope.$on('open scores with filters', () => this._calculateVisibleScores())
    this.scores.on('scores updated', () => this._calculateVisibleScores())

    this.scores.init()
      .then(() => this._calculateVisibleScores())
      .catch(error => this.logger.error(error))
  }

  _calculateVisibleScores () {
    this.visibleScores = this.scores.scores
    this._filterVisibleScores()
    this._sortVisibleScores()
  }

  _filterVisibleScores () {
    // Filter by showDuplicates
    if (this.filters.showDuplicates) {
      this.visibleScores = this.visibleScores.filter(score => {
        return this.scores.scores.some(otherScore => {
          return score !== otherScore &&
            otherScore.teamNumber === score.teamNumber &&
            otherScore.stage === score.stage &&
            otherScore.round === score.round
        })
      })
    }

    // Filter by showNoShow
    if (this.filters.showNoShow) {
      this.visibleScores = this.visibleScores.filter(score => score.noShow)
    }

    // Filter by showErrors
    if (this.filters.showErrors) {
      this.visibleScores = this.visibleScores.filter(score => {
        return this.scores.scores.some(otherScore => {
          return (score !== otherScore &&
            otherScore.teamNumber === score.teamNumber &&
            otherScore.stage === score.stage &&
            otherScore.round === score.round) ||
            typeof score.teamNumber === 'undefined' ||
            typeof score.matchId === 'undefined' || score.matchId === 0 ||
            typeof score.stage === 'undefined' || typeof score.round === 'undefined' ||
            (this.ready && !this.tournament.teams.some(team => team.number === score.teamNumber))
        })
      })
    }

    // Filter by teams
    if (this.filters.teams.length > 0) {
      this.visibleScores = this.visibleScores.filter(score => this.filters.teams.some(team => team.number === score.teamNumber))
    }

    // Filter by rounds
    if (this.filters.rounds.length > 0) {
      this.visibleScores = this.visibleScores.filter(score => this.filters.rounds.some(round => round.stage === score.stage && round.round === score.round))
    }

    // Filter by referees
    if (this.filters.referees.length > 0) {
      this.visibleScores = this.visibleScores.filter(score => this.filters.referees.includes(score.referee))
    }

    // Filter by tables
    if (this.filters.tables.length > 0) {
      this.visibleScores = this.visibleScores.filter(score => this.filters.tables.some(table => table.tableId === score.tableId))
    }

    // Filter by publication
    if (this.filters.showPublic === SHOW_PUBLIC) {
      this.visibleScores = this.visibleScores.filter(score => score.public)
    } else if (this.filters.showPublic === SHOW_UNPUBLIC) {
      this.visibleScores = this.visibleScores.filter(score => !score.public)
    }
  }

  _sortVisibleScores () {
    const [field, direction] = this.sort.split('_')
    const directionCoefficiant = direction === 'up' ? 1 : -1
    this.visibleScores = this.visibleScores
      .sort((score1, score2) => (score1[field] - score2[field]) * directionCoefficiant)
  }
}

ScoresTilesController.$$ngIsClass = true
ScoresTilesController.$inject = ['Scores', '$scope', '$timeout', '$element', 'Tournament', 'Logger']

export default ScoresTilesController
