'use strict'

const MODAL = '#identity-modal'

class RefIdentityController {

  constructor ($scope, RefIdentity, User, Modals) {
    this.$scope = $scope
    this.RefIdentity = RefIdentity
    this.Modals = Modals
    this.isRef = User.isRef()
    this.showTopbarButton = false
  }

  $onInit () {
    this.RefIdentity.init().then(identity => {
      this.tables = identity.tables
      this.tablesDisabled = identity.tablesDisabled
      if(identity.initialized) {
        Object.assign(this, { referee: identity.referee, table: identity.table })
        this.showTopbarButton = true
      } else if(this.isRef) {
        this.open()
      }

      this.$scope.$watch(() => this.referee, ref => {
        this.RefIdentity.referee = ref
        this.$scope.$emit('proccess scoresheet errors')
      })
      this.$scope.$watch(() => this.table, table => {
        this.RefIdentity.table = table
        this.$scope.$emit('proccess scoresheet errors')
      })
    })
  }

  open () {
    this.showTopbarButton = false
    this.Modals.open(MODAL)
  }

  allowSave () {
    return this.referee && (this.tablesDisabled || this.table)
  }

  close () {
    this.showTopbarButton = true
    this.RefIdentity.save({ referee: this.referee, table: this.table })
    this.Modals.close(MODAL)
  }

  display () {
    return this.showTopbarButton ? `${this.referee} ${this.tablesDisabled ? '' : `(On ${this.table.tableName})`}` : ''
  }

}

RefIdentityController.$$ngIsClass = true
RefIdentityController.$inject = ['$scope', 'RefIdentity', 'User', 'Modals']

export default RefIdentityController
