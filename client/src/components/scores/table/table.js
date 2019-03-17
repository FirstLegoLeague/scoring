export default {
  template: `
<div class="ranks-header grid-x grid-padding-x">
  <div class="cell" ng-class="table.marginClass" ng-if="table.marginClass"></div>
  <div class="cell" ng-class="table.teamCellWidthClass"></div>
  <div ng-repeat="header in table.roundHeaders" class="cell text-center" ng-class="table.scoreCellWidthClass">
    <h5><span class="extra-content">round&nbsp;</span>{{header}}</h5>
  </div>
  <div class="cell" ng-class="table.marginClass" ng-if="table.marginClass"></div>
</div>
<div class="ranks">
  <div ng-repeat="rank in table.rankings.rankings[table.currentStage]" class="rank grid-x grid-padding-x">
    <div class="cell" ng-class="table.marginClass" ng-if="table.marginClass"></div>
    <div class="cell grid-y team-cell" ng-class="table.teamCellWidthClass">
      <div class="card">
        <div class="card-section extra-content">
          <div class="team">{{::rank.team.displayText}}</div>
          <div class="rank">Rank: #{{::rank.rank}} with {{rank.highest ? ('score ' + rank.highest.score) : 'no scores'}}</div>
        </div>
        <div class="card-section extra-content">
          <div class="button-group">
            <div class="button" ng-class="{ disabled: rank.allScores.length === 0, secondary: rank.allScores.length === 0 || !rank.allScoresUnpublished }" ng-click="table.toggleAllRankScoresPublic(rank)">
              <i class="fa" ng-class="rank.allScoresUnpublished ? 'fa-plus-circle' : 'fa-minus-circle'"></i>
              <span class="hover-text">{{rank.allScoresUnpublished ? 'Publish all' : 'Unpublish all'}}</span>
            </div>
            <div class="button" ng-class="{ disabled: rank.allScores.length === 0, secondary: rank.allScores.length === 0 || !rank.allScoresNoShow }" ng-click="table.toggleAllRankScoresNoShow(rank)">
              <i class="fa fa-ban"></i>
              <span class="hover-text">{{rank.allScoresNoShow ? 'Show all' : 'No-Show all'}}</span>
            </div>
            <div class="alert button" ng-class="{ disabled: rank.allScores.length === 0 }" ng-click="table.deleteRankScores(rank)">
              <i class="fa fa-trash-alt"></i>
              <span class="hover-text">Delete all</span>
            </div>
          </div>
        </div>
        <div class="summery">#{{rank.rank}} <b>{{rank.team.displayText}}</b></div>
      </div>
    </div>
    <div ng-repeat="slotScores in rank.scores" class="cell grid-y" ng-class="table.scoreCellWidthClass">
      <table-slot class="flex-container flex-child-grow" data="slotScores" position="{ round: $index+1, teamNumber: rank.team.number, stage: table.currentStage }"></table-slot>
    </div>
    <div class="cell" ng-class="table.marginClass" ng-if="table.marginClass"></div>
  </div>
</div>
<div class="dimmer">
  <div class="large loader"></div>
</div>`,
  controller: 'TableController as table',
  bindings: {
    currentStage: '<',
    size: '<'
  }
}
