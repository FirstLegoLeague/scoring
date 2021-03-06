import EventEmitter from 'event-emitter-es6'

class Scores extends EventEmitter {
  constructor (independence, score, tournament, messanger, configuration) {
    super()
    Object.assign(this, { independence, score, tournament, messanger, configuration, scores: [] })
  }

  init () {
    if (!this._initPromise) {
      this.messanger.on('scores:reload', ({ data }) => {
        this._handleAction(data)
      })
      this._initPromise = this.load().catch(err => {
        this._initPromise = undefined
        throw err
      })
    }
    return this._initPromise
  }

  load () {
    return this.independence.send('GET', '/scores/all')
      .then(response => response.data).then(scores => {
        this.scores = scores.map(attrs => this.score(attrs))
        return this.scores
      })
  }

  create (attributes) {
    this._ignoreNextMessage()
    const unsavedScore = this.score(attributes)
    return this.configuration.load()
      .then(config => this.independence.send('POST', '/scores/create', unsavedScore.sanitize(config)))
      .then(response => this._localyAddScore(response.data))
      .then(id => {
        const score = this.scores.find(s => s._id === id)
        this.emit('scores updated', { id, score, action: 'add' })
        return score
      })
  }

  update (attributes, shouldUpdateLastTime = true) {
    this._ignoreNextMessage()
    const score = this.scores.find(s => s._id === attributes._id)

    score.ready = false
    return this.configuration.load()
      .then(config => this.independence.send('POST', `/scores/${attributes._id}/update?shouldUpdateLastTime=${shouldUpdateLastTime}`, this.score(attributes).sanitize(config)))
      .then(() => {
        this._localyUpdateScore(Object.assign(attributes, shouldUpdateLastTime ? { lastUpdate: Date.now() } : { }))
      })
      .then(() => {
        this.emit('scores updated', { id: score._id, score, action: 'update' })
        return score
      }).catch(err => {
        score.ready = true
        throw err
      })
  }

  delete (id) {
    this._ignoreNextMessage()
    const score = this.scores.find(s => s._id === id)
    return this.independence.send('DELETE', `/scores/${id}/delete`)
      .then(() => this._localyDeleteScore(id))
      .then(() => this.emit('scores updated', { id, score, action: 'delete' }))
  }

  restore (id) {
    this._ignoreNextMessage()
    const score = this.scores.find(s => s._id === id)
    return this.independence.send('POST', `/scores/${id}/restore`)
      .then(() => this._localyRestoreScore(id))
      .then(() => this.emit('scores updated', { id, score, action: 'restore' }))
  }

  deleteAll () {
    this._ignoreNextMessage()
    return this.independence.send('DELETE', `/scores/all`)
      .then(() => { this._localyClearScores() })
      .then(() => this.emit('scores updated', { action: 'delete all' }))
  }

  _handleAction (data) {
    switch (data.action) {
      case 'add':
        this._loadNewScore(data.id)
        break
      case 'update':
        this._loadExistingScore(data.id)
        break
      case 'delete':
        this._localyDeleteScore(data.id)
        break
      case 'restore':
        this._localyRestoreScore(data.id)
        break
      case 'delete all':
        this._localyClearScores()
        break
    }
    this.emit('scores updated', data)
  }

  _loadExistingScore (id) {
    return this.independence.send('GET', `/scores/${id}`)
      .then(response => response.data)
      .then(attrs => this._localyUpdateScore(attrs))
  }

  _loadNewScore (id) {
    return this.independence.send('GET', `/scores/${id}`)
      .then(response => response.data)
      .then(score => this._localyAddScore(score))
  }

  _ignoreNextMessage () {
    this.messanger.ignoreNext('scores:reload')
  }

  /* Local scores collection management */

  _localyUpdateScore (attributes) {
    const score = this.scores.find(({ _id }) => _id === attributes._id)
    Object.assign(score, attributes)
    return score.load()
  }

  _localyDeleteScore (id) {
    this.scores.find(score => score._id === id).deleted = true
  }

  _localyRestoreScore (id) {
    this.scores.find(score => score._id === id).deleted = false
  }

  _localyClearScores () {
    this.scores = []
  }

  _localyAddScore (attributes) {
    this.scores.push(this.score(attributes))
    return attributes._id
  }
}

Scores.$$ngIsClass = true
Scores.$inject = ['independence', 'score', 'tournament', 'messanger', 'configuration']

export default Scores
