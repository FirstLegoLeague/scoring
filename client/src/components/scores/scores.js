export default {
  template: `
<div class="top-bar secondary" ng-if="scores.any() && scores.ready">
  <div class="top-bar-left">
    <div class="menu">
      <a class="clear button" ng-click="scores.tableView = !scores.tableView">
        <i class="fas" ng-class="scores.tableView ? 'fa-th' : 'fa-list'"></i>
      </a>
      
      <scores-sizes class="button-group" size="scores.size"></scores-sizes>
      <scores-filters class="flex-child-grow" filters="scores.filters"></scores-filters>

      <div class="menu" ng-if="scores.tableView">
        <select ng-model="scores.currentStage" ng-options="stage for stage in scores.stages"></select>
      </div>
    </div>
  </div>

  <div class="top-bar-right">
    <scores-actions class="menu"></scores-actions>
  </div>
</div>
<div class="top-bar secondary" ng-if="!scores.ready"></div>

<div class="top-bar-page" ng-class="{ loading: !scores.ready }">
  <div class="dimmer">
    <div class="large loader"></div>
  </div>

  <div id="scores-list" ng-if="scores.any()" ng-class="scores.size">
    <scores-tiles ng-hide="scores.tableView" class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-5"
      scores="scores.data.scores" should-show-score="scores.shouldShowScore(score)"></scores-tiles>

    <scores-table ng-show="scores.tableView" class="grid-y" ng-class="{ loading: !scores.rankingsReady }"
      current-stage="scores.currentStage" size="scores.size"></scores-table>
  </div>

  <no-scores-message id="empty-scores-list" ng-if="!scores.any() && scores.ready" class="grid-container"></no-scores-message>
</div>

<delete-all-scores-modal></delete-all-scores-modal>`,
  controller: 'ScoresController as scores'
}
