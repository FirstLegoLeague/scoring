export default {
  template: `
  <div>
    <input name="search" type="text" ng-model="scores.filters.search" placeholder="Search Scores" />
  </div>

  <div>
    <button class="button" ng-class="{ disabled: scores.duplicateScores().length === 0, secondary: scores.filters.showDuplicates }" ng-click="scores.filters.showDuplicates = !scores.filters.showDuplicates">
      {{ scores.filters.showDuplicates ? 'Show all scores' : 'Show only duplicates' }}
    </button>
  </div>
  
  <div>
    <button class="button"  ng-class="{ disabled: scores.errorScores().length === 0, secondary: scores.filters.showErrors }" ng-click="scores.filters.showErrors = !scores.filters.showErrors">
      {{ scores.filters.showErrors ? 'Show all scores' : 'Show only bad scores'}}
    </button>
  </div>`,
  controller: 'ScoresController as scores',
  bindings: {
    filters: '=?'
  }
}
