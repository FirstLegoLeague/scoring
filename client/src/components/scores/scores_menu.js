export default {
  template: `
<div class="top-bar-left">
  <div class="menu">
    <a class="clear button" ng-click="scoresMenu.tableView = !scoresMenu.tableView">
      <i class="fas" ng-class="scoresMenu.tableView ? 'fa-th' : 'fa-list'"></i>
    </a>
    
    <scores-tiles-menu class="menu" ng-hide="scoresMenu.tableView"
      filters="scoresMenu.filters"
      table-view="scoresMenu.tableView">
    </scores-tiles-menu>

    <scores-table-menu class="menu" ng-show="scores.tableView"
      table-view="scoresMenu.tableView">
    </scores-table-menu>
  </div>
</div>

<div class="top-bar-right">
  <scores-actions class="menu"></scores-actions>
</div>`,
  controller: function () { },
  controllerAs: 'scoresMenu',
  bindings: {
    filters: '=?',
    tableView: '=?'
  }
}
