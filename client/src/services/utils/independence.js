const STORAGE_KEY_PREFIX = 'independence_actions'

class Independence {
  constructor ($http, $window, logger) {
    Object.assign(this, { $http, $window, logger })
    this.lastSuccessfulRequestTime = Date.now()
    this.retryPendingRequests()
  }

  send (method, url, data) {
    const action = { method, url, data, waiting: false }
    this._saveRequest(action)
    return this._requestPromise(action)
  }

  // Requests functions

  retryPendingRequests () {
    return Promise.all(this._pendingRequests().filter(action => !action.waiting).map(action => this._requestPromise(action)))
  }

  _requestPromise (action) {
    action.waiting = true
    return this.$http[action.method.toLowerCase()](action.url, action.data)
      .then(response => {
        if (response.status <= 0) {
          throw response
        }
        this._deleteRequest(action)
        action.waiting = false
        this.retryPendingRequests()
        return response
      })
      .catch(err => {
        if (err.status > 0 && err.status < 500) {
          this._deleteRequest(action)
        }
        err.pendingRequestsCount = this.pendingRequestsCount(pendingRequest => pendingRequest.method === action.method && pendingRequest.url === action.url)
        action.waiting = false
        throw err
      })
  }

  // Storage functions

  _saveRequest (action) {
    this.$window.localStorage[this._key(action)] = JSON.stringify(action)
  }

  _deleteRequest (action) {
    this.lastSuccessfulRequestTime = Date.now()
    this.$window.localStorage.removeItem(this._key(action))
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

  pendingRequestsCount (filter) {
    if (!filter) {
      filter = () => true
    }
    return this._pendingRequests().filter(filter).length
  }
}

Independence.$$ngIsClass = true
Independence.$inject = ['$http', '$window', 'Logger']

export default Independence
