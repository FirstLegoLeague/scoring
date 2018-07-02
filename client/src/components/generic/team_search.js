'use strict'

export default {
    template: `<form>
    <input type="text" list="teams" ng-model="scoresheet.scoresheet.teamNumber" ng-change="scoresheet.processErrors()">
        <datalist id="teams">
            <select>
                <option type="text" ng-repeat="team in scoresheet.teams">
                    {{ team.displayText }}
                </option>
            </select>
        </datalist>
</form>`,
    controller: 'GenericController as generic'
}