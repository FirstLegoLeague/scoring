class ScoresheetMenuController {
  constructor ($location, $scope, user) {
    Object.assign(this, { $location, $scope, user })

    this._resetPage()
    this.$scope.$on('set page scoresheet', () => {
      this._resetPage()
    })
  }

  setPage (page) {
    this.$location.path(page)
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[2]
    if (!this.page) {
      this.setPage('scoresheet/new')
    }
  }
}

ScoresheetMenuController.$$ngIsClass = true
ScoresheetMenuController.$inject = ['$location', '$scope', 'user']

export default ScoresheetMenuController
