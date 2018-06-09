'use strict'

const STORAGE_KEY = 'referee'
const EMPTY_DATA = JSON.stringify({ referee: undefined, table: undefined })

class RefIdentity {

	constructor ($window) {
		this.$window = $window
	}

	init () {
		let self = this
		return this.load().then(personalizedData => {
			Object.assign(self, personalizedData)
			self.initialized = personalizedData.referee || personalizedData.table
			return self
		})
	}

	load () {
		return Promise.resolve(JSON.parse(this.$window.sessionStorage[STORAGE_KEY] || EMPTY_DATA))
	}

	save (personalizedData) {
		this.$window.sessionStorage[STORAGE_KEY] = JSON.stringify(personalizedData)
	}

}

RefIdentity.$inject = ['$window']

export default RefIdentity
