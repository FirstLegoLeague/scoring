class ScoringController {
  constructor ($scope, Configuration, User, Logger) {
    Object.assign(this, { $scope, Configuration, Logger })
    this.isAdmin = User.isAdmin()
  }

  $onInit () {
    this._initConfiguration()
    this._initEvents()
  }

  _initConfiguration () {
    this.Configuration.load()
      .then(config => { this.logoutUrl = config.logoutUrl })
      .catch(err => this.Logger.error(err))
  }

  _initEvents () {
    this.$scope.$on('open scoresheet', (event, score) => {
      this.$scope.$broadcast('load', score)
      this.showScoresScreen = false
    })

    this.$scope.$on('close scoresheet', (event, options) => {
      this.$scope.$broadcast('reload')
      if (options.goToScores) {
        this.showScoresScreen = true
      }
    })
  }

  toggleScoresList () {
    this.showScoresScreen = !this.showScoresScreen
  }
}

ScoringController.$$ngIsClass = true
ScoringController.$inject = ['$scope', 'Configuration', 'User', 'Logger']

export default ScoringController
