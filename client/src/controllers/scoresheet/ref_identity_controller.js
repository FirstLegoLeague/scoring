const MODAL = '#identity-modal'

class RefIdentityController {
  constructor (RefIdentity, $scope, Configuration, User, Modals) {
    Object.assign(this, { data: RefIdentity, $scope, Configuration, User, Modals })
    this.isRef = User.isRef()
    this.showTopbarButton = false
  }

  $onInit () {
    Promise.all([this.data.init(), this.Configuration.load()])
      .then(() => {
        if (this.isRef) {
          if (this.data.isInitialized()) {
            this.showTopbarButton = true
          } else {
            this.open()
          }
        }

        this.$scope.$watch(() => this.data.referee, () => {
          this.$scope.$emit('proccess scoresheet')
        })
        this.$scope.$watch(() => this.data.table, () => {
          this.$scope.$emit('proccess scoresheet')
        })
      })
      .catch(err => console.log(err))
  }

  open () {
    this.showTopbarButton = false
    this.Modals.open(MODAL)
  }

  close () {
    this.showTopbarButton = true
    this.data.save()
    this.Modals.close(MODAL)
  }

  allowSave () {
    return (!this.showRef() || this.data.referee) &&
      (!this.showTable() || this.data.table)
  }

  showRef () {
    return this.Configuration.requireRef
  }

  showTable () {
    return this.Configuration.requireTable && !this.data.tablesDisabled
  }

  tables () {
    return this.data.Tournament.tables
  }

  display () {
    const refPart = this.showRef() ? this.data.referee : ''
    const tablePart = this.showTable() ? (this.showRef() ? `(On ${this.data.table.tableName})` : `On ${this.data.table.tableName}`) : ''
    return `${refPart} ${tablePart}`
  }
}

RefIdentityController.$$ngIsClass = true
RefIdentityController.$inject = ['RefIdentity', '$scope', 'Configuration', 'User', 'Modals']

export default RefIdentityController
