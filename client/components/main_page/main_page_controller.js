class MainPageController {
  constructor ($location, $scope) {
    Object.assign(this, { $location, $scope })

    this._resetPage()
    this.$scope.$on('$locationChangeSuccess', () => {
      this._resetPage()
    })
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[1]
  }
}

MainPageController.$$ngIsClass = true
MainPageController.$inject = ['$location', '$scope']

export default MainPageController
