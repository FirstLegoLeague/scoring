const AUTOSCROLL_SPEED = 0.05
const MISSION_SCROLL_OFFSET = -150

const MISSIONS_ELEMENTS = '#missions'

class MissionsScroll {
  constructor ($window, $document, scoresheet) {
    Object.assign(this, { $window, $document, scoresheet })
    this.restrict = 'A'
  }

  link (scope, element, attrs) {
    scope[attrs.on] = this.scrollToMission.bind(this)

    scope.$on(attrs.missionCompleteEvent, event => {
      const missions = this.scoresheet.current.missions
      const missionId = event.targetScope.mission.data.id
      const nextMissionIndex = missions.findIndex(mission => mission.id === missionId) + 1
      if (!scope.scrollDisabled && (!attrs.scrollEnabled || scope.$eval(attrs.scrollEnabled)) && nextMissionIndex < missions.length) {
        const nextMission = missions[nextMissionIndex]
        this.scrollToMission(nextMission)
        scope.scrollDisabled = false
      }
    })

    scope.$on(attrs.scoresheetCompleteEvent, event => {
      this.scrollToEnd()
    })
  }

  scrollToMission (mission) {
    const missionsElement = this.missionsElement()
    let endingPosition = 0
    if (mission) {
      const missionElement = this.$document[0].getElementById(mission.id)
      endingPosition = Math.min(missionElement.offsetTop + MISSION_SCROLL_OFFSET,
        missionsElement.scrollHeight - missionsElement.clientHeight)
    } else {
      endingPosition = missionsElement.scrollHeight - missionsElement.offsetHeight
    }

    this.scrollTo(endingPosition)
  }

  scrollToEnd () {
    const missionsElement = this.missionsElement()
    this.scrollTo(missionsElement.scrollHeight - missionsElement.clientHeight)
  }

  scrollTo (endingPosition) {
    const missionsElement = this.missionsElement()
    const startingPosition = missionsElement.scrollTop

    const tick = (endingPosition - startingPosition) * AUTOSCROLL_SPEED
    let scrolling = endingPosition

    let lastScorllPosition

    const scrollTick = () => {
      if (scrolling !== endingPosition) {
        return
      }
      if (missionsElement.scrollTop + tick < endingPosition && missionsElement.scrollTop !== lastScorllPosition) {
        lastScorllPosition = missionsElement.scrollTop
        missionsElement.scrollTop += tick
        this.$window.requestAnimationFrame(scrollTick)
      } else {
        missionsElement.scrollTop = endingPosition
        scrolling = undefined
      }
    }

    this.$window.requestAnimationFrame(scrollTick)
  }

  missionsElement () {
    // If there is not missions element cached or the cached element is detached, reload it
    if (!this._missionsElement || !this._missionsElement.parent) {
      this._missionsElement = this.$document[0].querySelector(MISSIONS_ELEMENTS)
    }
    return this._missionsElement
  }
}

MissionsScroll.$$ngIsClass = true
MissionsScroll.$inject = ['$window', '$document', 'scoresheet']

export default MissionsScroll
