function Config ($httpProvider) {
  $httpProvider.interceptors.push('authenticationInterceptor')
}

Config.$inject = ['$httpProvider']

export default Config
