class ScoresheetActionsController {
  constructor (scoresheet, $scope, $location, user) {
    Object.assign(this, { data: scoresheet, $location, $scope })
    this.isAdmin = user.isAdmin()
  }

  score () {
    return this.data.score()
  }

  markNoShow () {
    this.data.fillDefaults()
    this.data.fakeSignature()
    this.data.markNoShow()
      .then(() => {
        this.$scope.$emit('close scoresheet', { goToScores: this.data.isEditing() })
        this.reset()
      })
      .catch(() => this.reset())
  }

  reset () {
    return this.$scope.$emit('reset scoresheet')
  }

  cancel () {
    this.reset()
    this.$location.path('/scores/tiles')
  }

  setDefault () {
    this.data.fillDefaults()
  }

  defaultEnabled () {
    return this.isAdmin && this.data.current && this.data.current.defaultEnabled
  }

  noShowDisabled () {
    return !this.data.current || !this.data.current.teamNumber || !this.data.current.matchId
  }
}

ScoresheetActionsController.$$ngIsClass = true
ScoresheetActionsController.$inject = ['scoresheet', '$scope', '$location', 'user']

export default ScoresheetActionsController
