'use strict'

export default {
	template: `
	<div class="card-section">
		<h4>{{score.data.team || 'Default Team'}}</h4>
		<h6 class="subheader">{{score.data.round || 'Round I'}}</h6>
	</div>
	<div class="stat text-center">{{score.data.score}}</div>
	<div class="card-divider">{{score.data.referee}} On table {{score.data.table}}</div>
	<div class="card-section">
		<div class="button-group">
			<div class="button"><i class="fa fa-edit"></i></div>
			<div class="button" ng-click="score.togglePublish()"><i class="fa"  ng-class="score.togglingPublish ? 'fa-circle-notch fa-spin' : (score.data.public ? 'fa-minus-circle' : 'fa-plus-circle')"></i></div>
			<div class="alert button" ng-click="score.delete()"><i class="fa" ng-class="score.deleting ? 'fa-circle-notch fa-spin' : 'fa-trash-alt'"></i></div>
		</div>
	</div>`,
	controller: 'ScoreController as score',
	bindings: {
		data: '=?'
	}
}