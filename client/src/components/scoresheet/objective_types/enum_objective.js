'use strict'

export default {
	template: `<div class="small button-group toggle">
	    <span ng-repeat="option in objective.data.options">
	    	<input type="radio" id="{{objective.data.id}}-{{option.value}}" name="{{objective.data.id}}" ng-model="objective.data.value" value="{{option.value}}">
	    	<label class="medium button" for="{{objective.data.id}}-{{option.value}}">{{option.title}}</label>
	    </span>
	</div>`,
	controller: 'ObjectiveController as objective',
	bindings: {
		data: '=?'
	}
}