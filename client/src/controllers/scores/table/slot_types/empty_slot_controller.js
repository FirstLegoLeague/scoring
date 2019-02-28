class EmptySlotController {
  constructor ($scope, scores) {
    Object.assign(this, { $scope, scores })
  }

  $onInit () {
    this.$scope.$on('enter move mode', (event, { id }) => {
      this.moveMode = true
      this._id = id
    })

    this.$scope.$on('exit move mode', () => {
      this.moveMode = false
      this._id = undefined
    })
  }

  moveScoreHere () {
    const score = this.scores.scores.find(s => s._id === this._id)
    score.stage = this.position.stage
    score.round = this.position.round
    score.teamNumber = this.position.team.number
    return this.scores.update(score)
      .then(() => score.load())
      .then(() => this.data.push(score))
      .then(() => this.$scope.$emit('exit move mode', { status: 'success' }))
  }
}

EmptySlotController.$$ngIsClass = true
EmptySlotController.$inject = ['$scope', 'Scores']

export default EmptySlotController
