class MainMenuController {
  constructor ($location, $scope, $timeout, $window, user) {
    Object.assign(this, { $location, $scope, $timeout, $window, user })
  }

  $onInit () {
    this._resetPage()
    this.$scope.$on('$locationChangeSuccess', () => {
      this._resetPage()
    })
    this.$timeout(() => {
      this.$window.jQuery('.splashing.menu').removeClass('splashing')
    }, 2000)
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
MainMenuController.$inject = ['$location', '$scope', '$timeout', '$window', 'user']

export default MainMenuController
