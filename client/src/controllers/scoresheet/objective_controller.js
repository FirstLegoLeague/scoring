class ObjectiveController {
  constructor ($scope) {
    Object.assign(this, { $scope })
  }

  $onInit () {
    this.$scope.$watch(() => this.data.value, () => {
      this.data.complete = true
      this.$scope.$emit('objective complete', this.data)
    })

    this.$scope.$on('set default', () => this.setDefault())
  }

  setDefault () {
    if (!this.data.value) {
      this.data.value = this.data.default
    }
  }
}

ObjectiveController.$$ngIsClass = true
ObjectiveController.$inject = ['$scope']

export default ObjectiveController
