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
  }
}

ConflictSlotController.$$ngIsClass = true
ConflictSlotController.$inject = ['$scope']

export default ConflictSlotController
