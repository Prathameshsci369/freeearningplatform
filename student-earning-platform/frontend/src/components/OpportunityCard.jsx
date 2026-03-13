import { DollarSign, Star, Bookmark } from 'lucide-react';
import api from '../api/api'; 

const OpportunityCard = ({ opportunity, isSaved = false, onSaveToggle }) => {
  
  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to save opportunities");
      return;
    }

    try {
      if (isSaved) {
        await api.delete(`users/save/${opportunity.id}/`);
        if (onSaveToggle) onSaveToggle(opportunity.id, false);
      } else {
        await api.post(`users/save/${opportunity.id}/`);
        if (onSaveToggle) onSaveToggle(opportunity.id, true);
      }
    } catch (error) {
      console.error("Error saving opportunity", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all p-6 flex flex-col gap-4 relative group">
      
      <button 
        onClick={handleSave}
        className="absolute top-4 right-4 text-gray-300 hover:text-primary transition-opacity"
      >
        <Bookmark fill={isSaved ? "#7C3AED" : "none"} size={20} />
      </button>

      <div className="flex justify-between items-center pr-8">
        <span className="text-xs font-semibold bg-purple-100 text-primary px-3 py-1 rounded-full">
          {opportunity.platform || 'Unknown'}
        </span>
        <span className="text-xs text-gray-400">{opportunity.date_posted || 'N/A'}</span>
      </div>

      <h3 className="font-heading font-semibold text-lg text-dark leading-tight">
        {opportunity.title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {opportunity.skills_required && opportunity.skills_required.map((skill, index) => (
          <span 
            key={index} 
            className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1 text-accent font-bold text-sm">
          <DollarSign size={16} />
          <span>{opportunity.pay_range || 'Not Specified'}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Star size={14} className="text-yellow-500" />
          {opportunity.skill_level || 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;