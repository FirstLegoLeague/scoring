'use strict'

const MODAL = '#identity-modal'

class RefIdentityController {

  constructor ($scope, RefIdentity, User, Modals) {
    this.$scope = $scope
    this.RefIdentity = RefIdentity
    this.data = RefIdentity
    this.Modals = Modals
    this.isRef = User.isRef()
    this.showTopbarButton = false
  }

  $onInit () {
    this.RefIdentity.init().then(identity => {
      if(identity.initialized) {
        this.showTopbarButton = true
      } else if(this.isRef) {
        this.open()
      }

      this.$scope.$watch(() => this.data.referee, () => {
        this.$scope.$emit('proccess scoresheet errors')
      })
      this.$scope.$watch(() => this.data.table, () => {
        this.$scope.$emit('proccess scoresheet errors')
      })
    })
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
    this.RefIdentity.save({ referee: this.referee, table: this.table })
    this.Modals.close(MODAL)
  }

  display () {
    return this.showTopbarButton ? `${this.data.referee} ${this.data.tablesDisabled ? '' : `(On ${this.data.table.tableName})`}` : ''
  }

}

RefIdentityController.$$ngIsClass = true
RefIdentityController.$inject = ['$scope', 'RefIdentity', 'User', 'Modals']

export default RefIdentityController
