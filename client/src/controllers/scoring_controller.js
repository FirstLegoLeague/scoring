'use strict'

class ScoringController {

  constructor ($scope, Notifications) {
  	this.$scope = $scope
  	this.Notifications = Notifications
  }

  $onInit () {
  	let self = this
  	this.$scope.$on('notify', (event, options) => {
  		self.Notifications.notify(options.level, options.message)
  	})
  }

  toggleScoresList () {
    this.showScoresScreen = !this.showScoresScreen
  }


}

ScoringController.$inject = ['$scope', 'Notifications']

export default ScoringController
