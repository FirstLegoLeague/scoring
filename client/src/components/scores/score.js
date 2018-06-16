'use strict'

export default {
	template: `
	<div class="card-section">
	<h4>
		<a editable-text="score.data.team" buttons="no" blur="submit" onaftersave="score.save()">
			{{ score.data.team || 'Missing team' }}
		</a>
	</h4>
	<h6 class="subheader">
		<a editable-text="score.data.round" buttons="no" blur="submit" onaftersave="score.save()">
			{{ score.data.round || 'Missing round' }}
		</a>
	</h6>
	</div>
	<div class="stat text-center">
		<a editable-number="score.data.score" buttons="no" blur="submit" onaftersave="score.save()">
			{{ score.data.score || 0 }}
		</a>
	</div>
	<div class="card-divider">
		<a editable-text="score.data.referee" buttons="no" blur="submit" onaftersave="score.save()">
			{{ score.data.referee || 'No one' }}
		</a>
		&#160;on table&#160;
		<a editable-text="score.data.table" buttons="no" blur="submit" onaftersave="score.save()">
			{{ score.data.table || 'no table' }}.
		</a>
	</div>
	<div class="card-section">
		<div class="button-group">
			<div class="button" ng-click="score.open()"><i class="fa fa-edit"></i></div>
			<div class="button" ng-click="score.togglePublish()"><i class="fa"  ng-class="score.togglingPublish ? 'fa-circle-notch fa-spin' : (score.data.public ? 'fa-minus-circle' : 'fa-plus-circle')"></i></div>
			<div class="alert button" ng-click="score.openDeletionDialog()"><i class="fa" ng-class="score.deleting ? 'fa-circle-notch fa-spin' : 'fa-trash-alt'"></i></div>
		</div>
	</div>
	<div class="deletion-modal reveal" data-reveal>
		<h4>Do you really want to delete this score?</h4>
		<div class="subheader">This operation is ireversable!</div>
		<div class="grid-x align-center button-group button-group">
			<div class="button" ng-click="score.closeDeletionDialog()">No, I think I'll pass...</div>
			<div class="alert button" ng-click="score.delete()">Yes, just do it!</div>
		</div>
		<button class="close-button" data-close aria-label="Close modal" type="button">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>`,
	controller: 'ScoreController as score',
	bindings: {
		data: '=?'
	}
}