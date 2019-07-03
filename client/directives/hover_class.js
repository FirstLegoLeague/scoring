class HoverClass {
  constructor ($parse) {
    Object.assign(this, { $parse })
    this.restrict = 'A'
  }

  link (scope, element, attrs) {
    element.on('mouseenter', () => {
      if (attrs.ngClass) {
        const ngClass = this.$parse(attrs.ngClass)(scope)
        const classes = Object.keys(ngClass).filter(key => ngClass[key])
        if (!classes.includes(attrs.hoverClass)) {
          element.addClass(attrs.hoverClass)
        }
      } else {
        element.addClass(attrs.hoverClass)
      }
    })

    element.on('mouseleave', () => {
      if (attrs.ngClass) {
        const ngClass = this.$parse(attrs.ngClass)(scope)
        const classes = Object.keys(ngClass).filter(key => ngClass[key])
        if (!classes.includes(attrs.hoverClass)) {
          element.removeClass(attrs.hoverClass)
        }
      } else {
        element.removeClass(attrs.hoverClass)
      }
    })
  }
}

HoverClass.$$ngIsClass = true
HoverClass.$inject = ['$parse']

export default HoverClass
