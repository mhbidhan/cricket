import axios from 'axios';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Flag from '../components/Flag';
import Table from '../components/Table';
import config from '../config';
import { computerTeamAtom, playerTeamAtom } from '../utils/atom';

const scorelist = [1, 2, 3, 4, 6];

function Play() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { bowlerTeam } = state.match;

  const [playerTeam] = useAtom(playerTeamAtom);
  const [computerTeam] = useAtom(computerTeamAtom);

  const [numberOfBowl, setNumberOfBowl] = useState(0);
  const [firsrInningsScore, setFirsrInningsScore] = useState([]);
  const [secondInningsScore, setSecondInningsScore] = useState([]);

  const createMatchDetail = useCallback(async () => {
    try {
      const detail = {
        bowlerTeam,
        firstInTeam: playerTeam === bowlerTeam ? computerTeam : playerTeam,
        secondInTeam: bowlerTeam,
        firsrInningsScore,
        secondInningsScore,
      };

      const { data } = await axios.post(
        config.API_ENDPOINT + '/matchDetails',
        detail
      );

      navigate('/matches/' + data.id);
    } catch (error) {
      console.log(error);
    }
  }, [
    bowlerTeam,
    firsrInningsScore,
    secondInningsScore,
    playerTeam,
    computerTeam,
    navigate,
  ]);

  const handleBowl = () => {
    const index = Math.floor(Math.random() * 5);

    if (numberOfBowl >= 12) return;

    if (numberOfBowl < 6) {
      setFirsrInningsScore((scores) => [
        ...scores,
        { bowl: numberOfBowl + 1, score: scorelist[index] },
      ]);
    }
    if (numberOfBowl >= 6 && numberOfBowl < 12) {
      setSecondInningsScore((scores) => [
        ...scores,
        { bowl: numberOfBowl + 1, score: scorelist[index] },
      ]);
    }

    setNumberOfBowl((bowl) => bowl + 1);
  };

  useEffect(() => {
    if (numberOfBowl === 12) {
      createMatchDetail();
    }
  }, [numberOfBowl, createMatchDetail]);

  if (!playerTeam || !computerTeam) return <Navigate to={'/'} />;

  return (
    <Container>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold mb-2'>Lets Play Cricket</h2>
        <div className='flex justify-between items-center max-w-[600px] mx-auto '>
          <Flag country={playerTeam} />
          <p className='text-2xl'>VS</p>
          <Flag country={computerTeam} />
        </div>
        <p>
          <span className='font-bold capitalize'>{bowlerTeam}</span> has won the
          toss and decided to bowl
        </p>
      </div>
      <button
        className='btn btn-primary block mx-auto mb-8'
        onClick={handleBowl}
      >
        Bowl
      </button>
      {firsrInningsScore.length ? (
        <div className='mb-7'>
          <p className='capitalize font-bold mb-3 max-w-[600px] mx-auto'>
            {playerTeam === bowlerTeam ? computerTeam : playerTeam}
            's Innings
          </p>
          <Table
            data={firsrInningsScore.map((a) => ({
              ...a,
              bowl: `0.${a.bowl}`,
            }))}
          />
        </div>
      ) : null}

      {secondInningsScore.length ? (
        <div className='mb-5'>
          <p className='capitalize font-bold mb-3  max-w-[600px] mx-auto'>
            {bowlerTeam}'s Innings
          </p>
          <Table
            data={secondInningsScore.map((a) => ({
              ...a,
              bowl: `0.${a.bowl - 6}`,
            }))}
          />
        </div>
      ) : null}
    </Container>
  );
}

export default Play;
