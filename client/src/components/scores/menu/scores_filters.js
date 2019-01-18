export default {
  template: `
  <input name="search" type="text" ng-model="filters.data.search" placeholder="Search Scores" />

  <button class="clear button" ng-class="filters.data.search === '' ? 'disabled secondary' : ''" ng-click="filters.data.search = ''">
    <i class="fa" ng-class="filters.data.search === '' ? 'fa-search' : 'fa-times'"></i>
  </button>

  <div>
    <button class="button" ng-class="{ disabled: filters.data.disableDuplicates, secondary: filters.data.showDuplicates }" ng-click="filters.data.showDuplicates = !filters.data.showDuplicates">
      {{ filters.data.showDuplicates ? 'Show all scores' : 'Show only duplicates' }}
    </button>
  </div>
  
  <div>
    <button class="button"  ng-class="{ disabled: filters.data.disableErrors, secondary: filters.data.showErrors }" ng-click="filters.data.showErrors = !filters.data.showErrors">
      {{ filters.data.showErrors ? 'Show all scores' : 'Show only bad scores'}}
    </button>
  </div>`,
  controller: function () {},
  controllerAs: 'filters',
  bindings: {
    data: '=?'
  }
}
