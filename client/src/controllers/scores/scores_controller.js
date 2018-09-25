class ScoresController {
  constructor ($scope, Configuration, Scores, Tournament, Messanger, Modals, User) {
    Object.assign(this, { data: Scores, $scope, Configuration, Tournament, Messanger, Modals, User })
    this.search = ''
    this.user = User.username
    this.showDuplicates = false
    this.showErrors = false
    this.loading = true
  }

  $onInit () {
    this.$scope.$on('reload', () => this.load())
    this.Messanger.on('scores:reload', () => this.load())

    this.Configuration.load()
      .then(config => {
        this.rankingsLink = config.rankings
        return this.load()
      })
      .catch(err => console.log(err))
  }

  load () {
    this.loading = true
    this.$scope.$broadcast('reset')
    Promise.all([this.data.load(), this.Tournament.loadTeams(), this.Tournament.loadTables()])
      .then(() => { this.loading = false })
      .catch(err => console.log(err))
  }

  openDeletionDialog () {
    this.Modals.open('#scores-deletion-modal')
  }

  closeDeletionDialog () {
    this.Modals.close('#scores-deletion-modal')
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
    if (this.search) {
      scores = scores
        .filter(score => [score.teamText, score.referee, score.tableText, score.matchText, score.score]
          .map(field => (field && typeof field === 'string') ? field.toLowerCase() : field)
          .some(value => (value || '').toString().includes(this.search.toLowerCase())))
    }

    // Filter by showDuplicates
    if (this.showDuplicates) {
      scores = this.duplicateScores(scores)

      if (scores.length === 0) {
        this.showDuplicates = false
        scores = this.data.scores
      }
    }

    // Filter by showErrors
    if (this.showErrors) {
      scores = this.errorScores(scores)

      if (scores.length === 0) {
        this.showErrors = false
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
      (!this.loading && !this.Tournament.teams.some(team => team.number === score.teamNumber))
    )
    return duplicateErrors.concat(otherErrors)
      .filter((value, index, arr) => arr.indexOf(value) === index)
  }
}

ScoresController.$$ngIsClass = true
ScoresController.$inject = ['$scope', 'Configuration', 'Scores', 'Tournament', 'Messanger', 'Modals', 'User']

export default ScoresController
