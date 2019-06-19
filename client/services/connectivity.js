const ONLINE_TIMESPAN = 5 * 1000 // 5 seconds
const TEMPORARY_TIMESPAN = 10 * 60 * 1000 // 10 minutes
const TEMPORARY_REQUESTS_COUNT = 5
const STATUS_CODES = {
  ONLINE: 'online',
  TEMPORARY_OFFLINE: 'temporary-offline',
  PERMANENTLY_OFFLINE: 'permanently-offline'
}

class Connectivity {
  constructor (independence, messanger) {
    Object.assign(this, { independence, messanger })
    this.STATUS_CODES = STATUS_CODES
  }

  status () {
    const pendingRequestsCount = this.independence.pendingRequestsCount()
    if (pendingRequestsCount > 0) {
      const timeSinceLastSuccessfulRequest = Date.now() - this.independence.lastSuccessfulRequestTime
      if (timeSinceLastSuccessfulRequest > ONLINE_TIMESPAN) {
        if (timeSinceLastSuccessfulRequest < TEMPORARY_TIMESPAN && pendingRequestsCount < TEMPORARY_REQUESTS_COUNT) {
          return STATUS_CODES.TEMPORARY_OFFLINE
        } else {
          return STATUS_CODES.PERMANENTLY_OFFLINE
        }
      }
    }

    if (!this.messanger.open) {
      const timeSinceLastConnection = this.messanger.timeSinceLastConnection()
      if (timeSinceLastConnection > ONLINE_TIMESPAN) {
        if (timeSinceLastConnection < TEMPORARY_TIMESPAN) {
          return STATUS_CODES.TEMPORARY_OFFLINE
        } else {
          return STATUS_CODES.PERMANENTLY_OFFLINE
        }
      }
    }

    return STATUS_CODES.ONLINE
  }
}

Connectivity.$$ngIsClass = true
Connectivity.$inject = ['independence', 'messanger']

export default Connectivity
