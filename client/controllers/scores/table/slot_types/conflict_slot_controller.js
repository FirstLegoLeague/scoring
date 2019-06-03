class ConflictSlotController {
  constructor ($scope) {
    Object.assign(this, { $scope })
  }

  $onInit () {
    this.data.forEach(score => score.init())
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
