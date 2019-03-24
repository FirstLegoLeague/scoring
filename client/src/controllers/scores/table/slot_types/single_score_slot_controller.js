class SingleScoreSlotController {
  constructor ($scope, scores, tournament) {
    Object.assign(this, { $scope, scores, tournament })
  }

  $onInit () {
    this.score = this.data[0]
    this.score.init()

    return this.tournament.loadTables()
  }

  save () {
    return this.scores.update(this.score)
      .then(() => this.score.load())
  }
}

SingleScoreSlotController.$$ngIsClass = true
SingleScoreSlotController.$inject = ['$scope', 'Scores', 'Tournament']

export default SingleScoreSlotController
