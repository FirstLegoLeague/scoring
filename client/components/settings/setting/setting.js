import template from './setting.html'
import './setting.css'

export default {
  template,
  controller: 'settingController as setting',
  bindings: {
    data: '='
  }
}
