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

import scoresTilesContent from './scores/tiles/content'
import scoresTilesMenu from './scores/tiles/menu'
import scoresTableContent from './scores/table/content'
import scoresTableMenu from './scores/table/menu'

import scoresMenu from './scores/scores_menu'
import noScoresMessage from './scores/no_scores_message'
import scoresActions from './scores/scores_actions'
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
  scoresTilesContent,
  scoresTilesMenu,
  scoresTableContent,
  scoresTableMenu,

  scoresMenu,
  noScoresMessage,
  scoresActions,
  score,

  status
}
