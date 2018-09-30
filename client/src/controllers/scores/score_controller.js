const MIN_LOADING_TIME = 50

class ScoreController {
  constructor ($scope, scores, tournament, modals) {
    Object.assign(this, { $scope, scores, tournament, modals })
    this.ready = false
  }

  $onInit () {
    this.$scope.$on('reset', () => {
      this.ready = false
      this.load()
    })

    this.load()
  }

  load () {
    return Promise.all([this.tournament.loadTeamMatches(this.data.teamNumber), this.tournament.loadTeams(), this.tournament.loadTables()])
      .then(([matches]) => {
        this.matches = matches
        this.ready = true
      })
  }

  // Views

  teamText () {
    if (!this.ready) {
      this.data.teamText = ''
    } else if (this.teamNumberError()) {
      this.data.teamText = 'Missing team!'
    } else {
      this.data.teamText = this.tournament.teams.find(team => team.number === this.data.teamNumber).displayText
    }
    return this.data.teamText
  }

  matchText () {
    if (!this.ready) {
      this.data.matchText = ''
    } else if (this.matchError()) {
      this.data.matchText = 'Missing round'
    } else {
      this.data.matchText = this.matches.find(match => match.round === this.data.round && match.stage === this.data.stage).displayText
    }
    return this.data.matchText
  }

  tableText () {
    if (typeof this.data.tableId !== 'undefined') {
      const table = this.tournament.tables.find(t => t.tableId === this.data.tableId)
      this.data.tableText = table ? table.tableName : 'no table'
    } else {
      this.data.tableText = 'no table'
    }
    return this.data.tableText
  }

  matchError () {
    if (!this.ready) return false
    if (typeof this.data.round === 'undefined' && typeof this.data.stage === 'undefined') return true
    if (!this.matches) return false
    return this.matches.every(match => match.round !== this.data.round || match.stage !== this.data.stage)
  }

  teamNumberError () {
    if (!this.ready) return false
    if (typeof this.data.matchId === 'undefined') return true
    if (!this.teams) return false
    return this.tournament.teams.every(team => team.number !== this.data.teamNumber)
  }

  // Actions

  openDeletionDialog () {
    this.modals.open(`#score-${this.data._id} .deletion-modal`)
  }

  closeDeletionDialog () {
    this.modals.close(`#score-${this.data._id} .deletion-modal`)
  }

  delete () {
    this.closeDeletionDialog()
    this.deleting = true
    return this.scores.delete(this.data._id)
  }

  togglePublish () {
    this.togglingPublish = true
    return this.scores.update(this.data._id, { public: !this.data.public })
      .then(() => {
        setTimeout(() => { this.togglingPublish = false }, MIN_LOADING_TIME)
      })
  }

  updateMatch () {
    return this.tournament.loadTeamMatches(this.data.teamNumber)
      .then(matches => {
        this.matches = matches
        this.data.matchId = matches.find(match => match.stage === this.data.stage && match.round === this.data.round)._id
      })
      .then(() => this.save())
  }

  setMatch () {
    const match = this.matches.find(m => m._id === this.data.matchId)
    this.data.stage = match.stage
    this.data.round = match.round
    return this.save()
  }

  open () {
    this.$scope.$emit('open scoresheet', this.data)
  }

  save () {
    this.ready = false
    const match = this.matches.find(m => m.stage === this.data.stage && m.round === this.data.round)
    const updateData = {
      score: this.data.score,
      teamNumber: this.data.teamNumber,
      stage: match.stage,
      round: match.round,
      matchId: match._id,
      tableId: this.data.tableId,
      referee: this.data.referee
    }

    return this.scores.update(this.data._id, updateData)
      .then(() => setTimeout(() => { this.ready = true }, MIN_LOADING_TIME))
  }
}

ScoreController.$$ngIsClass = true
ScoreController.$inject = ['$scope', 'Scores', 'Tournament', 'Modals']

export default ScoreController
