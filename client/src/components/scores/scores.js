'use strict'

export default {
	template: `<input name="scores" ng-model="scoreText" />
		<div class="scores-template">{{scoreText}}</div>`,
	bidings: {
		scoreText: '='
	}
}