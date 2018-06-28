'use strict'

const COOKIE_KEY = 'username'
const ADMINS = ['admin', 'scorekeeper', 'development']
const REFS = ['referee', 'development']

class User {

	constructor ($cookies) {
		this.username = $cookies.get(COOKIE_KEY)
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
