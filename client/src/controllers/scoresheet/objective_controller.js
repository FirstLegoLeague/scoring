'use strict'

class ObjectiveController {

	constructor ($scope) {
		this.$scope = $scope
	}

	$onInit () {
		let self = this
		this.$scope.$watch(() => self.data.value, () => {
			self.data.complete = true
			self.$scope.$emit('objective complete')
		})
	}

}

ObjectiveController.$inject = ['$scope']

export default ObjectiveController
