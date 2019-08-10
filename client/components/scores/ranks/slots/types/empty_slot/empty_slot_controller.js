class EmptySlotController {
  constructor ($scope, scores, tournament, logger, notifications) {
    Object.assign(this, { $scope, scores, tournament, logger, notifications })
  }

  $onInit () {
    this.scoresheetUrl = `#!/scoresheet/new?teamNumber=${this.position.teamNumber}&stage=${this.position.stage}&round=${this.position.round}`

    this.tournament.loadTeamMatches(this.position.teamNumber)
      .then(matches => {
        this.matchId = matches.find(match => match.round === this.position.round && match.stage === this.position.stage)._id
      })
      .catch(error => this.logger.error(error))
  }

  createEmpty () {
    const score = new this.scores.Score(this.position)
    score.fakeSignature()
    score.fillDefaults()
    this.scores.create(score)
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  createNoShow () {
    this.scores.create(Object.assign({ noShow: true }, this.position))
      .then(score => this.data.push(score))
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }
}

EmptySlotController.$$ngIsClass = true
EmptySlotController.$inject = ['$scope', 'scores', 'tournament', 'logger', 'notifications']

export default EmptySlotController
