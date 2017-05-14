import React from 'react';
import PropTypes  from 'prop-types';

const SideMenuForm = ({addMqttCredentials, disconnectFromMQTTServer, connected}) => {
  let server;
  let port;
  let user;
  let pwd;

  const submitMqttCredentials = (e) => {
    e.preventDefault();
    addMqttCredentials(user.value, pwd.value, server.value, port.value);
    user.value = '';
    pwd.value = '';
  }

  return (
    <form onSubmit={submitMqttCredentials}>
      <label className="label" htmlFor="mqtt-server">MQTT Server</label>
      <input ref={node => server = node} type="text" className="input" id="mqtt-server" name="mqttServer"/>
      <label className="label" htmlFor="mqtt-server-port">MQTT Server Port</label>
      <input ref={node => port = node} type="text" className="input" id="mqtt-server-port" name="mqttServerPort"/>
      <label className="label" htmlFor="mqtt-user-name-input">MQTT User Name</label>
      <input ref={node => user = node} type="text" className="input" id="mqtt-user-name-input" name="mqttUserName"/>
      <label className="label" htmlFor="mqtt-user-name-input">MQTT Password</label>
      <input ref={node => pwd = node} type="password" className="input" id="mqtt-password-input" name="mqttPassword"/>
      <button type="submit" className="btn btn-primary">Connect</button>
      { connected ?
        <button type="button" className="btn" onClick={disconnectFromMQTTServer}>
          Disconnect
        </button> :
        <button type="reset" className="btn">
          Clear
        </button>
      }
    </form>
  )
}

SideMenuForm.propTypes = {
  addMqttCredentials: PropTypes.func.isRequired,
}

export default SideMenuForm

