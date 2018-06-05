'use strict'

import ScoringController from './scoring_controller'
import ScoresheetController from './scoresheet/scoresheet_controller'
import MissionController from './scoresheet/mission_controller'
import ObjectiveController from './scoresheet/objective_controller'

import IdentityController from './scoresheet/identity_controller'

import ScoresController from './scores/scores_controller'
import ScoreController from './scores/score_controller'

// eslint-disable-next-line node/exports-style
export default {
	ScoringController,
	ScoresheetController,
	MissionController,
	ObjectiveController,
	IdentityController,
	
	ScoresController,
	ScoreController
}
