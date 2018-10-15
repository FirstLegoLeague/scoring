/* General view */

import status from './status'

/* Scoresheet view */

import scoresheet from './scoresheet/scoresheet'
import mission from './scoresheet/mission'
import objective from './scoresheet/objective'
import scoreDiffAnimation from './scoresheet/score_diff_animation'
import scoresheetSignature from './scoresheet/scoresheet_signature'

import scoresheetMenu from './scoresheet/menu/scoresheet_menu'
import scoresheetActions from './scoresheet/menu/scoresheet_actions'
import metadataInputs from './scoresheet/menu/metadata_inputs'
import refIdentity from './scoresheet/menu/ref_identity'

import enumObjective from './scoresheet/objective_types/enum_objective'
import yesnoObjective from './scoresheet/objective_types/yesno_objective'
import numberObjective from './scoresheet/objective_types/number_objective'

/* Scores view */

import scores from './scores/scores'
import noScoresMessage from './scores/no_scores_message'

import scoresMenu from './scores/menu/scores_menu'
import scoresFilters from './scores/menu/scores_filters'
import scoresActions from './scores/menu/scores_actions'

import score from './scores/score'

export default {
  scoresheet,
  mission,
  objective,
  scoreDiffAnimation,
  scoresheetSignature,

  scoresheetMenu,
  scoresheetActions,
  metadataInputs,
  refIdentity,

  enumObjective,
  yesnoObjective,
  numberObjective,

  scores,
  scoresMenu,
  scoresFilters,
  scoresActions,
  noScoresMessage,
  score,

  status
}
