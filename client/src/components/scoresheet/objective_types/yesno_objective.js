'use strict'

export default {
	template: `<div class="small button-group toggle" ng-click="objective.markAsComplete()">
    	<input type="radio" id="{{objective.data.id}}-no" name="{{objective.data.id}}" ng-model="objective.data.value" value="no">
    	<label class="button" ng-class="{'medium' : objective.data.value !== 'no' }" for="{{objective.data.id}}-no">No</label>
    	<input type="radio" id="{{objective.data.id}}-yes" name="{{objective.data.id}}" ng-model="objective.data.value" value="yes">
    	<label class="button" ng-class="{'medium' : objective.data.value !== 'yes' }" for="{{objective.data.id}}-yes">Yes</label>
	</div>`,
	controller: 'ObjectiveController as objective',
	bindings: {
		data: '=?'
	}
}
