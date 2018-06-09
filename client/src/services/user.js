'use strict'

const COOKIE_KEY = 'username'
const ADMINS = ['admin', 'scorekeeper', 'development']

class User {

	constructor ($cookies) {
		this.username = $cookies.get(COOKIE_KEY)
	}

	isAdmin () {
		return this.username in ADMINS
	}

}

User.$inject = ['$cookies']

export default User
