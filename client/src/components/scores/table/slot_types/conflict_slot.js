export default {
  template: `
<div class="card right-score" ng-class="{ 'dimmed disabled': slot.dimmed && slot.dimmed !== slot.data[0]._id }">
  <conflict-score id="conflict-score-{{slot.data[0]._id}}" data="slot.data[0]"></conflict-score>
</div>
<div class="card left-score" ng-class="{ 'dimmed disabled': slot.dimmed && slot.dimmed !== slot.data[1]._id }">
  <conflict-score id="conflict-score-{{slot.data[1]._id}}" data="slot.data[1]"></conflict-score>
</div>
<div class="conflict-message extra-content" ng-class="{ 'dimmed disabled': slot.dimmed }"
  ng-if="slot.data.length > 2" ng-click="slot.openConflictedScoresList()">
  +{{slot.data.length - 2}} scores</div>`,
  controller: 'ConflictSlotController as slot',
  bindings: {
    data: '=?'
  }
}
