class ScoreController {
  constructor ($scope, $timeout, scores, tournament, modals) {
    Object.assign(this, { $scope, $timeout, scores, tournament, modals })
    this.ready = false
  }

  $onInit () {
    this.$scope.$on('reset', () => {
      this.ready = false
      this.data.load()
    })

    this.data.init()
  }

  // Actions

  openDeletionDialog () {
    this.modals.open(`#score-${this.data._id} .deletion-modal`)
  }

  closeDeletionDialog () {
    this.modals.close(`#score-${this.data._id} .deletion-modal`)
  }

  delete () {
    this.closeDeletionDialog()
    this.deleting = true
    return this.scores.delete(this.data._id)
      .then(() => this.$scope.$parent.$apply())
  }

  togglePublish () {
    this.togglingPublish = true
    return this.scores.update(this.data._id, { public: !this.data.public })
      .then(() => {
        this.$timeout(() => { this.togglingPublish = false })
      })
  }

  updateMatch () {
    return this.data.updateMatch()
      .then(() => this.save())
  }

  setMatch () {
    const match = this.data.matches.find(m => m._id === this.data.matchId)
    this.data.stage = match.stage
    this.data.round = match.round
    return this.save()
  }

  open () {
    this.$scope.$emit('open scoresheet', this.data)
  }

  save () {
    this.data.ready = false
    const match = this.data.matches.find(m => m.stage === this.data.stage && m.round === this.data.round)
    const updateData = {
      score: this.data.score,
      teamNumber: this.data.teamNumber,
      stage: match.stage,
      round: match.round,
      matchId: match._id,
      tableId: this.data.tableId,
      referee: this.data.referee
    }

    return this.scores.update(this.data._id, updateData)
      .then(() => this.data.load())
      .then(() => this.$scope.$apply())
  }
}

ScoreController.$$ngIsClass = true
ScoreController.$inject = ['$scope', '$timeout', 'Scores', 'Tournament', 'Modals']

export default ScoreController
