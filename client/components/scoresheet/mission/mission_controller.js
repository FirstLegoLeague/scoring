class MissionController {
  constructor ($scope) {
    this.$scope = $scope
  }

  $onInit () {
    this.$scope.$on('objective complete', () => {
      this.data.process()
      if (this.data.complete) {
        this.$scope.$emit('mission complete')
      }
    })
  }
}

MissionController.$$ngIsClass = true
MissionController.$inject = ['$scope']

export default MissionController
