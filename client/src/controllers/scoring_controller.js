'use strict'

class ScoringController {

  constructor ($scope, Configuration, Notifications, User) {
  	this.$scope = $scope
  	this.Notifications = Notifications
    this.Configuration = Configuration
    this.isAdmin = User.isAdmin()
  }

  $onInit () {
    this._initConfiguration()
    this._initEvents()
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

    this.$scope.$on('close scoresheet', (event, options) => {
      self.$scope.$broadcast('reload')
      if(options.goToScores) {
        self.toggleScoresList()
      }
    })
  }

  toggleScoresList () {
    this.showScoresScreen = !this.showScoresScreen
  }

}

ScoringController.$$ngIsClass = true
ScoringController.$inject = ['$scope', 'Configuration', 'Notifications', 'User']

export default ScoringController
