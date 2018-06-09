'use strict'

import angular from 'angular'

class Scoresheet {

	constructor (Challenge, Identity, Independence) {
		this.Challenge = Challenge
		this.Identity = Identity
		this.Independence = Independence
	}

	init () {
		let self = this
		return this.Challenge.load()
			.then(challenge => {
				self._original = challenge
				self._original.signature = undefined
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
		this.current = angular.copy(this._original) // Using a copy of the challenge as the current scoresheet
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
				missions: this.current.missions.map(mission => {
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
				referee: identity.referee || this.crurent.referee,
				table: identity.table || this.crurent.referee
			}

			let action = this.current._id ? `/scores/${this.current._id}/update/` : '/scores/create'
			return this.Independence.send('POST', action, sanitizedScoresheet)
		})
	}

	load (scoresheet) {
		return this.reset().then(current => {
			scoresheet.missions.forEach(mission => {
				mission.objectives.forEach(objective => {
					current.objectives[objective.id].value = objective.value
				})
			})
			Object.assign(current, {
				referee: scoresheet.referee,
				table: scoresheet.table,
				signature: scoresheet.signature,
				score: scoresheet.score,
				title: scoresheet.challenge,
				_id: scoresheet._id
			})
			return current
		})
	}

}

Scoresheet.$inject = ['Challenge', 'Identity', 'Independence']

export default Scoresheet
