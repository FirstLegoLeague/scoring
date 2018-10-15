class ScoresheetController {
  constructor (scoresheet, $scope, $timeout, logger) {
    Object.assign(this, { data: scoresheet, $scope, $timeout, logger })
  }

  $onInit () {
    this.$scope.$on('reset scoresheet', () => this.reset())

    this.$scope.$on('set scoresheet default', () => this.$scope.$broadcast('set objective default'))

    this.$scope.$on('mission complete', event => {
      this.data.process()
      const missionId = event.targetScope.mission.data.id
      if (!(this.data.current && this.data.current.teamNumber) && missionId === this.missions()[0].id) {
        this.logger.info('Completed first mission without selecting a team')
      }
    })

    this.$scope.$on('load', (event, scoresheet) => {
      this.data.load(scoresheet)
        .then(() => this.$scope.$digest())
        .catch(err => this.logger.error(err))
    })

    return this.data.init()
      .then(() => this.reset())
      .then(() => this.data.process())
      .then(() => this.$scope.$emit('reinit foundation'))
  }

  reset () {
    this.$scope.$broadcast('reset')
    return this.data.reset()
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
        this.$timeout(() => {
          this.$scope.$emit('close scoresheet', { goToScores: this.data.isEditing() })
          this.reset()
        })
      })
      .catch(() => this.reset())
  }
}

ScoresheetController.$$ngIsClass = true
ScoresheetController.$inject = ['Scoresheet', '$scope', '$timeout', 'Logger']

export default ScoresheetController
