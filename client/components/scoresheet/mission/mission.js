import template from './mission.html'
import './mission.css'

export default {
  template,
  controller: 'missionController as mission',
  bindings: {
    data: '<'
  }
}
