class SlotController {
  constructor ($scope) {
    Object.assign(this, { $scope })
  }

  $onInit () {
    this.$scope.$on('remove score', (event, id) => {
      this.data = this.data.filter(score => score._id !== id)
    })
  }
}

SlotController.$$ngIsClass = true
SlotController.$inject = ['$scope']

export default SlotController
