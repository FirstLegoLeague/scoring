const SHOW_PUBLIC = 1
const SHOW_UNPUBLIC = 2

class ScoresTilesController {
  constructor (scores, $scope, tournament) {
    Object.assign(this, { scores, $scope, tournament })
  }

  $onInit () {
    this.$scope.$watch(() => this.sort, () => {
      this._calculateOrder()
    })

    this.$scope.$on('open scores with filters', (event, filters) => {
      this._calculateFilters()
      this._calculateOrder()
    })

    this.scores.on('scores updated', () => {
      this._calculateFilters()
      this._calculateOrder()
    })
  }

  shouldShowScore (score) {
    if (!this.ready) {
      return false
    }

    // Filter by showDuplicates
    if (this.filters.showDuplicates && !this.duplicateScores.includes(score)) {
      return false
    }

    // Filter by showNoShow
    if (this.filters.showNoShow && !this.noShowScores.includes(score)) {
      return false
    }

    // Filter by showErrors
    if (this.filters.showErrors && !this.errorScores.includes(score)) {
      return false
    }

    // Filter by teams
    if (this.filters.teams.length > 0 && !this.filters.teams.some(team => team.number === score.teamNumber)) {
      return false
    }

    // Filter by rounds
    if (this.filters.rounds.length > 0 && !this.filters.rounds.some(round => round.stage === score.stage && round.round === score.round)) {
      return false
    }

    // Filter by referees
    if (this.filters.referees.length > 0 && !this.filters.referees.includes(score.referee)) {
      return false
    }

    // Filter by tables
    if (this.filters.tables.length > 0 && !this.filters.tables.some(table => table.tableId === score.tableId)) {
      return false
    }

    // Filter by publication
    if (this.filters.showPublic === SHOW_PUBLIC && !score.public) {
      return false
    } else if (this.filters.showPublic === SHOW_UNPUBLIC && score.public) {
      return false
    }

    return true
  }

  _calculateFilters () {
    this.duplicateScores = this.scores.scores.filter(score => {
      return this.scores.scores.some(otherScore => {
        return score !== otherScore &&
          otherScore.teamNumber === score.teamNumber &&
          otherScore.stage === score.stage &&
          otherScore.round === score.round
      })
    })

    const missingFieldScores = this.scores.scores.filter(score =>
      typeof score.teamNumber === 'undefined' ||
      typeof score.matchId === 'undefined' || score.matchId === 0 ||
      typeof score.stage === 'undefined' || typeof score.round === 'undefined' ||
      (this.ready && !this.tournament.teams.some(team => team.number === score.teamNumber)))

    this.noShowScores = this.scores.scores.filter(score => score.noShow)

    this.errorScores = this.duplicateScores.concat(missingFieldScores)
      .filter((value, index, arr) => arr.indexOf(value) === index)

    this.filters.dissableAll = this.scores.scores.length === 0
    this.filters.disableDuplicates = this.duplicateScores.length === 0
    this.filters.disableErrors = this.errorScores.length === 0
    this.filters.disableNoShow = this.noShowScores.length === 0
    this.filters.showDuplicates = this.filters.showDuplicates && !this.filters.disableDuplicates
    this.filters.showErrors = this.filters.showErrors && !this.filters.disableErrors

    this.filters.showDuplicates = this.filters.showDuplicates && !this.filters.disableDuplicates
    this.filters.showErrors = this.filters.showErrors && !this.filters.disableErrors
    this.filters.showNoShow = this.filters.showNoShow && !this.filters.disableNoShow
  }

  _calculateOrder () {
    const [field, direction] = this.sort.split('_')
    const directionCoefficiant = direction === 'up' ? 1 : -1
    this.sortedScores = this.scores.scores
      .sort((score1, score2) => (score1[field] - score2[field]) * directionCoefficiant)
  }
}

ScoresTilesController.$$ngIsClass = true
ScoresTilesController.$inject = ['Scores', '$scope', 'Tournament']

export default ScoresTilesController
