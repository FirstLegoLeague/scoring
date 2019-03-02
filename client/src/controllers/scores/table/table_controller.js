const TOTAL_CELLS_COUNT = 12
const MAX_SCORE_CELL_WIDTH = 5
const MAX_TEAM_CELL_BIG_WIDTH = 3
const MAX_TEAM_CELL_SMALL_WIDTH = 12

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

    this.$scope.$watch(() => this.size, () => {
      this._setCurrentCellSizes()
    })

    // move mode

    this.$scope.$on('enter move mode', (event, data) => {
      if (event.targetScope !== this.$scope) {
        this.$scope.$broadcast('enter move mode', data)
      }
    })

    this.$scope.$on('exit move mode', (event, data) => {
      if (event.targetScope !== this.$scope) {
        this.$scope.$broadcast('exit move mode', data)
      }
    })
  }

  load () {
    this.rankingsReady = false
    return this.rankings.loadRankingsForStage(this.currentStage)
      .then(() => {
        if (this.rankings.rankings[this.currentStage].length > 0) {
          const roundsCount = this.rankings.rankings[this.currentStage][0].scores.length

          const scoreCellSmallWidth = Math.min(Math.floor((TOTAL_CELLS_COUNT / 2) / (roundsCount + 1)), MAX_SCORE_CELL_WIDTH)
          const teamCellSmallWidth = Math.min(TOTAL_CELLS_COUNT - roundsCount * scoreCellSmallWidth, MAX_TEAM_CELL_SMALL_WIDTH)
          const smallMargin = Math.floor((TOTAL_CELLS_COUNT - roundsCount * scoreCellSmallWidth - teamCellSmallWidth) / 2)
          this.scoreCellSmallWidthClass = `small-${scoreCellSmallWidth}`
          this.teamCellSmallWidthClass = `small-${teamCellSmallWidth}`
          this.marginSmallClass = smallMargin > 0 ? `small-${smallMargin}` : undefined

          const scoreCellBigWidth = Math.min(Math.floor(TOTAL_CELLS_COUNT / (roundsCount + 1)), MAX_SCORE_CELL_WIDTH)
          const teamCellBigWidth = Math.min(TOTAL_CELLS_COUNT - roundsCount * scoreCellBigWidth, MAX_TEAM_CELL_BIG_WIDTH)
          const bigMargin = Math.floor((TOTAL_CELLS_COUNT - roundsCount * scoreCellBigWidth - teamCellBigWidth) / 2)
          this.scoreCellBigWidthClass = `small-${scoreCellBigWidth}`
          this.teamCellBigWidthClass = `small-${teamCellBigWidth}`
          this.marginBigClass = bigMargin > 0 ? `small-${bigMargin}` : undefined

          this.roundHeaders = Array.apply(null, { length: roundsCount }).map((x, i) => `${i + 1}`)

          this._setCurrentCellSizes()
        }
        this.rankingsReady = true
      })
      .catch(err => this.logger.error(err))
  }

  _setCurrentCellSizes () {
    const small = (this.size === 'small')
    this.marginClass = small ? this.marginSmallClass : this.marginBigClass
    this.scoreCellWidthClass = small ? this.scoreCellSmallWidthClass : this.scoreCellBigWidthClass
    this.teamCellWidthClass = small ? this.teamCellSmallWidthClass : this.teamCellBigWidthClass
  }
}

TableController.$$ngIsClass = true
TableController.$inject = ['Rankings', '$scope', 'Tournament', 'Logger']

export default TableController
