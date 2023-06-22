import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Container from '../components/Container';
import MatchCard from '../components/MatchCard';
import config from '../config';

function Matches() {
  const [matches, setMatches] = useState([]);

  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = async (id) => {
    try {
      await axios.delete(config.API_ENDPOINT + '/matchDetails/' + id);

      setMatches((matches) => matches.filter((match) => match.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getMatches = useCallback(async () => {
    const res = await axios.get(
      config.API_ENDPOINT + `/matchDetails?_limit=5&_page=${currentPage}`
    );

    console.log(res.data);

    const numberOfPage = Math.ceil(+res.headers['x-total-count'] / 5);

    setPages(numberOfPage);
    // setPages()

    setMatches(res.data);
  }, [currentPage]);

  useEffect(() => {
    getMatches();
  }, [getMatches]);
  return (
    <Container>
      <div>
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} handleDelete={handleDelete} />
        ))}
      </div>
      <div className='join w-full justify-center my-5'>
        <button
          className='join-item btn'
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
        >
          «
        </button>
        <button className='join-item btn'>Page {currentPage}</button>
        <button
          className='join-item btn'
          disabled={currentPage >= pages}
          onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
        >
          »
        </button>
      </div>
    </Container>
  );
}

export default Matches;
