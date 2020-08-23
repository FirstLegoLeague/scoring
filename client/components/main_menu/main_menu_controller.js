class MainMenuController {
  constructor ($location, $scope, $timeout, $window) {
    Object.assign(this, { $location, $scope, $timeout, $window })
  }

  $onInit () {
    this.$timeout(() => {
      this.$window.jQuery('.splashing.menu').removeClass('splashing')
    }, 2000)
  }

  setPage (page) {
    this.page = page
    this.$location.path(page)
  }
}

MainMenuController.$$ngIsClass = true
MainMenuController.$inject = ['$location', '$scope', '$timeout', '$window']

export default MainMenuController
