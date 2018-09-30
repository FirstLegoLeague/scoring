class ScoresheetActionsController {
  constructor (Scoresheet, $scope, User) {
    Object.assign(this, { data: Scoresheet, $scope, User })
    this.isAdmin = User.isAdmin()
  }

  score () {
    return this.data.score()
  }

  reset () {
    return this.$scope.$emit('reset scoresheet')
  }

  defaultEnabled () {
    return this.data.current && this.data.current.defaultEnabled
  }

  setDefault () {
    this.$scope.$emit('set scoresheet default')
  }
}

ScoresheetActionsController.$$ngIsClass = true
ScoresheetActionsController.$inject = ['Scoresheet', '$scope', 'User']

export default ScoresheetActionsController
