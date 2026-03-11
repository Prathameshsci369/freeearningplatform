import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Opportunities from './pages/Opportunities';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with Navbar/Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;