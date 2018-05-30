'use strict'

export default {
	template: `<div class="grid-container">
		<div class="grid-x grid-padding-x grid-padding-y">
			<div class="cell">
				<div id="{{mission.id}}" class="callout" ng-class="{ done: mission.complete }" ng-repeat="mission in scoresheet.missions" >
					<mission data="mission"></mission>
				</div>
			</div>
		</div>
	</div>`,
	controller: 'ScoresheetController as scoresheet',
}