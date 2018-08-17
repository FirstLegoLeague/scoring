'use strict'

export default {
	template: `<h3>
		{{mission.data.title}}
		<span class="clear button" ng-click="mission.toggleDescription()" tooltip title="Show Description">
			<i class="fa fa-question"></i>
		</span>
	</h3>
	<div ng-if="mission.showDescription" class="callout">{{mission.data.description}}</div>
	<div ng-show="mission.data.error" class="stamp hollow alert button">{{mission.data.error}}</div>
	<div ng-show="mission.data.complete" class="stamp hollow success button">{{mission.data.score}} pts.</div>
	<div class="grid-container">
		<objective data="objective" ng-repeat="objective in mission.data.objectives" class="grid-x grid-padding-x align-justify"></objective>
	</div>`,
	controller: 'MissionController as mission',
	bindings: {
		data: '=?'
	}
}
