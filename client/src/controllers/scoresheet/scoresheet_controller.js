class ScoresheetController {
  constructor (Scoresheet, $scope, Configuration, Logger) {
    Object.assign(this, { data: Scoresheet, $scope, Configuration, Logger })
    this.saving = false
  }

  $onInit () {
    this.$scope.$on('reset scoresheet', () => this.reset())

    this.$scope.$on('set scoresheet default', () => this.$scope.$broadcast('set objective default'))

    this.$scope.$on('mission complete', event => {
      this.data.process()
      const missionId = event.targetScope.mission.data.id
      if (!(this.data.current && this.data.current.teamNumber) && missionId === this.missions()[0].id) {
        this.Logger.info('Completed first mission without selecting a team')
      }
    })

    this.$scope.$on('load', (event, scoresheet) => {
      this.data.load(scoresheet)
        .catch(err => console.log(err))
    })

    return this.data.init()
      .then(() => this.reset())
      .then(() => this.data.process())
  }

  reset () {
    return this.data.reset()
      .then(() => this.$scope.$broadcast('reset'))
  }

  error () {
    return this.data.errors[0]
  }

  complete () {
    return this.data.current && this.missions() &&
      (!this.data.current.errors || this.data.current.errors.length === 0) && !this.saving
  }

  direction () {
    return (this.data.current && this.data.current.direction) ? this.data.current.direction : 'ltr'
  }

  missions () {
    return (this.data.current && this.data.current.missions) ? this.data.current.missions : []
  }

  save () {
    this.saving = true
    this.data.save()
      .then(() => {
        this.$scope.$emit('close scoresheet', { goToScores: this.data.isEditing() })
        this.reset()
        this.saving = false
      })
      .catch(() => this.reset())
  }
}

ScoresheetController.$$ngIsClass = true
ScoresheetController.$inject = ['Scoresheet', '$scope', 'Configuration', 'Logger']

export default ScoresheetController
