'use strict'

const MESSAGE_TYPES = {
  SUBSCRIBE: 'subscribe',
  LOGIN: 'login',
  PUBLISH: 'publish'
}
const IDENTITY_TOKEN_KEY = 'scoring-token'
const DEFAULT_NODE = 'default'

class Messanger {

  constructor (Configuration) {
    this.Configuration = Configuration
  }

  init () {
    let self = this

    if (this.open) {
      return Promise.resolve(self.ws)
    }

    return this.Configuration.load().then(config => {
      self.ws = new WebSocket(config.mhub)
      self.node = config.node || DEFAULT_NODE
      self.open = false
      self.token = parseInt(Math.floor(0x100000*(Math.random())), 16)
      self.listeners = []
      return self
    }).then(() => new Promise((resolve, reject) => {
      self.ws.onopen = function () {
        self.ws.send(JSON.stringify({
          type: MESSAGE_TYPES.SUBSCRIBE,
          node: self.node
        }));

        self.open = true
        resolve(self.ws)
      }

      self.ws.onerror = function (e) {
        // TODO log
      }

      self.ws.onclose = function () {
        self.open = false
        // TODO log
      }

      self.ws.onmessage = function (msg) {
        var data = JSON.parse(msg.data)
        var headers = data.headers
        var topic = data.topic

        msg.from = headers[IDENTITY_TOKEN_KEY]
        msg.fromMe = (msg.from === self.token)

        self.listeners.filter(listener => {
          return (typeof(listener.topic) === 'string' && topic === listener.topic) ||
            (listener.topic instanceof RegExp && topic.matches(listener.topic))
        }).forEach(listener => listener.handler(data, msg))
      }
    }))
  }

  on (topic, handler, ignoreSelfMessages) {
    let self = this
    
    this.init().then(() => {
      self.listeners.push({
        topic: topic,
        handler: (data, msg) => {
          if (msg.fromMe && ignoreSelfMessages)
            handler(data, msg)
        }
      })
    })
  }

  send (topic, data) {
    let self = this
    let headers = {}  // TODO add auth-token and correlation-id
    headers[IDENTITY_TOKEN_KEY] = this.token
    
    return this.init().then(function(ws) {
      ws.send(JSON.stringify({
        type: MESSAGE_TYPES.PUBLISH,
        node: self.node,
        topic: topic,
        data: data || {},
        headers: headers
      }))
    })
  }

}

Messanger.$$ngIsClass = true
Messanger.$inject = ['Configuration']

export default Messanger
