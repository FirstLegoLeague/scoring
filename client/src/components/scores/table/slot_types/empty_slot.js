export default {
  template: `
<div class="card grid-y extra-content" ng-class="{ 'move-mode': slot.moveMode }">
 <div class="card-section flex-child-grow stat text-center" ng-if="!slot.moveMode">No score yet</div>

 <div class="card-section flex-child-shrink button-group" ng-if="!slot.moveMode">
  <div class="button" ng-click="slot.createInScoresheet()">
    <i class="fas fa-file"></i>
    <span class="hover-text">Create in scoresheet</span>
  </div>

  <div class="secondary button" ng-click="slot.createHere()">
    <i class="far fa-file"></i>
    <span class="hover-text">Create here</span>
  </div>

  <div class="secondary button" ng-click="slot.createWithNoShow()">
    <i class="fas fa-ban"></i>
    <span class="hover-text">No show</span>
  </div>
 </div>
 <div class="move-mode-message flex-child-grow stat text-center"
    ng-click="slot.moveScoreHere()">
    <i class="fa fa-share-square"></i>Move here
  </div>
</div>
`,
  controller: 'EmptySlotController as slot',
  bindings: {
    data: '=?',
    position: '=?'
  }
}
