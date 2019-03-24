export default {
  template: `
<div class="card right-score">
  <conflict-score id="conflict-score-{{slot.data[0]._id}}" data="slot.data[0]"
    ng-class="{ 'disabled dimmed': slot.movingScore && slot.movingScore !== slot.data[0]._id }"></conflict-score>
</div>
<div class="card left-score">
  <conflict-score id="conflict-score-{{slot.data[1]._id}}" data="slot.data[1]"
    ng-class="{ 'disabled dimmed': slot.movingScore && slot.movingScore !== slot.data[1]._id }"></conflict-score>
</div>
<div class="conflict-message extra-content"
  ng-if="slot.data.length > 2" ng-click="slot.openConflictedScoresList()">
  +{{slot.data.length - 2}} scores</div>`,
  controller: 'ConflictSlotController as slot',
  bindings: {
    data: '=?',
    movingScore: '<'
  }
}
