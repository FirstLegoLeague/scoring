const AUTOSCROLL_SPEED = 0.05
const MISSION_SCROLL_OFFSET = -150

const MISSIONS_ELEMENTS = '#missions'

class MissionsScroll {
  constructor ($window, $document) {
    Object.assign(this, { $window, $document })
    this.restrict = 'A'
  }

  link (scope, element, attrs) {
    scope[attrs.on] = this.scrollToMission.bind(this)

    scope.$on(attrs.missionCompleteEvent, event => {
      const missions = scope.scoresheet.missions()
      const missionId = event.targetScope.mission.data.id
      const nextMissionIndex = missions.findIndex(mission => mission.id === missionId) + 1

      if (!scope.defaulting || nextMissionIndex === missions.length) {
        const nextMission = missions[nextMissionIndex]
        this.scrollToMission(nextMission)
        scope.defaulting = false
      }
    })
  }

  scrollToMission (mission) {
    const missionsElement = this.$document[0].querySelector(MISSIONS_ELEMENTS)
    const startingPosition = missionsElement.scrollTop
    let endingPosition = startingPosition

    if (mission) {
      const missionElement = this.$document[0].getElementById(mission.id)
      endingPosition = Math.min(missionElement.offsetTop + MISSION_SCROLL_OFFSET,
        missionsElement.scrollHeight - missionsElement.clientHeight)
    } else {
      endingPosition = missionsElement.scrollHeight - missionsElement.offsetHeight
    }

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
}

MissionsScroll.$$ngIsClass = true
MissionsScroll.$inject = ['$window', '$document']

export default MissionsScroll
