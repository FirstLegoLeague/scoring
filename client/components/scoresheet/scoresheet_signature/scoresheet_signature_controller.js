class ScoresheetSignatureController {
  constructor (scoresheet, $scope, configuration, logger) {
    Object.assign(this, { data: scoresheet, $scope, configuration, logger })
  }

  $onInit () {
    this.$scope.$on('reset', () => {
      this.$scope.clearSignature()
      this.scrollToMission(this.data.current.missions[0])
    })

    this.configuration.load()
      .then(config => {
        if (config.requireSignature) {
          this.$scope.$watch(() => (this.$scope.getSignature ? this.$scope.getSignature().dataUrl : ''), () => {
            if (!this.$scope.getSignature) {
              return
            }
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
  }

  reset () {
    if (this.$scope.clearSignature) {
      this.$scope.clearSignature()
    }
    if (this.$scope.scrollToMission) {
      this.$scope.scrollToMission(this.data.current.missions[0])
    }
  }

  error () {
    return this.data.errors[0]
  }

  signature () {
    return (this.data.current && this.data.current.signature) ? this.data.current.signature : ({ isEmpty: true, dataUrl: '' })
  }

  scrollToMission (mission) {
    this.$scope.$parent.scrollToMission(mission)
  }
}

ScoresheetSignatureController.$$ngIsClass = true
ScoresheetSignatureController.$inject = ['scoresheet', '$scope', 'configuration', 'logger']

export default ScoresheetSignatureController
