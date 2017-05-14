import React, { Component } from 'react';
import mqttClientFactory from './mqttClientFactory';
import SideMenu from './SideMenu';
import NerfGunTable from './NerfGunTable';
import Footer from './Footer'
import FixedFooter from './FixedFooter'

class App extends Component {
  state = {
    nerfGuns: [],
    sideMenuActive: false,
    mqttCredentials: {},
    // mqttCredentials: {user: undefined, pwd: undefined},
    connected: false,
  };

  mqttClient = {};

  connectHandler = mqttClient => () => {
    // Hide "Trying to connect" message
    console.log("> Successfully connected to CloudMQTT");
    mqttClient.subscribe('nerf/server')
    mqttClient.publish('nerf/server', '> Nerf Center connected.')
    this.setState({connected: true})
  }

  messageHandler = (topic, message) => {
    console.log('> received message = ', message.toString());
    if (topic === 'nerf/server') {
      // Copy State
      let nerfGuns = []
      nerfGuns.push(...this.state.nerfGuns)

      try {
        const receivedNerfGunData = JSON.parse(message.toString());
        const online = receivedNerfGunData.state === 'on'
        const firing = receivedNerfGunData.firing === 'on'
        const available = online && !firing

        const nerfGunIndex = nerfGuns.findIndex(nerf =>  nerf.key === receivedNerfGunData.key )

        if (nerfGunIndex > -1) {
          nerfGuns[nerfGunIndex] = {
            key: nerfGuns[nerfGunIndex].key,
            totalNrDartsFired: nerfGuns[nerfGunIndex].totalNrDartsFired + (receivedNerfGunData.nrDartsFired || 0),
            online,
            firing,
            available,
          }
        } else {
          nerfGuns.push({
            key: receivedNerfGunData.key,
            totalNrDartsFired: receivedNerfGunData.nrDartsFired || 0,
            online,
            firing,
            available,
          })
        }
        this.setState({ nerfGuns })
      } catch (e) {
        // continue
      }
    }
  }

  launchDarts = (nerfGunId, nrOfDarts) => {
    this.mqttClient.publish(`nerf/${nerfGunId}/command/launch`, `{"nrOfDarts":${nrOfDarts}}`);
  }

  toggleSideMenu = () => {
    let sideMenuActive = this.state.sideMenuActive
    sideMenuActive = !sideMenuActive
    this.setState({ sideMenuActive })
  }

  connectToMQTTServer = () => {
    this.mqttClient = mqttClientFactory(this.state.mqttCredentials)

    this.mqttClient.on('connect', this.connectHandler(this.mqttClient))
    this.mqttClient.on('message', this.messageHandler)
    this.mqttClient.on('reconnect', () => this.setState({connected: true}))
    this.mqttClient.on('close', () => this.setState({connected: false}))
    this.mqttClient.on('offline', () => this.setState({connected: false}))
  }

  disconnectFromMQTTServer = () => {
    if (this.mqttClient && this.mqttClient.end) {
      this.mqttClient.end(false, () => { console.log("Successfully disconnected from CloudMQTT") })
    }
  }

  addMqttCredentials = (user, pwd) => {
    this.setState({ mqttCredentials: {user, pwd} }, this.connectToMQTTServer)
  }

  /*
   * Lifecycle Handlers
   */
  componentWillMount() {
    // Show "Trying to connect" message
    // this.connectToMQTTServer()

    //HARDCODED FOR NOW
    this.setState({ nerfGuns: [
      {key: '54:ff:34:e4:e9:5f', totalNrDartsFired: 10, online: true, firing: true, available: false},
      {key: '43:ed:6e:03:43:4e', totalNrDartsFired: 100, online: true, firing: false, available: true},
      {key: '31:12:1e:5d:99:66', totalNrDartsFired: 1000, online: false, firing: false, available: false},
    ] })
  }

  componentWillUnmount() {
    this.disconnectFromMQTTServer()
  }

  render() {
    return (
      <FixedFooter footer={<Footer/>} >
        <SideMenu
          toggleSideMenu={this.toggleSideMenu}
          sideMenuActive={this.state.sideMenuActive}
          connected={this.state.connected}
          addMqttCredentials={this.addMqttCredentials}
          disconnectFromMQTTServer={this.disconnectFromMQTTServer}
        />
        <div className="main">
          <div className="h1 md-h1 lg-h0 bold center pb1 md-pb2 lg-pb3">Nerf Center</div>
          <NerfGunTable nerfGuns={this.state.nerfGuns} launchDarts={this.launchDarts} />
        </div>
      </FixedFooter>
    );
  }
}

export default App;
