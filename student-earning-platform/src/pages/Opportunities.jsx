import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import FilterSidebar from '../components/FilterSidebar';
import { mockOpportunities } from '../data/mockData';

const Opportunities = () => {
  // State for our filters
  const [filters, setFilters] = useState({
    skills: [],
    skill_level: ''
  });
  
  // State for Search Input
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering Logic (Client-Side for MVP)
  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter((opp) => {
      // 1. Match Search Term (Basic implementation)
      const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           opp.platform.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Match Skills (Check if selected skills intersect with required skills)
      const matchesSkills = filters.skills.length === 0 || 
                           filters.skills.some(skill => opp.skills_required.includes(skill));

      // 3. Match Level
      const matchesLevel = !filters.skill_level || opp.skill_level === filters.skill_level;

      return matchesSearch && matchesSkills && matchesLevel;
    });
  }, [filters, searchTerm]);

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
              Showing <span className="font-semibold text-gray-700">{filteredOpportunities.length}</span> results
            </div>

            {/* Opportunity Grid */}
            {filteredOpportunities.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500">No opportunities match your filters.</p>
                <button 
                  onClick={() => setFilters({ skills: [], skill_level: '' })}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};

export default Opportunities;