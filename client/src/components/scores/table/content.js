export default {
  template: `
<div class="ranks-header grid-x grid-padding-x">
  <div class="cell" ng-class="scoreTableContent.marginClass" ng-if="scoreTableContent.marginClass"></div>
  <div class="cell" ng-class="scoreTableContent.teamCellWidthClass"></div>
  <div ng-repeat="header in scoreTableContent.roundHeaders" class="cell text-center" ng-class="scoreTableContent.scoreCellWidthClass">
    <h5>{{header}}</h5>
  </div>
  <div class="cell" ng-class="scoreTableContent.marginClass" ng-if="scoreTableContent.marginClass"></div>
</div>
<div class="ranks">  
  <div ng-repeat="rank in scoreTableContent.ranks" class="rank grid-x grid-padding-x">
    <div class="cell" ng-class="scoreTableContent.marginClass" ng-if="scoreTableContent.marginClass"></div>
    <div class="cell grid-y" ng-class="scoreTableContent.teamCellWidthClass">
      <div class="card">
        <div class="card-section">
          <div class="team">{{rank.team.displayText}}</div>
          <div class="rank">Rank: #{{rank.rank}}</div>
        </div>
      </div>
    </div>
    <div ng-repeat="slotScores in rank.scores" class="cell grid-y" ng-class="scoreTableContent.scoreCellWidthClass">
      <table-slot data="slotScores" position="{ round: $index+1, team: rank.team, stage: scoreTableContent.stage }"></table-slot>
    </div>
    <div class="cell" ng-class="scoreTableContent.marginClass" ng-if="scoreTableContent.marginClass"></div>
  </div>
</div>`,
  controller: ['$scope', function ($scope) {
    $scope.$watch(() => $scope.scoreTableContent.ranks, () => {
      if ($scope.scoreTableContent.ranks.length > 0) {
        const TOTAL_CELLS_COUNT = 12
        const MAX_SCORE_CELL_WIDTH = 5
        const MAX_TEAM_CELL_WIDTH = 3
        const scoresCount = $scope.scoreTableContent.ranks[0].scores.length
        const scoreCellWidth = Math.min(Math.floor(TOTAL_CELLS_COUNT / (scoresCount + 1)), MAX_SCORE_CELL_WIDTH)
        const teamCellWidth = Math.min(TOTAL_CELLS_COUNT - scoresCount * scoreCellWidth, MAX_TEAM_CELL_WIDTH)
        const margin = Math.floor((TOTAL_CELLS_COUNT - scoresCount * scoreCellWidth - teamCellWidth) / 2)
        $scope.scoreTableContent.scoreCellWidthClass = `small-${scoreCellWidth}`
        $scope.scoreTableContent.teamCellWidthClass = `small-${teamCellWidth}`
        $scope.scoreTableContent.marginClass = margin > 0 ? `small-${margin}` : undefined
        $scope.scoreTableContent.roundHeaders = Array.apply(null, { length: scoresCount }).map((x, i) => `round ${i+1}`)
      }
    })
  }],
  controllerAs: 'scoreTableContent',
  bindings: {
    ranks: '=?',
    stage: '=?'
  }
}
