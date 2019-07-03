function AuthenticationInterceptor ($q, $document) {
  function responseError (response) {
    if (response.status !== 403) return $q.reject(response)
    $document[0].location.href = '/logout'
  }

  return { responseError }
}

AuthenticationInterceptor.$inject = ['$q', '$document']

export default AuthenticationInterceptor
