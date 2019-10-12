class MainMenuController {
  constructor ($location, $scope, user, settings) {
    Object.assign(this, { $location, $scope, user, settings })
    this.loadSettings()
  }

  $onInit () {
    this._resetPage()
    this.$scope.$on('$locationChangeSuccess', () => {
      this._resetPage()
    })
  }

  setPage (page) {
    this.$location.path(page)
  }

  _resetPage () {
    this.page = this.$location.path().split('/')[1]
    if (!this.page) {
      this.setPage(this.user.isAdmin() ? 'scores' : 'scoresheet')
    }
    this.$scope.$broadcast(`set page ${this.page}`)
  }

  settingsCheck () {
    console.log('hi')
    console.log(this.settings.get())
  }

  loadSettings () {
    const fromService = this.settings.get()
    const theKeys = Object.keys(fromService)
    this.settingsKeys = theKeys
    this.settingsCopy = fromService
    this.forDOM = []
    this.settingsKeys.forEach(key => {
      this.forDOM.push({
        keyName: key,
        data: this.settingsCopy[key]
      })
    })
  }

  saveSettings () {
    this.settings.update(this.settingsCopy, 'mainmenu', () => this.loadSettings())
    console.log(this.settings.settingsObject)
  }
}

MainMenuController.$$ngIsClass = true
MainMenuController.$inject = ['$location', '$scope', 'user', 'settings']

export default MainMenuController
