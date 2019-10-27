import EventEmitter from 'event-emitter-es6'

const STORAGE_KEY = 'localsettings'
const DATA_TYPE_KEY = 'dataType'
const VALUE_KEY = 'value'
const NAME_KEY = 'name'
class LocalSettings extends EventEmitter {
  constructor ($window, $rootScope) {
    super()
    Object.assign(this, { $window, $rootScope })
    // this.STORAGE_KEY = STORAGE_KEY
    const settingsFromSession = this.getFromLocalStorage()
    if (settingsFromSession !== undefined) {
      this.settings = settingsFromSession
    } else {
      this.settings = { }
    }
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
    if (this.settings.hasOwnProperty(namespace)) {
      namespaceSettingsArray.forEach(setting => {
        const settingToUpdate = settings[namespace].find(entry => entry.name === setting.name)
        if (settingToUpdate) {
          settingToUpdate[VALUE_KEY] = setting[VALUE_KEY]
        } else {
          settings[namespace].push(setting)
          this.$rootScope.$watch(() => setting[VALUE_KEY], (newValue, oldValue) => {
            if (newValue !== oldValue) {
              this.emit(`${namespace} ${setting[NAME_KEY]}`)
            }
          })
        }
      })
    } else {
      settings[namespace] = namespaceSettingsArray
    }
    this.settings = settings
    this.saveToLocalStorage()
  }

  update (passedSettings, passedNamespace) {
    Object.keys(passedSettings).forEach(key => {
      if (this.settings.hasOwnProperty(key)) {
        // this means that passedSettings is of the form {namespace: [{...}]}, which means that is came from the settings modal.
        if (Array.isArray(passedSettings[key])) {
          const namespaceSettingsArray = []
          passedSettings[key].forEach(setting => {
            const sanitizedSetting = {
              name: setting.name,
              dataType: setting.dataType,
              value: setting.value
            }
            if (this.checkSettingValidity(sanitizedSetting)) {
              namespaceSettingsArray.push(sanitizedSetting)
            }
          })
          this.addSettings(key, namespaceSettingsArray)
        } // if it's not an array then the given arguments make no sense.
      } else {
        this.addSettings(passedNamespace, [{
          name: key,
          dataType: typeof (passedSettings[key]),
          value: passedSettings[key]
        }])
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
