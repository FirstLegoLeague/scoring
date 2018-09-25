'use strict'

// Wraps the JQuery interface of Foundation in order to seperate it from angular.

class Modals {

	constructor ($window, $timeout) {
		this.$ = $window.$
		this.$timeout = $timeout
		this.modals = {}
	}

	open (modal) {
		return this.initializeModal(modal).then(modal => {
			modal.open()
			return modal
		})
	}

	close (modal) {
		return this.initializeModal(modal).then(modal => {
			modal.close()
			return modal
		})
	}

	initializeModal (modal) {
		return new Promise((resolve, reject) => {
			if(modal instanceof Foundation.Reveal) {
				resolve(modal)
			} else {
				this.$timeout(() => {
					if(!this.modals.hasOwnProperty(modal)) {
						this.modals[modal] = new Foundation.Reveal(this.$(modal))
					}
					resolve(this.modals[modal])
				})
			}
		})
	}

}

Modals.$$ngIsClass = true
Modals.$inject = ['$window', '$timeout']

export default Modals
