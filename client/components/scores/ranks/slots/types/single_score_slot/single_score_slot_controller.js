import Promise from 'bluebird'

class SingleScoreSlotController {
  constructor ($location, scores, tournament) {
    Object.assign(this, { $location, scores, tournament })
    this.ready = false
  }

  $onInit () {
    return Promise.all([this.data[0].load(), this.scores.init(), this.tournament.init().then(() => this.tournament.loadTeams())])
      .then(() => { this.ready = true })
  }

  update (attrs) {
    Object.assign(this.data[0], attrs)
    return this.save()
  }

  save () {
    this.ready = false
    return this.scores.update(this.data[0])
      .then(() => this.data[0].load())
      .then(() => { this.ready = true })
  }

  delete () {
    return this.scores.delete(this.data[0]._id)
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
SingleScoreSlotController.$inject = ['$location', 'scores', 'tournament']

export default SingleScoreSlotController
