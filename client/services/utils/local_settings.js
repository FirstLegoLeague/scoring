import EventEmitter from 'event-emitter-es6'

const STORAGE_KEY = 'localsettings'
const DATA_TYPE_KEY = 'dataType'
const VALUE_KEY = 'value'
const NAME_KEY = 'name'
class LocalSettings extends EventEmitter {
  constructor ($window, $rootScope) {
    super()
    Object.assign(this, { $window, $rootScope })
    // this.listeners = {}
    // this.STORAGE_KEY = STORAGE_KEY
    const settingsFromSession = this.getFromLocalStorage()
    if (settingsFromSession !== undefined) {
      this.settings = settingsFromSession
    } else {
      this.settings = { }
    }
    this.update(this.settings, 'self')// , () => {})
  }

  checkSettingValidity (setting) {
    if (setting.hasOwnProperty(NAME_KEY) && setting.hasOwnProperty(DATA_TYPE_KEY) && setting.hasOwnProperty(VALUE_KEY)) {
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

  addSettings (namespace, namespaceSettingsArray) {
    const settings = this.settings
    // const listeners = this.listeners
    if (this.settings.hasOwnProperty(namespace)) {
      namespaceSettingsArray.forEach(setting => {
        const settingToUpdate = settings[namespace].find(entry => entry.name === setting.name)
        if (settingToUpdate) {
          settingToUpdate[VALUE_KEY] = setting[VALUE_KEY]
        } else {
          settings[namespace].push(setting)
        }
      })
    } else {
      settings[namespace] = namespaceSettingsArray
    }
    // namespaceSettingsArray.forEach(setting => {
    //   if (!listeners.hasOwnProperty(`${namespace}-${setting.name}`)) {
    //     listeners[`${namespace}-${setting.name}`] = setting.cb
    //   }
    // })
    // this.listeners = listeners
    this.settings = settings
    this.saveToLocalStorage()
  }

  update (passedSettings, sourceName) { //, changeCallback) {
    // const listeners = this.listeners
    const settingsObject = this.settings
    this.checkSettingValidity(passedSettings)
    Object.keys(passedSettings).forEach(key => {
      if (settingsObject.hasOwnProperty(key) && Array.isArray(passedSettings[key])) {
        if (Array.isArray(passedSettings[key])) {
          passedSettings[key].forEach(item => {
            const forcb = settingsObject[key].find(existing => {
              return existing.name === item.name
            })
            if (forcb) {
              const idx = settingsObject[key].indexOf(forcb)
              settingsObject[key][idx][VALUE_KEY] = item[VALUE_KEY]
              forcb[VALUE_KEY] = item[VALUE_KEY]
            }
          })
        } else if (typeof (passedSettings[key]) === 'object') {
          const constructArray = []
          Object.keys(passedSettings[key]).forEach(givenSetting => {
            constructArray.push({
              name: `${givenSetting}`,
              dataType: typeof (passedSettings[key][givenSetting]),
              value: passedSettings[key][givenSetting]
              //, cb: changeCallback
            })
            // listeners[`${sourceName}-${givenSetting}`] = changeCallback
          })
          settingsObject[key].concat(constructArray)
        }
      } else {
        this.addSettings(key, passedSettings[key])
      }
    })
    Object.assign(this.settings, settingsObject)
    this.saveToLocalStorage()
    Object.keys(passedSettings).forEach(namespace => {
      if (Array.isArray(passedSettings[namespace])) {
        passedSettings[namespace].forEach(item => {
          this.emit(`${namespace} ${item.name}`)
          // if (listeners.hasOwnProperty(`${namespace}-${item.name}`)) {
          //   listeners[`${namespace}-${item.name}`]()
          // }
        })
      }
    })
  }

  saveToLocalStorage () {
    this.$window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
  }

  getFromLocalStorage (sourceName) {
    const sessionStorageItem = this.$window.sessionStorage.getItem(STORAGE_KEY)
    const sessionSettings = JSON.parse(sessionStorageItem || '{}')
    if (!sessionSettings) {
      return undefined
    }
    if (sourceName && sessionSettings.hasOwnProperty(sourceName)) {
      return sessionSettings[sourceName]
    } else {
      return sessionSettings
    }
  }
}
LocalSettings.$$ngIsClass = true
LocalSettings.$inject = ['$window', '$rootScope']

export default LocalSettings
