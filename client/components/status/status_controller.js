class StatusController {
  constructor (connectivity) {
    Object.assign(this, { connectivity })

    this.UI = {
      [this.connectivity.STATUS_CODES.ONLINE]: {
        class: 'inverted green',
        icon: 'check circle outline',
        text: 'Online'
      },
      [this.connectivity.STATUS_CODES.TEMPORARY_OFFLINE]: {
        class: 'secondary show',
        icon: 'blue notched circle loading',
        text: 'Reconnecting...'
      },
      [this.connectivity.STATUS_CODES.PERMANENTLY_OFFLINE]: {
        class: 'inverted red show',
        icon: 'exclamation circle',
        text: 'Offline'
      }
    }
  }

  class () {
    return this.UI[this.connectivity.status()].class
  }

  icon () {
    return this.UI[this.connectivity.status()].icon
  }

  text () {
    return this.UI[this.connectivity.status()].text
  }
}

StatusController.$$ngIsClass = true
StatusController.$inject = ['connectivity']

export default StatusController
