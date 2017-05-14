import mqtt from 'mqtt';
import config from './config';

const mqttClientFactory = (cred) => {
  const url = (cred.server && cred.port) ? `wss://${cred.server}:${cred.port}` : config.mqttServer.url

  return mqtt.connect(url, { keepalive: 540,
    username: cred.user || config.mqttServer.username,
    password: cred.pwd || config.mqttServer.password
  })
}

export default mqttClientFactory

