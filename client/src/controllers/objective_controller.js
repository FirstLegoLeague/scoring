'use strict'

class ObjectiveController {

	constructor ($scope) {
		this.$scope = $scope
	}

	markAsComplete () {
		this.data.complete = true
		this.$scope.$emit('objective complete')
	}

}

ObjectiveController.$inject = ['$scope']

export default ObjectiveController
