export default {
  template: `
  <div class="top-bar-left">
    <ul class="menu">
      <ref-identity ng-if="scoresheetMenu.showRefIdentity()" class="menu"></ref-identity>

      <metadata-inputs class="menu"></metadata-inputs>
    </ul>
  </div>

  <scoresheet-actions></scoresheet-actions>`,
  controller: 'ScoresheetMenuController as scoresheetMenu'
}
