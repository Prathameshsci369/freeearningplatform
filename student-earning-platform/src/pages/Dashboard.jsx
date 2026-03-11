import { useUserStore } from '../store/userStore';
import { Link } from 'react-router-dom';
import { Briefcase, Bookmark, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              Welcome, {user?.name || 'Student'}!
            </h1>
            <p className="text-gray-500 mt-1">Here’s your earning overview</p>
          </div>
          <button 
            onClick={logout}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Briefcase className="text-primary h-5 w-5" />
              </div>
              <span className="text-gray-500 text-sm font-medium">Opportunities Viewed</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Bookmark className="text-accent h-5 w-5" />
              </div>
              <span className="text-gray-500 text-sm font-medium">Saved Jobs</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">5</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="text-green-600 h-5 w-5" />
              </div>
              <span className="text-gray-500 text-sm font-medium">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹0</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Ready to find your next opportunity?</h3>
          <Link to="/opportunities" className="inline-block mt-2 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition">
            Browse Opportunities
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;