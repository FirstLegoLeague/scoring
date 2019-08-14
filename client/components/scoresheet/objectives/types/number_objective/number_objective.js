import template from './number_objective.html'
import './number_objective.css'

export default {
  template,
  controller: 'numberObjectiveController as numberObjective',
  bindings: { data: '=' }
}
