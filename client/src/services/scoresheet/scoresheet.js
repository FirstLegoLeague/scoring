import angular from 'angular'

class Scoresheet {
  constructor (Challenge, Scores, ScoresheetValidations, RefIdentity, Notifications) {
    Object.assign(this, { Challenge, Scores, ScoresheetValidations, RefIdentity, Notifications })
    this.errors = []
    this.ready = false
  }

  init () {
    this._initPromise = Promise.all([this.Challenge.init(), this.RefIdentity.init()])
      .then(([challenge]) => {
        this._original = challenge
        this._original.signature = undefined
      })
    return this._initPromise
  }

  reset () {
    return this._initPromise.then(() => {
      // Using a copy of the challenge as the current scoresheet
      this.current = angular.copy(this._original)
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
      return this.current
    })
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
    return this.RefIdentity.init()
      .then(identity => {
        Object.assign(this.current, { referee: identity.referee })
        if (identity.table) {
          Object.assign(this.current, { tableId: identity.table.tableId })
        }
        return this.ScoresheetValidations.validate(this.current)
          .then(errors => { this.errors = errors })
      })
      .catch(err => { console.log(err) })
  }

  save () {
    this.ready = false
    return (this.isEditing() ? this.Scores.update(this.current._id, this.current) : this.Scores.create(this.current))
      .then(() => {
        this.Notifications.success('Score saved successfully')
        this.ready = true
      })
      .catch(err => {
        if (err.status === 422) {
          this.Notifications.error(`Cannot submit score, there are some missing fields.`)
        } else {
          const pendingScores = err.pendingRequestsCount
          const scoresWord = pendingScores > 1 ? 'scores' : 'score'
          this.Notifications.error(`Score submit failed. Don't worry, We're keeping
                      an eye on your ${pendingScores} pending ${scoresWord}.`)
        }
      })
  }

  load (score) {
    this.ready = false
    return Promise.resolve(this.RefIdentity.set(score))
      .then(() => this.reset())
      .then(current => {
        Object.assign(current, {
          _id: score._id,
          teamNumber: score.teamNumber,
          stage: score.stage,
          round: score.round,
          title: score.challenge,
          score: score.score,
          signature: score.signature
        })

        score.missions.forEach(mission => {
          mission.objectives.forEach(objective => {
            current.objectives[objective.id].value = objective.value
          })
        })

        this.ready = true

        return current
      })
  }
}

Scoresheet.$$ngIsClass = true
Scoresheet.$inject = ['Challenge', 'Scores', 'ScoresheetValidations', 'RefIdentity', 'Notifications']

export default Scoresheet
