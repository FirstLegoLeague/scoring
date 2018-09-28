const STORAGE_KEY_PREFIX = 'independence_actions'

class Independence {
  constructor ($http, $window) {
    Object.assign(this, { $http, $window })
    this.lastSuccessfulRequestTime = Date.now()
  }

  send (method, url, data) {
    const action = { method, url, data }
    return this.retryPendingRequests()
      .catch(err => {
        console.warn(`Failed to send pending requests: ${err}`)
      })
      .then(() => {
        this._saveRequest(action)
        return this._requestPromise(action)
      })
  }

  // Requests functions

  retryPendingRequests () {
    return Promise.all(this._pendingRequests().map(action => this._requestPromise(action)))
  }

  _requestPromise (action) {
    return this.$http[action.method.toLowerCase()](action.url, action.data)
      .then(() => {
        this._deleteRequest(action)
      })
      .catch(err => {
        if (err.status < 500) {
          this._deleteRequest(action)
        }
        err.pendingRequestsCount = this.pendingRequestsCount()
        throw err
      })
  }

  // Storage functions

  _saveRequest (action) {
    this.$window.localStorage[this._key(action)] = JSON.stringify(action)
  }

  _deleteRequest (action) {
    this.lastSuccessfulRequestTime = Date.now()
    delete this.$window.localStorage[this._key(action)]
  }

  _key (action) {
    if (!action._key) {
      action._key = Date.now()
    }
    return `${STORAGE_KEY_PREFIX}_${action._key}`
  }

  _pendingRequests () {
    return Object.keys(this.$window.localStorage)
      .filter(key => key.startsWith(STORAGE_KEY_PREFIX))
      .map(key => JSON.parse(this.$window.localStorage[key]))
  }

  pendingRequestsCount () {
    return this._pendingRequests().length
  }
}

Independence.$$ngIsClass = true
Independence.$inject = ['$http', '$window']

export default Independence