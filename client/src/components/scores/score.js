export default {
  template: `
<div class="card" ng-class="{ loading: !score.data.ready }">
  <div class="dimmer">
    <div class="big loader"></div>
  </div>

  <div class="card-section">
    <div>
      <h4>
        <a editable-select="score.data.teamNumber" buttons="no" blur="submit" onaftersave="score.updateMatch()" e-ng-options="team.number as team.displayText for team in score.tournament.teams">
          <div ng-class="{'card-section alert' : score.data.teamNumberError}">{{ score.data.teamText }}</div>
        </a>
      </h4>
      <h6 class="align-justify align-middle grid-x subheader">
        <a editable-select="score.data.matchId" buttons="no" blur="submit" onaftersave="score.setMatch()" e-ng-options="match._id as match.displayText for match in score.data.matches">
          <div ng-class="{'card-section alert' : score.data.matchError}">{{ score.data.matchText }}</div>
        </a>
        <small>{{ score.data.dateText }}</small>
      </h6>
    </div>
  </div>

  <div class="stat text-center">
    <a editable-number="score.data.score" buttons="no" blur="submit" onaftersave="score.save()">
      {{ score.data.scoreText }}
    </a>
  </div>

  <div class="card-divider">
    <a editable-text="score.data.referee" buttons="no" blur="submit" onaftersave="score.save()">
      {{ score.data.referee || 'No one' }}
    </a>
    <span ng-if="!score.tournament.tablesDisabled">
      &#160;on table&#160;
      <a editable-select="score.data.tableId" buttons="no" blur="submit" onaftersave="score.save()" e-ng-options="table.tableId as table.tableName for table in score.tournament.tables">
        {{ score.data.tableText }}.
      </a>
    </span>
  </div>

  <div class="card-section flex-child-shrink">
    <div class="button-group">
      <div class="secondary button" ng-click="score.open()" ng-disabled="loading">
        <i class="fa fa-edit"></i>
        <span class="hover-text">Open</span>
      </div>
      <div class="secondary button" ng-click="score.togglePublish()" ng-disabled="loading">
        <i class="fa" ng-class="score.togglingPublish ? 'fa-circle-notch fa-spin' : (score.data.public ? 'fa-minus-circle' : 'fa-plus-circle')"></i>
        <span class="hover-text">{{(score.data.public ? 'Unpublish' : 'Publish')}}</span>
      </div>
      <div class="secondary button" ng-click="score.toggleNoShow()" ng-disabled="loading">
        <i class="fa" ng-class="score.togglingNoShow ? 'fa-circle-notch fa-spin' : (score.data.noShow ? 'fa-check-circle' : 'fa-ban')"></i>
        <span class="hover-text">{{(score.data.noShow ? 'Show' : 'No Show')}}</span>
      </div>
      <div class="alert button" ng-click="score.openDeletionDialog()" ng-disabled="loading">
        <i class="fa" ng-class="score.deleting ? 'fa-circle-notch fa-spin' : 'fa-trash-alt'"></i>
        <span class="hover-text">Delete</span>
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
