'use strict'

export default {
	template: `
	<div class="hollow button" ng-click="identity.open()" ng-show="identity.showTopbarButton">
		<i class="fa fa-person"></i>
		{{identity.display()}}
	</div>
	<div class="reveal" id="identity-modal" data-reveal data-close-on-click="false">
		<h1>Choose your codename</h1>
		<form>
			<div class="grid-container">
				<div class="grid-x grid-padding-x">
					<div class="cell">
						<input type="text" placeholder="referee" ng-model="identity.referee">
					</div>
					<div class="cell">
						<input type="text" placeholder="table" ng-model="identity.table">
					</div>
					<div class="cell small-2 small-offset-5">
						<input type="button" class="button" value="save" ng-click="identity.close()">
					</div>
				</div>
			</div>
		</form>
	</div>`,
	controller: 'IdentityController as identity',
}