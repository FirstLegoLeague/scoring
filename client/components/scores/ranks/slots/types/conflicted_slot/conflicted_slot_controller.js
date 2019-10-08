import Promise from 'bluebird'

class ConflictedSlotController {
  constructor (scores, logger, notifications, $scope) {
    Object.assign(this, { scores, logger, notifications, $scope })
  }

  $onInit () {
    this.allScoresUrl = `/#!/scores/tiles?filters=team: ${encodeURIComponent(this.data[0].teamText)}&filters=round: ${encodeURIComponent(this.data[0].matchText)}`
    Promise.all(this.data.map(score => score.load()))
      .catch(error => this.logger.error(error))
  }

  delete (score) {
    this.scores.delete(score._id)
      .then(() => this.data.splice(this.data.findIndex(s => s._id === score._id), 1))
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  startMovement () {
    this.moving = true
  }

  resolveMovement (position) {
    if (position) {
      this.ready = false
      const score = this.data[0]
      this.update(position)
      this.$scope.$emit('calc rank', { score })
    } else {
      this.moving = false
    }
  }

  update (attrs) {
    Object.assign(this.data[0], attrs)
    this.save()
  }

  save () {
    this.ready = false
    this.scores.update(this.data[0])
      .then(() => this.data[0].load())
      .then(() => { this.ready = true })
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }
}

ConflictedSlotController.$$ngIsClass = true
ConflictedSlotController.$inject = ['scores', 'logger', 'notifications', '$scope']

export default ConflictedSlotController
