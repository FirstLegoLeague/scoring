import Promise from 'bluebird'

import debounce from '../../../lib/debounce'

class MetadataInputsController {
  constructor (scoresheet, scores, $scope, $location, tournament, refIdentity, logger) {
    Object.assign(this, { data: scoresheet, scores, $scope, $location, tournament, refIdentity, logger })
    this.loading = true
  }

  $onInit () {
    this.$scope.$watch(() => this.teamNumber(), () => {
      if (this.teamNumber()) {
        this.forceMatchReselection = true
        this.loadMatchOptions()
          .then(() => this.autoselectMatch())
          .catch(error => this.logger.error(error))
      }
    })

    this.$scope.$watch(() => this.stage(), () => this.syncMatchFields())
    this.$scope.$watch(() => this.round(), () => this.syncMatchFields())
    this.$scope.$watch(() => this.matchId(), () => {
      if (this.data.current) {
        this.data.current.stage = undefined
        this.data.current.round = undefined
      }
      return this.syncMatchFields()
    })

    this.$scope.$on('load', () => { this.data.autoselect = false })
    this.$scope.$on('reset', () => {
      this.data.autoselect = true
      this.forceTeamReselection = true
      this.autoselectMetadata()
    })

    this.scores.on('scores updated', () => {
      if (this.matches) {
        this.calculateMatchCompletion()
      }
    })

    this.debouncedAutoselectMetadata = debounce(() => this.autoselectMetadata())
    this.refIdentity.on('table changed', () => {
      if (this.refIdentity.table) {
        this.forceTeamReselection = true
        this.debouncedAutoselectMetadata()
      }
    })

    this.$scope.$on('$locationChangeSuccess', () => {
      this.loadFromUrl()
    })

    Promise.all([this.data.init(), this.tournament.loadTeams(), this.refIdentity.init()])
      .then(() => {
        this.loadFromUrl()
        return this.autoselectMetadata()
      })
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
      this.data.autoselect = true
      this.data.current.teamNumber = parseInt(search.teamNumber)
      if (search.stage) {
        this.data.current.stage = search.stage
      }
      if (search.round && isFinite(search.round)) {
        this.data.current.round = parseInt(search.round)
      }
      this.data.autoselect = false
    }
  }

  autoselectMetadata () {
    if (!this.data.autoselect) {
      return this.loadMatchOptions()
        .then(() => this.syncMatchFields())
        .then(() => this.data.process())
    }
    this.autoselecting = true
    return this.autoselectTeam()
      .then(() => {
        if (this.data.current.teamNumber) {
          return this.loadMatchOptions().then(() => this.autoselectMatch())
        }
      })
      .catch(error => this.logger.error(error))
      .then(() => { this.autoselecting = false })
  }

  autoselectTeam () {
    if (!this.refIdentity.table) {
      return Promise.resolve()
    }
    if (!this.forceTeamReselection) {
      if (!this.data.autoselect) {
        return Promise.resolve()
      }
      if (this.data.current.teamNumber !== undefined) {
        return Promise.resolve()
      }
    }
    this.forceTeamReselection = false
    return this.tournament.loadNextTeamForTable(this.refIdentity.table.tableId, this.data.lastMatchId)
      .then(teamNumber => {
        if (teamNumber) {
          this.data.current.teamNumber = teamNumber
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

  autoselectMatch () {
    if (!this.data.autoselect) {
      return Promise.resolve()
    }
    if (!this.forceMatchReselection) {
      if (this.data.current.matchId !== undefined) {
        return Promise.resolve()
      }
      if (this.data.current.round !== undefined && this.data.current.stage !== undefined) {
        return Promise.resolve()
      }
      if (this.matches.some(match => this.data.current.stage === match.stage || this.data.current.round === match.round)) {
        return Promise.resolve()
      }
    }
    this.forceMatchReselection = false
    const firstIncompleteMatch = this.matches.find(match => !match.complete)
    if (firstIncompleteMatch) {
      this.data.current.stage = firstIncompleteMatch.stage
      this.data.current.round = firstIncompleteMatch.round
    }
    return Promise.resolve()
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
MetadataInputsController.$inject = ['scoresheet', 'scores', '$scope', '$location', 'tournament', 'refIdentity', 'logger']

export default MetadataInputsController
