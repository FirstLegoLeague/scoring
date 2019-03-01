export default {
  template: `
<div class="ranks-header grid-x grid-padding-x">
  <div class="cell" ng-class="table.marginClass" ng-if="table.marginClass"></div>
  <div class="cell" ng-class="table.teamCellWidthClass"></div>
  <div ng-repeat="header in table.roundHeaders" class="cell text-center" ng-class="table.scoreCellWidthClass">
    <h5>{{header}}</h5>
  </div>
  <div class="cell" ng-class="table.marginClass" ng-if="table.marginClass"></div>
</div>
<div class="ranks">  
  <div ng-repeat="rank in table.rankings.rankings[table.currentStage]" class="rank grid-x grid-padding-x">
    <div class="cell" ng-class="table.marginClass" ng-if="table.marginClass"></div>
    <div class="cell grid-y" ng-class="table.teamCellWidthClass">
      <div class="card">
        <div class="card-section">
          <div class="team">{{rank.team.displayText}}</div>
          <div class="rank">Rank: #{{rank.rank}}</div>
        </div>
      </div>
    </div>
    <div ng-repeat="slotScores in rank.scores" class="cell grid-y" ng-class="table.scoreCellWidthClass">
      <table-slot data="slotScores" position="{ round: $index+1, teamNumber: rank.team.number, stage: table.currentStage }"></table-slot>
    </div>
    <div class="cell" ng-class="table.marginClass" ng-if="table.marginClass"></div>
  </div>
</div>
<div class="dimmer">
  <div class="large loader"></div>
</div>`,
  controller: 'TableController as table',
  bindings: {
    currentStage: '=?'
  }
}
