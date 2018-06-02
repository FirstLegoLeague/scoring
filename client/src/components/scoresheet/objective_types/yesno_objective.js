'use strict'

export default {
	template: `<div class="small button-group toggle" ng-click="objective.markAsComplete()">
    	<input type="radio" id="{{objective.data.id}}-yes" name="{{objective.data.id}}" ng-model="objective.data.value" value="yes">
    	<label class="medium button" for="{{objective.data.id}}-yes">Yes</label>
    	<input type="radio" id="{{objective.data.id}}-no" name="{{objective.data.id}}" ng-model="objective.data.value" value="no">
    	<label class="medium button" for="{{objective.data.id}}-no">No</label>
	</div>`,
	controller: 'ObjectiveController as objective',
	bindings: {
		data: '=?'
	}
}