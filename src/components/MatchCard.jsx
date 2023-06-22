import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Flag from './Flag';

function MatchCard({ match, handleDelete }) {
  const navigate = useNavigate();
  const {
    firstInTeam,
    secondInTeam,
    firsrInningsScore,
    secondInningsScore,
    id,
  } = match;
  const firstInTotal = firsrInningsScore.reduce(
    (acc, curr) => curr?.score + acc,
    0
  );
  const secondInTotal = secondInningsScore.reduce(
    (acc, curr) => curr?.score + acc,
    0
  );

  return (
    <div className='custom-shadow  p-3  mb-5 rounded-lg max-w-[500px] mx-auto'>
      <div
        onClick={() => navigate('/matches/' + id)}
        className='flex justify-between items-center max-w-[500px] mx-auto  mb-5'
      >
        <Flag country={firstInTeam} />
        <p className='text-2xl'>VS</p>
        <Flag country={secondInTeam} />
      </div>
      <p className='font-bold text-center mb-3'>
        <span className='capitalize'>
          {firstInTotal > secondInTotal ? firstInTeam : secondInTeam}
        </span>{' '}
        won the match
      </p>
      <button
        onClick={() => handleDelete(id)}
        className='btn btn-secondary block  mx-auto mb-3'
      >
        Delete
      </button>
    </div>
  );
}

MatchCard.propTypes = {
  match: PropTypes.any,
  handleDelete: PropTypes.func,
};

export default MatchCard;
