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

  allowSave () {
    return this.data.referee && (this.data.tablesDisabled || this.data.table)
  }

  close () {
    this.showTopbarButton = true
    this.data.save()
    this.Modals.close(MODAL)
  }

  display () {
    const showRef = this.Configuration.requireRef
    const showTable = this.Configuration.requireTable && !this.data.tablesDisabled
    const refPart = showRef ? this.data.referee : ''
    const tablePart = showTable ? (showRef ? `(On ${this.data.table.tableName})` : `On ${this.data.table.tableName}`) : ''
    return `${refPart} ${tablePart}`
  }
}

RefIdentityController.$$ngIsClass = true
RefIdentityController.$inject = ['RefIdentity', '$scope', 'Configuration', 'User', 'Modals']

export default RefIdentityController
