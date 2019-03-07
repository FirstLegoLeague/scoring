class ScoresController {
  constructor (scores, $scope, tournament, logger) {
    Object.assign(this, { data: scores, $scope, tournament, logger })
    this.filters = {
      search: '',
      teams: [],
      rounds: [],
      referees: [],
      tables: [],
      showDuplicates: false,
      showErrors: false,
      showPublic: 0
    }
    this.sort = 'creation_down'
    this.size = 'big'
  }

  $onInit () {
    this.ready = false
    return Promise.all([this.data.init(), this.tournament.loadTeams(), this.tournament.loadTables()])
      .then(() => {
        this.$scope.$emit('reinit foundation')
        this.ready = true
      })
      .catch(err => this.logger.error(err))
  }

  any () {
    return Boolean(this.data.scores && this.data.scores.length)
  }
}

ScoresController.$$ngIsClass = true
ScoresController.$inject = ['Scores', '$scope', 'Tournament', 'Logger']

export default ScoresController
