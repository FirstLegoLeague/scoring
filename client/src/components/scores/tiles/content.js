export default {
  template: `
  <div ng-repeat="score in scoreTilesContent.scores" class="cell grid-x" ng-show="scoreTilesContent.shouldShowScore({ score })">
    <score id="score-{{score._id}}" data="score" class="cell grid-y"></score>
  </div>`,
  controller: function () {},
  controllerAs: 'scoreTilesContent',
  bindings: {
    scores: '=?',
    shouldShowScore: '&'
  }
}
