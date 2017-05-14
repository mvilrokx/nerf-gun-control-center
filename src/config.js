const host = 'm11.cloudmqtt.com' //provide your own
const port = '30581' //provide your own

const config = {
  mqttServer: {
    url: `wss://${host}:${port}`,
    username: 'secret', //provide your own
    password: 'secret', //provide your own
  }
}

export default config
