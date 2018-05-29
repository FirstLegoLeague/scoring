'use strict'

class ScoresheetController {

	constructor (Scoresheet) {
		let self = this
		self.Scoresheet = Scoresheet
	}

	$onInit() {
		let self = this
	    self.Scoresheet.load().then(scoresheet => {
			self.scoresheet = scoresheet
			self.missions = scoresheet.missions
			self.missions.forEach(mission => {
				console.log(mission.title)
			})
		})
	 }

}

ScoresheetController.$inject = ['Scoresheet']

export default ScoresheetController
