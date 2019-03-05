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
        <span ng-switch-when="0">No publication filter</span>
        <span ng-switch-when="1">Only public</span>
        <span ng-switch-when="2">Only unpublic</span>
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
    <li class="button-group">
      <div class="button">
        <i class="fa fa-caret-down"></i>&nbsp;Teams&nbsp;
        <span ng-show="filters.data.teams.length > 0">({{filters.data.teams.length}})</span>
      </div>
      <div class="clear button" ng-show="filters.data.teams.length > 0" ng-click="filters.data.teams = []"><i class="fa fa-times"></i></div>
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
  </div>
  <div class="filter-dropdown dropdown menu" data-dropdown-menu ng-if="filters.rounds">
    <li class="button-group">
      <div class="button">
        <i class="fa fa-caret-down"></i>&nbsp;Rounds&nbsp;
        <span ng-show="filters.data.rounds.length > 0">({{filters.data.rounds.length}})</span>
      </div>
      <div class="clear button" ng-show="filters.data.rounds.length > 0" ng-click="filters.data.rounds = []"><i class="fa fa-times"></i></div>
      <ul class="menu">
        <li ng-repeat="round in filters.rounds">
          <div class="button"
            ng-class="{ clear: !filters.data.rounds.includes(round) }"
            ng-click="filters.toggleRound(round)"
            ng-bind-html="round.displayText">
          </div>
        </li>
      </ul>
    </li>
  </div>
  <div class="filter-dropdown dropdown menu" data-dropdown-menu ng-if="filters.referees">
    <li class="button-group">
      <div class="button">
        <i class="fa fa-caret-down"></i>&nbsp;Referees&nbsp;
        <span ng-show="filters.data.referees.length > 0">({{filters.data.referees.length}})</span>
      </div>
      <div class="clear button" ng-show="filters.data.referees.length > 0" ng-click="filters.data.referees = []"><i class="fa fa-times"></i></div>
      <ul class="menu">
        <li ng-repeat="referee in filters.referees">
          <div class="button"
            ng-class="{ clear: !filters.data.referees.includes(referee) }"
            ng-click="filters.toggleReferee(referee)"
            ng-bind-html="referee">
          </div>
        </li>
      </ul>
    </li>
  </div>
  <div class="filter-dropdown dropdown menu" data-dropdown-menu ng-if="filters.tournament.tables">
    <li class="button-group">
      <div class="button">
        <i class="fa fa-caret-down"></i>&nbsp;Tables&nbsp;
        <span ng-show="filters.data.tables.length > 0">({{filters.data.tables.length}})</span>
      </div>
      <div class="clear button" ng-show="filters.data.tables.length > 0" ng-click="filters.data.tables = []"><i class="fa fa-times"></i></div>
      <ul class="menu">
        <li ng-repeat="table in filters.tournament.tables">
          <div class="button"
            ng-class="{ clear: !filters.data.tables.includes(table) }"
            ng-click="filters.toggleTable(table)"
            ng-bind-html="table.tableName">
          </div>
        </li>
      </ul>
    </li>
  </div>
</div>
`,
  controller: ['Tournament', 'Scores', '$scope', function (tournament, scores, $scope) {
    $scope.filters.tournament = tournament

    $scope.filters.toggleTeam = team => {
      if ($scope.filters.data.teams.includes(team.number)) {
        $scope.filters.data.teams = $scope.filters.data.teams.filter(teamNumber => teamNumber !== team.number)
      } else {
        $scope.filters.data.teams.push(team.number)
      }
    }

    $scope.filters.toggleRound = round => {
      if ($scope.filters.data.rounds.includes(round)) {
        $scope.filters.data.rounds = $scope.filters.data.rounds.filter(r => r !== round)
      } else {
        $scope.filters.data.rounds.push(round)
      }
    }

    $scope.filters.toggleReferee = referee => {
      if ($scope.filters.data.referees.includes(referee)) {
        $scope.filters.data.referees = $scope.filters.data.referees.filter(r => r !== referee)
      } else {
        $scope.filters.data.referees.push(referee)
      }
    }

    $scope.filters.toggleTable = table => {
      if ($scope.filters.data.tables.includes(table)) {
        $scope.filters.data.tables = $scope.filters.data.tables.filter(t => t !== table)
      } else {
        $scope.filters.data.tables.push(table)
      }
    }

    function _loadOptions () {
      $scope.filters.rounds = scores.scores.reduce((rounds, score) => {
        if (rounds.every(round => round.stage !== score.stage || round.round !== score.round)) {
          rounds.push({ stage: score.stage, round: score.round, displayText: `${score.stage} #${score.round}` })
        }
        return rounds
      }, $scope.filters.rounds || [])

      $scope.filters.referees = scores.scores.reduce((referees, score) => {
        if (score.referee && !referees.includes(score.referee)) {
          referees.push(score.referee)
        }
        return referees
      }, $scope.filters.referees || [])
    }

    scores.on('scores updated', _loadOptions)
    tournament.loadTeams()
    tournament.loadTables()
    scores.init().then(_loadOptions).catch(error => console.error(error))
  }],
  controllerAs: 'filters',
  bindings: {
    data: '=?'
  }
}
