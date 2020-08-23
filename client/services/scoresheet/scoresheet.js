import EventEmitter from 'event-emitter-es6'
import Promise from 'bluebird'
import angular from 'angular'
import { isNumber } from 'util'

import debounce from '../../lib/debounce'

import LocalSettings from '../utils/local_settings'

LocalSettings.settingProviders.push(() => {
  return {
    name: 'scoresheet-autoscroll',
    type: 'boolean',
    value: true
  }
})

// This is done because Semantic-UI lib needs the value to be `=== null` in order to reset the dropdown.
// Once https://github.com/ClickerMonkey/SemanticUI-Angular/pull/38 is merged, this can be removed.
const DEFAULT_METADATA = {
  teamNumber: null
}

class Scoresheet extends EventEmitter {
  constructor (challenge, scoresheetValidations, logger, fileSaver) {
    super()
    Object.assign(this, { challenge, scoresheetValidations, logger, fileSaver })
    this.errors = []
    this.ready = false
    this.faulty = false
  }

  init () {
    if (!this._initPromise) {
      this._initPromise = this.loadChallenge()
    }

    this.challenge.on('reloaded challenge', () => this.loadChallenge())
    this.challenge.on('loading local challenge', () => this.emit('loading local challenge'))
    this.challenge.on('loading global challenge', () => this.emit('loading global challenge'))
    this.challenge.on('loading default challenge', () => this.emit('loading default challenge'))

    return this._initPromise
  }

  loadChallenge () {
    this.ready = false
    return this.challenge.init()
      .then(challenge => {
        this._original = challenge
        this._original.signature = { dataUrl: '', isEmpty: true }
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
      this.current = Object.assign(angular.copy(this._original), DEFAULT_METADATA)
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
          } else if (isNumber(result)) {
            Object.assign(mission, { complete: true, error: undefined, score: result })
          } else {
            Object.assign(mission, { complete: false, error: undefined, score: 0 })
          }
        }
      }
    })
    this.allowSignatureEditing = true
    this.ready = true
    return Promise.resolve(this.current)
  }

  markNoShow () {
    this.current.noShow = true
    return this.save()
  }

  score () {
    return this.current ? this.current.score : 0
  }

  isEditing () {
    return Boolean(this.current && this.current._id)
  }

  process () {
    if (!this.current) {
      return Promise.resolve()
    }
    this.current.missions.forEach(mission => mission.process())
    this.current.score = this.current.missions.reduce((sum, mission) => sum + mission.score, 0) || 0
      return this.scoresheetValidations.validate(this.current, { requireMatch: !this.dontRequireMatch })
      .then(errors => { this.errors = errors })
      .then(() => this.emit('processed'))
      .catch(error => this.logger.error(error))
  }

  save () {
    this.fileSaver.saveAs(new Blob([JSON.stringify(this.current)], { type: 'text/plain;charset=utf-8' }), `${this.current.teamNumber}.fll`)
    return Promise.resolve()
  }

  fakeSignature () {
    this.current.signature = {
      isEmpty: false,
      dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACACAYAAACx1FRUAAAEXklEQVR4Xu3UMU0FQBRE0aEioaDCAiVGSOixhRo80IILEgRQERT83+7NWQVvzmzmZh4BAgQOEbg55E5nEiBAYAbLJyBA4BgBg3VMVQ4lQMBg+QMECBwjYLCOqcqhBAgYLH+AAIFjBK4ZrJdtr9vetn0ck8yhBAjkBC4N1t22n2232762PeUEBCJA4BiBS4P1H+R728O2923PxyRzKAECOYFrBut+2+O2z22/OQGBCBA4RuCawTomjEMJEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoCxisdr/SEUgJGKxUncIQaAsYrHa/0hFICRisVJ3CEGgLGKx2v9IRSAkYrFSdwhBoC/wBXA4IgXIiU60AAAAASUVORK5CYII='
    }
  }

  fillDefaults () {
    this.current.missions.forEach(mission => {
      mission.objectives.forEach(objective => {
        if (objective.default !== undefined && (objective.value === undefined || objective.value === null)) {
          objective.value = objective.default
        }
      })
    })
  }

  load (score) {
    this.ready = false
    return Promise.resolve()
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

  syncMatchFields () {
    if (!this.matches) return Promise.resolve()
    const match = this.matches.find(m => m._id === this.data.current.matchId) ||
      this.matches.find(m => m.stage === this.stage() && m.round === this.round())

    if (!match) return Promise.resolve()

    this.data.current.matchId = match._id
    this.data.current.stage = match.stage
    this.data.current.round = match.round
  }
}

Scoresheet.$$ngIsClass = true
Scoresheet.$inject = ['challenge', 'scoresheetValidations', 'logger', 'FileSaver']

export default Scoresheet
