'use strict'

import angular from 'angular'

const INCOMPLETE_MISSION_ERROR = 'Some missions are incomplete'
const MISSING_TEAM_ERROR = 'Missing team'
const MISSING_ROUND_ERROR = 'Missing round'

class Scoresheet {

	constructor(Challenge, RefIdentity, Independence) {
		this.Challenge = Challenge
		this.RefIdentity = RefIdentity
		this.Independence = Independence
		this.errors = []
	}

	init() {
		let self = this
		return this.Challenge.load()
			.then(challenge => {
				self._original = challenge
				self._original.signature = undefined
			})
	}

	reset() {
		let self = this
		this.current = angular.copy(this._original) // Using a copy of the challenge as the current scoresheet
		this.current.missions.forEach(mission => {
			mission.id = mission.title.split(' ')[0]
			mission.scoreFunction = mission.score[0]
			mission.score = 0
			mission.process = () => self.processMission(mission)
		})
		this.errors = [
			{ error: MISSING_TEAM_ERROR },
			{ error: MISSING_ROUND_ERROR },
			{ mission: this.current.missions[0], error: INCOMPLETE_MISSION_ERROR }
		]
		return Promise.resolve(self.current)
	}

	score() {
		if (!this.current) {
			return 0
		}
		this.current.score = this.current.missions.reduce((sum, mission) => sum + mission.score, 0) || 0
		return this.current.score
	}

	processMission(mission) {
		let values = mission.dependencies.map(dependency => dependency.value)
		if (values.some(value => value === undefined)) {
			mission.error = undefined
			mission.complete = false
			mission.score = 0
			return
		}
		let result = mission.scoreFunction.apply(null, values)
		if (result instanceof Error) {
			mission.complete = false
			mission.error = result
			if (this.errors.every(error => error.mission !== mission)) {
				this.errors.push({ mission, error: mission.error })
			}
		} else {
			mission.error = undefined
			mission.complete = true
			mission.score = result
			this.errors = this.errors.filter(error => error.mission !== mission)
		}

		this.processErrors()
	}

	processErrors() {
		let self = this
		// Missinon errors
		self.errors = self.errors.filter(error => error.error !== INCOMPLETE_MISSION_ERROR)
		self.current.missions.forEach(mission => {
			if (!mission.complete) {
				self.errors.push({ mission, error: INCOMPLETE_MISSION_ERROR })
				return false
			}
			return true
		})

		// Missing data errors
		if (self.current.teamNumber) {
			self.errors = self.errors.filter(error => error.error !== MISSING_TEAM_ERROR)
		}

		// Missing round errors
		if (self.current.round) {
			self.errors = self.errors.filter(error => error.error !== MISSING_ROUND_ERROR)
		}
	}

	save() {
		return this.RefIdentity.load().then(identity => {
			let sanitizedScoresheet = {
				missions: this.current.missions.map(mission => {
					return {
						id: mission.id,
						title: mission.title,
						description: mission.description,
						score: mission.score,
						objectives: mission.objectives.map(objective => {
							return {
								id: objective.id,
								title: objective.title,
								type: objective.type,
								default: objective.default,
								value: objective.value
							}
						})
					}
				}),
				score: this.current.score,
				challenge: this.current.title,
				signature: this.current.signature,
				teamNumber: this.current.teamNumber,
				referee: identity.referee || this.current.referee,
				tableId: identity.tableId || this.current.tableId
			}

			let action = this.current._id ? `/scores/${this.current._id}/update/` : '/scores/create'
			return this.Independence.send('POST', action, sanitizedScoresheet)
		})
	}

	load(scoresheet) {
		return this.reset().then(current => {
			scoresheet.missions.forEach(mission => {
				mission.objectives.forEach(objective => {
					current.objectives[objective.id].value = objective.value
				})
			})
			Object.assign(current, {
				referee: scoresheet.referee,
				tableId: scoresheet.tableId,
				signature: scoresheet.signature,
				teamNumber: scoresheet.teamNumber,
				score: scoresheet.score,
				title: scoresheet.challenge,
				_id: scoresheet._id
			})
			return current
		})
	}

}

Scoresheet.$$ngIsClass = true
Scoresheet.$inject = ['Challenge', 'RefIdentity', 'Independence']

export default Scoresheet
