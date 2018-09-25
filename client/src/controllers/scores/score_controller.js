const MIN_LOADING_TIME = 50

class ScoreController {
  constructor ($scope, Scores, Tournament, Modals, Notifications) {
    Object.assign(this, { $scope, Scores, Tournament, Modals, Notifications })
    this.ready = false
    this.loading = false
  }

  $onInit () {
    this.$scope.$on('reset', () => {
      this.ready = false
      this.load()
    })

    this.load()
  }

  load () {
    return Promise.all([this.Tournament.loadTeamMatches(this.data.teamNumber), this.Tournament.loadTeams(), this.Tournament.loadTables()])
      .then(([matches]) => {
        this.matches = matches
        this.ready = true
      })
  }

  // Views

  teamText () {
    if (this.loading) {
      this.data.teamText = ''
    } else if (this.teamNumberError()) {
      this.data.teamText = 'Missing team!'
    } else {
      this.data.teamText = this.Tournament.teams.find(team => team.number === this.data.teamNumber).displayText
    }
    return this.data.teamText
  }

  matchText () {
    if (this.loading) {
      this.data.matchText = ''
    } else if (this.matchError()) {
      this.data.matchText = 'Missing round'
    } else {
      this.data.matchText = this.matches.find(match => match._id === this.data.matchId).displayText
    }
    return this.data.matchText
  }

  tableText () {
    if (typeof this.data.tableId !== 'undefined') {
      this.data.tableText = this.Tournament.tables.find(table => table.tableId === this.data.tableId).tableName
    } else {
      this.data.tableText = 'no table'
    }
    return this.data.tableText
  }

  matchError () {
    if (this.loading) return false
    if (typeof this.data.matchId === 'undefined') return true
    if (!this.matches) return false
    return this.matches.every(match => match._id !== this.data.matchId)
  }

  teamNumberError () {
    if (this.loading) return false
    if (typeof this.data.matchId === 'undefined') return true
    if (!this.teams) return false
    return this.Tournament.teams.every(team => team.number !== this.data.teamNumber)
  }

  // Actions

  openDeletionDialog () {
    this.Modals.open(`#score-${this.data._id} .deletion-modal`)
  }

  closeDeletionDialog () {
    this.Modals.close(`#score-${this.data._id} .deletion-modal`)
  }

  delete () {
    this.closeDeletionDialog()
    this.deleting = true
    return this.Scores.delete(this.data._id)
  }

  togglePublish () {
    this.togglingPublish = true
    return this.Scores.update(this.data._id, { public: !this.data.public })
      .then(() => {
        setTimeout(() => { this.togglingPublish = false }, MIN_LOADING_TIME)
      })
  }

  updateMatch () {
    return this.Tournament.loadTeamMatches(this.data.teamNumber)
      .then(matches => {
        this.matches = matches
        this.data.matchId = matches.find(match => match.stage === this.data.stage && match.round === this.data.round)._id
      })
      .then(() => this.save())
  }

  open () {
    this.$scope.$emit('open scoresheet', this.data)
  }

  save () {
    this.loading = true
    const match = this.matches.find(m => m._id === this.data.matchId)
    const updateData = {
      score: this.data.score,
      teamNumber: this.data.teamNumber,
      stage: match.stage,
      round: match.round,
      matchId: match._id,
      tableId: this.data.tableId,
      referee: this.data.referee
    }

    return this.Scores.update(this.data._id, updateData)
      .then(() => setTimeout(() => { this.loading = false }, MIN_LOADING_TIME))
  }
}

ScoreController.$$ngIsClass = true
ScoreController.$inject = ['$scope', 'Scores', 'Tournament', 'Modals', 'Notifications']

export default ScoreController
