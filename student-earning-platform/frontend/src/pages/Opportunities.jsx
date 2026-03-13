import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import FilterSidebar from '../components/FilterSidebar';
import api from '../api/api'; // USING THE CENTRAL API HELPER

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [savedIds, setSavedIds] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    skills: [],
    skill_level: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Opportunities
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        // Using api.get automatically handles the base URL
        const response = await api.get('opportunities/'); 
        setOpportunities(response.data.results || []);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // 2. Fetch Saved Jobs
  useEffect(() => {
    const fetchSaved = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await api.get('users/saved/');
        const ids = res.data.results.map(item => item.id);
        setSavedIds(ids);
      } catch (error) {
        console.error("Error fetching saved jobs", error);
      }
    };

    fetchSaved();
  }, []);

  // 3. Handle Toggle Save
  const handleSaveToggle = (id, isNowSaved) => {
    if (isNowSaved) {
      setSavedIds(prev => [...prev, id]);
    } else {
      setSavedIds(prev => prev.filter(itemId => itemId !== id));
    }
  };

  // 4. Filtering Logic
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = searchTerm === "" || 
      (opp.title && opp.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (opp.platform && opp.platform.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkills = filters.skills.length === 0 || 
      (opp.skills_required && filters.skills.some(skill => opp.skills_required.includes(skill)));

    const matchesLevel = !filters.skill_level || opp.skill_level === filters.skill_level;

    return matchesSearch && matchesSkills && matchesLevel;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">Browse Opportunities</h1>
          <p className="text-gray-500 mt-1">Find your next earning opportunity</p>
        </div>

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

        <div className="flex flex-col md:flex-row gap-8">
          
          <aside className="w-full md:w-64 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          <main className="flex-grow">
            
            <div className="mb-4 text-sm text-gray-500">
              {loading ? 'Loading...' : `Showing ${filteredOpportunities.length} results`}
            </div>

            {!loading && filteredOpportunities.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opp) => (
                  <OpportunityCard 
                    key={opp.id} 
                    opportunity={opp} 
                    isSaved={savedIds.includes(opp.id)} 
                    onSaveToggle={handleSaveToggle}
                  />
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
              <div className="text-center py-16 text-gray-400">
                Loading...
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};

export default Opportunities;