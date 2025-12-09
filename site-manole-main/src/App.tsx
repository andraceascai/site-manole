import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./pages/ScrollToTop";
import HomePage from "./pages/HomePage";
import PreviousShows from "./pages/PreviousShows";
import ShowDetails from "./pages/ShowDetails";
import UpcomingShows from "./pages/UpcomingShows";
import CommunityBlog from "./pages/CommunityBlog";
import CommunityBlogAdmin from "./pages/CommunityBlogAdmin";
import ActorBlogAdmin from "./pages/ActorBlogAdmin";
import ActorBlog from "./pages/ActorBlog";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repertoriu" element={<PreviousShows />} />
        <Route path="/repertoriu/:id" element={<ShowDetails />} />
        <Route path="/spectacole" element={<UpcomingShows />} />
        <Route path="/ganduri" element={<ActorBlog />} />
        <Route path="/ganduri/adminmm27" element={<ActorBlogAdmin />} />
        <Route path="/scena_voastra" element={<CommunityBlog />} />
        <Route
          path="/scena_voastra/adminmm27"
          element={<CommunityBlogAdmin />}
        />
      </Routes>
    </Router>
  );
}

export default App;
