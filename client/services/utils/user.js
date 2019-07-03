const USERNAME_COOKIE_KEY = 'username'
const AUTH_TOKEN_COOKIE_KEY = 'auth-token'
const ADMINS = ['admin', 'scorekeeper', 'development']
const REFS = ['referee', 'development']

class User {
  constructor ($cookies) {
    this.username = $cookies.get(USERNAME_COOKIE_KEY)
    this.authToken = $cookies.get(AUTH_TOKEN_COOKIE_KEY)
  }

  isAdmin () {
    return ADMINS.includes(this.username)
  }

  isRef () {
    return REFS.includes(this.username)
  }
}

User.$$ngIsClass = true
User.$inject = ['$cookies']

export default User
