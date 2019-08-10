import Promise from 'bluebird'

class SingleScoreSlotController {
  constructor ($location, scores, tournament, logger, notifications) {
    Object.assign(this, { $location, scores, tournament, logger, notifications })
    this.ready = false
  }

  $onInit () {
    Promise.all([this.data[0].enrich(), this.scores.init(), this.tournament.init().then(() => this.tournament.loadTeams())])
      .then(() => { this.ready = true })
      .catch(error => this.logger.error(error))
  }

  update (attrs) {
    Object.assign(this.data[0], attrs)
    this.save()
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

  delete () {
    this.scores.delete(this.data[0])
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
}

SingleScoreSlotController.$$ngIsClass = true
SingleScoreSlotController.$inject = ['$location', 'scores', 'tournament', 'logger', 'notifications']

export default SingleScoreSlotController
