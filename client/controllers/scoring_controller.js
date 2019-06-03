class ScoringController {
  constructor ($window, $location, $scope, configuration, user, logger) {
    Object.assign(this, { $window, $location, $scope, configuration, logger })
    this.page = this.$location.search()[ScoringController.pageParameter]
    if (!this.page) {
      this.page = user.isAdmin() ? 'scores' : 'scoresheet'
    }
  }

  $onInit () {
    this._initConfiguration()
    this._initEvents()
  }

  _initConfiguration () {
    this.configuration.load()
      .then(config => { this.logoutUrl = config.logoutUrl })
      .catch(error => this.logger.error(error))
  }

  _initEvents () {
    this.$scope.$on('open scoresheet', (event, score) => {
      this.togglePage()
      this.$scope.$broadcast('load', score)
    })

    this.$scope.$on('close scoresheet', (event, options) => {
      if (options.goToScores) {
        this.togglePage()
      }
      this.$scope.$broadcast('reload')
    })

    this.$scope.$on('toggle view', () => {
      this.togglePage()
    })

    this.$scope.$on('open scores with filters', (event, filters) => {
      if (event.targetScope !== this.$scope) {
        this.page = 'scores'
        this.$scope.$broadcast('open scores with filters', filters)
      }
    })

    this.$scope.$on('reinit foundation', () => {
      // Doing this in so-called "animation" in order to bypass the synchronized way that blocks the performance of the page
      setTimeout(() => {
        // this.$window.$('[data-tooltip]:not(.has-tip), [data-dropdown-menu]').foundation()
      })
    })
  }

  togglePage () {
    this.page = this.page === 'scores' ? 'scoresheet' : 'scores'
    this.$location.search(ScoringController.pageParameter, this.page)
    this.$scope.$broadcast(`showing ${this.page}`)
  }
}

ScoringController.pageParameter = 'page'
ScoringController.$$ngIsClass = true
ScoringController.$inject = ['$window', '$location', '$scope', 'Configuration', 'User', 'Logger']

export default ScoringController
