class ScoreController {
  constructor ($scope, $timeout, scores, tournament, modals) {
    Object.assign(this, { $scope, $timeout, scores, tournament, modals })
  }

  $onInit () {
    this.$scope.$on('reset', (event, id) => {
      if (id === undefined) {
        return this.data.load()
      } else if (id === this.data._id) {
        return this.data.reloadFromServer()
          .then(() => this.data.load())
      }
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
      .then(() => this.data.load())
      .then(() => {
        this.$timeout(() => { this.togglingPublish = false })
      })
  }

  toggleNoShow () {
    this.togglingNoShow = true
    const newNoShow = !this.data.noShow
    return this.scores.update(this.data._id, { noShow: newNoShow, score: newNoShow ? 0 : this.data.score })
      .then(() => this.data.load())
      .then(() => {
        this.$timeout(() => { this.togglingNoShow = false })
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
    const match = this.data.matches.find(m => m.stage === this.data.stage && m.round === this.data.round)
    const updateData = {
      score: this.data.score,
      teamNumber: this.data.teamNumber,
      stage: match.stage,
      round: match.round,
      matchId: match._id,
      tableId: this.data.tableId,
      referee: this.data.referee,
      noShow: this.data.noShow && this.score === 0
    }

    return this.scores.update(this.data._id, updateData)
      .then(() => this.data.load())
      .then(() => this.$scope.$apply())
  }
}

ScoreController.$$ngIsClass = true
ScoreController.$inject = ['$scope', '$timeout', 'Scores', 'Tournament', 'Modals']

export default ScoreController
