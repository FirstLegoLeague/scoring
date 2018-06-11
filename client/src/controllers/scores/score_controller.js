'use strict'

class ScoreController {

	constructor ($scope, Scores) {
		this.$scope = $scope
		this.Scores = Scores
	}

	delete () {
		let self = this
		self.deleting = true
		this.Scores.delete(this.data._id)
			.then(() => {
				self.$scope.$emit('reload')
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
		})
	}

}

ScoreController.$inject = ['$scope', 'Scores']

export default ScoreController
