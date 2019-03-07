export default {
  template: `
<div class="button" ng-click="sizes.size = (sizes.size === 'small' ? 'big' : 'small')">
  <i class="fa" ng-class="sizes.size === 'small' ? 'fa-compress' : 'fa-expand'"></i>
</div>
`,
  controller: function () { },
  controllerAs: 'sizes',
  bindings: {
    size: '=?'
  }
}
