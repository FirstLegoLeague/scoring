'use strict'

const STORAGE_KEY = 'referee'
const EMPTY_DATA = { referee: undefined, table: undefined }

class Identity {

	constructor ($window) {
		this.$window = $window
	}

	$onInit () {
		let self = this
		load().then(personalizedData => {
			Object.assign(self, personalizedData)
		})
	}

	setReferee (referee) {
		load().then(personalizedData => {
			personalizedData.referee = referee
			return personalizedData
		}).then(personalizedData => save(personalizedData))
	}

	setTable (table) {
		load().then(personalizedData => {
			personalizedData.table = table
			return personalizedData
		}).then(personalizedData => save(personalizedData))
	}

	load () {
		return Promise.resolve(JSON.parse(this.$window.sessionStorage[STORAGE_KEY]) || EMPTY_DATA)
	}

	save (personalizedData) {
		this.$window.sessionStorage[STORAGE_KEY] = JSON.stringify(personalizedData)
	}

}

Identity.$inject = ['$window']

export default Configuration
