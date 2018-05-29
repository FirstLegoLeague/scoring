'use strict'

class Challenge {

	constructor ($http) {
		this.$http = $http
	}

	list () {
		let self = this
		return this.$http.get('/challenges/all')
	}

	load (challenge) {
		let self = this
		return this.$http.get(`/challenge/${challenge}`).then(response => {
            self.challenge = eval(`(${response.data})`) // We can't use JSON.parse because the file contains functions
            self.challenge.objectives = self.objectives(self.challenge.missions)
            return self.challenge
        })
	}

	objectives (missions) {
		return missions.reduce((objectives, mission) => {
			let missionObjectives = mission.objectives.reduce((objectives, objective) => {
				objectives[objective.id] = objective
				return objectives
			}, {})

			return Object.assign(objectives, missionObjectives)
		}, {})
	}

	I18n (key) {
		return this.challenge.strings[key]
	}

}

Challenge.$inject = ['$http']

export default Challenge
