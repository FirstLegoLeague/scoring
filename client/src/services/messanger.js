'use strict'

class Messanger {

	constructor (Configuration) {
		this.ws = new WebSocket(Configuration.MHUB)
		this.node = Configuration.node || 'default'
		this.open = false
		this.token = parseInt(Math.floor(0x100000*(Math.random())), 16)
		this.listeners = []
	}

	init () {
		let self = this
		if (this.open) {
			return Promise.resolve()
		}
		return new Promise((resolve, reject) => {
			self.ws.onopen = function () {
                ws.send(JSON.stringify({
                    type: "subscribe",
                    node: self.node
                }));

                self.open = true
                resolve(self.ws)
            }

            ws.onerror = function (e) {
            	// TODO log
            }

            ws.onclose = function () {
                self.open = false
            	// TODO log
            }

            ws.onmessage = function (msg) {
                var data = JSON.parse(msg.data)
                var headers = data.headers
                var topic = data.topic

                msg.from = headers["scoring-token"]
                msg.fromMe = (msg.from === self.token)

                listeners.filter(listener => {
                    return (typeof(listener.topic) === 'string' && topic === listener.topic) ||
                    	(listener.topic instanceof RegExp && topic.matches(listener.topic))
                }).forEach(listener => listener.handler(data, msg))
            }
		})
	}

	on (topic, handler, ignoreSelfMessages) {
        init()
        listeners.push({
        	topic: topic,
        	handler: (data, msg) => {
        		if (msg.fromMe && ignoreSelfMessages)
        			handler(data, msg)
        	}
        })
	}

	send (topic, data) {
		return init().then(function(ws) {
            ws.send(JSON.stringify({
                type: "publish",
                node: ws.node,
                topic: topic,
                data: data || {},
                headers: { "scoring-token": token } // TODO add auth-token and correlation-id
            }))
        })
	}

}

Messanger.$inject = ['Configuration']

export default Messanger
