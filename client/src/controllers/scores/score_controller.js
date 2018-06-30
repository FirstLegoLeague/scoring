'use strict'

class ScoreController {

	constructor($scope, Scores, Tournament, Modals, Notifications) {
		this.$scope = $scope
		this.Scores = Scores
		this.Tournament = Tournament
		this.Notifications = Notifications
		this.Modals = Modals
		this.loading = true
	}

	$onInit() {
		let self = this

		Promise.all([this.Tournament.teams(), this.Tournament.tables()])
			.then(responses => {
				self.loading = false
				self.teams = responses[0]
				self.tables = responses[1]

				this._teamNumberList = []
				for (var i = 0; i < responses[0].length; i++)//Creates list of team numbers.
				{
					this._teamNumberList.push(responses[0][i].number)
				}
			})
	}

	// Views

	teamText() {
		if (this.data.teamNumber && this.teams) {
			let self = this
			return this.teams.find(team => team.number === self.data.teamNumber).displayText
		} else {
			return 'Missing team'
		}
	}

	tableText() {
		if (this.data.tableId && this.tables) {
			let self = this
			return this.tables.find(table => table.tableId === self.data.tableId).tableName
		} else {
			return 'no table'
		}
	}

	// Actions

	openDeletionDialog() {
		this.Modals.open(`#score-${this.data._id} .deletion-modal`)
	}

	closeDeletionDialog() {
		this.Modals.close(`#score-${this.data._id} .deletion-modal`)
	}

	delete() {
		let self = this
		this.closeDeletionDialog()
		this.deleting = true
		this.Scores.delete(this.data._id)
			.then(() => {
				self.$scope.$emit('reload')
			}).catch(() => {
				self.Notifications.error('Unable to delete score: Possible network error.')
				self.deleting = false
			})
	}

	togglePublish() {
		let self = this
		self.togglingPublish = true
		this.Scores.update(this.data._id, { public: !this.data.public })
			.then(() => {
				self.$scope.$emit('reload')
				self.togglingPublish = false
			})
	}

	open() {
		this.$scope.$emit('open scoresheet', this.data)
	}

	save() {
		let self = this
		let updateData = {
			score: this.data.score,
			teamNumber: this.data.teamNumber,
			round: this.data.round,
			tableId: this.data.tableId,
			referee: this.data.referee
		}

		this.Scores.update(this.data._id, updateData)
			.then(() => {
				self.$scope.$emit('reload')
			}).catch(() => {
				self.Notifications.error('Unable to update score: Possible network error.')
			})
	}

	teamRoundError() {
		let self = this

		if (!this.loading && this.data.round == null) {
			return true
		}
		return false
	}

	teamNumberError() {
		let self = this

		if (!this.loading && typeof self.data.teamNumber != "number") {
			return true
		}
		return false
	}
}

ScoreController.$$ngIsClass = true
ScoreController.$inject = ['$scope', 'Scores', 'Tournament', 'Modals', 'Notifications']

export default ScoreController
