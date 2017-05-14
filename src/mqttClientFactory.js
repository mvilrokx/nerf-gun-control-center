import mqtt from 'mqtt';
import config from './config';

const mqttClientFactory = (cred) => {
  return mqtt.connect(config.mqttServer.url, { keepalive: 540,
    username: cred.user || config.mqttServer.username,
    password: cred.pwd || config.mqttServer.password
  })
}

export default mqttClientFactory
