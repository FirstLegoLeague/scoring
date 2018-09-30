class MetadataInputsController {
  constructor (scoresheet, scores, $scope, tournament, logger) {
    Object.assign(this, { data: scoresheet, scores, $scope, tournament, logger })
    this.loading = true
  }

  $onInit () {
    this.$scope.$watch(() => this.teamNumber(), () => {
      if (this.teamNumber()) {
        this.loadingMatches = true
        Promise.all([this.tournament.loadTeamMatches(this.teamNumber()), this.scores.all()])
          .then(([matches, scores]) => {
            matches.forEach(match => {
              match.complete = scores.some(score => score.teamNumber === this.teamNumber() && score.matchId === match._id)
              match.displayTextWithCompletion = `${match.displayText} ${match.complete ? '✔' : ''}`
            })
            this.matches = matches
            if (this.stage() && this.round() && !this.match) {
              this.matchId = this.matches.find(m => m.round === this.round() && m.stage === this.stage())._id
            }
            this.loadingMatches = false
            return this.data.process()
          })
          .catch(err => this.logger.error(err))
      }
    })

    this.$scope.$watch(() => this.data.current.matchId, () => {
      if (this.data.current.matchId) {
        const match = this.matches.find(m => m._id === this.data.current.matchId) ||
          this.matches.find(m => m.stage === this.data.current.stage && m.round === this.data.current.round)
        this.data.current.matchId = match._id
        this.data.current.stage = match.stage
        this.data.current.round = match.round
        return this.data.process()
          .catch(err => this.logger.error(err))
      }
    })

    this.$scope.$on('reset', () => {
      this.matches = []
    })

    return this.tournament.loadTeams()
  }

  teamNumber () {
    return this.data.current ? this.data.current.teamNumber : undefined
  }

  getMatches () {
    return this.matches
  }

  stage () {
    return this.data.current ? this.data.current.stage : undefined
  }

  round () {
    return this.data.current ? this.data.current.round : undefined
  }

  teams () {
    return (this.tournament.teams || [])
  }
}

MetadataInputsController.$$ngIsClass = true
MetadataInputsController.$inject = ['Scoresheet', 'Scores', '$scope', 'Tournament', 'Logger']

export default MetadataInputsController
