'use strict'

const MIN_LOADING_TIME = 50

class ScoreController {

	constructor ($scope, Scores, Tournament, Modals, Notifications) {
		this.$scope = $scope
		this.Scores = Scores
		this.Tournament = Tournament
		this.Notifications = Notifications
		this.Modals = Modals
		this.loading = true
		this.isSelected = false
		this.matched = []
	}

	$onInit() {
		Promise.all([this.Tournament.teams(), this.Tournament.tables(), this.Tournament.teamsMatches(this.data.teamNumber)])
			.then(responses => {
				this.loading = false
				this.teams = responses[0]
				this.tables = responses[1]
				this.matches = responses[2]
			})
	}

	// Views

	teamText () {
		if(this.loading) {
			return ''
		} else if (this.teamNumberError()) {
			return 'Missing team!'
		} else {
			return this.teams.find(team => team.number === this.data.teamNumber).displayText
		}
	}

	matchText () {
		if(this.loading) {
			return ''
		} else if (this.matchError()) {
			return 'Missing match'
		} else {
			return this.data.match
		}
	}

	tableText () {
		if (this.data.tableId && this.tables) {
			return this.tables.find(table => table.tableId === this.data.tableId).tableName
		} else {
			return 'no table'
		}
	}

	matchError () {
		return !this.loading && (!this.data.match || !this.isCorrectMatchList())
	}

	teamNumberError() {
		return !this.loading && (!this.data.teamNumber || !this.teams)
	}

	isCorrectMatchList() {
		return this.matches && this.matches.some(match => match.displayText === this.data.match)
	}

	// Actions

	openDeletionDialog () {
		this.Modals.open(`#score-${this.data._id} .deletion-modal`)
	}

	closeDeletionDialog () {
		this.Modals.close(`#score-${this.data._id} .deletion-modal`)
	}

	delete() {
		this.closeDeletionDialog()
		this.deleting = true
		this.Scores.delete(this.data._id)
			.then(() => {
				this.$scope.$emit('alter', scores => scores.filter(score => score._id !== this.data._id))
			}).catch(() => {
				this.Notifications.error('Unable to delete score: Possible network error.')
				this.deleting = false
			})
	}

	togglePublish() {
		this.togglingPublish = true
		this.Scores.update(this.data._id, { public: !this.data.public })
			.then(() => {
				this.data.public = !this.data.public
				setTimeout(() => this.togglingPublish = false, MIN_LOADING_TIME)
			})
	}

	open () {
		this.$scope.$emit('open scoresheet', this.data)
	}

	save() {
		this.loading = true

		let updateData = {
			score: this.data.score,
			teamNumber: this.data.teamNumber,
			match: this.data.match,
			tableId: this.data.tableId,
			referee: this.data.referee
		}

		this.Scores.update(this.data._id, updateData)
			.then(() => Object.assign(this.data, updateData))
			.catch(() => this.Notifications.error('Unable to update score: Possible network error.'))
			.then(() => this.Tournament.teamsMatches(this.data.teamNumber))
			.then(matches => this.matches = matches)
			.then(() => setTimeout(() => this.loading = false, MIN_LOADING_TIME))
	}
}

ScoreController.$$ngIsClass = true
ScoreController.$inject = ['$scope', 'Scores', 'Tournament', 'Modals', 'Notifications']

export default ScoreController
