export default {
  template: `
  <div>
    <div class="button-group">
      <div class="button" tooltip title="Edit in scoresheet" ng-click="score.open()" ng-disabled="loading">
        <i class="fa fa-edit"></i>
      </div>
      <div class="button" tooltip title="Publish/Unpublish" ng-click="score.togglePublish()" ng-disabled="loading">
        <i class="fa" ng-class="score.togglingPublish ? 'fa-circle-notch fa-spin' : (score.data.public ? 'fa-minus-circle' : 'fa-plus-circle')"></i>
      </div>
      <div class="alert button" tooltip title="Delete" ng-click="score.openDeletionDialog()" ng-disabled="loading">
        <i class="fa" ng-class="score.deleting ? 'fa-circle-notch fa-spin' : 'fa-trash-alt'"></i>
      </div>
    </div>
  </div>`,
  controller: 'ScoreController as score',
  bindings: { data: '=?' }
}
