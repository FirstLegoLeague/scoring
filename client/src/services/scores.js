'use strict'

class Scores {

	constructor ($http) {
		this.$http = $http
	}

	all () {
		return this.$http.get('/scores/all').then(response => response.data)
	}

	delete (id) {
		return this.$http.delete(`/scores/${id}/delete`)
	}

	update (id, attributes) {
		return this.$http.put(`/scores/${id}/update`, attributes)
	}

}

Scores.$inject = ['$http']

export default Scores
