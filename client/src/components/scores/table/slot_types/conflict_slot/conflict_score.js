export default {
  template: `
<div class="card-section score-deatils">
  <div class="stat text-center">
    {{ conflictScore.data.scoreText }}
  </div>
  <small>{{ conflictScore.data.dateText }}</small>
</div>
<div class="card-section flex-child-shrink">
  <div class="button-group">
    <div class="secondary button" ng-click="conflictScore.togglePublish()" ng-disabled="loading">
      <i class="fa" ng-class="conflictScore.togglingPublish ? 'fa-circle-notch fa-spin' : (conflictScore.data.public ? 'fa-minus-circle' : 'fa-plus-circle')"></i>
      <span class="hover-text">{{(conflictScore.data.public ? 'Unpublish' : 'Publish')}}</span>
    </div>
    <div class="alert button" ng-click="conflictScore.openDeletionDialog()" ng-disabled="loading">
      <i class="fa" ng-class="conflictScore.deleting ? 'fa-circle-notch fa-spin' : 'fa-trash-alt'"></i>
      <span class="hover-text">Delete</span>
    </div>
  </div>

  <div class="deletion-modal fast reveal" data-reveal data-animation-in="hinge-in-from-middle-y" data-animation-out="hinge-out-from-middle-y">
    <h4>Do you really want to delete this score?</h4>
    <div class="subheader">Warning: You can’t undo this action.</div>
    <div class="grid-x align-center button-group">
      <div class="button" ng-click="conflictScore.closeDeletionDialog()">No, I think I'll pass...</div>
      <div class="alert button" ng-click="conflictScore.delete()">Yes, just do it!</div>
    </div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</div>`,
  controller: 'ConflictScoreController as conflictScore',
  bindings: {
    data: '=?'
  }
}
