export default {
  template: `
<div class="card-section score-deatils">
  <div class="stat text-center">
    {{ score.data.scoreText }}
  </div>
  <small>{{ score.data.dateText }}</small>
</div>
<div class="card-section flex-child-shrink">
  <div class="button-group">
    <div class="secondary button" ng-click="score.togglePublish()" ng-disabled="loading">
      <i class="fa" ng-class="score.togglingPublish ? 'fa-circle-notch fa-spin' : (score.data.public ? 'fa-minus-circle' : 'fa-plus-circle')"></i>
      <span class="hover-text">{{(score.data.public ? 'Unpublish' : 'Publish')}}</span>
    </div>
    <div class="alert button" ng-click="score.openDeletionDialog()" ng-disabled="loading">
      <i class="fa" ng-class="score.deleting ? 'fa-circle-notch fa-spin' : 'fa-trash-alt'"></i>
      <span class="hover-text">Delete</span>
    </div>
  </div>

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
  </div>
</div>`,
  controller: 'ConflictScoreController as score',
  bindings: {
    data: '=?'
  }
}
