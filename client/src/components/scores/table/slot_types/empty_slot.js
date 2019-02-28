export default {
  template: `
<div class="card grid-y">
 <div class="card-section flex-child-grow stat text-center">No score yet</div>

 <div class="card-section flex-child-shrink button-group">
  <div class="button" ng-click="scoresActions.newScoresheet()">
    <i class="fas fa-file"></i>
    <span class="hover-text">Create</span>
  </div>

  <div class="secondary button" ng-click="scoresActions.newScoresheet()">
    <i class="fas fa-ban"></i>
    <span class="hover-text">No show</span>
  </div>
 </div>
</div>`,
  controller: 'EmptySlotController as slot',
  bindings: {
    position: '=?'
  }
}
