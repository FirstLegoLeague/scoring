class ScoresController {
  constructor (scores, $scope, $location, tournament, logger) {
    Object.assign(this, { data: scores, $scope, $location, tournament, logger })
    this.filters = {
      teams: [],
      rounds: [],
      referees: [],
      tables: [],
      showDuplicates: false,
      showNoShow: false,
      showErrors: false,
      showPublic: 0
    }
    this.sort = 'creationTime_down'
    this.size = 'big'
    this.tableView = this.$location.search()[ScoresController.pageParameter] === 'table'
  }

  $onInit () {
    this.ready = false

    this.$scope.$on('open scores with filters', (event, filters) => {
      this.tableView = false
    })

    this.$scope.$watch(() => this.tableView, () => {
      this.$location.search(ScoresController.pageParameter, this.tableView ? 'table' : 'tiles')
    })

    return Promise.all([this.data.init(), this.tournament.loadTeams(), this.tournament.loadTables()])
      .then(() => {
        this.$scope.$emit('reinit foundation')
        this.ready = true
      })
      .catch(error => this.logger.error(error))
  }

  any () {
    return Boolean(this.data.scores && this.data.scores.length)
  }
}

ScoresController.pageParameter = 'scoresPage'
ScoresController.$$ngIsClass = true
ScoresController.$inject = ['Scores', '$scope', '$location', 'Tournament', 'Logger']

export default ScoresController
