class ScoreActionsController {
  constructor ($scope, $timeout, scores, tournament, modals) {
    Object.assign(this, { $scope, $timeout, scores, tournament, modals })
  }

  // Actions

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
ScoreActionsController.$inject = ['$scope', '$timeout', 'Scores', 'Tournament', 'Modals']

export default ScoreActionsController
