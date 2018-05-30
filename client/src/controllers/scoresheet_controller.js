'use strict'

const AUTOSCROLL_SPEED = 0.02
const MISSION_SCROLL_OFFSET = -150

class ScoresheetController {

	constructor ($scope, $document, Scoresheet) {
		let self = this
        this.$document = $document
		this.Scoresheet = Scoresheet
        $scope.$on('mission complete', event => {
            let missionId = event.targetScope.mission.data.id
            let missionIndex = self.Scoresheet.challenge.missions.findIndex(mission => mission.id === missionId)
            let nextMission = self.Scoresheet.challenge.missions[missionIndex + 1]
            if(nextMission) {
                self.scrollToMission(nextMission)
            }
        })
	}

	$onInit() {
		let self = this
	    self.Scoresheet.load().then(scoresheet => {
			self.scoresheet = scoresheet
			self.missions = scoresheet.missions
			self.missions.forEach(mission => {
				mission.id = mission.title.split(' ')[0]
			})
		})
	 }

	 scrollToMission (mission) {
        let missionsElement = this.$document[0].getElementsByClassName('top-bar-page')[0]
        let startingPosition = missionsElement.scrollTop
        let endingPosition = startingPosition

        if(mission) {
            let missionElement = this.$document[0].getElementById(mission.id)
            if(!missionElement) {
                return
            }

            endingPosition = Math.min(missionElement.offsetTop + MISSION_SCROLL_OFFSET, missionsElement.scrollHeight - missionsElement.clientHeight)
        } else {
            endingPosition = 0
        }

        let tick = (endingPosition - startingPosition) * AUTOSCROLL_SPEED
        let scrolling = endingPosition

        function scrollTick() {
            if(scrolling !== endingPosition) {
                return
            }
            if(missionsElement.scrollTop + tick < endingPosition) {
                missionsElement.scrollTop += tick
                requestAnimationFrame(scrollTick)
            } else {
                missionsElement.scrollTop = endingPosition
                scrolling = undefined
            }
        }
        requestAnimationFrame(scrollTick)
	 }

}

ScoresheetController.$inject = ['$scope', '$document', 'Scoresheet']

export default ScoresheetController
