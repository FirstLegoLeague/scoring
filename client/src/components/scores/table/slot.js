export default {
  template: `
  <div class="flex-container flex-child-grow" ng-switch="slot.data.length">
    <empty-slot class="flex-container flex-child-grow" ng-switch-when="0" data="slot.data" position="slot.position"></empty-slot>
    <single-score-slot class="flex-container flex-child-grow" ng-switch-when="1" data="slot.data"></single-score-slot>
    <conflict-slot class="flex-container flex-child-grow" ng-switch-default="" data="slot.data"></conflict-slot>
  </div>`,
  controller: 'SlotController as slot',
  bindings: {
    data: '=?',
    position: '=?'
  }
}
