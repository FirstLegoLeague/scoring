import Promise from 'bluebird'

class TileController {
  constructor ($location, scores, tournament) {
    Object.assign(this, { $location, scores, tournament })
    this.ready = false
  }

  $onInit () {
    return Promise.all([this.data.load(), this.scores.init(), this.tournament.init().then(() => this.tournament.loadTeams())])
      .then(() => { this.ready = true })
  }

  save () {
    return this.scores.update(this.data)
      .then(() => this.data.load())
  }
}

TileController.$$ngIsClass = true
TileController.$inject = ['$location', 'scores', 'tournament']

export default TileController
