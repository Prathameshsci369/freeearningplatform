import axios from 'axios';

const AUTH_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/auth';
const API_BASE_URL = AUTH_URL.replace('/auth', '');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;