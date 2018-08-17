'use strict'

class MissionController {

	constructor ($scope) {
		this.$scope = $scope
		this.showDescription = false
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

	toggleDescription () {
		this.showDescription = !this.showDescription
	}

}

MissionController.$$ngIsClass = true
MissionController.$inject = ['$scope']

export default MissionController