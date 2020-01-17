class SettingController {
  constructor ($scope) {
    Object.assign(this, { $scope })
  }

  $onInit () {
  }
}

SettingController.$$ngIsClass = true
SettingController.$inject = ['$scope']

export default SettingController
