export default {
  template: `
<div class="menu" ng-if="stage.ready">
  <select ng-model="stage.data" ng-options="stage for stage in stage.options"></select>
</div>
`,
  controller: 'ScoresStageController as stage',
  bindings: {
    data: '=?'
  }
}
