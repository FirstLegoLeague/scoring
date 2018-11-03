import angular from 'angular'

class Scoresheet {
  constructor (challenge, scores, scoresheetValidations, refIdentity, notifications, logger) {
    Object.assign(this, { challenge, scores, scoresheetValidations, refIdentity, notifications, logger })
    this._onProcessListeners = []
    this.errors = []
    this.ready = false
  }

  init () {
    this._initPromise = Promise.all([this.challenge.init(), this.refIdentity.init()])
      .then(([challenge]) => {
        this._original = challenge
        this._original.signature = undefined
      })
    return this._initPromise
  }

  reset (forceMetadataIfEditing = true) {
    // Using a copy of the challenge as the current scoresheet
    if (!forceMetadataIfEditing && this.isEditing()) {
      const metadata = {
        _id: this.current._id,
        matchId: this.current.matchId,
        round: this.current.round,
        stage: this.current.stage,
        teamNumber: this.current.teamNumber
      }
      this.current = Object.assign(angular.copy(this._original), metadata)
    } else {
      this.current = angular.copy(this._original)
    }
    this.current.missions.forEach(mission => {
      mission.score = 0
      mission.process = () => {
        const values = mission.dependencies.map(dependency => dependency.value)
        if (values.includes(undefined)) {
          Object.assign(mission, { complete: false, error: undefined, score: 0 })
          return undefined
        } else {
          const result = mission.scoreFunction(values)
          if (result instanceof Error) {
            Object.assign(mission, { complete: false, error: result, score: 0 })
          } else {
            Object.assign(mission, { complete: true, error: undefined, score: result })
          }
        }
      }
    })
    this.ready = true
    return Promise.resolve(this.current)
  }

  score () {
    if (!this.current) {
      return 0
    }
    this.current.score = this.current.missions.reduce((sum, mission) => sum + mission.score, 0) || 0
    return this.current.score
  }

  isEditing () {
    return Boolean(this.current && this.current._id)
  }

  process () {
    if (!this.current) {
      return Promise.resolve()
    }
    this.current.missions.forEach(mission => mission.process())
    return this.refIdentity.init()
      .then(identity => {
        Object.assign(this.current, { referee: identity.referee })
        if (identity.table) {
          Object.assign(this.current, { tableId: identity.table.tableId })
        }
        return this.scoresheetValidations.validate(this.current, { requireMatch: !this.dontRequireMatch })
          .then(errors => { this.errors = errors })
      })
      .then(() => this._onProcessListeners.map(listener => listener()))
      .catch(err => { this.logger.error(err) })
  }

  save () {
    this.ready = false
    if (this.dontRequireMatch) {
      this.current.round = 0
      this.current.stage = ''
      this.current.matchId = 0
    }
    return (this.isEditing() ? this.scores.update(this.current._id, this.current) : this.scores.create(this.current))
      .then(() => this.notifications.success('Score saved successfully'))
      .catch(err => {
        if (err.status === 422) {
          this.notifications.error(`Cannot submit score, there are some missing fields.`)
        } else {
          const pendingScores = err.pendingRequestsCount
          const scoresWord = pendingScores > 1 ? 'scores' : 'score'
          this.notifications.error(`Score submit failed. Don't worry, We're keeping
                      an eye on your ${pendingScores} pending ${scoresWord}.`)
        }
      })
  }

  load (score) {
    this.ready = false
    return Promise.resolve(this.refIdentity.set(score))
      .then(() => {
        Object.assign(this.current, {
          _id: score._id,
          teamNumber: score.teamNumber,
          matchId: score.matchId,
          stage: score.stage,
          round: score.round,
          title: score.challenge,
          score: score.score,
          signature: score.signature
        })

        score.missions.forEach(mission => {
          mission.objectives.forEach(objective => {
            this.current.objectives[objective.id].value = objective.value
          })
        })

        this.ready = true

        return this.process()
      })
  }

  onProcess (callback) {
    this._onProcessListeners.push(callback)
  }
}

Scoresheet.$$ngIsClass = true
Scoresheet.$inject = ['Challenge', 'Scores', 'ScoresheetValidations', 'RefIdentity', 'Notifications', 'Logger']

export default Scoresheet
