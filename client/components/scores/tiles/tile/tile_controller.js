import Promise from 'bluebird'

class TileController {
  constructor ($location, scores, tournament) {
    Object.assign(this, { $location, scores, tournament })
    this.ready = false
  }

  $onInit () {
    Promise.all([this.data.load(), this.scores.init(), this.tournament.init().then(() => this.tournament.loadTeams())])
      .then(() => { this.ready = true })
      .catch(error => this.logger.error(error))
  }

  save () {
    this.ready = false
    this.scores.update(this.data)
      .then(() => this.data.load())
      .then(() => { this.ready = true })
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  restore () {
    if (!this.data.deleted) {
      return
    }

    this.scores.restore(this.data._id)
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }
}

TileController.$$ngIsClass = true
TileController.$inject = ['$location', 'scores', 'tournament']

export default TileController
