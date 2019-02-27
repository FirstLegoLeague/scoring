class ScoresActionsController {
  constructor (scores, $scope, configuration, modals, user, logger) {
    Object.assign(this, { data: scores, $scope, configuration, modals, logger })
    this.user = user.username
    this.isAdmin = user.isAdmin()
    this.rankingsUrl = '#'
  }

  $onInit () {
    this.configuration.load().then(config => {
      this.rankingsUrl = `${config.rankingsUrl}/rankings.csv?hideNegatives=false`
    })
      .catch(err => this.logger.error(err))
  }

  newScoresheet () {
    this.$scope.$emit('toggle view')
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
}

ScoresActionsController.$$ngIsClass = true
ScoresActionsController.$inject = ['Scores', '$scope', 'Configuration', 'Modals', 'User', 'Logger']

export default ScoresActionsController
