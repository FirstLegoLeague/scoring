import Promise from 'bluebird'

class ConflictedSlotController {
  constructor (scores, logger, notifications) {
    Object.assign(this, { scores, logger, notifications })
  }

  $onInit () {
    this.allScoresUrl = `/#!/scores/tiles?filters=team: ${encodeURIComponent(this.data[0].teamText)}&filters=round: ${encodeURIComponent(this.data[0].matchText)}`
    Promise.all(this.data.map(score => score.enrich()))
      .catch(error => this.logger.error(error))
  }

  delete (score) {
    this.scores.delete(score)
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
      this.update(position)
    } else {
      this.moving = false
    }
  }

  update (attrs) {
    Object.assign(this.data[0], attrs)
    this.save()
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  save () {
    this.ready = false
    this.scores.update(this.data[0])
      .then(() => this.data[0].enrich())
      .then(() => { this.ready = true })
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }
}

ConflictedSlotController.$$ngIsClass = true
ConflictedSlotController.$inject = ['scores', 'logger', 'notifications']

export default ConflictedSlotController
