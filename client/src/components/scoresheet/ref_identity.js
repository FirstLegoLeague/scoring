'use strict'

export default {
	template: `
	<div class="hollow button" ng-click="refIdentity.open()" ng-show="refIdentity.showTopbarButton">
		<i class="fa fa-person"></i>
		{{refIdentity.display()}}
	</div>
	<div class="reveal" id="identity-modal" data-reveal data-close-on-click="false">
		<h1>Choose your codename</h1>
		<form>
			<div class="grid-container">
				<div class="grid-x grid-padding-x">
					<div class="cell">
						<input type="text" placeholder="referee" ng-model="refIdentity.referee">
					</div>
					<div class="cell">
						<select name="table" placeholder="table" ng-model="refIdentity.table"
							ng-options="table.tableName for table in refIdentity.tables track by table.tableId">
						</select>
					</div>
					<div class="cell small-2 small-offset-5">
						<input type="button" class="button" value="save" ng-click="refIdentity.close()">
					</div>
				</div>
			</div>
		</form>
	</div>`,
	controller: 'RefIdentityController as refIdentity',
}