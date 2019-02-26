export default {
  template: `
<scores-menu class="top-bar secondary" ng-if="scores.any() && scores.ready"
  filters="scores.filters" table-view="scores.tableView">
</scores-menu>

<div class="top-bar secondary" ng-if="!scores.ready"></div>

<div class="top-bar-page" ng-class="{ loading: !scores.ready }">
  <div class="dimmer">
    <div class="large loader"></div>
  </div>

  <div id="scores-list" ng-if="scores.any()">
    <scores-tiles-content ng-hide="scores.tableView" class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-5"
      scores="scores.data.scores" should-show-score="scores.shouldShowScore(score)"></scores-tiles-content>

    <scores-tiles-content ng-show="scores.tableView" class="grid-x"
      ranks="scores.rankings.ranks"></scores-tiles-content>
  </div>

  <no-scores-message ng-if="!scores.any() && scores.ready" id="empty-scores-list" class="grid-container"></no-scores-message>
</div>

<delete-all-scores-modal></delete-all-scores-modal>`,
  controller: 'ScoresController as scores'
}
