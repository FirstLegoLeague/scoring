'use strict'

const MODAL = '#identity-modal'

class IdentityController {

	constructor (Identity, Modals) {
		this.Identity = Identity
		this.Modals = Modals
		this.showTopbarButton = false
	}

	$onInit () {
		let self = this
		this.Identity.init().then(identity => {
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

	close () {
		this.showTopbarButton = true
		this.Identity.save({ referee: this.referee, table: this.table })
		this.Modals.close(MODAL)
	}

	display () {
		return `${this.referee} (On ${this.table})`
	}

}

IdentityController.$inject = ['Identity', 'Modals']

export default IdentityController
