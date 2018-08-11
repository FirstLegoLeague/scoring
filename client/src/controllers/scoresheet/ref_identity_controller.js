'use strict'

const MODAL = '#identity-modal'

class RefIdentityController {

	constructor (RefIdentity, Modals) {
		this.RefIdentity = RefIdentity
		this.Modals = Modals
		this.showTopbarButton = false
	}

	$onInit () {
		let self = this
		this.RefIdentity.init().then(identity => {
			self.tables = identity.tables
			if(identity.initialized) {
				Object.assign(self, { referee: identity.referee, table: identity.table })
				self.showTopbarButton = true
			} else {
				self.open()
			}
		})
	}

	open () {
		this.showTopbarButton = false
		this.Modals.open(MODAL)
	}

	allowSave () {
		return this.referee && this.table
	}

	close () {
		this.showTopbarButton = true
		this.RefIdentity.save({ referee: this.referee, table: this.table })
		this.Modals.close(MODAL)
	}

	display () {
		return this.showTopbarButton ? `${this.referee} (On ${this.table.tableName})` : ''
	}

}

RefIdentityController.$$ngIsClass = true
RefIdentityController.$inject = ['RefIdentity', 'Modals']

export default RefIdentityController
