class ScoresheetSignatureController {
  constructor (Scoresheet, $scope, Configuration) {
    Object.assign(this, { data: Scoresheet, $scope, Configuration })
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
              this.data.process()
            }
          })
        }
      })
      .catch(err => console.log(err))
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
ScoresheetSignatureController.$inject = ['Scoresheet', '$scope', 'Configuration']

export default ScoresheetSignatureController
