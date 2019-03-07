class ScoresFiltersController {
  constructor (tournament, scores, $scope) {
    Object.assign(this, { tournament, scores, $scope })
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
    this.tournament.loadTeams()
    this.tournament.loadTables()
    this.scores.init().then(() => this._loadOptions()).catch(error => console.error(error))
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
ScoresFiltersController.$inject = ['Tournament', 'Scores', '$scope']

export default ScoresFiltersController
