export default {
  template: `
    <div>
      <form>
        <input type="text" list="teams" ng-focus="$ctrl.scoresheet.team = ''" ng-click="$ctrl.scoresheet.team = ''" placeholder="Select Team" blur="submit" ng-model="$ctrl.scoresheet.team">
        <datalist id="teams">
          <select >
            <option type="text" ng-repeat="team in $ctrl.scoresheet.teams()">
              {{ team.displayText }}
            </option>
          </select>
        </datalist>
      </form>
    </div>
    <div>
      <select ng-if="$ctrl.scoresheet.team" ng-model="$ctrl.scoresheet.match" ng-class="{'disabled': $ctrl.scoresheet.loadingMatches}">
        <option value="" disabled selected hidden>{{$ctrl.scoresheet.loadingMatches ? 'Loading...' : 'Select Round'}}</option>
        <option type="text" ng-repeat="match in $ctrl.scoresheet.matches" value="{{match._id}}">
          {{match.displayTextWithCompletion}}
        </option>
      </select>
    </div>`,
  controller: function () { },
  bindings: {
    scoresheet: '=?'
  }
}
