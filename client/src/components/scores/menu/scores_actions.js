export default {
  template: `
  <div class="button-group">
    <div class="hollow button">{{scoresActions.data.scores.length}} scores</div>

    <div class="alert button" ng-if="scoresActions.user === 'admin'" ng-click="scoresActions.openDeletionDialog()">
      <i class="fa" ng-class="scoresActions.deleting ? 'fa-circle-notch fa-spin' : 'fa-trash-alt'"></i>
      <span class="hover-text">Delete all scores</span>
    </div>

    <a class="button" data-tooltip title="Export scores of current stage" ng-href="{{scoresActions.rankingsUrl}}">
      <i class="fa fa-download"></i>
      <span class="hover-text">Export scores</span>
    </a>

    <div class="button" ng-click="scoresActions.newScoresheet()">
      <i class="fas fa-file"></i>
      <span class="hover-text">New score</span>
    </div>
  </div>

<div id="scores-deletion-modal" class="fast reveal" data-reveal data-animation-in="hinge-in-from-middle-y" data-animation-out="hinge-out-from-middle-y">
  <h4><b>All</b> scoring data is about to be permanently deleted</h4>
  <div class="subheader">Warning: You can’t undo this action.</div>
  <div class="grid-x align-center button-group">
    <div class="button" ng-click="scoresActions.closeDeletionDialog()">No, I think I'll pass...</div>
    <div class="alert button" ng-click="scoresActions.deleteAll()">Yes, just do it!</div>
  </div>
  <button class="close-button" data-close aria-label="Close modal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`,
  controller: 'ScoresActionsController as scoresActions'
}
