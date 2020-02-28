class ScoreActionsController {
  constructor (logger, scores, notifications) {
    Object.assign(this, { logger, scores, notifications })
  }

  update (attrs, shouldUpdateLastTime = true) {
    Object.assign(this.score, attrs)
    this.save(shouldUpdateLastTime)
  }

  save (shouldUpdateLastTime = true) {
    this.ready = false
    this.scores.update(this.score, shouldUpdateLastTime)
      .then(() => this.score.load())
      .then(() => { this.ready = true })
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  delete () {
    this.scores.delete(this.score._id)
      .then(() => {
        this.notifications.success(`Score deleted. <a href="#!/scores/restore/${this.score._id}"><i class="ui primary link undo icon"></i>undo</a>`)
      })
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }
}

ScoreActionsController.$$ngIsClass = true
ScoreActionsController.$inject = ['logger', 'scores', 'notifications']

export default ScoreActionsController
