export default {
  template: `
  <div class="deletion-modal fast reveal" data-reveal data-animation-in="hinge-in-from-middle-y" data-animation-out="hinge-out-from-middle-y">
    <h4>Do you really want to delete this score?</h4>
    <div class="subheader">Warning: You can’t undo this action.</div>
    <div class="grid-x align-center button-group">
      <div class="button" ng-click="score.closeDeletionDialog()">No, I think I'll pass...</div>
      <div class="alert button" ng-click="score.delete()">Yes, just do it!</div>
    </div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`,
  controller: 'ScoreController as score',
  bindings: { data: '=?' }
}
