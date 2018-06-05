'use strict'

export default {
	template: `<div id="scores-list" class="grid-x grid-padding-x small-up-2 medium-up-3 medium-up-5">
		<div ng-repeat="score in scores.scores" class="cell">
			<score data="score" class="card"></score>
		</div>
	</div>`,
	controller: 'ScoresController as scores'
}