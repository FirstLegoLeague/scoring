class ScoresheetPageController {
  constructor (scoresheet, logger, user, $scope) {
    Object.assign(this, { data: scoresheet, logger, user, $scope })
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

    this.$scope.$on('set scoresheet default', () => this.$scope.$broadcast('set objective default'))

    return this.data.init()
      .then(() => { this.ready = true })
  }

  reset (forceMetadataIfEditing = false) {
    this.$scope.$broadcast('reset', { forceMetadataIfEditing })
    return this.data.reset(forceMetadataIfEditing)
  }

  matchId () {
    return this.data.current ? this.data.current.matchId : undefined
  }

  teamNumber () {
    return this.data.current ? this.data.current.teamNumber : undefined
  }

  save () {
    this.data.save()
      .then(() => {
        this.logger.info(`Score saved - #${this.data.current.teamNumber} in ${this.data.current.stage} #${this.data.current.round}: ${this.data.current.score}`)
        this.$timeout(() => {
          this.$scope.$emit('close scoresheet', { goToScores: this.data.isEditing() })
          this.reset()
        })
      })
      .catch(() => {
        this.logger.info(`Failed saving score - #${this.data.current.teamNumber} in ${this.data.current.stage} #${this.data.current.round}: ${this.data.current.score}`)
        this.reset()
      })
  }
}

ScoresheetPageController.$$ngIsClass = true
ScoresheetPageController.$inject = ['scoresheet', 'logger', 'user', '$scope']

export default ScoresheetPageController
