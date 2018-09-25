class ScoringController {
  constructor ($scope, Configuration, User) {
    Object.assign(this, { $scope, Configuration })
    this.isAdmin = User.isAdmin()
  }

  $onInit () {
    this._initConfiguration()
    this._initEvents()
  }

  _initConfiguration () {
    this.Configuration.load()
      .then(config => { this.logoutUrl = config.logoutUrl })
      .catch(err => console.log(err))
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
ScoringController.$inject = ['$scope', 'Configuration', 'User']

export default ScoringController
