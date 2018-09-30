export default {
  template: `
  <div class="top-bar-left">
    <ul class="menu" ng-if="scoresheetMenu.data.ready">
      <ref-identity ng-if="scoresheetMenu.showRefIdentity()" class="menu"></ref-identity>

      <metadata-inputs class="menu" ng-if="scoresheetMenu.data.ready"></metadata-inputs>
    </ul>
  </div>

  <scoresheet-actions ng-if="scoresheetMenu.data.ready"></scoresheet-actions>`,
  controller: 'ScoresheetMenuController as scoresheetMenu'
}
