class ScoringController {
  constructor ($window, $document, $location, $scope, configuration, user, logger) {
    Object.assign(this, { $window, $document, $location, $scope, configuration, logger })
    this.isAdmin = user.isAdmin()
    this.showScoresScreen = this.$location.search()[ScoringController.showScoresScreen] === true
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
      this.showScoresScreen = false
      this.$scope.$broadcast('load', score)
    })

    this.$scope.$on('close scoresheet', (event, options) => {
      if (options.goToScores) {
        this.showScoresScreen = true
      }
      this.$scope.$broadcast('reload')
    })

    this.$scope.$on('reinit foundation', () => {
      // Doing this in so-called "animation" in order to bypass the synchronized way that blocks the performance of the page
      setTimeout(() => {
        this.$window.$('[data-tooltip]:not(.has-tip)').foundation()
      })
    })
  }

  toggleScoresList () {
    this.showScoresScreen = !this.showScoresScreen
    this.$location.search(ScoringController.showScoresScreen, this.showScoresScreen)
    this.$scope.$broadcast('toggle scores screen')
  }

  title () {
    return this.showScoresScreen ? 'scores' : 'scoresheet'
  }
}

ScoringController.showScoresScreen = 'showScores'
ScoringController.$$ngIsClass = true
ScoringController.$inject = ['$window', '$document', '$location', '$scope', 'Configuration', 'User', 'Logger']

export default ScoringController
