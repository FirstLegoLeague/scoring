'use strict'

class ScoresController {

	constructor ($scope, Scores) {
		this.Scores = Scores
		this.$scope = $scope
	}

	$onInit () {
		let self = this
		this.load()
		this.$scope.$on('reload', () => self.load())
	}

	load () {
		let self = this
		this.Scores.all().then(scores => {
			self.scores = scores
		})
	}

}

ScoresController.$inject = ['$scope', 'Scores']

export default ScoresController
