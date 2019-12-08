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
    this.settingsByNamespace = {}
    // settingsByNamespace makes it much easier to properly display the settings in the modal itself
    Object.entries(this.settings).forEach(([settingsKey, settingsValue]) => {
      const settingsKeyParts = settingsKey.split('-')
      const namespace = this._capitalize(settingsKeyParts[0])
      const settingName = settingsKeyParts.slice(1, settingsKeyParts.length).map(this._capitalize).join(' ')
      const data = { name: settingName, value: settingsValue.value, type: settingsValue.type }
      if (!this.settingsByNamespace.hasOwnProperty(namespace)) {
        this.settingsByNamespace[namespace] = []
      }
      this.settingsByNamespace[namespace].push(data)
    })
  }

  saveSettings () {
    Object.entries(this.settingsByNamespace).forEach(([namespace, namespaceSettings]) => {
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
