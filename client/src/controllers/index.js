'use strict'

import ScoringController from './scoring_controller'

import ScoresheetController from './scoresheet/scoresheet_controller'
import MissionController from './scoresheet/mission_controller'
import ObjectiveController from './scoresheet/objective_controller'

import ScoresController from './scores/scores_controller'
import ScoreController from './scores/score_controller'

import RefIdentityController from './scoresheet/ref_identity_controller'
import StatusController from './status_controller'

import GenericController from './generic/generic_controller'

// eslint-disable-next-line node/exports-style
export default {
	ScoringController,
	
	ScoresheetController,
	MissionController,
	ObjectiveController,
	
	ScoresController,
	ScoreController,

	RefIdentityController,
	StatusController,

	GenericController
}
