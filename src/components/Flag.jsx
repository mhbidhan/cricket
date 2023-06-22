import PropTypes from 'prop-types';
import australia from '../assets/images/australia.jpg';
import bangladesh from '../assets/images/bangladesh.jpg';
import england from '../assets/images/england.png';
import india from '../assets/images/india.png';
import pakistan from '../assets/images/pakistan.png';
import srilanka from '../assets/images/sri-lanka.png';

const flags = {
  india,
  bangladesh,
  srilanka,
  pakistan,
  australia,
  england,
};

function Flag({ country = '', active, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className={`w-[200px] mb-3  rounded-lg p-1 overflow-hidden border-2 ${
        active ? ' border-green-400' : 'border-white'
      }`}
    >
      <div className={`p-1 rounded-lg `}>
        <img
          className='custom-shadow rounded-lg h-[120px] object-cover'
          src={flags[country]}
          alt=''
        />
      </div>
    </div>
  );
}

Flag.propTypes = {
  country: PropTypes.string,
  active: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Flag;
