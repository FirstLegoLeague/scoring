class LocalSettingsModalController {
  constructor (localSettings) {
    Object.assign(this, { localSettings })
    this.settings = {}
  }

  $onInit () {
    return this.localSettings.init()
      .then(localSettings => {
        this.settingsByNamespace = Object.entries(localSettings).reduce((settingsByNamespace, [key, setting]) => {
          const [namespace, name] = extractNamespaceFromKey(key)

          if (!settingsByNamespace.hasOwnProperty(namespace)) {
            settingsByNamespace[namespace] = []
          }

          settingsByNamespace[namespace].push(Object.assign({ name }, setting))
          return settingsByNamespace
        }, {})
      })
  }

  save () {
    Object.entries(this.settingsByNamespace).forEach(([namespace, namespaceSettings]) => {
      namespaceSettings.forEach(({ name, value }) => {
        this.localSettings.set(getKeyFromNamespaceAndName(namespace, name), value)
      })
    })
    this.localSettings.save()
  }
}

function extractNamespaceFromKey (key) {
  const nameParts = key.split('-').map(capitalize)
  const namespace = nameParts[0]
  const name = nameParts.splice(1, nameParts.length).join(' ')
  return [namespace, name]
}

function getKeyFromNamespaceAndName (namespace, name) {
  return `${namespace.toLowerCase()}-${name.toLowerCase().split(' ').join('-')}`
}

function capitalize (string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

LocalSettingsModalController.$$ngIsClass = true
LocalSettingsModalController.$inject = ['localSettings']

export default LocalSettingsModalController
