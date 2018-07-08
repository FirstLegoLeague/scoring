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
		this.Tournament.teams().then(teams => {
			this._teamNumberList = []
			for (var i = 0; i < teams.length; i++) {//Creates list of team numbers.
				this._teamNumberList.push(teams[i].number)
			}
		})
		self.Tournament.teams_rounds().then(rounds => {
			this.teamRoundList = rounds
		})

		this._loading = false
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
		let duplicateErrors = this.duplicateScores(scores)

		let self = this


		let otherErrors = scores.filter(score =>
			typeof score.teamNumber != "number" || score.round == null ||
			(!this._loading && !this._teamNumberList.includes(score.teamNumber))
		)
		let badScores = duplicateErrors.concat(otherErrors)
		badScores = badScores.filter(function (value, index) { return badScores.indexOf(value) == index })

		return badScores;
	}

	teamIsSelected() {
		return !this._loading && this._teamNumberList && this._teamNumberList.indexOf(parseInt(this.search)) > -1
	}

	selectedTeamRounds() {
		/*if (this.teamIsSelected()) {
			console.log(this.teamRoundList)
			for (var i = 0; i < this.teamRoundList.length; i++) {
				console.log(this._teamNumberList)
				if (this.teamRoundList[i].number == parseInt(this.search)) {
					return this.teamRoundList[i].rounds
				}
			}
		}*/

		return [];
	}

}

ScoresController.$$ngIsClass = true
ScoresController.$inject = ['$scope', 'Scores', 'Tournament', 'Messanger']

export default ScoresController
