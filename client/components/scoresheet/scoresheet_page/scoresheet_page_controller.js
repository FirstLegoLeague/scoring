import Promise from 'bluebird'

class ScoresheetPageController {
  constructor (scoresheet, scores, logger, user, $scope, $location, $timeout, $window, notifications, localSettings) {
    Object.assign(this, { data: scoresheet, scores, logger, user, $scope, $location, $timeout, $window, notifications, localSettings })
    this.ready = false
    this.scrollDisabled = false

    const serviceSettings = this.localSettings.getFromLocalStorage('Scoresheet')
    if (Object.keys(serviceSettings).length === 0) {
      this.localSettings.addSettings('Scoresheet', [{
        name: 'autoscroll',
        dataType: 'boolean',
        value: !this.scrollDisabled
      }])
    } else {
      const hasAutoscroll = this.localSettings.settings['Scoresheet'].find(({ name }) => name === 'autoscroll') !== undefined
      if (hasAutoscroll) {
        this.scrollDisabled = !this.localSettings.settings['Scoresheet'].find(({ name }) => name === 'autoscroll').value
      } else {
        this.localSettings.addSettings('Scoresheet', [{
          name: 'autoscroll',
          dataType: 'boolean',
          value: !this.scrollDisabled
        }])
      }
    }
  }

  scrollingAllowed () {
    const serviceSettings = this.localSettings.getFromLocalStorage('Scoresheet')
    const autoscrollSetting = serviceSettings.find(({ name }) => name === 'autoscroll')
    if (autoscrollSetting !== undefined) {
      return !(autoscrollSetting.value)
    } else {
      return this.scrollDisabled
    }
  }

  $onInit () {
    this.$scope.$on('mission complete', event => {
      this.data.process()
        .then(() => {
          const missionId = event.targetScope.mission.data.id
          if (!(this.data.current && this.data.current.teamNumber) && missionId === this.data.current.missions[0].id) {
            this.logger.info('Completed first mission without selecting a team.')
          }
        })
        .catch(error => this.logger.error(error))
    })
    this.$scope.$on('reset scoresheet', () => this.reset(false))
    this.$scope.$on('cancel scoresheet', () => this.reset(true))

    this.$scope.$on('$locationChangeSuccess', () => {
      this.loadFromURL()
    })

    this.$scope.$on('Scoresheet autoscroll', () => { this.scrollDisabled = this.scrollingAllowed() })

    this.data.on('processed', () => {
      if (!this._previouslyComplete && this.complete()) {
        this._previouslyComplete = true
        this.$scope.$broadcast('scoresheet complete')
      }
    })

    Promise.all([this.data.init(), this.scores.init()])
      .then(() => {
        this.loadFromURL()
        this.ready = true
      })
      .catch(error => this.logger.error(error))
  }

  reset (forceMetadataIfEditing = false) {
    this.$scope.$broadcast('reset', { forceMetadataIfEditing })
    const serviceSettings = this.localSettings.get('Scoresheet')
    const autoscrollSetting = serviceSettings.find(({ name }) => name === 'autoscroll')
    if (autoscrollSetting !== undefined) {
      this.scrollDisabled = !(autoscrollSetting.value)
    } else {
      this.scrollDisabled = false
      this.localSettings.update({ autoscroll: !this.scrollDisabled }, 'Scoresheet')
    }
    this.data.reset(forceMetadataIfEditing)
  }

  matchId () {
    return this.data.current ? this.data.current.matchId : undefined
  }

  teamNumber () {
    return this.data.current ? this.data.current.teamNumber : undefined
  }

  complete () {
    return this.data.current && this.data.current.missions &&
      (!this.data.errors || this.data.errors.length === 0)
  }

  error () {
    return this.data.errors[0]
  }

  save () {
    this.data.save()
      .then(() => {
        this.$timeout(() => {
          this.logger.info(`Score saved - #${this.data.current.teamNumber} in ${this.data.current.stage} #${this.data.current.round}: ${this.data.current.score}`)
          this.notifications.success('Score saved!')
          this.$scope.$emit('close scoresheet', { goToScores: this.data.isEditing() })
          if (this.data.isEditing()) {
            this.$window.history.back()
          }
          this.reset()
        })
      })
      .catch(error => {
        console.error(error)
        this.logger.error(`Failed saving score - #${this.data.current.teamNumber} in ${this.data.current.stage} #${this.data.current.round}: ${this.data.current.score}`)
        this.notifications.error('Failed saving score... Retry will occour soon.')
        if (this.data.isEditing()) {
          this.$window.history.back()
        }
        this.reset()
      })
  }

  loadFromURL () {
    const splitPath = this.$location.path().split('/')
    const page = splitPath[1]
    const subpage = splitPath[2]
    if (page === 'scoresheet' && subpage !== 'new') {
      const score = this.scores.scores.find(s => s._id === subpage)
      if (score !== undefined) {
        this.data.load(score)
        this.scrollDisabled = true
        this.localSettings.update({ autoscroll: !this.scrollDisabled }, 'Scoresheet')
      }
    }
  }
}

ScoresheetPageController.$$ngIsClass = true
ScoresheetPageController.$inject = ['scoresheet', 'scores', 'logger', 'user', '$scope', '$location', '$timeout', '$window', 'notifications', 'localSettings']

export default ScoresheetPageController
