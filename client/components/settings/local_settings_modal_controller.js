class LocalSettingsModalController {
  constructor (localSettings) {
    Object.assign(this, { localSettings })
    this.settings = {}
    // {{localSettingsModal.data}} Settings
  }

  $onInit () {
    Object.assign(this.settings, this.localSettings.get())
  }

  // addSetting (name, source, dataType, value, callback) {
  //   this.localSettings.
  // }

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

    console.log(`Saving local settings: ${this.localSettings.settingsObject}`)
  }
}

LocalSettingsModalController.$$ngIsClass = true
LocalSettingsModalController.$inject = ['localSettings']

export default LocalSettingsModalController
