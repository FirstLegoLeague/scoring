export default {
  template: `
<div class="card" ng-if="score.ready" ng-class="{ loading: score.loading }">
    <div class="dimmer">
        <div class="big loader"></div>
    </div>
    <div class="card-section">
        <h4>
            <a editable-select="score.data.teamNumber" buttons="no" blur="submit" onaftersave="score.updateMatch()" e-ng-options="team.number as team.displayText for team in score.Tournament.teams">
                <div ng-class="{'card-section alert' : score.teamNumberError()}">{{ score.teamText() }}</div>
            </a>
        </h4>
        <h6 class="subheader">
            <a editable-select="score.data.matchId" buttons="no" blur="submit" onaftersave="score.save()" e-ng-options="match._id as match.displayText for match in score.matches">
                <div ng-class="{'card-section alert' : score.matchError()}">{{ score.matchText() }}</div>
            </a>
        </h6>
    </div>
    <div class="stat text-center">
        <a editable-number="score.data.score" buttons="no" blur="submit" onaftersave="score.save()">
            {{ score.data.score || 0 }}
        </a>
    </div>
    <div class="card-divider" ng-if="!score.Tournament.tablesDisabled">
        <a editable-text="score.data.referee" buttons="no" blur="submit" onaftersave="score.save()">
            {{ score.data.referee || 'No one' }}
        </a>
        &#160;on table&#160;
        <a editable-select="score.data.tableId" buttons="no" blur="submit" onaftersave="score.save()" e-ng-options="table.tableId as table.tableName for table in score.Tournament.tables">
            {{ score.tableText() }}.
        </a>
    </div>
    <div class="card-section flex-child-shrink">
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
  controller: 'ScoreController as score',
  bindings: { data: '=?' }
}
