import template from './empty_slot.html'
import './empty_slot.css'

export default {
  template,
  controller: 'emptySlotController as emptySlot',
  bindings: { data: '=', position: '=' }
}
