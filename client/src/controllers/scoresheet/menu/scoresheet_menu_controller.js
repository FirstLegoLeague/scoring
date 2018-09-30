class ScoresheetMenuController {
  constructor (Configuration) {
    Object.assign(this, { Configuration })
  }

  $onInit () {
    return this.Configuration.load()
  }

  showRefIdentity () {
    return this.Configuration.requireRef || this.Configuration.requireTable
  }
}

ScoresheetMenuController.$$ngIsClass = true
ScoresheetMenuController.$inject = ['Configuration']

export default ScoresheetMenuController
