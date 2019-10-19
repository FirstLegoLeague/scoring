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
    this.settingsObject = {
      // scores: [
      //   {
      //     name: 'dummy',
      //     dataType: 'string',
      //     value: 'dummyvalue',
      //     cb: () => { console.log('dummy cb') }
      //   },
      //   {
      //     name: 'dummy2',
      //     dataType: 'string',
      //     value: 'dummyvalue2',
      //     cb: () => { console.log('dummy2 cb') }
      //   }
      // ]
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
  // 'scores',
  //    [
  //    {
  //      name: 'dummy',
  //      dataType: 'string',
  //      value: 'dummyvalue',
  //      cb: () => { console.log('dummy cb') }
  //    }
  //    ]
  addSettings (sourceName, settingsArray) {
    // const dummysettings = [
    //   {
    //     name: 'dummy',
    //     dataType: 'string',
    //     value: 'dummyvalue add',
    //     cb: () => { console.log('dummy cb') }
    //   }
    // ]
    const settingsObject = this.settingsObject
    if (this.settingsObject.hasOwnProperty(sourceName)) {
      const existingSettings = this.settingsObject[sourceName]// .map(setting => setting.name)
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
    this.settingsObject = settingsObject
    this.$window.sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settingsObject))
  }

  update (settings, sourceName, changeCallback) {
    const listeners = this.listeners
    this.checkSettingValidity(settings)
    const it = {
      'scoresheet-autoscroll': {
        name: 'autoscroll',
        src: 'scoresheet',
        dataType: 'boolean',
        value: true
      }
    }
    Object.keys(settings).forEach(key => {
      if (listeners.hasOwnProperty(key)) {
        const specificListeners = listeners[key]
        const clients = specificListeners.map(entry => entry['client'])
        if (clients.indexOf(sourceName) === -1) {
          listeners[key].push({ client: sourceName, cb: changeCallback })
        }
        const clientsToNotify = listeners[key].filter(entry => entry['client'] !== sourceName)
        clientsToNotify.forEach(entry => {
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

  get (sourceName) {
    const tempobj = JSON.parse(this.$window.sessionStorage.getItem(this.STORAGE_KEY))
    if (tempobj.hasOwnProperty(sourceName)) {
      return tempobj[sourceName]
    } else {
      return tempobj
    }
  }
}
LocalSettings.$$ngIsClass = true
LocalSettings.$inject = ['$window']

export default LocalSettings
