'use strict'

class StatusController {

  constructor (Independence) {
    this.Independence = Independence
    this.initUISettings()
  }

  initUISettings () {
    this.UI = { }
    this.UI[this.Independence.STATUS_CODES.ONLINE] = { class: 'online', text: 'Online' }
    this.UI[this.Independence.STATUS_CODES.TEMPORARY_OFFLINE] = { class: 'temporary-offline', text: 'Temporary offline' }
    this.UI[this.Independence.STATUS_CODES.PERMENENTLY_OFFLINE] = { class: 'permanently-offline', text: 'Permenently offline' }
  }

  statusClass () {
    return this.UI[this.Independence.status()].class
  }

  statusText () {
    return this.UI[this.Independence.status()].text
  }

}

StatusController.$inject = ['Independence']

export default StatusController
