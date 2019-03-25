class MetadataInputsController {
  constructor (scoresheet, scores, $scope, tournament, refIdentity, logger) {
    Object.assign(this, { data: scoresheet, scores, $scope, tournament, refIdentity, logger })
    this.loading = true
    this.data.autoselect = true
  }

  $onInit () {
    this.$scope.$watch(() => this.teamNumber(), () => {
      if (this.teamNumber()) {
        this.loadMatchOptions()
          .then(() => this.autoselectMatch())
          .catch(error => this.logger.error(error))
      }
    })

    this.$scope.$watch(() => this.data.current.matchId, () => this.syncMatchFields())
    this.$scope.$watch(() => this.data.current.stage, () => this.syncMatchFields())
    this.$scope.$watch(() => this.data.current.round, () => this.syncMatchFields())

    this.$scope.$on('load', () => { this.data.autoselect = false })
    this.$scope.$on('reset', () => {
      this.data.autoselect = true
      this.autoselectMetadata()
    })

    this.scores.on('scores updated', () => {
      if (this.matches) {
        this.calculateMatchCompletion()
      }
    })
    this.refIdentity.on('saved', () => this.autoselectMetadata())

    return Promise.all([this.tournament.loadTeams(), this.refIdentity.init()])
      .then(() => this.autoselectMetadata())
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
    return (this.tournament.teams || [])
  }

  autoselectMetadata () {
    if (!this.data.autoselect) return
    this.autoselecting = true
    return this.autoselectTeam()
      .then(() => {
        if (this.teamNumber()) {
          return this.loadMatchOptions().then(() => this.autoselectMatch())
        }
      })
      .then(() => { this.autoselecting = false })
  }

  autoselectTeam () {
    if (!this.data.autoselect) return Promise.resolve()
    if (!this.refIdentity.table) return Promise.resolve()
    return this.tournament.loadNextTeamForTable(this.refIdentity.table.tableId, this.data.lastMatchId)
      .then(teamNumber => {
        if (!this.teamNumber() && teamNumber) {
          this.data.current.teamNumber = teamNumber
        }
      })
  }

  loadMatchOptions () {
    this.loadingMatches = true

    return Promise.all([this.tournament.loadTeamMatches(this.teamNumber()), this.scores.init()])
      .then(([matches]) => {
        this.matches = matches
        this.calculateMatchCompletion()
        this.data.dontRequireMatch = false
      })
      .catch(error => {
        this.data.dontRequireMatch = true
        this.logger.error(error)
      })
      .then(() => {
        this.loadingMatches = false
        return this.data.process()
      })
  }

  autoselectMatch () {
    if (!this.data.autoselect) return Promise.resolve()
    if (!this.data.current.matchId ||
      this.matches.every(match => this.data.current.stage !== match.stage || this.data.current.round !== match.round)) {
      const firstIncompleteMatch = this.matches.find(match => !match.complete)
      if (firstIncompleteMatch) {
        this.data.current.matchId = firstIncompleteMatch._id
      }
    }
  }

  calculateMatchCompletion () {
    this.matches.forEach(match => {
      match.complete = this.scores.scores.some(score => score.teamNumber === this.teamNumber() &&
        (score.matchId === match._id || (score.stage === match.stage && score.round === match.round)))
      match.displayTextWithCompletion = `${match.displayText} ${match.complete ? '✔' : ''}`
      return match
    })
  }

  syncMatchFields () {
    if (!this.matches) return Promise.resolve()
    const match = this.matches.find(m => m._id === this.data.current.matchId) ||
      this.matches.find(m => m.stage === this.stage() && m.round === this.round())

    if (!match) return Promise.resolve()

    this.data.current.matchId = match._id
    this.data.current.stage = match.stage
    this.data.current.round = match.round
  }
}

MetadataInputsController.$$ngIsClass = true
MetadataInputsController.$inject = ['Scoresheet', 'Scores', '$scope', 'Tournament', 'RefIdentity', 'Logger']

export default MetadataInputsController
