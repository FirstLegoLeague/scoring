class Tournament {
  constructor (independence, configuration, messanger, user) {
    Object.assign(this, { independence, configuration, messanger })
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
        .then(() => this.independence.send('GET', `${this.tournamentUrl}/team/all`, this.httpRequestConfig))
        .then(response => response.data.map(team => Object.assign(team, { displayText: `#${team.number} ${team.name}` })))
        .then(teams => {
          this.teams = teams
            .sort((team1, team2) => team1.number - team2.number)
          return teams
        })
    }

    return this._teamsPromise
  }

  loadTables (force) {
    if (!this._tablesPromise || force) {
      this._tablesPromise = this.init()
        .then(() => this.independence.send('GET', `${this.tournamentUrl}/table/all`, this.httpRequestConfig))
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
        .then(() => this.independence.send('GET', `${this.tournamentUrl}/team/${teamNumber}/matches`, this.httpRequestConfig))
        .catch(err => {
          this._teamsMathcesPromises[teamNumber] = undefined
          throw err
        })
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

  loadNextMatchForTable (tableId) {
    return this.init()
      .then(() => this.independence.send('GET', `${this.tournamentUrl}/match/upcoming/table/${tableId}`))
      .then(response => {
        const tableMatch = response.data
        if (tableMatch !== null) {
          return {
            teamNumber: tableMatch.matchTeams.find(matchTeam => matchTeam.tableId === tableId).teamNumber,
            matchId: tableMatch._id
          }
        } else {
          return { teamNumber: null, matchId: null }
        }
      })
  }
}

Tournament.$$ngIsClass = true
Tournament.$inject = ['Independence', 'Configuration', 'Messanger', 'User']

export default Tournament
