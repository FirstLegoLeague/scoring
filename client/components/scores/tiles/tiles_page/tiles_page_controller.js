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
  valid: score => score.valid(),
  invalid: score => !score.valid(),
  duplicate: (score, scoresArray) => {
    const matchingScores = scoresArray.filter(otherScore => {
      return score.stage === otherScore.stage &&
             score.round === otherScore.round &&
             score.teamNumber === otherScore.teamNumber
    })
    return matchingScores.length > 1
  },
  'No show': { field: 'noShow', value: true },
  show: { field: 'noShow', value: false },
  team: 'teamText',
  stage: 'stage',
  round: 'matchText',
  table: 'tableText',
  referee: 'refereeText'
}

function applyFilter (filter, score, scoresArray) {
  const [filterKey, value] = filter.split(': ')
  if (FILTERS[filterKey].constructor === String) {
    return score[FILTERS[filterKey]] === value.toString()
  } else if (FILTERS[filterKey] instanceof Function) {
    return FILTERS[filterKey](score, scoresArray)
  } else {
    return score[FILTERS[filterKey].field] === FILTERS[filterKey].value
  }
}

const SORT_OPTIONS = [
  { text: 'Team', icon: 'users', field: 'teamNumber' },
  { text: 'Match', icon: 'calendar alternate outline', field: 'matchText' },
  { text: 'Score', icon: 'hashtag', field: 'score' },
  { text: 'Last Update', icon: 'clock outline', field: 'lastUpdate' }
]

const SORT_DIRECTION_OPTIONS = [
  { text: 'Up', icon: 'sort numeric down', value: 1 },
  { text: 'Down', icon: 'sort numeric up', value: -1 }
]

class TilesPageController {
  constructor ($scope, $location, scores, configuration, logger, notifications) {
    Object.assign(this, { $scope, $location, data: scores, configuration, logger, notifications })
    this.filterOptions = []
    this.filters = []
    this.scores = []

    this.sortOptions = SORT_OPTIONS
    this.sortDirectionOptions = SORT_DIRECTION_OPTIONS
  }

  $onInit () {
    this._loadFromLocation()

    this.$scope.$on('$locationChangeSuccess', () => {
      this._loadFromLocation()
    })

    this.data.on('scores updated', () => this.update())

    this.$scope.$watch(() => this.sort, () => this.updateVisibleScores())
    this.$scope.$watch(() => this.sortDirection, () => this.updateVisibleScores())

    this.configuration.load().then(config => {
      this.rankingsUrl = `${config.rankingsUrl}/rankings.csv?hideNegatives=false`
    })
      .catch(error => this.logger.error(error))

    this.data.init()
      .then(() => Promise.all(this.data.scores.map(score => score.load())))
      .then(() => this.update())
      .catch(error => this.logger.error(error))
  }

  update () {
    if (this.data.scores.length) {
      this.updateVisibleScores()
      this._calculateFilterOptions()
    }
  }

  updateVisibleScores () {
    this.$location.search('filters', this.filters)
    this.$location.search('sort', this.sort.field)
    this.$location.search('sortDirection', this.sortDirection.text)

    this.scores = (this.data.scores || [])
      .filter((score, index, scoresArray) => this.filters.every(filter => applyFilter(filter, score, scoresArray)))
      .sort((score1, score2) => {
        const value1 = score1[this.sort.field]
        const value2 = score2[this.sort.field]
        const fieldSort = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0
        return this.sortDirection.value * fieldSort
      })

    this.hasDuplicates = (this.data.scores || [])
      .filter((score, index, scoresArray) => applyFilter('duplicate', score, scoresArray))
      .length !== 0
  }

  deleteAll () {
    this.data.deleteAll()
      .catch(error => {
        this.notifications.error('Action failed.')
        this.logger.error(error)
      })
  }

  _loadFromLocation () {
    const search = this.$location.search()
    const filters = search.filters || this.filters || []
    if (filters instanceof Array) {
      this.filters = filters
    } else {
      this.filters = [filters]
    }

    this.sort = this.sortOptions.find(option => option.field === search.sort) || this.sortOptions[0]
    this.sortDirection = this.sortDirectionOptions.find(option => option.text === search.sortDirection) || this.sortDirectionOptions[0]
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
TilesPageController.$inject = ['$scope', '$location', 'scores', 'configuration', 'logger', 'notifications']

export default TilesPageController
