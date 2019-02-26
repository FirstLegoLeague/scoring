export default {
  template: `
  <div ng-repeat="rank in scoreTableContent.rankings">
  </div>`,
  controller: function () {},
  controllerAs: 'scoreTableContent',
  bindings: {
    ranks: '=?'
  }
}
