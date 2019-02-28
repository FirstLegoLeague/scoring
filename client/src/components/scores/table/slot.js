export default {
  template: `
  <div ng-switch="slot.data.length">
    <empty-slot ng-switch-when="0" data="slot.data" position="slot.position"></empty-slot>
    <single-score-slot ng-switch-when="1" data="slot.data"></single-score-slot>
    <conflict-slot ng-switch-default="" data="slot.data"></conflict-slot>
  </div>`,
  controller: 'SlotController as slot',
  bindings: {
    data: '=?',
    position: '=?'
  }
}
