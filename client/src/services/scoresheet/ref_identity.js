const STORAGE_KEY = 'referee'
const EMPTY_DATA = JSON.stringify({ referee: undefined, tableId: undefined })

class RefIdentity {
  constructor ($window, tournament) {
    Object.assign(this, { $window, tournament })
  }

  init () {
    if (!this.isInitialized()) {
      this._initPromise = this.tournament.loadTables().then(tables => {
        if (tables.length === 0) {
          this.tablesDisabled = true
        }
        const data = JSON.parse(this.$window.sessionStorage[STORAGE_KEY] || EMPTY_DATA)
        this.set(data)
        return this
      })
    }

    return this._initPromise
  }

  set (data) {
    if (data.tableId) {
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
  }

  isInitialized () {
    return this.referee || this.table
  }
}

RefIdentity.$$ngIsClass = true
RefIdentity.$inject = ['$window', 'Tournament']

export default RefIdentity
