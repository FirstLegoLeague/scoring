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
		this.ignoreNextLoad = true
		return this.$http.delete(`/scores/${id}/delete`)
	}

	deleteAll () {
		this.ignoreNextLoad = true
		return this.$http.delete(`/scores/all`)
	}

	update (id, attributes) {
		this.ignoreNextLoad = true
		return this.$http.post(`/scores/${id}/update`, attributes)
	}

}

Scores.$$ngIsClass = true
Scores.$inject = ['$http']

export default Scores
