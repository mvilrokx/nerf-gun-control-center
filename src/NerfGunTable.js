import React from 'react';
import PropTypes  from 'prop-types';
import NerfGunTableRow from './NerfGunTableRow';

const NerfGunTable = ({nerfGuns, launchDarts}) => (
  <div>
    <div className='NerfGunTable'>
      <div className='NerfGunTableHeader clearfix center bold lg-h2 md-h3 sm-h4 h4 py1 bg-yellow mb1 md-mb3'>
        <div className='col col-4 sm-col-3'>Nerf Gun ID</div>
        <div className='col col-2 sm-col-3'>Status</div>
        <div className='col col-2'># Darts</div>
        <div className='col col-4'>Action</div>
      </div>
      { nerfGuns.map((nerfGun, index) =>
        <NerfGunTableRow
          key={nerfGun.key}
          nerfGun={nerfGun}
          launchDarts={launchDarts}
          evens={index%2===0}
        />) }
    </div>
  </div>

)

NerfGunTable.propTypes = {
  nerfGuns: PropTypes.arrayOf(PropTypes.object).isRequired,
  launchDarts: PropTypes.func.isRequired,
}

export default NerfGunTable;
