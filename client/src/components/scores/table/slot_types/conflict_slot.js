export default {
  template: `
<div class="card right-score">
  <conflict-score data="slot.data[0]"></conflict-score>
</div>
<div class="card left-score">
  <conflict-score data="slot.data[1]"></conflict-score>
</div>
<div class="conflict-message" ng-if="slot.data.length > 2">+{{slot.data.length - 2}} scores</div>
`,
  controller: 'ConflictSlotController as slot',
  bindings: {
    data: '=?'
  }
}
