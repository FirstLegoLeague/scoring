class EmptySlotController {
  constructor ($scope, scores, tournament, logger, scoreMove) {
    Object.assign(this, { $scope, scores, tournament, logger, scoreMove })
  }

  $onInit () {
    this.tournament.loadTeamMatches(this.position.teamNumber)
      .then(matches => {
        this.matchId = matches.find(match => match.round === this.position.round && match.stage === this.position.stage)._id
      })
      .catch(error => this.logger.error(error))
  }

  createInScoresheet () {
    this.$scope.$emit('open scoresheet', this.scores.score(this.position))
  }

  createHere () {
    const score = this.scores.score(this.position)
    score.fakeSignature()
    score.fillDefaults()
    this.scores.create(score)
  }

  createWithNoShow () {
    this.scores.create(Object.assign({ noShow: true }, this.position))
      .then(score => this.data.push(score))
      .catch(error => this.logger.error(error))
  }

  moveScoreHere () {
    this.scoreMove.move(this.position)
      .then(score => this.data.push(score))
      .catch(error => this.logger.error(error))
  }
}

EmptySlotController.$$ngIsClass = true
EmptySlotController.$inject = ['$scope', 'Scores', 'Tournament', 'Logger', 'ScoreMove']

export default EmptySlotController
