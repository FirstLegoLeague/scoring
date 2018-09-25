'use strict'

class ObjectiveController {

	constructor ($scope) {
		this.$scope = $scope
	}

	$onInit () {
		this.$scope.$watch(() => this.data.value, () => {
			this.data.complete = true
			this.$scope.$emit('objective complete')
		})

		this.$scope.$on('set default', () => this.setDefault())
	}

	setDefault () {
		if(!this.data.value) {
			this.data.value = this.data.default
		}
	}

}

ObjectiveController.$$ngIsClass = true
ObjectiveController.$inject = ['$scope']

export default ObjectiveController
