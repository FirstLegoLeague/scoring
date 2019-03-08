class ScoresStageController {
  constructor (tournament) {
    Object.assign(this, { tournament })
  }

  $onInit () {
    this.ready = false
    Promise.all([this.tournament.loadCurrentStage(), this.tournament.loadStages()])
      .then(([data, options]) => {
        Object.assign(this, { data, options })
        this.ready = true
      })
      .catch(error => console.error(error))
  }
}

ScoresStageController.$$ngIsClass = true
ScoresStageController.$inject = ['Tournament']

export default ScoresStageController
