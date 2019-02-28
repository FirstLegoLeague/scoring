class ConflictScoreController {
  constructor ($scope, $timeout, scores, modals) {
    Object.assign(this, { $scope, $timeout, scores, modals })
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
    this.modals.open(`#conflict-score-${this.data._id} .deletion-modal`)
  }

  closeDeletionDialog () {
    this.modals.close(`#conflict-score-${this.data._id} .deletion-modal`)
  }

  delete () {
    this.closeDeletionDialog()
    this.deleting = true
    return this.scores.delete(this.data._id)
      .then(() => this.$scope.$emit('remove score', this.data._id))
  }

  togglePublish () {
    this.togglingPublish = true
    this.data.public = !this.data.public
    return this.scores.update(this.data)
      .then(() => this.data.load())
      .then(() => {
        this.$timeout(() => { this.togglingPublish = false })
      })
  }
}

ConflictScoreController.$$ngIsClass = true
ConflictScoreController.$inject = ['$scope', '$timeout', 'Scores', 'Modals']

export default ConflictScoreController
