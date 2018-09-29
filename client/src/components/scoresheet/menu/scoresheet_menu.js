export default {
  template: `
  <div class="top-bar-left">
    <ul class="menu">
      <ref-identity ng-if="$ctrl.scoresheet.showRefIdentity()" class="menu"></ref-identity>

      <metadata-inputs class="menu" scoresheet="$ctrl.scoresheet"></metadata-inputs>
    </ul>
  </div>

  <scoresheet-actions scoresheet="$ctrl.scoresheet"></scoresheet-actions>`,
  controller: function () { },
  bindings: {
    scoresheet: '=?'
  }
}
