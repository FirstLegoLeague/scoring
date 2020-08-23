class Configuration {
  load () {
    if (!this._loadPromise) {
      this._loadPromise = Promise.resolve().then(() => {
        Object.assign(this, Configuration.GLOBAL)
        return this
      })
    }
    return this._loadPromise
  }
}

Configuration.$$ngIsClass = true

Configuration.GLOBAL = {
	year: '2019 CITY SHAPER',
  language: 'US English',
  requireSignature: true,
  displayZeroMissions: false
}

export default Configuration
