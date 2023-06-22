import PropTypes from 'prop-types';
import { useState } from 'react';
import Flag from './Flag';

function FlagForm({ flags = [], buttonLabel, handleSubmit }) {
  const [activeFlag, setActiveFlag] = useState(null);

  return (
    <div>
      <div className='grid grid-cols-2 max-w-[600px] mx-auto justify-items-center mb-5'>
        {flags.map((flag) => (
          <Flag
            handleClick={() => setActiveFlag(flag)}
            key={flag}
            country={flag}
            active={activeFlag === flag}
          />
        ))}
      </div>
      <button
        className='btn btn-primary block mx-auto'
        disabled={!activeFlag}
        onClick={() => handleSubmit(activeFlag)}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

FlagForm.propTypes = {
  flags: PropTypes.array,
  buttonLabel: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default FlagForm;
