import Promise from 'bluebird'

class ConflictedSlotController {
  constructor (scores) {
    Object.assign(this, { scores })
  }

  $onInit () {
    this.allScoresUrl = `/#!/scores/tiles?filters=team: ${encodeURIComponent(this.data[0].teamText)}&filters=round: ${encodeURIComponent(this.data[0].matchText)}`
    return Promise.all(this.data.map(score => score.load()))
  }

  delete (score) {
    return this.scores.delete(score._id)
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
    return this.save()
  }

  save () {
    this.ready = false
    return this.scores.update(this.data[0])
      .then(() => this.data[0].load())
      .then(() => { this.ready = true })
  }
}

ConflictedSlotController.$$ngIsClass = true
ConflictedSlotController.$inject = ['scores']

export default ConflictedSlotController
