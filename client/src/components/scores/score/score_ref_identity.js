export default {
  template: `
  <a editable-text="score.data.referee" buttons="no" blur="submit" onaftersave="score.save()">
    {{ score.data.referee || 'No one' }}
  </a>
  <span ng-if="!score.Tournament.tablesDisabled">
    &#160;on table&#160;
    <a editable-select="score.data.tableId" buttons="no" blur="submit" onaftersave="score.save()" e-ng-options="table.tableId as table.tableName for table in score.Tournament.tables">
      {{ score.tableText() }}.
    </a>
  </span>`,
  controller: 'ScoreController as score',
  bindings: { data: '=?' }
}
