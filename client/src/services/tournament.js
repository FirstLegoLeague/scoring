class Tournament {
  constructor ($http, configuration, messanger, user) {
    Object.assign(this, { $http, configuration, messanger })
    this.httpRequestConfig = { headers: { 'auth-token': user.authToken } }
    this._teamsMathcesPromises = { }
    this.matches = { }
  }

  init () {
    return this.configuration.load().then(config => {
      this.tournamentUrl = config.tournamentUrl
      this.messanger.on('teams:reload', () => this.teams(true))
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
        .then(() => this.$http.get(`${this.tournamentUrl}/team/${teamNumber}/matches`, this.httpRequestConfig))
        .then(matchesResponse => {
          const matches = matchesResponse.data
          let stage = null
          let round = 0
          matches.forEach(match => {
            if (match.stage !== stage) {
              stage = match.stage
              round = 1
            }
            match.round = round
            match.displayText = `${match.stage} #${round}`
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
Tournament.$inject = ['$http', 'Configuration', 'Messanger', 'User']

export default Tournament
