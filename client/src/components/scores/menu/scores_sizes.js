export default {
  template: `
<div class="button" ng-class="{ clear: sizes.size !== 'small' }" ng-click="sizes.size = 'small'">
  <i class="fa fa-xs fa-expand"></i>
</div>
<div class="button" ng-class="{ clear: sizes.size !== 'big' }" ng-click="sizes.size = 'big'">
  <i class="fa fa-expand"></i>
</div>
`,
  controller: function () { },
  controllerAs: 'sizes',
  bindings: {
    size: '=?'
  }
}
