import Promise from 'bluebird'

class MetadataInputsController {
  constructor (scoresheet, scores, $scope, $location, tournament, refIdentity, user, logger) {
    Object.assign(this, { data: scoresheet, scores, $scope, $location, tournament, refIdentity, user, logger })
    this.loading = true
  }

  $onInit () {
    this.$scope.$watch(() => this.stage(), () => this.syncMatchFields())
    this.$scope.$watch(() => this.round(), () => this.syncMatchFields())
    this.$scope.$watch(() => this.matchId(), () => {
      if (this.data.current) {
        this.data.current.stage = undefined
        this.data.current.round = undefined
      }
      return this.syncMatchFields()
    })

    this.$scope.$watch(() => this.teamNumber(), () => {
      if (this.teamNumber()) {
        if (this.data.isEditing()) {
          this.loadMatchOptions()
            .then(() => this.syncMatchFields())
            .catch(error => this.logger.error(error))
        } else {
          this.autoselectMatch()
        }
      }
    })

    this.scores.on('scores updated', () => {
      if (this.matches) {
        this.calculateMatchCompletion()
      }
    })

    this.refIdentity.on('table changed', () => {
      if (!this.data.isEditing() && !this.user.isAdmin()) {
        this.autoselectMetadata()
      }
    })

    this.$scope.$on('reset', (_event, { forceMetadataIfEditing }) => {
      if ((!this.data.isEditing() || !forceMetadataIfEditing || !this.teamNumber()) && !this.user.isAdmin()) {
        this.autoselectMetadata()
      }
    })

    this.$scope.$on('$locationChangeSuccess', () => {
      this.loadFromUrl()
    })

    Promise.all([this.data.init(), this.tournament.loadTeams(), this.refIdentity.init()])
      .then(() => this.loadFromUrl())
      .catch(error => this.logger.error(error))
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

  matchId () {
    return this.data.current ? this.data.current.matchId : undefined
  }

  loadFromUrl () {
    const search = this.$location.search()
    if (search.teamNumber && isFinite(search.teamNumber)) {
      this.data.current.teamNumber = parseInt(search.teamNumber)
      if (search.stage) {
        this.data.current.stage = search.stage
      }
      if (search.round && isFinite(search.round)) {
        this.data.current.round = parseInt(search.round)
      }
    }
  }

  autoselectMetadata () {
    this.autoselecting = true
    return this.autoselectTeam()
      .then(() => {
        if (this.data.current.teamNumber) {
          return this.autoselectMatch()
        }
      })
      .catch(error => this.logger.error(error))
      .then(() => { this.autoselecting = false })
  }

  autoselectTeam () {
    if (!this.refIdentity.table) {
      return Promise.resolve()
    }
    return this.tournament.loadNextTeamForTable(this.refIdentity.table.tableId, this.data.lastMatchId)
      .then(teamNumber => {
        if (teamNumber) {
          this.data.current.teamNumber = teamNumber
        }
      })
  }

  autoselectMatch () {
    return Promise.all([this.tournament.loadCurrentStage(), this.loadMatchOptions()])
      .then(([currentStage]) => {
        const firstIncompleteMatch = this.matches.find(match => !match.complete && match.stage === currentStage)
        if (firstIncompleteMatch) {
          this.data.current.stage = firstIncompleteMatch.stage
          this.data.current.round = firstIncompleteMatch.round
        }
      })
  }

  loadMatchOptions () {
    this.loadingMatches = true

    return Promise.all([this.tournament.loadTeamMatches(this.data.current.teamNumber), this.scores.init()])
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

  calculateMatchCompletion () {
    this.matches.forEach(match => {
      match.complete = this.scores.scores.some(score => score.teamNumber === this.data.current.teamNumber &&
        (score.matchId === match._id || (score.stage === match.stage && score.round === match.round)))
      return match
    })
  }

  syncMatchFields () {
    if (this.syncingMatchFields) {
      return Promise.resolve()
    }

    this.syncingMatchFields = true

    if (!this.matches) {
      this.syncingMatchFields = false
      return Promise.resolve()
    }

    const match = this.matches.find(m => m.stage === this.data.current.stage && m.round === this.data.current.round) ||
      this.matches.find(m => m._id === this.data.current.matchId)

    if (!match) {
      this.syncingMatchFields = false
      return Promise.resolve()
    }

    this.data.current.matchId = match._id
    this.data.current.stage = match.stage
    this.data.current.round = match.round

    this.syncingMatchFields = false
    return Promise.resolve()
  }
}

MetadataInputsController.$$ngIsClass = true
MetadataInputsController.$inject = ['scoresheet', 'scores', '$scope', '$location', 'tournament', 'refIdentity', 'user', 'logger']

export default MetadataInputsController
