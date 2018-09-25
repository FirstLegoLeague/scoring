class ScoresheetController {
  constructor (Scoresheet, $scope, Configuration, Tournament, User, Logger) {
    Object.assign(this, { data: Scoresheet, $scope, Configuration, Tournament, User, Logger })
    this.isAdmin = User.isAdmin()
    this.loading = true
  }

  $onInit () {
    this.$scope.$on('mission complete', event => {
      this.data.process()

      const missionId = event.targetScope.mission.data.id
      const nextMissionIndex = this.data.current.missions.findIndex(mission => mission.id === missionId) + 1

      if (!this.defaulting || nextMissionIndex === this.data.current.missions.length) {
        const nextMission = this.data.current.missions[nextMissionIndex]
        this.$scope.scrollToMission(nextMission)
        this.defaulting = false
      }
      if (!this.data.current.teamNumber && nextMissionIndex === 1) {
        this.Logger.info('Completed first mission without selecting a team')
      }
    })

    this.$scope.$on('load', (event, scoresheet) => {
      this.data.load(scoresheet)
        .then(() => {
          this.signatureMissing = false
          this.team = this.Tournament.teams.find(team => team.number === this.data.current.teamNumber).displayText
        })
        .catch(err => console.log(err))
    })

    this.$scope.$watch(() => this.team, () => {
      if (this.team) {
        this.loadingMatches = true
        this.data.current.teamNumber = Number(this.team.match(/^#(\d+)/)[1])
        this.Tournament.loadTeamMatches(this.data.current.teamNumber)
          .then(matches => {
            this.matches = matches
            if (this.data.current.stage && this.data.current.round && !this.match) {
              this.match = this.matches.find(m => m.round === this.data.current.round && m.stage === this.data.current.stage)._id
            }
            this.loadingMatches = false
            this.data.process()
          })
          .catch(err => console.log(err))
      }
    })

    this.$scope.$watch(() => this.match, () => {
      if (this.match) {
        this.data.current.matchId = this.match
        const match = this.matches.find(m => m._id === this.match)
        this.data.current.stage = match.stage
        this.data.current.round = match.round
        this.data.process()
      }
    })

    this.Configuration.load()
      .then(config => {
        if (config.requireSignature) {
          this.$scope.$watch(() => this.$scope.getSignature().dataUrl, () => {
            if (this.data.current) {
              const signature = this.$scope.getSignature()
              this.data.current.signature = signature
              this.signatureMissing = signature.isEmpty && !this.data.current._id
            }
          })
        }
      })
      .catch(err => console.log(err))

    return Promise.all([this.data.init(), this.Tournament.loadTeams()])
      .then(() => this.reset())
  }

  score () {
    return this.data.current ? this.data.score() : 0
  }

  error () {
    return this.data.errors[0]
  }

  complete () {
    return this.data.current && this.data.current.missions &&
      (!this.data.current.errors || this.data.current.errors.length === 0) &&
      !this.signatureMissing
  }

  reset () {
    return this.data.reset()
      .then(() => {
        this.$scope.clearSignature()
        this.$scope.$apply()
        this.$scope.scrollToMission(this.data.current.missions[0])
        this.team = null
        this.match = null
        this._matches = null
        this.loading = false
      })
  }

  setDefault () {
    this.defaulting = true
    this.$scope.$broadcast('set default')
  }

  save () {
    this.data.save()
      .then(() => {
        this.$scope.$emit('close scoresheet', { goToScores: Boolean(this.data.current._id) })
        this.reset()
      })
      .catch(() => this.reset())
  }
}

ScoresheetController.$$ngIsClass = true
ScoresheetController.$inject = ['Scoresheet', '$scope', 'Configuration', 'Tournament', 'User', 'Logger']

export default ScoresheetController
