import EventEmitter from 'event-emitter-es6'
import Promise from 'bluebird'

class Tournament extends EventEmitter {
  constructor (independence, configuration, messanger, user, logger) {
    super()
    Object.assign(this, { independence, configuration, messanger, logger })
    this.httpRequestConfig = { headers: { 'auth-token': user.authToken } }
    this._teamsMathcesPromises = { }
    this.matches = { }
    this._stageRoundsPsomises = { }
    this.stageRounds = { }
  }

  init () {
    return this.configuration.load().then(config => {
      this.tournamentUrl = config.tournamentUrl
      this.messanger.on('teams:reload', () => this.loadTeams(true))
      this.messanger.on('tournamentStage:reload', ({ data }) => {
        this._currentStagePromise = Promise.resolve(data)
      })
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
          return this.teams
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

  loadNextTeamForTable (tableId, lastMatchId) {
    return this.init()
      .then(() => this.independence.send('GET', `${this.tournamentUrl}/match/upcoming/table/${tableId}/2`))
      .then(response => {
        const tableMatches = response.data
        const nextMatch = tableMatches.find(match => match._id !== lastMatchId)
        if (nextMatch) {
          return nextMatch.matchTeams.find(matchTeam => matchTeam.tableId === tableId).teamNumber
        } else {
          return null
        }
      })
      .catch(error => this.logger.error(error))
  }

  loadStages () {
    if (!this._stagesPromise) {
      this._stagesPromise = this.init()
        .then(() => this.independence.send('GET', `${this.tournamentUrl}/settings/stages`))
        .then(response => {
          this.stages = response.data
          return this.stages
        })
        .catch(error => this.logger.error(error))
    }
    return this._stagesPromise
  }

  loadRoundsForStage (stage) {
    if (!this._stageRoundsPsomises[stage]) {
      const capitalizedStage = stage.charAt(0).toUpperCase() + stage.slice(1)
      this._stageRoundsPsomises[stage] = this.init()
        .then(() => this.independence.send('GET', `${this.tournamentUrl}/settings/numberOf${capitalizedStage}Rounds`))
        .then(response => {
          this.stageRounds[stage] = response.data
          return this.stageRounds[stage]
        })
        .catch(error => this.logger.error(error))
    }
    return this._stageRoundsPsomises[stage]
  }

  loadCurrentStage () {
    if (!this._currentStagePromise) {
      this._currentStagePromise = this.init()
        .then(() => this.independence.send('GET', `${this.tournamentUrl}/settings/tournamentStage`))
        .then(response => response.data)
        .catch(error => this.logger.error(error))
    }
    return this._currentStagePromise
  }
}

Tournament.$$ngIsClass = true
Tournament.$inject = ['independence', 'configuration', 'messanger', 'user', 'logger']

export default Tournament
