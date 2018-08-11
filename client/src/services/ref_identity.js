'use strict'

const STORAGE_KEY = 'referee'
const EMPTY_DATA = JSON.stringify({ referee: undefined, tableId: undefined })

class RefIdentity {

	constructor ($window, Tournament) {
		this.$window = $window
		this.Tournament = Tournament
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
		let self = this

		return this.Tournament.tables().then(tables => {
			self.tables = tables
			let savedData = JSON.parse(this.$window.sessionStorage[STORAGE_KEY] || EMPTY_DATA)
			if(savedData.tableId) {
				savedData.table = self.tables.find(table => table.tableId === savedData.tableId)
			}
			return savedData
		})
	}

	save (personalizedData) {
		if(personalizedData.table) {
			personalizedData.tableId = personalizedData.table.tableId
			delete personalizedData.table
		}
		this.$window.sessionStorage[STORAGE_KEY] = JSON.stringify(personalizedData)
	}

}

RefIdentity.$$ngIsClass = true
RefIdentity.$inject = ['$window', 'Tournament']

export default RefIdentity
