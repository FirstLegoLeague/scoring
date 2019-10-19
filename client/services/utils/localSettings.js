const STORAGE_KEY = 'localsettings'
// const EMPTY_DATA = JSON.stringify({ })
const DATA_TYPE_KEY = 'dataType'
const VALUE_KEY = 'value'
// settings should be an object with the format:
//  {--settingName--:{dataType:--the value type--,value: --the value--}}
class LocalSettings {
  constructor ($window) {
    Object.assign(this, { $window })
    this.listeners = {}
    this.STORAGE_KEY = STORAGE_KEY
    this.settingsObject = {}
    this.update(this.settingsObject, 'self', () => {})
  }

  parseSettingString (settingsToUpdate) {
    const parsedSettings = {}
    Object.keys(settingsToUpdate).forEach(key => {
      if (settingsToUpdate[key].hasOwnProperty(DATA_TYPE_KEY) &&
      settingsToUpdate[key].hasOwnProperty(VALUE_KEY)) {
        const dataType = settingsToUpdate[key][DATA_TYPE_KEY]
        // TODO: add the other datatypes
        // TODO: make it not fail silently
        switch (dataType.toLowerCase()) {
          case 'string':
            parsedSettings[key] = settingsToUpdate[key][VALUE_KEY]
            break
          case 'boolean':
            parsedSettings[key] = (settingsToUpdate[key][VALUE_KEY] === 'true')
            break
        }
      }
    })
    return parsedSettings
  }

  update (settings, sourceName, changeCallback) {
    const listeners = this.listeners
    Object.keys(settings).forEach(key => {
      if (listeners.hasOwnProperty(key)) {
        const specificListeners = listeners[key]
        const clients = specificListeners.map(entry => entry['client'])
        if (clients.indexOf(sourceName) === -1) {
          listeners[key].push({ client: sourceName, cb: changeCallback })
        }
        const clientsToNotify = listeners[key].filter(entry => entry['client'] !== sourceName)
        clientsToNotify.forEach(entry => {
          console.info(`calling ${entry['client']} callback function`)
          entry['cb']()
        })
      } else {
        listeners[key] = []
        listeners[key].push({ client: sourceName, cb: changeCallback })
      }
    })
    this.listeners = listeners
    Object.assign(this.settingsObject, settings)
    this.$window.sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settingsObject))
  }

  get () {
    return JSON.parse(this.$window.sessionStorage.getItem(this.STORAGE_KEY))
  }
}
LocalSettings.$$ngIsClass = true
LocalSettings.$inject = ['$window']

export default LocalSettings
