'use strict'

import angular from 'angular'

class Scoresheet {

	constructor (Challenge, Identity, Independence) {
		this.Challenge = Challenge
		this.Identity = Identity
		this.Independence = Independence
	}

	load () {
		let self = this
		return this.Challenge.load()
			.then(challenge => {
				self._challenge = challenge
				self._challenge.signature = undefined
			})
	}

	setTeam (team) {
		this.current.team = team
	}

	setRound (round) {
		this.current.round = round
	}

	reset () {
		let self = this
		this.current = angular.copy(this._challenge) // Using a copy of the challenge as the current scoresheet
		this.current.missions.forEach(mission => {
            mission.id = mission.title.split(' ')[0]
			mission.scoreFunction = mission.score[0]
			mission.score = 0
			mission.process = () => self.processMission(mission)
		})
		return Promise.resolve(self.current)
	}

	score () {
		if(!this.current) {
			return 0
		}
		this.current.score = this.current.missions.reduce((sum, mission) => sum + mission.score, 0) || 0
		return this.current.score
	}

	processMission (mission) {
		let self = this
		let values = mission.dependencies.map(dependency => dependency.value)
		if(values.some(value => value === undefined)) {
			mission.error = undefined
			mission.complete = false
			mission.score = 0
			return
		}
		let result = mission.scoreFunction.apply(null, values)
		if(result instanceof Error) {
			mission.complete = false
			mission.error = result
		} else {
			mission.error = undefined
			mission.complete = true
			mission.score = result
		}
	}

	save () {
		return this.Identity.load().then(identity => {
			let sanitizedScoresheet = {
				missions:  this.current.missions.map(mission => {
					return {
						id:mission.id,
						title:mission.title,
						description: mission.description,
						score:mission.score,
						objectives: mission.objectives.map(objective => {
							return {
								id:objective.id,
								title:objective.title,
								type: objective.type,
								default:objective.default,
								value: objective.value
							}
						})
					}
				}),
				score: this.current.score,
				challenge: this.current.title,
				signature: this.current.signature,
				referee: identity.referee,
				table: identity.table
			}

			return this.Independence.send('POST', '/scores/create', sanitizedScoresheet)
		})
	}

}

Scoresheet.$inject = ['Challenge', 'Identity', 'Independence']

export default Scoresheet
