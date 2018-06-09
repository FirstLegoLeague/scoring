'use strict'

// Wraps the JQuery interface of Foundation in order to seperate it from angular.

const LEVEL_CLASS_ALLIASES = {
	error: 'alert'
}

class Notifications {

	notify (level, message) {
		new Foundation.Notification(message, level)
	}

}

Notifications.$inject = ['$window']

export default Notifications
