export default {
  template: `
  <div class="flex-container flex-child-grow" ng-switch="slot.data.length" in-view="slot.inview = $inview">
    <empty-slot class="flex-container flex-child-grow" ng-switch-when="0" data="slot.data" position="slot.position" ng-if="slot.inview"></empty-slot>
    <single-score-slot class="flex-container flex-child-grow" ng-switch-when="1" data="slot.data" ng-if="slot.inview"></single-score-slot>
    <conflict-slot class="flex-container flex-child-grow" ng-switch-default="" data="slot.data" ng-if="slot.inview"></conflict-slot>

    <div class="card" ng-if="!slot.inview"></div>
  </div>`,
  controller: 'SlotController as slot',
  bindings: {
    data: '=?',
    position: '=?'
  }
}
