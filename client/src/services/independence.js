'use strict'

const TEMPORARY_TIMESPAN = 60 * 1000 // 10 minutes

const STATUS_CODES = {
	ONLINE: 0,
	TEMPORARY_OFFLINE: 1,
	PERMENENTLY_OFFLINE: 2
}

class Independence {

	constructor ($http, $window) {
		this.$http = $http
		this.$window = $window

		this.STATUS_CODES = {}
		Object.assign(this.STATUS_CODES, STATUS_CODES)

		this.lastSuccessfulRequestTime = Date.now()
	}

	send (method, url, data) {
		let action = { method, url, data }
		this.retryPendingrequests()
		this.saveRequest(action)
		return this.requestPromise(action)
	}

	// Requests functions

	retryPendingrequests() {
		let self = this
		this.loadRequests().forEach(action => self.requestPromise(action))
	}

	requestPromise (action) {
		let self = this
		return this.$http[action.method.toLowerCase()](action.url, action.data)
			.then(() => self.deleteRequest(action))
	}

	// Storage functions

	saveRequest (action) {
		this.$window.localStorage[`independence_action_${Date.now()}`] = JSON.stringify(action)
	}

	deleteRequest (key) {
		this.lastSuccessfulRequestTime = Date.now()
		delete this.$window.localStorage[key]
	}

	loadRequests () {
		return Object.keys(this.$window.localStorage)
			.filter(key => key.startsWith('independence_actions'))
			.map(key => Object.assign(JSON.parse(this.$window.localStorage[key]), { key }))
	}

	// Status functions

	status () {
		let pendingRequestsCount = this.loadRequests().length
		if(pendingRequestsCount === 0) {
			return STATUS_CODES.ONLINE
		}

		let milisecondsSinceLastSuccessfulRequest = Date.now() - this.lastSuccessfulRequestTime
		if(milisecondsSinceLastSuccessfulRequest < TEMPORARY_TIMESPAN) {
			return STATUS_CODES.TEMPORARY_OFFLINE
		} else {
			return STATUS_CODES.PERMENENTLY_OFFLINE
		}
	}

}

Independence.$inject = ['$http', '$window']

Independence.STATUS_CODES = STATUS_CODES

export default Independence
