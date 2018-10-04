class ScoresController {
  constructor (scores, $scope, $timeout, configuration, tournament, messanger, modals, user, logger) {
    Object.assign(this, { data: scores, $scope, $timeout, configuration, tournament, messanger, modals, logger })
    this.user = user.username
    this.filters = this.filters || {
      search: '',
      showDuplicates: false,
      showErrors: false
    }
    this.loading = true
  }

  $onInit () {
    this.$scope.$on('reload', () => this.load(true))
    this.messanger.one('scores:reload', () => this.load(true))

    this.$scope.$watch(() => this.data.scores, () => this._calculateFilters(), true)

    this.configuration.load()
      .then(config => {
        this.rankingsLink = config.rankings
        return this.load()
      })
      .then(() => this.$scope.$emit('reinit foundation'))
      .catch(err => this.logger.error(err))
  }

  load (forceScoresReload) {
    this.loading = true
    this.$scope.$broadcast('reset')
    Promise.all([(forceScoresReload ? this.data.load() : this.data.init()), this.tournament.loadTeams(), this.tournament.loadTables()])
      .then(() => { this.$timeout(() => { this.loading = false }) })
      .catch(err => this.logger.error(err))
  }

  openDeletionDialog () {
    this.modals.open('#scores-deletion-modal')
  }

  closeDeletionDialog () {
    this.modals.close('#scores-deletion-modal')
  }

  deleteAll () {
    this.closeDeletionDialog()
    this.deleting = true
    this.data.deleteAll()
      .then(() => {
        this.deleting = false
      }).catch(() => {
        this.Notifications.error('Unable to delete score: Possible network error.')
        this.deleting = false
      })
  }

  any () {
    return Boolean(this.data.scores && this.data.scores.length)
  }

  shouldShowScore (score) {
    if (this.loading) {
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
          otherScore.matchId === score.matchId
      })
    })

    const missingFieldScores = this.data.scores.filter(score =>
      typeof score.teamNumber === 'undefined' || typeof score.matchId === 'undefined' ||
      (!this.loading && !this.tournament.teams.some(team => team.number === score.teamNumber)))

    this.errorScores = this.duplicateScores.concat(missingFieldScores)
      .filter((value, index, arr) => arr.indexOf(value) === index)

    this.filters.showDuplicates = this.filters.showDuplicates && this.duplicateScores.length > 0
    this.filters.showErrors = this.filters.showErrors && this.errorScores.length > 0
  }
}

ScoresController.$$ngIsClass = true
ScoresController.$inject = ['Scores', '$scope', '$timeout', 'Configuration', 'Tournament', 'Messanger', 'Modals', 'User', 'Logger']

export default ScoresController
