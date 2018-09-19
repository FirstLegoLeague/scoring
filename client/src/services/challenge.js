'use strict'

const MISSION_DEPENDENCIES_REGEX = /^function\s*\((.+)\)/

class Challenge {

	constructor ($http, Configuration) {
		this.$http = $http
		this.Configuration = Configuration
	}

	load (challenge) {
		let self = this
		let challengePromise = challenge ? Promise.resolve(challenge) : this.getConfiguratedChallenge()

		return challengePromise
		.then(challenge => this.$http.get(`/challenge/${challenge}`))
		.then(response => {
            this.challenge = eval(`(${response.data})`) // We can't use JSON.parse because the file contains functions
            this.challenge.objectives = this.objectives(this.challenge.missions)
	        this.challenge.missions.forEach(mission => {
	        	mission.i18n = key => this.I18n(key)
	        	this.assignDependencies(mission, this.challenge.objectives)
	        	mission.objectives.forEach(objective => {
        			objective.i18n = key => this.I18n(key)
        		})
	        })
            return this.challenge
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

	assignDependencies (mission, objectives) {
		mission.dependencies = mission.score[0].toString().match(MISSION_DEPENDENCIES_REGEX)[1]
			.split(',').map(depName => objectives[depName.trim()])
	}

	I18n (key) {
		return this.challenge.strings[key]
	}

	getConfiguratedChallenge () {
		return this.Configuration.load().then(config => {
			let year = config.year.split(' ')[0]
			let language = config.language.split(' ')[0]
			return `${year}_${language}`
		})
	}

}

Challenge.$$ngIsClass = true
Challenge.$inject = ['$http', 'Configuration']

export default Challenge
