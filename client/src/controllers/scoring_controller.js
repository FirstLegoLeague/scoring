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

    this.$scope.$on('open scoresheet', (event, score) => {
      self.$scope.$broadcast('load', score)
      self.toggleScoresList()
    })

    this.$scope.$on('close scoresheet', (event, score) => {
      self.$scope.$broadcast('reload')
      self.toggleScoresList()
    })
  }

  toggleScoresList () {
    this.showScoresScreen = !this.showScoresScreen
  }


}

ScoringController.$inject = ['$scope', 'Notifications']

export default ScoringController
