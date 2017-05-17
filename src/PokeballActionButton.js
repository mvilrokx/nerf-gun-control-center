import React from 'react';
import PropTypes  from 'prop-types';

const PokeballActionButton = ({nerfGun, caughtPokemon}) => {
// class PokeballActionButton extends Component {

  const handleCatch = pokeballId => e => {
    e.preventDefault();
    caughtPokemon(pokeballId)
  }

  return (
    <button
      type="button"
      className="btn btn-primary"
      disabled={!nerfGun.available}
      onClick={handleCatch(nerfGun.key)}
    >
      Got 1!
    </button>
  )
}

PokeballActionButton.propTypes = {
  nerfGun: PropTypes.object.isRequired,
  caughtPokemon: PropTypes.func.isRequired,
}

export default PokeballActionButton;
