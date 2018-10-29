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
      <select ng-if="metadataInputs.data.current.teamNumber"
        ng-model="metadataInputs.data.current.matchId"
        ng-class="{'disabled': (metadataInputs.loadingMatches || metadataInputs.data.dontRequireMatch)}"
        ng-options="match._id as match.displayTextWithCompletion for match in metadataInputs.matches">
        <option value="" disabled selected hidden>
          {{metadataInputs.loadingMatches ? 'Loading...' : (metadataInputs.data.dontRequireMatch ? "Couldn't load matches, continue without them" : 'Select Round')}}
        </option>
      </select>
    </div>`,
  controller: 'MetadataInputsController as metadataInputs'
}
