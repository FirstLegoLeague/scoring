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
   * example input: settingKey: 'scoresheel-autoscroll' settingValueTypePair: {value: true, dataType: 'boolean'}
   * @param {string} settingsKey
   * @param {{value:*,dataType:string}} settingValueTypePair
   */
  update (settingsKey, settingValueTypePair) {
    this.settings[settingsKey] = settingValueTypePair
    this.emit(`${settingsKey}`)
    this._saveToLocalStorage()
  }
  /**
   * saves this service's settings object to the session storage
   */
  _saveToLocalStorage () {
    this.$window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
  }

  /**
   * for example: 'scoresheet-autoscroll'
   * @param {string} settingsKey
   */
  get (settingsKey) {
    if (this.settings.hasOwnProperty(settingsKey)) {
      return this.settings[settingsKey]
    } else {
      return undefined
    }
  }

  /**
   * gets the requested setting from the session storage. Key name should be something like 'scoresheet-autoscroll'
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
        return undefined
      }
    } else {
      return sessionSettings
    }
  }
}
LocalSettings.$$ngIsClass = true
LocalSettings.$inject = ['$window', '$rootScope']

export default LocalSettings
