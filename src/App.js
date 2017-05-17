import React, { Component } from 'react'
import mqttClientFactory from './mqttClientFactory'
import SideMenu from './SideMenu'
import NerfGunTable from './NerfGunTable'
import Footer from './Footer'
import FixedFooter from './FixedFooter'

class App extends Component {
  state = {
    nerfGuns: [],
    pokeballs: [],
    sideMenuActive: false,
    mqttCredentials: {user: undefined, pwd: undefined},
    connected: false,
  }

  mqttClient = {}

  connectHandler = mqttClient => () => {
    console.log("> Successfully connected to CloudMQTT")
    mqttClient.subscribe('nerf/server') // Nerf Guns
    mqttClient.subscribe('server/logging/#') // Pokeballs
    // TODO: Target

    mqttClient.publish('nerf/server', '> Nerf Center connected.')
    mqttClient.publish('ESP8266/rtb', 'Return To Base') // Return To Base message to check what is online

    this.setState({connected: true})
  }

  messageHandler = (topic, message) => {
    console.log(`> received message = ${message.toString()} on topic ${topic}`)

    if (topic.startsWith('server/logging/')) { // Pokeball
      const espId = topic.match(/^server\/logging\/(.*)/)[1]
      // Copy State
      let pokeballs = []
      pokeballs.push(...this.state.pokeballs)

      try {
        // const receivedPokeballData = JSON.parse(message.toString())
        const pokeballIndex = pokeballs.findIndex(pokeball =>  pokeball.key === espId )
        if (pokeballIndex > -1) {

        } else {
          pokeballs.push({
            key: espId,
            type: 'pokeball',
            online: true,
            available: true,
            totalNrDartsFired: 'N/A',
            capabilities: [
              {topic: 'rgbled/values', message: '{ redValue:number(3), greenValue:number(3), blueValue:number(3) }'},
              {topic: 'rgbled/disco', message: '{ times:number(2) }'},
              {topic: 'motor', message: 'not used'},
              {topic: 'gotone', message: 'not used'},
            ] // These should come from the ESP but for now, hard coded
          })
        }
        this.setState({ pokeballs })
      } catch (e) {
        // continue
      }

    } else if (topic === 'nerf/server') { // Nerf Gun
      // Copy State
      let nerfGuns = []
      nerfGuns.push(...this.state.nerfGuns)

      try {
        const receivedNerfGunData = JSON.parse(message.toString())
        const online = receivedNerfGunData.state === 'on'
        const firing = receivedNerfGunData.firing === 'on'
        const available = online && !firing

        const nerfGunIndex = nerfGuns.findIndex(nerf =>  nerf.key === receivedNerfGunData.key )

        if (nerfGunIndex > -1) {
          nerfGuns[nerfGunIndex] = {
            key: nerfGuns[nerfGunIndex].key,
            type: 'nerfgun',
            totalNrDartsFired: nerfGuns[nerfGunIndex].totalNrDartsFired + (receivedNerfGunData.nrDartsFired || 0),
            online,
            firing,
            available,
            capabilities: [
              {topic: `"nerf/${receivedNerfGunData.key}/command/launch"`, message: '{ "nrOfDarts": nrOfDarts:number(1) }'},
            ] // These should come from the ESP but for now, hard coded
          }
        } else {
          nerfGuns.push({
            key: receivedNerfGunData.key,
            type: 'nerfgun',
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
    this.mqttClient.publish(`nerf/${nerfGunId}/command/launch`, `{"nrOfDarts":${nrOfDarts}}`)
  }

  caughtPokemon = espId => this.mqttClient.publish(`${espId}/gotone`, `not used`)

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
      this.mqttClient.end(false, () => { console.log("> Successfully disconnected from CloudMQTT") })
      this.setState({connected: false})
    }
  }

  addMqttCredentials = (user, pwd, server, port) => {
    this.setState({ mqttCredentials: {user, pwd, server, port} }, this.connectToMQTTServer)
  }

  /*
   * Lifecycle Handlers
   */
  componentWillMount() {
    // this.connectToMQTTServer()

    //Fake Data
    this.setState({
      nerfGuns: [
        {key: '54:ff:34:e4:e9:5f', type: 'nerfgun', totalNrDartsFired: 10, online: false, firing: false, available: false},
        {key: '43:ed:6e:03:43:4e', type: 'nerfgun', totalNrDartsFired: 100, online: false, firing: false, available: false},
        // {key: '31:12:1e:5d:99:66', type: 'nerfgun', totalNrDartsFired: 1000, online: false, firing: false, available: false},
      ]
    })
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
          <NerfGunTable
            nerfGuns={[...this.state.nerfGuns, ...this.state.pokeballs]}
            caughtPokemon={this.caughtPokemon}
            launchDarts={this.launchDarts}
          />
        </div>
      </FixedFooter>
    )
  }
}

export default App
