import { create } from 'zustand';
import authService from '../api/authService';

export const useUserStore = create((set) => ({
  // Initialize from localStorage if available (persists refresh)
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,

  // Real Login Action
  login: async (email, password) => {
    try {
      const data = await authService.login(email, password);
      set({ user: data.user, token: data.token });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || "Login failed" };
    }
  },

  // Real Signup Action
  signup: async (name, email, password) => {
    try {
      const data = await authService.signup(name, email, password);
      set({ user: data.user, token: data.token });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || "Signup failed" };
    }
  },

  // Logout Action
  logout: () => {
    authService.logout();
    set({ user: null, token: null });
  },
}));