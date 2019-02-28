class SingleScoreSlotController {
  constructor ($scope, scores) {
    Object.assign(this, { $scope, scores })
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

  save () {
    return this.scores.update(this.data)
      .then(() => this.data.load())
  }
}

SingleScoreSlotController.$$ngIsClass = true
SingleScoreSlotController.$inject = ['$scope', 'Scores']

export default SingleScoreSlotController
