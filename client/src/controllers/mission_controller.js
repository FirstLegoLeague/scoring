'use strict'

class MissionController {

	constructor ($scope) {
		let self = this
		this.$scope = $scope
		this.$scope.$on('objective complete', () => self.process())
	}

	process () {
		this.data.complete = this.data.objectives.every(objective => objective.complete)
		if(this.data.complete) {
			this.$scope.$emit(`mission complete`)
		}
	}

}

MissionController.$inject = ['$scope']

export default MissionController