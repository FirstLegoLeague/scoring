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
	}

	$onInit() {
		Promise.all([this.Tournament.teams(), this.Tournament.tables(), this.Tournament.teamsMatches(this.data.teamNumber)])
			.then(responses => {
				this.loading = false
				this.teams = responses[0]
				this.tables = responses[1]
				this._matches = responses[2]
			})
	}

	// Views

	teamText () {
		if (this.data.teamNumber && this.teams) {
			return this.teams.find(team => team.number === this.data.teamNumber).displayText
		} else {
			return 'Missing team!'
		}
	}

	tableText () {
		if (this.data.tableId && this.tables) {
			return this.tables.find(table => table.tableId === this.data.tableId).tableName
		} else {
			return 'no table'
		}
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

	isCorrectMatchList() {
		return this._matches && this._matches.some(match => {
			return match.match === this.data.match
		})
	}

	save() {
		this.loading = true

		this.Tournament.teamsMatches(this.data.teamNumber).then(response => {
			this._matches = response
		}).then(() => {
			if (!this.isCorrectMatchList()) {
				this.data.match = null
			}
		})

		let updateData = {
			score: this.data.score,
			teamNumber: this.data.teamNumber,
			match: this.data.match,
			tableId: this.data.tableId,
			referee: this.data.referee
		}

		this.Scores.update(this.data._id, updateData)
			.then(() => {
				Object.assign(this.data, updateData)
				setTimeout(() => this.loading = false, MIN_LOADING_TIME)
			}).catch(() => {
				this.Notifications.error('Unable to update score: Possible network error.')
			})
	}

	teamMatches () {
		return this._matches || []
	}

	matchText () {
		if (this.matchError()) {
			return 'Missing match'
		} else {
			return this.data.match
		}
	}

	matchError () {
		if (!this._loading && (this.data.match == null || !this.isCorrectMatchList())) {
			this.data.match = null
			return true
		} else {
			return false
		}
	}

	teamNumberError() {
		return !this.loading && typeof this.data.teamNumber != 'number'
	}
}

ScoreController.$$ngIsClass = true
ScoreController.$inject = ['$scope', 'Scores', 'Tournament', 'Modals', 'Notifications']

export default ScoreController
