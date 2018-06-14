'use strict'

class ScoreController {

	constructor ($scope, Scores, Modals, Notifications) {
		this.$scope = $scope
		this.Scores = Scores
		this.Notifications = Notifications
		this.Modals = Modals
	}

	openDeletionDialog () {
		this.Modals.open(`#score-${this.data._id} .deletion-modal`)
	}

	closeDeletionDialog () {
		this.Modals.close(`#score-${this.data._id} .deletion-modal`)
	}

	delete () {
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

	togglePublish () {
		let self = this
		self.togglingPublish = true
		this.Scores.update(this.data._id, { public: !this.data.public })
			.then(() => {
				self.$scope.$emit('reload')
				self.togglingPublish = false
			})
	}

	open () {
		this.$scope.$emit('open scoresheet', this.data)
	}

	save () {
		let self = this
		let updateData = {
			score: this.data.score,
			team: this.data.team,
			round: this.data.round,
			table: this.data.table,
			referee: this.data.referee
		}

		this.Scores.update(this.data._id, updateData)
		.then(() => {
			self.$scope.$emit('reload')
		}).catch(() => {
			self.Notifications.error('Unable to update score: Possible network error.')
		})
	}

}

ScoreController.$inject = ['$scope', 'Scores', 'Modals', 'Notifications']

export default ScoreController
