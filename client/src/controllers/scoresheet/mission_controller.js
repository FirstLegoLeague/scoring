'use strict'

class MissionController {

	constructor ($scope) {
		this.$scope = $scope
		this.showDescription = false
	}

	$onInit () {
		this.$scope.$on('objective complete', () => {
			this.data.process()
			if(this.data.complete) {
				this.$scope.$emit('mission complete')
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