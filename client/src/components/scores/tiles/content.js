export default {
  template: `
  <div ng-repeat="score in scoreTilesContent.scores" class="cell grid-x" ng-show="scoreTilesContent.shouldShowScore({ score })">
    <score-tile id="score-{{score._id}}" data="score" class="cell grid-y"></score-tile>
  </div>`,
  controller: function () {},
  controllerAs: 'scoreTilesContent',
  bindings: {
    scores: '=?',
    shouldShowScore: '&'
  }
}
