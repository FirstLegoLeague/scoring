import Promise from 'bluebird'

class ScoresheetMenuController {
  constructor (configuration, $location, $document, $scope, $timeout) {
    Object.assign(this, { configuration, $location, $document, $scope, $timeout })

    this.backLink = $document[0].referrer
    if (this.backLink === '') {
      this.backLink = '#!/scores/tiles'
    }
  }

  $onInit () {
    this._resetPage()
    this.$scope.$on('set page scoresheet', () => {
      this._resetPage()
    })

    this.configuration.load()
  }

  setPage (page) {
    this.page = page
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
ScoresheetMenuController.$inject = ['configuration', '$location', '$document', '$scope', '$timeout']

export default ScoresheetMenuController
