class ScoresheetController {
  constructor (scoresheet, $scope, $timeout, notifications, logger) {
    Object.assign(this, { data: scoresheet, $scope, $timeout, notifications, logger })
    this._previouslyComplete = false
  }

  $onInit () {
    this.$scope.$on('reset scoresheet', () => this.reset(false))
    this.$scope.$on('cancel scoresheet', () => this.reset(true))

    this.$scope.$on('set scoresheet default', () => this.$scope.$broadcast('set objective default'))

    this.$scope.$on('mission complete', event => {
      this.data.process()
        .then(() => {
          const missionId = event.targetScope.mission.data.id
          if (!(this.data.current && this.data.current.teamNumber) && missionId === this.missions()[0].id) {
            this.logger.info('Completed first mission without selecting a team.')
          }
        })
        .catch(error => this.logger.error(error))
    })

    this.$scope.$on('load', (event, scoresheet) => {
      this.data.load(scoresheet)
        .then(() => this.$scope.$digest())
        .catch(error => this.logger.error(error))
    })

    this.data.onProcess(() => {
      if (!this._previouslyComplete && this.complete()) {
        this._previouslyComplete = true
        this.$scope.$broadcast('scoresheet complete')
      }
    })

    return this.data.init()
      .then(() => this.reset())
      .then(() => this.data.process())
      .then(() => this.$scope.$emit('reinit foundation'))
  }

  reset (forceMetadataIfEditing) {
    this.$scope.$broadcast('reset', { forceMetadataIfEditing })
    return this.data.reset(forceMetadataIfEditing)
  }

  complete () {
    return this.data.current && this.missions() &&
      (!this.data.errors || this.data.errors.length === 0)
  }

  direction () {
    return (this.data.current && this.data.current.direction) ? this.data.current.direction : 'ltr'
  }

  missions () {
    return (this.data.current && this.data.current.missions) ? this.data.current.missions : []
  }

  save () {
    this.data.save()
      .then(() => {
        this.notifications.success(`Score saved for team ${this.data.current.teamNumber} with ${this.data.current.score}.`)
        this.logger.info(`Score saved - #${this.data.current.teamNumber} in ${this.data.current.stage} #${this.data.current.round}: ${this.data.current.score}`)
        this.$timeout(() => {
          this.$scope.$emit('close scoresheet', { goToScores: this.data.isEditing() })
          this.reset()
        })
      })
      .catch(() => {
        this.notifications.success(`Failed saving score. Will retry later.`)
        this.logger.info(`Failed saving score - #${this.data.current.teamNumber} in ${this.data.current.stage} #${this.data.current.round}: ${this.data.current.score}`)
        this.reset()
      })
  }
}

ScoresheetController.$$ngIsClass = true
ScoresheetController.$inject = ['Scoresheet', '$scope', '$timeout', 'Notifications', 'Logger']

export default ScoresheetController
