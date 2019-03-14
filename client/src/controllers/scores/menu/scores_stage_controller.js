class ScoresStageController {
  constructor (tournament, logger) {
    Object.assign(this, { tournament, logger })
  }

  $onInit () {
    this.ready = false
    Promise.all([this.tournament.loadCurrentStage(), this.tournament.loadStages()])
      .then(([data, options]) => {
        Object.assign(this, { data, options })
        this.ready = true
      })
      .catch(error => this.logger.error(error))
  }
}

ScoresStageController.$$ngIsClass = true
ScoresStageController.$inject = ['Tournament', 'Logger']

export default ScoresStageController
