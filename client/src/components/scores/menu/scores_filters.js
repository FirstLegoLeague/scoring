export default {
  template: `
<div class="menu">
  <div class="button-group">
    <div class="button"
      ng-class="{ disabled: filters.data.dissableShowErrors, secondary: !filters.data.showErrors }"
      ng-click="filters.data.showErrors = !filters.data.showErrors">
      <i class="fa fa-exclamation-triangle"></i>
      <span class="hover-text">Only errors</span>
    </div>
    <div class="button"
      ng-class="{ disabled: filters.data.dissableDuplicates, secondary: !filters.data.showDuplicates }"
      ng-click="filters.data.showDuplicates = !filters.data.showDuplicates">
      <i class="fa fa-copy"></i>
      <span class="hover-text">Only duplicates</span>
    </div>
    <div class="button"
      ng-class="{ disabled: filters.data.dissableAll, secondary: filters.data.showPublic === 0 }"
      ng-click="filters.data.showPublic = (filters.data.showPublic + 1) % 3">
      <i class="fa" ng-class="(filters.data.showPublic === 0) ? 'fa-circle' : ((filters.data.showPublic === 1) ? 'fa-plus-circle' : 'fa-minus-circle')"></i>
      <span class="hover-text" ng-switch="filters.data.showPublic">
        <span ng-switch-when="0">All scores</span>
        <span ng-switch-when="1">Only publish</span>
        <span ng-switch-when="2">Only unpublish</span>
      </span>
    </div>
    <div class="button"
      ng-class="{ disabled: filters.data.disableNoShow, secondary: !filters.data.showNoShow }"
      ng-click="filters.data.showNoShow = !filters.data.showNoShow">
      <i class="fa fa-ban"></i>
      <span class="hover-text">Only no-show</span>
    </div>
  </div>
  <div class="filter-dropdown dropdown menu" data-dropdown-menu ng-if="filters.tournament.teams">
    <li>
      <div class="clear button">
        <i class="fa fa-caret-down"></i>&nbsp;Teams&nbsp;
        <span ng-show="filters.data.teams.length > 0">({{filters.data.teams.length}})</span></div>
      <ul class="menu">
        <li ng-repeat="team in filters.tournament.teams">
          <div class="button"
            ng-class="{ clear: !filters.data.teams.includes(team.number) }"
            ng-click="filters.toggleTeam(team)"
            ng-bind-html="team.displayText">
          </div>
        </li>
      </ul>
    </li>
    <div class="clear button" ng-show="filters.data.teams.length > 0" ng-click="filters.data.teams = []"><i class="fa fa-times"></i></div>
  </div>
</div>
`,
  controller: ['Tournament', '$scope', function (tournament, $scope) {
    $scope.filters.tournament = tournament
    tournament.loadTeams()

    $scope.filters.toggleTeam = team => {
      if ($scope.filters.data.teams.includes(team.number)) {
        $scope.filters.data.teams = $scope.filters.data.teams.filter(teamNumber => teamNumber !== team.number)
      } else {
        $scope.filters.data.teams.push(team.number)
      }
    }
  }],
  controllerAs: 'filters',
  bindings: {
    data: '=?'
  }
}
