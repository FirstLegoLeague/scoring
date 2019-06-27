class ScoresheetActionsController {
  constructor (scoresheet, $scope, user) {
    Object.assign(this, { data: scoresheet, $scope })
    this.isAdmin = user.isAdmin()
  }

  score () {
    return this.data.score()
  }

  markNoShow () {
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
    // Go back to scores
  }

  setDefault () {
    this.$scope.$emit('set scoresheet default')
  }

  defaultEnabled () {
    return this.isAdmin && this.data.current && this.data.current.defaultEnabled
  }

  noShowDisabled () {
    return !this.data.current || !this.data.current.teamNumber || !this.data.current.matchId
  }
}

ScoresheetActionsController.$$ngIsClass = true
ScoresheetActionsController.$inject = ['scoresheet', '$scope', 'user']

export default ScoresheetActionsController
