const LEVELS = ['success', 'warning', 'error']

// Wraps the JQuery interface of Foundation in order to seperate it from angular.

class Notifications {
  constructor ($window) {
    Object.assign(this, { $window })

    LEVELS.forEach(level => {
      this[level] = message => this.notify(message, level)
    })
  }

  notify (message, level) {
    return new this.$window.Foundation.Notification(message, level)
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

Notifications.$$ngIsClass = true
Notifications.$inject = ['$window']

export default Notifications
