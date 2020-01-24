import Promise from 'bluebird'
import EventEmitter from 'event-emitter-es6'

const STORAGE_KEY = 'localsettings'

class LocalSettings extends EventEmitter {
  constructor ($window, configuration) {
    super()
    Object.assign(this, { $window, configuration })
  }

  init () {
    if (!this._initPromise) {
      this._initPromise = this.load()
    }
    return this._initPromise
  }

  load () {
    const savedSettings = this.$window.sessionStorage.getItem(STORAGE_KEY)
    let promise
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings)
      promise = Promise.resolve()
    } else {
      promise = this._loadDefaultSettings()
        .then(settings => {
          this.settings = settings
        })
    }

    return promise.then(() => this.save())
  }

  save () {
    this.$window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
    return this.settings
  }

  get (key) {
    return this.settings[key].value
  }

  set (key, value) {
    this.settings[key].value = value
    this.emit(`${key} changed`)
  }

  _loadDefaultSettings () {
    return this.configuration.load()
      .then(config => Promise.all(LocalSettings.settingProviders.map(provider => provider(config))))
      .then(defaultSettingsArray => {
        return defaultSettingsArray.reduce((defaultSettings, defaultSetting) => {
          defaultSettings[defaultSetting.name] = defaultSetting
          delete defaultSetting.name
          return defaultSettings
        }, { })
      })
  }
}

LocalSettings.settingProviders = []

LocalSettings.$$ngIsClass = true
LocalSettings.$inject = ['$window', 'configuration']

export default LocalSettings
