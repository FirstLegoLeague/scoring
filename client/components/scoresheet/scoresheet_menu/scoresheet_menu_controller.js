class ScoresheetMenuController {
  constructor (refIdentity, $location, $document, $scope, user) {
    Object.assign(this, { refIdentity, $location, $document, $scope, user })

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

    return this.refIdentity.init()
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
ScoresheetMenuController.$inject = ['refIdentity', '$location', '$document', '$scope', 'user']

export default ScoresheetMenuController
