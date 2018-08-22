'use strict'

const AUTOSCROLL_SPEED = 0.05
const SCORE_DIFF_SPEEFD = -0.05
const SCORE_DIFF_ENDING_POSITION = -100
const SCORE_DIFF_STARTING_POSITION = 100
const MISSION_SCROLL_OFFSET = -150

const MISSIONS_ELEMENTS = 'scoresheet > .top-bar-page > .grid-container'
const DIFF_ANIMATION_ELEMENT = 'score-diff-animation'
const DIFF_ANIMATION_CLASS = 'ng-hide-animate'

class ScoresheetController {

    constructor($scope, $document, $timeout, Configuration, Scoresheet, Scores, Tournament, Notifications, User, Messanger) {
        this.$scope = $scope
        this.$document = $document
        this.$timeout = $timeout
        this.Configuration = Configuration
        this.Scoresheet = Scoresheet
        this.Scores = Scores
        this.Tournament = Tournament
        this.Notifications = Notifications
        this.Messanger = Messanger
        this.isAdmin = User.isAdmin()
        this.isRef = User.isRef()
        this.scoreDiff = 0
        this.showingScoreDiffAnimation = false
        this.loading = true
    }

    $onInit() {
        this.$scope.$on('mission complete', event => {
            let missionId = event.targetScope.mission.data.id
            let missionIndex = this.scoresheet.missions.findIndex(mission => mission.id === missionId) + 1
            let nextMission = this.scoresheet.missions[missionIndex]
            if (!this.defaulting || missionIndex === this.scoresheet.missions.length) {
                this.scrollToMission(nextMission)
                this.defaulting = false
            }
        })

        this.$scope.$on('load', (event, scoresheet) => {
            this.Scoresheet.load(scoresheet).then(scoresheet => {
                this.scoresheet = scoresheet
                this.missions = scoresheet.missions
                this.Tournament.teams().then(teams => {
                    this.team = teams.find(team => team.number === this.scoresheet.teamNumber).displayText
                })
                this.signatureMissing = false
            })
        })
        this.$scope.$on('reload teams', () => this.loadTeams())

        this.$scope.$watch(() => this.team, () => {
            if (this.team) {
                this.loadingMatches = true
                this.scoresheet.teamNumber = Number(this.team.match(/^#(\d+)/)[1])
                this.Tournament.teamsMatches(this.scoresheet.teamNumber).then(matches => {
                    this.matches = matches
                    this.Scores.all().then(scores => {
                        this.matches.forEach(match => {
                            match.complete = scores.some(score => score.teamNumber === this.scoresheet.teamNumber && score.matchId == match._id)
                            match.displayTextWithComplition = `${match.displayText} ${match.complete ? '✔' : ''}`
                        })
                        this.loadingMatches = false
                        this.processErrors()
                    })
                })
            }
        })

        this.$scope.$watch(() => this.match, () => {
            if (this.match) {
                this.scoresheet.matchId = this.match
                this.scoresheet.stage = this.matches.find(match => match._id == this.match).stage
                this.processErrors()
            }
        })

        this.Configuration.load().then(config => {
            if (config.requireSignature) {
                this.$scope.$watch(() => this.$scope.getSignature().dataUrl, () => {
                    if (this.scoresheet) {
                        let signature = this.$scope.getSignature()
                        this.scoresheet.signature = signature
                        this.signatureMissing = signature.isEmpty && !this.scoresheet._id
                    }
                })
            }
        })

        return this.Scoresheet.init()
            .then(() => this.loadTeams())
            .then(() => this.reset())
    }

    loadTeams() {
        return this.Tournament.teams()
            .then(teams => {
                this.teams = teams
            })
    }

    score() {
        if (!this.scoresheet) {
            return 0
        }

        let previousScore = this.scoresheet.score // This score is saved from the last calculation by the Scoresheet service
        let newScore = this.Scoresheet.score() // This score is the newly calculated score
        let scoreDiff = newScore - previousScore
        if (scoreDiff > 0 && isFinite(scoreDiff)) {
            this.showScoreDiffAnimation(scoreDiff)
        }

        if (this._match && this._match.complete) {
            return `"${newScore.toString()}"`
        }

        return newScore
    }

    error() {
        return this.Scoresheet.errors[0]
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
        return this.Scoresheet.reset().then(scoresheet => {
            this.scoresheet = scoresheet
            this.missions = scoresheet.missions
            this.$scope.clearSignature()
            this.$scope.$apply()
            this.scrollToMission(this.scoresheet.missions[0])
            this.team = null
            this.match = null
            this._matches = null
            this.loading = false
        })
    }

    save() {
        this.Scoresheet.save().then(() => {
            this.$scope.$emit('close scoresheet', { goToScores: Boolean(this.scoresheet._id) })
            this.reset()
            this.Notifications.success('Score saved successfully')
        }).catch(err => {
            this.reset()
            if (err.status === 422) {
                this.Notifications.error(`Cannot submit score, there are some missing fields.`)
            } else {
                let pendingScores = err.pendingRequestsCount
                let scoresWord = pendingScores > 1 ? 'scores' : 'score'
                this.Notifications.error(`Score submit failed. Don\'t worry, We\'re keeping
                    an eye on your ${pendingScores} pending ${scoresWord}.`)
            }
        })
    }

    setDefault() {
        this.defaulting = true
        this.$scope.$broadcast('set default')
    }

    showScoreDiffAnimation(scoreDiff) {
        this.showingScoreDiffAnimation = true
        this.scoreDiff = scoreDiff

        requestAnimationFrame(() => {
            let animationElement = this.$document[0].getElementById(DIFF_ANIMATION_ELEMENT)
            animationElement.classList.add(DIFF_ANIMATION_CLASS)
            this.$timeout(() => {
                animationElement.classList.remove(DIFF_ANIMATION_CLASS)
                this.showingScoreDiffAnimation = false
            })
        })
    }

    scrollToMission(mission) {
        let missionsElement = this.$document[0].querySelector(MISSIONS_ELEMENTS)
        let startingPosition = missionsElement.scrollTop
        let endingPosition = startingPosition

        if (mission) {
            let missionElement = this.$document[0].getElementById(mission.id)
            endingPosition = Math.min(missionElement.offsetTop + MISSION_SCROLL_OFFSET,
                missionsElement.scrollHeight - missionsElement.clientHeight)
        } else {
            endingPosition = missionsElement.scrollHeight - missionsElement.offsetHeight
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
ScoresheetController.$inject = ['$scope', '$document', '$timeout', 'Configuration', 'Scoresheet',
                                            'Scores', 'Tournament', 'Notifications', 'User', 'Messanger']

export default ScoresheetController