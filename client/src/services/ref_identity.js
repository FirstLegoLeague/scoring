'use strict'

const STORAGE_KEY = 'referee'
const EMPTY_DATA = JSON.stringify({ referee: undefined, tableId: undefined })

class RefIdentity {

	constructor ($window, Tournament) {
		this.$window = $window
		this.Tournament = Tournament
	}

	init () {
		return this.load().then(() => {
			this.initialized = this.isInitialized()
			return this
		})
	}

	load (data) {
		if(this.isInitialized()) {
			return Promise.resolve(this)
		}

		return this.Tournament.tables().then(tables => {
			this.tables = tables
			if(tables.length === 0) {
				this.tablesDisabled = true
			}
			let personalizedData = data || JSON.parse(this.$window.sessionStorage[STORAGE_KEY] || EMPTY_DATA)
			if(personalizedData.tableId) {
				personalizedData.table = this.tables.find(table => table.tableId === personalizedData.tableId)
			}
			Object.assign(this, personalizedData)
			return personalizedData
		})
	}

	save (personalizedData) {
		if(personalizedData.table) {
			personalizedData.tableId = personalizedData.table.tableId
			delete personalizedData.table
		}
		this.$window.sessionStorage[STORAGE_KEY] = JSON.stringify(personalizedData)
	}

	isInitialized () {
		return this.referee || this.table
	}

}

RefIdentity.$$ngIsClass = true
RefIdentity.$inject = ['$window', 'Tournament']

export default RefIdentity
