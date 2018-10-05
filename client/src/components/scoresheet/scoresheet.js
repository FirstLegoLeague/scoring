export default {
  template: `
  <scoresheet-menu class="top-bar secondary"></scoresheet-menu>

  <div class="top-bar-page" ng-class="{ loading: !scoresheet.data.ready }" dir="{{scoresheet.direction()}}">
    <div class="dimmer">
        <div class="large loader"></div>
    </div>

    <score-diff-animation></score-diff-animation>

    <div id="missions" missions-scroll on="scrollToMission" mission-complete-event="mission complete" class="grid-container full" ng-if="scoresheet.data.ready">
      <div class="grid-x grid-padding-x grid-padding-y">

        <div class="cell large-10 large-offset-1">
          <div id="{{mission.id}}" class="callout" ng-class="{ success: mission.complete, alert: mission.error }" ng-repeat="mission in scoresheet.missions()">
            <mission data="mission"></mission>
          </div>
        </div>

        <div class="cell large-10 large-offset-1">
          <scoresheet-signature></scoresheet-signature>
        </div>

        <div class="cell small-12 flex-container align-center">
          <div class="large button submit-btn" ng-click="scoresheet.save()" ng-disabled="!scoresheet.complete()">Submit</div>
        </div>
        
      </div>
    </div>

  </div>`,
  controller: 'ScoresheetController as scoresheet'
}
