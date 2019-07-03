import template from './yesno_objective.html'
import './yesno_objective.css'

export default {
  template,
  controller: 'yesnoObjectiveController as yesnoObjective',
  bindings: { data: '=' }
}
