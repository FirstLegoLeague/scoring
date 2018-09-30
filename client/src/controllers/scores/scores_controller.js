class ScoresController {
  constructor (scores, $scope, configuration, tournament, messanger, modals, user, logger) {
    Object.assign(this, { data: scores, $scope, configuration, tournament, messanger, modals, logger })
    this.user = user.username
    this.filters = this.filters || {
      search: '',
      showDuplicates: false,
      showErrors: false
    }
    this.loading = true
  }

  $onInit () {
    this.$scope.$on('reload', () => this.load())
    this.messanger.one('scores:reload', () => this.load())

    this.configuration.load()
      .then(config => {
        this.rankingsLink = config.rankings
        return this.load()
      })
      .catch(err => this.logger.error(err))
  }

  load () {
    this.loading = true
    this.$scope.$broadcast('reset')
    Promise.all([this.data.load(), this.tournament.loadTeams(), this.tournament.loadTables()])
      .then(() => { this.loading = false })
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
    return this.data.scores ? this.data.scores.length > 0 : 0
  }

  scores () {
    let scores = this.data.scores

    // Filter by search
    if (this.filters.search) {
      scores = scores
        .filter(score => [score.teamText, score.referee, score.tableText, score.matchText, score.score]
          .map(field => (field && typeof field === 'string') ? field.toLowerCase() : field)
          .some(value => (value || '').toString().includes(this.filters.search.toLowerCase())))
    }

    // Filter by showDuplicates
    if (this.filters.showDuplicates) {
      scores = this.duplicateScores(scores)

      if (scores.length === 0) {
        this.filters.showDuplicates = false
        scores = this.data.scores
      }
    }

    // Filter by showErrors
    if (this.filters.showErrors) {
      scores = this.errorScores(scores)

      if (scores.length === 0) {
        this.filters.showErrors = false
        scores = this.data.scores
      }
    }

    return scores
  }

  duplicateScores (scores) {
    scores = scores || this.data.scores || []

    return scores.filter(score => {
      return scores.some(otherScore => {
        return score !== otherScore &&
          otherScore.teamNumber === score.teamNumber &&
          otherScore.matchId === score.matchId
      })
    })
  }

  errorScores (scores) {
    scores = scores || this.data.scores || []
    const duplicateErrors = this.duplicateScores(scores)

    const otherErrors = scores.filter(score =>
      typeof score.teamNumber === 'undefined' || typeof score.matchId === 'undefined' ||
      (!this.loading && !this.tournament.teams.some(team => team.number === score.teamNumber))
    )
    return duplicateErrors.concat(otherErrors)
      .filter((value, index, arr) => arr.indexOf(value) === index)
  }
}

ScoresController.$$ngIsClass = true
ScoresController.$inject = ['Scores', '$scope', 'Configuration', 'Tournament', 'Messanger', 'Modals', 'User', 'Logger']

export default ScoresController
