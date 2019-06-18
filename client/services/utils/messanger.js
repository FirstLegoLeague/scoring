const MESSAGE_TYPES = {
  SUBSCRIBE: 'subscribe',
  PUBLISH: 'publish'
}
const CLIENT_ID_KEY = 'client-id'
const DEFAULT_NODE = 'default'
const RETRY_TIMEOUT = 10 * 1000 // 10 seconds

class Messanger {
  constructor (configuration, $window, $timeout, logger) {
    Object.assign(this, { configuration, $window, $timeout, logger })
    this.open = false
    this.connecting = false
    this.listeners = []
    this.topicsToIgnore = []
  }

  init () {
    if (!this.open && !this.connecting) {
      this._initPromise = this.configuration.load().then(config => {
        this.connecting = true
        this.ws = new this.$window.WebSocket(config.mhub)
        this.node = config.node || DEFAULT_NODE
        this.clientId = parseInt(Math.floor(0x100000 * (Math.random())), 16)
        return this
      }).then(() => this._initWebsocket())
    }

    return this._initPromise
  }

  _initWebsocket () {
    return new Promise(resolve => {
      this.ws.onopen = () => {
        this.ws.send(JSON.stringify({ type: MESSAGE_TYPES.SUBSCRIBE, node: this.node }))
        this.open = true
        this.connecting = false
        this.logger.info('Connected to mhub')
        resolve(this.ws)
      }

      this.ws.onclose = () => {
        this.open = false
        this.disconnectionTime = Date.now()
        this.logger.warn('Disonnected from mhub')
        this.$timeout(() => {
          this.logger.warn('Retrying mhub connection')
          this.init()
        }, RETRY_TIMEOUT)
      }

      this.ws.onmessage = msg => {
        const data = JSON.parse(msg.data)
        const { headers, topic } = data

        msg.from = headers[CLIENT_ID_KEY]
        msg.fromMe = (msg.from === this.clientId)

        if (this.topicsToIgnore.includes(topic)) {
          this.topicsToIgnore.splice(this.topicsToIgnore.indexOf(topic), 1)
          return
        }

        this.listeners.filter(listener => {
          return (typeof listener.topic === 'string' && topic === listener.topic) ||
            (listener.topic instanceof RegExp && topic.matches(listener.topic))
        }).forEach(listener => listener.handle(data, msg))
      }
    })
  }

  on (topic, handler, ignoreSelfMessages) {
    this.listeners.push({
      topic: topic,
      handle: (data, msg) => {
        if (!(msg.fromMe && ignoreSelfMessages)) {
          handler(data, msg)
        }
      }
    })

    return this.init()
  }

  send (topic, data) {
    return this.init()
      .then(ws => {
        ws.send(JSON.stringify({
          type: MESSAGE_TYPES.PUBLISH,
          node: this.node,
          topic: topic,
          data: data || {},
          headers: { [CLIENT_ID_KEY]: this.clientId }
        }))
      })
  }

  ignoreNext (topic) {
    this.topicsToIgnore.push(topic)
  }

  timeSinceLastConnection () {
    return Date.now() - (this.open ? 0 : this.disconnectionTime)
  }
}

Messanger.$$ngIsClass = true
Messanger.$inject = ['configuration', '$window', '$timeout', 'logger']

export default Messanger
