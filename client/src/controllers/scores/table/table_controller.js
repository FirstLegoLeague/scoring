const TOTAL_CELLS_COUNT = 12
const MAX_SCORE_CELL_WIDTH = 5
const MAX_TEAM_CELL_WIDTH = 3

class TableController {
  constructor (rankings, $scope, tournament, logger) {
    Object.assign(this, { rankings, $scope, tournament, logger })
  }

  $onInit () {
    this.$scope.$watch(() => this.currentStage, () => {
      if (this.currentStage) {
        this.load()
      }
    })
  }

  load () {
    this.rankingsReady = false
    return this.rankings.load(this.currentStage)
      .then(() => {
        if (this.rankings.ranks.length > 0) {
          const scoresCount = this.rankings.ranks[0].scores.length
          const scoreCellWidth = Math.min(Math.floor(TOTAL_CELLS_COUNT / (scoresCount + 1)), MAX_SCORE_CELL_WIDTH)
          const teamCellWidth = Math.min(TOTAL_CELLS_COUNT - scoresCount * scoreCellWidth, MAX_TEAM_CELL_WIDTH)
          const margin = Math.floor((TOTAL_CELLS_COUNT - scoresCount * scoreCellWidth - teamCellWidth) / 2)
          this.scoreCellWidthClass = `small-${scoreCellWidth}`
          this.teamCellWidthClass = `small-${teamCellWidth}`
          this.marginClass = margin > 0 ? `small-${margin}` : undefined
          this.roundHeaders = Array.apply(null, { length: scoresCount }).map((x, i) => `round ${i + 1}`)
        }
        this.rankingsReady = true
      })
      .catch(err => this.logger.error(err))
  }
}

TableController.$$ngIsClass = true
TableController.$inject = ['Rankings', '$scope', 'Tournament', 'Logger']

export default TableController
