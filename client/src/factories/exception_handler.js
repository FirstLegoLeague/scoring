'use strict'

function ExceptionHandler($injector) {
	let logger

    return function (exception, cause) {
    	logger = logger || $injector.get('Logger')
    	console.error(exception)
    	logger.error(exception.message)
    };
}

ExceptionHandler.$inject = ['$injector']

export default ExceptionHandler
