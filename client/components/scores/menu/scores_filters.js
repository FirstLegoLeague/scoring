export default {
  template: `
<div class="menu">
  <div class="button-group">
    <div class="button"
      ng-class="{ secondary: !filters.data.showDuplicates }"
      ng-click="filters.data.showDuplicates = !filters.data.showDuplicates">
      <i class="fa fa-copy"></i>
      <span class="hover-text">Only duplicates</span>
    </div>
    <div class="button"
      ng-class="{ secondary: filters.data.showPublic === 0 }"
      ng-click="filters.data.showPublic = (filters.data.showPublic + 1) % 3">
      <i class="fa" ng-class="(filters.data.showPublic === 0) ? 'fa-circle' : ((filters.data.showPublic === 1) ? 'fa-plus-circle' : 'fa-minus-circle')"></i>
      <span class="hover-text" ng-switch="filters.data.showPublic">
        <span ng-switch-when="0">Publication filter</span>
        <span ng-switch-when="1">Only public</span>
        <span ng-switch-when="2">Only unpublic</span>
      </span>
    </div>
    <div class="button"
      ng-class="{ secondary: !filters.data.showNoShow }"
      ng-click="filters.data.showNoShow = !filters.data.showNoShow">
      <i class="fa fa-ban"></i>
      <span class="hover-text">Only no-show</span>
    </div>
    <div class="button"
      ng-class="{ secondary: !filters.data.showErrors }"
      ng-click="filters.data.showErrors = !filters.data.showErrors">
      <i class="fa fa-exclamation-triangle"></i>
      <span class="hover-text">Only errors</span>
    </div>
  </div>
  
  <collection-filter class="menu" title="Teams(numbers)" data="filters.data.teams"
    options="filters.teamsByNumber" display="filters.teamText(option)">
  </collection-filter>
  <collection-filter class="menu" title="Teams(names)" data="filters.data.teams"
    options="filters.teamsByName" display="filters.teamText(option)">
  </collection-filter>
  <collection-filter class="menu" title="Rounds" data="filters.data.rounds"
    options="filters.rounds" display="filters.roundText(option)">
  </collection-filter>
  <collection-filter class="menu" title="Referees" data="filters.data.referees"
    options="filters.referees" display="filters.refereeText(option)">
  </collection-filter>
  <collection-filter class="menu" title="Tables" data="filters.data.tables"
    options="filters.tournament.tables" display="filters.tableText(option)">
  </collection-filter>
</div>
`,
  controller: 'ScoresFiltersController as filters',
  bindings: {
    data: '=?'
  }
}
