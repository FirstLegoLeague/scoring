'use strict'

class ScoringController {

  constructor ($window, $scope, Configuration, Tournament, Notifications, User, Messanger) {
  	this.$ = $window.$
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
    this._initHamburgerTooltip()
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

  _initHamburgerTooltip () {
    setTimeout(() => {
      this.$hamburger = this.$('[data-hamburger]')
      this.hamburgerTooltip = new Foundation.Tooltip(this.$hamburger, { tipText: this._hamburgerTooltipText() })
    })
  }

  _hamburgerTooltipText () {
    return this.showScoresScreen ? 'Close Scores list' : 'Open Scores list'
  }

  toggleScoresList () {
    this.showScoresScreen = !this.showScoresScreen

    this.hamburgerTooltip._destroy()
    this.hamburgerTooltip = new Foundation.Tooltip(this.$hamburger, { tipText: this._hamburgerTooltipText() })
  }

}

ScoringController.$$ngIsClass = true
ScoringController.$inject = ['$window', '$scope', 'Configuration', 'Tournament', 'Notifications', 'User', 'Messanger']

export default ScoringController
