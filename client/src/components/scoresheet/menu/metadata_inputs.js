export default {
  template: `
    <div>
      <select ng-model="metadataInputs.data.current.teamNumber" convert-to-number>
        <option value="" disabled selected hidden>Select Team</option>
        <option type="text" ng-repeat="team in metadataInputs.teams()" value="{{team.number}}">
          {{ team.displayText }}
        </option>
      </select>
    </div>
    <div>
      <select ng-if="metadataInputs.data.current.teamNumber" ng-model="metadataInputs.data.current.matchId" ng-class="{'disabled': metadataInputs.loadingMatches}">
        <option value="" disabled selected hidden>{{metadataInputs.loadingMatches ? 'Loading...' : 'Select Round'}}</option>
        <option type="text" ng-repeat="match in metadataInputs.matches" value="{{match._id}}">
          {{match.displayTextWithCompletion}}
        </option>
      </select>
    </div>`,
  controller: 'MetadataInputsController as metadataInputs'
}
