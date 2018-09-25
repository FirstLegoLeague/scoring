import AuthenticationInterceptor from './authentication_interceptor'
import ExceptionHandler from './exception_handler'

// eslint-disable-next-line node/exports-style
export default {
  AuthenticationInterceptor,
  '$exceptionHandler': ExceptionHandler
}
