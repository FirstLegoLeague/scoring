'use strict'

class ScoresController {

	constructor ($scope, Scores, Messanger) {
		this.$scope = $scope
		this.Scores = Scores
		this.Messanger = Messanger
		this.search = ''
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
			self._scores = scores
			if(shouldBroadcast) {
				self.Messanger.send('reload')
			}
		})
	}

	scores () {
		let self = this
		if(!this.search) {
			return this._scores
		}
		return this._scores.filter(score => {
			return Object.values(score).some(value => value.toString().includes(self.search))
		})
	}

}

ScoresController.$inject = ['$scope', 'Scores', 'Messanger']

export default ScoresController
