import { ArrowRight, Search, Filter, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpportunityCard from '../components/OpportunityCard';
import { mockOpportunities } from '../data/mockData';

const Home = () => {
  return (
    <div className="bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Find Verified <span className="text-primary">Earning Opportunities</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Curated internships, freelancing gigs, and micro-tasks for students. Filter by skills, track earnings, and start earning today.
            </p>
            
            {/* Search/CTA Area */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/opportunities" 
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-dark transition shadow-lg shadow-primary/30"
              >
                Browse Opportunities <ArrowRight size={20} />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold text-lg border border-gray-200 hover:bg-gray-50 transition">
                How It Works
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Gradient Blob */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-50"></div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-2 text-gray-500">Three simple steps to start earning</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl text-center hover:shadow-md transition border border-gray-100">
              <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-primary" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">1. Discover</h3>
              <p className="text-gray-500 text-sm">Browse opportunities from 15+ platforms aggregated just for you.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl text-center hover:shadow-md transition border border-gray-100">
              <div className="w-12 h-12 bg-accent-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="text-accent" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">2. Filter by Skills</h3>
              <p className="text-gray-500 text-sm">Select your skills like Python, Design, or Writing to find the perfect match.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl text-center hover:shadow-md transition border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="text-green-600" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">3. Track & Earn</h3>
              <p className="text-gray-500 text-sm">Apply, get hired, and track your earnings growth in one dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED OPPORTUNITIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900">Featured Opportunities</h2>
              <p className="mt-2 text-gray-500">Hand-picked opportunities for students</p>
            </div>
            <Link to="/opportunities" className="text-primary font-semibold hover:underline hidden sm:block">
              View All →
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockOpportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
             <Link to="/opportunities" className="text-primary font-semibold hover:underline">
              View All Opportunities →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;