import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import './NerfGunActionButton.css';

class NerfGunActionButton extends Component {
  state = {
    menuActive: false
  };

  handleClick = e => this.setState({menuActive: !this.state.menuActive});

  handleLaunch = (nerfGunId, nrOfDarts) => e => {
    e.preventDefault();
    this.props.launchDarts(nerfGunId, nrOfDarts)
  }

  render() {
    const positionerClasses = classNames({
      'fixed': true,
      'top-0': true,
      'right-0': true,
      'bottom-0': true,
      'left-0': true,
      'block': this.state.menuActive,
      'display-none': !this.state.menuActive,
    });

    const menuItemsClasses = classNames({
      'menuItems': true,
      'absolute': true,
      'left-0': true,
      'mt1': true,
      'nowrap': true,
      'rounded': true,
      'border': true,
      'border-gray': true,
      'bg-white': true,
      'block': this.state.menuActive,
      'z1': this.state.menuActive,
      'display-none': !this.state.menuActive,
    });

    const menuItems = [];

    for(var i=0; i < 3; i++){
      menuItems.push(<a
        key={i}
        href="#!"
        className="menuItem btn block"
        onClick={this.handleLaunch(this.props.nerfGun.key,i+1)} >
          {i + 1} Dart{i > 0 ? 's' : ''}
        </a>);
    }

    return (
      <div className="relative inline-block" onClick={this.handleClick}>
        <button type="button" className="btn btn-primary" disabled={!this.props.nerfGun.available}>
          Launch &#9662;
        </button>
        <div className={positionerClasses}></div>
        <div className={menuItemsClasses}>
          {menuItems}
        </div>
      </div>
    )
  }
}

NerfGunActionButton.propTypes = {
  nerfGun: PropTypes.object.isRequired,
  launchDarts: PropTypes.func.isRequired,
}


export default NerfGunActionButton;
