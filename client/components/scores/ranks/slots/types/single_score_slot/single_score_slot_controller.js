import Promise from 'bluebird'

class SingleScoreSlotController {
  constructor ($location, scores, tournament, logger, notifications, $scope) {
    Object.assign(this, { $location, scores, tournament, logger, notifications, $scope })
    this.ready = false
  }

  $onInit () {
    Promise.all([this.data[0].load(), this.scores.init(), this.tournament.init().then(() => this.tournament.loadTeams())])
      .then(() => { this.ready = true })
      .catch(error => this.logger.error(error))
  }

  update (attrs) {
    Object.assign(this.data[0], attrs)
    this.save()
  }

  save () {
    this.ready = false
    this.scores.update(this.data[0])
      .then(() => this.data[0].load())
      .then(() => { this.ready = true })
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  startMovement () {
    this.moving = true
  }

  resolveMovement (position) {
    if (position) {
      this.ready = false
      const score = this.data[0]
      this.update(position)
      this.$scope.$emit('calc rank', { score })
    } else {
      this.moving = false
    }
  }
}

SingleScoreSlotController.$$ngIsClass = true
SingleScoreSlotController.$inject = ['$location', 'scores', 'tournament', 'logger', 'notifications', '$scope']

export default SingleScoreSlotController
