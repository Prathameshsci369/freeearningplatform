import axios from 'axios';

// Point directly to your Django backend
const API_URL = 'http://127.0.0.1:8000/api/auth/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login Service
const login = async (email, password) => {
  const response = await api.post('login/', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Signup Service
const signup = async (name, email, password) => {
  const response = await api.post('signup/', { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Logout Service
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authService = {
  login,
  signup,
  logout,
};

export default authService;