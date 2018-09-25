function AuthenticationInterceptor ($document) {
  function responseError (rejection) {
    if (rejection.status !== 403) return rejection
    $document[0].location.href = '/logout'
  }

  return { responseError }
}

AuthenticationInterceptor.$inject = ['$document']

export default AuthenticationInterceptor
