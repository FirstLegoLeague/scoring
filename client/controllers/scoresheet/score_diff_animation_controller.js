const DIFF_ANIMATION_ELEMENT = 'score-diff-animation'
const DIFF_ANIMATION_CLASS = 'ng-hide-animate'

class ScoreDiffAnimationController {
  constructor (scoresheet, $window, $document, $scope, $timeout) {
    Object.assign(this, { data: scoresheet, $window, $document, $scope, $timeout })
    this.lastScore = 0
  }

  $onInit () {
    this.$scope.$watch(() => this.data.current ? this.data.current.score : 0, score => {
      this.scoreDiff = score - this.lastScore
      if (isFinite(this.scoreDiff) && this.scoreDiff > 0) {
        this.visible = true
        this.$window.requestAnimationFrame(() => {
          const animationElement = this.$document[0].getElementById(DIFF_ANIMATION_ELEMENT)
          animationElement.classList.add(DIFF_ANIMATION_CLASS)
          this.$timeout(() => {
            animationElement.classList.remove(DIFF_ANIMATION_CLASS)
            this.visible = false
          })
        })
      }

      this.lastScore = score
    })
  }
}

ScoreDiffAnimationController.$$ngIsClass = true
ScoreDiffAnimationController.$inject = ['Scoresheet', '$window', '$document', '$scope', '$timeout']

export default ScoreDiffAnimationController
