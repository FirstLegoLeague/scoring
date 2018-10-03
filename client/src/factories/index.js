import AuthenticationInterceptor from './authentication_interceptor'
import ExceptionHandler from './exception_handler'
import Score from './score'

// eslint-disable-next-line node/exports-style
export default {
  AuthenticationInterceptor,
  Score,
  '$exceptionHandler': ExceptionHandler
}
