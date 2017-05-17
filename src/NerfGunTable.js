import React from 'react';
import PropTypes  from 'prop-types';
import NerfGunTableRow from './NerfGunTableRow';

const NerfGunTable = ({nerfGuns, launchDarts, caughtPokemon}) => (
  <div>
    <div className='NerfGunTable'>
      <div className='NerfGunTableHeader clearfix center bold md-h3 sm-h4 h4 py1 bg-yellow mb1 md-mb2'>
        <div className='col col-3 sm-col-3'>ID</div>
        <div className='col col-2 sm-col-2'>Type</div>
        <div className='col col-2 sm-col-2'>Status</div>
        <div className='col col-2'># Darts</div>
        <div className='col col-3'>Action</div>
      </div>
      { nerfGuns.map(nerfGun =>
        <NerfGunTableRow
          key={nerfGun.key}
          nerfGun={nerfGun}
          launchDarts={launchDarts}
          caughtPokemon={caughtPokemon}
        />) }
    </div>
  </div>

)

NerfGunTable.propTypes = {
  nerfGuns: PropTypes.arrayOf(PropTypes.object).isRequired,
  launchDarts: PropTypes.func.isRequired,
  caughtPokemon: PropTypes.func.isRequired,
}

export default NerfGunTable;
