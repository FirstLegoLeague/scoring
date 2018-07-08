'use strict'

export default {
	template: `<div class="top-bar secondary">
	<div class="top-bar-left">
		<ul class="menu">
			<li>
				<ref-identity ng-if="scoresheet.isRef"></ref-identity>
			</li>
			<li>
				<form>
					<input type="text" list="teams" blur="submit" ng-model="scoresheet.team">
					<datalist id="teams">
						<select>
							<option type="text" ng-repeat="team in scoresheet.teams">
								{{ team.displayText }}
							</option>
						</select>
					</datalist>
				</form>
			</li>
			<li>
				<select ng-disabled="scoresheet.teamIsSelected()" ng-model="scoresheet.round">
					<option type="text" ng-repeat="round in scoresheet.selectedTeamRounds()">
						{{round.round}}{{round.complete ? '✔' : ''}}
					</option>
				</select>
			</li>
		</ul>
	</div>
	<div class="top-bar-right flex-container">
		<ul class="menu">
			<il>
				<span id="score-diff-animation" ng-show="isFinite(scoresheet.showingScoreDiffAnimation)">{{scoresheet.scoreDiff}}</span>
			</il>
			<il>
				<div class="hollow button">{{scoresheet.score()}} pts.</div>
			</il>
			<il>
				<div class="button" ng-if="scoresheet.isAdmin" ng-click="scoresheet.setDefault()">
					<i class="fa fa-arrow-down"></i>
				</div>
			</il>
			<il>
				<div class="button" ng-click="scoresheet.reset()">
					<i class="fa fa-undo"></i>
				</div>
			</il>
		</ul>
	</div>
</div>
<div class="top-bar-page">
	<div class="grid-container">
		<div class="grid-x grid-padding-x grid-padding-y">
			<div class="cell">
				<div id="{{mission.id}}" class="callout" ng-class="{ success: mission.complete, alert: mission.error }" ng-repeat="mission in scoresheet.missions">
					<mission data="mission"></mission>
				</div>
			</div>
			<div class="cell">
				<div id="signature" class="callout" ng-class="{ alert: scoresheet.error(), success: !(scoresheet.error() || scoresheet.signatureMissing) }">
					<signature-pad accept="getSignature" clear="clearSignature" height="128" width="300" ng-hide="scoresheet.scoresheet._id"></signature-pad>
					<img ng-src="{{scoresheet.scoresheet.signature.dataUrl}}" ng-show="scoresheet.scoresheet._id" />
					<div ng-show="scoresheet.error()" class="stamp hollow alert button" ng-click="scoresheet.scrollToMission(scoresheet.error().mission)">{{scoresheet.error().error}}</div>
				</div>
			</div>
			<div class="cell small-2 small-offset-5">
				<div class="large button" ng-click="scoresheet.save()" ng-disabled="!scoresheet.complete()">Submit</div>
			</div>
		</div>
	</div>
</div>`,
	controller: 'ScoresheetController as scoresheet',
}