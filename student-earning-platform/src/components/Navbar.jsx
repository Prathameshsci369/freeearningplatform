import { Link } from 'react-router-dom';
import { Briefcase, LogOut, LayoutDashboard } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="font-heading font-bold text-xl text-gray-900">EarnStudent</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/opportunities" className="text-gray-600 hover:text-primary font-medium transition">
              Opportunities
            </Link>
            <Link to="/guides" className="text-gray-600 hover:text-primary font-medium transition">
              Guides
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              // If User is Logged In
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-primary font-medium">
                   <LayoutDashboard size={18} /> Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              // If User is Guest
              <>
                <Link to="/login" className="hidden sm:block text-gray-600 hover:text-primary font-medium">
                  Log in
                </Link>
                <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;