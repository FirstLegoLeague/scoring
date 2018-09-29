export default {
  template: `
<div id="scores-deletion-modal" class="fast reveal" data-reveal data-animation-in="hinge-in-from-middle-y" data-animation-out="hinge-out-from-middle-y">
  <h4><b>All</b> scoring data is about to be permanently deleted</h4>
  <div class="subheader">Warning: You can’t undo this action.</div>
  <div class="grid-x align-center button-group">
    <div class="button" ng-click="scores.closeDeletionDialog()">No, I think I'll pass...</div>
    <div class="alert button" ng-click="scores.deleteAll()">Yes, just do it!</div>
  </div>
  <button class="close-button" data-close aria-label="Close modal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`,
  controller: 'ScoresController as scores'
}
