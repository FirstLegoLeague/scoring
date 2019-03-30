export default {
  template: `
<div class="card-section score-deatils big-only-content">
  <div class="stat text-center">
    {{ conflictScore.data.scoreText }}
  </div>
  <small>{{ conflictScore.data.dateText }}</small>
</div>
<div class="card-section flex-child-shrink big-only-content">
  <score-actions data="conflictScore.data" hide="{ noShow: true }"></score-actions>
</div>
<div class="small-only-content">{{ conflictScore.data.scoreText }}</div>`,
  controller: 'ConflictScoreController as conflictScore',
  bindings: {
    data: '=?'
  }
}
