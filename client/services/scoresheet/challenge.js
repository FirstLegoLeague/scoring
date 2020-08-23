import Promise from 'bluebird'
import EventEmitter from 'event-emitter-es6'

import LocalSettings from '../utils/local_settings'
import moduleData from '../../../module.yml'

import challenges from './../../../challenges/js/**'

LocalSettings.settingProviders.push(config => {
  return {
    name: 'scoresheet-language',
    type: 'values',
    options: moduleData.config[0].fields.find(field => field.name === 'language').values,
    value: config.language
  }
})

const MISSION_DEPENDENCIES_REGEX = /^function\s*\((.+)\)/

class Challenge extends EventEmitter {
  constructor (configuration, localSettings) {
    super()
    Object.assign(this, { configuration, localSettings })
  }

  init () {
    if (!this._initPromise) {
      this._initPromise = this.load()

      this.localSettings.on('scoresheet-language changed', () => {
        this._initPromise = this.load()
        this.emit('reloaded challenge')
      })
    }
    return this._initPromise
  }

  load () {
    return this._getLocallyConfiguredChallengeName()
      .then(locallyConfiguredChallengeName => this._getChallenge(locallyConfiguredChallengeName))
      .catch(() => this._getGlobalyConfiguredChallengeName()
        .then(globalyConfiguredChallengeName => this._getChallenge(globalyConfiguredChallengeName)))
      .catch(() => this._getDefaultChallengeName()
        .then(defaultChallengeName => this._getChallenge(defaultChallengeName)))
  }

  _initMission (mission) {
    mission.id = mission.title.split(' ')[0]
    this._assignDependencies(mission, this.challenge.objectives)
    mission._scoreFunction = mission.score[0]
    mission.scoreFunction = values => mission._scoreFunction.apply(null, values)
    mission.i18n = this.I18n.bind(this)
    mission.objectives.forEach(objective => { objective.i18n = mission.i18n })
  }

  _calculateObjectives (missions) {
    return missions.reduce((objectives, mission) => {
      const missionObjectives = mission.objectives.reduce((missionObjectivesObject, objective) => {
        missionObjectivesObject[objective.id] = objective
        return missionObjectivesObject
      }, {})

      return Object.assign(objectives, missionObjectives)
    }, {})
  }

  _assignDependencies (mission, objectives) {
    mission.dependencies = mission.score[0].toString().match(MISSION_DEPENDENCIES_REGEX)[1]
      .split(',').map(depName => objectives[depName.trim()])
  }

  I18n (key) {
    return this.challenge.strings[key]
  }

  _direction () {
    return this.challenge.rtl ? 'rtl' : 'ltr'
  }

  _getChallenge (challengeName) {
    const REPLACMENT_INDEX = 4
    challengeName = challengeName.replace(/_/g, '')
    const key = challengeName.substr(0, REPLACMENT_INDEX) +
                    challengeName[REPLACMENT_INDEX].toUpperCase() +
                    challengeName.substr(REPLACMENT_INDEX + challengeName[REPLACMENT_INDEX].length)
    return Promise.resolve(challenges[key].default)
      .then(challenge => {
        // We can't use JSON.parse because the file contains functions
        // eslint-disable-next-line no-eval
        this.challenge = eval(challenge)

        this.challenge.direction = this._direction()
        this.challenge.objectives = this._calculateObjectives(this.challenge.missions)
        this.challenge.missions.forEach(this._initMission.bind(this))

        this.challenge.defaultEnabled = Object.values(this.challenge.objectives).every(objective => typeof objective.default !== 'undefined')

        return this.challenge
      })
  }

  _getLocallyConfiguredChallengeName () {
    this.emit('loading local challenge')
    return Promise.all([this.configuration.load(), this.localSettings.init()])
      .then(([config]) => {
        const year = config.year.split(' ')[0]
        const language = this.localSettings.get('scoresheet-language').split(' ')[0]
        return `${year}_${language}`
      })
  }

  _getGlobalyConfiguredChallengeName () {
    this.emit('loading global challenge')
    return this.configuration.load()
      .then(config => {
        const year = config.year.split(' ')[0]
        const language = config.language.split(' ')[0]
        return `${year}_${language}`
      })
  }

  _getDefaultChallengeName () {
    this.emit('loading default challenge')
    const year = moduleData.config[0].fields.find(field => field.name === 'year').default.split(' ')[0]
    const language = moduleData.config[0].fields.find(field => field.name === 'language').default.split(' ')[0]
    return Promise.resolve(`${year}_${language}`)
  }
}

Challenge.$$ngIsClass = true
Challenge.$inject = ['configuration', 'localSettings']

export default Challenge
