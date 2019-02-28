class ScoreActionsController {
  constructor ($scope, $element, $timeout, scores, modals) {
    Object.assign(this, { $scope, $element, $timeout, scores, modals })
  }

  // Actions

  move (position) {

  }

  openDeletionDialog () {
    this.modals.open(this.$element.find('.deletion-modal'))
  }

  closeDeletionDialog () {
    this.modals.close(this.$element.find('.deletion-modal'))
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

  toggleNoShow () {
    this.togglingNoShow = true
    this.data.noShow = !this.data.noShow
    return this.scores.update(this.data)
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
ScoreActionsController.$inject = ['$scope', '$element', '$timeout', 'Scores', 'Modals']

export default ScoreActionsController
