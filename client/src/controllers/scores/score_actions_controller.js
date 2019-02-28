class ScoreActionsController {
  constructor ($scope, $timeout, scores, modals) {
    Object.assign(this, { $scope, $timeout, scores, modals })
  }

  // Actions

  openDeletionDialog () {
    this.modals.open(`#score-${this.type}-${this.data._id} .deletion-modal`)
  }

  closeDeletionDialog () {
    this.modals.close(`#score-${this.type}-${this.data._id} .deletion-modal`)
  }

  delete () {
    this.closeDeletionDialog()
    this.deleting = true
    return this.scores.delete(this.data._id)
      .then(() => this.$scope.$emit('remove score', this.data._id))
  }

  togglePublish () {
    this.togglingPublish = true
    return this.scores.update(this.data._id, { public: !this.data.public })
      .then(() => this.data.load())
      .then(() => {
        this.$timeout(() => { this.togglingPublish = false })
      })
  }

  toggleNoShow () {
    this.togglingNoShow = true
    return this.scores.update(this.data._id, { noShow: !this.data.noShow })
      .then(() => this.data.load())
      .then(() => {
        this.$timeout(() => { this.togglingNoShow = false })
      })
  }

  open () {
    this.$scope.$emit('open scoresheet', this.data)
  }
}

ScoreActionsController.$$ngIsClass = true
ScoreActionsController.$inject = ['$scope', '$timeout', 'Scores', 'Modals']

export default ScoreActionsController
