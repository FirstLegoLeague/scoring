class EmptySlotController {
  constructor ($scope, scores, tournament, logger) {
    Object.assign(this, { $scope, scores, tournament, logger })
  }

  $onInit () {
    this.$scope.$on('enter move mode', (event, { id }) => {
      this.moveMode = true
      this._id = id
    })

    this.$scope.$on('exit move mode', () => {
      this.moveMode = false
      this._id = undefined
    })

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
    const score = this.scores.scores.find(s => s._id === this._id)
    score.stage = this.position.stage
    score.round = this.position.round
    score.teamNumber = this.position.teamNumber
    return this.scores.update(score)
      .then(() => score.load())
      .then(() => this.data.push(score))
      .then(() => this.$scope.$emit('exit move mode', { status: 'success' }))
  }
}

EmptySlotController.$$ngIsClass = true
EmptySlotController.$inject = ['$scope', 'Scores', 'Tournament', 'Logger']

export default EmptySlotController
