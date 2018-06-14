'use strict'

class ScoresController {

	constructor ($scope, Scores, Messanger) {
		this.$scope = $scope
		this.Scores = Scores
		this.Messanger = Messanger
		this.search = ''
		this.showDuplicates = false
	}

	$onInit () {
		let self = this
		this.load(false)
		// If the reload event comes from within this client, reload and send the message to every other client
		// Otherwise just reload
		this.$scope.$on('reload', () => self.load(true))
		this.Messanger.on('reload', () => self.load(false), true)
	}

	load (shouldBroadcast) {
		let self = this
		this.Scores.all().then(scores => {
			self._scores = scores
			if(shouldBroadcast) {
				self.Messanger.send('reload')
			}
		})
	}

	scores () {
		let self = this
		let scores = this._scores

		// Filter by search
		if(this.search) {
			scores = this._scores.filter(score => {
				return Object.values(score).some(value => value.toString().includes(self.search))
			})
		}

		// Filter by showDuplicates
		if(this.showDuplicates) {
			scores = this.duplicateScores(scores)

			if(scores.length === 0) {
				this.showDuplicates = false
				scores = this._scores
			}
		}

		return scores
	}

	duplicateScores (scores) {
		let self = this
		scores = scores || this._scores || []

		return scores.filter(score => {
			return self._scores.some(otherScore => {
				return score !== otherScore
					&& otherScore.team === score.team && otherScore.round === score.round
			})
		})
	}

}

ScoresController.$inject = ['$scope', 'Scores', 'Messanger']

export default ScoresController
