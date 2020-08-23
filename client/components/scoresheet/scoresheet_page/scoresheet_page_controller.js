import Promise from 'bluebird'

const CHALLENGE_NOTIFICATIONS = {
  GLOBAL: 'Can\'t load locally configured scoresheet. Reverting to global configuration',
  DEFAULT: 'Can\'t load globally configured scoresheet. Reverting to default.'
}

class ScoresheetPageController {
  constructor (scoresheet, logger, $scope, $location, $timeout, $window, notifications, localSettings) {
    Object.assign(this, { data: scoresheet, logger, $scope, $location, $timeout, $window, notifications, localSettings })
    this.ready = false
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

    this.data.on('processed', () => {
      if (!this._previouslyComplete && this.complete()) {
        this._previouslyComplete = true
        this.$scope.$broadcast('scoresheet complete')
      }
    })

    this.data.on('loading global challenge', () => this.notifications.warning(CHALLENGE_NOTIFICATIONS.GLOBAL))
    this.data.on('loading default challenge', () => this.notifications.warning(CHALLENGE_NOTIFICATIONS.DEFAULT))

    return this.data.init()
      .then(() => {
        this.ready = true
        return true
      })
      .catch(error => this.logger.error(error))
  }

  reset (forceMetadataIfEditing = false) {
    this.data.reset(forceMetadataIfEditing)
    this.$scope.$broadcast('reset', { forceMetadataIfEditing })
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
        this.notifications.error('Error sending score to server. Retrying...')
        if (this.data.isEditing()) {
          this.$window.history.back()
        }
        this.reset()
      })
  }
}

ScoresheetPageController.$$ngIsClass = true
ScoresheetPageController.$inject = ['scoresheet', 'logger', '$scope', '$location', '$timeout', '$window', 'notifications', 'localSettings']

export default ScoresheetPageController
