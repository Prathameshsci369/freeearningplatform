import { useState, useEffect } from 'react';
import OpportunityCard from '../components/OpportunityCard';
import api from '../api/api';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await api.get('users/saved/');
        setSavedJobs(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSaved();
  }, []);

  const handleRemove = (id) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold mb-6">Saved Opportunities</h1>
        
        {savedJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl">
            <p className="text-gray-500">No saved jobs yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map(job => (
              <OpportunityCard 
                key={job.id} 
                opportunity={job} 
                isSaved={true} 
                onSaveToggle={(id) => handleRemove(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;