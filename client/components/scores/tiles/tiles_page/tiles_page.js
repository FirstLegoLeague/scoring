import template from './tiles_page.html'

export default {
  template,
  controller: 'tilesPageController as tilesPage',
  bindings: {
    constantFilters: '<'
  }
}
