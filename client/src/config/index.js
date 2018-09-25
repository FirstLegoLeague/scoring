function Config ($httpProvider) {
  $httpProvider.interceptors.push('AuthenticationInterceptor')
}

Config.$inject = ['$httpProvider']

export default Config
