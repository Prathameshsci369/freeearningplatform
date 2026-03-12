import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import FilterSidebar from '../components/FilterSidebar';
import axios from 'axios'; // Import axios for API calls

const Opportunities = () => {
  // State for Opportunities fetched from Backend
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Filters
  const [filters, setFilters] = useState({
    skills: [],
    skill_level: ''
  });
  
  // State for Search Input
  const [searchTerm, setSearchTerm] = useState('');

  // --- 1. Fetch Data from Django Backend ---
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        // Call the Django API endpoint
        const response = await axios.get('http://127.0.0.1:8000/api/opportunities/');
        
        // Store all opportunities in state
        setOpportunities(response.data.results || []);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []); // Empty array means run once on page load

  // --- 2. Client-Side Filtering Logic ---
  // We filter the fetched data based on user selection
  const filteredOpportunities = opportunities.filter((opp) => {
    
    // A. Match Search Term (Title or Platform)
    const matchesSearch = searchTerm === '' || 
      (opp.title && opp.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (opp.platform && opp.platform.toLowerCase().includes(searchTerm.toLowerCase()));

    // B. Match Skills (If user selected skills, check if job has them)
    const matchesSkills = filters.skills.length === 0 || 
      (opp.skills_required && filters.skills.some(skill => opp.skills_required.includes(skill)));

    // C. Match Level
    const matchesLevel = !filters.skill_level || opp.skill_level === filters.skill_level;

    return matchesSearch && matchesSkills && matchesLevel;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">Browse Opportunities</h1>
          <p className="text-gray-500 mt-1">Find your next earning opportunity</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search by title or platform..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
          </div>
        </div>

        {/* Main Content Grid: Sidebar + Listings */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left: Sidebar (Filters) */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Right: Listings */}
          <main className="flex-grow">
            
            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-500">
              {loading ? 'Loading...' : `Showing ${filteredOpportunities.length} results`}
            </div>

            {/* Opportunity Grid */}
            {!loading && filteredOpportunities.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            ) : !loading && filteredOpportunities.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500">No opportunities match your filters.</p>
                <button 
                  onClick={() => setFilters({ skills: [], skill_level: '' })}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              // Loading Skeleton
              <div className="text-center py-16 text-gray-400">
                Loading opportunities from database...
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};

export default Opportunities;