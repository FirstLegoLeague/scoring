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

  class () {
    return this.UI[this.Independence.status].class
  }

  text () {
    return this.UI[this.Independence.status].text
  }

}

StatusController.$$ngIsClass = true
StatusController.$inject = ['Independence']

export default StatusController
