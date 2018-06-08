'use strict'

const AUTOSCROLL_SPEED = 0.05
const MISSION_SCROLL_OFFSET = -150

class ScoresheetController {

	constructor ($scope, $document, Configuration, Scoresheet) {
        this.$scope = $scope
        this.$document = $document
        this.Configuration = Configuration
		this.Scoresheet = Scoresheet
	}

	$onInit () {
        let self = this

        this.$scope.$on('mission complete', event => {
            let missionId = event.targetScope.mission.data.id
            let missionIndex = self.scoresheet.missions.findIndex(mission => mission.id === missionId)
            let nextMission = self.scoresheet.missions[missionIndex + 1]
            if(nextMission) {
                self.scrollToMission(nextMission)
            }
        })

        this.$scope.$on('load', (event, scoresheet) => {
            self.Scoresheet.load(scoresheet).then(scoresheet => {
                self.scoresheet = scoresheet
                self.missions = scoresheet.missions
            })
        })
        
        return this.Scoresheet.init().then(() => self.reset())
	 }

     score () {
        return this.Scoresheet.score()
     }

     complete () {
        if(!this.scoresheet)    return false
        let signatureMissing = this.Configuration.requireSignature && this.$scope.getSignature().isEmpty && !this.scoresheet._id
        return this.missions && this.missions.every(mission => mission.complete) && !signatureMissing
     }

     reset () {
        let self = this
        return this.Scoresheet.reset().then(scoresheet => {
            self.scoresheet = scoresheet
            self.missions = scoresheet.missions
            self.$scope.clearSignature()
            self.$scope.$apply()
            self.scrollToMission(self.scoresheet.missions[0])
        })
     }

     save () {
        let self = this
        this.Scoresheet.save().then(() => {
            self.scoresheet.signature = this.$scope.getSignature()
            if(self.scoresheet._id) {
                self.$scope.$emit('close scoresheet')
            }
            self.reset()
            self.$scope.$emit('notify', { level: 'success', message: 'Score saved successfully' })
        })
     }

     setDefault () {
        this.$scope.$broadcast('set default')
     }

	 scrollToMission (mission) {
        let missionsElement = this.$document[0].querySelector('scoresheet > .top-bar-page')
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

        let lastScorllPosition = undefined

        function scrollTick() {
            if(scrolling !== endingPosition) {
                return
            }
            if(missionsElement.scrollTop + tick < endingPosition && missionsElement.scrollTop !== lastScorllPosition) {
                lastScorllPosition = mission.scrollTop
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

ScoresheetController.$inject = ['$scope', '$document', 'Configuration', 'Scoresheet']

export default ScoresheetController
