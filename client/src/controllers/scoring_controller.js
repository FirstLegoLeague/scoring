class ScoringController {
  constructor ($window, $document, $location, $scope, configuration, user, logger) {
    Object.assign(this, { $window, $document, $location, $scope, configuration, logger })
    this.showScoresheet = this.$location.search()[ScoringController.showScoresheetParameter] === true || !user.isAdmin()
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
      this.toggleScoresList()
      this.$scope.$broadcast('load', score)
    })

    this.$scope.$on('close scoresheet', (event, options) => {
      if (options.goToScores) {
        this.toggleScoresList()
      }
      this.$scope.$broadcast('reload')
    })

    this.$scope.$on('toggle view', () => {
      this.toggleScoresList()
    })

    this.$scope.$on('reinit foundation', () => {
      // Doing this in so-called "animation" in order to bypass the synchronized way that blocks the performance of the page
      setTimeout(() => {
        this.$window.$('[data-tooltip]:not(.has-tip)').foundation()
      })
    })
  }

  toggleScoresList () {
    this.showScoresheet = !this.showScoresheet
    this.$location.search(ScoringController.showScoresheetParameter, this.showScoresheet)
    this.$scope.$broadcast('toggle scores screen')
  }

  title () {
    return this.showScoresheet ? 'scoresheet' : 'scores'
  }
}

ScoringController.showScoresheetParameter = 'showScoresheet'
ScoringController.$$ngIsClass = true
ScoringController.$inject = ['$window', '$document', '$location', '$scope', 'Configuration', 'User', 'Logger']

export default ScoringController
