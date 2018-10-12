const MODAL = '#identity-modal'

class RefIdentityController {
  constructor (refIdentity, $scope, configuration, user, modals, logger) {
    Object.assign(this, { data: refIdentity, $scope, configuration, modals, logger })
    this.isRef = user.isRef()
    this.showTopbarButton = false
    this.title = 'Choose your codename'
  }

  $onInit () {
    Promise.all([this.data.init(), this.configuration.load()])
      .then(() => {
        if (this.isRef) {
          if (this.data.isInitialized()) {
            this.showTopbarButton = true
          } else {
            this.open()
          }
        }

        this.title = this.configuration.requireRef ? 'Choose your codename' : 'Choose a table'

        this.$scope.$watch(() => this.data.referee, () => {
          this.$scope.$emit('proccess scoresheet')
        })
        this.$scope.$watch(() => this.data.table, () => {
          this.$scope.$emit('proccess scoresheet')
        })
      })
      .catch(err => this.logger.error(err))
  }

  open () {
    this.showTopbarButton = false
    this.modals.open(MODAL)
  }

  close () {
    this.showTopbarButton = true
    this.data.save()
    this.modals.close(MODAL)
  }

  allowSave () {
    return (!this.showRef() || this.data.referee) &&
      (!this.showTable() || this.data.table)
  }

  showRef () {
    return this.configuration.requireRef
  }

  showTable () {
    return this.configuration.requireTable && !this.data.tablesDisabled
  }

  tables () {
    return this.data.tournament.tables
  }

  display () {
    const refPart = this.showRef() ? this.data.referee : ''
    const tablePart = this.showTable() ? (this.showRef() ? `(On ${this.data.table.tableName})` : `On ${this.data.table.tableName}`) : ''
    return `${refPart} ${tablePart}`
  }
}

RefIdentityController.$$ngIsClass = true
RefIdentityController.$inject = ['RefIdentity', '$scope', 'Configuration', 'User', 'Modals', 'Logger']

export default RefIdentityController
