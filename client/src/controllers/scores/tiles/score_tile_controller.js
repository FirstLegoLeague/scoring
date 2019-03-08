class ScoreTileController {
  constructor ($scope, scores, tournament) {
    Object.assign(this, { $scope, scores, tournament })
  }

  $onInit () {
    Promise.all([this.data.init(), this.tournament.init()])
      .catch(error => console.log(error))
  }

  save () {
    return this.scores.update(this.data)
      .then(() => this.data.load())
  }
}

ScoreTileController.$$ngIsClass = true
ScoreTileController.$inject = ['$scope', 'Scores', 'Tournament']

export default ScoreTileController
