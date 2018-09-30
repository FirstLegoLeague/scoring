class ScoresheetMenuController {
  constructor (Scoresheet, Configuration) {
    Object.assign(this, { data: Scoresheet, Configuration })
  }

  $onInit () {
    return Promise.all([this.data.init(), this.Configuration.load()])
  }

  showRefIdentity () {
    return this.Configuration.requireRef || this.Configuration.requireTable
  }
}

ScoresheetMenuController.$$ngIsClass = true
ScoresheetMenuController.$inject = ['Scoresheet', 'Configuration']

export default ScoresheetMenuController
