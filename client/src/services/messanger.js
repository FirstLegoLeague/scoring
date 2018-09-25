'use strict'

const MESSAGE_TYPES = {
  SUBSCRIBE: 'subscribe',
  LOGIN: 'login',
  PUBLISH: 'publish'
}
const IDENTITY_TOKEN_KEY = 'scoring-token'
const DEFAULT_NODE = 'default'
const RETRY_TIMEOUT = 10 * 1000 // 10 seconds

class Messanger {

  constructor (Configuration, $timeout) {
    this.Configuration = Configuration
    this.$timeout = $timeout
    this.open = false
    this.listeners = []
  }

  init () {
    const messanger = this
    
    if (this.open) {
      return Promise.resolve(this.ws)
    }

    return this.Configuration.load().then(config => {
      messanger.ws = new WebSocket(config.mhub)
      messanger.node = config.node || DEFAULT_NODE
      messanger.token = parseInt(Math.floor(0x100000*(Math.random())), 16)
      return messanger
    }).then(() => new Promise((resolve, reject) => {
      messanger.ws.onopen = function () {
        messanger.ws.send(JSON.stringify({
          type: MESSAGE_TYPES.SUBSCRIBE,
          node: messanger.node
        }));

        messanger.open = true
        console.log('Connected to mhub')
        resolve(messanger.ws)
      }

      messanger.ws.onclose = function () {
        messanger.open = false
        console.log('Disonnected from mhub')
        messanger.$timeout(() => {
          console.log('Retrying mhub connection')
          messanger.init()
        }, RETRY_TIMEOUT)
      }

      messanger.ws.onmessage = function (msg) {
        var data = JSON.parse(msg.data)
        var headers = data.headers
        var topic = data.topic

        msg.from = headers[IDENTITY_TOKEN_KEY]
        msg.fromMe = (msg.from === messanger.token)

        messanger.listeners.filter(listener => {
          return (typeof(listener.topic) === 'string' && topic === listener.topic) ||
            (listener.topic instanceof RegExp && topic.matches(listener.topic))
        }).forEach(listener => listener.handler(data, msg))
      }
    }))
  }

  on (topic, handler, ignoreSelfMessages) {
    this.listeners.push({
      topic: topic,
      handler: (data, msg) => {
        if (!(msg.fromMe && ignoreSelfMessages))
          handler(data, msg)
      }
    })

    return this.init()
  }

  send (topic, data) {
    let headers = {}  // TODO add auth-token and correlation-id
    headers[IDENTITY_TOKEN_KEY] = this.token
    
    return this.init().then(function(ws) {
      ws.send(JSON.stringify({
        type: MESSAGE_TYPES.PUBLISH,
        node: this.node,
        topic: topic,
        data: data || {},
        headers: headers
      }))
    })
  }

}

Messanger.$$ngIsClass = true
Messanger.$inject = ['Configuration', '$timeout']

export default Messanger
