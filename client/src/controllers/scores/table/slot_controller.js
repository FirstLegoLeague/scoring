/* global angular */

class SlotController {
  constructor (scoreMove) {
    Object.assign(this, { scoreMove })
  }

  length () {
    return this.data.length
  }

  $onInit () {
    this.scoreMove.on('moved', ({ score, position }) => {
      if (angular.equals(this.position, position)) {
        this.data.push(score)
      } else {
        this.data = this.data.filter(s => s._id !== score._id)
      }
    })
  }
}

SlotController.$$ngIsClass = true
SlotController.$inject = ['ScoreMove']

export default SlotController
