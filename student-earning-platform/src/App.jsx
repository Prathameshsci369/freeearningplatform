import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Opportunities from './pages/Opportunities'; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* Add the new route here */}
          <Route path="opportunities" element={<Opportunities />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;