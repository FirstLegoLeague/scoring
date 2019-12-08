class LocalSettingsModalController {
  constructor (localSettings) {
    Object.assign(this, { localSettings })
    this.settings = {}
  }

  $onInit () {
    this.loadSettings()
  }

  loadSettings () {
    this.settings = this.localSettings.getFromLocalStorage()
    this.settingsData = {}
    // settingsData makes it much easier to properly display the settings in the modal itself
    Object.keys(this.settings).forEach(settingsKey => {
      const namespace = settingsKey.split('-')[0]
      const data = { name: settingsKey.split('-')[1], value: this.settings[settingsKey].value, dataType: this.settings[settingsKey].dataType }
      if (!this.settingsData.hasOwnProperty(namespace)) {
        this.settingsData[namespace] = []
        this.settingsData[namespace].push(data)
      } else {
        this.settingsData[namespace].push(data)
      }
    })
  }

  saveSettings () {
    Object.keys(this.settingsData).forEach(namespace => {
      const namespaceSettings = this.settingsData[namespace]
      namespaceSettings.forEach(setting => {
        const settingName = `${namespace}-${setting.name}`
        this.localSettings.update(settingName, { value: setting.value, dataType: setting.dataType })
      })
    })
  }
}

LocalSettingsModalController.$$ngIsClass = true
LocalSettingsModalController.$inject = ['localSettings']

export default LocalSettingsModalController
