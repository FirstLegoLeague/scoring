class ScoreTileController {
  constructor ($scope, $timeout, scores, tournament, modals) {
    Object.assign(this, { $scope, $timeout, scores, tournament, modals })
  }

  $onInit () {
    this.$scope.$on('reset', (event, id) => {
      if (id === undefined) {
        return this.data.load()
      } else if (id === this.data._id) {
        return this.data.reloadFromServer()
          .then(() => this.data.load())
          .catch(error => {
            if (error.status === 404) {
              this.$scope.$emit('remove score', id)
            }
          })
      }
    })

    this.data.init()
  }

  updateMatch () {
    return this.data.updateMatch()
      .then(() => this.save())
  }

  setMatch () {
    const match = this.data.matches.find(m => m._id === this.data.matchId)
    this.data.stage = match.stage
    this.data.round = match.round
    return this.save()
  }

  save () {
    const match = this.data.matches.find(m => m.stage === this.data.stage && m.round === this.data.round)
    const updateData = {
      score: this.data.score,
      teamNumber: this.data.teamNumber,
      stage: match.stage,
      round: match.round,
      matchId: match._id,
      tableId: this.data.tableId,
      referee: this.data.referee,
      noShow: this.data.noShow && this.score === 0
    }

    return this.scores.update(this.data._id, updateData)
      .then(() => this.data.load())
  }
}

ScoreTileController.$$ngIsClass = true
ScoreTileController.$inject = ['$scope', '$timeout', 'Scores', 'Tournament', 'Modals']

export default ScoreTileController
