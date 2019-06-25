import EventEmitter from 'event-emitter-es6'
import Promise from 'bluebird'
import angular from 'angular'

class Scoresheet extends EventEmitter {
  constructor (challenge, scores, scoresheetValidations, refIdentity, logger) {
    super()
    Object.assign(this, { challenge, scores, scoresheetValidations, refIdentity, logger })
    this.errors = []
    this.ready = false
    this.faulty = false
    this.autoselect = true
  }

  init () {
    if (!this._initPromise) {
      this._initPromise = Promise.all([this.challenge.init(), this.refIdentity.init()])
        .then(([challenge]) => {
          this._original = challenge
          this._original.signature = undefined
          this.allowSignatureEditing = true
        })
        .then(() => this.reset())
        .then(() => this.process())
        .catch(err => {
          this.ready = true
          this.faulty = true
          throw err
        })
    }
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

  markNoShow () {
    this.current.noShow = true
    return this.save()
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
      .then(() => this.emit('proccessed'))
      .catch(error => this.logger.error(error))
  }

  save () {
    this.ready = false
    if (this.dontRequireMatch) {
      this.current.round = 0
      this.current.stage = ''
      this.current.matchId = 0
    }
    this.lastMatchId = this.current.matchId
    return (this.isEditing() ? this.scores.update(this.current) : this.scores.create(this.current))
  }

  load (score) {
    this.ready = false
    this.autoselect = false
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
          noShow: score.noShow,
          signature: score.signature
        })

        score.missions.forEach(mission => {
          mission.objectives.forEach(objective => {
            this.current.objectives[objective.id].value = objective.value
          })
        })

        this.allowSignatureEditing = !this.isEditing() || !this.current.signature || this.current.signature.isEmpty

        this.ready = true

        return this.process()
      })
  }
}

Scoresheet.$$ngIsClass = true
Scoresheet.$inject = ['challenge', 'scores', 'scoresheetValidations', 'refIdentity', 'logger']

export default Scoresheet
