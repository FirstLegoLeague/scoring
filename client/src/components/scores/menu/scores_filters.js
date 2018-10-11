export default {
  template: `
  <div>
    <input name="search" type="text" ng-model="filters.data.search" placeholder="Search Scores" />
  </div>

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
