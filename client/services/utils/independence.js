const RETRY_TIME = 5 * 1000 // 5 seconds
const STORAGE_KEY_PREFIX = 'independence_actions'

class Independence {
  constructor ($http, $window, $interval) {
    Object.assign(this, { $http, $window, $interval })
    this.lastSuccessfulRequestTime = Date.now()
    this.retryPendingRequests()

    this.$interval(() => {
      if (this._pendingRequests().length > 0) {
        this.retryPendingRequests()
      }
    }, RETRY_TIME)
  }

  send (method, url, data) {
    const action = { method, url, data, pending: false }
    this._saveRequest(action)
    return this._requestPromise(action)
  }

  // Requests functions

  retryPendingRequests () {
    return Promise.all(this._pendingRequests().filter(action => !action.pending).map(action => this._requestPromise(action)))
  }

  _requestPromise (action) {
    action.pending = true
    this._saveRequest(action)
    return this.$http[action.method.toLowerCase()](action.url, action.data)
      .then(response => {
        if (response.status <= 0) {
          throw response
        }
        this._deleteRequest(action)
        this.retryPendingRequests()
        return response
      })
      .catch(err => {
        if (err.status > 0 && err.status < 500) {
          this._deleteRequest(action)
        } else {
          action.pending = false
          this._saveRequest(action)
        }
        err.pendingRequestsCount = this.pendingRequestsCount(pendingRequest => pendingRequest.method === action.method && pendingRequest.url === action.url)
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
Independence.$inject = ['$http', '$window', '$interval']

export default Independence
