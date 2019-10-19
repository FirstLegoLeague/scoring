class MainMenuController {
  constructor ($location, $scope, user, localSettings) {
    Object.assign(this, { $location, $scope, user, localSettings })
  }

  $onInit () {
    this._resetPage()
    this.$scope.$on('$locationChangeSuccess', () => {
      this._resetPage()
    })
  }

  setPage (page) {
    this.$location.path(page)
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[1]
    if (!this.page) {
      this.setPage(this.user.isAdmin() ? 'scores' : 'scoresheet')
    }
    this.$scope.$broadcast(`set page ${this.page}`)
  }
}

MainMenuController.$$ngIsClass = true
MainMenuController.$inject = ['$location', '$scope', 'user', 'localSettings']

export default MainMenuController
