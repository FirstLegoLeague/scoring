class SettingController {
  constructor ($scope) {
    Object.assign(this, { $scope })
  }

  $onInit () {
    this.$scope.$watch('setting.data.value', (newVal, oldVal, scope) => {
    })
  }
}

SettingController.$$ngIsClass = true
SettingController.$inject = ['$scope']

export default SettingController
