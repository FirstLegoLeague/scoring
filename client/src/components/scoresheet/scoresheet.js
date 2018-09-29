export default {
  template: `
  <scoresheet-menu class="top-bar secondary" scoresheet="scoresheet"></scoresheet-menu>

  <div class="top-bar-page" ng-class="{ loading: scoresheet.loading }" dir="{{scoresheet.direction()}}">
    <div class="dimmer">
        <div class="large loader"></div>
    </div>

    <score-diff-animation></score-diff-animation>

    <div id="missions" missions-scroll on="scrollToMission" mission-complete-event="mission complete" class="grid-container full" ng-show="!scoresheet.loading">
      <div class="grid-x grid-padding-x grid-padding-y">

        <div class="cell large-10 large-offset-1">
          <div id="{{mission.id}}" class="callout" ng-class="{ success: mission.complete, alert: mission.error }" ng-repeat="mission in scoresheet.missions()">
            <mission data="mission"></mission>
          </div>
        </div>

        <div class="cell large-10 large-offset-1">
          <div id="signature" class="callout" ng-class="scoresheet.error() ? 'alert' : 'success'">
            <signature-pad accept="getSignature" clear="clearSignature" height="128" width="300" ng-hide="scoresheet.isEditing()"></signature-pad>
            <img ng-src="{{scoresheet.signature().dataUrl}}" ng-show="scoresheet.isEditing()" />
            <div class="clear button" data-tooltip title="Reset signature" ng-hide="scoresheet.isEditing()" ng-disabled="scoresheet.signature().isEmpty" ng-click="scoresheet.$scope.clearSignature()">
              <i class="fa fa-undo"></i>
            </div>
            <div class="stamp hollow alert button" ng-click="scoresheet.scrollToMission(scoresheet.error().mission)">{{scoresheet.error().error}}</div>
          </div>
        </div>

        <div class="cell small-12 flex-container align-center">
          <div class="large button" ng-click="scoresheet.save()" ng-disabled="!scoresheet.complete()">Submit</div>
        </div>
        
      </div>
    </div>

  </div>`,
  controller: 'ScoresheetController as scoresheet'
}
