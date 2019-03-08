class ScoreActionsController {
  constructor ($scope, $element, $timeout, scores, modals, notifications, logger) {
    Object.assign(this, { $scope, $element, $timeout, scores, modals, notifications, logger })
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
ScoreActionsController.$inject = ['$scope', '$element', '$timeout', 'Scores', 'Modals', 'Notifications', 'Logger']

export default ScoreActionsController
