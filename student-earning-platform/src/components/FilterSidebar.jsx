import { Filter, X } from 'lucide-react';

// Static lists for our checkboxes
const skillOptions = ["Python", "Web Scraping", "Design", "Writing", "SEO", "React", "Mobile Dev"];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];

const FilterSidebar = ({ filters, setFilters }) => {
  
  // Handle Checkbox Changes
  const handleSkillChange = (skill) => {
    if (filters.skills.includes(skill)) {
      // Remove skill
      setFilters({
        ...filters,
        skills: filters.skills.filter((s) => s !== skill)
      });
    } else {
      // Add skill
      setFilters({
        ...filters,
        skills: [...filters.skills, skill]
      });
    }
  };

  const handleLevelChange = (level) => {
    setFilters({ ...filters, skill_level: level });
  };

  const clearFilters = () => {
    setFilters({ skills: [], skill_level: '' });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
          <Filter size={18} /> Filters
        </h3>
        {(filters.skills.length > 0 || filters.skill_level) && (
          <button 
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1"
          >
            Clear <X size={14} />
          </button>
        )}
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm text-gray-700 mb-3">Skills</h4>
        <div className="space-y-2">
          {skillOptions.map((skill) => (
            <label key={skill} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.skills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary transition">
                {skill}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Level Section */}
      <div>
        <h4 className="font-semibold text-sm text-gray-700 mb-3">Experience Level</h4>
        <div className="space-y-2">
          {levelOptions.map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="level"
                checked={filters.skill_level === level}
                onChange={() => handleLevelChange(level)}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary transition">
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;