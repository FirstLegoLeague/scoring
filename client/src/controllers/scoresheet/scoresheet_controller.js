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
      if (!this.teamNumber() && missionId === this.missions()[0].id) {
        this.Logger.info('Completed first mission without selecting a team')
      }
    })

    this.$scope.$on('load', (event, scoresheet) => {
      this.data.load(scoresheet)
        .then(() => { this.team = this.Tournament.teams.find(team => team.number === this.teamNumber()).displayText })
        .catch(err => console.log(err))
    })

    this.$scope.$watch(() => this.team, () => {
      if (this.team) {
        this.loadingMatches = true
        this.data.current.teamNumber = Number(this.team.match(/^#(\d+)/)[1])
        this.Tournament.loadTeamMatches(this.teamNumber())
          .then(matches => {
            this.matches = matches
            if (this.stage() && this.round() && !this.match) {
              this.match = this.matches.find(m => m.round === this.round() && m.stage === this.stage())._id
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
          this.$scope.$watch(() => (this.$scope.getSignature ? this.$scope.getSignature().dataUrl : ''), () => {
            if (this.data.current) {
              const signature = this.$scope.getSignature()
              this.data.current.signature = signature
              this.data.process()
            }
          })
        }
      })
      .catch(err => console.log(err))

    return Promise.all([this.data.init(), this.Tournament.loadTeams()])
      .then(() => this.reset())
  }

  reset () {
    return this.data.reset()
      .then(() => {
        if (this.$scope.clearSignature) {
          this.$scope.clearSignature()
        }
        if (!this.loading) {
          this.$scope.scrollToMission(this.data.current.missions[0])
        }
        Object.assign(this, { team: null, match: null, matches: null, loading: false })
      })
  }

  score () {
    return this.data.current ? this.data.score() : 0
  }

  error () {
    return this.data.errors[0]
  }

  complete () {
    return this.data.current && this.missions() &&
      (!this.data.current.errors || this.data.current.errors.length === 0)
  }

  isEditing () {
    return this.data.isEditing()
  }

  defaultEnabled () {
    return this.data.current && this.data.current.defaultEnabled
  }

  direction () {
    return this.data.current ? this.data.current.direction : undefined
  }

  teamNumber () {
    return this.data.current ? this.data.current.teamNumber : undefined
  }

  stage () {
    return this.data.current ? this.data.current.stage : undefined
  }

  round () {
    return this.data.current ? this.data.current.round : undefined
  }

  missions () {
    return this.data.current ? this.data.current.missions : undefined
  }

  signature () {
    return this.data.current ? this.data.current.signature : undefined
  }

  showRefIdentity () {
    return this.Configuration.requireRef || this.Configuration.requireTable
  }

  teams () {
    return this.Tournament.teams || []
  }

  setDefault () {
    this.$scope.defaulting = true
    this.$scope.$broadcast('set default')
  }

  save () {
    this.data.save()
      .then(() => {
        this.$scope.$emit('close scoresheet', { goToScores: this.isEditing() })
        this.reset()
      })
      .catch(() => this.reset())
  }
}

ScoresheetController.$$ngIsClass = true
ScoresheetController.$inject = ['Scoresheet', '$scope', 'Configuration', 'Tournament', 'User', 'Logger']

export default ScoresheetController
