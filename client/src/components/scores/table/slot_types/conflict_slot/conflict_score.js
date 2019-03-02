export default {
  template: `
<div class="card-section score-deatils extra-content">
  <div class="stat text-center">
    {{ conflictScore.data.scoreText }}
  </div>
  <small>{{ conflictScore.data.dateText }}</small>
</div>
<div class="card-section flex-child-shrink extra-content">
  <score-actions data="conflictScore.data" hide="{ open: true, noShow: true }"></score-actions>
</div>
<div class="summery">{{slot.score.scoreText}}</div>`,
  controller: 'ConflictScoreController as conflictScore',
  bindings: {
    data: '=?'
  }
}
