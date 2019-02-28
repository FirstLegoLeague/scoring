class ConflictScoreController {
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

  openDeletionDialog () {
    this.modals.open(`#score-${this.data._id} .deletion-modal`)
  }

  closeDeletionDialog () {
    this.modals.close(`#score-${this.data._id} .deletion-modal`)
  }

  delete () {
    this.closeDeletionDialog()
    this.deleting = true
    return this.scores.delete(this.data._id)
      .then(() => this.$scope.$parent.$apply())
  }

  togglePublish () {
    this.togglingPublish = true
    return this.scores.update(this.data._id, { public: !this.data.public })
      .then(() => this.data.load())
      .then(() => {
        this.$timeout(() => { this.togglingPublish = false })
      })
  }
}

ConflictScoreController.$$ngIsClass = true
ConflictScoreController.$inject = ['$scope', '$timeout', 'Scores', 'Tournament', 'Modals']

export default ConflictScoreController
