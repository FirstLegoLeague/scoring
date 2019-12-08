class LocalSettingsModalController {
  constructor (localSettings) {
    Object.assign(this, { localSettings })
    this.settings = {}
  }

  $onInit () {
    this.loadSettings()
  }

  _capitalize (s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  loadSettings () {
    this.settings = this.localSettings.getFromLocalStorage()
    this.settingsData = {}
    // settingsData makes it much easier to properly display the settings in the modal itself
    Object.entries(this.settings).forEach(([settingsKey, settingsValue]) => {
      const settingsKeyParts = settingsKey.split('-')
      const namespace = this._capitalize(settingsKeyParts[0])
      const settingName = settingsKeyParts.slice(1, settingsKeyParts.length).map(this._capitalize).join(' ')
      const data = { name: settingName, value: settingsValue.value, type: settingsValue.type }
      if (!this.settingsData.hasOwnProperty(namespace)) {
        this.settingsData[namespace] = []
      }
      this.settingsData[namespace].push(data)
    })
  }

  saveSettings () {
    Object.keys(this.settingsData).forEach(namespace => {
      const namespaceSettings = this.settingsData[namespace]
      namespaceSettings.forEach(setting => {
        const namespacelower = namespace.toLowerCase()
        const namelower = setting.name.replace(' ', '-').toLowerCase()
        const settingName = `${namespacelower}-${namelower}`
        this.localSettings.update(settingName, { value: setting.value, type: setting.type })
      })
    })
  }
}

LocalSettingsModalController.$$ngIsClass = true
LocalSettingsModalController.$inject = ['localSettings']

export default LocalSettingsModalController
