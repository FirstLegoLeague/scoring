class ScoresController {
  constructor (scores, rankings, $scope, tournament, logger) {
    Object.assign(this, { data: scores, rankings, $scope, tournament, logger })
    this.filters = {
      search: '',
      showDuplicates: false,
      showErrors: false
    }
    this.size = 'big'
  }

  $onInit () {
    this.load()
      .then(() => this.$scope.$emit('reinit foundation'))
      .catch(err => this.logger.error(err))

    this.data.on('scores updates', () => this._calculateFilters())
  }

  load () {
    this.ready = false
    return Promise.all([this.data.init(), this.tournament.loadTeams(), this.tournament.loadTables()])
      .then(() => { this.ready = true })
      .catch(err => this.logger.error(err))
  }

  any () {
    return Boolean(this.data.scores && this.data.scores.length)
  }

  shouldShowScore (score) {
    if (!this.ready) {
      return false
    }

    // Filter by search
    if (this.filters.search && !([score.teamText, score.referee, score.tableText, score.matchText, score.score]
      .map(field => (field && typeof field === 'string') ? field.toLowerCase() : field)
      .some(value => (value || '').toString().includes(this.filters.search.toLowerCase())))) {
      return false
    }

    // Filter by showDuplicates
    if (this.filters.showDuplicates && !this.duplicateScores.includes(score)) {
      return false
    }

    // Filter by showErrors
    if (this.filters.showErrors && !this.errorScores.includes(score)) {
      return false
    }

    return true
  }

  _calculateFilters () {
    this.duplicateScores = this.data.scores.filter(score => {
      return this.data.scores.some(otherScore => {
        return score !== otherScore &&
          otherScore.teamNumber === score.teamNumber &&
          otherScore.stage === score.stage &&
          otherScore.round === score.round
      })
    })

    const missingFieldScores = this.data.scores.filter(score =>
      typeof score.teamNumber === 'undefined' || typeof score.matchId === 'undefined' || score.matchId === 0 ||
      (this.ready && !this.tournament.teams.some(team => team.number === score.teamNumber)))

    this.errorScores = this.duplicateScores.concat(missingFieldScores)
      .filter((value, index, arr) => arr.indexOf(value) === index)

    this.filters.disableDuplicates = this.duplicateScores.length <= 0
    this.filters.disableErrors = this.errorScores.length <= 0
    this.filters.showDuplicates = this.filters.showDuplicates && !this.filters.disableDuplicates
    this.filters.showErrors = this.filters.showErrors && !this.filters.disableErrors
  }
}

ScoresController.$$ngIsClass = true
ScoresController.$inject = ['Scores', 'Rankings', '$scope', 'Tournament', 'Logger']

export default ScoresController
