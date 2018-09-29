export default {
  template: `
  <a editable-number="score.data.score" buttons="no" blur="submit" onaftersave="score.save()">
    {{ score.data.score || 0 }}
  </a>
`,
  controller: 'ScoreController as score',
  bindings: { data: '=?' }
}
