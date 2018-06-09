'use strict'

// Wraps the JQuery interface of Foundation in order to seperate it from angular.

class Notifications {

	notify (message, level) {
		new Foundation.Notification(message, level)
	}

	success (message) {
		this.notify('success', message)
	}

	warning (message) {
		this.notify('warning', message)
	}

	error (message) {
		this.notify('error', message)
	}

}

export default Notifications
