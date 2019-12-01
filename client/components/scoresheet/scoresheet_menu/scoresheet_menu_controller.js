import Promise from 'bluebird'

class ScoresheetMenuController {
  constructor (configuration, refIdentity, $location, $document, $scope, $timeout, user) {
    Object.assign(this, { configuration, refIdentity, $location, $document, $scope, $timeout, user })

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

    Promise.all([this.refIdentity.init(), this.configuration.load()])
      .then(() => {
        if (!this.refIdentity.isInitialized() && !this.user.isAdmin()) {
          this.forceRefIdentityEntry = true
          this.refIdentityModalVisible = true
        }
      })
      .catch(error => this.logger.error(error))
  }

  setPage (page) {
    this.page = page
    this.$location.path(page)
  }

  showRefIdentityModal () {
    this.refIdentityModalVisible = true
  }

  saveRefIdentity () {
    this.modalRefereeError = false
    this.modalTableError = false

    if (this.configuration.requireRef && !this.refIdentity.referee) {
      this.modalRefereeError = true
    }
    if (this.configuration.requireTable && !this.refIdentity.table) {
      this.modalTableError = true
    }

    if (!this.modalRefereeError && !this.modalTableError) {
      this.forceRefIdentityEntry = false
      this.refIdentityModalVisible = false
      this.refIdentity.save()
    }
  }

  discardRefIdentityChange() {
    this.refIdentityModalVisible = false
  }

  logout() {
    this.$location.path = '/logout'
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[2]
    if (!this.page) {
      this.setPage('scoresheet/new')
    }
  }
}

ScoresheetMenuController.$$ngIsClass = true
ScoresheetMenuController.$inject = ['configuration', 'refIdentity', '$location', '$document', '$scope', '$timeout', 'user']

export default ScoresheetMenuController
