class ScoreTileController {
  constructor ($scope, scores, tournament, logger) {
    Object.assign(this, { $scope, scores, tournament, logger })
  }

  $onInit () {
    this.$scope.$watch(() => this.inview, () => {
      if (this.inview && !this.init) {
        this.init = true
        Promise.all([this.data.init(), this.tournament.init()])
          .catch(error => this.logger.error(error))
      }
    })
  }

  save () {
    return this.scores.update(this.data)
      .then(() => this.data.load())
  }
}

ScoreTileController.$$ngIsClass = true
ScoreTileController.$inject = ['$scope', 'Scores', 'Tournament', 'Logger']

export default ScoreTileController
