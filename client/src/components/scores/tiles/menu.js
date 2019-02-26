export default {
  template: `
<input name="search" type="text" ng-model="scoreTilesMenu.filters.search" placeholder="Search Scores" />

<button class="clear button" ng-class="scoreTilesMenu.filters.search === '' ? 'disabled secondary' : ''" ng-click="scoreTilesMenu.filters.search = ''">
  <i class="fa" ng-class="scoreTilesMenu.filters.search === '' ? 'fa-search' : 'fa-times'"></i>
</button>

<div>
  <button class="button" ng-class="{ disabled: scoreTilesMenu.filters.disableDuplicates, secondary: scoreTilesMenu.filters.showDuplicates }" ng-click="scoreTilesMenu.filters.showDuplicates = !scoreTilesMenu.filters.showDuplicates">
    {{ scoreTilesMenu.filters.showDuplicates ? 'Show all scores' : 'Show only duplicates' }}
  </button>
</div>

<div>
  <button class="button"  ng-class="{ disabled: scoreTilesMenu.filters.disableErrors, secondary: scoreTilesMenu.filters.showErrors }" ng-click="scoreTilesMenu.filters.showErrors = !scoreTilesMenu.filters.showErrors">
    {{ scoreTilesMenu.filters.showErrors ? 'Show all scores' : 'Show only bad scores'}}
  </button>
</div>`,
  controller: function () { },
  controllerAs: 'scoreTilesMenu',
  bindings: {
    filters: '=?',
    tableView: '=?'
  }
}
