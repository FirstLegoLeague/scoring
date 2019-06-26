class ScoresheetPageController {
  constructor (scoresheet, configuration, logger, $scope) {
    Object.assign(this, { data: scoresheet, configuration, logger, $scope })
    this.ready = false
  }

  $onInit () {
    this.configuration.load()
      .then(config => {
        if (config.requireSignature) {
          this.$scope.$watch(() => (this.$scope.getSignature ? this.$scope.getSignature().dataUrl : ''), () => {
            const newSignature = this.$scope.getSignature()
            if (this.data.current && !newSignature.isEmpty && newSignature.dataUrl) {
              this.data.current.signature = newSignature
              // Bug in the signature package: isEmpty is false when dataUrl is undefined
              if (!this.data.current.signature.dataUrl) {
                this.data.current.signature.isEmpty = true
              }
              this.data.process()
            }
          })
        }
      })
      .catch(error => this.logger.error(error))

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

    this.data.init()
      .then(() => { this.ready = true })
      .catch(error => this.logger.error(error))
  }
}

ScoresheetPageController.$$ngIsClass = true
ScoresheetPageController.$inject = ['scoresheet', 'configuration', 'logger', '$scope']

export default ScoresheetPageController
