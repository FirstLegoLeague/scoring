'use strict'

class Logger {

	constructor($http) {
		this.$http = $http
	}

	log(message, level='debug') {
		this.$http.post(`/log/${level}`, { message })
	}

	debug(message) {
		this.log(message)
	}

	info(message) {
		this.log(message, 'info')
	}

	warn(message) {
		this.log(message, 'warn')
	}

	error(message) {
		this.log(message, 'error')
	}

	fatal(message) {
		this.log(message, 'fatal')
	}

}

Logger.$$ngIsClass = true
Logger.$inject = ['$http']

export default Logger
