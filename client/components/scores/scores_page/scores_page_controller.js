class ScoresPageController {
  constructor ($location, $scope, localSettings) {
    Object.assign(this, { $location, $scope, localSettings })
  }

  $onInit () {
    this._resetPage()
    this.$scope.$on('$locationChangeSuccess', () => {
      this._resetPage()
    })
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[2]
  }
}

ScoresPageController.$$ngIsClass = true
ScoresPageController.$inject = ['$location', '$scope', 'localSettings']

export default ScoresPageController
