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
    <div class="cell small-8 grid-x">
      <div class="cell small-12">
        <a editable-text="slot.data.referee" buttons="no" blur="submit" onaftersave="slot.save()">
          {{ slot.data.referee || 'No one' }}
        </a>
        <span ng-if="!slot.tournament.tablesDisabled">
          &#160;on table&#160;
          <a editable-select="slot.data.tableId" buttons="no" blur="submit" onaftersave="slot.save()" e-ng-options="table.tableId as table.tableName for table in slot.tournament.tables">
            {{ slot.data.tableText }}.
          </a>
        </span>
      </div>
      <div class="cell small-12">
        <small>{{ slot.data.dateText }}</small>
      </div>
    </div>
  </div>
</div>
<div class="card-section flex-child-shrink">
  <score-actions data="slot.data"></score-actions>
</div>`,
  controller: 'SingleScoreSlotController as slot',
  bindings: {
    data: '=?'
  }
}
