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

		this.$scope.$on('set default', () => self.setDefault())
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
