class Tournament {
  constructor ($http, Configuration, Scores, Messanger, User) {
    Object.assign(this, { $http, Configuration, Scores, Messanger, User })
    this.httpRequestConfig = { headers: { 'auth-token': User.authToken } }
    this._teamsMathcesPromises = { }
    this.matches = { }
  }

  init () {
    return this.Configuration.load().then(config => {
      this.tournamentUrl = config.tournamentUrl
      this.Messanger.on('teams:reload', () => this.teams(true))
      return this
    })
  }

  loadTeams (force) {
    if (!this._teamsPromise || force) {
      this._teamsPromise = this.init()
        .then(() => this.$http.get(`${this.tournamentUrl}/team/all`, this.httpRequestConfig))
        .then(response => response.data.map(team => Object.assign(team, { displayText: `#${team.number} ${team.name}` })))
        .then(teams => {
          this.teams = teams
            .sort((team1, team2) => team2.number - team1.number)
          return teams
        })
    }

    return this._teamsPromise
  }

  loadTables (force) {
    if (!this._tablesPromise || force) {
      this._tablesPromise = this.init()
        .then(() => this.$http.get(`${this.tournamentUrl}/table/all`, this.httpRequestConfig))
        .then(response => response.data)
        .then(tables => {
          this.tables = tables
          return tables
        })
    }
    return this._tablesPromise
  }

  loadTeamMatches (teamNumber, force) {
    if (!this._teamsMathcesPromises[teamNumber] || force) {
      this._teamsMathcesPromises[teamNumber] = this.init()
        .then(() =>
          Promise.all([this.$http.get(`${this.tournamentUrl}/team/${teamNumber}/matches`, this.httpRequestConfig),
            this.Scores.all()]))
        .then(([matchesResponse, scores]) => {
          const matches = matchesResponse.data
          let stage = matches[0].stage
          let round = 1
          matches.forEach(match => {
            if (match.stage !== stage) {
              round = 1
              stage = match.stage
            }
            match.round = round
            match.complete = scores.some(score => score.teamNumber === teamNumber && score.matchId === match._id)
            match.displayText = `${match.stage} #${round}`
            match.displayTextWithCompletion = `${match.displayText} ${match.complete ? '✔' : ''}`
            round++
          })
          this.matches[teamNumber] = matches
          return matches
        })
    }

    return this._teamsMathcesPromises[teamNumber]
  }
}

Tournament.$$ngIsClass = true
Tournament.$inject = ['$http', 'Configuration', 'Scores', 'Messanger', 'User']

export default Tournament
