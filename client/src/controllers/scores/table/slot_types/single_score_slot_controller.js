class SingleScoreSlotController {
  constructor ($scope, $timeout, scores, tournament, modals) {
    Object.assign(this, { $scope, $timeout, scores, tournament, modals })
  }

  $onInit () {
    this.$scope.$on('reset', (event, id) => {
      if (id === undefined) {
        return this.data.load()
      } else if (id === this.data._id) {
        return this.data.reloadFromServer()
          .then(() => this.data.load())
          .catch(error => {
            if (error.status === 404) {
              this.$scope.$emit('remove score', id)
            }
          })
      }
    })

    this.data.init()
  }

}

SingleScoreSlotController.$$ngIsClass = true
SingleScoreSlotController.$inject = ['$scope', '$timeout', 'Scores', 'Tournament', 'Modals']

export default SingleScoreSlotController
