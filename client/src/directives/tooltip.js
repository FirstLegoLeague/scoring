'use strict'

// Wraps the JQuery interface of Foundation in order to seperate it from angular.


class Tooltip {
    constructor($window) {
        this.restrict = 'A'
        this.$ = $window.$
    }

    link(scope, element, attrs) {
        new Foundation.Tooltip(this.$(element))
    }
}

Tooltip.$inject = ['$window']

export default Tooltip