class ScoreActionsController {
  constructor ($scope, $element, $timeout, scores, modals, notifications, logger, scoreMove) {
    Object.assign(this, { $scope, $element, $timeout, scores, modals, notifications, logger, scoreMove })
  }

  // Actions

  toggleMoveMode () {
    this.scoreMove.toggle(this.data._id)
  }

  openDeletionDialog () {
    this.modals.open(this._deletionModal())
  }

  closeDeletionDialog () {
    this.modals.close(this._deletionModal())
  }

  delete () {
    this.closeDeletionDialog()
    return this.scores.delete(this.data._id)
      .catch(error => {
        this.logger.error(error)
        this.notifications.error('Failed deleting score')
      })
  }

  togglePublish () {
    return this.save({ public: !this.data.public })
      .catch(error => {
        this.logger.error(error)
        this.notifications.error('Failed toggling publication')
      })
  }

  toggleNoShow () {
    return this.save({ noShow: !this.data.noShow })
      .catch(error => {
        this.logger.error(error)
        this.notifications.error('Failed toggling No-Show')
      })
  }

  open () {
    this.$scope.$emit('open scoresheet', this.data)
  }

  save (updated_attr = {}) {
    return this.scores.update(Object.assign({}, this.data, updated_attr))
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
ScoreActionsController.$inject = ['$scope', '$element', '$timeout', 'Scores', 'Modals', 'Notifications', 'Logger', 'ScoreMove']

export default ScoreActionsController
