'use strict'

class Tournament {

	constructor ($http, Configuration) {
		this.$http = $http
		this.Configuration = Configuration
	}

	init () {
		let self = this

		return this.Configuration.load().then(config => {
			self.tournament = config.tournament
			return self
		})
	}

	teams () {
		if(this._teams) {
			return Promise.resolve(this._teams)
		}

		let self = this

		return this.init()
			.then(() => self.$http.get(`${self.tournament}/team/all`))
			.then(response => {
				self._teams = response.data
				self._teams.forEach(team => {
					team.displayText = `#${team.number} ${team.name}`
				})
				return self._teams
			})
	}

	tables () {
		if(this._tables) {
			return Promise.resolve(this._tables)
		}

		let self = this

		return this.init()
			.then(() => self.$http.get(`${self.tournament}/table/all`))
			.then(response => {
				self._tables = response.data
				return self._tables
			})
	}

	teams_matches(){
		if(this._teams_matches){
			return Promise.resolve(this._teams_matches)
		}

		let self = this

		return this.init()
			.then(() => self.$http.get(`${self.tournament}/teamsmatches/all`))
			.then(response => {
				self._teams_matches = response.data
				return self._teams_matches
			})
	}

}

Tournament.$$ngIsClass = true
Tournament.$inject = ['$http', 'Configuration']

export default Tournament
