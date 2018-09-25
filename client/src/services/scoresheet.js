'use strict'

import angular from 'angular'

const INCOMPLETE_MISSION_ERROR = 'Some missions are incomplete'
const MISSING_REF_ERROR = 'Missing referee'
const MISSING_TABLE_ERROR = 'Missing table'
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
		return Promise.all([this.Challenge.load(), this.RefIdentity.init()])
			.then(([challenge]) => {
				this._original = challenge
				this._original.signature = undefined
			})
	}

	reset() {
		this.current = angular.copy(this._original) // Using a copy of the challenge as the current scoresheet
		this.current.missions.forEach(mission => {
			mission.id = mission.title.split(' ')[0]
			mission.scoreFunction = mission.score[0]
			mission.score = 0
			mission.process = () => this.processMission(mission)
		})
		this.errors = [
			{ error: MISSING_REF_ERROR },
			{ error: MISSING_TABLE_ERROR },
			{ error: MISSING_TEAM_ERROR },
			{ error: MISSING_ROUND_ERROR },
			{ mission: this.current.missions[0], error: INCOMPLETE_MISSION_ERROR }
		]
		return Promise.resolve(this.current)
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
		// Mission errors
		this.errors = this.errors.filter(error => error.error !== INCOMPLETE_MISSION_ERROR)
		this.current.missions.forEach(mission => {
			if (!mission.complete) {
				this.errors.push({ mission, error: INCOMPLETE_MISSION_ERROR })
				return false
			}
			return true
		})
		if (this.current.teamNumber) {
			this.errors = this.errors.filter(error => error.error !== MISSING_TEAM_ERROR)
		}
		if (this.current.matchId) {
			this.errors = this.errors.filter(error => error.error !== MISSING_ROUND_ERROR)
		}
		if (this.RefIdentity.referee) {
			this.errors = this.errors.filter(error => error.error !== MISSING_REF_ERROR)
		}
		if (this.RefIdentity.tablesDisabled || this.RefIdentity.table) {
			this.errors = this.errors.filter(error => error.error !== MISSING_TABLE_ERROR)
		}
	}

	save() {
		return this.RefIdentity.load().then(identity => {
			let sanitizedScoresheet = {
				missions: this.current.missions.map(mission => {
					return {
						id: mission.id,
						score: mission.score,
						objectives: mission.objectives.map(objective => {
							return {
								id: objective.id,
								value: objective.value
							}
						})
					}
				}),
				score: this.current.score,
				challenge: this.current.title,
				signature: this.current.signature,
				teamNumber: this.current.teamNumber,
				round: this.current.round,
				stage: this.current.stage,
				matchId: this.current.matchId,
				referee: identity.referee,
				tableId: identity.table.tableId
			}

			let action = this.current._id ? `/scores/${this.current._id}/update/` : '/scores/create'
			return this.Independence.send('POST', action, sanitizedScoresheet)
		})
	}

	load(scoresheet) {
		return this.RefIdentity.load({ referee: scoresheet.referee, tableId: scoresheet.tableId })
		.then(() => this.reset())
		.then(current => {
			scoresheet.missions.forEach(mission => {
				mission.objectives.forEach(objective => {
					current.objectives[objective.id].value = objective.value
				})
			})
			Object.assign(current, {
				signature: scoresheet.signature,
				teamNumber: scoresheet.teamNumber,
				score: scoresheet.score,
				title: scoresheet.challenge,
				round: scoresheet.round,
				stage: scoresheet.stage,
				_id: scoresheet._id
			})
			
			return current
		})
	}

}

Scoresheet.$$ngIsClass = true
Scoresheet.$inject = ['Challenge', 'RefIdentity', 'Independence']

export default Scoresheet
