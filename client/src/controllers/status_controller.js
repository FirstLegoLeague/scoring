class StatusController {
  constructor (Connectivity) {
    Object.assign(this, { Connectivity })
    this.initUISettings()
  }

  initUISettings () {
    this.UI = {
      [this.Connectivity.STATUS_CODES.ONLINE]: { class: 'online', text: 'Online' },
      [this.Connectivity.STATUS_CODES.TEMPORARY_OFFLINE]: { class: 'temporary-offline', text: 'Temporary offline' },
      [this.Connectivity.STATUS_CODES.PERMANENTLY_OFFLINE]: { class: 'permanently-offline', text: 'Permenently offline' }
    }
  }

  class () {
    return this.UI[this.Connectivity.status()].class
  }

  text () {
    return this.UI[this.Connectivity.status()].text
  }
}

StatusController.$$ngIsClass = true
StatusController.$inject = ['Connectivity']

export default StatusController
