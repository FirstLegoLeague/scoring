class ScoresActionsController {
  constructor (scores, score, $scope, configuration, modals, user) {
    Object.assign(this, { scores, score, $scope, configuration, modals })
    this.user = user.username
    this.isAdmin = user.isAdmin()
    this.rankingsUrl = '#'
  }

  $onInit () {
    this.configuration.load().then(config => {
      this.rankingsUrl = `${config.rankingsUrl}/rankings.csv?hideNegatives=false`
    })
      .catch(err => console.error(err))
  }

  newScoresheet () {
    this.$scope.$emit('open scoresheet', this.score())
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
    return this.scores.deleteAll()
      .then(() => { this.deleting = false })
  }
}

ScoresActionsController.$$ngIsClass = true
ScoresActionsController.$inject = ['Scores', 'Score', '$scope', 'Configuration', 'Modals', 'User']

export default ScoresActionsController
