'use strict'

import scores from './scores/scores'
import scoresheet from './scoresheet/scoresheet'
import mission from './scoresheet/mission'
import objective from './scoresheet/objective'
import enumObjective from './scoresheet/objective_types/enum_objective'
import yesnoObjective from './scoresheet/objective_types/yesno_objective'
import numberObjective from './scoresheet/objective_types/number_objective'

// eslint-disable-next-line node/exports-style
export default {
	scores,
	scoresheet,
	mission,
	objective,
	enumObjective,
	yesnoObjective,
	numberObjective
}
