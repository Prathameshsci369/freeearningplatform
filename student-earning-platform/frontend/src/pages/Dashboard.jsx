import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { Link } from 'react-router-dom';
import { Briefcase, Bookmark, TrendingUp, LogOut } from 'lucide-react';
import api from '../api/api';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  
  const [stats, setStats] = useState({
    savedCount: 0,
    earnings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const savedRes = await api.get('users/saved/');
        const earningsRes = await api.get('users/earnings/');
        
        setStats({
          savedCount: savedRes.data.results.length,
          earnings: earningsRes.data.total
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">
              Welcome, {user?.name || 'Student'}!
            </h1>
            <p className="text-gray-500 mt-1">Here’s your earning overview</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

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

          <Link to="/saved" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Bookmark className="text-accent h-5 w-5" />
              </div>
              <span className="text-gray-500 text-sm font-medium">Saved Jobs</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.savedCount}</p>
          </Link>

          <Link to="/earnings" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="text-green-600 h-5 w-5" />
              </div>
              <span className="text-gray-500 text-sm font-medium">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{stats.earnings}</p>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-gray-900">Looking for new gigs?</h3>
                    <p className="text-gray-500 text-sm">Find your next earning opportunity.</p>
                </div>
                <Link to="/opportunities" className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition text-sm">
                    Browse Now
                </Link>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-gray-900">Track Your Income</h3>
                    <p className="text-gray-500 text-sm">Log your freelance payments.</p>
                </div>
                <Link to="/earnings" className="px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-gray-50 transition text-sm">
                    Add Earnings
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;