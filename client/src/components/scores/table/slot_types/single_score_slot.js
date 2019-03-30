export default {
  template: `
<div id="score-slot-{{slot.score._id}}" class="card"
  ng-class="{ loading: !slot.score.ready,
              'disabled dimmed': slot.movingScore && slot.movingScore !== slot.score._id,
              'moving-score': slot.movingScore && slot.movingScore === slot.score._id }">
  <div class="card-section big-only-content">
    <div class="grid-x">
      <div class="cell small-4">
        <div class="stat text-center">
          <a editable-number="slot.score.score" buttons="no" blur="submit" onaftersave="slot.save()">
            {{ slot.score.scoreText }}
          </a>
        </div>
      </div>
      <div class="cell small-8 grid-x">
        <div class="cell small-12">
          <small>{{ slot.score.dateText }}</small>
        </div>
        <div class="cell small-12">
          <a editable-text="slot.score.referee" buttons="no" blur="submit" onaftersave="slot.save()">
            {{ slot.score.refereeText }}
          </a>
          <span ng-if="!slot.tournament.tablesDisabled">
            &#160;on table&#160;
            <a editable-select="slot.score.tableId" buttons="no" blur="submit" onaftersave="slot.save()" e-ng-options="table.tableId as table.tableName for table in slot.tournament.tables">
              {{ slot.score.tableText }}.
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="card-section flex-child-shrink big-only-content">
    <score-actions data="slot.score"></score-actions>
  </div>
  <div class="small-only-content">{{slot.score.scoreText}}</div>

  <div class="dimmer big-only-content">
    <div class="loader"></div>
  </div>
</div>`,
  controller: 'SingleScoreSlotController as slot',
  bindings: {
    data: '=?',
    movingScore: '<'
  }
}
