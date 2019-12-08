class LocalSettingsModalController {
  constructor (localSettings) {
    Object.assign(this, { localSettings })
    this.settings = {}
  }

  $onInit () {
    Object.assign(this.settings, this.localSettings.getFromLocalStorage2())
  }

  loadSettings () {
    this.settings = this.localSettings.getFromLocalStorage2()
    this.settingsData = {}
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
        this.localSettings.update2(settingName, { value: setting.value, dataType: setting.dataType })
      })
    })
    // Object.keys(this.settings).forEach(changedSetting => {
    //   this.localSettings.update2(changedSetting, this.settings[changedSetting])
    // })
  }
}

LocalSettingsModalController.$$ngIsClass = true
LocalSettingsModalController.$inject = ['localSettings']

export default LocalSettingsModalController
