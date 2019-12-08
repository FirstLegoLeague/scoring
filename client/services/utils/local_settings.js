import EventEmitter from 'event-emitter-es6'

const STORAGE_KEY = 'localsettings'
const DATA_TYPE_KEY = 'dataType'
const VALUE_KEY = 'value'
const NAME_KEY = 'name'
class LocalSettings extends EventEmitter {
  constructor ($window, $rootScope) {
    super()
    Object.assign(this, { $window, $rootScope })
    const settingsFromSession = this.getFromLocalStorage()
    if (settingsFromSession !== undefined) {
      this.settings = settingsFromSession
    } else {
      this.settings = { }
    }
  }

  // example:
  /**
   * example input: settingKey: 'Scoresheel-Autoscroll' settingValueTypePair: {value: true, dataType: 'boolean'}
   * @param {string} settingsKey
   * @param {{value:*,dataType:string}} settingValueTypePair
   */
  update (settingsKey, settingValueTypePair) {
    this.settings[settingsKey] = settingValueTypePair
    this.$rootScope.$watch(() => this.settings[settingsKey][VALUE_KEY], (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.emit(`${settingsKey}`)
      }
    })
    this._saveToLocalStorage()
  }
  /**
   * saves this service's settings object to the session storage
   */
  _saveToLocalStorage () {
    this.$window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
  }

  /**
   * gets the requested setting from the session storage. Key name should be something like 'Scoresheet-Autoscroll'
   * @param {string} settingsKey
   */
  getFromLocalStorage (settingsKey) {
    const sessionStorageItem = this.$window.sessionStorage.getItem(STORAGE_KEY)
    const sessionSettings = JSON.parse(sessionStorageItem || '{}')
    if (!sessionSettings) {
      return undefined
    }
    if (settingsKey) {
      if (sessionSettings.hasOwnProperty(settingsKey)) {
        return sessionSettings[settingsKey]
      } else {
        return null
      }
    } else {
      return sessionSettings
    }
  }
}
LocalSettings.$$ngIsClass = true
LocalSettings.$inject = ['$window', '$rootScope']

export default LocalSettings
