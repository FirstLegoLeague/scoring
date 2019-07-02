class Notifications {
  constructor ($window) {
    Object.assign(this, { $window })

    this.notifier = $window.toastr
  }

  success (message) {
    this.notifier.success(message)
  }

  info (message) {
    this.notifier.info(message)
  }

  warning (message) {
    this.notifier.warning(message)
  }

  error (message) {
    this.notifier.error(message)
  }
}

Notifications.$$ngIsClass = true
Notifications.$inject = ['$window']

export default Notifications
