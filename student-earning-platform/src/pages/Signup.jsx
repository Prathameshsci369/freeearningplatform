import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, Lock, User } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const Signup = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // MOCK SIGNUP LOGIC
    // In backend phase, this will be a POST to /api/auth/signup
    console.log("Signing up:", formData);

    // Simulate a successful registration & login
    const mockUser = {
      id: "user_123",
      name: formData.name,
      email: formData.email,
      skills: formData.skills.split(',').map(s => s.trim())
    };
    const mockToken = "mock_jwt_token_12345";

    login(mockUser, mockToken);
    navigate('/dashboard'); // Redirect to dashboard after signup
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Start finding opportunities today
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary outline-none"
                placeholder="Priya Sharma"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary outline-none"
                placeholder="student@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Skills</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary outline-none"
              placeholder="e.g. Python, Design, Writing"
            />
            <p className="text-xs text-gray-400 mt-1">Comma separated values</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition shadow-md"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;