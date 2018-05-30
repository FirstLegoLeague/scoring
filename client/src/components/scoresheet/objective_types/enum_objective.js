'use strict'

export default {
	template: `<div class="button-group toggle">
	    <span ng-repeat="option in objective.data.options" ng-click="objective.markAsComplete()">
	    	<input type="radio" id="{{objective.data.id}}-{{option.value}}" name="{{objective.data.id}}" ng-model="objective.data.result" value="{{option.value}}">
	    	<label class="medium button" for="{{objective.data.id}}-{{option.value}}">{{option.title}}</label>
	    </span>
	</div>`,
	controller: 'ObjectiveController as objective',
	bindings: {
		data: '=?'
	}
}