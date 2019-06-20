import Promise from 'bluebird'

const distinctMap = (arr, mapping) => {
  return arr.reduce((mappedArr, entry) => {
    const mappedValue = mapping(entry)
    if (!mappedArr.includes(mappedValue)) {
      mappedArr.push(mappedValue)
    }
    return mappedArr
  }, [])
}

const FILTERS = {
  public: { field: 'public', value: true },
  unpublic: { field: 'public', value: false },
  valid: { field: 'valie', value: true },
  invalid: { field: 'valie', value: false },
  'No show': { field: 'noShow', value: true },
  show: { field: 'noShow', value: false },
  team: 'teamText',
  stage: 'stage',
  round: 'matchText',
  table: 'tableText',
  referee: 'refereeText',
  score: 'score'
}

function applyFilter (filter, score) {
  const [filterKey, value] = filter.split(': ')
  if (FILTERS[filterKey].constructor === String) {
    return score[FILTERS[filterKey]] === value.toString()
  } else {
    return score[FILTERS[filterKey].field] === FILTERS[filterKey].value
  }
}

class TilesPageController {
  constructor ($scope, $location, scores) {
    Object.assign(this, { $scope, $location, data: scores })
    this.filterOptions = []
    this.filters = []
    this.scores = []
  }

  $onInit () {
    this._loadFitlersFromLocation()

    this.$scope.$on('$locationChangeSuccess', () => {
      this._loadFitlersFromLocation()
    })

    this.data.on('scores updated', () => this.update())

    return this.data.init()
      .then(() => Promise.all(this.data.scores.map(score => score.load())))
      .then(() => this.update())
  }

  update () {
    if (this.data.scores.length) {
      this.filtersUpdated()
      this._calculateFilterOptions()
    }
  }

  filtersUpdated () {
    this.$location.search('filters', this.filters)

    this.scores = (this.data.scores || [])
      .filter(score => this.filters.every(filter => applyFilter(filter, score)))
  }

  _loadFitlersFromLocation () {
    const filters = this.$location.search().filters || this.filters || []
    if (filters instanceof Array) {
      this.fitlers = filters
    } else {
      this.filters = [filters]
    }
  }

  _calculateFilterOptions () {
    this.filterOptions = []
    Object.entries(FILTERS).forEach(([filterClass, options]) => {
      const existingClassFilter = this.filters.find(filter => filter.startsWith(filterClass))
      if (existingClassFilter) {
        this.filterOptions.push(existingClassFilter)
        return
      }
      if (options instanceof Array) {
        this.filterOptions = this.filterOptions.concat(options.map(option => `${filterClass}: ${option}`))
      } else if (options.constructor === String) {
        this.filterOptions = this.filterOptions.concat(distinctMap(this.data.scores, score => `${filterClass}: ${score[options]}`))
      } else {
        this.filterOptions.push(filterClass)
      }
    })
  }
}

TilesPageController.$$ngIsClass = true
TilesPageController.$inject = ['$scope', '$location', 'scores']

export default TilesPageController
