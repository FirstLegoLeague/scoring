import template from './tile.html'
import './tile.css'

export default {
  template,
  controller: 'tileController as tile',
  bindings: {
    data: '<'
  }
}
