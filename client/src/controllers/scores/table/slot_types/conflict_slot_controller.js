class ConflictSlotController {
  constructor ($scope) {
    Object.assign(this, { $scope })
  }

  $onInit () {
    this.$scope.$on('enter move mode', (event, { id }) => {
      this.dimmed = id
    })

    this.$scope.$on('exit move mode', (event, { status }) => {
      if (status === 'success' && this.data.some(score => score._id === this.dimmed)) {
        this.data = this.data.filter(score => score._id !== this.dimmed)
      }
      this.dimmed = false
    })

    this.data.map(score => score.init())
  }

  openConflictedScoresList () {
    this.$scope.$emit('open scores with filters', {
      teams: [this.data[0].teamNumber],
      rounds: [{ stage: this.data[0].stage, round: this.data[0].round }],
      referees: [],
      tables: [],
      showDuplicates: true,
      showErrors: false,
      showPublic: 0
    })
  }
}

ConflictSlotController.$$ngIsClass = true
ConflictSlotController.$inject = ['$scope']

export default ConflictSlotController
