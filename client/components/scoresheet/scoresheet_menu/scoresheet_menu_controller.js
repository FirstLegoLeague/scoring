import Promise from 'bluebird'

class ScoresheetMenuController {
  constructor (configuration, refIdentity, $location, $document, $scope, user) {
    Object.assign(this, { configuration, refIdentity, $location, $document, $scope, user })

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
        if (!this.refIdentity.isInitialized()) {
          this.forceRefIdentityEntry = true
          this.refIdentityModalVisible = true
        }
      })
      .catch(error => this.logger.error(error))
  }

  setPage (page) {
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

  cancelRefIdentity () {
    this.refIdentityModalVisible = false
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[2]
    if (!this.page) {
      this.setPage('scoresheet/new')
    }
  }
}

ScoresheetMenuController.$$ngIsClass = true
ScoresheetMenuController.$inject = ['configuration', 'refIdentity', '$location', '$document', '$scope', 'user']

export default ScoresheetMenuController
