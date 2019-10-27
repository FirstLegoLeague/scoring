class LocalSettingsModalController {
  constructor (localSettings) {
    Object.assign(this, { localSettings })
    this.settings = {}
  }

  $onInit () {
    Object.assign(this.settings, this.localSettings.getFromLocalStorage())
  }

  loadSettings () {
    this.settings = this.localSettings.getFromLocalStorage()
    this.settingsData = Object.keys(this.settings).map(namespace => {
      return { namespace, data: this.settings[namespace] }
    })
  }

  saveSettings () {
    this.localSettings.update(this.settings, 'settingsmodal')// , () => this.loadSettings())
  }
}

LocalSettingsModalController.$$ngIsClass = true
LocalSettingsModalController.$inject = ['localSettings']

export default LocalSettingsModalController
