import Promise from 'bluebird'

class TileController {
  constructor ($location, scores, tournament, logger) {
    Object.assign(this, { $location, scores, tournament, logger })
    this.ready = false
  }

  $onInit () {
    Promise.all([this.data.enrich(), this.scores.init(), this.tournament.init().then(() => this.tournament.loadTeams())])
      .then(() => { this.ready = true })
      .catch(error => this.logger.error(error))
  }

  update (attrs) {
    Object.assign(this.data, attrs)
    this.save()
  }

  save () {
    this.ready = false
    this.scores.update(this.data)
      .then(() => this.data.enrich())
      .then(() => { this.ready = true })
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  delete () {
    this.scores.delete(this.data)
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }
}

TileController.$$ngIsClass = true
TileController.$inject = ['$location', 'scores', 'tournament', 'logger']

export default TileController
