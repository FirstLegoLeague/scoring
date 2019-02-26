export default {
  template: `
  <div class="top-bar-right flex-container">
    <div class="button-group">
      <div class="hollow button">{{scoresheetActions.score()}} pts.</div>
      <div id="default-scoresheet" class="button" ng-if="scoresheetActions.defaultEnabled()" ng-click="scoresheetActions.setDefault()">
        <i class="fa fa-arrow-down"></i>
        <span class="hover-text">Set default values</span>
      </div>
      <div id="team-didnt-show" class="button" ng-class="{'disabled': scoresheetActions.noShowDisabled()}" ng-click="scoresheetActions.markNoShow()">
        <i class="fa fa-ban"></i>
        <span class="hover-text">No Show</span>
      </div>
      <div id="reset-scoresheet" class="button" ng-click="scoresheetActions.reset()">
        <i class="fa fa-undo"></i>
        <span class="hover-text">Reset scoresheet</span>
      </div>
      <div id="cancel-scoresheet" class="button" ng-if="scoresheetActions.isAdmin" ng-click="scoresheetActions.cancel()">
        <i class="fa fa-times"></i>
        <span class="hover-text">Cancel</span>
      </div>
    </div>
  </div>`,
  controller: 'ScoresheetActionsController as scoresheetActions'
}
