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

}

ScoreController.$inject = ['$scope', 'Scores']

export default ScoreController
