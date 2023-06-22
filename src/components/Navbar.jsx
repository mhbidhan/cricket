import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='bg-black text-white p-5 '>
      <div className='max-w-[1440px] flex items-center'>
        <h1 className='text-xl font-bold mr-5'>Cricket Game</h1>
        <ul className='flex'>
          <li className='mx-3'>
            <a href={'/'}>Home</a>
          </li>
          <li className='mx-3'>
            <Link to={'/matches'}>Matches</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
