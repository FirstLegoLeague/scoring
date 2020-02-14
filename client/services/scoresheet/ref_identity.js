import EventEmitter from 'event-emitter-es6'

const STORAGE_KEY = 'referee'
const EMPTY_DATA = JSON.stringify({ referee: undefined, tableId: undefined })

class RefIdentity extends EventEmitter {
  constructor ($window, $rootScope, tournament) {
    super()
    Object.assign(this, { $window, $rootScope, tournament })
  }

  init () {
    if (!this.isInitialized()) {
      this._initPromise = this.tournament.loadTables().then(tables => {
        if (tables.length === 0) {
          this.tablesDisabled = true
        }
        this.initWatchers()
        const data = JSON.parse(this.$window.sessionStorage[STORAGE_KEY] || EMPTY_DATA)
        this.set(data)
        return this
      })
    }

    return this._initPromise
  }

  initWatchers () {
    if (!this.watchersInitizlied) {
      this.watchersInitizlied = true

      this.$rootScope.$watch(() => this.referee, () => {
        this.emit('referee changed')
      })

      this.$rootScope.$watch(() => (this.table ? this.table.tableId : undefined), (newValue, oldValue) => {
        if (newValue !== oldValue) {
          this.emit('table changed')
        }
      })
    }
  }

  set (data) {
    if (typeof data.tableId === 'number') {
      data.table = this.tournament.tables.find(table => table.tableId === data.tableId)
    }
    Object.assign(this, { referee: data.referee, table: data.table })
  }

  save (data) {
    data = data || { referee: this.referee, table: this.table }
    if (data.table) {
      data.tableId = data.table.tableId
      delete data.table
    }
    this.$window.sessionStorage[STORAGE_KEY] = JSON.stringify(data)
    this.emit('saved')
  }

  clear () {
    this.$window.sessionStorage.removeItem(STORAGE_KEY)
  }

  isInitialized () {
    return this.referee || this.table
  }
}

RefIdentity.$$ngIsClass = true
RefIdentity.$inject = ['$window', '$rootScope', 'tournament']

export default RefIdentity
