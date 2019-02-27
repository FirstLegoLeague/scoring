class Rankings {
  constructor (independence, scores, tournament, messanger, configuration, notifications) {
    Object.assign(this, { independence, scores, tournament, messanger, configuration, notifications })
    this.ranks = []
  }

  load (stage) {
    return Promise.all([this.configuration.load(), this.tournament.loadTeams()])
      .then(() => this.independence.send('GET', `${this.configuration.rankingsUrl}/rankings.json?stage=${stage}`))
      .then(response => response.data)
      .then(ranks => {
        this.ranks = ranks
        this.ranks.forEach(rank => {
          rank.scores = this.scores.scores
            .filter(score => score.teamNumber === rank.team.number && score.stage === stage)
            .reduce((arr, score) => {
              arr[score.round - 1].push(score)
              return arr
            }, Array.apply(null, { length: rank.scores.length }).map(() => ([])))

          rank.team = this.tournament.teams.find(team => team.number === rank.team.number)
        })
        console.log(this.ranks)
        return this.ranks
      })
  }
}

Rankings.$$ngIsClass = true
Rankings.$inject = ['Independence', 'Scores', 'Tournament', 'Messanger', 'Configuration', 'Notifications']

export default Rankings
