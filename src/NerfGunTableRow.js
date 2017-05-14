import React  from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import NerfGunStatus from './NerfGunStatus';
import NerfGunActionButton from './NerfGunActionButton';

const NerfGunTableRow = ({nerfGun, launchDarts, evens}) => {
  const zebraTableClasses = classNames({
    'NerfGunTableRow': true,
    'clearfix': true,
    'py1': true,
    'lg-py2': true,
    'bg-silver': !evens,
  });

  return (
    <div className={zebraTableClasses}>
      <div className='col col-4 sm-col-3 right-align h5 sm-h5 md-h3 lg-h2 px1 sm-px1 md-px2 lg-px3'><samp>{nerfGun.key}</samp></div>
      <div className='col col-2 sm-col-3 center h5 sm-h5 md-h3 lg-h2 px1 sm-px1 md-px2 lg-px3'><NerfGunStatus nerfGun={nerfGun} /></div>
      <div className='col col-2 right-align h5 sm-h5 md-h3 lg-h2 px1 sm-px1 md-px2 lg-px3'>{nerfGun.totalNrDartsFired}</div>
      <div className='col col-4 center h5 sm-h5 md-h3 lg-h2 px1 sm-px1 md-px2 lg-px3'>
        <NerfGunActionButton nerfGun={nerfGun} launchDarts={launchDarts} />
      </div>
    </div>
  )
}

NerfGunTableRow.propTypes = {
  nerfGun: PropTypes.object.isRequired,
  launchDarts: PropTypes.func.isRequired,
  evens: PropTypes.bool.isRequired,
}

export default NerfGunTableRow;
