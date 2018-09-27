function ExceptionHandler ($injector) {
  let logger

  return function (exception, cause) {
    logger = logger || $injector.get('Logger')
    console.error(exception)
    logger.error(`${exception.message} ${exception.stack}`)
  }
}

ExceptionHandler.$inject = ['$injector']

export default ExceptionHandler
