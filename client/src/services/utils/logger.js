const LEVELS = ['debug', 'info', 'warn', 'error', 'fatal']

class Logger {
  constructor ($http) {
    Object.assign(this, { $http })

    LEVELS.forEach(level => {
      this[level] = message => this.log(message, level)
    })

    this.$http = $http
  }

  log (message, level = 'debug') {
    message = `client: ${message}`
    return this.$http.post(`/log/${level}`, { message })
  }
}

Logger.$$ngIsClass = true
Logger.$inject = ['$http']

export default Logger
