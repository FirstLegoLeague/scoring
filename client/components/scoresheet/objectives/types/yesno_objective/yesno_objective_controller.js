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

    this.$scope.$on('set objective default', () => this.setDefault())
  }

  setDefault () {
    if (!this.data.value && this.data.default) {
      this.data.value = this.data.default
    }
  }
}

YesnoObjectiveController.$$ngIsClass = true
YesnoObjectiveController.$inject = ['$scope']

export default YesnoObjectiveController
