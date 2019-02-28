class ConflictScoreController {
  constructor ($scope, $timeout, scores, modals) {
    Object.assign(this, { $scope, $timeout, scores, modals })
  }

  $onInit () {
    this.data.init()
  }
}

ConflictScoreController.$$ngIsClass = true
ConflictScoreController.$inject = ['$scope', '$timeout', 'Scores', 'Modals']

export default ConflictScoreController
