export default {
  template: `
<select ng-model="scoreTableMenu.currentStage" ng-options="stage for stage in scoreTableMenu.stages"></select>
`,
  controller: function () { },
  controllerAs: 'scoreTableMenu',
  bindings: {
    currentStage: '=?',
    stages: '=?'
  }
}
