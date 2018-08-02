'use strict'

class ScoresController {

	constructor($scope, Configuration, Scores, Tournament, Messanger) {
		this.$scope = $scope
		this.Configuration = Configuration
		this.Scores = Scores
		this.Tournament = Tournament
		this.Messanger = Messanger
		this.search = ''
		this.showDuplicates = false
		this.showErrors = false
		this._loading = true
		this.match = null
	}

	$onInit() {
		this.load(false)
		// If the reload event comes from within this client, reload and send the message to every other client
		// Otherwise just reload
		this.$scope.$on('reload', () => this.load(true))
		this.$scope.$on('alter', (event, callback) => {
			this._scores = callback(this._scores)
		})
		this.Messanger.on('reload', () => this.load(false), true)
		this.Tournament.teams().then(teams => {
			this._loading = false
			this._teamNumberList = []
			for (var i = 0; i < teams.length; i++) {//Creates list of team numbers.
				this._teamNumberList.push(teams[i].number)
			}
		})
		this.Configuration.load().then(config => {
			this.rankingsLink = config.rankings
		})
	}

	load(shouldBroadcast) {
		this.Scores.load().then(scores => {
			this._scores = scores
			if (shouldBroadcast) {
				this.Messanger.send('reload')
			}
		})
	}

	scores() {
		let scores = this._scores

		// Filter by search
		if (this.search) {
			scores = this._scores.filter(score => {
				return Object.values(score).some(value => value.toString().includes(this.search))
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
					&& otherScore.teamNumber === score.teamNumber && otherScore.match === score.match
			})
		})
	}

	errorScores(scores) {
		scores = scores || this._scores || []
		let duplicateErrors = this.duplicateScores(scores)

		let self = this

		let otherErrors = scores.filter(score =>
			typeof score.teamNumber != "number" || typeof score.teamNumber != "number" ||
			(!this._loading && !this._teamNumberList.includes(score.teamNumber))
		)
		let badScores = duplicateErrors.concat(otherErrors)
		badScores = badScores.filter(function (value, index) { return badScores.indexOf(value) == index })

		return badScores;
	}
}

ScoresController.$$ngIsClass = true
ScoresController.$inject = ['$scope', 'Configuration', 'Scores', 'Tournament', 'Messanger']

export default ScoresController
