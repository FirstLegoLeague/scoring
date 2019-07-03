class YesnoObjectiveController {
  constructor ($scope) {
    Object.assign(this, { $scope })
  }

  $onInit () {
    this.$scope.$watch(() => this.data.value, () => {
      if (this.data.value !== undefined) {
        this.data.complete = true
        this.$scope.$emit('objective complete', this.data)
      }
    })
  }
}

YesnoObjectiveController.$$ngIsClass = true
YesnoObjectiveController.$inject = ['$scope']

export default YesnoObjectiveController
