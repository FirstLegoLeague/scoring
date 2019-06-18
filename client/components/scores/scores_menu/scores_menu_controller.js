class ScoresMenuController {
  constructor ($location, $scope) {
    Object.assign(this, { $location, $scope })

    this._resetPage()
    this.$scope.$on('set page scores', () => {
      this._resetPage()
    })
  }

  setPage (page) {
    this.$location.path(`scores/${page}`)
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[2]
    if (!this.page) {
      this.setPage(ScoresMenuController.DEFAULT_PAGE)
    }
  }
}

ScoresMenuController.DEFAULT_PAGE = 'tiles'
ScoresMenuController.$$ngIsClass = true
ScoresMenuController.$inject = ['$location', '$scope']

export default ScoresMenuController
