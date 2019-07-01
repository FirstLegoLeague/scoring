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

  update (attrs) {
    Object.assign(this.data, attrs)
    return this.save()
  }

  save () {
    this.ready = false
    return this.scores.update(this.data)
      .then(() => this.data.load())
      .then(() => { this.ready = true })
  }

  delete () {
    return this.scores.delete(this.data._id)
  }
}

TileController.$$ngIsClass = true
TileController.$inject = ['$location', 'scores', 'tournament']

export default TileController
