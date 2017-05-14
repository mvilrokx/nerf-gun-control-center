import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import Icon from 'react-geomicons';
import SideMenuForm from './SideMenuForm';
import './SideMenu.css';

const SideMenu = ({toggleSideMenu, sideMenuActive, addMqttCredentials, connected, disconnectFromMQTTServer}) => {

  const sideMenuClasses = classNames({
    'side-menu': true,
    'side-menu--active': sideMenuActive,
    'absolute': true,
    'left-0': true,
    'top-0': true,
    'bg-black': true,
    'white': true,
    'col': true,
    'col-8': true,
    'sm-col-8': true,
    'md-col-5': true,
    'lg-col-4': true,
    'p2': true,
  })

  const sideMenuLinkClasses = classNames({
    'p2': true,
    'block': true,
    'bg-black': sideMenuActive,
    'white': sideMenuActive,
    'bg-white': !sideMenuActive,
    'black': !sideMenuActive,
    'text-decoration-none': true,
  })

  const cogClasses = classNames({
    'bg-white':  true,
    'green': connected,
    'red': !connected,
  })

  return (
    <div style={{minHeight: "100vh"}} className={sideMenuClasses}>
      <h2>Menu</h2>
      { connected ?
        <span className="mb2 inline-block"><Icon name="info" className="blue mr1 h2"/>
          Connected to MQTT!
        </span> :
        <span className="mb2 inline-block"><Icon name="warning" className="yellow mr1 h2"/>
          Not connected to MQTT
        </span>
      }
      <div className="open-side-menu-button absolute top-0 right-0">
        <a className={sideMenuLinkClasses} href="#!" onClick={toggleSideMenu}>
          { sideMenuActive ? <Icon name="close"/> : <Icon name="cog" className={cogClasses} /> }
        </a>
      </div>
      <div>
        <SideMenuForm
          addMqttCredentials={addMqttCredentials}
          disconnectFromMQTTServer={disconnectFromMQTTServer}
          connected={connected}
        />
      </div>
    </div>
  )
}

SideMenu.propTypes = {
  toggleSideMenu: PropTypes.func.isRequired,
  sideMenuActive: PropTypes.bool.isRequired,
}

export default SideMenu

