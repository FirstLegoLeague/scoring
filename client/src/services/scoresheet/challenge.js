const MISSION_DEPENDENCIES_REGEX = /^function\s*\((.+)\)/

class Challenge {
  constructor ($http, Configuration) {
    Object.assign(this, { $http, Configuration })
  }

  init () {
    if (!this._initPromise) {
      this._initPromise = this.getConfiguratedChallenge()
        .then(challengeName => this.$http.get(`/challenge/${challengeName}`))
        .then(response => {
          // We can't use JSON.parse because the file contains functions
          // eslint-disable-next-line no-eval
          this.challenge = eval(`(${response.data})`)

          this.challenge.direction = this.direction()
          this.challenge.objectives = this.calculateObjectives(this.challenge.missions)
          this.challenge.missions.forEach(this.initMission.bind(this))

          this.challenge.defaultEnabled = Object.values(this.challenge.objectives).every(objective => typeof objective.default !== 'undefined')

          return this.challenge
        })
    }

    return this._initPromise
  }

  initMission (mission) {
    mission.id = mission.title.split(' ')[0]
    this.assignDependencies(mission, this.challenge.objectives)
    mission._scoreFunction = mission.score[0]
    mission.scoreFunction = values => mission._scoreFunction.apply(null, values)
    mission.i18n = this.I18n.bind(this)
    mission.objectives.forEach(objective => { objective.i18n = mission.i18n })
  }

  calculateObjectives (missions) {
    return missions.reduce((objectives, mission) => {
      const missionObjectives = mission.objectives.reduce((missionObjectivesObject, objective) => {
        missionObjectivesObject[objective.id] = objective
        return missionObjectivesObject
      }, {})

      return Object.assign(objectives, missionObjectives)
    }, {})
  }

  assignDependencies (mission, objectives) {
    mission.dependencies = mission.score[0].toString().match(MISSION_DEPENDENCIES_REGEX)[1]
      .split(',').map(depName => objectives[depName.trim()])
  }

  I18n (key) {
    return this.challenge.strings[key]
  }

  direction () {
    return this.challenge.rtl ? 'rtl' : 'ltr'
  }

  getConfiguratedChallenge () {
    return this.Configuration.load().then(config => {
      const year = config.year.split(' ')[0]
      const language = config.language.split(' ')[0]
      return `${year}_${language}`
    })
  }
}

Challenge.$$ngIsClass = true
Challenge.$inject = ['$http', 'Configuration']

export default Challenge
