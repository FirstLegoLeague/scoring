'use strict'

class MissionController {

	constructor ($scope) {
		this.$scope = $scope
	}

	$onInit () {
		let self = this
		this.$scope.$on('objective complete', () => {
			self.data.process()
			if(self.data.complete) {
				self.$scope.$emit('mission complete')
			}
		})
	}

}

MissionController.$$ngIsClass = true
MissionController.$inject = ['$scope']

export default MissionController