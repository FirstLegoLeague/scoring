'use strict'

const AUTOSCROLL_SPEED = 0.05
const SCORE_DIFF_SPEEFD = -0.05
const SCORE_DIFF_ENDING_POSITION = -100
const SCORE_DIFF_STARTING_POSITION = 100
const MISSION_SCROLL_OFFSET = -150

const MISSIONS_ELEMENTS = 'scoresheet > .top-bar-page'
const DIFF_ANIMATION_ELEMENT = 'score-diff-animation'
const DIFF_ANIMATION_CLASS = 'ng-hide-animate'

class ScoresheetController {

    constructor($scope, $document, $timeout, Configuration, Scoresheet, Tournament, Notifications, User) {
        this.$scope = $scope
        this.$document = $document
        this.$timeout = $timeout
        this.Configuration = Configuration
        this.Scoresheet = Scoresheet
        this.Tournament = Tournament
        this.Notifications = Notifications
        this.isAdmin = User.isAdmin()
        this.isRef = User.isRef()
        this.scoreDiff = 0
        this.showingScoreDiffAnimation = false
    }

    $onInit() {
        let self = this

        this.$scope.$on('mission complete', event => {
            let missionId = event.targetScope.mission.data.id
            let missionIndex = self.scoresheet.missions.findIndex(mission => mission.id === missionId)
            let nextMission = self.scoresheet.missions[missionIndex + 1]
            if (nextMission) {
                self.scrollToMission(nextMission)
            }
        })

        this.$scope.$on('load', (event, scoresheet) => {
            self.Scoresheet.load(scoresheet).then(scoresheet => {
                self.scoresheet = scoresheet
                self.missions = scoresheet.missions
                self.Tournament.teams().then(teams => {
                    self.team = teams.find(team => team.number === self.scoresheet.teamNumber).displayText
                })
                self.signatureMissing = false
            })
        })

        this.$scope.$watch(() => this.team, () => {
            if (this.team) {
                self.scoresheet.teamNumber = Number(this.team.match(/^#(\d+)/)[1])
                self.Tournament.teamsMatches(self.scoresheet.teamNumber).then(matches => {
                    self._matches = matches
                })
                self.processErrors()
            }
        })

        this.$scope.$watch(() => this.match, () => {
            if (this.match) {
                self.scoresheet.match = this.match.replace('✔', '').trim()
                self.processErrors()
            }
        })

        this.Configuration.load().then(config => {
            if (config.requireSignature) {
                this.$scope.$watch(() => this.$scope.getSignature().dataUrl, () => {
                    if (self.scoresheet) {
                        let signature = this.$scope.getSignature()
                        self.scoresheet.signature = signature
                        self.signatureMissing = signature.isEmpty && !self.scoresheet._id
                    }
                })
            }
        })

        return this.Scoresheet.init()
            .then(() => self.Tournament.teams())
            .then(teams => {
                self.teams = teams
            })
            .then(() => self.reset())
    }

    score() {
        if (!this.scoresheet) {
            return 0
        }

        let previousScore = this.scoresheet.score // This score is saved from the last calculation by the Scoresheet service
        let newScore = this.Scoresheet.score() // This score is the newly calculated score
        let scoreDiff = newScore - previousScore
        if (scoreDiff !== 0 && isFinite(scoreDiff)) {
            this.showScoreDiffAnimation(scoreDiff)
        }

        if (this.match && this.match.indexOf('✔') > -1) {
            return '"' + newScore.toString() + '"'
        }

        return newScore
    }

    error() {
        return this.Scoresheet.errors[0]
    }

    teamIsSelected() {
        let self = this

        return this.scoresheet && typeof self.scoresheet.teamNumber != 'undefined'
    }

    processErrors() {
        if (this.scoresheet) {
            this.Scoresheet.processErrors()
        }
    }

    complete() {
        if (!this.scoresheet) return false
        return this.missions
            && (!this.errors || this.errors.length === 0)
            && !this.signatureMissing && this.match
    }

    reset() {
        let self = this
        return this.Scoresheet.reset().then(scoresheet => {
            self.scoresheet = scoresheet
            self.missions = scoresheet.missions
            self.$scope.clearSignature()
            self.$scope.$apply()
            self.scrollToMission(self.scoresheet.missions[0])
            self.team = null
            self.match = null
            self._matches = null
        })
    }

    save() {
        let self = this

        this.Scoresheet.save().then(() => {
            self.$scope.$emit('close scoresheet', { goToScores: Boolean(self.scoresheet._id) })
            self.reset()
            self.Notifications.success('Score saved successfully')
        }).catch(err => {
            self.reset()
            let pendingScores = err.pendingRequestsCount
            let scoresWord = pendingScores > 1 ? 'scores' : 'score'
            self.Notifications.error(`Score submit failed. Don\'t worry, We\'re keeping
                an eye on your ${pendingScores} pending ${scoresWord}.`)
        })
    }

    setDefault() {
        this.$scope.$broadcast('set default')
    }

    selectedTeamMatches() {
        let self = this

        if (typeof self.scoresheet != 'undefined' && typeof self.scoresheet.teamNumber != 'undefined' && self._matches) {
            return self._matches
        }

        return []
    }

    showScoreDiffAnimation(scoreDiff) {
        let self = this
        this.showingScoreDiffAnimation = true
        this.scoreDiff = scoreDiff

        requestAnimationFrame(() => {
            let animationElement = self.$document[0].getElementById(DIFF_ANIMATION_ELEMENT)
            animationElement.classList.add(DIFF_ANIMATION_CLASS)
            self.$timeout(() => {
                animationElement.classList.remove(DIFF_ANIMATION_CLASS)
                self.showingScoreDiffAnimation = false
            }, 1000)
        })
    }

    scrollToMission(mission) {
        if (!mission) {
            return
        }

        let missionsElement = this.$document[0].querySelector(MISSIONS_ELEMENTS)
        let startingPosition = missionsElement.scrollTop
        let endingPosition = startingPosition

        if (mission) {
            let missionElement = this.$document[0].getElementById(mission.id)
            if (!missionElement) {
                return
            }

            endingPosition = Math.min(missionElement.offsetTop + MISSION_SCROLL_OFFSET,
                missionsElement.scrollHeight - missionsElement.clientHeight)
        } else {
            endingPosition = 0
        }

        let tick = (endingPosition - startingPosition) * AUTOSCROLL_SPEED
        let scrolling = endingPosition

        let lastScorllPosition = undefined

        function scrollTick() {
            if (scrolling !== endingPosition) {
                return
            }
            if (missionsElement.scrollTop + tick < endingPosition && missionsElement.scrollTop !== lastScorllPosition) {
                lastScorllPosition = missionsElement.scrollTop
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

ScoresheetController.$$ngIsClass = true
ScoresheetController.$inject = ['$scope', '$document', '$timeout', 'Configuration', 'Scoresheet', 'Tournament', 'Notifications', 'User']

export default ScoresheetController
