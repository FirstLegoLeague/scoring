'use strict'

class ScoringController {

  constructor ($scope, Configuration, Notifications) {
  	this.$scope = $scope
  	this.Notifications = Notifications
    this.Configuration = Configuration
  }

  $onInit () {
    this._initConfiguration()
    this._initEventListeners()
  }

  _initConfiguration () {
    let self = this

    this.Configuration.load().then(config => {
      self.logoutUrl = config.logout
    })
  }

  _initEvents () {
    let self = this
    
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

ScoringController.$inject = ['$scope', 'Configuration', 'Notifications']

export default ScoringController
