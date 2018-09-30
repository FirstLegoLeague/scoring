class ScoresheetSignatureController {
  constructor (Scoresheet, $scope, Configuration, Logger) {
    Object.assign(this, { data: Scoresheet, $scope, Configuration, Logger })
  }

  $onInit () {
    this.$scope.$on('reset', () => {
      this.$scope.clearSignature()
      this.scrollToMission(this.data.current.missions[0])
    })

    this.Configuration.load()
      .then(config => {
        if (config.requireSignature) {
          this.$scope.$watch(() => (this.$scope.getSignature ? this.$scope.getSignature().dataUrl : ''), () => {
            if (this.data.current) {
              this.data.current.signature = this.$scope.getSignature()
              // Bug in the signature package: isEmpty is false when dataUrl is undefined
              if (!this.data.current.signature.dataUrl) {
                this.data.current.signature.isEmpty = true
              }
              this.data.process()
            }
          })
        }
      })
      .catch(err => this.Logger.error(err))
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

  isEditing () {
    return this.data.isEditing()
  }

  signature () {
    return (this.data.current && this.data.current.signature) ? this.data.current.signature : ({ isEmpty: true, dataUrl: '' })
  }

  scrollToMission (mission) {
    this.$scope.$parent.scrollToMission(mission)
  }
}

ScoresheetSignatureController.$$ngIsClass = true
ScoresheetSignatureController.$inject = ['Scoresheet', '$scope', 'Configuration', 'Logger']

export default ScoresheetSignatureController
