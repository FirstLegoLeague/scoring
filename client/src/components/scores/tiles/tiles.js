export default {
  template: `
<div ng-repeat="score in tiles.sortedScores" class="cell grid-x" ng-show="tiles.shouldShowScore(score)">
  <score-tile data="score" class="cell grid-y"></score-tile>
</div>`,
  controller: 'ScoresTilesController as tiles',
  bindings: {
    filters: '<',
    sort: '<',
    ready: '<'
  }
}
