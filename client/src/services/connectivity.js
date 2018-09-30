const ONLINE_TIMESPAN = 10 * 1000 // 10 seconds
const TEMPORARY_TIMESPAN = 10 * 60 * 1000 // 10 minutes
const TEMPORARY_REQUESTS_COUNT = 5
const STATUS_CODES = {
  ONLINE: 0,
  TEMPORARY_OFFLINE: 1,
  PERMANENTLY_OFFLINE: 2
}

class Connectivity {
  constructor (Independence, Messanger) {
    Object.assign(this, { Independence, Messanger })
    this.STATUS_CODES = STATUS_CODES
  }

  status () {
    const pendingRequestsCount = this.Independence.pendingRequestsCount()
    if (pendingRequestsCount !== 0) {
      const timeSinceLastSuccessfulRequest = Date.now() - this.Independence.lastSuccessfulRequestTime
      if (timeSinceLastSuccessfulRequest < ONLINE_TIMESPAN) {
        return STATUS_CODES.ONLINE
      } else if (timeSinceLastSuccessfulRequest < TEMPORARY_TIMESPAN && pendingRequestsCount < TEMPORARY_REQUESTS_COUNT) {
        return STATUS_CODES.TEMPORARY_OFFLINE
      } else {
        return STATUS_CODES.PERMANENTLY_OFFLINE
      }
    }

    if (!this.Messanger.open) {
      const timeSinceLastConnection = this.Messanger.timeSinceLastConnection()
      if (timeSinceLastConnection < ONLINE_TIMESPAN) {
        return STATUS_CODES.ONLINE
      } else if (timeSinceLastConnection < TEMPORARY_TIMESPAN) {
        return STATUS_CODES.TEMPORARY_OFFLINE
      } else {
        return STATUS_CODES.PERMANENTLY_OFFLINE
      }
    }

    return STATUS_CODES.ONLINE
  }
}

Connectivity.$$ngIsClass = true
Connectivity.$inject = ['Independence', 'Messanger']

export default Connectivity
