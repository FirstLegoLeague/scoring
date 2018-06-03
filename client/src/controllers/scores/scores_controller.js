'use strict'

class ScoresController {

	constructor (Scores) {
		this.Scores = Scores
	}

	$onInit () {
		let self = this
		this.Scores.all().then(scores => {
			self.scores = scores
		})
	}

}

ScoresController.$inject = ['Scores']

export default ScoresController
