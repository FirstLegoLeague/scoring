'use strict'

class ScoresController {

	constructor($scope, Scores, Tournament, Messanger) {
		this.$scope = $scope
		this.Scores = Scores
		this.Tournament = Tournament
		this.Messanger = Messanger
		this.search = ''
		this.showDuplicates = false
		this.showErrors = false
		this._loading = true
	}

	$onInit() {
		let self = this
		this.load(false)
		// If the reload event comes from within this client, reload and send the message to every other client
		// Otherwise just reload
		this.$scope.$on('reload', () => self.load(true))
		this.Messanger.on('reload', () => self.load(false), true)
		Promise.all([this.Tournament.teams()]).then(
			responses => {
				this._loading = false
				this._teamNumberList = []
				for (var i = 0; i < responses[0].length; i++)//Creates list of team numbers.
				{
					this._teamNumberList.push(responses[0][i].number)
				}
			}
		)
	}

	load(shouldBroadcast) {
		let self = this
		this.Scores.all().then(scores => {
			self._scores = scores
			if (shouldBroadcast) {
				self.Messanger.send('reload')
			}
		})
	}

	scores() {
		let self = this
		let scores = this._scores

		// Filter by search
		if (this.search) {
			scores = this._scores.filter(score => {
				return Object.values(score).some(value => value.toString().includes(self.search))
			})
		}

		// Filter by showDuplicates
		if (this.showDuplicates) {
			scores = this.duplicateScores(scores)

			if (scores.length === 0) {
				this.showDuplicates = false
				scores = this._scores
			}
		}

		// Filter by showErrors
		if (this.showErrors) {
			scores = this.errorScores(scores)

			if (scores.length === 0) {
				this.showErrors = false
				scores = this._scores
			}
		}

		return scores
	}

	duplicateScores(scores) {
		let self = this
		scores = scores || this._scores || []

		return scores.filter(score => {
			return self._scores.some(otherScore => {
				return score !== otherScore
					&& otherScore.teamNumber === score.teamNumber && otherScore.round === score.round
			})
		})
	}

	errorScores(scores) {
		scores = scores || this._scores || []
		var duplicateErrors = this.duplicateScores(scores)

		let self = this

		var _badScores = duplicateErrors.concat(scores.filter(score =>
			typeof score.teamNumber != "number" || score.round == null || (!this._loading && this._teamNumberList.indexOf(score.teamNumber) === -1)
		))


		for (var i = 0; i < _badScores.length; i++) //Removes duplicate error scores.
		{
			for (var j = i + 1; j < _badScores.length; j++) {
				if (_badScores[i] === _badScores[j]) {
					_badScores.splice(j--, 1)
				}
			}
		}

		return _badScores;
	}

}

ScoresController.$$ngIsClass = true
ScoresController.$inject = ['$scope', 'Scores', 'Tournament', 'Messanger']

export default ScoresController
