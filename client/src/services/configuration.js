'use strict'

class Configuration {

	constructor ($http) {
		this.$http = $http
	}

	load () {
		let self = this
		return this.$http.get('/config').then(response => {
			Object.assign(self, response.data)
			return self
		})
	}

}

Configuration.$$ngIsClass = true
Configuration.$inject = ['$http']

export default Configuration
