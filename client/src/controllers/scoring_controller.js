class ScoringController {
  constructor ($scope, configuration, user, logger) {
    Object.assign(this, { $scope, configuration, logger })
    this.isAdmin = user.isAdmin()
  }

  $onInit () {
    this._initConfiguration()
    this._initEvents()
  }

  _initConfiguration () {
    this.configuration.load()
      .then(config => { this.logoutUrl = config.logoutUrl })
      .catch(err => this.logger.error(err))
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
