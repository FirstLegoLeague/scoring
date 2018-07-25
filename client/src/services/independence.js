'use strict'

const TEMPORARY_TIMESPAN = 10 * 60 * 1000 // 10 minutes
const STORAGE_KEY_PREFIX = 'independence_actions'
const STATUS_CODES = {
	ONLINE: 0,
	TEMPORARY_OFFLINE: 1,
	PERMANENTLY_OFFLINE: 2
}

class Independence {

	constructor ($http, $window) {
		this.$http = $http
		this.$window = $window

		this.STATUS_CODES = {}
		Object.assign(this.STATUS_CODES, STATUS_CODES)
		this.status = STATUS_CODES.ONLINE

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
			.then(() => {
				self.deleteRequest(action)
				self.recalcStatus()
			})
			.catch(err => {
				if(err.status < 500){
					self.deleteRequest(action)
				}
				self.recalcStatus()
				err.pendingRequestsCount = self.pendingRequestsCount()
				throw err
			})
	}

	// Storage functions

	saveRequest (action) {
		this.$window.localStorage[this.key(action)] = JSON.stringify(action)
	}

	deleteRequest (action) {
		this.lastSuccessfulRequestTime = Date.now()
		delete this.$window.localStorage[this.key(action)]
	}

	key (action) {
		if(!action.key) {
			action.key = Date.now()
		}
		return `${STORAGE_KEY_PREFIX}_${action.key}`
	}

	loadRequests () {
		return Object.keys(this.$window.localStorage)
			.filter(key => key.startsWith(STORAGE_KEY_PREFIX))
			.map(key => JSON.parse(this.$window.localStorage[key]))
	}

	// Status functions

	recalcStatus () {
		if(this.pendingRequestsCount() === 0) {
			this.status = STATUS_CODES.ONLINE
		} else {
			let milisecondsSinceLastSuccessfulRequest = Date.now() - this.lastSuccessfulRequestTime
			if(milisecondsSinceLastSuccessfulRequest < TEMPORARY_TIMESPAN) {
				this.status = STATUS_CODES.TEMPORARY_OFFLINE
			} else {
				this.status = STATUS_CODES.PERMANENTLY_OFFLINE
			}
		}
	}

	pendingRequestsCount () {
		return this.loadRequests().length
	}
}

Independence.$$ngIsClass = true
Independence.$inject = ['$http', '$window']

Independence.STATUS_CODES = STATUS_CODES

export default Independence
