import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Match from './pages/Match';
import Matches from './pages/Matches';
import Play from './pages/Play';
import Toss from './pages/Toss';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/toss' element={<Toss />} />
        <Route path='/play/:id' element={<Play />} />
        <Route path='/matches/:id' element={<Match />} />
        <Route path='/matches' element={<Matches />} />
      </Routes>
    </div>
  );
}

export default App;
