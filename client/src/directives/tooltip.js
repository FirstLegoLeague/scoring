// Wraps the JQuery interface of Foundation in order to seperate it from angular.

class Tooltip {
  constructor ($window) {
    Object.assign(this, { $window })
    this.restrict = 'A'
  }

  link (scope, element, attrs) {
    return new this.$window.Foundation.Tooltip(this.$window.$(element))
  }
}

Tooltip.$$ngIsClass = true
Tooltip.$inject = ['$window']

export default Tooltip
