class ScoreActionsController {
  constructor ($scope, $element, $timeout, scores, modals) {
    Object.assign(this, { $scope, $element, $timeout, scores, modals })
  }

  $onInit () {
    this.$scope.$on('exit move mode', () => {
      this.moveMode = false
    })
  }

  // Actions

  toggleMoveMode () {
    this.moveMode = !this.moveMode
    this.$scope.$emit(`${this.moveMode ? 'enter' : 'exit'} move mode`, { id: this.data._id, status: null })
  }

  openDeletionDialog () {
    this.modals.open(this._deletionModal())
  }

  closeDeletionDialog () {
    this.modals.close(this._deletionModal())
  }

  delete () {
    this.closeDeletionDialog()
    this.deleting = true
    return this.scores.delete(this.data._id)
  }

  togglePublish () {
    this.togglingPublish = true
    this.data.public = !this.data.public
    return this.save()
      .then(() => {
        this.$timeout(() => { this.togglingPublish = false })
      })
  }

  toggleNoShow () {
    this.togglingNoShow = true
    this.data.noShow = !this.data.noShow
    return this.save()
      .then(() => {
        this.$timeout(() => { this.togglingNoShow = false })
      })
  }

  open () {
    this.$scope.$emit('open scoresheet', this.data)
  }

  save () {
    return this.scores.update(this.data)
      .then(() => this.data.load())
  }

  _deletionModal () {
    if (!this._deletionModalSymbol) {
      // children is not an array... :(
      const children = this.$element.children()
      for (let i = 0; i < children.length; i++) {
        if (children[i].classList.contains('deletion-modal')) {
          this._deletionModalSymbol = children[i]
          break
        }
      }
    }
    return this._deletionModalSymbol
  }
}

ScoreActionsController.$$ngIsClass = true
ScoreActionsController.$inject = ['$scope', '$element', '$timeout', 'Scores', 'Modals']

export default ScoreActionsController
