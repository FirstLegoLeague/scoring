class ScoresSortController {
  constructor () {
    const sortFields = [
      { field: 'teamNumber', text: 'team' },
      { field: 'score', text: 'score' },
      { field: 'creationTime', text: 'creation' }
    ]

    this.options = sortFields.reduce((options, { field, text }) => {
      return options.concat(['up', 'down'].map(direction => ({
        value: `${field}_${direction}`,
        text: `<i class="fa fa-sort-amount-${direction}"></i> ${text}`
      })))
    }, [])

    this.textsHash = this.options
      .reduce((hash, { value, text }) => Object.assign(hash, { [value]: text }), {})
  }
}

ScoresSortController.$$ngIsClass = true
ScoresSortController.$inject = []

export default ScoresSortController
