'use strict'

class Scores {

	constructor ($http) {
		this.$http = $http
		this._all = []
	}

	load () {
		return this.$http.get('/scores/all').then(response => response.data).then(scores => {
			this._all = scores
			return this._all
		})
	}

	all () {
		return (this._all.length === 0) ? this.load() : Promise.resolve(this._all)
	}

	delete (id) {
		return this.$http.delete(`/scores/${id}/delete`)
	}

	update (id, attributes) {
		return this.$http.post(`/scores/${id}/update`, attributes)
	}

}

Scores.$$ngIsClass = true
Scores.$inject = ['$http']

export default Scores
