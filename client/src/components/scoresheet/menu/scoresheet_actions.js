export default {
  template: `
  <div class="top-bar-right flex-container">
    <ul class="menu">
      <li>
        <div class="hollow button">{{scoresheetActions.score()}} pts.</div>
      </li>
      <li id="default-scoresheet" ng-if="scoresheetActions.defaultEnabled()">
        <div class="button" data-tooltip title="Set default values" ng-if="scoresheetActions.isAdmin" ng-click="scoresheetActions.setDefault()">
          <i class="fa fa-arrow-down"></i>
        </div>
      </li>
      <li id="reset-scoresheet">
        <div class="button" data-tooltip title="Reset scoresheet" data-position="top" data-alignment="right" ng-click="scoresheetActions.reset()">
          <i class="fa fa-undo"></i>
        </div>
      </li>
    </ul>
  </div>`,
  controller: 'ScoresheetActionsController as scoresheetActions'
}
