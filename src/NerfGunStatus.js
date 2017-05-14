import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';

const NerfGunStatus = ({nerfGun}) => {
  let statusText

  if (nerfGun.online) {
    if (nerfGun.firing) {
      statusText = ['Launching', 'Busy']
    } else {
      statusText = ['Online', 'On']
    }
  } else {
    statusText = ['Offline', 'Off']
  }

  const classesStatus = {
    'rounded': true,
    'white': true,
    'h5': true,
    'sm-h5': true,
    'md-h3': true,
    'lg-h2': true,
    'bold': true,
    'p1': true,
    'center': true,
    'fit': true,
    'bg-gray': !nerfGun.online,
    'bg-green': nerfGun.online && !nerfGun.firing,
    'bg-red': nerfGun.online && nerfGun.firing,
  };

  const classesStatusLabel = classNames(classesStatus, {
    'xs-hide': true
  });

  const classesStatusIndicator = classNames(classesStatus, {
    'sm-hide': true,
    'md-hide': true,
    'lg-hide': true,
  });

  return (
    <div>
      <div className={classesStatusLabel}>{statusText[0]}</div>
      <div className={classesStatusIndicator}>{statusText[1]}</div>
    </div>
  )
}

NerfGunStatus.propTypes = {
  nerfGun: PropTypes.object.isRequired,
}

export default NerfGunStatus;
