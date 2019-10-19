class SettingController {
  constructor ($scope) {
    Object.assign(this, { $scope })
  }

  $onInit () {
    this.$scope.$watch(() => this.data.value, () => {

    })
  }
}

SettingController.$$ngIsClass = true
SettingController.$inject = ['$scope']

export default SettingController
