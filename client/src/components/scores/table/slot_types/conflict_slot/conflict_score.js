export default {
  template: `
<div class="card-section score-deatils">
  <div class="stat text-center">
    {{ conflictScore.data.scoreText }}
  </div>
  <small>{{ conflictScore.data.dateText }}</small>
</div>
<div class="card-section flex-child-shrink">
  <score-actions data="conflictScore.data" hide="{ open: true, noShow: true }"></score-actions>
</div>`,
  controller: 'ConflictScoreController as conflictScore',
  bindings: {
    data: '=?'
  }
}
