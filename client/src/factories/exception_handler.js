function ExceptionHandler ($injector) {
  const SAME_EXCEPTION_TIMEOUT = 60 * 1000 // One minute

  let logger
  let lastExceptionMessage
  let lastExceptionTime

  function differentFromLastException (exception) {
    const timeSinceLastException = Date.now() - lastExceptionTime
    return lastExceptionMessage === undefined || exception.message !== lastExceptionMessage || timeSinceLastException > SAME_EXCEPTION_TIMEOUT
  }

  function setLastException (exception) {
    lastExceptionMessage = exception.message
    lastExceptionTime = Date.now()
  }

  return function (exception, cause) {
    if (differentFromLastException(exception)) {
      logger = logger || $injector.get('Logger')
      setLastException(exception)
      logger.error(`${exception.message} ${exception.stack}`)
    }
  }
}

ExceptionHandler.$inject = ['$injector']

export default ExceptionHandler
