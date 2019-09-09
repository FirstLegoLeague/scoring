import template from './score_actions.html'
import './score_actions.css'

export default {
  template,
  controller: 'scoreActionsController as scoreActions',
  bindings: {
    score: '<'
  }
}
