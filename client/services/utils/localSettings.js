const STORAGE_KEY = 'localsettings'
const DATA_TYPE_KEY = 'dataType'
const VALUE_KEY = 'value'
class LocalSettings {
  constructor ($window) {
    Object.assign(this, { $window })
    this.listeners = {}
    this.STORAGE_KEY = STORAGE_KEY
    const fromSession = this.get()
    if (fromSession !== undefined) {
      this.settingsObject = fromSession
    } else {
      this.settingsObject = { }
    }
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

  checkSettingValidity (setting) {
    if (setting.hasOwnProperty('name') && setting.hasOwnProperty('dataType') && setting.hasOwnProperty('value')) {
      const dataType = setting[DATA_TYPE_KEY]
      let valid = false
      if (dataType === 'number' || dataType === 'boolean' || dataType === 'string') {
        // eslint-disable-next-line valid-typeof
        valid = (typeof (setting[VALUE_KEY]) === dataType)
      }
      return valid
    }
    return false
  }

  addSettings (sourceName, settingsArray) {
    const settingsObject = this.settingsObject
    const listeners = this.listeners
    if (this.settingsObject.hasOwnProperty(sourceName)) {
      const existingSettings = this.settingsObject[sourceName]
      settingsArray.forEach(setting => {
        const settingForUpdate = existingSettings.find(entry => {
          return entry.name === setting.name
        })
        if (settingForUpdate) {
          const idx = settingsObject[sourceName].indexOf(settingForUpdate)
          settingsObject[sourceName][idx][VALUE_KEY] = setting[VALUE_KEY]
        } else {
          settingsObject[sourceName].push(setting)
        }
      })
    } else {
      settingsObject[sourceName] = settingsArray
    }
    settingsArray.forEach(setting => {
      if (!listeners.hasOwnProperty(`${sourceName}-${setting.name}`)) {
        listeners[`${sourceName}-${setting.name}`] = setting.cb
      }
    })
    this.listeners = listeners
    this.settingsObject = settingsObject
    this.$window.sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settingsObject))
  }

  update (settings, sourceName, changeCallback) {
    const listeners = this.listeners
    const settingsObject = this.settingsObject
    this.checkSettingValidity(settings)
    Object.keys(settings).forEach(key => {
      if (settingsObject.hasOwnProperty(key) && Array.isArray(settings[key])) {
        if (Array.isArray(settings[key])) {
          settings[key].forEach(item => {
            const forcb = settingsObject[key].find(existing => {
              return existing.name === item.name
            })
            if (forcb) {
              const idx = settingsObject[key].indexOf(forcb)
              settingsObject[key][idx][VALUE_KEY] = item[VALUE_KEY]
              forcb[VALUE_KEY] = item[VALUE_KEY]
            }
          })
        } else if (typeof (settings[key]) === 'object') {
          const constructArray = []
          Object.keys(settings[key]).forEach(givenSetting => {
            constructArray.push({
              name: `${givenSetting}`,
              dataType: typeof (settings[key][givenSetting]),
              value: settings[key][givenSetting],
              cb: changeCallback
            })
            listeners[`${sourceName}-${givenSetting}`] = changeCallback
          })
          settingsObject[key].concat(constructArray)
        }
      } else {
        this.addSettings(key, settings[key])
      }
    })
    Object.assign(this.settingsObject, settingsObject)
    this.$window.sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settingsObject))
    Object.keys(settings).forEach(key => {
      if (Array.isArray(settings[key])) {
        settings[key].forEach(item => {
          if (listeners.hasOwnProperty(`${key}-${item.name}`)) {
            listeners[`${key}-${item.name}`]()
          }
        })
      }
    })
  }

  get (sourceName) {
    const sessionSettings = JSON.parse(this.$window.sessionStorage.getItem(this.STORAGE_KEY))
    if (!sessionSettings) {
      return undefined
    }
    if (sessionSettings.hasOwnProperty(sourceName)) {
      return sessionSettings[sourceName]
    } else {
      return sessionSettings
    }
  }
}
LocalSettings.$$ngIsClass = true
LocalSettings.$inject = ['$window']

export default LocalSettings
