'use strict'

class IdentityController {

	constructor (Identity, Modals) {
		this.Identity = Identity
		this.Modals = Modals
		this.modal = '#identity-modal'
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
		this.Modals.open(this.modal)
	}

	close () {
		this.showTopbarButton = true
		this.Identity.save({ referee: this.referee, table: this.table })
		this.Modals.close(this.modal)
	}

	display () {
		return `${this.referee} (On table "${this.table}")`
	}

}

IdentityController.$inject = ['Identity', 'Modals']

export default IdentityController
