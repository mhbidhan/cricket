import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import FlagForm from '../components/FlagForm';
import { computerTeamAtom, playerTeamAtom } from '../utils/atom';

const flags = [
  'india',
  'bangladesh',
  'srilanka',
  'pakistan',
  'australia',
  'england',
];

function Home() {
  const navigate = useNavigate();

  const [playerTeam, setPlayerTeam] = useAtom(playerTeamAtom);
  const [computerTeam, setComputerTeam] = useAtom(computerTeamAtom);

  return (
    <Container>
      {playerTeam === null ? (
        <>
          <p className='text-center text-lg font-bold mb-5'>Chose your Team</p>
          <FlagForm
            flags={flags}
            buttonLabel={'Next'}
            handleSubmit={(team) => {
              if (!team) return;
              setPlayerTeam(team);
            }}
          />
        </>
      ) : null}
      {playerTeam && computerTeam === null ? (
        <>
          <p className='text-center text-lg font-bold mb-5'>
            Chose your Oponent Team
          </p>
          <FlagForm
            flags={flags.filter((flag) => flag !== playerTeam)}
            buttonLabel={'Play'}
            handleSubmit={(team) => {
              if (!team) return;
              setComputerTeam(team);
              navigate('/toss');
            }}
          />
        </>
      ) : null}
    </Container>
  );
}

export default Home;
