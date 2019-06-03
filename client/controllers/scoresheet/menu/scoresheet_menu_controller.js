class ScoresheetMenuController {
  constructor (scoresheet, configuration) {
    Object.assign(this, { data: scoresheet, configuration })
  }

  $onInit () {
    return Promise.all([this.data.init(), this.configuration.load()])
  }

  showRefIdentity () {
    return this.configuration.requireRef || this.configuration.requireTable
  }
}

ScoresheetMenuController.$$ngIsClass = true
ScoresheetMenuController.$inject = ['Scoresheet', 'Configuration']

export default ScoresheetMenuController
