class ScoresheetActionsController {
  constructor (scoresheet, $scope, $location, notifications) {
    Object.assign(this, { data: scoresheet, $location, $scope, notifications })
  }

  score () {
    return this.data.score()
  }

  markNoShow () {
    this.data.ready = false
    this.data.fillDefaults()
    this.data.fakeSignature()
    this.data.markNoShow()
      .then(() => {
        this.$scope.$emit('close scoresheet', { goToScores: this.data.isEditing() })
        this.reset()
        this.data.ready = true
        this.notifications.success('Marked No Show for team\'s match.')
      })
      .catch(() => this.reset())
  }

  reset () {
    this.$scope.$emit('reset scoresheet')
  }

  cancel () {
    this.reset()
    this.$location.path('/scores/tiles')
  }

  setDefault () {
    this.data.fillDefaults()
  }

  defaultEnabled () {
    return this.data.current && this.data.current.defaultEnabled
  }

  noShowDisabled () {
    return !this.data.current || !this.data.current.teamNumber || !this.data.current.matchId
  }
}

ScoresheetActionsController.$$ngIsClass = true
ScoresheetActionsController.$inject = ['scoresheet', '$scope', '$location', 'notifications']

export default ScoresheetActionsController
