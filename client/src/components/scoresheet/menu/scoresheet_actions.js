export default {
  template: `
  <div class="top-bar-right flex-container">
    <ul class="menu">
      <li>
        <div class="hollow button">{{$ctrl.scoresheet.score()}} pts.</div>
      </li>
      <li id="default-$ctrl.scoresheet" ng-if="$ctrl.scoresheet.defaultEnabled()">
        <div class="button" data-tooltip title="Set default values" ng-if="$ctrl.scoresheet.isAdmin" ng-click="$ctrl.scoresheet.setDefault()">
          <i class="fa fa-arrow-down"></i>
        </div>
      </li>
      <li id="reset-$ctrl.scoresheet">
        <div class="button" data-tooltip title="Reset scoresheet" data-position="top" data-alignment="right" ng-click="$ctrl.scoresheet.reset()">
          <i class="fa fa-undo"></i>
        </div>
      </li>
    </ul>
  </div>`,
  controller: function () { },
  bindings: {
    scoresheet: '=?'
  }
}
