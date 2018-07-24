'use strict'

class Tournament {

	constructor ($http, Configuration) {
		this.$http = $http
		this.Configuration = Configuration
		this._teamsMathcesPromises = { }
	}

	init () {
		return this.Configuration.load().then(config => {
			this.tournament = config.tournament
			return this
		})
	}

	teams () {
		if(!this._teamsPromise) {
			this._teamsPromise = this.init()
			.then(() => this.$http.get(`${this.tournament}/team/all`))
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
			.then(() => this.$http.get(`${this.tournament}/table/all`))
			.then(response => response.data)
		}
		
		return this._tablesPromise
	}

	teamsMatches(teamNumber){
		if(!this._teamsMathcesPromises[teamNumber]) {
			this._teamsMathcesPromises[teamNumber] = this.init()
			.then(() => this.$http.get(`${this.tournament}/teams/${teamNumber}/matches`))
			.then(response => response.data)
		}

		return this._teamsMathcesPromises[teamNumber]
	}

}

Tournament.$$ngIsClass = true
Tournament.$inject = ['$http', 'Configuration']

export default Tournament
