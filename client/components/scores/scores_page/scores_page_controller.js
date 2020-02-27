class ScoresPageController {
  constructor ($location, $scope) {
    Object.assign(this, { $location, $scope })

    this.actions = {
      restore: () => {
        const scoreId = this.$location.path().split('/')[3]
        this.$scope.$broadcast('restore', { scoreId })
        this.$location.path('/scores/tiles')
      }
    }
  }

  $onInit () {
    this._resetPage()
    this.$scope.$on('$locationChangeSuccess', () => {
      this._resetPage()
    })
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[2]

    if (Object.keys(this.actions).includes(this.page)) {
      this.actions[this.page]()
    }
  }
}

ScoresPageController.$$ngIsClass = true
ScoresPageController.$inject = ['$location', '$scope']

export default ScoresPageController
