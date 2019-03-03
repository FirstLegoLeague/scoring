export default {
  template: `
<div class="top-bar secondary" ng-if="scores.any() && scores.ready">
  <div class="top-bar-left">
    <div class="menu">
      <a class="clear button" ng-click="scores.tableView = !scores.tableView">
        <i class="fas" ng-class="scores.tableView ? 'fa-th' : 'fa-list'"></i>
      </a>
      
      <scores-sizes class="button-group" size="scores.size"></scores-sizes>
      <scores-filters class="flex-child-grow menu" filters="scores.filters"></scores-filters>

      <div class="menu" ng-show="scores.tableView">
        <select ng-model="scores.currentStage" ng-options="stage for stage in scores.stages"></select>
      </div>
      <div id="sort-dropdown" class="dropdown menu" data-dropdown-menu ng-hide="scores.tableView">
        <li>
          <div class="clear button"><i class="fa fa-caret-down"></i>&nbsp;Sort (<span ng-bind-html="scores.textsHash[scores.sort]"></span>)</div>
          <ul class="menu">
            <li ng-repeat="option in scores.sortOptions">
              <div class="clear button"
                ng-class="{ secondary: scores.sort !== option.value }"
                ng-click="scores.sort = option.value"
                ng-bind-html="option.text">
              </div>
            </li>
          </ul>
        </li>
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
      scores="scores.sortedScores" should-show-score="scores.shouldShowScore(score)"></scores-tiles>

    <scores-table ng-show="scores.tableView" class="grid-y" ng-class="{ loading: !scores.rankingsReady }"
      current-stage="scores.currentStage" size="scores.size"></scores-table>
  </div>

  <no-scores-message id="empty-scores-list" ng-if="!scores.any() && scores.ready" class="grid-container"></no-scores-message>
</div>

<delete-all-scores-modal></delete-all-scores-modal>`,
  controller: 'ScoresController as scores'
}
