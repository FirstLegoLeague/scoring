export default {
  template: `
<div class="top-bar secondary" ng-if="scores.any() && scores.ready">
  <div class="top-bar-left">
    <div class="menu">
      <a class="clear button" ng-click="scores.tableView = !scores.tableView">
        <i class="fas" ng-class="scores.tableView ? 'fa-th' : 'fa-list'"></i>
      </a>
      
      <scores-tiles-menu class="menu" ng-hide="scores.tableView"
        filters="scores.filters">
      </scores-tiles-menu>

      <scores-table-menu class="menu" ng-show="scores.tableView"
        current-stage="scores.currentStage" stages="scores.stages">
      </scores-table-menu>
    </div>
  </div>

  <div class="top-bar-right">
    <scores-actions class="menu"></scores-actions>
  </div>
</div>

<div class="top-bar secondary" ng-if="!scores.ready"></div>

<div class="top-bar-page" ng-class="{ loading: !scores.ready || (scores.tableView && !scores.rankingsReady) }">
  <div class="dimmer">
    <div class="large loader"></div>
  </div>

  <div id="scores-list" ng-if="scores.any()">
    <scores-tiles-content ng-hide="scores.tableView" class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-5"
      scores="scores.data.scores" should-show-score="scores.shouldShowScore(score)"></scores-tiles-content>

    <scores-table-content ng-show="scores.tableView" class="grid-y"
      ranks="scores.rankings.ranks" stage="scores.currentStage"></scores-table-content>
  </div>

  <no-scores-message ng-if="!scores.any() && scores.ready" id="empty-scores-list" class="grid-container"></no-scores-message>
</div>

<delete-all-scores-modal></delete-all-scores-modal>`,
  controller: 'ScoresController as scores'
}
