class ScoresFiltersController {
  constructor (tournament, scores, $scope, logger) {
    Object.assign(this, { tournament, scores, $scope, logger })
  }

  $onInit () {
    this.$scope.$on('open scores with filters', (event, filters) => {
      Object.assign(this.data, {
        teams: this.tournament.teams
          .filter(team => filters.teams.includes(team.number)),
        rounds: this.rounds
          .filter(round1 => filters.rounds.some(round2 => round1.round === round2.round && round1.stage === round2.stage)),
        referees: this.referees
          .filter(team => filters.teams.includes(team.numbers)),
        tables: this.tournament.tables
          .filter(table => filters.tables.includes(table)),
        showDuplicates: filters.showDuplicates,
        showErrors: filters.showErrors,
        showPublic: filters.showPublic
      })
    })

    this.scores.on('scores updated', () => this._loadOptions())
    this.tournament.loadTables()
    return Promise.all([this.scores.init(), this.tournament.loadTeams()])
      .then(() => this._loadOptions())
      .catch(error => this.logger.error(error))
  }

  teamText (team) {
    return team.displayText
  }

  roundText (round) {
    return round.displayText
  }

  refereeText (referee) {
    return referee
  }

  tableText (table) {
    return table.tableName
  }

  _loadOptions () {
    this.teamsByNumber = Array.from(this.tournament.teams)
    this.teamsByName = Array.from(this.tournament.teams).sort((team1, team2) => team1.name > team2.name ? 1 : -1)

    this.rounds = this.scores.scores.reduce((rounds, score) => {
      if (rounds.every(round => round.stage !== score.stage || round.round !== score.round)) {
        rounds.push({ stage: score.stage, round: score.round, displayText: `${score.stage} #${score.round}` })
      }
      return rounds
    }, this.rounds || [])

    this.referees = this.scores.scores.reduce((referees, score) => {
      if (score.referee && !referees.includes(score.referee)) {
        referees.push(score.referee)
      }
      return referees
    }, this.referees || [])
  }
}

ScoresFiltersController.$$ngIsClass = true
ScoresFiltersController.$inject = ['Tournament', 'Scores', '$scope', 'Logger']

export default ScoresFiltersController
