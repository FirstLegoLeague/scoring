'use strict'

// Wraps the JQuery interface of Foundation in order to seperate it from angular.

class Notifications {

	notify (message, level) {
		new Foundation.Notification(message, level)
	}

	success (message) {
		this.notify(message, 'success')
	}

	warning (message) {
		this.notify(message, 'warning')
	}

	error (message) {
		this.notify(message, 'error')
	}

}

export default Notifications
