const LEVELS = {
  debug: 'log',
  info: 'log',
  warn: 'warn',
  error: 'error',
  fatal: 'error'
}

class Logger {
  constructor () {
    Object.entries(LEVELS).forEach(([level, consoleMethod]) => {
      this[level] = message => {
        console[consoleMethod](message)
        this.log(message, level)
      }
    })
  }

  log (message, level = 'debug') {
    message = `client: ${message}`
    return Promise.resolve()
      .catch(error => console.warn(`Cannot log to server: ${error}`))
  }
}

Logger.$$ngIsClass = true

export default Logger
