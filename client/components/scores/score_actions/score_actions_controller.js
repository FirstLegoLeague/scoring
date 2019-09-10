class ScoreActionsController {
  constructor (logger, scores, notifications) {
    Object.assign(this, { logger, scores, notifications })
  }

  update (attrs) {
    Object.assign(this.score, attrs)
    this.save()
  }

  save () {
    this.ready = false
    this.scores.update(this.score)
      .then(() => this.score.load())
      .then(() => { this.ready = true })
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  delete () {
    this.scores.delete(this.score._id)
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }
}

ScoreActionsController.$$ngIsClass = true
ScoreActionsController.$inject = ['logger', 'scores', 'notifications']

export default ScoreActionsController