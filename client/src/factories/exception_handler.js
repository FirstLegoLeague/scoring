'use strict'

function ExceptionHandler($injector) {
	let logger

    return function (exception, cause) {
    	logger = logger || $injector.get('Logger')
    	logger.error(exception.message)
    };
}

ExceptionHandler.$inject = ['$injector']

export default ExceptionHandler
