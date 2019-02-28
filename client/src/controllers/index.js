import ScoringController from './scoring_controller'
import StatusController from './status_controller'

import ScoresheetController from './scoresheet/scoresheet_controller'
import MissionController from './scoresheet/mission_controller'
import ObjectiveController from './scoresheet/objective_controller'
import ScoreDiffAnimationController from './scoresheet/score_diff_animation_controller'
import ScoresheetSignatureController from './scoresheet/scoresheet_signature_controller'

import ScoresheetMenuController from './scoresheet/menu/scoresheet_menu_controller'
import MetadataInputsController from './scoresheet/menu/metadata_inputs_controller'
import ScoresheetActionsController from './scoresheet/menu/scoresheet_actions_controller'
import RefIdentityController from './scoresheet/menu/ref_identity_controller'

import ScoresController from './scores/scores_controller'
import ScoresActionsController from './scores/menu/scores_actions_controller'
import ScoreActionsController from './scores/score_actions_controller'

import ScoreTileController from './scores/tiles/score_tile_controller'

import EmptySlotController from './scores/table/slot_types/empty_slot_controller'
import SingleScoreSlotController from './scores/table/slot_types/single_score_slot_controller'
import ConflictSlotController from './scores/table/slot_types/conflict_slot_controller'
import SlotController from './scores/table/slot_controller'
import ConflictScoreController from './scores/table/slot_types/conflict_slot/conflict_score_controller'

// eslint-disable-next-line node/exports-style
export default {
  ScoringController,
  StatusController,

  ScoresheetController,
  MissionController,
  ObjectiveController,
  ScoreDiffAnimationController,
  ScoresheetSignatureController,

  RefIdentityController,
  ScoresheetMenuController,
  MetadataInputsController,
  ScoresheetActionsController,

  ScoresController,
  ScoresActionsController,
  ScoreActionsController,

  ScoreTileController,

  SlotController,
  EmptySlotController,
  SingleScoreSlotController,
  ConflictSlotController,
  ConflictScoreController

}
