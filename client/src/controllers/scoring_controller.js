'use strict'

class ScoringController {

  constructor ($scope, Configuration, Tournament, Notifications, User, Messanger) {
  	this.$scope = $scope
    this.Configuration = Configuration
    this.Tournament = Tournament
  	this.Notifications = Notifications
    this.Messanger = Messanger
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

    this.Messanger.on('teams:reload', () => {
      this.Tournament.teams(true).then(() => {
        this.$scope.$broadcast('reload teams')
      })
    })


  }

  toggleScoresList () {
    this.showScoresScreen = !this.showScoresScreen
  }

}

ScoringController.$$ngIsClass = true
ScoringController.$inject = ['$scope', 'Configuration', 'Tournament', 'Notifications', 'User', 'Messanger']

export default ScoringController
