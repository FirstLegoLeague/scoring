'use strict'

export default {
	template: `
	<span ng-class="status.class()" id="status">
		<i class="fa fa-circle"></i>{{status.text()}}
	</span>`,
	controller: 'StatusController as status',
}