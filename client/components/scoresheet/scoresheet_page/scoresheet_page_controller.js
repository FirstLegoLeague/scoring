class ScoresheetPageController {
  constructor (scoresheet, logger) {
    Object.assign(this, { data: scoresheet, logger })
    this.ready = false
  }

  $onInit () {
    this.data.init()
      .then(() => { this.ready = true })
      .catch(error => this.logger.error(error))
  }
}

ScoresheetPageController.$$ngIsClass = true
ScoresheetPageController.$inject = ['scoresheet', 'logger']

export default ScoresheetPageController
