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

  update (attrs) {
    Object.assign(this.data, attrs)
    this.save()
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

  delete () {
    this.scores.delete(this.data._id)
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }
}

TileController.$$ngIsClass = true
TileController.$inject = ['$location', 'scores', 'tournament']

export default TileController
