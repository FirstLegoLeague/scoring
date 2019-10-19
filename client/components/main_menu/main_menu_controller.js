class MainMenuController {
  constructor ($location, $scope, user, localSettings) {
    Object.assign(this, { $location, $scope, user, localSettings })
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

  loadSettings () {
    const fromService = this.localSettings.get()
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
    this.localSettings.update(this.settingsCopy, 'mainmenu', () => this.loadSettings())
    console.log(`Saving local settings: ${this.localSettings.settingsObject}`)
  }
}

MainMenuController.$$ngIsClass = true
MainMenuController.$inject = ['$location', '$scope', 'user', 'localSettings']

export default MainMenuController
