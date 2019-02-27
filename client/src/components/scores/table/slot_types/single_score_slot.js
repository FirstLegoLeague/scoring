export default {
  template: `
<div class="card-section">
  <div class="grid-x">
    <div class="cell small-4">
      <div class="stat text-center">
        <a editable-number="slot.data.score" buttons="no" blur="submit" onaftersave="slot.save()">
          {{ slot.data.scoreText }}
        </a>
      </div>
    </div>
    <div class="cell small-8"></div>
  </div>
</div>
<div class="card-section flex-child-shrink">
  <score-actions data="data"></score-actions>
</div>`,
  controller: 'SingleScoreSlotController as slot',
  bindings: {
    data: '=?'
  }
}
