class ConvertToNumber {
  constructor () {
    this.require = 'ngModel'
    this.restrict = 'A'
  }

  link (scope, element, attrs, ngModel) {
    ngModel.$parsers.push(val => {
      return (val !== null) ? parseInt(val, 10) : null
    })
    ngModel.$formatters.push(val => {
      return (val !== null) ? '' + val : null
    })
  }
}

ConvertToNumber.$$ngIsClass = true

export default ConvertToNumber
