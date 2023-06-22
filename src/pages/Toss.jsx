import axios from 'axios';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Flag from '../components/Flag';
import config from '../config';
import { computerTeamAtom, playerTeamAtom } from '../utils/atom';

function Toss() {
  const navigate = useNavigate();

  const [playerTeam] = useAtom(playerTeamAtom);
  const [computerTeam] = useAtom(computerTeamAtom);

  const [bowlerTeam, setBowlerTeam] = useState(null);

  const handlePlay = async () => {
    const match = {
      playerTeam,
      computerTeam,
      bowlerTeam,
    };

    try {
      const { data } = await axios.post(
        config.API_ENDPOINT + '/matches',
        match
      );

      navigate(`/play/${data.id}`, {
        state: { match },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!playerTeam || !computerTeam) return <Navigate to={'/'} />;

  return (
    <Container>
      <p className='text-2xl font-bold text-center mb-5'>Toss</p>
      <p className='text-lg font-bold text-center mb-5'>
        Select the team who will bowl
      </p>
      <div className='flex justify-between items-center w-[90%] max-w-[600px] mx-auto mb-5'>
        <Flag
          active={bowlerTeam === playerTeam}
          country={playerTeam}
          handleClick={() => setBowlerTeam(playerTeam)}
        />
        <p
          className='
        text-2xl'
        ></p>
        <Flag
          active={bowlerTeam === computerTeam}
          country={computerTeam}
          handleClick={() => setBowlerTeam(computerTeam)}
        />
      </div>
      <button
        className='btn btn-primary block mx-auto'
        onClick={handlePlay}
        disabled={!bowlerTeam}
      >
        Lets Play
      </button>
    </Container>
  );
}

export default Toss;
