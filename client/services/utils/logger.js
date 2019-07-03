const LEVELS = {
  debug: 'log',
  info: 'log',
  warn: 'warn',
  error: 'error',
  fatal: 'error'
}

class Logger {
  constructor ($http) {
    Object.assign(this, { $http })

    Object.entries(LEVELS).forEach(([level, consoleMethod]) => {
      this[level] = message => {
        console[consoleMethod](message)
        this.log(message, level)
      }
    })
  }

  log (message, level = 'debug') {
    message = `client: ${message}`
    return this.$http.post(`/log/${level}`, { message })
      .catch(error => console.warn(`Cannot log to server: ${error}`))
  }
}

Logger.$$ngIsClass = true
Logger.$inject = ['$http']

export default Logger
