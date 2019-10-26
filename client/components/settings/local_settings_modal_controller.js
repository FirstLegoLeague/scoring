class LocalSettingsModalController {
  constructor (localSettings) {
    Object.assign(this, { localSettings })
    this.settings = {}
  }

  $onInit () {
    Object.assign(this.settings, this.localSettings.get())
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
    this.localSettings.update(this.settingsCopy, 'settingsmodal', () => this.loadSettings())
  }
}

LocalSettingsModalController.$$ngIsClass = true
LocalSettingsModalController.$inject = ['localSettings']

export default LocalSettingsModalController
