import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PreviousShows from './pages/PreviousShows';
import ShowDetails from './pages/ShowDetails';
import UpcomingShows from './pages/UpcomingShows';
import ActorBlog from './pages/ActorBlog';
import CommunityBlog from './pages/CommunityBlog';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/previous-shows" element={<PreviousShows />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/upcoming-shows" element={<UpcomingShows />} />
        <Route path="/blog" element={<ActorBlog />} />
        <Route path="/community" element={<CommunityBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
