import EventEmitter from 'event-emitter-es6'

class ScoreMove extends EventEmitter {
  constructor (scores) {
    super()
    Object.assign(this, { scores })
  }

  enter (id) {
    this.id = id
    this.emit('enter', { id: this.id })
  }

  cancel () {
    this.id = undefined
    this.emit('cancel', { id: this.id })
  }

  toggle (id) {
    if (this.id) {
      this.cancel()
    } else {
      this.enter(id)
    }
  }

  move (position) {
    const score = this.scores.scores.find(s => s._id === this.id)
    Object.assign(score, position)
    return this.scores.update(score)
      .then(() => score.load())
      .then(() => this.emit('moved', { score, position }))
      .then(() => { this.id = undefined })
      .then(() => score)
  }
}

ScoreMove.$$ngIsClass = true
ScoreMove.$inject = ['Scores']

export default ScoreMove
