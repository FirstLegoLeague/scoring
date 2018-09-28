export default {
  template: `
  <div class="top-bar secondary">
    <div class="top-bar-left">
      <ul class="menu">
        <ref-identity ng-if="scoresheet.Configuration.requireRef || scoresheet.Configuration.requireTable" class="menu"></ref-identity>
        <div>
          <form>
            <input type="text" list="teams" ng-focus="scoresheet.team = ''" ng-click="scoresheet.team = ''" placeholder="Select Team" blur="submit" ng-model="scoresheet.team">
            <datalist id="teams">
              <select >
                <option type="text" ng-repeat="team in scoresheet.Tournament.teams">
                  {{ team.displayText }}
                </option>
              </select>
            </datalist>
          </form>
        </div>
        <div>
          <select ng-if="scoresheet.team" ng-model="scoresheet.match" ng-class="{'disabled': scoresheet.loadingMatches}">
            <option value="" disabled selected hidden>{{scoresheet.loadingMatches ? 'Loading...' : 'Select Round'}}</option>
            <option type="text" ng-repeat="match in scoresheet.matches" value="{{match._id}}">
              {{match.displayTextWithCompletion}}
            </option>
          </select>
        </div>
      </ul>
    </div>
    <div class="top-bar-right flex-container">
      <ul class="menu">
        <li>
          <div class="hollow button">{{scoresheet.score()}} pts.</div>
        </li>
        <li id="default-scoresheet" ng-if="scoresheet.data.current.defaultEnabled">
          <div class="button" data-tooltip title="Set default values" ng-if="scoresheet.isAdmin" ng-click="scoresheet.setDefault()">
            <i class="fa fa-arrow-down"></i>
          </div>
        </li>
        <li id="reset-scoresheet">
          <div class="button" data-tooltip title="Reset scoresheet" data-position="top" data-alignment="right" ng-click="scoresheet.reset()">
            <i class="fa fa-undo"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="top-bar-page" ng-class="{ loading: scoresheet.loading }" dir="{{scoresheet.data.current.direction}}">
      <div class="dimmer">
          <div class="large loader"></div>
      </div>
      <score-diff-animation></score-diff-animation>
    <div id="missions" missions-scroll on="scrollToMission" class="grid-container full" ng-show="!scoresheet.loading">
      <div class="grid-x grid-padding-x grid-padding-y">
        <div class="cell large-10 large-offset-1">
          <div id="{{mission.id}}" class="callout" ng-class="{ success: mission.complete, alert: mission.error }" ng-repeat="mission in scoresheet.data.current.missions">
            <mission data="mission"></mission>
          </div>
        </div>
        <div class="cell large-10 large-offset-1">
          <div id="signature" class="callout" ng-class="{ alert: scoresheet.error(), success: !(scoresheet.error() || scoresheet.signatureMissing) }">
            <signature-pad ng-if="scoresheet.Configuration.requireSignature" accept="getSignature" clear="clearSignature" height="128" width="300" ng-hide="scoresheet.data.current._id"></signature-pad>
            <img ng-if="scoresheet.Configuration.requireSignature" ng-src="{{scoresheet.data.current.signature.dataUrl}}" ng-show="scoresheet.data.current._id" />
            <div ng-if="scoresheet.Configuration.requireSignature" class="clear button" data-tooltip title="Reset signature" ng-hide="scoresheet.data.current._id" ng-disabled="scoresheet.data.current.signature.isEmpty" ng-click="scoresheet.$scope.clearSignature()">
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
