class NumberObjectiveController {
  constructor ($scope) {
    Object.assign(this, { $scope })
  }

  $onInit () {
    this.$scope.$watch(() => this.data.value, () => {
      if (this.data.value !== undefined) {
        this.limitValueToRange()
        this.data.complete = true
        this.$scope.$emit('objective complete', this.data)
      }
    })
  }

  limitValueToRange () {
    if (this.data.value > this.data.max) {
      this.data.value = this.data.max
    } else if (this.data.value < this.data.min) {
      this.data.value = this.data.min
    }
  }
}

NumberObjectiveController.$$ngIsClass = true
NumberObjectiveController.$inject = ['$scope']

export default NumberObjectiveController
