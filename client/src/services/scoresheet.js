'use strict'

class Scoresheet {

	constructor (Configuration, Challenge) {
		this.Challenge = Challenge
		this.Configuration = Configuration
	}

	load () {
		let self = this
		return this.Challenge.load(self.Configuration.challenge)
			.then(challenge => {
				self.challenge = challenge
				return challenge
			})
	}

	setTeam (team) {
		this.team = team
	}

	setRound (round) {
		this.round = round
	}

	reset () {
		this.team = undefined
		this.round = undefined
	}

	calc () {
		// TODO
	}

	save () {
		// TODO
	}

}

Scoresheet.$inject = ['Configuration', 'Challenge']

export default Scoresheet
