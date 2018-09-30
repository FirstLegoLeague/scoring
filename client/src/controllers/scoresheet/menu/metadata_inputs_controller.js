class MetadataInputsController {
  constructor (Scoresheet, $scope, Tournament) {
    Object.assign(this, { data: Scoresheet, $scope, Tournament })
    this.loading = true
  }

  $onInit () {
    this.$scope.$watch(() => this.teamNumberString, () => {
      this.data.current.teamNumber = Number(this.teamNumberString)
    })

    this.$scope.$watch(() => this.teamNumber(), () => {
      if (this.teamNumber()) {
        this.loadingMatches = true
        this.Tournament.loadTeamMatches(this.teamNumber())
          .then(matches => {
            this.matches = matches
            if (this.stage() && this.round() && !this.match) {
              this.matchId = this.matches.find(m => m.round === this.round() && m.stage === this.stage())._id
            }
            this.loadingMatches = false
            this.data.process()
          })
          .catch(err => console.log(err))
      }
    })

    this.$scope.$watch(() => this.data.current.matchId, () => {
      if (this.data.current.matchId) {
        const match = this.matches.find(m => m._id === this.data.current.matchId)
        this.data.current.stage = match.stage
        this.data.current.round = match.round
        this.data.process()
      }
    })

    return this.Tournament.loadTeams()
  }

  teamNumber () {
    return this.data.current ? this.data.current.teamNumber : undefined
  }

  stage () {
    return this.data.current ? this.data.current.stage : undefined
  }

  round () {
    return this.data.current ? this.data.current.round : undefined
  }

  teams () {
    return (this.Tournament.teams || [])
  }
}

MetadataInputsController.$$ngIsClass = true
MetadataInputsController.$inject = ['Scoresheet', '$scope', 'Tournament']

export default MetadataInputsController
