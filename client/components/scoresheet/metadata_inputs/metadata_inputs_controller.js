import Promise from 'bluebird'

class MetadataInputsController {
  constructor (scoresheet, $scope, $location, logger) {
    Object.assign(this, { data: scoresheet, $scope, $location, logger })
  }

  $onInit () {
    this.data.init()
      .catch(error => this.logger.error(error))
  }

  teamNumber () {
    return this.data.current ? this.data.current.teamNumber : undefined
  }
}

MetadataInputsController.$$ngIsClass = true
MetadataInputsController.$inject = ['scoresheet', '$scope', '$location', 'logger']

export default MetadataInputsController
