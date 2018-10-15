export default {
  template: `
  <div class="top-bar-left">
    <scores-filters class="menu" data="scoreMenu.filters"></scores-filters>
  </div>
  
  <div class="top-bar-right">
    <scores-actions class="menu"></scores-actions>
  </div>`,
  controller: function () { },
  controllerAs: 'scoreMenu',
  bindings: {
    filters: '=?'
  }
}
