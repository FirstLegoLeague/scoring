export default {
  template: `
  <div ng-repeat="score in scoreTilesContent.scores" class="cell grid-x" ng-show="scoreTilesContent.shouldShowScore({ score })">
    <score-tile data="score" class="cell grid-y"></score-tile>
  </div>`,
  controller: function () {},
  controllerAs: 'scoreTilesContent',
  bindings: {
    scores: '=?',
    shouldShowScore: '&'
  }
}
