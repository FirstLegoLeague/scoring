'use strict'

export default {
	template: `
	<div ng-if="refIdentity.isRef" class="hollow button" ng-click="refIdentity.open()" ng-show="refIdentity.showTopbarButton">
		<i class="fa fa-user"></i>
		{{refIdentity.display()}}
	</div>
	<div ng-if="!refIdentity.isRef">
		<input type="text" placeholder="Referee name" ng-model="refIdentity.data.referee">
	</div>
	<div ng-if="!refIdentity.isRef && !refIdentity.data.tablesDisabled">
		<select name="table" ng-model="refIdentity.data.table"
			ng-options="table.tableName for table in refIdentity.data.tables track by table.tableId">
			<option value="" disabled selected hidden>Choose table</option>
		</select>
	</div>
	<div class="fast reveal" id="identity-modal" data-reveal data-animation-in="hinge-in-from-middle-y" data-animation-out="hinge-out-from-middle-y" data-close-on-click="false">
		<h1>Choose your codename</h1>
		<form>
			<div class="grid-container">
				<div class="grid-x grid-padding-x">
					<div class="cell">
						<input type="text" placeholder="Referee" ng-model="refIdentity.data.referee">
					</div>
					<div ng-if="!refIdentity.data.tablesDisabled" class="cell">
						<select name="table" ng-model="refIdentity.data.table"
							ng-options="table.tableName for table in refIdentity.data.tables track by table.tableId">
							<option value="" disabled selected hidden>table</option>
						</select>
					</div>
					<div class="cell small-2 small-offset-5">
						<input type="button" class="button" ng-class="{ 'disabled': !refIdentity.allowSave() }" value="save" ng-click="refIdentity.close()">
					</div>
				</div>
			</div>
		</form>
	</div>`,
	controller: 'RefIdentityController as refIdentity',
}