'use strict'

// Wraps the JQuery interface of Foundation in order to seperate it from angular.

const LEVEL_CLASS_ALLIASES = {
	error: 'alert'
}

class Notifications {

	constructor ($window, $document, $timeout) {
		this.$ = $window.$
		this.$document = $document
		this.$timeout = $timeout
	}

	notify (level, message) {
		let self = this

		let notifications = this.$(this.$document).find('#notifications')
		let body = this.$document.find('body').eq(0);
		if(notifications.length === 0) {
			body.append('<div id="notifications"></div>')
			notifications = this.$(this.$document).find('#notifications')
		}

		let id = `notification-${parseInt(Math.floor(0x100000*(Math.random())), 16)}`
		let levelClass = LEVEL_CLASS_ALLIASES[level] || level || 'info'
		notifications.append(`<div id="${id}" data-closable class="notification callout ${levelClass} radius">
		  ${message}<a href="#" class="close">&times;</a>
		</div>`)

		let notification = self.$(`#${id}`)
		function close() {
			notification.css('opacity', 0);
			self.$timeout(() => notification.detach(), 600)
		}

		notification.find('.close').on('click', close)
		this.$timeout(close, 5000)
	}

}

Notifications.$inject = ['$window', '$document', '$timeout']

export default Notifications
