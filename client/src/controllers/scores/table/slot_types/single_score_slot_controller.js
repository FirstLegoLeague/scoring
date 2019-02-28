class SingleScoreSlotController {
  constructor ($scope, scores) {
    Object.assign(this, { $scope, scores })
  }

  $onInit () {
    this.score = this.data[0]
    this.score.init()

    this.$scope.$on('enter move mode', (event, { id }) => {
      this.dimmed = (id !== this.score._id)
    })

    this.$scope.$on('exit move mode', (event, { status }) => {
      if (status === 'success' && !this.dimmed) {
        this.data = []
      }
      this.dimmed = false
    })
  }

  save () {
    return this.scores.update(this.score)
      .then(() => this.score.load())
  }
}

SingleScoreSlotController.$$ngIsClass = true
SingleScoreSlotController.$inject = ['$scope', 'Scores']

export default SingleScoreSlotController
