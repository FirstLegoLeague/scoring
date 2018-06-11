'use strict'

export default {
	template: `
	<div class="top-bar secondary">
		<div class="top-bar-left">
			<input name="search" type="text" ng-model="scores.search" placeholder="search Scores" />
		</div>
	</div>
	<div class="top-bar-page">
		<div id="scores-list" class="grid-x grid-padding-x small-up-2 medium-up-3 large-up-5">
			<div ng-repeat="score in scores.scores()" class="cell">
				<score data="score" class="card"></score>
			</div>
		</div>
	</div>`,
	controller: 'ScoresController as scores'
}