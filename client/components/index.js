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

import scoresTiles from './scores/tiles/tiles'
import scoreTile from './scores/tiles/tile'

import scoresTable from './scores/table/table'
import tableSlot from './scores/table/slot'

import emptySlot from './scores/table/slot_types/empty_slot'
import singleScoreSlot from './scores/table/slot_types/single_score_slot'
import conflictSlot from './scores/table/slot_types/conflict_slot'

import conflictScore from './scores/table/slot_types/conflict_slot/conflict_score'

import scoresActions from './scores/menu/scores_actions'
import scoresSizes from './scores/menu/scores_sizes'
import scoresFilters from './scores/menu/scores_filters'
import scoresSort from './scores/menu/scores_sort'
import scoresStage from './scores/menu/scores_stage'

import collectionFilter from './scores/menu/filters/collection_filter'

import noScoresMessage from './scores/no_scores_message'
import scoreActions from './scores/score_actions'

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
  noScoresMessage,
  scoresActions,
  scoresSizes,
  scoresFilters,
  scoreActions,
  scoresSort,
  scoresStage,

  collectionFilter,

  scoresTiles,
  scoreTile,

  scoresTable,
  tableSlot,

  emptySlot,
  singleScoreSlot,
  conflictSlot,
  conflictScore,

  status
}
