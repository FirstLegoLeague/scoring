'use strict'

class Tournament {

	constructor($http, Configuration, User) {
		this.$http = $http
		this.Configuration = Configuration
		this.User = User
		this.httpRequestConfig = { headers: { 'auth-token': User.authToken } }
		this._teamsMathcesPromises = { }
	}

	init () {
		return this.Configuration.load().then(config => {
			this.tournament = config.tournament
			return this
		})
	}

	teams (force) {
		if(!this._teamsPromise || force) {
			this._teamsPromise = this.init()
			.then(() => this.$http.get(`${this.tournament}/team/all`, this.httpRequestConfig))
			.then(response => {
				const teams = response.data
				teams.forEach(team => {
					team.displayText = `#${team.number} ${team.name}`
				})
				return teams
			})
		}

		return this._teamsPromise
	}

	tables () {
		if(!this._tablesPromise) {
			this._tablesPromise = this.init()
			.then(() => this.$http.get(`${this.tournament}/table/all`, this.httpRequestConfig))
			.then(response => response.data)
		}
		
		return this._tablesPromise
	}

	teamsMatches(teamNumber){
		if(!this._teamsMathcesPromises[teamNumber]) {
			this._teamsMathcesPromises[teamNumber] = this.init()
			.then(() => this.$http.get(`${this.tournament}/team/${teamNumber}/matches`, this.httpRequestConfig))
			.then(response => {
				const matches = response.data
				matches.forEach((match, index) => {
					match.displayText = `${match.stage} #${index + 1}`
				})
				return matches
			})
		}

		return this._teamsMathcesPromises[teamNumber]
	}

}

Tournament.$$ngIsClass = true
Tournament.$inject = ['$http', 'Configuration', 'User']

export default Tournament
