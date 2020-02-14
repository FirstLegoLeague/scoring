class MainMenuController {
  constructor ($location, $scope, $timeout, $window, refIdentity, user) {
    Object.assign(this, { $location, $scope, $timeout, $window, refIdentity, user })
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
    this.page = page
    this.$location.path(page)
  }

  logout () {
    this.refIdentity.clear()
    this.$window.document.location.href = '/logout'
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[1]
    if (!this.user.isAdmin()) {
      this.setPage('scoresheet')
    } else if (!this.page) {
      this.setPage('scores')
    }

    this.$scope.$broadcast(`set page ${this.page}`)
  }
}

MainMenuController.$$ngIsClass = true
MainMenuController.$inject = ['$location', '$scope', '$timeout', '$window', 'refIdentity', 'user']

export default MainMenuController
