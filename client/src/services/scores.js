'use strict'

class Scores {

	constructor ($http) {
		this.$http = $http
	}

	all () {
		return this.$http.get('/scores/all')
	}

}

Scores.$inject = ['$http']

export default Scores
