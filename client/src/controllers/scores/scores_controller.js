'use strict'

class ScoresController {

	constructor ($scope, Scores, Messanger) {
		this.$scope = $scope
		this.Scores = Scores
		this.Messanger = Messanger
	}

	$onInit () {
		let self = this
		this.load(false)
		// If the reload event comes from within this client, reload and send the message to every other client
		// Otherwise just reload
		this.$scope.$on('reload', () => self.load(true))
		this.Messanger.on('reload', () => self.load(false), true)
	}

	load (shouldBroadcast) {
		let self = this
		this.Scores.all().then(scores => {
			self.scores = scores
			if(shouldBroadcast) {
				self.Messanger.send('reload')
			}
		})
	}

}

ScoresController.$inject = ['$scope', 'Scores', 'Messanger']

export default ScoresController
