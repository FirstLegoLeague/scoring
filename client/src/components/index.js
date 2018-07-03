'use strict'

import scoresheet from './scoresheet/scoresheet'
import mission from './scoresheet/mission'
import objective from './scoresheet/objective'
import refIdentity from './scoresheet/ref_identity'

import enumObjective from './scoresheet/objective_types/enum_objective'
import yesnoObjective from './scoresheet/objective_types/yesno_objective'
import numberObjective from './scoresheet/objective_types/number_objective'

import teamSearch from './generic/team_search'

import scores from './scores/scores'
import score from './scores/score'

import status from './status'

export default {
	scoresheet,
	mission,
	objective,

	enumObjective,
	yesnoObjective,
	numberObjective,

	refIdentity,

	scores,
	score,

	teamSearch,

	status
}
