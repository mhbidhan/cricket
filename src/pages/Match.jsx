import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Flag from '../components/Flag';
import Table from '../components/Table';
import config from '../config';

function Match() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

  const getMatch = useCallback(async () => {
    const { data: match } = await axios.get(
      config.API_ENDPOINT + '/matchDetails/' + id
    );
    console.log(match);
    setMatch(match);
  }, [id]);

  useEffect(() => {
    getMatch();
  }, [getMatch]);

  if (!match) return;

  const {
    bowlerTeam,
    firstInTeam,
    secondInTeam,
    firsrInningsScore,
    secondInningsScore,
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
    <Container>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold mb-2'>Lets Play Cricket</h2>
        <div className='flex justify-between items-center max-w-[600px] mx-auto '>
          <Flag country={firstInTeam} />
          <p className='text-2xl'>VS</p>
          <Flag country={secondInTeam} />
        </div>
        <p>
          <span className='font-bold capitalize'>{bowlerTeam}</span> has won the
          toss and decided to bowl
        </p>
        <div className='flex justify-between max-w-[300px] mx-auto my-3'>
          <p className='font-bold text-lg capitalize'>
            {firstInTeam} Run : {firstInTotal}
          </p>
          <p className='font-bold text-lg capitalize'>
            {secondInTeam} Run : {secondInTotal}
          </p>
        </div>

        <p className='font-bold'>
          <span className='capitalize'>
            {firstInTotal > secondInTotal ? firstInTeam : secondInTeam}
          </span>{' '}
          won the match
        </p>
      </div>

      {firsrInningsScore.length ? (
        <div className='mb-7'>
          <p className='capitalize font-bold mb-3 max-w-[600px] mx-auto'>
            {firstInTeam}
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
          <p className='capitalize font-bold mb-3 max-w-[600px] mx-auto'>
            {secondInTeam}'s Innings
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

export default Match;
