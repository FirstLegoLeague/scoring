const ONLINE_TIMESPAN = 10 * 1000 // 10 seconds
const TEMPORARY_TIMESPAN = 10 * 60 * 1000 // 10 minutes
const TEMPORARY_REQUESTS_COUNT = 5
const STATUS_CODES = {
  ONLINE: 0,
  TEMPORARY_OFFLINE: 1,
  PERMANENTLY_OFFLINE: 2
}

class Connectivity {
  constructor (independence, messanger) {
    Object.assign(this, { independence, messanger })
    this.STATUS_CODES = STATUS_CODES
  }

  status () {
    const pendingRequestsCount = this.independence.pendingRequestsCount()
    if (pendingRequestsCount > 1) {
      const timeSinceLastSuccessfulRequest = this.independence.lastSuccessfulRequestTime ? (Date.now() - this.independence.lastSuccessfulRequestTime) : 0
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
Connectivity.$inject = ['Independence', 'Messanger']

export default Connectivity
