import React  from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import NerfGunStatus from './NerfGunStatus';
import NerfGunActionButton from './NerfGunActionButton';
import PokeballActionButton from './PokeballActionButton';
import './NerfGunTableRow.css';

const NerfGunTableRow = ({nerfGun, launchDarts, caughtPokemon}) => {
  const zebraTableClasses = classNames({
    'NerfGunTableRow': true,
    'clearfix': true,
    'py1': true,
  });

  const actionBtn = type => {
    if (type === 'nerfgun') {
      return <NerfGunActionButton nerfGun={nerfGun} launchDarts={launchDarts} />
    } else {
      return <PokeballActionButton nerfGun={nerfGun} caughtPokemon={caughtPokemon} />
    }
  }

  return (
    <div className={zebraTableClasses}>
      <div className='col col-3 sm-col-3 right-align h6 sm-h5 md-h3 px1 sm-px1 md-px2 truncate'>{nerfGun.key}</div>
      <div className='col col-2 sm-col-2 center h6 sm-h5 md-h3 px1 sm-px1 md-px2'>{nerfGun.type}</div>
      <div className='col col-2 sm-col-2 center h6 sm-h5 md-h3 px1 sm-px1 md-px2'><NerfGunStatus nerfGun={nerfGun} /></div>
      <div className='col col-2 right-align h6 sm-h5 md-h3 px1 sm-px1 md-px2'>{nerfGun.totalNrDartsFired}</div>
      <div className='col col-3 center h6 sm-h5 md-h3 px1 sm-px1 md-px2'>
        {actionBtn(nerfGun.type)}
      </div>
    </div>
  )
}

NerfGunTableRow.propTypes = {
  nerfGun: PropTypes.object.isRequired,
  launchDarts: PropTypes.func.isRequired,
  caughtPokemon: PropTypes.func.isRequired,
}

export default NerfGunTableRow;
