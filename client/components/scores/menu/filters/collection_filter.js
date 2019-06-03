export default {
  template: `
<div class="filter-dropdown dropdown menu" data-dropdown-menu ng-if="filter.options && filter.options.length">
  <li class="button-group">
    <div class="button">
      <i class="fa fa-caret-down"></i>&nbsp;{{filter.title}}&nbsp;
      <span ng-show="filter.data.length > 0">({{filter.data.length}})</span>
    </div>
    <div class="clear button" ng-show="filter.data.length > 0" ng-click="filter.data = []"><i class="fa fa-times"></i></div>
    <ul class="menu">
      <li ng-repeat="option in filter.options">
        <div class="button"
          ng-class="{ clear: !filter.data.includes(option) }"
          ng-click="filter.data.includes(option) ? filter.data.splice(filters.data.indexOf(option), 1) : filter.data.push(option)"
          ng-bind-html="filter.display({ option })">
        </div>
      </li>
    </ul>
  </li>
</div>
`,
  controller: function () {},
  controllerAs: 'filter',
  bindings: {
    data: '=?',
    options: '<',
    title: '@',
    display: '&'
  }
}
