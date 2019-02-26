export default {
  template: `
<input name="search" type="text" ng-model="scoreTableMenu.filters.search" placeholder="Search Scores" />

<button class="clear button" ng-class="scoreTableMenu.filters.search === '' ? 'disabled secondary' : ''" ng-click="scoreTableMenu.filters.search = ''">
  <i class="fa" ng-class="scoreTableMenu.filters.search === '' ? 'fa-search' : 'fa-times'"></i>
</button>

<div>
  <button class="button" ng-class="{ disabled: scoreTableMenu.filters.disableDuplicates, secondary: scoreTableMenu.filters.showDuplicates }" ng-click="scoreTableMenu.filters.showDuplicates = !scoreTableMenu.filters.showDuplicates">
    {{ scoreTableMenu.filters.showDuplicates ? 'Show all scores' : 'Show only duplicates' }}
  </button>
</div>

<div>
  <button class="button"  ng-class="{ disabled: scoreTableMenu.filters.disableErrors, secondary: scoreTableMenu.filters.showErrors }" ng-click="scoreTableMenu.filters.showErrors = !scoreTableMenu.filters.showErrors">
    {{ scoreTableMenu.filters.showErrors ? 'Show all scores' : 'Show only bad scores'}}
  </button>
</div>`,
  controller: function () { },
  controllerAs: 'scoreTableMenu',
  bindings: {
    filters: '=?',
    tableView: '=?'
  }
}
