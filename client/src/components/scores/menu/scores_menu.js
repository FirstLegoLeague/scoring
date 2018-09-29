export default {
  template: `
  <div class="top-bar-left">
    <scores-filters class="menu" filters="scores.filters"></scores-filters>
  </div>
  
  <div class="top-bar-right">
    <scores-actions class="menu"></scores-actions>
  </div>`,
  controller: 'ScoresController as scores',
  bindings: {
    filters: '=?'
  }
}
