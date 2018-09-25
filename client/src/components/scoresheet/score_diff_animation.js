export default {
  template:
  `<div id="score-diff-animation" ng-show="scoreDiffAnimation.visible">{{scoreDiffAnimation.scoreDiff}}</div>`,
  controller: 'ScoreDiffAnimationController as scoreDiffAnimation'
}
