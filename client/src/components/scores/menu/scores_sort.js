export default {
  template: `
<div id="sort-dropdown" class="dropdown menu" data-dropdown-menu>
  <li>
    <div class="clear button"><i class="fa fa-caret-down"></i>&nbsp;Sort (<span ng-bind-html="sort.textsHash[sort.data]"></span>)</div>
    <ul class="menu">
      <li ng-repeat="option in sort.options">
        <div class="clear button"
          ng-class="{ secondary: sort.data !== option.value }"
          ng-click="sort.data = option.value"
          ng-bind-html="option.text">
        </div>
      </li>
    </ul>
  </li>
</div>
`,
  controller: 'ScoresSortController as sort',
  bindings: {
    data: '=?'
  }
}
