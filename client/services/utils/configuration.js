class Configuration {
  constructor ($http) {
    Object.assign(this, { $http })
  }

  load () {
    if (!this._loadPromise) {
      this._loadPromise = this.$http.get('/config').then(response => {
        Object.assign(this, response.data)
        return this
      })
    }
    return this._loadPromise
  }
}

Configuration.$$ngIsClass = true
Configuration.$inject = ['$http']

export default Configuration
